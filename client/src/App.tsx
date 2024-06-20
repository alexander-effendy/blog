import { useMediaQuery } from '@mui/material';
import _default from '@mui/material/styles/identifier';
import { useState, useEffect } from 'react';
import { fetchPostsAPI, addPostAPI, editPostAPI, deletePostAPI } from './api/PostAPI';
import './index.css'
import PropTypes from 'prop-types';

import MyDialog from './assets/Modals/AddPostModal';
import EditDialog from './assets/Modals/EditPostModal';

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

  const editPost = async (newPost: any, postId: Number) => {
    try {
      await editPostAPI(newPost, postId);
    } catch (error) {
      console.error(error);
    }
    loadData();
  }

  const deletePost = async (postId: Number) => {
    try {
      await deletePostAPI(Number(postId));
      loadData();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {      
    loadData();
  }, [refresh])

  const PostComponent = ({ post }) => {
    return (
      <div className="border-[1px] border-black rounded-lg p-4">
        <section className="flex justify-between">
          <div className="font-bold mb-5">{post.title}</div>
            <section className="flex gap-2">
              <button className="h-[30px] my-auto border-black border-[1px] hover:bg-slate-100 text-black px-3 rounded-lg"
              onClick={() => {
                setEditedId(post.id);
                setNewTitle(post.title);
                setNewBody(post.body);
                openModal2();
              }}
            >
              Edit
            </button>

            <button className="h-[30px] my-auto border-black border-[1px] hover:bg-slate-100 text-black px-3 rounded-lg"
              onClick={() => deletePost(post.id)}
            >
              Delete
            </button>
          </section>
          
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

  const [isOpen2, setIsOpen2] = useState(false);

  const openModal2 = () => {
    setIsOpen2(true);
  }
  const closeModal2 = () => setIsOpen2(false);

  const handleAddPost = () => {
    console.log('adding post')
    const newPost = {
      title: newTitle,
      body: newBody
    }
    addPost(newPost);
  }

  const handleEditPost = (editedId: any) => {
    const newPost = {
      title: newTitle,
      body: newBody
    }
    console.log(editedId);

    editPost(newPost, editedId)
  }

  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      {/* modals */}
      <MyDialog isOpen={isOpen} openModal={openModal} closeModal={closeModal} handleTitleChange={handleTitleChange} handleBodyChange={handleBodyChange} handleAddPost={handleAddPost} />
      <EditDialog postId={editedId} postTitle={newTitle} postBody={newBody} isOpen={isOpen2} openModal={openModal2} closeModal={closeModal2} handleTitleChange={handleTitleChange} handleBodyChange={handleBodyChange} handleEditPost={handleEditPost} />

      {/* main context of the page */}
      <section className={`bg-slate-100 opacity-95 items-center px-[5%] md:px-[10%] pt-[20px] pb-[20px] flex justify-between`}>
        <section>
          <div className="font-bold text-2xl text-black">blogpost</div>
          <div className="text-slate-500">Welcome to my blog post website, feel free to create, remove, edit, delete your post</div>
        </section>
        <button 
          className="bg-black text-white rounded-lg px-5 h-[40px] lg:text-[15px] text-[12px] hover:bg-slate-500"
          onClick={openModal}
        >
          Add new post
        </button>
      </section>

      {/* blog posts rendered here */}
      <section style={{ height: 'calc(100vh - 12rem)'}} className={`${BlogFullWidth ? 'ml-0' : 'ml-[0px]'} px-[5%] md:px-[10%] pb-[50px] flex-grow pt-0 overflow-y-auto flex flex-col gap-10 mt-10`}>
        {data.map((post, index) => (
          <PostComponent key={index} post={post} />
        ))}
      </section>

    </div>
  )
}

export default App
