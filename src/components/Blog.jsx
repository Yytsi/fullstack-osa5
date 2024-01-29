import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, showRemoveButton }) => {
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

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    }
  }

  const expandedForm = () => {
    return (
      <div>
        {blog.title} <br />
        {blog.url} <br />
        likes {blog.likes} <button onClick={handleLike}>like</button> <br />
        {blog.author}
        {showRemoveButton && <button onClick={handleRemove}>remove</button>}
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  showRemoveButton: PropTypes.bool.isRequired
}

export default Blog