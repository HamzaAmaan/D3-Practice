import {useLocation, useNavigate} from 'react-router-dom';
import '../App.css';
import EnergyConsumption from './EnergyConsumptionThumbnail';

const ShowCountryEClist = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const ec = location.state;
  const data = ec.data;

  const ecList =
  data.length === 0
      ? 'there is no EC record!'
      : data.map((ec, k) => <EnergyConsumption ec={ec} key={k} />);

  return (
      <div className='ShowECList'>
        <div className='container'>
            <div className='col-md-10 m-auto'>
                <br /> <br />

                <button
                className="btn btn-outline-warning float-left"
                onClick={() => navigate(-1)}>
                    Show Dashboard
                </button>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <br />
                    <h2 className='display-4 text-center'>{ec._id} EC List </h2>
                </div>
            </div>
            <div className='list'>{ecList}</div>
        </div>
      </div>
  );
}

export default ShowCountryEClist;