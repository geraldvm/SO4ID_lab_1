import './App.css';
import React from 'react';
import { Reservations } from './components/reservations'
import { Navigation } from './components/navigation';
import { BrowserRouter } from 'react-router-dom';

export class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <Reservations />
        </div>
      </BrowserRouter>
    );
  }
}