import React, { Component } from 'react';
import  Main  from './components/MainComponent'
class App extends Component { 

  render(){
    return (
      <div className="App">
        {/* This is a example of how to lift-states-up among various component */}
        <Main/>
      </div>
    );
  }
}

export default App;
