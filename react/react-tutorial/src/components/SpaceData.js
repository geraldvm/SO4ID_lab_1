import React from "react";
import { useEffect, useState } from "react";
import {IconContext} from "react-icons"
import {BsFillSquareFill,BsFillXSquareFill} from "react-icons/bs"
import { postSpacesData } from "../services/spaceDataService";
class SpaceData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {description: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({description: event.target.description});
  }

  handleSubmit(event) {
    alert('A space was submitted: ' + this.state.description);
    event.preventDefault();
    const data = await postSpacesData(this.state.description);
            
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.description} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
  
}