import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from './routes/'
import { HeaderComponent } from "./components/Header";

export default function App() {
  return (
    <Router>
      <HeaderComponent />
      <RoutesComponent />
    </Router>
  )
};