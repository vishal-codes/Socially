import { useEffect } from 'react';
import { PermMedia, EmojiEmotions, Cancel } from '@mui/icons-material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Picker } from 'emoji-mart';
import "emoji-mart/css/emoji-mart.css";
import { LinearProgress } from '@mui/material';

import { AuthContext } from '../../context/AuthContext';
import { uploadFileWithProgress, deleteFile } from '../../apiCalls';

import './Share.css';

function Share() {

    const { user } = useContext(AuthContext);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");
    const [progress, setProgress] = useState(0);
    const [imageURL, setImageURL] = useState("");
    const [emojiKeyboard, setEmojisKeyboard] = useState(false);
    const [shareImgProgressBar, setShareImgProgressBar] = useState(false);

    useEffect(() => {
        const uploadImage = async () => {
            const name = Date.now() + file.name;
            setFileName(name);
            try {
                const url = await uploadFileWithProgress(
                    file,
                    "images",
                    name,
                    setProgress
                );
                setImageURL(url);
                setTimeout(() => {
                    setProgress(100);
                },1000);
            } catch (error) {
                console.log(error);
            }
        };
        if(file){
            uploadImage();
        }
    }, [file]);

    const submitPost = async (event) => {
        event.preventDefault();

        if (emojiKeyboard) {
            setEmojisKeyboard(!emojiKeyboard);
        }

        if (file || description) {
            const newPost = {
                userId: user._id,
                description: description,
                img: imageURL,
                fileName: fileName
            }
            try {
                await axios.post("/posts", newPost)
                window.location.reload();
            } catch (error) {
                console.log(error);
            }

        }else {
            alert("Cannot share an empty post.");
        }
    }

    const deleteUploadedImage = async () => {
        console.log(fileName);
        setShareImgProgressBar(!shareImgProgressBar);
        await deleteFile(`/images/${fileName}`);
        setFile(null);
        setFileName("");
    }

    const handleKeyDown = (event) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${Math.min(event.target.scrollHeight, 200)}px`;
    }

    const handleInput = (event) => {
        setDescription(event.target.value);
    }

    const addEmoji = (event) => {
        let emoji = event.native;
        setDescription(description + emoji);
    };

    const emojiClick = () => {
        setEmojisKeyboard(!emojiKeyboard);
    }

    return (
        <React.Fragment>
            <div className="share">
                <div className="shareWrapper">
                    <div className="shareTop">
                        <img
                            className="shareProfileImg"
                            src={
                                user.profilePicture
                                    ? user.profilePicture
                                    : PF + "/person/noAvatar.png"
                            }
                            alt=""
                        />
                        <textarea
                            placeholder="What's happening..."
                            className="shareInput"
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                            value={description}
                        />
                    </div>
                    <hr className="shareHr" />
                    {file && (
                        <div className="shareImgContainer">
                            <img
                                className="shareImg"
                                src={URL.createObjectURL(file)}
                                alt=""
                            />
                            <Cancel
                                title="Cancel"
                                className="shareCancelImg"
                                onClick={deleteUploadedImage}
                            />
                        </div>
                    )}
                    {shareImgProgressBar && (
                        <LinearProgress
                            sx={{
                                margin: '20px',
                                marginBottom: '15px'
                            }}
                            variant="determinate" 
                            value={progress} 
                        />
                    )}
                    <form className="shareBottom" onSubmit={submitPost}>
                        <div className="shareOptions">
                            <label htmlFor="file" className="shareOption">
                                <PermMedia htmlColor="tomato" className="shareIcon" />
                                <span className="shareOptionText">Media</span>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={
                                        (event) =>{ 
                                            setFile(event.target.files[0]);
                                            setShareImgProgressBar(!shareImgProgressBar);
                                        }
                                    }
                                />
                            </label>
                            <div onClick={emojiClick} className="shareOption">
                                <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                                <span className="shareOptionText">Feelings</span>
                            </div>

                        </div>
                        <button className="shareButton" type="submit">Share</button>
                    </form>
                </div>
            </div>
            {emojiKeyboard && (
                <span>
                    <Picker
                        native={true}
                        onSelect={addEmoji}
                        theme={"dark"}
                    />
                </span>
            )}
        </React.Fragment>
    );
}

export default Share;