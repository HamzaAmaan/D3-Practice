import {useLocation, useNavigate} from 'react-router-dom';
import '../App.css';
import BarChart from "./d3/BarChart";

const ShowCountryGraph = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ec = location.state;
    const data = ec.data;

    return (
        <div className='ShowCountryGraph'>
          <div className='container'>
              <div className='col-md-10 m-auto'>
                  <br /> <br />
  
                  <button
                  className="btn btn-outline-warning float-left"
                  onClick={() => navigate(-1)}>
                      Show {ec._id} Dashboard
                  </button>
              </div>
              <BarChart  data={data}/>
          </div>
        </div>
    );

}

export default ShowCountryGraph;