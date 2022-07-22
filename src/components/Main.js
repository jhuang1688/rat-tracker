import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Signup from '../pages/Signup';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Menu}></Route>
      <Route exact path='/submission' component={Submission}></Route>
      <Route exact path='/dashboard' component={Submission}></Route>
    </Switch>
  );
}

export default Main;