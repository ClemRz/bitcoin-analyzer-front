// @flow

import * as React from 'react';
import Main from './components/main';
import Header from './components/header';
import Footer from './components/footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="contentWrap">
        <Header/>
        <Main/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
