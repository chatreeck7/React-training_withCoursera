import React, { Component } from 'react';
import './App.css'
import  Main  from './components/MainComponent'
import { BrowserRouter } from 'react-router-dom';
class App extends Component { 

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          {/* This is a example of how to lift-states-up among various component */}
          <Main/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
