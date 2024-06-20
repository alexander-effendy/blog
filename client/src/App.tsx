import { useMediaQuery } from '@mui/material';
import _default from '@mui/material/styles/identifier';
import { useState, useEffect } from 'react';
import { fetchPostsAPI, addPostAPI } from './api/PostAPI';
import './index.css'

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
      throw new Error(error);
    }
  }

  const addPost = async (newPost) => {
    try {
      await addPostAPI(newPost);
    } catch (error) {
      throw new Error(error);
    }
    setRefresh(!refresh);
  }

  return (
    <>
      <div className="w-screen h-screen bg-slate-500 text-5xl font-bold grid place-items-center">Yo</div>
    </>
  )
}

export default App
