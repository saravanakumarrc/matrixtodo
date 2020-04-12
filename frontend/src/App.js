import React from 'react';
import './App.scss';
import TaskMatrix from './components/TaskMatrix';
import {polyfill} from "mobile-drag-drop";
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/scroll-behaviour";
polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});
function App() {
  return (
    <div className="App">
      <header className="App-header">
        My matrix heading
      </header>
      <main className="App-container">
        <TaskMatrix/>
      </main>
    </div>
  );
}

export default App;
