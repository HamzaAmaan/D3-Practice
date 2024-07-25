import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Country from './CountryThumbnail';

const ShowECList = () => {

  const [ec, setEc] = useState([]);
    useEffect(() => {
        axios
          .get('http://localhost:8082/api/ecs')
          .then((res) => {
            setEc(res.data);
          })
          .catch((err) => {
            console.log('Error from ShowECList');
          });
      }, []);

    const ecList =
        ec.length === 0
        ? 'there is no EC record!'
        : ec.map((ec, k) => <Country ec={ec} key={k} />);

    return (
        <div>
          <div className='ShowECList'>
            <div className='container'>
                <div className='row'>
                <div className='col-md-12'>
                    <br />
                    <h2 className='display-4 text-center'>EC List</h2>
                </div>
                </div>

                <div className='list'>{ecList}</div>
            </div>
          </div>
          
        </div>
    );
}

export default ShowECList;