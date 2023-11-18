import Blocks from './Blocks.jsx'
import Floor from './Floor.jsx'
import useGame from './stores/useGame.jsx'

function Level0()
{
    return <>
        <Floor size={ 10 } />
        <Blocks
            positions={ [
                [ 0, 0.05, 2 ],
            ] }
        />
    </>
}

function Level1()
{
    return <>
        <Floor size={ 10 } />
        <Blocks
            positions={ [
                [ 0, 0.05, 2 ],
                [ 2, 0.05, 2 ],
                [ - 2, 0.05, 2 ],
            ] }
        />
    </>
}

function Level2()
{
    return <>
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