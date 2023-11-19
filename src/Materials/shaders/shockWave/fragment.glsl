#define M_PI 3.1415926535897932384626433832795

uniform vec3 color;
uniform float outerProgress;
uniform float radialProgress;

varying vec2 vUv;

float inverseLerp(float v, float minValue, float maxValue)
{
    return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax)
{
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main()
{
    float outerStrength = max(abs((vUv.x - 0.5) * 2.0), abs((vUv.y - 0.5) * 2.0));

    float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
    float radialStrength = sin(angle * 6.0) * 0.5 + 0.5;
    radialStrength += sin(angle * 10.0) * 0.5 + 0.5;
    radialStrength += sin(angle * 15.0) * 0.5 + 0.5;
    radialStrength /= 3.0;

    if(outerStrength < outerProgress || radialStrength < radialProgress)
        discard;
        
    gl_FragColor = vec4(color, 1.0);
}