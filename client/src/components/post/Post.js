import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MoreVert, Delete, Edit} from '@mui/icons-material';
import axios from 'axios';
import { format } from 'timeago.js';
import { deleteFile } from '../../apiCalls';

import './Post.css';
import { AuthContext } from './../../context/AuthContext';
import UpdatePost from '../updatePost/UpdatePost';

function Post({ post, username }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const [updatePost, setUpdatePost] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async() => {
          const response = await axios.get(`/users?userId=${post.userId}`);
          setUser(response.data);
        };
        fetchUser();
      },[post.userId]);
    
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    },[currentUser._id, post.likes]);

    const likeHandler = () => {
        try{
            axios.put("/posts/"+post._id+"/like/",{userId:currentUser._id});
        }catch(error){
            console.log(error);
        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
    }

    const deletePost = async () => {
        try{
            if(post.fileName){
                await deleteFile(`/images/${post.fileName}`);
            }
            await axios.delete("/posts/"+post._id);
            alert("Post deleted succesfully");
            window.location.reload();
        }catch(error){
            console.log(error);
        }
    }

    const updatePostClick = () => {
        setUpdatePost(!updatePost);
    }

    return (
        <React.Fragment>
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img 
                                className="postProfileImg" 
                                src={
                                    user.profilePicture
                                    ? user.profilePicture
                                    : PF+"/person/noAvatar.png"} 
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">
                            {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        { 
                            username === currentUser.username 
                                ? <span>
                                    <span title="Edit Post" >
                                        <Edit className="postOptions" onClick={updatePostClick} /> 
                                    </span>
                                    <span title="Delete Post">
                                        <Delete className="postOptions" onClick={deletePost} /> 
                                    </span>
                                  </span>
                                : <MoreVert/>
                        }
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {post?.description}
                    </span>
                    <img className="postImg" src={post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img 
                            className="reactIcon" 
                            src={`${PF}/like.png`} 
                            onClick={likeHandler} 
                            alt="" 
                        />
                        <img 
                            className="reactIcon" 
                            src={`${PF}/heart.png`} 
                            onClick={likeHandler} 
                            alt="" 
                        />
                        <span className="postReactionCounter">
                            {like}
                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span 
                            className="postCommentText"
                        >
                            {post.comment} comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
        {updatePost &&
            <UpdatePost post={post} setUpdatePost={setUpdatePost} />
        }
        </React.Fragment>
    );
}

export default Post;