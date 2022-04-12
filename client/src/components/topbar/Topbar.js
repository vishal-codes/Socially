import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Chat, 
  Notifications,
  Explore
} from '@mui/icons-material';

import { AuthContext } from '../../context/AuthContext';
import './Topbar.css';
import { logOutCall } from '../../apiCalls';

function Topbar() {

  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const logOutClick = () => {
    window.location.replace("/login");
    logOutCall(dispatch);
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">Socially</span>
        </Link>
      </div>
      <div className="topbarCenter">
          <div className="searchbar">
              <Search className="searchIcon"/>
              <input 
                placeholder="Search for friends or a post..." 
                className="searchInput" 
              />
          </div>
      </div>
      <div className="topbarRight">
          <div className="topbarLinks">
              <Link to="/" style={{textDecoration:"none"}}>
                  <span className="topbarLink">Homepage</span>
              </Link>
              <Link to={`/profile/${user.username}`}>
                  <img 
                    src={ 
                      user.profilePicture
                      ? user.profilePicture
                      : PF+"/person/noAvatar.png"
                    } 
                    alt=""
                    className="topbarImg"
                  />
              </Link>
          </div>
          <div className="topbarIcons">
              <div className="topbarIconItem">
                <Link style={{ color: "white" }} to="/explore">
                  <Explore style={{ fontSize: "37px" }}/>
                </Link>
              </div>
              <div className="topbarIconItem">
                <Chat style={{ fontSize: "35px" }} />
                <span className="topbarIconBadge">4</span>
              </div>
              <div className="topbarIconItem">
                <Notifications style={{ fontSize: "35px" }} />
                <span className="topbarIconBadge">1</span>
              </div>
          </div>
          <button onClick={logOutClick} className="logOutBtn">Logout</button>
      </div>
    </div>
  );
}

export default Topbar;