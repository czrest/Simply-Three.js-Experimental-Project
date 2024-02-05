import { useGLTF, useAnimations } from "@react-three/drei";
import { editable as e, useCurrentSheet } from "@theatre/r3f";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { usbLoadedAtom } from "../GlobalState";

const Usb = () => {

    const [, setUsbLoaded] = useAtom(usbLoadedAtom);
    
    const stage = useGLTF('./stage.glb');

    useEffect(()=>{
        setUsbLoaded(true);
        return() =>{
            setUsbLoaded(false);
        }
    }, [])

    return(
    <>
    <e.mesh theatreKey="stage" castShadow receiveShadow>
        <primitive object={stage.scene} />
    </e.mesh>
    </>);
};

export default Usb;