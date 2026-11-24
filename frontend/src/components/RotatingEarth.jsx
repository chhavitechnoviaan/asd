// // import { useEffect, useRef, useState } from "react";
// // import earthTexture from "../assets/earth-realistic.jpg";
// // import fallbackGlobe from "../assets/asd-holographic-globe.png";

// // // Real satellite-textured sphere, rendered with WebGL (no extra dependencies).
// // export default function RotatingEarth() {
// //   const ref = useRef(null);
// //   const [fallback, setFallback] = useState(false);

// //   useEffect(() => {
// //     const canvas = ref.current;
// //     if (!canvas) return;
// //     const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
// //     if (!gl) { setFallback(true); return; }

// //     let alive = true;
// //     let frame = 0;
// //     let program, texture, buffer, vertexShader, fragmentShader;
// //     const vert = `
// //       attribute vec2 p;
// //       varying vec2 uv;
// //       void main() {
// //         uv = p * 0.5 + 0.5;
// //         gl_Position = vec4(p, 0.0, 1.0);
// //       }
// //     `;
// //     const frag = `
// //       precision highp float;
// //       varying vec2 uv;
// //       uniform sampler2D earthMap;
// //       uniform float angle;
// //       const float PI = 3.141592653589793;
// //       void main() {
// //         vec2 pos = (uv - 0.5) * 2.04;
// //         float rr = dot(pos, pos);
// //         if (rr > 1.0) discard;
// //         float z = sqrt(max(0.0, 1.0 - rr));
// //         vec3 normal = normalize(vec3(pos.x, pos.y, z));
// //         // Slight tilt to make the globe look natural.
// //         float tilt = 0.18;
// //         vec3 surfaceNormal = vec3(
// //           normal.x,
// //           normal.y * cos(tilt) - normal.z * sin(tilt),
// //           normal.y * sin(tilt) + normal.z * cos(tilt)
// //         );
// //         float lon = atan(surfaceNormal.x, surfaceNormal.z) + angle;
// //         float lat = asin(clamp(surfaceNormal.y, -1.0, 1.0));
// //         vec2 texCoord = vec2(fract(lon / (2.0 * PI) + 0.5), 0.5 - lat / PI);
// //         vec3 surface = texture2D(earthMap, texCoord).rgb;
// //         vec3 sun = normalize(vec3(-0.30, 0.48, 1.0));
// //         float daylight = max(dot(normal, sun), 0.0);
// //         float illumination = 0.78 + 0.22 * daylight;
// //         vec3 color = surface * illumination;
// //         // Lift midtones so oceans and continents remain visible.
// //         color = pow(max(color, vec3(0.0)), vec3(0.78));
// //         float rim = pow(1.0 - z, 3.3);
// //         color += vec3(0.28, 0.56, 1.0) * rim * 0.30;
// //         float ocean = smoothstep(0.02, 0.15, surface.b - max(surface.r, surface.g));
// //         vec3 halfVector = normalize(sun + vec3(0.0, 0.0, 1.0));
// //         float specular = pow(max(dot(normal, halfVector), 0.0), 48.0);
// //         color += vec3(0.35, 0.55, 0.95) * specular * ocean * 0.14;
// //         gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
// //       }
// //     `;

// //     const makeShader = (type, source) => {
// //       const shader = gl.createShader(type);
// //       if (!shader) throw new Error("Unable to create shader");
// //       gl.shaderSource(shader, source);
// //       gl.compileShader(shader);
// //       if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
// //         const message = gl.getShaderInfoLog(shader);
// //         gl.deleteShader(shader);
// //         throw new Error(message || "Shader compilation failed");
// //       }
// //       return shader;
// //     };

// //     try {
// //       vertexShader = makeShader(gl.VERTEX_SHADER, vert);
// //       fragmentShader = makeShader(gl.FRAGMENT_SHADER, frag);
// //       program = gl.createProgram();
// //       if (!program) throw new Error("Unable to create WebGL program");
// //       gl.attachShader(program, vertexShader);
// //       gl.attachShader(program, fragmentShader);
// //       gl.linkProgram(program);
// //       if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
// //         throw new Error(gl.getProgramInfoLog(program) || "WebGL linking failed");
// //       }
// //       gl.useProgram(program);
// //       buffer = gl.createBuffer();
// //       gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
// //       gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
// //       const pos = gl.getAttribLocation(program, "p");
// //       gl.enableVertexAttribArray(pos);
// //       gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
// //       texture = gl.createTexture();
// //       gl.activeTexture(gl.TEXTURE0);
// //       gl.bindTexture(gl.TEXTURE_2D, texture);
// //       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
// //       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
// //       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
// //       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// //       gl.uniform1i(gl.getUniformLocation(program, "earthMap"), 0);

