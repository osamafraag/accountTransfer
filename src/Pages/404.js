import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Error() {
  return (
    <div>
      <h1>404</h1>
      <br />
      <NavLink to="/"> &larr; Back To Home</NavLink>
    </div>
  )
}