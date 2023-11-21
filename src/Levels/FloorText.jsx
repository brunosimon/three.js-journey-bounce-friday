import { Text } from '@react-three/drei'
import { MeshLambertMaterial } from 'three'

const brightMaterial = new MeshLambertMaterial({ color: '#555555' })
const darkMaterial = new MeshLambertMaterial({ color: '#cccccc' })

export default function FloorText({ index = 1, instructions = "", position = [ 0, 0.01, 3.5 ] })
{
    return <group position={ position }>

        {/* Lvl */}
        <Text
            material={ brightMaterial }
            position={ [ index >= 10 ? - 0.2 : 0, 0, - 0.25 ] }
            rotation-x={ - Math.PI * 0.5 }
            fontSize={ 0.5 }
            anchorX="right"
            anchorY="bottom-baseline"
            textAlign="right"
            font="./fonts/saira-stencil-one-v16-latin-regular.woff"
            text="lvl"
        />

        {/* Number */}
        <Text
            material={ darkMaterial }
            position={ [ index >= 10 ? - 0.2 : 0, 0, - 0.25 ] }
            rotation-x={ - Math.PI * 0.5 }
            anchorX="left"
            anchorY="bottom-baseline"
            textAlign="left"
            font="./fonts/saira-stencil-one-v16-latin-regular.woff"
            text={ index }
        />

        {/* Separator */}
        <mesh
            material={ brightMaterial }
            rotation-x={ - Math.PI * 0.5 }
            scale={ [ 1.25, 0.05, 1 ] }
        >
            <planeGeometry />
        </mesh>

        {/* Instructions */}
        { instructions && (
            <Text
                material={ darkMaterial }
                position={ [ 0, 0, 0.25 ] }
                rotation-x={ - Math.PI * 0.5 }
                fontSize={ 0.5 }
                font="./fonts/saira-stencil-one-v16-latin-regular.woff"
                maxWidth={ 6 }
                textAlign="center"
                text={ instructions }
                anchorY="top-cap"
            />
        ) }
        
    </group>
}