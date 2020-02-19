import React, { Component } from 'react';
import './App.css';
import TasksPage from './components/TaskPage';
import { connect } from 'react-redux';
import { createTask, editTask, fetchTasks } from './actions'
import FlashMessage from './components/FlashMessage'
class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks())
  }
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }))
  }
  onChangeStatus = (id, status) => {
    this.props.dispatch(editTask(id, { status }))
  }
  render() {
    console.log('props from App: ', this.props)
    return (
      <div className="main-content">
        {
          this.props.error && <FlashMessage message={this.props.error} />
        }
        <TasksPage
          tasks={this.props.tasks}
          onCreateTask={this.onCreateTask}
          onChangeStatus={this.onChangeStatus}
          isLoading={this.props.isLoading}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, isLoading, error } = state.tasks;
  return {
    tasks,
    isLoading,
    error
  }
}

export default connect(mapStateToProps)(App);
