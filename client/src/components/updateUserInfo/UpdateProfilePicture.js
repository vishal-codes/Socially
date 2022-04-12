import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

import { uploadFileWithProgress } from '../../apiCalls';

const UpdateProfilePicture = ({ profilePicture, setProfilePicture, removeUserProfilePicture }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [updateProfileImgProgress, setupdateProfileImgProgress] = useState(false);

    useEffect(() => {
        const uploadProfilePicture = async () => {
            const name = Date.now() + file.name;
            try {
                const url = await uploadFileWithProgress(
                    file,
                    "profilePicture",
                    name,
                    setProgress
                );
                setProfilePicture(url);
                setTimeout(() => {
                    document.querySelector('.updateProfileImg').style.filter = "grayscale(0)";
                    setProgress(100);
                },1000)
            } catch (error) {
                console.log(error);
            }
        };
        if(file){
            document.querySelector('.userInfoImgBtnWrapper').style.marginLeft = "10px";
            setupdateProfileImgProgress(!updateProfileImgProgress);
            document.querySelector('.updateProfileImg').style.filter = "grayscale(80%)";
            uploadProfilePicture();
        }
    }, [file])
    
    return (
        <div className="userInfoImgWrapper">
            <img 
                className="updateProfileImg" 
                src={
                    profilePicture
                    ? profilePicture
                    : PF + "/person/noAvatar.png"
                } 
                alt="" 
            />
            {updateProfileImgProgress && (
                <CircularProgress 
                    className="updateProfileImgProgress"
                    sx={{
                        marginTop: '25px'
                    }}
                    size={160}
                    thickness={1.5}
                    variant="determinate" 
                    value={progress} 
                />
            )}
            <div className="userInfoImgBtnWrapper">
                <button onClick={removeUserProfilePicture} className="userInfoRemoveImgBtn">Remove </button>
                <label htmlFor="file1" className="userInfoImgBtn">Upload New</label>
                <input
                    style={{ display: "none" }}
                    type="file"
                    id="file1"
                    accept=".png,.jpeg,.jpg"
                    onChange={(event) => setFile(event.target.files[0])}
                />
            </div>
        </div>
    );
}

export default UpdateProfilePicture;
