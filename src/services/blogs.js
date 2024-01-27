import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getAllForUser = (user) => {
  return getAll().then(blogs => {
    console.log("user at getAllForUser", user)
    console.log("blogs at getAllForUser", blogs)
    return blogs.filter(blog => blog.user.username === user.username)
  })
}

const create = async (newBlog) => {
  console.log("user from storage inside create", JSON.parse(localStorage.getItem('loggedBlogAppUser')))
  const config = {
    headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}` }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, getAllForUser, create }