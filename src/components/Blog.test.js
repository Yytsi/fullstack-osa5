
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog component', async () => {
  const blog = {
    title: 'My blog title',
    user: {
      username: 'user'
    },
    url: 'hereurl',
    likes: 142
  }

  render(<Blog blog={blog} showRemoveButton={true} setBlogs={() => {}}/>)

  expect(screen.getByText('My blog title')).toBeInTheDocument()
  const url = screen.queryByText('hereurl')
  expect(url).toBeNull()
  const likes = screen.queryByText('likes 142')
  expect(likes).toBeNull()
})