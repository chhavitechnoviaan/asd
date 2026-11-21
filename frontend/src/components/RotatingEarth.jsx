import { useEffect, useRef, useState } from "react";
import earthTexture from "../assets/earth-realistic.jpg";
import fallbackGlobe from "../assets/asd-holographic-globe.png";

// Real satellite-textured sphere, rendered with WebGL (no extra dependencies).
export default function RotatingEarth() {
  const ref = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) { setFallback(true); return; }

    let alive = true;
    let frame = 0;
    let program, texture, buffer, vertexShader, fragmentShader;
    const vert = `
      attribute vec2 p;
      varying vec2 uv;
      void main() {
        uv = p * 0.5 + 0.5;
        gl_Position = vec4(p, 0.0, 1.0);
      }
    `;
    const frag = `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D earthMap;
      uniform float angle;
      const float PI = 3.141592653589793;
      void main() {
        vec2 pos = (uv - 0.5) * 2.04;
        float rr = dot(pos, pos);
        if (rr > 1.0) discard;
        float z = sqrt(max(0.0, 1.0 - rr));
        vec3 normal = normalize(vec3(pos.x, pos.y, z));
        // Slight tilt to make the globe look natural.
        float tilt = 0.18;
        vec3 surfaceNormal = vec3(
          normal.x,
          normal.y * cos(tilt) - normal.z * sin(tilt),
          normal.y * sin(tilt) + normal.z * cos(tilt)
        );
        float lon = atan(surfaceNormal.x, surfaceNormal.z) + angle;
        float lat = asin(clamp(surfaceNormal.y, -1.0, 1.0));
        vec2 texCoord = vec2(fract(lon / (2.0 * PI) + 0.5), 0.5 - lat / PI);
        vec3 surface = texture2D(earthMap, texCoord).rgb;
        vec3 sun = normalize(vec3(-0.30, 0.48, 1.0));
        float daylight = max(dot(normal, sun), 0.0);
        float illumination = 0.78 + 0.22 * daylight;
        vec3 color = surface * illumination;
        // Lift midtones so oceans and continents remain visible.
        color = pow(max(color, vec3(0.0)), vec3(0.78));
        float rim = pow(1.0 - z, 3.3);
        color += vec3(0.28, 0.56, 1.0) * rim * 0.30;
        float ocean = smoothstep(0.02, 0.15, surface.b - max(surface.r, surface.g));
        vec3 halfVector = normalize(sun + vec3(0.0, 0.0, 1.0));
        float specular = pow(max(dot(normal, halfVector), 0.0), 48.0);
        color += vec3(0.35, 0.55, 0.95) * specular * ocean * 0.14;
        gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
      }
    `;

    const makeShader = (type, source) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Unable to create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(message || "Shader compilation failed");
      }
      return shader;
    };

    try {
      vertexShader = makeShader(gl.VERTEX_SHADER, vert);
      fragmentShader = makeShader(gl.FRAGMENT_SHADER, frag);
      program = gl.createProgram();
      if (!program) throw new Error("Unable to create WebGL program");
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "WebGL linking failed");
      }
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(program, "p");
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
      texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(gl.getUniformLocation(program, "earthMap"), 0);

      const img = new Image();
      img.onload = () => {
        if (!alive) return;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        const angleLoc = gl.getUniformLocation(program, "angle");
        const start = performance.now();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const render = (now) => {
          if (!alive) return;
          const size = Math.min(960, Math.max(200, Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2))));
          if (canvas.width !== size || canvas.height !== size) {
            canvas.width = size;
            canvas.height = size;
            gl.viewport(0, 0, size, size);
          }
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.uniform1f(angleLoc, reduced ? 0 : -((now - start) / 1000) * Math.PI * 2 / 40);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          if (!reduced) frame = requestAnimationFrame(render);
        };
        frame = requestAnimationFrame(render);
      };
      img.onerror = () => { if (alive) setFallback(true); };
      img.src = earthTexture;
    } catch (error) {
      console.error("Real Earth rendering fallback:", error);
      setFallback(true);
    }
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      if (texture) gl.deleteTexture(texture);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
    };
  }, []);

  return fallback ? (
    <img src={fallbackGlobe} alt="Digital Earth globe" className="h-full w-full object-contain" />
  ) : (
    <canvas ref={ref} className="asd-real-earth h-full w-full" role="img" aria-label="Realistic rotating Earth with satellite imagery" />
  );
}
