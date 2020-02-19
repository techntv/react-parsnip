import * as api from '../api';
import { CALL_API } from '../middleware/api';

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED'
export const CREATE_TASK_STARTED = 'CREATE_TASK_STARTED';
export const CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED';
export const CREATE_TASK_FAILED = 'CREATE_TASK_FAILED'

export function fetchTasks() {
  return {
    [CALL_API]: {
      types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED],
      endpoint: '/tasks'
    }
  }
}

export function editTaskSucceeded(task) {
  return {
    type: 'EDIT_TASK_SUCCEEDED',
    payload: {
      task
    }
  }
}

export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    const task = getState().tasks.tasks.find(t => t.id === id);
    const updatedTask = {
      ...task,
      ...params
    }

    api.editTask(id, updatedTask).then(res => {
      dispatch(editTaskSucceeded(res.data))
    })
  }
}

// export function fetchTasksStarted() {
//   return {
//     type: 'FETCH_TASKS_STARTED'
//   }
// }

// export function fetchTasksSucceeded(tasks) {
//   return {
//     type: 'FETCH_TASKS_SUCCEEDED',
//     payload: {
//       tasks
//     }
//   }
// }

// export function fetchTaskFailed(error) {
//   return {
//     type: 'FETCH_TASKS_FAILED',
//     payload: {
//       error
//     }
//   }
// }

// export function fetchTasks() {
//   return dispatch => {
//     dispatch(fetchTasksStarted());

//     api.fetchTasks().then(res => {
//       setTimeout(() => {
//         dispatch(fetchTasksSucceeded(res.data))
//       }, 2000)
//     })
//       .catch(err => {
//         dispatch(fetchTaskFailed(err.message))
//       })
//   }
// }

// export function createTaskSucceeded(task) {
//   return {
//     type: 'CREATE_TASK_SUCCEEDED',
//     payload: {
//       task
//     },
//     meta: {
//       analytics: {
//         event: 'create_task',
//         data: {
//           id: task.id
//         }
//       }
//     }
//   }
// }

export function createTask({ title, description, status = 'Unstarted' }) {
  return {
    [CALL_API]: {
      types: [CREATE_TASK_STARTED, CREATE_TASK_SUCCEEDED, CREATE_TASK_FAILED],
      endpoint: '/tasks',
      method: 'POST',
      body: {
        title,
        description,
        status
      }
    }
  }
}