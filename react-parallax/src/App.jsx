import { useState } from 'react'
import './App.css'
import { Page1, Page2, Page3, Page4 } from './components'
import { ParallaxProvider } from 'react-scroll-parallax';
import { Parallax } from 'react-scroll-parallax';

function App() {

  return (
   
    <ParallaxProvider>
      <Parallax speed={-25}>
        <Page1 />
      </Parallax>

      <Parallax speed={10}>
        <Page2 />
        {/* <h1>Hello</h1> */}
      </Parallax>

      <Parallax speed={-10}>
        <Page3 />
      </Parallax>

      <Parallax speed={10}>
        <Page4 />
      </Parallax>

    </ParallaxProvider>
  );
}

export default App
