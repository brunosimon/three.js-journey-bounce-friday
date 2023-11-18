import { Text } from '@react-three/drei'
import Blocks from './Blocks.jsx'
import Floor from './Floor.jsx'
import useGame from './stores/useGame.jsx'

function LevelText({ index = 1, instructions = "" })
{
    return <group position={ [ 0, 0.01, 1 ] }>
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

function Level0()
{
    return <>
        <LevelText
            index="1"
            instructions="Get to the orange square"
        />
        <Floor size={ 10 } />
        <Blocks
            positions={ [
                [ 0, 0.05, - 2 ],
            ] }
        />
    </>
}

function Level1()
{
    return <>
        <LevelText
            index="2"
            instructions="Multiple squares?"
        />
        <Floor size={ 10 } />
        <Blocks
            positions={ [
                [ 0, 0.05, - 2 ],
                [ 2, 0.05, - 2 ],
                [ - 2, 0.05, - 2 ],
            ] }
        />
    </>
}

function Level2()
{
    return <>
        <LevelText
            index="3"
            instructions="I'm sure you get it now"
        />
        <Floor size={ 10 } />
        <Blocks
            positions={ [
                [ 2, 0.05, 0 ],
            ] }
        />
    </>
}

export default function Levels()
{
    const [ levelIndex ] = useGame(state => [ state.levelIndex ])

    const LevelsConstructors = [
        Level0,
        Level1,
        Level2
    ]
    const LevelConstructor = LevelsConstructors[ levelIndex % LevelsConstructors.length ]

    return <LevelConstructor />
}