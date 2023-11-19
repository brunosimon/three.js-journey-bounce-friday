import { KeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Ecctrl from 'ecctrl'
import { useEffect, useRef } from 'react'
import useGame from './stores/useGame'

export default function Player()
{
    const ref = useRef()

    const [ playerPosition, playerKey, levelIndex ] = useGame(state => [ state.playerPosition, state.playerKey, state.levelIndex ])

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

    useEffect(reset, [ levelIndex, playerKey ])

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
            debug={ false }
            capsuleRadius={ 0.4 }
            
            camInitDis={ - 20 }
            camMaxDis={ - 25 }

            camInitDir={{ x: - 0.5, y: Math.PI, z: 0 }}
            camTargetPos={{ x: 0, y: 0, z: 0 }}
            camCollision={ false }


            maxVelLimit={ 5 }
            turnVelMultiplier={ 1 }
            turnSpeed={ 30 }
            moveImpulsePointY={ 0.2 }

            jumpVel={ 7 }

            dragDampingC={ 0.15 }

            autoBalance={ false }

            camCollisionOffset={ 100 }
        >
            <mesh position-y={ 0 } castShadow>
                <capsuleGeometry args={ [ 0.4, 0.7, 4, 18 ] } />
                <meshLambertMaterial wireframe={ false } />
            </mesh>
        </Ecctrl>
    </KeyboardControls>
}