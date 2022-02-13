import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from './routes/'
import { HeaderComponent } from "./components/Header";
import { ModalContextProvider } from "./context/Modal";
import { PostContextProvider } from "./context/Posts";

export default function App() {
  return (
    <Router>
      <ModalContextProvider>
        <PostContextProvider>
          <HeaderComponent />
          <RoutesComponent />
        </PostContextProvider>
      </ModalContextProvider>
    </Router>
  )
};