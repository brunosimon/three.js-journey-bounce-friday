import anime from 'animejs'
import { forwardRef, useEffect, useRef } from 'react'
import { PlaneGeometry } from 'three'

const shockWaveGeometry = new PlaneGeometry()
shockWaveGeometry.rotateX(- Math.PI * 0.5)

export default forwardRef(function ShockWave({ animateKey = false, color = 'red' }, ref)
{
    const material = useRef()

    useEffect(() =>
    {
        if(animateKey)
        {
            material.current.uniforms.outerProgress.value = 0
            material.current.uniforms.radialProgress.value = 0
            ref.current.scale.set(1, 1, 1)

            anime({
                targets: material.current.uniforms.outerProgress,
                value: 0.98,
                duration: 200,
                easing: 'easeOutCirc',
                update: (anim) =>
                {
                    const scale = 1 + anim.progress / 100
                    ref.current.scale.set(scale, scale, scale)
                }
            })
            anime({
                targets: material.current.uniforms.radialProgress,
                value: 1,
                duration: 1000,
                delay: 150,
                easing: 'easeOutSine'
            })
        }
    }, [ animateKey ])
    
    return <mesh ref={ ref } geometry={ shockWaveGeometry } scale={ 1 }>
        <shockWaveMaterial ref={ material } color={ color } />
    </mesh>
})