import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import WorldMap from './d3/worldMap/WorldMap';
import BarChart from "./d3/BarChart";

const Home = () => {  
    const [ec, setEc] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [country, setCountry] = useState(null); // Initialize error state

    useEffect(() => {
        axios.get('http://localhost:8082/api/ecs')
            .then((res) => {
                setEc(res.data);
                setLoading(false); // Update loading state
            })
            .catch((err) => {
                console.log('Error from ShowECList');
                setLoading(false); // Update loading state in case of error
            });
    }, []);

    useEffect(() => {
        var barData;
        if(country)
        {
            barData = ec.find(item => item.iso_code === country.iso_code);
            if(!barData)
            {
                barData = ec.find(item => item._id === country.name);
            }
        }
        else {
            barData = ec.find(item => item._id === "World");
        }
        setBarData(barData);

    }, [country, ec]);

    const [barData, setBarData] = useState(null);

    return (
         <div className="container">
            <div>{country ? `${country.name} (${country.iso_code})` : "World"}</div>
            <div className="row">
                <div className="col-md-6">
                    <WorldMap setCountry={setCountry}/>
                </div>
                <div className="col-md-6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : barData ? (
                        <div>
                        <BarChart data={barData.data} />

                     <div className='desc'>
                            <h2>
                                <Link to={`/ec/${barData._id}/list-all`} state={barData}
                                className='btn btn-outline-warning float-left'>Show Yearly Data</Link>
                            </h2>
                        </div>
                        </div>
                        
                    ) : (
                        <p>No Data Available</p>
                    )}
                     
                </div>
            </div>
        </div>
    );
}

export default Home;
