import { useEffect, useRef } from 'react'
import useGame from './stores/useGame.jsx'

export default function Interface()
{
    const startButton = useRef()
    const [ status, start, setIsTouch ] = useGame(state => [ state.status, state.start, state.setIsTouch ])
    
    const onStartClick = (event, data) =>
    {
        start()
        startButton.current.blur()
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
    
        {/* Intro / outro */}
        <div className={ `screen intro ${ status === 'intro' || status === 'outro' ? 'is-visible' : '' }` }>
            <h1 className="title">Bounce Friday</h1>
            <h2 className="sub-title">A <a href="https://threejs-journey.com" target="_blank">Three.js Journey</a> game by <a href="https://bruno-simon.com" target="_blank">Bruno Simon</a> for BLACK FRIDAY</h2>
            <div className="description">
                <div className="side is-left">
                    <div className="sub-title">Presentation</div>
                    <p>This platform game was created in less than 24 hours to demonstrate what can be built with Three.js.</p>
                    <p>
                        Interested in learning how to create this type of experience?
                        <br /><a href="https://threejs-journey.com" target="_blank">Three.js Journey</a> is the most complete course you need!
                    </p>
                    <p>Get <a class="highlight" href="https://threejs-journey.com" target="_blank">50% OFF</a> today for <a href="https://threejs-journey.com" target="_blank">Black Friday</a>!</p>
                </div>
                <div className="side is-right">
                    <div className="sub-title">Credits</div>
                    <ul>
                        <li><a href="https://threejs.org" target="_blank">Three.js</a></li>
                        <li><a href="https://react.dev" target="_blank">React</a></li>
                        <li><a href="https://docs.pmnd.rs/react-three-fiber" target="_blank">React Three Fiber</a></li>
                        <li><a href="https://github.com/pmndrs/ecctrl/" target="_blank">Ecctrl</a></li>
                        <li><a href="https://github.com/pmndrs/postprocessing" target="_blank">Postprocessing</a></li>
                        <li>Find more on <a href="https://github.com/brunosimon/three.js-journey-2023-black-friday" target="_blank">GitHub</a></li>
                    </ul>
                </div>
            </div>
            <button ref={ startButton } className="start-button" onTouchStart={ onTouchStart } onClick={ onStartClick }>
                <div className="video">
                    <video src="./videos/button-preview.mp4" muted autoPlay loop />
                </div>
                { status === 'intro' && (
                    <div className="label"><span className="letter neg-2">s</span><span className="letter neg-1">t</span>a<span className="letter pos-1">r</span><span className="letter pos-2">t</span></div>
                ) }
                { status === 'outro' && (
                    <div className="label"><span className="letter neg-3">r</span><span className="letter neg-2">e</span><span className="letter neg-1">s</span><span className="letter">t</span><span className="letter pos-1">a</span><span className="letter pos-2">r</span><span className="letter pos-3">t</span></div>
                ) }
                
            </button>
        </div>

    </div>
}