// //       const img = new Image();
// //       img.onload = () => {
// //         if (!alive) return;
// //         gl.activeTexture(gl.TEXTURE0);
// //         gl.bindTexture(gl.TEXTURE_2D, texture);
// //         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
// //         const angleLoc = gl.getUniformLocation(program, "angle");
// //         const start = performance.now();
// //         const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// //         const render = (now) => {
// //           if (!alive) return;
// //           const size = Math.min(960, Math.max(200, Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2))));
// //           if (canvas.width !== size || canvas.height !== size) {
// //             canvas.width = size;
// //             canvas.height = size;
// //             gl.viewport(0, 0, size, size);
// //           }
// //           gl.clearColor(0, 0, 0, 0);
// //           gl.clear(gl.COLOR_BUFFER_BIT);
// //           gl.uniform1f(angleLoc, reduced ? 0 : -((now - start) / 1000) * Math.PI * 2 / 40);
// //           gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
// //           if (!reduced) frame = requestAnimationFrame(render);
// //         };
// //         frame = requestAnimationFrame(render);
// //       };
// //       img.onerror = () => { if (alive) setFallback(true); };
// //       img.src = earthTexture;
// //     } catch (error) {
// //       console.error("Real Earth rendering fallback:", error);
// //       setFallback(true);
// //     }
// //     return () => {
// //       alive = false;
// //       cancelAnimationFrame(frame);
// //       if (texture) gl.deleteTexture(texture);
// //       if (buffer) gl.deleteBuffer(buffer);
// //       if (program) gl.deleteProgram(program);
// //       if (vertexShader) gl.deleteShader(vertexShader);
// //       if (fragmentShader) gl.deleteShader(fragmentShader);
// //     };
// //   }, []);

// //   return fallback ? (
// //     <img src={fallbackGlobe} alt="Digital Earth globe" className="h-full w-full object-contain" />
// //   ) : (
// //     <canvas ref={ref} className="asd-real-earth h-full w-full" role="img" aria-label="Realistic rotating Earth with satellite imagery" />
// //   );
// // }




// import { useEffect, useRef, useState } from "react";
// import dotsTexture from "../assets/asd-world-dots.png";
// import fallbackGlobe from "../assets/asd-holographic-globe.png";

// // Light Royal Blue spherical globe with smooth rotation.
// export default function RotatingEarth() {
//   const ref = useRef(null);
//   const [fallback, setFallback] = useState(false);

//   useEffect(() => {
//     const canvas = ref.current;
//     if (!canvas) return;

//     const gl = canvas.getContext("webgl", {
//       alpha: true,
//       antialias: true,
//     });

//     if (!gl) {
//       setFallback(true);
//       return;
//     }

//     let alive = true;
//     let frame = 0;
//     let program;
//     let texture;
//     let buffer;
//     let vertexShader;
//     let fragmentShader;

//     const vert = `
//       attribute vec2 p;
//       varying vec2 uv;

//       void main() {
//         uv = p * 0.5 + 0.5;
//         gl_Position = vec4(p, 0.0, 1.0);
//       }
//     `;


// const frag = `
//   precision highp float;

//   varying vec2 uv;
//   uniform sampler2D map;
//   uniform float angle;

//   const float PI = 3.141592653589793;

//   void main() {
//     vec2 pos = (uv - 0.5) * 2.04;
//     float rr = dot(pos, pos);

//     if (rr > 1.0) discard;

//     float z = sqrt(max(0.0, 1.0 - rr));
//     vec3 normal = normalize(vec3(pos.x, pos.y, z));

//     float lon = atan(normal.x, normal.z) + angle;
//     float lat = asin(clamp(normal.y, -1.0, 1.0));

//     vec4 land = texture2D(
//       map,
//       vec2(fract(lon / (2.0 * PI) + 0.5), 0.5 - lat / PI)
//     );

//     // Royal blue palette
//     vec3 primaryBlue = vec3(0.145, 0.388, 0.922);
//     vec3 hoverBlue = vec3(0.114, 0.306, 0.847);
//     vec3 deepBlue = vec3(0.035, 0.145, 0.36);
//     vec3 lightBlue = vec3(0.60, 0.78, 1.0);

//     float sunlight = max(
//       dot(normal, normalize(vec3(-0.45, 0.65, 1.0))),
//       0.0
//     );

//     float lighting = 0.55 + 0.45 * sunlight;

//     // Royal blue ocean
//     vec3 ocean = mix(
//       deepBlue,
//       primaryBlue,
//       0.72
//     );

//     ocean = mix(
//       ocean,
//       hoverBlue,
//       pow(1.0 - z, 2.0) * 0.35
//     );

//     // Detect continents from the dotted texture
//     float landMask = clamp(
//       max(land.r, max(land.g, land.b)) * land.a,
//       0.0,
//       1.0
//     );

