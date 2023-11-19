import { useFrame } from '@react-three/fiber'
import { forwardRef, useRef } from 'react'
import { BufferAttribute, DoubleSide, PlaneGeometry } from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const geometries = []

for(let i = 0; i < 15; i++)
{
    const height = 1 + Math.random() * 2
    const geometry = new PlaneGeometry(0.1, height)
    geometry.rotateY(Math.random() * Math.PI)

    const randomArray = new Float32Array(4)
    const randomValue = Math.random()

    for(let i = 0; i < 4; i++)
        randomArray[i] = randomValue
        
    geometry.setAttribute('random', new BufferAttribute(randomArray, 1))

    geometry.translate(
        (Math.random() - 0.5) * 1,
        height * 0.5,
        (Math.random() - 0.5) * 1
    )

    geometries.push(geometry)
}
const beamsGeometry = BufferGeometryUtils.mergeGeometries(geometries)

export default forwardRef(function Beams({ color = 'red' }, ref)
{
    const material = useRef()
    
    useFrame((_, delta) =>
    {
        material.current.uniforms.time.value += delta
    })

    return <mesh ref={ ref } geometry={ beamsGeometry }>
        <beamsMaterial ref={ material } color={ color } side={ DoubleSide } />
    </mesh>
})