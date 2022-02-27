const Footer = () => {
  const date= new Date().getFullYear()
  return (
    <footer className="Footer">
      <p> {date} &copy; copyright Nissaycode</p>
    </footer>
  )
}

export default Footer
