import {useLocation, useNavigate} from 'react-router-dom';
import '../App.css';

const ShowECDetails = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const ec = location.state;


  const ECItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Country</td>
            <td>{ec.country}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>year</td>
            <td>{ec.year}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>iso code</td>
            <td>{ec.iso_code}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Population</td>
            <td>{ec.population ? ec.population.toLocaleString() : ec.population}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>GDP</td>
            <td>{ec.gdp ? ec.gdp.toLocaleString() : ec.gdp}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowECDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <button
              className="btn btn-outline-warning float-left"
              onClick={() => navigate(-1)}>
                Show Energy Consumption List
            </button>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Energy Consumption Record</h1>
            <p className='lead text-center'>View EC's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{ECItem}</div>
        </div>
      </div>
    </div>
  );
}

export default ShowECDetails;