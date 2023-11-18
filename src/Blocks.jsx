import { useEffect, useState } from 'react'
import Block from './Block'
import useGame from './stores/useGame'

export default function Blocks({ positions = [] })
{
    const totalCount = positions.length
    const [ visitedCount, setVisitedCount ] = useState(0)
    const [ status, finishLevel ] = useGame(state => [ state.status, state.finishLevel ])

    const onBlockVisited = () =>
    {
        setVisitedCount((visitedCount) => visitedCount + 1)
    }

    useEffect(() =>
    {
        if(visitedCount === totalCount)
        {
            finishLevel()
        }
    }, [ visitedCount ])

    return <>
    
        { positions.map((position, index) =>
            <Block
                key={ index }
                onVisited={ onBlockVisited }
                finished={ status === 'finishing' || status === 'finished' }
                position={ position }
            />
        ) }
        

    </>
}