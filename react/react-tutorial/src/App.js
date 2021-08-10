import './App.scss';
import React from 'react';
import { Reservations } from './components/reservations'
import { Spaces } from './components/spaces'
import { Navigation } from './components/navigation';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
          <Switch>
            <Route path="/reservations" exact component={Reservations} />
            <Route path="/spaces" exact component={Spaces} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}