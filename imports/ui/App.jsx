import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';
 
import Task from './Task.jsx';
 
// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit : false
        }
    }

    getValues() {
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        const description = ReactDOM.findDOMNode(this.refs.description).value.trim();

        return {
            text: text,
            description: description
        }
    }

    clearDom() {
        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
        ReactDOM.findDOMNode(this.refs.description).value = '';
    }

handleSubmit(event) {
    event.preventDefault();
    let values = this.getValues()
    
   

    if(this.state.isEdit) {
          Tasks.update({_id: this.state.editing},{$set:{
          ...values,
          updatedAt: new Date()
      }});

      this.setState({
          editing:null,
          isEdit: false
      })

    } else {
        Tasks.insert({
      ...values,
      createdAt: new Date(), // current time
      updatedAt: new Date()
    });
    }
 
    this.clearDom()
 
    
 
    
  }

  performEditAction(taskId) {
   
      this.setState({
          isEdit: true,
          editing: taskId
      })

      let task = Tasks.findOne(taskId)

      ReactDOM.findDOMNode(this.refs.textInput).value = task.text;
      ReactDOM.findDOMNode(this.refs.description).value = task.description;

  }

  performDeleteAction(taskId) {
      Tasks.remove({_id: taskId})
  }
  
 
  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task 
      doEdit={()=> this.performEditAction(task._id)}
      delete={()=> this.performDeleteAction(task._id)}
      key={task._id} 
      task={task} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Task List</h1>
          <form className="new-task" >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
            <br />
            <input 
            type="text"
            ref="description"
            placeholder="Type task description in broad"
            />
            <button type="submit" onClick={this.handleSubmit.bind(this)}>{this.state.isEdit ? 'Edit task': 'Insert task'}</button>
          </form>
        </header>
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);