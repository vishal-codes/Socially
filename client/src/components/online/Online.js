import './Online.css';

function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriend">
            <div className="righbarProfileImgContainer">
                <img 
                className="righbarProfileImg" 
                src={
                    user.profilePicture
                      ? user.profilePicture
                      : PF + "/person/noAvatar.png"
                }
                alt="" 
                />
                <span className="rightBarOnline"></span>
            </div>
            <span className="rightbarUsername">
                {user.name}
            </span>
        </li>        
    );
}

export default Online;