import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  handleSubmit(evt) {
    evt.preventDefault()

    fetch(`${process.env.REACT_APP_API}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: document.getElementById('email').value
      })
    })
    .then((results) => {
      console.log(results)
    })
    .catch((err) => {
      console.error(err)
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={this.handleSubmit}>
        	<input id="email" type="email" />
        	<button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
