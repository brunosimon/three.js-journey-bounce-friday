import { Text } from '@react-three/drei'

export default function FloorText({ index = 1, instructions = "", position = [ 0, 0.01, 3.5 ] })
{
    return <group position={ position }>
        <Text
            position={ [ 0, 0, - 0.25 ] }
            rotation-x={ - Math.PI * 0.5 }
            fontSize={ 0.5 }
            anchorX="right"
            anchorY="bottom-baseline"
            textAlign="right"
            font="./fonts/saira-stencil-one-v16-latin-regular.woff"
        >
            lvl
            <meshLambertMaterial color="#555555" />
        </Text>

        <Text
            position={ [ 0, 0, - 0.25 ] }
            rotation-x={ - Math.PI * 0.5 }
            anchorX="left"
            anchorY="bottom-baseline"
            textAlign="left"
            font="./fonts/saira-stencil-one-v16-latin-regular.woff"
            text={ index }
        >
            <meshLambertMaterial color="#cccccc" />
        </Text>

        <mesh
            rotation-x={ - Math.PI * 0.5 }
            scale={ [ 2, 0.05, 1 ] }
        >
            <planeGeometry />
            <meshLambertMaterial color="#555555" />
        </mesh>

        { instructions && <Text
            position={ [ 0, 0, 0.25 ] }
            rotation-x={ - Math.PI * 0.5 }
            fontSize={ 0.5 }
            font="./fonts/saira-stencil-one-v16-latin-regular.woff"
            text={ instructions }
            anchorY="top-cap"
        >
            <meshLambertMaterial color="#cccccc" />
        </Text> }
        
    </group>
}