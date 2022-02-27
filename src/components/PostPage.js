import { useParams, Link } from 'react-router-dom'

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams()
  const post = posts.find((post) => post.id.toString() === id)
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && (
          <>
            <h2>{post.title}</h2>
            <span className='postDate'>{post.datetime}</span>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`} ><button className="btnEdit">Edit Post</button></Link>
            <button type='button' className='btnDelete' onClick={() => handleDelete(post.id)}>
              Delete
            </button>

          </>
        )}
        {!post && (
          <>
            <h2>Post not found !!</h2>
            <p>Well , that's disappointing</p>
            <Link to='/'>
              <p>Go to Homepage</p>
            </Link>
          </>
        )}
      </article>
    </main>
  )
}

export default PostPage
