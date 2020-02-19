

const initialState = {
  tasks: [],
  isLoading: false
}

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TASKS_STARTED': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'FETCH_TASKS_SUCCEEDED': {
      return {
        ...state,
        isLoading: false,
        tasks: action.payload
      }
    }
    case 'EDIT_TASK_SUCCEEDED': {
      const { payload } = action;
      const nextTasks = state.tasks.map(task => {
        if (task.id === payload.task.id) {
          return payload.task
        }
        return task;
      })
      return {
        ...state,
        tasks: nextTasks
      }
    }
    case 'FETCH_TASKS_FAILED': {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    }

    case 'CREATE_TASK_SUCCEEDED': {
      return {
        ...state,
        tasks: state.tasks.concat(action.payload)
      }
    }
    default: {
      return state
    }
  }

}