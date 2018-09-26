const isPromise = obj => Promise.resolve(obj) === obj;

export default function errorMiddleware() {
  return next => (action) => {
    if (!isPromise(action.payload)) {
      return next(action);
    }

    return next(action).catch((error) => {
      console.warn(`${action.type}_FAILURE - ${error}`); /*eslint-disable-line*/
      return error;
    });
  };
}
