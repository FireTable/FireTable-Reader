import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import BookSearch from "./routes/BookSearch.js";

import BookReader from "./routes/BookReader.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/bookSearch" component={BookSearch} />
      <Route path="/bookReader" component={BookReader} />
    </Router>
  );
}

export default RouterConfig;
