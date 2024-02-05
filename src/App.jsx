import React,{useEffect, useState, Suspense, useRef} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

import { Environment, Scroll, ScrollControls, useScroll, Loader, Text, 
  Icosahedron,
  useTexture,
  useCubeTexture,
  MeshDistortMaterial,
  Preload, Backdrop, ContactShadows, PresentationControls, BakeShadows} from "@react-three/drei";
import { getProject, val } from '@theatre/core';

import { easing } from 'maath'
import { useControls } from "leva"
import { Physics, useSphere } from "@react-three/cannon"

import Flash from "./modelComps/flashdrive";
import Usb from "./modelComps/usb";

import { editable as e, SheetProvider, PerspectiveCamera, useCurrentSheet } from '@theatre/r3f';

import { HueSaturation, Pixelation, Outline, Bloom, DepthOfField, EffectComposer, Noise, DotScreen, Vignette, ChromaticAberration, BrightnessContrast, N8AO, TiltShift2 } from '@react-three/postprocessing';
import { BlendFunction, Resizer, KernelSize, Resolution } from 'postprocessing'
import ScrollPageContainer from "./UI/ScrollPageContainer";
import ContentContainer from "./UI/ContentContainer";
import Feature from "./UI/Feature";
import LoadingScreen from "./UI/LoadingScreen";
import ForeScrollContent from "./UI/ForeScrollContent";
import ForeScrollFeature from "./UI/ForeScrollFeature";
import FeatureImage from "./UI/FeatureImage";

import { useAtom } from "jotai";
import { currentPageAtom, scene1Atom, currentSceneAtom, flashLoadedAtom, usbLoadedAtom} from "./GlobalState";

import SpotLightWithHelper from "./SpotLightWithHelper";

import theflashdrive from './theflashdrive.json';

