import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getAllForUser = (user) => {
  return getAll().then(blogs => {
    console.log("user", user)
    console.log("blogs", blogs)
    return blogs.filter(blog => blog.user.username === user.username)
  })
}

export default { getAll, getAllForUser }