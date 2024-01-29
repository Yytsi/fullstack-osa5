import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogCreation = ({ blogs, setBlogs, notifyWith, blogRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      notifyWith(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      notifyWith('error creating blog', 'error')
      console.log('creating a blog and got exception', exception)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogCreation.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  notifyWith: PropTypes.func.isRequired,
  blogRef: PropTypes.object.isRequired
}

export default BlogCreation