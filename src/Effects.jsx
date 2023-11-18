import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import useGame from './stores/useGame'
import anime from 'animejs'

export default function Effects()
{
    const [ status, levelIndex ] = useGame(state => [ state.status, state.levelIndex ])
    const bloomSettings = useControls('effects.bloom', {
        luminanceThreshold: { value: 1.4, min: 0, max: 3, step: 0.01 },
    })
    const overlaySettings = useControls('effects.overlay', {
        color: { value: '#000000' },
    })

    const overlayMaterial = useRef()

    useEffect(() =>
    {
        if(status === 'finished')
        {
            anime({
                targets: overlayMaterial.current.uniforms.alpha,
                value: 1,
                duration: 300,
                easing: 'easeOutQuad',
            })
        }
        else if(status === 'playing')
        {
            anime({
                targets: overlayMaterial.current.uniforms.alpha,
                value: 0,
                duration: 600,
                easing: 'easeInQuad',
            })
        }
    }, [ status ])

    return <>
        <EffectComposer disableNormalPass>
            <Bloom mipmapBlur luminanceThreshold={ bloomSettings.luminanceThreshold } />
        </EffectComposer>
        <mesh>
            <planeGeometry args={ [ 2, 2 ] } />
            <overlayMaterial ref={ overlayMaterial } alpha={ 0 } color={ overlaySettings.color } depthTest={ false } depthWrite={ false } transparent />
        </mesh>
    </>
}