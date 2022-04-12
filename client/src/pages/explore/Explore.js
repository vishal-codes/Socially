import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Explore.css';
import Topbar from '../../components/topbar/Topbar';
import Leftbar from '../../components/leftbar/Leftbar';

function Explore() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get("/users/all");
                setAllUsers(response.data);
            } catch (error) {
                console.log("error lol xd ", error);
            }
        }
        getAllUsers();
    }, []);

    return (
        <div>
            <Topbar />
            <div className="exploreContainer">
                <Leftbar />
                <div className="exploreRight">
                    <div className="profileRightTopText">
                        Make new Friends
                    </div>
                    <hr className="exploreHr" />
                    <div className="allUsersContainer">
                        {allUsers.map((user) =>
                            <Link
                                key={user._id}
                                to={"/profile/" + user.username}
                                style={{ textDecoration: "none", color: "white" }}
                            >
                                <div className="individualUser">
                                    <img
                                        className="individualUserImg"
                                        src={
                                            user.profilePicture
                                                ? user.profilePicture
                                                : PF + "/person/noAvatar.png"
                                        }
                                        alt=""
                                    />
                                    <div className="individualUserInfo">
                                        <span className="individualUserInfoKey">Name : </span>
                                        <span >{user.name}</span>
                                        <br/>
                                        <br/>
                                        <span className="individualUserInfoKey">Status : </span>
                                        <span >{user.description}</span>
                                        <br/>
                                        <br/>
                                        <span className="individualUserInfoKey">Relationship : </span>
                                        <span >
                                            {user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "N/A" }
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Explore;