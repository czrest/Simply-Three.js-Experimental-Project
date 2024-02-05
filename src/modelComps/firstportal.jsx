import { useGLTF, Environment, useTexture, MeshPortalMaterial, OrbitControls } from "@react-three/drei";
import { editable as e, useCurrentSheet } from "@theatre/r3f";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import * as THREE from "three"

const Firstportal = () => {

    // const [active, setActive] = useState(null);
    
    const map = useTexture('./Realistic_equirectangular-png_photography_1474314667.png');

    return(
        <>
            <e.mesh theatreKey="portal1">
                <circleGeometry args={[1, 4]}/>
                <MeshPortalMaterial transparent blur={1} blend={0}>
                    <ambientLight intensity={3}/>
                    <e.mesh theatreKey="portal1scene">
                        <sphereGeometry args={[10, 64, 64]}/>
                        <meshStandardMaterial map={map} side={THREE.BackSide}/>
                    </e.mesh>
                    {/* <e.mesh theatreKey="portal2">
                        <planeGeometry args={[1, 1]}/>
                        <MeshPortalMaterial>
                            <ambientLight intensity={3}/>
                            <mesh>
                                <sphereGeometry args={[5, 64, 64]}/>
                                <meshStandardMaterial map={map} side={THREE.BackSide}/>
                            </mesh>
                            <e.mesh theatreKey="portal3">
                                <planeGeometry args={[0.5, 0.5]}/>
                                <MeshPortalMaterial>
                                    <ambientLight intensity={3}/>
                                    <mesh>
                                        <sphereGeometry args={[5, 64, 64]}/>
                                        <meshStandardMaterial map={map} side={THREE.BackSide}/>
                                    </mesh>
                                </MeshPortalMaterial>
                            </e.mesh>
                        </MeshPortalMaterial>
                    </e.mesh> */}
                </MeshPortalMaterial>
            </e.mesh>
        </>
    );
};

export default Firstportal;