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
