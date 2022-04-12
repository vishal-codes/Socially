import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './UpdateUserInfo.css';
import UpdateProfilePicture from './UpdateProfilePicture';
import {
    UpdateName,
    UpdateCity,
    UpdateFrom,
    UpdateStatus,
    UpdateRelationship,
    UpdateUserProfilePicture
}
    from '../../context/AuthActions';
import { AuthContext } from '../../context/AuthContext';

function UpdateUserInfo({ user, toggleUserInfoModal }) {

    const { user: currentUser, dispatch } = useContext(AuthContext);

    const [name, setName] = useState(currentUser.name);
    const [city, setCity] = useState(currentUser.city);
    const [from, setFrom] = useState(currentUser.from);
    const [status, setStatus] = useState(currentUser.description);
    const [dropDownValue, setDropDwonValue] = useState(currentUser.relationship);
    const [profilePicture, setProfilePicture] = useState(currentUser.profilePicture);

    const removeUserProfilePicture = (event) => {
        event.preventDefault();
        setProfilePicture("");
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    const handleFromChange = (event) => {
        setFrom(event.target.value)
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    const updateInfoClick = async (event) => {
        event.preventDefault();
        if (currentUser.name === name
            && currentUser.city === city
            && currentUser.from === from
            && currentUser.relationship === dropDownValue
            && currentUser.description === status
            && currentUser.profilePicture === profilePicture
        ) {
            alert("Please update atleast one field");
            return false;
        }
        const updateUserInfo = {
            userId: currentUser._id,
            profilePicture: profilePicture,
            name: name,
            city: city,
            from: from,
            relationship: dropDownValue,
            description: status
        }
        try {
            await axios.put("/users/" + user._id, updateUserInfo)
            dispatch(UpdateName(name));
            dispatch(UpdateCity(city));
            dispatch(UpdateFrom(from));
            dispatch(UpdateUserProfilePicture(profilePicture));
            dispatch(UpdateRelationship(dropDownValue));
            dispatch(UpdateStatus(status));
            toggleUserInfoModal();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return ReactDOM.createPortal(
        <div onClick={toggleUserInfoModal} className="updateUserInfoContainer">
            <form className="updateUserInfoBox" onClick={(e) => e.stopPropagation()}>

                <UpdateProfilePicture
                    setProfilePicture={setProfilePicture}
                    removeUserProfilePicture={removeUserProfilePicture}
                    profilePicture={profilePicture}
                />

                <div style={{ "height": "55px", "marginTop" :"40px" }}>
                    <label className="userInfoStatusLabel" >Name </label>
                    <input
                        required
                        value={name}
                        onChange={handleNameChange}
                        type="text"
                        className="updateUserInfoInput"
                    />
                </div>

                <div style={{ "height": "55px" }}>
                    <label className="userInfoStatusLabel" >Status</label>
                    <input
                        required
                        value={status}
                        onChange={handleStatusChange}
                        type="text"
                        className="updateUserInfoInput"
                    />
                </div>

                <div style={{ "height": "55px" }}>
                    <label className="userInfoCityLabel" >City</label>
                    <input
                        value={city}
                        onChange={handleCityChange}
                        required
                        type="text"
                        className="updateUserInfoInput"
                    />
                </div>

                <div style={{ "height": "55px" }}>
                    <label className="userInfoFromLabel" >From</label>
                    <input
                        required
                        value={from}
                        onChange={handleFromChange}
                        type="text"
                        className="updateUserInfoInput"
                    />
                </div>

                <div style={{ "height": "55px" }}>
                    <label className="userInfoFromLabel" >Relationship status</label>
                    <select onChange={(e) => setDropDwonValue(e.target.value)} defaultValue={currentUser.relationship} className="form-control">
                        <option value="2">Married</option>
                        <option value="1">Single</option>
                        <option value="3">-</option>
                    </select>
                </div>

                <div className="updateUserInfoBtnWrapper">
                    <button onClick={updateInfoClick} className="updateUserInfoButton" type="submit">
                        Save
                    </button>
                    <button onClick={toggleUserInfoModal} className="updateCancelButton">
                        Cancel
                    </button>
                </div>
            </form>
        </div>,
        document.querySelector('#updateUserInfo')
    );
}

export default UpdateUserInfo;