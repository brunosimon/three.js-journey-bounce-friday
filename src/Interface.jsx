import useGame from './stores/useGame.jsx'

export default function Interface()
{
    const [ status, setStatus, setIsTouch ] = useGame(state => [ state.status, state.setStatus, state.setIsTouch ])
    
    const onStartClick = (event) =>
    {
        setStatus('started')
        setIsTouch(event.nativeEvent.pointerType === 'touch')
    }

    return <div className="interface">
        { status === 'intro' &&
            <div className="intro">
                <h1 className="title">Black Friday</h1>
                <h2 className="sub-title">50% discount!</h2>
                <div className="description">
                    <p>Finish each level to get one part of the discount code.</p>
                    <p>This game is also a demonstration of what you can do with Three.js and React Three Fiber.</p>
                </div>
                <button className="start-button" onClick={ onStartClick }>Start</button>
            </div>
        }
    </div>
}