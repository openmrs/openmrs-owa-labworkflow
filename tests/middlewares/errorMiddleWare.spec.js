import errorMiddleware from '../../app/js/middlewares/errorMiddleware';

describe('errorMiddleware action', () => {
  const nextHandler = errorMiddleware();
  let nextArgs = [];
  let fakeNext = (...args) => { nextArgs.push(args); };
  const fakeStore = {};
  it('must return a function to handle next action', () => {
    expect(typeof nextHandler).toBe('function');
    expect(nextHandler.length).toEqual(1);
  });
  it('must not handle an action without a promise payload', () => {
    const action = {
      type: 'ACTION',
      payload: 'some payload',
    };
    nextArgs = [];
    nextHandler(fakeNext)(action);
    expect(nextArgs[0]).toEqual([action]);
  });
  it('must handle an action with a promise payload but without errors', () => {
    const action = {
      type: 'ACTION',
      payload: new Promise(resolve => resolve('some value')),
    };
    nextArgs = [];
    new Promise(resolve =>(nextHandler(fakeNext)(action))); /*eslint-disable-line*/
    expect(nextArgs[0]).toEqual([action]);
  });
  it('must handle an action with a promise payload but with errors', () => {
    const action = {
      type: 'ACTION',
      payload: Promise.reject(new Error('foo')),
    };
    nextArgs = [];
    fakeNext = (args) => { return Promise.reject(args.payload);}
    const returnedError = nextHandler(fakeNext)(action);
    expect(returnedError).toEqual(action.payload);
  });
});