function App() {
  // const [scene1, setScene1] = useAtom(scene1Atom);

  const sheet = getProject('Project Animation', {state: theflashdrive}).sheet('Scene');

  const [currentScene] = useAtom(currentSceneAtom);

  const [flashLoaded] = useAtom(flashLoadedAtom);
  const [usbLoaded] = useAtom(usbLoadedAtom);

  useEffect(()=>{
    console.log('flash model load state: ', flashLoaded)
  }, [flashLoaded]);

  useEffect(()=>{
    console.log('usb model load state: ', usbLoaded)
  }, [usbLoaded]);

  const shouldAnimateScene1 = currentScene >=2 ;
  const shouldAnimateScene2 = currentScene >=5 && currentScene <=6;
  const shouldAnimateScene3 = currentScene >=7 && currentScene <=8;

  const hiddenState1 = useAnimateState(shouldAnimateScene1);
  const hiddenState2 = useAnimateState(shouldAnimateScene2);
  const hiddenState3 = useAnimateState(shouldAnimateScene3);

  const barStyles = {
    // Define your loading bar styles here
    height: '100%',
    background: 'red',
  };
  const containerStyles = {
    // // Add custom text within containerStyles
    // color: 'white', // Text color
    // fontSize: '24px', // Text font size
    // fontWeight: 'bold', // Text font weight
  };

  const innerStyles = {
    // Add custom styles for the inner container here
    backgroundColor: 'rgba(255, 150, 255, 0.8)',
  };

  return (
    <>
      { flashLoaded && (
        <>
          {/* <ScrollPageContainer>
            <ContentContainer customClassName={`${shouldAnimateScene1 ? 'slide-in-blurred-bottom' : 'hidden'}`}>
              <Feature text='Welcome' customClassName={'font-codecl text-2xl'} />
            </ContentContainer>
          </ScrollPageContainer>
          <ScrollPageContainer>
            <ContentContainer customClassName={`${shouldAnimateScene2 ? 'slide-in-blurred-bottom' : 'hidden'}`}>
              <Feature text='...' customClassName={'font-codecl text-2xl'} />
            </ContentContainer>
          </ScrollPageContainer>
          <ScrollPageContainer>
            <ContentContainer customClassName={`${shouldAnimateScene3 ? 'slide-in-blurred-bottom' : 'hidden'}`}>
              <Feature text='yup...' customClassName={'font-codecl text-2xl'} />
            </ContentContainer>
          </ScrollPageContainer> */}
        </>
      )}
        
      <Canvas gl={{ preserveDrawingBuffer: true }} shadows> 
        <Suspense fallback={null}>
          <ScrollControls pages={10} distance={2} damping={0.5} maxSpeed={0.08}>
            <SheetProvider sheet={sheet}>
              <Scene/>
              {/* <Droplet/> */}
              {/* <Physics gravity={[0, 2, 0]} iterations={5}>
                <Pointer />
                <Clump />
              </Physics> */}
              
              <EffectComposer disableNormalPass multisampling={4}>
                <Bloom
                  intensity={1} // The bloom intensity.
                  blurPass={undefined} // A blur pass.
                  kernelSize={KernelSize.SMALL} // blur kernel size
                  luminanceThreshold={1} // luminance threshold. Raise this value to mask out darker elements in the scene.
                  luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
                  mipmapBlur={false} // Enables or disables mipmap blur.
                  resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
                  resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
                />
                <BrightnessContrast
                  brightness={0.3} // brightness. min: -1, max: 1
                  contrast={0.6} // contrast: min -1, max: 1
                />
                <HueSaturation
                  blendFunction={BlendFunction.SCREEN} // blend mode
                  hue={0} // hue in radians
                  saturation={0.5} // saturation in radians
                />
              </EffectComposer>

              <Preload all />
            </SheetProvider>
            <Scroll html>
              
              <LoadingScreen customClassNameSpan={'font-codecl swing-in-bottom-fwd'}/>
              {/* <ForeScrollContent customClassName={``}>
                <ForeScrollFeature customClassName={``}>
                  <Feature text={`I like things simple.`} customClassName={`font-codecl break-normal ${shouldAnimateScene1 ? 'slide-in-blurred-right' : 'slide-out-blurred-right'}`}/>
                  
                </ForeScrollFeature>
                <ForeScrollFeature>
                  <Feature text={`PROJECT`} customClassName={`font-tale text-9xl`}/>
                </ForeScrollFeature>
                <ForeScrollFeature>
                  <Feature text={`This is sam, Hello world`} customClassName={`font-codecl`}/>
                </ForeScrollFeature>
              </ForeScrollContent> */}
              
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={containerStyles} // Flex layout styles
        innerStyles={innerStyles} // Inner container styles
        barStyles={barStyles} // Loading-bar styles
        dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} // Text
        initialState={(active) => active} // Initial black out state
      />
    </>
  )
}

export default App

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.BoxGeometry(0.5,0.5,0.5)
const baubleMaterial = new THREE.MeshStandardMaterial({ color: "black", roughness: 0, envMapIntensity: 1 })

// function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
//   const [ref, api] = useSphere(() => ({ args: [0.5], mass: 1, angularDamping: 0.1, linearDamping: 0.65, position: [rfs(10), rfs(10), rfs(10)] }))
//   useFrame((state) => {
//     for (let i = 0; i < 50; i++) {
//       // Get current whereabouts of the instanced sphere
//       ref.current.getMatrixAt(i, mat)
//       // Normalize the position and multiply by a negative force.
//       // This is enough to drive it towards the center-point.
//       api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-40).toArray(), [0,0,0])
//     }
//   })
//   return (
//     <instancedMesh ref={ref} position={[-10.5,10.314164676657935,-5.951827425570732]} castShadow receiveShadow args={[sphereGeometry, baubleMaterial, 50]} >
//     </instancedMesh>
//   )
// }

// function Pointer() {
//   const viewport = useThree((state) => state.viewport)
//   const [, api] = useSphere(() => ({ type: "Kinematic", args: [1], position: [0, 0, 0] }))
//   return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0))
// }

// function MainSphere({ material }) {
//   const main = useRef();
//   // main sphere rotates following the mouse position
//   useFrame(({ clock, mouse }) => {
//     main.current.rotation.z = clock.getElapsedTime();
//     main.current.rotation.y = THREE.MathUtils.lerp(
//       main.current.rotation.y,
//       mouse.x * Math.PI,
//       0.1
//     );
//     main.current.rotation.x = THREE.MathUtils.lerp(
//       main.current.rotation.x,
//       mouse.y * Math.PI,
//       0.1
//     );
//   });
//   return (
//     <Icosahedron
//       args={[1, 4]}
//       ref={main}
//       material={material}
//       position={[0, 0, 0]}
//     />
//   );
// }