//     // Light blue continents
//     vec3 continent = mix(
//       lightBlue,
//       vec3(0.86, 0.93, 1.0),
//       sunlight * 0.4
//     );

//     vec3 color = mix(
//       ocean,
//       continent,
//       landMask * 0.9
//     );

//     color *= lighting;

//     // Subtle globe grid
//     float grid = max(
//       1.0 - smoothstep(0.025, 0.06, abs(sin(lon * 12.0))),
//       1.0 - smoothstep(0.025, 0.06, abs(sin(lat * 12.0)))
//     );

//     color = mix(color, lightBlue, grid * 0.06);

//     // Atmospheric edge glow
//     float rim = pow(1.0 - z, 3.0);
//     color += lightBlue * rim * 0.35;

//     gl_FragColor = vec4(
//       clamp(color, 0.0, 1.0),
//       1.0
//     );
//   }
// `;


//     const makeShader = (type, src) => {
//       const shader = gl.createShader(type);

//       if (!shader) {
//         throw new Error("Unable to create WebGL shader");
//       }

//       gl.shaderSource(shader, src);
//       gl.compileShader(shader);

//       if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//         const error = gl.getShaderInfoLog(shader);
//         gl.deleteShader(shader);
//         throw new Error(error || "Shader compilation failed");
//       }

//       return shader;
//     };

//     try {
//       vertexShader = makeShader(gl.VERTEX_SHADER, vert);
//       fragmentShader = makeShader(gl.FRAGMENT_SHADER, frag);

//       program = gl.createProgram();

//       if (!program) {
//         throw new Error("Unable to create WebGL program");
//       }

//       gl.attachShader(program, vertexShader);
//       gl.attachShader(program, fragmentShader);

//       gl.linkProgram(program);

//       if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
//         throw new Error(
//           gl.getProgramInfoLog(program) ||
//           "WebGL program linking failed"
//         );
//       }

//       gl.useProgram(program);

//       buffer = gl.createBuffer();
//       gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

//       gl.bufferData(
//         gl.ARRAY_BUFFER,
//         new Float32Array([
//           -1, -1,
//            1, -1,
//           -1,  1,
//            1,  1,
//         ]),
//         gl.STATIC_DRAW
//       );

//       const pos = gl.getAttribLocation(program, "p");

//       gl.enableVertexAttribArray(pos);

//       gl.vertexAttribPointer(
//         pos,
//         2,
//         gl.FLOAT,
//         false,
//         0,
//         0
//       );

//       texture = gl.createTexture();
//       gl.bindTexture(gl.TEXTURE_2D, texture);

//       gl.texParameteri(
//         gl.TEXTURE_2D,
//         gl.TEXTURE_WRAP_S,
//         gl.REPEAT
//       );

//       gl.texParameteri(
//         gl.TEXTURE_2D,
//         gl.TEXTURE_WRAP_T,
//         gl.CLAMP_TO_EDGE
//       );

//       gl.texParameteri(
//         gl.TEXTURE_2D,
//         gl.TEXTURE_MIN_FILTER,
//         gl.LINEAR
//       );

//       gl.texParameteri(
//         gl.TEXTURE_2D,
//         gl.TEXTURE_MAG_FILTER,
//         gl.LINEAR
//       );

//       const img = new Image();

//       img.onload = () => {
//         if (!alive) return;

//         gl.bindTexture(gl.TEXTURE_2D, texture);

//         gl.texImage2D(
//           gl.TEXTURE_2D,
//           0,
//           gl.RGBA,
//           gl.RGBA,
//           gl.UNSIGNED_BYTE,
//           img
//         );

//         gl.uniform1i(
//           gl.getUniformLocation(program, "map"),
//           0
//         );

//         const t0 = performance.now();

//         const reduced = window.matchMedia(
//           "(prefers-reduced-motion: reduce)"
//         ).matches;

//         const angle = gl.getUniformLocation(
//           program,
//           "angle"
//         );

//         const render = (t) => {
//           if (!alive) return;

//           const size = Math.min(
//             960,
//             Math.max(
//               200,
//               Math.round(
//                 canvas.clientWidth *
//                 window.devicePixelRatio
//               )
//             )
//           );

//           if (
//             canvas.width !== size ||
//             canvas.height !== size
//           ) {
//             canvas.width = size;
//             canvas.height = size;
//             gl.viewport(0, 0, size, size);
//           }

//           gl.clearColor(0, 0, 0, 0);
//           gl.clear(gl.COLOR_BUFFER_BIT);

//           gl.uniform1f(
//             angle,
//             reduced
//               ? 0
//               : -((t - t0) / 1000) * Math.PI * 2 / 32
//           );

//           gl.drawArrays(
//             gl.TRIANGLE_STRIP,
//             0,
//             4
//           );

