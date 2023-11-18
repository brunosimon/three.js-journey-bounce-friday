import { Vector3 } from 'three'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) =>
{
    return {
        status: 'loading', // Loading | playing | finishing | finished
        setStatus: (status) =>
        {
            set((state) =>
            {
                return { status }
            })
        },

        levelIndex: 0,
        finishLevel: () =>
        {
            set((state) =>
            {
                return { status: 'finishing' }
            })

            setTimeout(() =>
            {
                set((state) =>
                {
                    return {
                        status: 'finished'
                    }
                })
            }, 1000)

            setTimeout(() =>
            {
                set((state) =>
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
            set((state) =>
            {
                return { playerKey: state.playerKey + 1 }
            })
        }

    }
}))