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
<nav class="navbar navbar-expand-lg bg-body-tertiary shadow-nav">
        <div class="container-fluid">
          <a class="navbar-brand" href="/" style={{color:"#6366F1", fontWeight:"bold" , fontSize:"1.5rem" , marginLeft:"2rem"}}><img src="/icons8-zoom.svg" alt="" />&nbsp;&nbsp;&nbsp;Meetly</a>
         
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/guestJoin">Join as guest</a>
              </li>
               {token && <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/home">Home</a>
              </li>}
              {
                !token && <li class="nav-item">
                <a class="nav-link" href="/auth">Register</a>
              </li>
              }
              {
                !token && <li class="nav-item">
                <a class="nav-link" href="/auth">Login</a>
              </li>
              }
              {token && <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/history">History</a>
              </li>}
              {token && <li class="nav-item">
                {/* <a class="nav-link active" aria-current="page" href="/home">Logout</a> */}
                <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
              </li>}
             
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
