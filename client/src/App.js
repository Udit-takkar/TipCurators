import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import ViewArticle from "./pages/ViewArticle";
import Navbar from "./components/Navbar";
import SeePost from "./components/SeePost";

function App() {

  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/createpost" component={CreatePost} />
        <Route exact path="/view" component={ViewArticle} />
        <Route exact path="/post/:postId" component={SeePost} />
      </BrowserRouter>
    </div>
  );
}

export default App;
