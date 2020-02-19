import React, { Component } from 'react'
import TaskList from './TaskList'

const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed']

class TasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewCardForm: false,
      title: '',
      description: ''
    }
  }
  renderTaskLists() {
    const { tasks } = this.props
    return TASK_STATUSES.map(status => {
      const statusTasks = tasks.filter(task => task.status === status)
      return <TaskList key={status} status={status} tasks={statusTasks} onChangeStatus={this.props.onChangeStatus} />
    })
  }
  toggleForm = () => {
    this.setState({
      showNewCardForm: !this.state.showNewCardForm
    })
  }
  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  resetForm() {
    this.setState({
      showNewCardForm: false,
      title: '',
      description: ''
    })
  }

  onCreateTask = (e) => {
    const { title, description } = this.state;
    e.preventDefault();
    this.props.onCreateTask({
      title,
      description
    })
    this.resetForm();
  }

  render() {
    const { showNewCardForm, title, description } = this.state;
    if (this.props.isLoading) {
      return (
        <div className="tasks-loading">
          Loading...
        </div>
      )
    }
    return (<div className="tasks-list">
      <div className="task-list-header">
        <button className="button button-default" onClick={this.toggleForm}>
          + New task
      </button>
      </div>
      {
        showNewCardForm && (
          <form onSubmit={this.onCreateTask} className='task-list-form'>
            <input type="text" className="full-width-input" value={title} placeholder='title' onChange={this.onInputChange} name='title' />
            <input type="text" className="full-width-input" value={description} placeholder='description' onChange={this.onInputChange} name='description' />
            <button className="button" type='submit'>Save</button>
          </form>
        )
      }
      <div className="task­-lists">
        {this.renderTaskLists()}
      </div>
    </div>)
  }
} export default TasksPage