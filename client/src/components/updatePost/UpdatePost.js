import React, {useState, useContext, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { PermMedia, EmojiEmotions, Cancel} from '@mui/icons-material';
import { LinearProgress } from '@mui/material';

import './UpdatePost.css';
import { AuthContext } from '../../context/AuthContext';
import { uploadFileWithProgress, deleteFile } from '../../apiCalls';

function UpdatePost({ post, setUpdatePost }) {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [oldFile, setOldFile] = useState(post.img);
    const [updateFile, setUpdateFile] = useState(null);
    const [updatedFileName, setUpdatedFileName] = useState("");
    const [imageURL, setImageURL] = useState(post.img);
    const [updateDescription, setUpdateDescription] = useState(post.description);
    const [progress, setProgress] = useState(0);
    const [emojiKeyboard, setEmojisKeyboard] = useState(false);
    const [updateImgProgressBar, setUpdateImgProgressBar] = useState(false);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        const uploadImage = async () => {
            const name = Date.now() + updateFile.name;
            setUpdatedFileName(name);
            try {
                const url = await uploadFileWithProgress(
                    updateFile,
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
        if(updateFile){
            uploadImage();
        }
    }, [updateFile]);

    const updatePostClicked = async(event) => {
        event.preventDefault();

        if(emojiKeyboard){
            setEmojisKeyboard(!emojiKeyboard);
        }

        if(post.fileName && flag){
            await deleteFile(`/images/${post.fileName}`);
        }

        if(flag || updatedFileName !== "" || (updateDescription !== post.description)){
            const updatePost = {
                userId: user._id,
                description: updateDescription,
                img: flag && updateFile === null ? "" : imageURL,
                fileName: updatedFileName
            }
            try {
                await axios.put("/posts/" + post._id, updatePost, {userId: user._id});
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }else {
            alert("Cannot update an unedited post.");
        }
    }

    const deleteNewImg = async () => {
        console.log(updatedFileName);
        try{
            await deleteFile(`/images/${updatedFileName}`);
            setUpdateFile(null);    
        }catch(error){
            console.log(error);
        }
    }

    const closeUpdatePost = () => {
        setUpdatePost(false);
        setProgress(0);
        if(updateFile){
            deleteNewImg();
        }
    };

    const handleKeyDown = (event) => {
        event.target.style.height = 'inherit';
        event.target.style.height = `${Math.min(event.target.scrollHeight, 200)}px`;
    }

    const handleInput = (event) => {
        setUpdateDescription(event.target.value);
    }

    const addEmoji = (event) => {
        let emoji = event.native;
        setUpdateDescription(updateDescription+emoji);
    };

    const emojiClick = () =>{
        setEmojisKeyboard(!emojiKeyboard);
    }

    return ReactDOM.createPortal(
        <div className="updatePostContainer" onClick={closeUpdatePost}>
            <div className="updatePost" onClick={(e) => e.stopPropagation()}>
                <div className="updatePostWrapper">
                    <div className="updatePostTop">
                        <img 
                            className="updatePostProfileImg" 
                            src={ 
                                user.profilePicture
                                ? user.profilePicture
                                : PF+"/person/noAvatar.png"
                            }
                            alt="" 
                        />
                        <textarea
                            placeholder="What's happening..." 
                            className="updatePostInput"
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                            value={updateDescription}
                        />                                
                    </div>
                    <hr className="updatePostHr"/>
                        {oldFile && (
                            <div className="updatePostImgContainer">
                                <img 
                                    className="updatePostImg" 
                                    src={oldFile}
                                    alt="" 
                                />
                                <Cancel
                                    title="Cancel"
                                    className="updatePostCancelImg"  
                                    onClick={() => { 
                                        setOldFile(null); 
                                        setFlag(true);
                                    }} 
                                />
                            </div>
                        )}
                        {updateFile && (
                            <div className="updatePostImgContainer">
                                <img 
                                    className="updatePostImg" 
                                    src={URL.createObjectURL(updateFile)}  
                                    alt="" 
                                />
                                <Cancel
                                    title="Cancel"
                                    className="updatePostCancelImg"  
                                    onClick={deleteNewImg} 
                                />
                            </div>
                        )}
                        {updateImgProgressBar && (
                            <LinearProgress
                                sx={{
                                    margin: '20px',
                                    marginBottom: '15px'
                                }}
                                variant="determinate" 
                                value={progress} 
                            />
                        )}
                    <form className="updatePostBottom" onSubmit={updatePostClicked}>
                        <div className="updatePostOptions">
                            <label htmlFor="updateFile" className="updatePostOption">
                                <PermMedia htmlColor="tomato" className="updatePostIcon" />
                                <span className="updatePostOptionText">Media</span>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="updateFile"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={
                                        (event) => {
                                            setUpdateFile(event.target.files[0]); 
                                            setUpdateImgProgressBar(!updateImgProgressBar);
                                        }
                                    }
                                />
                            </label>
                            <div onClick={emojiClick} className="updatePostOption">
                                <EmojiEmotions htmlColor="goldenrod" className="updatePostIcon" />
                                <span className="updatePostOptionText">Feelings</span>
                            </div>

                        </div>
                        <span>
                            <button className="cancelUpdatePostButton" onClick={closeUpdatePost}>Cancel</button>
                            <button className="updatePostButton" type="submit">Update</button>
                        </span>
                    </form>
                </div>
            {emojiKeyboard &&(
                <span>
                    <Picker 
                        native={true} 
                        onSelect={addEmoji} 
                        theme={"dark"}
                    />  
                </span>
            )}
            </div>
        </div>,
        document.querySelector('#updatePostContainer')
    );
}

export default UpdatePost;