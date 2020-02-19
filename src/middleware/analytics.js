const analytics = store => next => action => {
  if (!action || !action.meta || !action.meta.analytics) {
    return next(action)
  }
  const { event, data } = action.meta.analytics;

  fakeAnalytics(event, data)
    .then(res => {
      console.log('Recorded: ', event, data);
    })
    .catch(err => {
      console.error(
        'An error occurred while sending analytics: ',
        err.toString()
      );
    })

  return next(action)
}

function fakeAnalytics(eventName, data) {
  return new Promise((resolve, reject) => {
    resolve('Success!')
  })
}

export default analytics;