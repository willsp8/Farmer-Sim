import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Experience } from './components/Experience'
import { Canvas } from '@react-three/fiber'
import SocketManager from './components/SocketManager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SocketManager></SocketManager>
    <Canvas shadows camera={{position: [8,8,3], fov: 30}}>
    <Experience></Experience>
    </Canvas>
      
    </>
  )
}

export default App
