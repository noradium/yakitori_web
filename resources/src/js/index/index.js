import React from 'react';
import { render } from 'react-dom';
import { Root } from './containers/Root';

import 'whatwg-fetch';
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}

render(<Root/>, document.querySelector('#root'));