function useAnimateState(shouldAnimate) {
  const [hiddenState, setHiddenState] = useState('hidden');

  useEffect(() => {
    if (shouldAnimate) {
      setHiddenState('');
    }
  }, [shouldAnimate]);

  return hiddenState;
}

// function Droplet() {
//   const bumpMap = useTexture("/bump.jpg");
//   const envMap = useCubeTexture(
//     ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
//     { path: "../cube/" }
//   );
//   // We use `useResource` to be able to delay rendering the spheres until the material is ready
//   const [material, set] = useState();

//   return (
//     <>
//       <MeshDistortMaterial
//         ref={set}
//         envMap={envMap}
//         bumpMap={bumpMap}
//         color={"#010101"}
//         roughness={0.1}
//         metalness={1}
//         bumpScale={0.005}
//         clearcoat={1}
//         clearcoatRoughness={1}
//         radius={1}
//         distort={0.4}
//       />
//       <MainSphere material={material} />
//       {/* {material && <Instances material={material} />} */}
//     </>
//   );
// }

const Scene = () =>{
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  const [currentPage, setCurrentPage ] = useAtom(currentPageAtom);
  
  const [currentScene, setCurrentScene] = useAtom(currentSceneAtom);

  const sequenceLength = val(sheet.sequence.pointer.length);

  function logCurrentPageCallback(scroll, callback){
    const currentPage = Math.floor(scroll.offset * scroll.pages) + 1;

    //determins the current scene bassed on how far you've scroll
    const positionWithinPage = (scroll.offset * scroll.pages) % 1;
 
    //scene division
    const sceneOffsetForCurrentPage = Math.floor(positionWithinPage * 2) + 1;

    //calculate total scenes from all pages
    const computedScene = (currentPage - 1) * 2 + sceneOffsetForCurrentPage;

    // console.log('current Page: ', currentPage);
    // console.log('current scene: ', currentScene);
    callback(currentPage);
    setCurrentScene(computedScene);
  };

  useFrame(() => {
    if (scroll){
      logCurrentPageCallback(scroll, setCurrentPage);
      sheet.sequence.position = scroll.offset * sequenceLength;
    }
  });

  const [material, set] = useState();
  const bumpMap = useTexture("../bump.jpg");

  const enablepresentation = currentScene <7;
  
  console.log('enablepresentation: ', enablepresentation);

  return (<>
        <color attach='background' args={['#fff']}/>
        <PerspectiveCamera theatreKey="Camera" makeDefault shadows gl={{ antialias: false }} position={[0,0,0]} fov={90} near={0.1} far={70}/>
        <Environment files="bathroom_02_4K_8b4ee237-5204-417b-a336-3f165dcf754a.exr"/>
        {/* <SpotLightWithHelper theatreKey='spotlight 1' showHelper={false} intensity={1} position={[0,0,0]} />
        <SpotLightWithHelper theatreKey='spotlight 2' showHelper={false} intensity={1} position={[0,0,0]} />
        <SpotLightWithHelper theatreKey='spotlight 3' showHelper={false} intensity={1} position={[0,0,0]} /> */}

        <ambientLight intensity={2} />
        
        <Flash/>

        <Usb/>

        {/* <Backdrop castShadow floor={2} position={[0, -0.9, -3]} scale={[80, 20, 4]}>
          <meshStandardMaterial color="#fff" envMapIntensity={0.1} />
        </Backdrop>  */}
        {/* <ContactShadows position={[0, -0.4485, 0]} scale={5} blur={0.5} far={1} /> */}
        {/* <ContactShadows position={[0.01, -0.45, 0.03]} scale={8} blur={1.5} far={1} />
        <ContactShadows position={[-0.01, -0.45, 0.05]} scale={8} blur={2} far={1} opacity={0.3} /> */}
        
        {/* <BakeShadows/> */}
        </>);
};