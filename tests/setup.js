import 'babel-polyfill';
import {
  configure, shallow, render, mount,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import SagaTester from 'redux-saga-tester';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import moxios from 'moxios';
import promiseMiddleware from 'redux-promise-middleware'
import axiosInstance from '../app/js/config'

import store from '../app/js/redux-store';

process.env.NODE_ENV = 'test';

configure({ adapter: new Adapter() });

const promiseTypeSuffixes = ['LOADING', 'SUCCESS', 'FAILURE'];

const middlewares = [promiseMiddleware({ promiseTypeSuffixes })];
const mockStore = configureMockStore(middlewares);
moxios.install(axiosInstance);
const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

require.extensions['.css'] = () => null;
require.extensions['.png'] = () => null;
require.extensions['.jpg'] = () => null;

global.expect = expect;
global.store = store;
global.apiBaseUrl = apiBaseUrl;
global.moxios = moxios;
global.mount = mount;
global.sinon = sinon;
global.shallow = shallow;
global.mockStore = mockStore;
global.SagaTester = SagaTester;

global.navigator = {
  userAgent: 'node.js',
};
global.document = document;
