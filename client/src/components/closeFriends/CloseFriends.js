import './CloseFriends.css';

function CloseFriends({ user }) {
  
  return (
    <li className="leftbarFriend">
        <img src={user.profilePicture} alt="" className="leftbarFriendImg" />
        <span className="leftbarFriendname">{user.name}</span>
    </li>
  )
}

export default CloseFriends;