import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import './Rightbar.css';
import Online from '../online/Online';

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const getFollowings = async () => {
      try {
        const response = await axios.get("/users/followings/" + user._id);
        setFollowings(response.data);
      } catch (error) {
        console.log("error lol xd ", error);
      }
    };
    getFollowings();
  }, [user]);

  const renderGreeting = () => {
    var today = new Date()
    var currrentHr = today.getHours()
    if (currrentHr < 12) {
      return(
        <>
          <span className="greetingEmoji">
            {" 🌄  "}
          </span>
          <span className="greetingText">
            {" Good Morning " + user.name}
          </span>
        </>
      );
    } else if (currrentHr < 18) {
      return(
        <>
          <span className="greetingEmoji">
            {" ☀️  "}
          </span>
          <span className="greetingText">
            {" Good Afternoon " + user.name}
          </span>
        </>
      );
    } else {
      return(
        <>
          <span className="greetingEmoji">
            {" 🌃  "}
          </span>
          <span className="greetingText">
            {"  Good Evening " + user.name}
          </span>
        </>
      );
    }
  }

  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
          <div className="greetingContainer">
            {renderGreeting()}
          </div>
          <h4 className="rightbarTitle">
            Online Friends
          </h4>
          <ul className="righbarFriendList">
              {followings.map( (following) =>(
                <Link
                  key={following._id}
                  to={"/profile/" + following.username}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Online key = {following.id} user = {following} />
                </Link>
              ))}
          </ul>
          <img className="rightbarAd" src={`${PF}/giphy.gif`} alt="" />
          <p style={{marginTop: 0}}>Ad</p>
          </div>
    </div>
  );
}

export default Rightbar;