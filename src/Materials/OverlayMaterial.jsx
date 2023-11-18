import vertexShader from './shaders/overlay/vertex.glsl'
import fragmentShader from './shaders/overlay/fragment.glsl'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Color } from 'three'

const OverlayMaterial = shaderMaterial(
    {
        color: new Color(0x000000),
        alpha: 1
    },
    vertexShader,
    fragmentShader
)

extend({ OverlayMaterial })

export default OverlayMaterial