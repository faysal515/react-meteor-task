import React, { Component, PropTypes } from 'react';
 
// Task component - represents a single todo item
export default class Task extends Component {
  render() {


    return (
        <span>
            <li>{`${this.props.task.text}, ${this.props.task.description}`}</li>
            <button type="button" onClick={this.props.doEdit}><i className="fa fa-pencil" aria-hidden="true">Edit</i></button>
            <button type="button" onClick={this.props.delete}><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
        </span>
      
    );
  }
}
 
Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};