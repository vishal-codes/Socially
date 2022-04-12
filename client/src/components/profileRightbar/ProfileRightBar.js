import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Add, Remove, Edit } from "@mui/icons-material";

import "./ProfileRightBar.css";
import { AuthContext } from "../../context/AuthContext";
import { Follow, UnFollow } from "../../context/AuthActions";
import UpdateUserInfo from "../updateUserInfo/UpdateUserInfo";

function ProfileRightBar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followings, setFollowings] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id)
  );
  const [userInfoModal, setUserInfoModal] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?._id));
  }, [currentUser, user]);

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

  const followBtnClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch(UnFollow(user._id));
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch(Follow(user._id));
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  const toggleUserInfoModal = () => {
    setUserInfoModal(!userInfoModal);
  };

  return (
    <React.Fragment>
      <div>
        {user.username !== currentUser.username && (
          <button className="followButton" onClick={followBtnClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <div className="rightbarTitleWrapper">
          <h4 className="rightbarTitle">About {user.username}</h4>
          {user.username === currentUser.username && (
            <Edit onClick={toggleUserInfoModal} className="editUserInfoIcon" />
          )}
        </div>
        <div className="righbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Name :</span>
            <span className="rightbarInfoValue">{user.name}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City :</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From :</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship Status :</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                  ? "Married"
                  : "N/A"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">Following</h4>
        <div className="rightbarFollowings">
          {followings.map((following) => (
            <Link
              key={following._id}
              to={"/profile/" + following.username}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="rightbarFollowing">
                <img
                  className="rightbarFollowingImg"
                  src={
                    following.profilePicture
                      ? following.profilePicture
                      : PF + "/person/noAvatar.png"
                  }
                  alt=""
                />
                <span className="rightbarFollowingname">
                  {following.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {userInfoModal && (
        <UpdateUserInfo user={user} toggleUserInfoModal={toggleUserInfoModal} />
      )}
    </React.Fragment>
  );
}

export default ProfileRightBar;
