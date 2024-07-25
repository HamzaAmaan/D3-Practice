import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const CountryEC = ({ec}) => {
  return (
    <div className='card-container'>
      <img
        src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
        alt='ec'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/ec/${ec._id}`} state={ec}>{ec._id}</Link>
        </h2>
      </div>
    </div>
  );
};

export default CountryEC;