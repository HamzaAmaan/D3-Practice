import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import WorldMap from './d3/worldMap/WorldMap';
import BarChart from "./d3/BarChart";
import ShowECList from "./EnergyConsumptionList";

const Home = () => {  
    const [ec, setEc] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        axios.get('http://localhost:8082/api/ecs')
            .then((res) => {
                setEc(res.data);
                setLoading(false); // Update loading state
                console.log(res.data);
            })
            .catch((err) => {
                console.log('Error from ShowECList');
                setLoading(false); // Update loading state in case of error
            });
    }, []);

    const worldData = ec.find(item => item._id === "World")?.data;

    return (
         <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <WorldMap />
                </div>
                <div className="col-md-6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : worldData ? (
                        <BarChart data={worldData} />
                    ) : (
                        <p>No World Data Available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
