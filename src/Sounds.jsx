import { useEffect, useRef, useState } from 'react'
import useGame from './stores/useGame'

function remap(value, low1, high1, low2, high2)
{
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

import { Howl, Howler } from 'howler';

export default function Sounds()
{
    const [ muted, setMuted ] = useState(false)
    const [ music ] = useState(() => new Howl({
        src: [ './sounds/Clock.mp3' ],
        autoplay: true,
        volume: 0.5,
        loop: true,
        preload: true
    }))

    const [ good ] = useState(() => new Howl({
        src: [ './sounds/Mountain Audio - Small Chimes - Loop.mp3' ],
        autoplay: true,
        volume: 0,
        loop: true,
        preload: true
    }))

    const [ bad ] = useState(() => new Howl({
        src: [ './sounds/Ghostly Whisper Background Loop 9.mp3' ],
        autoplay: true,
        volume: 0,
        loop: true,
        preload: true
    }))
    
    const [ goodVisited ] = useState(() => new Howl({
        src: [ './sounds/punches/Quest_Game_Magic_Hit_Jewel_Collect_3.wav' ],
        volume: 0.5,
        preload: true
    }))
    
    const [ death ] = useState(() => new Howl({
        src: [ './sounds/swooshes/Magic Swoosh 2.mp3' ],
        volume: 0.5,
        preload: true
    }))
    
    const [ isTouch, goodBlockDistance, badBlockDistance, goodVisitedCount, deathCount ] = useGame(state => [ state.isTouch, state.goodBlockDistance, state.badBlockDistance, state.goodVisitedCount, state.deathCount ])

    const [ goodVolume ] = useState(() => ({ value: 0 }))
    const [ badVolume ] = useState(() => ({ value: 0 }))

    useEffect(() =>
    {
        let elapsedTime = 0
        const frame = (newElapsedTime) =>
        {
            const delta = newElapsedTime - elapsedTime
            elapsedTime = newElapsedTime
            
            requestAnimationFrame(frame)

            let goodStrength = remap(goodBlockDistance.value, 7, 1.5, 0, 1)
            goodStrength = Math.min(Math.max(goodStrength, 0), 1)
            goodStrength = Math.pow(goodStrength, 2)
            goodStrength = goodStrength * 0.6

            let badStrength = remap(badBlockDistance.value, 7, 1.5, 0, 1)
            badStrength = Math.min(Math.max(badStrength, 0), 1)
            badStrength = Math.pow(badStrength, 2)
            badStrength = badStrength * 0.8

            goodVolume.value += (goodStrength - goodVolume.value) * 0.001 * delta
            badVolume.value += (badStrength - badVolume.value) * 0.001 * delta

            good.volume(goodVolume.value)
            bad.volume(badVolume.value)
        }
        requestAnimationFrame(frame)

        return () =>
        {
            cancelAnimationFrame(frame)
        }
    }, [])

    useEffect(() =>
    {
        if(goodVisitedCount > 0)
            goodVisited.play()
    }, [ goodVisitedCount ])

    useEffect(() =>
    {
        if(deathCount > 0)
            death.play()
    }, [ deathCount ])

    useEffect(() =>
    {
        Howler.mute(muted)
    }, [ muted ])

    const button = useRef()

    const onClick = () =>
    {
        setMuted(!muted)
        button.current.blur()
    }

    return <button ref={ button } className={ `sound ${ isTouch ? 'is-touch' : '' } ${ muted ? 'is-muted' : '' }` } onClick={ onClick }>
        <span className="base"></span>
        <span className="lines">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
        </span>
    </button>
}