import { KeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Ecctrl from 'ecctrl'
import { useEffect, useRef } from 'react'
import useGame from './stores/useGame'

export default function Player()
{
    const ref = useRef()

    const [ playerPosition, levelIndex ] = useGame(state => [ state.playerPosition, state.levelIndex ])

    useFrame(() =>
    {
        if(ref.current)
        {
            const position = ref.current.translation()
            if(position.y < - 10)
                reset()

            playerPosition.copy(position)
        }
    })

    const reset = () =>
    {
        ref.current.setTranslation({ x: 0, y: 1, z: 2 })
        ref.current.setLinvel({ x: 0, y: 0, z: 0 })
        ref.current.setAngvel({ x: 0, y: 0, z: 0 })
    }

    useEffect(reset, [ levelIndex ])

    return <KeyboardControls
        map={ [
            { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
            { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
            { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
            { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
            { name: 'jump', keys: [ 'Space' ] },
            { name: 'run', keys: [ 'Shift' ] },
            
            // Optional animation key map
            { name: 'action1', keys: [ '1' ] },
            { name: 'action2', keys: [ '2' ] },
            { name: 'action3', keys: [ '3' ] },
            { name: 'action4', keys: [ 'KeyF' ] },
        ] }
    >
        <Ecctrl
            ref={ ref }
            position={ [ 0, 1, - 2 ] }
            debug={ true }
            capsuleRadius={ 0.4 }
            
            camInitDis={ - 14 }
            camMaxDis={ - 25 }
            camInitDir={ Math.PI }

            maxVelLimit={ 5 }
            turnVelMultiplier={ 1 }
            turnSpeed={ 30 }
            moveImpulsePointY={ 0.2 }

            jumpVel={ 7 }

            dragDampingC={ 0.15 }

            autoBalance={ false }
        >
            <mesh position-y={ 0 } castShadow>
                <capsuleGeometry args={ [ 0.4, 0.7, 4, 18 ] } />
                <meshLambertMaterial wireframe={ false } />
            </mesh>
        </Ecctrl>
    </KeyboardControls>
}