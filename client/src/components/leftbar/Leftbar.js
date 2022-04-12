import { 
    Bookmark,
    ChatSharp,
    Event,
    Group,
    HelpOutline,
    PlayCircleFilledOutlined,
    RssFeed, 
    School, 
    WorkOutline 
} from '@mui/icons-material';
import { Link } from "react-router-dom";

import { Users } from '../../dummyData';
import CloseFriends from '../closeFriends/CloseFriends';

import './Leftbar.css';

function Leftbar() {
  return (
    <div className="leftbar">
        <div className="leftbarWrapper">
            <ul className="leftbarList">
                <li className="leftbarListItem">
                    <RssFeed className="leftbarListIcon" />
                    <span className="leftbarListItemText">
                        Feed
                    </span>
                </li>
                <li className="leftbarListItem">
                    <ChatSharp className="leftbarListIcon" />
                    <span className="leftbarListItemText">
                        Chats
                    </span>
                </li>
                <li className="leftbarListItem">
                    <PlayCircleFilledOutlined className="leftbarListIcon" />
                    <span className="leftbarListItemText">
                        Videos
                    </span>
                </li>
                <li className="leftbarListItem">
                    <Group className="leftbarListIcon" />
                    <span className="leftbarListItemText">
                        Groups
                    </span>
                </li>
                <li className="leftbarListItem">
                    <Bookmark className="leftbarListIcon" />
                    <span className="leftbarListItemText">
                        Bookmarks
                    </span>
                </li>
                <li className="leftbarListItem">
                    <HelpOutline className="leftbarListIcon" />
                    <span className="leftbarListItemText">
                        Questions
                    </span>
                </li>
                <li className="leftbarListItem">
                    <WorkOutline className="leftbarListIcon" />
                    <span className="leftbarListItemText">
                        Jobs
                    </span>
                </li>
                <li className="leftbarListItem">
                    <Event className="leftbarListIcon" />
                    <span className="leftbarListItemText">
                        Events
                    </span>
                </li>
                <li className="leftbarListItem">
                    <School className="leftbarListIcon" />
                    <span className="leftbarListItemText">
                        Courses
                    </span>
                </li>
            </ul>
            <button className="leftbarButton">Show More</button>
            <hr className="leftbarHr"/>
            <p style={{marginBottom: "10px", fontSize: "18px"}}>Close Friends</p>
            <ul className="leftbarFriendList">
                { Users.map( (user) => 
                    <Link
                        key={user._id}
                        to={"/profile/" + user.username}
                        style={{ textDecoration: "none", color: "white" }}
                    >
                        <CloseFriends key={user.id} user={user}/>
                    </Link>
                )}
            </ul>
        </div>
    </div>
  );
}

export default Leftbar;