const NewPost = ({ title, setTitle, body, setBody, handleSubmit }) => {
  return (
    <main className='NewPost'>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input 
            type="text"
            id="postTitle"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postBody">Body:</label>
        <textarea 
            id="postBody"
            required
            value={body}
            onChange ={(e) => setBody(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>
    </main>
  )
}

export default NewPost
