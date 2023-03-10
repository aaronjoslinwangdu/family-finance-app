import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ExpensePage from './pages/ExpensePage';
import GroupPage from './pages/GroupPage';

import './App.css';

function App() {

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/auth/' />
        </Route>
        <Route path='/auth/' >
          <AuthPage />
        </Route>
        <Route path='/users/profile'>
          <ProfilePage />
        </Route>
        <Route path='/groups'>
          <GroupPage />
        </Route>
        <Route path='/expenses'>
          <ExpensePage />
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
