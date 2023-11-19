import vertexShader from './shaders/shockWave/vertex.glsl'
import fragmentShader from './shaders/shockWave/fragment.glsl'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Color } from 'three'

const ShockWaveMaterial = shaderMaterial(
    {
        color: new Color(0xffffff),
        outerProgress: 0,
        radialProgress: 0,
    },
    vertexShader,
    fragmentShader
)

extend({ ShockWaveMaterial })

export default ShockWaveMaterial