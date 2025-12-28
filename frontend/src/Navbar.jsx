import { Link } from "react-router-dom";
import "./App.css"
import History from "./pages/history";
import { useNavigate } from "react-router-dom";
function Navbar() {
 let Navigate = useNavigate();
  let handleLogout = () => {
    let token = localStorage.removeItem("token");
    Navigate("/");
  }

   let token = localStorage.getItem("token");

    return ( 
<nav className="navbar navbar-expand-lg bg-body-tertiary shadow-nav">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{color:"#6366F1", fontWeight:"bold" , fontSize:"1.5rem" , marginLeft:"2rem"}}><img src="/icons8-zoom.svg" alt="" />&nbsp;&nbsp;&nbsp;Meetly</Link>
         
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/guestJoin">Join as guest</Link>
              </li>
               {token && <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li>}
              {
                !token && <li className="nav-item">
                <Link className="nav-link" to="/auth">Register</Link>
              </li>
              }
              {
                !token && <li className="nav-item">
                <Link className="nav-link" to="/auth">Login</Link>
              </li>
              }
              {token && <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/history">History</Link>
              </li>}
              {token && <li className="nav-item">
                {/* <Link className="nav-link active" aria-current="page" to="/home">Logout</Link> */}
                <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
              </li>}
             
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
