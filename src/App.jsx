import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [infoMessage, setInfoMessage] = useState({ message: null, type: null })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    if (user === null) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    } else {
      blogService.getAllForUser(user).then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  const notifyWith = (message, type = 'info') => {
    setInfoMessage({ message, type })
    setTimeout(() => {
      setInfoMessage({ message: null, type: null })
    }, 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      notifyWith(`Welcome back ${user.name} !`)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('wrong credentials', 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification info={infoMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text"
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={() => {
        window.localStorage.removeItem('loggedBloglistUser')
        setUser(null)
      }}>logout</button>
      <Notification info={infoMessage} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App