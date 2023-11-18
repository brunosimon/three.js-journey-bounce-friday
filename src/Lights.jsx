import { useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import { Vector3 } from 'three'

export default function Lights()
{
    const lights = useRef([])
    const lightsCount = 3
    const directionalSettings = useControls(
        'lights.directional',
        {
            intensity: { value: 2.5, min: 0, max: 30, step: 0.1 },
            distance: { value: 5, min: 0, max: 10, step: 0.1 },
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
    
    useEffect(() =>
    {
        for(const light of lights.current)
            light.position.setFromSphericalCoords(directionalSettings.distance, directionalSettings.phi, directionalSettings.theta)

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
                shadow-mapSize={ 128 / Math.pow(2, key) }
                shadow-camera-near={ 1 }
                shadow-camera-far={ 10 }
                shadow-camera-top={ 5 }
                shadow-camera-right={ 5 }
                shadow-camera-bottom={ - 5 }
                shadow-camera-left={ - 5 }
                shadow-bias={ - 0.01 }
                color={ directionalSettings.color }
            />
        }) }
        <ambientLight { ...ambientSettings } />
    </>
}