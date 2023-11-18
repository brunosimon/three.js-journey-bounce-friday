import OverlayEffect from './OverlayEffect.jsx'
import { forwardRef, useState } from 'react'

export default forwardRef(function Overlay(props, ref)
{
    const [ effect ] = useState(() => new OverlayEffect(props))
    
    return <primitive ref={ ref } object={ effect } />
})