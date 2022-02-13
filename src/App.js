import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from './routes/'
import { HeaderComponent } from "./components/Header";
import { ModalContextProvider } from "./context/Modal";
import { PostContextProvider } from "./context/Posts";
import { UserContextProvider } from "./context/Users";

export default function App() {

  return (
    <Router>
      <HeaderComponent />
      <ModalContextProvider>
        <UserContextProvider>
          <PostContextProvider>
            <RoutesComponent />
          </PostContextProvider>
        </UserContextProvider>
      </ModalContextProvider>
    </Router>
  )
};