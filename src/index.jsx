import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { KeyboardControls } from '@react-three/drei'
import Interface from './Interface.jsx'
import { Suspense } from 'react'
import TouchControls from './TouchControls.jsx'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls
        map={ [
            { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
            { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
            { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
            { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
            { name: 'jump', keys: [ 'Space' ] },
        ] }
    >
        <TouchControls />
        <Canvas
            shadows
            camera={ {
                fov: 25,
                near: 0.1,
                far: 200,
                position: [ 0, 4, 6 ]
            } }
        >
            <Experience />
        </Canvas>
        <Interface />
    </KeyboardControls>
)