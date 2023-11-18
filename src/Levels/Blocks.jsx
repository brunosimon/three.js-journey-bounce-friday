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
        if(visitedCount === totalCount)
        {
            finishLevel()
        }
    }, [ visitedCount ])

    return <>
    
        { goods.map((item, index) =>
            <Block
                key={ index }
                onVisited={ onBlockVisited }
                finished={ status === 'finishing' || status === 'finished' }
                position={ item }
            />
        ) }
    
        { bads.map((item, index) =>
            <Block
                key={ index }
                onVisited={ resetPlayer }
                position={ item }
                bad={ true }
            />
        ) }
        

    </>
}