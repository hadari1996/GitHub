import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter';
import Birthday from './components/Birthday';
import ChangeName from './components/ChangeName';
import Color from './components/Color';
function App() {
  return (
    <div className="App">
      <h1>My name hadar</h1>
      <p>I live in Reshon Lezion , 26 years old</p>
      <div>
        <img src="https://media.istockphoto.com/id/468053398/photo/boabab-alley-sunset.jpg?b=1&s=170667a&w=0&k=20&c=w7n1fIofwY4ujdgY3Mg12g5N6bIvBzMcTvq8Gh0Mvag=" alt="" />
        <img src="https://media.istockphoto.com/id/1335378456/photo/pair-wedding-rings-in-sand-on-tropical-beach.jpg?b=1&s=170667a&w=0&k=20&c=chjtacmPhPy0JXgOmff7mygj3ewDmV1Rt_WPvkTg2Ss=" alt="" />
        <img src="https://media.istockphoto.com/id/498170561/photo/wedding-set-up.jpg?b=1&s=170667a&w=0&k=20&c=sd9y7ATNttDZBtSYcNo30liPXdL8E1xu9Na8gB-DvQg=" alt="" />
      </div>
      <Counter/>
      <ChangeName/>
         <Birthday/>
         <Color/>
    </div>
  );
}

export default App;
