import './App.css';
import { Editor } from './pages/Editor';
import { Home } from './pages/Home.jsx';
import { About } from './pages/About';
import { Header } from './cmps/Header';
import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Switch>
          <Route path="/editor" component={Editor} />
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
