import React from 'react';
import { Counter } from './components/features/counter/Counter';
import {
  Switch,
  Route,
   Link
} from "react-router-dom";
import {Inner} from './components/features/inner/Inner';
import s from './App.module.scss';
import {ChangeLanguage} from './components/features/changeLanguage/ChangeLanguage';

function App() {
console.log(s)
  return (
    <>
    <div className={s.root}>
      <Link to="/">Home</Link>
      <Link to="/inner">Inner page</Link>

      <ChangeLanguage />
    </div>
    <Switch>
        <Route path="/" exact>
            <Counter />
        </Route>
        <Route path="/inner">
            <Inner />
        </Route>
    </Switch>
    </>
  );
}

export default App;
