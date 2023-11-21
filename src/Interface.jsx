import { useEffect } from 'react'
import useGame from './stores/useGame.jsx'

export default function Interface()
{
    const [ status, start, setIsTouch ] = useGame(state => [ state.status, state.start, state.setIsTouch ])
    
    const onStartClick = (event) =>
    {
        if(status === 'intro' || status === 'outro')
            start()
    }

    const onTouchStart = () =>
    {
        setIsTouch(true)
    }

    // // Skip
    // useEffect(() =>
    // {
    //     start('started')
    // }, [])

    return <div className="interface">
    
        {/* Intro */}
        <div className={ `screen intro ${ status === 'intro' ? 'is-visible' : '' }` }>
            <h1 className="title">Black Friday</h1>
            <h2 className="sub-title">A <a href="https://threejs-journey.com" target="_blank">Three.js Journey</a> game</h2>
            <div className="description">
                <p><a href="https://threejs-journey.com" target="_blank">Three.js Journey</a> is currently <a href="https://threejs-journey.com" target="_blank">50% off</a> for Black Friday!</p>
                <p>To celebrate and demonstrate what can be built with Three.js, here's a little platform game.</p>
            </div>
            <button className="start-button" onTouchStart={ onTouchStart } onClick={ onStartClick }>
                <div className="video">
                    <video src="./videos/button-preview.mp4" muted autoPlay loop />
                </div>
                <div className="label">Start</div>
            </button>
        </div>

        {/* Outro */}
        <div className={ `screen outro ${ status === 'outro' ? 'is-visible' : '' }` }>
            <h1 className="title">Black Friday</h1>
            <h2 className="sub-title">A <a href="https://threejs-journey.com" target="_blank">Three.js Journey</a> game</h2>
            <div className="description">
                <p>Thanks to <a href="https://threejs.org" target="_blank">Three.js</a> and <a href="https://docs.pmnd.rs/react-three-fiber/" target="_blank">React Three Fiber</a>, it only took a few days to create this game.</p>
                <p>Want to learn how to create this kind of experience?<br/>Join <a href="https://threejs-journey.com" target="_blank">Three.js Journey</a>.</p>
                <p>Currently <a href="https://threejs-journey.com" target="_blank">50% off</a>!</p>
            </div>
            <button className="start-button" onTouchStart={ onTouchStart } onClick={ onStartClick }>
                <div className="video">
                    <video src="./videos/button-preview.mp4" muted autoPlay loop />
                </div>
                <div className="label">RESTART</div>
            </button>
        </div>

    </div>
}