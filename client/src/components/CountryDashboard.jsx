import {Link, useLocation, useNavigate} from 'react-router-dom';
import '../App.css';

const ShowCountryDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const ec = location.state;

    return (
        <div className='ShowCountryDashboard'>
          <div className='container'>
              <div className='col-md-10 m-auto'>
                  <br /> <br />
  
                  <button
                  className="btn btn-outline-warning float-left"
                  onClick={() => navigate(-1)}>
                      Show Countries
                  </button>
              </div>
              <div className='row'>
                  <div className='col-md-12'>
                      <br />
                      <h2 className='display-4 text-center'>{ec._id} Dashboard</h2>
                  </div>
              </div>
              <div className='row'>
                <div className='col-md-6 m-auto'>
                    <h2>
                        <Link to={`/ec/${ec._id}/list-all`} state={ec}
                        className='btn btn-outline-warning float-left'>Show Yearly Data</Link>
                    </h2>

                </div>
                <div className='col-md-6 m-auto'>
                    <h2>
                        <Link to={`/ec/${ec._id}/graph`} state={ec}
                        className='btn btn-outline-warning float-left'>Show graph</Link>
                    </h2>
                </div>
              </div>
          </div>
        </div>
    );

}

export default ShowCountryDashboard;