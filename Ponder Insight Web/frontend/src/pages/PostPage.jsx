import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {

  const { postSlug } = useParams();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {

    const fetchPosts = async () => {
      try {

        setloading(true);
        const res = await fetch(`/api/v1/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setloading(false);
          return;
        };

        if (res.ok) {
          setPost(data.posts[0]);
          setloading(false);
          setError(false);
        };


      } catch (error) {
        setError(true);
        setloading(false);
      };
    };

    fetchPosts();

  }, [postSlug]);


  useEffect(() => {

    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/v1/post/getposts?limit=3`);
        const data = await res.json();

        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {

      }
    }

    fetchRecentPosts();

  }, [])



  if (loading) return (

    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl' />
    </div>
  )

  return <main className='p-3 flex flex-col max-w-full mx-auto min-h-screen'>
    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>

    <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
      <Button color='gray' pill size='xs'>
        {post && post.category}
      </Button>
    </Link>

    <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-auto object-cover' />

    <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
      <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
      <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
    </div>

    <div className='p-3 max-w-2xl mx-auto w-full text-justify post-content' dangerouslySetInnerHTML={{ __html: post && post.content }}>

    </div>

    <div className='mx-4xl mx-auto w-auto'>
      <CallToAction />
    </div>

    <CommentSection postId={post._id} />

    <div className='w-full flex justify-center items-center flex-col mb-5'>
      <h1 className='text-xl mt-5'>Recent Blogs</h1>
      <div className='flex flex-wrap gap-5 mt-5 justify-center  w-full'>
        {
          recentPosts &&
          recentPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        }
      </div>
    </div>

  </main>
}
