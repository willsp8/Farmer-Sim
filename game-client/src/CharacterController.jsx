import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useFrame, useGraph } from '@react-three/fiber'
// import SockJS from 'sockjs-client';
import { over } from "stompjs";
import { useAtom } from 'jotai';
import { userAtom } from './SocketManager';

const MOVEMENT_SPEED = 0.092;



export function CharacterController({
  hairColor="blue",
  topColor= "pink",
  bottomColor = "brown",
  id,
  ...props
}) {

  const postition = useMemo(() => props.postition, [])
  const group = useRef()
  const { scene, materials, animations } = useGLTF('/models/Animated Woman.glb')

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

  const { nodes} = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  const [animation, setAnimation] = useState("CharacterArmature|Idle")



  useEffect(() => {

    
    actions[animation].reset().fadeIn(0.5).play()
    return () => actions[animation]?.fadeOut(0.5);
  }, [animation])

  const [user] = useAtom(userAtom);


  useFrame((state) => {
    if (group.current.position.distanceTo(props.position) > 0.1){
      const direction = group.current.position.clone().sub(props.position).normalize().multiplyScalar(MOVEMENT_SPEED)
      group.current.position.sub(direction);
      group.current.lookAt(props.position)
      setAnimation("CharacterArmature|Run")

    }else{
      setAnimation("CharacterArmature|Idle")

    }

    if(JSON.parse(id) === user){

    
      state.camera.position.x = group.current.position.x + 8;
      state.camera.position.y = group.current.position.y + 8;
      state.camera.position.z = group.current.position.z + 8;
      state.camera.lookAt(group.current.position)
    }

  })

  return (
    <group ref={group} {...props} position={postition} dispose={null}>
        
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="CharacterArmature" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes.Root} />
          </group>
          <group name="Casual_Body" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Casual_Body_1" geometry={nodes.Casual_Body_1.geometry} material={materials.White} skeleton={nodes.Casual_Body_1.skeleton} >
              <meshStandardMaterial color={topColor}></meshStandardMaterial>
            </skinnedMesh>
            <skinnedMesh name="Casual_Body_2" geometry={nodes.Casual_Body_2.geometry} material={materials.Skin} skeleton={nodes.Casual_Body_2.skeleton} />
          </group>
          <group name="Casual_Feet" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Casual_Feet_1" geometry={nodes.Casual_Feet_1.geometry} material={materials.Skin} skeleton={nodes.Casual_Feet_1.skeleton} />
            <skinnedMesh name="Casual_Feet_2" geometry={nodes.Casual_Feet_2.geometry} material={materials.Grey} skeleton={nodes.Casual_Feet_2.skeleton} />
          </group>
          <group name="Casual_Head" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh name="Casual_Head_1" geometry={nodes.Casual_Head_1.geometry} material={materials.Skin} skeleton={nodes.Casual_Head_1.skeleton} />
            <skinnedMesh name="Casual_Head_2" geometry={nodes.Casual_Head_2.geometry} material={materials.Hair_Blond} skeleton={nodes.Casual_Head_2.skeleton} >
              <meshStandardMaterial color={hairColor}></meshStandardMaterial>
            </skinnedMesh>
            <skinnedMesh name="Casual_Head_3" geometry={nodes.Casual_Head_3.geometry} material={materials.Hair_Brown} skeleton={nodes.Casual_Head_3.skeleton} />
            <skinnedMesh name="Casual_Head_4" geometry={nodes.Casual_Head_4.geometry} material={materials.Brown} skeleton={nodes.Casual_Head_4.skeleton} />
          </group>
          <skinnedMesh name="Casual_Legs" geometry={nodes.Casual_Legs.geometry} material={materials.Orange} skeleton={nodes.Casual_Legs.skeleton} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Animated Woman.glb')

