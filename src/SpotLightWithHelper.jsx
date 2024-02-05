import { SpotLightHelper } from "three";
import { editable as e, useCurrentSheet } from "@theatre/r3f";
import { extend, useThree, useFrame } from "@react-three/fiber";
import React, {useRef, useEffect} from "react";

extend ({SpotLightHelper});

const SpotLightWithHelper = ({showHelper = true, ...props}) =>{
    const {scene} = useThree();
    const ref = useRef();
    const helperRef = useRef();

    useEffect(() => {
        if  (showHelper) {
            helperRef.current = new SpotLightHelper(ref.current);
            scene.add(helperRef.current);

            return() => {
                scene.remove(helperRef.current);
                helperRef.current.dispose();
            };
        }
    }, [scene, showHelper] );

    useFrame (() => {
        if (showHelper && helperRef.current) {
            helperRef.current.update();
        }
    });

    return <e.spotLight penumbra={1} castShadow ref={ref} {...props}/>;
};

export default SpotLightWithHelper;
 