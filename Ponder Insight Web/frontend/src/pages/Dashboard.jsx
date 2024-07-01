import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSideBar from '../components/DashSideBar.jsx';
import DashProfile from '../components/DashProfile.jsx';
import DashPost from '../components/DashPost.jsx';
import DashUsers from '../components/DashUsers.jsx';
import Analytics from '../components/Analytics.jsx';
import DashComments from '../components/DashComments.jsx';
import DsahboardComp from '../components/DsahboardComp.jsx';

export default function Dashboard() {

  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* SideBar */}
        <DashSideBar />
      </div>

      {/* Profile */}
      {tab === 'profile' && <DashProfile />}

      {/* Posts */}
      {tab === 'posts' && <DashPost />}

      {/* Users */}
      {tab === 'users' && <DashUsers />}

      {/* Analytics */}
      {tab === 'analytics' && <Analytics />}

      {/* Comments */}
      {tab === 'comments' && <DashComments />}

      {/* Dashboard */}
      {tab === 'dashboard' && <DsahboardComp />}


    </div>
  )
}
