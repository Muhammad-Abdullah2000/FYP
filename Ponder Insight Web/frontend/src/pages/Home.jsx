import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';

export default function Home() {

  const [post, setPost] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {
      const res = await fetch('/api/v1/post/getposts');
      const data = await res.json();
      setPost(data.posts);
    };

    fetchPosts();

  }, [])


  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome To Ponder Insight</h1>
        <p className='text-gray-500 text-xs sm:text-sm text-justify'>
          Welcome to Ponder Insight, where words across the screen and ideas come to life. Here, we embark on a journey through the realms of imagination, knowledge, and creativity. Our virtual space is a sanctuary for expression, a canvas where thoughts find their voice and stories unfold.</p>

        <Link to={'/search'} className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
          View All Blogs
        </Link>
      </div>

      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>


      <div className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          post && post.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>Recent Blogs</h2>
              <div className='mt-5 flex items-center justify-center flex-wrap gap-5'>
                {post.map((pt) => (
                  <PostCard key={pt._id} post={pt} />
                ))}
              </div>
              <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>
                View All Blogs
              </Link>
            </div>
          )
        }
      </div>


    </div>
  )
}
