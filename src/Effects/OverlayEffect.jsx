import { BlendFunction, Effect } from 'postprocessing'
import { Uniform } from 'three'

const fragmentShader = /* glsl */`
    uniform float alpha;

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        // outputColor = vec4(mix(inputColor.rbg, vec3(0.0), alpha), inputColor.a);
        outputColor = vec4(vec3(inputColor * (1.0 - alpha)), 1.0);
    }
`

export default class OverlayEffect extends Effect
{
    constructor()
    {
        super(
            'OverlayEffect',
            fragmentShader,
            {
                // blendFunction: BlendFunction.NORMAL,
                uniforms: new Map([
                    [ 'alpha', new Uniform(0) ]
                ])
            }
        )
    }
}