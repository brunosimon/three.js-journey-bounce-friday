import { useEffect, useState } from 'react'
import Block from './Block'
import useGame from '../stores/useGame.jsx'
import { useFrame } from '@react-three/fiber'

export default function Blocks({ goods = [], bads = [] })
{
    const totalCount = goods.length
    const [ visitedCount, setVisitedCount ] = useState(0)
    const [ status, finishLevel, death, playerPosition, goodBlockDistance, badBlockDistance, goodVisited ] = useGame(state => [ state.status, state.finishLevel, state.death, state.playerPosition, state.goodBlockDistance, state.badBlockDistance, state.goodVisited ])

    const onBlockVisited = () =>
    {
        goodVisited()
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

    useFrame(() =>
    {
        let goodDistance = 999

        for(const good of goods)
        {
            const distance = good.position.distanceTo(playerPosition)

            if(distance < goodDistance)
                goodDistance = distance
        }
        
        let badDistance = 999

        for(const bad of bads)
        {
            const distance = bad.position.distanceTo(playerPosition)

            if(distance < badDistance)
                badDistance = distance
        }

        goodBlockDistance.value = goodDistance
        badBlockDistance.value = badDistance
    })

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
                onVisited={ death }
                position={ item.position }
                scale={ item.scale }
                bad={ true }
            />
        ) }

    </>
}