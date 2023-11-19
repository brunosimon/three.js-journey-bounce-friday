import { EcctrlJoystick } from 'ecctrl'
import { useMemo } from 'react'
import { BoxGeometry, CylinderGeometry, Euler, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three'
import useGame from './stores/useGame.jsx'

export default function TouchControls()
{
    const [ isTouch ] = useGame(state => [ state.isTouch ])

    const cylinderGeometry = useMemo(() => new CylinderGeometry(2.3, 2.1, 0.3, 32, 1), [])
    const sphereGeometry = useMemo(() => new SphereGeometry(1.4, 32, 8), [])
    const boxGeometry = useMemo(() => new BoxGeometry(1, 1, 1), [])
    const activeMaterial = useMemo(() => new MeshBasicMaterial({ color: 0xffffff, wireframe: false }), [])
    const passiveMaterial = useMemo(() => new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 }), [])

    if(!isTouch)
        return null

    return <EcctrlJoystick
        joystickBaseProps={{
            geometry: cylinderGeometry,
            material: passiveMaterial
        }}
        joystickStickProps={{
            material: passiveMaterial
        }}
        joystickHandleProps={{
            geometry: sphereGeometry,
            rotation: new Euler(Math.PI * 0.5, 0, 0),
            material: activeMaterial
        }}
        buttonLargeBaseProps={{
            scale: new Vector3(4, 4, 4),
            geometry: boxGeometry,
            material: passiveMaterial
        }}
        buttonTop1Props={{
            scale: new Vector3(2, 2, 2),
            geometry: boxGeometry,
            material: activeMaterial
        }}
    />
}