import { Environment, OrbitControls, useCursor } from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";
import { charactersAtom } from "./SocketManager";
import { useEffect, useState } from "react";
import { atom, useAtom } from 'jotai'
import { MeshStandardMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"

var stompClient = null
export const Experience = () => {

    const [characters] = useAtom(charactersAtom)
    const [onFloor, setOnFloor] = useState(false)
    const [user, setUser] = useState()
    useCursor(onFloor)

    const movePlayer = (e) => {
        setUser(characters)
        characters.newPosition = [e.point.x,0,e.point.z]
        console.log(JSON.stringify(user))
        stompClient.send('/app/move',{},JSON.stringify(characters));
        // stompClient.send('/app/hello',{});
    


        
    }

    useFrame(() => {
        
    })

    const onConnected = (e) => {
      
        
        console.log("bob")

        stompClient.subscribe('/move/player', (greeting) => {
            console.log("adlakjsdlakjsdjkakjds")
            //showGreeting(JSON.parse(greeting.body).content);
        });

      
      }
    
    
    
      const userJoin=()=>{
            
        // once we subscribe to this topic we can then gather the data from our user 
        stompClient.send('/app/hello',{});
    
            
            
            
      }

    
      const onError = ()=> {
        
      }
    
    console.log(characters)
    useEffect(() => {
        stompClient = Stomp.client("ws://localhost:8080/ws");
          // Stomp.connect
          // stompClient = Stomp.over(socket);
    
        stompClient.connect({}, onConnected, onError);
          
        console.log(characters.position[0])
        
        // characters.map((character) => {
        //     console.log(character)
        // })
        
    }, [])
    return (
        <>
            <Environment preset="sunset"></Environment>
            <ambientLight intensity={0.3}></ambientLight>
            <OrbitControls></OrbitControls>
            
            <mesh rotation-x={-Math.PI / 2} position-y={-0.001}
            onClick={(e) => movePlayer(e)}
            onPointerEnter={() => setOnFloor(true)}
            onPointerLeave={() => setOnFloor(false)}>
                <planeGeometry args={[10, 10]}></planeGeometry>
                <meshStandardMaterial color="#f0f0f0"></meshStandardMaterial>
            </mesh>
            {
                <AnimatedWoman key={characters.id} 
                position={new THREE.Vector3(characters.position[0], characters.position[1], characters.position[2] )}
                hairColor={characters.hairColor} 
                bottomColor={characters.bottomColor} 
                topColor={characters.topColor}></AnimatedWoman>
            }



        </>
    )
}