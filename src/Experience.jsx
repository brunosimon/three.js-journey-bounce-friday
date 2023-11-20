import { Physics } from '@react-three/rapier'
import Lights from './Lights.jsx'
import Effects from './Effects/Effects.jsx'
import Player from './Player.jsx'
import { useControls } from 'leva'
import Levels from './Levels/Levels.jsx'
import './Materials/Materials.jsx'

export default function Experience()
{
    const physicsSettings = useControls('physics', {
        debug: { value: false },
    })

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