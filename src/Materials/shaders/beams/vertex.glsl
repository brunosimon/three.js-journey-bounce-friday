attribute float random;

varying float vRandom;
varying vec2 vUv;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vRandom = random;
    vUv = uv;
}