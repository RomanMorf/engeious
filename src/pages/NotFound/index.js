import React from 'react';
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>Page not found... </h1>
      <NavLink to="/">Go to the main page</NavLink>
    </div>
  )
}

export default NotFound;