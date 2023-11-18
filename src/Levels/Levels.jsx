import Blocks from './Blocks.jsx'
import Floor from './Floor.jsx'
import FloorText from './FloorText.jsx'
import useGame from '../stores/useGame.jsx'
import { RigidBody } from '@react-three/rapier'
import { FrontSide } from 'three'

function Level0()
{
    return <>
        <FloorText
            index="1"
            instructions="Walk on the blue square"
        />
        <Floor size={ 10 } />
        <Blocks
            goods={ [
                [ 0, 0.05, - 2 ],
            ] }
        />
    </>
}

function Level1()
{
    return <>
        <FloorText
            index="2"
            instructions="Multiple squares?"
        />
        <Floor size={ 10 } />
        <Blocks
            goods={ [
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
        <FloorText
            index="3"
            instructions="You can jump?!"
        />
        <Floor size={ 10 } />
        <Blocks
            goods={ [
                [ 0, 1.05, - 2 ],
            ] }
        />
        <RigidBody type="fixed">
            <mesh scale={ [ 3, 1, 3 ] } position={ [ 0, 0.5, - 2 ] } castShadow receiveShadow>
                <boxGeometry args={ [ 1, 1, 1 ] } />
                <meshLambertMaterial shadowSide={ FrontSide } color="#2a2a2a" />
            </mesh>
        </RigidBody>
    </>
}

function Level3()
{
    return <>
        <FloorText
            index="4"
            instructions="This red block looks friendly"
        />
        <Floor size={ 10 } />
        <Blocks
            goods={ [
                [ 0, 0.05, - 3.5 ],
            ] }
            bads={ [
                [ 0, 0.05, - 2 ],
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
        Level2,
        Level3
    ]
    const LevelConstructor = LevelsConstructors[ levelIndex % LevelsConstructors.length ]

    return <LevelConstructor />
}