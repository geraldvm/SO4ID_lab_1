import logo from './logo.svg';
import './App.css';
import React from 'react';

export class App extends React.Component {
  constructor()  {
    super();
    this.state = {
      counter: 0
    }
  }
  
  componentDidMount() {
    this.interval = setInterval(() => {
      const newCounter = this.state.counter + 1;
      this.setState({
        counter: newCounter
      })
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello World!
          </p>
          { this.state.counter }
        </header>
      </div>
    );
  }
}