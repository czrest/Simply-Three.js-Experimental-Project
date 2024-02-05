import { useGLTF, useAnimations, MeshTransmissionMaterial } from "@react-three/drei";
import { editable as e, useCurrentSheet } from "@theatre/r3f";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { flashLoadedAtom } from "../GlobalState";

const Flash = () => {

    const [, setFlashLoaded] = useAtom(flashLoadedAtom);
    
    const model1 = useGLTF('./simplyR.glb');
    const model2 = useGLTF('./simplyY.glb');
    const model3 = useGLTF('./simplyB.glb');
    const model4 = useGLTF('./simplyV.glb');
    const model5 = useGLTF('./simplyW.glb');
    const model6 = useGLTF('./simplyBL.glb');
    const secondarymodel = useGLTF('./Droplets_material.glb');

    useEffect(()=>{
        setFlashLoaded(true);
        return() =>{
            setFlashLoaded(false);
        }
    }, [])

    return(<>
    <e.mesh theatreKey="redcan" castShadow receiveShadow>
        <primitive object={model1.scene} />
        {/* <primitive object={secondarymodel.scene} /> */}
    </e.mesh>
    <e.mesh theatreKey="yellowcan" castShadow receiveShadow>
        <primitive object={model2.scene} />
        {/* <primitive object={secondarymodel.scene} /> */}
    </e.mesh>
    <e.mesh theatreKey="bluecan" castShadow receiveShadow>
        <primitive object={model3.scene} />
        {/* <primitive object={secondarymodel.scene} /> */}
    </e.mesh>
    <e.mesh theatreKey="violetcan" castShadow receiveShadow>
        <primitive object={model4.scene} />
        {/* <primitive object={secondarymodel.scene} /> */}
    </e.mesh>
    <e.mesh theatreKey="whitecan" castShadow receiveShadow>
        <primitive object={model5.scene} />
        {/* <primitive object={secondarymodel.scene} /> */}
    </e.mesh>
    <e.mesh theatreKey="blackcan" castShadow receiveShadow>
        <primitive object={model6.scene} />
        {/* <primitive object={secondarymodel.scene} /> */}
    </e.mesh>
    </>);
};

export default Flash;