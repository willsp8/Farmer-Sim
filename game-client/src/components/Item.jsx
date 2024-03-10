import { useGLTF } from "@react-three/drei"
import { useAtom } from "jotai";
import { mapAtom } from "./SocketManager";
import { SkeletonUtils } from "three-stdlib";
import { useMemo } from "react";

export const Item = ({
    item,
}) => {
    const {name, gridPoistion, size, rotation} = item;
    const [map] = useAtom(mapAtom)

    
    const {scene} = useGLTF(`./models/item/${name}.glb`)
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

    console.log(rotation)
    return(
        <primitive object={clone} position={
            [size[0] / map.gridDivision / 2 + gridPoistion[0] / map.gridDivision,
            0,
            size[1] / map.gridDivision / 2 + gridPoistion[1] / map.gridDivision
            ]}
            rotation-y={(rotation || 0) * Math.PI / 2 }
        ></primitive>

    )
}