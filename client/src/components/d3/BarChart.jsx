import { useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({data}) => {
    console.log(data)
    useEffect(() => {
        if (!data || data.length === 0)
            {
                console.log(data)
                return;
            }  // Return early if data is undefined or empty

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 750 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        const x = d3.scaleBand().range([0, width]).padding(0.1);
        const y = d3.scaleLinear().range([height, 0]);


        x.domain(
            data.map(function (d) {
                return d.year;
            })
        );
        y.domain([
            0,
            d3.max(data, function (d) {
                return d.population;
            }),
        ]);

        const svgExists = d3.select(".bar-chart svg").size() > 0;

        if (!svgExists)
        {
            const svg = d3
            .select(".bar-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.year);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.population);
            })
            .attr("height", function (d) {
                return height - y(d.population);
            });

            svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text") .attr("transform", "rotate(-90) translate(-16,-13)"); ;

            svg.append("g")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .text(function (d) {
                if (d >= 1000000000)
                    return (d / 1000000000).toLocaleString() + "B"
                else if (d >= 1000000)
                    return (d / 1000000) + "M"
                else if (d >= 1000)
                    return (d / 1000) + "k"
                else
                    return d;
            });
        }

    }, [data]);
    return (
        <div className="bar-chart"></div>
    );
}

export default BarChart;