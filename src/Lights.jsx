import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef, useState } from 'react'
import { CameraHelper, Vector3 } from 'three'
import useGame from './stores/useGame'
import { useHelper } from '@react-three/drei'

export default function Lights()
{
    const [ playerPosition ] = useGame(state => [ state.playerPosition ])

    const lights = useRef([])
    const lightsCount = 3
    const directionalSettings = useControls(
        'lights.directional',
        {
            intensity: { value: 2.5, min: 0, max: 30, step: 0.1 },
            distance: { value: 10, min: 0, max: 20, step: 0.1 },
            phi: { value: 0.7, min: 0, max: Math.PI, step: 0.1 },
            theta: { value: 1.1, min: - Math.PI, max: Math.PI, step: 0.1 },
            color: { value: '#ffffff' },
        }
    )
    const ambientSettings = useControls(
        'lights.ambient',
        {
            intensity: { value: 1, min: 0, max: 3, step: 0.1 },
            color: { value: '#ffffff' },
        }
    )

    const [ position ] = useState(() => new Vector3() )
    
    useFrame(() =>
    {
        for(const light of lights.current)
        {
            light.position.setFromSphericalCoords(directionalSettings.distance, directionalSettings.phi, directionalSettings.theta)
            light.position.add(playerPosition)
            light.target.position.copy(playerPosition)
            light.target.updateWorldMatrix()
        }

    }, [ lights, directionalSettings ])
    
    return <>
        { [...Array(lightsCount)].map((_, key) =>
        {
            return <directionalLight
                key={ key }
                castShadow
                ref={ (ref) => { lights.current[key] = ref } }
                position={ [ position.x, position.y, position.z ] }
                intensity={ directionalSettings.intensity / lightsCount }
                shadow-mapSize={ 512 / Math.pow(2, key) }
                shadow-camera-near={ 1 }
                shadow-camera-far={ 20 }
                shadow-camera-top={ 20 }
                shadow-camera-right={ 20 }
                shadow-camera-bottom={ - 20 }
                shadow-camera-left={ - 20 }
                shadow-bias={ - 0.05 }
                color={ directionalSettings.color }
            />
        }) }
        <ambientLight { ...ambientSettings } />
    </>
}