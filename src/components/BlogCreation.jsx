import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogCreation = ({ blogs, setBlogs, notifyWith }) => {
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

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      notifyWith(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      notifyWith('error creating blog', 'error')
      console.log("creating a blog and got exception", exception)
    }
  }

  return (
    <div>
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

export default BlogCreation