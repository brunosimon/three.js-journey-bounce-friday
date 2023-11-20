import { KeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Ecctrl from 'ecctrl'
import { useEffect, useRef } from 'react'
import useGame from './stores/useGame'
import { FrontSide } from 'three'
import * as RAPIER from '@dimforge/rapier3d-compat'
import { useRapier } from '@react-three/rapier'

export default function Player()
{
    const ref = useRef()
    const indicator = useRef()

    const { rapier, world } = useRapier()

    const [ playerPosition, deathCount, levelIndex, death ] = useGame(state => [ state.playerPosition, state.deathCount, state.levelIndex, state.death ])

    useFrame(() =>
    {
        if(ref.current)
        {
            const position = ref.current.translation()

            // Reset
            if(position.y < - 6)
            {
                reset()
                death()
            }

            // Store
            playerPosition.copy(position)

            // Indicator
            const origin = position
            origin.y -= 0.76
            const direction = { x: 0, y: - 1, z: 0 }
            const ray = new rapier.Ray(origin, direction)
            const hit = world.castRay(ray, 10, true)

            indicator.current.position.copy(position)
            indicator.current.position.y -= hit ? hit.toi : 1000
        }
    })

    const reset = () =>
    {
        ref.current.setTranslation({ x: 0, y: 1, z: 2 })
        ref.current.setLinvel({ x: 0, y: 0, z: 0 })
        ref.current.setAngvel({ x: 0, y: 0, z: 0 })
    }

    useEffect(reset, [ levelIndex, deathCount ])

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
            
            camInitDis={ - 25 }
            camMaxDis={ - 35 }

            camInitDir={{ x: - 0.5, y: Math.PI, z: 0 }}
            camTargetPos={{ x: 0, y: 0, z: 0 }}
            camCollision={ false }


            maxVelLimit={ 5 }
            turnVelMultiplier={ 1 }
            turnSpeed={ 90 }
            moveImpulsePointY={ 0.2 }

            jumpVel={ 7 }

            dragDampingC={ 0.15 }

            autoBalance={ true }

            camCollisionOffset={ 100 }
        >
            <mesh position-y={ 0 } castShadow>
                <capsuleGeometry args={ [ 0.4, 0.7, 4, 18 ] } />
                <meshLambertMaterial wireframe={ false } shadowSide={ FrontSide } />
            </mesh>
        </Ecctrl>
        <mesh ref={ indicator }>
            <cylinderGeometry args={ [ 0.1, 0.1, 0.02 ] } />
            <meshBasicMaterial color="#555555" />
        </mesh>
    </KeyboardControls>
}