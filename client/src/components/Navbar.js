import React, { useState , useEffect} from "react";
import '../styles/Styles.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showCustomerBoard, setshowCustomerBoard] = useState(false);
  const [showFarmersBoard, setshowFarmersBoard] = useState(false);
  const [CurrentUser, setCurrentUser] = useState(undefined);

  const handleLogout = () => {
    alert("logged out successfully")
    setShowMediaIcons(false);
    AuthService.logout();
    setCurrentUser(undefined)
    setshowFarmersBoard(false)
    setshowCustomerBoard(false)
    setShowAdminBoard(false)
  }
      
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      if(user.role === "admin"){
        setShowAdminBoard(true);
      }
      else if(user.role === "farmer"){
        setshowFarmersBoard(true)
      }else{
        setshowCustomerBoard(true)
      }
    }
  }, []);

  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <img alt="logo" className="logo_img_navbar" src="./images/wingrow-logo.jpg"/>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>

            <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/">
                <div className="profile_wrapper">
                <img className="profile_logo" src="https://as1.ftcdn.net/v2/jpg/03/66/63/52/1000_F_366635299_S1MlOWCcUVFPwgtxznb89r56tvyBBBVU.jpg" alt="logo"/>
                <p>Home</p>
                </div>
              </Link>
            </li>

            {showCustomerBoard && 
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/customers">
              <div className="profile_wrapper">
                <img className="profile_logo" src="https://as1.ftcdn.net/v2/jpg/02/31/30/12/1000_F_231301229_RfYXoVN8sPWnrOoirxLXaiTZ7IBMMpqe.jpg" alt="logo"/>
                <p>Customers</p>
                </div>
              </Link>
            </li>
            }
            {showFarmersBoard &&
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/farmers">
                <div className="profile_wrapper">
                <img className="profile_logo" src="https://as2.ftcdn.net/v2/jpg/03/53/12/53/1000_F_353125373_DHE5CssJZJwnBtUKuUvDQh46EtKyxqC1.jpg" alt="logo"/>
                <p>Farmers</p>
                </div>
              </Link>
            </li>
            }

            {showAdminBoard &&
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/admin">Admin</Link>
            </li>
            }

            {CurrentUser?
            <>
              <li className="medialinks">
              <Link onClick={handleLogout} to="/login">
              <div className="profile_wrapper">
                <img className="profile_logo" src="https://as1.ftcdn.net/v2/jpg/03/21/76/10/1000_F_321761021_tv91dtTbEHEthIZkMpU1uyoN4ry9Bvsu.jpg" alt="logo"/>
                <p>Logout</p>
                </div>
              </Link>
              </li>
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/profile">
                <div className="profile_wrapper">
                <img className="profile_logo" src="https://as2.ftcdn.net/v2/jpg/01/18/03/33/1000_F_118033377_JKQA3UFE4joJ1k67dNoSmmoG4EsQf9Ho.jpg" alt="logo"/>
                <span>{CurrentUser.firstname}</span>
                </div>
              </Link>
              </li>
            </> : 
            <>
              <li className="medialinks">
                <Link onClick={()=>{setShowMediaIcons(false)}} to="/login">Login</Link>
              </li>

              <li className="medialinks">
                <Link onClick={()=>{setShowMediaIcons(false)}} to="/register">Register</Link>
              </li>
            </>
            }
          </ul>
        </div>

        <div className="social-media">
          <div className="hamburger-menu">
            <span onClick={() => setShowMediaIcons(!showMediaIcons)}>
              {showMediaIcons?<TiDeleteOutline />:<GiHamburgerMenu />}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;