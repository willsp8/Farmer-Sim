import { Environment, OrbitControls, useCursor } from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";
import { charactersAtom } from "./SocketManager";
import { useEffect, useState } from "react";
import { atom, useAtom } from 'jotai'
import { MeshStandardMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"


// this fixed my charcters not rendering error 
// https://stackoverflow.com/questions/64941910/react-map-not-rendering-array-but-console-logs
var stompClient = null
export const Experience = () => {

    const [characters] = useAtom(charactersAtom)
    const [onFloor, setOnFloor] = useState(false)
    const [user, setUser] = useState()
    const [characters2, setCharacters2] = useState(false)
    useCursor(onFloor)

    const movePlayer = (e) => {
        setUser(characters)

        var char = null;
        //characters.newPosition = [e.point.x,0,e.point.z]
        characters.forEach((time) => {
         
           console.log(JSON.parse(time.id))

           const id = localStorage.getItem('fun') + ""
            if(JSON.parse(time.id) == id){
                char = time 
                console.log(char)
            }
           
        })
        
        console.log(char)
        
        console.log(localStorage.getItem('fun'))
        char.newPosition = [e.point.x,0,e.point.z]
        console.log(char)
        stompClient.send('/app/move',{},JSON.stringify(char));
        // stompClient.send('/app/hello',{});
    


        
    }

    useFrame(() => {
        
    })

    const onConnected = (e) => {
      
        
        console.log("bob")

        // stompClient.subscribe('/move/player', (greeting) => {
        //     console.log("adlakjsdlakjsdjkakjds")
        //     //showGreeting(JSON.parse(greeting.body).content);
        // });

      
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

        stompClient.connect({}, onConnected, onError);

        console.log(characters2)
        
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
            {characters.map((character, index) => {
                return(
                <AnimatedWoman key={index} 
                position={new THREE.Vector3(character.position[0], character.position[1], character.position[2] )}
                hairColor={character.hairColor} 
                bottomColor={character.bottomColor} 
                topColor={character.topColor}></AnimatedWoman>)
            })
                
            }



        </>
    )
}