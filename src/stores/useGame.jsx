import { Vector3 } from 'three'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) =>
{
    return {
        status: 'intro', // intro | loading | playing | finishing | finished
        setStatus: (status) =>
        {
            console.log('setStatus')
            set(state => ({ status }))
        },

        isTouch: false,
        setIsTouch: (isTouch) =>
        {
            set(state => ({ isTouch }))
        },

        levels: [
            { modelPath: './levels/0.glb', instructions: 'Walk on the blue square' },
            { modelPath: './levels/1.glb', instructions: 'How about multiple squares?' },
            { modelPath: './levels/2.glb', instructions: 'That red one looks friendly' },
            { modelPath: './levels/3.glb', instructions: 'Press SPACE to jump' },
            { modelPath: './levels/4.glb', instructions: 'I know you like to break stuff' },
            { modelPath: './levels/5.glb', instructions: 'You get the idea' },
            { modelPath: './levels/6.glb', instructions: 'Press SHIFT to sprint' },
            { modelPath: './levels/7.glb', instructions: 'Huh?' },
            { modelPath: './levels/8.glb', instructions: 'You got this!' },
            { modelPath: './levels/9.glb', instructions: 'Do you like puzzles?' },
            { modelPath: './levels/10.glb', instructions: 'Don\'t forget to scream "Parkour!"' },
            { modelPath: './levels/11.glb', instructions: 'Take it slow' },
        ],
        levelIndex: 0,
        start: () =>
        {
            set(state => ({
                status: 'playing',
                levelIndex: 0,
            }))
        },
        finishLevel: () =>
        {
            set(state => ({ status: 'finishing' }))

            setTimeout(() =>
            {
                set(state => ({ status: 'finished' }))

                setTimeout(() =>
                {
                    set(state =>
                    {
                        if(state.levelIndex >= state.levels.length - 1)
                            return {
                                status: 'outro'
                            }
                        else
                            return {
                                levelIndex: state.levelIndex + 1,
                                status: 'playing'
                            }
                    })
                }, 500)
            }, 1000)
        },

        playerPosition: new Vector3(0, 1, 0),

        goodBlockDistance: { value: 999 },
        badBlockDistance: { value: 999 },

        goodVisitedCount: 0,
        goodVisited: () =>
        {
            set(state => ({ goodVisitedCount: state.goodVisitedCount + 1 }))
        },

        deathCount: 0,
        death: () =>
        {
            set(state => ({ deathCount: state.deathCount + 1 }))
        },
    }
}))