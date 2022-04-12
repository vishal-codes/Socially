import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Profile.css';
import Topbar from '../../components/topbar/Topbar';
import Leftbar from '../../components/leftbar/Leftbar';
import Feed from '../../components/feed/Feed';
import ProfileRightbar from '../../components/profileRightbar/ProfileRightBar';

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const params = useParams();
  const username = params.username;

  useEffect(() => {
    const fetchUser = async() => {
      const response = await axios.get(`/users?username=${username}`);
      setUser(response.data);
    };
    fetchUser();
    document.title = username+"'s profile";
  },[username]);

  return (
    <React.Fragment>
      <Topbar/>
      <div className="profile">
        <Leftbar/>
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img 
                      className="profileCoverImg" 
                      src={
                        user.coverPicture
                          ? PF + "/" + user.coverPicture
                          : PF + "/person/noCover.jpg"
                      }
                      alt=""
                    />
                    <img 
                      className="profileUserImg" 
                      src={
                        user.profilePicture
                          ? user.profilePicture
                          : PF + "/person/noAvatar.png"
                      } 
                      alt="" 
                    />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.description}</span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed username={username}/>
                <div className="profileRightbar">
                    <div className="profileRightbarWrapper">
                      <ProfileRightbar user={user}/>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;