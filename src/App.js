import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from './routes/'
import { HeaderComponent } from "./components/Header";

const App = ()=> {
  return (
    <Router>
      <HeaderComponent />
      <RoutesComponent/>
    </Router>
  )
}

export default App;
