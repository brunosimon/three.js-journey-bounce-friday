import { useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import useGame from '../stores/useGame'
import { useFrame } from '@react-three/fiber'
import Beams from './Beams.jsx'
import ShockWave from './ShockWave.jsx'

export default function Block({ bad = false, finished = false, onVisited = null, position = { x: 0, y: 0, z: 0 } })
{
    const [ playerPosition ] = useGame(state => [ state.playerPosition ])
    const [ visited, setVisited ] = useState(false)
    const [ animateKey, setAnimateKey ] = useState(0)
    const material = useRef()
    const beams = useRef()
    const shockWave = useRef()
    const settings = useControls('blocks', {
        toVisiteColor: { value: '#29a7ff' },
        toVisiteIntensity: { value: 5, min: 0, max: 20, step: 0.1 },
        badColor: { value: '#ff5c5c' },
        badIntensity: { value: 5.5, min: 0, max: 20, step: 0.1 },
        visitedColor: { value: '#6b65db' },
        visitedIntensity: { value: 10, min: 0, max: 20, step: 0.1 },
        finishedColor: { value: '#c3ff87' },
        finishedIntensity: { value: 2.4, min: 0, max: 20, step: 0.1 }
    })

    useEffect(() =>
    {
        let color = settings.toVisiteColor

        if(bad)
            color = settings.badColor
        else if(finished)
            color = settings.finishedColor
        else if(visited)
            color = settings.visitedColor
            
        let intensity = settings.toVisiteIntensity

        if(bad)
            intensity = settings.badIntensity
        else if(finished)
            intensity = settings.finishedIntensity
        else if(visited)
            intensity = settings.visitedIntensity

        material.current.color.set(color)
        material.current.color.multiplyScalar(intensity)

        if(beams.current)
            beams.current.material.uniforms.color.value.copy(material.current.color)

        if(shockWave.current)
            shockWave.current.material.uniforms.color.value.copy(material.current.color)
    }, [ finished, visited, settings ])

    useEffect(() =>
    {
        setAnimateKey(animateKey => animateKey + 1)
        if(visited)
        {
            onVisited()

            if(bad)
            {
                requestAnimationFrame(() =>
                {
                    setVisited(false)
                })
            }
        }
    }, [ visited ])

    useFrame(() =>
    {
        const flatDistance = Math.hypot(playerPosition.x - position.x, playerPosition.z - position.z)
        
        if(flatDistance < (bad ? 0.75 : 1))
        {
            const upDistance = playerPosition.y - position.y
            
            if(upDistance > 0 && upDistance < 1.5)
            {
                setVisited(true)
            }
        }
    })

    return <group position={ position }>
        <mesh position={ [ 0, 0.1, 0 ] }>
            <boxGeometry args={ [ 1, 0.1, 1 ] } />
            <meshBasicMaterial ref={ material } />

            { !bad && <Beams ref={ beams } /> }
            <ShockWave animateKey={ animateKey } ref={ shockWave } />
        </mesh>
    </group>
}