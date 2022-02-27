import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const EditPost = ({
  editTitle,setEditTitle,editBody,setEditBody,posts,handleEdit
}) => {
  const {id} = useParams()
  const post = posts.find(post => post.id.toString() === id)
  useEffect(()=>{
    if(post){
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  },[post,setEditBody,setEditTitle])
  return (
    <main className='NewPost'>
      {post ? 
        <>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input 
                type="text"
                id="postTitle"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Body:</label>
            <textarea 
                id="postBody"
                required
                value={editBody}
                onChange ={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>Edit Post</button>
          </form>
        </> :
        <>
          <h2>Page not found !!</h2>
          <p>Well , that's disappointing</p>
          <Link to='/'>
            <p>Go to Homepage</p>
          </Link>
        </> 
      }
    </main>
  )
}

export default EditPost
