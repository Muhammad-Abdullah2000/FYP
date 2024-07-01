import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSideBar() {

    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    const handleSignOut = async () => {

        try {
            const res = await fetch('/api/v1/user/signout', {
                method: 'POST'
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signOutSuccess());
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');

        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location]);

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1' >
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>

                    {currentUser.isAdmin && (

                        <>

                            <Link to='/dashboard?tab=dashboard'>
                                <Sidebar.Item active={tab === 'dashboard'} icon={HiChartPie} labelColor='dark' as='div'>
                                    DashBoard
                                </Sidebar.Item>
                            </Link>



                            <Link to='/dashboard?tab=posts'>
                                <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} labelColor='dark' as='div'>
                                    Posts
                                </Sidebar.Item>
                            </Link>

                            <Link to='/dashboard?tab=comments'>
                                <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} labelColor='dark' as='div'>
                                    Comments
                                </Sidebar.Item>
                            </Link>
                        </>
                    )}

                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=users'>
                            <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} labelColor='dark' as='div'>
                                users
                            </Sidebar.Item>
                        </Link>

                    )}

                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