//           frame = requestAnimationFrame(render);
//         };

//         frame = requestAnimationFrame(render);
//       };

//       img.onerror = () => {
//         if (alive) setFallback(true);
//       };

//       img.src = dotsTexture;

//     } catch (error) {
//       console.error(
//         "Globe rendering fallback",
//         error
//       );

//       setFallback(true);
//     }

//     return () => {
//       alive = false;
//       cancelAnimationFrame(frame);

//       if (texture) gl.deleteTexture(texture);
//       if (buffer) gl.deleteBuffer(buffer);
//       if (program) gl.deleteProgram(program);
//       if (vertexShader) gl.deleteShader(vertexShader);
//       if (fragmentShader) gl.deleteShader(fragmentShader);
//     };
//   }, []);

//   return fallback ? (
//     <img
//       src={fallbackGlobe}
//       alt="Digital globe"
//       className="h-full w-full object-contain"
//     />
//   ) : (
//     <canvas
//       ref={ref}
//       className="asd-real-earth h-full w-full"
//       role="img"
//       aria-label="3D digital Earth with continents rotating horizontally"
//     />
//   );
// }




import { useEffect, useRef, useState } from "react";
import dotsTexture from "../assets/asd-world-dots.png";
import fallbackGlobe from "../assets/asd-holographic-globe.png";

// True spherical projection: the globe silhouette stays round as continents move.
export default function RotatingEarth() {
  const ref = useRef(null);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", {alpha:true, antialias:true});
    if (!gl) {setFallback(true); return;}
    let alive = true, frame = 0, program, texture, buffer;
    const vert = `attribute vec2 p; varying vec2 uv; void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
    const frag = `
    precision highp float;
    varying vec2 uv;
    uniform sampler2D map;
    uniform float angle;
    const float PI=3.141592653589793;
    void main(){
      vec2 pos=(uv-.5)*2.04;
      float rr=dot(pos,pos);
      if(rr>1.)discard;
      float z=sqrt(max(0.,1.-rr));
      vec3 normal=normalize(vec3(pos.x,pos.y,z));
      float lon=atan(normal.x,normal.z)+angle;
      float lat=asin(clamp(normal.y,-1.,1.));
      vec4 land=texture2D(map,vec2(fract(lon/(2.*PI)+.5),.5-lat/PI));
      float grid=max(1.-smoothstep(.025,.06,abs(sin(lon*12.))),1.-smoothstep(.025,.06,abs(sin(lat*12.))));
      float rim=pow(1.-z,3.);
      float light=.5+.5*max(dot(normal,normalize(vec3(-.45,.65,1.))),0.);
      vec3 color=vec3(.006,.064,.125)+vec3(.01,.08,.13)*z
        +land.rgb*land.a*1.55*light
        +vec3(.1,.7,.8)*grid*.10
        +vec3(.05,.65,.85)*rim*.8;
      gl_FragColor=vec4(color,1.);
    }`;
    const makeShader=(type,src)=>{
      const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);
      if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));
      return sh;
    };
    try {
      program=gl.createProgram();
      gl.attachShader(program,makeShader(gl.VERTEX_SHADER,vert));
      gl.attachShader(program,makeShader(gl.FRAGMENT_SHADER,frag));
      gl.linkProgram(program);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
      gl.useProgram(program);
      buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
      const pos=gl.getAttribLocation(program,"p");gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
      texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      const img=new Image();
      img.onload=()=>{
        if(!alive)return;
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
        const t0=performance.now();
        const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const angle=gl.getUniformLocation(program,"angle");
        const render=(t)=>{
          if(!alive)return;
          const size=Math.min(960,Math.max(200,Math.round(canvas.clientWidth*window.devicePixelRatio)));
          if(canvas.width!==size||canvas.height!==size){canvas.width=size;canvas.height=size;gl.viewport(0,0,size,size);}
          gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
          gl.uniform1f(angle,reduced?0:-(t-t0)/1000*Math.PI*2/32);
          gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
          frame=requestAnimationFrame(render);
        };
        frame=requestAnimationFrame(render);
      };
      img.onerror=()=>setFallback(true);
      img.src=dotsTexture;
    }catch(e){console.error("Globe rendering fallback",e);setFallback(true);}
    return()=>{alive=false;cancelAnimationFrame(frame);if(texture)gl.deleteTexture(texture);if(buffer)gl.deleteBuffer(buffer);if(program)gl.deleteProgram(program);};
  },[]);
  return fallback ? <img src={fallbackGlobe} alt="Digital globe" className="h-full w-full object-contain"/> :
    <canvas ref={ref} className="asd-real-earth h-full w-full" role="img" aria-label="3D digital Earth with continents rotating horizontally"/>;
}