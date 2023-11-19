import { Physics } from '@react-three/rapier'
import Lights from './Lights.jsx'
import { CameraControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Effects from './Effects/Effects.jsx'
import Player from './Player.jsx'
import { useControls } from 'leva'
import Levels from './Levels/Levels.jsx'
import './Materials/Materials.jsx'
import useGame from './stores/useGame.jsx'
import { useEffect } from 'react'

export default function Experience()
{
    const physicsSettings = useControls('physics', {
        debug: { value: false },
    })

    const [ setStatus ] = useGame(state => [ state.setStatus ])
    
    useEffect(() =>
    {
        setTimeout(() =>
        {
            setStatus('started')
        }, 100)
    }, [])

    return <>
    
        <Effects />

        <color args={ [ '#111111' ] } attach="background" />

        {/* <Perf position="top-left" /> */}

        <Physics timeStep="vary" debug={ physicsSettings.debug } gravity={ [ 0, - 9.807 * 2, 0 ] }>
            <Lights />
            <Player />
            <Levels />
        </Physics>

    </>
}