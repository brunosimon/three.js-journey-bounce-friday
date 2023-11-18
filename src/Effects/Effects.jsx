import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import useGame from '../stores/useGame'
import anime from 'animejs'
import Overlay from './Overlay.jsx'

export default function Effects()
{
    const [ status ] = useGame(state => [ state.status ])
    const bloomSettings = useControls('effects.bloom', {
        luminanceThreshold: { value: 1.4, min: 0, max: 3, step: 0.01 },
    })
    const overlay = useRef()

    useEffect(() =>
    {
        if(status === 'finished')
        {
            anime({
                targets: overlay.current.uniforms.get('alpha'),
                value: 1,
                duration: 300,
                easing: 'easeOutQuad',
            })
        }
        else if(status === 'playing')
        {
            anime({
                targets: overlay.current.uniforms.get('alpha'),
                value: 0,
                duration: 600,
                easing: 'easeInQuad',
            })
        }
    }, [ status ])

    return <>
        <EffectComposer disableNormalPass>
            <Bloom mipmapBlur luminanceThreshold={ bloomSettings.luminanceThreshold } />
            <Overlay ref={ overlay } />
            <ToneMapping />
        </EffectComposer>
    </>
}