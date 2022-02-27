import Home from './components/Home'
import NewPost from './components/NewPost'
import PostPage from './components/PostPage'
import About from './components/About'
import Missing from './components/Missing'
import EditPost from './components/EditPost'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import { format } from 'date-fns'
import api from './api/posts'
import useWindowSize from './Hooks/useWindowSize'
import useAxiosFetch from './Hooks/useAxiosFetch'



function App() {
  //Declaring my states
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [searchResults, setSearchResults] = useState([]) 
  const {width} = useWindowSize()
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')
  
  //useEffect declarations

  //Fetch posts
  useEffect(()=>{
    setPosts(data)
  },[data])

  //Filtre Search
  useEffect(() => {
    const flitredPosts = posts.filter(
      (post) =>
        ((post.title).toLowerCase()).includes(search.toLowerCase()) ||
        ((post.body).toLowerCase()).includes(search.toLowerCase())
    )
    setSearchResults(flitredPosts.reverse())
  }, [posts,search])

  const navigate = useNavigate()
  const handleSubmit =async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp ')
    const myNewPost = { id, title, datetime, body }
    try {
      const response = await api.post('/posts', myNewPost)
      const postsList = [...posts, response.data]
      setPosts(postsList)
      setTitle('')
      setBody('')
      navigate('/')
    } catch (error) {
      if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }else{
        console.log(error.message)
      }
    }
  }
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp ')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.put(`posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? {...response.data} : post))
      setEditBody('')
      setEditTitle('')
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter((post) => post.id !== id)
      setPosts(postsList)
      navigate('/')
    } catch (error) {
      if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }else{
        console.log(error.message)
      }
    }
    
  }
  
  return (
    <Routes>
      <Route
        path='/'
        element={<Layout width={width} search={search} setSearch={setSearch} />}>
        <Route index element={<Home posts={searchResults} isLoading={isLoading} fetchError={fetchError}/>} />
        <Route path='post'>
          <Route
            index
            element={
              <NewPost
                title={title}
                setTitle={setTitle}
                body={body}
                setBody={setBody}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route
            path='/post/:id'
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route path='/edit/:id' element={
          <EditPost 
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />
        }/>
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
