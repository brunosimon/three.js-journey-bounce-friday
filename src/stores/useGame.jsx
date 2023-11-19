import { Vector3 } from 'three'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) =>
{
    return {

        status: 'intro', // intro | loading | playing | finishing | finished
        setStatus: (status) =>
        {
            set(state => ({ status }))
        },

        isTouch: false,
        setIsTouch: (isTouch) =>
        {
            set(state => ({ isTouch }))
        },

        levelIndex: 0,
        finishLevel: () =>
        {
            set(state => ({ status: 'finishing' }))

            setTimeout(() =>
            {
                set(state => ({ status: 'finished' }))
            }, 1000)

            setTimeout(() =>
            {
                set(state =>
                {
                    return {
                        levelIndex: state.levelIndex + 1,
                        status: 'playing'
                    }
                })
            }, 1500)
        },

        playerPosition: new Vector3(0, 1, 0),
        playerKey: 1,
        resetPlayer: () =>
        {
            set(state => ({ playerKey: state.playerKey + 1 }))
        }

    }
}))