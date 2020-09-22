import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import {ChangeLanguage} from './components/features/changeLanguage/ChangeLanguage';
import { VideoPage } from './components/features/videoPage/VideoPage';

function App() {
  return (
    <>
    <div>
      <ChangeLanguage />
    </div>
    <Switch>
        <Route path="/" exact>
            <VideoPage />
        </Route>
    </Switch>
    </>
  );
}

export default App;
