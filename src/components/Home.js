import Feed from './Feed'
const Home = ({ posts,isLoading,fetchError }) => {
  return (
    <main className='Home'>
      <h1>Feed</h1>
      {isLoading && <p style={{margingTop: '2rem'}}>Loading posts ... </p>}
      {fetchError && !isLoading && <p style={{
        marginTop:'2rem',
        color:'red'
      }}>{fetchError}</p>}
      {!fetchError && !isLoading &&(
        posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p
            style={{
              marginTop: '2rem',
              color: 'red',
            }}>
            No posts to show
          </p>
        )
      )}
      
    </main>
  )
}

export default Home
