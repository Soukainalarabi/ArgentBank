
import { useLocation} from "react-router-dom";
import logo from "../assets/argentBankLogo.png"
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { deconnected } from "../actions/actions";

export default function Navigation(){
    const location=useLocation()
  
    return(
        <>
        {location.pathname==='/login' ||location.pathname==='/'||location.pathname==='/signup' ? (<nav className="main-nav">
    <Link to="/" className="main-nav-logo" >
      <img
        className="main-nav-logo-image"
        src={logo}
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </Link>
        <div className="navigate-home">
        <Link to="/login" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
   
  </nav>
  ):null}
  </>
  );
}