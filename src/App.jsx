import React from 'react';
import { Switch, Route } from 'react-router-dom'

import { Checkers } from './pages/Checkers.jsx';


export function App() {
  
  return (
    <div className="app">
      <main>
        <Switch>
          <Route>
          <Checkers />
          </Route>
        </Switch>
      </main>
    </div>
  )
}