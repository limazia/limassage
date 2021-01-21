import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import History from '../pages/History';
import OverlayMessage from '../pages/OverlayMessage/';
import NewMessage from '../pages/NewMessage/';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={History} />
      <Route path="/message/new" component={NewMessage} />
      <Route path="/message/overlay" component={OverlayMessage} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Routes;