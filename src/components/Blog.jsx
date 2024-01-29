import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: '50%'
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    }

    const response = await blogService.putBlog(updatedBlog)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  const expandedForm = () => {
    return (
      <div>
        {blog.title} <br />
        {blog.url} <br />
        likes {blog.likes} <button onClick={handleLike}>like</button> <br />
        {blog.author}
      </div>
    )
  }

  const collapsedForm = () => {
    return (
      <div>
        {blog.title} {blog.author}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {isExpanded ? expandedForm() : collapsedForm()}
      <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'hide' : 'view'}</button>
    </div>
  )
}

export default Blog