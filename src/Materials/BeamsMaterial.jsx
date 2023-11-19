import vertexShader from './shaders/beams/vertex.glsl'
import fragmentShader from './shaders/beams/fragment.glsl'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Color } from 'three'

const BeamsMaterial = shaderMaterial(
    {
        color: new Color(0xffffff),
        time: 0
    },
    vertexShader,
    fragmentShader
)

extend({ BeamsMaterial })

export default BeamsMaterial