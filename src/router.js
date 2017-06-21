import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import BookSearch from "./routes/BookSearch.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/bookSearch" component={BookSearch} />
    </Router>
  );
}

export default RouterConfig;
