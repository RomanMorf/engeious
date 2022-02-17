import React from "react";
import { Routes, Route} from "react-router-dom";

import Home from '../pages/Home'
import Users from '../pages/Users'
import NotFound from '../pages/NotFound'

function RoutesComponent() {
  return (
    <Routes>
      <Route exact path="/engeious/" element={<Home />} />
      <Route path="/engeious/users" element={<Users />}/>
      <Route path="/engeious/*" element={<NotFound />}/>
      <Route path="/*" element={<NotFound />}/>
    </Routes>
  )
}

export default RoutesComponent;