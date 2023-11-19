import Blocks from './Blocks.jsx'
import FloorText from './FloorText.jsx'
import useGame from '../stores/useGame.jsx'
import { RigidBody } from '@react-three/rapier'
import { FrontSide } from 'three'
import { useGLTF } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

function Dyamic({ element })
{
    const ref = useRef()
    const [ initialPosition ] = useState(() => element.position.clone())
    const [ initialRotation ] = useState(() => element.quaternion.clone())

    const reset = () =>
    {
        ref.current.setLinvel({ x: 0, y: 0, z: 0 })
        ref.current.setAngvel({ x: 0, y: 0, z: 0 })
        ref.current.setTranslation(initialPosition)
        ref.current.setRotation(initialRotation)
    }

    useFrame(() =>
    {
        if(ref.current)
        {
            const position = ref.current.translation()
            if(position.y < - 6)
                reset()
        }
    })

    return <RigidBody
        ref={ ref }
        position={ element.position }
        density={ 0.15 }
        friction={ 0.75 }
        type="dynamic" colliders="cuboid"
    >
        <mesh geometry={ element.geometry } castShadow receiveShadow>
            <meshLambertMaterial dithering shadowSide={ FrontSide } color="#2f2f2f" />
        </mesh>
    </RigidBody>
}

function Level({ modelPath, index, instructions = "" })
{
    const model = useGLTF(modelPath)

    const elements = useMemo(() =>
    {
        const elements = {
            fixed: null,
            dynamic: [],
            blocksGood: [],
            blocksBad: [],
        }

        for(const nodeKey in model.nodes)
        {
            if(nodeKey.startsWith('fixed'))
                elements.fixed = model.nodes[nodeKey]
            else if(nodeKey.startsWith('dynamic'))
                elements.dynamic = model.nodes[nodeKey].children
            else if(nodeKey.startsWith('blocksGood'))
                elements.blocksGood = model.nodes[nodeKey].children
            else if(nodeKey.startsWith('blocksBad'))
                elements.blocksBad = model.nodes[nodeKey].children
        }

        return elements
    }, [ model ])

    return <>
        <RigidBody type="fixed" colliders="trimesh" friction={ 0.75 }>
            <mesh geometry={ elements.fixed.geometry } castShadow receiveShadow>
                <meshLambertMaterial dithering shadowSide={ FrontSide } color="#2f2f2f" />
            </mesh>
        </RigidBody>

        { elements.dynamic.map((element, index) => <Dyamic key={ index } element={ element } />) }

        <FloorText
            index={ index }
            instructions={ instructions }
        />

        <Blocks
            goods={ elements.blocksGood }
            bads={ elements.blocksBad }
        />
    </>
}

export default function Levels()
{
    const [ levelIndex ] = useGame(state => [ state.levelIndex ])

    const settings = [
        // { modelPath: './levels/0.glb', instructions: 'Walk on the blue square' },
        // { modelPath: './levels/1.glb', instructions: 'How about multiple squares?' },
        // { modelPath: './levels/2.glb', instructions: 'That red one looks friendly' },
        // { modelPath: './levels/3.glb', instructions: 'Let\'s do a little jump' },
        // { modelPath: './levels/4.glb', instructions: 'I mean… Physics…' },
        // { modelPath: './levels/5.glb', instructions: 'You get the idea' },
        // { modelPath: './levels/6.glb', instructions: 'You know you can sprint. Right?' },
        // { modelPath: './levels/7.glb', instructions: 'Huh?' },
        // { modelPath: './levels/8.glb', instructions: 'You got this!' },
        // { modelPath: './levels/9.glb', instructions: 'Think' },
        { modelPath: './levels/10.glb', instructions: 'Parcour!' },
    ]

    const setting = settings[ levelIndex % settings.length ]

    return <Level
        key={ levelIndex }
        modelPath={ setting.modelPath }
        index={ levelIndex + 1 }
        instructions={ setting.instructions }
    />
}