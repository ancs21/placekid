import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import './index.css';
import App from './App';
import AdminPage from './Admin';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/admin" component={AdminPage} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
