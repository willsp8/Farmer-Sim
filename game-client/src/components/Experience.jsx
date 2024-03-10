import { Environment, OrbitControls, useCursor, useKeyboardControls } from "@react-three/drei";
import { AnimatedWoman } from "./AnimatedWoman";
import { charactersAtom, mapAtom, mapAtom2 } from "./SocketManager";
import { useEffect, useRef, useState } from "react";
import { atom, useAtom } from 'jotai'
import { MeshStandardMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three"
import { Item } from "./Item";
import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";

import { Controls } from "../App";
import Pathfinding from "pathfinding";

// this fixed my charcters not rendering error 
// https://stackoverflow.com/questions/64941910/react-map-not-rendering-array-but-console-logs
var stompClient = null
export const Experience = () => {

    const [characters] = useAtom(charactersAtom)
    const [map] = useAtom(mapAtom)
    const [map2] = useAtom(mapAtom2)
    const [onFloor, setOnFloor] = useState(false)
    const [user, setUser] = useState()
    const [characters2, setCharacters2] = useState(false)
    const [runGame, setRunGame] = useState(false);
    const rigidBody = useRef();
    console.log(map2)
    console.log(useKeyboardControls)


    const grid = new Pathfinding.Grid( map.size[0] * map.gridDivision,
        map.size[1] * map.gridDivision);

    
    const finder = new Pathfinding.AStarFinder({
        allowDiagonal: true,
        dontCrossCorners: true,
    })
   
    const findPath = (start, end) => {
        console.log(start[0])
        const gridClone = grid.clone()
        const path = finder.findPath(start[0], start[1], end[0], end[1], gridClone)
        return path 

    }

    const updateGrid = () => {
        map.items.forEach((item) => {
            console.log(item.items)
            if(item.items.walkable || item.items.wall){
                return
            }
            const width = item.items.rotation === 1 || item.items.rotation === 3 ? item.items.size[1] : item.items.size[0]
            const height = item.items.rotation === 1 || item.items.rotation === 3 ? item.items.size[0] : item.items.size[1]
            for(let x = 0; x < width; x++ ){
                for(let y = 0; y < height; y++){
                    console.log(item.items.gridPoistion[0])
                    grid.setWalkableAt(
                        item.items.gridPoistion[0] + x,
                        item.items.gridPoistion[1] + y,
                        false
                    )
                }
            }

        })
    }

    updateGrid()

    console.log(findPath([0,0], [0,5]))
    

    // const leftPressed = useKeyboardControls((state) => state[Controls.left]);
    // const rightPressed = useKeyboardControls((state) => state[Controls.right]);
    // const backPressed = useKeyboardControls((state) => state[Controls.back]);
    // const forwardPressed = useKeyboardControls(
    //     (state) => state[Controls.forward]
    // );



    useCursor(onFloor)

    const movePlayer = (e) => {
        setUser(characters)
     

        var char = null;
        //characters.newPosition = [e.point.x,0,e.point.z]
        characters.forEach((time) => {
            
            console.log(time)
           console.log(JSON.parse(time.id))

           const id = localStorage.getItem('fun') + ""
            if(JSON.parse(time.id) == id){
                char = time 
                console.log(char)
            }
           
        })
        
       // console.log(char)
        
        //console.log(localStorage.getItem('fun'))
        char.newPosition = [e.point.x,0,e.point.z]
        let oldX = Math.floor(char.position[0] * map.gridDivision)
        let oldZ = Math.floor(char.position[2] * map.gridDivision)

        let newX = Math.floor(char.newPosition[0] * map.gridDivision)
        let newZ = Math.floor(char.newPosition[2] * map.gridDivision)

        char.path = findPath([oldX,oldZ], [newX, newZ])
        
        let arr = []
        char.path.forEach((thing) => {
            console.log(thing)
            arr.push({
                array: [thing[0], thing[1]],
            })
        })
        char.path = arr

        console.log("charrrr")

        console.log(char)
        stompClient.send('/app/move',{},JSON.stringify(char));
        // stompClient.send('/app/hello',{});
        
    


        
    }

    // const handleMovement = () => {
       
    //     if (rightPressed) {
    //         rigidBody.current.applyImpulse({ x: 0.1, y: 0, z: 0 });
    //     }
    //     if (leftPressed) {
    //         rigidBody.current.applyImpulse({ x: -0.1, y: 0, z: 0 });
    //     }
    
    //     if (forwardPressed) {
    //         rigidBody.current.applyImpulse({ x: 0, y: 0, z: -0.1 });
    //     }
    //     if (backPressed) {
    //         rigidBody.current.applyImpulse({ x: 0, y: 0, z: 0.1 });
    //     }
    //   };

    const MOVEMENT_SPEED = 3.2;
    useFrame((state, delta) => {

       // handleMovement();

       const cameraDistanceY = 20
       const cameraDistanceZ = 26
       const playerWorldPos = vec3(rigidBody.current.translation())

        // state.camera.position.x = rigidBody.current.position.x + 8;
        // state.camera.position.y = rigidBody.current.position.y + 8;
        // state.camera.position.z = rigidBody.current.position.z + 8;
        // state.camera.lookAt(rigidBody.current.position)
        
        const keyDown  = false;
        function handleKeyDown(e) {
            console.log(e);

            if(e.key == 'd'){
                
                
                const impulse = {
                    x: Math.sin(0) * MOVEMENT_SPEED * delta,
                    y:0,
                    z: Math.cos(0) * MOVEMENT_SPEED * delta
                }
                rigidBody.current.applyImpulse(impulse, true)

            }
            if(e.key == 'a'){
                const impulse = {
                    x: Math.sin(0) * MOVEMENT_SPEED * delta,
                    y:0,
                    z: Math.cos(180) * MOVEMENT_SPEED * delta
                }
                rigidBody.current.applyImpulse(impulse, true)
            }
            if(e.key == 'w'){
                const impulse = {
                    x: Math.sin(90) * MOVEMENT_SPEED * delta,
                    y:0,
                    z: Math.cos(90) * MOVEMENT_SPEED * delta
                }
                rigidBody.current.applyImpulse(impulse, true)
            }
            if(e.key == 's'){
                const impulse = {
                    x: Math.sin(270) * MOVEMENT_SPEED * delta,
                    y:0,
                    z:0
                }
                rigidBody.current.applyImpulse(impulse, true)
            }

            
            
          }
        document.addEventListener('keydown', handleKeyDown);

        
        
        
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
    
    console.log("time4")
    console.log(characters)
    console.log(map  )
    
    if(map.length != 0 && runGame == false){
        setRunGame(true)
        console.log("run game")
        map.items.map((item) => {
            console.log(item)
            console.log(runGame)
            setRunGame(true)
        })
    }
    
        
  
    
    useEffect(() => {
        console.log(map)
        stompClient = Stomp.client("ws://localhost:8080/ws");

        stompClient.connect({}, onConnected, onError);
 
        
        
    }, [])
    if(runGame == true){
        return (
            <>
                <Environment preset="sunset"></Environment>
                <ambientLight intensity={0.3}></ambientLight>
                <OrbitControls></OrbitControls>
                {map.items.map((item, index) => {
                    return(<Item key={`${item.items.name}-${index}`} item={item.items}></Item>)
                })}
                
                {/* <Item name={"Chair"}></Item>
                
                <Item name={"Couch Small"}></Item> */}
                <RigidBody colliders="trimesh" type="fixed" >
                <mesh 
                rotation-x={-Math.PI / 2}
                 position-y={-0.001}
                onClick={(e) => movePlayer(e)}
                onPointerEnter={() => setOnFloor(true)}
                onPointerLeave={() => setOnFloor(false)}
                position-x={map.size[0] / 2}
                position-z={map.size[1] / 2}
                >
                    <planeGeometry args={map.size}></planeGeometry>
                    <meshStandardMaterial color="#f0f0f0"></meshStandardMaterial>
                </mesh>
                </RigidBody>

                <RigidBody ref={rigidBody} colliders={false} linearDamping={12} lockRotations>

                        
                        <mesh rotation={[0, 0, 0]}
                        position={new THREE.Vector3(4, 2, 4 )}>
                        <boxGeometry attach="geometry" args={[1, 1, 1]} />
                        <meshStandardMaterial attach="material" color={"#6be092"} />
                        </mesh>
                        <CapsuleCollider args={[0.7,0.6]} position={new THREE.Vector3(4, 2, 4 )}></CapsuleCollider>
                        </RigidBody>

              

                {/* {characters.map((character, index) => {
                    return(
                        <RigidBody ref={rigidBody} colliders={false}>

                        
                        <mesh key={index}rotation={[0, 10, 0]}
                        position={new THREE.Vector3(character.position[0], 2, character.position[2] )}>
                        <boxGeometry attach="geometry" args={[1, 1, 1]} />
                        <meshStandardMaterial attach="material" color={"#6be092"} />
                        </mesh>
                        <CapsuleCollider args={[0.7,0.6]} position={new THREE.Vector3(character.position[0], 2, character.position[2] )}></CapsuleCollider>
                        </RigidBody>)
                })} */}
                    
                
                
                
                {characters.map((character, index) => {
                    return(
                    <AnimatedWoman key={index} 
                    id={character.id}
                    path={character.path}
                    position={new THREE.Vector3(character.position[0], character.position[1], character.position[2] )}
                    hairColor={character.hairColor} 
                    bottomColor={character.bottomColor} 
                    topColor={character.topColor}></AnimatedWoman>)
                })
                    
                }
    
    
    
            </>
        )
    }else {
        return (<></>)
    }
    
}