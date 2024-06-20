import { useMediaQuery } from '@mui/material';
import _default from '@mui/material/styles/identifier';
import { useState, useEffect } from 'react';
import { fetchPostsAPI, addPostAPI } from './api/PostAPI';
import './index.css'
import PropTypes from 'prop-types';

const SideBar = () => {
  const smallPage = useMediaQuery('(max-width:900px');

  return (
    <div className={`${smallPage ? 'hidden' : 'fixed w-[300px]'}`}>
      <div className="font-bold text-2xl">Blog Post</div>
      <div className="">Made by Alex :)</div>
    </div>
  )
}

function App() {
  const BlogFullWidth = useMediaQuery('(max-width:900px)');

  const [data, setData] = useState([]);
  const [editedId, setEditedId] = useState(-1);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const [refresh, setRefresh] = useState(false);

  const loadData = async () => {
    try {
      const posts = await fetchPostsAPI();
      setData(posts);
    } catch (error) {
      console.log(error);
    }
  }

  const addPost = async (newPost: any) => {
    try {
      await addPostAPI(newPost);
    } catch (error) {
      console.log(error);
    }
    setRefresh(!refresh);
  }

  useEffect(() => {      
    loadData();
  }, [refresh])

  const PostComponent = ({ post }) => {
    return (
      <div className="border-[1px] border-black rounded-lg p-4">
        <section className="flex justify-between">
          <div className="font-bold mb-5">{post.title}</div>
        </section>
        <div className="text-slate-500">{post.body}</div>
      </div>
    )
  }

  PostComponent.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }).isRequired,
  };

  const handleTitleChange = (event: any) => {
    setNewTitle(event.target.value);
  };

  const handleBodyChange = (event: any) => {
    setNewBody(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleAddPost = () => {
    console.log('adding post')
    const newPost = {
      title: newTitle,
      body: newBody
    }
    addPost(newPost);
  }

  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      {/* main context of the page */}
      <section className={`${BlogFullWidth ? 'ml-0' : 'ml-0'} px-[5%] md:px-[10%] pt-[50px] bg-yellow0-200 flex justify-between`}>
        <section>
          <div className="font-bold text-2xl text-black">blogpost</div>
          <div className="text-slate-500">Welcome to my blog post website, feel free to create, remove, edit, delete your post</div>
        </section>
        <button 
          className="bg-black text-white rounded-lg px-5 h-[40px] lg:text-[15px] text-[12px] hover:bg-slate-500"
          onClick={openModal}
        >
          Add new post</button>
      </section>

      {/* blog posts rendered here */}
      <section style={{ height: 'calc(100vh - 12rem)'}} className={`${BlogFullWidth ? 'ml-0' : 'ml-[300px]'} px-[5%] md:px-[10%] pb-[50px] flex-grow pt-0 overflow-y-auto flex flex-col gap-10 mt-10`}>
        {data.map((post, index) => (
          <PostComponent key={index} post={post} />
        ))}
      </section>

    </div>
  )
}

export default App
