uniform vec3 color;
uniform float time;

varying float vRandom;
varying vec2 vUv;

void main()
{
    float progress = mod(time * 0.2 * (1.0 + vRandom) + vRandom, 1.0);
    float strength = abs((vUv.y * 0.8 + 0.1) - progress);
    strength = step(strength, 0.1);

    if(strength < 0.5)
        discard;
        
    gl_FragColor = vec4(color, 1.0);

    // gl_FragColor = vec4(vUv, 1.0, 1.0);
}