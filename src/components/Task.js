import React from 'react';

const TASK_STATUES = [
  'Unstarted',
  'In Progress',
  'Completed'
]

const Task = props => {
  return (
    <div className="task">
      <div className="task-header">
        <div>
          {props.task.title}

          <select value={props.task.status} onChange={(e) => props.onChangeStatus(props.task.id, e.target.value)}>
            {
              TASK_STATUES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))
            }
          </select>
        </div>
      </div>
      <hr />
      <div className="task-body">
        {props.task.description}
      </div>
    </div>
  )
}

export default Task;