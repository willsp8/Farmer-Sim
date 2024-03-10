import { Suspense, useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Experience } from './components/Experience'
import { Canvas } from '@react-three/fiber'
import SocketManager from './components/SocketManager'
import {Physics} from '@react-three/rapier'


export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function App() {
  const [count, setCount] = useState(0)
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <>
    <SocketManager></SocketManager>
    <Canvas shadows camera={{position: [8,8,3], fov: 30}}>
    <Suspense>

    <Physics debug>

    
    <Experience></Experience>

    </Physics>
    </Suspense>
    </Canvas>
      
    </>
  )
}

export default App
