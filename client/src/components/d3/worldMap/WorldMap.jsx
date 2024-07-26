import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import axios from 'axios';

const WorldMap = ({ setCountry }) => {
    const svgRef = useRef();
    const [error, setError] = useState(null); // Initialize error state
    const zoomedInRef = useRef(false); // Ref to track zoom state
    const countryRef = useRef(null); // Ref to track the currently selected country
    const scaleRef = useRef(null);
    const rotationRef = useRef(null);
    const translationRef = useRef(null);

    const height = 600;
    const width = 750;

    const defaultRotation = [0, -30];
    const defaultTranslation = [width/2, height/2];

    useEffect(() => {
        // Fetch WorldData from the API
        axios.get('http://localhost:8082/api/world-data')
            .then((res) => renderMap(res.data))
            .catch((err) => setError(err.message));
    }, []);
    
    const renderMap = (WorldData) => {
        const svg = d3.select(svgRef.current);
        const projection = d3.geoOrthographic().rotate(defaultRotation).translate(defaultTranslation);
        rotationRef.current = defaultRotation;
        scaleRef.current = projection.scale();
        translationRef.current = defaultTranslation;
        // Create a path generator
        const pathGenerator = d3.geoPath().projection(projection);
        // Bind the data to SVG paths
        svg.selectAll('path')
            .data(WorldData) // Use the imported WorldData directly
            .enter()
            .append('path')
            .attr('d', pathGenerator)
            .attr('fill', 'lightblue')
            .attr('stroke', 'white')
            .attr('stroke-width', 0.5)
            .on('click', createCountryClickHandler(svg, projection, pathGenerator));

        // Allow drag rotation
        svg.on("mousedown", createMouseDownHandler(svg, projection, pathGenerator))
        // Allow zoom in
            .on("wheel", createScrollHandler(svg, projection, pathGenerator))
        // Restore overflow when not hovering over the SVG
            .on("mouseleave", () => { document.body.style.overflow = ""; });
    };

    const createCountryClickHandler = (svg, projection, pathGenerator) => {
        const zoomIn = (svg, projection, pathGenerator, from, duration, d) => {
            function tweenPaths(pathGenerator, d) {
                const currentPath = this.getAttribute("d");
                const newPath = pathGenerator(d);
            
                // Interpolate between the current path and the new path
                const interpolator = d3.interpolateString(currentPath, newPath);
            
                // Return the tween function
                return function (t) {
                    return interpolator(t);
                };
            }
            zoomedInRef.current = true;
            const newCountry = {
                name: d.properties.name,
                iso_code: d.iso_code
            };
            setCountry(newCountry);
            countryRef.current = newCountry;
            // Rotate map
            const center = d3.geoCentroid(d);
            const country_longitude = center[0];
            const country_latitude = center[1];
            const rotation = [-country_longitude, -country_latitude, 0]
            projection.scale(1).translate([0, 0]).rotate(rotation);
    
            // Zoom into country
            const b = pathGenerator.bounds(d),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
            projection.scale(s).translate(t);
    
            svg.selectAll("path")
                .transition()
                .duration(duration)
                .attrTween("d", tweenPaths.bind(from, pathGenerator, d));
        };
    
        const zoomOut = (svg, projection, pathGenerator, duration) => {
            zoomedInRef.current = false;
            setCountry(null);
            countryRef.current = null;
    
            const scaleInterpolator = d3.interpolate(projection.scale(), scaleRef.current);
            const translateInterpolator = d3.interpolate(projection.translate(), translationRef.current);
            const rotateInterpolator = d3.interpolate(projection.rotate(), rotationRef.current);
    
            d3.transition()
                .duration(duration)
                .tween("projection", () => t => {
                    projection
                        .scale(scaleInterpolator(t))
                        .translate(translateInterpolator(t))
                        .rotate(rotateInterpolator(t));
                    svg.selectAll("path").attr("d", pathGenerator);
                });
        };

        return function handleCountryClick(event, d) {
            event.stopPropagation(); // Prevent the SVG click handler from firing
            const duration = 800;
            if (zoomedInRef.current && (countryRef.current?.iso_code !== d.iso_code || countryRef.current?.iso_code ==="ZWE")) {
                zoomOut(svg, projection, pathGenerator, duration);
            } else {
                // Zoom in on the clicked country
                zoomIn(svg, projection, pathGenerator, this, duration, d);
            }
        };
    };

    const createMouseDownHandler = (svg, projection, pathGenerator) => {
        return function handleMouseDown(event) {
            if(zoomedInRef.current)
            {
                return;
            }
            setCountry(null);
            const startCoords = d3.pointer(event);
            const startRotation = rotationRef.current;
            const startScale = scaleRef.current;

            svg.on("mousemove", handleMouseMove); // Listen for mouse move
            svg.on("mouseup", handleMouseUp); // Listen for mouse up
    
            function handleMouseMove(event) {
                const currentCoords = d3.pointer(event); // Get current mouse coordinates
                const dx = currentCoords[0] - startCoords[0];
                const dy = currentCoords[1] - startCoords[1];
    
                // Update rotation based on mouse movement
                const rotationSpeed = 0.5;
                const newRotation = [
                    startRotation[0] + dx * rotationSpeed,
                    startRotation[1] - dy * rotationSpeed,
                ];
    
                projection.rotate(newRotation).scale(startScale);
                rotationRef.current = newRotation;
                svg.selectAll("path").attr("d", pathGenerator); // Update paths
            }
    
            function handleMouseUp() {
                svg.on("mousemove", null); // Remove mousemove listener
                svg.on("mouseup", null); // Remove mouseup listener
            }
        };
    }

    const createScrollHandler = (svg, projection, pathGenerator) => {
        return function handleScroll(event) {
            if(zoomedInRef.current)
            {
                return;
            }
            setCountry(null);
            zoomedInRef.current = false;
            countryRef.current = null;

            const scrollDelta = event.deltaY;
            const zoomFactor = 1 + (scrollDelta > 0 ? 0.1 : -0.1);
            const newScale = scaleRef.current * zoomFactor;
            projection.scale(newScale).rotate(rotationRef.current);
            scaleRef.current = newScale;
            // Lock window scroll during zoom
            document.body.style.overflow = "hidden";

            svg.selectAll("path").attr("d", pathGenerator);
        };
    }

    const resetMap = () => {
        const svg = d3.select(svgRef.current);
        const projection = d3.geoOrthographic().rotate(defaultRotation).translate(defaultTranslation);
        zoomedInRef.current = false;
        setCountry(null);
        countryRef.current = null;

        rotationRef.current = projection.rotate();
        scaleRef.current = projection.scale();
        translationRef.current = projection.translate();

        const pathGenerator = d3.geoPath().projection(projection);

        svg.selectAll("path").attr("d", pathGenerator);
    };

    return (
        <div className="text-center">
            <div width={width}>
                <div width={width}>
                    {error && <p>Error loading map: {error}</p>}
                    <svg ref={svgRef} width={width} height={height} ></svg>
                </div>
                <button className="btn btn-primary mt-3" onClick={resetMap}>Reset View</button>
            </div>
        </div>
      );
}

export default WorldMap;