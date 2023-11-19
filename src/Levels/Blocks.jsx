import { useEffect, useState } from 'react'
import Block from './Block'
import useGame from '../stores/useGame'

export default function Blocks({ goods = [], bads = [] })
{
    const totalCount = goods.length
    const [ visitedCount, setVisitedCount ] = useState(0)
    const [ status, finishLevel, resetPlayer ] = useGame(state => [ state.status, state.finishLevel, state.resetPlayer ])

    const onBlockVisited = () =>
    {
        setVisitedCount((visitedCount) => visitedCount + 1)
    }

    useEffect(() =>
    {
        let title = ''

        if(visitedCount === totalCount)
        {
            finishLevel()

            for(let i = 0; i < totalCount; i++)
                title += '🟩'
        }
        else
        {
            for(let i = 0; i < visitedCount; i++)
                title += '🟪'
            for(let i = visitedCount; i < totalCount; i++)
                title += '🟦'
        }

        document.title = title
    }, [ visitedCount ])

    return <>
    
        { goods.map((item, index) =>
            <Block
                key={ index }
                onVisited={ onBlockVisited }
                finished={ status === 'finishing' || status === 'finished' }
                position={ item.position }
                scale={ item.scale }
            />
        ) }
    
        { bads.map((item, index) =>
            <Block
                key={ index }
                onVisited={ resetPlayer }
                position={ item.position }
                scale={ item.scale }
                bad={ true }
            />
        ) }
        

    </>
}