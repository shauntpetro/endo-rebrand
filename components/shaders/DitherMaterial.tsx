import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const DitherMaterialImpl = shaderMaterial(
  {
    uColor: new THREE.Color("#C9A961"),
    uColorDark: new THREE.Color("#A68945"),
    uTime: 0,
    uResolution: new THREE.Vector2(1, 1),
    uLightPosition: new THREE.Vector3(10, 10, 10),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vPosition = position;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColor;
    uniform vec3 uColorDark;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec3 uLightPosition;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;

    // Simplex noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Lighting calculations
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(uLightPosition);
      
      // Diffuse lighting
      float diffuse = max(dot(normal, lightDir), 0.0);
      
      // Rim lighting
      float rim = 1.0 - max(dot(viewDir, normal), 0.0);
      rim = pow(rim, 3.0);
      
      // Noise / Dither pattern
      float noiseScale = 800.0;
      float noiseVal = snoise(gl_FragCoord.xy / 2.0); // Screen space noise
      
      // Mix lighting with noise
      float lightIntensity = diffuse + rim * 0.5;
      
      // Dithering threshold
      // We use the screen space noise to break up the smooth gradients
      float dither = step(0.0, lightIntensity - (noiseVal * 0.1 + 0.5));
      
      // Smooth the dither slightly for "modern" feel (antialiased dither)
      float smoothDither = smoothstep(0.45, 0.55, lightIntensity + noiseVal * 0.05);
      
      // Final color mix
      vec3 finalColor = mix(uColorDark, uColor, smoothDither);
      
      // Add extra rim glow
      finalColor += uColor * rim * 0.5;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Don't extend here - let the component that uses it handle extension
// This prevents duplicate registration issues

export { DitherMaterialImpl };



