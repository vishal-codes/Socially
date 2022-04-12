import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import './Home.css';
import Topbar from '../../components/topbar/Topbar';
import Leftbar from '../../components/leftbar/Leftbar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

function Home() {
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    document.title = user.name+" on socially";
  }, [user]);

  return (
    <React.Fragment>
      <Topbar/>
      <div className="homeContainer">
        <Leftbar/>
        <Feed/>
        <Rightbar user={user} />
      </div>
    </React.Fragment>
  );
}

export default Home;