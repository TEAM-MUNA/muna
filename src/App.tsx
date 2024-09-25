import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  let a = 3;
  if (a == 3) {
    // == 사용 못하게하는 eslint 테스트용 코드
    console.log("a는 3입니다");
  }
  let b = 3;
  if (b == 3) {
    console.log("b는 3입니다");
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
