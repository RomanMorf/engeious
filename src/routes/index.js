import React from "react";
import { Routes, Route} from "react-router-dom";

import Home from '../pages/Home'
import Users from '../pages/Users'
import NotFound from '../pages/NotFound'

function RoutesComponent() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/users" element={<Users />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}

export default RoutesComponent;