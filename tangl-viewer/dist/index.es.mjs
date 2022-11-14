var os = Object.defineProperty;
var bs = (n, e, l) => e in n ? os(n, e, { enumerable: !0, configurable: !0, writable: !0, value: l }) : n[e] = l;
var Z = (n, e, l) => (bs(n, typeof e != "symbol" ? e + "" : e, l), l);
import * as N from "three";
import { Texture as It, BufferAttribute as tl, Vector3 as R, Vector2 as T, Plane as Rl, Line3 as hl, Triangle as zl, Sphere as Jl, Box3 as U, Matrix4 as B, BackSide as bt, DoubleSide as xc, Matrix3 as ms, FrontSide as Ve, Mesh as w, Ray as Zs, OrthographicCamera as mt, BufferGeometry as de, Float32BufferAttribute as se, Color as v, ShaderMaterial as il, UniformsUtils as Zt, WebGLRenderTarget as ye, Clock as Xt, ShaderLib as ce, Vector4 as re, LinearEncoding as Xs, DataTexture as Gs, RGBAFormat as We, RepeatWrapping as ve, LinearFilter as fe, NearestFilter as Me, HalfFloatType as us, MathUtils as Gt, Cache as hs, Scene as ut, WebGLRenderer as ps, sRGBEncoding as lt, PerspectiveCamera as Fd, InstancedMesh as Pl, LineSegments as al, InstancedBufferAttribute as Hl, MeshPhongMaterial as ys, Group as Xl, MeshBasicMaterial as Nl, HemisphereLight as Td, DirectionalLight as Be, PlaneBufferGeometry as Ws, Interpolant as Vs, Loader as rs, LoaderUtils as ke, FileLoader as kd, SpotLight as Ls, PointLight as Rs, MeshPhysicalMaterial as vd, TangentSpaceNormalMap as Is, ImageBitmapLoader as gs, TextureLoader as Ys, InterleavedBuffer as Cs, InterleavedBufferAttribute as le, LinearMipmapLinearFilter as fd, PointsMaterial as Ss, Material as gt, LineBasicMaterial as Ks, MeshStandardMaterial as ht, PropertyBinding as xs, SkinnedMesh as Hs, Line as zs, LineLoop as Ns, Points as Js, InterpolateLinear as Bd, AnimationClip as Ms, Bone as Fs, Object3D as Ts, Skeleton as ks, TriangleFanDrawMode as Ud, NearestMipmapNearestFilter as vs, LinearMipmapNearestFilter as fs, NearestMipmapLinearFilter as Bs, ClampToEdgeWrapping as Us, MirroredRepeatWrapping as ws, InterpolateDiscrete as Ps, CanvasTexture as Qs, TriangleStripDrawMode as js, VectorKeyframeTrack as Es, QuaternionKeyframeTrack as As, NumberKeyframeTrack as Ds, MOUSE as Wl, TOUCH as kl, Spherical as Yt, Quaternion as Ct, Euler as Os, Raycaster as pt, EventDispatcher as _s, BoxBufferGeometry as qs, LineDashedMaterial as $s, EdgesGeometry as li, SphereBufferGeometry as wd, InstancedBufferGeometry as ei, InstancedInterleavedBuffer as et, WireframeGeometry as ci, UniformsLib as mc, SphereGeometry as Pd } from "three";
const ti = `
attribute float empty;


varying vec2 vUv;
varying float isEmpty;

void main() {
	vUv = uv;

	  		
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`, di = `uniform float opacity;
uniform float mixRatio;

uniform sampler2D tDiffuse1;
uniform sampler2D tDiffuse2;

varying vec2 vUv;
varying float isEmpty;


void main() {

	vec4 texel1 = texture2D( tDiffuse1, vUv );
	vec4 texel2 = texture2D( tDiffuse2, vUv );
	vec4 obg = vec4(0.0,0.6,1.0,1.0);

	vec4 c = texel1;
	c = mix(texel1, obg,texel2.a*(texel2.r-texel2.b*0.8));
	
	gl_FragColor = c;
}`;
class si {
  constructor() {
    Z(this, "uniforms", {
      tDiffuse1: { type: "t", value: new It() },
      tDiffuse2: { type: "t", value: new It() },
      mixRatio: { value: 0.9 },
      opacity: { value: 1 }
    });
    Z(this, "vertexShader", ti);
    Z(this, "fragmentShader", di);
  }
}
const ii = `#include <common>
//#include <uv_pars_vertex>
//#include <uv2_pars_vertex>
//#include <displacementmap_pars_vertex>
//#include <envmap_pars_vertex>
#include <color_pars_vertex>
//#include <fog_pars_vertex>
//#include <morphtarget_pars_vertex>
//#include <skinning_pars_vertex>
//#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute float _elementnum;
attribute float geomnum;
attribute float state_1;
attribute float hidden;

varying vec4 idColor;
varying float geomNum;
varying float state;
varying float isHidden;

vec4 unpackColor(float f) {
    vec4 color;
    color.b = floor(f / 256.0 / 256.0);
    color.g = floor((f - color.b * 256.0 * 256.0) / 256.0);
    color.r = floor(f - color.b * 256.0 * 256.0 - color.g * 256.0);
    color.a = floor(f - color.b * 256.0 * 256.0 - color.g * 256.0 - color.b * 256.0 * 256.0 - color.g * 256.0);
    // now we have a vec3 with the 3 components in range [0..255]. Let's normalize it!
    return color / 255.0;
}

void main() {
    //#include <uv_vertex>
    //#include <uv2_vertex>
    #include <color_vertex>

    //#include <beginnormal_vertex>
    //#include <morphnormal_vertex>
    //#include <skinbase_vertex>
    //#include <skinnormal_vertex>
    //#include <defaultnormal_vertex>

    #include <begin_vertex>
    //#include <morphtarget_vertex>
    //#include <skinning_vertex>
    //#include <displacementmap_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>

    #include <clipping_planes_vertex>

    state = state_1;

    if (hidden>0.0)
    isHidden = 1.0;

    idColor = unpackColor(_elementnum);
    geomNum = geomnum;
}`, ni = `#include <common>
#include <packing>
#include <clipping_planes_pars_fragment>

varying vec4 idColor;
varying float geomNum;
varying float state;
varying float isHidden;

void main(){
    if (isHidden>0.9) discard;
    if (state<-0.9 && state>-1.1) discard;

    #include <clipping_planes_fragment>

    gl_FragColor = idColor;
}`, ai = `//#define USE_INSTANCING

#include <common>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

uniform float hoverElNums;

uniform vec3 hoverColor;
uniform vec3 selectColor;

//attribute mat4 instanceMatrix;

attribute float _elementnum;
attribute float selected;

varying vec4 resColor;

void main() {
    #include <begin_vertex>	
    #include <project_vertex>
	#include <worldpos_vertex>
    #include <clipping_planes_vertex>  

    if(_elementnum == hoverElNums) {
        resColor = vec4(hoverColor, 1.0);
    }

    if(selected > 0.0) {
        resColor = vec4(selectColor, 0.5);
    }    
}`, oi = `#include <common>
#include <packing>
#include <clipping_planes_pars_fragment>

varying vec4 resColor;

void main() {
    #include <clipping_planes_fragment>

    if(resColor.a == 0.0)
        discard;
    
    gl_FragColor = resColor;

}`, Qd = 0, bi = 1, mi = 2, St = 2, zc = 1.25, Kt = 1, Zc = 6 * 4 + 4 + 4, ct = 65535, Zi = Math.pow(2, -24);
class je {
  constructor() {
  }
}
function A(n, e, l) {
  return l.min.x = e[n], l.min.y = e[n + 1], l.min.z = e[n + 2], l.max.x = e[n + 3], l.max.y = e[n + 4], l.max.z = e[n + 5], l;
}
function xt(n) {
  let e = -1, l = -1 / 0;
  for (let c = 0; c < 3; c++) {
    const t = n[c + 3] - n[c];
    t > l && (l = t, e = c);
  }
  return e;
}
function Ht(n, e) {
  e.set(n);
}
function zt(n, e, l) {
  let c, t;
  for (let d = 0; d < 3; d++) {
    const s = d + 3;
    c = n[d], t = e[d], l[d] = c < t ? c : t, c = n[s], t = e[s], l[s] = c > t ? c : t;
  }
}
function Ee(n, e, l) {
  for (let c = 0; c < 3; c++) {
    const t = e[n + 2 * c], d = e[n + 2 * c + 1], s = t - d, i = t + d;
    s < l[c] && (l[c] = s), i > l[c + 3] && (l[c + 3] = i);
  }
}
function ge(n) {
  const e = n[3] - n[0], l = n[4] - n[1], c = n[5] - n[2];
  return 2 * (e * l + l * c + c * e);
}
function Xi(n, e) {
  if (!n.index) {
    const l = n.attributes.position.count, c = e.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
    let t;
    l > 65535 ? t = new Uint32Array(new c(4 * l)) : t = new Uint16Array(new c(2 * l)), n.setIndex(new tl(t, 1));
    for (let d = 0; d < l; d++)
      t[d] = d;
  }
}
function Gi(n) {
  if (!n.groups || !n.groups.length)
    return [{ offset: 0, count: n.index.count / 3 }];
  const e = [], l = /* @__PURE__ */ new Set();
  for (const t of n.groups)
    l.add(t.start), l.add(t.start + t.count);
  const c = Array.from(l.values()).sort((t, d) => t - d);
  for (let t = 0; t < c.length - 1; t++) {
    const d = c[t], s = c[t + 1];
    e.push({ offset: d / 3, count: (s - d) / 3 });
  }
  return e;
}
function Nc(n, e, l, c, t = null) {
  let d = 1 / 0, s = 1 / 0, i = 1 / 0, a = -1 / 0, o = -1 / 0, b = -1 / 0, m = 1 / 0, X = 1 / 0, G = 1 / 0, h = -1 / 0, u = -1 / 0, y = -1 / 0;
  const p = t !== null;
  for (let W = e * 6, V = (e + l) * 6; W < V; W += 6) {
    const r = n[W + 0], I = n[W + 1], g = r - I, L = r + I;
    g < d && (d = g), L > a && (a = L), p && r < m && (m = r), p && r > h && (h = r);
    const Y = n[W + 2], C = n[W + 3], S = Y - C, x = Y + C;
    S < s && (s = S), x > o && (o = x), p && Y < X && (X = Y), p && Y > u && (u = Y);
    const H = n[W + 4], K = n[W + 5], M = H - K, J = H + K;
    M < i && (i = M), J > b && (b = J), p && H < G && (G = H), p && H > y && (y = H);
  }
  c[0] = d, c[1] = s, c[2] = i, c[3] = a, c[4] = o, c[5] = b, p && (t[0] = m, t[1] = X, t[2] = G, t[3] = h, t[4] = u, t[5] = y);
}
function ui(n, e, l, c) {
  let t = 1 / 0, d = 1 / 0, s = 1 / 0, i = -1 / 0, a = -1 / 0, o = -1 / 0;
  for (let b = e * 6, m = (e + l) * 6; b < m; b += 6) {
    const X = n[b + 0];
    X < t && (t = X), X > i && (i = X);
    const G = n[b + 2];
    G < d && (d = G), G > a && (a = G);
    const h = n[b + 4];
    h < s && (s = h), h > o && (o = h);
  }
  c[0] = t, c[1] = d, c[2] = s, c[3] = i, c[4] = a, c[5] = o;
}
function hi(n, e, l, c, t) {
  let d = l, s = l + c - 1;
  const i = t.pos, a = t.axis * 2;
  for (; ; ) {
    for (; d <= s && e[d * 6 + a] < i; )
      d++;
    for (; d <= s && e[s * 6 + a] >= i; )
      s--;
    if (d < s) {
      for (let o = 0; o < 3; o++) {
        let b = n[d * 3 + o];
        n[d * 3 + o] = n[s * 3 + o], n[s * 3 + o] = b;
        let m = e[d * 6 + o * 2 + 0];
        e[d * 6 + o * 2 + 0] = e[s * 6 + o * 2 + 0], e[s * 6 + o * 2 + 0] = m;
        let X = e[d * 6 + o * 2 + 1];
        e[d * 6 + o * 2 + 1] = e[s * 6 + o * 2 + 1], e[s * 6 + o * 2 + 1] = X;
      }
      d++, s--;
    } else
      return d;
  }
}
const Kl = 32, pi = (n, e) => n.candidate - e.candidate, vl = new Array(Kl).fill().map(() => ({
  count: 0,
  bounds: new Float32Array(6),
  rightCacheBounds: new Float32Array(6),
  leftCacheBounds: new Float32Array(6),
  candidate: 0
})), Ae = new Float32Array(6);
function yi(n, e, l, c, t, d) {
  let s = -1, i = 0;
  if (d === Qd)
    s = xt(e), s !== -1 && (i = (e[s] + e[s + 3]) / 2);
  else if (d === bi)
    s = xt(n), s !== -1 && (i = Wi(l, c, t, s));
  else if (d === mi) {
    const a = ge(n);
    let o = zc * t;
    const b = c * 6, m = (c + t) * 6;
    for (let X = 0; X < 3; X++) {
      const G = e[X], y = (e[X + 3] - G) / Kl;
      if (t < Kl / 4) {
        const p = [...vl];
        p.length = t;
        let W = 0;
        for (let r = b; r < m; r += 6, W++) {
          const I = p[W];
          I.candidate = l[r + 2 * X], I.count = 0;
          const {
            bounds: g,
            leftCacheBounds: L,
            rightCacheBounds: Y
          } = I;
          for (let C = 0; C < 3; C++)
            Y[C] = 1 / 0, Y[C + 3] = -1 / 0, L[C] = 1 / 0, L[C + 3] = -1 / 0, g[C] = 1 / 0, g[C + 3] = -1 / 0;
          Ee(r, l, g);
        }
        p.sort(pi);
        let V = t;
        for (let r = 0; r < V; r++) {
          const I = p[r];
          for (; r + 1 < V && p[r + 1].candidate === I.candidate; )
            p.splice(r + 1, 1), V--;
        }
        for (let r = b; r < m; r += 6) {
          const I = l[r + 2 * X];
          for (let g = 0; g < V; g++) {
            const L = p[g];
            I >= L.candidate ? Ee(r, l, L.rightCacheBounds) : (Ee(r, l, L.leftCacheBounds), L.count++);
          }
        }
        for (let r = 0; r < V; r++) {
          const I = p[r], g = I.count, L = t - I.count, Y = I.leftCacheBounds, C = I.rightCacheBounds;
          let S = 0;
          g !== 0 && (S = ge(Y) / a);
          let x = 0;
          L !== 0 && (x = ge(C) / a);
          const H = Kt + zc * (S * g + x * L);
          H < o && (s = X, o = H, i = I.candidate);
        }
      } else {
        for (let V = 0; V < Kl; V++) {
          const r = vl[V];
          r.count = 0, r.candidate = G + y + V * y;
          const I = r.bounds;
          for (let g = 0; g < 3; g++)
            I[g] = 1 / 0, I[g + 3] = -1 / 0;
        }
        for (let V = b; V < m; V += 6) {
          let g = ~~((l[V + 2 * X] - G) / y);
          g >= Kl && (g = Kl - 1);
          const L = vl[g];
          L.count++, Ee(V, l, L.bounds);
        }
        const p = vl[Kl - 1];
        Ht(p.bounds, p.rightCacheBounds);
        for (let V = Kl - 2; V >= 0; V--) {
          const r = vl[V], I = vl[V + 1];
          zt(r.bounds, I.rightCacheBounds, r.rightCacheBounds);
        }
        let W = 0;
        for (let V = 0; V < Kl - 1; V++) {
          const r = vl[V], I = r.count, g = r.bounds, Y = vl[V + 1].rightCacheBounds;
          I !== 0 && (W === 0 ? Ht(g, Ae) : zt(g, Ae, Ae)), W += I;
          let C = 0, S = 0;
          W !== 0 && (C = ge(Ae) / a);
          const x = t - W;
          x !== 0 && (S = ge(Y) / a);
          const H = Kt + zc * (C * W + S * x);
          H < o && (s = X, o = H, i = r.candidate);
        }
      }
    }
  } else
    console.warn(`MeshBVH: Invalid build strategy value ${d} used.`);
  return { axis: s, pos: i };
}
function Wi(n, e, l, c) {
  let t = 0;
  for (let d = e, s = e + l; d < s; d++)
    t += n[d * 6 + c * 2];
  return t / l;
}
function Vi(n, e) {
  const l = n.attributes.position, c = l.array, t = n.index.array, d = t.length / 3, s = new Float32Array(d * 6), i = l.offset || 0;
  let a = 3;
  l.isInterleavedBufferAttribute && (a = l.data.stride);
  for (let o = 0; o < d; o++) {
    const b = o * 3, m = o * 6, X = t[b + 0] * a + i, G = t[b + 1] * a + i, h = t[b + 2] * a + i;
    for (let u = 0; u < 3; u++) {
      const y = c[X + u], p = c[G + u], W = c[h + u];
      let V = y;
      p < V && (V = p), W < V && (V = W);
      let r = y;
      p > r && (r = p), W > r && (r = W);
      const I = (r - V) / 2, g = u * 2;
      s[m + g + 0] = V + I, s[m + g + 1] = I + (Math.abs(V) + I) * Zi, V < e[u] && (e[u] = V), r > e[u + 3] && (e[u + 3] = r);
    }
  }
  return s;
}
function ri(n, e) {
  function l(p) {
    X && X(p / G);
  }
  function c(p, W, V, r = null, I = 0) {
    if (!h && I >= a && (h = !0, o && (console.warn(`MeshBVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`), console.warn(n))), V <= b || I >= a)
      return l(W + V), p.offset = W, p.count = V, p;
    const g = yi(p.boundingData, r, s, W, V, m);
    if (g.axis === -1)
      return l(W + V), p.offset = W, p.count = V, p;
    const L = hi(i, s, W, V, g);
    if (L === W || L === W + V)
      l(W + V), p.offset = W, p.count = V;
    else {
      p.splitAxis = g.axis;
      const Y = new je(), C = W, S = L - W;
      p.left = Y, Y.boundingData = new Float32Array(6), Nc(s, C, S, Y.boundingData, d), c(Y, C, S, d, I + 1);
      const x = new je(), H = L, K = V - S;
      p.right = x, x.boundingData = new Float32Array(6), Nc(s, H, K, x.boundingData, d), c(x, H, K, d, I + 1);
    }
    return p;
  }
  Xi(n, e);
  const t = new Float32Array(6), d = new Float32Array(6), s = Vi(n, t), i = n.index.array, a = e.maxDepth, o = e.verbose, b = e.maxLeafTris, m = e.strategy, X = e.onProgress, G = n.index.count / 3;
  let h = !1;
  const u = [], y = Gi(n);
  if (y.length === 1) {
    const p = y[0], W = new je();
    W.boundingData = t, ui(s, p.offset, p.count, d), c(W, p.offset, p.count, d), u.push(W);
  } else
    for (let p of y) {
      const W = new je();
      W.boundingData = new Float32Array(6), Nc(s, p.offset, p.count, W.boundingData, d), c(W, p.offset, p.count, d), u.push(W);
    }
  return u;
}
function Li(n, e) {
  const l = ri(n, e);
  let c, t, d;
  const s = [], i = e.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
  for (let b = 0; b < l.length; b++) {
    const m = l[b];
    let X = a(m);
    const G = new i(Zc * X);
    c = new Float32Array(G), t = new Uint32Array(G), d = new Uint16Array(G), o(0, m), s.push(G);
  }
  return s;
  function a(b) {
    return b.count ? 1 : 1 + a(b.left) + a(b.right);
  }
  function o(b, m) {
    const X = b / 4, G = b / 2, h = !!m.count, u = m.boundingData;
    for (let y = 0; y < 6; y++)
      c[X + y] = u[y];
    if (h) {
      const y = m.offset, p = m.count;
      return t[X + 6] = y, d[G + 14] = p, d[G + 15] = ct, b + Zc;
    } else {
      const y = m.left, p = m.right, W = m.splitAxis;
      let V;
      if (V = o(b + Zc, y), V / 4 > Math.pow(2, 32))
        throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");
      return t[X + 6] = V / 4, V = o(V, p), t[X + 7] = W, V;
    }
  }
}
class Fl {
  constructor() {
    this.min = 1 / 0, this.max = -1 / 0;
  }
  setFromPointsField(e, l) {
    let c = 1 / 0, t = -1 / 0;
    for (let d = 0, s = e.length; d < s; d++) {
      const a = e[d][l];
      c = a < c ? a : c, t = a > t ? a : t;
    }
    this.min = c, this.max = t;
  }
  setFromPoints(e, l) {
    let c = 1 / 0, t = -1 / 0;
    for (let d = 0, s = l.length; d < s; d++) {
      const i = l[d], a = e.dot(i);
      c = a < c ? a : c, t = a > t ? a : t;
    }
    this.min = c, this.max = t;
  }
  isSeparated(e) {
    return this.min > e.max || e.min > this.max;
  }
  setFromBox(e, l) {
    const c = new R(), t = l.min, d = l.max;
    let s = 1 / 0, i = -1 / 0;
    for (let a = 0; a <= 1; a++)
      for (let o = 0; o <= 1; o++)
        for (let b = 0; b <= 1; b++) {
          c.x = t.x * a + d.x * (1 - a), c.y = t.y * o + d.y * (1 - o), c.z = t.z * b + d.z * (1 - b);
          const m = e.dot(c);
          s = Math.min(m, s), i = Math.max(m, i);
        }
    this.min = s, this.max = i;
  }
}
(function() {
  const n = new Fl();
  return function(l, c) {
    const t = l.points, d = l.satAxes, s = l.satBounds, i = c.points, a = c.satAxes, o = c.satBounds;
    for (let b = 0; b < 3; b++) {
      const m = s[b], X = d[b];
      if (n.setFromPoints(X, i), m.isSeparated(n))
        return !1;
    }
    for (let b = 0; b < 3; b++) {
      const m = o[b], X = a[b];
      if (n.setFromPoints(X, t), m.isSeparated(n))
        return !1;
    }
  };
})();
const Ri = function() {
  const n = new R(), e = new R(), l = new R();
  return function(t, d, s) {
    const i = t.start, a = n, o = d.start, b = e;
    l.subVectors(i, o), n.subVectors(t.end, d.start), e.subVectors(d.end, d.start);
    const m = l.dot(b), X = b.dot(a), G = b.dot(b), h = l.dot(a), y = a.dot(a) * G - X * X;
    let p, W;
    y !== 0 ? p = (m * X - h * G) / y : p = 0, W = (m + p * X) / G, s.x = p, s.y = W;
  };
}(), yt = function() {
  const n = new T(), e = new R(), l = new R();
  return function(t, d, s, i) {
    Ri(t, d, n);
    let a = n.x, o = n.y;
    if (a >= 0 && a <= 1 && o >= 0 && o <= 1) {
      t.at(a, s), d.at(o, i);
      return;
    } else if (a >= 0 && a <= 1) {
      o < 0 ? d.at(0, i) : d.at(1, i), t.closestPointToPoint(i, !0, s);
      return;
    } else if (o >= 0 && o <= 1) {
      a < 0 ? t.at(0, s) : t.at(1, s), d.closestPointToPoint(s, !0, i);
      return;
    } else {
      let b;
      a < 0 ? b = t.start : b = t.end;
      let m;
      o < 0 ? m = d.start : m = d.end;
      const X = e, G = l;
      if (t.closestPointToPoint(m, !0, e), d.closestPointToPoint(b, !0, l), X.distanceToSquared(m) <= G.distanceToSquared(b)) {
        s.copy(X), i.copy(m);
        return;
      } else {
        s.copy(b), i.copy(G);
        return;
      }
    }
  };
}(), Ii = function() {
  const n = new R(), e = new R(), l = new Rl(), c = new hl();
  return function(d, s) {
    const { radius: i, center: a } = d, { a: o, b, c: m } = s;
    if (c.start = o, c.end = b, c.closestPointToPoint(a, !0, n).distanceTo(a) <= i || (c.start = o, c.end = m, c.closestPointToPoint(a, !0, n).distanceTo(a) <= i) || (c.start = b, c.end = m, c.closestPointToPoint(a, !0, n).distanceTo(a) <= i))
      return !0;
    const u = s.getPlane(l);
    if (Math.abs(u.distanceToPoint(a)) <= i) {
      const p = u.projectPoint(a, e);
      if (s.containsPoint(p))
        return !0;
    }
    return !1;
  };
}();
class dl extends zl {
  constructor(...e) {
    super(...e), this.isExtendedTriangle = !0, this.satAxes = new Array(4).fill().map(() => new R()), this.satBounds = new Array(4).fill().map(() => new Fl()), this.points = [this.a, this.b, this.c], this.sphere = new Jl(), this.plane = new Rl(), this.needsUpdate = !1;
  }
  intersectsSphere(e) {
    return Ii(e, this);
  }
  update() {
    const e = this.a, l = this.b, c = this.c, t = this.points, d = this.satAxes, s = this.satBounds, i = d[0], a = s[0];
    this.getNormal(i), a.setFromPoints(i, t);
    const o = d[1], b = s[1];
    o.subVectors(e, l), b.setFromPoints(o, t);
    const m = d[2], X = s[2];
    m.subVectors(l, c), X.setFromPoints(m, t);
    const G = d[3], h = s[3];
    G.subVectors(c, e), h.setFromPoints(G, t), this.sphere.setFromPoints(this.points), this.plane.setFromNormalAndCoplanarPoint(i, e), this.needsUpdate = !1;
  }
}
dl.prototype.closestPointToSegment = function() {
  const n = new R(), e = new R(), l = new hl();
  return function(t, d = null, s = null) {
    const { start: i, end: a } = t, o = this.points;
    let b, m = 1 / 0;
    for (let X = 0; X < 3; X++) {
      const G = (X + 1) % 3;
      l.start.copy(o[X]), l.end.copy(o[G]), yt(l, t, n, e), b = n.distanceToSquared(e), b < m && (m = b, d && d.copy(n), s && s.copy(e));
    }
    return this.closestPointToPoint(i, n), b = i.distanceToSquared(n), b < m && (m = b, d && d.copy(n), s && s.copy(i)), this.closestPointToPoint(a, n), b = a.distanceToSquared(n), b < m && (m = b, d && d.copy(n), s && s.copy(a)), Math.sqrt(m);
  };
}();
dl.prototype.intersectsTriangle = function() {
  const n = new dl(), e = new Array(3), l = new Array(3), c = new Fl(), t = new Fl(), d = new R(), s = new R(), i = new R(), a = new R(), o = new hl(), b = new hl(), m = new hl();
  return function(G, h = null) {
    this.needsUpdate && this.update(), G.isExtendedTriangle ? G.needsUpdate && G.update() : (n.copy(G), n.update(), G = n);
    const u = this.plane, y = G.plane;
    if (Math.abs(u.normal.dot(y.normal)) > 1 - 1e-10) {
      const p = this.satBounds, W = this.satAxes;
      l[0] = G.a, l[1] = G.b, l[2] = G.c;
      for (let I = 0; I < 4; I++) {
        const g = p[I], L = W[I];
        if (c.setFromPoints(L, l), g.isSeparated(c))
          return !1;
      }
      const V = G.satBounds, r = G.satAxes;
      e[0] = this.a, e[1] = this.b, e[2] = this.c;
      for (let I = 0; I < 4; I++) {
        const g = V[I], L = r[I];
        if (c.setFromPoints(L, e), g.isSeparated(c))
          return !1;
      }
      for (let I = 0; I < 4; I++) {
        const g = W[I];
        for (let L = 0; L < 4; L++) {
          const Y = r[L];
          if (d.crossVectors(g, Y), c.setFromPoints(d, e), t.setFromPoints(d, l), c.isSeparated(t))
            return !1;
        }
      }
      return h && (console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."), h.start.set(0, 0, 0), h.end.set(0, 0, 0)), !0;
    } else {
      const p = this.points;
      let W = !1, V = 0;
      for (let K = 0; K < 3; K++) {
        const M = p[K], J = p[(K + 1) % 3];
        if (o.start.copy(M), o.end.copy(J), o.delta(s), y.normal.dot(s) === 0 && y.distanceToPoint(o.start) === 0) {
          b.copy(o), V = 2;
          break;
        } else if (y.intersectLine(o, W ? b.start : b.end)) {
          if (V++, W)
            break;
          W = !0;
        }
      }
      if (V !== 2)
        return !1;
      const r = G.points;
      let I = !1, g = 0;
      for (let K = 0; K < 3; K++) {
        const M = r[K], J = r[(K + 1) % 3];
        if (o.start.copy(M), o.end.copy(J), o.delta(i), u.normal.dot(i) === 0 && u.distanceToPoint(o.start) === 0) {
          m.copy(o), g = 2;
          break;
        } else if (u.intersectLine(o, I ? m.start : m.end)) {
          if (g++, I)
            break;
          I = !0;
        }
      }
      if (g !== 2)
        return !1;
      if (b.delta(s), m.delta(i), s.dot(i) < 0) {
        let K = m.start;
        m.start = m.end, m.end = K;
      }
      const L = b.start.dot(s), Y = b.end.dot(s), C = m.start.dot(s), S = m.end.dot(s), x = Y < C, H = L < S;
      return L !== S && C !== Y && x === H ? !1 : (h && (a.subVectors(b.start, m.start), a.dot(s) > 0 ? h.start.copy(b.start) : h.start.copy(m.start), a.subVectors(b.end, m.end), a.dot(s) < 0 ? h.end.copy(b.end) : h.end.copy(m.end)), !0);
    }
  };
}();
dl.prototype.distanceToPoint = function() {
  const n = new R();
  return function(l) {
    return this.closestPointToPoint(l, n), l.distanceTo(n);
  };
}();
dl.prototype.distanceToTriangle = function() {
  const n = new R(), e = new R(), l = ["a", "b", "c"], c = new hl(), t = new hl();
  return function(s, i = null, a = null) {
    const o = i || a ? c : null;
    if (this.intersectsTriangle(s, o))
      return (i || a) && (i && o.getCenter(i), a && o.getCenter(a)), 0;
    let b = 1 / 0;
    for (let m = 0; m < 3; m++) {
      let X;
      const G = l[m], h = s[G];
      this.closestPointToPoint(h, n), X = h.distanceToSquared(n), X < b && (b = X, i && i.copy(n), a && a.copy(h));
      const u = this[G];
      s.closestPointToPoint(u, n), X = u.distanceToSquared(n), X < b && (b = X, i && i.copy(u), a && a.copy(n));
    }
    for (let m = 0; m < 3; m++) {
      const X = l[m], G = l[(m + 1) % 3];
      c.set(this[X], this[G]);
      for (let h = 0; h < 3; h++) {
        const u = l[h], y = l[(h + 1) % 3];
        t.set(s[u], s[y]), yt(c, t, n, e);
        const p = n.distanceToSquared(e);
        p < b && (b = p, i && i.copy(n), a && a.copy(e));
      }
    }
    return Math.sqrt(b);
  };
}();
class sl extends U {
  constructor(...e) {
    super(...e), this.isOrientedBox = !0, this.matrix = new B(), this.invMatrix = new B(), this.points = new Array(8).fill().map(() => new R()), this.satAxes = new Array(3).fill().map(() => new R()), this.satBounds = new Array(3).fill().map(() => new Fl()), this.alignedSatBounds = new Array(3).fill().map(() => new Fl()), this.needsUpdate = !1;
  }
  set(e, l, c) {
    super.set(e, l), this.matrix.copy(c), this.needsUpdate = !0;
  }
  copy(e) {
    super.copy(e), this.matrix.copy(e.matrix), this.needsUpdate = !0;
  }
  update() {
    const e = this.matrix, l = this.min, c = this.max, t = this.points;
    for (let o = 0; o <= 1; o++)
      for (let b = 0; b <= 1; b++)
        for (let m = 0; m <= 1; m++) {
          const X = 1 * o | 2 * b | 4 * m, G = t[X];
          G.x = o ? c.x : l.x, G.y = b ? c.y : l.y, G.z = m ? c.z : l.z, G.applyMatrix4(e);
        }
    const d = this.satBounds, s = this.satAxes, i = t[0];
    for (let o = 0; o < 3; o++) {
      const b = s[o], m = d[o], X = 1 << o, G = t[X];
      b.subVectors(i, G), m.setFromPoints(b, t);
    }
    const a = this.alignedSatBounds;
    a[0].setFromPointsField(t, "x"), a[1].setFromPointsField(t, "y"), a[2].setFromPointsField(t, "z"), this.invMatrix.copy(this.matrix).invert(), this.needsUpdate = !1;
  }
}
sl.prototype.intersectsBox = function() {
  const n = new Fl();
  return function(l) {
    this.needsUpdate && this.update();
    const c = l.min, t = l.max, d = this.satBounds, s = this.satAxes, i = this.alignedSatBounds;
    if (n.min = c.x, n.max = t.x, i[0].isSeparated(n) || (n.min = c.y, n.max = t.y, i[1].isSeparated(n)) || (n.min = c.z, n.max = t.z, i[2].isSeparated(n)))
      return !1;
    for (let a = 0; a < 3; a++) {
      const o = s[a], b = d[a];
      if (n.setFromBox(o, l), b.isSeparated(n))
        return !1;
    }
    return !0;
  };
}();
sl.prototype.intersectsTriangle = function() {
  const n = new dl(), e = new Array(3), l = new Fl(), c = new Fl(), t = new R();
  return function(s) {
    this.needsUpdate && this.update(), s.isExtendedTriangle ? s.needsUpdate && s.update() : (n.copy(s), n.update(), s = n);
    const i = this.satBounds, a = this.satAxes;
    e[0] = s.a, e[1] = s.b, e[2] = s.c;
    for (let X = 0; X < 3; X++) {
      const G = i[X], h = a[X];
      if (l.setFromPoints(h, e), G.isSeparated(l))
        return !1;
    }
    const o = s.satBounds, b = s.satAxes, m = this.points;
    for (let X = 0; X < 3; X++) {
      const G = o[X], h = b[X];
      if (l.setFromPoints(h, m), G.isSeparated(l))
        return !1;
    }
    for (let X = 0; X < 3; X++) {
      const G = a[X];
      for (let h = 0; h < 4; h++) {
        const u = b[h];
        if (t.crossVectors(G, u), l.setFromPoints(t, e), c.setFromPoints(t, m), l.isSeparated(c))
          return !1;
      }
    }
    return !0;
  };
}();
sl.prototype.closestPointToPoint = function() {
  return function(e, l) {
    return this.needsUpdate && this.update(), l.copy(e).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix), l;
  };
}();
sl.prototype.distanceToPoint = function() {
  const n = new R();
  return function(l) {
    return this.closestPointToPoint(l, n), l.distanceTo(n);
  };
}();
sl.prototype.distanceToBox = function() {
  const n = ["x", "y", "z"], e = new Array(12).fill().map(() => new hl()), l = new Array(12).fill().map(() => new hl()), c = new R(), t = new R();
  return function(s, i = 0, a = null, o = null) {
    if (this.needsUpdate && this.update(), this.intersectsBox(s))
      return (a || o) && (s.getCenter(t), this.closestPointToPoint(t, c), s.closestPointToPoint(c, t), a && a.copy(c), o && o.copy(t)), 0;
    const b = i * i, m = s.min, X = s.max, G = this.points;
    let h = 1 / 0;
    for (let y = 0; y < 8; y++) {
      const p = G[y];
      t.copy(p).clamp(m, X);
      const W = p.distanceToSquared(t);
      if (W < h && (h = W, a && a.copy(p), o && o.copy(t), W < b))
        return Math.sqrt(W);
    }
    let u = 0;
    for (let y = 0; y < 3; y++)
      for (let p = 0; p <= 1; p++)
        for (let W = 0; W <= 1; W++) {
          const V = (y + 1) % 3, r = (y + 2) % 3, I = p << V | W << r, g = 1 << y | p << V | W << r, L = G[I], Y = G[g];
          e[u].set(L, Y);
          const S = n[y], x = n[V], H = n[r], K = l[u], M = K.start, J = K.end;
          M[S] = m[S], M[x] = p ? m[x] : X[x], M[H] = W ? m[H] : X[x], J[S] = X[S], J[x] = p ? m[x] : X[x], J[H] = W ? m[H] : X[x], u++;
        }
    for (let y = 0; y <= 1; y++)
      for (let p = 0; p <= 1; p++)
        for (let W = 0; W <= 1; W++) {
          t.x = y ? X.x : m.x, t.y = p ? X.y : m.y, t.z = W ? X.z : m.z, this.closestPointToPoint(t, c);
          const V = t.distanceToSquared(c);
          if (V < h && (h = V, a && a.copy(c), o && o.copy(t), V < b))
            return Math.sqrt(V);
        }
    for (let y = 0; y < 12; y++) {
      const p = e[y];
      for (let W = 0; W < 12; W++) {
        const V = l[W];
        yt(p, V, c, t);
        const r = c.distanceToSquared(t);
        if (r < h && (h = r, a && a.copy(c), o && o.copy(t), r < b))
          return Math.sqrt(r);
      }
    }
    return Math.sqrt(h);
  };
}();
const De = /* @__PURE__ */ new R(), Oe = /* @__PURE__ */ new R(), _e = /* @__PURE__ */ new R(), Nt = /* @__PURE__ */ new T(), Jt = /* @__PURE__ */ new T(), Mt = /* @__PURE__ */ new T(), Ft = /* @__PURE__ */ new R();
function gi(n, e, l, c, t, d) {
  let s;
  return d === bt ? s = n.intersectTriangle(c, l, e, !0, t) : s = n.intersectTriangle(e, l, c, d !== xc, t), s === null ? null : {
    distance: n.origin.distanceTo(t),
    point: t.clone()
  };
}
function Yi(n, e, l, c, t, d, s) {
  De.fromBufferAttribute(e, c), Oe.fromBufferAttribute(e, t), _e.fromBufferAttribute(e, d);
  const i = gi(n, De, Oe, _e, Ft, s);
  if (i) {
    l && (Nt.fromBufferAttribute(l, c), Jt.fromBufferAttribute(l, t), Mt.fromBufferAttribute(l, d), i.uv = zl.getUV(Ft, De, Oe, _e, Nt, Jt, Mt, new T()));
    const a = {
      a: c,
      b: t,
      c: d,
      normal: new R(),
      materialIndex: 0
    };
    zl.getNormal(De, Oe, _e, a.normal), i.face = a, i.faceIndex = c;
  }
  return i;
}
function jd(n, e, l, c, t) {
  const d = c * 3, s = n.index.getX(d), i = n.index.getX(d + 1), a = n.index.getX(d + 2), o = Yi(l, n.attributes.position, n.attributes.uv, s, i, a, e);
  return o ? (o.faceIndex = c, t && t.push(o), o) : null;
}
function Ci(n, e, l, c, t, d) {
  for (let s = c, i = c + t; s < i; s++)
    jd(n, e, l, s, d);
}
function Si(n, e, l, c, t) {
  let d = 1 / 0, s = null;
  for (let i = c, a = c + t; i < a; i++) {
    const o = jd(n, e, l, i);
    o && o.distance < d && (s = o, d = o.distance);
  }
  return s;
}
function pc(n, e, l) {
  return n === null || (n.point.applyMatrix4(e.matrixWorld), n.distance = n.point.distanceTo(l.ray.origin), n.object = e, n.distance < l.near || n.distance > l.far) ? null : n;
}
function E(n, e, l, c) {
  const t = n.a, d = n.b, s = n.c;
  let i = e, a = e + 1, o = e + 2;
  l && (i = l.getX(e), a = l.getX(e + 1), o = l.getX(e + 2)), t.x = c.getX(i), t.y = c.getY(i), t.z = c.getZ(i), d.x = c.getX(a), d.y = c.getY(a), d.z = c.getZ(a), s.x = c.getX(o), s.y = c.getY(o), s.z = c.getZ(o);
}
function Tt(n, e, l, c, t, d, s) {
  const i = l.index, a = l.attributes.position;
  for (let o = n, b = e + n; o < b; o++)
    if (E(s, o * 3, i, a), s.needsUpdate = !0, c(s, o, t, d))
      return !0;
  return !1;
}
class Ed {
  constructor(e) {
    this._getNewPrimitive = e, this._primitives = [];
  }
  getPrimitive() {
    const e = this._primitives;
    return e.length === 0 ? this._getNewPrimitive() : e.pop();
  }
  releasePrimitive(e) {
    this._primitives.push(e);
  }
}
function Gl(n, e) {
  return e[n + 15] === 65535;
}
function Ml(n, e) {
  return e[n + 6];
}
function Dl(n, e) {
  return e[n + 14];
}
function Ue(n) {
  return n + 8;
}
function we(n, e) {
  return e[n + 6];
}
function Ki(n, e) {
  return e[n + 7];
}
const Il = 1e-10, fl = new R(), kt = new R(), vt = new B(), ft = new ms();
function Bt(n) {
  return fl.subVectors(n.a, n.b), kt.subVectors(n.a, n.c), fl.cross(kt), fl.x > -Il && fl.x < Il && fl.y > -Il && fl.y < Il && fl.z > -Il && fl.z < Il;
}
function ul(n, e, l, c) {
  vt.set(n.x, n.y, n.z, 1, e.x, e.y, e.z, 1, l.x, l.y, l.z, 1, c.x, c.y, c.z, 1);
  const t = vt.determinant();
  return t < -Il ? -1 : t > Il ? 1 : 0;
}
function k(n, e, l) {
  ft.set(n.x, n.y, 1, e.x, e.y, 1, l.x, l.y, 1);
  const c = ft.determinant();
  return c < -Il ? -1 : c > Il ? 1 : 0;
}
function yc(n) {
  const e = n.a;
  n.a = n.b, n.b = n.c, n.c = e;
}
function Wc(n) {
  const e = n.c;
  n.c = n.b, n.b = n.a, n.a = e;
}
function Ut(n) {
  if (k(n.a, n.b, n.c) < 0) {
    const e = n.c;
    n.c = n.b, n.b = e;
  }
}
function wt(n, e, l, c, t) {
  const d = n.x - e.x, s = l.x - c.x, i = n.y - e.y, a = l.y - c.y, o = d * a - s * i, b = n.x * e.y - n.y * e.x, m = l.x * c.y - l.y * c.x;
  t.set((b * s - m * d) / o, (b * a - m * i) / o, 0);
}
const xi = 1e-10, qe = new R(), Pt = new R(), Ye = new R(), Ce = new R(), ne = new R(), ae = new R();
function Hi(n, e, l, c, t, d) {
  const s = ul(n.a, n.b, n.c, e.a), i = ul(n.a, n.b, n.c, e.b), a = ul(n.a, n.b, n.c, e.c);
  if (s === i && s === a)
    return !1;
  Qt(n, l, c, t), Qt(e, s, i, a), jt(e, n), jt(n, e);
  const o = ul(n.a, n.b, e.a, e.b), b = ul(n.a, n.c, e.c, e.a);
  return o <= 0 && b <= 0 ? (d && zi(n, e, d), !0) : !1;
}
function Qt(n, e, l, c) {
  e === l ? Wc(n) : e === c ? yc(n) : l !== c && (l > 0 ? yc(n) : c > 0 && Wc(n));
}
function jt(n, e) {
  if (ul(e.a, e.b, e.c, n.a) < 0) {
    const c = e.c;
    e.c = e.b, e.b = c;
  }
}
function Bl(n, e, l, c, t) {
  qe.subVectors(e, n), Pt.subVectors(n, l);
  const d = c.dot(qe), s = c.dot(Pt);
  qe.multiplyScalar(-s / d), t.addVectors(n, qe);
}
function zi(n, e, l) {
  n.getNormal(Ye), e.getNormal(Ce);
  const c = ul(n.a, n.c, e.b, e.a), t = ul(n.a, n.b, e.c, e.a);
  c > 0 ? t > 0 ? (Bl(n.a, n.c, e.a, Ce, ne), Bl(e.a, e.c, n.a, Ye, ae)) : (Bl(n.a, n.c, e.a, Ce, ne), Bl(n.a, n.b, e.a, Ce, ae)) : t > 0 ? (Bl(e.a, e.b, n.a, Ye, ne), Bl(e.a, e.c, n.a, Ye, ae)) : (Bl(e.a, e.b, n.a, Ye, ne), Bl(n.a, n.b, e.a, Ce, ae)), l.push(ne.clone()), ne.distanceTo(ae) >= xi && l.push(ae.clone());
}
const ol = new B(), oe = new R(), be = new R(), me = new R(), Ni = new B().set(0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1);
function Ji(n, e, l) {
  n.getNormal(oe), be.subVectors(n.a, n.b).normalize(), me.crossVectors(oe, be), be.add(n.a), me.add(n.a), oe.add(n.a), ol.set(n.a.x, be.x, me.x, oe.x, n.a.y, be.y, me.y, oe.y, n.a.z, be.z, me.z, oe.z, 1, 1, 1, 1), ol.invert(), ol.premultiply(Ni), n.a.applyMatrix4(ol), n.b.applyMatrix4(ol), n.c.applyMatrix4(ol), e.a.applyMatrix4(ol), e.b.applyMatrix4(ol), e.c.applyMatrix4(ol), Ut(n), Ut(e);
  const c = n.a, t = e.a, d = e.b, s = e.c, i = k(t, d, c), a = k(d, s, c), o = k(s, t, c);
  let b = !1;
  if (i >= 0)
    a >= 0 ? o >= 0 ? b = !0 : b = Jc(n, e) : o >= 0 ? (Wc(e), b = Jc(n, e)) : b = Mc(n, e);
  else if (a >= 0)
    o >= 0 ? (yc(e), b = Jc(n, e)) : (yc(e), b = Mc(n, e));
  else if (o >= 0)
    Wc(e), b = Mc(n, e);
  else
    return console.error("Triangles should not be flat.", n, e, me), !1;
  if (b && l) {
    Fi(n, e, l), ol.invert();
    for (const m of l)
      m.applyMatrix4(ol);
  }
  return b;
}
function Jc(n, e) {
  const l = n.a, c = n.b, t = n.c, d = e.a, s = e.c;
  if (k(s, d, c) >= 0) {
    if (k(s, l, c) >= 0) {
      if (k(l, d, c) >= 0)
        return !0;
      if (k(l, d, t) >= 0 && k(c, t, d) >= 0)
        return !0;
    }
  } else if (k(s, d, t) >= 0 && k(c, t, s) >= 0 && k(l, d, t) >= 0)
    return !0;
  return !1;
}
function Mc(n, e) {
  const l = n.a, c = n.b, t = n.c, d = e.a, s = e.b, i = e.c;
  if (k(i, d, c) >= 0) {
    if (k(s, i, c) >= 0) {
      if (k(l, d, c) >= 0) {
        if (k(l, s, c) <= 0)
          return !0;
      } else if (k(l, d, t) >= 0 && k(i, d, t) <= 0)
        return !0;
    } else if (k(l, s, c) <= 0 && k(s, i, t) >= 0 && k(c, t, s) >= 0)
      return !0;
  } else if (k(i, d, t) >= 0) {
    if (k(c, t, i) >= 0) {
      if (k(t, l, d) >= 0)
        return !0;
    } else if (k(c, t, s) >= 0 && k(s, i, t) >= 0)
      return !0;
  }
  return !1;
}
const Mi = new R(), Yl = new Array(3).fill(Mi), nl = new Array(), $e = new R(), lc = new Array(9).fill(0);
function Fi(n, e, l) {
  Yl[0] = n.a, Yl[1] = n.b, Yl[2] = n.c, nl.splice(0, nl.length), nl.push(e.a), nl.push(e.b), nl.push(e.c);
  for (let c = 0; c < 3; c++) {
    const t = [...nl];
    nl.splice(0, nl.length);
    const d = (c + 2) % 3;
    for (let s = 0; s < t.length; s++)
      lc[s] = k(Yl[d], Yl[c], t[s]);
    for (let s = 0; s < t.length; s++) {
      const i = (s - 1 + t.length) % t.length;
      lc[s] >= 0 ? (lc[i] < 0 && (wt(Yl[d], Yl[c], t[i], t[s], $e), nl.push($e.clone())), nl.push(t[s].clone())) : lc[i] >= 0 && (wt(Yl[d], Yl[c], t[i], t[s], $e), nl.push($e.clone()));
    }
  }
  for (const c of nl) {
    let t = 0, d = !1;
    for (; !d && t < l.length; )
      d = c.distanceTo(l[t]) <= 1e-10, t++;
    d || l.push(c);
  }
}
const Et = new zl(), At = new zl();
var El;
(function(n) {
  n.Cross = "Cross", n.Coplanar = "Coplanar";
})(El || (El = {}));
function Dt(n, e, l) {
  if (l && l.splice(0, l.length), Bt(n) || Bt(e))
    return console.warn("Degenerated triangles provided, skipping."), null;
  Et.copy(n), At.copy(e), n = Et, e = At;
  const c = ul(e.a, e.b, e.c, n.a), t = ul(e.a, e.b, e.c, n.b), d = ul(e.a, e.b, e.c, n.c);
  return c === t && c === d ? c === 0 && Ji(n, e, l) ? El.Coplanar : null : Hi(n, e, c, t, d, l) ? El.Cross : null;
}
class Ot {
  constructor(e, l, c) {
    Z(this, "distance");
    Z(this, "index");
    Z(this, "normal");
    this.distance = e, this.index = l, this.normal = c;
  }
}
class _t {
  constructor() {
    Z(this, "EPSILON", 1e-5);
  }
  getNormal(e, l, c) {
    let t = e.clone(), d = l.clone(), s = c.clone(), i = t.dot(s), a = d.dot(s), o = d.multiplyScalar(i), b = t.multiplyScalar(a), m = o.sub(b);
    return m.lengthSq() < this.EPSILON * this.EPSILON ? m.multiplyScalar(0) : m.normalize();
  }
  getBarycenter(e) {
    let l = new N.Vector3();
    for (let c = 0; c < e.length; c++)
      l.addVectors(e[c], l);
    return l.multiplyScalar(1 / e.length), l;
  }
  support(e, l, c) {
    c.normalize();
    let t = this.getFarthestPointInDirection(e, c), d = this.getFarthestPointInDirection(l, c.clone().negate()), s = t.clone(), i = d.clone();
    return s.sub(i);
  }
  getFarthestPointInDirection(e, l) {
    let c = e[0].dot(l), t = 0;
    for (let d = 1; d < e.length; d++) {
      let s = e[d].dot(l);
      s > c && (c = s, t = d);
    }
    return e[t];
  }
  containsLine(e, l) {
    let c = e[1], t = e[0], d = new N.Vector3(), s = c.clone().negate();
    return d.subVectors(t, c), d.lengthSq() !== 0 ? l.copy(this.getNormal(d, s, d)) : l.copy(s), !1;
  }
  containsTriangle(e, l) {
    let c = e[2], t = e[1], d = e[0], s = new N.Vector3(), i = new N.Vector3(), a = c.clone().negate();
    s.subVectors(t, c), i.subVectors(d, c);
    let o = this.getNormal(i, s, s), b = this.getNormal(s, i, i);
    if (o.dot(a) > 0)
      e.splice(0, 1), l.copy(o);
    else if (b.dot(a) > 0)
      e.splice(1, 1), l.copy(b);
    else {
      if (l.z === void 0)
        return !0;
      {
        let m = new N.Vector3();
        return m.crossVectors(s, i), l.copy(m), m.dot(a) <= 0 && (e[0] = t, e[1] = d, e[2] = c, l.copy(m.negate())), !1;
      }
    }
  }
  containsTetrahedron(e, l) {
    let c = e[3], t = e[2], d = e[1], s = e[0], i = new N.Vector3(), a = new N.Vector3(), o = new N.Vector3(), b = c.clone().negate();
    i.subVectors(t, c), a.subVectors(d, c), o.subVectors(s, c);
    let m = new N.Vector3(), X = new N.Vector3(), G = new N.Vector3();
    m.crossVectors(i, a), X.crossVectors(a, o), G.crossVectors(o, i);
    let h = 1, u = 2, y = 4;
    switch ((m.dot(b) > 0 ? h : 0) | (X.dot(b) > 0 ? u : 0) | (G.dot(b) > 0 ? y : 0)) {
      case h:
        return this.checkTetrahedron(b, i, a, m, l, e);
      case u:
        return e[2] = d, e[1] = s, this.checkTetrahedron(b, a, o, X, l, e);
      case y:
        return e[1] = t, e[2] = s, this.checkTetrahedron(b, o, i, G, l, e);
      case h | u:
        return this.checkTwoTetrahedron(b, i, a, m, l, e);
      case u | y:
        return e[2] = d, e[1] = s, e[0] = t, this.checkTwoTetrahedron(b, a, o, X, l, e);
      case y | h:
        return e[1] = t, e[2] = s, e[0] = d, this.checkTwoTetrahedron(b, o, i, G, l, e);
    }
    return !0;
  }
  checkTwoTetrahedron(e, l, c, t, d, s) {
    let i = new N.Vector3();
    if (i.crossVectors(t, c), i.dot(e) > 0)
      return s[2] = s[1], s[1] = s[0], l = new N.Vector3(), l.subVectors(s[2], s[3]), c = new N.Vector3(), c.subVectors(s[1], s[3]), t = new N.Vector3(), t.crossVectors(l, c), this.checkTetrahedron(e, l, c, t, d, s);
    let a = new N.Vector3();
    if (a.crossVectors(l, t), a.dot(e) > 0)
      return s.splice(0, 2), d.copy(this.getNormal(l, e, l)), !1;
  }
  checkTetrahedron(e, l, c, t, d, s) {
    let i = new N.Vector3();
    if (i.crossVectors(t, c), i.dot(e) > 0)
      return s[2] = s[3], s.splice(3, 1), s.splice(0, 1), d.copy(this.getNormal(c, e, c)), !1;
    let a = new N.Vector3();
    return a.crossVectors(l, t), a.dot(e) > 0 ? (s.splice(0, 2), d.copy(this.getNormal(l, e, l)), !1) : (s.splice(0, 1), d.copy(t), !1);
  }
  containsOrigin(e, l) {
    return e.length === 2 ? this.containsLine(e, l) : e.length === 3 ? this.containsTriangle(e, l) : e.length === 4 ? this.containsTetrahedron(e, l) : !1;
  }
  minkowsky(e, l) {
    let c = new Array();
    for (let t of l)
      for (let d of e) {
        let s = new N.Vector3(), i = new N.Vector3();
        s.copy(t), i.copy(d), c.push(s.sub(i));
      }
    return c;
  }
  check(e, l) {
    let c = 0, t = [], d = this.getBarycenter(e), s = this.getBarycenter(l), i = new N.Vector3();
    i.subVectors(d, s);
    let a = i.normalize();
    a.lengthSq() < this.EPSILON && (a.x = 1);
    let o = t[0] = this.support(e, l, a);
    if (o.dot(a) <= 0)
      return !1;
    a.negate();
    let b = l.length * e.length;
    for (; c < b; ) {
      if (a.lengthSq() === 0 && t.length >= 2) {
        a = new N.Vector3(), a.subVectors(t[t.length - 1], t[t.length - 2]);
        let m = a.y;
        a.y = -a.x, a.x = m;
      }
      if (o = this.support(e, l, a), o.dot(a) <= 0)
        return !1;
      if (t.push(o), this.containsOrigin(t, a))
        return t;
      c++;
    }
  }
  getNearestEdge(e) {
    let l = 1 / 0, c, t;
    for (let d = 0; d < e.length; d++) {
      let s = (d + 1) % e.length, i = e[d], a = e[s], o = new N.Vector3();
      if (o.subVectors(a, i), o.lengthSq() === 0)
        continue;
      let b = i, m = this.getNormal(o, b, o);
      if (m.lengthSq() === 0) {
        m.y = -o.x, m.x = o.y;
        let G = this.getBarycenter(e), h = new N.Vector3();
        h.subVectors(i, G), m.dot(h) < 0 && (m.y = -m.y, m.x = -m.x);
      }
      let X = Math.abs(m.dot(i));
      X < l && (l = X, c = s, t = m);
    }
    return new Ot(l, c, t);
  }
  getNearestTriangle(e) {
    let l = 1 / 0, c;
    for (let t = 0; t < e.length; t++) {
      let d = e[t], s = new N.Vector3();
      d.getNormal(s);
      let i = Math.abs(s.dot(d.a));
      i < l && (l = i, c = t);
    }
    return new Ot(l, c);
  }
  addEdge(e, l) {
    for (let c = 0; c < e.length; c++)
      if (e[c].a === l.b && e[c].b === l.a) {
        e.splice(c, 1);
        return;
      }
    e.push(l);
  }
  findResponseWithEdge(e, l, c) {
    let t = this.getNearestEdge(c), d = this.support(e, l, t.normal);
    return Math.abs(d.dot(t.normal)) - t.distance <= this.EPSILON ? t.normal.multiplyScalar(t.distance) : (c.splice(t.index, 0, d), !1);
  }
  findResponseWithTriangle(e, l, c) {
    if (c.length === 0)
      return !1;
    let t = this.getNearestTriangle(c), d = c[t.index], s = new N.Vector3();
    d.getNormal(s);
    let i = this.support(e, l, s);
    if (Math.abs(i.dot(s)) - t.distance <= this.EPSILON)
      return s.multiplyScalar(t.distance);
    {
      let o = [];
      for (let b = c.length - 1; b >= 0; b--) {
        d = c[b], s = new N.Vector3(), d.getNormal(s);
        let m = new N.Vector3();
        m.subVectors(i, c[b].a), s.dot(m) > 0 && (this.addEdge(o, {
          a: d.a,
          b: d.b
        }), this.addEdge(o, {
          a: d.b,
          b: d.c
        }), this.addEdge(o, {
          a: d.c,
          b: d.a
        }), c.splice(b, 1));
      }
      for (let b = 0; b < o.length; b++) {
        d = new N.Triangle(i, o[b].a, o[b].b);
        let m = new N.Vector3();
        d.getNormal(m), m.length() !== 0 && c.push(d);
      }
    }
    return !1;
  }
  getResponse(e, l, c) {
    let t = 0, d, s = c[0].z !== void 0 ? [
      new N.Triangle(c[0], c[1], c[2]),
      new N.Triangle(c[0], c[2], c[3]),
      new N.Triangle(c[0], c[3], c[1]),
      new N.Triangle(c[1], c[3], c[2])
    ] : null, i = l.length * e.length;
    for (; t < i; ) {
      if (c[0].z === void 0 ? d = this.findResponseWithEdge(e, l, c) : d = this.findResponseWithTriangle(e, l, s), d)
        if (d instanceof N.Vector3) {
          let a = new N.Vector3();
          return a.copy(d).normalize().multiplyScalar(this.EPSILON), d.add(a);
        } else
          return d;
      t++;
    }
    return !1;
  }
  isIntersecting(e, l) {
    return !!this.check(e, l);
  }
  intersect(e, l) {
    let c = this.check(e, l);
    return c instanceof Array ? this.getResponse(e, l, c) : c;
  }
}
const D = new U(), Vc = new R(), Ti = ["x", "y", "z"];
function tt(n, e, l, c, t) {
  let d = n * 2, s = Tl, i = pl, a = yl;
  if (Gl(d, i)) {
    const b = Ml(n, a), m = Dl(d, i);
    Ci(e, l, c, b, m, t);
  } else {
    const b = Ue(n);
    rc(b, s, c, Vc) && tt(b, e, l, c, t);
    const m = we(n, a);
    rc(m, s, c, Vc) && tt(m, e, l, c, t);
  }
}
function dt(n, e, l, c) {
  let t = n * 2, d = Tl, s = pl, i = yl;
  if (Gl(t, s)) {
    const o = Ml(n, i), b = Dl(t, s);
    return Si(e, l, c, o, b);
  } else {
    const o = Ki(n, i), b = Ti[o], X = c.direction[b] >= 0;
    let G, h;
    X ? (G = Ue(n), h = we(n, i)) : (G = we(n, i), h = Ue(n));
    const y = rc(G, d, c, Vc) ? dt(G, e, l, c) : null;
    if (y) {
      const V = y.point[b];
      if (X ? V <= d[h + o] : V >= d[h + o + 3])
        return y;
    }
    const W = rc(h, d, c, Vc) ? dt(h, e, l, c) : null;
    return y && W ? y.distance <= W.distance ? y : W : y || W || null;
  }
}
const ki = function() {
  let n, e;
  const l = [], c = new Ed(() => new U());
  return function(...s) {
    n = c.getPrimitive(), e = c.getPrimitive(), l.push(n, e);
    const i = t(...s);
    c.releasePrimitive(n), c.releasePrimitive(e), l.pop(), l.pop();
    const a = l.length;
    return a > 0 && (e = l[a - 1], n = l[a - 2]), i;
  };
  function t(d, s, i, a, o = null, b = 0, m = 0) {
    function X(V) {
      let r = V * 2, I = pl, g = yl;
      for (; !Gl(r, I); )
        V = Ue(V), r = V * 2;
      return Ml(V, g);
    }
    function G(V) {
      let r = V * 2, I = pl, g = yl;
      for (; !Gl(r, I); )
        V = we(V, g), r = V * 2;
      return Ml(V, g) + Dl(r, I);
    }
    let h = d * 2, u = Tl, y = pl, p = yl;
    if (Gl(h, y)) {
      const V = Ml(d, p), r = Dl(h, y);
      return A(d, u, n), a(V, r, !1, m, b + d, n);
    } else {
      const V = Ue(d), r = we(d, p);
      let I = V, g = r, L, Y, C, S;
      if (o && (C = n, S = e, A(I, u, C), A(g, u, S), L = o(C), Y = o(S), Y < L)) {
        I = r, g = V;
        const O = L;
        L = Y, Y = O, C = S;
      }
      C || (C = n, A(I, u, C));
      const x = Gl(I * 2, y), H = i(C, x, L, m + 1, b + I);
      let K;
      if (H === St) {
        const O = X(I), ie = G(I) - O;
        K = a(O, ie, !0, m + 1, b + I, C);
      } else
        K = H && t(
          I,
          s,
          i,
          a,
          o,
          b,
          m + 1
        );
      if (K)
        return !0;
      S = e, A(g, u, S);
      const M = Gl(g * 2, y), J = i(S, M, Y, m + 1, b + g);
      let P;
      if (J === St) {
        const O = X(g), ie = G(g) - O;
        P = a(O, ie, !0, m + 1, b + g, S);
      } else
        P = J && t(
          g,
          s,
          i,
          a,
          o,
          b,
          m + 1
        );
      return !!P;
    }
  }
}(), vi = function() {
  const n = new dl(), e = new dl(), l = new B(), c = new sl(), t = new sl();
  return function d(s, i, a, o, b, m) {
    let X = s * 2, G = Tl, h = pl, u = yl;
    if (b === null && (a.boundingBox || a.computeBoundingBox(), c.set(a.boundingBox.min, a.boundingBox.max, o), b = c), Gl(X, h)) {
      const p = i, W = p.index, V = p.attributes.position, r = a.index, I = a.attributes.position, g = Ml(s, u), L = Dl(X, h);
      if (l.copy(o).invert(), a.boundsTree)
        return A(s, G, t), t.matrix.copy(l), t.needsUpdate = !0, a.boundsTree.shapecast({
          intersectsBounds: (C) => {
            let S = t.intersectsBox(C);
            return m.boxs1.push(C), S;
          },
          intersectsTriangle: (C) => {
            C.a.applyMatrix4(o), C.b.applyMatrix4(o), C.c.applyMatrix4(o), C.needsUpdate = !0;
            for (let S = g * 3, x = (L + g) * 3; S < x; S += 3) {
              E(e, S, W, V), e.needsUpdate = !0;
              let H = new hl();
              if (C.intersectsTriangle(e, H))
                return !0;
            }
            return !1;
          }
        });
      for (let Y = g * 3, C = L + g * 3; Y < C; Y += 3) {
        E(n, Y, W, V), n.a.applyMatrix4(l), n.b.applyMatrix4(l), n.c.applyMatrix4(l), n.needsUpdate = !0;
        for (let S = 0, x = r.count; S < x; S += 3)
          if (E(e, S, r, I), e.needsUpdate = !0, n.intersectsTriangle(e))
            return !0;
      }
    } else {
      const p = s + 8, W = u[s + 6];
      return A(p, G, D), !!(b.intersectsBox(D) && d(p, i, a, o, b, m) || (A(W, G, D), b.intersectsBox(D) && d(W, i, a, o, b, m)));
    }
  };
}(), fi = function() {
  const n = new dl(), e = new dl(), l = new B(), c = new sl(), t = new sl();
  return function d(s, i, a, o, b = null) {
    let m = s * 2, X = Tl, G = pl, h = yl;
    if (b === null && (a.boundingBox || a.computeBoundingBox(), c.set(a.boundingBox.min, a.boundingBox.max, o), b = c), Gl(m, G)) {
      const y = i, p = y.index, W = y.attributes.position, V = a.index, r = a.attributes.position, I = Ml(s, h), g = Dl(m, G);
      if (l.copy(o).invert(), a.boundsTree)
        return A(s, X, t), t.matrix.copy(l), t.needsUpdate = !0, a.boundsTree.shapecast({
          intersectsBounds: (Y) => t.intersectsBox(Y),
          intersectsTriangle: (Y) => {
            Y.a.applyMatrix4(o), Y.b.applyMatrix4(o), Y.c.applyMatrix4(o), Y.needsUpdate = !0;
            for (let C = I * 3, S = (g + I) * 3; C < S; C += 3)
              if (E(e, C, p, W), e.needsUpdate = !0, Y.intersectsTriangle(e))
                return !0;
            return !1;
          }
        });
      for (let L = I * 3, Y = g + I * 3; L < Y; L += 3) {
        E(n, L, p, W), n.a.applyMatrix4(l), n.b.applyMatrix4(l), n.c.applyMatrix4(l), n.needsUpdate = !0;
        for (let C = 0, S = V.count; C < S; C += 3)
          if (E(e, C, V, r), e.needsUpdate = !0, n.intersectsTriangle(e))
            return !0;
      }
    } else {
      const y = s + 8, p = h[s + 6];
      return A(y, X, D), !!(b.intersectsBox(D) && d(y, i, a, o, b) || (A(p, X, D), b.intersectsBox(D) && d(p, i, a, o, b)));
    }
  };
}();
class qt {
  constructor(e, l, c, t) {
    Z(this, "Intersects");
    Z(this, "Triangle1");
    Z(this, "Triangle2");
    Z(this, "Distance");
    this.Intersects = e, this.Triangle1 = l, this.Triangle2 = c, this.Distance = t;
  }
}
const Bi = function() {
  const n = new dl(), e = new dl(), l = new B(), c = new sl(), t = new sl();
  return function d(s, i, a, o, b, m) {
    let X = s * 2, G = Tl, h = pl, u = yl;
    if (b === null && (a.boundingBox || a.computeBoundingBox(), c.set(a.boundingBox.min, a.boundingBox.max, o), b = c), Gl(X, h)) {
      const p = i, W = p.index, V = p.attributes.position, r = a.index, I = a.attributes.position, g = Ml(s, u), L = Dl(X, h);
      if (l.copy(o).invert(), a.boundsTree)
        return A(s, G, t), t.matrix.copy(l), t.needsUpdate = !0, a.boundsTree.shapecast({
          intersectsBounds: (C) => t.intersectsBox(C),
          intersectsTriangle: (C) => {
            C.a.applyMatrix4(o), C.b.applyMatrix4(o), C.c.applyMatrix4(o), C.needsUpdate = !0;
            for (let S = g * 3, x = (L + g) * 3; S < x; S += 3) {
              E(e, S, W, V), e.needsUpdate = !0;
              const H = [], K = new zl();
              K.set(C.a, C.b, C.c);
              const M = new zl();
              M.set(e.a, e.b, e.c);
              const J = Dt(K, M, H);
              if (J === El.Cross) {
                if (H.length === 2) {
                  if (H[0].distanceTo(H[1]) >= m)
                    return !0;
                } else if (m === 0)
                  return !0;
                return !0;
              } else if (J === El.Coplanar && m === 0)
                return !0;
            }
            return !1;
          }
        });
      for (let Y = g * 3, C = L + g * 3; Y < C; Y += 3) {
        E(n, Y, W, V), n.a.applyMatrix4(l), n.b.applyMatrix4(l), n.c.applyMatrix4(l), n.needsUpdate = !0;
        for (let S = 0, x = r.count; S < x; S += 3) {
          E(e, S, r, I), e.needsUpdate = !0;
          const H = [], K = new zl();
          K.set(n.a, n.b, n.c);
          const M = new zl();
          M.set(e.a, e.b, e.c);
          const J = Dt(K, M, H);
          if (J === El.Cross) {
            if (H.length === 2) {
              if (H[0].distanceTo(H[1]) >= m)
                return !0;
            } else if (m === 0)
              return !0;
            return !0;
          } else if (J === El.Coplanar && m === 0)
            return !0;
        }
      }
    } else {
      const p = s + 8, W = u[s + 6];
      return A(p, G, D), !!(b.intersectsBox(D) && d(p, i, a, o, b, m) || (A(W, G, D), b.intersectsBox(D) && d(W, i, a, o, b, m)));
    }
  };
}(), Ui = function() {
  const n = new dl(), e = new dl(), l = new B(), c = new sl(), t = new sl();
  return function d(s, i, a, o, b, m, X) {
    let G = s * 2, h = Tl, u = pl, y = yl;
    if (b === null && (a.boundingBox || a.computeBoundingBox(), c.set(a.boundingBox.min, a.boundingBox.max, o), b = c), Gl(G, u)) {
      const W = i, V = W.index, r = W.attributes.position, I = a.index, g = a.attributes.position, L = Ml(s, y), Y = Dl(G, u);
      if (l.copy(o).invert(), a.boundsTree)
        return A(s, h, t), t.matrix.copy(l), t.needsUpdate = !0, a.boundsTree.shapecast({
          intersectsBounds: (S) => t.intersectsBox(S),
          intersectsTriangle: (S) => {
            S.a.applyMatrix4(o), S.b.applyMatrix4(o), S.c.applyMatrix4(o), S.needsUpdate = !0;
            for (let x = L * 3, H = (Y + L) * 3; x < H; x += 3) {
              E(e, x, V, r), e.needsUpdate = !0;
              let M = new _t().intersect([S.a, S.b, S.c], [e.a, e.b, e.c]);
              if (M instanceof R) {
                let J = M.length();
                X.push(new qt(!0, S, e, J));
              }
            }
            return !1;
          }
        });
      for (let C = L * 3, S = Y + L * 3; C < S; C += 3) {
        E(n, C, V, r), n.a.applyMatrix4(l), n.b.applyMatrix4(l), n.c.applyMatrix4(l), n.needsUpdate = !0;
        for (let x = 0, H = I.count; x < H; x += 3) {
          E(e, x, I, g), e.needsUpdate = !0;
          let M = new _t().intersect([n.a, n.b, n.c], [e.a, e.b, e.c]);
          if (M instanceof R) {
            let J = M.length();
            X.push(new qt(!0, n, e, J));
          }
        }
      }
    } else {
      const W = s + 8, V = y[s + 6];
      return A(W, h, D), !!(b.intersectsBox(D) && d(W, i, a, o, b, m, X) || (A(V, h, D), b.intersectsBox(D) && d(V, i, a, o, b, m, X)));
    }
  };
}();
function rc(n, e, l, c) {
  return A(n, e, D), l.intersectBox(D, c);
}
const st = [];
let Xc, Tl, pl, yl;
function Ql(n) {
  Xc && st.push(Xc), Xc = n, Tl = new Float32Array(n), pl = new Uint16Array(n), yl = new Uint32Array(n);
}
function _l() {
  Xc = null, Tl = null, pl = null, yl = null, st.length && Ql(st.pop());
}
const Fc = Symbol("skip tree generation"), Tc = /* @__PURE__ */ new U(), kc = /* @__PURE__ */ new U(), Ze = /* @__PURE__ */ new B(), ql = /* @__PURE__ */ new sl(), Se = /* @__PURE__ */ new sl(), Ke = /* @__PURE__ */ new R(), ec = /* @__PURE__ */ new R(), wi = /* @__PURE__ */ new R(), Pi = /* @__PURE__ */ new R(), Qi = /* @__PURE__ */ new R(), $t = /* @__PURE__ */ new U(), Vl = /* @__PURE__ */ new Ed(() => new dl());
class $ {
  static serialize(e, l = {}) {
    if (l.isBufferGeometry)
      return console.warn("MeshBVH.serialize: The arguments for the function have changed. See documentation for new signature."), $.serialize(
        arguments[0],
        {
          cloneBuffers: arguments[2] === void 0 ? !0 : arguments[2]
        }
      );
    l = {
      cloneBuffers: !0,
      ...l
    };
    const c = e.geometry, t = e._roots, d = c.getIndex();
    let s;
    return l.cloneBuffers ? s = {
      roots: t.map((i) => i.slice()),
      index: d.array.slice()
    } : s = {
      roots: t,
      index: d.array
    }, s;
  }
  static deserialize(e, l, c = {}) {
    if (typeof c == "boolean")
      return console.warn("MeshBVH.deserialize: The arguments for the function have changed. See documentation for new signature."), $.deserialize(
        arguments[0],
        arguments[1],
        {
          setIndex: arguments[2] === void 0 ? !0 : arguments[2]
        }
      );
    c = {
      setIndex: !0,
      ...c
    };
    const { index: t, roots: d } = e, s = new $(l, { ...c, [Fc]: !0 });
    if (s._roots = d, c.setIndex) {
      const i = l.getIndex();
      if (i === null) {
        const a = new tl(e.index, 1, !1);
        l.setIndex(a);
      } else
        i.array !== t && (i.array.set(t), i.needsUpdate = !0);
    }
    return s;
  }
  constructor(e, l = {}) {
    if (e.isBufferGeometry) {
      if (e.index && e.index.isInterleavedBufferAttribute)
        throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.");
    } else
      throw new Error("MeshBVH: Only BufferGeometries are supported.");
    if (l = Object.assign({
      strategy: Qd,
      maxDepth: 40,
      maxLeafTris: 10,
      verbose: !0,
      useSharedArrayBuffer: !1,
      setBoundingBox: !0,
      onProgress: null,
      [Fc]: !1
    }, l), l.useSharedArrayBuffer && typeof SharedArrayBuffer > "u")
      throw new Error("MeshBVH: SharedArrayBuffer is not available.");
    this._roots = null, l[Fc] || (this._roots = Li(e, l), !e.boundingBox && l.setBoundingBox && (e.boundingBox = this.getBoundingBox(new U()))), this.geometry = e;
  }
  refit(e = null) {
    e && Array.isArray(e) && (e = new Set(e));
    const l = this.geometry, c = l.index.array, t = l.attributes.position, d = t.array, s = t.offset || 0;
    let i = 3;
    t.isInterleavedBufferAttribute && (i = t.data.stride);
    let a, o, b, m, X = 0;
    const G = this._roots;
    for (let u = 0, y = G.length; u < y; u++)
      a = G[u], o = new Uint32Array(a), b = new Uint16Array(a), m = new Float32Array(a), h(0, X), X += a.byteLength;
    function h(u, y, p = !1) {
      const W = u * 2;
      if (b[W + 15] === ct) {
        const r = o[u + 6], I = b[W + 14];
        let g = 1 / 0, L = 1 / 0, Y = 1 / 0, C = -1 / 0, S = -1 / 0, x = -1 / 0;
        for (let H = 3 * r, K = 3 * (r + I); H < K; H++) {
          const M = c[H] * i + s, J = d[M + 0], P = d[M + 1], O = d[M + 2];
          J < g && (g = J), J > C && (C = J), P < L && (L = P), P > S && (S = P), O < Y && (Y = O), O > x && (x = O);
        }
        return m[u + 0] !== g || m[u + 1] !== L || m[u + 2] !== Y || m[u + 3] !== C || m[u + 4] !== S || m[u + 5] !== x ? (m[u + 0] = g, m[u + 1] = L, m[u + 2] = Y, m[u + 3] = C, m[u + 4] = S, m[u + 5] = x, !0) : !1;
      } else {
        const r = u + 8, I = o[u + 6], g = r + y, L = I + y;
        let Y = p, C = !1, S = !1;
        e ? Y || (C = e.has(g), S = e.has(L), Y = !C && !S) : (C = !0, S = !0);
        const x = Y || C, H = Y || S;
        let K = !1;
        x && (K = h(r, y, Y));
        let M = !1;
        H && (M = h(I, y, Y));
        const J = K || M;
        if (J)
          for (let P = 0; P < 3; P++) {
            const O = r + P, Qe = I + P, ie = m[O], rt = m[O + 3], Lt = m[Qe], Rt = m[Qe + 3];
            m[u + P] = ie < Lt ? ie : Lt, m[u + P + 3] = rt > Rt ? rt : Rt;
          }
        return J;
      }
    }
  }
  traverse(e, l = 0) {
    const c = this._roots[l], t = new Uint32Array(c), d = new Uint16Array(c);
    s(0);
    function s(i, a = 0) {
      const o = i * 2, b = d[o + 15] === ct;
      if (b) {
        const m = t[i + 6], X = d[o + 14];
        e(a, b, new Float32Array(c, i * 4, 6), m, X);
      } else {
        const m = i + Zc / 4, X = t[i + 6], G = t[i + 7];
        e(a, b, new Float32Array(c, i * 4, 6), G) || (s(m, a + 1), s(X, a + 1));
      }
    }
  }
  raycast(e, l = Ve) {
    const c = this._roots, t = this.geometry, d = [], s = l.isMaterial, i = Array.isArray(l), a = t.groups, o = s ? l.side : l;
    for (let b = 0, m = c.length; b < m; b++) {
      const X = i ? l[a[b].materialIndex].side : o, G = d.length;
      if (Ql(c[b]), tt(0, t, X, e, d), _l(), i) {
        const h = a[b].materialIndex;
        for (let u = G, y = d.length; u < y; u++)
          d[u].face.materialIndex = h;
      }
    }
    return d;
  }
  raycastFirst(e, l = Ve) {
    const c = this._roots, t = this.geometry, d = l.isMaterial, s = Array.isArray(l);
    let i = null;
    const a = t.groups, o = d ? l.side : l;
    for (let b = 0, m = c.length; b < m; b++) {
      const X = s ? l[a[b].materialIndex].side : o;
      Ql(c[b]);
      const G = dt(0, t, X, e);
      _l(), G != null && (i == null || G.distance < i.distance) && (i = G, s && (G.face.materialIndex = a[b].materialIndex));
    }
    return i;
  }
  intersectsGeometryTest(e, l) {
    const c = this.geometry;
    let t = !1, d = {
      boxs1: [],
      boxs2: []
    };
    for (const s of this._roots)
      if (Ql(s), t = vi(0, c, e, l, null, d), _l(), t)
        break;
    return console.log("Inf", d), d;
  }
  intersectsGeometry(e, l) {
    const c = this.geometry;
    let t = !1;
    for (const d of this._roots)
      if (Ql(d), t = fi(0, c, e, l), _l(), t)
        break;
    return t;
  }
  intersectsGeometryWithGapResults(e, l, c, t) {
    const d = this.geometry;
    let s = !1;
    for (const i of this._roots)
      if (Ql(i), s = Ui(0, d, e, l, null, c, t), _l(), s)
        break;
    return s;
  }
  intersectsGeometryWithGap(e, l, c) {
    const t = this.geometry;
    let d = !1;
    for (const s of this._roots)
      if (Ql(s), d = Bi(0, t, e, l, null, c), _l(), d)
        break;
    return d;
  }
  shapecast(e, l, c) {
    const t = this.geometry;
    if (e instanceof Function) {
      if (l) {
        const X = l;
        l = (G, h, u, y) => {
          const p = h * 3;
          return X(G, p, p + 1, p + 2, u, y);
        };
      }
      e = {
        boundsTraverseOrder: c,
        intersectsBounds: e,
        intersectsTriangle: l,
        intersectsRange: null
      }, console.warn("MeshBVH: Shapecast function signature has changed and now takes an object of callbacks as a second argument. See docs for new signature.");
    }
    const d = Vl.getPrimitive();
    let {
      boundsTraverseOrder: s,
      intersectsBounds: i,
      intersectsRange: a,
      intersectsTriangle: o
    } = e;
    if (a && o) {
      const X = a;
      a = (G, h, u, y, p) => X(G, h, u, y, p) ? !0 : Tt(G, h, t, o, u, y, d);
    } else
      a || (o ? a = (X, G, h, u) => Tt(X, G, t, o, h, u, d) : a = (X, G, h) => h);
    let b = !1, m = 0;
    for (const X of this._roots) {
      if (Ql(X), b = ki(0, t, i, a, s, m), _l(), b)
        break;
      m += X.byteLength;
    }
    return Vl.releasePrimitive(d), b;
  }
  bvhcast(e, l, c) {
    let {
      intersectsRanges: t,
      intersectsTriangles: d
    } = c;
    const s = this.geometry.index, i = this.geometry.attributes.position, a = e.geometry.index, o = e.geometry.attributes.position;
    Ze.copy(l).invert();
    const b = Vl.getPrimitive(), m = Vl.getPrimitive();
    if (d) {
      let G = function(h, u, y, p, W, V, r, I) {
        for (let g = y, L = y + p; g < L; g++) {
          E(m, g * 3, a, o), m.a.applyMatrix4(l), m.b.applyMatrix4(l), m.c.applyMatrix4(l), m.needsUpdate = !0;
          for (let Y = h, C = h + u; Y < C; Y++)
            if (E(b, Y * 3, s, i), b.needsUpdate = !0, d(b, m, Y, g, W, V, r, I))
              return !0;
        }
        return !1;
      };
      if (t) {
        const h = t;
        t = function(u, y, p, W, V, r, I, g) {
          return h(u, y, p, W, V, r, I, g) ? !0 : G(u, y, p, W, V, r, I, g);
        };
      } else
        t = G;
    }
    this.getBoundingBox(kc), kc.applyMatrix4(l);
    const X = this.shapecast({
      intersectsBounds: (G) => kc.intersectsBox(G),
      intersectsRange: (G, h, u, y, p, W) => (Tc.copy(W), Tc.applyMatrix4(Ze), e.shapecast({
        intersectsBounds: (V) => Tc.intersectsBox(V),
        intersectsRange: (V, r, I, g, L) => t(G, h, V, r, y, p, g, L)
      }))
    });
    return Vl.releasePrimitive(b), Vl.releasePrimitive(m), X;
  }
  intersectsBox(e, l) {
    return ql.set(e.min, e.max, l), ql.needsUpdate = !0, this.shapecast(
      {
        intersectsBounds: (c) => ql.intersectsBox(c),
        intersectsTriangle: (c) => ql.intersectsTriangle(c)
      }
    );
  }
  intersectsSphere(e) {
    return this.shapecast(
      {
        intersectsBounds: (l) => e.intersectsBox(l),
        intersectsTriangle: (l) => l.intersectsSphere(e)
      }
    );
  }
  closestPointToGeometry(e, l, c = {}, t = {}, d = 0, s = 1 / 0) {
    e.boundingBox || e.computeBoundingBox(), ql.set(e.boundingBox.min, e.boundingBox.max, l), ql.needsUpdate = !0;
    const i = this.geometry, a = i.attributes.position, o = i.index, b = e.attributes.position, m = e.index, X = Vl.getPrimitive(), G = Vl.getPrimitive();
    let h = ec, u = wi, y = null, p = null;
    t && (y = Pi, p = Qi);
    let W = 1 / 0, V = null, r = null;
    return Ze.copy(l).invert(), Se.matrix.copy(Ze), this.shapecast(
      {
        boundsTraverseOrder: (I) => ql.distanceToBox(I),
        intersectsBounds: (I, g, L) => L < W && L < s ? (g && (Se.min.copy(I.min), Se.max.copy(I.max), Se.needsUpdate = !0), !0) : !1,
        intersectsRange: (I, g) => {
          if (e.boundsTree)
            return e.boundsTree.shapecast({
              boundsTraverseOrder: (L) => Se.distanceToBox(L),
              intersectsBounds: (L, Y, C) => C < W && C < s,
              intersectsRange: (L, Y) => {
                for (let C = L * 3, S = (L + Y) * 3; C < S; C += 3) {
                  E(G, C, m, b), G.a.applyMatrix4(l), G.b.applyMatrix4(l), G.c.applyMatrix4(l), G.needsUpdate = !0;
                  for (let x = I * 3, H = (I + g) * 3; x < H; x += 3) {
                    E(X, x, o, a), X.needsUpdate = !0;
                    const K = X.distanceToTriangle(G, h, y);
                    if (K < W && (u.copy(h), p && p.copy(y), W = K, V = x / 3, r = C / 3), K < d)
                      return !0;
                  }
                }
              }
            });
          {
            const L = m ? m.count : b.count;
            for (let Y = 0, C = L; Y < C; Y += 3) {
              E(G, Y, m, b), G.a.applyMatrix4(l), G.b.applyMatrix4(l), G.c.applyMatrix4(l), G.needsUpdate = !0;
              for (let S = I * 3, x = (I + g) * 3; S < x; S += 3) {
                E(X, S, o, a), X.needsUpdate = !0;
                const H = X.distanceToTriangle(G, h, y);
                if (H < W && (u.copy(h), p && p.copy(y), W = H, V = S / 3, r = Y / 3), H < d)
                  return !0;
              }
            }
          }
        }
      }
    ), Vl.releasePrimitive(X), Vl.releasePrimitive(G), W === 1 / 0 ? null : (c.point ? c.point.copy(u) : c.point = u.clone(), c.distance = W, c.faceIndex = V, t && (t.point ? t.point.copy(p) : t.point = p.clone(), t.point.applyMatrix4(Ze), u.applyMatrix4(Ze), t.distance = u.sub(t.point).length(), t.faceIndex = r), c);
  }
  closestPointToPoint(e, l = {}, c = 0, t = 1 / 0) {
    const d = c * c, s = t * t;
    let i = 1 / 0, a = null;
    if (this.shapecast(
      {
        boundsTraverseOrder: (b) => (Ke.copy(e).clamp(b.min, b.max), Ke.distanceToSquared(e)),
        intersectsBounds: (b, m, X) => X < i && X < s,
        intersectsTriangle: (b, m) => {
          b.closestPointToPoint(e, Ke);
          const X = e.distanceToSquared(Ke);
          return X < i && (ec.copy(Ke), i = X, a = m), X < d;
        }
      }
    ), i === 1 / 0)
      return null;
    const o = Math.sqrt(i);
    return l.point ? l.point.copy(ec) : l.point = ec.clone(), l.distance = o, l.faceIndex = a, l;
  }
  getBoundingBox(e) {
    return e.makeEmpty(), this._roots.forEach((c) => {
      A(0, new Float32Array(c), $t), e.union($t);
    }), e;
  }
}
const ld = $.prototype.raycast;
$.prototype.raycast = function(...n) {
  if (n[0].isMesh) {
    console.warn('MeshBVH: The function signature and results frame for "raycast" has changed. See docs for new signature.');
    const [
      e,
      l,
      c,
      t
    ] = n;
    return ld.call(this, c, e.material).forEach((s) => {
      s = pc(s, e, l), s && t.push(s);
    }), t;
  } else
    return ld.apply(this, n);
};
const ed = $.prototype.raycastFirst;
$.prototype.raycastFirst = function(...n) {
  if (n[0].isMesh) {
    console.warn('MeshBVH: The function signature and results frame for "raycastFirst" has changed. See docs for new signature.');
    const [
      e,
      l,
      c
    ] = n;
    return pc(ed.call(this, c, e.material), e, l);
  } else
    return ed.apply(this, n);
};
const cd = $.prototype.closestPointToPoint;
$.prototype.closestPointToPoint = function(...n) {
  if (n[0].isMesh) {
    console.warn('MeshBVH: The function signature and results frame for "closestPointToPoint" has changed. See docs for new signature.'), n.unshift();
    const e = n[1], l = {};
    return n[1] = l, cd.apply(this, n), e && e.copy(l.point), l.distance;
  } else
    return cd.apply(this, n);
};
const td = $.prototype.closestPointToGeometry;
$.prototype.closestPointToGeometry = function(...n) {
  const e = n[2], l = n[3];
  if (e && e.isVector3 || l && l.isVector3) {
    console.warn('MeshBVH: The function signature and results frame for "closestPointToGeometry" has changed. See docs for new signature.');
    const c = {}, t = {}, d = n[1];
    return n[2] = c, n[3] = t, td.apply(this, n), e && e.copy(c.point), l && l.copy(t.point).applyMatrix4(d), c.distance;
  } else
    return td.apply(this, n);
};
const dd = $.prototype.refit;
$.prototype.refit = function(...n) {
  const e = n[0], l = n[1];
  if (l && (l instanceof Set || Array.isArray(l))) {
    console.warn('MeshBVH: The function signature for "refit" has changed. See docs for new signature.');
    const c = /* @__PURE__ */ new Set();
    l.forEach((t) => c.add(t)), e && e.forEach((t) => c.add(t)), dd.call(this, c);
  } else
    dd.apply(this, n);
};
[
  "intersectsGeometry",
  "intersectsGeometryTest",
  "intersectsGeometryWithGap",
  "shapecast",
  "intersectsBox",
  "intersectsSphere"
].forEach((n) => {
  const e = $.prototype[n];
  $.prototype[n] = function(...l) {
    return (l[0] === null || l[0].isMesh) && (l.shift(), console.warn(`MeshBVH: The function signature for "${n}" has changed and no longer takes Mesh. See docs for new signature.`)), e.apply(this, l);
  };
});
const vc = /* @__PURE__ */ new Zs(), sd = /* @__PURE__ */ new B(), ji = w.prototype.raycast;
function Ei(n, e) {
  if (this.geometry.boundsTree) {
    if (this.material === void 0)
      return;
    sd.copy(this.matrixWorld).invert(), vc.copy(n.ray).applyMatrix4(sd);
    const l = this.geometry.boundsTree;
    if (n.firstHitOnly === !0) {
      const c = pc(l.raycastFirst(vc, this.material), this, n);
      c && e.push(c);
    } else {
      const c = l.raycast(vc, this.material);
      for (let t = 0, d = c.length; t < d; t++) {
        const s = pc(c[t], this, n);
        s && e.push(s);
      }
    }
  } else
    ji.call(this, n, e);
}
function Ai(n) {
  return this.boundsTree = new $(this, n), this.boundsTree;
}
function Di() {
  this.boundsTree = null;
}
class Ol {
  constructor(e) {
    Z(this, "viewerName");
    Z(this, "state", {});
    Z(this, "type", "ext");
    Z(this, "getName", () => this.constructor.getName());
    Z(this, "sharedToolbarName");
    Z(this, "dedicatedToolbarNames", []);
    Z(this, "ui", "");
    this.viewerName = e;
  }
  static getSharedToolbarName() {
    return `t-${this.getName()}-shared-toolbar`;
  }
  static getDedicatedToolbarName() {
    return `t-${this.getName()}-dedicated-toolbar`;
  }
  getRenderManager() {
    return as.getRenderManager(this.viewerName);
  }
  saveState() {
    window && window.localStorage.setItem("tangl-ext-" + this.getName(), JSON.stringify(this.state));
  }
  restoreState() {
    if (window) {
      const e = window.localStorage.getItem("tangl-ext-" + this.getName());
      if (e) {
        const l = JSON.parse(e);
        l && (this.state = l);
      }
    }
  }
}
Z(Ol, "getName", () => "");
class Wt extends Ol {
  constructor(l, c, t) {
    var d;
    super(l);
    Z(this, "type", "control");
    Z(this, "controllerDesc");
    Z(this, "controllerIcon");
    Z(this, "isEnabled", !0);
    Z(this, "target", new R());
    Z(this, "domElement");
    Z(this, "camera");
    Z(this, "renderMan");
    this.controllerDesc = c, this.controllerIcon = t, this.renderMan = as.getRenderManager(this.viewerName), this.camera = this.renderMan.camera, this.domElement = (d = this.renderMan) == null ? void 0 : d.viewerElement;
  }
}
class Ad extends Ol {
  constructor(l, c, t) {
    super(l);
    Z(this, "type", "mode");
    Z(this, "modeDesc");
    Z(this, "modeIcon");
    Z(this, "colorArray", []);
    Z(this, "stateArray", []);
    Z(this, "resArray", []);
    Z(this, "els", []);
    Z(this, "res", new Array());
    Z(this, "details");
    this.modeIcon = t, this.modeDesc = c;
  }
  setData(l, c, t) {
    this.els = l, this.res = c, this.details = t, this.setup();
  }
}
class Oi {
  constructor() {
    Z(this, "extensions", /* @__PURE__ */ new Map());
    Z(this, "selectedModeExtName", "");
    Z(this, "selectedControllerExtName", "");
    Z(this, "viewerName", "default");
  }
  addExtension(e, l = void 0) {
    const c = new e(this.viewerName, l);
    return this.extensions.set(c.getName(), c), c.added(), c;
  }
  clear() {
    this.extensions.forEach((e) => {
      e.deleted();
    }), this.extensions.clear(), this.selectedControllerExtName = "", this.selectedModeExtName = "";
  }
  getExtensionByName(e) {
    if (this.extensions.has(e))
      return this.extensions.get(e);
  }
  getExtensions() {
    return Array.from(this.extensions.values());
  }
  selectedModeExtension() {
    return this.getExtensionByName(this.selectedModeExtName);
  }
  selectModeExtension(e) {
    var t;
    if (this.selectedModeExtName == e) {
      this.selectedModeExtName = "", this.selectedModeExtName = e;
      return;
    }
    const l = this.getExtensionByName(e), c = this.selectedModeExtension();
    l instanceof Ad ? (c && c.unselected(), this.selectedModeExtName = e, (t = this.selectedModeExtension()) == null || t.selected()) : console.log("This extension in not ModeExtension");
  }
  getModeExtensions() {
    return Array.from(this.extensions.values()).filter((e) => e.type == "mode");
  }
  selectedControllerExtension() {
    return this.getExtensionByName(this.selectedControllerExtName);
  }
  getControllerExtensions() {
    return Array.from(this.extensions.values()).filter((e) => e.type == "control");
  }
  selectControllerExtension(e) {
    var t, d;
    if (this.selectedControllerExtName == e)
      return;
    const l = this.getExtensionByName(e), c = this.selectedControllerExtension();
    if (l instanceof Wt) {
      if (c) {
        c.unselected();
        const s = this.selectedControllerExtension().getTargetClone();
        (t = this.selectedControllerExtension()) == null || t.target.copy(s);
      }
      this.selectedControllerExtName = e, (d = this.selectedControllerExtension()) == null || d.selected();
    } else
      console.log("This extension in not ControllerExtension");
  }
}
class Pe {
  constructor() {
    this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
  }
  setSize() {
  }
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
}
const _i = new mt(-1, 1, 1, -1, 0, 1), Vt = new de();
Vt.setAttribute("position", new se([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
Vt.setAttribute("uv", new se([0, 2, 0, 0, 2, 0], 2));
class Fe {
  constructor(e) {
    this._mesh = new w(Vt, e);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(e) {
    e.render(this._mesh, _i);
  }
  get material() {
    return this._mesh.material;
  }
  set material(e) {
    this._mesh.material = e;
  }
}
class fc extends Pe {
  constructor(e, l, c, t, d) {
    super(), this.scene = e, this.camera = l, this.overrideMaterial = c, this.clearColor = t, this.clearAlpha = d !== void 0 ? d : 0, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new v();
  }
  render(e, l, c) {
    const t = e.autoClear;
    e.autoClear = !1;
    let d, s;
    this.overrideMaterial !== void 0 && (s = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor && (e.getClearColor(this._oldClearColor), d = e.getClearAlpha(), e.setClearColor(this.clearColor, this.clearAlpha)), this.clearDepth && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : c), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor && e.setClearColor(this._oldClearColor, d), this.overrideMaterial !== void 0 && (this.scene.overrideMaterial = s), e.autoClear = t;
  }
}
const id = {
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1 }
  },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`
};
class it extends Pe {
  constructor(e, l) {
    super(), this.textureID = l !== void 0 ? l : "tDiffuse", e instanceof il ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = Zt.clone(e.uniforms), this.material = new il({
      defines: Object.assign({}, e.defines),
      uniforms: this.uniforms,
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader
    })), this.fsQuad = new Fe(this.material);
  }
  render(e, l, c) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = c.texture), this.fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(l), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e));
  }
}
class nd extends Pe {
  constructor(e, l) {
    super(), this.scene = e, this.camera = l, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
  }
  render(e, l, c) {
    const t = e.getContext(), d = e.state;
    d.buffers.color.setMask(!1), d.buffers.depth.setMask(!1), d.buffers.color.setLocked(!0), d.buffers.depth.setLocked(!0);
    let s, i;
    this.inverse ? (s = 0, i = 1) : (s = 1, i = 0), d.buffers.stencil.setTest(!0), d.buffers.stencil.setOp(t.REPLACE, t.REPLACE, t.REPLACE), d.buffers.stencil.setFunc(t.ALWAYS, s, 4294967295), d.buffers.stencil.setClear(i), d.buffers.stencil.setLocked(!0), e.setRenderTarget(c), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(l), this.clear && e.clear(), e.render(this.scene, this.camera), d.buffers.color.setLocked(!1), d.buffers.depth.setLocked(!1), d.buffers.stencil.setLocked(!1), d.buffers.stencil.setFunc(t.EQUAL, 1, 4294967295), d.buffers.stencil.setOp(t.KEEP, t.KEEP, t.KEEP), d.buffers.stencil.setLocked(!0);
  }
}
class qi extends Pe {
  constructor() {
    super(), this.needsSwap = !1;
  }
  render(e) {
    e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
  }
}
class Bc {
  constructor(e, l) {
    if (this.renderer = e, l === void 0) {
      const c = e.getSize(new T());
      this._pixelRatio = e.getPixelRatio(), this._width = c.width, this._height = c.height, l = new ye(this._width * this._pixelRatio, this._height * this._pixelRatio), l.texture.name = "EffectComposer.rt1";
    } else
      this._pixelRatio = 1, this._width = l.width, this._height = l.height;
    this.renderTarget1 = l, this.renderTarget2 = l.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], id === void 0 && console.error("THREE.EffectComposer relies on CopyShader"), it === void 0 && console.error("THREE.EffectComposer relies on ShaderPass"), this.copyPass = new it(id), this.clock = new Xt();
  }
  swapBuffers() {
    const e = this.readBuffer;
    this.readBuffer = this.writeBuffer, this.writeBuffer = e;
  }
  addPass(e) {
    this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  insertPass(e, l) {
    this.passes.splice(l, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  removePass(e) {
    const l = this.passes.indexOf(e);
    l !== -1 && this.passes.splice(l, 1);
  }
  isLastEnabledPass(e) {
    for (let l = e + 1; l < this.passes.length; l++)
      if (this.passes[l].enabled)
        return !1;
    return !0;
  }
  render(e) {
    e === void 0 && (e = this.clock.getDelta());
    const l = this.renderer.getRenderTarget();
    let c = !1;
    for (let t = 0, d = this.passes.length; t < d; t++) {
      const s = this.passes[t];
      if (s.enabled !== !1) {
        if (s.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t), s.render(this.renderer, this.writeBuffer, this.readBuffer, e, c), s.needsSwap) {
          if (c) {
            const i = this.renderer.getContext(), a = this.renderer.state.buffers.stencil;
            a.setFunc(i.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), a.setFunc(i.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        nd !== void 0 && (s instanceof nd ? c = !0 : s instanceof qi && (c = !1));
      }
    }
    this.renderer.setRenderTarget(l);
  }
  reset(e) {
    if (e === void 0) {
      const l = this.renderer.getSize(new T());
      this._pixelRatio = this.renderer.getPixelRatio(), this._width = l.width, this._height = l.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
  }
  setSize(e, l) {
    this._width = e, this._height = l;
    const c = this._width * this._pixelRatio, t = this._height * this._pixelRatio;
    this.renderTarget1.setSize(c, t), this.renderTarget2.setSize(c, t);
    for (let d = 0; d < this.passes.length; d++)
      this.passes[d].setSize(c, t);
  }
  setPixelRatio(e) {
    this._pixelRatio = e, this.setSize(this._width, this._height);
  }
}
new mt(-1, 1, 1, -1, 0, 1);
const Dd = new de();
Dd.setAttribute("position", new se([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
Dd.setAttribute("uv", new se([0, 2, 0, 0, 2, 0], 2));
class $i extends il {
  constructor(...e) {
    super(...e), [
      "opacity",
      "map",
      "emissiveMap",
      "roughnessMap",
      "metalnessMap"
    ].forEach((l) => {
      Object.defineProperty(this, l, {
        get() {
          if (l in this.uniforms)
            return this.uniforms[l].value;
        },
        set(c) {
          l in this.uniforms && (this.uniforms[l].value = c);
        }
      });
    });
  }
}
class ln extends $i {
  constructor(...e) {
    super(...e), this.modifiedDefines = {}, this.modifiedUniforms = {};
  }
  setDefine(e, l) {
    const c = this.defines, t = this.modifiedDefines;
    l == null ? e in c && (e in t || (t[e] = c[e]), delete c[e]) : c[e] !== l && (e in t || (e in c ? t[e] = c[e] : t[e] = void 0), c[e] = l);
  }
  setTextureUniform(e, l) {
    const c = this.uniforms, t = this.modifiedUniforms;
    e in t || (t[e] = c[e].value), c[e].value = l;
  }
  finalize() {
    const e = this.modifiedDefines, l = this.defines;
    for (const d in e)
      e[d] === void 0 ? d in l && (this.needsUpdate = !0) : l[d] !== e[d] && (this.needsUpdate = !0), delete e[d];
    const c = this.modifiedUniforms, t = this.uniforms;
    for (const d in c)
      c[d] !== t[d].value && (this.needsUpdate = !0), delete c[d];
  }
}
const ad = /* @__PURE__ */ new WeakMap();
class Od {
  constructor(e) {
    this._replacementMaterial = new ln(e), this._replacementMaterials = /* @__PURE__ */ new WeakMap(), this.overrideUniforms = {}, this.overrideDefines = {};
  }
  replace(e, l = !1, c = !0) {
    const t = this;
    function d(a) {
      if (!a.isMesh && !a.isSkinnedMesh)
        return;
      if (!s.has(a)) {
        const m = t.createMaterial(a);
        s.set(a, m);
      }
      const o = s.get(a);
      if (o === null)
        return;
      let b = a.material;
      c ? i.set(a, b) : b = i.get(a), b || console.error("ShaderReplacement : Material for object was not cached before replacing shader.", a), t.updateUniforms(a, b, o), o.finalize && o.finalize(), a.material = o;
    }
    const s = this._replacementMaterials, i = ad;
    if (Array.isArray(e))
      if (l)
        for (let a = 0, o = e.length; a < o; a++)
          e[a].traverse(d);
      else
        for (let a = 0, o = e.length; a < o; a++)
          d(e[a]);
    else
      l ? e.traverse(d) : d(e);
  }
  reset(e, l) {
    function c(d) {
      t.has(d) ? (d.material = t.get(d), t.delete(d)) : (d.isSkinnedMesh || d.isMesh) && console.error("ShaderReplacement : Material for object was not cached before resetting.", d);
    }
    const t = ad;
    if (Array.isArray(e))
      if (l)
        for (let d = 0, s = e.length; d < s; d++)
          c(e[d]);
      else
        for (let d = 0, s = e.length; d < s; d++)
          e[d].traverse(c);
    else
      l ? e.traverse(c) : c(e);
  }
  createMaterial(e) {
    return this._replacementMaterial.clone();
  }
  updateUniforms(e, l, c) {
    const d = this._replacementMaterial.defines, s = l.defines, i = c.defines;
    if (c.side = xc, c.flatShading = l.flatShading, c.skinning = l.skinning, c.clippingPlanes = l.clippingPlanes, c.clipping = l.clipping, s) {
      for (const m in s)
        c.setDefine(m, s[m]);
      for (const m in i)
        m in s ? c.setDefine(m, s[m]) : c.setDefine(m, d[m]);
    }
    const a = c.uniforms;
    if (l.isShaderMaterial) {
      const m = l.uniforms;
      for (const X in a) {
        const G = m[X], h = a[X];
        G && G.value !== h.value && (h.value && h.value.isTexture || G.value && G.value.isTexture ? c.setTextureUniform(X, G.value) : h.value = G.value);
      }
    } else
      for (const m in a) {
        const X = a[m];
        m in l && l[m] !== X.value && (X.value && X.value.isTexture || l[m] && l[m].isTexture ? c.setTextureUniform(m, l[m]) : X.value = l[m]);
      }
    const { overrideDefines: o, overrideUniforms: b } = this;
    for (const m in o)
      o[m] === null || o[m] === void 0 ? delete i[m] : i[m] !== o[m] && (i[m] = o[m], c.needsUpdate = !0);
    for (const m in b)
      m in a && (a[m].value = b[m].value);
  }
  dispose() {
  }
}
class en extends Od {
  constructor() {
    super({
      extensions: {
        derivatives: !0
      },
      defines: {
        USE_UV: ""
      },
      uniforms: {
        ...ce.normal.uniforms,
        alphaMap: { value: null },
        alphaTest: { value: 0 },
        map: { value: null },
        opacity: { value: 1 }
      },
      vertexShader: ce.normal.vertexShader,
      fragmentShader: `

				#define NORMAL
				uniform float opacity;
				#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
					varying vec3 vViewPosition;
				#endif
				#ifndef FLAT_SHADED
					varying vec3 vNormal;
					#ifdef USE_TANGENT
						varying vec3 vTangent;
						varying vec3 vBitangent;
					#endif
				#endif
				#include <packing>
				#include <uv_pars_fragment>
				#include <map_pars_fragment>
				#include <bumpmap_pars_fragment>
				#include <normalmap_pars_fragment>
				#include <alphamap_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>
				void main() {
					vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
					#include <clipping_planes_fragment>
					#include <logdepthbuf_fragment>
					#include <map_fragment>
					#include <alphamap_fragment>
					#include <alphatest_fragment>
					#include <normal_fragment_begin>
					#include <normal_fragment_maps>
					gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
				}
			`
    }), this.useNormalMaps = !1;
  }
  createMaterial(...e) {
    return super.createMaterial(...e);
  }
  updateUniforms(e, l, c) {
    super.updateUniforms(e, l, c), c.setDefine("USE_NORMALMAP", this.useNormalMaps && c.uniforms.normalMap.value ? "" : void 0), c.setDefine("TANGENTSPACE_NORMALMAP", this.useNormalMaps && c.uniforms.normalMap.value ? "" : void 0), c.setDefine("ALPHATEST", c.uniforms.alphaTest.value ? c.uniforms.alphaTest.value : void 0), c.setDefine("USE_ALPHAMAP", c.defines.ALPHATEST === 0 || !c.uniforms.alphaMap.value ? void 0 : ""), c.setDefine("USE_MAP", c.defines.ALPHATEST === 0 || !c.uniforms.map.value ? void 0 : ""), c.setDefine("USE_UV", "USE_ALPHAMAP" in c.defines || "USE_MAP" in c.defines ? "" : void 0);
  }
}
class cn extends Od {
  constructor() {
    super({
      extensions: {
        derivatives: !0
      },
      defines: {
        USE_UV: ""
      },
      clipping: !0,
      uniforms: {
        ...ce.normal.uniforms,
        alphaMap: { value: null },
        alphaTest: { value: 0 },
        map: { value: null },
        opacity: { value: 1 }
      },
      vertexShader: `
				attribute float state_1;
				varying float state;

				varying vec3 vViewPosition;
				#include <common>
				#include <uv_pars_vertex>
				#include <displacementmap_pars_vertex>
				#include <morphtarget_pars_vertex>
				#include <skinning_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>
				void main() {
					#include <uv_vertex>
					#include <beginnormal_vertex>
					#include <morphnormal_vertex>
					#include <skinbase_vertex>
					#include <skinnormal_vertex>
					#include <defaultnormal_vertex>
					#include <begin_vertex>
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <displacementmap_vertex>
					#include <project_vertex>
					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					
					state = state_1;

					vViewPosition = mvPosition.xyz;
				}
			`,
      fragmentShader: `
				varying float state;

				uniform float opacity;
				varying vec3 vViewPosition;
				#include <uv_pars_fragment>
				#include <map_pars_fragment>
				#include <bumpmap_pars_fragment>
				#include <normalmap_pars_fragment>
				#include <alphamap_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>
				void main() {
				
				    if(state<-0.9 && state>-1.1) discard;

					vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
					#include <clipping_planes_fragment>
					#include <logdepthbuf_fragment>
					#include <map_fragment>
					#include <alphamap_fragment>
					#include <alphatest_fragment>
					gl_FragColor = vec4( vViewPosition.z );
				}
			`
    }), this.invertSide = !1;
  }
  updateUniforms(e, l, c) {
    super.updateUniforms(e, l, c);
    let t;
    this.invertSide && (c.side = c.side === Ve ? bt : Ve), t = c.defines.ALPHATEST, c.uniforms.alphaTest.value === 0 ? delete c.defines.ALPHATEST : c.defines.ALPHATEST = c.uniforms.alphaTest.value, t !== c.defines.ALPHATEST && (c.needsUpdate = !0), t = c.defines.USE_ALPHAMAP, c.defines.ALPHATEST === 0 || !c.uniforms.alphaMap.value ? delete c.defines.USE_ALPHAMAP : c.defines.USE_ALPHAMAP = "", t !== c.defines.USE_ALPHAMAP && (c.needsUpdate = !0), t = c.defines.USE_MAP, c.defines.ALPHATEST === 0 || !c.uniforms.map.value ? delete c.defines.USE_MAP : c.defines.USE_MAP = "", t !== c.defines.USE_MAP && (c.needsUpdate = !0), t = c.defines.USE_UV, "USE_ALPHAMAP" in c.defines || "USE_MAP" in c.defines ? c.defines.USE_UV = "" : delete c.defines.USE_UV, t !== c.defines.USE_UV && (c.needsUpdate = !0);
  }
}
const tn = {
  uniforms: {
    texture: { value: null }
  },
  vertexShader: `
		varying vec3 vViewPosition;
		varying vec2 vUv;
		void main() {

			#include <begin_vertex>
			#include <project_vertex>
			vViewPosition = mvPosition.xyz;
			vUv = uv;

		}
	`,
  fragmentShader: `
		varying vec2 vUv;
		uniform sampler2D texture;
		void main() {

			vec4 texVal = texture2D( texture, vUv );
			float depthVal = - texVal.r;
			depthVal = mod( depthVal, 1.0 );
			gl_FragColor = vec4( depthVal );

		}
	`
}, dn = {
  uniforms: {
    tex: { value: null },
    displayRoughness: { value: 0 }
  },
  vertexShader: `
		varying vec3 vViewPosition;
		varying vec2 vUv;
		void main() {

			#include <begin_vertex>
			#include <project_vertex>
			vViewPosition = mvPosition.xyz;
			vUv = uv;

		}
	`,
  fragmentShader: `
		varying vec2 vUv;
		uniform sampler2D tex;
		uniform float displayRoughness;
		void main() {

			vec4 texVal = texture2D( tex, vUv );
			float roughness = texVal.a;
			vec3 packedNormal = texVal.xyz;
			vec3 unpackedNormal = ( packedNormal - 0.5 ) * 2.0;
			gl_FragColor = mix(
				vec4( unpackedNormal, 1.0 ),
				vec4( roughness, roughness, roughness, 1.0 ),
				displayRoughness
			);

		}
	`
}, sn = {
  defines: {
    NUM_DIRECTIONS: 32,
    NUM_STEPS: 16,
    RADIUS: "2.0",
    ENABLE_FALLOFF: 1,
    FALLOFF_START2: "0.16",
    FALLOFF_END2: "4.0",
    ENABLE_ROTATION_JITTER: 1,
    ENABLE_RADIUS_JITTER: 1,
    ENABLE_COLOR_BOUNCE: 1,
    JITTER_TYPE: 0
  },
  uniforms: {
    colorBuffer: { value: null },
    normalBuffer: { value: null },
    depthBuffer: { value: null },
    renderSize: { value: new T() },
    blueNoiseTex: { value: null },
    blueNoiseSize: { value: 1 },
    clipInfo: { value: new re() },
    projInfo: { value: new re() },
    params: { value: new T() },
    lightBounceIntensity: { value: 1 }
  },
  vertexShader: `
		varying vec2 vUv;
		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}
	`,
  fragmentShader: `
		#define TWO_PI			6.2831853071795864
		#define HALF_PI			1.5707963267948966
		#define ONE_OVER_PI		0.3183098861837906

		#include <common>
		#include <packing>
		varying vec2 vUv;

		uniform sampler2D noiseTexture;
		uniform sampler2D normalBuffer;
		uniform sampler2D depthBuffer;
		uniform sampler2D colorBuffer;
		uniform vec2 renderSize;

		uniform vec4 projInfo;
		uniform vec4 clipInfo;
		uniform vec4 params;
		uniform float lightBounceIntensity;

		#if ENABLE_ROTATION_JITTER == 2 || ENABLE_RADIUS_JITTER == 2
		uniform float blueNoiseSize;
		uniform sampler2D blueNoiseTex;
		#endif

		// float round( float f ) {

		// 	return f < 0.5 ? floor( f ) : ceil( f );

		// }

		// vec2 round( vec2 v ) {

		// 	v.x = round( v.x );
		// 	v.y = round( v.y );
		// 	return v;

		// }

		vec3 UnpackNormal( vec4 d ) {

			return d.xyz * 2.0 - 1.0;

		}

		vec4 GetViewPosition( vec2 uv ) {

			float near = clipInfo.x;
			float far = clipInfo.y;

			vec2 basesize = renderSize;
			vec2 coord = ( uv / basesize );

			// d is expected to be [ 0.0, 1.0 ]
			float d = texture2D( depthBuffer, coord ).r;
			d = d == 0.0 ? far : d;
			d = ( abs( d ) - near ) / ( far - near );

			vec4 ret = vec4( 0.0 );
			ret.w = d;
			ret.z = near + d * ( far - near );
			ret.xy = ( uv * projInfo.xy + projInfo.zw ) * ret.z;

			return ret;

		}

		float Falloff( float dist2 ) {

			return 2.0 * clamp(
				( dist2 - FALLOFF_START2 ) / ( FALLOFF_END2 - FALLOFF_START2 ),
				0.0,
				1.0
			);

		}

		void main() {

			vec2 screenCoord = gl_FragCoord.xy;
			vec4 vpos = GetViewPosition( renderSize * vUv );

			// if it's the background
			if ( vpos.w == 1.0 ) {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0);
				return;

			}

			vec4 s;
			vec3 vnorm	= UnpackNormal( texture2D( normalBuffer, vUv ) );
			vec3 vdir	= normalize( - vpos.xyz );
			vec3 dir, ws;

			// calculation uses left handed system
			vnorm.z = - vnorm.z;

			vec2 noises	= vec2( 0.0 );
			vec2 offset;
			vec2 horizons = vec2( - 1.0, - 1.0 );

			// scale the search radius by the depth and camera FOV
			float radius = ( RADIUS * clipInfo.z ) / vpos.z;
			radius = max( float( NUM_STEPS ), radius );

			float stepSize	= radius / float( NUM_STEPS );
			float phi		= 0.0;
			float ao		= 0.0;
			float division	= noises.y * stepSize;
			float currStep	= 1.0 + division + 0.25 * stepSize * params.y;
			float dist2, invdist, falloff, cosh;

			#if ENABLE_COLOR_BOUNCE
			vec3 color = vec3( 0.0 );
			#endif

			#if ENABLE_ROTATION_JITTER == 1

			// Rotation jitter approach from
			// https://github.com/MaxwellGengYF/Unity-Ground-Truth-Ambient-Occlusion/blob/9cc30e0f31eb950a994c71866d79b2798d1c508e/Shaders/GTAO_Common.cginc#L152-L155
			float rotJitterOffset = PI * fract( 52.9829189 * fract( dot( screenCoord, vec2( 0.06711056, 0.00583715 ) ) ) );

			#elif ENABLE_ROTATION_JITTER == 2

			float rotJitterOffset = PI * texture2D( blueNoiseTex, gl_FragCoord.xy / blueNoiseSize ).r;

			#endif

			#if ENABLE_RADIUS_JITTER == 1

			float jitterMod = ( gl_FragCoord.x + gl_FragCoord.y ) * 0.25;
			float radiusJitterOffset = mod( jitterMod, 1.0 ) * stepSize * 0.25;

			#elif ENABLE_RADIUS_JITTER == 2

			float radiusJitterOffset = PI * texture2D( blueNoiseTex, gl_FragCoord.xy / blueNoiseSize ).g;

			#endif

			#pragma unroll_loop_start
			#pragma unroll(NUM_DIRECTIONS)
			for ( int i = 0; i < NUM_DIRECTIONS; i ++ ) {

				phi = float( i ) * ( PI / float( NUM_DIRECTIONS ) ) + params.x * PI;

				#if ENABLE_ROTATION_JITTER != 0

				phi += rotJitterOffset;

				#endif

				currStep = 1.0 + 0.25 * stepSize * params.y;


				#if ENABLE_RADIUS_JITTER != 0

				currStep += radiusJitterOffset;

				#endif

				dir = vec3( cos( phi ), sin( phi ), 0.0 );
				horizons = vec2( - 1.0 );

				// calculate horizon angles
				for ( int j = 0; j < NUM_STEPS; ++ j ) {

					offset = round( dir.xy * currStep );

					// h1
					s = GetViewPosition( screenCoord + offset );
					ws = s.xyz - vpos.xyz;

					dist2 = dot( ws, ws );
					invdist = inversesqrt( dist2 );
					cosh = invdist * dot( ws, vdir );

					#if ENABLE_FALLOFF

					falloff = Falloff( dist2 );

					#endif

					horizons.x = max( horizons.x, cosh - falloff );

					#if ENABLE_COLOR_BOUNCE

					vec3 ptColor, ptDir;
					float alpha;
					ptColor = texture2D( colorBuffer, ( screenCoord + offset ) / renderSize ).rgb;
					ptDir = normalize( ws );
					alpha = saturate( length( ws ) / float( RADIUS ) );
					color += ptColor * saturate( dot( ptDir, vnorm ) ) * pow( ( 1.0 - alpha ), 2.0 );

					#endif

					// h2
					s = GetViewPosition( screenCoord - offset );
					ws = s.xyz - vpos.xyz;

					dist2 = dot( ws, ws );
					invdist = inversesqrt( dist2 );
					cosh = invdist * dot( ws, vdir );

					#if ENABLE_FALLOFF

					falloff = Falloff( dist2 );

					#endif

					horizons.y = max( horizons.y, cosh - falloff );

					// increment
					currStep += stepSize;

					#if ENABLE_COLOR_BOUNCE

					ptColor = texture2D( colorBuffer, ( screenCoord - offset ) / renderSize ).rgb;
					ptDir = normalize( ws );
					alpha = saturate( length( ws ) / float( RADIUS ) );
					color += ptColor * saturate( dot( ptDir, vnorm ) ) * pow( ( 1.0 - alpha ), 2.0 );

					#endif

				}

				horizons = acos( horizons );

				// calculate gamma
				vec3 bitangent	= normalize( cross( dir, vdir ) );
				vec3 tangent	= cross( vdir, bitangent );
				vec3 nx			= vnorm - bitangent * dot( vnorm, bitangent );

				float nnx		= length( nx );
				float invnnx	= 1.0 / ( nnx + 1e-6 );			// to avoid division with zero
				float cosxi		= dot( nx, tangent ) * invnnx;	// xi = gamma + HALF_PI
				float gamma		= acos( cosxi ) - HALF_PI;
				float cosgamma	= dot( nx, vdir ) * invnnx;
				float singamma2	= - 2.0 * cosxi;					// cos(x + HALF_PI) = -sin(x)

				// clamp to normal hemisphere
				horizons.x = gamma + max( - horizons.x - gamma, - HALF_PI );
				horizons.y = gamma + min( horizons.y - gamma, HALF_PI );

				// Riemann integral is additive
				ao += nnx * 0.25 * (
					( horizons.x * singamma2 + cosgamma - cos( 2.0 * horizons.x - gamma ) ) +
					( horizons.y * singamma2 + cosgamma - cos( 2.0 * horizons.y - gamma ) ) );

			}
			#pragma unroll_loop_end

			
			// PDF = 1 / pi and must normalize with pi because of Lambert
			ao = ao / float( NUM_DIRECTIONS );

			#if ENABLE_COLOR_BOUNCE

			color /= float( NUM_STEPS * NUM_DIRECTIONS ) * 2.0 / lightBounceIntensity;
			gl_FragColor = vec4( color, ao );

			#else

			gl_FragColor = vec4( 0.0, 0.0, 0.0, ao );

			#endif
		}

	`
}, nn = {
  defines: {
    BLUR_ITERATIONS: 5,
    BLUR_MODE: 0,
    AO_ONLY: 0,
    COLOR_ONLY: 0,
    DEPTH_THRESHOLD: "5e-1"
  },
  uniforms: {
    fullSize: { value: new T() },
    aoSize: { value: new T() },
    normalBuffer: { value: null },
    depthBuffer: { value: null },
    colorBuffer: { value: null },
    gtaoBuffer: { value: null },
    intensity: { value: 1 },
    blurStride: { value: 1 },
    ambientColor: { value: new v() },
    ambientIntensity: { value: 0 }
  },
  vertexShader: `
		varying vec2 vUv;
		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}
	`,
  fragmentShader: `
		varying vec2 vUv;

		uniform vec3 ambientColor;
		uniform float ambientIntensity;

		uniform vec2 aoSize;
		uniform vec2 fullSize;
		uniform sampler2D colorBuffer;
		uniform sampler2D depthBuffer;
		uniform sampler2D normalBuffer;
		uniform sampler2D gtaoBuffer;
		uniform float intensity;
		uniform int blurStride;

		vec3 UnpackNormal( vec4 d ) {

			return d.xyz * 2.0 - 1.0;

		}

		vec3 MultiBounce( float ao, vec3 albedo ) {

			vec3 x = vec3( ao );

			vec3 a = 2.0404 * albedo - vec3( 0.3324 );
			vec3 b = -4.7951 * albedo + vec3( 0.6417 );
			vec3 c = 2.7552 * albedo + vec3( 0.6903 );

			return max( x, ( ( x * a + b ) * x + c ) * x );

		}

		void main() {

			vec4 color = texture2D( colorBuffer, vUv );

			// NO_BLUR
			#if BLUR_MODE == 0

			vec4 accumSample = texture2D( gtaoBuffer, vUv );

			#else

			vec2 currTexel = vUv * fullSize;
			vec2 currAoTexel = vUv * aoSize;

			// aoPixels per full size ones. Should be 1/2 at
			vec2 texelRatio = aoSize / fullSize;

			vec3 currNormal = UnpackNormal( texture2D( normalBuffer, vUv ) );
			float currDepth = texture2D( depthBuffer, vUv ).r;

			// TODO: pull this sampling out into a function
			vec4 accumSample = vec4( 0.0 );
			float totalWeight = 1e-10;
			float pixelOffset = - float( BLUR_ITERATIONS ) / 2.0;
			pixelOffset += mod( float( BLUR_ITERATIONS ), 2.0 ) == 0.0 ? 0.0 : 0.5;
			pixelOffset *= float( blurStride );

			// BOX_BLUR
			#if BLUR_MODE == 1

			#pragma unroll_loop_start
			#pragma unroll(BLUR_ITERATIONS)
			for ( int x = 0; x < BLUR_ITERATIONS; x ++ ) {

				#pragma unroll_loop_start
				for ( int y = 0; y < BLUR_ITERATIONS; y ++ ) {

					vec2 step = vec2( float( x ), float( y ) ) * float( blurStride );

					// iterate over full res pixels
					vec2 offsetUv = currTexel + ( pixelOffset + step ) / texelRatio;
					offsetUv /= fullSize;

					// get the associated pixel in the AO buffer
					vec2 aoUv = currAoTexel + pixelOffset + step;
					aoUv /= aoSize;

					// if the pixels are close enough in space then blur them together
					float offsetDepth = texture2D( depthBuffer, offsetUv ).r;
					if ( abs( offsetDepth - currDepth ) <= DEPTH_THRESHOLD ) {

						// Weigh the sample based on normal similarity
						vec3 offsetNormal = UnpackNormal( texture2D( normalBuffer, offsetUv ) );
						float weight = max( 0.0, dot( offsetNormal, currNormal ) );

						// square the weight to give pixels with a closer normal even higher priority
						weight *= weight;

						// accumulate
						vec4 val = texture2D( gtaoBuffer, aoUv );
						accumSample += val * weight;
						totalWeight += weight;

					}

				}
				#pragma unroll_loop_end

			}
			#pragma unroll_loop_end

			// CROSS_BLUR
			#elif BLUR_MODE == 2

			#pragma unroll_loop_start
			for ( int i = 0; i < BLUR_ITERATIONS; i ++ ) {

				vec2 offsetUv, aoUv;
				float offsetDepth;

				// X sample
				// iterate over full res pixels
				offsetUv = currTexel + vec2( pixelOffset + float( i * blurStride ), 0.0 ) / texelRatio;
				offsetUv /= fullSize;

				aoUv = currAoTexel + vec2( pixelOffset + float( i * blurStride ), 0.0 );
				aoUv /= aoSize;

				// further more negative
				offsetDepth = texture2D( depthBuffer, offsetUv ).r;
				if ( abs(offsetDepth - currDepth) <= DEPTH_THRESHOLD ) {

					vec3 offsetNormal = UnpackNormal( texture2D( normalBuffer, offsetUv ) );
					float weight = max(0.0, dot( offsetNormal, currNormal ) );
					weight *= weight;

					vec4 val = texture2D( gtaoBuffer, aoUv );
					accumSample += val * weight;
					totalWeight += weight;

				}

				// TODO: this should not be here if on the center pixel
				// Y sample
				// iterate over full res pixels
				offsetUv = currTexel + vec2( 0.0, pixelOffset + float( i * blurStride ) ) / texelRatio;
				offsetUv /= fullSize;

				aoUv = currAoTexel + vec2( 0.0, pixelOffset + float( i * blurStride ) );
				aoUv /= aoSize;

				// further more negative
				offsetDepth = texture2D( depthBuffer, offsetUv ).r;
				if ( abs(offsetDepth - currDepth) <= DEPTH_THRESHOLD ) {

					vec3 offsetNormal = UnpackNormal( texture2D( normalBuffer, offsetUv ) );
					float weight = max(0.0, dot( offsetNormal, currNormal ) );
					weight *= weight;

					vec4 val = texture2D( gtaoBuffer, aoUv );
					accumSample += val * weight;
					totalWeight += weight;

				}

			}
			#pragma unroll_loop_end

			// DIAGONAL_BLUR
			#elif BLUR_MODE == 3

			#pragma unroll_loop_start
			for ( int i = 0; i < BLUR_ITERATIONS; i ++ ) {

				vec2 offsetUv, aoUv;
				float offsetDepth;

				// X sample
				// iterate over full res pixels
				offsetUv = currTexel + vec2( pixelOffset + float( i * blurStride ), pixelOffset + float( i * blurStride ) ) / texelRatio;
				offsetUv /= fullSize;

				aoUv = currAoTexel + vec2( pixelOffset + float( i * blurStride ), pixelOffset + float( i * blurStride ) );
				aoUv /= aoSize;

				// further more negative
				offsetDepth = texture2D( depthBuffer, offsetUv ).r;
				if ( abs(offsetDepth - currDepth) <= DEPTH_THRESHOLD ) {

					vec3 offsetNormal = UnpackNormal( texture2D( normalBuffer, offsetUv ) );
					float weight = max(0.0, dot( offsetNormal, currNormal ) );
					weight *= weight;

					vec4 val = texture2D( gtaoBuffer, aoUv );
					accumSample += val * weight;
					totalWeight += weight;

				}

				// TODO: this should not be here if on the center pixel
				// Y sample
				// iterate over full res pixels
				offsetUv = currTexel + vec2( - pixelOffset - float( i * blurStride ), pixelOffset + float( i * blurStride ) ) / texelRatio;
				offsetUv /= fullSize;

				aoUv = currAoTexel + vec2( - pixelOffset - float( i * blurStride ), pixelOffset + float( i * blurStride ) );
				aoUv /= aoSize;

				// further more negative
				offsetDepth = texture2D( depthBuffer, offsetUv ).r;
				if ( abs(offsetDepth - currDepth) <= DEPTH_THRESHOLD ) {

					vec3 offsetNormal = UnpackNormal( texture2D( normalBuffer, offsetUv ) );
					float weight = max(0.0, dot( offsetNormal, currNormal ) );
					weight *= weight;

					vec4 val = texture2D( gtaoBuffer, aoUv );
					accumSample += val * weight;
					totalWeight += weight;

				}

			}
			#pragma unroll_loop_end

			#endif

			accumSample /= totalWeight;

			#endif

			float gtao = accumSample.a;

			#if COLOR_ONLY

			gl_FragColor = vec4( accumSample.rgb, 1.0 );

			#elif AO_ONLY

			vec3 rgb = mix( vec3( 1.0 ), vec3( accumSample.a ), intensity );
			gl_FragColor = vec4( rgb, 1.0 );

			#else

			vec3 rgb = mix( color.rgb, color.rgb * MultiBounce( gtao, color.rgb ), intensity );
			vec3 delta = color.rgb - rgb;
			vec3 ambient = ambientColor * delta * ambientIntensity;

			float colorFade = ( 1.0 - pow( 1.0 - gtao, 2.0 ) );
			gl_FragColor = vec4( rgb + ambient + accumSample.rgb * ( 0.75 + colorFade * 0.25 ), color.a );

			#endif

		}
		`
};
class an {
  constructor() {
    this.clearAlpha = 0, this.clearColor = new v(), this.renderTarget = null, this.outputEncoding = Xs, this.overrideMaterial = null, this.shadowsEnabled = !1, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.background = null, this.autoUpdate = !0;
  }
  copy(e, l) {
    e && (this.clearAlpha = e.getClearAlpha(), this.clearColor = e.getClearColor(this.clearColor), this.renderTarget = e.getRenderTarget(), this.shadowsEnabled = e.shadowMap.enabled, this.outputEncoding = e.outputEncoding, this.autoClear = e.autoClear, this.autoClearColor = e.autoClearColor, this.autoClearDepth = e.autoClearDepth, this.autoClearStencil = e.autoClearStencil), l && (this.overrideMaterial = l.overrideMaterial, this.background = l.background, this.autoUpdate = l.autoUpdate);
  }
  restore(e, l) {
    e && (e.setClearAlpha(this.clearAlpha), e.setClearColor(this.clearColor), e.setRenderTarget(this.renderTarget), e.shadowMap.enabled = this.shadowsEnabled, e.outputEncoding = this.outputEncoding, e.autoClear = this.autoClear, e.autoClearColor = this.autoClearColor, e.autoClearDepth = this.autoClearDepth, e.autoClearStencil = this.autoClearStencil), l && (l.overrideMaterial = this.overrideMaterial, l.background = this.background, l.autoUpdate = this.autoUpdate), this.renderTarget = null, this.overrideMaterial = null;
  }
}
function on(n, e = Math.random) {
  for (let l = n.length - 1; l > 0; l--) {
    const c = ~~((e() - 1e-6) * l), t = n[l];
    n[l] = n[c], n[c] = t;
  }
}
function bn(n, e) {
  n.fill(0);
  for (let l = 0; l < e; l++)
    n[l] = 1;
}
class od {
  constructor(e) {
    this.count = 0, this.size = -1, this.sigma = -1, this.radius = -1, this.lookupTable = null, this.score = null, this.binaryPattern = null, this.resize(e), this.setSigma(1.5);
  }
  findVoid() {
    const { score: e, binaryPattern: l } = this;
    let c = 1 / 0, t = -1;
    for (let d = 0, s = l.length; d < s; d++) {
      if (l[d] !== 0)
        continue;
      const i = e[d];
      i < c && (c = i, t = d);
    }
    return t;
  }
  findCluster() {
    const { score: e, binaryPattern: l } = this;
    let c = -1 / 0, t = -1;
    for (let d = 0, s = l.length; d < s; d++) {
      if (l[d] !== 1)
        continue;
      const i = e[d];
      i > c && (c = i, t = d);
    }
    return t;
  }
  setSigma(e) {
    if (e === this.sigma)
      return;
    const l = ~~(Math.sqrt(10 * 2 * e ** 2) + 1), c = 2 * l + 1, t = new Float32Array(c * c), d = e * e;
    for (let s = -l; s <= l; s++)
      for (let i = -l; i <= l; i++) {
        const a = (l + i) * c + s + l, o = s * s + i * i;
        t[a] = Math.E ** (-o / (2 * d));
      }
    this.lookupTable = t, this.sigma = e, this.radius = l;
  }
  resize(e) {
    this.size !== e && (this.size = e, this.score = new Float32Array(e * e), this.binaryPattern = new Uint8Array(e * e));
  }
  invert() {
    const { binaryPattern: e, score: l, size: c } = this;
    l.fill(0);
    for (let t = 0, d = e.length; t < d; t++)
      if (e[t] === 0) {
        const s = ~~(t / c), i = t - s * c;
        this.updateScore(i, s, 1), e[t] = 1;
      } else
        e[t] = 0;
  }
  updateScore(e, l, c) {
    const { size: t, score: d, lookupTable: s } = this, i = this.radius, a = 2 * i + 1;
    for (let o = -i; o <= i; o++)
      for (let b = -i; b <= i; b++) {
        const m = (i + b) * a + o + i, X = s[m];
        let G = e + o;
        G = G < 0 ? t + G : G % t;
        let h = l + b;
        h = h < 0 ? t + h : h % t;
        const u = h * t + G;
        d[u] += c * X;
      }
  }
  addPointIndex(e) {
    this.binaryPattern[e] = 1;
    const l = this.size, c = ~~(e / l), t = e - c * l;
    this.updateScore(t, c, 1), this.count++;
  }
  removePointIndex(e) {
    this.binaryPattern[e] = 0;
    const l = this.size, c = ~~(e / l), t = e - c * l;
    this.updateScore(t, c, -1), this.count--;
  }
  copy(e) {
    this.resize(e.size), this.score.set(e.score), this.binaryPattern.set(e.binaryPattern), this.setSigma(e.sigma), this.count = e.count;
  }
}
class mn {
  constructor() {
    this.random = Math.random, this.sigma = 1.5, this.size = 64, this.majorityPointsRatio = 0.1, this.samples = new od(1), this.savedSamples = new od(1);
  }
  generate() {
    const {
      samples: e,
      savedSamples: l,
      sigma: c,
      majorityPointsRatio: t,
      size: d
    } = this;
    e.resize(d), e.setSigma(c);
    const s = Math.floor(d * d * t), i = e.binaryPattern;
    console.time("Array Initialization"), bn(i, s), on(i, this.random), console.timeEnd("Array Initialization"), console.time("Score Initialization");
    for (let m = 0, X = i.length; m < X; m++)
      i[m] === 1 && e.addPointIndex(m);
    for (console.timeEnd("Score Initialization"), console.time("Point Rearrangement"); ; ) {
      const m = e.findCluster();
      e.removePointIndex(m);
      const X = e.findVoid();
      if (m === X) {
        e.addPointIndex(m);
        break;
      }
      e.addPointIndex(X);
    }
    console.timeEnd("Point Rearrangement");
    const a = new Uint32Array(d * d);
    l.copy(e), console.time("Dither Array Phase 1");
    let o;
    for (o = e.count - 1; o >= 0; ) {
      const m = e.findCluster();
      e.removePointIndex(m), a[m] = o, o--;
    }
    console.timeEnd("Dither Array Phase 1"), console.time("Dither Array Phase 2");
    const b = d * d;
    for (o = l.count; o < b / 2; ) {
      const m = l.findVoid();
      l.addPointIndex(m), a[m] = o, o++;
    }
    for (console.timeEnd("Dither Array Phase 2"), console.time("Samples Invert"), l.invert(), console.timeEnd("Samples Invert"), console.time("Dither Array Phase 3"); o < b; ) {
      const m = l.findCluster();
      l.removePointIndex(m), a[m] = o, o++;
    }
    return console.timeEnd("Dither Array Phase 3"), { data: a, maxValue: b };
  }
}
const bd = new an(), Zn = new v(0), Lc = new mn();
Lc.size = 32;
const _d = new Uint8Array(32 ** 2 * 4);
for (let n = 0, e = 4; n < e; n++) {
  const l = Lc.generate(), c = l.data, t = l.maxValue;
  for (let d = 0, s = c.length; d < s; d++) {
    const i = 255 * (c[d] / t);
    _d[d * 4 + n] = i;
  }
}
const Le = new Gs(_d, Lc.size, Lc.size, We);
Le.wrapS = ve;
Le.wrapT = ve;
Le.minFilter = fe;
Le.needsUpdate = !0;
class Q extends Pe {
  constructor(e, l) {
    super(), this.enabled = !0, this.needsSwap = !0, this.scene = e, this.camera = l, this.debug = {
      display: Q.DEFAULT
    }, this.renderTargetScale = 1, this.enableJitter = !0, this.radiusJitter = 0, this.rotationJitter = 0, this.numSteps = 8, this.numDirections = 8, this.intensity = 1, this.radius = 2, this.directionOffset = 0, this.stepOffset = 0, this.blurMode = Q.BOX_BLUR, this.blurIterations = 4, this.blurStride = 1, this.enableFalloff = !0, this.falloffStart = 0.4, this.falloffEnd = 2, this.ambientColor = new v(), this.ambientIntensity = 0, this.lightBounceIntensity = 1, this._gtaoBuffer = new ye(1, 1, {
      format: We
    }), this._depthBuffer = new ye(1, 1, {
      minFilter: Me,
      magFilter: Me,
      format: We,
      type: us
    }), this._depthReplacement = new cn(), this._normalBuffer = new ye(1, 1, {
      minFilter: Me,
      magFilter: Me,
      format: We
    }), this._normalReplacement = new en(), this.gtaoQuad = new Fe(new il(sn)), this.debugPackedQuad = new Fe(new il(dn)), this.debugDepthQuad = new Fe(new il(tn)), this.compositeQuad = new Fe(new il(nn));
  }
  dispose() {
  }
  setSize(e, l) {
    const c = this.renderTargetScale, t = Math.floor(e * c), d = Math.floor(l * c);
    this._depthBuffer.setSize(e, l), this._normalBuffer.setSize(e, l), this._gtaoBuffer.setSize(t, d);
  }
  render(e, l, c) {
    const t = this.renderToScreen ? null : l, {
      scene: d,
      camera: s,
      debug: i,
      debugPackedQuad: a,
      debugDepthQuad: o,
      compositeQuad: b,
      gtaoQuad: m
    } = this, X = m.material;
    bd.copy(e, d);
    const G = () => {
      bd.restore(e, d), h.reset(d, !0);
    }, h = this._depthReplacement, u = this._depthBuffer;
    if (d.background = null, h.replace(d, !0, !0), e.setRenderTarget(u), e.setClearColor(Zn, 0), e.clear(), e.render(d, s), i.display === Q.DEPTH) {
      e.setRenderTarget(t), o.material.uniforms.texture.value = u.texture, o.render(e), G();
      return;
    }
    const y = this._normalReplacement, p = this._normalBuffer;
    if (y.replace(d, !0, !1), e.setRenderTarget(p), e.clear(), e.render(d, s), i.display === Q.NORMAL) {
      e.setRenderTarget(t), e.clear(), a.material.uniforms.displayRoughness.value = 0, a.material.uniforms.texture.value = p.texture, a.render(e), G();
      return;
    }
    this.numSteps !== X.defines.NUM_STEPS && (X.defines.NUM_STEPS = this.numSteps, X.needsUpdate = !0), this.numDirections !== X.defines.NUM_DIRECTIONS && (X.defines.NUM_DIRECTIONS = this.numDirections, X.needsUpdate = !0), this.radius.toFixed(16) !== X.defines.RADIUS && (X.defines.RADIUS = this.radius.toFixed(16), X.needsUpdate = !0), (Math.pow(this.falloffStart, 2).toFixed(16) !== X.defines.FALLOFF_START2 || Math.pow(this.falloffEnd, 2).toFixed(16) !== X.defines.FALLOFF_END2 || this.enableFalloff !== Boolean(X.defines.ENABLE_FALLOFF)) && (X.defines.FALLOFF_START2 = Math.pow(this.falloffStart, 2).toFixed(16), X.defines.FALLOFF_END2 = Math.pow(this.falloffEnd, 2).toFixed(16), X.defines.ENABLE_FALLOFF = this.enableFalloff ? 1 : 0, X.needsUpdate = !0), this.rotationJitter !== X.defines.ENABLE_ROTATION_JITTER && (X.defines.ENABLE_ROTATION_JITTER = this.rotationJitter, X.needsUpdate = !0), this.radiusJitter !== X.defines.ENABLE_RADIUS_JITTER && (X.defines.ENABLE_RADIUS_JITTER = this.radiusJitter, X.needsUpdate = !0), this.lightBounceIntensity !== 0 !== Boolean(X.defines.ENABLE_COLOR_BOUNCE) && (X.defines.ENABLE_COLOR_BOUNCE = this.lightBounceIntensity !== 0 ? 1 : 0, X.needsUpdate = !0);
    const W = this._gtaoBuffer, V = Math.floor(W.texture.image.width), r = Math.floor(W.texture.image.height), I = s.projectionMatrix, g = Gt.DEG2RAD * s.fov;
    X.uniforms.params.value.set(this.directionOffset, this.stepOffset), X.uniforms.projInfo.value.set(
      2 / (V * I.elements[4 * 0 + 0]),
      2 / (r * I.elements[4 * 1 + 1]),
      -1 / I.elements[4 * 0 + 0],
      -1 / I.elements[4 * 1 + 1]
    ), X.uniforms.clipInfo.value.set(
      s.near,
      s.far,
      0.5 * (r / (2 * Math.tan(g * 0.5))),
      0
    ), X.uniforms.normalBuffer.value = p.texture, X.uniforms.depthBuffer.value = u.texture, X.uniforms.colorBuffer.value = c.texture, X.uniforms.lightBounceIntensity.value = this.lightBounceIntensity, X.uniforms.renderSize.value.set(
      Math.floor(W.texture.image.width),
      Math.floor(W.texture.image.height)
    ), X.uniforms.blueNoiseTex.value = Le, X.uniforms.blueNoiseSize.value = Le.image.width, e.setRenderTarget(W), e.clear(), m.render(e);
    const L = b.material;
    L.uniforms.depthBuffer.value = u.texture, L.uniforms.normalBuffer.value = p.texture, L.uniforms.colorBuffer.value = c.texture, L.uniforms.gtaoBuffer.value = W.texture, L.uniforms.intensity.value = this.intensity, L.uniforms.aoSize.value.set(W.width, W.height), L.uniforms.fullSize.value.set(c.width, c.height), L.uniforms.blurStride.value = this.blurStride, L.uniforms.ambientColor.value.copy(this.ambientColor), L.uniforms.ambientIntensity.value = this.ambientIntensity, this.blurIterations !== L.defines.BLUR_ITERATIONS && (L.defines.BLUR_ITERATIONS = this.blurIterations, L.needsUpdate = !0), this.blurMode !== L.defines.BLUR_MODE && (L.defines.BLUR_MODE = this.blurMode, L.needsUpdate = !0), i.display === Q.AO_SAMPLE ? L.defines.AO_ONLY !== 1 && (L.defines.AO_ONLY = 1, L.needsUpdate = !0) : L.defines.AO_ONLY !== 0 && (L.defines.AO_ONLY = 0, L.needsUpdate = !0), i.display === Q.COLOR_SAMPLE ? L.defines.COLOR_ONLY !== 1 && (L.defines.COLOR_ONLY = 1, L.needsUpdate = !0) : L.defines.COLOR_ONLY !== 0 && (L.defines.COLOR_ONLY = 0, L.needsUpdate = !0), e.setRenderTarget(t), e.clear(), b.render(e), G();
  }
}
Q.NO_JITTER = 0;
Q.RANDOM_JITTER = 1;
Q.BLUENOISE_JITTER = 2;
Q.DEFAULT = 0;
Q.DEPTH = 1;
Q.NORMAL = 2;
Q.AO_SAMPLE = 3;
Q.COLOR_SAMPLE = 4;
Q.NO_BLUR = 0;
Q.BOX_BLUR = 1;
Q.CROSS_BLUR = 2;
Q.DIAGONAL_BLUR = 3;
function Gc(n, e) {
  e !== void 0 && Object.keys(e).forEach((l) => {
    n.style.setProperty(l, e[l]);
  });
}
function Xn(n) {
  return n[0] + n[1] * 256 + n[2] * 256 * 256 + n[3] * 256 * 256 * 256;
}
function Rc(n) {
  n.getIndex().array.length > 0 && (n.computeBoundsTree ? n.computeBoundsTree() : n.disposeBoundsTree && n.disposeBoundsTree());
}
class Gn {
  constructor(e) {
    Z(this, "viewerElement");
    Z(this, "progressElement");
    this.viewerElement = e, Gc(this.viewerElement, {
      position: "relative"
    }), this.progressElement = document.createElement("div"), Gc(this.progressElement, {
      position: "absolute",
      left: "0",
      "background-image": "linear-gradient(to right, rgba(96,165,250,1), rgba(147,51,234,1), rgba(49,46,129,1))",
      height: "3px",
      width: "0%",
      "user-select": "none"
    }), this.viewerElement.appendChild(this.progressElement);
  }
  setProgress(e) {
    Gc(this.progressElement, {
      width: e + "%"
    });
  }
}
class un extends MouseEvent {
  constructor(e) {
    super("move", e);
  }
}
var he = /* @__PURE__ */ ((n) => (n.NavStart = "navstart", n.NavEnd = "navend", n.NavChange = "navchange", n.BeforeNavChange = "beforenavchange", n.Click = "click", n.DblClick = "dblclick", n.Down = "down", n.Up = "up", n.Move = "move", n.Wheel = "wheel", n.Hover = "hover", n))(he || {});
class f {
}
Z(f, "navstart", new Event("navstart")), Z(f, "navend", new Event("navend")), Z(f, "navchange", new Event("navchange")), Z(f, "beforeNavChange", new Event("beforenavchange")), Z(f, "click", new Event("click")), Z(f, "dblclick", new Event("dblclick")), Z(f, "down", new Event("down")), Z(f, "up", new Event("up")), Z(f, "move", un), Z(f, "wheel", new Event("wheel")), Z(f, "hover", new Event("hover"));
de.prototype.computeBoundsTree = Ai;
de.prototype.disposeBoundsTree = Di;
w.prototype.raycast = Ei;
hs.enabled = !0;
class hn extends EventTarget {
  constructor(l, c, t = void 0) {
    super();
    Z(this, "name");
    Z(this, "helpersScene", new ut());
    Z(this, "sceneManager");
    Z(this, "metaManager");
    Z(this, "extMan", new Oi());
    Z(this, "camera");
    Z(this, "viewerElement");
    Z(this, "isNavigation", !1);
    Z(this, "mouse", new T());
    Z(this, "mousePointer", new T());
    Z(this, "renderer");
    Z(this, "defaultPixelRatio", 1);
    Z(this, "clearColor", 16777215);
    Z(this, "isDisposed", !1);
    Z(this, "clock", new Xt());
    Z(this, "pixelBuffer", new Uint8Array(4));
    Z(this, "startMousePointer", new T());
    Z(this, "hoveredElNum", -1);
    Z(this, "stateRenderTarget");
    Z(this, "stateUniforms", {
      hoverColor: { value: new v(1, 1, 1) },
      selectColor: { value: new v(1, 0, 0) },
      hoverElNums: { value: -1 },
      selCount: { value: 1 }
    });
    Z(this, "stateMat", new il({
      uniforms: this.stateUniforms,
      vertexShader: ai,
      fragmentShader: oi,
      clipping: !0
    }));
    Z(this, "pickingRenderTarget");
    Z(this, "pickingMaterial", new il(
      {
        uniforms: {},
        vertexShader: ii,
        fragmentShader: ni,
        transparent: !1,
        clipping: !0
      }
    ));
    Z(this, "mainPass");
    Z(this, "mainComposer");
    Z(this, "statePass");
    Z(this, "stateComposer");
    Z(this, "mixShader", new si());
    Z(this, "mixComposer");
    Z(this, "gtaoPass");
    Z(this, "isSelectionLocked", !1);
    Z(this, "animBlock", 0);
    Z(this, "animNumber", 0);
    Z(this, "progressBar");
    Z(this, "smaaPass");
    Z(this, "onModelsProgress");
    this.name = l, this.extMan.viewerName = l, this.sceneManager = c, this.metaManager = t, this.helpersScene.name = "helpersScene";
  }
  setSelectionLock(l) {
    this.isSelectionLocked = l;
  }
  setBackgroundColor(l = 16777215) {
    var c;
    this.clearColor = l, (c = this.renderer) == null || c.setClearColor(l, 1);
  }
  init(l = "viewer") {
    const c = document.getElementById(l);
    if (c == null) {
      console.warn("DOM element for viewer not found.");
      return;
    }
    this.viewerElement = c, this.progressBar = new Gn(c), this.onModelsProgress = ((t) => {
      const d = t;
      this.progressBar.setProgress(d.progress);
    }).bind(this), this.sceneManager.addEventListener("progress", this.onModelsProgress), this.createCaption(), this.renderer = new ps({
      antialias: !1,
      stencil: !0,
      logarithmicDepthBuffer: !0,
      powerPreference: "high-performance"
    }), this.renderer.localClippingEnabled = !0, this.renderer.physicallyCorrectLights = !0, this.renderer.outputEncoding = lt, this.setBackgroundColor(), this.renderer.sortObjects = !1, this.renderer.setPixelRatio(window.devicePixelRatio), this.defaultPixelRatio = this.renderer.getPixelRatio(), this.renderer.toneMappingExposure = 1.4, this.renderer.setSize(this.viewerElement.offsetWidth, this.viewerElement.offsetHeight), this.initCamera(1e-3, 1e3), this.initMainComposer(), this.initStateComposer(), this.initMixComposer(), this.initPickingTarget(), this.isDisposed = !1;
  }
  createCaption() {
    const l = document.createElement("div");
    Gc(l, {
      position: "absolute",
      bottom: "0",
      "font-size": "10px",
      "font-family": "roboto",
      "user-select": "none",
      margin: "3px"
    }), l.innerHTML = "powered by tangl", this.viewerElement.appendChild(l);
  }
  initMainComposer() {
    this.renderer.getSize(new T()).multiplyScalar(this.renderer.getPixelRatio()), this.mainPass = new fc(this.sceneManager.scene, this.camera), this.gtaoPass = new Q(this.sceneManager.scene, this.camera), this.gtaoPass.intensity = 0.55, this.gtaoPass.radius = 1, this.gtaoPass.numDirections = 2, this.gtaoPass.rotationJitter = 1, this.gtaoPass.radiusJitter = 0, this.gtaoPass.falloffStart = 0.01, this.gtaoPass.falloffEnd = 10, this.gtaoPass.renderTargetScale = 0.5, this.gtaoPass.blurStride = 1, this.gtaoPass.blurIterations = 15;
    const l = new fc(this.helpersScene, this.camera);
    l.clearDepth = !0, l.clear = !1, this.mainComposer = new Bc(this.renderer), this.mainComposer.renderTarget1.stencilBuffer = !0, this.mainComposer.renderTarget2.stencilBuffer = !0, this.mainComposer.renderToScreen = !1, this.mainComposer.addPass(this.mainPass), this.mainComposer.addPass(this.gtaoPass), this.mainComposer.addPass(l);
  }
  initStateComposer() {
    const l = {
      minFilter: fe,
      magFilter: fe,
      format: We,
      stencilBuffer: !0,
      premultipliedAlpha: !1,
      alpha: !0
    };
    this.stateRenderTarget = new ye(
      window.innerWidth,
      window.innerHeight,
      l
    ), this.statePass = new fc(this.sceneManager.scene, this.camera, this.stateMat), this.statePass.clearColor = new v(65535), this.statePass.clearDepth = !1, this.statePass.clear = !0, this.stateComposer = new Bc(this.renderer, this.stateRenderTarget), this.stateComposer.renderToScreen = !1, this.stateComposer.addPass(this.statePass);
  }
  initMixComposer() {
    this.mixShader.uniforms.tDiffuse1.value = this.mainComposer.renderTarget2.texture, this.mixShader.uniforms.tDiffuse2.value = this.stateComposer.renderTarget2.texture;
    const l = new il({
      uniforms: this.mixShader.uniforms,
      vertexShader: this.mixShader.vertexShader,
      fragmentShader: this.mixShader.fragmentShader
    }), c = new it(l);
    this.mixComposer = new Bc(this.renderer), this.mixComposer.addPass(c);
  }
  initPickingTarget() {
    this.pickingRenderTarget = new ye(1, 1), this.pickingRenderTarget.texture.generateMipmaps = !1, this.sceneManager.materials.set(this.pickingMaterial.name, this.pickingMaterial);
  }
  onResize() {
    if (!this.viewerElement || !this.renderer || !this.camera || this.isDisposed)
      return;
    const l = this.viewerElement.offsetWidth, c = this.viewerElement.offsetHeight;
    !l || !c || (this.stateComposer && this.stateRenderTarget.setSize(l, c), this.camera.aspect = l / c, this.camera.updateProjectionMatrix(), this.renderer.setSize(l, c), this.mainComposer && this.mainComposer.setSize(l, c), this.stateComposer && this.stateComposer.setSize(l, c), this.mixComposer && this.mixComposer.setSize(l, c), this.gtaoPass.setSize(l, c));
  }
  initCamera(l = 10, c = 1e6) {
    this.camera = new Fd(
      45,
      this.viewerElement.clientWidth / this.viewerElement.clientHeight,
      l,
      c
    ), this.camera.position.set(100, 100, 100);
  }
  zoomCameraToSelection(l = 1.2) {
    const c = this.extMan.selectedControllerExtension();
    if (!c)
      return;
    const t = this.sceneManager.selBox.getSize(new R()), d = this.sceneManager.selBox.getCenter(new R()), s = c.target.sub(d);
    this.camera.position.add(s.negate()), c.target.copy(d);
    const a = Math.max(t.x, t.y, t.z) / (2 * Math.atan(Math.PI * this.camera.fov / 360)), o = a / this.camera.aspect, b = l * Math.max(a, o), m = c.target.clone().sub(this.camera.position).normalize().multiplyScalar(b);
    c.target.copy(d), this.camera.position.copy(c.target).sub(m), c.updated(0), this.requestUpdate(!0);
  }
  destroy() {
    var l;
    this.isDisposed || (console.info("Destroing renderer..."), this.isDisposed = !0, this.extMan.clear(), this.stateRenderTarget.dispose(), (l = this.sceneManager) == null || l.removeEventListener("progress", this.onModelsProgress));
  }
  processHover() {
    if (this.animBlock == 0 && !this.isNavigation && !this.isSelectionLocked)
      if (this.camera.setViewOffset(
        this.renderer.domElement.width,
        this.renderer.domElement.height,
        this.mousePointer.x * this.defaultPixelRatio | 0,
        this.mousePointer.y * this.defaultPixelRatio | 0,
        1,
        1
      ), this.renderer.setClearColor(new v(this.clearColor)), this.renderer.setRenderTarget(this.pickingRenderTarget), this.sceneManager.scene.overrideMaterial = this.pickingMaterial, this.renderer.render(this.sceneManager.scene, this.camera), this.sceneManager.scene.overrideMaterial = null, this.renderer.readRenderTargetPixels(this.pickingRenderTarget, 0, 0, 1, 1, this.pixelBuffer), this.camera.clearViewOffset(), this.pixelBuffer[0] != 255 && this.pixelBuffer[1] != 255 && this.pixelBuffer[2] != 255 && this.pixelBuffer[3] != 255) {
        const l = Xn(this.pixelBuffer);
        this.updateHover(l);
      } else
        this.updateHover();
  }
  updateHover(l = -1) {
    this.isNavigation || (this.hoveredElNum = l, this.stateUniforms.hoverElNums.value = l, this.dispatchEvent(f.hover), this.requestUpdate(!1));
  }
}
var Zl = /* @__PURE__ */ ((n) => (n[n.AlwaysOff = 0] = "AlwaysOff", n[n.WhenProgressiveNavigation = 1] = "WhenProgressiveNavigation", n[n.WhenNavigation = 2] = "WhenNavigation", n[n.AlwaysOn = 3] = "AlwaysOn", n))(Zl || {});
class qd {
  constructor() {
    Z(this, "progressive", !0);
    Z(this, "generateCaps", 0);
    Z(this, "gtao", 2);
    Z(this, "generateIntersectionCaps", !0);
    Z(this, "capsColor", "#333333");
    Z(this, "intersectedCapsColor", "#111111");
    Z(this, "reducePixelRatio", 2);
    Z(this, "antialiasing", 2);
  }
}
class pn extends hn {
  constructor(l, c, t = void 0) {
    super(l, c, t);
    Z(this, "isTouchDevice", !1);
    Z(this, "state", new qd());
    Z(this, "needUpdate", !1);
    Z(this, "needContinuesUpdate", !1);
    Z(this, "needRender", !0);
    Z(this, "startPointerTime");
    Z(this, "endPointerTime");
    Z(this, "isFirstClick", !1);
    this.isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0, this.isTouchDevice && console.log("Touch device detected.");
  }
  init(l) {
    super.init(l), this.initEvents(), window.addEventListener("resize", () => {
      this.onResize();
    }, !1), new ResizeObserver(() => this.onResize()).observe(this.viewerElement), this.viewerElement.appendChild(this.renderer.domElement), this.animate();
  }
  blockControls() {
    const l = this.extMan.selectedControllerExtension();
    l && (l.isEnabled = !1);
  }
  unblockControls() {
    const l = this.extMan.selectedControllerExtension();
    l && (l.isEnabled = !0);
  }
  onResize() {
    super.onResize(), this.requestUpdate(), this.render();
  }
  render() {
    this.isDisposed || this.mainComposer.renderTarget1.height === 0 || this.mainComposer.renderTarget1.width === 0 || ((this.isNavigation || this.needRender) && (this.renderer.autoClear = !1, this.state.progressive && !this.isNavigation && this.state.antialiasing >= Zl.WhenProgressiveNavigation || !this.state.progressive && !this.isNavigation && this.state.antialiasing >= Zl.WhenNavigation || this.state.antialiasing >= Zl.AlwaysOn ? (this.mainComposer.renderTarget1.samples = 3, this.mainComposer.renderTarget2.samples = 3) : (this.mainComposer.renderTarget1.samples = 0, this.mainComposer.renderTarget2.samples = 0), this.renderer.setRenderTarget(this.mainComposer.renderTarget1), this.renderer.setClearColor(this.clearColor, 1), this.renderer.clearColor(), this.renderer.clearDepth(), this.renderer.render(this.sceneManager.scene, this.camera), (this.state.progressive && !this.isNavigation && this.state.gtao >= Zl.WhenProgressiveNavigation || !this.state.progressive && !this.isNavigation && this.state.gtao >= Zl.WhenNavigation) && (this.sceneManager.groupFantoms.visible = !1, this.sceneManager.groupLines.visible = !1, this.sceneManager.groupTrans.visible = !1, this.gtaoPass.render(this.renderer, this.mainComposer.renderTarget2, this.mainComposer.renderTarget1), this.renderer.setRenderTarget(this.mainComposer.renderTarget2), this.sceneManager.groupFantoms.visible = !0, this.sceneManager.groupLines.visible = !0, this.sceneManager.groupTrans.visible = !0), this.renderer.clearDepth(), this.sceneManager.clippingTools.capsColor = this.state.capsColor, (!this.state.progressive || !this.isNavigation) && this.state.generateCaps >= Zl.AlwaysOn ? this.sceneManager.clippingTools.render(this.renderer, this.camera, this.state.generateIntersectionCaps) : this.state.progressive && !this.isNavigation && this.state.generateCaps >= Zl.WhenProgressiveNavigation ? this.sceneManager.clippingTools.render(this.renderer, this.camera, this.state.generateIntersectionCaps) : !this.state.progressive && !this.isNavigation && this.state.generateCaps >= Zl.WhenNavigation && this.sceneManager.clippingTools.render(this.renderer, this.camera, this.state.generateIntersectionCaps), this.renderer.clearDepth(), this.renderer.render(this.helpersScene, this.camera)), this.needRender && (this.needRender = !1), this.renderer.autoClear = !0, this.renderer.setRenderTarget(this.stateComposer.renderTarget2), !this.sceneManager.isProgressive || this.sceneManager.isProgressive && !this.isNavigation ? (this.stateComposer.render(), this.mixShader.uniforms.tDiffuse2.value = this.stateComposer.renderTarget2.texture) : (this.renderer.setClearColor(new v(0)), this.renderer.clear(), this.renderer.setClearColor(new v(this.clearColor))), this.state.progressive && !this.isNavigation && this.state.gtao >= Zl.WhenProgressiveNavigation || !this.state.progressive && !this.isNavigation && this.state.gtao >= Zl.WhenNavigation ? this.mixShader.uniforms.tDiffuse1.value = this.mainComposer.renderTarget2.texture : this.mixShader.uniforms.tDiffuse1.value = this.mainComposer.renderTarget1.texture, this.mixComposer.render());
  }
  animate() {
    var l;
    this.isDisposed || ((this.needUpdate || this.needContinuesUpdate) && ((l = this.extMan.selectedControllerExtension()) == null || l.updated(this.clock.getDelta()), this.needContinuesUpdate && this.navigationChanged(), (this.needContinuesUpdate || this.isNavigation) && this.sceneManager.degradeScene(), this.render(), this.processHover(), this.animBlock++, this.needUpdate = !1), this.animBlock > 2 && (this.animBlock = 0), this.animNumber = requestAnimationFrame(() => this.animate()));
  }
  requestUpdate(l = !0) {
    this.needUpdate = !0, l && (this.needRender = !0);
  }
  setContinuesUpdate(l) {
    this.needContinuesUpdate = l;
  }
  destroy() {
    super.destroy(), window.removeEventListener("resize", () => this.onResize), cancelAnimationFrame(this.animNumber), this.renderer.forceContextLoss(), this.renderer.dispose();
  }
  navigationEnded() {
    this.sceneManager.totalDegradedChilds > 0 ? (this.sceneManager.undegradeScene(), this.requestUpdate(!0)) : this.requestUpdate(), this.dispatchEvent(f.navend);
  }
  navigationStarted() {
    this.sceneManager.isNavigationStarted = !0, this.dispatchEvent(f.navstart);
  }
  navigationChanged() {
    this.dispatchEvent(f.navchange);
  }
  initEvents() {
    this.isTouchDevice || this.viewerElement.addEventListener("click", async (l) => {
      this.isSelectionLocked || this.sceneManager.updateSelection([this.hoveredElNum], l.ctrlKey), this.dispatchEvent(f.click), this.requestUpdate(!1);
    }, !0), this.isTouchDevice || this.viewerElement.addEventListener("dblclick", () => {
      this.sceneManager.selBox != null && (this.zoomCameraToSelection(), this.dispatchEvent(f.dblclick), this.requestUpdate());
    }), this.viewerElement.addEventListener(
      "pointerdown",
      (l) => {
        this.isTouchDevice && (this.startPointerTime = new Date().getTime());
        let c = 0, t = 0;
        l instanceof TouchEvent && l.changedTouches ? (c = l.changedTouches[0].pageX, t = l.changedTouches[0].pageY) : l instanceof PointerEvent && (c = l.offsetX, t = l.offsetY), this.startMousePointer.x = c, this.startMousePointer.y = t, this.isNavigation = !0, this.dispatchEvent(f.down);
      },
      !0
    ), this.viewerElement.addEventListener("pointerup", (l) => {
      if (this.isTouchDevice) {
        this.endPointerTime = new Date().getTime();
        const c = this.endPointerTime - this.startPointerTime;
        (!this.isFirstClick && c < 110 || this.isFirstClick && c < 200) && (this.isFirstClick ? (this.isFirstClick = !1, this.sceneManager.selBox != null && (this.zoomCameraToSelection(), this.dispatchEvent(f.dblclick), this.requestUpdate())) : (this.isFirstClick = !0, this.isNavigation = !1, this.onMouseMove(l), this.isSelectionLocked || this.sceneManager.updateSelection([this.hoveredElNum], !1), this.dispatchEvent(f.click), this.requestUpdate(!0), setTimeout(() => {
          this.isFirstClick && (this.isFirstClick = !1);
        }, 200)));
      }
      this.dispatchEvent(f.up), this.isNavigation = !1;
    }), this.viewerElement.addEventListener("pointermove", (l) => {
      this.onMouseMove(l), this.dispatchEvent(new f.move(l));
    }, !1), this.viewerElement.addEventListener("wheel", () => {
      this.dispatchEvent(f.wheel), this.sceneManager.undegradeScene(), this.requestUpdate(!0);
    }, { passive: !0 });
  }
  onMouseMove(l) {
    let c, t;
    const d = this.viewerElement.offsetWidth, s = this.viewerElement.offsetHeight;
    l instanceof TouchEvent && l.changedTouches ? (c = l.changedTouches[0].pageX, t = l.changedTouches[0].pageY) : (c = l.offsetX, t = l.offsetY), this.mousePointer.x = c, this.mousePointer.y = t, this.mouse.x = c / d * 2 - 1, this.mouse.y = -(t / s) * 2 + 1, this.requestUpdate(!1);
  }
  updateClippingPlanes(l) {
    this.stateMat.clippingPlanes = l;
  }
}
class yn {
  constructor() {
    Z(this, "renderMans", /* @__PURE__ */ new Map());
  }
  createRenderManager(e, l, c = void 0) {
    if (this.renderMans.has(e))
      return this.renderMans.get(e);
    {
      const t = new pn(e, l, c);
      return this.renderMans.set(e, t), t;
    }
  }
  addRenderManager(e, l) {
    this.renderMans.has(e) || this.renderMans.set(e, l);
  }
  getRenderManager(e = "default") {
    if (this.renderMans.has(e))
      return this.renderMans.get(e);
  }
}
function xe(n, e, l) {
  return Math.max(e, Math.min(l, n));
}
function Wn(n, e) {
  return (n % e + e) % e;
}
function Uc(n, e, l) {
  return (1 - l) * n + l * e;
}
const xl = "srgb", ee = "srgb-linear";
function uc(n) {
  return n < 0.04045 ? n * 0.0773993808 : Math.pow(n * 0.9478672986 + 0.0521327014, 2.4);
}
function hc(n) {
  return n < 31308e-7 ? n * 12.92 : 1.055 * Math.pow(n, 0.41666) - 0.055;
}
const wc = {
  [xl]: { [ee]: uc },
  [ee]: { [xl]: hc }
}, bl = {
  legacyMode: !0,
  get workingColorSpace() {
    return ee;
  },
  set workingColorSpace(n) {
    console.warn("THREE.ColorManagement: .workingColorSpace is readonly.");
  },
  convert: function(n, e, l) {
    if (this.legacyMode || e === l || !e || !l)
      return n;
    if (wc[e] && wc[e][l] !== void 0) {
      const c = wc[e][l];
      return n.r = c(n.r), n.g = c(n.g), n.b = c(n.b), n;
    }
    throw new Error("Unsupported color space conversion.");
  },
  fromWorkingColorSpace: function(n, e) {
    return this.convert(n, this.workingColorSpace, e);
  },
  toWorkingColorSpace: function(n, e) {
    return this.convert(n, e, this.workingColorSpace);
  }
}, $d = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, j = { r: 0, g: 0, b: 0 }, ml = { h: 0, s: 0, l: 0 }, cc = { h: 0, s: 0, l: 0 };
function Pc(n, e, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? n + (e - n) * 6 * l : l < 1 / 2 ? e : l < 2 / 3 ? n + (e - n) * 6 * (2 / 3 - l) : n;
}
function tc(n, e) {
  return e.r = n.r, e.g = n.g, e.b = n.b, e;
}
class Te {
  constructor(e, l, c) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, l === void 0 && c === void 0 ? this.set(e) : this.setRGB(e, l, c);
  }
  set(e) {
    return e && e.isColor ? this.copy(e) : typeof e == "number" ? this.setHex(e) : typeof e == "string" && this.setStyle(e), this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, l = xl) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, bl.toWorkingColorSpace(this, l), this;
  }
  setRGB(e, l, c, t = ee) {
    return this.r = e, this.g = l, this.b = c, bl.toWorkingColorSpace(this, t), this;
  }
  setHSL(e, l, c, t = ee) {
    if (e = Wn(e, 1), l = xe(l, 0, 1), c = xe(c, 0, 1), l === 0)
      this.r = this.g = this.b = c;
    else {
      const d = c <= 0.5 ? c * (1 + l) : c + l - c * l, s = 2 * c - d;
      this.r = Pc(s, d, e + 1 / 3), this.g = Pc(s, d, e), this.b = Pc(s, d, e - 1 / 3);
    }
    return bl.toWorkingColorSpace(this, t), this;
  }
  setStyle(e, l = xl) {
    function c(d) {
      d !== void 0 && parseFloat(d) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let t;
    if (t = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)) {
      let d;
      const s = t[1], i = t[2];
      switch (s) {
        case "rgb":
        case "rgba":
          if (d = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i))
            return this.r = Math.min(255, parseInt(d[1], 10)) / 255, this.g = Math.min(255, parseInt(d[2], 10)) / 255, this.b = Math.min(255, parseInt(d[3], 10)) / 255, bl.toWorkingColorSpace(this, l), c(d[4]), this;
          if (d = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i))
            return this.r = Math.min(100, parseInt(d[1], 10)) / 100, this.g = Math.min(100, parseInt(d[2], 10)) / 100, this.b = Math.min(100, parseInt(d[3], 10)) / 100, bl.toWorkingColorSpace(this, l), c(d[4]), this;
          break;
        case "hsl":
        case "hsla":
          if (d = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i)) {
            const a = parseFloat(d[1]) / 360, o = parseInt(d[2], 10) / 100, b = parseInt(d[3], 10) / 100;
            return c(d[4]), this.setHSL(a, o, b, l);
          }
          break;
      }
    } else if (t = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const d = t[1], s = d.length;
      if (s === 3)
        return this.r = parseInt(d.charAt(0) + d.charAt(0), 16) / 255, this.g = parseInt(d.charAt(1) + d.charAt(1), 16) / 255, this.b = parseInt(d.charAt(2) + d.charAt(2), 16) / 255, bl.toWorkingColorSpace(this, l), this;
      if (s === 6)
        return this.r = parseInt(d.charAt(0) + d.charAt(1), 16) / 255, this.g = parseInt(d.charAt(2) + d.charAt(3), 16) / 255, this.b = parseInt(d.charAt(4) + d.charAt(5), 16) / 255, bl.toWorkingColorSpace(this, l), this;
    }
    return e && e.length > 0 ? this.setColorName(e, l) : this;
  }
  setColorName(e, l = xl) {
    const c = $d[e.toLowerCase()];
    return c !== void 0 ? this.setHex(c, l) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = uc(e.r), this.g = uc(e.g), this.b = uc(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = hc(e.r), this.g = hc(e.g), this.b = hc(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = xl) {
    return bl.fromWorkingColorSpace(tc(this, j), e), xe(j.r * 255, 0, 255) << 16 ^ xe(j.g * 255, 0, 255) << 8 ^ xe(j.b * 255, 0, 255) << 0;
  }
  getHexString(e = xl) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, l = ee) {
    bl.fromWorkingColorSpace(tc(this, j), l);
    const c = j.r, t = j.g, d = j.b, s = Math.max(c, t, d), i = Math.min(c, t, d);
    let a, o;
    const b = (i + s) / 2;
    if (i === s)
      a = 0, o = 0;
    else {
      const m = s - i;
      switch (o = b <= 0.5 ? m / (s + i) : m / (2 - s - i), s) {
        case c:
          a = (t - d) / m + (t < d ? 6 : 0);
          break;
        case t:
          a = (d - c) / m + 2;
          break;
        case d:
          a = (c - t) / m + 4;
          break;
      }
      a /= 6;
    }
    return e.h = a, e.s = o, e.l = b, e;
  }
  getRGB(e, l = ee) {
    return bl.fromWorkingColorSpace(tc(this, j), l), e.r = j.r, e.g = j.g, e.b = j.b, e;
  }
  getStyle(e = xl) {
    return bl.fromWorkingColorSpace(tc(this, j), e), e !== xl ? `color(${e} ${j.r} ${j.g} ${j.b})` : `rgb(${j.r * 255 | 0},${j.g * 255 | 0},${j.b * 255 | 0})`;
  }
  offsetHSL(e, l, c) {
    return this.getHSL(ml), ml.h += e, ml.s += l, ml.l += c, this.setHSL(ml.h, ml.s, ml.l), this;
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, l) {
    return this.r = e.r + l.r, this.g = e.g + l.g, this.b = e.b + l.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, l) {
    return this.r += (e.r - this.r) * l, this.g += (e.g - this.g) * l, this.b += (e.b - this.b) * l, this;
  }
  lerpColors(e, l, c) {
    return this.r = e.r + (l.r - e.r) * c, this.g = e.g + (l.g - e.g) * c, this.b = e.b + (l.b - e.b) * c, this;
  }
  lerpHSL(e, l) {
    this.getHSL(ml), e.getHSL(cc);
    const c = Uc(ml.h, cc.h, l), t = Uc(ml.s, cc.s, l), d = Uc(ml.l, cc.l, l);
    return this.setHSL(c, t, d), this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, l = 0) {
    return this.r = e[l], this.g = e[l + 1], this.b = e[l + 2], this;
  }
  toArray(e = [], l = 0) {
    return e[l] = this.r, e[l + 1] = this.g, e[l + 2] = this.b, e;
  }
  fromBufferAttribute(e, l) {
    return this.r = e.getX(l), this.g = e.getY(l), this.b = e.getZ(l), e.normalized === !0 && (this.r /= 255, this.g /= 255, this.b /= 255), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
Te.NAMES = $d;
class Ic {
  constructor(e = 0, l = 0) {
    Ic.prototype.isVector2 = !0, this.x = e, this.y = l;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, l) {
    return this.x = e, this.y = l, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, l) {
    switch (e) {
      case 0:
        this.x = l;
        break;
      case 1:
        this.y = l;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e, l) {
    return l !== void 0 ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(e, l)) : (this.x += e.x, this.y += e.y, this);
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, l) {
    return this.x = e.x + l.x, this.y = e.y + l.y, this;
  }
  addScaledVector(e, l) {
    return this.x += e.x * l, this.y += e.y * l, this;
  }
  sub(e, l) {
    return l !== void 0 ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(e, l)) : (this.x -= e.x, this.y -= e.y, this);
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, l) {
    return this.x = e.x - l.x, this.y = e.y - l.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const l = this.x, c = this.y, t = e.elements;
    return this.x = t[0] * l + t[3] * c + t[6], this.y = t[1] * l + t[4] * c + t[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, l) {
    return this.x = Math.max(e.x, Math.min(l.x, this.x)), this.y = Math.max(e.y, Math.min(l.y, this.y)), this;
  }
  clampScalar(e, l) {
    return this.x = Math.max(e, Math.min(l, this.x)), this.y = Math.max(e, Math.min(l, this.y)), this;
  }
  clampLength(e, l) {
    const c = this.length();
    return this.divideScalar(c || 1).multiplyScalar(Math.max(e, Math.min(l, c)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x), this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const l = this.x - e.x, c = this.y - e.y;
    return l * l + c * c;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, l) {
    return this.x += (e.x - this.x) * l, this.y += (e.y - this.y) * l, this;
  }
  lerpVectors(e, l, c) {
    return this.x = e.x + (l.x - e.x) * c, this.y = e.y + (l.y - e.y) * c, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, l = 0) {
    return this.x = e[l], this.y = e[l + 1], this;
  }
  toArray(e = [], l = 0) {
    return e[l] = this.x, e[l + 1] = this.y, e;
  }
  fromBufferAttribute(e, l, c) {
    return c !== void 0 && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."), this.x = e.getX(l), this.y = e.getY(l), this;
  }
  rotateAround(e, l) {
    const c = Math.cos(l), t = Math.sin(l), d = this.x - e.x, s = this.y - e.y;
    return this.x = d * c - s * t + e.x, this.y = d * t + s * c + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class pe {
  constructor() {
    pe.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.");
  }
  set(e, l, c, t, d, s, i, a, o) {
    const b = this.elements;
    return b[0] = e, b[1] = t, b[2] = i, b[3] = l, b[4] = d, b[5] = a, b[6] = c, b[7] = s, b[8] = o, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(e) {
    const l = this.elements, c = e.elements;
    return l[0] = c[0], l[1] = c[1], l[2] = c[2], l[3] = c[3], l[4] = c[4], l[5] = c[5], l[6] = c[6], l[7] = c[7], l[8] = c[8], this;
  }
  extractBasis(e, l, c) {
    return e.setFromMatrix3Column(this, 0), l.setFromMatrix3Column(this, 1), c.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const l = e.elements;
    return this.set(
      l[0],
      l[4],
      l[8],
      l[1],
      l[5],
      l[9],
      l[2],
      l[6],
      l[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, l) {
    const c = e.elements, t = l.elements, d = this.elements, s = c[0], i = c[3], a = c[6], o = c[1], b = c[4], m = c[7], X = c[2], G = c[5], h = c[8], u = t[0], y = t[3], p = t[6], W = t[1], V = t[4], r = t[7], I = t[2], g = t[5], L = t[8];
    return d[0] = s * u + i * W + a * I, d[3] = s * y + i * V + a * g, d[6] = s * p + i * r + a * L, d[1] = o * u + b * W + m * I, d[4] = o * y + b * V + m * g, d[7] = o * p + b * r + m * L, d[2] = X * u + G * W + h * I, d[5] = X * y + G * V + h * g, d[8] = X * p + G * r + h * L, this;
  }
  multiplyScalar(e) {
    const l = this.elements;
    return l[0] *= e, l[3] *= e, l[6] *= e, l[1] *= e, l[4] *= e, l[7] *= e, l[2] *= e, l[5] *= e, l[8] *= e, this;
  }
  determinant() {
    const e = this.elements, l = e[0], c = e[1], t = e[2], d = e[3], s = e[4], i = e[5], a = e[6], o = e[7], b = e[8];
    return l * s * b - l * i * o - c * d * b + c * i * a + t * d * o - t * s * a;
  }
  invert() {
    const e = this.elements, l = e[0], c = e[1], t = e[2], d = e[3], s = e[4], i = e[5], a = e[6], o = e[7], b = e[8], m = b * s - i * o, X = i * a - b * d, G = o * d - s * a, h = l * m + c * X + t * G;
    if (h === 0)
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const u = 1 / h;
    return e[0] = m * u, e[1] = (t * o - b * c) * u, e[2] = (i * c - t * s) * u, e[3] = X * u, e[4] = (b * l - t * a) * u, e[5] = (t * d - i * l) * u, e[6] = G * u, e[7] = (c * a - o * l) * u, e[8] = (s * l - c * d) * u, this;
  }
  transpose() {
    let e;
    const l = this.elements;
    return e = l[1], l[1] = l[3], l[3] = e, e = l[2], l[2] = l[6], l[6] = e, e = l[5], l[5] = l[7], l[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const l = this.elements;
    return e[0] = l[0], e[1] = l[3], e[2] = l[6], e[3] = l[1], e[4] = l[4], e[5] = l[7], e[6] = l[2], e[7] = l[5], e[8] = l[8], this;
  }
  setUvTransform(e, l, c, t, d, s, i) {
    const a = Math.cos(d), o = Math.sin(d);
    return this.set(
      c * a,
      c * o,
      -c * (a * s + o * i) + s + e,
      -t * o,
      t * a,
      -t * (-o * s + a * i) + i + l,
      0,
      0,
      1
    ), this;
  }
  scale(e, l) {
    const c = this.elements;
    return c[0] *= e, c[3] *= e, c[6] *= e, c[1] *= l, c[4] *= l, c[7] *= l, this;
  }
  rotate(e) {
    const l = Math.cos(e), c = Math.sin(e), t = this.elements, d = t[0], s = t[3], i = t[6], a = t[1], o = t[4], b = t[7];
    return t[0] = l * d + c * a, t[3] = l * s + c * o, t[6] = l * i + c * b, t[1] = -c * d + l * a, t[4] = -c * s + l * o, t[7] = -c * i + l * b, this;
  }
  translate(e, l) {
    const c = this.elements;
    return c[0] += e * c[2], c[3] += e * c[5], c[6] += e * c[8], c[1] += l * c[2], c[4] += l * c[5], c[7] += l * c[8], this;
  }
  equals(e) {
    const l = this.elements, c = e.elements;
    for (let t = 0; t < 9; t++)
      if (l[t] !== c[t])
        return !1;
    return !0;
  }
  fromArray(e, l = 0) {
    for (let c = 0; c < 9; c++)
      this.elements[c] = e[c + l];
    return this;
  }
  toArray(e = [], l = 0) {
    const c = this.elements;
    return e[l] = c[0], e[l + 1] = c[1], e[l + 2] = c[2], e[l + 3] = c[3], e[l + 4] = c[4], e[l + 5] = c[5], e[l + 6] = c[6], e[l + 7] = c[7], e[l + 8] = c[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const md = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Te(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    uvTransform: { value: /* @__PURE__ */ new pe() },
    uv2Transform: { value: /* @__PURE__ */ new pe() },
    alphaMap: { value: null },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null }
  },
  envmap: {
    envMap: { value: null },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    ior: { value: 1.5 },
    refractionRatio: { value: 0.98 }
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 }
  },
  emissivemap: {
    emissiveMap: { value: null }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalScale: { value: /* @__PURE__ */ new Ic(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  roughnessmap: {
    roughnessMap: { value: null }
  },
  metalnessmap: {
    metalnessMap: { value: null }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Te(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotShadowMap: { value: [] },
    spotShadowMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Te(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new pe() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Te(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Ic(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    alphaMap: { value: null },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new pe() }
  }
};
function Vn(n) {
  const e = {};
  for (const l in n) {
    e[l] = {};
    for (const c in n[l]) {
      const t = n[l][c];
      t && (t.isColor || t.isMatrix3 || t.isMatrix4 || t.isVector2 || t.isVector3 || t.isVector4 || t.isTexture || t.isQuaternion) ? e[l][c] = t.clone() : Array.isArray(t) ? e[l][c] = t.slice() : e[l][c] = t;
    }
  }
  return e;
}
function rn(n) {
  const e = {};
  for (let l = 0; l < n.length; l++) {
    const c = Vn(n[l]);
    for (const t in c)
      e[t] = c[t];
  }
  return e;
}
const Ln = `#define PHONG

varying vec3 vViewPosition;

#ifndef FLAT_SHADED
varying vec3 vNormal;
#endif

#include <common>

#if defined( USE_COLOR_ALPHA )
varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
varying vec3 vColor;
#endif

#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute float empty;
attribute float state_1;
attribute float _elementnum;

varying float isEmpty;
varying float state;
varying float elementnum;

void main() {

	elementnum = _elementnum;

	//#include <uv_vertex>
	//#include <uv2_vertex>
	#include <color_vertex>	
	#include <beginnormal_vertex>
	//#include <morphnormal_vertex>
	//#include <skinbase_vertex>
	//#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

	vNormal = normalize(transformedNormal);

#endif

	#include <begin_vertex>	
	//#include <morphtarget_vertex>
	//#include <skinning_vertex>
	//#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = -mvPosition.xyz;

	if(empty > 0.0)
		isEmpty = 1.0;


	state = state_1;

	//vColor = color;

	#include <worldpos_vertex>
	//#include <envmap_vertex>
	//#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Rn = `#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>

#if defined( USE_COLOR_ALPHA )
varying vec4 vColor;
#elif defined( USE_COLOR )
varying vec3 vColor;
#endif

//#include <uv_pars_fragment>
//#include <uv2_pars_fragment>
//#include <map_pars_fragment>
//#include <alphamap_pars_fragment>
//#include <aomap_pars_fragment>
//#include <lightmap_pars_fragment>
//#include <emissivemap_pars_fragment>
//#include <envmap_common_pars_fragment>
//#include <envmap_pars_fragment>
//#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
//#include <shadowmap_pars_fragment>
//#include <bumpmap_pars_fragment>
//#include <normalmap_pars_fragment>
//#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying float isEmpty;
varying float state;
varying float elementnum;

void main() {

	if(state < -0.9 && state > -1.1)
		discard;	


	vec4 diffuseColor = vec4(diffuse, opacity);

	if(state < 1.1 && state > 0.9)
		diffuseColor = vec4(vec3(0.8), opacity);
	else if(state > -3.1 && state < -2.9)
		diffuseColor = vec4(vec3(1.0), 0.1);
	else if(state < 2.1 && state > 1.9)
		diffuseColor = vec4(diffuse, opacity / 3.0);

	ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	//#include <map_fragment>

	#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
	#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
	#endif

	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	//#include <emissivemap_fragment>

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	//#include <lights_fragment_maps>
	#include <lights_fragment_end>
	
	// modulation
	//	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	//#include <envmap_fragment>

	if(isEmpty > 0.0 || state > -2.1 && state < -1.9) {
		vec2 p = vec2(floor(gl_FragCoord.x), floor(gl_FragCoord.y));

		if(mod(p.y + p.x, 6.0) == 0.0)
			gl_FragColor = vec4(0, 0, 0, 0.7);
		else
			gl_FragColor = vec4(outgoingLight, 0.4);
	} else
		gl_FragColor = vec4(outgoingLight, diffuseColor.a);

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
	#include <clipping_planes_fragment>

}`, ls = "dmFyIFFoPU9iamVjdC5kZWZpbmVQcm9wZXJ0eTt2YXIgdGM9KEN0LGN0LHV0KT0+Y3QgaW4gQ3Q/UWgoQ3QsY3Qse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOnV0fSk6Q3RbY3RdPXV0O3ZhciBFPShDdCxjdCx1dCk9Pih0YyhDdCx0eXBlb2YgY3QhPSJzeW1ib2wiP2N0KyIiOmN0LHV0KSx1dCk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIEN0KGMpe3JldHVybiBjJiZjLl9fZXNNb2R1bGUmJk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjLCJkZWZhdWx0Iik/Yy5kZWZhdWx0OmN9dmFyIGN0PXtleHBvcnRzOnt9fSx1dD17ZXhwb3J0czp7fX0sSGk9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIGk9bmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpLG49MDtuPGkubGVuZ3RoO24rKylpW25dPWFyZ3VtZW50c1tuXTtyZXR1cm4gdC5hcHBseShlLGkpfX0sTnI9SGksX3M9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxTcz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24odCl7dmFyIGU9X3MuY2FsbCh0KTtyZXR1cm4gY1tlXXx8KGNbZV09ZS5zbGljZSg4LC0xKS50b0xvd2VyQ2FzZSgpKX19KE9iamVjdC5jcmVhdGUobnVsbCkpO2Z1bmN0aW9uIGt0KGMpe3JldHVybiBjPWMudG9Mb3dlckNhc2UoKSxmdW5jdGlvbihlKXtyZXR1cm4gU3MoZSk9PT1jfX1mdW5jdGlvbiBBcyhjKXtyZXR1cm4gQXJyYXkuaXNBcnJheShjKX1mdW5jdGlvbiBPZShjKXtyZXR1cm4gdHlwZW9mIGM+InUifWZ1bmN0aW9uIERyKGMpe3JldHVybiBjIT09bnVsbCYmIU9lKGMpJiZjLmNvbnN0cnVjdG9yIT09bnVsbCYmIU9lKGMuY29uc3RydWN0b3IpJiZ0eXBlb2YgYy5jb25zdHJ1Y3Rvci5pc0J1ZmZlcj09ImZ1bmN0aW9uIiYmYy5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihjKX12YXIgamk9a3QoIkFycmF5QnVmZmVyIik7ZnVuY3Rpb24gT3IoYyl7dmFyIHQ7cmV0dXJuIHR5cGVvZiBBcnJheUJ1ZmZlcjwidSImJkFycmF5QnVmZmVyLmlzVmlldz90PUFycmF5QnVmZmVyLmlzVmlldyhjKTp0PWMmJmMuYnVmZmVyJiZqaShjLmJ1ZmZlciksdH1mdW5jdGlvbiBQcihjKXtyZXR1cm4gdHlwZW9mIGM9PSJzdHJpbmcifWZ1bmN0aW9uIFVyKGMpe3JldHVybiB0eXBlb2YgYz09Im51bWJlciJ9ZnVuY3Rpb24gV2koYyl7cmV0dXJuIGMhPT1udWxsJiZ0eXBlb2YgYz09Im9iamVjdCJ9ZnVuY3Rpb24gUGUoYyl7aWYoU3MoYykhPT0ib2JqZWN0IilyZXR1cm4hMTt2YXIgdD1PYmplY3QuZ2V0UHJvdG90eXBlT2YoYyk7cmV0dXJuIHQ9PT1udWxsfHx0PT09T2JqZWN0LnByb3RvdHlwZX12YXIgVnI9a3QoIkRhdGUiKSxIcj1rdCgiRmlsZSIpLGpyPWt0KCJCbG9iIiksV3I9a3QoIkZpbGVMaXN0Iik7ZnVuY3Rpb24gVHMoYyl7cmV0dXJuIF9zLmNhbGwoYyk9PT0iW29iamVjdCBGdW5jdGlvbl0ifWZ1bmN0aW9uIEdyKGMpe3JldHVybiBXaShjKSYmVHMoYy5waXBlKX1mdW5jdGlvbiBxcihjKXt2YXIgdD0iW29iamVjdCBGb3JtRGF0YV0iO3JldHVybiBjJiYodHlwZW9mIEZvcm1EYXRhPT0iZnVuY3Rpb24iJiZjIGluc3RhbmNlb2YgRm9ybURhdGF8fF9zLmNhbGwoYyk9PT10fHxUcyhjLnRvU3RyaW5nKSYmYy50b1N0cmluZygpPT09dCl9dmFyIFpyPWt0KCJVUkxTZWFyY2hQYXJhbXMiKTtmdW5jdGlvbiBYcihjKXtyZXR1cm4gYy50cmltP2MudHJpbSgpOmMucmVwbGFjZSgvXlxzK3xccyskL2csIiIpfWZ1bmN0aW9uIFlyKCl7cmV0dXJuIHR5cGVvZiBuYXZpZ2F0b3I8InUiJiYobmF2aWdhdG9yLnByb2R1Y3Q9PT0iUmVhY3ROYXRpdmUifHxuYXZpZ2F0b3IucHJvZHVjdD09PSJOYXRpdmVTY3JpcHQifHxuYXZpZ2F0b3IucHJvZHVjdD09PSJOUyIpPyExOnR5cGVvZiB3aW5kb3c8InUiJiZ0eXBlb2YgZG9jdW1lbnQ8InUifWZ1bmN0aW9uIEVzKGMsdCl7aWYoIShjPT09bnVsbHx8dHlwZW9mIGM+InUiKSlpZih0eXBlb2YgYyE9Im9iamVjdCImJihjPVtjXSksQXMoYykpZm9yKHZhciBlPTAscz1jLmxlbmd0aDtlPHM7ZSsrKXQuY2FsbChudWxsLGNbZV0sZSxjKTtlbHNlIGZvcih2YXIgaSBpbiBjKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjLGkpJiZ0LmNhbGwobnVsbCxjW2ldLGksYyl9ZnVuY3Rpb24gdnMoKXt2YXIgYz17fTtmdW5jdGlvbiB0KGksbil7UGUoY1tuXSkmJlBlKGkpP2Nbbl09dnMoY1tuXSxpKTpQZShpKT9jW25dPXZzKHt9LGkpOkFzKGkpP2Nbbl09aS5zbGljZSgpOmNbbl09aX1mb3IodmFyIGU9MCxzPWFyZ3VtZW50cy5sZW5ndGg7ZTxzO2UrKylFcyhhcmd1bWVudHNbZV0sdCk7cmV0dXJuIGN9ZnVuY3Rpb24gJHIoYyx0LGUpe3JldHVybiBFcyh0LGZ1bmN0aW9uKGksbil7ZSYmdHlwZW9mIGk9PSJmdW5jdGlvbiI/Y1tuXT1OcihpLGUpOmNbbl09aX0pLGN9ZnVuY3Rpb24gSnIoYyl7cmV0dXJuIGMuY2hhckNvZGVBdCgwKT09PTY1Mjc5JiYoYz1jLnNsaWNlKDEpKSxjfWZ1bmN0aW9uIEtyKGMsdCxlLHMpe2MucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodC5wcm90b3R5cGUscyksYy5wcm90b3R5cGUuY29uc3RydWN0b3I9YyxlJiZPYmplY3QuYXNzaWduKGMucHJvdG90eXBlLGUpfWZ1bmN0aW9uIFFyKGMsdCxlKXt2YXIgcyxpLG4scj17fTt0PXR8fHt9O2Rve2ZvcihzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGMpLGk9cy5sZW5ndGg7aS0tID4wOyluPXNbaV0scltuXXx8KHRbbl09Y1tuXSxyW25dPSEwKTtjPU9iamVjdC5nZXRQcm90b3R5cGVPZihjKX13aGlsZShjJiYoIWV8fGUoYyx0KSkmJmMhPT1PYmplY3QucHJvdG90eXBlKTtyZXR1cm4gdH1mdW5jdGlvbiB0byhjLHQsZSl7Yz1TdHJpbmcoYyksKGU9PT12b2lkIDB8fGU+Yy5sZW5ndGgpJiYoZT1jLmxlbmd0aCksZS09dC5sZW5ndGg7dmFyIHM9Yy5pbmRleE9mKHQsZSk7cmV0dXJuIHMhPT0tMSYmcz09PWV9ZnVuY3Rpb24gZW8oYyl7aWYoIWMpcmV0dXJuIG51bGw7dmFyIHQ9Yy5sZW5ndGg7aWYoT2UodCkpcmV0dXJuIG51bGw7Zm9yKHZhciBlPW5ldyBBcnJheSh0KTt0LS0gPjA7KWVbdF09Y1t0XTtyZXR1cm4gZX12YXIgc289ZnVuY3Rpb24oYyl7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiBjJiZ0IGluc3RhbmNlb2YgY319KHR5cGVvZiBVaW50OEFycmF5PCJ1IiYmT2JqZWN0LmdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKSxHPXtpc0FycmF5OkFzLGlzQXJyYXlCdWZmZXI6amksaXNCdWZmZXI6RHIsaXNGb3JtRGF0YTpxcixpc0FycmF5QnVmZmVyVmlldzpPcixpc1N0cmluZzpQcixpc051bWJlcjpVcixpc09iamVjdDpXaSxpc1BsYWluT2JqZWN0OlBlLGlzVW5kZWZpbmVkOk9lLGlzRGF0ZTpWcixpc0ZpbGU6SHIsaXNCbG9iOmpyLGlzRnVuY3Rpb246VHMsaXNTdHJlYW06R3IsaXNVUkxTZWFyY2hQYXJhbXM6WnIsaXNTdGFuZGFyZEJyb3dzZXJFbnY6WXIsZm9yRWFjaDpFcyxtZXJnZTp2cyxleHRlbmQ6JHIsdHJpbTpYcixzdHJpcEJPTTpKcixpbmhlcml0czpLcix0b0ZsYXRPYmplY3Q6UXIsa2luZE9mOlNzLGtpbmRPZlRlc3Q6a3QsZW5kc1dpdGg6dG8sdG9BcnJheTplbyxpc1R5cGVkQXJyYXk6c28saXNGaWxlTGlzdDpXcn0sSHQ9RztmdW5jdGlvbiBHaShjKXtyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGMpLnJlcGxhY2UoLyUzQS9naSwiOiIpLnJlcGxhY2UoLyUyNC9nLCIkIikucmVwbGFjZSgvJTJDL2dpLCIsIikucmVwbGFjZSgvJTIwL2csIisiKS5yZXBsYWNlKC8lNUIvZ2ksIlsiKS5yZXBsYWNlKC8lNUQvZ2ksIl0iKX12YXIgcWk9ZnVuY3Rpb24odCxlLHMpe2lmKCFlKXJldHVybiB0O3ZhciBpO2lmKHMpaT1zKGUpO2Vsc2UgaWYoSHQuaXNVUkxTZWFyY2hQYXJhbXMoZSkpaT1lLnRvU3RyaW5nKCk7ZWxzZXt2YXIgbj1bXTtIdC5mb3JFYWNoKGUsZnVuY3Rpb24oYSxoKXthPT09bnVsbHx8dHlwZW9mIGE+InUifHwoSHQuaXNBcnJheShhKT9oPWgrIltdIjphPVthXSxIdC5mb3JFYWNoKGEsZnVuY3Rpb24odSl7SHQuaXNEYXRlKHUpP3U9dS50b0lTT1N0cmluZygpOkh0LmlzT2JqZWN0KHUpJiYodT1KU09OLnN0cmluZ2lmeSh1KSksbi5wdXNoKEdpKGgpKyI9IitHaSh1KSl9KSl9KSxpPW4uam9pbigiJiIpfWlmKGkpe3ZhciByPXQuaW5kZXhPZigiIyIpO3IhPT0tMSYmKHQ9dC5zbGljZSgwLHIpKSx0Kz0odC5pbmRleE9mKCI/Iik9PT0tMT8iPyI6IiYiKStpfXJldHVybiB0fSxpbz1HO2Z1bmN0aW9uIFVlKCl7dGhpcy5oYW5kbGVycz1bXX1VZS5wcm90b3R5cGUudXNlPWZ1bmN0aW9uKHQsZSxzKXtyZXR1cm4gdGhpcy5oYW5kbGVycy5wdXNoKHtmdWxmaWxsZWQ6dCxyZWplY3RlZDplLHN5bmNocm9ub3VzOnM/cy5zeW5jaHJvbm91czohMSxydW5XaGVuOnM/cy5ydW5XaGVuOm51bGx9KSx0aGlzLmhhbmRsZXJzLmxlbmd0aC0xfSxVZS5wcm90b3R5cGUuZWplY3Q9ZnVuY3Rpb24odCl7dGhpcy5oYW5kbGVyc1t0XSYmKHRoaXMuaGFuZGxlcnNbdF09bnVsbCl9LFVlLnByb3RvdHlwZS5mb3JFYWNoPWZ1bmN0aW9uKHQpe2lvLmZvckVhY2godGhpcy5oYW5kbGVycyxmdW5jdGlvbihzKXtzIT09bnVsbCYmdChzKX0pfTt2YXIgbm89VWUscm89Ryxvbz1mdW5jdGlvbih0LGUpe3JvLmZvckVhY2godCxmdW5jdGlvbihpLG4pe24hPT1lJiZuLnRvVXBwZXJDYXNlKCk9PT1lLnRvVXBwZXJDYXNlKCkmJih0W2VdPWksZGVsZXRlIHRbbl0pfSl9LFppPUc7ZnVuY3Rpb24ganQoYyx0LGUscyxpKXtFcnJvci5jYWxsKHRoaXMpLHRoaXMubWVzc2FnZT1jLHRoaXMubmFtZT0iQXhpb3NFcnJvciIsdCYmKHRoaXMuY29kZT10KSxlJiYodGhpcy5jb25maWc9ZSkscyYmKHRoaXMucmVxdWVzdD1zKSxpJiYodGhpcy5yZXNwb25zZT1pKX1aaS5pbmhlcml0cyhqdCxFcnJvcix7dG9KU09OOmZ1bmN0aW9uKCl7cmV0dXJue21lc3NhZ2U6dGhpcy5tZXNzYWdlLG5hbWU6dGhpcy5uYW1lLGRlc2NyaXB0aW9uOnRoaXMuZGVzY3JpcHRpb24sbnVtYmVyOnRoaXMubnVtYmVyLGZpbGVOYW1lOnRoaXMuZmlsZU5hbWUsbGluZU51bWJlcjp0aGlzLmxpbmVOdW1iZXIsY29sdW1uTnVtYmVyOnRoaXMuY29sdW1uTnVtYmVyLHN0YWNrOnRoaXMuc3RhY2ssY29uZmlnOnRoaXMuY29uZmlnLGNvZGU6dGhpcy5jb2RlLHN0YXR1czp0aGlzLnJlc3BvbnNlJiZ0aGlzLnJlc3BvbnNlLnN0YXR1cz90aGlzLnJlc3BvbnNlLnN0YXR1czpudWxsfX19KTt2YXIgWGk9anQucHJvdG90eXBlLFlpPXt9O1siRVJSX0JBRF9PUFRJT05fVkFMVUUiLCJFUlJfQkFEX09QVElPTiIsIkVDT05OQUJPUlRFRCIsIkVUSU1FRE9VVCIsIkVSUl9ORVRXT1JLIiwiRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUyIsIkVSUl9ERVBSRUNBVEVEIiwiRVJSX0JBRF9SRVNQT05TRSIsIkVSUl9CQURfUkVRVUVTVCIsIkVSUl9DQU5DRUxFRCJdLmZvckVhY2goZnVuY3Rpb24oYyl7WWlbY109e3ZhbHVlOmN9fSksT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoanQsWWkpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYaSwiaXNBeGlvc0Vycm9yIix7dmFsdWU6ITB9KSxqdC5mcm9tPWZ1bmN0aW9uKGMsdCxlLHMsaSxuKXt2YXIgcj1PYmplY3QuY3JlYXRlKFhpKTtyZXR1cm4gWmkudG9GbGF0T2JqZWN0KGMscixmdW5jdGlvbihhKXtyZXR1cm4gYSE9PUVycm9yLnByb3RvdHlwZX0pLGp0LmNhbGwocixjLm1lc3NhZ2UsdCxlLHMsaSksci5uYW1lPWMubmFtZSxuJiZPYmplY3QuYXNzaWduKHIsbikscn07dmFyIFd0PWp0LCRpPXtzaWxlbnRKU09OUGFyc2luZzohMCxmb3JjZWRKU09OUGFyc2luZzohMCxjbGFyaWZ5VGltZW91dEVycm9yOiExfSxzdD1HO2Z1bmN0aW9uIGFvKGMsdCl7dD10fHxuZXcgRm9ybURhdGE7dmFyIGU9W107ZnVuY3Rpb24gcyhuKXtyZXR1cm4gbj09PW51bGw/IiI6c3QuaXNEYXRlKG4pP24udG9JU09TdHJpbmcoKTpzdC5pc0FycmF5QnVmZmVyKG4pfHxzdC5pc1R5cGVkQXJyYXkobik/dHlwZW9mIEJsb2I9PSJmdW5jdGlvbiI/bmV3IEJsb2IoW25dKTpCdWZmZXIuZnJvbShuKTpufWZ1bmN0aW9uIGkobixyKXtpZihzdC5pc1BsYWluT2JqZWN0KG4pfHxzdC5pc0FycmF5KG4pKXtpZihlLmluZGV4T2YobikhPT0tMSl0aHJvdyBFcnJvcigiQ2lyY3VsYXIgcmVmZXJlbmNlIGRldGVjdGVkIGluICIrcik7ZS5wdXNoKG4pLHN0LmZvckVhY2gobixmdW5jdGlvbihhLGgpe2lmKCFzdC5pc1VuZGVmaW5lZChhKSl7dmFyIGw9cj9yKyIuIitoOmgsdTtpZihhJiYhciYmdHlwZW9mIGE9PSJvYmplY3QiKXtpZihzdC5lbmRzV2l0aChoLCJ7fSIpKWE9SlNPTi5zdHJpbmdpZnkoYSk7ZWxzZSBpZihzdC5lbmRzV2l0aChoLCJbXSIpJiYodT1zdC50b0FycmF5KGEpKSl7dS5mb3JFYWNoKGZ1bmN0aW9uKGQpeyFzdC5pc1VuZGVmaW5lZChkKSYmdC5hcHBlbmQobCxzKGQpKX0pO3JldHVybn19aShhLGwpfX0pLGUucG9wKCl9ZWxzZSB0LmFwcGVuZChyLHMobikpfXJldHVybiBpKGMpLHR9dmFyIEppPWFvLHpzLEtpO2Z1bmN0aW9uIGhvKCl7aWYoS2kpcmV0dXJuIHpzO0tpPTE7dmFyIGM9V3Q7cmV0dXJuIHpzPWZ1bmN0aW9uKGUscyxpKXt2YXIgbj1pLmNvbmZpZy52YWxpZGF0ZVN0YXR1czshaS5zdGF0dXN8fCFufHxuKGkuc3RhdHVzKT9lKGkpOnMobmV3IGMoIlJlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgIitpLnN0YXR1cyxbYy5FUlJfQkFEX1JFUVVFU1QsYy5FUlJfQkFEX1JFU1BPTlNFXVtNYXRoLmZsb29yKGkuc3RhdHVzLzEwMCktNF0saS5jb25maWcsaS5yZXF1ZXN0LGkpKX0senN9dmFyIFJzLFFpO2Z1bmN0aW9uIGNvKCl7aWYoUWkpcmV0dXJuIFJzO1FpPTE7dmFyIGM9RztyZXR1cm4gUnM9Yy5pc1N0YW5kYXJkQnJvd3NlckVudigpP2Z1bmN0aW9uKCl7cmV0dXJue3dyaXRlOmZ1bmN0aW9uKHMsaSxuLHIsbyxhKXt2YXIgaD1bXTtoLnB1c2gocysiPSIrZW5jb2RlVVJJQ29tcG9uZW50KGkpKSxjLmlzTnVtYmVyKG4pJiZoLnB1c2goImV4cGlyZXM9IituZXcgRGF0ZShuKS50b0dNVFN0cmluZygpKSxjLmlzU3RyaW5nKHIpJiZoLnB1c2goInBhdGg9IityKSxjLmlzU3RyaW5nKG8pJiZoLnB1c2goImRvbWFpbj0iK28pLGE9PT0hMCYmaC5wdXNoKCJzZWN1cmUiKSxkb2N1bWVudC5jb29raWU9aC5qb2luKCI7ICIpfSxyZWFkOmZ1bmN0aW9uKHMpe3ZhciBpPWRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCIoXnw7XFxzKikoIitzKyIpPShbXjtdKikiKSk7cmV0dXJuIGk/ZGVjb2RlVVJJQ29tcG9uZW50KGlbM10pOm51bGx9LHJlbW92ZTpmdW5jdGlvbihzKXt0aGlzLndyaXRlKHMsIiIsRGF0ZS5ub3coKS04NjRlNSl9fX0oKTpmdW5jdGlvbigpe3JldHVybnt3cml0ZTpmdW5jdGlvbigpe30scmVhZDpmdW5jdGlvbigpe3JldHVybiBudWxsfSxyZW1vdmU6ZnVuY3Rpb24oKXt9fX0oKSxSc312YXIgbG89ZnVuY3Rpb24odCl7cmV0dXJuL14oW2Etel1bYS16XGQrXC0uXSo6KT9cL1wvL2kudGVzdCh0KX0sdW89ZnVuY3Rpb24odCxlKXtyZXR1cm4gZT90LnJlcGxhY2UoL1wvKyQvLCIiKSsiLyIrZS5yZXBsYWNlKC9eXC8rLywiIik6dH0sZm89bG8scG89dW8sdG49ZnVuY3Rpb24odCxlKXtyZXR1cm4gdCYmIWZvKGUpP3BvKHQsZSk6ZX0sQnMsZW47ZnVuY3Rpb24gbW8oKXtpZihlbilyZXR1cm4gQnM7ZW49MTt2YXIgYz1HLHQ9WyJhZ2UiLCJhdXRob3JpemF0aW9uIiwiY29udGVudC1sZW5ndGgiLCJjb250ZW50LXR5cGUiLCJldGFnIiwiZXhwaXJlcyIsImZyb20iLCJob3N0IiwiaWYtbW9kaWZpZWQtc2luY2UiLCJpZi11bm1vZGlmaWVkLXNpbmNlIiwibGFzdC1tb2RpZmllZCIsImxvY2F0aW9uIiwibWF4LWZvcndhcmRzIiwicHJveHktYXV0aG9yaXphdGlvbiIsInJlZmVyZXIiLCJyZXRyeS1hZnRlciIsInVzZXItYWdlbnQiXTtyZXR1cm4gQnM9ZnVuY3Rpb24ocyl7dmFyIGk9e30sbixyLG87cmV0dXJuIHMmJmMuZm9yRWFjaChzLnNwbGl0KGAKYCksZnVuY3Rpb24oaCl7aWYobz1oLmluZGV4T2YoIjoiKSxuPWMudHJpbShoLnN1YnN0cigwLG8pKS50b0xvd2VyQ2FzZSgpLHI9Yy50cmltKGguc3Vic3RyKG8rMSkpLG4pe2lmKGlbbl0mJnQuaW5kZXhPZihuKT49MClyZXR1cm47bj09PSJzZXQtY29va2llIj9pW25dPShpW25dP2lbbl06W10pLmNvbmNhdChbcl0pOmlbbl09aVtuXT9pW25dKyIsICIrcjpyfX0pLGl9LEJzfXZhciBMcyxzbjtmdW5jdGlvbiB5bygpe2lmKHNuKXJldHVybiBMcztzbj0xO3ZhciBjPUc7cmV0dXJuIExzPWMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKT9mdW5jdGlvbigpe3ZhciBlPS8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkscz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJhIiksaTtmdW5jdGlvbiBuKHIpe3ZhciBvPXI7cmV0dXJuIGUmJihzLnNldEF0dHJpYnV0ZSgiaHJlZiIsbyksbz1zLmhyZWYpLHMuc2V0QXR0cmlidXRlKCJocmVmIixvKSx7aHJlZjpzLmhyZWYscHJvdG9jb2w6cy5wcm90b2NvbD9zLnByb3RvY29sLnJlcGxhY2UoLzokLywiIik6IiIsaG9zdDpzLmhvc3Qsc2VhcmNoOnMuc2VhcmNoP3Muc2VhcmNoLnJlcGxhY2UoL15cPy8sIiIpOiIiLGhhc2g6cy5oYXNoP3MuaGFzaC5yZXBsYWNlKC9eIy8sIiIpOiIiLGhvc3RuYW1lOnMuaG9zdG5hbWUscG9ydDpzLnBvcnQscGF0aG5hbWU6cy5wYXRobmFtZS5jaGFyQXQoMCk9PT0iLyI/cy5wYXRobmFtZToiLyIrcy5wYXRobmFtZX19cmV0dXJuIGk9bih3aW5kb3cubG9jYXRpb24uaHJlZiksZnVuY3Rpb24obyl7dmFyIGE9Yy5pc1N0cmluZyhvKT9uKG8pOm87cmV0dXJuIGEucHJvdG9jb2w9PT1pLnByb3RvY29sJiZhLmhvc3Q9PT1pLmhvc3R9fSgpOmZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuITB9fSgpLExzfXZhciBGcyxubjtmdW5jdGlvbiBWZSgpe2lmKG5uKXJldHVybiBGcztubj0xO3ZhciBjPVd0LHQ9RztmdW5jdGlvbiBlKHMpe2MuY2FsbCh0aGlzLHM9PW51bGw/ImNhbmNlbGVkIjpzLGMuRVJSX0NBTkNFTEVEKSx0aGlzLm5hbWU9IkNhbmNlbGVkRXJyb3IifXJldHVybiB0LmluaGVyaXRzKGUsYyx7X19DQU5DRUxfXzohMH0pLEZzPWUsRnN9dmFyIElzLHJuO2Z1bmN0aW9uIGdvKCl7cmV0dXJuIHJufHwocm49MSxJcz1mdW5jdGlvbih0KXt2YXIgZT0vXihbLStcd117MSwyNX0pKDo/XC9cL3w6KS8uZXhlYyh0KTtyZXR1cm4gZSYmZVsxXXx8IiJ9KSxJc312YXIgQ3Msb247ZnVuY3Rpb24gYW4oKXtpZihvbilyZXR1cm4gQ3M7b249MTt2YXIgYz1HLHQ9aG8oKSxlPWNvKCkscz1xaSxpPXRuLG49bW8oKSxyPXlvKCksbz0kaSxhPVd0LGg9VmUoKSxsPWdvKCk7cmV0dXJuIENzPWZ1bmN0aW9uKGQpe3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihwLG0pe3ZhciBnPWQuZGF0YSx5PWQuaGVhZGVycyxNPWQucmVzcG9uc2VUeXBlLHc7ZnVuY3Rpb24gXygpe2QuY2FuY2VsVG9rZW4mJmQuY2FuY2VsVG9rZW4udW5zdWJzY3JpYmUodyksZC5zaWduYWwmJmQuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoImFib3J0Iix3KX1jLmlzRm9ybURhdGEoZykmJmMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSYmZGVsZXRlIHlbIkNvbnRlbnQtVHlwZSJdO3ZhciBiPW5ldyBYTUxIdHRwUmVxdWVzdDtpZihkLmF1dGgpe3ZhciBBPWQuYXV0aC51c2VybmFtZXx8IiIsUz1kLmF1dGgucGFzc3dvcmQ/dW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGQuYXV0aC5wYXNzd29yZCkpOiIiO3kuQXV0aG9yaXphdGlvbj0iQmFzaWMgIitidG9hKEErIjoiK1MpfXZhciB2PWkoZC5iYXNlVVJMLGQudXJsKTtiLm9wZW4oZC5tZXRob2QudG9VcHBlckNhc2UoKSxzKHYsZC5wYXJhbXMsZC5wYXJhbXNTZXJpYWxpemVyKSwhMCksYi50aW1lb3V0PWQudGltZW91dDtmdW5jdGlvbiBrKCl7aWYoISFiKXt2YXIgUj0iZ2V0QWxsUmVzcG9uc2VIZWFkZXJzImluIGI/bihiLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTpudWxsLFQ9IU18fE09PT0idGV4dCJ8fE09PT0ianNvbiI/Yi5yZXNwb25zZVRleHQ6Yi5yZXNwb25zZSxEPXtkYXRhOlQsc3RhdHVzOmIuc3RhdHVzLHN0YXR1c1RleHQ6Yi5zdGF0dXNUZXh0LGhlYWRlcnM6Uixjb25maWc6ZCxyZXF1ZXN0OmJ9O3QoZnVuY3Rpb24oWSl7cChZKSxfKCl9LGZ1bmN0aW9uKFkpe20oWSksXygpfSxEKSxiPW51bGx9fWlmKCJvbmxvYWRlbmQiaW4gYj9iLm9ubG9hZGVuZD1rOmIub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7IWJ8fGIucmVhZHlTdGF0ZSE9PTR8fGIuc3RhdHVzPT09MCYmIShiLnJlc3BvbnNlVVJMJiZiLnJlc3BvbnNlVVJMLmluZGV4T2YoImZpbGU6Iik9PT0wKXx8c2V0VGltZW91dChrKX0sYi5vbmFib3J0PWZ1bmN0aW9uKCl7IWJ8fChtKG5ldyBhKCJSZXF1ZXN0IGFib3J0ZWQiLGEuRUNPTk5BQk9SVEVELGQsYikpLGI9bnVsbCl9LGIub25lcnJvcj1mdW5jdGlvbigpe20obmV3IGEoIk5ldHdvcmsgRXJyb3IiLGEuRVJSX05FVFdPUkssZCxiLGIpKSxiPW51bGx9LGIub250aW1lb3V0PWZ1bmN0aW9uKCl7dmFyIFQ9ZC50aW1lb3V0PyJ0aW1lb3V0IG9mICIrZC50aW1lb3V0KyJtcyBleGNlZWRlZCI6InRpbWVvdXQgZXhjZWVkZWQiLEQ9ZC50cmFuc2l0aW9uYWx8fG87ZC50aW1lb3V0RXJyb3JNZXNzYWdlJiYoVD1kLnRpbWVvdXRFcnJvck1lc3NhZ2UpLG0obmV3IGEoVCxELmNsYXJpZnlUaW1lb3V0RXJyb3I/YS5FVElNRURPVVQ6YS5FQ09OTkFCT1JURUQsZCxiKSksYj1udWxsfSxjLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpe3ZhciB6PShkLndpdGhDcmVkZW50aWFsc3x8cih2KSkmJmQueHNyZkNvb2tpZU5hbWU/ZS5yZWFkKGQueHNyZkNvb2tpZU5hbWUpOnZvaWQgMDt6JiYoeVtkLnhzcmZIZWFkZXJOYW1lXT16KX0ic2V0UmVxdWVzdEhlYWRlciJpbiBiJiZjLmZvckVhY2goeSxmdW5jdGlvbihULEQpe3R5cGVvZiBnPiJ1IiYmRC50b0xvd2VyQ2FzZSgpPT09ImNvbnRlbnQtdHlwZSI/ZGVsZXRlIHlbRF06Yi5zZXRSZXF1ZXN0SGVhZGVyKEQsVCl9KSxjLmlzVW5kZWZpbmVkKGQud2l0aENyZWRlbnRpYWxzKXx8KGIud2l0aENyZWRlbnRpYWxzPSEhZC53aXRoQ3JlZGVudGlhbHMpLE0mJk0hPT0ianNvbiImJihiLnJlc3BvbnNlVHlwZT1kLnJlc3BvbnNlVHlwZSksdHlwZW9mIGQub25Eb3dubG9hZFByb2dyZXNzPT0iZnVuY3Rpb24iJiZiLmFkZEV2ZW50TGlzdGVuZXIoInByb2dyZXNzIixkLm9uRG93bmxvYWRQcm9ncmVzcyksdHlwZW9mIGQub25VcGxvYWRQcm9ncmVzcz09ImZ1bmN0aW9uIiYmYi51cGxvYWQmJmIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoInByb2dyZXNzIixkLm9uVXBsb2FkUHJvZ3Jlc3MpLChkLmNhbmNlbFRva2VufHxkLnNpZ25hbCkmJih3PWZ1bmN0aW9uKFIpeyFifHwobSghUnx8UiYmUi50eXBlP25ldyBoOlIpLGIuYWJvcnQoKSxiPW51bGwpfSxkLmNhbmNlbFRva2VuJiZkLmNhbmNlbFRva2VuLnN1YnNjcmliZSh3KSxkLnNpZ25hbCYmKGQuc2lnbmFsLmFib3J0ZWQ/dygpOmQuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoImFib3J0Iix3KSkpLGd8fChnPW51bGwpO3ZhciBMPWwodik7aWYoTCYmWyJodHRwIiwiaHR0cHMiLCJmaWxlIl0uaW5kZXhPZihMKT09PS0xKXttKG5ldyBhKCJVbnN1cHBvcnRlZCBwcm90b2NvbCAiK0wrIjoiLGEuRVJSX0JBRF9SRVFVRVNULGQpKTtyZXR1cm59Yi5zZW5kKGcpfSl9LENzfXZhciBrcyxobjtmdW5jdGlvbiB4bygpe3JldHVybiBobnx8KGhuPTEsa3M9bnVsbCksa3N9dmFyIEg9Ryxjbj1vbyxsbj1XdCxibz0kaSx3bz1KaSxNbz17IkNvbnRlbnQtVHlwZSI6ImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCJ9O2Z1bmN0aW9uIHVuKGMsdCl7IUguaXNVbmRlZmluZWQoYykmJkguaXNVbmRlZmluZWQoY1siQ29udGVudC1UeXBlIl0pJiYoY1siQ29udGVudC1UeXBlIl09dCl9ZnVuY3Rpb24gX28oKXt2YXIgYztyZXR1cm4odHlwZW9mIFhNTEh0dHBSZXF1ZXN0PCJ1Inx8dHlwZW9mIHByb2Nlc3M8InUiJiZPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2Vzcyk9PT0iW29iamVjdCBwcm9jZXNzXSIpJiYoYz1hbigpKSxjfWZ1bmN0aW9uIFNvKGMsdCxlKXtpZihILmlzU3RyaW5nKGMpKXRyeXtyZXR1cm4odHx8SlNPTi5wYXJzZSkoYyksSC50cmltKGMpfWNhdGNoKHMpe2lmKHMubmFtZSE9PSJTeW50YXhFcnJvciIpdGhyb3cgc31yZXR1cm4oZXx8SlNPTi5zdHJpbmdpZnkpKGMpfXZhciBIZT17dHJhbnNpdGlvbmFsOmJvLGFkYXB0ZXI6X28oKSx0cmFuc2Zvcm1SZXF1ZXN0OltmdW5jdGlvbih0LGUpe2lmKGNuKGUsIkFjY2VwdCIpLGNuKGUsIkNvbnRlbnQtVHlwZSIpLEguaXNGb3JtRGF0YSh0KXx8SC5pc0FycmF5QnVmZmVyKHQpfHxILmlzQnVmZmVyKHQpfHxILmlzU3RyZWFtKHQpfHxILmlzRmlsZSh0KXx8SC5pc0Jsb2IodCkpcmV0dXJuIHQ7aWYoSC5pc0FycmF5QnVmZmVyVmlldyh0KSlyZXR1cm4gdC5idWZmZXI7aWYoSC5pc1VSTFNlYXJjaFBhcmFtcyh0KSlyZXR1cm4gdW4oZSwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgiKSx0LnRvU3RyaW5nKCk7dmFyIHM9SC5pc09iamVjdCh0KSxpPWUmJmVbIkNvbnRlbnQtVHlwZSJdLG47aWYoKG49SC5pc0ZpbGVMaXN0KHQpKXx8cyYmaT09PSJtdWx0aXBhcnQvZm9ybS1kYXRhIil7dmFyIHI9dGhpcy5lbnYmJnRoaXMuZW52LkZvcm1EYXRhO3JldHVybiB3byhuP3siZmlsZXNbXSI6dH06dCxyJiZuZXcgcil9ZWxzZSBpZihzfHxpPT09ImFwcGxpY2F0aW9uL2pzb24iKXJldHVybiB1bihlLCJhcHBsaWNhdGlvbi9qc29uIiksU28odCk7cmV0dXJuIHR9XSx0cmFuc2Zvcm1SZXNwb25zZTpbZnVuY3Rpb24odCl7dmFyIGU9dGhpcy50cmFuc2l0aW9uYWx8fEhlLnRyYW5zaXRpb25hbCxzPWUmJmUuc2lsZW50SlNPTlBhcnNpbmcsaT1lJiZlLmZvcmNlZEpTT05QYXJzaW5nLG49IXMmJnRoaXMucmVzcG9uc2VUeXBlPT09Impzb24iO2lmKG58fGkmJkguaXNTdHJpbmcodCkmJnQubGVuZ3RoKXRyeXtyZXR1cm4gSlNPTi5wYXJzZSh0KX1jYXRjaChyKXtpZihuKXRocm93IHIubmFtZT09PSJTeW50YXhFcnJvciI/bG4uZnJvbShyLGxuLkVSUl9CQURfUkVTUE9OU0UsdGhpcyxudWxsLHRoaXMucmVzcG9uc2UpOnJ9cmV0dXJuIHR9XSx0aW1lb3V0OjAseHNyZkNvb2tpZU5hbWU6IlhTUkYtVE9LRU4iLHhzcmZIZWFkZXJOYW1lOiJYLVhTUkYtVE9LRU4iLG1heENvbnRlbnRMZW5ndGg6LTEsbWF4Qm9keUxlbmd0aDotMSxlbnY6e0Zvcm1EYXRhOnhvKCl9LHZhbGlkYXRlU3RhdHVzOmZ1bmN0aW9uKHQpe3JldHVybiB0Pj0yMDAmJnQ8MzAwfSxoZWFkZXJzOntjb21tb246e0FjY2VwdDoiYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qIn19fTtILmZvckVhY2goWyJkZWxldGUiLCJnZXQiLCJoZWFkIl0sZnVuY3Rpb24odCl7SGUuaGVhZGVyc1t0XT17fX0pLEguZm9yRWFjaChbInBvc3QiLCJwdXQiLCJwYXRjaCJdLGZ1bmN0aW9uKHQpe0hlLmhlYWRlcnNbdF09SC5tZXJnZShNbyl9KTt2YXIgTnM9SGUsQW89RyxUbz1OcyxFbz1mdW5jdGlvbih0LGUscyl7dmFyIGk9dGhpc3x8VG87cmV0dXJuIEFvLmZvckVhY2gocyxmdW5jdGlvbihyKXt0PXIuY2FsbChpLHQsZSl9KSx0fSxEcyxkbjtmdW5jdGlvbiBmbigpe3JldHVybiBkbnx8KGRuPTEsRHM9ZnVuY3Rpb24odCl7cmV0dXJuISEodCYmdC5fX0NBTkNFTF9fKX0pLERzfXZhciBwbj1HLE9zPUVvLHZvPWZuKCksem89TnMsUm89VmUoKTtmdW5jdGlvbiBQcyhjKXtpZihjLmNhbmNlbFRva2VuJiZjLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKSxjLnNpZ25hbCYmYy5zaWduYWwuYWJvcnRlZCl0aHJvdyBuZXcgUm99dmFyIEJvPWZ1bmN0aW9uKHQpe1BzKHQpLHQuaGVhZGVycz10LmhlYWRlcnN8fHt9LHQuZGF0YT1Pcy5jYWxsKHQsdC5kYXRhLHQuaGVhZGVycyx0LnRyYW5zZm9ybVJlcXVlc3QpLHQuaGVhZGVycz1wbi5tZXJnZSh0LmhlYWRlcnMuY29tbW9ufHx7fSx0LmhlYWRlcnNbdC5tZXRob2RdfHx7fSx0LmhlYWRlcnMpLHBuLmZvckVhY2goWyJkZWxldGUiLCJnZXQiLCJoZWFkIiwicG9zdCIsInB1dCIsInBhdGNoIiwiY29tbW9uIl0sZnVuY3Rpb24oaSl7ZGVsZXRlIHQuaGVhZGVyc1tpXX0pO3ZhciBlPXQuYWRhcHRlcnx8em8uYWRhcHRlcjtyZXR1cm4gZSh0KS50aGVuKGZ1bmN0aW9uKGkpe3JldHVybiBQcyh0KSxpLmRhdGE9T3MuY2FsbCh0LGkuZGF0YSxpLmhlYWRlcnMsdC50cmFuc2Zvcm1SZXNwb25zZSksaX0sZnVuY3Rpb24oaSl7cmV0dXJuIHZvKGkpfHwoUHModCksaSYmaS5yZXNwb25zZSYmKGkucmVzcG9uc2UuZGF0YT1Pcy5jYWxsKHQsaS5yZXNwb25zZS5kYXRhLGkucmVzcG9uc2UuaGVhZGVycyx0LnRyYW5zZm9ybVJlc3BvbnNlKSkpLFByb21pc2UucmVqZWN0KGkpfSl9LEo9Ryxtbj1mdW5jdGlvbih0LGUpe2U9ZXx8e307dmFyIHM9e307ZnVuY3Rpb24gaShsLHUpe3JldHVybiBKLmlzUGxhaW5PYmplY3QobCkmJkouaXNQbGFpbk9iamVjdCh1KT9KLm1lcmdlKGwsdSk6Si5pc1BsYWluT2JqZWN0KHUpP0oubWVyZ2Uoe30sdSk6Si5pc0FycmF5KHUpP3Uuc2xpY2UoKTp1fWZ1bmN0aW9uIG4obCl7aWYoSi5pc1VuZGVmaW5lZChlW2xdKSl7aWYoIUouaXNVbmRlZmluZWQodFtsXSkpcmV0dXJuIGkodm9pZCAwLHRbbF0pfWVsc2UgcmV0dXJuIGkodFtsXSxlW2xdKX1mdW5jdGlvbiByKGwpe2lmKCFKLmlzVW5kZWZpbmVkKGVbbF0pKXJldHVybiBpKHZvaWQgMCxlW2xdKX1mdW5jdGlvbiBvKGwpe2lmKEouaXNVbmRlZmluZWQoZVtsXSkpe2lmKCFKLmlzVW5kZWZpbmVkKHRbbF0pKXJldHVybiBpKHZvaWQgMCx0W2xdKX1lbHNlIHJldHVybiBpKHZvaWQgMCxlW2xdKX1mdW5jdGlvbiBhKGwpe2lmKGwgaW4gZSlyZXR1cm4gaSh0W2xdLGVbbF0pO2lmKGwgaW4gdClyZXR1cm4gaSh2b2lkIDAsdFtsXSl9dmFyIGg9e3VybDpyLG1ldGhvZDpyLGRhdGE6cixiYXNlVVJMOm8sdHJhbnNmb3JtUmVxdWVzdDpvLHRyYW5zZm9ybVJlc3BvbnNlOm8scGFyYW1zU2VyaWFsaXplcjpvLHRpbWVvdXQ6byx0aW1lb3V0TWVzc2FnZTpvLHdpdGhDcmVkZW50aWFsczpvLGFkYXB0ZXI6byxyZXNwb25zZVR5cGU6byx4c3JmQ29va2llTmFtZTpvLHhzcmZIZWFkZXJOYW1lOm8sb25VcGxvYWRQcm9ncmVzczpvLG9uRG93bmxvYWRQcm9ncmVzczpvLGRlY29tcHJlc3M6byxtYXhDb250ZW50TGVuZ3RoOm8sbWF4Qm9keUxlbmd0aDpvLGJlZm9yZVJlZGlyZWN0Om8sdHJhbnNwb3J0Om8saHR0cEFnZW50Om8saHR0cHNBZ2VudDpvLGNhbmNlbFRva2VuOm8sc29ja2V0UGF0aDpvLHJlc3BvbnNlRW5jb2Rpbmc6byx2YWxpZGF0ZVN0YXR1czphfTtyZXR1cm4gSi5mb3JFYWNoKE9iamVjdC5rZXlzKHQpLmNvbmNhdChPYmplY3Qua2V5cyhlKSksZnVuY3Rpb24odSl7dmFyIGQ9aFt1XXx8bixmPWQodSk7Si5pc1VuZGVmaW5lZChmKSYmZCE9PWF8fChzW3VdPWYpfSksc30sVXMseW47ZnVuY3Rpb24gZ24oKXtyZXR1cm4geW58fCh5bj0xLFVzPXt2ZXJzaW9uOiIwLjI3LjIifSksVXN9dmFyIExvPWduKCkudmVyc2lvbixTdD1XdCxWcz17fTtbIm9iamVjdCIsImJvb2xlYW4iLCJudW1iZXIiLCJmdW5jdGlvbiIsInN0cmluZyIsInN5bWJvbCJdLmZvckVhY2goZnVuY3Rpb24oYyx0KXtWc1tjXT1mdW5jdGlvbihzKXtyZXR1cm4gdHlwZW9mIHM9PT1jfHwiYSIrKHQ8MT8ibiAiOiIgIikrY319KTt2YXIgeG49e307VnMudHJhbnNpdGlvbmFsPWZ1bmN0aW9uKHQsZSxzKXtmdW5jdGlvbiBpKG4scil7cmV0dXJuIltBeGlvcyB2IitMbysiXSBUcmFuc2l0aW9uYWwgb3B0aW9uICciK24rIiciK3IrKHM/Ii4gIitzOiIiKX1yZXR1cm4gZnVuY3Rpb24obixyLG8pe2lmKHQ9PT0hMSl0aHJvdyBuZXcgU3QoaShyLCIgaGFzIGJlZW4gcmVtb3ZlZCIrKGU/IiBpbiAiK2U6IiIpKSxTdC5FUlJfREVQUkVDQVRFRCk7cmV0dXJuIGUmJiF4bltyXSYmKHhuW3JdPSEwLGNvbnNvbGUud2FybihpKHIsIiBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYiK2UrIiBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSIpKSksdD90KG4scixvKTohMH19O2Z1bmN0aW9uIEZvKGMsdCxlKXtpZih0eXBlb2YgYyE9Im9iamVjdCIpdGhyb3cgbmV3IFN0KCJvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0IixTdC5FUlJfQkFEX09QVElPTl9WQUxVRSk7Zm9yKHZhciBzPU9iamVjdC5rZXlzKGMpLGk9cy5sZW5ndGg7aS0tID4wOyl7dmFyIG49c1tpXSxyPXRbbl07aWYocil7dmFyIG89Y1tuXSxhPW89PT12b2lkIDB8fHIobyxuLGMpO2lmKGEhPT0hMCl0aHJvdyBuZXcgU3QoIm9wdGlvbiAiK24rIiBtdXN0IGJlICIrYSxTdC5FUlJfQkFEX09QVElPTl9WQUxVRSk7Y29udGludWV9aWYoZSE9PSEwKXRocm93IG5ldyBTdCgiVW5rbm93biBvcHRpb24gIituLFN0LkVSUl9CQURfT1BUSU9OKX19dmFyIElvPXthc3NlcnRPcHRpb25zOkZvLHZhbGlkYXRvcnM6VnN9LGJuPUcsQ289cWksd249bm8sTW49Qm8samU9bW4sa289dG4sX249SW8sR3Q9X24udmFsaWRhdG9ycztmdW5jdGlvbiBxdChjKXt0aGlzLmRlZmF1bHRzPWMsdGhpcy5pbnRlcmNlcHRvcnM9e3JlcXVlc3Q6bmV3IHduLHJlc3BvbnNlOm5ldyB3bn19cXQucHJvdG90eXBlLnJlcXVlc3Q9ZnVuY3Rpb24odCxlKXt0eXBlb2YgdD09InN0cmluZyI/KGU9ZXx8e30sZS51cmw9dCk6ZT10fHx7fSxlPWplKHRoaXMuZGVmYXVsdHMsZSksZS5tZXRob2Q/ZS5tZXRob2Q9ZS5tZXRob2QudG9Mb3dlckNhc2UoKTp0aGlzLmRlZmF1bHRzLm1ldGhvZD9lLm1ldGhvZD10aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpOmUubWV0aG9kPSJnZXQiO3ZhciBzPWUudHJhbnNpdGlvbmFsO3MhPT12b2lkIDAmJl9uLmFzc2VydE9wdGlvbnMocyx7c2lsZW50SlNPTlBhcnNpbmc6R3QudHJhbnNpdGlvbmFsKEd0LmJvb2xlYW4pLGZvcmNlZEpTT05QYXJzaW5nOkd0LnRyYW5zaXRpb25hbChHdC5ib29sZWFuKSxjbGFyaWZ5VGltZW91dEVycm9yOkd0LnRyYW5zaXRpb25hbChHdC5ib29sZWFuKX0sITEpO3ZhciBpPVtdLG49ITA7dGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uKGYpe3R5cGVvZiBmLnJ1bldoZW49PSJmdW5jdGlvbiImJmYucnVuV2hlbihlKT09PSExfHwobj1uJiZmLnN5bmNocm9ub3VzLGkudW5zaGlmdChmLmZ1bGZpbGxlZCxmLnJlamVjdGVkKSl9KTt2YXIgcj1bXTt0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uKGYpe3IucHVzaChmLmZ1bGZpbGxlZCxmLnJlamVjdGVkKX0pO3ZhciBvO2lmKCFuKXt2YXIgYT1bTW4sdm9pZCAwXTtmb3IoQXJyYXkucHJvdG90eXBlLnVuc2hpZnQuYXBwbHkoYSxpKSxhPWEuY29uY2F0KHIpLG89UHJvbWlzZS5yZXNvbHZlKGUpO2EubGVuZ3RoOylvPW8udGhlbihhLnNoaWZ0KCksYS5zaGlmdCgpKTtyZXR1cm4gb31mb3IodmFyIGg9ZTtpLmxlbmd0aDspe3ZhciBsPWkuc2hpZnQoKSx1PWkuc2hpZnQoKTt0cnl7aD1sKGgpfWNhdGNoKGQpe3UoZCk7YnJlYWt9fXRyeXtvPU1uKGgpfWNhdGNoKGQpe3JldHVybiBQcm9taXNlLnJlamVjdChkKX1mb3IoO3IubGVuZ3RoOylvPW8udGhlbihyLnNoaWZ0KCksci5zaGlmdCgpKTtyZXR1cm4gb30scXQucHJvdG90eXBlLmdldFVyaT1mdW5jdGlvbih0KXt0PWplKHRoaXMuZGVmYXVsdHMsdCk7dmFyIGU9a28odC5iYXNlVVJMLHQudXJsKTtyZXR1cm4gQ28oZSx0LnBhcmFtcyx0LnBhcmFtc1NlcmlhbGl6ZXIpfSxibi5mb3JFYWNoKFsiZGVsZXRlIiwiZ2V0IiwiaGVhZCIsIm9wdGlvbnMiXSxmdW5jdGlvbih0KXtxdC5wcm90b3R5cGVbdF09ZnVuY3Rpb24oZSxzKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KGplKHN8fHt9LHttZXRob2Q6dCx1cmw6ZSxkYXRhOihzfHx7fSkuZGF0YX0pKX19KSxibi5mb3JFYWNoKFsicG9zdCIsInB1dCIsInBhdGNoIl0sZnVuY3Rpb24odCl7ZnVuY3Rpb24gZShzKXtyZXR1cm4gZnVuY3Rpb24obixyLG8pe3JldHVybiB0aGlzLnJlcXVlc3QoamUob3x8e30se21ldGhvZDp0LGhlYWRlcnM6cz97IkNvbnRlbnQtVHlwZSI6Im11bHRpcGFydC9mb3JtLWRhdGEifTp7fSx1cmw6bixkYXRhOnJ9KSl9fXF0LnByb3RvdHlwZVt0XT1lKCkscXQucHJvdG90eXBlW3QrIkZvcm0iXT1lKCEwKX0pO3ZhciBObz1xdCxIcyxTbjtmdW5jdGlvbiBEbygpe2lmKFNuKXJldHVybiBIcztTbj0xO3ZhciBjPVZlKCk7ZnVuY3Rpb24gdChlKXtpZih0eXBlb2YgZSE9ImZ1bmN0aW9uIil0aHJvdyBuZXcgVHlwZUVycm9yKCJleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uIik7dmFyIHM7dGhpcy5wcm9taXNlPW5ldyBQcm9taXNlKGZ1bmN0aW9uKHIpe3M9cn0pO3ZhciBpPXRoaXM7dGhpcy5wcm9taXNlLnRoZW4oZnVuY3Rpb24obil7aWYoISFpLl9saXN0ZW5lcnMpe3ZhciByLG89aS5fbGlzdGVuZXJzLmxlbmd0aDtmb3Iocj0wO3I8bztyKyspaS5fbGlzdGVuZXJzW3JdKG4pO2kuX2xpc3RlbmVycz1udWxsfX0pLHRoaXMucHJvbWlzZS50aGVuPWZ1bmN0aW9uKG4pe3ZhciByLG89bmV3IFByb21pc2UoZnVuY3Rpb24oYSl7aS5zdWJzY3JpYmUoYSkscj1hfSkudGhlbihuKTtyZXR1cm4gby5jYW5jZWw9ZnVuY3Rpb24oKXtpLnVuc3Vic2NyaWJlKHIpfSxvfSxlKGZ1bmN0aW9uKHIpe2kucmVhc29ufHwoaS5yZWFzb249bmV3IGMocikscyhpLnJlYXNvbikpfSl9cmV0dXJuIHQucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQ9ZnVuY3Rpb24oKXtpZih0aGlzLnJlYXNvbil0aHJvdyB0aGlzLnJlYXNvbn0sdC5wcm90b3R5cGUuc3Vic2NyaWJlPWZ1bmN0aW9uKHMpe2lmKHRoaXMucmVhc29uKXtzKHRoaXMucmVhc29uKTtyZXR1cm59dGhpcy5fbGlzdGVuZXJzP3RoaXMuX2xpc3RlbmVycy5wdXNoKHMpOnRoaXMuX2xpc3RlbmVycz1bc119LHQucHJvdG90eXBlLnVuc3Vic2NyaWJlPWZ1bmN0aW9uKHMpe2lmKCEhdGhpcy5fbGlzdGVuZXJzKXt2YXIgaT10aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihzKTtpIT09LTEmJnRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaSwxKX19LHQuc291cmNlPWZ1bmN0aW9uKCl7dmFyIHMsaT1uZXcgdChmdW5jdGlvbihyKXtzPXJ9KTtyZXR1cm57dG9rZW46aSxjYW5jZWw6c319LEhzPXQsSHN9dmFyIGpzLEFuO2Z1bmN0aW9uIE9vKCl7cmV0dXJuIEFufHwoQW49MSxqcz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24ocyl7cmV0dXJuIHQuYXBwbHkobnVsbCxzKX19KSxqc312YXIgV3MsVG47ZnVuY3Rpb24gUG8oKXtpZihUbilyZXR1cm4gV3M7VG49MTt2YXIgYz1HO3JldHVybiBXcz1mdW5jdGlvbihlKXtyZXR1cm4gYy5pc09iamVjdChlKSYmZS5pc0F4aW9zRXJyb3I9PT0hMH0sV3N9dmFyIEVuPUcsVW89SGksV2U9Tm8sVm89bW4sSG89TnM7ZnVuY3Rpb24gdm4oYyl7dmFyIHQ9bmV3IFdlKGMpLGU9VW8oV2UucHJvdG90eXBlLnJlcXVlc3QsdCk7cmV0dXJuIEVuLmV4dGVuZChlLFdlLnByb3RvdHlwZSx0KSxFbi5leHRlbmQoZSx0KSxlLmNyZWF0ZT1mdW5jdGlvbihpKXtyZXR1cm4gdm4oVm8oYyxpKSl9LGV9dmFyICQ9dm4oSG8pOyQuQXhpb3M9V2UsJC5DYW5jZWxlZEVycm9yPVZlKCksJC5DYW5jZWxUb2tlbj1EbygpLCQuaXNDYW5jZWw9Zm4oKSwkLlZFUlNJT049Z24oKS52ZXJzaW9uLCQudG9Gb3JtRGF0YT1KaSwkLkF4aW9zRXJyb3I9V3QsJC5DYW5jZWw9JC5DYW5jZWxlZEVycm9yLCQuYWxsPWZ1bmN0aW9uKHQpe3JldHVybiBQcm9taXNlLmFsbCh0KX0sJC5zcHJlYWQ9T28oKSwkLmlzQXhpb3NFcnJvcj1QbygpLHV0LmV4cG9ydHM9JCx1dC5leHBvcnRzLmRlZmF1bHQ9JCxmdW5jdGlvbihjKXtjLmV4cG9ydHM9dXQuZXhwb3J0c30oY3QpO3ZhciB6bj1DdChjdC5leHBvcnRzKTsvKioKICogQGxpY2Vuc2UKICogQ29weXJpZ2h0IDIwMTAtMjAyMiBUaHJlZS5qcyBBdXRob3JzCiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBNSVQKICovY29uc3QgUm49IjE0MiIsR3M9MCxqbz0xLEJuPTIsV289MSxMbj0xLEdvPTEwMCxxbz0yMDQsWm89MjA1LFhvPTMsWW89MCxGbj0zMDAseGU9MWUzLGJlPTEwMDEscXM9MTAwMixacz0xMDAzLCRvPTEwMDQsSm89MTAwNSxYcz0xMDA2LEtvPTEwMDcsWXM9MTAwOCxRbz0xMDA5LHRhPTEwMTUsJHM9MTAyMyx3ZT0yMzAwLFp0PTIzMDEsSnM9MjMwMixJbj0yNDAwLENuPTI0MDEsa249MjQwMixlYT0yNTAwLHNhPTI1MDEsaWE9MSxObj0yLG5hPTNlMyxEbj0zMDAxLE9uPTAsZHQ9InNyZ2IiLE50PSJzcmdiLWxpbmVhciIsS3M9NzY4MCxyYT01MTksUXM9MzUwNDQ7Y2xhc3MgR2V7YWRkRXZlbnRMaXN0ZW5lcih0LGUpe3RoaXMuX2xpc3RlbmVycz09PXZvaWQgMCYmKHRoaXMuX2xpc3RlbmVycz17fSk7Y29uc3Qgcz10aGlzLl9saXN0ZW5lcnM7c1t0XT09PXZvaWQgMCYmKHNbdF09W10pLHNbdF0uaW5kZXhPZihlKT09PS0xJiZzW3RdLnB1c2goZSl9aGFzRXZlbnRMaXN0ZW5lcih0LGUpe2lmKHRoaXMuX2xpc3RlbmVycz09PXZvaWQgMClyZXR1cm4hMTtjb25zdCBzPXRoaXMuX2xpc3RlbmVycztyZXR1cm4gc1t0XSE9PXZvaWQgMCYmc1t0XS5pbmRleE9mKGUpIT09LTF9cmVtb3ZlRXZlbnRMaXN0ZW5lcih0LGUpe2lmKHRoaXMuX2xpc3RlbmVycz09PXZvaWQgMClyZXR1cm47Y29uc3QgaT10aGlzLl9saXN0ZW5lcnNbdF07aWYoaSE9PXZvaWQgMCl7Y29uc3Qgbj1pLmluZGV4T2YoZSk7biE9PS0xJiZpLnNwbGljZShuLDEpfX1kaXNwYXRjaEV2ZW50KHQpe2lmKHRoaXMuX2xpc3RlbmVycz09PXZvaWQgMClyZXR1cm47Y29uc3Qgcz10aGlzLl9saXN0ZW5lcnNbdC50eXBlXTtpZihzIT09dm9pZCAwKXt0LnRhcmdldD10aGlzO2NvbnN0IGk9cy5zbGljZSgwKTtmb3IobGV0IG49MCxyPWkubGVuZ3RoO248cjtuKyspaVtuXS5jYWxsKHRoaXMsdCk7dC50YXJnZXQ9bnVsbH19fWNvbnN0IHE9WyIwMCIsIjAxIiwiMDIiLCIwMyIsIjA0IiwiMDUiLCIwNiIsIjA3IiwiMDgiLCIwOSIsIjBhIiwiMGIiLCIwYyIsIjBkIiwiMGUiLCIwZiIsIjEwIiwiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjE2IiwiMTciLCIxOCIsIjE5IiwiMWEiLCIxYiIsIjFjIiwiMWQiLCIxZSIsIjFmIiwiMjAiLCIyMSIsIjIyIiwiMjMiLCIyNCIsIjI1IiwiMjYiLCIyNyIsIjI4IiwiMjkiLCIyYSIsIjJiIiwiMmMiLCIyZCIsIjJlIiwiMmYiLCIzMCIsIjMxIiwiMzIiLCIzMyIsIjM0IiwiMzUiLCIzNiIsIjM3IiwiMzgiLCIzOSIsIjNhIiwiM2IiLCIzYyIsIjNkIiwiM2UiLCIzZiIsIjQwIiwiNDEiLCI0MiIsIjQzIiwiNDQiLCI0NSIsIjQ2IiwiNDciLCI0OCIsIjQ5IiwiNGEiLCI0YiIsIjRjIiwiNGQiLCI0ZSIsIjRmIiwiNTAiLCI1MSIsIjUyIiwiNTMiLCI1NCIsIjU1IiwiNTYiLCI1NyIsIjU4IiwiNTkiLCI1YSIsIjViIiwiNWMiLCI1ZCIsIjVlIiwiNWYiLCI2MCIsIjYxIiwiNjIiLCI2MyIsIjY0IiwiNjUiLCI2NiIsIjY3IiwiNjgiLCI2OSIsIjZhIiwiNmIiLCI2YyIsIjZkIiwiNmUiLCI2ZiIsIjcwIiwiNzEiLCI3MiIsIjczIiwiNzQiLCI3NSIsIjc2IiwiNzciLCI3OCIsIjc5IiwiN2EiLCI3YiIsIjdjIiwiN2QiLCI3ZSIsIjdmIiwiODAiLCI4MSIsIjgyIiwiODMiLCI4NCIsIjg1IiwiODYiLCI4NyIsIjg4IiwiODkiLCI4YSIsIjhiIiwiOGMiLCI4ZCIsIjhlIiwiOGYiLCI5MCIsIjkxIiwiOTIiLCI5MyIsIjk0IiwiOTUiLCI5NiIsIjk3IiwiOTgiLCI5OSIsIjlhIiwiOWIiLCI5YyIsIjlkIiwiOWUiLCI5ZiIsImEwIiwiYTEiLCJhMiIsImEzIiwiYTQiLCJhNSIsImE2IiwiYTciLCJhOCIsImE5IiwiYWEiLCJhYiIsImFjIiwiYWQiLCJhZSIsImFmIiwiYjAiLCJiMSIsImIyIiwiYjMiLCJiNCIsImI1IiwiYjYiLCJiNyIsImI4IiwiYjkiLCJiYSIsImJiIiwiYmMiLCJiZCIsImJlIiwiYmYiLCJjMCIsImMxIiwiYzIiLCJjMyIsImM0IiwiYzUiLCJjNiIsImM3IiwiYzgiLCJjOSIsImNhIiwiY2IiLCJjYyIsImNkIiwiY2UiLCJjZiIsImQwIiwiZDEiLCJkMiIsImQzIiwiZDQiLCJkNSIsImQ2IiwiZDciLCJkOCIsImQ5IiwiZGEiLCJkYiIsImRjIiwiZGQiLCJkZSIsImRmIiwiZTAiLCJlMSIsImUyIiwiZTMiLCJlNCIsImU1IiwiZTYiLCJlNyIsImU4IiwiZTkiLCJlYSIsImViIiwiZWMiLCJlZCIsImVlIiwiZWYiLCJmMCIsImYxIiwiZjIiLCJmMyIsImY0IiwiZjUiLCJmNiIsImY3IiwiZjgiLCJmOSIsImZhIiwiZmIiLCJmYyIsImZkIiwiZmUiLCJmZiJdO2xldCBQbj0xMjM0NTY3O2NvbnN0IE1lPU1hdGguUEkvMTgwLF9lPTE4MC9NYXRoLlBJO2Z1bmN0aW9uIGl0KCl7Y29uc3QgYz1NYXRoLnJhbmRvbSgpKjQyOTQ5NjcyOTV8MCx0PU1hdGgucmFuZG9tKCkqNDI5NDk2NzI5NXwwLGU9TWF0aC5yYW5kb20oKSo0Mjk0OTY3Mjk1fDAscz1NYXRoLnJhbmRvbSgpKjQyOTQ5NjcyOTV8MDtyZXR1cm4ocVtjJjI1NV0rcVtjPj44JjI1NV0rcVtjPj4xNiYyNTVdK3FbYz4+MjQmMjU1XSsiLSIrcVt0JjI1NV0rcVt0Pj44JjI1NV0rIi0iK3FbdD4+MTYmMTV8NjRdK3FbdD4+MjQmMjU1XSsiLSIrcVtlJjYzfDEyOF0rcVtlPj44JjI1NV0rIi0iK3FbZT4+MTYmMjU1XStxW2U+PjI0JjI1NV0rcVtzJjI1NV0rcVtzPj44JjI1NV0rcVtzPj4xNiYyNTVdK3Fbcz4+MjQmMjU1XSkudG9Mb3dlckNhc2UoKX1mdW5jdGlvbiBaKGMsdCxlKXtyZXR1cm4gTWF0aC5tYXgodCxNYXRoLm1pbihlLGMpKX1mdW5jdGlvbiB0aShjLHQpe3JldHVybihjJXQrdCkldH1mdW5jdGlvbiBvYShjLHQsZSxzLGkpe3JldHVybiBzKyhjLXQpKihpLXMpLyhlLXQpfWZ1bmN0aW9uIGFhKGMsdCxlKXtyZXR1cm4gYyE9PXQ/KGUtYykvKHQtYyk6MH1mdW5jdGlvbiBTZShjLHQsZSl7cmV0dXJuKDEtZSkqYytlKnR9ZnVuY3Rpb24gaGEoYyx0LGUscyl7cmV0dXJuIFNlKGMsdCwxLU1hdGguZXhwKC1lKnMpKX1mdW5jdGlvbiBjYShjLHQ9MSl7cmV0dXJuIHQtTWF0aC5hYnModGkoYyx0KjIpLXQpfWZ1bmN0aW9uIGxhKGMsdCxlKXtyZXR1cm4gYzw9dD8wOmM+PWU/MTooYz0oYy10KS8oZS10KSxjKmMqKDMtMipjKSl9ZnVuY3Rpb24gdWEoYyx0LGUpe3JldHVybiBjPD10PzA6Yz49ZT8xOihjPShjLXQpLyhlLXQpLGMqYypjKihjKihjKjYtMTUpKzEwKSl9ZnVuY3Rpb24gZGEoYyx0KXtyZXR1cm4gYytNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHQtYysxKSl9ZnVuY3Rpb24gZmEoYyx0KXtyZXR1cm4gYytNYXRoLnJhbmRvbSgpKih0LWMpfWZ1bmN0aW9uIHBhKGMpe3JldHVybiBjKiguNS1NYXRoLnJhbmRvbSgpKX1mdW5jdGlvbiBtYShjKXtjIT09dm9pZCAwJiYoUG49Yyk7bGV0IHQ9UG4rPTE4MzE1NjU4MTM7cmV0dXJuIHQ9TWF0aC5pbXVsKHRedD4+PjE1LHR8MSksdF49dCtNYXRoLmltdWwodF50Pj4+Nyx0fDYxKSwoKHRedD4+PjE0KT4+PjApLzQyOTQ5NjcyOTZ9ZnVuY3Rpb24geWEoYyl7cmV0dXJuIGMqTWV9ZnVuY3Rpb24gZ2EoYyl7cmV0dXJuIGMqX2V9ZnVuY3Rpb24geGEoYyl7cmV0dXJuKGMmYy0xKT09PTAmJmMhPT0wfWZ1bmN0aW9uIFVuKGMpe3JldHVybiBNYXRoLnBvdygyLE1hdGguY2VpbChNYXRoLmxvZyhjKS9NYXRoLkxOMikpfWZ1bmN0aW9uIGJhKGMpe3JldHVybiBNYXRoLnBvdygyLE1hdGguZmxvb3IoTWF0aC5sb2coYykvTWF0aC5MTjIpKX1mdW5jdGlvbiB3YShjLHQsZSxzLGkpe2NvbnN0IG49TWF0aC5jb3Mscj1NYXRoLnNpbixvPW4oZS8yKSxhPXIoZS8yKSxoPW4oKHQrcykvMiksbD1yKCh0K3MpLzIpLHU9bigodC1zKS8yKSxkPXIoKHQtcykvMiksZj1uKChzLXQpLzIpLHA9cigocy10KS8yKTtzd2l0Y2goaSl7Y2FzZSJYWVgiOmMuc2V0KG8qbCxhKnUsYSpkLG8qaCk7YnJlYWs7Y2FzZSJZWlkiOmMuc2V0KGEqZCxvKmwsYSp1LG8qaCk7YnJlYWs7Y2FzZSJaWFoiOmMuc2V0KGEqdSxhKmQsbypsLG8qaCk7YnJlYWs7Y2FzZSJYWlgiOmMuc2V0KG8qbCxhKnAsYSpmLG8qaCk7YnJlYWs7Y2FzZSJZWFkiOmMuc2V0KGEqZixvKmwsYSpwLG8qaCk7YnJlYWs7Y2FzZSJaWVoiOmMuc2V0KGEqcCxhKmYsbypsLG8qaCk7YnJlYWs7ZGVmYXVsdDpjb25zb2xlLndhcm4oIlRIUkVFLk1hdGhVdGlsczogLnNldFF1YXRlcm5pb25Gcm9tUHJvcGVyRXVsZXIoKSBlbmNvdW50ZXJlZCBhbiB1bmtub3duIG9yZGVyOiAiK2kpfX1mdW5jdGlvbiBNYShjLHQpe3N3aXRjaCh0LmNvbnN0cnVjdG9yKXtjYXNlIEZsb2F0MzJBcnJheTpyZXR1cm4gYztjYXNlIFVpbnQxNkFycmF5OnJldHVybiBjLzY1NTM1O2Nhc2UgVWludDhBcnJheTpyZXR1cm4gYy8yNTU7Y2FzZSBJbnQxNkFycmF5OnJldHVybiBNYXRoLm1heChjLzMyNzY3LC0xKTtjYXNlIEludDhBcnJheTpyZXR1cm4gTWF0aC5tYXgoYy8xMjcsLTEpO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKCJJbnZhbGlkIGNvbXBvbmVudCB0eXBlLiIpfX1mdW5jdGlvbiBfYShjLHQpe3N3aXRjaCh0LmNvbnN0cnVjdG9yKXtjYXNlIEZsb2F0MzJBcnJheTpyZXR1cm4gYztjYXNlIFVpbnQxNkFycmF5OnJldHVybiBNYXRoLnJvdW5kKGMqNjU1MzUpO2Nhc2UgVWludDhBcnJheTpyZXR1cm4gTWF0aC5yb3VuZChjKjI1NSk7Y2FzZSBJbnQxNkFycmF5OnJldHVybiBNYXRoLnJvdW5kKGMqMzI3NjcpO2Nhc2UgSW50OEFycmF5OnJldHVybiBNYXRoLnJvdW5kKGMqMTI3KTtkZWZhdWx0OnRocm93IG5ldyBFcnJvcigiSW52YWxpZCBjb21wb25lbnQgdHlwZS4iKX19dmFyIFNhPU9iamVjdC5mcmVlemUoe19fcHJvdG9fXzpudWxsLERFRzJSQUQ6TWUsUkFEMkRFRzpfZSxnZW5lcmF0ZVVVSUQ6aXQsY2xhbXA6WixldWNsaWRlYW5Nb2R1bG86dGksbWFwTGluZWFyOm9hLGludmVyc2VMZXJwOmFhLGxlcnA6U2UsZGFtcDpoYSxwaW5ncG9uZzpjYSxzbW9vdGhzdGVwOmxhLHNtb290aGVyc3RlcDp1YSxyYW5kSW50OmRhLHJhbmRGbG9hdDpmYSxyYW5kRmxvYXRTcHJlYWQ6cGEsc2VlZGVkUmFuZG9tOm1hLGRlZ1RvUmFkOnlhLHJhZFRvRGVnOmdhLGlzUG93ZXJPZlR3bzp4YSxjZWlsUG93ZXJPZlR3bzpVbixmbG9vclBvd2VyT2ZUd286YmEsc2V0UXVhdGVybmlvbkZyb21Qcm9wZXJFdWxlcjp3YSxub3JtYWxpemU6X2EsZGVub3JtYWxpemU6TWF9KTtjbGFzcyBPe2NvbnN0cnVjdG9yKHQ9MCxlPTApe08ucHJvdG90eXBlLmlzVmVjdG9yMj0hMCx0aGlzLng9dCx0aGlzLnk9ZX1nZXQgd2lkdGgoKXtyZXR1cm4gdGhpcy54fXNldCB3aWR0aCh0KXt0aGlzLng9dH1nZXQgaGVpZ2h0KCl7cmV0dXJuIHRoaXMueX1zZXQgaGVpZ2h0KHQpe3RoaXMueT10fXNldCh0LGUpe3JldHVybiB0aGlzLng9dCx0aGlzLnk9ZSx0aGlzfXNldFNjYWxhcih0KXtyZXR1cm4gdGhpcy54PXQsdGhpcy55PXQsdGhpc31zZXRYKHQpe3JldHVybiB0aGlzLng9dCx0aGlzfXNldFkodCl7cmV0dXJuIHRoaXMueT10LHRoaXN9c2V0Q29tcG9uZW50KHQsZSl7c3dpdGNoKHQpe2Nhc2UgMDp0aGlzLng9ZTticmVhaztjYXNlIDE6dGhpcy55PWU7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoImluZGV4IGlzIG91dCBvZiByYW5nZTogIit0KX1yZXR1cm4gdGhpc31nZXRDb21wb25lbnQodCl7c3dpdGNoKHQpe2Nhc2UgMDpyZXR1cm4gdGhpcy54O2Nhc2UgMTpyZXR1cm4gdGhpcy55O2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKCJpbmRleCBpcyBvdXQgb2YgcmFuZ2U6ICIrdCl9fWNsb25lKCl7cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMueCx0aGlzLnkpfWNvcHkodCl7cmV0dXJuIHRoaXMueD10LngsdGhpcy55PXQueSx0aGlzfWFkZCh0LGUpe3JldHVybiBlIT09dm9pZCAwPyhjb25zb2xlLndhcm4oIlRIUkVFLlZlY3RvcjI6IC5hZGQoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5hZGRWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4iKSx0aGlzLmFkZFZlY3RvcnModCxlKSk6KHRoaXMueCs9dC54LHRoaXMueSs9dC55LHRoaXMpfWFkZFNjYWxhcih0KXtyZXR1cm4gdGhpcy54Kz10LHRoaXMueSs9dCx0aGlzfWFkZFZlY3RvcnModCxlKXtyZXR1cm4gdGhpcy54PXQueCtlLngsdGhpcy55PXQueStlLnksdGhpc31hZGRTY2FsZWRWZWN0b3IodCxlKXtyZXR1cm4gdGhpcy54Kz10LngqZSx0aGlzLnkrPXQueSplLHRoaXN9c3ViKHQsZSl7cmV0dXJuIGUhPT12b2lkIDA/KGNvbnNvbGUud2FybigiVEhSRUUuVmVjdG9yMjogLnN1YigpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLnN1YlZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLiIpLHRoaXMuc3ViVmVjdG9ycyh0LGUpKToodGhpcy54LT10LngsdGhpcy55LT10LnksdGhpcyl9c3ViU2NhbGFyKHQpe3JldHVybiB0aGlzLngtPXQsdGhpcy55LT10LHRoaXN9c3ViVmVjdG9ycyh0LGUpe3JldHVybiB0aGlzLng9dC54LWUueCx0aGlzLnk9dC55LWUueSx0aGlzfW11bHRpcGx5KHQpe3JldHVybiB0aGlzLngqPXQueCx0aGlzLnkqPXQueSx0aGlzfW11bHRpcGx5U2NhbGFyKHQpe3JldHVybiB0aGlzLngqPXQsdGhpcy55Kj10LHRoaXN9ZGl2aWRlKHQpe3JldHVybiB0aGlzLngvPXQueCx0aGlzLnkvPXQueSx0aGlzfWRpdmlkZVNjYWxhcih0KXtyZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhcigxL3QpfWFwcGx5TWF0cml4Myh0KXtjb25zdCBlPXRoaXMueCxzPXRoaXMueSxpPXQuZWxlbWVudHM7cmV0dXJuIHRoaXMueD1pWzBdKmUraVszXSpzK2lbNl0sdGhpcy55PWlbMV0qZStpWzRdKnMraVs3XSx0aGlzfW1pbih0KXtyZXR1cm4gdGhpcy54PU1hdGgubWluKHRoaXMueCx0LngpLHRoaXMueT1NYXRoLm1pbih0aGlzLnksdC55KSx0aGlzfW1heCh0KXtyZXR1cm4gdGhpcy54PU1hdGgubWF4KHRoaXMueCx0LngpLHRoaXMueT1NYXRoLm1heCh0aGlzLnksdC55KSx0aGlzfWNsYW1wKHQsZSl7cmV0dXJuIHRoaXMueD1NYXRoLm1heCh0LngsTWF0aC5taW4oZS54LHRoaXMueCkpLHRoaXMueT1NYXRoLm1heCh0LnksTWF0aC5taW4oZS55LHRoaXMueSkpLHRoaXN9Y2xhbXBTY2FsYXIodCxlKXtyZXR1cm4gdGhpcy54PU1hdGgubWF4KHQsTWF0aC5taW4oZSx0aGlzLngpKSx0aGlzLnk9TWF0aC5tYXgodCxNYXRoLm1pbihlLHRoaXMueSkpLHRoaXN9Y2xhbXBMZW5ndGgodCxlKXtjb25zdCBzPXRoaXMubGVuZ3RoKCk7cmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKHN8fDEpLm11bHRpcGx5U2NhbGFyKE1hdGgubWF4KHQsTWF0aC5taW4oZSxzKSkpfWZsb29yKCl7cmV0dXJuIHRoaXMueD1NYXRoLmZsb29yKHRoaXMueCksdGhpcy55PU1hdGguZmxvb3IodGhpcy55KSx0aGlzfWNlaWwoKXtyZXR1cm4gdGhpcy54PU1hdGguY2VpbCh0aGlzLngpLHRoaXMueT1NYXRoLmNlaWwodGhpcy55KSx0aGlzfXJvdW5kKCl7cmV0dXJuIHRoaXMueD1NYXRoLnJvdW5kKHRoaXMueCksdGhpcy55PU1hdGgucm91bmQodGhpcy55KSx0aGlzfXJvdW5kVG9aZXJvKCl7cmV0dXJuIHRoaXMueD10aGlzLng8MD9NYXRoLmNlaWwodGhpcy54KTpNYXRoLmZsb29yKHRoaXMueCksdGhpcy55PXRoaXMueTwwP01hdGguY2VpbCh0aGlzLnkpOk1hdGguZmxvb3IodGhpcy55KSx0aGlzfW5lZ2F0ZSgpe3JldHVybiB0aGlzLng9LXRoaXMueCx0aGlzLnk9LXRoaXMueSx0aGlzfWRvdCh0KXtyZXR1cm4gdGhpcy54KnQueCt0aGlzLnkqdC55fWNyb3NzKHQpe3JldHVybiB0aGlzLngqdC55LXRoaXMueSp0Lnh9bGVuZ3RoU3EoKXtyZXR1cm4gdGhpcy54KnRoaXMueCt0aGlzLnkqdGhpcy55fWxlbmd0aCgpe3JldHVybiBNYXRoLnNxcnQodGhpcy54KnRoaXMueCt0aGlzLnkqdGhpcy55KX1tYW5oYXR0YW5MZW5ndGgoKXtyZXR1cm4gTWF0aC5hYnModGhpcy54KStNYXRoLmFicyh0aGlzLnkpfW5vcm1hbGl6ZSgpe3JldHVybiB0aGlzLmRpdmlkZVNjYWxhcih0aGlzLmxlbmd0aCgpfHwxKX1hbmdsZSgpe3JldHVybiBNYXRoLmF0YW4yKC10aGlzLnksLXRoaXMueCkrTWF0aC5QSX1kaXN0YW5jZVRvKHQpe3JldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVRvU3F1YXJlZCh0KSl9ZGlzdGFuY2VUb1NxdWFyZWQodCl7Y29uc3QgZT10aGlzLngtdC54LHM9dGhpcy55LXQueTtyZXR1cm4gZSplK3Mqc31tYW5oYXR0YW5EaXN0YW5jZVRvKHQpe3JldHVybiBNYXRoLmFicyh0aGlzLngtdC54KStNYXRoLmFicyh0aGlzLnktdC55KX1zZXRMZW5ndGgodCl7cmV0dXJuIHRoaXMubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIodCl9bGVycCh0LGUpe3JldHVybiB0aGlzLngrPSh0LngtdGhpcy54KSplLHRoaXMueSs9KHQueS10aGlzLnkpKmUsdGhpc31sZXJwVmVjdG9ycyh0LGUscyl7cmV0dXJuIHRoaXMueD10LngrKGUueC10LngpKnMsdGhpcy55PXQueSsoZS55LXQueSkqcyx0aGlzfWVxdWFscyh0KXtyZXR1cm4gdC54PT09dGhpcy54JiZ0Lnk9PT10aGlzLnl9ZnJvbUFycmF5KHQsZT0wKXtyZXR1cm4gdGhpcy54PXRbZV0sdGhpcy55PXRbZSsxXSx0aGlzfXRvQXJyYXkodD1bXSxlPTApe3JldHVybiB0W2VdPXRoaXMueCx0W2UrMV09dGhpcy55LHR9ZnJvbUJ1ZmZlckF0dHJpYnV0ZSh0LGUscyl7cmV0dXJuIHMhPT12b2lkIDAmJmNvbnNvbGUud2FybigiVEhSRUUuVmVjdG9yMjogb2Zmc2V0IGhhcyBiZWVuIHJlbW92ZWQgZnJvbSAuZnJvbUJ1ZmZlckF0dHJpYnV0ZSgpLiIpLHRoaXMueD10LmdldFgoZSksdGhpcy55PXQuZ2V0WShlKSx0aGlzfXJvdGF0ZUFyb3VuZCh0LGUpe2NvbnN0IHM9TWF0aC5jb3MoZSksaT1NYXRoLnNpbihlKSxuPXRoaXMueC10Lngscj10aGlzLnktdC55O3JldHVybiB0aGlzLng9bipzLXIqaSt0LngsdGhpcy55PW4qaStyKnMrdC55LHRoaXN9cmFuZG9tKCl7cmV0dXJuIHRoaXMueD1NYXRoLnJhbmRvbSgpLHRoaXMueT1NYXRoLnJhbmRvbSgpLHRoaXN9KltTeW1ib2wuaXRlcmF0b3JdKCl7eWllbGQgdGhpcy54LHlpZWxkIHRoaXMueX19Y2xhc3MgWHR7Y29uc3RydWN0b3IoKXtYdC5wcm90b3R5cGUuaXNNYXRyaXgzPSEwLHRoaXMuZWxlbWVudHM9WzEsMCwwLDAsMSwwLDAsMCwxXSxhcmd1bWVudHMubGVuZ3RoPjAmJmNvbnNvbGUuZXJyb3IoIlRIUkVFLk1hdHJpeDM6IHRoZSBjb25zdHJ1Y3RvciBubyBsb25nZXIgcmVhZHMgYXJndW1lbnRzLiB1c2UgLnNldCgpIGluc3RlYWQuIil9c2V0KHQsZSxzLGksbixyLG8sYSxoKXtjb25zdCBsPXRoaXMuZWxlbWVudHM7cmV0dXJuIGxbMF09dCxsWzFdPWksbFsyXT1vLGxbM109ZSxsWzRdPW4sbFs1XT1hLGxbNl09cyxsWzddPXIsbFs4XT1oLHRoaXN9aWRlbnRpdHkoKXtyZXR1cm4gdGhpcy5zZXQoMSwwLDAsMCwxLDAsMCwwLDEpLHRoaXN9Y29weSh0KXtjb25zdCBlPXRoaXMuZWxlbWVudHMscz10LmVsZW1lbnRzO3JldHVybiBlWzBdPXNbMF0sZVsxXT1zWzFdLGVbMl09c1syXSxlWzNdPXNbM10sZVs0XT1zWzRdLGVbNV09c1s1XSxlWzZdPXNbNl0sZVs3XT1zWzddLGVbOF09c1s4XSx0aGlzfWV4dHJhY3RCYXNpcyh0LGUscyl7cmV0dXJuIHQuc2V0RnJvbU1hdHJpeDNDb2x1bW4odGhpcywwKSxlLnNldEZyb21NYXRyaXgzQ29sdW1uKHRoaXMsMSkscy5zZXRGcm9tTWF0cml4M0NvbHVtbih0aGlzLDIpLHRoaXN9c2V0RnJvbU1hdHJpeDQodCl7Y29uc3QgZT10LmVsZW1lbnRzO3JldHVybiB0aGlzLnNldChlWzBdLGVbNF0sZVs4XSxlWzFdLGVbNV0sZVs5XSxlWzJdLGVbNl0sZVsxMF0pLHRoaXN9bXVsdGlwbHkodCl7cmV0dXJuIHRoaXMubXVsdGlwbHlNYXRyaWNlcyh0aGlzLHQpfXByZW11bHRpcGx5KHQpe3JldHVybiB0aGlzLm11bHRpcGx5TWF0cmljZXModCx0aGlzKX1tdWx0aXBseU1hdHJpY2VzKHQsZSl7Y29uc3Qgcz10LmVsZW1lbnRzLGk9ZS5lbGVtZW50cyxuPXRoaXMuZWxlbWVudHMscj1zWzBdLG89c1szXSxhPXNbNl0saD1zWzFdLGw9c1s0XSx1PXNbN10sZD1zWzJdLGY9c1s1XSxwPXNbOF0sbT1pWzBdLGc9aVszXSx5PWlbNl0sTT1pWzFdLHc9aVs0XSxfPWlbN10sYj1pWzJdLEE9aVs1XSxTPWlbOF07cmV0dXJuIG5bMF09ciptK28qTSthKmIsblszXT1yKmcrbyp3K2EqQSxuWzZdPXIqeStvKl8rYSpTLG5bMV09aCptK2wqTSt1KmIsbls0XT1oKmcrbCp3K3UqQSxuWzddPWgqeStsKl8rdSpTLG5bMl09ZCptK2YqTStwKmIsbls1XT1kKmcrZip3K3AqQSxuWzhdPWQqeStmKl8rcCpTLHRoaXN9bXVsdGlwbHlTY2FsYXIodCl7Y29uc3QgZT10aGlzLmVsZW1lbnRzO3JldHVybiBlWzBdKj10LGVbM10qPXQsZVs2XSo9dCxlWzFdKj10LGVbNF0qPXQsZVs3XSo9dCxlWzJdKj10LGVbNV0qPXQsZVs4XSo9dCx0aGlzfWRldGVybWluYW50KCl7Y29uc3QgdD10aGlzLmVsZW1lbnRzLGU9dFswXSxzPXRbMV0saT10WzJdLG49dFszXSxyPXRbNF0sbz10WzVdLGE9dFs2XSxoPXRbN10sbD10WzhdO3JldHVybiBlKnIqbC1lKm8qaC1zKm4qbCtzKm8qYStpKm4qaC1pKnIqYX1pbnZlcnQoKXtjb25zdCB0PXRoaXMuZWxlbWVudHMsZT10WzBdLHM9dFsxXSxpPXRbMl0sbj10WzNdLHI9dFs0XSxvPXRbNV0sYT10WzZdLGg9dFs3XSxsPXRbOF0sdT1sKnItbypoLGQ9byphLWwqbixmPWgqbi1yKmEscD1lKnUrcypkK2kqZjtpZihwPT09MClyZXR1cm4gdGhpcy5zZXQoMCwwLDAsMCwwLDAsMCwwLDApO2NvbnN0IG09MS9wO3JldHVybiB0WzBdPXUqbSx0WzFdPShpKmgtbCpzKSptLHRbMl09KG8qcy1pKnIpKm0sdFszXT1kKm0sdFs0XT0obCplLWkqYSkqbSx0WzVdPShpKm4tbyplKSptLHRbNl09ZiptLHRbN109KHMqYS1oKmUpKm0sdFs4XT0ociplLXMqbikqbSx0aGlzfXRyYW5zcG9zZSgpe2xldCB0O2NvbnN0IGU9dGhpcy5lbGVtZW50cztyZXR1cm4gdD1lWzFdLGVbMV09ZVszXSxlWzNdPXQsdD1lWzJdLGVbMl09ZVs2XSxlWzZdPXQsdD1lWzVdLGVbNV09ZVs3XSxlWzddPXQsdGhpc31nZXROb3JtYWxNYXRyaXgodCl7cmV0dXJuIHRoaXMuc2V0RnJvbU1hdHJpeDQodCkuaW52ZXJ0KCkudHJhbnNwb3NlKCl9dHJhbnNwb3NlSW50b0FycmF5KHQpe2NvbnN0IGU9dGhpcy5lbGVtZW50cztyZXR1cm4gdFswXT1lWzBdLHRbMV09ZVszXSx0WzJdPWVbNl0sdFszXT1lWzFdLHRbNF09ZVs0XSx0WzVdPWVbN10sdFs2XT1lWzJdLHRbN109ZVs1XSx0WzhdPWVbOF0sdGhpc31zZXRVdlRyYW5zZm9ybSh0LGUscyxpLG4scixvKXtjb25zdCBhPU1hdGguY29zKG4pLGg9TWF0aC5zaW4obik7cmV0dXJuIHRoaXMuc2V0KHMqYSxzKmgsLXMqKGEqcitoKm8pK3IrdCwtaSpoLGkqYSwtaSooLWgqcithKm8pK28rZSwwLDAsMSksdGhpc31zY2FsZSh0LGUpe2NvbnN0IHM9dGhpcy5lbGVtZW50cztyZXR1cm4gc1swXSo9dCxzWzNdKj10LHNbNl0qPXQsc1sxXSo9ZSxzWzRdKj1lLHNbN10qPWUsdGhpc31yb3RhdGUodCl7Y29uc3QgZT1NYXRoLmNvcyh0KSxzPU1hdGguc2luKHQpLGk9dGhpcy5lbGVtZW50cyxuPWlbMF0scj1pWzNdLG89aVs2XSxhPWlbMV0saD1pWzRdLGw9aVs3XTtyZXR1cm4gaVswXT1lKm4rcyphLGlbM109ZSpyK3MqaCxpWzZdPWUqbytzKmwsaVsxXT0tcypuK2UqYSxpWzRdPS1zKnIrZSpoLGlbN109LXMqbytlKmwsdGhpc310cmFuc2xhdGUodCxlKXtjb25zdCBzPXRoaXMuZWxlbWVudHM7cmV0dXJuIHNbMF0rPXQqc1syXSxzWzNdKz10KnNbNV0sc1s2XSs9dCpzWzhdLHNbMV0rPWUqc1syXSxzWzRdKz1lKnNbNV0sc1s3XSs9ZSpzWzhdLHRoaXN9ZXF1YWxzKHQpe2NvbnN0IGU9dGhpcy5lbGVtZW50cyxzPXQuZWxlbWVudHM7Zm9yKGxldCBpPTA7aTw5O2krKylpZihlW2ldIT09c1tpXSlyZXR1cm4hMTtyZXR1cm4hMH1mcm9tQXJyYXkodCxlPTApe2ZvcihsZXQgcz0wO3M8OTtzKyspdGhpcy5lbGVtZW50c1tzXT10W3MrZV07cmV0dXJuIHRoaXN9dG9BcnJheSh0PVtdLGU9MCl7Y29uc3Qgcz10aGlzLmVsZW1lbnRzO3JldHVybiB0W2VdPXNbMF0sdFtlKzFdPXNbMV0sdFtlKzJdPXNbMl0sdFtlKzNdPXNbM10sdFtlKzRdPXNbNF0sdFtlKzVdPXNbNV0sdFtlKzZdPXNbNl0sdFtlKzddPXNbN10sdFtlKzhdPXNbOF0sdH1jbG9uZSgpe3JldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcigpLmZyb21BcnJheSh0aGlzLmVsZW1lbnRzKX19ZnVuY3Rpb24gQWEoYyl7Zm9yKGxldCB0PWMubGVuZ3RoLTE7dD49MDstLXQpaWYoY1t0XT42NTUzNSlyZXR1cm4hMDtyZXR1cm4hMX1mdW5jdGlvbiBlaShjKXtyZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIixjKX1mdW5jdGlvbiBEdChjKXtyZXR1cm4gYzwuMDQwNDU/YyouMDc3Mzk5MzgwODpNYXRoLnBvdyhjKi45NDc4NjcyOTg2Ky4wNTIxMzI3MDE0LDIuNCl9ZnVuY3Rpb24gcWUoYyl7cmV0dXJuIGM8LjAwMzEzMDg/YyoxMi45MjoxLjA1NSpNYXRoLnBvdyhjLC40MTY2NiktLjA1NX1jb25zdCBzaT17W2R0XTp7W050XTpEdH0sW050XTp7W2R0XTpxZX19LG50PXtsZWdhY3lNb2RlOiEwLGdldCB3b3JraW5nQ29sb3JTcGFjZSgpe3JldHVybiBOdH0sc2V0IHdvcmtpbmdDb2xvclNwYWNlKGMpe2NvbnNvbGUud2FybigiVEhSRUUuQ29sb3JNYW5hZ2VtZW50OiAud29ya2luZ0NvbG9yU3BhY2UgaXMgcmVhZG9ubHkuIil9LGNvbnZlcnQ6ZnVuY3Rpb24oYyx0LGUpe2lmKHRoaXMubGVnYWN5TW9kZXx8dD09PWV8fCF0fHwhZSlyZXR1cm4gYztpZihzaVt0XSYmc2lbdF1bZV0hPT12b2lkIDApe2NvbnN0IHM9c2lbdF1bZV07cmV0dXJuIGMucj1zKGMuciksYy5nPXMoYy5nKSxjLmI9cyhjLmIpLGN9dGhyb3cgbmV3IEVycm9yKCJVbnN1cHBvcnRlZCBjb2xvciBzcGFjZSBjb252ZXJzaW9uLiIpfSxmcm9tV29ya2luZ0NvbG9yU3BhY2U6ZnVuY3Rpb24oYyx0KXtyZXR1cm4gdGhpcy5jb252ZXJ0KGMsdGhpcy53b3JraW5nQ29sb3JTcGFjZSx0KX0sdG9Xb3JraW5nQ29sb3JTcGFjZTpmdW5jdGlvbihjLHQpe3JldHVybiB0aGlzLmNvbnZlcnQoYyx0LHRoaXMud29ya2luZ0NvbG9yU3BhY2UpfX0sVm49e2FsaWNlYmx1ZToxNTc5MjM4MyxhbnRpcXVld2hpdGU6MTY0NDQzNzUsYXF1YTo2NTUzNSxhcXVhbWFyaW5lOjgzODg1NjQsYXp1cmU6MTU3OTQxNzUsYmVpZ2U6MTYxMTkyNjAsYmlzcXVlOjE2NzcwMjQ0LGJsYWNrOjAsYmxhbmNoZWRhbG1vbmQ6MTY3NzIwNDUsYmx1ZToyNTUsYmx1ZXZpb2xldDo5MDU1MjAyLGJyb3duOjEwODI0MjM0LGJ1cmx5d29vZDoxNDU5NjIzMSxjYWRldGJsdWU6NjI2NjUyOCxjaGFydHJldXNlOjgzODgzNTIsY2hvY29sYXRlOjEzNzg5NDcwLGNvcmFsOjE2NzQ0MjcyLGNvcm5mbG93ZXJibHVlOjY1OTE5ODEsY29ybnNpbGs6MTY3NzUzODgsY3JpbXNvbjoxNDQyMzEwMCxjeWFuOjY1NTM1LGRhcmtibHVlOjEzOSxkYXJrY3lhbjozNTcyMyxkYXJrZ29sZGVucm9kOjEyMDkyOTM5LGRhcmtncmF5OjExMTE5MDE3LGRhcmtncmVlbjoyNTYwMCxkYXJrZ3JleToxMTExOTAxNyxkYXJra2hha2k6MTI0MzMyNTksZGFya21hZ2VudGE6OTEwOTY0MyxkYXJrb2xpdmVncmVlbjo1NTk3OTk5LGRhcmtvcmFuZ2U6MTY3NDc1MjAsZGFya29yY2hpZDoxMDA0MDAxMixkYXJrcmVkOjkxMDk1MDQsZGFya3NhbG1vbjoxNTMwODQxMCxkYXJrc2VhZ3JlZW46OTQxOTkxOSxkYXJrc2xhdGVibHVlOjQ3MzQzNDcsZGFya3NsYXRlZ3JheTozMTAwNDk1LGRhcmtzbGF0ZWdyZXk6MzEwMDQ5NSxkYXJrdHVycXVvaXNlOjUyOTQ1LGRhcmt2aW9sZXQ6OTY5OTUzOSxkZWVwcGluazoxNjcxNjk0NyxkZWVwc2t5Ymx1ZTo0OTE1MSxkaW1ncmF5OjY5MDgyNjUsZGltZ3JleTo2OTA4MjY1LGRvZGdlcmJsdWU6MjAwMzE5OSxmaXJlYnJpY2s6MTE2NzQxNDYsZmxvcmFsd2hpdGU6MTY3NzU5MjAsZm9yZXN0Z3JlZW46MjI2Mzg0MixmdWNoc2lhOjE2NzExOTM1LGdhaW5zYm9ybzoxNDQ3NDQ2MCxnaG9zdHdoaXRlOjE2MzE2NjcxLGdvbGQ6MTY3NjY3MjAsZ29sZGVucm9kOjE0MzI5MTIwLGdyYXk6ODQyMTUwNCxncmVlbjozMjc2OCxncmVlbnllbGxvdzoxMTQwMzA1NSxncmV5Ojg0MjE1MDQsaG9uZXlkZXc6MTU3OTQxNjAsaG90cGluazoxNjczODc0MCxpbmRpYW5yZWQ6MTM0NTg1MjQsaW5kaWdvOjQ5MTUzMzAsaXZvcnk6MTY3NzcyMDAsa2hha2k6MTU3ODc2NjAsbGF2ZW5kZXI6MTUxMzI0MTAsbGF2ZW5kZXJibHVzaDoxNjc3MzM2NSxsYXduZ3JlZW46ODE5MDk3NixsZW1vbmNoaWZmb246MTY3NzU4ODUsbGlnaHRibHVlOjExMzkzMjU0LGxpZ2h0Y29yYWw6MTU3NjE1MzYsbGlnaHRjeWFuOjE0NzQ1NTk5LGxpZ2h0Z29sZGVucm9keWVsbG93OjE2NDQ4MjEwLGxpZ2h0Z3JheToxMzg4MjMyMyxsaWdodGdyZWVuOjk0OTgyNTYsbGlnaHRncmV5OjEzODgyMzIzLGxpZ2h0cGluazoxNjc1ODQ2NSxsaWdodHNhbG1vbjoxNjc1Mjc2MixsaWdodHNlYWdyZWVuOjIxNDI4OTAsbGlnaHRza3libHVlOjg5MDAzNDYsbGlnaHRzbGF0ZWdyYXk6NzgzMzc1MyxsaWdodHNsYXRlZ3JleTo3ODMzNzUzLGxpZ2h0c3RlZWxibHVlOjExNTg0NzM0LGxpZ2h0eWVsbG93OjE2Nzc3MTg0LGxpbWU6NjUyODAsbGltZWdyZWVuOjMzMjkzMzAsbGluZW46MTY0NDU2NzAsbWFnZW50YToxNjcxMTkzNSxtYXJvb246ODM4ODYwOCxtZWRpdW1hcXVhbWFyaW5lOjY3MzczMjIsbWVkaXVtYmx1ZToyMDUsbWVkaXVtb3JjaGlkOjEyMjExNjY3LG1lZGl1bXB1cnBsZTo5NjYyNjgzLG1lZGl1bXNlYWdyZWVuOjM5NzgwOTcsbWVkaXVtc2xhdGVibHVlOjgwODc3OTAsbWVkaXVtc3ByaW5nZ3JlZW46NjQxNTQsbWVkaXVtdHVycXVvaXNlOjQ3NzIzMDAsbWVkaXVtdmlvbGV0cmVkOjEzMDQ3MTczLG1pZG5pZ2h0Ymx1ZToxNjQ0OTEyLG1pbnRjcmVhbToxNjEyMTg1MCxtaXN0eXJvc2U6MTY3NzAyNzMsbW9jY2FzaW46MTY3NzAyMjksbmF2YWpvd2hpdGU6MTY3Njg2ODUsbmF2eToxMjgsb2xkbGFjZToxNjY0MzU1OCxvbGl2ZTo4NDIxMzc2LG9saXZlZHJhYjo3MDQ4NzM5LG9yYW5nZToxNjc1MzkyMCxvcmFuZ2VyZWQ6MTY3MjkzNDQsb3JjaGlkOjE0MzE1NzM0LHBhbGVnb2xkZW5yb2Q6MTU2NTcxMzAscGFsZWdyZWVuOjEwMDI1ODgwLHBhbGV0dXJxdW9pc2U6MTE1Mjk5NjYscGFsZXZpb2xldHJlZDoxNDM4MTIwMyxwYXBheWF3aGlwOjE2NzczMDc3LHBlYWNocHVmZjoxNjc2NzY3MyxwZXJ1OjEzNDY4OTkxLHBpbms6MTY3NjEwMzUscGx1bToxNDUyNDYzNyxwb3dkZXJibHVlOjExNTkxOTEwLHB1cnBsZTo4Mzg4NzM2LHJlYmVjY2FwdXJwbGU6NjY5Nzg4MSxyZWQ6MTY3MTE2ODAscm9zeWJyb3duOjEyMzU3NTE5LHJveWFsYmx1ZTo0Mjg2OTQ1LHNhZGRsZWJyb3duOjkxMjcxODcsc2FsbW9uOjE2NDE2ODgyLHNhbmR5YnJvd246MTYwMzI4NjQsc2VhZ3JlZW46MzA1MDMyNyxzZWFzaGVsbDoxNjc3NDYzOCxzaWVubmE6MTA1MDY3OTcsc2lsdmVyOjEyNjMyMjU2LHNreWJsdWU6ODkwMDMzMSxzbGF0ZWJsdWU6Njk3MDA2MSxzbGF0ZWdyYXk6NzM3Mjk0NCxzbGF0ZWdyZXk6NzM3Mjk0NCxzbm93OjE2Nzc1OTMwLHNwcmluZ2dyZWVuOjY1NDA3LHN0ZWVsYmx1ZTo0NjIwOTgwLHRhbjoxMzgwODc4MCx0ZWFsOjMyODk2LHRoaXN0bGU6MTQyMDQ4ODgsdG9tYXRvOjE2NzM3MDk1LHR1cnF1b2lzZTo0MjUxODU2LHZpb2xldDoxNTYzMTA4Nix3aGVhdDoxNjExMzMzMSx3aGl0ZToxNjc3NzIxNSx3aGl0ZXNtb2tlOjE2MTE5Mjg1LHllbGxvdzoxNjc3Njk2MCx5ZWxsb3dncmVlbjoxMDE0NTA3NH0sVj17cjowLGc6MCxiOjB9LHJ0PXtoOjAsczowLGw6MH0sWmU9e2g6MCxzOjAsbDowfTtmdW5jdGlvbiBpaShjLHQsZSl7cmV0dXJuIGU8MCYmKGUrPTEpLGU+MSYmKGUtPTEpLGU8MS82P2MrKHQtYykqNiplOmU8MS8yP3Q6ZTwyLzM/YysodC1jKSo2KigyLzMtZSk6Y31mdW5jdGlvbiBYZShjLHQpe3JldHVybiB0LnI9Yy5yLHQuZz1jLmcsdC5iPWMuYix0fWNsYXNzIFB7Y29uc3RydWN0b3IodCxlLHMpe3JldHVybiB0aGlzLmlzQ29sb3I9ITAsdGhpcy5yPTEsdGhpcy5nPTEsdGhpcy5iPTEsZT09PXZvaWQgMCYmcz09PXZvaWQgMD90aGlzLnNldCh0KTp0aGlzLnNldFJHQih0LGUscyl9c2V0KHQpe3JldHVybiB0JiZ0LmlzQ29sb3I/dGhpcy5jb3B5KHQpOnR5cGVvZiB0PT0ibnVtYmVyIj90aGlzLnNldEhleCh0KTp0eXBlb2YgdD09InN0cmluZyImJnRoaXMuc2V0U3R5bGUodCksdGhpc31zZXRTY2FsYXIodCl7cmV0dXJuIHRoaXMucj10LHRoaXMuZz10LHRoaXMuYj10LHRoaXN9c2V0SGV4KHQsZT1kdCl7cmV0dXJuIHQ9TWF0aC5mbG9vcih0KSx0aGlzLnI9KHQ+PjE2JjI1NSkvMjU1LHRoaXMuZz0odD4+OCYyNTUpLzI1NSx0aGlzLmI9KHQmMjU1KS8yNTUsbnQudG9Xb3JraW5nQ29sb3JTcGFjZSh0aGlzLGUpLHRoaXN9c2V0UkdCKHQsZSxzLGk9TnQpe3JldHVybiB0aGlzLnI9dCx0aGlzLmc9ZSx0aGlzLmI9cyxudC50b1dvcmtpbmdDb2xvclNwYWNlKHRoaXMsaSksdGhpc31zZXRIU0wodCxlLHMsaT1OdCl7aWYodD10aSh0LDEpLGU9WihlLDAsMSkscz1aKHMsMCwxKSxlPT09MCl0aGlzLnI9dGhpcy5nPXRoaXMuYj1zO2Vsc2V7Y29uc3Qgbj1zPD0uNT9zKigxK2UpOnMrZS1zKmUscj0yKnMtbjt0aGlzLnI9aWkocixuLHQrMS8zKSx0aGlzLmc9aWkocixuLHQpLHRoaXMuYj1paShyLG4sdC0xLzMpfXJldHVybiBudC50b1dvcmtpbmdDb2xvclNwYWNlKHRoaXMsaSksdGhpc31zZXRTdHlsZSh0LGU9ZHQpe2Z1bmN0aW9uIHMobil7biE9PXZvaWQgMCYmcGFyc2VGbG9hdChuKTwxJiZjb25zb2xlLndhcm4oIlRIUkVFLkNvbG9yOiBBbHBoYSBjb21wb25lbnQgb2YgIit0KyIgd2lsbCBiZSBpZ25vcmVkLiIpfWxldCBpO2lmKGk9L14oKD86cmdifGhzbClhPylcKChbXlwpXSopXCkvLmV4ZWModCkpe2xldCBuO2NvbnN0IHI9aVsxXSxvPWlbMl07c3dpdGNoKHIpe2Nhc2UicmdiIjpjYXNlInJnYmEiOmlmKG49L15ccyooXGQrKVxzKixccyooXGQrKVxzKixccyooXGQrKVxzKig/OixccyooXGQqXC4/XGQrKVxzKik/JC8uZXhlYyhvKSlyZXR1cm4gdGhpcy5yPU1hdGgubWluKDI1NSxwYXJzZUludChuWzFdLDEwKSkvMjU1LHRoaXMuZz1NYXRoLm1pbigyNTUscGFyc2VJbnQoblsyXSwxMCkpLzI1NSx0aGlzLmI9TWF0aC5taW4oMjU1LHBhcnNlSW50KG5bM10sMTApKS8yNTUsbnQudG9Xb3JraW5nQ29sb3JTcGFjZSh0aGlzLGUpLHMobls0XSksdGhpcztpZihuPS9eXHMqKFxkKylcJVxzKixccyooXGQrKVwlXHMqLFxzKihcZCspXCVccyooPzosXHMqKFxkKlwuP1xkKylccyopPyQvLmV4ZWMobykpcmV0dXJuIHRoaXMucj1NYXRoLm1pbigxMDAscGFyc2VJbnQoblsxXSwxMCkpLzEwMCx0aGlzLmc9TWF0aC5taW4oMTAwLHBhcnNlSW50KG5bMl0sMTApKS8xMDAsdGhpcy5iPU1hdGgubWluKDEwMCxwYXJzZUludChuWzNdLDEwKSkvMTAwLG50LnRvV29ya2luZ0NvbG9yU3BhY2UodGhpcyxlKSxzKG5bNF0pLHRoaXM7YnJlYWs7Y2FzZSJoc2wiOmNhc2UiaHNsYSI6aWYobj0vXlxzKihcZCpcLj9cZCspXHMqLFxzKihcZCspXCVccyosXHMqKFxkKylcJVxzKig/OixccyooXGQqXC4/XGQrKVxzKik/JC8uZXhlYyhvKSl7Y29uc3QgYT1wYXJzZUZsb2F0KG5bMV0pLzM2MCxoPXBhcnNlSW50KG5bMl0sMTApLzEwMCxsPXBhcnNlSW50KG5bM10sMTApLzEwMDtyZXR1cm4gcyhuWzRdKSx0aGlzLnNldEhTTChhLGgsbCxlKX1icmVha319ZWxzZSBpZihpPS9eXCMoW0EtRmEtZlxkXSspJC8uZXhlYyh0KSl7Y29uc3Qgbj1pWzFdLHI9bi5sZW5ndGg7aWYocj09PTMpcmV0dXJuIHRoaXMucj1wYXJzZUludChuLmNoYXJBdCgwKStuLmNoYXJBdCgwKSwxNikvMjU1LHRoaXMuZz1wYXJzZUludChuLmNoYXJBdCgxKStuLmNoYXJBdCgxKSwxNikvMjU1LHRoaXMuYj1wYXJzZUludChuLmNoYXJBdCgyKStuLmNoYXJBdCgyKSwxNikvMjU1LG50LnRvV29ya2luZ0NvbG9yU3BhY2UodGhpcyxlKSx0aGlzO2lmKHI9PT02KXJldHVybiB0aGlzLnI9cGFyc2VJbnQobi5jaGFyQXQoMCkrbi5jaGFyQXQoMSksMTYpLzI1NSx0aGlzLmc9cGFyc2VJbnQobi5jaGFyQXQoMikrbi5jaGFyQXQoMyksMTYpLzI1NSx0aGlzLmI9cGFyc2VJbnQobi5jaGFyQXQoNCkrbi5jaGFyQXQoNSksMTYpLzI1NSxudC50b1dvcmtpbmdDb2xvclNwYWNlKHRoaXMsZSksdGhpc31yZXR1cm4gdCYmdC5sZW5ndGg+MD90aGlzLnNldENvbG9yTmFtZSh0LGUpOnRoaXN9c2V0Q29sb3JOYW1lKHQsZT1kdCl7Y29uc3Qgcz1Wblt0LnRvTG93ZXJDYXNlKCldO3JldHVybiBzIT09dm9pZCAwP3RoaXMuc2V0SGV4KHMsZSk6Y29uc29sZS53YXJuKCJUSFJFRS5Db2xvcjogVW5rbm93biBjb2xvciAiK3QpLHRoaXN9Y2xvbmUoKXtyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5yLHRoaXMuZyx0aGlzLmIpfWNvcHkodCl7cmV0dXJuIHRoaXMucj10LnIsdGhpcy5nPXQuZyx0aGlzLmI9dC5iLHRoaXN9Y29weVNSR0JUb0xpbmVhcih0KXtyZXR1cm4gdGhpcy5yPUR0KHQuciksdGhpcy5nPUR0KHQuZyksdGhpcy5iPUR0KHQuYiksdGhpc31jb3B5TGluZWFyVG9TUkdCKHQpe3JldHVybiB0aGlzLnI9cWUodC5yKSx0aGlzLmc9cWUodC5nKSx0aGlzLmI9cWUodC5iKSx0aGlzfWNvbnZlcnRTUkdCVG9MaW5lYXIoKXtyZXR1cm4gdGhpcy5jb3B5U1JHQlRvTGluZWFyKHRoaXMpLHRoaXN9Y29udmVydExpbmVhclRvU1JHQigpe3JldHVybiB0aGlzLmNvcHlMaW5lYXJUb1NSR0IodGhpcyksdGhpc31nZXRIZXgodD1kdCl7cmV0dXJuIG50LmZyb21Xb3JraW5nQ29sb3JTcGFjZShYZSh0aGlzLFYpLHQpLFooVi5yKjI1NSwwLDI1NSk8PDE2XlooVi5nKjI1NSwwLDI1NSk8PDheWihWLmIqMjU1LDAsMjU1KTw8MH1nZXRIZXhTdHJpbmcodD1kdCl7cmV0dXJuKCIwMDAwMDAiK3RoaXMuZ2V0SGV4KHQpLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTYpfWdldEhTTCh0LGU9TnQpe250LmZyb21Xb3JraW5nQ29sb3JTcGFjZShYZSh0aGlzLFYpLGUpO2NvbnN0IHM9Vi5yLGk9Vi5nLG49Vi5iLHI9TWF0aC5tYXgocyxpLG4pLG89TWF0aC5taW4ocyxpLG4pO2xldCBhLGg7Y29uc3QgbD0obytyKS8yO2lmKG89PT1yKWE9MCxoPTA7ZWxzZXtjb25zdCB1PXItbztzd2l0Y2goaD1sPD0uNT91LyhyK28pOnUvKDItci1vKSxyKXtjYXNlIHM6YT0oaS1uKS91KyhpPG4/NjowKTticmVhaztjYXNlIGk6YT0obi1zKS91KzI7YnJlYWs7Y2FzZSBuOmE9KHMtaSkvdSs0O2JyZWFrfWEvPTZ9cmV0dXJuIHQuaD1hLHQucz1oLHQubD1sLHR9Z2V0UkdCKHQsZT1OdCl7cmV0dXJuIG50LmZyb21Xb3JraW5nQ29sb3JTcGFjZShYZSh0aGlzLFYpLGUpLHQucj1WLnIsdC5nPVYuZyx0LmI9Vi5iLHR9Z2V0U3R5bGUodD1kdCl7cmV0dXJuIG50LmZyb21Xb3JraW5nQ29sb3JTcGFjZShYZSh0aGlzLFYpLHQpLHQhPT1kdD9gY29sb3IoJHt0fSAke1Yucn0gJHtWLmd9ICR7Vi5ifSlgOmByZ2IoJHtWLnIqMjU1fDB9LCR7Vi5nKjI1NXwwfSwke1YuYioyNTV8MH0pYH1vZmZzZXRIU0wodCxlLHMpe3JldHVybiB0aGlzLmdldEhTTChydCkscnQuaCs9dCxydC5zKz1lLHJ0LmwrPXMsdGhpcy5zZXRIU0wocnQuaCxydC5zLHJ0LmwpLHRoaXN9YWRkKHQpe3JldHVybiB0aGlzLnIrPXQucix0aGlzLmcrPXQuZyx0aGlzLmIrPXQuYix0aGlzfWFkZENvbG9ycyh0LGUpe3JldHVybiB0aGlzLnI9dC5yK2Uucix0aGlzLmc9dC5nK2UuZyx0aGlzLmI9dC5iK2UuYix0aGlzfWFkZFNjYWxhcih0KXtyZXR1cm4gdGhpcy5yKz10LHRoaXMuZys9dCx0aGlzLmIrPXQsdGhpc31zdWIodCl7cmV0dXJuIHRoaXMucj1NYXRoLm1heCgwLHRoaXMuci10LnIpLHRoaXMuZz1NYXRoLm1heCgwLHRoaXMuZy10LmcpLHRoaXMuYj1NYXRoLm1heCgwLHRoaXMuYi10LmIpLHRoaXN9bXVsdGlwbHkodCl7cmV0dXJuIHRoaXMucio9dC5yLHRoaXMuZyo9dC5nLHRoaXMuYio9dC5iLHRoaXN9bXVsdGlwbHlTY2FsYXIodCl7cmV0dXJuIHRoaXMucio9dCx0aGlzLmcqPXQsdGhpcy5iKj10LHRoaXN9bGVycCh0LGUpe3JldHVybiB0aGlzLnIrPSh0LnItdGhpcy5yKSplLHRoaXMuZys9KHQuZy10aGlzLmcpKmUsdGhpcy5iKz0odC5iLXRoaXMuYikqZSx0aGlzfWxlcnBDb2xvcnModCxlLHMpe3JldHVybiB0aGlzLnI9dC5yKyhlLnItdC5yKSpzLHRoaXMuZz10LmcrKGUuZy10LmcpKnMsdGhpcy5iPXQuYisoZS5iLXQuYikqcyx0aGlzfWxlcnBIU0wodCxlKXt0aGlzLmdldEhTTChydCksdC5nZXRIU0woWmUpO2NvbnN0IHM9U2UocnQuaCxaZS5oLGUpLGk9U2UocnQucyxaZS5zLGUpLG49U2UocnQubCxaZS5sLGUpO3JldHVybiB0aGlzLnNldEhTTChzLGksbiksdGhpc31lcXVhbHModCl7cmV0dXJuIHQucj09PXRoaXMuciYmdC5nPT09dGhpcy5nJiZ0LmI9PT10aGlzLmJ9ZnJvbUFycmF5KHQsZT0wKXtyZXR1cm4gdGhpcy5yPXRbZV0sdGhpcy5nPXRbZSsxXSx0aGlzLmI9dFtlKzJdLHRoaXN9dG9BcnJheSh0PVtdLGU9MCl7cmV0dXJuIHRbZV09dGhpcy5yLHRbZSsxXT10aGlzLmcsdFtlKzJdPXRoaXMuYix0fWZyb21CdWZmZXJBdHRyaWJ1dGUodCxlKXtyZXR1cm4gdGhpcy5yPXQuZ2V0WChlKSx0aGlzLmc9dC5nZXRZKGUpLHRoaXMuYj10LmdldFooZSksdC5ub3JtYWxpemVkPT09ITAmJih0aGlzLnIvPTI1NSx0aGlzLmcvPTI1NSx0aGlzLmIvPTI1NSksdGhpc310b0pTT04oKXtyZXR1cm4gdGhpcy5nZXRIZXgoKX0qW1N5bWJvbC5pdGVyYXRvcl0oKXt5aWVsZCB0aGlzLnIseWllbGQgdGhpcy5nLHlpZWxkIHRoaXMuYn19UC5OQU1FUz1WbjtsZXQgWXQ7Y2xhc3MgVGF7c3RhdGljIGdldERhdGFVUkwodCl7aWYoL15kYXRhOi9pLnRlc3QodC5zcmMpfHx0eXBlb2YgSFRNTENhbnZhc0VsZW1lbnQ+InUiKXJldHVybiB0LnNyYztsZXQgZTtpZih0IGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpZT10O2Vsc2V7WXQ9PT12b2lkIDAmJihZdD1laSgiY2FudmFzIikpLFl0LndpZHRoPXQud2lkdGgsWXQuaGVpZ2h0PXQuaGVpZ2h0O2NvbnN0IHM9WXQuZ2V0Q29udGV4dCgiMmQiKTt0IGluc3RhbmNlb2YgSW1hZ2VEYXRhP3MucHV0SW1hZ2VEYXRhKHQsMCwwKTpzLmRyYXdJbWFnZSh0LDAsMCx0LndpZHRoLHQuaGVpZ2h0KSxlPVl0fXJldHVybiBlLndpZHRoPjIwNDh8fGUuaGVpZ2h0PjIwNDg/KGNvbnNvbGUud2FybigiVEhSRUUuSW1hZ2VVdGlscy5nZXREYXRhVVJMOiBJbWFnZSBjb252ZXJ0ZWQgdG8ganBnIGZvciBwZXJmb3JtYW5jZSByZWFzb25zIix0KSxlLnRvRGF0YVVSTCgiaW1hZ2UvanBlZyIsLjYpKTplLnRvRGF0YVVSTCgiaW1hZ2UvcG5nIil9c3RhdGljIHNSR0JUb0xpbmVhcih0KXtpZih0eXBlb2YgSFRNTEltYWdlRWxlbWVudDwidSImJnQgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50fHx0eXBlb2YgSFRNTENhbnZhc0VsZW1lbnQ8InUiJiZ0IGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnR8fHR5cGVvZiBJbWFnZUJpdG1hcDwidSImJnQgaW5zdGFuY2VvZiBJbWFnZUJpdG1hcCl7Y29uc3QgZT1laSgiY2FudmFzIik7ZS53aWR0aD10LndpZHRoLGUuaGVpZ2h0PXQuaGVpZ2h0O2NvbnN0IHM9ZS5nZXRDb250ZXh0KCIyZCIpO3MuZHJhd0ltYWdlKHQsMCwwLHQud2lkdGgsdC5oZWlnaHQpO2NvbnN0IGk9cy5nZXRJbWFnZURhdGEoMCwwLHQud2lkdGgsdC5oZWlnaHQpLG49aS5kYXRhO2ZvcihsZXQgcj0wO3I8bi5sZW5ndGg7cisrKW5bcl09RHQobltyXS8yNTUpKjI1NTtyZXR1cm4gcy5wdXRJbWFnZURhdGEoaSwwLDApLGV9ZWxzZSBpZih0LmRhdGEpe2NvbnN0IGU9dC5kYXRhLnNsaWNlKDApO2ZvcihsZXQgcz0wO3M8ZS5sZW5ndGg7cysrKWUgaW5zdGFuY2VvZiBVaW50OEFycmF5fHxlIGluc3RhbmNlb2YgVWludDhDbGFtcGVkQXJyYXk/ZVtzXT1NYXRoLmZsb29yKER0KGVbc10vMjU1KSoyNTUpOmVbc109RHQoZVtzXSk7cmV0dXJue2RhdGE6ZSx3aWR0aDp0LndpZHRoLGhlaWdodDp0LmhlaWdodH19ZWxzZSByZXR1cm4gY29uc29sZS53YXJuKCJUSFJFRS5JbWFnZVV0aWxzLnNSR0JUb0xpbmVhcigpOiBVbnN1cHBvcnRlZCBpbWFnZSB0eXBlLiBObyBjb2xvciBzcGFjZSBjb252ZXJzaW9uIGFwcGxpZWQuIiksdH19Y2xhc3MgRWF7Y29uc3RydWN0b3IodD1udWxsKXt0aGlzLmlzU291cmNlPSEwLHRoaXMudXVpZD1pdCgpLHRoaXMuZGF0YT10LHRoaXMudmVyc2lvbj0wfXNldCBuZWVkc1VwZGF0ZSh0KXt0PT09ITAmJnRoaXMudmVyc2lvbisrfXRvSlNPTih0KXtjb25zdCBlPXQ9PT12b2lkIDB8fHR5cGVvZiB0PT0ic3RyaW5nIjtpZighZSYmdC5pbWFnZXNbdGhpcy51dWlkXSE9PXZvaWQgMClyZXR1cm4gdC5pbWFnZXNbdGhpcy51dWlkXTtjb25zdCBzPXt1dWlkOnRoaXMudXVpZCx1cmw6IiJ9LGk9dGhpcy5kYXRhO2lmKGkhPT1udWxsKXtsZXQgbjtpZihBcnJheS5pc0FycmF5KGkpKXtuPVtdO2ZvcihsZXQgcj0wLG89aS5sZW5ndGg7cjxvO3IrKylpW3JdLmlzRGF0YVRleHR1cmU/bi5wdXNoKG5pKGlbcl0uaW1hZ2UpKTpuLnB1c2gobmkoaVtyXSkpfWVsc2Ugbj1uaShpKTtzLnVybD1ufXJldHVybiBlfHwodC5pbWFnZXNbdGhpcy51dWlkXT1zKSxzfX1mdW5jdGlvbiBuaShjKXtyZXR1cm4gdHlwZW9mIEhUTUxJbWFnZUVsZW1lbnQ8InUiJiZjIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudHx8dHlwZW9mIEhUTUxDYW52YXNFbGVtZW50PCJ1IiYmYyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50fHx0eXBlb2YgSW1hZ2VCaXRtYXA8InUiJiZjIGluc3RhbmNlb2YgSW1hZ2VCaXRtYXA/VGEuZ2V0RGF0YVVSTChjKTpjLmRhdGE/e2RhdGE6QXJyYXkuZnJvbShjLmRhdGEpLHdpZHRoOmMud2lkdGgsaGVpZ2h0OmMuaGVpZ2h0LHR5cGU6Yy5kYXRhLmNvbnN0cnVjdG9yLm5hbWV9Oihjb25zb2xlLndhcm4oIlRIUkVFLlRleHR1cmU6IFVuYWJsZSB0byBzZXJpYWxpemUgVGV4dHVyZS4iKSx7fSl9bGV0IHZhPTA7Y2xhc3MgQXQgZXh0ZW5kcyBHZXtjb25zdHJ1Y3Rvcih0PUF0LkRFRkFVTFRfSU1BR0UsZT1BdC5ERUZBVUxUX01BUFBJTkcscz1iZSxpPWJlLG49WHMscj1ZcyxvPSRzLGE9UW8saD0xLGw9bmEpe3N1cGVyKCksdGhpcy5pc1RleHR1cmU9ITAsT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsImlkIix7dmFsdWU6dmErK30pLHRoaXMudXVpZD1pdCgpLHRoaXMubmFtZT0iIix0aGlzLnNvdXJjZT1uZXcgRWEodCksdGhpcy5taXBtYXBzPVtdLHRoaXMubWFwcGluZz1lLHRoaXMud3JhcFM9cyx0aGlzLndyYXBUPWksdGhpcy5tYWdGaWx0ZXI9bix0aGlzLm1pbkZpbHRlcj1yLHRoaXMuYW5pc290cm9weT1oLHRoaXMuZm9ybWF0PW8sdGhpcy5pbnRlcm5hbEZvcm1hdD1udWxsLHRoaXMudHlwZT1hLHRoaXMub2Zmc2V0PW5ldyBPKDAsMCksdGhpcy5yZXBlYXQ9bmV3IE8oMSwxKSx0aGlzLmNlbnRlcj1uZXcgTygwLDApLHRoaXMucm90YXRpb249MCx0aGlzLm1hdHJpeEF1dG9VcGRhdGU9ITAsdGhpcy5tYXRyaXg9bmV3IFh0LHRoaXMuZ2VuZXJhdGVNaXBtYXBzPSEwLHRoaXMucHJlbXVsdGlwbHlBbHBoYT0hMSx0aGlzLmZsaXBZPSEwLHRoaXMudW5wYWNrQWxpZ25tZW50PTQsdGhpcy5lbmNvZGluZz1sLHRoaXMudXNlckRhdGE9e30sdGhpcy52ZXJzaW9uPTAsdGhpcy5vblVwZGF0ZT1udWxsLHRoaXMuaXNSZW5kZXJUYXJnZXRUZXh0dXJlPSExLHRoaXMubmVlZHNQTVJFTVVwZGF0ZT0hMX1nZXQgaW1hZ2UoKXtyZXR1cm4gdGhpcy5zb3VyY2UuZGF0YX1zZXQgaW1hZ2UodCl7dGhpcy5zb3VyY2UuZGF0YT10fXVwZGF0ZU1hdHJpeCgpe3RoaXMubWF0cml4LnNldFV2VHJhbnNmb3JtKHRoaXMub2Zmc2V0LngsdGhpcy5vZmZzZXQueSx0aGlzLnJlcGVhdC54LHRoaXMucmVwZWF0LnksdGhpcy5yb3RhdGlvbix0aGlzLmNlbnRlci54LHRoaXMuY2VudGVyLnkpfWNsb25lKCl7cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKCkuY29weSh0aGlzKX1jb3B5KHQpe3JldHVybiB0aGlzLm5hbWU9dC5uYW1lLHRoaXMuc291cmNlPXQuc291cmNlLHRoaXMubWlwbWFwcz10Lm1pcG1hcHMuc2xpY2UoMCksdGhpcy5tYXBwaW5nPXQubWFwcGluZyx0aGlzLndyYXBTPXQud3JhcFMsdGhpcy53cmFwVD10LndyYXBULHRoaXMubWFnRmlsdGVyPXQubWFnRmlsdGVyLHRoaXMubWluRmlsdGVyPXQubWluRmlsdGVyLHRoaXMuYW5pc290cm9weT10LmFuaXNvdHJvcHksdGhpcy5mb3JtYXQ9dC5mb3JtYXQsdGhpcy5pbnRlcm5hbEZvcm1hdD10LmludGVybmFsRm9ybWF0LHRoaXMudHlwZT10LnR5cGUsdGhpcy5vZmZzZXQuY29weSh0Lm9mZnNldCksdGhpcy5yZXBlYXQuY29weSh0LnJlcGVhdCksdGhpcy5jZW50ZXIuY29weSh0LmNlbnRlciksdGhpcy5yb3RhdGlvbj10LnJvdGF0aW9uLHRoaXMubWF0cml4QXV0b1VwZGF0ZT10Lm1hdHJpeEF1dG9VcGRhdGUsdGhpcy5tYXRyaXguY29weSh0Lm1hdHJpeCksdGhpcy5nZW5lcmF0ZU1pcG1hcHM9dC5nZW5lcmF0ZU1pcG1hcHMsdGhpcy5wcmVtdWx0aXBseUFscGhhPXQucHJlbXVsdGlwbHlBbHBoYSx0aGlzLmZsaXBZPXQuZmxpcFksdGhpcy51bnBhY2tBbGlnbm1lbnQ9dC51bnBhY2tBbGlnbm1lbnQsdGhpcy5lbmNvZGluZz10LmVuY29kaW5nLHRoaXMudXNlckRhdGE9SlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0LnVzZXJEYXRhKSksdGhpcy5uZWVkc1VwZGF0ZT0hMCx0aGlzfXRvSlNPTih0KXtjb25zdCBlPXQ9PT12b2lkIDB8fHR5cGVvZiB0PT0ic3RyaW5nIjtpZighZSYmdC50ZXh0dXJlc1t0aGlzLnV1aWRdIT09dm9pZCAwKXJldHVybiB0LnRleHR1cmVzW3RoaXMudXVpZF07Y29uc3Qgcz17bWV0YWRhdGE6e3ZlcnNpb246NC41LHR5cGU6IlRleHR1cmUiLGdlbmVyYXRvcjoiVGV4dHVyZS50b0pTT04ifSx1dWlkOnRoaXMudXVpZCxuYW1lOnRoaXMubmFtZSxpbWFnZTp0aGlzLnNvdXJjZS50b0pTT04odCkudXVpZCxtYXBwaW5nOnRoaXMubWFwcGluZyxyZXBlYXQ6W3RoaXMucmVwZWF0LngsdGhpcy5yZXBlYXQueV0sb2Zmc2V0Olt0aGlzLm9mZnNldC54LHRoaXMub2Zmc2V0LnldLGNlbnRlcjpbdGhpcy5jZW50ZXIueCx0aGlzLmNlbnRlci55XSxyb3RhdGlvbjp0aGlzLnJvdGF0aW9uLHdyYXA6W3RoaXMud3JhcFMsdGhpcy53cmFwVF0sZm9ybWF0OnRoaXMuZm9ybWF0LHR5cGU6dGhpcy50eXBlLGVuY29kaW5nOnRoaXMuZW5jb2RpbmcsbWluRmlsdGVyOnRoaXMubWluRmlsdGVyLG1hZ0ZpbHRlcjp0aGlzLm1hZ0ZpbHRlcixhbmlzb3Ryb3B5OnRoaXMuYW5pc290cm9weSxmbGlwWTp0aGlzLmZsaXBZLHByZW11bHRpcGx5QWxwaGE6dGhpcy5wcmVtdWx0aXBseUFscGhhLHVucGFja0FsaWdubWVudDp0aGlzLnVucGFja0FsaWdubWVudH07cmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudXNlckRhdGEpIT09Int9IiYmKHMudXNlckRhdGE9dGhpcy51c2VyRGF0YSksZXx8KHQudGV4dHVyZXNbdGhpcy51dWlkXT1zKSxzfWRpc3Bvc2UoKXt0aGlzLmRpc3BhdGNoRXZlbnQoe3R5cGU6ImRpc3Bvc2UifSl9dHJhbnNmb3JtVXYodCl7aWYodGhpcy5tYXBwaW5nIT09Rm4pcmV0dXJuIHQ7aWYodC5hcHBseU1hdHJpeDModGhpcy5tYXRyaXgpLHQueDwwfHx0Lng+MSlzd2l0Y2godGhpcy53cmFwUyl7Y2FzZSB4ZTp0Lng9dC54LU1hdGguZmxvb3IodC54KTticmVhaztjYXNlIGJlOnQueD10Lng8MD8wOjE7YnJlYWs7Y2FzZSBxczpNYXRoLmFicyhNYXRoLmZsb29yKHQueCklMik9PT0xP3QueD1NYXRoLmNlaWwodC54KS10Lng6dC54PXQueC1NYXRoLmZsb29yKHQueCk7YnJlYWt9aWYodC55PDB8fHQueT4xKXN3aXRjaCh0aGlzLndyYXBUKXtjYXNlIHhlOnQueT10LnktTWF0aC5mbG9vcih0LnkpO2JyZWFrO2Nhc2UgYmU6dC55PXQueTwwPzA6MTticmVhaztjYXNlIHFzOk1hdGguYWJzKE1hdGguZmxvb3IodC55KSUyKT09PTE/dC55PU1hdGguY2VpbCh0LnkpLXQueTp0Lnk9dC55LU1hdGguZmxvb3IodC55KTticmVha31yZXR1cm4gdGhpcy5mbGlwWSYmKHQueT0xLXQueSksdH1zZXQgbmVlZHNVcGRhdGUodCl7dD09PSEwJiYodGhpcy52ZXJzaW9uKyssdGhpcy5zb3VyY2UubmVlZHNVcGRhdGU9ITApfX1BdC5ERUZBVUxUX0lNQUdFPW51bGwsQXQuREVGQVVMVF9NQVBQSU5HPUZuO2NsYXNzIEt7Y29uc3RydWN0b3IodD0wLGU9MCxzPTAsaT0xKXtLLnByb3RvdHlwZS5pc1ZlY3RvcjQ9ITAsdGhpcy54PXQsdGhpcy55PWUsdGhpcy56PXMsdGhpcy53PWl9Z2V0IHdpZHRoKCl7cmV0dXJuIHRoaXMuen1zZXQgd2lkdGgodCl7dGhpcy56PXR9Z2V0IGhlaWdodCgpe3JldHVybiB0aGlzLnd9c2V0IGhlaWdodCh0KXt0aGlzLnc9dH1zZXQodCxlLHMsaSl7cmV0dXJuIHRoaXMueD10LHRoaXMueT1lLHRoaXMuej1zLHRoaXMudz1pLHRoaXN9c2V0U2NhbGFyKHQpe3JldHVybiB0aGlzLng9dCx0aGlzLnk9dCx0aGlzLno9dCx0aGlzLnc9dCx0aGlzfXNldFgodCl7cmV0dXJuIHRoaXMueD10LHRoaXN9c2V0WSh0KXtyZXR1cm4gdGhpcy55PXQsdGhpc31zZXRaKHQpe3JldHVybiB0aGlzLno9dCx0aGlzfXNldFcodCl7cmV0dXJuIHRoaXMudz10LHRoaXN9c2V0Q29tcG9uZW50KHQsZSl7c3dpdGNoKHQpe2Nhc2UgMDp0aGlzLng9ZTticmVhaztjYXNlIDE6dGhpcy55PWU7YnJlYWs7Y2FzZSAyOnRoaXMuej1lO2JyZWFrO2Nhc2UgMzp0aGlzLnc9ZTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcigiaW5kZXggaXMgb3V0IG9mIHJhbmdlOiAiK3QpfXJldHVybiB0aGlzfWdldENvbXBvbmVudCh0KXtzd2l0Y2godCl7Y2FzZSAwOnJldHVybiB0aGlzLng7Y2FzZSAxOnJldHVybiB0aGlzLnk7Y2FzZSAyOnJldHVybiB0aGlzLno7Y2FzZSAzOnJldHVybiB0aGlzLnc7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoImluZGV4IGlzIG91dCBvZiByYW5nZTogIit0KX19Y2xvbmUoKXtyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy54LHRoaXMueSx0aGlzLnosdGhpcy53KX1jb3B5KHQpe3JldHVybiB0aGlzLng9dC54LHRoaXMueT10LnksdGhpcy56PXQueix0aGlzLnc9dC53IT09dm9pZCAwP3QudzoxLHRoaXN9YWRkKHQsZSl7cmV0dXJuIGUhPT12b2lkIDA/KGNvbnNvbGUud2FybigiVEhSRUUuVmVjdG9yNDogLmFkZCgpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLmFkZFZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLiIpLHRoaXMuYWRkVmVjdG9ycyh0LGUpKToodGhpcy54Kz10LngsdGhpcy55Kz10LnksdGhpcy56Kz10LnosdGhpcy53Kz10LncsdGhpcyl9YWRkU2NhbGFyKHQpe3JldHVybiB0aGlzLngrPXQsdGhpcy55Kz10LHRoaXMueis9dCx0aGlzLncrPXQsdGhpc31hZGRWZWN0b3JzKHQsZSl7cmV0dXJuIHRoaXMueD10LngrZS54LHRoaXMueT10LnkrZS55LHRoaXMuej10LnorZS56LHRoaXMudz10LncrZS53LHRoaXN9YWRkU2NhbGVkVmVjdG9yKHQsZSl7cmV0dXJuIHRoaXMueCs9dC54KmUsdGhpcy55Kz10LnkqZSx0aGlzLnorPXQueiplLHRoaXMudys9dC53KmUsdGhpc31zdWIodCxlKXtyZXR1cm4gZSE9PXZvaWQgMD8oY29uc29sZS53YXJuKCJUSFJFRS5WZWN0b3I0OiAuc3ViKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuc3ViVmVjdG9ycyggYSwgYiApIGluc3RlYWQuIiksdGhpcy5zdWJWZWN0b3JzKHQsZSkpOih0aGlzLngtPXQueCx0aGlzLnktPXQueSx0aGlzLnotPXQueix0aGlzLnctPXQudyx0aGlzKX1zdWJTY2FsYXIodCl7cmV0dXJuIHRoaXMueC09dCx0aGlzLnktPXQsdGhpcy56LT10LHRoaXMudy09dCx0aGlzfXN1YlZlY3RvcnModCxlKXtyZXR1cm4gdGhpcy54PXQueC1lLngsdGhpcy55PXQueS1lLnksdGhpcy56PXQuei1lLnosdGhpcy53PXQudy1lLncsdGhpc31tdWx0aXBseSh0KXtyZXR1cm4gdGhpcy54Kj10LngsdGhpcy55Kj10LnksdGhpcy56Kj10LnosdGhpcy53Kj10LncsdGhpc31tdWx0aXBseVNjYWxhcih0KXtyZXR1cm4gdGhpcy54Kj10LHRoaXMueSo9dCx0aGlzLnoqPXQsdGhpcy53Kj10LHRoaXN9YXBwbHlNYXRyaXg0KHQpe2NvbnN0IGU9dGhpcy54LHM9dGhpcy55LGk9dGhpcy56LG49dGhpcy53LHI9dC5lbGVtZW50cztyZXR1cm4gdGhpcy54PXJbMF0qZStyWzRdKnMrcls4XSppK3JbMTJdKm4sdGhpcy55PXJbMV0qZStyWzVdKnMrcls5XSppK3JbMTNdKm4sdGhpcy56PXJbMl0qZStyWzZdKnMrclsxMF0qaStyWzE0XSpuLHRoaXMudz1yWzNdKmUrcls3XSpzK3JbMTFdKmkrclsxNV0qbix0aGlzfWRpdmlkZVNjYWxhcih0KXtyZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhcigxL3QpfXNldEF4aXNBbmdsZUZyb21RdWF0ZXJuaW9uKHQpe3RoaXMudz0yKk1hdGguYWNvcyh0LncpO2NvbnN0IGU9TWF0aC5zcXJ0KDEtdC53KnQudyk7cmV0dXJuIGU8MWUtND8odGhpcy54PTEsdGhpcy55PTAsdGhpcy56PTApOih0aGlzLng9dC54L2UsdGhpcy55PXQueS9lLHRoaXMuej10LnovZSksdGhpc31zZXRBeGlzQW5nbGVGcm9tUm90YXRpb25NYXRyaXgodCl7bGV0IGUscyxpLG47Y29uc3QgYT10LmVsZW1lbnRzLGg9YVswXSxsPWFbNF0sdT1hWzhdLGQ9YVsxXSxmPWFbNV0scD1hWzldLG09YVsyXSxnPWFbNl0seT1hWzEwXTtpZihNYXRoLmFicyhsLWQpPC4wMSYmTWF0aC5hYnModS1tKTwuMDEmJk1hdGguYWJzKHAtZyk8LjAxKXtpZihNYXRoLmFicyhsK2QpPC4xJiZNYXRoLmFicyh1K20pPC4xJiZNYXRoLmFicyhwK2cpPC4xJiZNYXRoLmFicyhoK2YreS0zKTwuMSlyZXR1cm4gdGhpcy5zZXQoMSwwLDAsMCksdGhpcztlPU1hdGguUEk7Y29uc3Qgdz0oaCsxKS8yLF89KGYrMSkvMixiPSh5KzEpLzIsQT0obCtkKS80LFM9KHUrbSkvNCx2PShwK2cpLzQ7cmV0dXJuIHc+XyYmdz5iP3c8LjAxPyhzPTAsaT0uNzA3MTA2NzgxLG49LjcwNzEwNjc4MSk6KHM9TWF0aC5zcXJ0KHcpLGk9QS9zLG49Uy9zKTpfPmI/XzwuMDE/KHM9LjcwNzEwNjc4MSxpPTAsbj0uNzA3MTA2NzgxKTooaT1NYXRoLnNxcnQoXykscz1BL2ksbj12L2kpOmI8LjAxPyhzPS43MDcxMDY3ODEsaT0uNzA3MTA2NzgxLG49MCk6KG49TWF0aC5zcXJ0KGIpLHM9Uy9uLGk9di9uKSx0aGlzLnNldChzLGksbixlKSx0aGlzfWxldCBNPU1hdGguc3FydCgoZy1wKSooZy1wKSsodS1tKSoodS1tKSsoZC1sKSooZC1sKSk7cmV0dXJuIE1hdGguYWJzKE0pPC4wMDEmJihNPTEpLHRoaXMueD0oZy1wKS9NLHRoaXMueT0odS1tKS9NLHRoaXMuej0oZC1sKS9NLHRoaXMudz1NYXRoLmFjb3MoKGgrZit5LTEpLzIpLHRoaXN9bWluKHQpe3JldHVybiB0aGlzLng9TWF0aC5taW4odGhpcy54LHQueCksdGhpcy55PU1hdGgubWluKHRoaXMueSx0LnkpLHRoaXMuej1NYXRoLm1pbih0aGlzLnosdC56KSx0aGlzLnc9TWF0aC5taW4odGhpcy53LHQudyksdGhpc31tYXgodCl7cmV0dXJuIHRoaXMueD1NYXRoLm1heCh0aGlzLngsdC54KSx0aGlzLnk9TWF0aC5tYXgodGhpcy55LHQueSksdGhpcy56PU1hdGgubWF4KHRoaXMueix0LnopLHRoaXMudz1NYXRoLm1heCh0aGlzLncsdC53KSx0aGlzfWNsYW1wKHQsZSl7cmV0dXJuIHRoaXMueD1NYXRoLm1heCh0LngsTWF0aC5taW4oZS54LHRoaXMueCkpLHRoaXMueT1NYXRoLm1heCh0LnksTWF0aC5taW4oZS55LHRoaXMueSkpLHRoaXMuej1NYXRoLm1heCh0LnosTWF0aC5taW4oZS56LHRoaXMueikpLHRoaXMudz1NYXRoLm1heCh0LncsTWF0aC5taW4oZS53LHRoaXMudykpLHRoaXN9Y2xhbXBTY2FsYXIodCxlKXtyZXR1cm4gdGhpcy54PU1hdGgubWF4KHQsTWF0aC5taW4oZSx0aGlzLngpKSx0aGlzLnk9TWF0aC5tYXgodCxNYXRoLm1pbihlLHRoaXMueSkpLHRoaXMuej1NYXRoLm1heCh0LE1hdGgubWluKGUsdGhpcy56KSksdGhpcy53PU1hdGgubWF4KHQsTWF0aC5taW4oZSx0aGlzLncpKSx0aGlzfWNsYW1wTGVuZ3RoKHQsZSl7Y29uc3Qgcz10aGlzLmxlbmd0aCgpO3JldHVybiB0aGlzLmRpdmlkZVNjYWxhcihzfHwxKS5tdWx0aXBseVNjYWxhcihNYXRoLm1heCh0LE1hdGgubWluKGUscykpKX1mbG9vcigpe3JldHVybiB0aGlzLng9TWF0aC5mbG9vcih0aGlzLngpLHRoaXMueT1NYXRoLmZsb29yKHRoaXMueSksdGhpcy56PU1hdGguZmxvb3IodGhpcy56KSx0aGlzLnc9TWF0aC5mbG9vcih0aGlzLncpLHRoaXN9Y2VpbCgpe3JldHVybiB0aGlzLng9TWF0aC5jZWlsKHRoaXMueCksdGhpcy55PU1hdGguY2VpbCh0aGlzLnkpLHRoaXMuej1NYXRoLmNlaWwodGhpcy56KSx0aGlzLnc9TWF0aC5jZWlsKHRoaXMudyksdGhpc31yb3VuZCgpe3JldHVybiB0aGlzLng9TWF0aC5yb3VuZCh0aGlzLngpLHRoaXMueT1NYXRoLnJvdW5kKHRoaXMueSksdGhpcy56PU1hdGgucm91bmQodGhpcy56KSx0aGlzLnc9TWF0aC5yb3VuZCh0aGlzLncpLHRoaXN9cm91bmRUb1plcm8oKXtyZXR1cm4gdGhpcy54PXRoaXMueDwwP01hdGguY2VpbCh0aGlzLngpOk1hdGguZmxvb3IodGhpcy54KSx0aGlzLnk9dGhpcy55PDA/TWF0aC5jZWlsKHRoaXMueSk6TWF0aC5mbG9vcih0aGlzLnkpLHRoaXMuej10aGlzLno8MD9NYXRoLmNlaWwodGhpcy56KTpNYXRoLmZsb29yKHRoaXMueiksdGhpcy53PXRoaXMudzwwP01hdGguY2VpbCh0aGlzLncpOk1hdGguZmxvb3IodGhpcy53KSx0aGlzfW5lZ2F0ZSgpe3JldHVybiB0aGlzLng9LXRoaXMueCx0aGlzLnk9LXRoaXMueSx0aGlzLno9LXRoaXMueix0aGlzLnc9LXRoaXMudyx0aGlzfWRvdCh0KXtyZXR1cm4gdGhpcy54KnQueCt0aGlzLnkqdC55K3RoaXMueip0LnordGhpcy53KnQud31sZW5ndGhTcSgpe3JldHVybiB0aGlzLngqdGhpcy54K3RoaXMueSp0aGlzLnkrdGhpcy56KnRoaXMueit0aGlzLncqdGhpcy53fWxlbmd0aCgpe3JldHVybiBNYXRoLnNxcnQodGhpcy54KnRoaXMueCt0aGlzLnkqdGhpcy55K3RoaXMueip0aGlzLnordGhpcy53KnRoaXMudyl9bWFuaGF0dGFuTGVuZ3RoKCl7cmV0dXJuIE1hdGguYWJzKHRoaXMueCkrTWF0aC5hYnModGhpcy55KStNYXRoLmFicyh0aGlzLnopK01hdGguYWJzKHRoaXMudyl9bm9ybWFsaXplKCl7cmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKHRoaXMubGVuZ3RoKCl8fDEpfXNldExlbmd0aCh0KXtyZXR1cm4gdGhpcy5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcih0KX1sZXJwKHQsZSl7cmV0dXJuIHRoaXMueCs9KHQueC10aGlzLngpKmUsdGhpcy55Kz0odC55LXRoaXMueSkqZSx0aGlzLnorPSh0LnotdGhpcy56KSplLHRoaXMudys9KHQudy10aGlzLncpKmUsdGhpc31sZXJwVmVjdG9ycyh0LGUscyl7cmV0dXJuIHRoaXMueD10LngrKGUueC10LngpKnMsdGhpcy55PXQueSsoZS55LXQueSkqcyx0aGlzLno9dC56KyhlLnotdC56KSpzLHRoaXMudz10LncrKGUudy10LncpKnMsdGhpc31lcXVhbHModCl7cmV0dXJuIHQueD09PXRoaXMueCYmdC55PT09dGhpcy55JiZ0Lno9PT10aGlzLnomJnQudz09PXRoaXMud31mcm9tQXJyYXkodCxlPTApe3JldHVybiB0aGlzLng9dFtlXSx0aGlzLnk9dFtlKzFdLHRoaXMuej10W2UrMl0sdGhpcy53PXRbZSszXSx0aGlzfXRvQXJyYXkodD1bXSxlPTApe3JldHVybiB0W2VdPXRoaXMueCx0W2UrMV09dGhpcy55LHRbZSsyXT10aGlzLnosdFtlKzNdPXRoaXMudyx0fWZyb21CdWZmZXJBdHRyaWJ1dGUodCxlLHMpe3JldHVybiBzIT09dm9pZCAwJiZjb25zb2xlLndhcm4oIlRIUkVFLlZlY3RvcjQ6IG9mZnNldCBoYXMgYmVlbiByZW1vdmVkIGZyb20gLmZyb21CdWZmZXJBdHRyaWJ1dGUoKS4iKSx0aGlzLng9dC5nZXRYKGUpLHRoaXMueT10LmdldFkoZSksdGhpcy56PXQuZ2V0WihlKSx0aGlzLnc9dC5nZXRXKGUpLHRoaXN9cmFuZG9tKCl7cmV0dXJuIHRoaXMueD1NYXRoLnJhbmRvbSgpLHRoaXMueT1NYXRoLnJhbmRvbSgpLHRoaXMuej1NYXRoLnJhbmRvbSgpLHRoaXMudz1NYXRoLnJhbmRvbSgpLHRoaXN9KltTeW1ib2wuaXRlcmF0b3JdKCl7eWllbGQgdGhpcy54LHlpZWxkIHRoaXMueSx5aWVsZCB0aGlzLnoseWllbGQgdGhpcy53fX1jbGFzcyBUdHtjb25zdHJ1Y3Rvcih0PTAsZT0wLHM9MCxpPTEpe3RoaXMuaXNRdWF0ZXJuaW9uPSEwLHRoaXMuX3g9dCx0aGlzLl95PWUsdGhpcy5fej1zLHRoaXMuX3c9aX1zdGF0aWMgc2xlcnAodCxlLHMsaSl7cmV0dXJuIGNvbnNvbGUud2FybigiVEhSRUUuUXVhdGVybmlvbjogU3RhdGljIC5zbGVycCgpIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIFVzZSBxbS5zbGVycFF1YXRlcm5pb25zKCBxYSwgcWIsIHQgKSBpbnN0ZWFkLiIpLHMuc2xlcnBRdWF0ZXJuaW9ucyh0LGUsaSl9c3RhdGljIHNsZXJwRmxhdCh0LGUscyxpLG4scixvKXtsZXQgYT1zW2krMF0saD1zW2krMV0sbD1zW2krMl0sdT1zW2krM107Y29uc3QgZD1uW3IrMF0sZj1uW3IrMV0scD1uW3IrMl0sbT1uW3IrM107aWYobz09PTApe3RbZSswXT1hLHRbZSsxXT1oLHRbZSsyXT1sLHRbZSszXT11O3JldHVybn1pZihvPT09MSl7dFtlKzBdPWQsdFtlKzFdPWYsdFtlKzJdPXAsdFtlKzNdPW07cmV0dXJufWlmKHUhPT1tfHxhIT09ZHx8aCE9PWZ8fGwhPT1wKXtsZXQgZz0xLW87Y29uc3QgeT1hKmQraCpmK2wqcCt1Km0sTT15Pj0wPzE6LTEsdz0xLXkqeTtpZih3Pk51bWJlci5FUFNJTE9OKXtjb25zdCBiPU1hdGguc3FydCh3KSxBPU1hdGguYXRhbjIoYix5Kk0pO2c9TWF0aC5zaW4oZypBKS9iLG89TWF0aC5zaW4obypBKS9ifWNvbnN0IF89bypNO2lmKGE9YSpnK2QqXyxoPWgqZytmKl8sbD1sKmcrcCpfLHU9dSpnK20qXyxnPT09MS1vKXtjb25zdCBiPTEvTWF0aC5zcXJ0KGEqYStoKmgrbCpsK3UqdSk7YSo9YixoKj1iLGwqPWIsdSo9Yn19dFtlXT1hLHRbZSsxXT1oLHRbZSsyXT1sLHRbZSszXT11fXN0YXRpYyBtdWx0aXBseVF1YXRlcm5pb25zRmxhdCh0LGUscyxpLG4scil7Y29uc3Qgbz1zW2ldLGE9c1tpKzFdLGg9c1tpKzJdLGw9c1tpKzNdLHU9bltyXSxkPW5bcisxXSxmPW5bcisyXSxwPW5bciszXTtyZXR1cm4gdFtlXT1vKnArbCp1K2EqZi1oKmQsdFtlKzFdPWEqcCtsKmQraCp1LW8qZix0W2UrMl09aCpwK2wqZitvKmQtYSp1LHRbZSszXT1sKnAtbyp1LWEqZC1oKmYsdH1nZXQgeCgpe3JldHVybiB0aGlzLl94fXNldCB4KHQpe3RoaXMuX3g9dCx0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCl9Z2V0IHkoKXtyZXR1cm4gdGhpcy5feX1zZXQgeSh0KXt0aGlzLl95PXQsdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpfWdldCB6KCl7cmV0dXJuIHRoaXMuX3p9c2V0IHoodCl7dGhpcy5fej10LHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKX1nZXQgdygpe3JldHVybiB0aGlzLl93fXNldCB3KHQpe3RoaXMuX3c9dCx0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCl9c2V0KHQsZSxzLGkpe3JldHVybiB0aGlzLl94PXQsdGhpcy5feT1lLHRoaXMuX3o9cyx0aGlzLl93PWksdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpLHRoaXN9Y2xvbmUoKXtyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5feCx0aGlzLl95LHRoaXMuX3osdGhpcy5fdyl9Y29weSh0KXtyZXR1cm4gdGhpcy5feD10LngsdGhpcy5feT10LnksdGhpcy5fej10LnosdGhpcy5fdz10LncsdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpLHRoaXN9c2V0RnJvbUV1bGVyKHQsZSl7aWYoISh0JiZ0LmlzRXVsZXIpKXRocm93IG5ldyBFcnJvcigiVEhSRUUuUXVhdGVybmlvbjogLnNldEZyb21FdWxlcigpIG5vdyBleHBlY3RzIGFuIEV1bGVyIHJvdGF0aW9uIHJhdGhlciB0aGFuIGEgVmVjdG9yMyBhbmQgb3JkZXIuIik7Y29uc3Qgcz10Ll94LGk9dC5feSxuPXQuX3oscj10Ll9vcmRlcixvPU1hdGguY29zLGE9TWF0aC5zaW4saD1vKHMvMiksbD1vKGkvMiksdT1vKG4vMiksZD1hKHMvMiksZj1hKGkvMikscD1hKG4vMik7c3dpdGNoKHIpe2Nhc2UiWFlaIjp0aGlzLl94PWQqbCp1K2gqZipwLHRoaXMuX3k9aCpmKnUtZCpsKnAsdGhpcy5fej1oKmwqcCtkKmYqdSx0aGlzLl93PWgqbCp1LWQqZipwO2JyZWFrO2Nhc2UiWVhaIjp0aGlzLl94PWQqbCp1K2gqZipwLHRoaXMuX3k9aCpmKnUtZCpsKnAsdGhpcy5fej1oKmwqcC1kKmYqdSx0aGlzLl93PWgqbCp1K2QqZipwO2JyZWFrO2Nhc2UiWlhZIjp0aGlzLl94PWQqbCp1LWgqZipwLHRoaXMuX3k9aCpmKnUrZCpsKnAsdGhpcy5fej1oKmwqcCtkKmYqdSx0aGlzLl93PWgqbCp1LWQqZipwO2JyZWFrO2Nhc2UiWllYIjp0aGlzLl94PWQqbCp1LWgqZipwLHRoaXMuX3k9aCpmKnUrZCpsKnAsdGhpcy5fej1oKmwqcC1kKmYqdSx0aGlzLl93PWgqbCp1K2QqZipwO2JyZWFrO2Nhc2UiWVpYIjp0aGlzLl94PWQqbCp1K2gqZipwLHRoaXMuX3k9aCpmKnUrZCpsKnAsdGhpcy5fej1oKmwqcC1kKmYqdSx0aGlzLl93PWgqbCp1LWQqZipwO2JyZWFrO2Nhc2UiWFpZIjp0aGlzLl94PWQqbCp1LWgqZipwLHRoaXMuX3k9aCpmKnUtZCpsKnAsdGhpcy5fej1oKmwqcCtkKmYqdSx0aGlzLl93PWgqbCp1K2QqZipwO2JyZWFrO2RlZmF1bHQ6Y29uc29sZS53YXJuKCJUSFJFRS5RdWF0ZXJuaW9uOiAuc2V0RnJvbUV1bGVyKCkgZW5jb3VudGVyZWQgYW4gdW5rbm93biBvcmRlcjogIityKX1yZXR1cm4gZSE9PSExJiZ0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCksdGhpc31zZXRGcm9tQXhpc0FuZ2xlKHQsZSl7Y29uc3Qgcz1lLzIsaT1NYXRoLnNpbihzKTtyZXR1cm4gdGhpcy5feD10LngqaSx0aGlzLl95PXQueSppLHRoaXMuX3o9dC56KmksdGhpcy5fdz1NYXRoLmNvcyhzKSx0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCksdGhpc31zZXRGcm9tUm90YXRpb25NYXRyaXgodCl7Y29uc3QgZT10LmVsZW1lbnRzLHM9ZVswXSxpPWVbNF0sbj1lWzhdLHI9ZVsxXSxvPWVbNV0sYT1lWzldLGg9ZVsyXSxsPWVbNl0sdT1lWzEwXSxkPXMrbyt1O2lmKGQ+MCl7Y29uc3QgZj0uNS9NYXRoLnNxcnQoZCsxKTt0aGlzLl93PS4yNS9mLHRoaXMuX3g9KGwtYSkqZix0aGlzLl95PShuLWgpKmYsdGhpcy5fej0oci1pKSpmfWVsc2UgaWYocz5vJiZzPnUpe2NvbnN0IGY9MipNYXRoLnNxcnQoMStzLW8tdSk7dGhpcy5fdz0obC1hKS9mLHRoaXMuX3g9LjI1KmYsdGhpcy5feT0oaStyKS9mLHRoaXMuX3o9KG4raCkvZn1lbHNlIGlmKG8+dSl7Y29uc3QgZj0yKk1hdGguc3FydCgxK28tcy11KTt0aGlzLl93PShuLWgpL2YsdGhpcy5feD0oaStyKS9mLHRoaXMuX3k9LjI1KmYsdGhpcy5fej0oYStsKS9mfWVsc2V7Y29uc3QgZj0yKk1hdGguc3FydCgxK3Utcy1vKTt0aGlzLl93PShyLWkpL2YsdGhpcy5feD0obitoKS9mLHRoaXMuX3k9KGErbCkvZix0aGlzLl96PS4yNSpmfXJldHVybiB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCksdGhpc31zZXRGcm9tVW5pdFZlY3RvcnModCxlKXtsZXQgcz10LmRvdChlKSsxO3JldHVybiBzPE51bWJlci5FUFNJTE9OPyhzPTAsTWF0aC5hYnModC54KT5NYXRoLmFicyh0LnopPyh0aGlzLl94PS10LnksdGhpcy5feT10LngsdGhpcy5fej0wLHRoaXMuX3c9cyk6KHRoaXMuX3g9MCx0aGlzLl95PS10LnosdGhpcy5fej10LnksdGhpcy5fdz1zKSk6KHRoaXMuX3g9dC55KmUuei10LnoqZS55LHRoaXMuX3k9dC56KmUueC10LngqZS56LHRoaXMuX3o9dC54KmUueS10LnkqZS54LHRoaXMuX3c9cyksdGhpcy5ub3JtYWxpemUoKX1hbmdsZVRvKHQpe3JldHVybiAyKk1hdGguYWNvcyhNYXRoLmFicyhaKHRoaXMuZG90KHQpLC0xLDEpKSl9cm90YXRlVG93YXJkcyh0LGUpe2NvbnN0IHM9dGhpcy5hbmdsZVRvKHQpO2lmKHM9PT0wKXJldHVybiB0aGlzO2NvbnN0IGk9TWF0aC5taW4oMSxlL3MpO3JldHVybiB0aGlzLnNsZXJwKHQsaSksdGhpc31pZGVudGl0eSgpe3JldHVybiB0aGlzLnNldCgwLDAsMCwxKX1pbnZlcnQoKXtyZXR1cm4gdGhpcy5jb25qdWdhdGUoKX1jb25qdWdhdGUoKXtyZXR1cm4gdGhpcy5feCo9LTEsdGhpcy5feSo9LTEsdGhpcy5feio9LTEsdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpLHRoaXN9ZG90KHQpe3JldHVybiB0aGlzLl94KnQuX3grdGhpcy5feSp0Ll95K3RoaXMuX3oqdC5feit0aGlzLl93KnQuX3d9bGVuZ3RoU3EoKXtyZXR1cm4gdGhpcy5feCp0aGlzLl94K3RoaXMuX3kqdGhpcy5feSt0aGlzLl96KnRoaXMuX3ordGhpcy5fdyp0aGlzLl93fWxlbmd0aCgpe3JldHVybiBNYXRoLnNxcnQodGhpcy5feCp0aGlzLl94K3RoaXMuX3kqdGhpcy5feSt0aGlzLl96KnRoaXMuX3ordGhpcy5fdyp0aGlzLl93KX1ub3JtYWxpemUoKXtsZXQgdD10aGlzLmxlbmd0aCgpO3JldHVybiB0PT09MD8odGhpcy5feD0wLHRoaXMuX3k9MCx0aGlzLl96PTAsdGhpcy5fdz0xKToodD0xL3QsdGhpcy5feD10aGlzLl94KnQsdGhpcy5feT10aGlzLl95KnQsdGhpcy5fej10aGlzLl96KnQsdGhpcy5fdz10aGlzLl93KnQpLHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKSx0aGlzfW11bHRpcGx5KHQsZSl7cmV0dXJuIGUhPT12b2lkIDA/KGNvbnNvbGUud2FybigiVEhSRUUuUXVhdGVybmlvbjogLm11bHRpcGx5KCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAubXVsdGlwbHlRdWF0ZXJuaW9ucyggYSwgYiApIGluc3RlYWQuIiksdGhpcy5tdWx0aXBseVF1YXRlcm5pb25zKHQsZSkpOnRoaXMubXVsdGlwbHlRdWF0ZXJuaW9ucyh0aGlzLHQpfXByZW11bHRpcGx5KHQpe3JldHVybiB0aGlzLm11bHRpcGx5UXVhdGVybmlvbnModCx0aGlzKX1tdWx0aXBseVF1YXRlcm5pb25zKHQsZSl7Y29uc3Qgcz10Ll94LGk9dC5feSxuPXQuX3oscj10Ll93LG89ZS5feCxhPWUuX3ksaD1lLl96LGw9ZS5fdztyZXR1cm4gdGhpcy5feD1zKmwrcipvK2kqaC1uKmEsdGhpcy5feT1pKmwrciphK24qby1zKmgsdGhpcy5fej1uKmwrcipoK3MqYS1pKm8sdGhpcy5fdz1yKmwtcypvLWkqYS1uKmgsdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpLHRoaXN9c2xlcnAodCxlKXtpZihlPT09MClyZXR1cm4gdGhpcztpZihlPT09MSlyZXR1cm4gdGhpcy5jb3B5KHQpO2NvbnN0IHM9dGhpcy5feCxpPXRoaXMuX3ksbj10aGlzLl96LHI9dGhpcy5fdztsZXQgbz1yKnQuX3crcyp0Ll94K2kqdC5feStuKnQuX3o7aWYobzwwPyh0aGlzLl93PS10Ll93LHRoaXMuX3g9LXQuX3gsdGhpcy5feT0tdC5feSx0aGlzLl96PS10Ll96LG89LW8pOnRoaXMuY29weSh0KSxvPj0xKXJldHVybiB0aGlzLl93PXIsdGhpcy5feD1zLHRoaXMuX3k9aSx0aGlzLl96PW4sdGhpcztjb25zdCBhPTEtbypvO2lmKGE8PU51bWJlci5FUFNJTE9OKXtjb25zdCBmPTEtZTtyZXR1cm4gdGhpcy5fdz1mKnIrZSp0aGlzLl93LHRoaXMuX3g9ZipzK2UqdGhpcy5feCx0aGlzLl95PWYqaStlKnRoaXMuX3ksdGhpcy5fej1mKm4rZSp0aGlzLl96LHRoaXMubm9ybWFsaXplKCksdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpLHRoaXN9Y29uc3QgaD1NYXRoLnNxcnQoYSksbD1NYXRoLmF0YW4yKGgsbyksdT1NYXRoLnNpbigoMS1lKSpsKS9oLGQ9TWF0aC5zaW4oZSpsKS9oO3JldHVybiB0aGlzLl93PXIqdSt0aGlzLl93KmQsdGhpcy5feD1zKnUrdGhpcy5feCpkLHRoaXMuX3k9aSp1K3RoaXMuX3kqZCx0aGlzLl96PW4qdSt0aGlzLl96KmQsdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpLHRoaXN9c2xlcnBRdWF0ZXJuaW9ucyh0LGUscyl7cmV0dXJuIHRoaXMuY29weSh0KS5zbGVycChlLHMpfXJhbmRvbSgpe2NvbnN0IHQ9TWF0aC5yYW5kb20oKSxlPU1hdGguc3FydCgxLXQpLHM9TWF0aC5zcXJ0KHQpLGk9MipNYXRoLlBJKk1hdGgucmFuZG9tKCksbj0yKk1hdGguUEkqTWF0aC5yYW5kb20oKTtyZXR1cm4gdGhpcy5zZXQoZSpNYXRoLmNvcyhpKSxzKk1hdGguc2luKG4pLHMqTWF0aC5jb3MobiksZSpNYXRoLnNpbihpKSl9ZXF1YWxzKHQpe3JldHVybiB0Ll94PT09dGhpcy5feCYmdC5feT09PXRoaXMuX3kmJnQuX3o9PT10aGlzLl96JiZ0Ll93PT09dGhpcy5fd31mcm9tQXJyYXkodCxlPTApe3JldHVybiB0aGlzLl94PXRbZV0sdGhpcy5feT10W2UrMV0sdGhpcy5fej10W2UrMl0sdGhpcy5fdz10W2UrM10sdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpLHRoaXN9dG9BcnJheSh0PVtdLGU9MCl7cmV0dXJuIHRbZV09dGhpcy5feCx0W2UrMV09dGhpcy5feSx0W2UrMl09dGhpcy5feix0W2UrM109dGhpcy5fdyx0fWZyb21CdWZmZXJBdHRyaWJ1dGUodCxlKXtyZXR1cm4gdGhpcy5feD10LmdldFgoZSksdGhpcy5feT10LmdldFkoZSksdGhpcy5fej10LmdldFooZSksdGhpcy5fdz10LmdldFcoZSksdGhpc31fb25DaGFuZ2UodCl7cmV0dXJuIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2s9dCx0aGlzfV9vbkNoYW5nZUNhbGxiYWNrKCl7fSpbU3ltYm9sLml0ZXJhdG9yXSgpe3lpZWxkIHRoaXMuX3gseWllbGQgdGhpcy5feSx5aWVsZCB0aGlzLl96LHlpZWxkIHRoaXMuX3d9fWNsYXNzIHh7Y29uc3RydWN0b3IodD0wLGU9MCxzPTApe3gucHJvdG90eXBlLmlzVmVjdG9yMz0hMCx0aGlzLng9dCx0aGlzLnk9ZSx0aGlzLno9c31zZXQodCxlLHMpe3JldHVybiBzPT09dm9pZCAwJiYocz10aGlzLnopLHRoaXMueD10LHRoaXMueT1lLHRoaXMuej1zLHRoaXN9c2V0U2NhbGFyKHQpe3JldHVybiB0aGlzLng9dCx0aGlzLnk9dCx0aGlzLno9dCx0aGlzfXNldFgodCl7cmV0dXJuIHRoaXMueD10LHRoaXN9c2V0WSh0KXtyZXR1cm4gdGhpcy55PXQsdGhpc31zZXRaKHQpe3JldHVybiB0aGlzLno9dCx0aGlzfXNldENvbXBvbmVudCh0LGUpe3N3aXRjaCh0KXtjYXNlIDA6dGhpcy54PWU7YnJlYWs7Y2FzZSAxOnRoaXMueT1lO2JyZWFrO2Nhc2UgMjp0aGlzLno9ZTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcigiaW5kZXggaXMgb3V0IG9mIHJhbmdlOiAiK3QpfXJldHVybiB0aGlzfWdldENvbXBvbmVudCh0KXtzd2l0Y2godCl7Y2FzZSAwOnJldHVybiB0aGlzLng7Y2FzZSAxOnJldHVybiB0aGlzLnk7Y2FzZSAyOnJldHVybiB0aGlzLno7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoImluZGV4IGlzIG91dCBvZiByYW5nZTogIit0KX19Y2xvbmUoKXtyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy54LHRoaXMueSx0aGlzLnopfWNvcHkodCl7cmV0dXJuIHRoaXMueD10LngsdGhpcy55PXQueSx0aGlzLno9dC56LHRoaXN9YWRkKHQsZSl7cmV0dXJuIGUhPT12b2lkIDA/KGNvbnNvbGUud2FybigiVEhSRUUuVmVjdG9yMzogLmFkZCgpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLmFkZFZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLiIpLHRoaXMuYWRkVmVjdG9ycyh0LGUpKToodGhpcy54Kz10LngsdGhpcy55Kz10LnksdGhpcy56Kz10LnosdGhpcyl9YWRkU2NhbGFyKHQpe3JldHVybiB0aGlzLngrPXQsdGhpcy55Kz10LHRoaXMueis9dCx0aGlzfWFkZFZlY3RvcnModCxlKXtyZXR1cm4gdGhpcy54PXQueCtlLngsdGhpcy55PXQueStlLnksdGhpcy56PXQueitlLnosdGhpc31hZGRTY2FsZWRWZWN0b3IodCxlKXtyZXR1cm4gdGhpcy54Kz10LngqZSx0aGlzLnkrPXQueSplLHRoaXMueis9dC56KmUsdGhpc31zdWIodCxlKXtyZXR1cm4gZSE9PXZvaWQgMD8oY29uc29sZS53YXJuKCJUSFJFRS5WZWN0b3IzOiAuc3ViKCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAuc3ViVmVjdG9ycyggYSwgYiApIGluc3RlYWQuIiksdGhpcy5zdWJWZWN0b3JzKHQsZSkpOih0aGlzLngtPXQueCx0aGlzLnktPXQueSx0aGlzLnotPXQueix0aGlzKX1zdWJTY2FsYXIodCl7cmV0dXJuIHRoaXMueC09dCx0aGlzLnktPXQsdGhpcy56LT10LHRoaXN9c3ViVmVjdG9ycyh0LGUpe3JldHVybiB0aGlzLng9dC54LWUueCx0aGlzLnk9dC55LWUueSx0aGlzLno9dC56LWUueix0aGlzfW11bHRpcGx5KHQsZSl7cmV0dXJuIGUhPT12b2lkIDA/KGNvbnNvbGUud2FybigiVEhSRUUuVmVjdG9yMzogLm11bHRpcGx5KCkgbm93IG9ubHkgYWNjZXB0cyBvbmUgYXJndW1lbnQuIFVzZSAubXVsdGlwbHlWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4iKSx0aGlzLm11bHRpcGx5VmVjdG9ycyh0LGUpKToodGhpcy54Kj10LngsdGhpcy55Kj10LnksdGhpcy56Kj10LnosdGhpcyl9bXVsdGlwbHlTY2FsYXIodCl7cmV0dXJuIHRoaXMueCo9dCx0aGlzLnkqPXQsdGhpcy56Kj10LHRoaXN9bXVsdGlwbHlWZWN0b3JzKHQsZSl7cmV0dXJuIHRoaXMueD10LngqZS54LHRoaXMueT10LnkqZS55LHRoaXMuej10LnoqZS56LHRoaXN9YXBwbHlFdWxlcih0KXtyZXR1cm4gdCYmdC5pc0V1bGVyfHxjb25zb2xlLmVycm9yKCJUSFJFRS5WZWN0b3IzOiAuYXBwbHlFdWxlcigpIG5vdyBleHBlY3RzIGFuIEV1bGVyIHJvdGF0aW9uIHJhdGhlciB0aGFuIGEgVmVjdG9yMyBhbmQgb3JkZXIuIiksdGhpcy5hcHBseVF1YXRlcm5pb24oSG4uc2V0RnJvbUV1bGVyKHQpKX1hcHBseUF4aXNBbmdsZSh0LGUpe3JldHVybiB0aGlzLmFwcGx5UXVhdGVybmlvbihIbi5zZXRGcm9tQXhpc0FuZ2xlKHQsZSkpfWFwcGx5TWF0cml4Myh0KXtjb25zdCBlPXRoaXMueCxzPXRoaXMueSxpPXRoaXMueixuPXQuZWxlbWVudHM7cmV0dXJuIHRoaXMueD1uWzBdKmUrblszXSpzK25bNl0qaSx0aGlzLnk9blsxXSplK25bNF0qcytuWzddKmksdGhpcy56PW5bMl0qZStuWzVdKnMrbls4XSppLHRoaXN9YXBwbHlOb3JtYWxNYXRyaXgodCl7cmV0dXJuIHRoaXMuYXBwbHlNYXRyaXgzKHQpLm5vcm1hbGl6ZSgpfWFwcGx5TWF0cml4NCh0KXtjb25zdCBlPXRoaXMueCxzPXRoaXMueSxpPXRoaXMueixuPXQuZWxlbWVudHMscj0xLyhuWzNdKmUrbls3XSpzK25bMTFdKmkrblsxNV0pO3JldHVybiB0aGlzLng9KG5bMF0qZStuWzRdKnMrbls4XSppK25bMTJdKSpyLHRoaXMueT0oblsxXSplK25bNV0qcytuWzldKmkrblsxM10pKnIsdGhpcy56PShuWzJdKmUrbls2XSpzK25bMTBdKmkrblsxNF0pKnIsdGhpc31hcHBseVF1YXRlcm5pb24odCl7Y29uc3QgZT10aGlzLngscz10aGlzLnksaT10aGlzLnosbj10Lngscj10Lnksbz10LnosYT10LncsaD1hKmUrcippLW8qcyxsPWEqcytvKmUtbippLHU9YSppK24qcy1yKmUsZD0tbiplLXIqcy1vKmk7cmV0dXJuIHRoaXMueD1oKmErZCotbitsKi1vLXUqLXIsdGhpcy55PWwqYStkKi1yK3UqLW4taCotbyx0aGlzLno9dSphK2QqLW8raCotci1sKi1uLHRoaXN9cHJvamVjdCh0KXtyZXR1cm4gdGhpcy5hcHBseU1hdHJpeDQodC5tYXRyaXhXb3JsZEludmVyc2UpLmFwcGx5TWF0cml4NCh0LnByb2plY3Rpb25NYXRyaXgpfXVucHJvamVjdCh0KXtyZXR1cm4gdGhpcy5hcHBseU1hdHJpeDQodC5wcm9qZWN0aW9uTWF0cml4SW52ZXJzZSkuYXBwbHlNYXRyaXg0KHQubWF0cml4V29ybGQpfXRyYW5zZm9ybURpcmVjdGlvbih0KXtjb25zdCBlPXRoaXMueCxzPXRoaXMueSxpPXRoaXMueixuPXQuZWxlbWVudHM7cmV0dXJuIHRoaXMueD1uWzBdKmUrbls0XSpzK25bOF0qaSx0aGlzLnk9blsxXSplK25bNV0qcytuWzldKmksdGhpcy56PW5bMl0qZStuWzZdKnMrblsxMF0qaSx0aGlzLm5vcm1hbGl6ZSgpfWRpdmlkZSh0KXtyZXR1cm4gdGhpcy54Lz10LngsdGhpcy55Lz10LnksdGhpcy56Lz10LnosdGhpc31kaXZpZGVTY2FsYXIodCl7cmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXIoMS90KX1taW4odCl7cmV0dXJuIHRoaXMueD1NYXRoLm1pbih0aGlzLngsdC54KSx0aGlzLnk9TWF0aC5taW4odGhpcy55LHQueSksdGhpcy56PU1hdGgubWluKHRoaXMueix0LnopLHRoaXN9bWF4KHQpe3JldHVybiB0aGlzLng9TWF0aC5tYXgodGhpcy54LHQueCksdGhpcy55PU1hdGgubWF4KHRoaXMueSx0LnkpLHRoaXMuej1NYXRoLm1heCh0aGlzLnosdC56KSx0aGlzfWNsYW1wKHQsZSl7cmV0dXJuIHRoaXMueD1NYXRoLm1heCh0LngsTWF0aC5taW4oZS54LHRoaXMueCkpLHRoaXMueT1NYXRoLm1heCh0LnksTWF0aC5taW4oZS55LHRoaXMueSkpLHRoaXMuej1NYXRoLm1heCh0LnosTWF0aC5taW4oZS56LHRoaXMueikpLHRoaXN9Y2xhbXBTY2FsYXIodCxlKXtyZXR1cm4gdGhpcy54PU1hdGgubWF4KHQsTWF0aC5taW4oZSx0aGlzLngpKSx0aGlzLnk9TWF0aC5tYXgodCxNYXRoLm1pbihlLHRoaXMueSkpLHRoaXMuej1NYXRoLm1heCh0LE1hdGgubWluKGUsdGhpcy56KSksdGhpc31jbGFtcExlbmd0aCh0LGUpe2NvbnN0IHM9dGhpcy5sZW5ndGgoKTtyZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIoc3x8MSkubXVsdGlwbHlTY2FsYXIoTWF0aC5tYXgodCxNYXRoLm1pbihlLHMpKSl9Zmxvb3IoKXtyZXR1cm4gdGhpcy54PU1hdGguZmxvb3IodGhpcy54KSx0aGlzLnk9TWF0aC5mbG9vcih0aGlzLnkpLHRoaXMuej1NYXRoLmZsb29yKHRoaXMueiksdGhpc31jZWlsKCl7cmV0dXJuIHRoaXMueD1NYXRoLmNlaWwodGhpcy54KSx0aGlzLnk9TWF0aC5jZWlsKHRoaXMueSksdGhpcy56PU1hdGguY2VpbCh0aGlzLnopLHRoaXN9cm91bmQoKXtyZXR1cm4gdGhpcy54PU1hdGgucm91bmQodGhpcy54KSx0aGlzLnk9TWF0aC5yb3VuZCh0aGlzLnkpLHRoaXMuej1NYXRoLnJvdW5kKHRoaXMueiksdGhpc31yb3VuZFRvWmVybygpe3JldHVybiB0aGlzLng9dGhpcy54PDA/TWF0aC5jZWlsKHRoaXMueCk6TWF0aC5mbG9vcih0aGlzLngpLHRoaXMueT10aGlzLnk8MD9NYXRoLmNlaWwodGhpcy55KTpNYXRoLmZsb29yKHRoaXMueSksdGhpcy56PXRoaXMuejwwP01hdGguY2VpbCh0aGlzLnopOk1hdGguZmxvb3IodGhpcy56KSx0aGlzfW5lZ2F0ZSgpe3JldHVybiB0aGlzLng9LXRoaXMueCx0aGlzLnk9LXRoaXMueSx0aGlzLno9LXRoaXMueix0aGlzfWRvdCh0KXtyZXR1cm4gdGhpcy54KnQueCt0aGlzLnkqdC55K3RoaXMueip0Lnp9bGVuZ3RoU3EoKXtyZXR1cm4gdGhpcy54KnRoaXMueCt0aGlzLnkqdGhpcy55K3RoaXMueip0aGlzLnp9bGVuZ3RoKCl7cmV0dXJuIE1hdGguc3FydCh0aGlzLngqdGhpcy54K3RoaXMueSp0aGlzLnkrdGhpcy56KnRoaXMueil9bWFuaGF0dGFuTGVuZ3RoKCl7cmV0dXJuIE1hdGguYWJzKHRoaXMueCkrTWF0aC5hYnModGhpcy55KStNYXRoLmFicyh0aGlzLnopfW5vcm1hbGl6ZSgpe3JldHVybiB0aGlzLmRpdmlkZVNjYWxhcih0aGlzLmxlbmd0aCgpfHwxKX1zZXRMZW5ndGgodCl7cmV0dXJuIHRoaXMubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIodCl9bGVycCh0LGUpe3JldHVybiB0aGlzLngrPSh0LngtdGhpcy54KSplLHRoaXMueSs9KHQueS10aGlzLnkpKmUsdGhpcy56Kz0odC56LXRoaXMueikqZSx0aGlzfWxlcnBWZWN0b3JzKHQsZSxzKXtyZXR1cm4gdGhpcy54PXQueCsoZS54LXQueCkqcyx0aGlzLnk9dC55KyhlLnktdC55KSpzLHRoaXMuej10LnorKGUuei10LnopKnMsdGhpc31jcm9zcyh0LGUpe3JldHVybiBlIT09dm9pZCAwPyhjb25zb2xlLndhcm4oIlRIUkVFLlZlY3RvcjM6IC5jcm9zcygpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLmNyb3NzVmVjdG9ycyggYSwgYiApIGluc3RlYWQuIiksdGhpcy5jcm9zc1ZlY3RvcnModCxlKSk6dGhpcy5jcm9zc1ZlY3RvcnModGhpcyx0KX1jcm9zc1ZlY3RvcnModCxlKXtjb25zdCBzPXQueCxpPXQueSxuPXQueixyPWUueCxvPWUueSxhPWUuejtyZXR1cm4gdGhpcy54PWkqYS1uKm8sdGhpcy55PW4qci1zKmEsdGhpcy56PXMqby1pKnIsdGhpc31wcm9qZWN0T25WZWN0b3IodCl7Y29uc3QgZT10Lmxlbmd0aFNxKCk7aWYoZT09PTApcmV0dXJuIHRoaXMuc2V0KDAsMCwwKTtjb25zdCBzPXQuZG90KHRoaXMpL2U7cmV0dXJuIHRoaXMuY29weSh0KS5tdWx0aXBseVNjYWxhcihzKX1wcm9qZWN0T25QbGFuZSh0KXtyZXR1cm4gcmkuY29weSh0aGlzKS5wcm9qZWN0T25WZWN0b3IodCksdGhpcy5zdWIocmkpfXJlZmxlY3QodCl7cmV0dXJuIHRoaXMuc3ViKHJpLmNvcHkodCkubXVsdGlwbHlTY2FsYXIoMip0aGlzLmRvdCh0KSkpfWFuZ2xlVG8odCl7Y29uc3QgZT1NYXRoLnNxcnQodGhpcy5sZW5ndGhTcSgpKnQubGVuZ3RoU3EoKSk7aWYoZT09PTApcmV0dXJuIE1hdGguUEkvMjtjb25zdCBzPXRoaXMuZG90KHQpL2U7cmV0dXJuIE1hdGguYWNvcyhaKHMsLTEsMSkpfWRpc3RhbmNlVG8odCl7cmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlVG9TcXVhcmVkKHQpKX1kaXN0YW5jZVRvU3F1YXJlZCh0KXtjb25zdCBlPXRoaXMueC10Lngscz10aGlzLnktdC55LGk9dGhpcy56LXQuejtyZXR1cm4gZSplK3MqcytpKml9bWFuaGF0dGFuRGlzdGFuY2VUbyh0KXtyZXR1cm4gTWF0aC5hYnModGhpcy54LXQueCkrTWF0aC5hYnModGhpcy55LXQueSkrTWF0aC5hYnModGhpcy56LXQueil9c2V0RnJvbVNwaGVyaWNhbCh0KXtyZXR1cm4gdGhpcy5zZXRGcm9tU3BoZXJpY2FsQ29vcmRzKHQucmFkaXVzLHQucGhpLHQudGhldGEpfXNldEZyb21TcGhlcmljYWxDb29yZHModCxlLHMpe2NvbnN0IGk9TWF0aC5zaW4oZSkqdDtyZXR1cm4gdGhpcy54PWkqTWF0aC5zaW4ocyksdGhpcy55PU1hdGguY29zKGUpKnQsdGhpcy56PWkqTWF0aC5jb3MocyksdGhpc31zZXRGcm9tQ3lsaW5kcmljYWwodCl7cmV0dXJuIHRoaXMuc2V0RnJvbUN5bGluZHJpY2FsQ29vcmRzKHQucmFkaXVzLHQudGhldGEsdC55KX1zZXRGcm9tQ3lsaW5kcmljYWxDb29yZHModCxlLHMpe3JldHVybiB0aGlzLng9dCpNYXRoLnNpbihlKSx0aGlzLnk9cyx0aGlzLno9dCpNYXRoLmNvcyhlKSx0aGlzfXNldEZyb21NYXRyaXhQb3NpdGlvbih0KXtjb25zdCBlPXQuZWxlbWVudHM7cmV0dXJuIHRoaXMueD1lWzEyXSx0aGlzLnk9ZVsxM10sdGhpcy56PWVbMTRdLHRoaXN9c2V0RnJvbU1hdHJpeFNjYWxlKHQpe2NvbnN0IGU9dGhpcy5zZXRGcm9tTWF0cml4Q29sdW1uKHQsMCkubGVuZ3RoKCkscz10aGlzLnNldEZyb21NYXRyaXhDb2x1bW4odCwxKS5sZW5ndGgoKSxpPXRoaXMuc2V0RnJvbU1hdHJpeENvbHVtbih0LDIpLmxlbmd0aCgpO3JldHVybiB0aGlzLng9ZSx0aGlzLnk9cyx0aGlzLno9aSx0aGlzfXNldEZyb21NYXRyaXhDb2x1bW4odCxlKXtyZXR1cm4gdGhpcy5mcm9tQXJyYXkodC5lbGVtZW50cyxlKjQpfXNldEZyb21NYXRyaXgzQ29sdW1uKHQsZSl7cmV0dXJuIHRoaXMuZnJvbUFycmF5KHQuZWxlbWVudHMsZSozKX1zZXRGcm9tRXVsZXIodCl7cmV0dXJuIHRoaXMueD10Ll94LHRoaXMueT10Ll95LHRoaXMuej10Ll96LHRoaXN9ZXF1YWxzKHQpe3JldHVybiB0Lng9PT10aGlzLngmJnQueT09PXRoaXMueSYmdC56PT09dGhpcy56fWZyb21BcnJheSh0LGU9MCl7cmV0dXJuIHRoaXMueD10W2VdLHRoaXMueT10W2UrMV0sdGhpcy56PXRbZSsyXSx0aGlzfXRvQXJyYXkodD1bXSxlPTApe3JldHVybiB0W2VdPXRoaXMueCx0W2UrMV09dGhpcy55LHRbZSsyXT10aGlzLnosdH1mcm9tQnVmZmVyQXR0cmlidXRlKHQsZSxzKXtyZXR1cm4gcyE9PXZvaWQgMCYmY29uc29sZS53YXJuKCJUSFJFRS5WZWN0b3IzOiBvZmZzZXQgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIC5mcm9tQnVmZmVyQXR0cmlidXRlKCkuIiksdGhpcy54PXQuZ2V0WChlKSx0aGlzLnk9dC5nZXRZKGUpLHRoaXMuej10LmdldFooZSksdGhpc31yYW5kb20oKXtyZXR1cm4gdGhpcy54PU1hdGgucmFuZG9tKCksdGhpcy55PU1hdGgucmFuZG9tKCksdGhpcy56PU1hdGgucmFuZG9tKCksdGhpc31yYW5kb21EaXJlY3Rpb24oKXtjb25zdCB0PShNYXRoLnJhbmRvbSgpLS41KSoyLGU9TWF0aC5yYW5kb20oKSpNYXRoLlBJKjIscz1NYXRoLnNxcnQoMS10KioyKTtyZXR1cm4gdGhpcy54PXMqTWF0aC5jb3MoZSksdGhpcy55PXMqTWF0aC5zaW4oZSksdGhpcy56PXQsdGhpc30qW1N5bWJvbC5pdGVyYXRvcl0oKXt5aWVsZCB0aGlzLngseWllbGQgdGhpcy55LHlpZWxkIHRoaXMuen19Y29uc3Qgcmk9bmV3IHgsSG49bmV3IFR0O2NsYXNzIG90e2NvbnN0cnVjdG9yKHQ9bmV3IHgoMS8wLDEvMCwxLzApLGU9bmV3IHgoLTEvMCwtMS8wLC0xLzApKXt0aGlzLmlzQm94Mz0hMCx0aGlzLm1pbj10LHRoaXMubWF4PWV9c2V0KHQsZSl7cmV0dXJuIHRoaXMubWluLmNvcHkodCksdGhpcy5tYXguY29weShlKSx0aGlzfXNldEZyb21BcnJheSh0KXtsZXQgZT0xLzAscz0xLzAsaT0xLzAsbj0tMS8wLHI9LTEvMCxvPS0xLzA7Zm9yKGxldCBhPTAsaD10Lmxlbmd0aDthPGg7YSs9Myl7Y29uc3QgbD10W2FdLHU9dFthKzFdLGQ9dFthKzJdO2w8ZSYmKGU9bCksdTxzJiYocz11KSxkPGkmJihpPWQpLGw+biYmKG49bCksdT5yJiYocj11KSxkPm8mJihvPWQpfXJldHVybiB0aGlzLm1pbi5zZXQoZSxzLGkpLHRoaXMubWF4LnNldChuLHIsbyksdGhpc31zZXRGcm9tQnVmZmVyQXR0cmlidXRlKHQpe2xldCBlPTEvMCxzPTEvMCxpPTEvMCxuPS0xLzAscj0tMS8wLG89LTEvMDtmb3IobGV0IGE9MCxoPXQuY291bnQ7YTxoO2ErKyl7Y29uc3QgbD10LmdldFgoYSksdT10LmdldFkoYSksZD10LmdldFooYSk7bDxlJiYoZT1sKSx1PHMmJihzPXUpLGQ8aSYmKGk9ZCksbD5uJiYobj1sKSx1PnImJihyPXUpLGQ+byYmKG89ZCl9cmV0dXJuIHRoaXMubWluLnNldChlLHMsaSksdGhpcy5tYXguc2V0KG4scixvKSx0aGlzfXNldEZyb21Qb2ludHModCl7dGhpcy5tYWtlRW1wdHkoKTtmb3IobGV0IGU9MCxzPXQubGVuZ3RoO2U8cztlKyspdGhpcy5leHBhbmRCeVBvaW50KHRbZV0pO3JldHVybiB0aGlzfXNldEZyb21DZW50ZXJBbmRTaXplKHQsZSl7Y29uc3Qgcz1PdC5jb3B5KGUpLm11bHRpcGx5U2NhbGFyKC41KTtyZXR1cm4gdGhpcy5taW4uY29weSh0KS5zdWIocyksdGhpcy5tYXguY29weSh0KS5hZGQocyksdGhpc31zZXRGcm9tT2JqZWN0KHQsZT0hMSl7cmV0dXJuIHRoaXMubWFrZUVtcHR5KCksdGhpcy5leHBhbmRCeU9iamVjdCh0LGUpfWNsb25lKCl7cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKCkuY29weSh0aGlzKX1jb3B5KHQpe3JldHVybiB0aGlzLm1pbi5jb3B5KHQubWluKSx0aGlzLm1heC5jb3B5KHQubWF4KSx0aGlzfW1ha2VFbXB0eSgpe3JldHVybiB0aGlzLm1pbi54PXRoaXMubWluLnk9dGhpcy5taW4uej0xLzAsdGhpcy5tYXgueD10aGlzLm1heC55PXRoaXMubWF4Lno9LTEvMCx0aGlzfWlzRW1wdHkoKXtyZXR1cm4gdGhpcy5tYXgueDx0aGlzLm1pbi54fHx0aGlzLm1heC55PHRoaXMubWluLnl8fHRoaXMubWF4Lno8dGhpcy5taW4uen1nZXRDZW50ZXIodCl7cmV0dXJuIHRoaXMuaXNFbXB0eSgpP3Quc2V0KDAsMCwwKTp0LmFkZFZlY3RvcnModGhpcy5taW4sdGhpcy5tYXgpLm11bHRpcGx5U2NhbGFyKC41KX1nZXRTaXplKHQpe3JldHVybiB0aGlzLmlzRW1wdHkoKT90LnNldCgwLDAsMCk6dC5zdWJWZWN0b3JzKHRoaXMubWF4LHRoaXMubWluKX1leHBhbmRCeVBvaW50KHQpe3JldHVybiB0aGlzLm1pbi5taW4odCksdGhpcy5tYXgubWF4KHQpLHRoaXN9ZXhwYW5kQnlWZWN0b3IodCl7cmV0dXJuIHRoaXMubWluLnN1Yih0KSx0aGlzLm1heC5hZGQodCksdGhpc31leHBhbmRCeVNjYWxhcih0KXtyZXR1cm4gdGhpcy5taW4uYWRkU2NhbGFyKC10KSx0aGlzLm1heC5hZGRTY2FsYXIodCksdGhpc31leHBhbmRCeU9iamVjdCh0LGU9ITEpe3QudXBkYXRlV29ybGRNYXRyaXgoITEsITEpO2NvbnN0IHM9dC5nZW9tZXRyeTtpZihzIT09dm9pZCAwKWlmKGUmJnMuYXR0cmlidXRlcyE9bnVsbCYmcy5hdHRyaWJ1dGVzLnBvc2l0aW9uIT09dm9pZCAwKXtjb25zdCBuPXMuYXR0cmlidXRlcy5wb3NpdGlvbjtmb3IobGV0IHI9MCxvPW4uY291bnQ7cjxvO3IrKylPdC5mcm9tQnVmZmVyQXR0cmlidXRlKG4scikuYXBwbHlNYXRyaXg0KHQubWF0cml4V29ybGQpLHRoaXMuZXhwYW5kQnlQb2ludChPdCl9ZWxzZSBzLmJvdW5kaW5nQm94PT09bnVsbCYmcy5jb21wdXRlQm91bmRpbmdCb3goKSxvaS5jb3B5KHMuYm91bmRpbmdCb3gpLG9pLmFwcGx5TWF0cml4NCh0Lm1hdHJpeFdvcmxkKSx0aGlzLnVuaW9uKG9pKTtjb25zdCBpPXQuY2hpbGRyZW47Zm9yKGxldCBuPTAscj1pLmxlbmd0aDtuPHI7bisrKXRoaXMuZXhwYW5kQnlPYmplY3QoaVtuXSxlKTtyZXR1cm4gdGhpc31jb250YWluc1BvaW50KHQpe3JldHVybiEodC54PHRoaXMubWluLnh8fHQueD50aGlzLm1heC54fHx0Lnk8dGhpcy5taW4ueXx8dC55PnRoaXMubWF4Lnl8fHQuejx0aGlzLm1pbi56fHx0Lno+dGhpcy5tYXgueil9Y29udGFpbnNCb3godCl7cmV0dXJuIHRoaXMubWluLng8PXQubWluLngmJnQubWF4Lng8PXRoaXMubWF4LngmJnRoaXMubWluLnk8PXQubWluLnkmJnQubWF4Lnk8PXRoaXMubWF4LnkmJnRoaXMubWluLno8PXQubWluLnomJnQubWF4Lno8PXRoaXMubWF4Lnp9Z2V0UGFyYW1ldGVyKHQsZSl7cmV0dXJuIGUuc2V0KCh0LngtdGhpcy5taW4ueCkvKHRoaXMubWF4LngtdGhpcy5taW4ueCksKHQueS10aGlzLm1pbi55KS8odGhpcy5tYXgueS10aGlzLm1pbi55KSwodC56LXRoaXMubWluLnopLyh0aGlzLm1heC56LXRoaXMubWluLnopKX1pbnRlcnNlY3RzQm94KHQpe3JldHVybiEodC5tYXgueDx0aGlzLm1pbi54fHx0Lm1pbi54PnRoaXMubWF4Lnh8fHQubWF4Lnk8dGhpcy5taW4ueXx8dC5taW4ueT50aGlzLm1heC55fHx0Lm1heC56PHRoaXMubWluLnp8fHQubWluLno+dGhpcy5tYXgueil9aW50ZXJzZWN0c1NwaGVyZSh0KXtyZXR1cm4gdGhpcy5jbGFtcFBvaW50KHQuY2VudGVyLE90KSxPdC5kaXN0YW5jZVRvU3F1YXJlZCh0LmNlbnRlcik8PXQucmFkaXVzKnQucmFkaXVzfWludGVyc2VjdHNQbGFuZSh0KXtsZXQgZSxzO3JldHVybiB0Lm5vcm1hbC54PjA/KGU9dC5ub3JtYWwueCp0aGlzLm1pbi54LHM9dC5ub3JtYWwueCp0aGlzLm1heC54KTooZT10Lm5vcm1hbC54KnRoaXMubWF4Lngscz10Lm5vcm1hbC54KnRoaXMubWluLngpLHQubm9ybWFsLnk+MD8oZSs9dC5ub3JtYWwueSp0aGlzLm1pbi55LHMrPXQubm9ybWFsLnkqdGhpcy5tYXgueSk6KGUrPXQubm9ybWFsLnkqdGhpcy5tYXgueSxzKz10Lm5vcm1hbC55KnRoaXMubWluLnkpLHQubm9ybWFsLno+MD8oZSs9dC5ub3JtYWwueip0aGlzLm1pbi56LHMrPXQubm9ybWFsLnoqdGhpcy5tYXgueik6KGUrPXQubm9ybWFsLnoqdGhpcy5tYXgueixzKz10Lm5vcm1hbC56KnRoaXMubWluLnopLGU8PS10LmNvbnN0YW50JiZzPj0tdC5jb25zdGFudH1pbnRlcnNlY3RzVHJpYW5nbGUodCl7aWYodGhpcy5pc0VtcHR5KCkpcmV0dXJuITE7dGhpcy5nZXRDZW50ZXIoQWUpLFllLnN1YlZlY3RvcnModGhpcy5tYXgsQWUpLCR0LnN1YlZlY3RvcnModC5hLEFlKSxKdC5zdWJWZWN0b3JzKHQuYixBZSksS3Quc3ViVmVjdG9ycyh0LmMsQWUpLEV0LnN1YlZlY3RvcnMoSnQsJHQpLHZ0LnN1YlZlY3RvcnMoS3QsSnQpLFB0LnN1YlZlY3RvcnMoJHQsS3QpO2xldCBlPVswLC1FdC56LEV0LnksMCwtdnQueix2dC55LDAsLVB0LnosUHQueSxFdC56LDAsLUV0LngsdnQueiwwLC12dC54LFB0LnosMCwtUHQueCwtRXQueSxFdC54LDAsLXZ0LnksdnQueCwwLC1QdC55LFB0LngsMF07cmV0dXJuIWFpKGUsJHQsSnQsS3QsWWUpfHwoZT1bMSwwLDAsMCwxLDAsMCwwLDFdLCFhaShlLCR0LEp0LEt0LFllKSk/ITE6KCRlLmNyb3NzVmVjdG9ycyhFdCx2dCksZT1bJGUueCwkZS55LCRlLnpdLGFpKGUsJHQsSnQsS3QsWWUpKX1jbGFtcFBvaW50KHQsZSl7cmV0dXJuIGUuY29weSh0KS5jbGFtcCh0aGlzLm1pbix0aGlzLm1heCl9ZGlzdGFuY2VUb1BvaW50KHQpe3JldHVybiBPdC5jb3B5KHQpLmNsYW1wKHRoaXMubWluLHRoaXMubWF4KS5zdWIodCkubGVuZ3RoKCl9Z2V0Qm91bmRpbmdTcGhlcmUodCl7cmV0dXJuIHRoaXMuZ2V0Q2VudGVyKHQuY2VudGVyKSx0LnJhZGl1cz10aGlzLmdldFNpemUoT3QpLmxlbmd0aCgpKi41LHR9aW50ZXJzZWN0KHQpe3JldHVybiB0aGlzLm1pbi5tYXgodC5taW4pLHRoaXMubWF4Lm1pbih0Lm1heCksdGhpcy5pc0VtcHR5KCkmJnRoaXMubWFrZUVtcHR5KCksdGhpc311bmlvbih0KXtyZXR1cm4gdGhpcy5taW4ubWluKHQubWluKSx0aGlzLm1heC5tYXgodC5tYXgpLHRoaXN9YXBwbHlNYXRyaXg0KHQpe3JldHVybiB0aGlzLmlzRW1wdHkoKT90aGlzOihmdFswXS5zZXQodGhpcy5taW4ueCx0aGlzLm1pbi55LHRoaXMubWluLnopLmFwcGx5TWF0cml4NCh0KSxmdFsxXS5zZXQodGhpcy5taW4ueCx0aGlzLm1pbi55LHRoaXMubWF4LnopLmFwcGx5TWF0cml4NCh0KSxmdFsyXS5zZXQodGhpcy5taW4ueCx0aGlzLm1heC55LHRoaXMubWluLnopLmFwcGx5TWF0cml4NCh0KSxmdFszXS5zZXQodGhpcy5taW4ueCx0aGlzLm1heC55LHRoaXMubWF4LnopLmFwcGx5TWF0cml4NCh0KSxmdFs0XS5zZXQodGhpcy5tYXgueCx0aGlzLm1pbi55LHRoaXMubWluLnopLmFwcGx5TWF0cml4NCh0KSxmdFs1XS5zZXQodGhpcy5tYXgueCx0aGlzLm1pbi55LHRoaXMubWF4LnopLmFwcGx5TWF0cml4NCh0KSxmdFs2XS5zZXQodGhpcy5tYXgueCx0aGlzLm1heC55LHRoaXMubWluLnopLmFwcGx5TWF0cml4NCh0KSxmdFs3XS5zZXQodGhpcy5tYXgueCx0aGlzLm1heC55LHRoaXMubWF4LnopLmFwcGx5TWF0cml4NCh0KSx0aGlzLnNldEZyb21Qb2ludHMoZnQpLHRoaXMpfXRyYW5zbGF0ZSh0KXtyZXR1cm4gdGhpcy5taW4uYWRkKHQpLHRoaXMubWF4LmFkZCh0KSx0aGlzfWVxdWFscyh0KXtyZXR1cm4gdC5taW4uZXF1YWxzKHRoaXMubWluKSYmdC5tYXguZXF1YWxzKHRoaXMubWF4KX19Y29uc3QgZnQ9W25ldyB4LG5ldyB4LG5ldyB4LG5ldyB4LG5ldyB4LG5ldyB4LG5ldyB4LG5ldyB4XSxPdD1uZXcgeCxvaT1uZXcgb3QsJHQ9bmV3IHgsSnQ9bmV3IHgsS3Q9bmV3IHgsRXQ9bmV3IHgsdnQ9bmV3IHgsUHQ9bmV3IHgsQWU9bmV3IHgsWWU9bmV3IHgsJGU9bmV3IHgsVXQ9bmV3IHg7ZnVuY3Rpb24gYWkoYyx0LGUscyxpKXtmb3IobGV0IG49MCxyPWMubGVuZ3RoLTM7bjw9cjtuKz0zKXtVdC5mcm9tQXJyYXkoYyxuKTtjb25zdCBvPWkueCpNYXRoLmFicyhVdC54KStpLnkqTWF0aC5hYnMoVXQueSkraS56Kk1hdGguYWJzKFV0LnopLGE9dC5kb3QoVXQpLGg9ZS5kb3QoVXQpLGw9cy5kb3QoVXQpO2lmKE1hdGgubWF4KC1NYXRoLm1heChhLGgsbCksTWF0aC5taW4oYSxoLGwpKT5vKXJldHVybiExfXJldHVybiEwfWNvbnN0IHphPW5ldyBvdCxqbj1uZXcgeCxKZT1uZXcgeCxoaT1uZXcgeDtjbGFzcyBwdHtjb25zdHJ1Y3Rvcih0PW5ldyB4LGU9LTEpe3RoaXMuY2VudGVyPXQsdGhpcy5yYWRpdXM9ZX1zZXQodCxlKXtyZXR1cm4gdGhpcy5jZW50ZXIuY29weSh0KSx0aGlzLnJhZGl1cz1lLHRoaXN9c2V0RnJvbVBvaW50cyh0LGUpe2NvbnN0IHM9dGhpcy5jZW50ZXI7ZSE9PXZvaWQgMD9zLmNvcHkoZSk6emEuc2V0RnJvbVBvaW50cyh0KS5nZXRDZW50ZXIocyk7bGV0IGk9MDtmb3IobGV0IG49MCxyPXQubGVuZ3RoO248cjtuKyspaT1NYXRoLm1heChpLHMuZGlzdGFuY2VUb1NxdWFyZWQodFtuXSkpO3JldHVybiB0aGlzLnJhZGl1cz1NYXRoLnNxcnQoaSksdGhpc31jb3B5KHQpe3JldHVybiB0aGlzLmNlbnRlci5jb3B5KHQuY2VudGVyKSx0aGlzLnJhZGl1cz10LnJhZGl1cyx0aGlzfWlzRW1wdHkoKXtyZXR1cm4gdGhpcy5yYWRpdXM8MH1tYWtlRW1wdHkoKXtyZXR1cm4gdGhpcy5jZW50ZXIuc2V0KDAsMCwwKSx0aGlzLnJhZGl1cz0tMSx0aGlzfWNvbnRhaW5zUG9pbnQodCl7cmV0dXJuIHQuZGlzdGFuY2VUb1NxdWFyZWQodGhpcy5jZW50ZXIpPD10aGlzLnJhZGl1cyp0aGlzLnJhZGl1c31kaXN0YW5jZVRvUG9pbnQodCl7cmV0dXJuIHQuZGlzdGFuY2VUbyh0aGlzLmNlbnRlciktdGhpcy5yYWRpdXN9aW50ZXJzZWN0c1NwaGVyZSh0KXtjb25zdCBlPXRoaXMucmFkaXVzK3QucmFkaXVzO3JldHVybiB0LmNlbnRlci5kaXN0YW5jZVRvU3F1YXJlZCh0aGlzLmNlbnRlcik8PWUqZX1pbnRlcnNlY3RzQm94KHQpe3JldHVybiB0LmludGVyc2VjdHNTcGhlcmUodGhpcyl9aW50ZXJzZWN0c1BsYW5lKHQpe3JldHVybiBNYXRoLmFicyh0LmRpc3RhbmNlVG9Qb2ludCh0aGlzLmNlbnRlcikpPD10aGlzLnJhZGl1c31jbGFtcFBvaW50KHQsZSl7Y29uc3Qgcz10aGlzLmNlbnRlci5kaXN0YW5jZVRvU3F1YXJlZCh0KTtyZXR1cm4gZS5jb3B5KHQpLHM+dGhpcy5yYWRpdXMqdGhpcy5yYWRpdXMmJihlLnN1Yih0aGlzLmNlbnRlcikubm9ybWFsaXplKCksZS5tdWx0aXBseVNjYWxhcih0aGlzLnJhZGl1cykuYWRkKHRoaXMuY2VudGVyKSksZX1nZXRCb3VuZGluZ0JveCh0KXtyZXR1cm4gdGhpcy5pc0VtcHR5KCk/KHQubWFrZUVtcHR5KCksdCk6KHQuc2V0KHRoaXMuY2VudGVyLHRoaXMuY2VudGVyKSx0LmV4cGFuZEJ5U2NhbGFyKHRoaXMucmFkaXVzKSx0KX1hcHBseU1hdHJpeDQodCl7cmV0dXJuIHRoaXMuY2VudGVyLmFwcGx5TWF0cml4NCh0KSx0aGlzLnJhZGl1cz10aGlzLnJhZGl1cyp0LmdldE1heFNjYWxlT25BeGlzKCksdGhpc310cmFuc2xhdGUodCl7cmV0dXJuIHRoaXMuY2VudGVyLmFkZCh0KSx0aGlzfWV4cGFuZEJ5UG9pbnQodCl7aGkuc3ViVmVjdG9ycyh0LHRoaXMuY2VudGVyKTtjb25zdCBlPWhpLmxlbmd0aFNxKCk7aWYoZT50aGlzLnJhZGl1cyp0aGlzLnJhZGl1cyl7Y29uc3Qgcz1NYXRoLnNxcnQoZSksaT0ocy10aGlzLnJhZGl1cykqLjU7dGhpcy5jZW50ZXIuYWRkKGhpLm11bHRpcGx5U2NhbGFyKGkvcykpLHRoaXMucmFkaXVzKz1pfXJldHVybiB0aGlzfXVuaW9uKHQpe3JldHVybiB0aGlzLmNlbnRlci5lcXVhbHModC5jZW50ZXIpPT09ITA/SmUuc2V0KDAsMCwxKS5tdWx0aXBseVNjYWxhcih0LnJhZGl1cyk6SmUuc3ViVmVjdG9ycyh0LmNlbnRlcix0aGlzLmNlbnRlcikubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIodC5yYWRpdXMpLHRoaXMuZXhwYW5kQnlQb2ludChqbi5jb3B5KHQuY2VudGVyKS5hZGQoSmUpKSx0aGlzLmV4cGFuZEJ5UG9pbnQoam4uY29weSh0LmNlbnRlcikuc3ViKEplKSksdGhpc31lcXVhbHModCl7cmV0dXJuIHQuY2VudGVyLmVxdWFscyh0aGlzLmNlbnRlcikmJnQucmFkaXVzPT09dGhpcy5yYWRpdXN9Y2xvbmUoKXtyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoKS5jb3B5KHRoaXMpfX1jb25zdCBtdD1uZXcgeCxjaT1uZXcgeCxLZT1uZXcgeCx6dD1uZXcgeCxsaT1uZXcgeCxRZT1uZXcgeCx1aT1uZXcgeDtjbGFzcyBkaXtjb25zdHJ1Y3Rvcih0PW5ldyB4LGU9bmV3IHgoMCwwLC0xKSl7dGhpcy5vcmlnaW49dCx0aGlzLmRpcmVjdGlvbj1lfXNldCh0LGUpe3JldHVybiB0aGlzLm9yaWdpbi5jb3B5KHQpLHRoaXMuZGlyZWN0aW9uLmNvcHkoZSksdGhpc31jb3B5KHQpe3JldHVybiB0aGlzLm9yaWdpbi5jb3B5KHQub3JpZ2luKSx0aGlzLmRpcmVjdGlvbi5jb3B5KHQuZGlyZWN0aW9uKSx0aGlzfWF0KHQsZSl7cmV0dXJuIGUuY29weSh0aGlzLmRpcmVjdGlvbikubXVsdGlwbHlTY2FsYXIodCkuYWRkKHRoaXMub3JpZ2luKX1sb29rQXQodCl7cmV0dXJuIHRoaXMuZGlyZWN0aW9uLmNvcHkodCkuc3ViKHRoaXMub3JpZ2luKS5ub3JtYWxpemUoKSx0aGlzfXJlY2FzdCh0KXtyZXR1cm4gdGhpcy5vcmlnaW4uY29weSh0aGlzLmF0KHQsbXQpKSx0aGlzfWNsb3Nlc3RQb2ludFRvUG9pbnQodCxlKXtlLnN1YlZlY3RvcnModCx0aGlzLm9yaWdpbik7Y29uc3Qgcz1lLmRvdCh0aGlzLmRpcmVjdGlvbik7cmV0dXJuIHM8MD9lLmNvcHkodGhpcy5vcmlnaW4pOmUuY29weSh0aGlzLmRpcmVjdGlvbikubXVsdGlwbHlTY2FsYXIocykuYWRkKHRoaXMub3JpZ2luKX1kaXN0YW5jZVRvUG9pbnQodCl7cmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlU3FUb1BvaW50KHQpKX1kaXN0YW5jZVNxVG9Qb2ludCh0KXtjb25zdCBlPW10LnN1YlZlY3RvcnModCx0aGlzLm9yaWdpbikuZG90KHRoaXMuZGlyZWN0aW9uKTtyZXR1cm4gZTwwP3RoaXMub3JpZ2luLmRpc3RhbmNlVG9TcXVhcmVkKHQpOihtdC5jb3B5KHRoaXMuZGlyZWN0aW9uKS5tdWx0aXBseVNjYWxhcihlKS5hZGQodGhpcy5vcmlnaW4pLG10LmRpc3RhbmNlVG9TcXVhcmVkKHQpKX1kaXN0YW5jZVNxVG9TZWdtZW50KHQsZSxzLGkpe2NpLmNvcHkodCkuYWRkKGUpLm11bHRpcGx5U2NhbGFyKC41KSxLZS5jb3B5KGUpLnN1Yih0KS5ub3JtYWxpemUoKSx6dC5jb3B5KHRoaXMub3JpZ2luKS5zdWIoY2kpO2NvbnN0IG49dC5kaXN0YW5jZVRvKGUpKi41LHI9LXRoaXMuZGlyZWN0aW9uLmRvdChLZSksbz16dC5kb3QodGhpcy5kaXJlY3Rpb24pLGE9LXp0LmRvdChLZSksaD16dC5sZW5ndGhTcSgpLGw9TWF0aC5hYnMoMS1yKnIpO2xldCB1LGQsZixwO2lmKGw+MClpZih1PXIqYS1vLGQ9cipvLWEscD1uKmwsdT49MClpZihkPj0tcClpZihkPD1wKXtjb25zdCBtPTEvbDt1Kj1tLGQqPW0sZj11Kih1K3IqZCsyKm8pK2QqKHIqdStkKzIqYSkraH1lbHNlIGQ9bix1PU1hdGgubWF4KDAsLShyKmQrbykpLGY9LXUqdStkKihkKzIqYSkraDtlbHNlIGQ9LW4sdT1NYXRoLm1heCgwLC0ocipkK28pKSxmPS11KnUrZCooZCsyKmEpK2g7ZWxzZSBkPD0tcD8odT1NYXRoLm1heCgwLC0oLXIqbitvKSksZD11PjA/LW46TWF0aC5taW4oTWF0aC5tYXgoLW4sLWEpLG4pLGY9LXUqdStkKihkKzIqYSkraCk6ZDw9cD8odT0wLGQ9TWF0aC5taW4oTWF0aC5tYXgoLW4sLWEpLG4pLGY9ZCooZCsyKmEpK2gpOih1PU1hdGgubWF4KDAsLShyKm4rbykpLGQ9dT4wP246TWF0aC5taW4oTWF0aC5tYXgoLW4sLWEpLG4pLGY9LXUqdStkKihkKzIqYSkraCk7ZWxzZSBkPXI+MD8tbjpuLHU9TWF0aC5tYXgoMCwtKHIqZCtvKSksZj0tdSp1K2QqKGQrMiphKStoO3JldHVybiBzJiZzLmNvcHkodGhpcy5kaXJlY3Rpb24pLm11bHRpcGx5U2NhbGFyKHUpLmFkZCh0aGlzLm9yaWdpbiksaSYmaS5jb3B5KEtlKS5tdWx0aXBseVNjYWxhcihkKS5hZGQoY2kpLGZ9aW50ZXJzZWN0U3BoZXJlKHQsZSl7bXQuc3ViVmVjdG9ycyh0LmNlbnRlcix0aGlzLm9yaWdpbik7Y29uc3Qgcz1tdC5kb3QodGhpcy5kaXJlY3Rpb24pLGk9bXQuZG90KG10KS1zKnMsbj10LnJhZGl1cyp0LnJhZGl1cztpZihpPm4pcmV0dXJuIG51bGw7Y29uc3Qgcj1NYXRoLnNxcnQobi1pKSxvPXMtcixhPXMrcjtyZXR1cm4gbzwwJiZhPDA/bnVsbDpvPDA/dGhpcy5hdChhLGUpOnRoaXMuYXQobyxlKX1pbnRlcnNlY3RzU3BoZXJlKHQpe3JldHVybiB0aGlzLmRpc3RhbmNlU3FUb1BvaW50KHQuY2VudGVyKTw9dC5yYWRpdXMqdC5yYWRpdXN9ZGlzdGFuY2VUb1BsYW5lKHQpe2NvbnN0IGU9dC5ub3JtYWwuZG90KHRoaXMuZGlyZWN0aW9uKTtpZihlPT09MClyZXR1cm4gdC5kaXN0YW5jZVRvUG9pbnQodGhpcy5vcmlnaW4pPT09MD8wOm51bGw7Y29uc3Qgcz0tKHRoaXMub3JpZ2luLmRvdCh0Lm5vcm1hbCkrdC5jb25zdGFudCkvZTtyZXR1cm4gcz49MD9zOm51bGx9aW50ZXJzZWN0UGxhbmUodCxlKXtjb25zdCBzPXRoaXMuZGlzdGFuY2VUb1BsYW5lKHQpO3JldHVybiBzPT09bnVsbD9udWxsOnRoaXMuYXQocyxlKX1pbnRlcnNlY3RzUGxhbmUodCl7Y29uc3QgZT10LmRpc3RhbmNlVG9Qb2ludCh0aGlzLm9yaWdpbik7cmV0dXJuIGU9PT0wfHx0Lm5vcm1hbC5kb3QodGhpcy5kaXJlY3Rpb24pKmU8MH1pbnRlcnNlY3RCb3godCxlKXtsZXQgcyxpLG4scixvLGE7Y29uc3QgaD0xL3RoaXMuZGlyZWN0aW9uLngsbD0xL3RoaXMuZGlyZWN0aW9uLnksdT0xL3RoaXMuZGlyZWN0aW9uLnosZD10aGlzLm9yaWdpbjtyZXR1cm4gaD49MD8ocz0odC5taW4ueC1kLngpKmgsaT0odC5tYXgueC1kLngpKmgpOihzPSh0Lm1heC54LWQueCkqaCxpPSh0Lm1pbi54LWQueCkqaCksbD49MD8obj0odC5taW4ueS1kLnkpKmwscj0odC5tYXgueS1kLnkpKmwpOihuPSh0Lm1heC55LWQueSkqbCxyPSh0Lm1pbi55LWQueSkqbCkscz5yfHxuPml8fCgobj5zfHxzIT09cykmJihzPW4pLChyPGl8fGkhPT1pKSYmKGk9ciksdT49MD8obz0odC5taW4uei1kLnopKnUsYT0odC5tYXguei1kLnopKnUpOihvPSh0Lm1heC56LWQueikqdSxhPSh0Lm1pbi56LWQueikqdSkscz5hfHxvPmkpfHwoKG8+c3x8cyE9PXMpJiYocz1vKSwoYTxpfHxpIT09aSkmJihpPWEpLGk8MCk/bnVsbDp0aGlzLmF0KHM+PTA/czppLGUpfWludGVyc2VjdHNCb3godCl7cmV0dXJuIHRoaXMuaW50ZXJzZWN0Qm94KHQsbXQpIT09bnVsbH1pbnRlcnNlY3RUcmlhbmdsZSh0LGUscyxpLG4pe2xpLnN1YlZlY3RvcnMoZSx0KSxRZS5zdWJWZWN0b3JzKHMsdCksdWkuY3Jvc3NWZWN0b3JzKGxpLFFlKTtsZXQgcj10aGlzLmRpcmVjdGlvbi5kb3QodWkpLG87aWYocj4wKXtpZihpKXJldHVybiBudWxsO289MX1lbHNlIGlmKHI8MClvPS0xLHI9LXI7ZWxzZSByZXR1cm4gbnVsbDt6dC5zdWJWZWN0b3JzKHRoaXMub3JpZ2luLHQpO2NvbnN0IGE9byp0aGlzLmRpcmVjdGlvbi5kb3QoUWUuY3Jvc3NWZWN0b3JzKHp0LFFlKSk7aWYoYTwwKXJldHVybiBudWxsO2NvbnN0IGg9byp0aGlzLmRpcmVjdGlvbi5kb3QobGkuY3Jvc3MoenQpKTtpZihoPDB8fGEraD5yKXJldHVybiBudWxsO2NvbnN0IGw9LW8qenQuZG90KHVpKTtyZXR1cm4gbDwwP251bGw6dGhpcy5hdChsL3Isbil9YXBwbHlNYXRyaXg0KHQpe3JldHVybiB0aGlzLm9yaWdpbi5hcHBseU1hdHJpeDQodCksdGhpcy5kaXJlY3Rpb24udHJhbnNmb3JtRGlyZWN0aW9uKHQpLHRoaXN9ZXF1YWxzKHQpe3JldHVybiB0Lm9yaWdpbi5lcXVhbHModGhpcy5vcmlnaW4pJiZ0LmRpcmVjdGlvbi5lcXVhbHModGhpcy5kaXJlY3Rpb24pfWNsb25lKCl7cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKCkuY29weSh0aGlzKX19Y2xhc3MgQntjb25zdHJ1Y3Rvcigpe0IucHJvdG90eXBlLmlzTWF0cml4ND0hMCx0aGlzLmVsZW1lbnRzPVsxLDAsMCwwLDAsMSwwLDAsMCwwLDEsMCwwLDAsMCwxXSxhcmd1bWVudHMubGVuZ3RoPjAmJmNvbnNvbGUuZXJyb3IoIlRIUkVFLk1hdHJpeDQ6IHRoZSBjb25zdHJ1Y3RvciBubyBsb25nZXIgcmVhZHMgYXJndW1lbnRzLiB1c2UgLnNldCgpIGluc3RlYWQuIil9c2V0KHQsZSxzLGksbixyLG8sYSxoLGwsdSxkLGYscCxtLGcpe2NvbnN0IHk9dGhpcy5lbGVtZW50cztyZXR1cm4geVswXT10LHlbNF09ZSx5WzhdPXMseVsxMl09aSx5WzFdPW4seVs1XT1yLHlbOV09byx5WzEzXT1hLHlbMl09aCx5WzZdPWwseVsxMF09dSx5WzE0XT1kLHlbM109Zix5WzddPXAseVsxMV09bSx5WzE1XT1nLHRoaXN9aWRlbnRpdHkoKXtyZXR1cm4gdGhpcy5zZXQoMSwwLDAsMCwwLDEsMCwwLDAsMCwxLDAsMCwwLDAsMSksdGhpc31jbG9uZSgpe3JldHVybiBuZXcgQigpLmZyb21BcnJheSh0aGlzLmVsZW1lbnRzKX1jb3B5KHQpe2NvbnN0IGU9dGhpcy5lbGVtZW50cyxzPXQuZWxlbWVudHM7cmV0dXJuIGVbMF09c1swXSxlWzFdPXNbMV0sZVsyXT1zWzJdLGVbM109c1szXSxlWzRdPXNbNF0sZVs1XT1zWzVdLGVbNl09c1s2XSxlWzddPXNbN10sZVs4XT1zWzhdLGVbOV09c1s5XSxlWzEwXT1zWzEwXSxlWzExXT1zWzExXSxlWzEyXT1zWzEyXSxlWzEzXT1zWzEzXSxlWzE0XT1zWzE0XSxlWzE1XT1zWzE1XSx0aGlzfWNvcHlQb3NpdGlvbih0KXtjb25zdCBlPXRoaXMuZWxlbWVudHMscz10LmVsZW1lbnRzO3JldHVybiBlWzEyXT1zWzEyXSxlWzEzXT1zWzEzXSxlWzE0XT1zWzE0XSx0aGlzfXNldEZyb21NYXRyaXgzKHQpe2NvbnN0IGU9dC5lbGVtZW50cztyZXR1cm4gdGhpcy5zZXQoZVswXSxlWzNdLGVbNl0sMCxlWzFdLGVbNF0sZVs3XSwwLGVbMl0sZVs1XSxlWzhdLDAsMCwwLDAsMSksdGhpc31leHRyYWN0QmFzaXModCxlLHMpe3JldHVybiB0LnNldEZyb21NYXRyaXhDb2x1bW4odGhpcywwKSxlLnNldEZyb21NYXRyaXhDb2x1bW4odGhpcywxKSxzLnNldEZyb21NYXRyaXhDb2x1bW4odGhpcywyKSx0aGlzfW1ha2VCYXNpcyh0LGUscyl7cmV0dXJuIHRoaXMuc2V0KHQueCxlLngscy54LDAsdC55LGUueSxzLnksMCx0LnosZS56LHMueiwwLDAsMCwwLDEpLHRoaXN9ZXh0cmFjdFJvdGF0aW9uKHQpe2NvbnN0IGU9dGhpcy5lbGVtZW50cyxzPXQuZWxlbWVudHMsaT0xL1F0LnNldEZyb21NYXRyaXhDb2x1bW4odCwwKS5sZW5ndGgoKSxuPTEvUXQuc2V0RnJvbU1hdHJpeENvbHVtbih0LDEpLmxlbmd0aCgpLHI9MS9RdC5zZXRGcm9tTWF0cml4Q29sdW1uKHQsMikubGVuZ3RoKCk7cmV0dXJuIGVbMF09c1swXSppLGVbMV09c1sxXSppLGVbMl09c1syXSppLGVbM109MCxlWzRdPXNbNF0qbixlWzVdPXNbNV0qbixlWzZdPXNbNl0qbixlWzddPTAsZVs4XT1zWzhdKnIsZVs5XT1zWzldKnIsZVsxMF09c1sxMF0qcixlWzExXT0wLGVbMTJdPTAsZVsxM109MCxlWzE0XT0wLGVbMTVdPTEsdGhpc31tYWtlUm90YXRpb25Gcm9tRXVsZXIodCl7dCYmdC5pc0V1bGVyfHxjb25zb2xlLmVycm9yKCJUSFJFRS5NYXRyaXg0OiAubWFrZVJvdGF0aW9uRnJvbUV1bGVyKCkgbm93IGV4cGVjdHMgYSBFdWxlciByb3RhdGlvbiByYXRoZXIgdGhhbiBhIFZlY3RvcjMgYW5kIG9yZGVyLiIpO2NvbnN0IGU9dGhpcy5lbGVtZW50cyxzPXQueCxpPXQueSxuPXQueixyPU1hdGguY29zKHMpLG89TWF0aC5zaW4ocyksYT1NYXRoLmNvcyhpKSxoPU1hdGguc2luKGkpLGw9TWF0aC5jb3MobiksdT1NYXRoLnNpbihuKTtpZih0Lm9yZGVyPT09IlhZWiIpe2NvbnN0IGQ9cipsLGY9cip1LHA9bypsLG09byp1O2VbMF09YSpsLGVbNF09LWEqdSxlWzhdPWgsZVsxXT1mK3AqaCxlWzVdPWQtbSpoLGVbOV09LW8qYSxlWzJdPW0tZCpoLGVbNl09cCtmKmgsZVsxMF09ciphfWVsc2UgaWYodC5vcmRlcj09PSJZWFoiKXtjb25zdCBkPWEqbCxmPWEqdSxwPWgqbCxtPWgqdTtlWzBdPWQrbSpvLGVbNF09cCpvLWYsZVs4XT1yKmgsZVsxXT1yKnUsZVs1XT1yKmwsZVs5XT0tbyxlWzJdPWYqby1wLGVbNl09bStkKm8sZVsxMF09ciphfWVsc2UgaWYodC5vcmRlcj09PSJaWFkiKXtjb25zdCBkPWEqbCxmPWEqdSxwPWgqbCxtPWgqdTtlWzBdPWQtbSpvLGVbNF09LXIqdSxlWzhdPXArZipvLGVbMV09ZitwKm8sZVs1XT1yKmwsZVs5XT1tLWQqbyxlWzJdPS1yKmgsZVs2XT1vLGVbMTBdPXIqYX1lbHNlIGlmKHQub3JkZXI9PT0iWllYIil7Y29uc3QgZD1yKmwsZj1yKnUscD1vKmwsbT1vKnU7ZVswXT1hKmwsZVs0XT1wKmgtZixlWzhdPWQqaCttLGVbMV09YSp1LGVbNV09bSpoK2QsZVs5XT1mKmgtcCxlWzJdPS1oLGVbNl09byphLGVbMTBdPXIqYX1lbHNlIGlmKHQub3JkZXI9PT0iWVpYIil7Y29uc3QgZD1yKmEsZj1yKmgscD1vKmEsbT1vKmg7ZVswXT1hKmwsZVs0XT1tLWQqdSxlWzhdPXAqdStmLGVbMV09dSxlWzVdPXIqbCxlWzldPS1vKmwsZVsyXT0taCpsLGVbNl09Zip1K3AsZVsxMF09ZC1tKnV9ZWxzZSBpZih0Lm9yZGVyPT09IlhaWSIpe2NvbnN0IGQ9ciphLGY9cipoLHA9byphLG09bypoO2VbMF09YSpsLGVbNF09LXUsZVs4XT1oKmwsZVsxXT1kKnUrbSxlWzVdPXIqbCxlWzldPWYqdS1wLGVbMl09cCp1LWYsZVs2XT1vKmwsZVsxMF09bSp1K2R9cmV0dXJuIGVbM109MCxlWzddPTAsZVsxMV09MCxlWzEyXT0wLGVbMTNdPTAsZVsxNF09MCxlWzE1XT0xLHRoaXN9bWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24odCl7cmV0dXJuIHRoaXMuY29tcG9zZShSYSx0LEJhKX1sb29rQXQodCxlLHMpe2NvbnN0IGk9dGhpcy5lbGVtZW50cztyZXR1cm4gUS5zdWJWZWN0b3JzKHQsZSksUS5sZW5ndGhTcSgpPT09MCYmKFEuej0xKSxRLm5vcm1hbGl6ZSgpLFJ0LmNyb3NzVmVjdG9ycyhzLFEpLFJ0Lmxlbmd0aFNxKCk9PT0wJiYoTWF0aC5hYnMocy56KT09PTE/US54Kz0xZS00OlEueis9MWUtNCxRLm5vcm1hbGl6ZSgpLFJ0LmNyb3NzVmVjdG9ycyhzLFEpKSxSdC5ub3JtYWxpemUoKSx0cy5jcm9zc1ZlY3RvcnMoUSxSdCksaVswXT1SdC54LGlbNF09dHMueCxpWzhdPVEueCxpWzFdPVJ0LnksaVs1XT10cy55LGlbOV09US55LGlbMl09UnQueixpWzZdPXRzLnosaVsxMF09US56LHRoaXN9bXVsdGlwbHkodCxlKXtyZXR1cm4gZSE9PXZvaWQgMD8oY29uc29sZS53YXJuKCJUSFJFRS5NYXRyaXg0OiAubXVsdGlwbHkoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5tdWx0aXBseU1hdHJpY2VzKCBhLCBiICkgaW5zdGVhZC4iKSx0aGlzLm11bHRpcGx5TWF0cmljZXModCxlKSk6dGhpcy5tdWx0aXBseU1hdHJpY2VzKHRoaXMsdCl9cHJlbXVsdGlwbHkodCl7cmV0dXJuIHRoaXMubXVsdGlwbHlNYXRyaWNlcyh0LHRoaXMpfW11bHRpcGx5TWF0cmljZXModCxlKXtjb25zdCBzPXQuZWxlbWVudHMsaT1lLmVsZW1lbnRzLG49dGhpcy5lbGVtZW50cyxyPXNbMF0sbz1zWzRdLGE9c1s4XSxoPXNbMTJdLGw9c1sxXSx1PXNbNV0sZD1zWzldLGY9c1sxM10scD1zWzJdLG09c1s2XSxnPXNbMTBdLHk9c1sxNF0sTT1zWzNdLHc9c1s3XSxfPXNbMTFdLGI9c1sxNV0sQT1pWzBdLFM9aVs0XSx2PWlbOF0saz1pWzEyXSx6PWlbMV0sTD1pWzVdLFI9aVs5XSxUPWlbMTNdLEQ9aVsyXSxDPWlbNl0sWT1pWzEwXSxnZT1pWzE0XSx4cz1pWzNdLGJzPWlbN10sd3M9aVsxMV0sTXM9aVsxNV07cmV0dXJuIG5bMF09cipBK28qeithKkQraCp4cyxuWzRdPXIqUytvKkwrYSpDK2gqYnMsbls4XT1yKnYrbypSK2EqWStoKndzLG5bMTJdPXIqaytvKlQrYSpnZStoKk1zLG5bMV09bCpBK3UqeitkKkQrZip4cyxuWzVdPWwqUyt1KkwrZCpDK2YqYnMsbls5XT1sKnYrdSpSK2QqWStmKndzLG5bMTNdPWwqayt1KlQrZCpnZStmKk1zLG5bMl09cCpBK20qeitnKkQreSp4cyxuWzZdPXAqUyttKkwrZypDK3kqYnMsblsxMF09cCp2K20qUitnKlkreSp3cyxuWzE0XT1wKmsrbSpUK2cqZ2UreSpNcyxuWzNdPU0qQSt3KnorXypEK2IqeHMsbls3XT1NKlMrdypMK18qQytiKmJzLG5bMTFdPU0qdit3KlIrXypZK2Iqd3MsblsxNV09TSprK3cqVCtfKmdlK2IqTXMsdGhpc31tdWx0aXBseVNjYWxhcih0KXtjb25zdCBlPXRoaXMuZWxlbWVudHM7cmV0dXJuIGVbMF0qPXQsZVs0XSo9dCxlWzhdKj10LGVbMTJdKj10LGVbMV0qPXQsZVs1XSo9dCxlWzldKj10LGVbMTNdKj10LGVbMl0qPXQsZVs2XSo9dCxlWzEwXSo9dCxlWzE0XSo9dCxlWzNdKj10LGVbN10qPXQsZVsxMV0qPXQsZVsxNV0qPXQsdGhpc31kZXRlcm1pbmFudCgpe2NvbnN0IHQ9dGhpcy5lbGVtZW50cyxlPXRbMF0scz10WzRdLGk9dFs4XSxuPXRbMTJdLHI9dFsxXSxvPXRbNV0sYT10WzldLGg9dFsxM10sbD10WzJdLHU9dFs2XSxkPXRbMTBdLGY9dFsxNF0scD10WzNdLG09dFs3XSxnPXRbMTFdLHk9dFsxNV07cmV0dXJuIHAqKCtuKmEqdS1pKmgqdS1uKm8qZCtzKmgqZCtpKm8qZi1zKmEqZikrbSooK2UqYSpmLWUqaCpkK24qcipkLWkqcipmK2kqaCpsLW4qYSpsKStnKigrZSpoKnUtZSpvKmYtbipyKnUrcypyKmYrbipvKmwtcypoKmwpK3kqKC1pKm8qbC1lKmEqdStlKm8qZCtpKnIqdS1zKnIqZCtzKmEqbCl9dHJhbnNwb3NlKCl7Y29uc3QgdD10aGlzLmVsZW1lbnRzO2xldCBlO3JldHVybiBlPXRbMV0sdFsxXT10WzRdLHRbNF09ZSxlPXRbMl0sdFsyXT10WzhdLHRbOF09ZSxlPXRbNl0sdFs2XT10WzldLHRbOV09ZSxlPXRbM10sdFszXT10WzEyXSx0WzEyXT1lLGU9dFs3XSx0WzddPXRbMTNdLHRbMTNdPWUsZT10WzExXSx0WzExXT10WzE0XSx0WzE0XT1lLHRoaXN9c2V0UG9zaXRpb24odCxlLHMpe2NvbnN0IGk9dGhpcy5lbGVtZW50cztyZXR1cm4gdC5pc1ZlY3RvcjM/KGlbMTJdPXQueCxpWzEzXT10LnksaVsxNF09dC56KTooaVsxMl09dCxpWzEzXT1lLGlbMTRdPXMpLHRoaXN9aW52ZXJ0KCl7Y29uc3QgdD10aGlzLmVsZW1lbnRzLGU9dFswXSxzPXRbMV0saT10WzJdLG49dFszXSxyPXRbNF0sbz10WzVdLGE9dFs2XSxoPXRbN10sbD10WzhdLHU9dFs5XSxkPXRbMTBdLGY9dFsxMV0scD10WzEyXSxtPXRbMTNdLGc9dFsxNF0seT10WzE1XSxNPXUqZypoLW0qZCpoK20qYSpmLW8qZypmLXUqYSp5K28qZCp5LHc9cCpkKmgtbCpnKmgtcCphKmYrcipnKmYrbCphKnktcipkKnksXz1sKm0qaC1wKnUqaCtwKm8qZi1yKm0qZi1sKm8qeStyKnUqeSxiPXAqdSphLWwqbSphLXAqbypkK3IqbSpkK2wqbypnLXIqdSpnLEE9ZSpNK3MqdytpKl8rbipiO2lmKEE9PT0wKXJldHVybiB0aGlzLnNldCgwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwKTtjb25zdCBTPTEvQTtyZXR1cm4gdFswXT1NKlMsdFsxXT0obSpkKm4tdSpnKm4tbSppKmYrcypnKmYrdSppKnktcypkKnkpKlMsdFsyXT0obypnKm4tbSphKm4rbSppKmgtcypnKmgtbyppKnkrcyphKnkpKlMsdFszXT0odSphKm4tbypkKm4tdSppKmgrcypkKmgrbyppKmYtcyphKmYpKlMsdFs0XT13KlMsdFs1XT0obCpnKm4tcCpkKm4rcCppKmYtZSpnKmYtbCppKnkrZSpkKnkpKlMsdFs2XT0ocCphKm4tcipnKm4tcCppKmgrZSpnKmgrcippKnktZSphKnkpKlMsdFs3XT0ocipkKm4tbCphKm4rbCppKmgtZSpkKmgtcippKmYrZSphKmYpKlMsdFs4XT1fKlMsdFs5XT0ocCp1Km4tbCptKm4tcCpzKmYrZSptKmYrbCpzKnktZSp1KnkpKlMsdFsxMF09KHIqbSpuLXAqbypuK3AqcypoLWUqbSpoLXIqcyp5K2Uqbyp5KSpTLHRbMTFdPShsKm8qbi1yKnUqbi1sKnMqaCtlKnUqaCtyKnMqZi1lKm8qZikqUyx0WzEyXT1iKlMsdFsxM109KGwqbSppLXAqdSppK3AqcypkLWUqbSpkLWwqcypnK2UqdSpnKSpTLHRbMTRdPShwKm8qaS1yKm0qaS1wKnMqYStlKm0qYStyKnMqZy1lKm8qZykqUyx0WzE1XT0ocip1KmktbCpvKmkrbCpzKmEtZSp1KmEtcipzKmQrZSpvKmQpKlMsdGhpc31zY2FsZSh0KXtjb25zdCBlPXRoaXMuZWxlbWVudHMscz10LngsaT10Lnksbj10Lno7cmV0dXJuIGVbMF0qPXMsZVs0XSo9aSxlWzhdKj1uLGVbMV0qPXMsZVs1XSo9aSxlWzldKj1uLGVbMl0qPXMsZVs2XSo9aSxlWzEwXSo9bixlWzNdKj1zLGVbN10qPWksZVsxMV0qPW4sdGhpc31nZXRNYXhTY2FsZU9uQXhpcygpe2NvbnN0IHQ9dGhpcy5lbGVtZW50cyxlPXRbMF0qdFswXSt0WzFdKnRbMV0rdFsyXSp0WzJdLHM9dFs0XSp0WzRdK3RbNV0qdFs1XSt0WzZdKnRbNl0saT10WzhdKnRbOF0rdFs5XSp0WzldK3RbMTBdKnRbMTBdO3JldHVybiBNYXRoLnNxcnQoTWF0aC5tYXgoZSxzLGkpKX1tYWtlVHJhbnNsYXRpb24odCxlLHMpe3JldHVybiB0aGlzLnNldCgxLDAsMCx0LDAsMSwwLGUsMCwwLDEscywwLDAsMCwxKSx0aGlzfW1ha2VSb3RhdGlvblgodCl7Y29uc3QgZT1NYXRoLmNvcyh0KSxzPU1hdGguc2luKHQpO3JldHVybiB0aGlzLnNldCgxLDAsMCwwLDAsZSwtcywwLDAscyxlLDAsMCwwLDAsMSksdGhpc31tYWtlUm90YXRpb25ZKHQpe2NvbnN0IGU9TWF0aC5jb3ModCkscz1NYXRoLnNpbih0KTtyZXR1cm4gdGhpcy5zZXQoZSwwLHMsMCwwLDEsMCwwLC1zLDAsZSwwLDAsMCwwLDEpLHRoaXN9bWFrZVJvdGF0aW9uWih0KXtjb25zdCBlPU1hdGguY29zKHQpLHM9TWF0aC5zaW4odCk7cmV0dXJuIHRoaXMuc2V0KGUsLXMsMCwwLHMsZSwwLDAsMCwwLDEsMCwwLDAsMCwxKSx0aGlzfW1ha2VSb3RhdGlvbkF4aXModCxlKXtjb25zdCBzPU1hdGguY29zKGUpLGk9TWF0aC5zaW4oZSksbj0xLXMscj10Lngsbz10LnksYT10LnosaD1uKnIsbD1uKm87cmV0dXJuIHRoaXMuc2V0KGgqcitzLGgqby1pKmEsaCphK2kqbywwLGgqbytpKmEsbCpvK3MsbCphLWkqciwwLGgqYS1pKm8sbCphK2kqcixuKmEqYStzLDAsMCwwLDAsMSksdGhpc31tYWtlU2NhbGUodCxlLHMpe3JldHVybiB0aGlzLnNldCh0LDAsMCwwLDAsZSwwLDAsMCwwLHMsMCwwLDAsMCwxKSx0aGlzfW1ha2VTaGVhcih0LGUscyxpLG4scil7cmV0dXJuIHRoaXMuc2V0KDEscyxuLDAsdCwxLHIsMCxlLGksMSwwLDAsMCwwLDEpLHRoaXN9Y29tcG9zZSh0LGUscyl7Y29uc3QgaT10aGlzLmVsZW1lbnRzLG49ZS5feCxyPWUuX3ksbz1lLl96LGE9ZS5fdyxoPW4rbixsPXIrcix1PW8rbyxkPW4qaCxmPW4qbCxwPW4qdSxtPXIqbCxnPXIqdSx5PW8qdSxNPWEqaCx3PWEqbCxfPWEqdSxiPXMueCxBPXMueSxTPXMuejtyZXR1cm4gaVswXT0oMS0obSt5KSkqYixpWzFdPShmK18pKmIsaVsyXT0ocC13KSpiLGlbM109MCxpWzRdPShmLV8pKkEsaVs1XT0oMS0oZCt5KSkqQSxpWzZdPShnK00pKkEsaVs3XT0wLGlbOF09KHArdykqUyxpWzldPShnLU0pKlMsaVsxMF09KDEtKGQrbSkpKlMsaVsxMV09MCxpWzEyXT10LngsaVsxM109dC55LGlbMTRdPXQueixpWzE1XT0xLHRoaXN9ZGVjb21wb3NlKHQsZSxzKXtjb25zdCBpPXRoaXMuZWxlbWVudHM7bGV0IG49UXQuc2V0KGlbMF0saVsxXSxpWzJdKS5sZW5ndGgoKTtjb25zdCByPVF0LnNldChpWzRdLGlbNV0saVs2XSkubGVuZ3RoKCksbz1RdC5zZXQoaVs4XSxpWzldLGlbMTBdKS5sZW5ndGgoKTt0aGlzLmRldGVybWluYW50KCk8MCYmKG49LW4pLHQueD1pWzEyXSx0Lnk9aVsxM10sdC56PWlbMTRdLGF0LmNvcHkodGhpcyk7Y29uc3QgaD0xL24sbD0xL3IsdT0xL287cmV0dXJuIGF0LmVsZW1lbnRzWzBdKj1oLGF0LmVsZW1lbnRzWzFdKj1oLGF0LmVsZW1lbnRzWzJdKj1oLGF0LmVsZW1lbnRzWzRdKj1sLGF0LmVsZW1lbnRzWzVdKj1sLGF0LmVsZW1lbnRzWzZdKj1sLGF0LmVsZW1lbnRzWzhdKj11LGF0LmVsZW1lbnRzWzldKj11LGF0LmVsZW1lbnRzWzEwXSo9dSxlLnNldEZyb21Sb3RhdGlvbk1hdHJpeChhdCkscy54PW4scy55PXIscy56PW8sdGhpc31tYWtlUGVyc3BlY3RpdmUodCxlLHMsaSxuLHIpe3I9PT12b2lkIDAmJmNvbnNvbGUud2FybigiVEhSRUUuTWF0cml4NDogLm1ha2VQZXJzcGVjdGl2ZSgpIGhhcyBiZWVuIHJlZGVmaW5lZCBhbmQgaGFzIGEgbmV3IHNpZ25hdHVyZS4gUGxlYXNlIGNoZWNrIHRoZSBkb2NzLiIpO2NvbnN0IG89dGhpcy5lbGVtZW50cyxhPTIqbi8oZS10KSxoPTIqbi8ocy1pKSxsPShlK3QpLyhlLXQpLHU9KHMraSkvKHMtaSksZD0tKHIrbikvKHItbiksZj0tMipyKm4vKHItbik7cmV0dXJuIG9bMF09YSxvWzRdPTAsb1s4XT1sLG9bMTJdPTAsb1sxXT0wLG9bNV09aCxvWzldPXUsb1sxM109MCxvWzJdPTAsb1s2XT0wLG9bMTBdPWQsb1sxNF09ZixvWzNdPTAsb1s3XT0wLG9bMTFdPS0xLG9bMTVdPTAsdGhpc31tYWtlT3J0aG9ncmFwaGljKHQsZSxzLGksbixyKXtjb25zdCBvPXRoaXMuZWxlbWVudHMsYT0xLyhlLXQpLGg9MS8ocy1pKSxsPTEvKHItbiksdT0oZSt0KSphLGQ9KHMraSkqaCxmPShyK24pKmw7cmV0dXJuIG9bMF09MiphLG9bNF09MCxvWzhdPTAsb1sxMl09LXUsb1sxXT0wLG9bNV09MipoLG9bOV09MCxvWzEzXT0tZCxvWzJdPTAsb1s2XT0wLG9bMTBdPS0yKmwsb1sxNF09LWYsb1szXT0wLG9bN109MCxvWzExXT0wLG9bMTVdPTEsdGhpc31lcXVhbHModCl7Y29uc3QgZT10aGlzLmVsZW1lbnRzLHM9dC5lbGVtZW50cztmb3IobGV0IGk9MDtpPDE2O2krKylpZihlW2ldIT09c1tpXSlyZXR1cm4hMTtyZXR1cm4hMH1mcm9tQXJyYXkodCxlPTApe2ZvcihsZXQgcz0wO3M8MTY7cysrKXRoaXMuZWxlbWVudHNbc109dFtzK2VdO3JldHVybiB0aGlzfXRvQXJyYXkodD1bXSxlPTApe2NvbnN0IHM9dGhpcy5lbGVtZW50cztyZXR1cm4gdFtlXT1zWzBdLHRbZSsxXT1zWzFdLHRbZSsyXT1zWzJdLHRbZSszXT1zWzNdLHRbZSs0XT1zWzRdLHRbZSs1XT1zWzVdLHRbZSs2XT1zWzZdLHRbZSs3XT1zWzddLHRbZSs4XT1zWzhdLHRbZSs5XT1zWzldLHRbZSsxMF09c1sxMF0sdFtlKzExXT1zWzExXSx0W2UrMTJdPXNbMTJdLHRbZSsxM109c1sxM10sdFtlKzE0XT1zWzE0XSx0W2UrMTVdPXNbMTVdLHR9fWNvbnN0IFF0PW5ldyB4LGF0PW5ldyBCLFJhPW5ldyB4KDAsMCwwKSxCYT1uZXcgeCgxLDEsMSksUnQ9bmV3IHgsdHM9bmV3IHgsUT1uZXcgeCxXbj1uZXcgQixHbj1uZXcgVHQ7Y2xhc3MgVGV7Y29uc3RydWN0b3IodD0wLGU9MCxzPTAsaT1UZS5EZWZhdWx0T3JkZXIpe3RoaXMuaXNFdWxlcj0hMCx0aGlzLl94PXQsdGhpcy5feT1lLHRoaXMuX3o9cyx0aGlzLl9vcmRlcj1pfWdldCB4KCl7cmV0dXJuIHRoaXMuX3h9c2V0IHgodCl7dGhpcy5feD10LHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKX1nZXQgeSgpe3JldHVybiB0aGlzLl95fXNldCB5KHQpe3RoaXMuX3k9dCx0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCl9Z2V0IHooKXtyZXR1cm4gdGhpcy5fen1zZXQgeih0KXt0aGlzLl96PXQsdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpfWdldCBvcmRlcigpe3JldHVybiB0aGlzLl9vcmRlcn1zZXQgb3JkZXIodCl7dGhpcy5fb3JkZXI9dCx0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCl9c2V0KHQsZSxzLGk9dGhpcy5fb3JkZXIpe3JldHVybiB0aGlzLl94PXQsdGhpcy5feT1lLHRoaXMuX3o9cyx0aGlzLl9vcmRlcj1pLHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKSx0aGlzfWNsb25lKCl7cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuX3gsdGhpcy5feSx0aGlzLl96LHRoaXMuX29yZGVyKX1jb3B5KHQpe3JldHVybiB0aGlzLl94PXQuX3gsdGhpcy5feT10Ll95LHRoaXMuX3o9dC5feix0aGlzLl9vcmRlcj10Ll9vcmRlcix0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCksdGhpc31zZXRGcm9tUm90YXRpb25NYXRyaXgodCxlPXRoaXMuX29yZGVyLHM9ITApe2NvbnN0IGk9dC5lbGVtZW50cyxuPWlbMF0scj1pWzRdLG89aVs4XSxhPWlbMV0saD1pWzVdLGw9aVs5XSx1PWlbMl0sZD1pWzZdLGY9aVsxMF07c3dpdGNoKGUpe2Nhc2UiWFlaIjp0aGlzLl95PU1hdGguYXNpbihaKG8sLTEsMSkpLE1hdGguYWJzKG8pPC45OTk5OTk5Pyh0aGlzLl94PU1hdGguYXRhbjIoLWwsZiksdGhpcy5fej1NYXRoLmF0YW4yKC1yLG4pKToodGhpcy5feD1NYXRoLmF0YW4yKGQsaCksdGhpcy5fej0wKTticmVhaztjYXNlIllYWiI6dGhpcy5feD1NYXRoLmFzaW4oLVoobCwtMSwxKSksTWF0aC5hYnMobCk8Ljk5OTk5OTk/KHRoaXMuX3k9TWF0aC5hdGFuMihvLGYpLHRoaXMuX3o9TWF0aC5hdGFuMihhLGgpKToodGhpcy5feT1NYXRoLmF0YW4yKC11LG4pLHRoaXMuX3o9MCk7YnJlYWs7Y2FzZSJaWFkiOnRoaXMuX3g9TWF0aC5hc2luKFooZCwtMSwxKSksTWF0aC5hYnMoZCk8Ljk5OTk5OTk/KHRoaXMuX3k9TWF0aC5hdGFuMigtdSxmKSx0aGlzLl96PU1hdGguYXRhbjIoLXIsaCkpOih0aGlzLl95PTAsdGhpcy5fej1NYXRoLmF0YW4yKGEsbikpO2JyZWFrO2Nhc2UiWllYIjp0aGlzLl95PU1hdGguYXNpbigtWih1LC0xLDEpKSxNYXRoLmFicyh1KTwuOTk5OTk5OT8odGhpcy5feD1NYXRoLmF0YW4yKGQsZiksdGhpcy5fej1NYXRoLmF0YW4yKGEsbikpOih0aGlzLl94PTAsdGhpcy5fej1NYXRoLmF0YW4yKC1yLGgpKTticmVhaztjYXNlIllaWCI6dGhpcy5fej1NYXRoLmFzaW4oWihhLC0xLDEpKSxNYXRoLmFicyhhKTwuOTk5OTk5OT8odGhpcy5feD1NYXRoLmF0YW4yKC1sLGgpLHRoaXMuX3k9TWF0aC5hdGFuMigtdSxuKSk6KHRoaXMuX3g9MCx0aGlzLl95PU1hdGguYXRhbjIobyxmKSk7YnJlYWs7Y2FzZSJYWlkiOnRoaXMuX3o9TWF0aC5hc2luKC1aKHIsLTEsMSkpLE1hdGguYWJzKHIpPC45OTk5OTk5Pyh0aGlzLl94PU1hdGguYXRhbjIoZCxoKSx0aGlzLl95PU1hdGguYXRhbjIobyxuKSk6KHRoaXMuX3g9TWF0aC5hdGFuMigtbCxmKSx0aGlzLl95PTApO2JyZWFrO2RlZmF1bHQ6Y29uc29sZS53YXJuKCJUSFJFRS5FdWxlcjogLnNldEZyb21Sb3RhdGlvbk1hdHJpeCgpIGVuY291bnRlcmVkIGFuIHVua25vd24gb3JkZXI6ICIrZSl9cmV0dXJuIHRoaXMuX29yZGVyPWUscz09PSEwJiZ0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCksdGhpc31zZXRGcm9tUXVhdGVybmlvbih0LGUscyl7cmV0dXJuIFduLm1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKHQpLHRoaXMuc2V0RnJvbVJvdGF0aW9uTWF0cml4KFduLGUscyl9c2V0RnJvbVZlY3RvcjModCxlPXRoaXMuX29yZGVyKXtyZXR1cm4gdGhpcy5zZXQodC54LHQueSx0LnosZSl9cmVvcmRlcih0KXtyZXR1cm4gR24uc2V0RnJvbUV1bGVyKHRoaXMpLHRoaXMuc2V0RnJvbVF1YXRlcm5pb24oR24sdCl9ZXF1YWxzKHQpe3JldHVybiB0Ll94PT09dGhpcy5feCYmdC5feT09PXRoaXMuX3kmJnQuX3o9PT10aGlzLl96JiZ0Ll9vcmRlcj09PXRoaXMuX29yZGVyfWZyb21BcnJheSh0KXtyZXR1cm4gdGhpcy5feD10WzBdLHRoaXMuX3k9dFsxXSx0aGlzLl96PXRbMl0sdFszXSE9PXZvaWQgMCYmKHRoaXMuX29yZGVyPXRbM10pLHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKSx0aGlzfXRvQXJyYXkodD1bXSxlPTApe3JldHVybiB0W2VdPXRoaXMuX3gsdFtlKzFdPXRoaXMuX3ksdFtlKzJdPXRoaXMuX3osdFtlKzNdPXRoaXMuX29yZGVyLHR9X29uQ2hhbmdlKHQpe3JldHVybiB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrPXQsdGhpc31fb25DaGFuZ2VDYWxsYmFjaygpe30qW1N5bWJvbC5pdGVyYXRvcl0oKXt5aWVsZCB0aGlzLl94LHlpZWxkIHRoaXMuX3kseWllbGQgdGhpcy5feix5aWVsZCB0aGlzLl9vcmRlcn10b1ZlY3RvcjMoKXtjb25zb2xlLmVycm9yKCJUSFJFRS5FdWxlcjogLnRvVmVjdG9yMygpIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSBWZWN0b3IzLnNldEZyb21FdWxlcigpIGluc3RlYWQiKX19VGUuRGVmYXVsdE9yZGVyPSJYWVoiLFRlLlJvdGF0aW9uT3JkZXJzPVsiWFlaIiwiWVpYIiwiWlhZIiwiWFpZIiwiWVhaIiwiWllYIl07Y2xhc3MgTGF7Y29uc3RydWN0b3IoKXt0aGlzLm1hc2s9MX1zZXQodCl7dGhpcy5tYXNrPSgxPDx0fDApPj4+MH1lbmFibGUodCl7dGhpcy5tYXNrfD0xPDx0fDB9ZW5hYmxlQWxsKCl7dGhpcy5tYXNrPS0xfXRvZ2dsZSh0KXt0aGlzLm1hc2tePTE8PHR8MH1kaXNhYmxlKHQpe3RoaXMubWFzayY9figxPDx0fDApfWRpc2FibGVBbGwoKXt0aGlzLm1hc2s9MH10ZXN0KHQpe3JldHVybih0aGlzLm1hc2smdC5tYXNrKSE9PTB9aXNFbmFibGVkKHQpe3JldHVybih0aGlzLm1hc2smKDE8PHR8MCkpIT09MH19bGV0IEZhPTA7Y29uc3QgcW49bmV3IHgsdGU9bmV3IFR0LHl0PW5ldyBCLGVzPW5ldyB4LEVlPW5ldyB4LElhPW5ldyB4LENhPW5ldyBUdCxabj1uZXcgeCgxLDAsMCksWG49bmV3IHgoMCwxLDApLFluPW5ldyB4KDAsMCwxKSxrYT17dHlwZToiYWRkZWQifSwkbj17dHlwZToicmVtb3ZlZCJ9O2NsYXNzIGogZXh0ZW5kcyBHZXtjb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5pc09iamVjdDNEPSEwLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCJpZCIse3ZhbHVlOkZhKyt9KSx0aGlzLnV1aWQ9aXQoKSx0aGlzLm5hbWU9IiIsdGhpcy50eXBlPSJPYmplY3QzRCIsdGhpcy5wYXJlbnQ9bnVsbCx0aGlzLmNoaWxkcmVuPVtdLHRoaXMudXA9ai5EZWZhdWx0VXAuY2xvbmUoKTtjb25zdCB0PW5ldyB4LGU9bmV3IFRlLHM9bmV3IFR0LGk9bmV3IHgoMSwxLDEpO2Z1bmN0aW9uIG4oKXtzLnNldEZyb21FdWxlcihlLCExKX1mdW5jdGlvbiByKCl7ZS5zZXRGcm9tUXVhdGVybmlvbihzLHZvaWQgMCwhMSl9ZS5fb25DaGFuZ2Uobikscy5fb25DaGFuZ2UociksT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcyx7cG9zaXRpb246e2NvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiEwLHZhbHVlOnR9LHJvdGF0aW9uOntjb25maWd1cmFibGU6ITAsZW51bWVyYWJsZTohMCx2YWx1ZTplfSxxdWF0ZXJuaW9uOntjb25maWd1cmFibGU6ITAsZW51bWVyYWJsZTohMCx2YWx1ZTpzfSxzY2FsZTp7Y29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITAsdmFsdWU6aX0sbW9kZWxWaWV3TWF0cml4Ont2YWx1ZTpuZXcgQn0sbm9ybWFsTWF0cml4Ont2YWx1ZTpuZXcgWHR9fSksdGhpcy5tYXRyaXg9bmV3IEIsdGhpcy5tYXRyaXhXb3JsZD1uZXcgQix0aGlzLm1hdHJpeEF1dG9VcGRhdGU9ai5EZWZhdWx0TWF0cml4QXV0b1VwZGF0ZSx0aGlzLm1hdHJpeFdvcmxkTmVlZHNVcGRhdGU9ITEsdGhpcy5sYXllcnM9bmV3IExhLHRoaXMudmlzaWJsZT0hMCx0aGlzLmNhc3RTaGFkb3c9ITEsdGhpcy5yZWNlaXZlU2hhZG93PSExLHRoaXMuZnJ1c3R1bUN1bGxlZD0hMCx0aGlzLnJlbmRlck9yZGVyPTAsdGhpcy5hbmltYXRpb25zPVtdLHRoaXMudXNlckRhdGE9e319b25CZWZvcmVSZW5kZXIoKXt9b25BZnRlclJlbmRlcigpe31hcHBseU1hdHJpeDQodCl7dGhpcy5tYXRyaXhBdXRvVXBkYXRlJiZ0aGlzLnVwZGF0ZU1hdHJpeCgpLHRoaXMubWF0cml4LnByZW11bHRpcGx5KHQpLHRoaXMubWF0cml4LmRlY29tcG9zZSh0aGlzLnBvc2l0aW9uLHRoaXMucXVhdGVybmlvbix0aGlzLnNjYWxlKX1hcHBseVF1YXRlcm5pb24odCl7cmV0dXJuIHRoaXMucXVhdGVybmlvbi5wcmVtdWx0aXBseSh0KSx0aGlzfXNldFJvdGF0aW9uRnJvbUF4aXNBbmdsZSh0LGUpe3RoaXMucXVhdGVybmlvbi5zZXRGcm9tQXhpc0FuZ2xlKHQsZSl9c2V0Um90YXRpb25Gcm9tRXVsZXIodCl7dGhpcy5xdWF0ZXJuaW9uLnNldEZyb21FdWxlcih0LCEwKX1zZXRSb3RhdGlvbkZyb21NYXRyaXgodCl7dGhpcy5xdWF0ZXJuaW9uLnNldEZyb21Sb3RhdGlvbk1hdHJpeCh0KX1zZXRSb3RhdGlvbkZyb21RdWF0ZXJuaW9uKHQpe3RoaXMucXVhdGVybmlvbi5jb3B5KHQpfXJvdGF0ZU9uQXhpcyh0LGUpe3JldHVybiB0ZS5zZXRGcm9tQXhpc0FuZ2xlKHQsZSksdGhpcy5xdWF0ZXJuaW9uLm11bHRpcGx5KHRlKSx0aGlzfXJvdGF0ZU9uV29ybGRBeGlzKHQsZSl7cmV0dXJuIHRlLnNldEZyb21BeGlzQW5nbGUodCxlKSx0aGlzLnF1YXRlcm5pb24ucHJlbXVsdGlwbHkodGUpLHRoaXN9cm90YXRlWCh0KXtyZXR1cm4gdGhpcy5yb3RhdGVPbkF4aXMoWm4sdCl9cm90YXRlWSh0KXtyZXR1cm4gdGhpcy5yb3RhdGVPbkF4aXMoWG4sdCl9cm90YXRlWih0KXtyZXR1cm4gdGhpcy5yb3RhdGVPbkF4aXMoWW4sdCl9dHJhbnNsYXRlT25BeGlzKHQsZSl7cmV0dXJuIHFuLmNvcHkodCkuYXBwbHlRdWF0ZXJuaW9uKHRoaXMucXVhdGVybmlvbiksdGhpcy5wb3NpdGlvbi5hZGQocW4ubXVsdGlwbHlTY2FsYXIoZSkpLHRoaXN9dHJhbnNsYXRlWCh0KXtyZXR1cm4gdGhpcy50cmFuc2xhdGVPbkF4aXMoWm4sdCl9dHJhbnNsYXRlWSh0KXtyZXR1cm4gdGhpcy50cmFuc2xhdGVPbkF4aXMoWG4sdCl9dHJhbnNsYXRlWih0KXtyZXR1cm4gdGhpcy50cmFuc2xhdGVPbkF4aXMoWW4sdCl9bG9jYWxUb1dvcmxkKHQpe3JldHVybiB0LmFwcGx5TWF0cml4NCh0aGlzLm1hdHJpeFdvcmxkKX13b3JsZFRvTG9jYWwodCl7cmV0dXJuIHQuYXBwbHlNYXRyaXg0KHl0LmNvcHkodGhpcy5tYXRyaXhXb3JsZCkuaW52ZXJ0KCkpfWxvb2tBdCh0LGUscyl7dC5pc1ZlY3RvcjM/ZXMuY29weSh0KTplcy5zZXQodCxlLHMpO2NvbnN0IGk9dGhpcy5wYXJlbnQ7dGhpcy51cGRhdGVXb3JsZE1hdHJpeCghMCwhMSksRWUuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHRoaXMubWF0cml4V29ybGQpLHRoaXMuaXNDYW1lcmF8fHRoaXMuaXNMaWdodD95dC5sb29rQXQoRWUsZXMsdGhpcy51cCk6eXQubG9va0F0KGVzLEVlLHRoaXMudXApLHRoaXMucXVhdGVybmlvbi5zZXRGcm9tUm90YXRpb25NYXRyaXgoeXQpLGkmJih5dC5leHRyYWN0Um90YXRpb24oaS5tYXRyaXhXb3JsZCksdGUuc2V0RnJvbVJvdGF0aW9uTWF0cml4KHl0KSx0aGlzLnF1YXRlcm5pb24ucHJlbXVsdGlwbHkodGUuaW52ZXJ0KCkpKX1hZGQodCl7aWYoYXJndW1lbnRzLmxlbmd0aD4xKXtmb3IobGV0IGU9MDtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKXRoaXMuYWRkKGFyZ3VtZW50c1tlXSk7cmV0dXJuIHRoaXN9cmV0dXJuIHQ9PT10aGlzPyhjb25zb2xlLmVycm9yKCJUSFJFRS5PYmplY3QzRC5hZGQ6IG9iamVjdCBjYW4ndCBiZSBhZGRlZCBhcyBhIGNoaWxkIG9mIGl0c2VsZi4iLHQpLHRoaXMpOih0JiZ0LmlzT2JqZWN0M0Q/KHQucGFyZW50IT09bnVsbCYmdC5wYXJlbnQucmVtb3ZlKHQpLHQucGFyZW50PXRoaXMsdGhpcy5jaGlsZHJlbi5wdXNoKHQpLHQuZGlzcGF0Y2hFdmVudChrYSkpOmNvbnNvbGUuZXJyb3IoIlRIUkVFLk9iamVjdDNELmFkZDogb2JqZWN0IG5vdCBhbiBpbnN0YW5jZSBvZiBUSFJFRS5PYmplY3QzRC4iLHQpLHRoaXMpfXJlbW92ZSh0KXtpZihhcmd1bWVudHMubGVuZ3RoPjEpe2ZvcihsZXQgcz0wO3M8YXJndW1lbnRzLmxlbmd0aDtzKyspdGhpcy5yZW1vdmUoYXJndW1lbnRzW3NdKTtyZXR1cm4gdGhpc31jb25zdCBlPXRoaXMuY2hpbGRyZW4uaW5kZXhPZih0KTtyZXR1cm4gZSE9PS0xJiYodC5wYXJlbnQ9bnVsbCx0aGlzLmNoaWxkcmVuLnNwbGljZShlLDEpLHQuZGlzcGF0Y2hFdmVudCgkbikpLHRoaXN9cmVtb3ZlRnJvbVBhcmVudCgpe2NvbnN0IHQ9dGhpcy5wYXJlbnQ7cmV0dXJuIHQhPT1udWxsJiZ0LnJlbW92ZSh0aGlzKSx0aGlzfWNsZWFyKCl7Zm9yKGxldCB0PTA7dDx0aGlzLmNoaWxkcmVuLmxlbmd0aDt0Kyspe2NvbnN0IGU9dGhpcy5jaGlsZHJlblt0XTtlLnBhcmVudD1udWxsLGUuZGlzcGF0Y2hFdmVudCgkbil9cmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoPTAsdGhpc31hdHRhY2godCl7cmV0dXJuIHRoaXMudXBkYXRlV29ybGRNYXRyaXgoITAsITEpLHl0LmNvcHkodGhpcy5tYXRyaXhXb3JsZCkuaW52ZXJ0KCksdC5wYXJlbnQhPT1udWxsJiYodC5wYXJlbnQudXBkYXRlV29ybGRNYXRyaXgoITAsITEpLHl0Lm11bHRpcGx5KHQucGFyZW50Lm1hdHJpeFdvcmxkKSksdC5hcHBseU1hdHJpeDQoeXQpLHRoaXMuYWRkKHQpLHQudXBkYXRlV29ybGRNYXRyaXgoITEsITApLHRoaXN9Z2V0T2JqZWN0QnlJZCh0KXtyZXR1cm4gdGhpcy5nZXRPYmplY3RCeVByb3BlcnR5KCJpZCIsdCl9Z2V0T2JqZWN0QnlOYW1lKHQpe3JldHVybiB0aGlzLmdldE9iamVjdEJ5UHJvcGVydHkoIm5hbWUiLHQpfWdldE9iamVjdEJ5UHJvcGVydHkodCxlKXtpZih0aGlzW3RdPT09ZSlyZXR1cm4gdGhpcztmb3IobGV0IHM9MCxpPXRoaXMuY2hpbGRyZW4ubGVuZ3RoO3M8aTtzKyspe2NvbnN0IHI9dGhpcy5jaGlsZHJlbltzXS5nZXRPYmplY3RCeVByb3BlcnR5KHQsZSk7aWYociE9PXZvaWQgMClyZXR1cm4gcn19Z2V0V29ybGRQb3NpdGlvbih0KXtyZXR1cm4gdGhpcy51cGRhdGVXb3JsZE1hdHJpeCghMCwhMSksdC5zZXRGcm9tTWF0cml4UG9zaXRpb24odGhpcy5tYXRyaXhXb3JsZCl9Z2V0V29ybGRRdWF0ZXJuaW9uKHQpe3JldHVybiB0aGlzLnVwZGF0ZVdvcmxkTWF0cml4KCEwLCExKSx0aGlzLm1hdHJpeFdvcmxkLmRlY29tcG9zZShFZSx0LElhKSx0fWdldFdvcmxkU2NhbGUodCl7cmV0dXJuIHRoaXMudXBkYXRlV29ybGRNYXRyaXgoITAsITEpLHRoaXMubWF0cml4V29ybGQuZGVjb21wb3NlKEVlLENhLHQpLHR9Z2V0V29ybGREaXJlY3Rpb24odCl7dGhpcy51cGRhdGVXb3JsZE1hdHJpeCghMCwhMSk7Y29uc3QgZT10aGlzLm1hdHJpeFdvcmxkLmVsZW1lbnRzO3JldHVybiB0LnNldChlWzhdLGVbOV0sZVsxMF0pLm5vcm1hbGl6ZSgpfXJheWNhc3QoKXt9dHJhdmVyc2UodCl7dCh0aGlzKTtjb25zdCBlPXRoaXMuY2hpbGRyZW47Zm9yKGxldCBzPTAsaT1lLmxlbmd0aDtzPGk7cysrKWVbc10udHJhdmVyc2UodCl9dHJhdmVyc2VWaXNpYmxlKHQpe2lmKHRoaXMudmlzaWJsZT09PSExKXJldHVybjt0KHRoaXMpO2NvbnN0IGU9dGhpcy5jaGlsZHJlbjtmb3IobGV0IHM9MCxpPWUubGVuZ3RoO3M8aTtzKyspZVtzXS50cmF2ZXJzZVZpc2libGUodCl9dHJhdmVyc2VBbmNlc3RvcnModCl7Y29uc3QgZT10aGlzLnBhcmVudDtlIT09bnVsbCYmKHQoZSksZS50cmF2ZXJzZUFuY2VzdG9ycyh0KSl9dXBkYXRlTWF0cml4KCl7dGhpcy5tYXRyaXguY29tcG9zZSh0aGlzLnBvc2l0aW9uLHRoaXMucXVhdGVybmlvbix0aGlzLnNjYWxlKSx0aGlzLm1hdHJpeFdvcmxkTmVlZHNVcGRhdGU9ITB9dXBkYXRlTWF0cml4V29ybGQodCl7dGhpcy5tYXRyaXhBdXRvVXBkYXRlJiZ0aGlzLnVwZGF0ZU1hdHJpeCgpLCh0aGlzLm1hdHJpeFdvcmxkTmVlZHNVcGRhdGV8fHQpJiYodGhpcy5wYXJlbnQ9PT1udWxsP3RoaXMubWF0cml4V29ybGQuY29weSh0aGlzLm1hdHJpeCk6dGhpcy5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMucGFyZW50Lm1hdHJpeFdvcmxkLHRoaXMubWF0cml4KSx0aGlzLm1hdHJpeFdvcmxkTmVlZHNVcGRhdGU9ITEsdD0hMCk7Y29uc3QgZT10aGlzLmNoaWxkcmVuO2ZvcihsZXQgcz0wLGk9ZS5sZW5ndGg7czxpO3MrKyllW3NdLnVwZGF0ZU1hdHJpeFdvcmxkKHQpfXVwZGF0ZVdvcmxkTWF0cml4KHQsZSl7Y29uc3Qgcz10aGlzLnBhcmVudDtpZih0PT09ITAmJnMhPT1udWxsJiZzLnVwZGF0ZVdvcmxkTWF0cml4KCEwLCExKSx0aGlzLm1hdHJpeEF1dG9VcGRhdGUmJnRoaXMudXBkYXRlTWF0cml4KCksdGhpcy5wYXJlbnQ9PT1udWxsP3RoaXMubWF0cml4V29ybGQuY29weSh0aGlzLm1hdHJpeCk6dGhpcy5tYXRyaXhXb3JsZC5tdWx0aXBseU1hdHJpY2VzKHRoaXMucGFyZW50Lm1hdHJpeFdvcmxkLHRoaXMubWF0cml4KSxlPT09ITApe2NvbnN0IGk9dGhpcy5jaGlsZHJlbjtmb3IobGV0IG49MCxyPWkubGVuZ3RoO248cjtuKyspaVtuXS51cGRhdGVXb3JsZE1hdHJpeCghMSwhMCl9fXRvSlNPTih0KXtjb25zdCBlPXQ9PT12b2lkIDB8fHR5cGVvZiB0PT0ic3RyaW5nIixzPXt9O2UmJih0PXtnZW9tZXRyaWVzOnt9LG1hdGVyaWFsczp7fSx0ZXh0dXJlczp7fSxpbWFnZXM6e30sc2hhcGVzOnt9LHNrZWxldG9uczp7fSxhbmltYXRpb25zOnt9LG5vZGVzOnt9fSxzLm1ldGFkYXRhPXt2ZXJzaW9uOjQuNSx0eXBlOiJPYmplY3QiLGdlbmVyYXRvcjoiT2JqZWN0M0QudG9KU09OIn0pO2NvbnN0IGk9e307aS51dWlkPXRoaXMudXVpZCxpLnR5cGU9dGhpcy50eXBlLHRoaXMubmFtZSE9PSIiJiYoaS5uYW1lPXRoaXMubmFtZSksdGhpcy5jYXN0U2hhZG93PT09ITAmJihpLmNhc3RTaGFkb3c9ITApLHRoaXMucmVjZWl2ZVNoYWRvdz09PSEwJiYoaS5yZWNlaXZlU2hhZG93PSEwKSx0aGlzLnZpc2libGU9PT0hMSYmKGkudmlzaWJsZT0hMSksdGhpcy5mcnVzdHVtQ3VsbGVkPT09ITEmJihpLmZydXN0dW1DdWxsZWQ9ITEpLHRoaXMucmVuZGVyT3JkZXIhPT0wJiYoaS5yZW5kZXJPcmRlcj10aGlzLnJlbmRlck9yZGVyKSxKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJEYXRhKSE9PSJ7fSImJihpLnVzZXJEYXRhPXRoaXMudXNlckRhdGEpLGkubGF5ZXJzPXRoaXMubGF5ZXJzLm1hc2ssaS5tYXRyaXg9dGhpcy5tYXRyaXgudG9BcnJheSgpLHRoaXMubWF0cml4QXV0b1VwZGF0ZT09PSExJiYoaS5tYXRyaXhBdXRvVXBkYXRlPSExKSx0aGlzLmlzSW5zdGFuY2VkTWVzaCYmKGkudHlwZT0iSW5zdGFuY2VkTWVzaCIsaS5jb3VudD10aGlzLmNvdW50LGkuaW5zdGFuY2VNYXRyaXg9dGhpcy5pbnN0YW5jZU1hdHJpeC50b0pTT04oKSx0aGlzLmluc3RhbmNlQ29sb3IhPT1udWxsJiYoaS5pbnN0YW5jZUNvbG9yPXRoaXMuaW5zdGFuY2VDb2xvci50b0pTT04oKSkpO2Z1bmN0aW9uIG4obyxhKXtyZXR1cm4gb1thLnV1aWRdPT09dm9pZCAwJiYob1thLnV1aWRdPWEudG9KU09OKHQpKSxhLnV1aWR9aWYodGhpcy5pc1NjZW5lKXRoaXMuYmFja2dyb3VuZCYmKHRoaXMuYmFja2dyb3VuZC5pc0NvbG9yP2kuYmFja2dyb3VuZD10aGlzLmJhY2tncm91bmQudG9KU09OKCk6dGhpcy5iYWNrZ3JvdW5kLmlzVGV4dHVyZSYmKGkuYmFja2dyb3VuZD10aGlzLmJhY2tncm91bmQudG9KU09OKHQpLnV1aWQpKSx0aGlzLmVudmlyb25tZW50JiZ0aGlzLmVudmlyb25tZW50LmlzVGV4dHVyZSYmKGkuZW52aXJvbm1lbnQ9dGhpcy5lbnZpcm9ubWVudC50b0pTT04odCkudXVpZCk7ZWxzZSBpZih0aGlzLmlzTWVzaHx8dGhpcy5pc0xpbmV8fHRoaXMuaXNQb2ludHMpe2kuZ2VvbWV0cnk9bih0Lmdlb21ldHJpZXMsdGhpcy5nZW9tZXRyeSk7Y29uc3Qgbz10aGlzLmdlb21ldHJ5LnBhcmFtZXRlcnM7aWYobyE9PXZvaWQgMCYmby5zaGFwZXMhPT12b2lkIDApe2NvbnN0IGE9by5zaGFwZXM7aWYoQXJyYXkuaXNBcnJheShhKSlmb3IobGV0IGg9MCxsPWEubGVuZ3RoO2g8bDtoKyspe2NvbnN0IHU9YVtoXTtuKHQuc2hhcGVzLHUpfWVsc2Ugbih0LnNoYXBlcyxhKX19aWYodGhpcy5pc1NraW5uZWRNZXNoJiYoaS5iaW5kTW9kZT10aGlzLmJpbmRNb2RlLGkuYmluZE1hdHJpeD10aGlzLmJpbmRNYXRyaXgudG9BcnJheSgpLHRoaXMuc2tlbGV0b24hPT12b2lkIDAmJihuKHQuc2tlbGV0b25zLHRoaXMuc2tlbGV0b24pLGkuc2tlbGV0b249dGhpcy5za2VsZXRvbi51dWlkKSksdGhpcy5tYXRlcmlhbCE9PXZvaWQgMClpZihBcnJheS5pc0FycmF5KHRoaXMubWF0ZXJpYWwpKXtjb25zdCBvPVtdO2ZvcihsZXQgYT0wLGg9dGhpcy5tYXRlcmlhbC5sZW5ndGg7YTxoO2ErKylvLnB1c2gobih0Lm1hdGVyaWFscyx0aGlzLm1hdGVyaWFsW2FdKSk7aS5tYXRlcmlhbD1vfWVsc2UgaS5tYXRlcmlhbD1uKHQubWF0ZXJpYWxzLHRoaXMubWF0ZXJpYWwpO2lmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPjApe2kuY2hpbGRyZW49W107Zm9yKGxldCBvPTA7bzx0aGlzLmNoaWxkcmVuLmxlbmd0aDtvKyspaS5jaGlsZHJlbi5wdXNoKHRoaXMuY2hpbGRyZW5bb10udG9KU09OKHQpLm9iamVjdCl9aWYodGhpcy5hbmltYXRpb25zLmxlbmd0aD4wKXtpLmFuaW1hdGlvbnM9W107Zm9yKGxldCBvPTA7bzx0aGlzLmFuaW1hdGlvbnMubGVuZ3RoO28rKyl7Y29uc3QgYT10aGlzLmFuaW1hdGlvbnNbb107aS5hbmltYXRpb25zLnB1c2gobih0LmFuaW1hdGlvbnMsYSkpfX1pZihlKXtjb25zdCBvPXIodC5nZW9tZXRyaWVzKSxhPXIodC5tYXRlcmlhbHMpLGg9cih0LnRleHR1cmVzKSxsPXIodC5pbWFnZXMpLHU9cih0LnNoYXBlcyksZD1yKHQuc2tlbGV0b25zKSxmPXIodC5hbmltYXRpb25zKSxwPXIodC5ub2Rlcyk7by5sZW5ndGg+MCYmKHMuZ2VvbWV0cmllcz1vKSxhLmxlbmd0aD4wJiYocy5tYXRlcmlhbHM9YSksaC5sZW5ndGg+MCYmKHMudGV4dHVyZXM9aCksbC5sZW5ndGg+MCYmKHMuaW1hZ2VzPWwpLHUubGVuZ3RoPjAmJihzLnNoYXBlcz11KSxkLmxlbmd0aD4wJiYocy5za2VsZXRvbnM9ZCksZi5sZW5ndGg+MCYmKHMuYW5pbWF0aW9ucz1mKSxwLmxlbmd0aD4wJiYocy5ub2Rlcz1wKX1yZXR1cm4gcy5vYmplY3Q9aSxzO2Z1bmN0aW9uIHIobyl7Y29uc3QgYT1bXTtmb3IoY29uc3QgaCBpbiBvKXtjb25zdCBsPW9baF07ZGVsZXRlIGwubWV0YWRhdGEsYS5wdXNoKGwpfXJldHVybiBhfX1jbG9uZSh0KXtyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoKS5jb3B5KHRoaXMsdCl9Y29weSh0LGU9ITApe2lmKHRoaXMubmFtZT10Lm5hbWUsdGhpcy51cC5jb3B5KHQudXApLHRoaXMucG9zaXRpb24uY29weSh0LnBvc2l0aW9uKSx0aGlzLnJvdGF0aW9uLm9yZGVyPXQucm90YXRpb24ub3JkZXIsdGhpcy5xdWF0ZXJuaW9uLmNvcHkodC5xdWF0ZXJuaW9uKSx0aGlzLnNjYWxlLmNvcHkodC5zY2FsZSksdGhpcy5tYXRyaXguY29weSh0Lm1hdHJpeCksdGhpcy5tYXRyaXhXb3JsZC5jb3B5KHQubWF0cml4V29ybGQpLHRoaXMubWF0cml4QXV0b1VwZGF0ZT10Lm1hdHJpeEF1dG9VcGRhdGUsdGhpcy5tYXRyaXhXb3JsZE5lZWRzVXBkYXRlPXQubWF0cml4V29ybGROZWVkc1VwZGF0ZSx0aGlzLmxheWVycy5tYXNrPXQubGF5ZXJzLm1hc2ssdGhpcy52aXNpYmxlPXQudmlzaWJsZSx0aGlzLmNhc3RTaGFkb3c9dC5jYXN0U2hhZG93LHRoaXMucmVjZWl2ZVNoYWRvdz10LnJlY2VpdmVTaGFkb3csdGhpcy5mcnVzdHVtQ3VsbGVkPXQuZnJ1c3R1bUN1bGxlZCx0aGlzLnJlbmRlck9yZGVyPXQucmVuZGVyT3JkZXIsdGhpcy51c2VyRGF0YT1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHQudXNlckRhdGEpKSxlPT09ITApZm9yKGxldCBzPTA7czx0LmNoaWxkcmVuLmxlbmd0aDtzKyspe2NvbnN0IGk9dC5jaGlsZHJlbltzXTt0aGlzLmFkZChpLmNsb25lKCkpfXJldHVybiB0aGlzfX1qLkRlZmF1bHRVcD1uZXcgeCgwLDEsMCksai5EZWZhdWx0TWF0cml4QXV0b1VwZGF0ZT0hMDtjb25zdCBodD1uZXcgeCxndD1uZXcgeCxmaT1uZXcgeCx4dD1uZXcgeCxlZT1uZXcgeCxzZT1uZXcgeCxKbj1uZXcgeCxwaT1uZXcgeCxtaT1uZXcgeCx5aT1uZXcgeDtjbGFzcyBidHtjb25zdHJ1Y3Rvcih0PW5ldyB4LGU9bmV3IHgscz1uZXcgeCl7dGhpcy5hPXQsdGhpcy5iPWUsdGhpcy5jPXN9c3RhdGljIGdldE5vcm1hbCh0LGUscyxpKXtpLnN1YlZlY3RvcnMocyxlKSxodC5zdWJWZWN0b3JzKHQsZSksaS5jcm9zcyhodCk7Y29uc3Qgbj1pLmxlbmd0aFNxKCk7cmV0dXJuIG4+MD9pLm11bHRpcGx5U2NhbGFyKDEvTWF0aC5zcXJ0KG4pKTppLnNldCgwLDAsMCl9c3RhdGljIGdldEJhcnljb29yZCh0LGUscyxpLG4pe2h0LnN1YlZlY3RvcnMoaSxlKSxndC5zdWJWZWN0b3JzKHMsZSksZmkuc3ViVmVjdG9ycyh0LGUpO2NvbnN0IHI9aHQuZG90KGh0KSxvPWh0LmRvdChndCksYT1odC5kb3QoZmkpLGg9Z3QuZG90KGd0KSxsPWd0LmRvdChmaSksdT1yKmgtbypvO2lmKHU9PT0wKXJldHVybiBuLnNldCgtMiwtMSwtMSk7Y29uc3QgZD0xL3UsZj0oaCphLW8qbCkqZCxwPShyKmwtbyphKSpkO3JldHVybiBuLnNldCgxLWYtcCxwLGYpfXN0YXRpYyBjb250YWluc1BvaW50KHQsZSxzLGkpe3JldHVybiB0aGlzLmdldEJhcnljb29yZCh0LGUscyxpLHh0KSx4dC54Pj0wJiZ4dC55Pj0wJiZ4dC54K3h0Lnk8PTF9c3RhdGljIGdldFVWKHQsZSxzLGksbixyLG8sYSl7cmV0dXJuIHRoaXMuZ2V0QmFyeWNvb3JkKHQsZSxzLGkseHQpLGEuc2V0KDAsMCksYS5hZGRTY2FsZWRWZWN0b3Iobix4dC54KSxhLmFkZFNjYWxlZFZlY3RvcihyLHh0LnkpLGEuYWRkU2NhbGVkVmVjdG9yKG8seHQueiksYX1zdGF0aWMgaXNGcm9udEZhY2luZyh0LGUscyxpKXtyZXR1cm4gaHQuc3ViVmVjdG9ycyhzLGUpLGd0LnN1YlZlY3RvcnModCxlKSxodC5jcm9zcyhndCkuZG90KGkpPDB9c2V0KHQsZSxzKXtyZXR1cm4gdGhpcy5hLmNvcHkodCksdGhpcy5iLmNvcHkoZSksdGhpcy5jLmNvcHkocyksdGhpc31zZXRGcm9tUG9pbnRzQW5kSW5kaWNlcyh0LGUscyxpKXtyZXR1cm4gdGhpcy5hLmNvcHkodFtlXSksdGhpcy5iLmNvcHkodFtzXSksdGhpcy5jLmNvcHkodFtpXSksdGhpc31zZXRGcm9tQXR0cmlidXRlQW5kSW5kaWNlcyh0LGUscyxpKXtyZXR1cm4gdGhpcy5hLmZyb21CdWZmZXJBdHRyaWJ1dGUodCxlKSx0aGlzLmIuZnJvbUJ1ZmZlckF0dHJpYnV0ZSh0LHMpLHRoaXMuYy5mcm9tQnVmZmVyQXR0cmlidXRlKHQsaSksdGhpc31jbG9uZSgpe3JldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcigpLmNvcHkodGhpcyl9Y29weSh0KXtyZXR1cm4gdGhpcy5hLmNvcHkodC5hKSx0aGlzLmIuY29weSh0LmIpLHRoaXMuYy5jb3B5KHQuYyksdGhpc31nZXRBcmVhKCl7cmV0dXJuIGh0LnN1YlZlY3RvcnModGhpcy5jLHRoaXMuYiksZ3Quc3ViVmVjdG9ycyh0aGlzLmEsdGhpcy5iKSxodC5jcm9zcyhndCkubGVuZ3RoKCkqLjV9Z2V0TWlkcG9pbnQodCl7cmV0dXJuIHQuYWRkVmVjdG9ycyh0aGlzLmEsdGhpcy5iKS5hZGQodGhpcy5jKS5tdWx0aXBseVNjYWxhcigxLzMpfWdldE5vcm1hbCh0KXtyZXR1cm4gYnQuZ2V0Tm9ybWFsKHRoaXMuYSx0aGlzLmIsdGhpcy5jLHQpfWdldFBsYW5lKHQpe3JldHVybiB0LnNldEZyb21Db3BsYW5hclBvaW50cyh0aGlzLmEsdGhpcy5iLHRoaXMuYyl9Z2V0QmFyeWNvb3JkKHQsZSl7cmV0dXJuIGJ0LmdldEJhcnljb29yZCh0LHRoaXMuYSx0aGlzLmIsdGhpcy5jLGUpfWdldFVWKHQsZSxzLGksbil7cmV0dXJuIGJ0LmdldFVWKHQsdGhpcy5hLHRoaXMuYix0aGlzLmMsZSxzLGksbil9Y29udGFpbnNQb2ludCh0KXtyZXR1cm4gYnQuY29udGFpbnNQb2ludCh0LHRoaXMuYSx0aGlzLmIsdGhpcy5jKX1pc0Zyb250RmFjaW5nKHQpe3JldHVybiBidC5pc0Zyb250RmFjaW5nKHRoaXMuYSx0aGlzLmIsdGhpcy5jLHQpfWludGVyc2VjdHNCb3godCl7cmV0dXJuIHQuaW50ZXJzZWN0c1RyaWFuZ2xlKHRoaXMpfWNsb3Nlc3RQb2ludFRvUG9pbnQodCxlKXtjb25zdCBzPXRoaXMuYSxpPXRoaXMuYixuPXRoaXMuYztsZXQgcixvO2VlLnN1YlZlY3RvcnMoaSxzKSxzZS5zdWJWZWN0b3JzKG4scykscGkuc3ViVmVjdG9ycyh0LHMpO2NvbnN0IGE9ZWUuZG90KHBpKSxoPXNlLmRvdChwaSk7aWYoYTw9MCYmaDw9MClyZXR1cm4gZS5jb3B5KHMpO21pLnN1YlZlY3RvcnModCxpKTtjb25zdCBsPWVlLmRvdChtaSksdT1zZS5kb3QobWkpO2lmKGw+PTAmJnU8PWwpcmV0dXJuIGUuY29weShpKTtjb25zdCBkPWEqdS1sKmg7aWYoZDw9MCYmYT49MCYmbDw9MClyZXR1cm4gcj1hLyhhLWwpLGUuY29weShzKS5hZGRTY2FsZWRWZWN0b3IoZWUscik7eWkuc3ViVmVjdG9ycyh0LG4pO2NvbnN0IGY9ZWUuZG90KHlpKSxwPXNlLmRvdCh5aSk7aWYocD49MCYmZjw9cClyZXR1cm4gZS5jb3B5KG4pO2NvbnN0IG09ZipoLWEqcDtpZihtPD0wJiZoPj0wJiZwPD0wKXJldHVybiBvPWgvKGgtcCksZS5jb3B5KHMpLmFkZFNjYWxlZFZlY3RvcihzZSxvKTtjb25zdCBnPWwqcC1mKnU7aWYoZzw9MCYmdS1sPj0wJiZmLXA+PTApcmV0dXJuIEpuLnN1YlZlY3RvcnMobixpKSxvPSh1LWwpLyh1LWwrKGYtcCkpLGUuY29weShpKS5hZGRTY2FsZWRWZWN0b3IoSm4sbyk7Y29uc3QgeT0xLyhnK20rZCk7cmV0dXJuIHI9bSp5LG89ZCp5LGUuY29weShzKS5hZGRTY2FsZWRWZWN0b3IoZWUscikuYWRkU2NhbGVkVmVjdG9yKHNlLG8pfWVxdWFscyh0KXtyZXR1cm4gdC5hLmVxdWFscyh0aGlzLmEpJiZ0LmIuZXF1YWxzKHRoaXMuYikmJnQuYy5lcXVhbHModGhpcy5jKX19bGV0IE5hPTA7Y2xhc3MgaWUgZXh0ZW5kcyBHZXtjb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5pc01hdGVyaWFsPSEwLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCJpZCIse3ZhbHVlOk5hKyt9KSx0aGlzLnV1aWQ9aXQoKSx0aGlzLm5hbWU9IiIsdGhpcy50eXBlPSJNYXRlcmlhbCIsdGhpcy5ibGVuZGluZz1Mbix0aGlzLnNpZGU9R3MsdGhpcy52ZXJ0ZXhDb2xvcnM9ITEsdGhpcy5vcGFjaXR5PTEsdGhpcy50cmFuc3BhcmVudD0hMSx0aGlzLmJsZW5kU3JjPXFvLHRoaXMuYmxlbmREc3Q9Wm8sdGhpcy5ibGVuZEVxdWF0aW9uPUdvLHRoaXMuYmxlbmRTcmNBbHBoYT1udWxsLHRoaXMuYmxlbmREc3RBbHBoYT1udWxsLHRoaXMuYmxlbmRFcXVhdGlvbkFscGhhPW51bGwsdGhpcy5kZXB0aEZ1bmM9WG8sdGhpcy5kZXB0aFRlc3Q9ITAsdGhpcy5kZXB0aFdyaXRlPSEwLHRoaXMuc3RlbmNpbFdyaXRlTWFzaz0yNTUsdGhpcy5zdGVuY2lsRnVuYz1yYSx0aGlzLnN0ZW5jaWxSZWY9MCx0aGlzLnN0ZW5jaWxGdW5jTWFzaz0yNTUsdGhpcy5zdGVuY2lsRmFpbD1Lcyx0aGlzLnN0ZW5jaWxaRmFpbD1Lcyx0aGlzLnN0ZW5jaWxaUGFzcz1Lcyx0aGlzLnN0ZW5jaWxXcml0ZT0hMSx0aGlzLmNsaXBwaW5nUGxhbmVzPW51bGwsdGhpcy5jbGlwSW50ZXJzZWN0aW9uPSExLHRoaXMuY2xpcFNoYWRvd3M9ITEsdGhpcy5zaGFkb3dTaWRlPW51bGwsdGhpcy5jb2xvcldyaXRlPSEwLHRoaXMucHJlY2lzaW9uPW51bGwsdGhpcy5wb2x5Z29uT2Zmc2V0PSExLHRoaXMucG9seWdvbk9mZnNldEZhY3Rvcj0wLHRoaXMucG9seWdvbk9mZnNldFVuaXRzPTAsdGhpcy5kaXRoZXJpbmc9ITEsdGhpcy5hbHBoYVRvQ292ZXJhZ2U9ITEsdGhpcy5wcmVtdWx0aXBsaWVkQWxwaGE9ITEsdGhpcy52aXNpYmxlPSEwLHRoaXMudG9uZU1hcHBlZD0hMCx0aGlzLnVzZXJEYXRhPXt9LHRoaXMudmVyc2lvbj0wLHRoaXMuX2FscGhhVGVzdD0wfWdldCBhbHBoYVRlc3QoKXtyZXR1cm4gdGhpcy5fYWxwaGFUZXN0fXNldCBhbHBoYVRlc3QodCl7dGhpcy5fYWxwaGFUZXN0PjAhPXQ+MCYmdGhpcy52ZXJzaW9uKyssdGhpcy5fYWxwaGFUZXN0PXR9b25CdWlsZCgpe31vbkJlZm9yZVJlbmRlcigpe31vbkJlZm9yZUNvbXBpbGUoKXt9Y3VzdG9tUHJvZ3JhbUNhY2hlS2V5KCl7cmV0dXJuIHRoaXMub25CZWZvcmVDb21waWxlLnRvU3RyaW5nKCl9c2V0VmFsdWVzKHQpe2lmKHQhPT12b2lkIDApZm9yKGNvbnN0IGUgaW4gdCl7Y29uc3Qgcz10W2VdO2lmKHM9PT12b2lkIDApe2NvbnNvbGUud2FybigiVEhSRUUuTWF0ZXJpYWw6ICciK2UrIicgcGFyYW1ldGVyIGlzIHVuZGVmaW5lZC4iKTtjb250aW51ZX1pZihlPT09InNoYWRpbmciKXtjb25zb2xlLndhcm4oIlRIUkVFLiIrdGhpcy50eXBlKyI6IC5zaGFkaW5nIGhhcyBiZWVuIHJlbW92ZWQuIFVzZSB0aGUgYm9vbGVhbiAuZmxhdFNoYWRpbmcgaW5zdGVhZC4iKSx0aGlzLmZsYXRTaGFkaW5nPXM9PT1Xbztjb250aW51ZX1jb25zdCBpPXRoaXNbZV07aWYoaT09PXZvaWQgMCl7Y29uc29sZS53YXJuKCJUSFJFRS4iK3RoaXMudHlwZSsiOiAnIitlKyInIGlzIG5vdCBhIHByb3BlcnR5IG9mIHRoaXMgbWF0ZXJpYWwuIik7Y29udGludWV9aSYmaS5pc0NvbG9yP2kuc2V0KHMpOmkmJmkuaXNWZWN0b3IzJiZzJiZzLmlzVmVjdG9yMz9pLmNvcHkocyk6dGhpc1tlXT1zfX10b0pTT04odCl7Y29uc3QgZT10PT09dm9pZCAwfHx0eXBlb2YgdD09InN0cmluZyI7ZSYmKHQ9e3RleHR1cmVzOnt9LGltYWdlczp7fX0pO2NvbnN0IHM9e21ldGFkYXRhOnt2ZXJzaW9uOjQuNSx0eXBlOiJNYXRlcmlhbCIsZ2VuZXJhdG9yOiJNYXRlcmlhbC50b0pTT04ifX07cy51dWlkPXRoaXMudXVpZCxzLnR5cGU9dGhpcy50eXBlLHRoaXMubmFtZSE9PSIiJiYocy5uYW1lPXRoaXMubmFtZSksdGhpcy5jb2xvciYmdGhpcy5jb2xvci5pc0NvbG9yJiYocy5jb2xvcj10aGlzLmNvbG9yLmdldEhleCgpKSx0aGlzLnJvdWdobmVzcyE9PXZvaWQgMCYmKHMucm91Z2huZXNzPXRoaXMucm91Z2huZXNzKSx0aGlzLm1ldGFsbmVzcyE9PXZvaWQgMCYmKHMubWV0YWxuZXNzPXRoaXMubWV0YWxuZXNzKSx0aGlzLnNoZWVuIT09dm9pZCAwJiYocy5zaGVlbj10aGlzLnNoZWVuKSx0aGlzLnNoZWVuQ29sb3ImJnRoaXMuc2hlZW5Db2xvci5pc0NvbG9yJiYocy5zaGVlbkNvbG9yPXRoaXMuc2hlZW5Db2xvci5nZXRIZXgoKSksdGhpcy5zaGVlblJvdWdobmVzcyE9PXZvaWQgMCYmKHMuc2hlZW5Sb3VnaG5lc3M9dGhpcy5zaGVlblJvdWdobmVzcyksdGhpcy5lbWlzc2l2ZSYmdGhpcy5lbWlzc2l2ZS5pc0NvbG9yJiYocy5lbWlzc2l2ZT10aGlzLmVtaXNzaXZlLmdldEhleCgpKSx0aGlzLmVtaXNzaXZlSW50ZW5zaXR5JiZ0aGlzLmVtaXNzaXZlSW50ZW5zaXR5IT09MSYmKHMuZW1pc3NpdmVJbnRlbnNpdHk9dGhpcy5lbWlzc2l2ZUludGVuc2l0eSksdGhpcy5zcGVjdWxhciYmdGhpcy5zcGVjdWxhci5pc0NvbG9yJiYocy5zcGVjdWxhcj10aGlzLnNwZWN1bGFyLmdldEhleCgpKSx0aGlzLnNwZWN1bGFySW50ZW5zaXR5IT09dm9pZCAwJiYocy5zcGVjdWxhckludGVuc2l0eT10aGlzLnNwZWN1bGFySW50ZW5zaXR5KSx0aGlzLnNwZWN1bGFyQ29sb3ImJnRoaXMuc3BlY3VsYXJDb2xvci5pc0NvbG9yJiYocy5zcGVjdWxhckNvbG9yPXRoaXMuc3BlY3VsYXJDb2xvci5nZXRIZXgoKSksdGhpcy5zaGluaW5lc3MhPT12b2lkIDAmJihzLnNoaW5pbmVzcz10aGlzLnNoaW5pbmVzcyksdGhpcy5jbGVhcmNvYXQhPT12b2lkIDAmJihzLmNsZWFyY29hdD10aGlzLmNsZWFyY29hdCksdGhpcy5jbGVhcmNvYXRSb3VnaG5lc3MhPT12b2lkIDAmJihzLmNsZWFyY29hdFJvdWdobmVzcz10aGlzLmNsZWFyY29hdFJvdWdobmVzcyksdGhpcy5jbGVhcmNvYXRNYXAmJnRoaXMuY2xlYXJjb2F0TWFwLmlzVGV4dHVyZSYmKHMuY2xlYXJjb2F0TWFwPXRoaXMuY2xlYXJjb2F0TWFwLnRvSlNPTih0KS51dWlkKSx0aGlzLmNsZWFyY29hdFJvdWdobmVzc01hcCYmdGhpcy5jbGVhcmNvYXRSb3VnaG5lc3NNYXAuaXNUZXh0dXJlJiYocy5jbGVhcmNvYXRSb3VnaG5lc3NNYXA9dGhpcy5jbGVhcmNvYXRSb3VnaG5lc3NNYXAudG9KU09OKHQpLnV1aWQpLHRoaXMuY2xlYXJjb2F0Tm9ybWFsTWFwJiZ0aGlzLmNsZWFyY29hdE5vcm1hbE1hcC5pc1RleHR1cmUmJihzLmNsZWFyY29hdE5vcm1hbE1hcD10aGlzLmNsZWFyY29hdE5vcm1hbE1hcC50b0pTT04odCkudXVpZCxzLmNsZWFyY29hdE5vcm1hbFNjYWxlPXRoaXMuY2xlYXJjb2F0Tm9ybWFsU2NhbGUudG9BcnJheSgpKSx0aGlzLmlyaWRlc2NlbmNlIT09dm9pZCAwJiYocy5pcmlkZXNjZW5jZT10aGlzLmlyaWRlc2NlbmNlKSx0aGlzLmlyaWRlc2NlbmNlSU9SIT09dm9pZCAwJiYocy5pcmlkZXNjZW5jZUlPUj10aGlzLmlyaWRlc2NlbmNlSU9SKSx0aGlzLmlyaWRlc2NlbmNlVGhpY2tuZXNzUmFuZ2UhPT12b2lkIDAmJihzLmlyaWRlc2NlbmNlVGhpY2tuZXNzUmFuZ2U9dGhpcy5pcmlkZXNjZW5jZVRoaWNrbmVzc1JhbmdlKSx0aGlzLmlyaWRlc2NlbmNlTWFwJiZ0aGlzLmlyaWRlc2NlbmNlTWFwLmlzVGV4dHVyZSYmKHMuaXJpZGVzY2VuY2VNYXA9dGhpcy5pcmlkZXNjZW5jZU1hcC50b0pTT04odCkudXVpZCksdGhpcy5pcmlkZXNjZW5jZVRoaWNrbmVzc01hcCYmdGhpcy5pcmlkZXNjZW5jZVRoaWNrbmVzc01hcC5pc1RleHR1cmUmJihzLmlyaWRlc2NlbmNlVGhpY2tuZXNzTWFwPXRoaXMuaXJpZGVzY2VuY2VUaGlja25lc3NNYXAudG9KU09OKHQpLnV1aWQpLHRoaXMubWFwJiZ0aGlzLm1hcC5pc1RleHR1cmUmJihzLm1hcD10aGlzLm1hcC50b0pTT04odCkudXVpZCksdGhpcy5tYXRjYXAmJnRoaXMubWF0Y2FwLmlzVGV4dHVyZSYmKHMubWF0Y2FwPXRoaXMubWF0Y2FwLnRvSlNPTih0KS51dWlkKSx0aGlzLmFscGhhTWFwJiZ0aGlzLmFscGhhTWFwLmlzVGV4dHVyZSYmKHMuYWxwaGFNYXA9dGhpcy5hbHBoYU1hcC50b0pTT04odCkudXVpZCksdGhpcy5saWdodE1hcCYmdGhpcy5saWdodE1hcC5pc1RleHR1cmUmJihzLmxpZ2h0TWFwPXRoaXMubGlnaHRNYXAudG9KU09OKHQpLnV1aWQscy5saWdodE1hcEludGVuc2l0eT10aGlzLmxpZ2h0TWFwSW50ZW5zaXR5KSx0aGlzLmFvTWFwJiZ0aGlzLmFvTWFwLmlzVGV4dHVyZSYmKHMuYW9NYXA9dGhpcy5hb01hcC50b0pTT04odCkudXVpZCxzLmFvTWFwSW50ZW5zaXR5PXRoaXMuYW9NYXBJbnRlbnNpdHkpLHRoaXMuYnVtcE1hcCYmdGhpcy5idW1wTWFwLmlzVGV4dHVyZSYmKHMuYnVtcE1hcD10aGlzLmJ1bXBNYXAudG9KU09OKHQpLnV1aWQscy5idW1wU2NhbGU9dGhpcy5idW1wU2NhbGUpLHRoaXMubm9ybWFsTWFwJiZ0aGlzLm5vcm1hbE1hcC5pc1RleHR1cmUmJihzLm5vcm1hbE1hcD10aGlzLm5vcm1hbE1hcC50b0pTT04odCkudXVpZCxzLm5vcm1hbE1hcFR5cGU9dGhpcy5ub3JtYWxNYXBUeXBlLHMubm9ybWFsU2NhbGU9dGhpcy5ub3JtYWxTY2FsZS50b0FycmF5KCkpLHRoaXMuZGlzcGxhY2VtZW50TWFwJiZ0aGlzLmRpc3BsYWNlbWVudE1hcC5pc1RleHR1cmUmJihzLmRpc3BsYWNlbWVudE1hcD10aGlzLmRpc3BsYWNlbWVudE1hcC50b0pTT04odCkudXVpZCxzLmRpc3BsYWNlbWVudFNjYWxlPXRoaXMuZGlzcGxhY2VtZW50U2NhbGUscy5kaXNwbGFjZW1lbnRCaWFzPXRoaXMuZGlzcGxhY2VtZW50QmlhcyksdGhpcy5yb3VnaG5lc3NNYXAmJnRoaXMucm91Z2huZXNzTWFwLmlzVGV4dHVyZSYmKHMucm91Z2huZXNzTWFwPXRoaXMucm91Z2huZXNzTWFwLnRvSlNPTih0KS51dWlkKSx0aGlzLm1ldGFsbmVzc01hcCYmdGhpcy5tZXRhbG5lc3NNYXAuaXNUZXh0dXJlJiYocy5tZXRhbG5lc3NNYXA9dGhpcy5tZXRhbG5lc3NNYXAudG9KU09OKHQpLnV1aWQpLHRoaXMuZW1pc3NpdmVNYXAmJnRoaXMuZW1pc3NpdmVNYXAuaXNUZXh0dXJlJiYocy5lbWlzc2l2ZU1hcD10aGlzLmVtaXNzaXZlTWFwLnRvSlNPTih0KS51dWlkKSx0aGlzLnNwZWN1bGFyTWFwJiZ0aGlzLnNwZWN1bGFyTWFwLmlzVGV4dHVyZSYmKHMuc3BlY3VsYXJNYXA9dGhpcy5zcGVjdWxhck1hcC50b0pTT04odCkudXVpZCksdGhpcy5zcGVjdWxhckludGVuc2l0eU1hcCYmdGhpcy5zcGVjdWxhckludGVuc2l0eU1hcC5pc1RleHR1cmUmJihzLnNwZWN1bGFySW50ZW5zaXR5TWFwPXRoaXMuc3BlY3VsYXJJbnRlbnNpdHlNYXAudG9KU09OKHQpLnV1aWQpLHRoaXMuc3BlY3VsYXJDb2xvck1hcCYmdGhpcy5zcGVjdWxhckNvbG9yTWFwLmlzVGV4dHVyZSYmKHMuc3BlY3VsYXJDb2xvck1hcD10aGlzLnNwZWN1bGFyQ29sb3JNYXAudG9KU09OKHQpLnV1aWQpLHRoaXMuZW52TWFwJiZ0aGlzLmVudk1hcC5pc1RleHR1cmUmJihzLmVudk1hcD10aGlzLmVudk1hcC50b0pTT04odCkudXVpZCx0aGlzLmNvbWJpbmUhPT12b2lkIDAmJihzLmNvbWJpbmU9dGhpcy5jb21iaW5lKSksdGhpcy5lbnZNYXBJbnRlbnNpdHkhPT12b2lkIDAmJihzLmVudk1hcEludGVuc2l0eT10aGlzLmVudk1hcEludGVuc2l0eSksdGhpcy5yZWZsZWN0aXZpdHkhPT12b2lkIDAmJihzLnJlZmxlY3Rpdml0eT10aGlzLnJlZmxlY3Rpdml0eSksdGhpcy5yZWZyYWN0aW9uUmF0aW8hPT12b2lkIDAmJihzLnJlZnJhY3Rpb25SYXRpbz10aGlzLnJlZnJhY3Rpb25SYXRpbyksdGhpcy5ncmFkaWVudE1hcCYmdGhpcy5ncmFkaWVudE1hcC5pc1RleHR1cmUmJihzLmdyYWRpZW50TWFwPXRoaXMuZ3JhZGllbnRNYXAudG9KU09OKHQpLnV1aWQpLHRoaXMudHJhbnNtaXNzaW9uIT09dm9pZCAwJiYocy50cmFuc21pc3Npb249dGhpcy50cmFuc21pc3Npb24pLHRoaXMudHJhbnNtaXNzaW9uTWFwJiZ0aGlzLnRyYW5zbWlzc2lvbk1hcC5pc1RleHR1cmUmJihzLnRyYW5zbWlzc2lvbk1hcD10aGlzLnRyYW5zbWlzc2lvbk1hcC50b0pTT04odCkudXVpZCksdGhpcy50aGlja25lc3MhPT12b2lkIDAmJihzLnRoaWNrbmVzcz10aGlzLnRoaWNrbmVzcyksdGhpcy50aGlja25lc3NNYXAmJnRoaXMudGhpY2tuZXNzTWFwLmlzVGV4dHVyZSYmKHMudGhpY2tuZXNzTWFwPXRoaXMudGhpY2tuZXNzTWFwLnRvSlNPTih0KS51dWlkKSx0aGlzLmF0dGVudWF0aW9uRGlzdGFuY2UhPT12b2lkIDAmJihzLmF0dGVudWF0aW9uRGlzdGFuY2U9dGhpcy5hdHRlbnVhdGlvbkRpc3RhbmNlKSx0aGlzLmF0dGVudWF0aW9uQ29sb3IhPT12b2lkIDAmJihzLmF0dGVudWF0aW9uQ29sb3I9dGhpcy5hdHRlbnVhdGlvbkNvbG9yLmdldEhleCgpKSx0aGlzLnNpemUhPT12b2lkIDAmJihzLnNpemU9dGhpcy5zaXplKSx0aGlzLnNoYWRvd1NpZGUhPT1udWxsJiYocy5zaGFkb3dTaWRlPXRoaXMuc2hhZG93U2lkZSksdGhpcy5zaXplQXR0ZW51YXRpb24hPT12b2lkIDAmJihzLnNpemVBdHRlbnVhdGlvbj10aGlzLnNpemVBdHRlbnVhdGlvbiksdGhpcy5ibGVuZGluZyE9PUxuJiYocy5ibGVuZGluZz10aGlzLmJsZW5kaW5nKSx0aGlzLnNpZGUhPT1HcyYmKHMuc2lkZT10aGlzLnNpZGUpLHRoaXMudmVydGV4Q29sb3JzJiYocy52ZXJ0ZXhDb2xvcnM9ITApLHRoaXMub3BhY2l0eTwxJiYocy5vcGFjaXR5PXRoaXMub3BhY2l0eSksdGhpcy50cmFuc3BhcmVudD09PSEwJiYocy50cmFuc3BhcmVudD10aGlzLnRyYW5zcGFyZW50KSxzLmRlcHRoRnVuYz10aGlzLmRlcHRoRnVuYyxzLmRlcHRoVGVzdD10aGlzLmRlcHRoVGVzdCxzLmRlcHRoV3JpdGU9dGhpcy5kZXB0aFdyaXRlLHMuY29sb3JXcml0ZT10aGlzLmNvbG9yV3JpdGUscy5zdGVuY2lsV3JpdGU9dGhpcy5zdGVuY2lsV3JpdGUscy5zdGVuY2lsV3JpdGVNYXNrPXRoaXMuc3RlbmNpbFdyaXRlTWFzayxzLnN0ZW5jaWxGdW5jPXRoaXMuc3RlbmNpbEZ1bmMscy5zdGVuY2lsUmVmPXRoaXMuc3RlbmNpbFJlZixzLnN0ZW5jaWxGdW5jTWFzaz10aGlzLnN0ZW5jaWxGdW5jTWFzayxzLnN0ZW5jaWxGYWlsPXRoaXMuc3RlbmNpbEZhaWwscy5zdGVuY2lsWkZhaWw9dGhpcy5zdGVuY2lsWkZhaWwscy5zdGVuY2lsWlBhc3M9dGhpcy5zdGVuY2lsWlBhc3MsdGhpcy5yb3RhdGlvbiE9PXZvaWQgMCYmdGhpcy5yb3RhdGlvbiE9PTAmJihzLnJvdGF0aW9uPXRoaXMucm90YXRpb24pLHRoaXMucG9seWdvbk9mZnNldD09PSEwJiYocy5wb2x5Z29uT2Zmc2V0PSEwKSx0aGlzLnBvbHlnb25PZmZzZXRGYWN0b3IhPT0wJiYocy5wb2x5Z29uT2Zmc2V0RmFjdG9yPXRoaXMucG9seWdvbk9mZnNldEZhY3RvciksdGhpcy5wb2x5Z29uT2Zmc2V0VW5pdHMhPT0wJiYocy5wb2x5Z29uT2Zmc2V0VW5pdHM9dGhpcy5wb2x5Z29uT2Zmc2V0VW5pdHMpLHRoaXMubGluZXdpZHRoIT09dm9pZCAwJiZ0aGlzLmxpbmV3aWR0aCE9PTEmJihzLmxpbmV3aWR0aD10aGlzLmxpbmV3aWR0aCksdGhpcy5kYXNoU2l6ZSE9PXZvaWQgMCYmKHMuZGFzaFNpemU9dGhpcy5kYXNoU2l6ZSksdGhpcy5nYXBTaXplIT09dm9pZCAwJiYocy5nYXBTaXplPXRoaXMuZ2FwU2l6ZSksdGhpcy5zY2FsZSE9PXZvaWQgMCYmKHMuc2NhbGU9dGhpcy5zY2FsZSksdGhpcy5kaXRoZXJpbmc9PT0hMCYmKHMuZGl0aGVyaW5nPSEwKSx0aGlzLmFscGhhVGVzdD4wJiYocy5hbHBoYVRlc3Q9dGhpcy5hbHBoYVRlc3QpLHRoaXMuYWxwaGFUb0NvdmVyYWdlPT09ITAmJihzLmFscGhhVG9Db3ZlcmFnZT10aGlzLmFscGhhVG9Db3ZlcmFnZSksdGhpcy5wcmVtdWx0aXBsaWVkQWxwaGE9PT0hMCYmKHMucHJlbXVsdGlwbGllZEFscGhhPXRoaXMucHJlbXVsdGlwbGllZEFscGhhKSx0aGlzLndpcmVmcmFtZT09PSEwJiYocy53aXJlZnJhbWU9dGhpcy53aXJlZnJhbWUpLHRoaXMud2lyZWZyYW1lTGluZXdpZHRoPjEmJihzLndpcmVmcmFtZUxpbmV3aWR0aD10aGlzLndpcmVmcmFtZUxpbmV3aWR0aCksdGhpcy53aXJlZnJhbWVMaW5lY2FwIT09InJvdW5kIiYmKHMud2lyZWZyYW1lTGluZWNhcD10aGlzLndpcmVmcmFtZUxpbmVjYXApLHRoaXMud2lyZWZyYW1lTGluZWpvaW4hPT0icm91bmQiJiYocy53aXJlZnJhbWVMaW5lam9pbj10aGlzLndpcmVmcmFtZUxpbmVqb2luKSx0aGlzLmZsYXRTaGFkaW5nPT09ITAmJihzLmZsYXRTaGFkaW5nPXRoaXMuZmxhdFNoYWRpbmcpLHRoaXMudmlzaWJsZT09PSExJiYocy52aXNpYmxlPSExKSx0aGlzLnRvbmVNYXBwZWQ9PT0hMSYmKHMudG9uZU1hcHBlZD0hMSksdGhpcy5mb2c9PT0hMSYmKHMuZm9nPSExKSxKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJEYXRhKSE9PSJ7fSImJihzLnVzZXJEYXRhPXRoaXMudXNlckRhdGEpO2Z1bmN0aW9uIGkobil7Y29uc3Qgcj1bXTtmb3IoY29uc3QgbyBpbiBuKXtjb25zdCBhPW5bb107ZGVsZXRlIGEubWV0YWRhdGEsci5wdXNoKGEpfXJldHVybiByfWlmKGUpe2NvbnN0IG49aSh0LnRleHR1cmVzKSxyPWkodC5pbWFnZXMpO24ubGVuZ3RoPjAmJihzLnRleHR1cmVzPW4pLHIubGVuZ3RoPjAmJihzLmltYWdlcz1yKX1yZXR1cm4gc31jbG9uZSgpe3JldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcigpLmNvcHkodGhpcyl9Y29weSh0KXt0aGlzLm5hbWU9dC5uYW1lLHRoaXMuYmxlbmRpbmc9dC5ibGVuZGluZyx0aGlzLnNpZGU9dC5zaWRlLHRoaXMudmVydGV4Q29sb3JzPXQudmVydGV4Q29sb3JzLHRoaXMub3BhY2l0eT10Lm9wYWNpdHksdGhpcy50cmFuc3BhcmVudD10LnRyYW5zcGFyZW50LHRoaXMuYmxlbmRTcmM9dC5ibGVuZFNyYyx0aGlzLmJsZW5kRHN0PXQuYmxlbmREc3QsdGhpcy5ibGVuZEVxdWF0aW9uPXQuYmxlbmRFcXVhdGlvbix0aGlzLmJsZW5kU3JjQWxwaGE9dC5ibGVuZFNyY0FscGhhLHRoaXMuYmxlbmREc3RBbHBoYT10LmJsZW5kRHN0QWxwaGEsdGhpcy5ibGVuZEVxdWF0aW9uQWxwaGE9dC5ibGVuZEVxdWF0aW9uQWxwaGEsdGhpcy5kZXB0aEZ1bmM9dC5kZXB0aEZ1bmMsdGhpcy5kZXB0aFRlc3Q9dC5kZXB0aFRlc3QsdGhpcy5kZXB0aFdyaXRlPXQuZGVwdGhXcml0ZSx0aGlzLnN0ZW5jaWxXcml0ZU1hc2s9dC5zdGVuY2lsV3JpdGVNYXNrLHRoaXMuc3RlbmNpbEZ1bmM9dC5zdGVuY2lsRnVuYyx0aGlzLnN0ZW5jaWxSZWY9dC5zdGVuY2lsUmVmLHRoaXMuc3RlbmNpbEZ1bmNNYXNrPXQuc3RlbmNpbEZ1bmNNYXNrLHRoaXMuc3RlbmNpbEZhaWw9dC5zdGVuY2lsRmFpbCx0aGlzLnN0ZW5jaWxaRmFpbD10LnN0ZW5jaWxaRmFpbCx0aGlzLnN0ZW5jaWxaUGFzcz10LnN0ZW5jaWxaUGFzcyx0aGlzLnN0ZW5jaWxXcml0ZT10LnN0ZW5jaWxXcml0ZTtjb25zdCBlPXQuY2xpcHBpbmdQbGFuZXM7bGV0IHM9bnVsbDtpZihlIT09bnVsbCl7Y29uc3QgaT1lLmxlbmd0aDtzPW5ldyBBcnJheShpKTtmb3IobGV0IG49MDtuIT09aTsrK24pc1tuXT1lW25dLmNsb25lKCl9cmV0dXJuIHRoaXMuY2xpcHBpbmdQbGFuZXM9cyx0aGlzLmNsaXBJbnRlcnNlY3Rpb249dC5jbGlwSW50ZXJzZWN0aW9uLHRoaXMuY2xpcFNoYWRvd3M9dC5jbGlwU2hhZG93cyx0aGlzLnNoYWRvd1NpZGU9dC5zaGFkb3dTaWRlLHRoaXMuY29sb3JXcml0ZT10LmNvbG9yV3JpdGUsdGhpcy5wcmVjaXNpb249dC5wcmVjaXNpb24sdGhpcy5wb2x5Z29uT2Zmc2V0PXQucG9seWdvbk9mZnNldCx0aGlzLnBvbHlnb25PZmZzZXRGYWN0b3I9dC5wb2x5Z29uT2Zmc2V0RmFjdG9yLHRoaXMucG9seWdvbk9mZnNldFVuaXRzPXQucG9seWdvbk9mZnNldFVuaXRzLHRoaXMuZGl0aGVyaW5nPXQuZGl0aGVyaW5nLHRoaXMuYWxwaGFUZXN0PXQuYWxwaGFUZXN0LHRoaXMuYWxwaGFUb0NvdmVyYWdlPXQuYWxwaGFUb0NvdmVyYWdlLHRoaXMucHJlbXVsdGlwbGllZEFscGhhPXQucHJlbXVsdGlwbGllZEFscGhhLHRoaXMudmlzaWJsZT10LnZpc2libGUsdGhpcy50b25lTWFwcGVkPXQudG9uZU1hcHBlZCx0aGlzLnVzZXJEYXRhPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodC51c2VyRGF0YSkpLHRoaXN9ZGlzcG9zZSgpe3RoaXMuZGlzcGF0Y2hFdmVudCh7dHlwZToiZGlzcG9zZSJ9KX1zZXQgbmVlZHNVcGRhdGUodCl7dD09PSEwJiZ0aGlzLnZlcnNpb24rK319Y2xhc3MgbmUgZXh0ZW5kcyBpZXtjb25zdHJ1Y3Rvcih0KXtzdXBlcigpLHRoaXMuaXNNZXNoQmFzaWNNYXRlcmlhbD0hMCx0aGlzLnR5cGU9Ik1lc2hCYXNpY01hdGVyaWFsIix0aGlzLmNvbG9yPW5ldyBQKDE2Nzc3MjE1KSx0aGlzLm1hcD1udWxsLHRoaXMubGlnaHRNYXA9bnVsbCx0aGlzLmxpZ2h0TWFwSW50ZW5zaXR5PTEsdGhpcy5hb01hcD1udWxsLHRoaXMuYW9NYXBJbnRlbnNpdHk9MSx0aGlzLnNwZWN1bGFyTWFwPW51bGwsdGhpcy5hbHBoYU1hcD1udWxsLHRoaXMuZW52TWFwPW51bGwsdGhpcy5jb21iaW5lPVlvLHRoaXMucmVmbGVjdGl2aXR5PTEsdGhpcy5yZWZyYWN0aW9uUmF0aW89Ljk4LHRoaXMud2lyZWZyYW1lPSExLHRoaXMud2lyZWZyYW1lTGluZXdpZHRoPTEsdGhpcy53aXJlZnJhbWVMaW5lY2FwPSJyb3VuZCIsdGhpcy53aXJlZnJhbWVMaW5lam9pbj0icm91bmQiLHRoaXMuZm9nPSEwLHRoaXMuc2V0VmFsdWVzKHQpfWNvcHkodCl7cmV0dXJuIHN1cGVyLmNvcHkodCksdGhpcy5jb2xvci5jb3B5KHQuY29sb3IpLHRoaXMubWFwPXQubWFwLHRoaXMubGlnaHRNYXA9dC5saWdodE1hcCx0aGlzLmxpZ2h0TWFwSW50ZW5zaXR5PXQubGlnaHRNYXBJbnRlbnNpdHksdGhpcy5hb01hcD10LmFvTWFwLHRoaXMuYW9NYXBJbnRlbnNpdHk9dC5hb01hcEludGVuc2l0eSx0aGlzLnNwZWN1bGFyTWFwPXQuc3BlY3VsYXJNYXAsdGhpcy5hbHBoYU1hcD10LmFscGhhTWFwLHRoaXMuZW52TWFwPXQuZW52TWFwLHRoaXMuY29tYmluZT10LmNvbWJpbmUsdGhpcy5yZWZsZWN0aXZpdHk9dC5yZWZsZWN0aXZpdHksdGhpcy5yZWZyYWN0aW9uUmF0aW89dC5yZWZyYWN0aW9uUmF0aW8sdGhpcy53aXJlZnJhbWU9dC53aXJlZnJhbWUsdGhpcy53aXJlZnJhbWVMaW5ld2lkdGg9dC53aXJlZnJhbWVMaW5ld2lkdGgsdGhpcy53aXJlZnJhbWVMaW5lY2FwPXQud2lyZWZyYW1lTGluZWNhcCx0aGlzLndpcmVmcmFtZUxpbmVqb2luPXQud2lyZWZyYW1lTGluZWpvaW4sdGhpcy5mb2c9dC5mb2csdGhpc319Y29uc3QgVT1uZXcgeCxzcz1uZXcgTztjbGFzcyB3dHtjb25zdHJ1Y3Rvcih0LGUscyl7aWYoQXJyYXkuaXNBcnJheSh0KSl0aHJvdyBuZXcgVHlwZUVycm9yKCJUSFJFRS5CdWZmZXJBdHRyaWJ1dGU6IGFycmF5IHNob3VsZCBiZSBhIFR5cGVkIEFycmF5LiIpO3RoaXMuaXNCdWZmZXJBdHRyaWJ1dGU9ITAsdGhpcy5uYW1lPSIiLHRoaXMuYXJyYXk9dCx0aGlzLml0ZW1TaXplPWUsdGhpcy5jb3VudD10IT09dm9pZCAwP3QubGVuZ3RoL2U6MCx0aGlzLm5vcm1hbGl6ZWQ9cz09PSEwLHRoaXMudXNhZ2U9UXMsdGhpcy51cGRhdGVSYW5nZT17b2Zmc2V0OjAsY291bnQ6LTF9LHRoaXMudmVyc2lvbj0wfW9uVXBsb2FkQ2FsbGJhY2soKXt9c2V0IG5lZWRzVXBkYXRlKHQpe3Q9PT0hMCYmdGhpcy52ZXJzaW9uKyt9c2V0VXNhZ2UodCl7cmV0dXJuIHRoaXMudXNhZ2U9dCx0aGlzfWNvcHkodCl7cmV0dXJuIHRoaXMubmFtZT10Lm5hbWUsdGhpcy5hcnJheT1uZXcgdC5hcnJheS5jb25zdHJ1Y3Rvcih0LmFycmF5KSx0aGlzLml0ZW1TaXplPXQuaXRlbVNpemUsdGhpcy5jb3VudD10LmNvdW50LHRoaXMubm9ybWFsaXplZD10Lm5vcm1hbGl6ZWQsdGhpcy51c2FnZT10LnVzYWdlLHRoaXN9Y29weUF0KHQsZSxzKXt0Kj10aGlzLml0ZW1TaXplLHMqPWUuaXRlbVNpemU7Zm9yKGxldCBpPTAsbj10aGlzLml0ZW1TaXplO2k8bjtpKyspdGhpcy5hcnJheVt0K2ldPWUuYXJyYXlbcytpXTtyZXR1cm4gdGhpc31jb3B5QXJyYXkodCl7cmV0dXJuIHRoaXMuYXJyYXkuc2V0KHQpLHRoaXN9Y29weUNvbG9yc0FycmF5KHQpe2NvbnN0IGU9dGhpcy5hcnJheTtsZXQgcz0wO2ZvcihsZXQgaT0wLG49dC5sZW5ndGg7aTxuO2krKyl7bGV0IHI9dFtpXTtyPT09dm9pZCAwJiYoY29uc29sZS53YXJuKCJUSFJFRS5CdWZmZXJBdHRyaWJ1dGUuY29weUNvbG9yc0FycmF5KCk6IGNvbG9yIGlzIHVuZGVmaW5lZCIsaSkscj1uZXcgUCksZVtzKytdPXIucixlW3MrK109ci5nLGVbcysrXT1yLmJ9cmV0dXJuIHRoaXN9Y29weVZlY3RvcjJzQXJyYXkodCl7Y29uc3QgZT10aGlzLmFycmF5O2xldCBzPTA7Zm9yKGxldCBpPTAsbj10Lmxlbmd0aDtpPG47aSsrKXtsZXQgcj10W2ldO3I9PT12b2lkIDAmJihjb25zb2xlLndhcm4oIlRIUkVFLkJ1ZmZlckF0dHJpYnV0ZS5jb3B5VmVjdG9yMnNBcnJheSgpOiB2ZWN0b3IgaXMgdW5kZWZpbmVkIixpKSxyPW5ldyBPKSxlW3MrK109ci54LGVbcysrXT1yLnl9cmV0dXJuIHRoaXN9Y29weVZlY3RvcjNzQXJyYXkodCl7Y29uc3QgZT10aGlzLmFycmF5O2xldCBzPTA7Zm9yKGxldCBpPTAsbj10Lmxlbmd0aDtpPG47aSsrKXtsZXQgcj10W2ldO3I9PT12b2lkIDAmJihjb25zb2xlLndhcm4oIlRIUkVFLkJ1ZmZlckF0dHJpYnV0ZS5jb3B5VmVjdG9yM3NBcnJheSgpOiB2ZWN0b3IgaXMgdW5kZWZpbmVkIixpKSxyPW5ldyB4KSxlW3MrK109ci54LGVbcysrXT1yLnksZVtzKytdPXIuen1yZXR1cm4gdGhpc31jb3B5VmVjdG9yNHNBcnJheSh0KXtjb25zdCBlPXRoaXMuYXJyYXk7bGV0IHM9MDtmb3IobGV0IGk9MCxuPXQubGVuZ3RoO2k8bjtpKyspe2xldCByPXRbaV07cj09PXZvaWQgMCYmKGNvbnNvbGUud2FybigiVEhSRUUuQnVmZmVyQXR0cmlidXRlLmNvcHlWZWN0b3I0c0FycmF5KCk6IHZlY3RvciBpcyB1bmRlZmluZWQiLGkpLHI9bmV3IEspLGVbcysrXT1yLngsZVtzKytdPXIueSxlW3MrK109ci56LGVbcysrXT1yLnd9cmV0dXJuIHRoaXN9YXBwbHlNYXRyaXgzKHQpe2lmKHRoaXMuaXRlbVNpemU9PT0yKWZvcihsZXQgZT0wLHM9dGhpcy5jb3VudDtlPHM7ZSsrKXNzLmZyb21CdWZmZXJBdHRyaWJ1dGUodGhpcyxlKSxzcy5hcHBseU1hdHJpeDModCksdGhpcy5zZXRYWShlLHNzLngsc3MueSk7ZWxzZSBpZih0aGlzLml0ZW1TaXplPT09Mylmb3IobGV0IGU9MCxzPXRoaXMuY291bnQ7ZTxzO2UrKylVLmZyb21CdWZmZXJBdHRyaWJ1dGUodGhpcyxlKSxVLmFwcGx5TWF0cml4Myh0KSx0aGlzLnNldFhZWihlLFUueCxVLnksVS56KTtyZXR1cm4gdGhpc31hcHBseU1hdHJpeDQodCl7Zm9yKGxldCBlPTAscz10aGlzLmNvdW50O2U8cztlKyspVS5mcm9tQnVmZmVyQXR0cmlidXRlKHRoaXMsZSksVS5hcHBseU1hdHJpeDQodCksdGhpcy5zZXRYWVooZSxVLngsVS55LFUueik7cmV0dXJuIHRoaXN9YXBwbHlOb3JtYWxNYXRyaXgodCl7Zm9yKGxldCBlPTAscz10aGlzLmNvdW50O2U8cztlKyspVS5mcm9tQnVmZmVyQXR0cmlidXRlKHRoaXMsZSksVS5hcHBseU5vcm1hbE1hdHJpeCh0KSx0aGlzLnNldFhZWihlLFUueCxVLnksVS56KTtyZXR1cm4gdGhpc310cmFuc2Zvcm1EaXJlY3Rpb24odCl7Zm9yKGxldCBlPTAscz10aGlzLmNvdW50O2U8cztlKyspVS5mcm9tQnVmZmVyQXR0cmlidXRlKHRoaXMsZSksVS50cmFuc2Zvcm1EaXJlY3Rpb24odCksdGhpcy5zZXRYWVooZSxVLngsVS55LFUueik7cmV0dXJuIHRoaXN9c2V0KHQsZT0wKXtyZXR1cm4gdGhpcy5hcnJheS5zZXQodCxlKSx0aGlzfWdldFgodCl7cmV0dXJuIHRoaXMuYXJyYXlbdCp0aGlzLml0ZW1TaXplXX1zZXRYKHQsZSl7cmV0dXJuIHRoaXMuYXJyYXlbdCp0aGlzLml0ZW1TaXplXT1lLHRoaXN9Z2V0WSh0KXtyZXR1cm4gdGhpcy5hcnJheVt0KnRoaXMuaXRlbVNpemUrMV19c2V0WSh0LGUpe3JldHVybiB0aGlzLmFycmF5W3QqdGhpcy5pdGVtU2l6ZSsxXT1lLHRoaXN9Z2V0Wih0KXtyZXR1cm4gdGhpcy5hcnJheVt0KnRoaXMuaXRlbVNpemUrMl19c2V0Wih0LGUpe3JldHVybiB0aGlzLmFycmF5W3QqdGhpcy5pdGVtU2l6ZSsyXT1lLHRoaXN9Z2V0Vyh0KXtyZXR1cm4gdGhpcy5hcnJheVt0KnRoaXMuaXRlbVNpemUrM119c2V0Vyh0LGUpe3JldHVybiB0aGlzLmFycmF5W3QqdGhpcy5pdGVtU2l6ZSszXT1lLHRoaXN9c2V0WFkodCxlLHMpe3JldHVybiB0Kj10aGlzLml0ZW1TaXplLHRoaXMuYXJyYXlbdCswXT1lLHRoaXMuYXJyYXlbdCsxXT1zLHRoaXN9c2V0WFlaKHQsZSxzLGkpe3JldHVybiB0Kj10aGlzLml0ZW1TaXplLHRoaXMuYXJyYXlbdCswXT1lLHRoaXMuYXJyYXlbdCsxXT1zLHRoaXMuYXJyYXlbdCsyXT1pLHRoaXN9c2V0WFlaVyh0LGUscyxpLG4pe3JldHVybiB0Kj10aGlzLml0ZW1TaXplLHRoaXMuYXJyYXlbdCswXT1lLHRoaXMuYXJyYXlbdCsxXT1zLHRoaXMuYXJyYXlbdCsyXT1pLHRoaXMuYXJyYXlbdCszXT1uLHRoaXN9b25VcGxvYWQodCl7cmV0dXJuIHRoaXMub25VcGxvYWRDYWxsYmFjaz10LHRoaXN9Y2xvbmUoKXtyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5hcnJheSx0aGlzLml0ZW1TaXplKS5jb3B5KHRoaXMpfXRvSlNPTigpe2NvbnN0IHQ9e2l0ZW1TaXplOnRoaXMuaXRlbVNpemUsdHlwZTp0aGlzLmFycmF5LmNvbnN0cnVjdG9yLm5hbWUsYXJyYXk6QXJyYXkuZnJvbSh0aGlzLmFycmF5KSxub3JtYWxpemVkOnRoaXMubm9ybWFsaXplZH07cmV0dXJuIHRoaXMubmFtZSE9PSIiJiYodC5uYW1lPXRoaXMubmFtZSksdGhpcy51c2FnZSE9PVFzJiYodC51c2FnZT10aGlzLnVzYWdlKSwodGhpcy51cGRhdGVSYW5nZS5vZmZzZXQhPT0wfHx0aGlzLnVwZGF0ZVJhbmdlLmNvdW50IT09LTEpJiYodC51cGRhdGVSYW5nZT10aGlzLnVwZGF0ZVJhbmdlKSx0fX1jbGFzcyBEYSBleHRlbmRzIHd0e2NvbnN0cnVjdG9yKHQsZSxzKXtzdXBlcihuZXcgVWludDE2QXJyYXkodCksZSxzKX19Y2xhc3MgT2EgZXh0ZW5kcyB3dHtjb25zdHJ1Y3Rvcih0LGUscyl7c3VwZXIobmV3IFVpbnQzMkFycmF5KHQpLGUscyl9fWNsYXNzIGdpIGV4dGVuZHMgd3R7Y29uc3RydWN0b3IodCxlLHMpe3N1cGVyKG5ldyBGbG9hdDMyQXJyYXkodCksZSxzKX19bGV0IFBhPTA7Y29uc3QgZXQ9bmV3IEIseGk9bmV3IGoscmU9bmV3IHgsdHQ9bmV3IG90LHZlPW5ldyBvdCxXPW5ldyB4O2NsYXNzIG9lIGV4dGVuZHMgR2V7Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuaXNCdWZmZXJHZW9tZXRyeT0hMCxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywiaWQiLHt2YWx1ZTpQYSsrfSksdGhpcy51dWlkPWl0KCksdGhpcy5uYW1lPSIiLHRoaXMudHlwZT0iQnVmZmVyR2VvbWV0cnkiLHRoaXMuaW5kZXg9bnVsbCx0aGlzLmF0dHJpYnV0ZXM9e30sdGhpcy5tb3JwaEF0dHJpYnV0ZXM9e30sdGhpcy5tb3JwaFRhcmdldHNSZWxhdGl2ZT0hMSx0aGlzLmdyb3Vwcz1bXSx0aGlzLmJvdW5kaW5nQm94PW51bGwsdGhpcy5ib3VuZGluZ1NwaGVyZT1udWxsLHRoaXMuZHJhd1JhbmdlPXtzdGFydDowLGNvdW50OjEvMH0sdGhpcy51c2VyRGF0YT17fX1nZXRJbmRleCgpe3JldHVybiB0aGlzLmluZGV4fXNldEluZGV4KHQpe3JldHVybiBBcnJheS5pc0FycmF5KHQpP3RoaXMuaW5kZXg9bmV3KEFhKHQpP09hOkRhKSh0LDEpOnRoaXMuaW5kZXg9dCx0aGlzfWdldEF0dHJpYnV0ZSh0KXtyZXR1cm4gdGhpcy5hdHRyaWJ1dGVzW3RdfXNldEF0dHJpYnV0ZSh0LGUpe3JldHVybiB0aGlzLmF0dHJpYnV0ZXNbdF09ZSx0aGlzfWRlbGV0ZUF0dHJpYnV0ZSh0KXtyZXR1cm4gZGVsZXRlIHRoaXMuYXR0cmlidXRlc1t0XSx0aGlzfWhhc0F0dHJpYnV0ZSh0KXtyZXR1cm4gdGhpcy5hdHRyaWJ1dGVzW3RdIT09dm9pZCAwfWFkZEdyb3VwKHQsZSxzPTApe3RoaXMuZ3JvdXBzLnB1c2goe3N0YXJ0OnQsY291bnQ6ZSxtYXRlcmlhbEluZGV4OnN9KX1jbGVhckdyb3Vwcygpe3RoaXMuZ3JvdXBzPVtdfXNldERyYXdSYW5nZSh0LGUpe3RoaXMuZHJhd1JhbmdlLnN0YXJ0PXQsdGhpcy5kcmF3UmFuZ2UuY291bnQ9ZX1hcHBseU1hdHJpeDQodCl7Y29uc3QgZT10aGlzLmF0dHJpYnV0ZXMucG9zaXRpb247ZSE9PXZvaWQgMCYmKGUuYXBwbHlNYXRyaXg0KHQpLGUubmVlZHNVcGRhdGU9ITApO2NvbnN0IHM9dGhpcy5hdHRyaWJ1dGVzLm5vcm1hbDtpZihzIT09dm9pZCAwKXtjb25zdCBuPW5ldyBYdCgpLmdldE5vcm1hbE1hdHJpeCh0KTtzLmFwcGx5Tm9ybWFsTWF0cml4KG4pLHMubmVlZHNVcGRhdGU9ITB9Y29uc3QgaT10aGlzLmF0dHJpYnV0ZXMudGFuZ2VudDtyZXR1cm4gaSE9PXZvaWQgMCYmKGkudHJhbnNmb3JtRGlyZWN0aW9uKHQpLGkubmVlZHNVcGRhdGU9ITApLHRoaXMuYm91bmRpbmdCb3ghPT1udWxsJiZ0aGlzLmNvbXB1dGVCb3VuZGluZ0JveCgpLHRoaXMuYm91bmRpbmdTcGhlcmUhPT1udWxsJiZ0aGlzLmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpLHRoaXN9YXBwbHlRdWF0ZXJuaW9uKHQpe3JldHVybiBldC5tYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbih0KSx0aGlzLmFwcGx5TWF0cml4NChldCksdGhpc31yb3RhdGVYKHQpe3JldHVybiBldC5tYWtlUm90YXRpb25YKHQpLHRoaXMuYXBwbHlNYXRyaXg0KGV0KSx0aGlzfXJvdGF0ZVkodCl7cmV0dXJuIGV0Lm1ha2VSb3RhdGlvblkodCksdGhpcy5hcHBseU1hdHJpeDQoZXQpLHRoaXN9cm90YXRlWih0KXtyZXR1cm4gZXQubWFrZVJvdGF0aW9uWih0KSx0aGlzLmFwcGx5TWF0cml4NChldCksdGhpc310cmFuc2xhdGUodCxlLHMpe3JldHVybiBldC5tYWtlVHJhbnNsYXRpb24odCxlLHMpLHRoaXMuYXBwbHlNYXRyaXg0KGV0KSx0aGlzfXNjYWxlKHQsZSxzKXtyZXR1cm4gZXQubWFrZVNjYWxlKHQsZSxzKSx0aGlzLmFwcGx5TWF0cml4NChldCksdGhpc31sb29rQXQodCl7cmV0dXJuIHhpLmxvb2tBdCh0KSx4aS51cGRhdGVNYXRyaXgoKSx0aGlzLmFwcGx5TWF0cml4NCh4aS5tYXRyaXgpLHRoaXN9Y2VudGVyKCl7cmV0dXJuIHRoaXMuY29tcHV0ZUJvdW5kaW5nQm94KCksdGhpcy5ib3VuZGluZ0JveC5nZXRDZW50ZXIocmUpLm5lZ2F0ZSgpLHRoaXMudHJhbnNsYXRlKHJlLngscmUueSxyZS56KSx0aGlzfXNldEZyb21Qb2ludHModCl7Y29uc3QgZT1bXTtmb3IobGV0IHM9MCxpPXQubGVuZ3RoO3M8aTtzKyspe2NvbnN0IG49dFtzXTtlLnB1c2gobi54LG4ueSxuLnp8fDApfXJldHVybiB0aGlzLnNldEF0dHJpYnV0ZSgicG9zaXRpb24iLG5ldyBnaShlLDMpKSx0aGlzfWNvbXB1dGVCb3VuZGluZ0JveCgpe3RoaXMuYm91bmRpbmdCb3g9PT1udWxsJiYodGhpcy5ib3VuZGluZ0JveD1uZXcgb3QpO2NvbnN0IHQ9dGhpcy5hdHRyaWJ1dGVzLnBvc2l0aW9uLGU9dGhpcy5tb3JwaEF0dHJpYnV0ZXMucG9zaXRpb247aWYodCYmdC5pc0dMQnVmZmVyQXR0cmlidXRlKXtjb25zb2xlLmVycm9yKCdUSFJFRS5CdWZmZXJHZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKTogR0xCdWZmZXJBdHRyaWJ1dGUgcmVxdWlyZXMgYSBtYW51YWwgYm91bmRpbmcgYm94LiBBbHRlcm5hdGl2ZWx5IHNldCAibWVzaC5mcnVzdHVtQ3VsbGVkIiB0byAiZmFsc2UiLicsdGhpcyksdGhpcy5ib3VuZGluZ0JveC5zZXQobmV3IHgoLTEvMCwtMS8wLC0xLzApLG5ldyB4KDEvMCwxLzAsMS8wKSk7cmV0dXJufWlmKHQhPT12b2lkIDApe2lmKHRoaXMuYm91bmRpbmdCb3guc2V0RnJvbUJ1ZmZlckF0dHJpYnV0ZSh0KSxlKWZvcihsZXQgcz0wLGk9ZS5sZW5ndGg7czxpO3MrKyl7Y29uc3Qgbj1lW3NdO3R0LnNldEZyb21CdWZmZXJBdHRyaWJ1dGUobiksdGhpcy5tb3JwaFRhcmdldHNSZWxhdGl2ZT8oVy5hZGRWZWN0b3JzKHRoaXMuYm91bmRpbmdCb3gubWluLHR0Lm1pbiksdGhpcy5ib3VuZGluZ0JveC5leHBhbmRCeVBvaW50KFcpLFcuYWRkVmVjdG9ycyh0aGlzLmJvdW5kaW5nQm94Lm1heCx0dC5tYXgpLHRoaXMuYm91bmRpbmdCb3guZXhwYW5kQnlQb2ludChXKSk6KHRoaXMuYm91bmRpbmdCb3guZXhwYW5kQnlQb2ludCh0dC5taW4pLHRoaXMuYm91bmRpbmdCb3guZXhwYW5kQnlQb2ludCh0dC5tYXgpKX19ZWxzZSB0aGlzLmJvdW5kaW5nQm94Lm1ha2VFbXB0eSgpOyhpc05hTih0aGlzLmJvdW5kaW5nQm94Lm1pbi54KXx8aXNOYU4odGhpcy5ib3VuZGluZ0JveC5taW4ueSl8fGlzTmFOKHRoaXMuYm91bmRpbmdCb3gubWluLnopKSYmY29uc29sZS5lcnJvcignVEhSRUUuQnVmZmVyR2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nQm94KCk6IENvbXB1dGVkIG1pbi9tYXggaGF2ZSBOYU4gdmFsdWVzLiBUaGUgInBvc2l0aW9uIiBhdHRyaWJ1dGUgaXMgbGlrZWx5IHRvIGhhdmUgTmFOIHZhbHVlcy4nLHRoaXMpfWNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpe3RoaXMuYm91bmRpbmdTcGhlcmU9PT1udWxsJiYodGhpcy5ib3VuZGluZ1NwaGVyZT1uZXcgcHQpO2NvbnN0IHQ9dGhpcy5hdHRyaWJ1dGVzLnBvc2l0aW9uLGU9dGhpcy5tb3JwaEF0dHJpYnV0ZXMucG9zaXRpb247aWYodCYmdC5pc0dMQnVmZmVyQXR0cmlidXRlKXtjb25zb2xlLmVycm9yKCdUSFJFRS5CdWZmZXJHZW9tZXRyeS5jb21wdXRlQm91bmRpbmdTcGhlcmUoKTogR0xCdWZmZXJBdHRyaWJ1dGUgcmVxdWlyZXMgYSBtYW51YWwgYm91bmRpbmcgc3BoZXJlLiBBbHRlcm5hdGl2ZWx5IHNldCAibWVzaC5mcnVzdHVtQ3VsbGVkIiB0byAiZmFsc2UiLicsdGhpcyksdGhpcy5ib3VuZGluZ1NwaGVyZS5zZXQobmV3IHgsMS8wKTtyZXR1cm59aWYodCl7Y29uc3Qgcz10aGlzLmJvdW5kaW5nU3BoZXJlLmNlbnRlcjtpZih0dC5zZXRGcm9tQnVmZmVyQXR0cmlidXRlKHQpLGUpZm9yKGxldCBuPTAscj1lLmxlbmd0aDtuPHI7bisrKXtjb25zdCBvPWVbbl07dmUuc2V0RnJvbUJ1ZmZlckF0dHJpYnV0ZShvKSx0aGlzLm1vcnBoVGFyZ2V0c1JlbGF0aXZlPyhXLmFkZFZlY3RvcnModHQubWluLHZlLm1pbiksdHQuZXhwYW5kQnlQb2ludChXKSxXLmFkZFZlY3RvcnModHQubWF4LHZlLm1heCksdHQuZXhwYW5kQnlQb2ludChXKSk6KHR0LmV4cGFuZEJ5UG9pbnQodmUubWluKSx0dC5leHBhbmRCeVBvaW50KHZlLm1heCkpfXR0LmdldENlbnRlcihzKTtsZXQgaT0wO2ZvcihsZXQgbj0wLHI9dC5jb3VudDtuPHI7bisrKVcuZnJvbUJ1ZmZlckF0dHJpYnV0ZSh0LG4pLGk9TWF0aC5tYXgoaSxzLmRpc3RhbmNlVG9TcXVhcmVkKFcpKTtpZihlKWZvcihsZXQgbj0wLHI9ZS5sZW5ndGg7bjxyO24rKyl7Y29uc3Qgbz1lW25dLGE9dGhpcy5tb3JwaFRhcmdldHNSZWxhdGl2ZTtmb3IobGV0IGg9MCxsPW8uY291bnQ7aDxsO2grKylXLmZyb21CdWZmZXJBdHRyaWJ1dGUobyxoKSxhJiYocmUuZnJvbUJ1ZmZlckF0dHJpYnV0ZSh0LGgpLFcuYWRkKHJlKSksaT1NYXRoLm1heChpLHMuZGlzdGFuY2VUb1NxdWFyZWQoVykpfXRoaXMuYm91bmRpbmdTcGhlcmUucmFkaXVzPU1hdGguc3FydChpKSxpc05hTih0aGlzLmJvdW5kaW5nU3BoZXJlLnJhZGl1cykmJmNvbnNvbGUuZXJyb3IoJ1RIUkVFLkJ1ZmZlckdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpOiBDb21wdXRlZCByYWRpdXMgaXMgTmFOLiBUaGUgInBvc2l0aW9uIiBhdHRyaWJ1dGUgaXMgbGlrZWx5IHRvIGhhdmUgTmFOIHZhbHVlcy4nLHRoaXMpfX1jb21wdXRlVGFuZ2VudHMoKXtjb25zdCB0PXRoaXMuaW5kZXgsZT10aGlzLmF0dHJpYnV0ZXM7aWYodD09PW51bGx8fGUucG9zaXRpb249PT12b2lkIDB8fGUubm9ybWFsPT09dm9pZCAwfHxlLnV2PT09dm9pZCAwKXtjb25zb2xlLmVycm9yKCJUSFJFRS5CdWZmZXJHZW9tZXRyeTogLmNvbXB1dGVUYW5nZW50cygpIGZhaWxlZC4gTWlzc2luZyByZXF1aXJlZCBhdHRyaWJ1dGVzIChpbmRleCwgcG9zaXRpb24sIG5vcm1hbCBvciB1dikiKTtyZXR1cm59Y29uc3Qgcz10LmFycmF5LGk9ZS5wb3NpdGlvbi5hcnJheSxuPWUubm9ybWFsLmFycmF5LHI9ZS51di5hcnJheSxvPWkubGVuZ3RoLzM7dGhpcy5oYXNBdHRyaWJ1dGUoInRhbmdlbnQiKT09PSExJiZ0aGlzLnNldEF0dHJpYnV0ZSgidGFuZ2VudCIsbmV3IHd0KG5ldyBGbG9hdDMyQXJyYXkoNCpvKSw0KSk7Y29uc3QgYT10aGlzLmdldEF0dHJpYnV0ZSgidGFuZ2VudCIpLmFycmF5LGg9W10sbD1bXTtmb3IobGV0IHo9MDt6PG87eisrKWhbel09bmV3IHgsbFt6XT1uZXcgeDtjb25zdCB1PW5ldyB4LGQ9bmV3IHgsZj1uZXcgeCxwPW5ldyBPLG09bmV3IE8sZz1uZXcgTyx5PW5ldyB4LE09bmV3IHg7ZnVuY3Rpb24gdyh6LEwsUil7dS5mcm9tQXJyYXkoaSx6KjMpLGQuZnJvbUFycmF5KGksTCozKSxmLmZyb21BcnJheShpLFIqMykscC5mcm9tQXJyYXkocix6KjIpLG0uZnJvbUFycmF5KHIsTCoyKSxnLmZyb21BcnJheShyLFIqMiksZC5zdWIodSksZi5zdWIodSksbS5zdWIocCksZy5zdWIocCk7Y29uc3QgVD0xLyhtLngqZy55LWcueCptLnkpOyFpc0Zpbml0ZShUKXx8KHkuY29weShkKS5tdWx0aXBseVNjYWxhcihnLnkpLmFkZFNjYWxlZFZlY3RvcihmLC1tLnkpLm11bHRpcGx5U2NhbGFyKFQpLE0uY29weShmKS5tdWx0aXBseVNjYWxhcihtLngpLmFkZFNjYWxlZFZlY3RvcihkLC1nLngpLm11bHRpcGx5U2NhbGFyKFQpLGhbel0uYWRkKHkpLGhbTF0uYWRkKHkpLGhbUl0uYWRkKHkpLGxbel0uYWRkKE0pLGxbTF0uYWRkKE0pLGxbUl0uYWRkKE0pKX1sZXQgXz10aGlzLmdyb3VwcztfLmxlbmd0aD09PTAmJihfPVt7c3RhcnQ6MCxjb3VudDpzLmxlbmd0aH1dKTtmb3IobGV0IHo9MCxMPV8ubGVuZ3RoO3o8TDsrK3ope2NvbnN0IFI9X1t6XSxUPVIuc3RhcnQsRD1SLmNvdW50O2ZvcihsZXQgQz1ULFk9VCtEO0M8WTtDKz0zKXcoc1tDKzBdLHNbQysxXSxzW0MrMl0pfWNvbnN0IGI9bmV3IHgsQT1uZXcgeCxTPW5ldyB4LHY9bmV3IHg7ZnVuY3Rpb24gayh6KXtTLmZyb21BcnJheShuLHoqMyksdi5jb3B5KFMpO2NvbnN0IEw9aFt6XTtiLmNvcHkoTCksYi5zdWIoUy5tdWx0aXBseVNjYWxhcihTLmRvdChMKSkpLm5vcm1hbGl6ZSgpLEEuY3Jvc3NWZWN0b3JzKHYsTCk7Y29uc3QgVD1BLmRvdChsW3pdKTwwPy0xOjE7YVt6KjRdPWIueCxhW3oqNCsxXT1iLnksYVt6KjQrMl09Yi56LGFbeio0KzNdPVR9Zm9yKGxldCB6PTAsTD1fLmxlbmd0aDt6PEw7Kyt6KXtjb25zdCBSPV9bel0sVD1SLnN0YXJ0LEQ9Ui5jb3VudDtmb3IobGV0IEM9VCxZPVQrRDtDPFk7Qys9MylrKHNbQyswXSksayhzW0MrMV0pLGsoc1tDKzJdKX19Y29tcHV0ZVZlcnRleE5vcm1hbHMoKXtjb25zdCB0PXRoaXMuaW5kZXgsZT10aGlzLmdldEF0dHJpYnV0ZSgicG9zaXRpb24iKTtpZihlIT09dm9pZCAwKXtsZXQgcz10aGlzLmdldEF0dHJpYnV0ZSgibm9ybWFsIik7aWYocz09PXZvaWQgMClzPW5ldyB3dChuZXcgRmxvYXQzMkFycmF5KGUuY291bnQqMyksMyksdGhpcy5zZXRBdHRyaWJ1dGUoIm5vcm1hbCIscyk7ZWxzZSBmb3IobGV0IGQ9MCxmPXMuY291bnQ7ZDxmO2QrKylzLnNldFhZWihkLDAsMCwwKTtjb25zdCBpPW5ldyB4LG49bmV3IHgscj1uZXcgeCxvPW5ldyB4LGE9bmV3IHgsaD1uZXcgeCxsPW5ldyB4LHU9bmV3IHg7aWYodClmb3IobGV0IGQ9MCxmPXQuY291bnQ7ZDxmO2QrPTMpe2NvbnN0IHA9dC5nZXRYKGQrMCksbT10LmdldFgoZCsxKSxnPXQuZ2V0WChkKzIpO2kuZnJvbUJ1ZmZlckF0dHJpYnV0ZShlLHApLG4uZnJvbUJ1ZmZlckF0dHJpYnV0ZShlLG0pLHIuZnJvbUJ1ZmZlckF0dHJpYnV0ZShlLGcpLGwuc3ViVmVjdG9ycyhyLG4pLHUuc3ViVmVjdG9ycyhpLG4pLGwuY3Jvc3ModSksby5mcm9tQnVmZmVyQXR0cmlidXRlKHMscCksYS5mcm9tQnVmZmVyQXR0cmlidXRlKHMsbSksaC5mcm9tQnVmZmVyQXR0cmlidXRlKHMsZyksby5hZGQobCksYS5hZGQobCksaC5hZGQobCkscy5zZXRYWVoocCxvLngsby55LG8ueikscy5zZXRYWVoobSxhLngsYS55LGEueikscy5zZXRYWVooZyxoLngsaC55LGgueil9ZWxzZSBmb3IobGV0IGQ9MCxmPWUuY291bnQ7ZDxmO2QrPTMpaS5mcm9tQnVmZmVyQXR0cmlidXRlKGUsZCswKSxuLmZyb21CdWZmZXJBdHRyaWJ1dGUoZSxkKzEpLHIuZnJvbUJ1ZmZlckF0dHJpYnV0ZShlLGQrMiksbC5zdWJWZWN0b3JzKHIsbiksdS5zdWJWZWN0b3JzKGksbiksbC5jcm9zcyh1KSxzLnNldFhZWihkKzAsbC54LGwueSxsLnopLHMuc2V0WFlaKGQrMSxsLngsbC55LGwueikscy5zZXRYWVooZCsyLGwueCxsLnksbC56KTt0aGlzLm5vcm1hbGl6ZU5vcm1hbHMoKSxzLm5lZWRzVXBkYXRlPSEwfX1tZXJnZSh0LGUpe2lmKCEodCYmdC5pc0J1ZmZlckdlb21ldHJ5KSl7Y29uc29sZS5lcnJvcigiVEhSRUUuQnVmZmVyR2VvbWV0cnkubWVyZ2UoKTogZ2VvbWV0cnkgbm90IGFuIGluc3RhbmNlIG9mIFRIUkVFLkJ1ZmZlckdlb21ldHJ5LiIsdCk7cmV0dXJufWU9PT12b2lkIDAmJihlPTAsY29uc29sZS53YXJuKCJUSFJFRS5CdWZmZXJHZW9tZXRyeS5tZXJnZSgpOiBPdmVyd3JpdGluZyBvcmlnaW5hbCBnZW9tZXRyeSwgc3RhcnRpbmcgYXQgb2Zmc2V0PTAuIFVzZSBCdWZmZXJHZW9tZXRyeVV0aWxzLm1lcmdlQnVmZmVyR2VvbWV0cmllcygpIGZvciBsb3NzbGVzcyBtZXJnZS4iKSk7Y29uc3Qgcz10aGlzLmF0dHJpYnV0ZXM7Zm9yKGNvbnN0IGkgaW4gcyl7aWYodC5hdHRyaWJ1dGVzW2ldPT09dm9pZCAwKWNvbnRpbnVlO2NvbnN0IHI9c1tpXS5hcnJheSxvPXQuYXR0cmlidXRlc1tpXSxhPW8uYXJyYXksaD1vLml0ZW1TaXplKmUsbD1NYXRoLm1pbihhLmxlbmd0aCxyLmxlbmd0aC1oKTtmb3IobGV0IHU9MCxkPWg7dTxsO3UrKyxkKyspcltkXT1hW3VdfXJldHVybiB0aGlzfW5vcm1hbGl6ZU5vcm1hbHMoKXtjb25zdCB0PXRoaXMuYXR0cmlidXRlcy5ub3JtYWw7Zm9yKGxldCBlPTAscz10LmNvdW50O2U8cztlKyspVy5mcm9tQnVmZmVyQXR0cmlidXRlKHQsZSksVy5ub3JtYWxpemUoKSx0LnNldFhZWihlLFcueCxXLnksVy56KX10b05vbkluZGV4ZWQoKXtmdW5jdGlvbiB0KG8sYSl7Y29uc3QgaD1vLmFycmF5LGw9by5pdGVtU2l6ZSx1PW8ubm9ybWFsaXplZCxkPW5ldyBoLmNvbnN0cnVjdG9yKGEubGVuZ3RoKmwpO2xldCBmPTAscD0wO2ZvcihsZXQgbT0wLGc9YS5sZW5ndGg7bTxnO20rKyl7by5pc0ludGVybGVhdmVkQnVmZmVyQXR0cmlidXRlP2Y9YVttXSpvLmRhdGEuc3RyaWRlK28ub2Zmc2V0OmY9YVttXSpsO2ZvcihsZXQgeT0wO3k8bDt5KyspZFtwKytdPWhbZisrXX1yZXR1cm4gbmV3IHd0KGQsbCx1KX1pZih0aGlzLmluZGV4PT09bnVsbClyZXR1cm4gY29uc29sZS53YXJuKCJUSFJFRS5CdWZmZXJHZW9tZXRyeS50b05vbkluZGV4ZWQoKTogQnVmZmVyR2VvbWV0cnkgaXMgYWxyZWFkeSBub24taW5kZXhlZC4iKSx0aGlzO2NvbnN0IGU9bmV3IG9lLHM9dGhpcy5pbmRleC5hcnJheSxpPXRoaXMuYXR0cmlidXRlcztmb3IoY29uc3QgbyBpbiBpKXtjb25zdCBhPWlbb10saD10KGEscyk7ZS5zZXRBdHRyaWJ1dGUobyxoKX1jb25zdCBuPXRoaXMubW9ycGhBdHRyaWJ1dGVzO2Zvcihjb25zdCBvIGluIG4pe2NvbnN0IGE9W10saD1uW29dO2ZvcihsZXQgbD0wLHU9aC5sZW5ndGg7bDx1O2wrKyl7Y29uc3QgZD1oW2xdLGY9dChkLHMpO2EucHVzaChmKX1lLm1vcnBoQXR0cmlidXRlc1tvXT1hfWUubW9ycGhUYXJnZXRzUmVsYXRpdmU9dGhpcy5tb3JwaFRhcmdldHNSZWxhdGl2ZTtjb25zdCByPXRoaXMuZ3JvdXBzO2ZvcihsZXQgbz0wLGE9ci5sZW5ndGg7bzxhO28rKyl7Y29uc3QgaD1yW29dO2UuYWRkR3JvdXAoaC5zdGFydCxoLmNvdW50LGgubWF0ZXJpYWxJbmRleCl9cmV0dXJuIGV9dG9KU09OKCl7Y29uc3QgdD17bWV0YWRhdGE6e3ZlcnNpb246NC41LHR5cGU6IkJ1ZmZlckdlb21ldHJ5IixnZW5lcmF0b3I6IkJ1ZmZlckdlb21ldHJ5LnRvSlNPTiJ9fTtpZih0LnV1aWQ9dGhpcy51dWlkLHQudHlwZT10aGlzLnR5cGUsdGhpcy5uYW1lIT09IiImJih0Lm5hbWU9dGhpcy5uYW1lKSxPYmplY3Qua2V5cyh0aGlzLnVzZXJEYXRhKS5sZW5ndGg+MCYmKHQudXNlckRhdGE9dGhpcy51c2VyRGF0YSksdGhpcy5wYXJhbWV0ZXJzIT09dm9pZCAwKXtjb25zdCBhPXRoaXMucGFyYW1ldGVycztmb3IoY29uc3QgaCBpbiBhKWFbaF0hPT12b2lkIDAmJih0W2hdPWFbaF0pO3JldHVybiB0fXQuZGF0YT17YXR0cmlidXRlczp7fX07Y29uc3QgZT10aGlzLmluZGV4O2UhPT1udWxsJiYodC5kYXRhLmluZGV4PXt0eXBlOmUuYXJyYXkuY29uc3RydWN0b3IubmFtZSxhcnJheTpBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChlLmFycmF5KX0pO2NvbnN0IHM9dGhpcy5hdHRyaWJ1dGVzO2Zvcihjb25zdCBhIGluIHMpe2NvbnN0IGg9c1thXTt0LmRhdGEuYXR0cmlidXRlc1thXT1oLnRvSlNPTih0LmRhdGEpfWNvbnN0IGk9e307bGV0IG49ITE7Zm9yKGNvbnN0IGEgaW4gdGhpcy5tb3JwaEF0dHJpYnV0ZXMpe2NvbnN0IGg9dGhpcy5tb3JwaEF0dHJpYnV0ZXNbYV0sbD1bXTtmb3IobGV0IHU9MCxkPWgubGVuZ3RoO3U8ZDt1Kyspe2NvbnN0IGY9aFt1XTtsLnB1c2goZi50b0pTT04odC5kYXRhKSl9bC5sZW5ndGg+MCYmKGlbYV09bCxuPSEwKX1uJiYodC5kYXRhLm1vcnBoQXR0cmlidXRlcz1pLHQuZGF0YS5tb3JwaFRhcmdldHNSZWxhdGl2ZT10aGlzLm1vcnBoVGFyZ2V0c1JlbGF0aXZlKTtjb25zdCByPXRoaXMuZ3JvdXBzO3IubGVuZ3RoPjAmJih0LmRhdGEuZ3JvdXBzPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocikpKTtjb25zdCBvPXRoaXMuYm91bmRpbmdTcGhlcmU7cmV0dXJuIG8hPT1udWxsJiYodC5kYXRhLmJvdW5kaW5nU3BoZXJlPXtjZW50ZXI6by5jZW50ZXIudG9BcnJheSgpLHJhZGl1czpvLnJhZGl1c30pLHR9Y2xvbmUoKXtyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoKS5jb3B5KHRoaXMpfWNvcHkodCl7dGhpcy5pbmRleD1udWxsLHRoaXMuYXR0cmlidXRlcz17fSx0aGlzLm1vcnBoQXR0cmlidXRlcz17fSx0aGlzLmdyb3Vwcz1bXSx0aGlzLmJvdW5kaW5nQm94PW51bGwsdGhpcy5ib3VuZGluZ1NwaGVyZT1udWxsO2NvbnN0IGU9e307dGhpcy5uYW1lPXQubmFtZTtjb25zdCBzPXQuaW5kZXg7cyE9PW51bGwmJnRoaXMuc2V0SW5kZXgocy5jbG9uZShlKSk7Y29uc3QgaT10LmF0dHJpYnV0ZXM7Zm9yKGNvbnN0IGggaW4gaSl7Y29uc3QgbD1pW2hdO3RoaXMuc2V0QXR0cmlidXRlKGgsbC5jbG9uZShlKSl9Y29uc3Qgbj10Lm1vcnBoQXR0cmlidXRlcztmb3IoY29uc3QgaCBpbiBuKXtjb25zdCBsPVtdLHU9bltoXTtmb3IobGV0IGQ9MCxmPXUubGVuZ3RoO2Q8ZjtkKyspbC5wdXNoKHVbZF0uY2xvbmUoZSkpO3RoaXMubW9ycGhBdHRyaWJ1dGVzW2hdPWx9dGhpcy5tb3JwaFRhcmdldHNSZWxhdGl2ZT10Lm1vcnBoVGFyZ2V0c1JlbGF0aXZlO2NvbnN0IHI9dC5ncm91cHM7Zm9yKGxldCBoPTAsbD1yLmxlbmd0aDtoPGw7aCsrKXtjb25zdCB1PXJbaF07dGhpcy5hZGRHcm91cCh1LnN0YXJ0LHUuY291bnQsdS5tYXRlcmlhbEluZGV4KX1jb25zdCBvPXQuYm91bmRpbmdCb3g7byE9PW51bGwmJih0aGlzLmJvdW5kaW5nQm94PW8uY2xvbmUoKSk7Y29uc3QgYT10LmJvdW5kaW5nU3BoZXJlO3JldHVybiBhIT09bnVsbCYmKHRoaXMuYm91bmRpbmdTcGhlcmU9YS5jbG9uZSgpKSx0aGlzLmRyYXdSYW5nZS5zdGFydD10LmRyYXdSYW5nZS5zdGFydCx0aGlzLmRyYXdSYW5nZS5jb3VudD10LmRyYXdSYW5nZS5jb3VudCx0aGlzLnVzZXJEYXRhPXQudXNlckRhdGEsdC5wYXJhbWV0ZXJzIT09dm9pZCAwJiYodGhpcy5wYXJhbWV0ZXJzPU9iamVjdC5hc3NpZ24oe30sdC5wYXJhbWV0ZXJzKSksdGhpc31kaXNwb3NlKCl7dGhpcy5kaXNwYXRjaEV2ZW50KHt0eXBlOiJkaXNwb3NlIn0pfX1jb25zdCBLbj1uZXcgQixhZT1uZXcgZGksYmk9bmV3IHB0LEJ0PW5ldyB4LEx0PW5ldyB4LEZ0PW5ldyB4LHdpPW5ldyB4LE1pPW5ldyB4LF9pPW5ldyB4LGlzPW5ldyB4LG5zPW5ldyB4LHJzPW5ldyB4LG9zPW5ldyBPLGFzPW5ldyBPLGhzPW5ldyBPLFNpPW5ldyB4LGNzPW5ldyB4O2NsYXNzIEFpIGV4dGVuZHMgantjb25zdHJ1Y3Rvcih0PW5ldyBvZSxlPW5ldyBuZSl7c3VwZXIoKSx0aGlzLmlzTWVzaD0hMCx0aGlzLnR5cGU9Ik1lc2giLHRoaXMuZ2VvbWV0cnk9dCx0aGlzLm1hdGVyaWFsPWUsdGhpcy51cGRhdGVNb3JwaFRhcmdldHMoKX1jb3B5KHQsZSl7cmV0dXJuIHN1cGVyLmNvcHkodCxlKSx0Lm1vcnBoVGFyZ2V0SW5mbHVlbmNlcyE9PXZvaWQgMCYmKHRoaXMubW9ycGhUYXJnZXRJbmZsdWVuY2VzPXQubW9ycGhUYXJnZXRJbmZsdWVuY2VzLnNsaWNlKCkpLHQubW9ycGhUYXJnZXREaWN0aW9uYXJ5IT09dm9pZCAwJiYodGhpcy5tb3JwaFRhcmdldERpY3Rpb25hcnk9T2JqZWN0LmFzc2lnbih7fSx0Lm1vcnBoVGFyZ2V0RGljdGlvbmFyeSkpLHRoaXMubWF0ZXJpYWw9dC5tYXRlcmlhbCx0aGlzLmdlb21ldHJ5PXQuZ2VvbWV0cnksdGhpc311cGRhdGVNb3JwaFRhcmdldHMoKXtjb25zdCBlPXRoaXMuZ2VvbWV0cnkubW9ycGhBdHRyaWJ1dGVzLHM9T2JqZWN0LmtleXMoZSk7aWYocy5sZW5ndGg+MCl7Y29uc3QgaT1lW3NbMF1dO2lmKGkhPT12b2lkIDApe3RoaXMubW9ycGhUYXJnZXRJbmZsdWVuY2VzPVtdLHRoaXMubW9ycGhUYXJnZXREaWN0aW9uYXJ5PXt9O2ZvcihsZXQgbj0wLHI9aS5sZW5ndGg7bjxyO24rKyl7Y29uc3Qgbz1pW25dLm5hbWV8fFN0cmluZyhuKTt0aGlzLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcy5wdXNoKDApLHRoaXMubW9ycGhUYXJnZXREaWN0aW9uYXJ5W29dPW59fX19cmF5Y2FzdCh0LGUpe2NvbnN0IHM9dGhpcy5nZW9tZXRyeSxpPXRoaXMubWF0ZXJpYWwsbj10aGlzLm1hdHJpeFdvcmxkO2lmKGk9PT12b2lkIDB8fChzLmJvdW5kaW5nU3BoZXJlPT09bnVsbCYmcy5jb21wdXRlQm91bmRpbmdTcGhlcmUoKSxiaS5jb3B5KHMuYm91bmRpbmdTcGhlcmUpLGJpLmFwcGx5TWF0cml4NChuKSx0LnJheS5pbnRlcnNlY3RzU3BoZXJlKGJpKT09PSExKXx8KEtuLmNvcHkobikuaW52ZXJ0KCksYWUuY29weSh0LnJheSkuYXBwbHlNYXRyaXg0KEtuKSxzLmJvdW5kaW5nQm94IT09bnVsbCYmYWUuaW50ZXJzZWN0c0JveChzLmJvdW5kaW5nQm94KT09PSExKSlyZXR1cm47bGV0IHI7Y29uc3Qgbz1zLmluZGV4LGE9cy5hdHRyaWJ1dGVzLnBvc2l0aW9uLGg9cy5tb3JwaEF0dHJpYnV0ZXMucG9zaXRpb24sbD1zLm1vcnBoVGFyZ2V0c1JlbGF0aXZlLHU9cy5hdHRyaWJ1dGVzLnV2LGQ9cy5hdHRyaWJ1dGVzLnV2MixmPXMuZ3JvdXBzLHA9cy5kcmF3UmFuZ2U7aWYobyE9PW51bGwpaWYoQXJyYXkuaXNBcnJheShpKSlmb3IobGV0IG09MCxnPWYubGVuZ3RoO208ZzttKyspe2NvbnN0IHk9ZlttXSxNPWlbeS5tYXRlcmlhbEluZGV4XSx3PU1hdGgubWF4KHkuc3RhcnQscC5zdGFydCksXz1NYXRoLm1pbihvLmNvdW50LE1hdGgubWluKHkuc3RhcnQreS5jb3VudCxwLnN0YXJ0K3AuY291bnQpKTtmb3IobGV0IGI9dyxBPV87YjxBO2IrPTMpe2NvbnN0IFM9by5nZXRYKGIpLHY9by5nZXRYKGIrMSksaz1vLmdldFgoYisyKTtyPWxzKHRoaXMsTSx0LGFlLGEsaCxsLHUsZCxTLHYsayksciYmKHIuZmFjZUluZGV4PU1hdGguZmxvb3IoYi8zKSxyLmZhY2UubWF0ZXJpYWxJbmRleD15Lm1hdGVyaWFsSW5kZXgsZS5wdXNoKHIpKX19ZWxzZXtjb25zdCBtPU1hdGgubWF4KDAscC5zdGFydCksZz1NYXRoLm1pbihvLmNvdW50LHAuc3RhcnQrcC5jb3VudCk7Zm9yKGxldCB5PW0sTT1nO3k8TTt5Kz0zKXtjb25zdCB3PW8uZ2V0WCh5KSxfPW8uZ2V0WCh5KzEpLGI9by5nZXRYKHkrMik7cj1scyh0aGlzLGksdCxhZSxhLGgsbCx1LGQsdyxfLGIpLHImJihyLmZhY2VJbmRleD1NYXRoLmZsb29yKHkvMyksZS5wdXNoKHIpKX19ZWxzZSBpZihhIT09dm9pZCAwKWlmKEFycmF5LmlzQXJyYXkoaSkpZm9yKGxldCBtPTAsZz1mLmxlbmd0aDttPGc7bSsrKXtjb25zdCB5PWZbbV0sTT1pW3kubWF0ZXJpYWxJbmRleF0sdz1NYXRoLm1heCh5LnN0YXJ0LHAuc3RhcnQpLF89TWF0aC5taW4oYS5jb3VudCxNYXRoLm1pbih5LnN0YXJ0K3kuY291bnQscC5zdGFydCtwLmNvdW50KSk7Zm9yKGxldCBiPXcsQT1fO2I8QTtiKz0zKXtjb25zdCBTPWIsdj1iKzEsaz1iKzI7cj1scyh0aGlzLE0sdCxhZSxhLGgsbCx1LGQsUyx2LGspLHImJihyLmZhY2VJbmRleD1NYXRoLmZsb29yKGIvMyksci5mYWNlLm1hdGVyaWFsSW5kZXg9eS5tYXRlcmlhbEluZGV4LGUucHVzaChyKSl9fWVsc2V7Y29uc3QgbT1NYXRoLm1heCgwLHAuc3RhcnQpLGc9TWF0aC5taW4oYS5jb3VudCxwLnN0YXJ0K3AuY291bnQpO2ZvcihsZXQgeT1tLE09Zzt5PE07eSs9Myl7Y29uc3Qgdz15LF89eSsxLGI9eSsyO3I9bHModGhpcyxpLHQsYWUsYSxoLGwsdSxkLHcsXyxiKSxyJiYoci5mYWNlSW5kZXg9TWF0aC5mbG9vcih5LzMpLGUucHVzaChyKSl9fX19ZnVuY3Rpb24gVWEoYyx0LGUscyxpLG4scixvKXtsZXQgYTtpZih0LnNpZGU9PT1qbz9hPXMuaW50ZXJzZWN0VHJpYW5nbGUocixuLGksITAsbyk6YT1zLmludGVyc2VjdFRyaWFuZ2xlKGksbixyLHQuc2lkZSE9PUJuLG8pLGE9PT1udWxsKXJldHVybiBudWxsO2NzLmNvcHkobyksY3MuYXBwbHlNYXRyaXg0KGMubWF0cml4V29ybGQpO2NvbnN0IGg9ZS5yYXkub3JpZ2luLmRpc3RhbmNlVG8oY3MpO3JldHVybiBoPGUubmVhcnx8aD5lLmZhcj9udWxsOntkaXN0YW5jZTpoLHBvaW50OmNzLmNsb25lKCksb2JqZWN0OmN9fWZ1bmN0aW9uIGxzKGMsdCxlLHMsaSxuLHIsbyxhLGgsbCx1KXtCdC5mcm9tQnVmZmVyQXR0cmlidXRlKGksaCksTHQuZnJvbUJ1ZmZlckF0dHJpYnV0ZShpLGwpLEZ0LmZyb21CdWZmZXJBdHRyaWJ1dGUoaSx1KTtjb25zdCBkPWMubW9ycGhUYXJnZXRJbmZsdWVuY2VzO2lmKG4mJmQpe2lzLnNldCgwLDAsMCksbnMuc2V0KDAsMCwwKSxycy5zZXQoMCwwLDApO2ZvcihsZXQgcD0wLG09bi5sZW5ndGg7cDxtO3ArKyl7Y29uc3QgZz1kW3BdLHk9bltwXTtnIT09MCYmKHdpLmZyb21CdWZmZXJBdHRyaWJ1dGUoeSxoKSxNaS5mcm9tQnVmZmVyQXR0cmlidXRlKHksbCksX2kuZnJvbUJ1ZmZlckF0dHJpYnV0ZSh5LHUpLHI/KGlzLmFkZFNjYWxlZFZlY3Rvcih3aSxnKSxucy5hZGRTY2FsZWRWZWN0b3IoTWksZykscnMuYWRkU2NhbGVkVmVjdG9yKF9pLGcpKTooaXMuYWRkU2NhbGVkVmVjdG9yKHdpLnN1YihCdCksZyksbnMuYWRkU2NhbGVkVmVjdG9yKE1pLnN1YihMdCksZykscnMuYWRkU2NhbGVkVmVjdG9yKF9pLnN1YihGdCksZykpKX1CdC5hZGQoaXMpLEx0LmFkZChucyksRnQuYWRkKHJzKX1jLmlzU2tpbm5lZE1lc2gmJihjLmJvbmVUcmFuc2Zvcm0oaCxCdCksYy5ib25lVHJhbnNmb3JtKGwsTHQpLGMuYm9uZVRyYW5zZm9ybSh1LEZ0KSk7Y29uc3QgZj1VYShjLHQsZSxzLEJ0LEx0LEZ0LFNpKTtpZihmKXtvJiYob3MuZnJvbUJ1ZmZlckF0dHJpYnV0ZShvLGgpLGFzLmZyb21CdWZmZXJBdHRyaWJ1dGUobyxsKSxocy5mcm9tQnVmZmVyQXR0cmlidXRlKG8sdSksZi51dj1idC5nZXRVVihTaSxCdCxMdCxGdCxvcyxhcyxocyxuZXcgTykpLGEmJihvcy5mcm9tQnVmZmVyQXR0cmlidXRlKGEsaCksYXMuZnJvbUJ1ZmZlckF0dHJpYnV0ZShhLGwpLGhzLmZyb21CdWZmZXJBdHRyaWJ1dGUoYSx1KSxmLnV2Mj1idC5nZXRVVihTaSxCdCxMdCxGdCxvcyxhcyxocyxuZXcgTykpO2NvbnN0IHA9e2E6aCxiOmwsYzp1LG5vcm1hbDpuZXcgeCxtYXRlcmlhbEluZGV4OjB9O2J0LmdldE5vcm1hbChCdCxMdCxGdCxwLm5vcm1hbCksZi5mYWNlPXB9cmV0dXJuIGZ9Y2xhc3MgUW4gZXh0ZW5kcyBqe2NvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLmlzQ2FtZXJhPSEwLHRoaXMudHlwZT0iQ2FtZXJhIix0aGlzLm1hdHJpeFdvcmxkSW52ZXJzZT1uZXcgQix0aGlzLnByb2plY3Rpb25NYXRyaXg9bmV3IEIsdGhpcy5wcm9qZWN0aW9uTWF0cml4SW52ZXJzZT1uZXcgQn1jb3B5KHQsZSl7cmV0dXJuIHN1cGVyLmNvcHkodCxlKSx0aGlzLm1hdHJpeFdvcmxkSW52ZXJzZS5jb3B5KHQubWF0cml4V29ybGRJbnZlcnNlKSx0aGlzLnByb2plY3Rpb25NYXRyaXguY29weSh0LnByb2plY3Rpb25NYXRyaXgpLHRoaXMucHJvamVjdGlvbk1hdHJpeEludmVyc2UuY29weSh0LnByb2plY3Rpb25NYXRyaXhJbnZlcnNlKSx0aGlzfWdldFdvcmxkRGlyZWN0aW9uKHQpe3RoaXMudXBkYXRlV29ybGRNYXRyaXgoITAsITEpO2NvbnN0IGU9dGhpcy5tYXRyaXhXb3JsZC5lbGVtZW50cztyZXR1cm4gdC5zZXQoLWVbOF0sLWVbOV0sLWVbMTBdKS5ub3JtYWxpemUoKX11cGRhdGVNYXRyaXhXb3JsZCh0KXtzdXBlci51cGRhdGVNYXRyaXhXb3JsZCh0KSx0aGlzLm1hdHJpeFdvcmxkSW52ZXJzZS5jb3B5KHRoaXMubWF0cml4V29ybGQpLmludmVydCgpfXVwZGF0ZVdvcmxkTWF0cml4KHQsZSl7c3VwZXIudXBkYXRlV29ybGRNYXRyaXgodCxlKSx0aGlzLm1hdHJpeFdvcmxkSW52ZXJzZS5jb3B5KHRoaXMubWF0cml4V29ybGQpLmludmVydCgpfWNsb25lKCl7cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKCkuY29weSh0aGlzKX19Y2xhc3MgVGkgZXh0ZW5kcyBRbntjb25zdHJ1Y3Rvcih0PTUwLGU9MSxzPS4xLGk9MmUzKXtzdXBlcigpLHRoaXMuaXNQZXJzcGVjdGl2ZUNhbWVyYT0hMCx0aGlzLnR5cGU9IlBlcnNwZWN0aXZlQ2FtZXJhIix0aGlzLmZvdj10LHRoaXMuem9vbT0xLHRoaXMubmVhcj1zLHRoaXMuZmFyPWksdGhpcy5mb2N1cz0xMCx0aGlzLmFzcGVjdD1lLHRoaXMudmlldz1udWxsLHRoaXMuZmlsbUdhdWdlPTM1LHRoaXMuZmlsbU9mZnNldD0wLHRoaXMudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpfWNvcHkodCxlKXtyZXR1cm4gc3VwZXIuY29weSh0LGUpLHRoaXMuZm92PXQuZm92LHRoaXMuem9vbT10Lnpvb20sdGhpcy5uZWFyPXQubmVhcix0aGlzLmZhcj10LmZhcix0aGlzLmZvY3VzPXQuZm9jdXMsdGhpcy5hc3BlY3Q9dC5hc3BlY3QsdGhpcy52aWV3PXQudmlldz09PW51bGw/bnVsbDpPYmplY3QuYXNzaWduKHt9LHQudmlldyksdGhpcy5maWxtR2F1Z2U9dC5maWxtR2F1Z2UsdGhpcy5maWxtT2Zmc2V0PXQuZmlsbU9mZnNldCx0aGlzfXNldEZvY2FsTGVuZ3RoKHQpe2NvbnN0IGU9LjUqdGhpcy5nZXRGaWxtSGVpZ2h0KCkvdDt0aGlzLmZvdj1fZSoyKk1hdGguYXRhbihlKSx0aGlzLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKX1nZXRGb2NhbExlbmd0aCgpe2NvbnN0IHQ9TWF0aC50YW4oTWUqLjUqdGhpcy5mb3YpO3JldHVybiAuNSp0aGlzLmdldEZpbG1IZWlnaHQoKS90fWdldEVmZmVjdGl2ZUZPVigpe3JldHVybiBfZSoyKk1hdGguYXRhbihNYXRoLnRhbihNZSouNSp0aGlzLmZvdikvdGhpcy56b29tKX1nZXRGaWxtV2lkdGgoKXtyZXR1cm4gdGhpcy5maWxtR2F1Z2UqTWF0aC5taW4odGhpcy5hc3BlY3QsMSl9Z2V0RmlsbUhlaWdodCgpe3JldHVybiB0aGlzLmZpbG1HYXVnZS9NYXRoLm1heCh0aGlzLmFzcGVjdCwxKX1zZXRWaWV3T2Zmc2V0KHQsZSxzLGksbixyKXt0aGlzLmFzcGVjdD10L2UsdGhpcy52aWV3PT09bnVsbCYmKHRoaXMudmlldz17ZW5hYmxlZDohMCxmdWxsV2lkdGg6MSxmdWxsSGVpZ2h0OjEsb2Zmc2V0WDowLG9mZnNldFk6MCx3aWR0aDoxLGhlaWdodDoxfSksdGhpcy52aWV3LmVuYWJsZWQ9ITAsdGhpcy52aWV3LmZ1bGxXaWR0aD10LHRoaXMudmlldy5mdWxsSGVpZ2h0PWUsdGhpcy52aWV3Lm9mZnNldFg9cyx0aGlzLnZpZXcub2Zmc2V0WT1pLHRoaXMudmlldy53aWR0aD1uLHRoaXMudmlldy5oZWlnaHQ9cix0aGlzLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKX1jbGVhclZpZXdPZmZzZXQoKXt0aGlzLnZpZXchPT1udWxsJiYodGhpcy52aWV3LmVuYWJsZWQ9ITEpLHRoaXMudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpfXVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKXtjb25zdCB0PXRoaXMubmVhcjtsZXQgZT10Kk1hdGgudGFuKE1lKi41KnRoaXMuZm92KS90aGlzLnpvb20scz0yKmUsaT10aGlzLmFzcGVjdCpzLG49LS41Kmk7Y29uc3Qgcj10aGlzLnZpZXc7aWYodGhpcy52aWV3IT09bnVsbCYmdGhpcy52aWV3LmVuYWJsZWQpe2NvbnN0IGE9ci5mdWxsV2lkdGgsaD1yLmZ1bGxIZWlnaHQ7bis9ci5vZmZzZXRYKmkvYSxlLT1yLm9mZnNldFkqcy9oLGkqPXIud2lkdGgvYSxzKj1yLmhlaWdodC9ofWNvbnN0IG89dGhpcy5maWxtT2Zmc2V0O28hPT0wJiYobis9dCpvL3RoaXMuZ2V0RmlsbVdpZHRoKCkpLHRoaXMucHJvamVjdGlvbk1hdHJpeC5tYWtlUGVyc3BlY3RpdmUobixuK2ksZSxlLXMsdCx0aGlzLmZhciksdGhpcy5wcm9qZWN0aW9uTWF0cml4SW52ZXJzZS5jb3B5KHRoaXMucHJvamVjdGlvbk1hdHJpeCkuaW52ZXJ0KCl9dG9KU09OKHQpe2NvbnN0IGU9c3VwZXIudG9KU09OKHQpO3JldHVybiBlLm9iamVjdC5mb3Y9dGhpcy5mb3YsZS5vYmplY3Quem9vbT10aGlzLnpvb20sZS5vYmplY3QubmVhcj10aGlzLm5lYXIsZS5vYmplY3QuZmFyPXRoaXMuZmFyLGUub2JqZWN0LmZvY3VzPXRoaXMuZm9jdXMsZS5vYmplY3QuYXNwZWN0PXRoaXMuYXNwZWN0LHRoaXMudmlldyE9PW51bGwmJihlLm9iamVjdC52aWV3PU9iamVjdC5hc3NpZ24oe30sdGhpcy52aWV3KSksZS5vYmplY3QuZmlsbUdhdWdlPXRoaXMuZmlsbUdhdWdlLGUub2JqZWN0LmZpbG1PZmZzZXQ9dGhpcy5maWxtT2Zmc2V0LGV9fWNvbnN0IEVpPW5ldyB4LFZhPW5ldyB4LEhhPW5ldyBYdDtjbGFzcyBoZXtjb25zdHJ1Y3Rvcih0PW5ldyB4KDEsMCwwKSxlPTApe3RoaXMuaXNQbGFuZT0hMCx0aGlzLm5vcm1hbD10LHRoaXMuY29uc3RhbnQ9ZX1zZXQodCxlKXtyZXR1cm4gdGhpcy5ub3JtYWwuY29weSh0KSx0aGlzLmNvbnN0YW50PWUsdGhpc31zZXRDb21wb25lbnRzKHQsZSxzLGkpe3JldHVybiB0aGlzLm5vcm1hbC5zZXQodCxlLHMpLHRoaXMuY29uc3RhbnQ9aSx0aGlzfXNldEZyb21Ob3JtYWxBbmRDb3BsYW5hclBvaW50KHQsZSl7cmV0dXJuIHRoaXMubm9ybWFsLmNvcHkodCksdGhpcy5jb25zdGFudD0tZS5kb3QodGhpcy5ub3JtYWwpLHRoaXN9c2V0RnJvbUNvcGxhbmFyUG9pbnRzKHQsZSxzKXtjb25zdCBpPUVpLnN1YlZlY3RvcnMocyxlKS5jcm9zcyhWYS5zdWJWZWN0b3JzKHQsZSkpLm5vcm1hbGl6ZSgpO3JldHVybiB0aGlzLnNldEZyb21Ob3JtYWxBbmRDb3BsYW5hclBvaW50KGksdCksdGhpc31jb3B5KHQpe3JldHVybiB0aGlzLm5vcm1hbC5jb3B5KHQubm9ybWFsKSx0aGlzLmNvbnN0YW50PXQuY29uc3RhbnQsdGhpc31ub3JtYWxpemUoKXtjb25zdCB0PTEvdGhpcy5ub3JtYWwubGVuZ3RoKCk7cmV0dXJuIHRoaXMubm9ybWFsLm11bHRpcGx5U2NhbGFyKHQpLHRoaXMuY29uc3RhbnQqPXQsdGhpc31uZWdhdGUoKXtyZXR1cm4gdGhpcy5jb25zdGFudCo9LTEsdGhpcy5ub3JtYWwubmVnYXRlKCksdGhpc31kaXN0YW5jZVRvUG9pbnQodCl7cmV0dXJuIHRoaXMubm9ybWFsLmRvdCh0KSt0aGlzLmNvbnN0YW50fWRpc3RhbmNlVG9TcGhlcmUodCl7cmV0dXJuIHRoaXMuZGlzdGFuY2VUb1BvaW50KHQuY2VudGVyKS10LnJhZGl1c31wcm9qZWN0UG9pbnQodCxlKXtyZXR1cm4gZS5jb3B5KHRoaXMubm9ybWFsKS5tdWx0aXBseVNjYWxhcigtdGhpcy5kaXN0YW5jZVRvUG9pbnQodCkpLmFkZCh0KX1pbnRlcnNlY3RMaW5lKHQsZSl7Y29uc3Qgcz10LmRlbHRhKEVpKSxpPXRoaXMubm9ybWFsLmRvdChzKTtpZihpPT09MClyZXR1cm4gdGhpcy5kaXN0YW5jZVRvUG9pbnQodC5zdGFydCk9PT0wP2UuY29weSh0LnN0YXJ0KTpudWxsO2NvbnN0IG49LSh0LnN0YXJ0LmRvdCh0aGlzLm5vcm1hbCkrdGhpcy5jb25zdGFudCkvaTtyZXR1cm4gbjwwfHxuPjE/bnVsbDplLmNvcHkocykubXVsdGlwbHlTY2FsYXIobikuYWRkKHQuc3RhcnQpfWludGVyc2VjdHNMaW5lKHQpe2NvbnN0IGU9dGhpcy5kaXN0YW5jZVRvUG9pbnQodC5zdGFydCkscz10aGlzLmRpc3RhbmNlVG9Qb2ludCh0LmVuZCk7cmV0dXJuIGU8MCYmcz4wfHxzPDAmJmU+MH1pbnRlcnNlY3RzQm94KHQpe3JldHVybiB0LmludGVyc2VjdHNQbGFuZSh0aGlzKX1pbnRlcnNlY3RzU3BoZXJlKHQpe3JldHVybiB0LmludGVyc2VjdHNQbGFuZSh0aGlzKX1jb3BsYW5hclBvaW50KHQpe3JldHVybiB0LmNvcHkodGhpcy5ub3JtYWwpLm11bHRpcGx5U2NhbGFyKC10aGlzLmNvbnN0YW50KX1hcHBseU1hdHJpeDQodCxlKXtjb25zdCBzPWV8fEhhLmdldE5vcm1hbE1hdHJpeCh0KSxpPXRoaXMuY29wbGFuYXJQb2ludChFaSkuYXBwbHlNYXRyaXg0KHQpLG49dGhpcy5ub3JtYWwuYXBwbHlNYXRyaXgzKHMpLm5vcm1hbGl6ZSgpO3JldHVybiB0aGlzLmNvbnN0YW50PS1pLmRvdChuKSx0aGlzfXRyYW5zbGF0ZSh0KXtyZXR1cm4gdGhpcy5jb25zdGFudC09dC5kb3QodGhpcy5ub3JtYWwpLHRoaXN9ZXF1YWxzKHQpe3JldHVybiB0Lm5vcm1hbC5lcXVhbHModGhpcy5ub3JtYWwpJiZ0LmNvbnN0YW50PT09dGhpcy5jb25zdGFudH1jbG9uZSgpe3JldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcigpLmNvcHkodGhpcyl9fWNvbnN0IGNlPW5ldyBwdCx1cz1uZXcgeDtjbGFzcyBqYXtjb25zdHJ1Y3Rvcih0PW5ldyBoZSxlPW5ldyBoZSxzPW5ldyBoZSxpPW5ldyBoZSxuPW5ldyBoZSxyPW5ldyBoZSl7dGhpcy5wbGFuZXM9W3QsZSxzLGksbixyXX1zZXQodCxlLHMsaSxuLHIpe2NvbnN0IG89dGhpcy5wbGFuZXM7cmV0dXJuIG9bMF0uY29weSh0KSxvWzFdLmNvcHkoZSksb1syXS5jb3B5KHMpLG9bM10uY29weShpKSxvWzRdLmNvcHkobiksb1s1XS5jb3B5KHIpLHRoaXN9Y29weSh0KXtjb25zdCBlPXRoaXMucGxhbmVzO2ZvcihsZXQgcz0wO3M8NjtzKyspZVtzXS5jb3B5KHQucGxhbmVzW3NdKTtyZXR1cm4gdGhpc31zZXRGcm9tUHJvamVjdGlvbk1hdHJpeCh0KXtjb25zdCBlPXRoaXMucGxhbmVzLHM9dC5lbGVtZW50cyxpPXNbMF0sbj1zWzFdLHI9c1syXSxvPXNbM10sYT1zWzRdLGg9c1s1XSxsPXNbNl0sdT1zWzddLGQ9c1s4XSxmPXNbOV0scD1zWzEwXSxtPXNbMTFdLGc9c1sxMl0seT1zWzEzXSxNPXNbMTRdLHc9c1sxNV07cmV0dXJuIGVbMF0uc2V0Q29tcG9uZW50cyhvLWksdS1hLG0tZCx3LWcpLm5vcm1hbGl6ZSgpLGVbMV0uc2V0Q29tcG9uZW50cyhvK2ksdSthLG0rZCx3K2cpLm5vcm1hbGl6ZSgpLGVbMl0uc2V0Q29tcG9uZW50cyhvK24sdStoLG0rZix3K3kpLm5vcm1hbGl6ZSgpLGVbM10uc2V0Q29tcG9uZW50cyhvLW4sdS1oLG0tZix3LXkpLm5vcm1hbGl6ZSgpLGVbNF0uc2V0Q29tcG9uZW50cyhvLXIsdS1sLG0tcCx3LU0pLm5vcm1hbGl6ZSgpLGVbNV0uc2V0Q29tcG9uZW50cyhvK3IsdStsLG0rcCx3K00pLm5vcm1hbGl6ZSgpLHRoaXN9aW50ZXJzZWN0c09iamVjdCh0KXtjb25zdCBlPXQuZ2VvbWV0cnk7cmV0dXJuIGUuYm91bmRpbmdTcGhlcmU9PT1udWxsJiZlLmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpLGNlLmNvcHkoZS5ib3VuZGluZ1NwaGVyZSkuYXBwbHlNYXRyaXg0KHQubWF0cml4V29ybGQpLHRoaXMuaW50ZXJzZWN0c1NwaGVyZShjZSl9aW50ZXJzZWN0c1Nwcml0ZSh0KXtyZXR1cm4gY2UuY2VudGVyLnNldCgwLDAsMCksY2UucmFkaXVzPS43MDcxMDY3ODExODY1NDc2LGNlLmFwcGx5TWF0cml4NCh0Lm1hdHJpeFdvcmxkKSx0aGlzLmludGVyc2VjdHNTcGhlcmUoY2UpfWludGVyc2VjdHNTcGhlcmUodCl7Y29uc3QgZT10aGlzLnBsYW5lcyxzPXQuY2VudGVyLGk9LXQucmFkaXVzO2ZvcihsZXQgbj0wO248NjtuKyspaWYoZVtuXS5kaXN0YW5jZVRvUG9pbnQocyk8aSlyZXR1cm4hMTtyZXR1cm4hMH1pbnRlcnNlY3RzQm94KHQpe2NvbnN0IGU9dGhpcy5wbGFuZXM7Zm9yKGxldCBzPTA7czw2O3MrKyl7Y29uc3QgaT1lW3NdO2lmKHVzLng9aS5ub3JtYWwueD4wP3QubWF4Lng6dC5taW4ueCx1cy55PWkubm9ybWFsLnk+MD90Lm1heC55OnQubWluLnksdXMuej1pLm5vcm1hbC56PjA/dC5tYXguejp0Lm1pbi56LGkuZGlzdGFuY2VUb1BvaW50KHVzKTwwKXJldHVybiExfXJldHVybiEwfWNvbnRhaW5zUG9pbnQodCl7Y29uc3QgZT10aGlzLnBsYW5lcztmb3IobGV0IHM9MDtzPDY7cysrKWlmKGVbc10uZGlzdGFuY2VUb1BvaW50KHQpPDApcmV0dXJuITE7cmV0dXJuITB9Y2xvbmUoKXtyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoKS5jb3B5KHRoaXMpfX1jbGFzcyB0ciBleHRlbmRzIFFue2NvbnN0cnVjdG9yKHQ9LTEsZT0xLHM9MSxpPS0xLG49LjEscj0yZTMpe3N1cGVyKCksdGhpcy5pc09ydGhvZ3JhcGhpY0NhbWVyYT0hMCx0aGlzLnR5cGU9Ik9ydGhvZ3JhcGhpY0NhbWVyYSIsdGhpcy56b29tPTEsdGhpcy52aWV3PW51bGwsdGhpcy5sZWZ0PXQsdGhpcy5yaWdodD1lLHRoaXMudG9wPXMsdGhpcy5ib3R0b209aSx0aGlzLm5lYXI9bix0aGlzLmZhcj1yLHRoaXMudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpfWNvcHkodCxlKXtyZXR1cm4gc3VwZXIuY29weSh0LGUpLHRoaXMubGVmdD10LmxlZnQsdGhpcy5yaWdodD10LnJpZ2h0LHRoaXMudG9wPXQudG9wLHRoaXMuYm90dG9tPXQuYm90dG9tLHRoaXMubmVhcj10Lm5lYXIsdGhpcy5mYXI9dC5mYXIsdGhpcy56b29tPXQuem9vbSx0aGlzLnZpZXc9dC52aWV3PT09bnVsbD9udWxsOk9iamVjdC5hc3NpZ24oe30sdC52aWV3KSx0aGlzfXNldFZpZXdPZmZzZXQodCxlLHMsaSxuLHIpe3RoaXMudmlldz09PW51bGwmJih0aGlzLnZpZXc9e2VuYWJsZWQ6ITAsZnVsbFdpZHRoOjEsZnVsbEhlaWdodDoxLG9mZnNldFg6MCxvZmZzZXRZOjAsd2lkdGg6MSxoZWlnaHQ6MX0pLHRoaXMudmlldy5lbmFibGVkPSEwLHRoaXMudmlldy5mdWxsV2lkdGg9dCx0aGlzLnZpZXcuZnVsbEhlaWdodD1lLHRoaXMudmlldy5vZmZzZXRYPXMsdGhpcy52aWV3Lm9mZnNldFk9aSx0aGlzLnZpZXcud2lkdGg9bix0aGlzLnZpZXcuaGVpZ2h0PXIsdGhpcy51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCl9Y2xlYXJWaWV3T2Zmc2V0KCl7dGhpcy52aWV3IT09bnVsbCYmKHRoaXMudmlldy5lbmFibGVkPSExKSx0aGlzLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKX11cGRhdGVQcm9qZWN0aW9uTWF0cml4KCl7Y29uc3QgdD0odGhpcy5yaWdodC10aGlzLmxlZnQpLygyKnRoaXMuem9vbSksZT0odGhpcy50b3AtdGhpcy5ib3R0b20pLygyKnRoaXMuem9vbSkscz0odGhpcy5yaWdodCt0aGlzLmxlZnQpLzIsaT0odGhpcy50b3ArdGhpcy5ib3R0b20pLzI7bGV0IG49cy10LHI9cyt0LG89aStlLGE9aS1lO2lmKHRoaXMudmlldyE9PW51bGwmJnRoaXMudmlldy5lbmFibGVkKXtjb25zdCBoPSh0aGlzLnJpZ2h0LXRoaXMubGVmdCkvdGhpcy52aWV3LmZ1bGxXaWR0aC90aGlzLnpvb20sbD0odGhpcy50b3AtdGhpcy5ib3R0b20pL3RoaXMudmlldy5mdWxsSGVpZ2h0L3RoaXMuem9vbTtuKz1oKnRoaXMudmlldy5vZmZzZXRYLHI9bitoKnRoaXMudmlldy53aWR0aCxvLT1sKnRoaXMudmlldy5vZmZzZXRZLGE9by1sKnRoaXMudmlldy5oZWlnaHR9dGhpcy5wcm9qZWN0aW9uTWF0cml4Lm1ha2VPcnRob2dyYXBoaWMobixyLG8sYSx0aGlzLm5lYXIsdGhpcy5mYXIpLHRoaXMucHJvamVjdGlvbk1hdHJpeEludmVyc2UuY29weSh0aGlzLnByb2plY3Rpb25NYXRyaXgpLmludmVydCgpfXRvSlNPTih0KXtjb25zdCBlPXN1cGVyLnRvSlNPTih0KTtyZXR1cm4gZS5vYmplY3Quem9vbT10aGlzLnpvb20sZS5vYmplY3QubGVmdD10aGlzLmxlZnQsZS5vYmplY3QucmlnaHQ9dGhpcy5yaWdodCxlLm9iamVjdC50b3A9dGhpcy50b3AsZS5vYmplY3QuYm90dG9tPXRoaXMuYm90dG9tLGUub2JqZWN0Lm5lYXI9dGhpcy5uZWFyLGUub2JqZWN0LmZhcj10aGlzLmZhcix0aGlzLnZpZXchPT1udWxsJiYoZS5vYmplY3Qudmlldz1PYmplY3QuYXNzaWduKHt9LHRoaXMudmlldykpLGV9fWNsYXNzIHZpIGV4dGVuZHMgantjb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5pc0dyb3VwPSEwLHRoaXMudHlwZT0iR3JvdXAifX1jbGFzcyBXYXtjb25zdHJ1Y3Rvcih0LGUpe3RoaXMuaXNJbnRlcmxlYXZlZEJ1ZmZlcj0hMCx0aGlzLmFycmF5PXQsdGhpcy5zdHJpZGU9ZSx0aGlzLmNvdW50PXQhPT12b2lkIDA/dC5sZW5ndGgvZTowLHRoaXMudXNhZ2U9UXMsdGhpcy51cGRhdGVSYW5nZT17b2Zmc2V0OjAsY291bnQ6LTF9LHRoaXMudmVyc2lvbj0wLHRoaXMudXVpZD1pdCgpfW9uVXBsb2FkQ2FsbGJhY2soKXt9c2V0IG5lZWRzVXBkYXRlKHQpe3Q9PT0hMCYmdGhpcy52ZXJzaW9uKyt9c2V0VXNhZ2UodCl7cmV0dXJuIHRoaXMudXNhZ2U9dCx0aGlzfWNvcHkodCl7cmV0dXJuIHRoaXMuYXJyYXk9bmV3IHQuYXJyYXkuY29uc3RydWN0b3IodC5hcnJheSksdGhpcy5jb3VudD10LmNvdW50LHRoaXMuc3RyaWRlPXQuc3RyaWRlLHRoaXMudXNhZ2U9dC51c2FnZSx0aGlzfWNvcHlBdCh0LGUscyl7dCo9dGhpcy5zdHJpZGUscyo9ZS5zdHJpZGU7Zm9yKGxldCBpPTAsbj10aGlzLnN0cmlkZTtpPG47aSsrKXRoaXMuYXJyYXlbdCtpXT1lLmFycmF5W3MraV07cmV0dXJuIHRoaXN9c2V0KHQsZT0wKXtyZXR1cm4gdGhpcy5hcnJheS5zZXQodCxlKSx0aGlzfWNsb25lKHQpe3QuYXJyYXlCdWZmZXJzPT09dm9pZCAwJiYodC5hcnJheUJ1ZmZlcnM9e30pLHRoaXMuYXJyYXkuYnVmZmVyLl91dWlkPT09dm9pZCAwJiYodGhpcy5hcnJheS5idWZmZXIuX3V1aWQ9aXQoKSksdC5hcnJheUJ1ZmZlcnNbdGhpcy5hcnJheS5idWZmZXIuX3V1aWRdPT09dm9pZCAwJiYodC5hcnJheUJ1ZmZlcnNbdGhpcy5hcnJheS5idWZmZXIuX3V1aWRdPXRoaXMuYXJyYXkuc2xpY2UoMCkuYnVmZmVyKTtjb25zdCBlPW5ldyB0aGlzLmFycmF5LmNvbnN0cnVjdG9yKHQuYXJyYXlCdWZmZXJzW3RoaXMuYXJyYXkuYnVmZmVyLl91dWlkXSkscz1uZXcgdGhpcy5jb25zdHJ1Y3RvcihlLHRoaXMuc3RyaWRlKTtyZXR1cm4gcy5zZXRVc2FnZSh0aGlzLnVzYWdlKSxzfW9uVXBsb2FkKHQpe3JldHVybiB0aGlzLm9uVXBsb2FkQ2FsbGJhY2s9dCx0aGlzfXRvSlNPTih0KXtyZXR1cm4gdC5hcnJheUJ1ZmZlcnM9PT12b2lkIDAmJih0LmFycmF5QnVmZmVycz17fSksdGhpcy5hcnJheS5idWZmZXIuX3V1aWQ9PT12b2lkIDAmJih0aGlzLmFycmF5LmJ1ZmZlci5fdXVpZD1pdCgpKSx0LmFycmF5QnVmZmVyc1t0aGlzLmFycmF5LmJ1ZmZlci5fdXVpZF09PT12b2lkIDAmJih0LmFycmF5QnVmZmVyc1t0aGlzLmFycmF5LmJ1ZmZlci5fdXVpZF09QXJyYXkuZnJvbShuZXcgVWludDMyQXJyYXkodGhpcy5hcnJheS5idWZmZXIpKSkse3V1aWQ6dGhpcy51dWlkLGJ1ZmZlcjp0aGlzLmFycmF5LmJ1ZmZlci5fdXVpZCx0eXBlOnRoaXMuYXJyYXkuY29uc3RydWN0b3IubmFtZSxzdHJpZGU6dGhpcy5zdHJpZGV9fX1jb25zdCBYPW5ldyB4O2NsYXNzIHppe2NvbnN0cnVjdG9yKHQsZSxzLGk9ITEpe3RoaXMuaXNJbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZT0hMCx0aGlzLm5hbWU9IiIsdGhpcy5kYXRhPXQsdGhpcy5pdGVtU2l6ZT1lLHRoaXMub2Zmc2V0PXMsdGhpcy5ub3JtYWxpemVkPWk9PT0hMH1nZXQgY291bnQoKXtyZXR1cm4gdGhpcy5kYXRhLmNvdW50fWdldCBhcnJheSgpe3JldHVybiB0aGlzLmRhdGEuYXJyYXl9c2V0IG5lZWRzVXBkYXRlKHQpe3RoaXMuZGF0YS5uZWVkc1VwZGF0ZT10fWFwcGx5TWF0cml4NCh0KXtmb3IobGV0IGU9MCxzPXRoaXMuZGF0YS5jb3VudDtlPHM7ZSsrKVguZnJvbUJ1ZmZlckF0dHJpYnV0ZSh0aGlzLGUpLFguYXBwbHlNYXRyaXg0KHQpLHRoaXMuc2V0WFlaKGUsWC54LFgueSxYLnopO3JldHVybiB0aGlzfWFwcGx5Tm9ybWFsTWF0cml4KHQpe2ZvcihsZXQgZT0wLHM9dGhpcy5jb3VudDtlPHM7ZSsrKVguZnJvbUJ1ZmZlckF0dHJpYnV0ZSh0aGlzLGUpLFguYXBwbHlOb3JtYWxNYXRyaXgodCksdGhpcy5zZXRYWVooZSxYLngsWC55LFgueik7cmV0dXJuIHRoaXN9dHJhbnNmb3JtRGlyZWN0aW9uKHQpe2ZvcihsZXQgZT0wLHM9dGhpcy5jb3VudDtlPHM7ZSsrKVguZnJvbUJ1ZmZlckF0dHJpYnV0ZSh0aGlzLGUpLFgudHJhbnNmb3JtRGlyZWN0aW9uKHQpLHRoaXMuc2V0WFlaKGUsWC54LFgueSxYLnopO3JldHVybiB0aGlzfXNldFgodCxlKXtyZXR1cm4gdGhpcy5kYXRhLmFycmF5W3QqdGhpcy5kYXRhLnN0cmlkZSt0aGlzLm9mZnNldF09ZSx0aGlzfXNldFkodCxlKXtyZXR1cm4gdGhpcy5kYXRhLmFycmF5W3QqdGhpcy5kYXRhLnN0cmlkZSt0aGlzLm9mZnNldCsxXT1lLHRoaXN9c2V0Wih0LGUpe3JldHVybiB0aGlzLmRhdGEuYXJyYXlbdCp0aGlzLmRhdGEuc3RyaWRlK3RoaXMub2Zmc2V0KzJdPWUsdGhpc31zZXRXKHQsZSl7cmV0dXJuIHRoaXMuZGF0YS5hcnJheVt0KnRoaXMuZGF0YS5zdHJpZGUrdGhpcy5vZmZzZXQrM109ZSx0aGlzfWdldFgodCl7cmV0dXJuIHRoaXMuZGF0YS5hcnJheVt0KnRoaXMuZGF0YS5zdHJpZGUrdGhpcy5vZmZzZXRdfWdldFkodCl7cmV0dXJuIHRoaXMuZGF0YS5hcnJheVt0KnRoaXMuZGF0YS5zdHJpZGUrdGhpcy5vZmZzZXQrMV19Z2V0Wih0KXtyZXR1cm4gdGhpcy5kYXRhLmFycmF5W3QqdGhpcy5kYXRhLnN0cmlkZSt0aGlzLm9mZnNldCsyXX1nZXRXKHQpe3JldHVybiB0aGlzLmRhdGEuYXJyYXlbdCp0aGlzLmRhdGEuc3RyaWRlK3RoaXMub2Zmc2V0KzNdfXNldFhZKHQsZSxzKXtyZXR1cm4gdD10KnRoaXMuZGF0YS5zdHJpZGUrdGhpcy5vZmZzZXQsdGhpcy5kYXRhLmFycmF5W3QrMF09ZSx0aGlzLmRhdGEuYXJyYXlbdCsxXT1zLHRoaXN9c2V0WFlaKHQsZSxzLGkpe3JldHVybiB0PXQqdGhpcy5kYXRhLnN0cmlkZSt0aGlzLm9mZnNldCx0aGlzLmRhdGEuYXJyYXlbdCswXT1lLHRoaXMuZGF0YS5hcnJheVt0KzFdPXMsdGhpcy5kYXRhLmFycmF5W3QrMl09aSx0aGlzfXNldFhZWlcodCxlLHMsaSxuKXtyZXR1cm4gdD10KnRoaXMuZGF0YS5zdHJpZGUrdGhpcy5vZmZzZXQsdGhpcy5kYXRhLmFycmF5W3QrMF09ZSx0aGlzLmRhdGEuYXJyYXlbdCsxXT1zLHRoaXMuZGF0YS5hcnJheVt0KzJdPWksdGhpcy5kYXRhLmFycmF5W3QrM109bix0aGlzfWNsb25lKHQpe2lmKHQ9PT12b2lkIDApe2NvbnNvbGUubG9nKCJUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZS5jbG9uZSgpOiBDbG9uaW5nIGFuIGludGVybGVhdmVkIGJ1ZmZlciBhdHRyaWJ1dGUgd2lsbCBkZWludGVybGVhdmUgYnVmZmVyIGRhdGEuIik7Y29uc3QgZT1bXTtmb3IobGV0IHM9MDtzPHRoaXMuY291bnQ7cysrKXtjb25zdCBpPXMqdGhpcy5kYXRhLnN0cmlkZSt0aGlzLm9mZnNldDtmb3IobGV0IG49MDtuPHRoaXMuaXRlbVNpemU7bisrKWUucHVzaCh0aGlzLmRhdGEuYXJyYXlbaStuXSl9cmV0dXJuIG5ldyB3dChuZXcgdGhpcy5hcnJheS5jb25zdHJ1Y3RvcihlKSx0aGlzLml0ZW1TaXplLHRoaXMubm9ybWFsaXplZCl9ZWxzZSByZXR1cm4gdC5pbnRlcmxlYXZlZEJ1ZmZlcnM9PT12b2lkIDAmJih0LmludGVybGVhdmVkQnVmZmVycz17fSksdC5pbnRlcmxlYXZlZEJ1ZmZlcnNbdGhpcy5kYXRhLnV1aWRdPT09dm9pZCAwJiYodC5pbnRlcmxlYXZlZEJ1ZmZlcnNbdGhpcy5kYXRhLnV1aWRdPXRoaXMuZGF0YS5jbG9uZSh0KSksbmV3IHppKHQuaW50ZXJsZWF2ZWRCdWZmZXJzW3RoaXMuZGF0YS51dWlkXSx0aGlzLml0ZW1TaXplLHRoaXMub2Zmc2V0LHRoaXMubm9ybWFsaXplZCl9dG9KU09OKHQpe2lmKHQ9PT12b2lkIDApe2NvbnNvbGUubG9nKCJUSFJFRS5JbnRlcmxlYXZlZEJ1ZmZlckF0dHJpYnV0ZS50b0pTT04oKTogU2VyaWFsaXppbmcgYW4gaW50ZXJsZWF2ZWQgYnVmZmVyIGF0dHJpYnV0ZSB3aWxsIGRlaW50ZXJsZWF2ZSBidWZmZXIgZGF0YS4iKTtjb25zdCBlPVtdO2ZvcihsZXQgcz0wO3M8dGhpcy5jb3VudDtzKyspe2NvbnN0IGk9cyp0aGlzLmRhdGEuc3RyaWRlK3RoaXMub2Zmc2V0O2ZvcihsZXQgbj0wO248dGhpcy5pdGVtU2l6ZTtuKyspZS5wdXNoKHRoaXMuZGF0YS5hcnJheVtpK25dKX1yZXR1cm57aXRlbVNpemU6dGhpcy5pdGVtU2l6ZSx0eXBlOnRoaXMuYXJyYXkuY29uc3RydWN0b3IubmFtZSxhcnJheTplLG5vcm1hbGl6ZWQ6dGhpcy5ub3JtYWxpemVkfX1lbHNlIHJldHVybiB0LmludGVybGVhdmVkQnVmZmVycz09PXZvaWQgMCYmKHQuaW50ZXJsZWF2ZWRCdWZmZXJzPXt9KSx0LmludGVybGVhdmVkQnVmZmVyc1t0aGlzLmRhdGEudXVpZF09PT12b2lkIDAmJih0LmludGVybGVhdmVkQnVmZmVyc1t0aGlzLmRhdGEudXVpZF09dGhpcy5kYXRhLnRvSlNPTih0KSkse2lzSW50ZXJsZWF2ZWRCdWZmZXJBdHRyaWJ1dGU6ITAsaXRlbVNpemU6dGhpcy5pdGVtU2l6ZSxkYXRhOnRoaXMuZGF0YS51dWlkLG9mZnNldDp0aGlzLm9mZnNldCxub3JtYWxpemVkOnRoaXMubm9ybWFsaXplZH19fWNvbnN0IGVyPW5ldyB4LHNyPW5ldyBLLGlyPW5ldyBLLEdhPW5ldyB4LG5yPW5ldyBCO2NsYXNzIHFhIGV4dGVuZHMgQWl7Y29uc3RydWN0b3IodCxlKXtzdXBlcih0LGUpLHRoaXMuaXNTa2lubmVkTWVzaD0hMCx0aGlzLnR5cGU9IlNraW5uZWRNZXNoIix0aGlzLmJpbmRNb2RlPSJhdHRhY2hlZCIsdGhpcy5iaW5kTWF0cml4PW5ldyBCLHRoaXMuYmluZE1hdHJpeEludmVyc2U9bmV3IEJ9Y29weSh0LGUpe3JldHVybiBzdXBlci5jb3B5KHQsZSksdGhpcy5iaW5kTW9kZT10LmJpbmRNb2RlLHRoaXMuYmluZE1hdHJpeC5jb3B5KHQuYmluZE1hdHJpeCksdGhpcy5iaW5kTWF0cml4SW52ZXJzZS5jb3B5KHQuYmluZE1hdHJpeEludmVyc2UpLHRoaXMuc2tlbGV0b249dC5za2VsZXRvbix0aGlzfWJpbmQodCxlKXt0aGlzLnNrZWxldG9uPXQsZT09PXZvaWQgMCYmKHRoaXMudXBkYXRlTWF0cml4V29ybGQoITApLHRoaXMuc2tlbGV0b24uY2FsY3VsYXRlSW52ZXJzZXMoKSxlPXRoaXMubWF0cml4V29ybGQpLHRoaXMuYmluZE1hdHJpeC5jb3B5KGUpLHRoaXMuYmluZE1hdHJpeEludmVyc2UuY29weShlKS5pbnZlcnQoKX1wb3NlKCl7dGhpcy5za2VsZXRvbi5wb3NlKCl9bm9ybWFsaXplU2tpbldlaWdodHMoKXtjb25zdCB0PW5ldyBLLGU9dGhpcy5nZW9tZXRyeS5hdHRyaWJ1dGVzLnNraW5XZWlnaHQ7Zm9yKGxldCBzPTAsaT1lLmNvdW50O3M8aTtzKyspe3QuZnJvbUJ1ZmZlckF0dHJpYnV0ZShlLHMpO2NvbnN0IG49MS90Lm1hbmhhdHRhbkxlbmd0aCgpO24hPT0xLzA/dC5tdWx0aXBseVNjYWxhcihuKTp0LnNldCgxLDAsMCwwKSxlLnNldFhZWlcocyx0LngsdC55LHQueix0LncpfX11cGRhdGVNYXRyaXhXb3JsZCh0KXtzdXBlci51cGRhdGVNYXRyaXhXb3JsZCh0KSx0aGlzLmJpbmRNb2RlPT09ImF0dGFjaGVkIj90aGlzLmJpbmRNYXRyaXhJbnZlcnNlLmNvcHkodGhpcy5tYXRyaXhXb3JsZCkuaW52ZXJ0KCk6dGhpcy5iaW5kTW9kZT09PSJkZXRhY2hlZCI/dGhpcy5iaW5kTWF0cml4SW52ZXJzZS5jb3B5KHRoaXMuYmluZE1hdHJpeCkuaW52ZXJ0KCk6Y29uc29sZS53YXJuKCJUSFJFRS5Ta2lubmVkTWVzaDogVW5yZWNvZ25pemVkIGJpbmRNb2RlOiAiK3RoaXMuYmluZE1vZGUpfWJvbmVUcmFuc2Zvcm0odCxlKXtjb25zdCBzPXRoaXMuc2tlbGV0b24saT10aGlzLmdlb21ldHJ5O3NyLmZyb21CdWZmZXJBdHRyaWJ1dGUoaS5hdHRyaWJ1dGVzLnNraW5JbmRleCx0KSxpci5mcm9tQnVmZmVyQXR0cmlidXRlKGkuYXR0cmlidXRlcy5za2luV2VpZ2h0LHQpLGVyLmNvcHkoZSkuYXBwbHlNYXRyaXg0KHRoaXMuYmluZE1hdHJpeCksZS5zZXQoMCwwLDApO2ZvcihsZXQgbj0wO248NDtuKyspe2NvbnN0IHI9aXIuZ2V0Q29tcG9uZW50KG4pO2lmKHIhPT0wKXtjb25zdCBvPXNyLmdldENvbXBvbmVudChuKTtuci5tdWx0aXBseU1hdHJpY2VzKHMuYm9uZXNbb10ubWF0cml4V29ybGQscy5ib25lSW52ZXJzZXNbb10pLGUuYWRkU2NhbGVkVmVjdG9yKEdhLmNvcHkoZXIpLmFwcGx5TWF0cml4NChucikscil9fXJldHVybiBlLmFwcGx5TWF0cml4NCh0aGlzLmJpbmRNYXRyaXhJbnZlcnNlKX19Y2xhc3MgcnIgZXh0ZW5kcyBqe2NvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLmlzQm9uZT0hMCx0aGlzLnR5cGU9IkJvbmUifX1jbGFzcyBaYSBleHRlbmRzIEF0e2NvbnN0cnVjdG9yKHQ9bnVsbCxlPTEscz0xLGksbixyLG8sYSxoPVpzLGw9WnMsdSxkKXtzdXBlcihudWxsLHIsbyxhLGgsbCxpLG4sdSxkKSx0aGlzLmlzRGF0YVRleHR1cmU9ITAsdGhpcy5pbWFnZT17ZGF0YTp0LHdpZHRoOmUsaGVpZ2h0OnN9LHRoaXMuZ2VuZXJhdGVNaXBtYXBzPSExLHRoaXMuZmxpcFk9ITEsdGhpcy51bnBhY2tBbGlnbm1lbnQ9MX19Y29uc3Qgb3I9bmV3IEIsWGE9bmV3IEI7Y2xhc3MgUml7Y29uc3RydWN0b3IodD1bXSxlPVtdKXt0aGlzLnV1aWQ9aXQoKSx0aGlzLmJvbmVzPXQuc2xpY2UoMCksdGhpcy5ib25lSW52ZXJzZXM9ZSx0aGlzLmJvbmVNYXRyaWNlcz1udWxsLHRoaXMuYm9uZVRleHR1cmU9bnVsbCx0aGlzLmJvbmVUZXh0dXJlU2l6ZT0wLHRoaXMuZnJhbWU9LTEsdGhpcy5pbml0KCl9aW5pdCgpe2NvbnN0IHQ9dGhpcy5ib25lcyxlPXRoaXMuYm9uZUludmVyc2VzO2lmKHRoaXMuYm9uZU1hdHJpY2VzPW5ldyBGbG9hdDMyQXJyYXkodC5sZW5ndGgqMTYpLGUubGVuZ3RoPT09MCl0aGlzLmNhbGN1bGF0ZUludmVyc2VzKCk7ZWxzZSBpZih0Lmxlbmd0aCE9PWUubGVuZ3RoKXtjb25zb2xlLndhcm4oIlRIUkVFLlNrZWxldG9uOiBOdW1iZXIgb2YgaW52ZXJzZSBib25lIG1hdHJpY2VzIGRvZXMgbm90IG1hdGNoIGFtb3VudCBvZiBib25lcy4iKSx0aGlzLmJvbmVJbnZlcnNlcz1bXTtmb3IobGV0IHM9MCxpPXRoaXMuYm9uZXMubGVuZ3RoO3M8aTtzKyspdGhpcy5ib25lSW52ZXJzZXMucHVzaChuZXcgQil9fWNhbGN1bGF0ZUludmVyc2VzKCl7dGhpcy5ib25lSW52ZXJzZXMubGVuZ3RoPTA7Zm9yKGxldCB0PTAsZT10aGlzLmJvbmVzLmxlbmd0aDt0PGU7dCsrKXtjb25zdCBzPW5ldyBCO3RoaXMuYm9uZXNbdF0mJnMuY29weSh0aGlzLmJvbmVzW3RdLm1hdHJpeFdvcmxkKS5pbnZlcnQoKSx0aGlzLmJvbmVJbnZlcnNlcy5wdXNoKHMpfX1wb3NlKCl7Zm9yKGxldCB0PTAsZT10aGlzLmJvbmVzLmxlbmd0aDt0PGU7dCsrKXtjb25zdCBzPXRoaXMuYm9uZXNbdF07cyYmcy5tYXRyaXhXb3JsZC5jb3B5KHRoaXMuYm9uZUludmVyc2VzW3RdKS5pbnZlcnQoKX1mb3IobGV0IHQ9MCxlPXRoaXMuYm9uZXMubGVuZ3RoO3Q8ZTt0Kyspe2NvbnN0IHM9dGhpcy5ib25lc1t0XTtzJiYocy5wYXJlbnQmJnMucGFyZW50LmlzQm9uZT8ocy5tYXRyaXguY29weShzLnBhcmVudC5tYXRyaXhXb3JsZCkuaW52ZXJ0KCkscy5tYXRyaXgubXVsdGlwbHkocy5tYXRyaXhXb3JsZCkpOnMubWF0cml4LmNvcHkocy5tYXRyaXhXb3JsZCkscy5tYXRyaXguZGVjb21wb3NlKHMucG9zaXRpb24scy5xdWF0ZXJuaW9uLHMuc2NhbGUpKX19dXBkYXRlKCl7Y29uc3QgdD10aGlzLmJvbmVzLGU9dGhpcy5ib25lSW52ZXJzZXMscz10aGlzLmJvbmVNYXRyaWNlcyxpPXRoaXMuYm9uZVRleHR1cmU7Zm9yKGxldCBuPTAscj10Lmxlbmd0aDtuPHI7bisrKXtjb25zdCBvPXRbbl0/dFtuXS5tYXRyaXhXb3JsZDpYYTtvci5tdWx0aXBseU1hdHJpY2VzKG8sZVtuXSksb3IudG9BcnJheShzLG4qMTYpfWkhPT1udWxsJiYoaS5uZWVkc1VwZGF0ZT0hMCl9Y2xvbmUoKXtyZXR1cm4gbmV3IFJpKHRoaXMuYm9uZXMsdGhpcy5ib25lSW52ZXJzZXMpfWNvbXB1dGVCb25lVGV4dHVyZSgpe2xldCB0PU1hdGguc3FydCh0aGlzLmJvbmVzLmxlbmd0aCo0KTt0PVVuKHQpLHQ9TWF0aC5tYXgodCw0KTtjb25zdCBlPW5ldyBGbG9hdDMyQXJyYXkodCp0KjQpO2Uuc2V0KHRoaXMuYm9uZU1hdHJpY2VzKTtjb25zdCBzPW5ldyBaYShlLHQsdCwkcyx0YSk7cmV0dXJuIHMubmVlZHNVcGRhdGU9ITAsdGhpcy5ib25lTWF0cmljZXM9ZSx0aGlzLmJvbmVUZXh0dXJlPXMsdGhpcy5ib25lVGV4dHVyZVNpemU9dCx0aGlzfWdldEJvbmVCeU5hbWUodCl7Zm9yKGxldCBlPTAscz10aGlzLmJvbmVzLmxlbmd0aDtlPHM7ZSsrKXtjb25zdCBpPXRoaXMuYm9uZXNbZV07aWYoaS5uYW1lPT09dClyZXR1cm4gaX19ZGlzcG9zZSgpe3RoaXMuYm9uZVRleHR1cmUhPT1udWxsJiYodGhpcy5ib25lVGV4dHVyZS5kaXNwb3NlKCksdGhpcy5ib25lVGV4dHVyZT1udWxsKX1mcm9tSlNPTih0LGUpe3RoaXMudXVpZD10LnV1aWQ7Zm9yKGxldCBzPTAsaT10LmJvbmVzLmxlbmd0aDtzPGk7cysrKXtjb25zdCBuPXQuYm9uZXNbc107bGV0IHI9ZVtuXTtyPT09dm9pZCAwJiYoY29uc29sZS53YXJuKCJUSFJFRS5Ta2VsZXRvbjogTm8gYm9uZSBmb3VuZCB3aXRoIFVVSUQ6IixuKSxyPW5ldyByciksdGhpcy5ib25lcy5wdXNoKHIpLHRoaXMuYm9uZUludmVyc2VzLnB1c2gobmV3IEIoKS5mcm9tQXJyYXkodC5ib25lSW52ZXJzZXNbc10pKX1yZXR1cm4gdGhpcy5pbml0KCksdGhpc310b0pTT04oKXtjb25zdCB0PXttZXRhZGF0YTp7dmVyc2lvbjo0LjUsdHlwZToiU2tlbGV0b24iLGdlbmVyYXRvcjoiU2tlbGV0b24udG9KU09OIn0sYm9uZXM6W10sYm9uZUludmVyc2VzOltdfTt0LnV1aWQ9dGhpcy51dWlkO2NvbnN0IGU9dGhpcy5ib25lcyxzPXRoaXMuYm9uZUludmVyc2VzO2ZvcihsZXQgaT0wLG49ZS5sZW5ndGg7aTxuO2krKyl7Y29uc3Qgcj1lW2ldO3QuYm9uZXMucHVzaChyLnV1aWQpO2NvbnN0IG89c1tpXTt0LmJvbmVJbnZlcnNlcy5wdXNoKG8udG9BcnJheSgpKX1yZXR1cm4gdH19Y2xhc3MgYXIgZXh0ZW5kcyBpZXtjb25zdHJ1Y3Rvcih0KXtzdXBlcigpLHRoaXMuaXNMaW5lQmFzaWNNYXRlcmlhbD0hMCx0aGlzLnR5cGU9IkxpbmVCYXNpY01hdGVyaWFsIix0aGlzLmNvbG9yPW5ldyBQKDE2Nzc3MjE1KSx0aGlzLmxpbmV3aWR0aD0xLHRoaXMubGluZWNhcD0icm91bmQiLHRoaXMubGluZWpvaW49InJvdW5kIix0aGlzLmZvZz0hMCx0aGlzLnNldFZhbHVlcyh0KX1jb3B5KHQpe3JldHVybiBzdXBlci5jb3B5KHQpLHRoaXMuY29sb3IuY29weSh0LmNvbG9yKSx0aGlzLmxpbmV3aWR0aD10LmxpbmV3aWR0aCx0aGlzLmxpbmVjYXA9dC5saW5lY2FwLHRoaXMubGluZWpvaW49dC5saW5lam9pbix0aGlzLmZvZz10LmZvZyx0aGlzfX1jb25zdCBocj1uZXcgeCxjcj1uZXcgeCxscj1uZXcgQixCaT1uZXcgZGksZHM9bmV3IHB0O2NsYXNzIExpIGV4dGVuZHMgantjb25zdHJ1Y3Rvcih0PW5ldyBvZSxlPW5ldyBhcil7c3VwZXIoKSx0aGlzLmlzTGluZT0hMCx0aGlzLnR5cGU9IkxpbmUiLHRoaXMuZ2VvbWV0cnk9dCx0aGlzLm1hdGVyaWFsPWUsdGhpcy51cGRhdGVNb3JwaFRhcmdldHMoKX1jb3B5KHQsZSl7cmV0dXJuIHN1cGVyLmNvcHkodCxlKSx0aGlzLm1hdGVyaWFsPXQubWF0ZXJpYWwsdGhpcy5nZW9tZXRyeT10Lmdlb21ldHJ5LHRoaXN9Y29tcHV0ZUxpbmVEaXN0YW5jZXMoKXtjb25zdCB0PXRoaXMuZ2VvbWV0cnk7aWYodC5pbmRleD09PW51bGwpe2NvbnN0IGU9dC5hdHRyaWJ1dGVzLnBvc2l0aW9uLHM9WzBdO2ZvcihsZXQgaT0xLG49ZS5jb3VudDtpPG47aSsrKWhyLmZyb21CdWZmZXJBdHRyaWJ1dGUoZSxpLTEpLGNyLmZyb21CdWZmZXJBdHRyaWJ1dGUoZSxpKSxzW2ldPXNbaS0xXSxzW2ldKz1oci5kaXN0YW5jZVRvKGNyKTt0LnNldEF0dHJpYnV0ZSgibGluZURpc3RhbmNlIixuZXcgZ2kocywxKSl9ZWxzZSBjb25zb2xlLndhcm4oIlRIUkVFLkxpbmUuY29tcHV0ZUxpbmVEaXN0YW5jZXMoKTogQ29tcHV0YXRpb24gb25seSBwb3NzaWJsZSB3aXRoIG5vbi1pbmRleGVkIEJ1ZmZlckdlb21ldHJ5LiIpO3JldHVybiB0aGlzfXJheWNhc3QodCxlKXtjb25zdCBzPXRoaXMuZ2VvbWV0cnksaT10aGlzLm1hdHJpeFdvcmxkLG49dC5wYXJhbXMuTGluZS50aHJlc2hvbGQscj1zLmRyYXdSYW5nZTtpZihzLmJvdW5kaW5nU3BoZXJlPT09bnVsbCYmcy5jb21wdXRlQm91bmRpbmdTcGhlcmUoKSxkcy5jb3B5KHMuYm91bmRpbmdTcGhlcmUpLGRzLmFwcGx5TWF0cml4NChpKSxkcy5yYWRpdXMrPW4sdC5yYXkuaW50ZXJzZWN0c1NwaGVyZShkcyk9PT0hMSlyZXR1cm47bHIuY29weShpKS5pbnZlcnQoKSxCaS5jb3B5KHQucmF5KS5hcHBseU1hdHJpeDQobHIpO2NvbnN0IG89bi8oKHRoaXMuc2NhbGUueCt0aGlzLnNjYWxlLnkrdGhpcy5zY2FsZS56KS8zKSxhPW8qbyxoPW5ldyB4LGw9bmV3IHgsdT1uZXcgeCxkPW5ldyB4LGY9dGhpcy5pc0xpbmVTZWdtZW50cz8yOjEscD1zLmluZGV4LGc9cy5hdHRyaWJ1dGVzLnBvc2l0aW9uO2lmKHAhPT1udWxsKXtjb25zdCB5PU1hdGgubWF4KDAsci5zdGFydCksTT1NYXRoLm1pbihwLmNvdW50LHIuc3RhcnQrci5jb3VudCk7Zm9yKGxldCB3PXksXz1NLTE7dzxfO3crPWYpe2NvbnN0IGI9cC5nZXRYKHcpLEE9cC5nZXRYKHcrMSk7aWYoaC5mcm9tQnVmZmVyQXR0cmlidXRlKGcsYiksbC5mcm9tQnVmZmVyQXR0cmlidXRlKGcsQSksQmkuZGlzdGFuY2VTcVRvU2VnbWVudChoLGwsZCx1KT5hKWNvbnRpbnVlO2QuYXBwbHlNYXRyaXg0KHRoaXMubWF0cml4V29ybGQpO2NvbnN0IHY9dC5yYXkub3JpZ2luLmRpc3RhbmNlVG8oZCk7djx0Lm5lYXJ8fHY+dC5mYXJ8fGUucHVzaCh7ZGlzdGFuY2U6dixwb2ludDp1LmNsb25lKCkuYXBwbHlNYXRyaXg0KHRoaXMubWF0cml4V29ybGQpLGluZGV4OncsZmFjZTpudWxsLGZhY2VJbmRleDpudWxsLG9iamVjdDp0aGlzfSl9fWVsc2V7Y29uc3QgeT1NYXRoLm1heCgwLHIuc3RhcnQpLE09TWF0aC5taW4oZy5jb3VudCxyLnN0YXJ0K3IuY291bnQpO2ZvcihsZXQgdz15LF89TS0xO3c8Xzt3Kz1mKXtpZihoLmZyb21CdWZmZXJBdHRyaWJ1dGUoZyx3KSxsLmZyb21CdWZmZXJBdHRyaWJ1dGUoZyx3KzEpLEJpLmRpc3RhbmNlU3FUb1NlZ21lbnQoaCxsLGQsdSk+YSljb250aW51ZTtkLmFwcGx5TWF0cml4NCh0aGlzLm1hdHJpeFdvcmxkKTtjb25zdCBBPXQucmF5Lm9yaWdpbi5kaXN0YW5jZVRvKGQpO0E8dC5uZWFyfHxBPnQuZmFyfHxlLnB1c2goe2Rpc3RhbmNlOkEscG9pbnQ6dS5jbG9uZSgpLmFwcGx5TWF0cml4NCh0aGlzLm1hdHJpeFdvcmxkKSxpbmRleDp3LGZhY2U6bnVsbCxmYWNlSW5kZXg6bnVsbCxvYmplY3Q6dGhpc30pfX19dXBkYXRlTW9ycGhUYXJnZXRzKCl7Y29uc3QgZT10aGlzLmdlb21ldHJ5Lm1vcnBoQXR0cmlidXRlcyxzPU9iamVjdC5rZXlzKGUpO2lmKHMubGVuZ3RoPjApe2NvbnN0IGk9ZVtzWzBdXTtpZihpIT09dm9pZCAwKXt0aGlzLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcz1bXSx0aGlzLm1vcnBoVGFyZ2V0RGljdGlvbmFyeT17fTtmb3IobGV0IG49MCxyPWkubGVuZ3RoO248cjtuKyspe2NvbnN0IG89aVtuXS5uYW1lfHxTdHJpbmcobik7dGhpcy5tb3JwaFRhcmdldEluZmx1ZW5jZXMucHVzaCgwKSx0aGlzLm1vcnBoVGFyZ2V0RGljdGlvbmFyeVtvXT1ufX19fX1jb25zdCB1cj1uZXcgeCxkcj1uZXcgeDtjbGFzcyB6ZSBleHRlbmRzIExpe2NvbnN0cnVjdG9yKHQsZSl7c3VwZXIodCxlKSx0aGlzLmlzTGluZVNlZ21lbnRzPSEwLHRoaXMudHlwZT0iTGluZVNlZ21lbnRzIn1jb21wdXRlTGluZURpc3RhbmNlcygpe2NvbnN0IHQ9dGhpcy5nZW9tZXRyeTtpZih0LmluZGV4PT09bnVsbCl7Y29uc3QgZT10LmF0dHJpYnV0ZXMucG9zaXRpb24scz1bXTtmb3IobGV0IGk9MCxuPWUuY291bnQ7aTxuO2krPTIpdXIuZnJvbUJ1ZmZlckF0dHJpYnV0ZShlLGkpLGRyLmZyb21CdWZmZXJBdHRyaWJ1dGUoZSxpKzEpLHNbaV09aT09PTA/MDpzW2ktMV0sc1tpKzFdPXNbaV0rdXIuZGlzdGFuY2VUbyhkcik7dC5zZXRBdHRyaWJ1dGUoImxpbmVEaXN0YW5jZSIsbmV3IGdpKHMsMSkpfWVsc2UgY29uc29sZS53YXJuKCJUSFJFRS5MaW5lU2VnbWVudHMuY29tcHV0ZUxpbmVEaXN0YW5jZXMoKTogQ29tcHV0YXRpb24gb25seSBwb3NzaWJsZSB3aXRoIG5vbi1pbmRleGVkIEJ1ZmZlckdlb21ldHJ5LiIpO3JldHVybiB0aGlzfX1jbGFzcyBZYSBleHRlbmRzIExpe2NvbnN0cnVjdG9yKHQsZSl7c3VwZXIodCxlKSx0aGlzLmlzTGluZUxvb3A9ITAsdGhpcy50eXBlPSJMaW5lTG9vcCJ9fWNsYXNzIGZyIGV4dGVuZHMgaWV7Y29uc3RydWN0b3IodCl7c3VwZXIoKSx0aGlzLmlzUG9pbnRzTWF0ZXJpYWw9ITAsdGhpcy50eXBlPSJQb2ludHNNYXRlcmlhbCIsdGhpcy5jb2xvcj1uZXcgUCgxNjc3NzIxNSksdGhpcy5tYXA9bnVsbCx0aGlzLmFscGhhTWFwPW51bGwsdGhpcy5zaXplPTEsdGhpcy5zaXplQXR0ZW51YXRpb249ITAsdGhpcy5mb2c9ITAsdGhpcy5zZXRWYWx1ZXModCl9Y29weSh0KXtyZXR1cm4gc3VwZXIuY29weSh0KSx0aGlzLmNvbG9yLmNvcHkodC5jb2xvciksdGhpcy5tYXA9dC5tYXAsdGhpcy5hbHBoYU1hcD10LmFscGhhTWFwLHRoaXMuc2l6ZT10LnNpemUsdGhpcy5zaXplQXR0ZW51YXRpb249dC5zaXplQXR0ZW51YXRpb24sdGhpcy5mb2c9dC5mb2csdGhpc319Y29uc3QgcHI9bmV3IEIsRmk9bmV3IGRpLGZzPW5ldyBwdCxwcz1uZXcgeDtjbGFzcyAkYSBleHRlbmRzIGp7Y29uc3RydWN0b3IodD1uZXcgb2UsZT1uZXcgZnIpe3N1cGVyKCksdGhpcy5pc1BvaW50cz0hMCx0aGlzLnR5cGU9IlBvaW50cyIsdGhpcy5nZW9tZXRyeT10LHRoaXMubWF0ZXJpYWw9ZSx0aGlzLnVwZGF0ZU1vcnBoVGFyZ2V0cygpfWNvcHkodCxlKXtyZXR1cm4gc3VwZXIuY29weSh0LGUpLHRoaXMubWF0ZXJpYWw9dC5tYXRlcmlhbCx0aGlzLmdlb21ldHJ5PXQuZ2VvbWV0cnksdGhpc31yYXljYXN0KHQsZSl7Y29uc3Qgcz10aGlzLmdlb21ldHJ5LGk9dGhpcy5tYXRyaXhXb3JsZCxuPXQucGFyYW1zLlBvaW50cy50aHJlc2hvbGQscj1zLmRyYXdSYW5nZTtpZihzLmJvdW5kaW5nU3BoZXJlPT09bnVsbCYmcy5jb21wdXRlQm91bmRpbmdTcGhlcmUoKSxmcy5jb3B5KHMuYm91bmRpbmdTcGhlcmUpLGZzLmFwcGx5TWF0cml4NChpKSxmcy5yYWRpdXMrPW4sdC5yYXkuaW50ZXJzZWN0c1NwaGVyZShmcyk9PT0hMSlyZXR1cm47cHIuY29weShpKS5pbnZlcnQoKSxGaS5jb3B5KHQucmF5KS5hcHBseU1hdHJpeDQocHIpO2NvbnN0IG89bi8oKHRoaXMuc2NhbGUueCt0aGlzLnNjYWxlLnkrdGhpcy5zY2FsZS56KS8zKSxhPW8qbyxoPXMuaW5kZXgsdT1zLmF0dHJpYnV0ZXMucG9zaXRpb247aWYoaCE9PW51bGwpe2NvbnN0IGQ9TWF0aC5tYXgoMCxyLnN0YXJ0KSxmPU1hdGgubWluKGguY291bnQsci5zdGFydCtyLmNvdW50KTtmb3IobGV0IHA9ZCxtPWY7cDxtO3ArKyl7Y29uc3QgZz1oLmdldFgocCk7cHMuZnJvbUJ1ZmZlckF0dHJpYnV0ZSh1LGcpLG1yKHBzLGcsYSxpLHQsZSx0aGlzKX19ZWxzZXtjb25zdCBkPU1hdGgubWF4KDAsci5zdGFydCksZj1NYXRoLm1pbih1LmNvdW50LHIuc3RhcnQrci5jb3VudCk7Zm9yKGxldCBwPWQsbT1mO3A8bTtwKyspcHMuZnJvbUJ1ZmZlckF0dHJpYnV0ZSh1LHApLG1yKHBzLHAsYSxpLHQsZSx0aGlzKX19dXBkYXRlTW9ycGhUYXJnZXRzKCl7Y29uc3QgZT10aGlzLmdlb21ldHJ5Lm1vcnBoQXR0cmlidXRlcyxzPU9iamVjdC5rZXlzKGUpO2lmKHMubGVuZ3RoPjApe2NvbnN0IGk9ZVtzWzBdXTtpZihpIT09dm9pZCAwKXt0aGlzLm1vcnBoVGFyZ2V0SW5mbHVlbmNlcz1bXSx0aGlzLm1vcnBoVGFyZ2V0RGljdGlvbmFyeT17fTtmb3IobGV0IG49MCxyPWkubGVuZ3RoO248cjtuKyspe2NvbnN0IG89aVtuXS5uYW1lfHxTdHJpbmcobik7dGhpcy5tb3JwaFRhcmdldEluZmx1ZW5jZXMucHVzaCgwKSx0aGlzLm1vcnBoVGFyZ2V0RGljdGlvbmFyeVtvXT1ufX19fX1mdW5jdGlvbiBtcihjLHQsZSxzLGksbixyKXtjb25zdCBvPUZpLmRpc3RhbmNlU3FUb1BvaW50KGMpO2lmKG88ZSl7Y29uc3QgYT1uZXcgeDtGaS5jbG9zZXN0UG9pbnRUb1BvaW50KGMsYSksYS5hcHBseU1hdHJpeDQocyk7Y29uc3QgaD1pLnJheS5vcmlnaW4uZGlzdGFuY2VUbyhhKTtpZihoPGkubmVhcnx8aD5pLmZhcilyZXR1cm47bi5wdXNoKHtkaXN0YW5jZTpoLGRpc3RhbmNlVG9SYXk6TWF0aC5zcXJ0KG8pLHBvaW50OmEsaW5kZXg6dCxmYWNlOm51bGwsb2JqZWN0OnJ9KX19Y2xhc3MgSmEgZXh0ZW5kcyBBdHtjb25zdHJ1Y3Rvcih0LGUscyxpLG4scixvLGEsaCl7c3VwZXIodCxlLHMsaSxuLHIsbyxhLGgpLHRoaXMuaXNDYW52YXNUZXh0dXJlPSEwLHRoaXMubmVlZHNVcGRhdGU9ITB9fWNsYXNzIG1zIGV4dGVuZHMgaWV7Y29uc3RydWN0b3IodCl7c3VwZXIoKSx0aGlzLmlzTWVzaFN0YW5kYXJkTWF0ZXJpYWw9ITAsdGhpcy5kZWZpbmVzPXtTVEFOREFSRDoiIn0sdGhpcy50eXBlPSJNZXNoU3RhbmRhcmRNYXRlcmlhbCIsdGhpcy5jb2xvcj1uZXcgUCgxNjc3NzIxNSksdGhpcy5yb3VnaG5lc3M9MSx0aGlzLm1ldGFsbmVzcz0wLHRoaXMubWFwPW51bGwsdGhpcy5saWdodE1hcD1udWxsLHRoaXMubGlnaHRNYXBJbnRlbnNpdHk9MSx0aGlzLmFvTWFwPW51bGwsdGhpcy5hb01hcEludGVuc2l0eT0xLHRoaXMuZW1pc3NpdmU9bmV3IFAoMCksdGhpcy5lbWlzc2l2ZUludGVuc2l0eT0xLHRoaXMuZW1pc3NpdmVNYXA9bnVsbCx0aGlzLmJ1bXBNYXA9bnVsbCx0aGlzLmJ1bXBTY2FsZT0xLHRoaXMubm9ybWFsTWFwPW51bGwsdGhpcy5ub3JtYWxNYXBUeXBlPU9uLHRoaXMubm9ybWFsU2NhbGU9bmV3IE8oMSwxKSx0aGlzLmRpc3BsYWNlbWVudE1hcD1udWxsLHRoaXMuZGlzcGxhY2VtZW50U2NhbGU9MSx0aGlzLmRpc3BsYWNlbWVudEJpYXM9MCx0aGlzLnJvdWdobmVzc01hcD1udWxsLHRoaXMubWV0YWxuZXNzTWFwPW51bGwsdGhpcy5hbHBoYU1hcD1udWxsLHRoaXMuZW52TWFwPW51bGwsdGhpcy5lbnZNYXBJbnRlbnNpdHk9MSx0aGlzLndpcmVmcmFtZT0hMSx0aGlzLndpcmVmcmFtZUxpbmV3aWR0aD0xLHRoaXMud2lyZWZyYW1lTGluZWNhcD0icm91bmQiLHRoaXMud2lyZWZyYW1lTGluZWpvaW49InJvdW5kIix0aGlzLmZsYXRTaGFkaW5nPSExLHRoaXMuZm9nPSEwLHRoaXMuc2V0VmFsdWVzKHQpfWNvcHkodCl7cmV0dXJuIHN1cGVyLmNvcHkodCksdGhpcy5kZWZpbmVzPXtTVEFOREFSRDoiIn0sdGhpcy5jb2xvci5jb3B5KHQuY29sb3IpLHRoaXMucm91Z2huZXNzPXQucm91Z2huZXNzLHRoaXMubWV0YWxuZXNzPXQubWV0YWxuZXNzLHRoaXMubWFwPXQubWFwLHRoaXMubGlnaHRNYXA9dC5saWdodE1hcCx0aGlzLmxpZ2h0TWFwSW50ZW5zaXR5PXQubGlnaHRNYXBJbnRlbnNpdHksdGhpcy5hb01hcD10LmFvTWFwLHRoaXMuYW9NYXBJbnRlbnNpdHk9dC5hb01hcEludGVuc2l0eSx0aGlzLmVtaXNzaXZlLmNvcHkodC5lbWlzc2l2ZSksdGhpcy5lbWlzc2l2ZU1hcD10LmVtaXNzaXZlTWFwLHRoaXMuZW1pc3NpdmVJbnRlbnNpdHk9dC5lbWlzc2l2ZUludGVuc2l0eSx0aGlzLmJ1bXBNYXA9dC5idW1wTWFwLHRoaXMuYnVtcFNjYWxlPXQuYnVtcFNjYWxlLHRoaXMubm9ybWFsTWFwPXQubm9ybWFsTWFwLHRoaXMubm9ybWFsTWFwVHlwZT10Lm5vcm1hbE1hcFR5cGUsdGhpcy5ub3JtYWxTY2FsZS5jb3B5KHQubm9ybWFsU2NhbGUpLHRoaXMuZGlzcGxhY2VtZW50TWFwPXQuZGlzcGxhY2VtZW50TWFwLHRoaXMuZGlzcGxhY2VtZW50U2NhbGU9dC5kaXNwbGFjZW1lbnRTY2FsZSx0aGlzLmRpc3BsYWNlbWVudEJpYXM9dC5kaXNwbGFjZW1lbnRCaWFzLHRoaXMucm91Z2huZXNzTWFwPXQucm91Z2huZXNzTWFwLHRoaXMubWV0YWxuZXNzTWFwPXQubWV0YWxuZXNzTWFwLHRoaXMuYWxwaGFNYXA9dC5hbHBoYU1hcCx0aGlzLmVudk1hcD10LmVudk1hcCx0aGlzLmVudk1hcEludGVuc2l0eT10LmVudk1hcEludGVuc2l0eSx0aGlzLndpcmVmcmFtZT10LndpcmVmcmFtZSx0aGlzLndpcmVmcmFtZUxpbmV3aWR0aD10LndpcmVmcmFtZUxpbmV3aWR0aCx0aGlzLndpcmVmcmFtZUxpbmVjYXA9dC53aXJlZnJhbWVMaW5lY2FwLHRoaXMud2lyZWZyYW1lTGluZWpvaW49dC53aXJlZnJhbWVMaW5lam9pbix0aGlzLmZsYXRTaGFkaW5nPXQuZmxhdFNoYWRpbmcsdGhpcy5mb2c9dC5mb2csdGhpc319Y2xhc3MgeXIgZXh0ZW5kcyBtc3tjb25zdHJ1Y3Rvcih0KXtzdXBlcigpLHRoaXMuaXNNZXNoUGh5c2ljYWxNYXRlcmlhbD0hMCx0aGlzLmRlZmluZXM9e1NUQU5EQVJEOiIiLFBIWVNJQ0FMOiIifSx0aGlzLnR5cGU9Ik1lc2hQaHlzaWNhbE1hdGVyaWFsIix0aGlzLmNsZWFyY29hdE1hcD1udWxsLHRoaXMuY2xlYXJjb2F0Um91Z2huZXNzPTAsdGhpcy5jbGVhcmNvYXRSb3VnaG5lc3NNYXA9bnVsbCx0aGlzLmNsZWFyY29hdE5vcm1hbFNjYWxlPW5ldyBPKDEsMSksdGhpcy5jbGVhcmNvYXROb3JtYWxNYXA9bnVsbCx0aGlzLmlvcj0xLjUsT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsInJlZmxlY3Rpdml0eSIse2dldDpmdW5jdGlvbigpe3JldHVybiBaKDIuNSoodGhpcy5pb3ItMSkvKHRoaXMuaW9yKzEpLDAsMSl9LHNldDpmdW5jdGlvbihlKXt0aGlzLmlvcj0oMSsuNCplKS8oMS0uNCplKX19KSx0aGlzLmlyaWRlc2NlbmNlTWFwPW51bGwsdGhpcy5pcmlkZXNjZW5jZUlPUj0xLjMsdGhpcy5pcmlkZXNjZW5jZVRoaWNrbmVzc1JhbmdlPVsxMDAsNDAwXSx0aGlzLmlyaWRlc2NlbmNlVGhpY2tuZXNzTWFwPW51bGwsdGhpcy5zaGVlbkNvbG9yPW5ldyBQKDApLHRoaXMuc2hlZW5Db2xvck1hcD1udWxsLHRoaXMuc2hlZW5Sb3VnaG5lc3M9MSx0aGlzLnNoZWVuUm91Z2huZXNzTWFwPW51bGwsdGhpcy50cmFuc21pc3Npb25NYXA9bnVsbCx0aGlzLnRoaWNrbmVzcz0wLHRoaXMudGhpY2tuZXNzTWFwPW51bGwsdGhpcy5hdHRlbnVhdGlvbkRpc3RhbmNlPTAsdGhpcy5hdHRlbnVhdGlvbkNvbG9yPW5ldyBQKDEsMSwxKSx0aGlzLnNwZWN1bGFySW50ZW5zaXR5PTEsdGhpcy5zcGVjdWxhckludGVuc2l0eU1hcD1udWxsLHRoaXMuc3BlY3VsYXJDb2xvcj1uZXcgUCgxLDEsMSksdGhpcy5zcGVjdWxhckNvbG9yTWFwPW51bGwsdGhpcy5fc2hlZW49MCx0aGlzLl9jbGVhcmNvYXQ9MCx0aGlzLl9pcmlkZXNjZW5jZT0wLHRoaXMuX3RyYW5zbWlzc2lvbj0wLHRoaXMuc2V0VmFsdWVzKHQpfWdldCBzaGVlbigpe3JldHVybiB0aGlzLl9zaGVlbn1zZXQgc2hlZW4odCl7dGhpcy5fc2hlZW4+MCE9dD4wJiZ0aGlzLnZlcnNpb24rKyx0aGlzLl9zaGVlbj10fWdldCBjbGVhcmNvYXQoKXtyZXR1cm4gdGhpcy5fY2xlYXJjb2F0fXNldCBjbGVhcmNvYXQodCl7dGhpcy5fY2xlYXJjb2F0PjAhPXQ+MCYmdGhpcy52ZXJzaW9uKyssdGhpcy5fY2xlYXJjb2F0PXR9Z2V0IGlyaWRlc2NlbmNlKCl7cmV0dXJuIHRoaXMuX2lyaWRlc2NlbmNlfXNldCBpcmlkZXNjZW5jZSh0KXt0aGlzLl9pcmlkZXNjZW5jZT4wIT10PjAmJnRoaXMudmVyc2lvbisrLHRoaXMuX2lyaWRlc2NlbmNlPXR9Z2V0IHRyYW5zbWlzc2lvbigpe3JldHVybiB0aGlzLl90cmFuc21pc3Npb259c2V0IHRyYW5zbWlzc2lvbih0KXt0aGlzLl90cmFuc21pc3Npb24+MCE9dD4wJiZ0aGlzLnZlcnNpb24rKyx0aGlzLl90cmFuc21pc3Npb249dH1jb3B5KHQpe3JldHVybiBzdXBlci5jb3B5KHQpLHRoaXMuZGVmaW5lcz17U1RBTkRBUkQ6IiIsUEhZU0lDQUw6IiJ9LHRoaXMuY2xlYXJjb2F0PXQuY2xlYXJjb2F0LHRoaXMuY2xlYXJjb2F0TWFwPXQuY2xlYXJjb2F0TWFwLHRoaXMuY2xlYXJjb2F0Um91Z2huZXNzPXQuY2xlYXJjb2F0Um91Z2huZXNzLHRoaXMuY2xlYXJjb2F0Um91Z2huZXNzTWFwPXQuY2xlYXJjb2F0Um91Z2huZXNzTWFwLHRoaXMuY2xlYXJjb2F0Tm9ybWFsTWFwPXQuY2xlYXJjb2F0Tm9ybWFsTWFwLHRoaXMuY2xlYXJjb2F0Tm9ybWFsU2NhbGUuY29weSh0LmNsZWFyY29hdE5vcm1hbFNjYWxlKSx0aGlzLmlvcj10Lmlvcix0aGlzLmlyaWRlc2NlbmNlPXQuaXJpZGVzY2VuY2UsdGhpcy5pcmlkZXNjZW5jZU1hcD10LmlyaWRlc2NlbmNlTWFwLHRoaXMuaXJpZGVzY2VuY2VJT1I9dC5pcmlkZXNjZW5jZUlPUix0aGlzLmlyaWRlc2NlbmNlVGhpY2tuZXNzUmFuZ2U9Wy4uLnQuaXJpZGVzY2VuY2VUaGlja25lc3NSYW5nZV0sdGhpcy5pcmlkZXNjZW5jZVRoaWNrbmVzc01hcD10LmlyaWRlc2NlbmNlVGhpY2tuZXNzTWFwLHRoaXMuc2hlZW49dC5zaGVlbix0aGlzLnNoZWVuQ29sb3IuY29weSh0LnNoZWVuQ29sb3IpLHRoaXMuc2hlZW5Db2xvck1hcD10LnNoZWVuQ29sb3JNYXAsdGhpcy5zaGVlblJvdWdobmVzcz10LnNoZWVuUm91Z2huZXNzLHRoaXMuc2hlZW5Sb3VnaG5lc3NNYXA9dC5zaGVlblJvdWdobmVzc01hcCx0aGlzLnRyYW5zbWlzc2lvbj10LnRyYW5zbWlzc2lvbix0aGlzLnRyYW5zbWlzc2lvbk1hcD10LnRyYW5zbWlzc2lvbk1hcCx0aGlzLnRoaWNrbmVzcz10LnRoaWNrbmVzcyx0aGlzLnRoaWNrbmVzc01hcD10LnRoaWNrbmVzc01hcCx0aGlzLmF0dGVudWF0aW9uRGlzdGFuY2U9dC5hdHRlbnVhdGlvbkRpc3RhbmNlLHRoaXMuYXR0ZW51YXRpb25Db2xvci5jb3B5KHQuYXR0ZW51YXRpb25Db2xvciksdGhpcy5zcGVjdWxhckludGVuc2l0eT10LnNwZWN1bGFySW50ZW5zaXR5LHRoaXMuc3BlY3VsYXJJbnRlbnNpdHlNYXA9dC5zcGVjdWxhckludGVuc2l0eU1hcCx0aGlzLnNwZWN1bGFyQ29sb3IuY29weSh0LnNwZWN1bGFyQ29sb3IpLHRoaXMuc3BlY3VsYXJDb2xvck1hcD10LnNwZWN1bGFyQ29sb3JNYXAsdGhpc319Y29uc3QgTj17YXJyYXlTbGljZTpmdW5jdGlvbihjLHQsZSl7cmV0dXJuIE4uaXNUeXBlZEFycmF5KGMpP25ldyBjLmNvbnN0cnVjdG9yKGMuc3ViYXJyYXkodCxlIT09dm9pZCAwP2U6Yy5sZW5ndGgpKTpjLnNsaWNlKHQsZSl9LGNvbnZlcnRBcnJheTpmdW5jdGlvbihjLHQsZSl7cmV0dXJuIWN8fCFlJiZjLmNvbnN0cnVjdG9yPT09dD9jOnR5cGVvZiB0LkJZVEVTX1BFUl9FTEVNRU5UPT0ibnVtYmVyIj9uZXcgdChjKTpBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjKX0saXNUeXBlZEFycmF5OmZ1bmN0aW9uKGMpe3JldHVybiBBcnJheUJ1ZmZlci5pc1ZpZXcoYykmJiEoYyBpbnN0YW5jZW9mIERhdGFWaWV3KX0sZ2V0S2V5ZnJhbWVPcmRlcjpmdW5jdGlvbihjKXtmdW5jdGlvbiB0KGksbil7cmV0dXJuIGNbaV0tY1tuXX1jb25zdCBlPWMubGVuZ3RoLHM9bmV3IEFycmF5KGUpO2ZvcihsZXQgaT0wO2khPT1lOysraSlzW2ldPWk7cmV0dXJuIHMuc29ydCh0KSxzfSxzb3J0ZWRBcnJheTpmdW5jdGlvbihjLHQsZSl7Y29uc3Qgcz1jLmxlbmd0aCxpPW5ldyBjLmNvbnN0cnVjdG9yKHMpO2ZvcihsZXQgbj0wLHI9MDtyIT09czsrK24pe2NvbnN0IG89ZVtuXSp0O2ZvcihsZXQgYT0wO2EhPT10OysrYSlpW3IrK109Y1tvK2FdfXJldHVybiBpfSxmbGF0dGVuSlNPTjpmdW5jdGlvbihjLHQsZSxzKXtsZXQgaT0xLG49Y1swXTtmb3IoO24hPT12b2lkIDAmJm5bc109PT12b2lkIDA7KW49Y1tpKytdO2lmKG49PT12b2lkIDApcmV0dXJuO2xldCByPW5bc107aWYociE9PXZvaWQgMClpZihBcnJheS5pc0FycmF5KHIpKWRvIHI9bltzXSxyIT09dm9pZCAwJiYodC5wdXNoKG4udGltZSksZS5wdXNoLmFwcGx5KGUscikpLG49Y1tpKytdO3doaWxlKG4hPT12b2lkIDApO2Vsc2UgaWYoci50b0FycmF5IT09dm9pZCAwKWRvIHI9bltzXSxyIT09dm9pZCAwJiYodC5wdXNoKG4udGltZSksci50b0FycmF5KGUsZS5sZW5ndGgpKSxuPWNbaSsrXTt3aGlsZShuIT09dm9pZCAwKTtlbHNlIGRvIHI9bltzXSxyIT09dm9pZCAwJiYodC5wdXNoKG4udGltZSksZS5wdXNoKHIpKSxuPWNbaSsrXTt3aGlsZShuIT09dm9pZCAwKX0sc3ViY2xpcDpmdW5jdGlvbihjLHQsZSxzLGk9MzApe2NvbnN0IG49Yy5jbG9uZSgpO24ubmFtZT10O2NvbnN0IHI9W107Zm9yKGxldCBhPTA7YTxuLnRyYWNrcy5sZW5ndGg7KythKXtjb25zdCBoPW4udHJhY2tzW2FdLGw9aC5nZXRWYWx1ZVNpemUoKSx1PVtdLGQ9W107Zm9yKGxldCBmPTA7ZjxoLnRpbWVzLmxlbmd0aDsrK2Ype2NvbnN0IHA9aC50aW1lc1tmXSppO2lmKCEocDxlfHxwPj1zKSl7dS5wdXNoKGgudGltZXNbZl0pO2ZvcihsZXQgbT0wO208bDsrK20pZC5wdXNoKGgudmFsdWVzW2YqbCttXSl9fXUubGVuZ3RoIT09MCYmKGgudGltZXM9Ti5jb252ZXJ0QXJyYXkodSxoLnRpbWVzLmNvbnN0cnVjdG9yKSxoLnZhbHVlcz1OLmNvbnZlcnRBcnJheShkLGgudmFsdWVzLmNvbnN0cnVjdG9yKSxyLnB1c2goaCkpfW4udHJhY2tzPXI7bGV0IG89MS8wO2ZvcihsZXQgYT0wO2E8bi50cmFja3MubGVuZ3RoOysrYSlvPm4udHJhY2tzW2FdLnRpbWVzWzBdJiYobz1uLnRyYWNrc1thXS50aW1lc1swXSk7Zm9yKGxldCBhPTA7YTxuLnRyYWNrcy5sZW5ndGg7KythKW4udHJhY2tzW2FdLnNoaWZ0KC0xKm8pO3JldHVybiBuLnJlc2V0RHVyYXRpb24oKSxufSxtYWtlQ2xpcEFkZGl0aXZlOmZ1bmN0aW9uKGMsdD0wLGU9YyxzPTMwKXtzPD0wJiYocz0zMCk7Y29uc3QgaT1lLnRyYWNrcy5sZW5ndGgsbj10L3M7Zm9yKGxldCByPTA7cjxpOysrcil7Y29uc3Qgbz1lLnRyYWNrc1tyXSxhPW8uVmFsdWVUeXBlTmFtZTtpZihhPT09ImJvb2wifHxhPT09InN0cmluZyIpY29udGludWU7Y29uc3QgaD1jLnRyYWNrcy5maW5kKGZ1bmN0aW9uKHkpe3JldHVybiB5Lm5hbWU9PT1vLm5hbWUmJnkuVmFsdWVUeXBlTmFtZT09PWF9KTtpZihoPT09dm9pZCAwKWNvbnRpbnVlO2xldCBsPTA7Y29uc3QgdT1vLmdldFZhbHVlU2l6ZSgpO28uY3JlYXRlSW50ZXJwb2xhbnQuaXNJbnRlcnBvbGFudEZhY3RvcnlNZXRob2RHTFRGQ3ViaWNTcGxpbmUmJihsPXUvMyk7bGV0IGQ9MDtjb25zdCBmPWguZ2V0VmFsdWVTaXplKCk7aC5jcmVhdGVJbnRlcnBvbGFudC5pc0ludGVycG9sYW50RmFjdG9yeU1ldGhvZEdMVEZDdWJpY1NwbGluZSYmKGQ9Zi8zKTtjb25zdCBwPW8udGltZXMubGVuZ3RoLTE7bGV0IG07aWYobjw9by50aW1lc1swXSl7Y29uc3QgeT1sLE09dS1sO209Ti5hcnJheVNsaWNlKG8udmFsdWVzLHksTSl9ZWxzZSBpZihuPj1vLnRpbWVzW3BdKXtjb25zdCB5PXAqdStsLE09eSt1LWw7bT1OLmFycmF5U2xpY2Uoby52YWx1ZXMseSxNKX1lbHNle2NvbnN0IHk9by5jcmVhdGVJbnRlcnBvbGFudCgpLE09bCx3PXUtbDt5LmV2YWx1YXRlKG4pLG09Ti5hcnJheVNsaWNlKHkucmVzdWx0QnVmZmVyLE0sdyl9YT09PSJxdWF0ZXJuaW9uIiYmbmV3IFR0KCkuZnJvbUFycmF5KG0pLm5vcm1hbGl6ZSgpLmNvbmp1Z2F0ZSgpLnRvQXJyYXkobSk7Y29uc3QgZz1oLnRpbWVzLmxlbmd0aDtmb3IobGV0IHk9MDt5PGc7Kyt5KXtjb25zdCBNPXkqZitkO2lmKGE9PT0icXVhdGVybmlvbiIpVHQubXVsdGlwbHlRdWF0ZXJuaW9uc0ZsYXQoaC52YWx1ZXMsTSxtLDAsaC52YWx1ZXMsTSk7ZWxzZXtjb25zdCB3PWYtZCoyO2ZvcihsZXQgXz0wO188dzsrK18paC52YWx1ZXNbTStfXS09bVtfXX19fXJldHVybiBjLmJsZW5kTW9kZT1zYSxjfX07Y2xhc3MgUmV7Y29uc3RydWN0b3IodCxlLHMsaSl7dGhpcy5wYXJhbWV0ZXJQb3NpdGlvbnM9dCx0aGlzLl9jYWNoZWRJbmRleD0wLHRoaXMucmVzdWx0QnVmZmVyPWkhPT12b2lkIDA/aTpuZXcgZS5jb25zdHJ1Y3RvcihzKSx0aGlzLnNhbXBsZVZhbHVlcz1lLHRoaXMudmFsdWVTaXplPXMsdGhpcy5zZXR0aW5ncz1udWxsLHRoaXMuRGVmYXVsdFNldHRpbmdzXz17fX1ldmFsdWF0ZSh0KXtjb25zdCBlPXRoaXMucGFyYW1ldGVyUG9zaXRpb25zO2xldCBzPXRoaXMuX2NhY2hlZEluZGV4LGk9ZVtzXSxuPWVbcy0xXTtzOnt0OntsZXQgcjtlOntpOmlmKCEodDxpKSl7Zm9yKGxldCBvPXMrMjs7KXtpZihpPT09dm9pZCAwKXtpZih0PG4pYnJlYWsgaTtyZXR1cm4gcz1lLmxlbmd0aCx0aGlzLl9jYWNoZWRJbmRleD1zLHRoaXMuY29weVNhbXBsZVZhbHVlXyhzLTEpfWlmKHM9PT1vKWJyZWFrO2lmKG49aSxpPWVbKytzXSx0PGkpYnJlYWsgdH1yPWUubGVuZ3RoO2JyZWFrIGV9aWYoISh0Pj1uKSl7Y29uc3Qgbz1lWzFdO3Q8byYmKHM9MixuPW8pO2ZvcihsZXQgYT1zLTI7Oyl7aWYobj09PXZvaWQgMClyZXR1cm4gdGhpcy5fY2FjaGVkSW5kZXg9MCx0aGlzLmNvcHlTYW1wbGVWYWx1ZV8oMCk7aWYocz09PWEpYnJlYWs7aWYoaT1uLG49ZVstLXMtMV0sdD49bilicmVhayB0fXI9cyxzPTA7YnJlYWsgZX1icmVhayBzfWZvcig7czxyOyl7Y29uc3Qgbz1zK3I+Pj4xO3Q8ZVtvXT9yPW86cz1vKzF9aWYoaT1lW3NdLG49ZVtzLTFdLG49PT12b2lkIDApcmV0dXJuIHRoaXMuX2NhY2hlZEluZGV4PTAsdGhpcy5jb3B5U2FtcGxlVmFsdWVfKDApO2lmKGk9PT12b2lkIDApcmV0dXJuIHM9ZS5sZW5ndGgsdGhpcy5fY2FjaGVkSW5kZXg9cyx0aGlzLmNvcHlTYW1wbGVWYWx1ZV8ocy0xKX10aGlzLl9jYWNoZWRJbmRleD1zLHRoaXMuaW50ZXJ2YWxDaGFuZ2VkXyhzLG4saSl9cmV0dXJuIHRoaXMuaW50ZXJwb2xhdGVfKHMsbix0LGkpfWdldFNldHRpbmdzXygpe3JldHVybiB0aGlzLnNldHRpbmdzfHx0aGlzLkRlZmF1bHRTZXR0aW5nc199Y29weVNhbXBsZVZhbHVlXyh0KXtjb25zdCBlPXRoaXMucmVzdWx0QnVmZmVyLHM9dGhpcy5zYW1wbGVWYWx1ZXMsaT10aGlzLnZhbHVlU2l6ZSxuPXQqaTtmb3IobGV0IHI9MDtyIT09aTsrK3IpZVtyXT1zW24rcl07cmV0dXJuIGV9aW50ZXJwb2xhdGVfKCl7dGhyb3cgbmV3IEVycm9yKCJjYWxsIHRvIGFic3RyYWN0IG1ldGhvZCIpfWludGVydmFsQ2hhbmdlZF8oKXt9fWNsYXNzIEthIGV4dGVuZHMgUmV7Y29uc3RydWN0b3IodCxlLHMsaSl7c3VwZXIodCxlLHMsaSksdGhpcy5fd2VpZ2h0UHJldj0tMCx0aGlzLl9vZmZzZXRQcmV2PS0wLHRoaXMuX3dlaWdodE5leHQ9LTAsdGhpcy5fb2Zmc2V0TmV4dD0tMCx0aGlzLkRlZmF1bHRTZXR0aW5nc189e2VuZGluZ1N0YXJ0OkluLGVuZGluZ0VuZDpJbn19aW50ZXJ2YWxDaGFuZ2VkXyh0LGUscyl7Y29uc3QgaT10aGlzLnBhcmFtZXRlclBvc2l0aW9ucztsZXQgbj10LTIscj10KzEsbz1pW25dLGE9aVtyXTtpZihvPT09dm9pZCAwKXN3aXRjaCh0aGlzLmdldFNldHRpbmdzXygpLmVuZGluZ1N0YXJ0KXtjYXNlIENuOm49dCxvPTIqZS1zO2JyZWFrO2Nhc2Uga246bj1pLmxlbmd0aC0yLG89ZStpW25dLWlbbisxXTticmVhaztkZWZhdWx0Om49dCxvPXN9aWYoYT09PXZvaWQgMClzd2l0Y2godGhpcy5nZXRTZXR0aW5nc18oKS5lbmRpbmdFbmQpe2Nhc2UgQ246cj10LGE9MipzLWU7YnJlYWs7Y2FzZSBrbjpyPTEsYT1zK2lbMV0taVswXTticmVhaztkZWZhdWx0OnI9dC0xLGE9ZX1jb25zdCBoPShzLWUpKi41LGw9dGhpcy52YWx1ZVNpemU7dGhpcy5fd2VpZ2h0UHJldj1oLyhlLW8pLHRoaXMuX3dlaWdodE5leHQ9aC8oYS1zKSx0aGlzLl9vZmZzZXRQcmV2PW4qbCx0aGlzLl9vZmZzZXROZXh0PXIqbH1pbnRlcnBvbGF0ZV8odCxlLHMsaSl7Y29uc3Qgbj10aGlzLnJlc3VsdEJ1ZmZlcixyPXRoaXMuc2FtcGxlVmFsdWVzLG89dGhpcy52YWx1ZVNpemUsYT10Km8saD1hLW8sbD10aGlzLl9vZmZzZXRQcmV2LHU9dGhpcy5fb2Zmc2V0TmV4dCxkPXRoaXMuX3dlaWdodFByZXYsZj10aGlzLl93ZWlnaHROZXh0LHA9KHMtZSkvKGktZSksbT1wKnAsZz1tKnAseT0tZCpnKzIqZCptLWQqcCxNPSgxK2QpKmcrKC0xLjUtMipkKSptKygtLjUrZCkqcCsxLHc9KC0xLWYpKmcrKDEuNStmKSptKy41KnAsXz1mKmctZiptO2ZvcihsZXQgYj0wO2IhPT1vOysrYiluW2JdPXkqcltsK2JdK00qcltoK2JdK3cqclthK2JdK18qclt1K2JdO3JldHVybiBufX1jbGFzcyBRYSBleHRlbmRzIFJle2NvbnN0cnVjdG9yKHQsZSxzLGkpe3N1cGVyKHQsZSxzLGkpfWludGVycG9sYXRlXyh0LGUscyxpKXtjb25zdCBuPXRoaXMucmVzdWx0QnVmZmVyLHI9dGhpcy5zYW1wbGVWYWx1ZXMsbz10aGlzLnZhbHVlU2l6ZSxhPXQqbyxoPWEtbyxsPShzLWUpLyhpLWUpLHU9MS1sO2ZvcihsZXQgZD0wO2QhPT1vOysrZCluW2RdPXJbaCtkXSp1K3JbYStkXSpsO3JldHVybiBufX1jbGFzcyB0aCBleHRlbmRzIFJle2NvbnN0cnVjdG9yKHQsZSxzLGkpe3N1cGVyKHQsZSxzLGkpfWludGVycG9sYXRlXyh0KXtyZXR1cm4gdGhpcy5jb3B5U2FtcGxlVmFsdWVfKHQtMSl9fWNsYXNzIGx0e2NvbnN0cnVjdG9yKHQsZSxzLGkpe2lmKHQ9PT12b2lkIDApdGhyb3cgbmV3IEVycm9yKCJUSFJFRS5LZXlmcmFtZVRyYWNrOiB0cmFjayBuYW1lIGlzIHVuZGVmaW5lZCIpO2lmKGU9PT12b2lkIDB8fGUubGVuZ3RoPT09MCl0aHJvdyBuZXcgRXJyb3IoIlRIUkVFLktleWZyYW1lVHJhY2s6IG5vIGtleWZyYW1lcyBpbiB0cmFjayBuYW1lZCAiK3QpO3RoaXMubmFtZT10LHRoaXMudGltZXM9Ti5jb252ZXJ0QXJyYXkoZSx0aGlzLlRpbWVCdWZmZXJUeXBlKSx0aGlzLnZhbHVlcz1OLmNvbnZlcnRBcnJheShzLHRoaXMuVmFsdWVCdWZmZXJUeXBlKSx0aGlzLnNldEludGVycG9sYXRpb24oaXx8dGhpcy5EZWZhdWx0SW50ZXJwb2xhdGlvbil9c3RhdGljIHRvSlNPTih0KXtjb25zdCBlPXQuY29uc3RydWN0b3I7bGV0IHM7aWYoZS50b0pTT04hPT10aGlzLnRvSlNPTilzPWUudG9KU09OKHQpO2Vsc2V7cz17bmFtZTp0Lm5hbWUsdGltZXM6Ti5jb252ZXJ0QXJyYXkodC50aW1lcyxBcnJheSksdmFsdWVzOk4uY29udmVydEFycmF5KHQudmFsdWVzLEFycmF5KX07Y29uc3QgaT10LmdldEludGVycG9sYXRpb24oKTtpIT09dC5EZWZhdWx0SW50ZXJwb2xhdGlvbiYmKHMuaW50ZXJwb2xhdGlvbj1pKX1yZXR1cm4gcy50eXBlPXQuVmFsdWVUeXBlTmFtZSxzfUludGVycG9sYW50RmFjdG9yeU1ldGhvZERpc2NyZXRlKHQpe3JldHVybiBuZXcgdGgodGhpcy50aW1lcyx0aGlzLnZhbHVlcyx0aGlzLmdldFZhbHVlU2l6ZSgpLHQpfUludGVycG9sYW50RmFjdG9yeU1ldGhvZExpbmVhcih0KXtyZXR1cm4gbmV3IFFhKHRoaXMudGltZXMsdGhpcy52YWx1ZXMsdGhpcy5nZXRWYWx1ZVNpemUoKSx0KX1JbnRlcnBvbGFudEZhY3RvcnlNZXRob2RTbW9vdGgodCl7cmV0dXJuIG5ldyBLYSh0aGlzLnRpbWVzLHRoaXMudmFsdWVzLHRoaXMuZ2V0VmFsdWVTaXplKCksdCl9c2V0SW50ZXJwb2xhdGlvbih0KXtsZXQgZTtzd2l0Y2godCl7Y2FzZSB3ZTplPXRoaXMuSW50ZXJwb2xhbnRGYWN0b3J5TWV0aG9kRGlzY3JldGU7YnJlYWs7Y2FzZSBadDplPXRoaXMuSW50ZXJwb2xhbnRGYWN0b3J5TWV0aG9kTGluZWFyO2JyZWFrO2Nhc2UgSnM6ZT10aGlzLkludGVycG9sYW50RmFjdG9yeU1ldGhvZFNtb290aDticmVha31pZihlPT09dm9pZCAwKXtjb25zdCBzPSJ1bnN1cHBvcnRlZCBpbnRlcnBvbGF0aW9uIGZvciAiK3RoaXMuVmFsdWVUeXBlTmFtZSsiIGtleWZyYW1lIHRyYWNrIG5hbWVkICIrdGhpcy5uYW1lO2lmKHRoaXMuY3JlYXRlSW50ZXJwb2xhbnQ9PT12b2lkIDApaWYodCE9PXRoaXMuRGVmYXVsdEludGVycG9sYXRpb24pdGhpcy5zZXRJbnRlcnBvbGF0aW9uKHRoaXMuRGVmYXVsdEludGVycG9sYXRpb24pO2Vsc2UgdGhyb3cgbmV3IEVycm9yKHMpO3JldHVybiBjb25zb2xlLndhcm4oIlRIUkVFLktleWZyYW1lVHJhY2s6IixzKSx0aGlzfXJldHVybiB0aGlzLmNyZWF0ZUludGVycG9sYW50PWUsdGhpc31nZXRJbnRlcnBvbGF0aW9uKCl7c3dpdGNoKHRoaXMuY3JlYXRlSW50ZXJwb2xhbnQpe2Nhc2UgdGhpcy5JbnRlcnBvbGFudEZhY3RvcnlNZXRob2REaXNjcmV0ZTpyZXR1cm4gd2U7Y2FzZSB0aGlzLkludGVycG9sYW50RmFjdG9yeU1ldGhvZExpbmVhcjpyZXR1cm4gWnQ7Y2FzZSB0aGlzLkludGVycG9sYW50RmFjdG9yeU1ldGhvZFNtb290aDpyZXR1cm4gSnN9fWdldFZhbHVlU2l6ZSgpe3JldHVybiB0aGlzLnZhbHVlcy5sZW5ndGgvdGhpcy50aW1lcy5sZW5ndGh9c2hpZnQodCl7aWYodCE9PTApe2NvbnN0IGU9dGhpcy50aW1lcztmb3IobGV0IHM9MCxpPWUubGVuZ3RoO3MhPT1pOysrcyllW3NdKz10fXJldHVybiB0aGlzfXNjYWxlKHQpe2lmKHQhPT0xKXtjb25zdCBlPXRoaXMudGltZXM7Zm9yKGxldCBzPTAsaT1lLmxlbmd0aDtzIT09aTsrK3MpZVtzXSo9dH1yZXR1cm4gdGhpc310cmltKHQsZSl7Y29uc3Qgcz10aGlzLnRpbWVzLGk9cy5sZW5ndGg7bGV0IG49MCxyPWktMTtmb3IoO24hPT1pJiZzW25dPHQ7KSsrbjtmb3IoO3IhPT0tMSYmc1tyXT5lOyktLXI7aWYoKytyLG4hPT0wfHxyIT09aSl7bj49ciYmKHI9TWF0aC5tYXgociwxKSxuPXItMSk7Y29uc3Qgbz10aGlzLmdldFZhbHVlU2l6ZSgpO3RoaXMudGltZXM9Ti5hcnJheVNsaWNlKHMsbixyKSx0aGlzLnZhbHVlcz1OLmFycmF5U2xpY2UodGhpcy52YWx1ZXMsbipvLHIqbyl9cmV0dXJuIHRoaXN9dmFsaWRhdGUoKXtsZXQgdD0hMDtjb25zdCBlPXRoaXMuZ2V0VmFsdWVTaXplKCk7ZS1NYXRoLmZsb29yKGUpIT09MCYmKGNvbnNvbGUuZXJyb3IoIlRIUkVFLktleWZyYW1lVHJhY2s6IEludmFsaWQgdmFsdWUgc2l6ZSBpbiB0cmFjay4iLHRoaXMpLHQ9ITEpO2NvbnN0IHM9dGhpcy50aW1lcyxpPXRoaXMudmFsdWVzLG49cy5sZW5ndGg7bj09PTAmJihjb25zb2xlLmVycm9yKCJUSFJFRS5LZXlmcmFtZVRyYWNrOiBUcmFjayBpcyBlbXB0eS4iLHRoaXMpLHQ9ITEpO2xldCByPW51bGw7Zm9yKGxldCBvPTA7byE9PW47bysrKXtjb25zdCBhPXNbb107aWYodHlwZW9mIGE9PSJudW1iZXIiJiZpc05hTihhKSl7Y29uc29sZS5lcnJvcigiVEhSRUUuS2V5ZnJhbWVUcmFjazogVGltZSBpcyBub3QgYSB2YWxpZCBudW1iZXIuIix0aGlzLG8sYSksdD0hMTticmVha31pZihyIT09bnVsbCYmcj5hKXtjb25zb2xlLmVycm9yKCJUSFJFRS5LZXlmcmFtZVRyYWNrOiBPdXQgb2Ygb3JkZXIga2V5cy4iLHRoaXMsbyxhLHIpLHQ9ITE7YnJlYWt9cj1hfWlmKGkhPT12b2lkIDAmJk4uaXNUeXBlZEFycmF5KGkpKWZvcihsZXQgbz0wLGE9aS5sZW5ndGg7byE9PWE7KytvKXtjb25zdCBoPWlbb107aWYoaXNOYU4oaCkpe2NvbnNvbGUuZXJyb3IoIlRIUkVFLktleWZyYW1lVHJhY2s6IFZhbHVlIGlzIG5vdCBhIHZhbGlkIG51bWJlci4iLHRoaXMsbyxoKSx0PSExO2JyZWFrfX1yZXR1cm4gdH1vcHRpbWl6ZSgpe2NvbnN0IHQ9Ti5hcnJheVNsaWNlKHRoaXMudGltZXMpLGU9Ti5hcnJheVNsaWNlKHRoaXMudmFsdWVzKSxzPXRoaXMuZ2V0VmFsdWVTaXplKCksaT10aGlzLmdldEludGVycG9sYXRpb24oKT09PUpzLG49dC5sZW5ndGgtMTtsZXQgcj0xO2ZvcihsZXQgbz0xO288bjsrK28pe2xldCBhPSExO2NvbnN0IGg9dFtvXSxsPXRbbysxXTtpZihoIT09bCYmKG8hPT0xfHxoIT09dFswXSkpaWYoaSlhPSEwO2Vsc2V7Y29uc3QgdT1vKnMsZD11LXMsZj11K3M7Zm9yKGxldCBwPTA7cCE9PXM7KytwKXtjb25zdCBtPWVbdStwXTtpZihtIT09ZVtkK3BdfHxtIT09ZVtmK3BdKXthPSEwO2JyZWFrfX19aWYoYSl7aWYobyE9PXIpe3Rbcl09dFtvXTtjb25zdCB1PW8qcyxkPXIqcztmb3IobGV0IGY9MDtmIT09czsrK2YpZVtkK2ZdPWVbdStmXX0rK3J9fWlmKG4+MCl7dFtyXT10W25dO2ZvcihsZXQgbz1uKnMsYT1yKnMsaD0wO2ghPT1zOysraCllW2EraF09ZVtvK2hdOysrcn1yZXR1cm4gciE9PXQubGVuZ3RoPyh0aGlzLnRpbWVzPU4uYXJyYXlTbGljZSh0LDAsciksdGhpcy52YWx1ZXM9Ti5hcnJheVNsaWNlKGUsMCxyKnMpKToodGhpcy50aW1lcz10LHRoaXMudmFsdWVzPWUpLHRoaXN9Y2xvbmUoKXtjb25zdCB0PU4uYXJyYXlTbGljZSh0aGlzLnRpbWVzLDApLGU9Ti5hcnJheVNsaWNlKHRoaXMudmFsdWVzLDApLHM9dGhpcy5jb25zdHJ1Y3RvcixpPW5ldyBzKHRoaXMubmFtZSx0LGUpO3JldHVybiBpLmNyZWF0ZUludGVycG9sYW50PXRoaXMuY3JlYXRlSW50ZXJwb2xhbnQsaX19bHQucHJvdG90eXBlLlRpbWVCdWZmZXJUeXBlPUZsb2F0MzJBcnJheSxsdC5wcm90b3R5cGUuVmFsdWVCdWZmZXJUeXBlPUZsb2F0MzJBcnJheSxsdC5wcm90b3R5cGUuRGVmYXVsdEludGVycG9sYXRpb249WnQ7Y2xhc3MgbGUgZXh0ZW5kcyBsdHt9bGUucHJvdG90eXBlLlZhbHVlVHlwZU5hbWU9ImJvb2wiLGxlLnByb3RvdHlwZS5WYWx1ZUJ1ZmZlclR5cGU9QXJyYXksbGUucHJvdG90eXBlLkRlZmF1bHRJbnRlcnBvbGF0aW9uPXdlLGxlLnByb3RvdHlwZS5JbnRlcnBvbGFudEZhY3RvcnlNZXRob2RMaW5lYXI9dm9pZCAwLGxlLnByb3RvdHlwZS5JbnRlcnBvbGFudEZhY3RvcnlNZXRob2RTbW9vdGg9dm9pZCAwO2NsYXNzIGdyIGV4dGVuZHMgbHR7fWdyLnByb3RvdHlwZS5WYWx1ZVR5cGVOYW1lPSJjb2xvciI7Y2xhc3MgQmUgZXh0ZW5kcyBsdHt9QmUucHJvdG90eXBlLlZhbHVlVHlwZU5hbWU9Im51bWJlciI7Y2xhc3MgZWggZXh0ZW5kcyBSZXtjb25zdHJ1Y3Rvcih0LGUscyxpKXtzdXBlcih0LGUscyxpKX1pbnRlcnBvbGF0ZV8odCxlLHMsaSl7Y29uc3Qgbj10aGlzLnJlc3VsdEJ1ZmZlcixyPXRoaXMuc2FtcGxlVmFsdWVzLG89dGhpcy52YWx1ZVNpemUsYT0ocy1lKS8oaS1lKTtsZXQgaD10Km87Zm9yKGxldCBsPWgrbztoIT09bDtoKz00KVR0LnNsZXJwRmxhdChuLDAscixoLW8scixoLGEpO3JldHVybiBufX1jbGFzcyB1ZSBleHRlbmRzIGx0e0ludGVycG9sYW50RmFjdG9yeU1ldGhvZExpbmVhcih0KXtyZXR1cm4gbmV3IGVoKHRoaXMudGltZXMsdGhpcy52YWx1ZXMsdGhpcy5nZXRWYWx1ZVNpemUoKSx0KX19dWUucHJvdG90eXBlLlZhbHVlVHlwZU5hbWU9InF1YXRlcm5pb24iLHVlLnByb3RvdHlwZS5EZWZhdWx0SW50ZXJwb2xhdGlvbj1adCx1ZS5wcm90b3R5cGUuSW50ZXJwb2xhbnRGYWN0b3J5TWV0aG9kU21vb3RoPXZvaWQgMDtjbGFzcyBkZSBleHRlbmRzIGx0e31kZS5wcm90b3R5cGUuVmFsdWVUeXBlTmFtZT0ic3RyaW5nIixkZS5wcm90b3R5cGUuVmFsdWVCdWZmZXJUeXBlPUFycmF5LGRlLnByb3RvdHlwZS5EZWZhdWx0SW50ZXJwb2xhdGlvbj13ZSxkZS5wcm90b3R5cGUuSW50ZXJwb2xhbnRGYWN0b3J5TWV0aG9kTGluZWFyPXZvaWQgMCxkZS5wcm90b3R5cGUuSW50ZXJwb2xhbnRGYWN0b3J5TWV0aG9kU21vb3RoPXZvaWQgMDtjbGFzcyBMZSBleHRlbmRzIGx0e31MZS5wcm90b3R5cGUuVmFsdWVUeXBlTmFtZT0idmVjdG9yIjtjbGFzcyBzaHtjb25zdHJ1Y3Rvcih0LGU9LTEscyxpPWVhKXt0aGlzLm5hbWU9dCx0aGlzLnRyYWNrcz1zLHRoaXMuZHVyYXRpb249ZSx0aGlzLmJsZW5kTW9kZT1pLHRoaXMudXVpZD1pdCgpLHRoaXMuZHVyYXRpb248MCYmdGhpcy5yZXNldER1cmF0aW9uKCl9c3RhdGljIHBhcnNlKHQpe2NvbnN0IGU9W10scz10LnRyYWNrcyxpPTEvKHQuZnBzfHwxKTtmb3IobGV0IHI9MCxvPXMubGVuZ3RoO3IhPT1vOysrcillLnB1c2gobmgoc1tyXSkuc2NhbGUoaSkpO2NvbnN0IG49bmV3IHRoaXModC5uYW1lLHQuZHVyYXRpb24sZSx0LmJsZW5kTW9kZSk7cmV0dXJuIG4udXVpZD10LnV1aWQsbn1zdGF0aWMgdG9KU09OKHQpe2NvbnN0IGU9W10scz10LnRyYWNrcyxpPXtuYW1lOnQubmFtZSxkdXJhdGlvbjp0LmR1cmF0aW9uLHRyYWNrczplLHV1aWQ6dC51dWlkLGJsZW5kTW9kZTp0LmJsZW5kTW9kZX07Zm9yKGxldCBuPTAscj1zLmxlbmd0aDtuIT09cjsrK24pZS5wdXNoKGx0LnRvSlNPTihzW25dKSk7cmV0dXJuIGl9c3RhdGljIENyZWF0ZUZyb21Nb3JwaFRhcmdldFNlcXVlbmNlKHQsZSxzLGkpe2NvbnN0IG49ZS5sZW5ndGgscj1bXTtmb3IobGV0IG89MDtvPG47bysrKXtsZXQgYT1bXSxoPVtdO2EucHVzaCgobytuLTEpJW4sbywobysxKSVuKSxoLnB1c2goMCwxLDApO2NvbnN0IGw9Ti5nZXRLZXlmcmFtZU9yZGVyKGEpO2E9Ti5zb3J0ZWRBcnJheShhLDEsbCksaD1OLnNvcnRlZEFycmF5KGgsMSxsKSwhaSYmYVswXT09PTAmJihhLnB1c2gobiksaC5wdXNoKGhbMF0pKSxyLnB1c2gobmV3IEJlKCIubW9ycGhUYXJnZXRJbmZsdWVuY2VzWyIrZVtvXS5uYW1lKyJdIixhLGgpLnNjYWxlKDEvcykpfXJldHVybiBuZXcgdGhpcyh0LC0xLHIpfXN0YXRpYyBmaW5kQnlOYW1lKHQsZSl7bGV0IHM9dDtpZighQXJyYXkuaXNBcnJheSh0KSl7Y29uc3QgaT10O3M9aS5nZW9tZXRyeSYmaS5nZW9tZXRyeS5hbmltYXRpb25zfHxpLmFuaW1hdGlvbnN9Zm9yKGxldCBpPTA7aTxzLmxlbmd0aDtpKyspaWYoc1tpXS5uYW1lPT09ZSlyZXR1cm4gc1tpXTtyZXR1cm4gbnVsbH1zdGF0aWMgQ3JlYXRlQ2xpcHNGcm9tTW9ycGhUYXJnZXRTZXF1ZW5jZXModCxlLHMpe2NvbnN0IGk9e30sbj0vXihbXHctXSo/KShbXGRdKykkLztmb3IobGV0IG89MCxhPXQubGVuZ3RoO288YTtvKyspe2NvbnN0IGg9dFtvXSxsPWgubmFtZS5tYXRjaChuKTtpZihsJiZsLmxlbmd0aD4xKXtjb25zdCB1PWxbMV07bGV0IGQ9aVt1XTtkfHwoaVt1XT1kPVtdKSxkLnB1c2goaCl9fWNvbnN0IHI9W107Zm9yKGNvbnN0IG8gaW4gaSlyLnB1c2godGhpcy5DcmVhdGVGcm9tTW9ycGhUYXJnZXRTZXF1ZW5jZShvLGlbb10sZSxzKSk7cmV0dXJuIHJ9c3RhdGljIHBhcnNlQW5pbWF0aW9uKHQsZSl7aWYoIXQpcmV0dXJuIGNvbnNvbGUuZXJyb3IoIlRIUkVFLkFuaW1hdGlvbkNsaXA6IE5vIGFuaW1hdGlvbiBpbiBKU09OTG9hZGVyIGRhdGEuIiksbnVsbDtjb25zdCBzPWZ1bmN0aW9uKHUsZCxmLHAsbSl7aWYoZi5sZW5ndGghPT0wKXtjb25zdCBnPVtdLHk9W107Ti5mbGF0dGVuSlNPTihmLGcseSxwKSxnLmxlbmd0aCE9PTAmJm0ucHVzaChuZXcgdShkLGcseSkpfX0saT1bXSxuPXQubmFtZXx8ImRlZmF1bHQiLHI9dC5mcHN8fDMwLG89dC5ibGVuZE1vZGU7bGV0IGE9dC5sZW5ndGh8fC0xO2NvbnN0IGg9dC5oaWVyYXJjaHl8fFtdO2ZvcihsZXQgdT0wO3U8aC5sZW5ndGg7dSsrKXtjb25zdCBkPWhbdV0ua2V5cztpZighKCFkfHxkLmxlbmd0aD09PTApKWlmKGRbMF0ubW9ycGhUYXJnZXRzKXtjb25zdCBmPXt9O2xldCBwO2ZvcihwPTA7cDxkLmxlbmd0aDtwKyspaWYoZFtwXS5tb3JwaFRhcmdldHMpZm9yKGxldCBtPTA7bTxkW3BdLm1vcnBoVGFyZ2V0cy5sZW5ndGg7bSsrKWZbZFtwXS5tb3JwaFRhcmdldHNbbV1dPS0xO2Zvcihjb25zdCBtIGluIGYpe2NvbnN0IGc9W10seT1bXTtmb3IobGV0IE09MDtNIT09ZFtwXS5tb3JwaFRhcmdldHMubGVuZ3RoOysrTSl7Y29uc3Qgdz1kW3BdO2cucHVzaCh3LnRpbWUpLHkucHVzaCh3Lm1vcnBoVGFyZ2V0PT09bT8xOjApfWkucHVzaChuZXcgQmUoIi5tb3JwaFRhcmdldEluZmx1ZW5jZVsiK20rIl0iLGcseSkpfWE9Zi5sZW5ndGgqcn1lbHNle2NvbnN0IGY9Ii5ib25lc1siK2VbdV0ubmFtZSsiXSI7cyhMZSxmKyIucG9zaXRpb24iLGQsInBvcyIsaSkscyh1ZSxmKyIucXVhdGVybmlvbiIsZCwicm90IixpKSxzKExlLGYrIi5zY2FsZSIsZCwic2NsIixpKX19cmV0dXJuIGkubGVuZ3RoPT09MD9udWxsOm5ldyB0aGlzKG4sYSxpLG8pfXJlc2V0RHVyYXRpb24oKXtjb25zdCB0PXRoaXMudHJhY2tzO2xldCBlPTA7Zm9yKGxldCBzPTAsaT10Lmxlbmd0aDtzIT09aTsrK3Mpe2NvbnN0IG49dGhpcy50cmFja3Nbc107ZT1NYXRoLm1heChlLG4udGltZXNbbi50aW1lcy5sZW5ndGgtMV0pfXJldHVybiB0aGlzLmR1cmF0aW9uPWUsdGhpc310cmltKCl7Zm9yKGxldCB0PTA7dDx0aGlzLnRyYWNrcy5sZW5ndGg7dCsrKXRoaXMudHJhY2tzW3RdLnRyaW0oMCx0aGlzLmR1cmF0aW9uKTtyZXR1cm4gdGhpc312YWxpZGF0ZSgpe2xldCB0PSEwO2ZvcihsZXQgZT0wO2U8dGhpcy50cmFja3MubGVuZ3RoO2UrKyl0PXQmJnRoaXMudHJhY2tzW2VdLnZhbGlkYXRlKCk7cmV0dXJuIHR9b3B0aW1pemUoKXtmb3IobGV0IHQ9MDt0PHRoaXMudHJhY2tzLmxlbmd0aDt0KyspdGhpcy50cmFja3NbdF0ub3B0aW1pemUoKTtyZXR1cm4gdGhpc31jbG9uZSgpe2NvbnN0IHQ9W107Zm9yKGxldCBlPTA7ZTx0aGlzLnRyYWNrcy5sZW5ndGg7ZSsrKXQucHVzaCh0aGlzLnRyYWNrc1tlXS5jbG9uZSgpKTtyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5uYW1lLHRoaXMuZHVyYXRpb24sdCx0aGlzLmJsZW5kTW9kZSl9dG9KU09OKCl7cmV0dXJuIHRoaXMuY29uc3RydWN0b3IudG9KU09OKHRoaXMpfX1mdW5jdGlvbiBpaChjKXtzd2l0Y2goYy50b0xvd2VyQ2FzZSgpKXtjYXNlInNjYWxhciI6Y2FzZSJkb3VibGUiOmNhc2UiZmxvYXQiOmNhc2UibnVtYmVyIjpjYXNlImludGVnZXIiOnJldHVybiBCZTtjYXNlInZlY3RvciI6Y2FzZSJ2ZWN0b3IyIjpjYXNlInZlY3RvcjMiOmNhc2UidmVjdG9yNCI6cmV0dXJuIExlO2Nhc2UiY29sb3IiOnJldHVybiBncjtjYXNlInF1YXRlcm5pb24iOnJldHVybiB1ZTtjYXNlImJvb2wiOmNhc2UiYm9vbGVhbiI6cmV0dXJuIGxlO2Nhc2Uic3RyaW5nIjpyZXR1cm4gZGV9dGhyb3cgbmV3IEVycm9yKCJUSFJFRS5LZXlmcmFtZVRyYWNrOiBVbnN1cHBvcnRlZCB0eXBlTmFtZTogIitjKX1mdW5jdGlvbiBuaChjKXtpZihjLnR5cGU9PT12b2lkIDApdGhyb3cgbmV3IEVycm9yKCJUSFJFRS5LZXlmcmFtZVRyYWNrOiB0cmFjayB0eXBlIHVuZGVmaW5lZCwgY2FuIG5vdCBwYXJzZSIpO2NvbnN0IHQ9aWgoYy50eXBlKTtpZihjLnRpbWVzPT09dm9pZCAwKXtjb25zdCBlPVtdLHM9W107Ti5mbGF0dGVuSlNPTihjLmtleXMsZSxzLCJ2YWx1ZSIpLGMudGltZXM9ZSxjLnZhbHVlcz1zfXJldHVybiB0LnBhcnNlIT09dm9pZCAwP3QucGFyc2UoYyk6bmV3IHQoYy5uYW1lLGMudGltZXMsYy52YWx1ZXMsYy5pbnRlcnBvbGF0aW9uKX1jb25zdCBmZT17ZW5hYmxlZDohMSxmaWxlczp7fSxhZGQ6ZnVuY3Rpb24oYyx0KXt0aGlzLmVuYWJsZWQhPT0hMSYmKHRoaXMuZmlsZXNbY109dCl9LGdldDpmdW5jdGlvbihjKXtpZih0aGlzLmVuYWJsZWQhPT0hMSlyZXR1cm4gdGhpcy5maWxlc1tjXX0scmVtb3ZlOmZ1bmN0aW9uKGMpe2RlbGV0ZSB0aGlzLmZpbGVzW2NdfSxjbGVhcjpmdW5jdGlvbigpe3RoaXMuZmlsZXM9e319fTtjbGFzcyByaHtjb25zdHJ1Y3Rvcih0LGUscyl7Y29uc3QgaT10aGlzO2xldCBuPSExLHI9MCxvPTAsYTtjb25zdCBoPVtdO3RoaXMub25TdGFydD12b2lkIDAsdGhpcy5vbkxvYWQ9dCx0aGlzLm9uUHJvZ3Jlc3M9ZSx0aGlzLm9uRXJyb3I9cyx0aGlzLml0ZW1TdGFydD1mdW5jdGlvbihsKXtvKyssbj09PSExJiZpLm9uU3RhcnQhPT12b2lkIDAmJmkub25TdGFydChsLHIsbyksbj0hMH0sdGhpcy5pdGVtRW5kPWZ1bmN0aW9uKGwpe3IrKyxpLm9uUHJvZ3Jlc3MhPT12b2lkIDAmJmkub25Qcm9ncmVzcyhsLHIsbykscj09PW8mJihuPSExLGkub25Mb2FkIT09dm9pZCAwJiZpLm9uTG9hZCgpKX0sdGhpcy5pdGVtRXJyb3I9ZnVuY3Rpb24obCl7aS5vbkVycm9yIT09dm9pZCAwJiZpLm9uRXJyb3IobCl9LHRoaXMucmVzb2x2ZVVSTD1mdW5jdGlvbihsKXtyZXR1cm4gYT9hKGwpOmx9LHRoaXMuc2V0VVJMTW9kaWZpZXI9ZnVuY3Rpb24obCl7cmV0dXJuIGE9bCx0aGlzfSx0aGlzLmFkZEhhbmRsZXI9ZnVuY3Rpb24obCx1KXtyZXR1cm4gaC5wdXNoKGwsdSksdGhpc30sdGhpcy5yZW1vdmVIYW5kbGVyPWZ1bmN0aW9uKGwpe2NvbnN0IHU9aC5pbmRleE9mKGwpO3JldHVybiB1IT09LTEmJmguc3BsaWNlKHUsMiksdGhpc30sdGhpcy5nZXRIYW5kbGVyPWZ1bmN0aW9uKGwpe2ZvcihsZXQgdT0wLGQ9aC5sZW5ndGg7dTxkO3UrPTIpe2NvbnN0IGY9aFt1XSxwPWhbdSsxXTtpZihmLmdsb2JhbCYmKGYubGFzdEluZGV4PTApLGYudGVzdChsKSlyZXR1cm4gcH1yZXR1cm4gbnVsbH19fWNvbnN0IG9oPW5ldyByaDtjbGFzcyBGZXtjb25zdHJ1Y3Rvcih0KXt0aGlzLm1hbmFnZXI9dCE9PXZvaWQgMD90Om9oLHRoaXMuY3Jvc3NPcmlnaW49ImFub255bW91cyIsdGhpcy53aXRoQ3JlZGVudGlhbHM9ITEsdGhpcy5wYXRoPSIiLHRoaXMucmVzb3VyY2VQYXRoPSIiLHRoaXMucmVxdWVzdEhlYWRlcj17fX1sb2FkKCl7fWxvYWRBc3luYyh0LGUpe2NvbnN0IHM9dGhpcztyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24oaSxuKXtzLmxvYWQodCxpLGUsbil9KX1wYXJzZSgpe31zZXRDcm9zc09yaWdpbih0KXtyZXR1cm4gdGhpcy5jcm9zc09yaWdpbj10LHRoaXN9c2V0V2l0aENyZWRlbnRpYWxzKHQpe3JldHVybiB0aGlzLndpdGhDcmVkZW50aWFscz10LHRoaXN9c2V0UGF0aCh0KXtyZXR1cm4gdGhpcy5wYXRoPXQsdGhpc31zZXRSZXNvdXJjZVBhdGgodCl7cmV0dXJuIHRoaXMucmVzb3VyY2VQYXRoPXQsdGhpc31zZXRSZXF1ZXN0SGVhZGVyKHQpe3JldHVybiB0aGlzLnJlcXVlc3RIZWFkZXI9dCx0aGlzfX1jb25zdCBNdD17fTtjbGFzcyB4ciBleHRlbmRzIEZle2NvbnN0cnVjdG9yKHQpe3N1cGVyKHQpfWxvYWQodCxlLHMsaSl7dD09PXZvaWQgMCYmKHQ9IiIpLHRoaXMucGF0aCE9PXZvaWQgMCYmKHQ9dGhpcy5wYXRoK3QpLHQ9dGhpcy5tYW5hZ2VyLnJlc29sdmVVUkwodCk7Y29uc3Qgbj1mZS5nZXQodCk7aWYobiE9PXZvaWQgMClyZXR1cm4gdGhpcy5tYW5hZ2VyLml0ZW1TdGFydCh0KSxzZXRUaW1lb3V0KCgpPT57ZSYmZShuKSx0aGlzLm1hbmFnZXIuaXRlbUVuZCh0KX0sMCksbjtpZihNdFt0XSE9PXZvaWQgMCl7TXRbdF0ucHVzaCh7b25Mb2FkOmUsb25Qcm9ncmVzczpzLG9uRXJyb3I6aX0pO3JldHVybn1NdFt0XT1bXSxNdFt0XS5wdXNoKHtvbkxvYWQ6ZSxvblByb2dyZXNzOnMsb25FcnJvcjppfSk7Y29uc3Qgcj1uZXcgUmVxdWVzdCh0LHtoZWFkZXJzOm5ldyBIZWFkZXJzKHRoaXMucmVxdWVzdEhlYWRlciksY3JlZGVudGlhbHM6dGhpcy53aXRoQ3JlZGVudGlhbHM/ImluY2x1ZGUiOiJzYW1lLW9yaWdpbiJ9KSxvPXRoaXMubWltZVR5cGUsYT10aGlzLnJlc3BvbnNlVHlwZTtmZXRjaChyKS50aGVuKGg9PntpZihoLnN0YXR1cz09PTIwMHx8aC5zdGF0dXM9PT0wKXtpZihoLnN0YXR1cz09PTAmJmNvbnNvbGUud2FybigiVEhSRUUuRmlsZUxvYWRlcjogSFRUUCBTdGF0dXMgMCByZWNlaXZlZC4iKSx0eXBlb2YgUmVhZGFibGVTdHJlYW0+InUifHxoLmJvZHk9PT12b2lkIDB8fGguYm9keS5nZXRSZWFkZXI9PT12b2lkIDApcmV0dXJuIGg7Y29uc3QgbD1NdFt0XSx1PWguYm9keS5nZXRSZWFkZXIoKSxkPWguaGVhZGVycy5nZXQoIkNvbnRlbnQtTGVuZ3RoIiksZj1kP3BhcnNlSW50KGQpOjAscD1mIT09MDtsZXQgbT0wO2NvbnN0IGc9bmV3IFJlYWRhYmxlU3RyZWFtKHtzdGFydCh5KXtNKCk7ZnVuY3Rpb24gTSgpe3UucmVhZCgpLnRoZW4oKHtkb25lOncsdmFsdWU6X30pPT57aWYodyl5LmNsb3NlKCk7ZWxzZXttKz1fLmJ5dGVMZW5ndGg7Y29uc3QgYj1uZXcgUHJvZ3Jlc3NFdmVudCgicHJvZ3Jlc3MiLHtsZW5ndGhDb21wdXRhYmxlOnAsbG9hZGVkOm0sdG90YWw6Zn0pO2ZvcihsZXQgQT0wLFM9bC5sZW5ndGg7QTxTO0ErKyl7Y29uc3Qgdj1sW0FdO3Yub25Qcm9ncmVzcyYmdi5vblByb2dyZXNzKGIpfXkuZW5xdWV1ZShfKSxNKCl9fSl9fX0pO3JldHVybiBuZXcgUmVzcG9uc2UoZyl9ZWxzZSB0aHJvdyBFcnJvcihgZmV0Y2ggZm9yICIke2gudXJsfSIgcmVzcG9uZGVkIHdpdGggJHtoLnN0YXR1c306ICR7aC5zdGF0dXNUZXh0fWApfSkudGhlbihoPT57c3dpdGNoKGEpe2Nhc2UiYXJyYXlidWZmZXIiOnJldHVybiBoLmFycmF5QnVmZmVyKCk7Y2FzZSJibG9iIjpyZXR1cm4gaC5ibG9iKCk7Y2FzZSJkb2N1bWVudCI6cmV0dXJuIGgudGV4dCgpLnRoZW4obD0+bmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhsLG8pKTtjYXNlImpzb24iOnJldHVybiBoLmpzb24oKTtkZWZhdWx0OmlmKG89PT12b2lkIDApcmV0dXJuIGgudGV4dCgpO3tjb25zdCB1PS9jaGFyc2V0PSI/KFteOyJcc10qKSI/L2kuZXhlYyhvKSxkPXUmJnVbMV0/dVsxXS50b0xvd2VyQ2FzZSgpOnZvaWQgMCxmPW5ldyBUZXh0RGVjb2RlcihkKTtyZXR1cm4gaC5hcnJheUJ1ZmZlcigpLnRoZW4ocD0+Zi5kZWNvZGUocCkpfX19KS50aGVuKGg9PntmZS5hZGQodCxoKTtjb25zdCBsPU10W3RdO2RlbGV0ZSBNdFt0XTtmb3IobGV0IHU9MCxkPWwubGVuZ3RoO3U8ZDt1Kyspe2NvbnN0IGY9bFt1XTtmLm9uTG9hZCYmZi5vbkxvYWQoaCl9fSkuY2F0Y2goaD0+e2NvbnN0IGw9TXRbdF07aWYobD09PXZvaWQgMCl0aHJvdyB0aGlzLm1hbmFnZXIuaXRlbUVycm9yKHQpLGg7ZGVsZXRlIE10W3RdO2ZvcihsZXQgdT0wLGQ9bC5sZW5ndGg7dTxkO3UrKyl7Y29uc3QgZj1sW3VdO2Yub25FcnJvciYmZi5vbkVycm9yKGgpfXRoaXMubWFuYWdlci5pdGVtRXJyb3IodCl9KS5maW5hbGx5KCgpPT57dGhpcy5tYW5hZ2VyLml0ZW1FbmQodCl9KSx0aGlzLm1hbmFnZXIuaXRlbVN0YXJ0KHQpfXNldFJlc3BvbnNlVHlwZSh0KXtyZXR1cm4gdGhpcy5yZXNwb25zZVR5cGU9dCx0aGlzfXNldE1pbWVUeXBlKHQpe3JldHVybiB0aGlzLm1pbWVUeXBlPXQsdGhpc319Y2xhc3MgYWggZXh0ZW5kcyBGZXtjb25zdHJ1Y3Rvcih0KXtzdXBlcih0KX1sb2FkKHQsZSxzLGkpe3RoaXMucGF0aCE9PXZvaWQgMCYmKHQ9dGhpcy5wYXRoK3QpLHQ9dGhpcy5tYW5hZ2VyLnJlc29sdmVVUkwodCk7Y29uc3Qgbj10aGlzLHI9ZmUuZ2V0KHQpO2lmKHIhPT12b2lkIDApcmV0dXJuIG4ubWFuYWdlci5pdGVtU3RhcnQodCksc2V0VGltZW91dChmdW5jdGlvbigpe2UmJmUociksbi5tYW5hZ2VyLml0ZW1FbmQodCl9LDApLHI7Y29uc3Qgbz1laSgiaW1nIik7ZnVuY3Rpb24gYSgpe2woKSxmZS5hZGQodCx0aGlzKSxlJiZlKHRoaXMpLG4ubWFuYWdlci5pdGVtRW5kKHQpfWZ1bmN0aW9uIGgodSl7bCgpLGkmJmkodSksbi5tYW5hZ2VyLml0ZW1FcnJvcih0KSxuLm1hbmFnZXIuaXRlbUVuZCh0KX1mdW5jdGlvbiBsKCl7by5yZW1vdmVFdmVudExpc3RlbmVyKCJsb2FkIixhLCExKSxvLnJlbW92ZUV2ZW50TGlzdGVuZXIoImVycm9yIixoLCExKX1yZXR1cm4gby5hZGRFdmVudExpc3RlbmVyKCJsb2FkIixhLCExKSxvLmFkZEV2ZW50TGlzdGVuZXIoImVycm9yIixoLCExKSx0LnNsaWNlKDAsNSkhPT0iZGF0YToiJiZ0aGlzLmNyb3NzT3JpZ2luIT09dm9pZCAwJiYoby5jcm9zc09yaWdpbj10aGlzLmNyb3NzT3JpZ2luKSxuLm1hbmFnZXIuaXRlbVN0YXJ0KHQpLG8uc3JjPXQsb319Y2xhc3MgaGggZXh0ZW5kcyBGZXtjb25zdHJ1Y3Rvcih0KXtzdXBlcih0KX1sb2FkKHQsZSxzLGkpe2NvbnN0IG49bmV3IEF0LHI9bmV3IGFoKHRoaXMubWFuYWdlcik7cmV0dXJuIHIuc2V0Q3Jvc3NPcmlnaW4odGhpcy5jcm9zc09yaWdpbiksci5zZXRQYXRoKHRoaXMucGF0aCksci5sb2FkKHQsZnVuY3Rpb24obyl7bi5pbWFnZT1vLG4ubmVlZHNVcGRhdGU9ITAsZSE9PXZvaWQgMCYmZShuKX0scyxpKSxufX1jbGFzcyBJaSBleHRlbmRzIGp7Y29uc3RydWN0b3IodCxlPTEpe3N1cGVyKCksdGhpcy5pc0xpZ2h0PSEwLHRoaXMudHlwZT0iTGlnaHQiLHRoaXMuY29sb3I9bmV3IFAodCksdGhpcy5pbnRlbnNpdHk9ZX1kaXNwb3NlKCl7fWNvcHkodCxlKXtyZXR1cm4gc3VwZXIuY29weSh0LGUpLHRoaXMuY29sb3IuY29weSh0LmNvbG9yKSx0aGlzLmludGVuc2l0eT10LmludGVuc2l0eSx0aGlzfXRvSlNPTih0KXtjb25zdCBlPXN1cGVyLnRvSlNPTih0KTtyZXR1cm4gZS5vYmplY3QuY29sb3I9dGhpcy5jb2xvci5nZXRIZXgoKSxlLm9iamVjdC5pbnRlbnNpdHk9dGhpcy5pbnRlbnNpdHksdGhpcy5ncm91bmRDb2xvciE9PXZvaWQgMCYmKGUub2JqZWN0Lmdyb3VuZENvbG9yPXRoaXMuZ3JvdW5kQ29sb3IuZ2V0SGV4KCkpLHRoaXMuZGlzdGFuY2UhPT12b2lkIDAmJihlLm9iamVjdC5kaXN0YW5jZT10aGlzLmRpc3RhbmNlKSx0aGlzLmFuZ2xlIT09dm9pZCAwJiYoZS5vYmplY3QuYW5nbGU9dGhpcy5hbmdsZSksdGhpcy5kZWNheSE9PXZvaWQgMCYmKGUub2JqZWN0LmRlY2F5PXRoaXMuZGVjYXkpLHRoaXMucGVudW1icmEhPT12b2lkIDAmJihlLm9iamVjdC5wZW51bWJyYT10aGlzLnBlbnVtYnJhKSx0aGlzLnNoYWRvdyE9PXZvaWQgMCYmKGUub2JqZWN0LnNoYWRvdz10aGlzLnNoYWRvdy50b0pTT04oKSksZX19Y29uc3QgYnI9bmV3IEIsd3I9bmV3IHgsTXI9bmV3IHg7Y2xhc3MgQ2l7Y29uc3RydWN0b3IodCl7dGhpcy5jYW1lcmE9dCx0aGlzLmJpYXM9MCx0aGlzLm5vcm1hbEJpYXM9MCx0aGlzLnJhZGl1cz0xLHRoaXMuYmx1clNhbXBsZXM9OCx0aGlzLm1hcFNpemU9bmV3IE8oNTEyLDUxMiksdGhpcy5tYXA9bnVsbCx0aGlzLm1hcFBhc3M9bnVsbCx0aGlzLm1hdHJpeD1uZXcgQix0aGlzLmF1dG9VcGRhdGU9ITAsdGhpcy5uZWVkc1VwZGF0ZT0hMSx0aGlzLl9mcnVzdHVtPW5ldyBqYSx0aGlzLl9mcmFtZUV4dGVudHM9bmV3IE8oMSwxKSx0aGlzLl92aWV3cG9ydENvdW50PTEsdGhpcy5fdmlld3BvcnRzPVtuZXcgSygwLDAsMSwxKV19Z2V0Vmlld3BvcnRDb3VudCgpe3JldHVybiB0aGlzLl92aWV3cG9ydENvdW50fWdldEZydXN0dW0oKXtyZXR1cm4gdGhpcy5fZnJ1c3R1bX11cGRhdGVNYXRyaWNlcyh0KXtjb25zdCBlPXRoaXMuY2FtZXJhLHM9dGhpcy5tYXRyaXg7d3Iuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHQubWF0cml4V29ybGQpLGUucG9zaXRpb24uY29weSh3ciksTXIuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHQudGFyZ2V0Lm1hdHJpeFdvcmxkKSxlLmxvb2tBdChNciksZS51cGRhdGVNYXRyaXhXb3JsZCgpLGJyLm11bHRpcGx5TWF0cmljZXMoZS5wcm9qZWN0aW9uTWF0cml4LGUubWF0cml4V29ybGRJbnZlcnNlKSx0aGlzLl9mcnVzdHVtLnNldEZyb21Qcm9qZWN0aW9uTWF0cml4KGJyKSxzLnNldCguNSwwLDAsLjUsMCwuNSwwLC41LDAsMCwuNSwuNSwwLDAsMCwxKSxzLm11bHRpcGx5KGUucHJvamVjdGlvbk1hdHJpeCkscy5tdWx0aXBseShlLm1hdHJpeFdvcmxkSW52ZXJzZSl9Z2V0Vmlld3BvcnQodCl7cmV0dXJuIHRoaXMuX3ZpZXdwb3J0c1t0XX1nZXRGcmFtZUV4dGVudHMoKXtyZXR1cm4gdGhpcy5fZnJhbWVFeHRlbnRzfWRpc3Bvc2UoKXt0aGlzLm1hcCYmdGhpcy5tYXAuZGlzcG9zZSgpLHRoaXMubWFwUGFzcyYmdGhpcy5tYXBQYXNzLmRpc3Bvc2UoKX1jb3B5KHQpe3JldHVybiB0aGlzLmNhbWVyYT10LmNhbWVyYS5jbG9uZSgpLHRoaXMuYmlhcz10LmJpYXMsdGhpcy5yYWRpdXM9dC5yYWRpdXMsdGhpcy5tYXBTaXplLmNvcHkodC5tYXBTaXplKSx0aGlzfWNsb25lKCl7cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKCkuY29weSh0aGlzKX10b0pTT04oKXtjb25zdCB0PXt9O3JldHVybiB0aGlzLmJpYXMhPT0wJiYodC5iaWFzPXRoaXMuYmlhcyksdGhpcy5ub3JtYWxCaWFzIT09MCYmKHQubm9ybWFsQmlhcz10aGlzLm5vcm1hbEJpYXMpLHRoaXMucmFkaXVzIT09MSYmKHQucmFkaXVzPXRoaXMucmFkaXVzKSwodGhpcy5tYXBTaXplLnghPT01MTJ8fHRoaXMubWFwU2l6ZS55IT09NTEyKSYmKHQubWFwU2l6ZT10aGlzLm1hcFNpemUudG9BcnJheSgpKSx0LmNhbWVyYT10aGlzLmNhbWVyYS50b0pTT04oITEpLm9iamVjdCxkZWxldGUgdC5jYW1lcmEubWF0cml4LHR9fWNsYXNzIGNoIGV4dGVuZHMgQ2l7Y29uc3RydWN0b3IoKXtzdXBlcihuZXcgVGkoNTAsMSwuNSw1MDApKSx0aGlzLmlzU3BvdExpZ2h0U2hhZG93PSEwLHRoaXMuZm9jdXM9MX11cGRhdGVNYXRyaWNlcyh0KXtjb25zdCBlPXRoaXMuY2FtZXJhLHM9X2UqMip0LmFuZ2xlKnRoaXMuZm9jdXMsaT10aGlzLm1hcFNpemUud2lkdGgvdGhpcy5tYXBTaXplLmhlaWdodCxuPXQuZGlzdGFuY2V8fGUuZmFyOyhzIT09ZS5mb3Z8fGkhPT1lLmFzcGVjdHx8biE9PWUuZmFyKSYmKGUuZm92PXMsZS5hc3BlY3Q9aSxlLmZhcj1uLGUudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpKSxzdXBlci51cGRhdGVNYXRyaWNlcyh0KX1jb3B5KHQpe3JldHVybiBzdXBlci5jb3B5KHQpLHRoaXMuZm9jdXM9dC5mb2N1cyx0aGlzfX1jbGFzcyBsaCBleHRlbmRzIElpe2NvbnN0cnVjdG9yKHQsZSxzPTAsaT1NYXRoLlBJLzMsbj0wLHI9MSl7c3VwZXIodCxlKSx0aGlzLmlzU3BvdExpZ2h0PSEwLHRoaXMudHlwZT0iU3BvdExpZ2h0Iix0aGlzLnBvc2l0aW9uLmNvcHkoai5EZWZhdWx0VXApLHRoaXMudXBkYXRlTWF0cml4KCksdGhpcy50YXJnZXQ9bmV3IGosdGhpcy5kaXN0YW5jZT1zLHRoaXMuYW5nbGU9aSx0aGlzLnBlbnVtYnJhPW4sdGhpcy5kZWNheT1yLHRoaXMuc2hhZG93PW5ldyBjaH1nZXQgcG93ZXIoKXtyZXR1cm4gdGhpcy5pbnRlbnNpdHkqTWF0aC5QSX1zZXQgcG93ZXIodCl7dGhpcy5pbnRlbnNpdHk9dC9NYXRoLlBJfWRpc3Bvc2UoKXt0aGlzLnNoYWRvdy5kaXNwb3NlKCl9Y29weSh0LGUpe3JldHVybiBzdXBlci5jb3B5KHQsZSksdGhpcy5kaXN0YW5jZT10LmRpc3RhbmNlLHRoaXMuYW5nbGU9dC5hbmdsZSx0aGlzLnBlbnVtYnJhPXQucGVudW1icmEsdGhpcy5kZWNheT10LmRlY2F5LHRoaXMudGFyZ2V0PXQudGFyZ2V0LmNsb25lKCksdGhpcy5zaGFkb3c9dC5zaGFkb3cuY2xvbmUoKSx0aGlzfX1jb25zdCBfcj1uZXcgQixJZT1uZXcgeCxraT1uZXcgeDtjbGFzcyB1aCBleHRlbmRzIENpe2NvbnN0cnVjdG9yKCl7c3VwZXIobmV3IFRpKDkwLDEsLjUsNTAwKSksdGhpcy5pc1BvaW50TGlnaHRTaGFkb3c9ITAsdGhpcy5fZnJhbWVFeHRlbnRzPW5ldyBPKDQsMiksdGhpcy5fdmlld3BvcnRDb3VudD02LHRoaXMuX3ZpZXdwb3J0cz1bbmV3IEsoMiwxLDEsMSksbmV3IEsoMCwxLDEsMSksbmV3IEsoMywxLDEsMSksbmV3IEsoMSwxLDEsMSksbmV3IEsoMywwLDEsMSksbmV3IEsoMSwwLDEsMSldLHRoaXMuX2N1YmVEaXJlY3Rpb25zPVtuZXcgeCgxLDAsMCksbmV3IHgoLTEsMCwwKSxuZXcgeCgwLDAsMSksbmV3IHgoMCwwLC0xKSxuZXcgeCgwLDEsMCksbmV3IHgoMCwtMSwwKV0sdGhpcy5fY3ViZVVwcz1bbmV3IHgoMCwxLDApLG5ldyB4KDAsMSwwKSxuZXcgeCgwLDEsMCksbmV3IHgoMCwxLDApLG5ldyB4KDAsMCwxKSxuZXcgeCgwLDAsLTEpXX11cGRhdGVNYXRyaWNlcyh0LGU9MCl7Y29uc3Qgcz10aGlzLmNhbWVyYSxpPXRoaXMubWF0cml4LG49dC5kaXN0YW5jZXx8cy5mYXI7biE9PXMuZmFyJiYocy5mYXI9bixzLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKSksSWUuc2V0RnJvbU1hdHJpeFBvc2l0aW9uKHQubWF0cml4V29ybGQpLHMucG9zaXRpb24uY29weShJZSksa2kuY29weShzLnBvc2l0aW9uKSxraS5hZGQodGhpcy5fY3ViZURpcmVjdGlvbnNbZV0pLHMudXAuY29weSh0aGlzLl9jdWJlVXBzW2VdKSxzLmxvb2tBdChraSkscy51cGRhdGVNYXRyaXhXb3JsZCgpLGkubWFrZVRyYW5zbGF0aW9uKC1JZS54LC1JZS55LC1JZS56KSxfci5tdWx0aXBseU1hdHJpY2VzKHMucHJvamVjdGlvbk1hdHJpeCxzLm1hdHJpeFdvcmxkSW52ZXJzZSksdGhpcy5fZnJ1c3R1bS5zZXRGcm9tUHJvamVjdGlvbk1hdHJpeChfcil9fWNsYXNzIGRoIGV4dGVuZHMgSWl7Y29uc3RydWN0b3IodCxlLHM9MCxpPTEpe3N1cGVyKHQsZSksdGhpcy5pc1BvaW50TGlnaHQ9ITAsdGhpcy50eXBlPSJQb2ludExpZ2h0Iix0aGlzLmRpc3RhbmNlPXMsdGhpcy5kZWNheT1pLHRoaXMuc2hhZG93PW5ldyB1aH1nZXQgcG93ZXIoKXtyZXR1cm4gdGhpcy5pbnRlbnNpdHkqNCpNYXRoLlBJfXNldCBwb3dlcih0KXt0aGlzLmludGVuc2l0eT10Lyg0Kk1hdGguUEkpfWRpc3Bvc2UoKXt0aGlzLnNoYWRvdy5kaXNwb3NlKCl9Y29weSh0LGUpe3JldHVybiBzdXBlci5jb3B5KHQsZSksdGhpcy5kaXN0YW5jZT10LmRpc3RhbmNlLHRoaXMuZGVjYXk9dC5kZWNheSx0aGlzLnNoYWRvdz10LnNoYWRvdy5jbG9uZSgpLHRoaXN9fWNsYXNzIGZoIGV4dGVuZHMgQ2l7Y29uc3RydWN0b3IoKXtzdXBlcihuZXcgdHIoLTUsNSw1LC01LC41LDUwMCkpLHRoaXMuaXNEaXJlY3Rpb25hbExpZ2h0U2hhZG93PSEwfX1jbGFzcyBwaCBleHRlbmRzIElpe2NvbnN0cnVjdG9yKHQsZSl7c3VwZXIodCxlKSx0aGlzLmlzRGlyZWN0aW9uYWxMaWdodD0hMCx0aGlzLnR5cGU9IkRpcmVjdGlvbmFsTGlnaHQiLHRoaXMucG9zaXRpb24uY29weShqLkRlZmF1bHRVcCksdGhpcy51cGRhdGVNYXRyaXgoKSx0aGlzLnRhcmdldD1uZXcgaix0aGlzLnNoYWRvdz1uZXcgZmh9ZGlzcG9zZSgpe3RoaXMuc2hhZG93LmRpc3Bvc2UoKX1jb3B5KHQpe3JldHVybiBzdXBlci5jb3B5KHQpLHRoaXMudGFyZ2V0PXQudGFyZ2V0LmNsb25lKCksdGhpcy5zaGFkb3c9dC5zaGFkb3cuY2xvbmUoKSx0aGlzfX1jbGFzcyBDZXtzdGF0aWMgZGVjb2RlVGV4dCh0KXtpZih0eXBlb2YgVGV4dERlY29kZXI8InUiKXJldHVybiBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUodCk7bGV0IGU9IiI7Zm9yKGxldCBzPTAsaT10Lmxlbmd0aDtzPGk7cysrKWUrPVN0cmluZy5mcm9tQ2hhckNvZGUodFtzXSk7dHJ5e3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGUpKX1jYXRjaHtyZXR1cm4gZX19c3RhdGljIGV4dHJhY3RVcmxCYXNlKHQpe2NvbnN0IGU9dC5sYXN0SW5kZXhPZigiLyIpO3JldHVybiBlPT09LTE/Ii4vIjp0LnNsaWNlKDAsZSsxKX1zdGF0aWMgcmVzb2x2ZVVSTCh0LGUpe3JldHVybiB0eXBlb2YgdCE9InN0cmluZyJ8fHQ9PT0iIj8iIjooL15odHRwcz86XC9cLy9pLnRlc3QoZSkmJi9eXC8vLnRlc3QodCkmJihlPWUucmVwbGFjZSgvKF5odHRwcz86XC9cL1teXC9dKykuKi9pLCIkMSIpKSwvXihodHRwcz86KT9cL1wvL2kudGVzdCh0KXx8L15kYXRhOi4qLC4qJC9pLnRlc3QodCl8fC9eYmxvYjouKiQvaS50ZXN0KHQpP3Q6ZSt0KX19Y2xhc3MgbWggZXh0ZW5kcyBGZXtjb25zdHJ1Y3Rvcih0KXtzdXBlcih0KSx0aGlzLmlzSW1hZ2VCaXRtYXBMb2FkZXI9ITAsdHlwZW9mIGNyZWF0ZUltYWdlQml0bWFwPiJ1IiYmY29uc29sZS53YXJuKCJUSFJFRS5JbWFnZUJpdG1hcExvYWRlcjogY3JlYXRlSW1hZ2VCaXRtYXAoKSBub3Qgc3VwcG9ydGVkLiIpLHR5cGVvZiBmZXRjaD4idSImJmNvbnNvbGUud2FybigiVEhSRUUuSW1hZ2VCaXRtYXBMb2FkZXI6IGZldGNoKCkgbm90IHN1cHBvcnRlZC4iKSx0aGlzLm9wdGlvbnM9e3ByZW11bHRpcGx5QWxwaGE6Im5vbmUifX1zZXRPcHRpb25zKHQpe3JldHVybiB0aGlzLm9wdGlvbnM9dCx0aGlzfWxvYWQodCxlLHMsaSl7dD09PXZvaWQgMCYmKHQ9IiIpLHRoaXMucGF0aCE9PXZvaWQgMCYmKHQ9dGhpcy5wYXRoK3QpLHQ9dGhpcy5tYW5hZ2VyLnJlc29sdmVVUkwodCk7Y29uc3Qgbj10aGlzLHI9ZmUuZ2V0KHQpO2lmKHIhPT12b2lkIDApcmV0dXJuIG4ubWFuYWdlci5pdGVtU3RhcnQodCksc2V0VGltZW91dChmdW5jdGlvbigpe2UmJmUociksbi5tYW5hZ2VyLml0ZW1FbmQodCl9LDApLHI7Y29uc3Qgbz17fTtvLmNyZWRlbnRpYWxzPXRoaXMuY3Jvc3NPcmlnaW49PT0iYW5vbnltb3VzIj8ic2FtZS1vcmlnaW4iOiJpbmNsdWRlIixvLmhlYWRlcnM9dGhpcy5yZXF1ZXN0SGVhZGVyLGZldGNoKHQsbykudGhlbihmdW5jdGlvbihhKXtyZXR1cm4gYS5ibG9iKCl9KS50aGVuKGZ1bmN0aW9uKGEpe3JldHVybiBjcmVhdGVJbWFnZUJpdG1hcChhLE9iamVjdC5hc3NpZ24obi5vcHRpb25zLHtjb2xvclNwYWNlQ29udmVyc2lvbjoibm9uZSJ9KSl9KS50aGVuKGZ1bmN0aW9uKGEpe2ZlLmFkZCh0LGEpLGUmJmUoYSksbi5tYW5hZ2VyLml0ZW1FbmQodCl9KS5jYXRjaChmdW5jdGlvbihhKXtpJiZpKGEpLG4ubWFuYWdlci5pdGVtRXJyb3IodCksbi5tYW5hZ2VyLml0ZW1FbmQodCl9KSxuLm1hbmFnZXIuaXRlbVN0YXJ0KHQpfX1jb25zdCBOaT0iXFxbXFxdXFwuOlxcLyIseWg9bmV3IFJlZ0V4cCgiWyIrTmkrIl0iLCJnIiksRGk9IlteIitOaSsiXSIsZ2g9IlteIitOaS5yZXBsYWNlKCJcXC4iLCIiKSsiXSIseGg9LygoPzpXQytbXC86XSkqKS8uc291cmNlLnJlcGxhY2UoIldDIixEaSksYmg9LyhXQ09EKyk/Ly5zb3VyY2UucmVwbGFjZSgiV0NPRCIsZ2gpLHdoPS8oPzpcLihXQyspKD86XFsoLispXF0pPyk/Ly5zb3VyY2UucmVwbGFjZSgiV0MiLERpKSxNaD0vXC4oV0MrKSg/OlxbKC4rKVxdKT8vLnNvdXJjZS5yZXBsYWNlKCJXQyIsRGkpLF9oPW5ldyBSZWdFeHAoIl4iK3hoK2JoK3doK01oKyIkIiksU2g9WyJtYXRlcmlhbCIsIm1hdGVyaWFscyIsImJvbmVzIl07Y2xhc3MgQWh7Y29uc3RydWN0b3IodCxlLHMpe2NvbnN0IGk9c3x8Ri5wYXJzZVRyYWNrTmFtZShlKTt0aGlzLl90YXJnZXRHcm91cD10LHRoaXMuX2JpbmRpbmdzPXQuc3Vic2NyaWJlXyhlLGkpfWdldFZhbHVlKHQsZSl7dGhpcy5iaW5kKCk7Y29uc3Qgcz10aGlzLl90YXJnZXRHcm91cC5uQ2FjaGVkT2JqZWN0c18saT10aGlzLl9iaW5kaW5nc1tzXTtpIT09dm9pZCAwJiZpLmdldFZhbHVlKHQsZSl9c2V0VmFsdWUodCxlKXtjb25zdCBzPXRoaXMuX2JpbmRpbmdzO2ZvcihsZXQgaT10aGlzLl90YXJnZXRHcm91cC5uQ2FjaGVkT2JqZWN0c18sbj1zLmxlbmd0aDtpIT09bjsrK2kpc1tpXS5zZXRWYWx1ZSh0LGUpfWJpbmQoKXtjb25zdCB0PXRoaXMuX2JpbmRpbmdzO2ZvcihsZXQgZT10aGlzLl90YXJnZXRHcm91cC5uQ2FjaGVkT2JqZWN0c18scz10Lmxlbmd0aDtlIT09czsrK2UpdFtlXS5iaW5kKCl9dW5iaW5kKCl7Y29uc3QgdD10aGlzLl9iaW5kaW5ncztmb3IobGV0IGU9dGhpcy5fdGFyZ2V0R3JvdXAubkNhY2hlZE9iamVjdHNfLHM9dC5sZW5ndGg7ZSE9PXM7KytlKXRbZV0udW5iaW5kKCl9fWNsYXNzIEZ7Y29uc3RydWN0b3IodCxlLHMpe3RoaXMucGF0aD1lLHRoaXMucGFyc2VkUGF0aD1zfHxGLnBhcnNlVHJhY2tOYW1lKGUpLHRoaXMubm9kZT1GLmZpbmROb2RlKHQsdGhpcy5wYXJzZWRQYXRoLm5vZGVOYW1lKXx8dCx0aGlzLnJvb3ROb2RlPXQsdGhpcy5nZXRWYWx1ZT10aGlzLl9nZXRWYWx1ZV91bmJvdW5kLHRoaXMuc2V0VmFsdWU9dGhpcy5fc2V0VmFsdWVfdW5ib3VuZH1zdGF0aWMgY3JlYXRlKHQsZSxzKXtyZXR1cm4gdCYmdC5pc0FuaW1hdGlvbk9iamVjdEdyb3VwP25ldyBGLkNvbXBvc2l0ZSh0LGUscyk6bmV3IEYodCxlLHMpfXN0YXRpYyBzYW5pdGl6ZU5vZGVOYW1lKHQpe3JldHVybiB0LnJlcGxhY2UoL1xzL2csIl8iKS5yZXBsYWNlKHloLCIiKX1zdGF0aWMgcGFyc2VUcmFja05hbWUodCl7Y29uc3QgZT1faC5leGVjKHQpO2lmKGU9PT1udWxsKXRocm93IG5ldyBFcnJvcigiUHJvcGVydHlCaW5kaW5nOiBDYW5ub3QgcGFyc2UgdHJhY2tOYW1lOiAiK3QpO2NvbnN0IHM9e25vZGVOYW1lOmVbMl0sb2JqZWN0TmFtZTplWzNdLG9iamVjdEluZGV4OmVbNF0scHJvcGVydHlOYW1lOmVbNV0scHJvcGVydHlJbmRleDplWzZdfSxpPXMubm9kZU5hbWUmJnMubm9kZU5hbWUubGFzdEluZGV4T2YoIi4iKTtpZihpIT09dm9pZCAwJiZpIT09LTEpe2NvbnN0IG49cy5ub2RlTmFtZS5zdWJzdHJpbmcoaSsxKTtTaC5pbmRleE9mKG4pIT09LTEmJihzLm5vZGVOYW1lPXMubm9kZU5hbWUuc3Vic3RyaW5nKDAsaSkscy5vYmplY3ROYW1lPW4pfWlmKHMucHJvcGVydHlOYW1lPT09bnVsbHx8cy5wcm9wZXJ0eU5hbWUubGVuZ3RoPT09MCl0aHJvdyBuZXcgRXJyb3IoIlByb3BlcnR5QmluZGluZzogY2FuIG5vdCBwYXJzZSBwcm9wZXJ0eU5hbWUgZnJvbSB0cmFja05hbWU6ICIrdCk7cmV0dXJuIHN9c3RhdGljIGZpbmROb2RlKHQsZSl7aWYoZT09PXZvaWQgMHx8ZT09PSIifHxlPT09Ii4ifHxlPT09LTF8fGU9PT10Lm5hbWV8fGU9PT10LnV1aWQpcmV0dXJuIHQ7aWYodC5za2VsZXRvbil7Y29uc3Qgcz10LnNrZWxldG9uLmdldEJvbmVCeU5hbWUoZSk7aWYocyE9PXZvaWQgMClyZXR1cm4gc31pZih0LmNoaWxkcmVuKXtjb25zdCBzPWZ1bmN0aW9uKG4pe2ZvcihsZXQgcj0wO3I8bi5sZW5ndGg7cisrKXtjb25zdCBvPW5bcl07aWYoby5uYW1lPT09ZXx8by51dWlkPT09ZSlyZXR1cm4gbztjb25zdCBhPXMoby5jaGlsZHJlbik7aWYoYSlyZXR1cm4gYX1yZXR1cm4gbnVsbH0saT1zKHQuY2hpbGRyZW4pO2lmKGkpcmV0dXJuIGl9cmV0dXJuIG51bGx9X2dldFZhbHVlX3VuYXZhaWxhYmxlKCl7fV9zZXRWYWx1ZV91bmF2YWlsYWJsZSgpe31fZ2V0VmFsdWVfZGlyZWN0KHQsZSl7dFtlXT10aGlzLnRhcmdldE9iamVjdFt0aGlzLnByb3BlcnR5TmFtZV19X2dldFZhbHVlX2FycmF5KHQsZSl7Y29uc3Qgcz10aGlzLnJlc29sdmVkUHJvcGVydHk7Zm9yKGxldCBpPTAsbj1zLmxlbmd0aDtpIT09bjsrK2kpdFtlKytdPXNbaV19X2dldFZhbHVlX2FycmF5RWxlbWVudCh0LGUpe3RbZV09dGhpcy5yZXNvbHZlZFByb3BlcnR5W3RoaXMucHJvcGVydHlJbmRleF19X2dldFZhbHVlX3RvQXJyYXkodCxlKXt0aGlzLnJlc29sdmVkUHJvcGVydHkudG9BcnJheSh0LGUpfV9zZXRWYWx1ZV9kaXJlY3QodCxlKXt0aGlzLnRhcmdldE9iamVjdFt0aGlzLnByb3BlcnR5TmFtZV09dFtlXX1fc2V0VmFsdWVfZGlyZWN0X3NldE5lZWRzVXBkYXRlKHQsZSl7dGhpcy50YXJnZXRPYmplY3RbdGhpcy5wcm9wZXJ0eU5hbWVdPXRbZV0sdGhpcy50YXJnZXRPYmplY3QubmVlZHNVcGRhdGU9ITB9X3NldFZhbHVlX2RpcmVjdF9zZXRNYXRyaXhXb3JsZE5lZWRzVXBkYXRlKHQsZSl7dGhpcy50YXJnZXRPYmplY3RbdGhpcy5wcm9wZXJ0eU5hbWVdPXRbZV0sdGhpcy50YXJnZXRPYmplY3QubWF0cml4V29ybGROZWVkc1VwZGF0ZT0hMH1fc2V0VmFsdWVfYXJyYXkodCxlKXtjb25zdCBzPXRoaXMucmVzb2x2ZWRQcm9wZXJ0eTtmb3IobGV0IGk9MCxuPXMubGVuZ3RoO2khPT1uOysraSlzW2ldPXRbZSsrXX1fc2V0VmFsdWVfYXJyYXlfc2V0TmVlZHNVcGRhdGUodCxlKXtjb25zdCBzPXRoaXMucmVzb2x2ZWRQcm9wZXJ0eTtmb3IobGV0IGk9MCxuPXMubGVuZ3RoO2khPT1uOysraSlzW2ldPXRbZSsrXTt0aGlzLnRhcmdldE9iamVjdC5uZWVkc1VwZGF0ZT0hMH1fc2V0VmFsdWVfYXJyYXlfc2V0TWF0cml4V29ybGROZWVkc1VwZGF0ZSh0LGUpe2NvbnN0IHM9dGhpcy5yZXNvbHZlZFByb3BlcnR5O2ZvcihsZXQgaT0wLG49cy5sZW5ndGg7aSE9PW47KytpKXNbaV09dFtlKytdO3RoaXMudGFyZ2V0T2JqZWN0Lm1hdHJpeFdvcmxkTmVlZHNVcGRhdGU9ITB9X3NldFZhbHVlX2FycmF5RWxlbWVudCh0LGUpe3RoaXMucmVzb2x2ZWRQcm9wZXJ0eVt0aGlzLnByb3BlcnR5SW5kZXhdPXRbZV19X3NldFZhbHVlX2FycmF5RWxlbWVudF9zZXROZWVkc1VwZGF0ZSh0LGUpe3RoaXMucmVzb2x2ZWRQcm9wZXJ0eVt0aGlzLnByb3BlcnR5SW5kZXhdPXRbZV0sdGhpcy50YXJnZXRPYmplY3QubmVlZHNVcGRhdGU9ITB9X3NldFZhbHVlX2FycmF5RWxlbWVudF9zZXRNYXRyaXhXb3JsZE5lZWRzVXBkYXRlKHQsZSl7dGhpcy5yZXNvbHZlZFByb3BlcnR5W3RoaXMucHJvcGVydHlJbmRleF09dFtlXSx0aGlzLnRhcmdldE9iamVjdC5tYXRyaXhXb3JsZE5lZWRzVXBkYXRlPSEwfV9zZXRWYWx1ZV9mcm9tQXJyYXkodCxlKXt0aGlzLnJlc29sdmVkUHJvcGVydHkuZnJvbUFycmF5KHQsZSl9X3NldFZhbHVlX2Zyb21BcnJheV9zZXROZWVkc1VwZGF0ZSh0LGUpe3RoaXMucmVzb2x2ZWRQcm9wZXJ0eS5mcm9tQXJyYXkodCxlKSx0aGlzLnRhcmdldE9iamVjdC5uZWVkc1VwZGF0ZT0hMH1fc2V0VmFsdWVfZnJvbUFycmF5X3NldE1hdHJpeFdvcmxkTmVlZHNVcGRhdGUodCxlKXt0aGlzLnJlc29sdmVkUHJvcGVydHkuZnJvbUFycmF5KHQsZSksdGhpcy50YXJnZXRPYmplY3QubWF0cml4V29ybGROZWVkc1VwZGF0ZT0hMH1fZ2V0VmFsdWVfdW5ib3VuZCh0LGUpe3RoaXMuYmluZCgpLHRoaXMuZ2V0VmFsdWUodCxlKX1fc2V0VmFsdWVfdW5ib3VuZCh0LGUpe3RoaXMuYmluZCgpLHRoaXMuc2V0VmFsdWUodCxlKX1iaW5kKCl7bGV0IHQ9dGhpcy5ub2RlO2NvbnN0IGU9dGhpcy5wYXJzZWRQYXRoLHM9ZS5vYmplY3ROYW1lLGk9ZS5wcm9wZXJ0eU5hbWU7bGV0IG49ZS5wcm9wZXJ0eUluZGV4O2lmKHR8fCh0PUYuZmluZE5vZGUodGhpcy5yb290Tm9kZSxlLm5vZGVOYW1lKXx8dGhpcy5yb290Tm9kZSx0aGlzLm5vZGU9dCksdGhpcy5nZXRWYWx1ZT10aGlzLl9nZXRWYWx1ZV91bmF2YWlsYWJsZSx0aGlzLnNldFZhbHVlPXRoaXMuX3NldFZhbHVlX3VuYXZhaWxhYmxlLCF0KXtjb25zb2xlLmVycm9yKCJUSFJFRS5Qcm9wZXJ0eUJpbmRpbmc6IFRyeWluZyB0byB1cGRhdGUgbm9kZSBmb3IgdHJhY2s6ICIrdGhpcy5wYXRoKyIgYnV0IGl0IHdhc24ndCBmb3VuZC4iKTtyZXR1cm59aWYocyl7bGV0IGg9ZS5vYmplY3RJbmRleDtzd2l0Y2gocyl7Y2FzZSJtYXRlcmlhbHMiOmlmKCF0Lm1hdGVyaWFsKXtjb25zb2xlLmVycm9yKCJUSFJFRS5Qcm9wZXJ0eUJpbmRpbmc6IENhbiBub3QgYmluZCB0byBtYXRlcmlhbCBhcyBub2RlIGRvZXMgbm90IGhhdmUgYSBtYXRlcmlhbC4iLHRoaXMpO3JldHVybn1pZighdC5tYXRlcmlhbC5tYXRlcmlhbHMpe2NvbnNvbGUuZXJyb3IoIlRIUkVFLlByb3BlcnR5QmluZGluZzogQ2FuIG5vdCBiaW5kIHRvIG1hdGVyaWFsLm1hdGVyaWFscyBhcyBub2RlLm1hdGVyaWFsIGRvZXMgbm90IGhhdmUgYSBtYXRlcmlhbHMgYXJyYXkuIix0aGlzKTtyZXR1cm59dD10Lm1hdGVyaWFsLm1hdGVyaWFsczticmVhaztjYXNlImJvbmVzIjppZighdC5za2VsZXRvbil7Y29uc29sZS5lcnJvcigiVEhSRUUuUHJvcGVydHlCaW5kaW5nOiBDYW4gbm90IGJpbmQgdG8gYm9uZXMgYXMgbm9kZSBkb2VzIG5vdCBoYXZlIGEgc2tlbGV0b24uIix0aGlzKTtyZXR1cm59dD10LnNrZWxldG9uLmJvbmVzO2ZvcihsZXQgbD0wO2w8dC5sZW5ndGg7bCsrKWlmKHRbbF0ubmFtZT09PWgpe2g9bDticmVha31icmVhaztkZWZhdWx0OmlmKHRbc109PT12b2lkIDApe2NvbnNvbGUuZXJyb3IoIlRIUkVFLlByb3BlcnR5QmluZGluZzogQ2FuIG5vdCBiaW5kIHRvIG9iamVjdE5hbWUgb2Ygbm9kZSB1bmRlZmluZWQuIix0aGlzKTtyZXR1cm59dD10W3NdfWlmKGghPT12b2lkIDApe2lmKHRbaF09PT12b2lkIDApe2NvbnNvbGUuZXJyb3IoIlRIUkVFLlByb3BlcnR5QmluZGluZzogVHJ5aW5nIHRvIGJpbmQgdG8gb2JqZWN0SW5kZXggb2Ygb2JqZWN0TmFtZSwgYnV0IGlzIHVuZGVmaW5lZC4iLHRoaXMsdCk7cmV0dXJufXQ9dFtoXX19Y29uc3Qgcj10W2ldO2lmKHI9PT12b2lkIDApe2NvbnN0IGg9ZS5ub2RlTmFtZTtjb25zb2xlLmVycm9yKCJUSFJFRS5Qcm9wZXJ0eUJpbmRpbmc6IFRyeWluZyB0byB1cGRhdGUgcHJvcGVydHkgZm9yIHRyYWNrOiAiK2grIi4iK2krIiBidXQgaXQgd2Fzbid0IGZvdW5kLiIsdCk7cmV0dXJufWxldCBvPXRoaXMuVmVyc2lvbmluZy5Ob25lO3RoaXMudGFyZ2V0T2JqZWN0PXQsdC5uZWVkc1VwZGF0ZSE9PXZvaWQgMD9vPXRoaXMuVmVyc2lvbmluZy5OZWVkc1VwZGF0ZTp0Lm1hdHJpeFdvcmxkTmVlZHNVcGRhdGUhPT12b2lkIDAmJihvPXRoaXMuVmVyc2lvbmluZy5NYXRyaXhXb3JsZE5lZWRzVXBkYXRlKTtsZXQgYT10aGlzLkJpbmRpbmdUeXBlLkRpcmVjdDtpZihuIT09dm9pZCAwKXtpZihpPT09Im1vcnBoVGFyZ2V0SW5mbHVlbmNlcyIpe2lmKCF0Lmdlb21ldHJ5KXtjb25zb2xlLmVycm9yKCJUSFJFRS5Qcm9wZXJ0eUJpbmRpbmc6IENhbiBub3QgYmluZCB0byBtb3JwaFRhcmdldEluZmx1ZW5jZXMgYmVjYXVzZSBub2RlIGRvZXMgbm90IGhhdmUgYSBnZW9tZXRyeS4iLHRoaXMpO3JldHVybn1pZighdC5nZW9tZXRyeS5tb3JwaEF0dHJpYnV0ZXMpe2NvbnNvbGUuZXJyb3IoIlRIUkVFLlByb3BlcnR5QmluZGluZzogQ2FuIG5vdCBiaW5kIHRvIG1vcnBoVGFyZ2V0SW5mbHVlbmNlcyBiZWNhdXNlIG5vZGUgZG9lcyBub3QgaGF2ZSBhIGdlb21ldHJ5Lm1vcnBoQXR0cmlidXRlcy4iLHRoaXMpO3JldHVybn10Lm1vcnBoVGFyZ2V0RGljdGlvbmFyeVtuXSE9PXZvaWQgMCYmKG49dC5tb3JwaFRhcmdldERpY3Rpb25hcnlbbl0pfWE9dGhpcy5CaW5kaW5nVHlwZS5BcnJheUVsZW1lbnQsdGhpcy5yZXNvbHZlZFByb3BlcnR5PXIsdGhpcy5wcm9wZXJ0eUluZGV4PW59ZWxzZSByLmZyb21BcnJheSE9PXZvaWQgMCYmci50b0FycmF5IT09dm9pZCAwPyhhPXRoaXMuQmluZGluZ1R5cGUuSGFzRnJvbVRvQXJyYXksdGhpcy5yZXNvbHZlZFByb3BlcnR5PXIpOkFycmF5LmlzQXJyYXkocik/KGE9dGhpcy5CaW5kaW5nVHlwZS5FbnRpcmVBcnJheSx0aGlzLnJlc29sdmVkUHJvcGVydHk9cik6dGhpcy5wcm9wZXJ0eU5hbWU9aTt0aGlzLmdldFZhbHVlPXRoaXMuR2V0dGVyQnlCaW5kaW5nVHlwZVthXSx0aGlzLnNldFZhbHVlPXRoaXMuU2V0dGVyQnlCaW5kaW5nVHlwZUFuZFZlcnNpb25pbmdbYV1bb119dW5iaW5kKCl7dGhpcy5ub2RlPW51bGwsdGhpcy5nZXRWYWx1ZT10aGlzLl9nZXRWYWx1ZV91bmJvdW5kLHRoaXMuc2V0VmFsdWU9dGhpcy5fc2V0VmFsdWVfdW5ib3VuZH19Ri5Db21wb3NpdGU9QWgsRi5wcm90b3R5cGUuQmluZGluZ1R5cGU9e0RpcmVjdDowLEVudGlyZUFycmF5OjEsQXJyYXlFbGVtZW50OjIsSGFzRnJvbVRvQXJyYXk6M30sRi5wcm90b3R5cGUuVmVyc2lvbmluZz17Tm9uZTowLE5lZWRzVXBkYXRlOjEsTWF0cml4V29ybGROZWVkc1VwZGF0ZToyfSxGLnByb3RvdHlwZS5HZXR0ZXJCeUJpbmRpbmdUeXBlPVtGLnByb3RvdHlwZS5fZ2V0VmFsdWVfZGlyZWN0LEYucHJvdG90eXBlLl9nZXRWYWx1ZV9hcnJheSxGLnByb3RvdHlwZS5fZ2V0VmFsdWVfYXJyYXlFbGVtZW50LEYucHJvdG90eXBlLl9nZXRWYWx1ZV90b0FycmF5XSxGLnByb3RvdHlwZS5TZXR0ZXJCeUJpbmRpbmdUeXBlQW5kVmVyc2lvbmluZz1bW0YucHJvdG90eXBlLl9zZXRWYWx1ZV9kaXJlY3QsRi5wcm90b3R5cGUuX3NldFZhbHVlX2RpcmVjdF9zZXROZWVkc1VwZGF0ZSxGLnByb3RvdHlwZS5fc2V0VmFsdWVfZGlyZWN0X3NldE1hdHJpeFdvcmxkTmVlZHNVcGRhdGVdLFtGLnByb3RvdHlwZS5fc2V0VmFsdWVfYXJyYXksRi5wcm90b3R5cGUuX3NldFZhbHVlX2FycmF5X3NldE5lZWRzVXBkYXRlLEYucHJvdG90eXBlLl9zZXRWYWx1ZV9hcnJheV9zZXRNYXRyaXhXb3JsZE5lZWRzVXBkYXRlXSxbRi5wcm90b3R5cGUuX3NldFZhbHVlX2FycmF5RWxlbWVudCxGLnByb3RvdHlwZS5fc2V0VmFsdWVfYXJyYXlFbGVtZW50X3NldE5lZWRzVXBkYXRlLEYucHJvdG90eXBlLl9zZXRWYWx1ZV9hcnJheUVsZW1lbnRfc2V0TWF0cml4V29ybGROZWVkc1VwZGF0ZV0sW0YucHJvdG90eXBlLl9zZXRWYWx1ZV9mcm9tQXJyYXksRi5wcm90b3R5cGUuX3NldFZhbHVlX2Zyb21BcnJheV9zZXROZWVkc1VwZGF0ZSxGLnByb3RvdHlwZS5fc2V0VmFsdWVfZnJvbUFycmF5X3NldE1hdHJpeFdvcmxkTmVlZHNVcGRhdGVdXSx0eXBlb2YgX19USFJFRV9ERVZUT09MU19fPCJ1IiYmX19USFJFRV9ERVZUT09MU19fLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCJyZWdpc3RlciIse2RldGFpbDp7cmV2aXNpb246Um59fSkpLHR5cGVvZiB3aW5kb3c8InUiJiYod2luZG93Ll9fVEhSRUVfXz9jb25zb2xlLndhcm4oIldBUk5JTkc6IE11bHRpcGxlIGluc3RhbmNlcyBvZiBUaHJlZS5qcyBiZWluZyBpbXBvcnRlZC4iKTp3aW5kb3cuX19USFJFRV9fPVJuKTtjbGFzcyBwZXtjb25zdHJ1Y3Rvcigpe0UodGhpcywidmVydHMiLG5ldyBGbG9hdDMyQXJyYXkoMCkpO0UodGhpcywiZWxOdW1zIixuZXcgRmxvYXQzMkFycmF5KDApKTtFKHRoaXMsImluZGV4IixuZXcgVWludDMyQXJyYXkoMCkpO0UodGhpcywiZ2VvbUZpbGVOdW1iZXIiLDApO0UodGhpcywiYm94IixuZXcgb3QpfXN0YXRpYyBnZXRHZW9tRWxOdW1iZXIodCxlKXtyZXR1cm4odCsxKSoxZTYrZX1zdGF0aWMgZ2V0R2VvbU51bWJlcih0KXtyZXR1cm4gTWF0aC5mbG9vcih0LzFlNiktMX19Y2xhc3MgU3IgZXh0ZW5kcyBwZXtjb25zdHJ1Y3RvcihlLHMsaSxuLHIpe3N1cGVyKCk7RSh0aGlzLCJvcmlnaW4iKTtFKHRoaXMsIm5PcmlnaW4iKTtFKHRoaXMsInR5cGUiLCJtZXNoIik7RSh0aGlzLCJnZW9tRmlsZVRvdGFsIik7RSh0aGlzLCJvcGFjaXR5Iik7RSh0aGlzLCJjb2xvciIpO0UodGhpcywibWF0TmFtZSIpO0UodGhpcywiaW5zdGFuY2VzIixbXSk7RSh0aGlzLCJ0cmFuc3BhcmVudCIsITApO3RoaXMub3JpZ2luPXIsdGhpcy5uT3JpZ2luPW5ldyB4KCkuY29weSh0aGlzLm9yaWdpbikubmVnYXRlKCk7Y29uc3Qgbz1lLm5hbWU9PSIiP2UudXVpZDplLm5hbWU7bGV0IGE9Im1lc2giO3MgaW5zdGFuY2VvZiB6ZSYmKGE9ImxpbmUiLGUub3BhY2l0eT0xLGUudHJhbnNwYXJlbnQ9ITEpLHRoaXMudHlwZT1hLHRoaXMub3BhY2l0eT1lLm9wYWNpdHksdGhpcy5jb2xvcj1lLmNvbG9yLHRoaXMubWF0TmFtZT1vLHRoaXMuZ2VvbUZpbGVOdW1iZXI9aSx0aGlzLmdlb21GaWxlVG90YWw9bn1wcm9jZXNzU2hhcmVkR2VvbWV0cnkoZSxzLGkpe3ZhciB1O2NvbnN0IG49ZS5nZW9tZXRyeSxyPW4uZ2V0QXR0cmlidXRlKCJwb3NpdGlvbiIpLG89bi5nZXRBdHRyaWJ1dGUoIl9lbGVtZW50bnVtIiksYT1uZXcgRmxvYXQzMkFycmF5KHIuY291bnQpLGg9bmV3IEZsb2F0MzJBcnJheShyLmNvdW50KjMpO3RoaXMub3JpZ2luLmxlbmd0aCgpPT0wJiZyLmFycmF5Lmxlbmd0aD4wJiYodGhpcy5vcmlnaW4uc2V0KHIuYXJyYXlbMF0sci5hcnJheVsxXSxyLmFycmF5WzJdKSx0aGlzLm5PcmlnaW49bmV3IHgoKS5jb3B5KHRoaXMub3JpZ2luKS5uZWdhdGUoKSk7Zm9yKGxldCBkPTA7ZDxhLmxlbmd0aDtkPWQrMSl7Y29uc3QgZj1wZS5nZXRHZW9tRWxOdW1iZXIocyxvLmFycmF5W2RdKTthW2RdPWYsaFtkKjNdPXIuYXJyYXlbZCozXS10aGlzLm9yaWdpbi54LGhbZCozKzFdPXIuYXJyYXlbZCozKzFdLXRoaXMub3JpZ2luLnksaFtkKjMrMl09ci5hcnJheVtkKjMrMl0tdGhpcy5vcmlnaW4uen1sZXQgbD0ibWVzaCI7ZSBpbnN0YW5jZW9mIHplJiYobD0ibGluZSIsdGhpcy5vcGFjaXR5PTEsdGhpcy50cmFuc3BhcmVudD0hMSksdGhpcy52ZXJ0cz1oLHRoaXMuZ2VvbUZpbGVOdW1iZXI9cyx0aGlzLmVsTnVtcz1hLHRoaXMuaW5kZXg9KHU9bi5pbmRleCk9PW51bGw/dm9pZCAwOnUuYXJyYXksdGhpcy50eXBlPWwsbi5ib3VuZGluZ0JveCYmKHRoaXMuYm94PW4uYm91bmRpbmdCb3gudHJhbnNsYXRlKHRoaXMubk9yaWdpbikpLHRoaXMuZ2VvbUZpbGVUb3RhbD1pfX1jbGFzcyBUaCBleHRlbmRzIHBle2NvbnN0cnVjdG9yKGUpe3N1cGVyKCk7RSh0aGlzLCJvcmlnaW4iLG5ldyB4KTtFKHRoaXMsInR5cGUiLCIiKTtFKHRoaXMsImJveCIsbmV3IG90KTtFKHRoaXMsIm9wYWNpdHkiLDApO0UodGhpcywiY29sb3IiLG5ldyBQKTtFKHRoaXMsIm1hdE5hbWUiLCIiKTtFKHRoaXMsImluc3RhbmNlcyIsbmV3IEFycmF5KTt0aGlzLmdlb21GaWxlTnVtYmVyPWV9cHJvY2Vzc0dlb21ldHJ5KGUscyl7dmFyIHU7Y29uc3QgaT1lLmdlb21ldHJ5LG49ZS5tYXRlcmlhbCxyPW4ubmFtZT09IiI/bi51dWlkOm4ubmFtZTtsZXQgbztuLm5hbWU9PSIiP289cy5maW5kKGQ9PmQudXVpZD09PShuPT1udWxsP3ZvaWQgMDpuLnV1aWQpKTpvPXMuZmluZChkPT5kLm5hbWU9PT0obj09bnVsbD92b2lkIDA6bi5uYW1lKSk7Y29uc3QgYT1vfHxlLm1hdGVyaWFsLGg9aS5nZXRBdHRyaWJ1dGUoInBvc2l0aW9uIik7bGV0IGw9Im1lc2giO2UgaW5zdGFuY2VvZiB6ZSYmKGw9ImxpbmUiLGEub3BhY2l0eT0xLGEudHJhbnNwYXJlbnQ9ITEpLHRoaXMudmVydHM9aC5hcnJheSx0aGlzLmluZGV4PSh1PWkuaW5kZXgpPT1udWxsP3ZvaWQgMDp1LmFycmF5LHRoaXMub3BhY2l0eT1hLm9wYWNpdHksdGhpcy5jb2xvcj1hLmNvbG9yLHRoaXMubWF0TmFtZT1yLHRoaXMudHlwZT1sLGkuYm91bmRpbmdCb3gmJih0aGlzLmJveD1pLmJvdW5kaW5nQm94KX19Y2xhc3MgeXN7Y29uc3RydWN0b3IoKXtFKHRoaXMsImlzTG9hZGVkIiwhMSk7RSh0aGlzLCJiYm94IixuZXcgb3QpO0UodGhpcywiaXNIaWRkZW4iLCExKTtFKHRoaXMsImJTcGhlcmUiKTtFKHRoaXMsInN1YkVscyIsW10pO0UodGhpcywiaW5kZWNlcyIsbmV3IE1hcCl9fWNsYXNzIEVoIGV4dGVuZHMgRmV7Y29uc3RydWN0b3IodCl7c3VwZXIodCksdGhpcy5kcmFjb0xvYWRlcj1udWxsLHRoaXMua3R4MkxvYWRlcj1udWxsLHRoaXMubWVzaG9wdERlY29kZXI9bnVsbCx0aGlzLnBsdWdpbkNhbGxiYWNrcz1bXSx0aGlzLnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBuZXcgQmgoZSl9KSx0aGlzLnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBuZXcgRmgoZSl9KSx0aGlzLnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBuZXcgSWgoZSl9KSx0aGlzLnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBuZXcgTGgoZSl9KSx0aGlzLnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBuZXcgemgoZSl9KSx0aGlzLnJlZ2lzdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBuZXcgQ2goZSl9KX1sb2FkKHQsZSxzLGkpe2NvbnN0IG49dGhpcztsZXQgcjt0aGlzLnJlc291cmNlUGF0aCE9PSIiP3I9dGhpcy5yZXNvdXJjZVBhdGg6dGhpcy5wYXRoIT09IiI/cj10aGlzLnBhdGg6cj1DZS5leHRyYWN0VXJsQmFzZSh0KSx0aGlzLm1hbmFnZXIuaXRlbVN0YXJ0KHQpO2NvbnN0IG89ZnVuY3Rpb24oaCl7aT9pKGgpOmNvbnNvbGUuZXJyb3IoaCksbi5tYW5hZ2VyLml0ZW1FcnJvcih0KSxuLm1hbmFnZXIuaXRlbUVuZCh0KX0sYT1uZXcgeHIodGhpcy5tYW5hZ2VyKTthLnNldFBhdGgodGhpcy5wYXRoKSxhLnNldFJlc3BvbnNlVHlwZSgiYXJyYXlidWZmZXIiKSxhLnNldFJlcXVlc3RIZWFkZXIodGhpcy5yZXF1ZXN0SGVhZGVyKSxhLnNldFdpdGhDcmVkZW50aWFscyh0aGlzLndpdGhDcmVkZW50aWFscyksYS5sb2FkKHQsZnVuY3Rpb24oaCl7dHJ5e24ucGFyc2UoaCxyLGZ1bmN0aW9uKGwpe2UobCksbi5tYW5hZ2VyLml0ZW1FbmQodCl9LG8pfWNhdGNoKGwpe28obCl9fSxzLG8pfXNldERSQUNPTG9hZGVyKHQpe3JldHVybiB0aGlzLmRyYWNvTG9hZGVyPXQsdGhpc31zZXRERFNMb2FkZXIoKXt0aHJvdyBuZXcgRXJyb3IoJ1RIUkVFLkdMVEZMb2FkZXI6ICJNU0ZUX3RleHR1cmVfZGRzIiBubyBsb25nZXIgc3VwcG9ydGVkLiBQbGVhc2UgdXBkYXRlIHRvICJLSFJfdGV4dHVyZV9iYXNpc3UiLicpfXNldEtUWDJMb2FkZXIodCl7cmV0dXJuIHRoaXMua3R4MkxvYWRlcj10LHRoaXN9c2V0TWVzaG9wdERlY29kZXIodCl7cmV0dXJuIHRoaXMubWVzaG9wdERlY29kZXI9dCx0aGlzfXJlZ2lzdGVyKHQpe3JldHVybiB0aGlzLnBsdWdpbkNhbGxiYWNrcy5pbmRleE9mKHQpPT09LTEmJnRoaXMucGx1Z2luQ2FsbGJhY2tzLnB1c2godCksdGhpc311bnJlZ2lzdGVyKHQpe3JldHVybiB0aGlzLnBsdWdpbkNhbGxiYWNrcy5pbmRleE9mKHQpIT09LTEmJnRoaXMucGx1Z2luQ2FsbGJhY2tzLnNwbGljZSh0aGlzLnBsdWdpbkNhbGxiYWNrcy5pbmRleE9mKHQpLDEpLHRoaXN9cGFyc2UodCxlLHMsaSl7bGV0IG47Y29uc3Qgcj17fSxvPXt9O2lmKHR5cGVvZiB0PT0ic3RyaW5nIiluPXQ7ZWxzZSBpZihDZS5kZWNvZGVUZXh0KG5ldyBVaW50OEFycmF5KHQsMCw0KSk9PT1Bcil7dHJ5e3JbSS5LSFJfQklOQVJZX0dMVEZdPW5ldyBraCh0KX1jYXRjaCh1KXtpJiZpKHUpO3JldHVybn1uPXJbSS5LSFJfQklOQVJZX0dMVEZdLmNvbnRlbnR9ZWxzZSBuPUNlLmRlY29kZVRleHQobmV3IFVpbnQ4QXJyYXkodCkpO2NvbnN0IGE9SlNPTi5wYXJzZShuKTtpZihhLmFzc2V0PT09dm9pZCAwfHxhLmFzc2V0LnZlcnNpb25bMF08Mil7aSYmaShuZXcgRXJyb3IoIlRIUkVFLkdMVEZMb2FkZXI6IFVuc3VwcG9ydGVkIGFzc2V0LiBnbFRGIHZlcnNpb25zID49Mi4wIGFyZSBzdXBwb3J0ZWQuIikpO3JldHVybn1jb25zdCBoPW5ldyBHaChhLHtwYXRoOmV8fHRoaXMucmVzb3VyY2VQYXRofHwiIixjcm9zc09yaWdpbjp0aGlzLmNyb3NzT3JpZ2luLHJlcXVlc3RIZWFkZXI6dGhpcy5yZXF1ZXN0SGVhZGVyLG1hbmFnZXI6dGhpcy5tYW5hZ2VyLGt0eDJMb2FkZXI6dGhpcy5rdHgyTG9hZGVyLG1lc2hvcHREZWNvZGVyOnRoaXMubWVzaG9wdERlY29kZXJ9KTtoLmZpbGVMb2FkZXIuc2V0UmVxdWVzdEhlYWRlcih0aGlzLnJlcXVlc3RIZWFkZXIpO2ZvcihsZXQgbD0wO2w8dGhpcy5wbHVnaW5DYWxsYmFja3MubGVuZ3RoO2wrKyl7Y29uc3QgdT10aGlzLnBsdWdpbkNhbGxiYWNrc1tsXShoKTtvW3UubmFtZV09dSxyW3UubmFtZV09ITB9aWYoYS5leHRlbnNpb25zVXNlZClmb3IobGV0IGw9MDtsPGEuZXh0ZW5zaW9uc1VzZWQubGVuZ3RoOysrbCl7Y29uc3QgdT1hLmV4dGVuc2lvbnNVc2VkW2xdLGQ9YS5leHRlbnNpb25zUmVxdWlyZWR8fFtdO3N3aXRjaCh1KXtjYXNlIEkuS0hSX01BVEVSSUFMU19VTkxJVDpyW3VdPW5ldyBSaDticmVhaztjYXNlIEkuS0hSX01BVEVSSUFMU19QQlJfU1BFQ1VMQVJfR0xPU1NJTkVTUzpyW3VdPW5ldyBEaDticmVhaztjYXNlIEkuS0hSX1RFWFRVUkVfVFJBTlNGT1JNOnJbdV09bmV3IE5oO2JyZWFrO2Nhc2UgSS5LSFJfTUVTSF9RVUFOVElaQVRJT046clt1XT1uZXcgT2g7YnJlYWs7ZGVmYXVsdDpkLmluZGV4T2YodSk+PTAmJm9bdV09PT12b2lkIDAmJmNvbnNvbGUud2FybignVEhSRUUuR0xURkxvYWRlcjogVW5rbm93biBleHRlbnNpb24gIicrdSsnIi4nKX19aC5zZXRFeHRlbnNpb25zKHIpLGguc2V0UGx1Z2lucyhvKSxoLnBhcnNlKHMsaSl9fWZ1bmN0aW9uIHZoKCl7bGV0IGM9e307cmV0dXJue2dldDpmdW5jdGlvbih0KXtyZXR1cm4gY1t0XX0sYWRkOmZ1bmN0aW9uKHQsZSl7Y1t0XT1lfSxyZW1vdmU6ZnVuY3Rpb24odCl7ZGVsZXRlIGNbdF19LHJlbW92ZUFsbDpmdW5jdGlvbigpe2M9e319fX1jb25zdCBJPXtLSFJfQklOQVJZX0dMVEY6IktIUl9iaW5hcnlfZ2xURiIsS0hSX0RSQUNPX01FU0hfQ09NUFJFU1NJT046IktIUl9kcmFjb19tZXNoX2NvbXByZXNzaW9uIixLSFJfTElHSFRTX1BVTkNUVUFMOiJLSFJfbGlnaHRzX3B1bmN0dWFsIixLSFJfTUFURVJJQUxTX0NMRUFSQ09BVDoiS0hSX21hdGVyaWFsc19jbGVhcmNvYXQiLEtIUl9NQVRFUklBTFNfUEJSX1NQRUNVTEFSX0dMT1NTSU5FU1M6IktIUl9tYXRlcmlhbHNfcGJyU3BlY3VsYXJHbG9zc2luZXNzIixLSFJfTUFURVJJQUxTX1RSQU5TTUlTU0lPTjoiS0hSX21hdGVyaWFsc190cmFuc21pc3Npb24iLEtIUl9NQVRFUklBTFNfVU5MSVQ6IktIUl9tYXRlcmlhbHNfdW5saXQiLEtIUl9URVhUVVJFX0JBU0lTVToiS0hSX3RleHR1cmVfYmFzaXN1IixLSFJfVEVYVFVSRV9UUkFOU0ZPUk06IktIUl90ZXh0dXJlX3RyYW5zZm9ybSIsS0hSX01FU0hfUVVBTlRJWkFUSU9OOiJLSFJfbWVzaF9xdWFudGl6YXRpb24iLEVYVF9URVhUVVJFX1dFQlA6IkVYVF90ZXh0dXJlX3dlYnAiLEVYVF9NRVNIT1BUX0NPTVBSRVNTSU9OOiJFWFRfbWVzaG9wdF9jb21wcmVzc2lvbiJ9O2NsYXNzIHpoe2NvbnN0cnVjdG9yKHQpe3RoaXMucGFyc2VyPXQsdGhpcy5uYW1lPUkuS0hSX0xJR0hUU19QVU5DVFVBTCx0aGlzLmNhY2hlPXtyZWZzOnt9LHVzZXM6e319fV9tYXJrRGVmcygpe2NvbnN0IHQ9dGhpcy5wYXJzZXIsZT10aGlzLnBhcnNlci5qc29uLm5vZGVzfHxbXTtmb3IobGV0IHM9MCxpPWUubGVuZ3RoO3M8aTtzKyspe2NvbnN0IG49ZVtzXTtuLmV4dGVuc2lvbnMmJm4uZXh0ZW5zaW9uc1t0aGlzLm5hbWVdJiZuLmV4dGVuc2lvbnNbdGhpcy5uYW1lXS5saWdodCE9PXZvaWQgMCYmdC5fYWRkTm9kZVJlZih0aGlzLmNhY2hlLG4uZXh0ZW5zaW9uc1t0aGlzLm5hbWVdLmxpZ2h0KX19X2xvYWRMaWdodCh0KXtjb25zdCBlPXRoaXMucGFyc2VyLHM9ImxpZ2h0OiIrdDtsZXQgaT1lLmNhY2hlLmdldChzKTtpZihpKXJldHVybiBpO2NvbnN0IG49ZS5qc29uLGE9KChuLmV4dGVuc2lvbnMmJm4uZXh0ZW5zaW9uc1t0aGlzLm5hbWVdfHx7fSkubGlnaHRzfHxbXSlbdF07bGV0IGg7Y29uc3QgbD1uZXcgUCgxNjc3NzIxNSk7YS5jb2xvciE9PXZvaWQgMCYmbC5mcm9tQXJyYXkoYS5jb2xvcik7Y29uc3QgdT1hLnJhbmdlIT09dm9pZCAwP2EucmFuZ2U6MDtzd2l0Y2goYS50eXBlKXtjYXNlImRpcmVjdGlvbmFsIjpoPW5ldyBwaChsKSxoLnRhcmdldC5wb3NpdGlvbi5zZXQoMCwwLC0xKSxoLmFkZChoLnRhcmdldCk7YnJlYWs7Y2FzZSJwb2ludCI6aD1uZXcgZGgobCksaC5kaXN0YW5jZT11O2JyZWFrO2Nhc2Uic3BvdCI6aD1uZXcgbGgobCksaC5kaXN0YW5jZT11LGEuc3BvdD1hLnNwb3R8fHt9LGEuc3BvdC5pbm5lckNvbmVBbmdsZT1hLnNwb3QuaW5uZXJDb25lQW5nbGUhPT12b2lkIDA/YS5zcG90LmlubmVyQ29uZUFuZ2xlOjAsYS5zcG90Lm91dGVyQ29uZUFuZ2xlPWEuc3BvdC5vdXRlckNvbmVBbmdsZSE9PXZvaWQgMD9hLnNwb3Qub3V0ZXJDb25lQW5nbGU6TWF0aC5QSS80LGguYW5nbGU9YS5zcG90Lm91dGVyQ29uZUFuZ2xlLGgucGVudW1icmE9MS1hLnNwb3QuaW5uZXJDb25lQW5nbGUvYS5zcG90Lm91dGVyQ29uZUFuZ2xlLGgudGFyZ2V0LnBvc2l0aW9uLnNldCgwLDAsLTEpLGguYWRkKGgudGFyZ2V0KTticmVhaztkZWZhdWx0OnRocm93IG5ldyBFcnJvcigiVEhSRUUuR0xURkxvYWRlcjogVW5leHBlY3RlZCBsaWdodCB0eXBlOiAiK2EudHlwZSl9cmV0dXJuIGgucG9zaXRpb24uc2V0KDAsMCwwKSxoLmRlY2F5PTIsYS5pbnRlbnNpdHkhPT12b2lkIDAmJihoLmludGVuc2l0eT1hLmludGVuc2l0eSksaC5uYW1lPWUuY3JlYXRlVW5pcXVlTmFtZShhLm5hbWV8fCJsaWdodF8iK3QpLGk9UHJvbWlzZS5yZXNvbHZlKGgpLGUuY2FjaGUuYWRkKHMsaSksaX1jcmVhdGVOb2RlQXR0YWNobWVudCh0KXtjb25zdCBlPXRoaXMscz10aGlzLnBhcnNlcixuPXMuanNvbi5ub2Rlc1t0XSxvPShuLmV4dGVuc2lvbnMmJm4uZXh0ZW5zaW9uc1t0aGlzLm5hbWVdfHx7fSkubGlnaHQ7cmV0dXJuIG89PT12b2lkIDA/bnVsbDp0aGlzLl9sb2FkTGlnaHQobykudGhlbihmdW5jdGlvbihhKXtyZXR1cm4gcy5fZ2V0Tm9kZVJlZihlLmNhY2hlLG8sYSl9KX19Y2xhc3MgUmh7Y29uc3RydWN0b3IoKXt0aGlzLm5hbWU9SS5LSFJfTUFURVJJQUxTX1VOTElUfWdldE1hdGVyaWFsVHlwZSgpe3JldHVybiBuZX1leHRlbmRQYXJhbXModCxlLHMpe2NvbnN0IGk9W107dC5jb2xvcj1uZXcgUCgxLDEsMSksdC5vcGFjaXR5PTE7Y29uc3Qgbj1lLnBick1ldGFsbGljUm91Z2huZXNzO2lmKG4pe2lmKEFycmF5LmlzQXJyYXkobi5iYXNlQ29sb3JGYWN0b3IpKXtjb25zdCByPW4uYmFzZUNvbG9yRmFjdG9yO3QuY29sb3IuZnJvbUFycmF5KHIpLHQub3BhY2l0eT1yWzNdfW4uYmFzZUNvbG9yVGV4dHVyZSE9PXZvaWQgMCYmaS5wdXNoKHMuYXNzaWduVGV4dHVyZSh0LCJtYXAiLG4uYmFzZUNvbG9yVGV4dHVyZSkpfXJldHVybiBQcm9taXNlLmFsbChpKX19Y2xhc3MgQmh7Y29uc3RydWN0b3IodCl7dGhpcy5wYXJzZXI9dCx0aGlzLm5hbWU9SS5LSFJfTUFURVJJQUxTX0NMRUFSQ09BVH1nZXRNYXRlcmlhbFR5cGUodCl7Y29uc3Qgcz10aGlzLnBhcnNlci5qc29uLm1hdGVyaWFsc1t0XTtyZXR1cm4hcy5leHRlbnNpb25zfHwhcy5leHRlbnNpb25zW3RoaXMubmFtZV0/bnVsbDp5cn1leHRlbmRNYXRlcmlhbFBhcmFtcyh0LGUpe2NvbnN0IHM9dGhpcy5wYXJzZXIsaT1zLmpzb24ubWF0ZXJpYWxzW3RdO2lmKCFpLmV4dGVuc2lvbnN8fCFpLmV4dGVuc2lvbnNbdGhpcy5uYW1lXSlyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7Y29uc3Qgbj1bXSxyPWkuZXh0ZW5zaW9uc1t0aGlzLm5hbWVdO2lmKHIuY2xlYXJjb2F0RmFjdG9yIT09dm9pZCAwJiYoZS5jbGVhcmNvYXQ9ci5jbGVhcmNvYXRGYWN0b3IpLHIuY2xlYXJjb2F0VGV4dHVyZSE9PXZvaWQgMCYmbi5wdXNoKHMuYXNzaWduVGV4dHVyZShlLCJjbGVhcmNvYXRNYXAiLHIuY2xlYXJjb2F0VGV4dHVyZSkpLHIuY2xlYXJjb2F0Um91Z2huZXNzRmFjdG9yIT09dm9pZCAwJiYoZS5jbGVhcmNvYXRSb3VnaG5lc3M9ci5jbGVhcmNvYXRSb3VnaG5lc3NGYWN0b3IpLHIuY2xlYXJjb2F0Um91Z2huZXNzVGV4dHVyZSE9PXZvaWQgMCYmbi5wdXNoKHMuYXNzaWduVGV4dHVyZShlLCJjbGVhcmNvYXRSb3VnaG5lc3NNYXAiLHIuY2xlYXJjb2F0Um91Z2huZXNzVGV4dHVyZSkpLHIuY2xlYXJjb2F0Tm9ybWFsVGV4dHVyZSE9PXZvaWQgMCYmKG4ucHVzaChzLmFzc2lnblRleHR1cmUoZSwiY2xlYXJjb2F0Tm9ybWFsTWFwIixyLmNsZWFyY29hdE5vcm1hbFRleHR1cmUpKSxyLmNsZWFyY29hdE5vcm1hbFRleHR1cmUuc2NhbGUhPT12b2lkIDApKXtjb25zdCBvPXIuY2xlYXJjb2F0Tm9ybWFsVGV4dHVyZS5zY2FsZTtlLmNsZWFyY29hdE5vcm1hbFNjYWxlPW5ldyBPKG8sLW8pfXJldHVybiBQcm9taXNlLmFsbChuKX19Y2xhc3MgTGh7Y29uc3RydWN0b3IodCl7dGhpcy5wYXJzZXI9dCx0aGlzLm5hbWU9SS5LSFJfTUFURVJJQUxTX1RSQU5TTUlTU0lPTn1nZXRNYXRlcmlhbFR5cGUodCl7Y29uc3Qgcz10aGlzLnBhcnNlci5qc29uLm1hdGVyaWFsc1t0XTtyZXR1cm4hcy5leHRlbnNpb25zfHwhcy5leHRlbnNpb25zW3RoaXMubmFtZV0/bnVsbDp5cn1leHRlbmRNYXRlcmlhbFBhcmFtcyh0LGUpe2NvbnN0IHM9dGhpcy5wYXJzZXIsaT1zLmpzb24ubWF0ZXJpYWxzW3RdO2lmKCFpLmV4dGVuc2lvbnN8fCFpLmV4dGVuc2lvbnNbdGhpcy5uYW1lXSlyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7Y29uc3Qgbj1bXSxyPWkuZXh0ZW5zaW9uc1t0aGlzLm5hbWVdO3JldHVybiByLnRyYW5zbWlzc2lvbkZhY3RvciE9PXZvaWQgMCYmKGUudHJhbnNtaXNzaW9uPXIudHJhbnNtaXNzaW9uRmFjdG9yKSxyLnRyYW5zbWlzc2lvblRleHR1cmUhPT12b2lkIDAmJm4ucHVzaChzLmFzc2lnblRleHR1cmUoZSwidHJhbnNtaXNzaW9uTWFwIixyLnRyYW5zbWlzc2lvblRleHR1cmUpKSxQcm9taXNlLmFsbChuKX19Y2xhc3MgRmh7Y29uc3RydWN0b3IodCl7dGhpcy5wYXJzZXI9dCx0aGlzLm5hbWU9SS5LSFJfVEVYVFVSRV9CQVNJU1V9bG9hZFRleHR1cmUodCl7Y29uc3QgZT10aGlzLnBhcnNlcixzPWUuanNvbixpPXMudGV4dHVyZXNbdF07aWYoIWkuZXh0ZW5zaW9uc3x8IWkuZXh0ZW5zaW9uc1t0aGlzLm5hbWVdKXJldHVybiBudWxsO2NvbnN0IG49aS5leHRlbnNpb25zW3RoaXMubmFtZV0scj1zLmltYWdlc1tuLnNvdXJjZV0sbz1lLm9wdGlvbnMua3R4MkxvYWRlcjtpZighbyl7aWYocy5leHRlbnNpb25zUmVxdWlyZWQmJnMuZXh0ZW5zaW9uc1JlcXVpcmVkLmluZGV4T2YodGhpcy5uYW1lKT49MCl0aHJvdyBuZXcgRXJyb3IoIlRIUkVFLkdMVEZMb2FkZXI6IHNldEtUWDJMb2FkZXIgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGxvYWRpbmcgS1RYMiB0ZXh0dXJlcyIpO3JldHVybiBudWxsfXJldHVybiBlLmxvYWRUZXh0dXJlSW1hZ2UodCxyLG8pfX1jbGFzcyBJaHtjb25zdHJ1Y3Rvcih0KXt0aGlzLnBhcnNlcj10LHRoaXMubmFtZT1JLkVYVF9URVhUVVJFX1dFQlAsdGhpcy5pc1N1cHBvcnRlZD1udWxsfWxvYWRUZXh0dXJlKHQpe2NvbnN0IGU9dGhpcy5uYW1lLHM9dGhpcy5wYXJzZXIsaT1zLmpzb24sbj1pLnRleHR1cmVzW3RdO2lmKCFuLmV4dGVuc2lvbnN8fCFuLmV4dGVuc2lvbnNbZV0pcmV0dXJuIG51bGw7Y29uc3Qgcj1uLmV4dGVuc2lvbnNbZV0sbz1pLmltYWdlc1tyLnNvdXJjZV07bGV0IGE9cy50ZXh0dXJlTG9hZGVyO2lmKG8udXJpKXtjb25zdCBoPXMub3B0aW9ucy5tYW5hZ2VyLmdldEhhbmRsZXIoby51cmkpO2ghPT1udWxsJiYoYT1oKX1yZXR1cm4gdGhpcy5kZXRlY3RTdXBwb3J0KCkudGhlbihmdW5jdGlvbihoKXtpZihoKXJldHVybiBzLmxvYWRUZXh0dXJlSW1hZ2UodCxvLGEpO2lmKGkuZXh0ZW5zaW9uc1JlcXVpcmVkJiZpLmV4dGVuc2lvbnNSZXF1aXJlZC5pbmRleE9mKGUpPj0wKXRocm93IG5ldyBFcnJvcigiVEhSRUUuR0xURkxvYWRlcjogV2ViUCByZXF1aXJlZCBieSBhc3NldCBidXQgdW5zdXBwb3J0ZWQuIik7cmV0dXJuIHMubG9hZFRleHR1cmUodCl9KX1kZXRlY3RTdXBwb3J0KCl7cmV0dXJuIHRoaXMuaXNTdXBwb3J0ZWR8fCh0aGlzLmlzU3VwcG9ydGVkPW5ldyBQcm9taXNlKGZ1bmN0aW9uKHQpe2NvbnN0IGU9bmV3IEltYWdlO2Uuc3JjPSJkYXRhOmltYWdlL3dlYnA7YmFzZTY0LFVrbEdSaUlBQUFCWFJVSlFWbEE0SUJZQUFBQXdBUUNkQVNvQkFBRUFEc0QrSmFRQUEzQUFBQUFBIixlLm9ubG9hZD1lLm9uZXJyb3I9ZnVuY3Rpb24oKXt0KGUuaGVpZ2h0PT09MSl9fSkpLHRoaXMuaXNTdXBwb3J0ZWR9fWNsYXNzIENoe2NvbnN0cnVjdG9yKHQpe3RoaXMubmFtZT1JLkVYVF9NRVNIT1BUX0NPTVBSRVNTSU9OLHRoaXMucGFyc2VyPXR9bG9hZEJ1ZmZlclZpZXcodCl7Y29uc3QgZT10aGlzLnBhcnNlci5qc29uLHM9ZS5idWZmZXJWaWV3c1t0XTtpZihzLmV4dGVuc2lvbnMmJnMuZXh0ZW5zaW9uc1t0aGlzLm5hbWVdKXtjb25zdCBpPXMuZXh0ZW5zaW9uc1t0aGlzLm5hbWVdLG49dGhpcy5wYXJzZXIuZ2V0RGVwZW5kZW5jeSgiYnVmZmVyIixpLmJ1ZmZlcikscj10aGlzLnBhcnNlci5vcHRpb25zLm1lc2hvcHREZWNvZGVyO2lmKCFyfHwhci5zdXBwb3J0ZWQpe2lmKGUuZXh0ZW5zaW9uc1JlcXVpcmVkJiZlLmV4dGVuc2lvbnNSZXF1aXJlZC5pbmRleE9mKHRoaXMubmFtZSk+PTApdGhyb3cgbmV3IEVycm9yKCJUSFJFRS5HTFRGTG9hZGVyOiBzZXRNZXNob3B0RGVjb2RlciBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgbG9hZGluZyBjb21wcmVzc2VkIGZpbGVzIik7cmV0dXJuIG51bGx9cmV0dXJuIFByb21pc2UuYWxsKFtuLHIucmVhZHldKS50aGVuKGZ1bmN0aW9uKG8pe2NvbnN0IGE9aS5ieXRlT2Zmc2V0fHwwLGg9aS5ieXRlTGVuZ3RofHwwLGw9aS5jb3VudCx1PWkuYnl0ZVN0cmlkZSxkPW5ldyBBcnJheUJ1ZmZlcihsKnUpLGY9bmV3IFVpbnQ4QXJyYXkob1swXSxhLGgpO3JldHVybiByLmRlY29kZUdsdGZCdWZmZXIobmV3IFVpbnQ4QXJyYXkoZCksbCx1LGYsaS5tb2RlLGkuZmlsdGVyKSxkfSl9ZWxzZSByZXR1cm4gbnVsbH19Y29uc3QgQXI9ImdsVEYiLGtlPTEyLFRyPXtKU09OOjEzMTM4MjE1MTQsQklOOjUxMzA1NjJ9O2NsYXNzIGtoe2NvbnN0cnVjdG9yKHQpe3RoaXMubmFtZT1JLktIUl9CSU5BUllfR0xURix0aGlzLmNvbnRlbnQ9bnVsbCx0aGlzLmJvZHk9bnVsbDtjb25zdCBlPW5ldyBEYXRhVmlldyh0LDAsa2UpO2lmKHRoaXMuaGVhZGVyPXttYWdpYzpDZS5kZWNvZGVUZXh0KG5ldyBVaW50OEFycmF5KHQuc2xpY2UoMCw0KSkpLHZlcnNpb246ZS5nZXRVaW50MzIoNCwhMCksbGVuZ3RoOmUuZ2V0VWludDMyKDgsITApfSx0aGlzLmhlYWRlci5tYWdpYyE9PUFyKXRocm93IG5ldyBFcnJvcigiVEhSRUUuR0xURkxvYWRlcjogVW5zdXBwb3J0ZWQgZ2xURi1CaW5hcnkgaGVhZGVyLiIpO2lmKHRoaXMuaGVhZGVyLnZlcnNpb248Mil0aHJvdyBuZXcgRXJyb3IoIlRIUkVFLkdMVEZMb2FkZXI6IExlZ2FjeSBiaW5hcnkgZmlsZSBkZXRlY3RlZC4iKTtjb25zdCBzPXRoaXMuaGVhZGVyLmxlbmd0aC1rZSxpPW5ldyBEYXRhVmlldyh0LGtlKTtsZXQgbj0wO2Zvcig7bjxzOyl7Y29uc3Qgcj1pLmdldFVpbnQzMihuLCEwKTtuKz00O2NvbnN0IG89aS5nZXRVaW50MzIobiwhMCk7aWYobis9NCxvPT09VHIuSlNPTil7Y29uc3QgYT1uZXcgVWludDhBcnJheSh0LGtlK24scik7dGhpcy5jb250ZW50PUNlLmRlY29kZVRleHQoYSl9ZWxzZSBpZihvPT09VHIuQklOKXtjb25zdCBhPWtlK247dGhpcy5ib2R5PXQuc2xpY2UoYSxhK3IpfW4rPXJ9aWYodGhpcy5jb250ZW50PT09bnVsbCl0aHJvdyBuZXcgRXJyb3IoIlRIUkVFLkdMVEZMb2FkZXI6IEpTT04gY29udGVudCBub3QgZm91bmQuIil9fWNsYXNzIE5oe2NvbnN0cnVjdG9yKCl7dGhpcy5uYW1lPUkuS0hSX1RFWFRVUkVfVFJBTlNGT1JNfWV4dGVuZFRleHR1cmUodCxlKXtyZXR1cm4gZS50ZXhDb29yZCE9PXZvaWQgMCYmY29uc29sZS53YXJuKCdUSFJFRS5HTFRGTG9hZGVyOiBDdXN0b20gVVYgc2V0cyBpbiAiJyt0aGlzLm5hbWUrJyIgZXh0ZW5zaW9uIG5vdCB5ZXQgc3VwcG9ydGVkLicpLGUub2Zmc2V0PT09dm9pZCAwJiZlLnJvdGF0aW9uPT09dm9pZCAwJiZlLnNjYWxlPT09dm9pZCAwfHwodD10LmNsb25lKCksZS5vZmZzZXQhPT12b2lkIDAmJnQub2Zmc2V0LmZyb21BcnJheShlLm9mZnNldCksZS5yb3RhdGlvbiE9PXZvaWQgMCYmKHQucm90YXRpb249ZS5yb3RhdGlvbiksZS5zY2FsZSE9PXZvaWQgMCYmdC5yZXBlYXQuZnJvbUFycmF5KGUuc2NhbGUpLHQubmVlZHNVcGRhdGU9ITApLHR9fWNsYXNzIE9pIGV4dGVuZHMgbXN7Y29uc3RydWN0b3IodCl7c3VwZXIoKSx0aGlzLmlzR0xURlNwZWN1bGFyR2xvc3NpbmVzc01hdGVyaWFsPSEwO2NvbnN0IGU9WyIjaWZkZWYgVVNFX1NQRUNVTEFSTUFQIiwiCXVuaWZvcm0gc2FtcGxlcjJEIHNwZWN1bGFyTWFwOyIsIiNlbmRpZiJdLmpvaW4oYApgKSxzPVsiI2lmZGVmIFVTRV9HTE9TU0lORVNTTUFQIiwiCXVuaWZvcm0gc2FtcGxlcjJEIGdsb3NzaW5lc3NNYXA7IiwiI2VuZGlmIl0uam9pbihgCmApLGk9WyJ2ZWMzIHNwZWN1bGFyRmFjdG9yID0gc3BlY3VsYXI7IiwiI2lmZGVmIFVTRV9TUEVDVUxBUk1BUCIsIgl2ZWM0IHRleGVsU3BlY3VsYXIgPSB0ZXh0dXJlMkQoIHNwZWN1bGFyTWFwLCB2VXYgKTsiLCIJdGV4ZWxTcGVjdWxhciA9IHNSR0JUb0xpbmVhciggdGV4ZWxTcGVjdWxhciApOyIsIgkvLyByZWFkcyBjaGFubmVsIFJHQiwgY29tcGF0aWJsZSB3aXRoIGEgZ2xURiBTcGVjdWxhci1HbG9zc2luZXNzIChSR0JBKSB0ZXh0dXJlIiwiCXNwZWN1bGFyRmFjdG9yICo9IHRleGVsU3BlY3VsYXIucmdiOyIsIiNlbmRpZiJdLmpvaW4oYApgKSxuPVsiZmxvYXQgZ2xvc3NpbmVzc0ZhY3RvciA9IGdsb3NzaW5lc3M7IiwiI2lmZGVmIFVTRV9HTE9TU0lORVNTTUFQIiwiCXZlYzQgdGV4ZWxHbG9zc2luZXNzID0gdGV4dHVyZTJEKCBnbG9zc2luZXNzTWFwLCB2VXYgKTsiLCIJLy8gcmVhZHMgY2hhbm5lbCBBLCBjb21wYXRpYmxlIHdpdGggYSBnbFRGIFNwZWN1bGFyLUdsb3NzaW5lc3MgKFJHQkEpIHRleHR1cmUiLCIJZ2xvc3NpbmVzc0ZhY3RvciAqPSB0ZXhlbEdsb3NzaW5lc3MuYTsiLCIjZW5kaWYiXS5qb2luKGAKYCkscj1bIlBoeXNpY2FsTWF0ZXJpYWwgbWF0ZXJpYWw7IiwibWF0ZXJpYWwuZGlmZnVzZUNvbG9yID0gZGlmZnVzZUNvbG9yLnJnYiAqICggMS4gLSBtYXgoIHNwZWN1bGFyRmFjdG9yLnIsIG1heCggc3BlY3VsYXJGYWN0b3IuZywgc3BlY3VsYXJGYWN0b3IuYiApICkgKTsiLCJ2ZWMzIGR4eSA9IG1heCggYWJzKCBkRmR4KCBnZW9tZXRyeU5vcm1hbCApICksIGFicyggZEZkeSggZ2VvbWV0cnlOb3JtYWwgKSApICk7IiwiZmxvYXQgZ2VvbWV0cnlSb3VnaG5lc3MgPSBtYXgoIG1heCggZHh5LngsIGR4eS55ICksIGR4eS56ICk7IiwibWF0ZXJpYWwuc3BlY3VsYXJSb3VnaG5lc3MgPSBtYXgoIDEuMCAtIGdsb3NzaW5lc3NGYWN0b3IsIDAuMDUyNSApOyAvLyAwLjA1MjUgY29ycmVzcG9uZHMgdG8gdGhlIGJhc2UgbWlwIG9mIGEgMjU2IGN1YmVtYXAuIiwibWF0ZXJpYWwuc3BlY3VsYXJSb3VnaG5lc3MgKz0gZ2VvbWV0cnlSb3VnaG5lc3M7IiwibWF0ZXJpYWwuc3BlY3VsYXJSb3VnaG5lc3MgPSBtaW4oIG1hdGVyaWFsLnNwZWN1bGFyUm91Z2huZXNzLCAxLjAgKTsiLCJtYXRlcmlhbC5zcGVjdWxhckNvbG9yID0gc3BlY3VsYXJGYWN0b3I7Il0uam9pbihgCmApLG89e3NwZWN1bGFyOnt2YWx1ZTpuZXcgUCgpLnNldEhleCgxNjc3NzIxNSl9LGdsb3NzaW5lc3M6e3ZhbHVlOjF9LHNwZWN1bGFyTWFwOnt2YWx1ZTpudWxsfSxnbG9zc2luZXNzTWFwOnt2YWx1ZTpudWxsfX07dGhpcy5fZXh0cmFVbmlmb3Jtcz1vLHRoaXMub25CZWZvcmVDb21waWxlPWZ1bmN0aW9uKGEpe2Zvcihjb25zdCBoIGluIG8pYS51bmlmb3Jtc1toXT1vW2hdO2EuZnJhZ21lbnRTaGFkZXI9YS5mcmFnbWVudFNoYWRlci5yZXBsYWNlKCJ1bmlmb3JtIGZsb2F0IHJvdWdobmVzczsiLCJ1bmlmb3JtIHZlYzMgc3BlY3VsYXI7IikucmVwbGFjZSgidW5pZm9ybSBmbG9hdCBtZXRhbG5lc3M7IiwidW5pZm9ybSBmbG9hdCBnbG9zc2luZXNzOyIpLnJlcGxhY2UoIiNpbmNsdWRlIDxyb3VnaG5lc3NtYXBfcGFyc19mcmFnbWVudD4iLGUpLnJlcGxhY2UoIiNpbmNsdWRlIDxtZXRhbG5lc3NtYXBfcGFyc19mcmFnbWVudD4iLHMpLnJlcGxhY2UoIiNpbmNsdWRlIDxyb3VnaG5lc3NtYXBfZnJhZ21lbnQ+IixpKS5yZXBsYWNlKCIjaW5jbHVkZSA8bWV0YWxuZXNzbWFwX2ZyYWdtZW50PiIsbikucmVwbGFjZSgiI2luY2x1ZGUgPGxpZ2h0c19waHlzaWNhbF9mcmFnbWVudD4iLHIpfSxPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLHtzcGVjdWxhcjp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG8uc3BlY3VsYXIudmFsdWV9LHNldDpmdW5jdGlvbihhKXtvLnNwZWN1bGFyLnZhbHVlPWF9fSxzcGVjdWxhck1hcDp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG8uc3BlY3VsYXJNYXAudmFsdWV9LHNldDpmdW5jdGlvbihhKXtvLnNwZWN1bGFyTWFwLnZhbHVlPWEsYT90aGlzLmRlZmluZXMuVVNFX1NQRUNVTEFSTUFQPSIiOmRlbGV0ZSB0aGlzLmRlZmluZXMuVVNFX1NQRUNVTEFSTUFQfX0sZ2xvc3NpbmVzczp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG8uZ2xvc3NpbmVzcy52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe28uZ2xvc3NpbmVzcy52YWx1ZT1hfX0sZ2xvc3NpbmVzc01hcDp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG8uZ2xvc3NpbmVzc01hcC52YWx1ZX0sc2V0OmZ1bmN0aW9uKGEpe28uZ2xvc3NpbmVzc01hcC52YWx1ZT1hLGE/KHRoaXMuZGVmaW5lcy5VU0VfR0xPU1NJTkVTU01BUD0iIix0aGlzLmRlZmluZXMuVVNFX1VWPSIiKTooZGVsZXRlIHRoaXMuZGVmaW5lcy5VU0VfR0xPU1NJTkVTU01BUCxkZWxldGUgdGhpcy5kZWZpbmVzLlVTRV9VVil9fX0pLGRlbGV0ZSB0aGlzLm1ldGFsbmVzcyxkZWxldGUgdGhpcy5yb3VnaG5lc3MsZGVsZXRlIHRoaXMubWV0YWxuZXNzTWFwLGRlbGV0ZSB0aGlzLnJvdWdobmVzc01hcCx0aGlzLnNldFZhbHVlcyh0KX1jb3B5KHQpe3JldHVybiBzdXBlci5jb3B5KHQpLHRoaXMuc3BlY3VsYXJNYXA9dC5zcGVjdWxhck1hcCx0aGlzLnNwZWN1bGFyLmNvcHkodC5zcGVjdWxhciksdGhpcy5nbG9zc2luZXNzTWFwPXQuZ2xvc3NpbmVzc01hcCx0aGlzLmdsb3NzaW5lc3M9dC5nbG9zc2luZXNzLGRlbGV0ZSB0aGlzLm1ldGFsbmVzcyxkZWxldGUgdGhpcy5yb3VnaG5lc3MsZGVsZXRlIHRoaXMubWV0YWxuZXNzTWFwLGRlbGV0ZSB0aGlzLnJvdWdobmVzc01hcCx0aGlzfX1jbGFzcyBEaHtjb25zdHJ1Y3Rvcigpe3RoaXMubmFtZT1JLktIUl9NQVRFUklBTFNfUEJSX1NQRUNVTEFSX0dMT1NTSU5FU1MsdGhpcy5zcGVjdWxhckdsb3NzaW5lc3NQYXJhbXM9WyJjb2xvciIsIm1hcCIsImxpZ2h0TWFwIiwibGlnaHRNYXBJbnRlbnNpdHkiLCJhb01hcCIsImFvTWFwSW50ZW5zaXR5IiwiZW1pc3NpdmUiLCJlbWlzc2l2ZUludGVuc2l0eSIsImVtaXNzaXZlTWFwIiwiYnVtcE1hcCIsImJ1bXBTY2FsZSIsIm5vcm1hbE1hcCIsIm5vcm1hbE1hcFR5cGUiLCJkaXNwbGFjZW1lbnRNYXAiLCJkaXNwbGFjZW1lbnRTY2FsZSIsImRpc3BsYWNlbWVudEJpYXMiLCJzcGVjdWxhck1hcCIsInNwZWN1bGFyIiwiZ2xvc3NpbmVzc01hcCIsImdsb3NzaW5lc3MiLCJhbHBoYU1hcCIsImVudk1hcCIsImVudk1hcEludGVuc2l0eSIsInJlZnJhY3Rpb25SYXRpbyJdfWdldE1hdGVyaWFsVHlwZSgpe3JldHVybiBPaX1leHRlbmRQYXJhbXModCxlLHMpe2NvbnN0IGk9ZS5leHRlbnNpb25zW3RoaXMubmFtZV07dC5jb2xvcj1uZXcgUCgxLDEsMSksdC5vcGFjaXR5PTE7Y29uc3Qgbj1bXTtpZihBcnJheS5pc0FycmF5KGkuZGlmZnVzZUZhY3Rvcikpe2NvbnN0IHI9aS5kaWZmdXNlRmFjdG9yO3QuY29sb3IuZnJvbUFycmF5KHIpLHQub3BhY2l0eT1yWzNdfWlmKGkuZGlmZnVzZVRleHR1cmUhPT12b2lkIDAmJm4ucHVzaChzLmFzc2lnblRleHR1cmUodCwibWFwIixpLmRpZmZ1c2VUZXh0dXJlKSksdC5lbWlzc2l2ZT1uZXcgUCgwLDAsMCksdC5nbG9zc2luZXNzPWkuZ2xvc3NpbmVzc0ZhY3RvciE9PXZvaWQgMD9pLmdsb3NzaW5lc3NGYWN0b3I6MSx0LnNwZWN1bGFyPW5ldyBQKDEsMSwxKSxBcnJheS5pc0FycmF5KGkuc3BlY3VsYXJGYWN0b3IpJiZ0LnNwZWN1bGFyLmZyb21BcnJheShpLnNwZWN1bGFyRmFjdG9yKSxpLnNwZWN1bGFyR2xvc3NpbmVzc1RleHR1cmUhPT12b2lkIDApe2NvbnN0IHI9aS5zcGVjdWxhckdsb3NzaW5lc3NUZXh0dXJlO24ucHVzaChzLmFzc2lnblRleHR1cmUodCwiZ2xvc3NpbmVzc01hcCIscikpLG4ucHVzaChzLmFzc2lnblRleHR1cmUodCwic3BlY3VsYXJNYXAiLHIpKX1yZXR1cm4gUHJvbWlzZS5hbGwobil9Y3JlYXRlTWF0ZXJpYWwodCl7Y29uc3QgZT1uZXcgT2kodCk7cmV0dXJuIGUuZm9nPSEwLGUuY29sb3I9dC5jb2xvcixlLm1hcD10Lm1hcD09PXZvaWQgMD9udWxsOnQubWFwLGUubGlnaHRNYXA9bnVsbCxlLmxpZ2h0TWFwSW50ZW5zaXR5PTEsZS5hb01hcD10LmFvTWFwPT09dm9pZCAwP251bGw6dC5hb01hcCxlLmFvTWFwSW50ZW5zaXR5PTEsZS5lbWlzc2l2ZT10LmVtaXNzaXZlLGUuZW1pc3NpdmVJbnRlbnNpdHk9MSxlLmVtaXNzaXZlTWFwPXQuZW1pc3NpdmVNYXA9PT12b2lkIDA/bnVsbDp0LmVtaXNzaXZlTWFwLGUuYnVtcE1hcD10LmJ1bXBNYXA9PT12b2lkIDA/bnVsbDp0LmJ1bXBNYXAsZS5idW1wU2NhbGU9MSxlLm5vcm1hbE1hcD10Lm5vcm1hbE1hcD09PXZvaWQgMD9udWxsOnQubm9ybWFsTWFwLGUubm9ybWFsTWFwVHlwZT1Pbix0Lm5vcm1hbFNjYWxlJiYoZS5ub3JtYWxTY2FsZT10Lm5vcm1hbFNjYWxlKSxlLmRpc3BsYWNlbWVudE1hcD1udWxsLGUuZGlzcGxhY2VtZW50U2NhbGU9MSxlLmRpc3BsYWNlbWVudEJpYXM9MCxlLnNwZWN1bGFyTWFwPXQuc3BlY3VsYXJNYXA9PT12b2lkIDA/bnVsbDp0LnNwZWN1bGFyTWFwLGUuc3BlY3VsYXI9dC5zcGVjdWxhcixlLmdsb3NzaW5lc3NNYXA9dC5nbG9zc2luZXNzTWFwPT09dm9pZCAwP251bGw6dC5nbG9zc2luZXNzTWFwLGUuZ2xvc3NpbmVzcz10Lmdsb3NzaW5lc3MsZS5hbHBoYU1hcD1udWxsLGUuZW52TWFwPXQuZW52TWFwPT09dm9pZCAwP251bGw6dC5lbnZNYXAsZS5lbnZNYXBJbnRlbnNpdHk9MSxlLnJlZnJhY3Rpb25SYXRpbz0uOTgsZX19Y2xhc3MgT2h7Y29uc3RydWN0b3IoKXt0aGlzLm5hbWU9SS5LSFJfTUVTSF9RVUFOVElaQVRJT059fWNsYXNzIG1lIGV4dGVuZHMgUmV7Y29uc3RydWN0b3IodCxlLHMsaSl7c3VwZXIodCxlLHMsaSl9Y29weVNhbXBsZVZhbHVlXyh0KXtjb25zdCBlPXRoaXMucmVzdWx0QnVmZmVyLHM9dGhpcy5zYW1wbGVWYWx1ZXMsaT10aGlzLnZhbHVlU2l6ZSxuPXQqaSozK2k7Zm9yKGxldCByPTA7ciE9PWk7cisrKWVbcl09c1tuK3JdO3JldHVybiBlfX1tZS5wcm90b3R5cGUuYmVmb3JlU3RhcnRfPW1lLnByb3RvdHlwZS5jb3B5U2FtcGxlVmFsdWVfLG1lLnByb3RvdHlwZS5hZnRlckVuZF89bWUucHJvdG90eXBlLmNvcHlTYW1wbGVWYWx1ZV8sbWUucHJvdG90eXBlLmludGVycG9sYXRlXz1mdW5jdGlvbihjLHQsZSxzKXtjb25zdCBpPXRoaXMucmVzdWx0QnVmZmVyLG49dGhpcy5zYW1wbGVWYWx1ZXMscj10aGlzLnZhbHVlU2l6ZSxvPXIqMixhPXIqMyxoPXMtdCxsPShlLXQpL2gsdT1sKmwsZD11KmwsZj1jKmEscD1mLWEsbT0tMipkKzMqdSxnPWQtdSx5PTEtbSxNPWctdStsO2ZvcihsZXQgdz0wO3chPT1yO3crKyl7Y29uc3QgXz1uW3ArdytyXSxiPW5bcCt3K29dKmgsQT1uW2YrdytyXSxTPW5bZit3XSpoO2lbd109eSpfK00qYittKkErZypTfXJldHVybiBpfTtjb25zdCBfdD17RkxPQVQ6NTEyNixGTE9BVF9NQVQzOjM1Njc1LEZMT0FUX01BVDQ6MzU2NzYsRkxPQVRfVkVDMjozNTY2NCxGTE9BVF9WRUMzOjM1NjY1LEZMT0FUX1ZFQzQ6MzU2NjYsTElORUFSOjk3MjksUkVQRUFUOjEwNDk3LFNBTVBMRVJfMkQ6MzU2NzgsUE9JTlRTOjAsTElORVM6MSxMSU5FX0xPT1A6MixMSU5FX1NUUklQOjMsVFJJQU5HTEVTOjQsVFJJQU5HTEVfU1RSSVA6NSxUUklBTkdMRV9GQU46NixVTlNJR05FRF9CWVRFOjUxMjEsVU5TSUdORURfU0hPUlQ6NTEyM30sZ3M9ezUxMjA6SW50OEFycmF5LDUxMjE6VWludDhBcnJheSw1MTIyOkludDE2QXJyYXksNTEyMzpVaW50MTZBcnJheSw1MTI1OlVpbnQzMkFycmF5LDUxMjY6RmxvYXQzMkFycmF5fSxFcj17OTcyODpacyw5NzI5OlhzLDk5ODQ6JG8sOTk4NTpLbyw5OTg2OkpvLDk5ODc6WXN9LHZyPXszMzA3MTpiZSwzMzY0ODpxcywxMDQ5Nzp4ZX0senI9e1NDQUxBUjoxLFZFQzI6MixWRUMzOjMsVkVDNDo0LE1BVDI6NCxNQVQzOjksTUFUNDoxNn0sUGg9e1BPU0lUSU9OOiJwb3NpdGlvbiIsTk9STUFMOiJub3JtYWwiLFRBTkdFTlQ6InRhbmdlbnQiLFRFWENPT1JEXzA6InV2IixURVhDT09SRF8xOiJ1djIiLENPTE9SXzA6ImNvbG9yIixXRUlHSFRTXzA6InNraW5XZWlnaHQiLEpPSU5UU18wOiJza2luSW5kZXgifSxJdD17c2NhbGU6InNjYWxlIix0cmFuc2xhdGlvbjoicG9zaXRpb24iLHJvdGF0aW9uOiJxdWF0ZXJuaW9uIix3ZWlnaHRzOiJtb3JwaFRhcmdldEluZmx1ZW5jZXMifSxVaD17Q1VCSUNTUExJTkU6dm9pZCAwLExJTkVBUjpadCxTVEVQOndlfSxQaT17T1BBUVVFOiJPUEFRVUUiLE1BU0s6Ik1BU0siLEJMRU5EOiJCTEVORCJ9O2Z1bmN0aW9uIFJyKGMsdCl7cmV0dXJuIHR5cGVvZiBjIT0ic3RyaW5nInx8Yz09PSIiPyIiOigvXmh0dHBzPzpcL1wvL2kudGVzdCh0KSYmL15cLy8udGVzdChjKSYmKHQ9dC5yZXBsYWNlKC8oXmh0dHBzPzpcL1wvW15cL10rKS4qL2ksIiQxIikpLC9eKGh0dHBzPzopP1wvXC8vaS50ZXN0KGMpfHwvXmRhdGE6LiosLiokL2kudGVzdChjKXx8L15ibG9iOi4qJC9pLnRlc3QoYyk/Yzp0K2MpfWZ1bmN0aW9uIFZoKGMpe3JldHVybiBjLkRlZmF1bHRNYXRlcmlhbD09PXZvaWQgMCYmKGMuRGVmYXVsdE1hdGVyaWFsPW5ldyBtcyh7Y29sb3I6MTY3NzcyMTUsZW1pc3NpdmU6MCxtZXRhbG5lc3M6MSxyb3VnaG5lc3M6MSx0cmFuc3BhcmVudDohMSxkZXB0aFRlc3Q6ITAsc2lkZTpHc30pKSxjLkRlZmF1bHRNYXRlcmlhbH1mdW5jdGlvbiBOZShjLHQsZSl7Zm9yKGNvbnN0IHMgaW4gZS5leHRlbnNpb25zKWNbc109PT12b2lkIDAmJih0LnVzZXJEYXRhLmdsdGZFeHRlbnNpb25zPXQudXNlckRhdGEuZ2x0ZkV4dGVuc2lvbnN8fHt9LHQudXNlckRhdGEuZ2x0ZkV4dGVuc2lvbnNbc109ZS5leHRlbnNpb25zW3NdKX1mdW5jdGlvbiBWdChjLHQpe3QuZXh0cmFzIT09dm9pZCAwJiYodHlwZW9mIHQuZXh0cmFzPT0ib2JqZWN0Ij9PYmplY3QuYXNzaWduKGMudXNlckRhdGEsdC5leHRyYXMpOmNvbnNvbGUud2FybigiVEhSRUUuR0xURkxvYWRlcjogSWdub3JpbmcgcHJpbWl0aXZlIHR5cGUgLmV4dHJhcywgIit0LmV4dHJhcykpfWZ1bmN0aW9uIEhoKGMsdCxlKXtsZXQgcz0hMSxpPSExO2ZvcihsZXQgbz0wLGE9dC5sZW5ndGg7bzxhO28rKyl7Y29uc3QgaD10W29dO2lmKGguUE9TSVRJT04hPT12b2lkIDAmJihzPSEwKSxoLk5PUk1BTCE9PXZvaWQgMCYmKGk9ITApLHMmJmkpYnJlYWt9aWYoIXMmJiFpKXJldHVybiBQcm9taXNlLnJlc29sdmUoYyk7Y29uc3Qgbj1bXSxyPVtdO2ZvcihsZXQgbz0wLGE9dC5sZW5ndGg7bzxhO28rKyl7Y29uc3QgaD10W29dO2lmKHMpe2NvbnN0IGw9aC5QT1NJVElPTiE9PXZvaWQgMD9lLmdldERlcGVuZGVuY3koImFjY2Vzc29yIixoLlBPU0lUSU9OKTpjLmF0dHJpYnV0ZXMucG9zaXRpb247bi5wdXNoKGwpfWlmKGkpe2NvbnN0IGw9aC5OT1JNQUwhPT12b2lkIDA/ZS5nZXREZXBlbmRlbmN5KCJhY2Nlc3NvciIsaC5OT1JNQUwpOmMuYXR0cmlidXRlcy5ub3JtYWw7ci5wdXNoKGwpfX1yZXR1cm4gUHJvbWlzZS5hbGwoW1Byb21pc2UuYWxsKG4pLFByb21pc2UuYWxsKHIpXSkudGhlbihmdW5jdGlvbihvKXtjb25zdCBhPW9bMF0saD1vWzFdO3JldHVybiBzJiYoYy5tb3JwaEF0dHJpYnV0ZXMucG9zaXRpb249YSksaSYmKGMubW9ycGhBdHRyaWJ1dGVzLm5vcm1hbD1oKSxjLm1vcnBoVGFyZ2V0c1JlbGF0aXZlPSEwLGN9KX1mdW5jdGlvbiBqaChjLHQpe2lmKGMudXBkYXRlTW9ycGhUYXJnZXRzKCksdC53ZWlnaHRzIT09dm9pZCAwKWZvcihsZXQgZT0wLHM9dC53ZWlnaHRzLmxlbmd0aDtlPHM7ZSsrKWMubW9ycGhUYXJnZXRJbmZsdWVuY2VzW2VdPXQud2VpZ2h0c1tlXTtpZih0LmV4dHJhcyYmQXJyYXkuaXNBcnJheSh0LmV4dHJhcy50YXJnZXROYW1lcykpe2NvbnN0IGU9dC5leHRyYXMudGFyZ2V0TmFtZXM7aWYoYy5tb3JwaFRhcmdldEluZmx1ZW5jZXMubGVuZ3RoPT09ZS5sZW5ndGgpe2MubW9ycGhUYXJnZXREaWN0aW9uYXJ5PXt9O2ZvcihsZXQgcz0wLGk9ZS5sZW5ndGg7czxpO3MrKyljLm1vcnBoVGFyZ2V0RGljdGlvbmFyeVtlW3NdXT1zfWVsc2UgY29uc29sZS53YXJuKCJUSFJFRS5HTFRGTG9hZGVyOiBJbnZhbGlkIGV4dHJhcy50YXJnZXROYW1lcyBsZW5ndGguIElnbm9yaW5nIG5hbWVzLiIpfX1mdW5jdGlvbiBXaChjKXtjb25zdCB0PWMuZXh0ZW5zaW9ucyYmYy5leHRlbnNpb25zW0kuS0hSX0RSQUNPX01FU0hfQ09NUFJFU1NJT05dO2xldCBlO3JldHVybiB0P2U9ImRyYWNvOiIrdC5idWZmZXJWaWV3KyI6Iit0LmluZGljZXMrIjoiK0JyKHQuYXR0cmlidXRlcyk6ZT1jLmluZGljZXMrIjoiK0JyKGMuYXR0cmlidXRlcykrIjoiK2MubW9kZSxlfWZ1bmN0aW9uIEJyKGMpe2xldCB0PSIiO2NvbnN0IGU9T2JqZWN0LmtleXMoYykuc29ydCgpO2ZvcihsZXQgcz0wLGk9ZS5sZW5ndGg7czxpO3MrKyl0Kz1lW3NdKyI6IitjW2Vbc11dKyI7IjtyZXR1cm4gdH1mdW5jdGlvbiBVaShjKXtzd2l0Y2goYyl7Y2FzZSBJbnQ4QXJyYXk6cmV0dXJuIDEvMTI3O2Nhc2UgVWludDhBcnJheTpyZXR1cm4gMS8yNTU7Y2FzZSBJbnQxNkFycmF5OnJldHVybiAxLzMyNzY3O2Nhc2UgVWludDE2QXJyYXk6cmV0dXJuIDEvNjU1MzU7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoIlRIUkVFLkdMVEZMb2FkZXI6IFVuc3VwcG9ydGVkIG5vcm1hbGl6ZWQgYWNjZXNzb3IgY29tcG9uZW50IHR5cGUuIil9fWNsYXNzIEdoe2NvbnN0cnVjdG9yKHQ9e30sZT17fSl7dGhpcy5qc29uPXQsdGhpcy5leHRlbnNpb25zPXt9LHRoaXMucGx1Z2lucz17fSx0aGlzLm9wdGlvbnM9ZSx0aGlzLmNhY2hlPW5ldyB2aCx0aGlzLmFzc29jaWF0aW9ucz1uZXcgTWFwLHRoaXMucHJpbWl0aXZlQ2FjaGU9e30sdGhpcy5tZXNoQ2FjaGU9e3JlZnM6e30sdXNlczp7fX0sdGhpcy5jYW1lcmFDYWNoZT17cmVmczp7fSx1c2VzOnt9fSx0aGlzLmxpZ2h0Q2FjaGU9e3JlZnM6e30sdXNlczp7fX0sdGhpcy50ZXh0dXJlQ2FjaGU9e30sdGhpcy5ub2RlTmFtZXNVc2VkPXt9LHR5cGVvZiBjcmVhdGVJbWFnZUJpdG1hcDwidSImJi9GaXJlZm94Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpPT09ITE/dGhpcy50ZXh0dXJlTG9hZGVyPW5ldyBtaCh0aGlzLm9wdGlvbnMubWFuYWdlcik6dGhpcy50ZXh0dXJlTG9hZGVyPW5ldyBoaCh0aGlzLm9wdGlvbnMubWFuYWdlciksdGhpcy50ZXh0dXJlTG9hZGVyLnNldENyb3NzT3JpZ2luKHRoaXMub3B0aW9ucy5jcm9zc09yaWdpbiksdGhpcy50ZXh0dXJlTG9hZGVyLnNldFJlcXVlc3RIZWFkZXIodGhpcy5vcHRpb25zLnJlcXVlc3RIZWFkZXIpLHRoaXMuZmlsZUxvYWRlcj1uZXcgeHIodGhpcy5vcHRpb25zLm1hbmFnZXIpLHRoaXMuZmlsZUxvYWRlci5zZXRSZXNwb25zZVR5cGUoImFycmF5YnVmZmVyIiksdGhpcy5vcHRpb25zLmNyb3NzT3JpZ2luPT09InVzZS1jcmVkZW50aWFscyImJnRoaXMuZmlsZUxvYWRlci5zZXRXaXRoQ3JlZGVudGlhbHMoITApfXNldEV4dGVuc2lvbnModCl7dGhpcy5leHRlbnNpb25zPXR9c2V0UGx1Z2lucyh0KXt0aGlzLnBsdWdpbnM9dH1wYXJzZSh0LGUpe2NvbnN0IHM9dGhpcyxpPXRoaXMuanNvbixuPXRoaXMuZXh0ZW5zaW9uczt0aGlzLmNhY2hlLnJlbW92ZUFsbCgpLHRoaXMuX2ludm9rZUFsbChmdW5jdGlvbihyKXtyZXR1cm4gci5fbWFya0RlZnMmJnIuX21hcmtEZWZzKCl9KSxQcm9taXNlLmFsbCh0aGlzLl9pbnZva2VBbGwoZnVuY3Rpb24ocil7cmV0dXJuIHIuYmVmb3JlUm9vdCYmci5iZWZvcmVSb290KCl9KSkudGhlbihmdW5jdGlvbigpe3JldHVybiBQcm9taXNlLmFsbChbcy5nZXREZXBlbmRlbmNpZXMoInNjZW5lIikscy5nZXREZXBlbmRlbmNpZXMoImFuaW1hdGlvbiIpLHMuZ2V0RGVwZW5kZW5jaWVzKCJjYW1lcmEiKV0pfSkudGhlbihmdW5jdGlvbihyKXtjb25zdCBvPXtzY2VuZTpyWzBdW2kuc2NlbmV8fDBdLHNjZW5lczpyWzBdLGFuaW1hdGlvbnM6clsxXSxjYW1lcmFzOnJbMl0sYXNzZXQ6aS5hc3NldCxwYXJzZXI6cyx1c2VyRGF0YTp7fX07TmUobixvLGkpLFZ0KG8saSksUHJvbWlzZS5hbGwocy5faW52b2tlQWxsKGZ1bmN0aW9uKGEpe3JldHVybiBhLmFmdGVyUm9vdCYmYS5hZnRlclJvb3Qobyl9KSkudGhlbihmdW5jdGlvbigpe3Qobyl9KX0pLmNhdGNoKGUpfV9tYXJrRGVmcygpe2NvbnN0IHQ9dGhpcy5qc29uLm5vZGVzfHxbXSxlPXRoaXMuanNvbi5za2luc3x8W10scz10aGlzLmpzb24ubWVzaGVzfHxbXTtmb3IobGV0IGk9MCxuPWUubGVuZ3RoO2k8bjtpKyspe2NvbnN0IHI9ZVtpXS5qb2ludHM7Zm9yKGxldCBvPTAsYT1yLmxlbmd0aDtvPGE7bysrKXRbcltvXV0uaXNCb25lPSEwfWZvcihsZXQgaT0wLG49dC5sZW5ndGg7aTxuO2krKyl7Y29uc3Qgcj10W2ldO3IubWVzaCE9PXZvaWQgMCYmKHRoaXMuX2FkZE5vZGVSZWYodGhpcy5tZXNoQ2FjaGUsci5tZXNoKSxyLnNraW4hPT12b2lkIDAmJihzW3IubWVzaF0uaXNTa2lubmVkTWVzaD0hMCkpLHIuY2FtZXJhIT09dm9pZCAwJiZ0aGlzLl9hZGROb2RlUmVmKHRoaXMuY2FtZXJhQ2FjaGUsci5jYW1lcmEpfX1fYWRkTm9kZVJlZih0LGUpe2UhPT12b2lkIDAmJih0LnJlZnNbZV09PT12b2lkIDAmJih0LnJlZnNbZV09dC51c2VzW2VdPTApLHQucmVmc1tlXSsrKX1fZ2V0Tm9kZVJlZih0LGUscyl7aWYodC5yZWZzW2VdPD0xKXJldHVybiBzO2NvbnN0IGk9cy5jbG9uZSgpO3JldHVybiBpLm5hbWUrPSJfaW5zdGFuY2VfIit0LnVzZXNbZV0rKyxpfV9pbnZva2VPbmUodCl7Y29uc3QgZT1PYmplY3QudmFsdWVzKHRoaXMucGx1Z2lucyk7ZS5wdXNoKHRoaXMpO2ZvcihsZXQgcz0wO3M8ZS5sZW5ndGg7cysrKXtjb25zdCBpPXQoZVtzXSk7aWYoaSlyZXR1cm4gaX1yZXR1cm4gbnVsbH1faW52b2tlQWxsKHQpe2NvbnN0IGU9T2JqZWN0LnZhbHVlcyh0aGlzLnBsdWdpbnMpO2UudW5zaGlmdCh0aGlzKTtjb25zdCBzPVtdO2ZvcihsZXQgaT0wO2k8ZS5sZW5ndGg7aSsrKXtjb25zdCBuPXQoZVtpXSk7biYmcy5wdXNoKG4pfXJldHVybiBzfWdldERlcGVuZGVuY3kodCxlKXtjb25zdCBzPXQrIjoiK2U7bGV0IGk9dGhpcy5jYWNoZS5nZXQocyk7aWYoIWkpe3N3aXRjaCh0KXtjYXNlInNjZW5lIjppPXRoaXMubG9hZFNjZW5lKGUpO2JyZWFrO2Nhc2Uibm9kZSI6aT10aGlzLmxvYWROb2RlKGUpO2JyZWFrO2Nhc2UibWVzaCI6aT10aGlzLl9pbnZva2VPbmUoZnVuY3Rpb24obil7cmV0dXJuIG4ubG9hZE1lc2gmJm4ubG9hZE1lc2goZSl9KTticmVhaztjYXNlImFjY2Vzc29yIjppPXRoaXMubG9hZEFjY2Vzc29yKGUpO2JyZWFrO2Nhc2UiYnVmZmVyVmlldyI6aT10aGlzLl9pbnZva2VPbmUoZnVuY3Rpb24obil7cmV0dXJuIG4ubG9hZEJ1ZmZlclZpZXcmJm4ubG9hZEJ1ZmZlclZpZXcoZSl9KTticmVhaztjYXNlImJ1ZmZlciI6aT10aGlzLmxvYWRCdWZmZXIoZSk7YnJlYWs7Y2FzZSJtYXRlcmlhbCI6aT10aGlzLl9pbnZva2VPbmUoZnVuY3Rpb24obil7cmV0dXJuIG4ubG9hZE1hdGVyaWFsJiZuLmxvYWRNYXRlcmlhbChlKX0pO2JyZWFrO2Nhc2UidGV4dHVyZSI6aT10aGlzLl9pbnZva2VPbmUoZnVuY3Rpb24obil7cmV0dXJuIG4ubG9hZFRleHR1cmUmJm4ubG9hZFRleHR1cmUoZSl9KTticmVhaztjYXNlInNraW4iOmk9dGhpcy5sb2FkU2tpbihlKTticmVhaztjYXNlImFuaW1hdGlvbiI6aT10aGlzLmxvYWRBbmltYXRpb24oZSk7YnJlYWs7Y2FzZSJjYW1lcmEiOmk9dGhpcy5sb2FkQ2FtZXJhKGUpO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKCJVbmtub3duIHR5cGU6ICIrdCl9dGhpcy5jYWNoZS5hZGQocyxpKX1yZXR1cm4gaX1nZXREZXBlbmRlbmNpZXModCl7bGV0IGU9dGhpcy5jYWNoZS5nZXQodCk7aWYoIWUpe2NvbnN0IHM9dGhpcyxpPXRoaXMuanNvblt0Kyh0PT09Im1lc2giPyJlcyI6InMiKV18fFtdO2U9UHJvbWlzZS5hbGwoaS5tYXAoZnVuY3Rpb24obixyKXtyZXR1cm4gcy5nZXREZXBlbmRlbmN5KHQscil9KSksdGhpcy5jYWNoZS5hZGQodCxlKX1yZXR1cm4gZX1sb2FkQnVmZmVyKHQpe2NvbnN0IGU9dGhpcy5qc29uLmJ1ZmZlcnNbdF0scz10aGlzLmZpbGVMb2FkZXI7aWYoZS50eXBlJiZlLnR5cGUhPT0iYXJyYXlidWZmZXIiKXRocm93IG5ldyBFcnJvcigiVEhSRUUuR0xURkxvYWRlcjogIitlLnR5cGUrIiBidWZmZXIgdHlwZSBpcyBub3Qgc3VwcG9ydGVkLiIpO2lmKGUudXJpPT09dm9pZCAwJiZ0PT09MClyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuZXh0ZW5zaW9uc1tJLktIUl9CSU5BUllfR0xURl0uYm9keSk7Y29uc3QgaT10aGlzLm9wdGlvbnM7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKG4scil7cy5sb2FkKFJyKGUudXJpLGkucGF0aCksbix2b2lkIDAsZnVuY3Rpb24oKXtyKG5ldyBFcnJvcignVEhSRUUuR0xURkxvYWRlcjogRmFpbGVkIHRvIGxvYWQgYnVmZmVyICInK2UudXJpKyciLicpKX0pfSl9bG9hZEJ1ZmZlclZpZXcodCl7Y29uc3QgZT10aGlzLmpzb24uYnVmZmVyVmlld3NbdF07cmV0dXJuIHRoaXMuZ2V0RGVwZW5kZW5jeSgiYnVmZmVyIixlLmJ1ZmZlcikudGhlbihmdW5jdGlvbihzKXtjb25zdCBpPWUuYnl0ZUxlbmd0aHx8MCxuPWUuYnl0ZU9mZnNldHx8MDtyZXR1cm4gcy5zbGljZShuLG4raSl9KX1sb2FkQWNjZXNzb3IodCl7Y29uc3QgZT10aGlzLHM9dGhpcy5qc29uLGk9dGhpcy5qc29uLmFjY2Vzc29yc1t0XTtpZihpLmJ1ZmZlclZpZXc9PT12b2lkIDAmJmkuc3BhcnNlPT09dm9pZCAwKXJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7Y29uc3Qgbj1bXTtyZXR1cm4gaS5idWZmZXJWaWV3IT09dm9pZCAwP24ucHVzaCh0aGlzLmdldERlcGVuZGVuY3koImJ1ZmZlclZpZXciLGkuYnVmZmVyVmlldykpOm4ucHVzaChudWxsKSxpLnNwYXJzZSE9PXZvaWQgMCYmKG4ucHVzaCh0aGlzLmdldERlcGVuZGVuY3koImJ1ZmZlclZpZXciLGkuc3BhcnNlLmluZGljZXMuYnVmZmVyVmlldykpLG4ucHVzaCh0aGlzLmdldERlcGVuZGVuY3koImJ1ZmZlclZpZXciLGkuc3BhcnNlLnZhbHVlcy5idWZmZXJWaWV3KSkpLFByb21pc2UuYWxsKG4pLnRoZW4oZnVuY3Rpb24ocil7Y29uc3Qgbz1yWzBdLGE9enJbaS50eXBlXSxoPWdzW2kuY29tcG9uZW50VHlwZV0sbD1oLkJZVEVTX1BFUl9FTEVNRU5ULHU9bCphLGQ9aS5ieXRlT2Zmc2V0fHwwLGY9aS5idWZmZXJWaWV3IT09dm9pZCAwP3MuYnVmZmVyVmlld3NbaS5idWZmZXJWaWV3XS5ieXRlU3RyaWRlOnZvaWQgMCxwPWkubm9ybWFsaXplZD09PSEwO2xldCBtLGc7aWYoZiYmZiE9PXUpe2NvbnN0IHk9TWF0aC5mbG9vcihkL2YpLE09IkludGVybGVhdmVkQnVmZmVyOiIraS5idWZmZXJWaWV3KyI6IitpLmNvbXBvbmVudFR5cGUrIjoiK3krIjoiK2kuY291bnQ7bGV0IHc9ZS5jYWNoZS5nZXQoTSk7d3x8KG09bmV3IGgobyx5KmYsaS5jb3VudCpmL2wpLHc9bmV3IFdhKG0sZi9sKSxlLmNhY2hlLmFkZChNLHcpKSxnPW5ldyB6aSh3LGEsZCVmL2wscCl9ZWxzZSBvPT09bnVsbD9tPW5ldyBoKGkuY291bnQqYSk6bT1uZXcgaChvLGQsaS5jb3VudCphKSxnPW5ldyB3dChtLGEscCk7aWYoaS5zcGFyc2UhPT12b2lkIDApe2NvbnN0IHk9enIuU0NBTEFSLE09Z3NbaS5zcGFyc2UuaW5kaWNlcy5jb21wb25lbnRUeXBlXSx3PWkuc3BhcnNlLmluZGljZXMuYnl0ZU9mZnNldHx8MCxfPWkuc3BhcnNlLnZhbHVlcy5ieXRlT2Zmc2V0fHwwLGI9bmV3IE0oclsxXSx3LGkuc3BhcnNlLmNvdW50KnkpLEE9bmV3IGgoclsyXSxfLGkuc3BhcnNlLmNvdW50KmEpO28hPT1udWxsJiYoZz1uZXcgd3QoZy5hcnJheS5zbGljZSgpLGcuaXRlbVNpemUsZy5ub3JtYWxpemVkKSk7Zm9yKGxldCBTPTAsdj1iLmxlbmd0aDtTPHY7UysrKXtjb25zdCBrPWJbU107aWYoZy5zZXRYKGssQVtTKmFdKSxhPj0yJiZnLnNldFkoayxBW1MqYSsxXSksYT49MyYmZy5zZXRaKGssQVtTKmErMl0pLGE+PTQmJmcuc2V0VyhrLEFbUyphKzNdKSxhPj01KXRocm93IG5ldyBFcnJvcigiVEhSRUUuR0xURkxvYWRlcjogVW5zdXBwb3J0ZWQgaXRlbVNpemUgaW4gc3BhcnNlIEJ1ZmZlckF0dHJpYnV0ZS4iKX19cmV0dXJuIGd9KX1sb2FkVGV4dHVyZSh0KXtjb25zdCBlPXRoaXMuanNvbixzPXRoaXMub3B0aW9ucyxpPWUudGV4dHVyZXNbdF0sbj1lLmltYWdlc1tpLnNvdXJjZV07bGV0IHI9dGhpcy50ZXh0dXJlTG9hZGVyO2lmKG4udXJpKXtjb25zdCBvPXMubWFuYWdlci5nZXRIYW5kbGVyKG4udXJpKTtvIT09bnVsbCYmKHI9byl9cmV0dXJuIHRoaXMubG9hZFRleHR1cmVJbWFnZSh0LG4scil9bG9hZFRleHR1cmVJbWFnZSh0LGUscyl7Y29uc3QgaT10aGlzLG49dGhpcy5qc29uLHI9dGhpcy5vcHRpb25zLG89bi50ZXh0dXJlc1t0XSxhPShlLnVyaXx8ZS5idWZmZXJWaWV3KSsiOiIrby5zYW1wbGVyO2lmKHRoaXMudGV4dHVyZUNhY2hlW2FdKXJldHVybiB0aGlzLnRleHR1cmVDYWNoZVthXTtjb25zdCBoPXNlbGYuVVJMfHxzZWxmLndlYmtpdFVSTDtsZXQgbD1lLnVyaXx8IiIsdT0hMSxkPSEwO2NvbnN0IGY9bC5zZWFyY2goL1wuanBlP2coJHxcPykvaSk+MHx8bC5zZWFyY2goL15kYXRhXDppbWFnZVwvanBlZy8pPT09MDtpZigoZS5taW1lVHlwZT09PSJpbWFnZS9qcGVnInx8ZikmJihkPSExKSxlLmJ1ZmZlclZpZXchPT12b2lkIDApbD1pLmdldERlcGVuZGVuY3koImJ1ZmZlclZpZXciLGUuYnVmZmVyVmlldykudGhlbihmdW5jdGlvbihtKXtpZihlLm1pbWVUeXBlPT09ImltYWdlL3BuZyIpe2NvbnN0IHk9bmV3IERhdGFWaWV3KG0sMjUsMSkuZ2V0VWludDgoMCwhMSk7ZD15PT09Nnx8eT09PTR8fHk9PT0zfXU9ITA7Y29uc3QgZz1uZXcgQmxvYihbbV0se3R5cGU6ZS5taW1lVHlwZX0pO3JldHVybiBsPWguY3JlYXRlT2JqZWN0VVJMKGcpLGx9KTtlbHNlIGlmKGUudXJpPT09dm9pZCAwKXRocm93IG5ldyBFcnJvcigiVEhSRUUuR0xURkxvYWRlcjogSW1hZ2UgIit0KyIgaXMgbWlzc2luZyBVUkkgYW5kIGJ1ZmZlclZpZXciKTtjb25zdCBwPVByb21pc2UucmVzb2x2ZShsKS50aGVuKGZ1bmN0aW9uKG0pe3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihnLHkpe2xldCBNPWc7cy5pc0ltYWdlQml0bWFwTG9hZGVyPT09ITAmJihNPWZ1bmN0aW9uKHcpe2cobmV3IEphKHcpKX0pLHMubG9hZChScihtLHIucGF0aCksTSx2b2lkIDAseSl9KX0pLnRoZW4oZnVuY3Rpb24obSl7dT09PSEwJiZoLnJldm9rZU9iamVjdFVSTChsKSxtLmZsaXBZPSExLG8ubmFtZSYmKG0ubmFtZT1vLm5hbWUpLGR8fChtLmZvcm1hdD0kcyk7Y29uc3QgeT0obi5zYW1wbGVyc3x8e30pW28uc2FtcGxlcl18fHt9O3JldHVybiBtLm1hZ0ZpbHRlcj1Fclt5Lm1hZ0ZpbHRlcl18fFhzLG0ubWluRmlsdGVyPUVyW3kubWluRmlsdGVyXXx8WXMsbS53cmFwUz12clt5LndyYXBTXXx8eGUsbS53cmFwVD12clt5LndyYXBUXXx8eGUsaS5hc3NvY2lhdGlvbnMuc2V0KG0se3R5cGU6InRleHR1cmVzIixpbmRleDp0fSksbX0pO3JldHVybiB0aGlzLnRleHR1cmVDYWNoZVthXT1wLHB9YXNzaWduVGV4dHVyZSh0LGUscyl7Y29uc3QgaT10aGlzO3JldHVybiB0aGlzLmdldERlcGVuZGVuY3koInRleHR1cmUiLHMuaW5kZXgpLnRoZW4oZnVuY3Rpb24obil7aWYocy50ZXhDb29yZCE9PXZvaWQgMCYmcy50ZXhDb29yZCE9MCYmIShlPT09ImFvTWFwIiYmcy50ZXhDb29yZD09MSkmJmNvbnNvbGUud2FybigiVEhSRUUuR0xURkxvYWRlcjogQ3VzdG9tIFVWIHNldCAiK3MudGV4Q29vcmQrIiBmb3IgdGV4dHVyZSAiK2UrIiBub3QgeWV0IHN1cHBvcnRlZC4iKSxpLmV4dGVuc2lvbnNbSS5LSFJfVEVYVFVSRV9UUkFOU0ZPUk1dKXtjb25zdCByPXMuZXh0ZW5zaW9ucyE9PXZvaWQgMD9zLmV4dGVuc2lvbnNbSS5LSFJfVEVYVFVSRV9UUkFOU0ZPUk1dOnZvaWQgMDtpZihyKXtjb25zdCBvPWkuYXNzb2NpYXRpb25zLmdldChuKTtuPWkuZXh0ZW5zaW9uc1tJLktIUl9URVhUVVJFX1RSQU5TRk9STV0uZXh0ZW5kVGV4dHVyZShuLHIpLGkuYXNzb2NpYXRpb25zLnNldChuLG8pfX10W2VdPW59KX1hc3NpZ25GaW5hbE1hdGVyaWFsKHQpe2NvbnN0IGU9dC5nZW9tZXRyeTtsZXQgcz10Lm1hdGVyaWFsO2NvbnN0IGk9ZS5hdHRyaWJ1dGVzLnRhbmdlbnQhPT12b2lkIDAsbj1lLmF0dHJpYnV0ZXMuY29sb3IhPT12b2lkIDAscj1lLmF0dHJpYnV0ZXMubm9ybWFsPT09dm9pZCAwLG89T2JqZWN0LmtleXMoZS5tb3JwaEF0dHJpYnV0ZXMpLmxlbmd0aD4wLGE9byYmZS5tb3JwaEF0dHJpYnV0ZXMubm9ybWFsIT09dm9pZCAwO2lmKHQuaXNQb2ludHMpe2NvbnN0IGg9IlBvaW50c01hdGVyaWFsOiIrcy51dWlkO2xldCBsPXRoaXMuY2FjaGUuZ2V0KGgpO2x8fChsPW5ldyBmcixpZS5wcm90b3R5cGUuY29weS5jYWxsKGwscyksbC5jb2xvci5jb3B5KHMuY29sb3IpLGwubWFwPXMubWFwLGwuc2l6ZUF0dGVudWF0aW9uPSExLHRoaXMuY2FjaGUuYWRkKGgsbCkpLHM9bH1lbHNlIGlmKHQuaXNMaW5lKXtjb25zdCBoPSJMaW5lQmFzaWNNYXRlcmlhbDoiK3MudXVpZDtsZXQgbD10aGlzLmNhY2hlLmdldChoKTtsfHwobD1uZXcgYXIsaWUucHJvdG90eXBlLmNvcHkuY2FsbChsLHMpLGwuY29sb3IuY29weShzLmNvbG9yKSx0aGlzLmNhY2hlLmFkZChoLGwpKSxzPWx9aWYoaXx8bnx8cnx8byl7bGV0IGg9IkNsb25lZE1hdGVyaWFsOiIrcy51dWlkKyI6IjtzLmlzR0xURlNwZWN1bGFyR2xvc3NpbmVzc01hdGVyaWFsJiYoaCs9InNwZWN1bGFyLWdsb3NzaW5lc3M6IiksaSYmKGgrPSJ2ZXJ0ZXgtdGFuZ2VudHM6IiksbiYmKGgrPSJ2ZXJ0ZXgtY29sb3JzOiIpLHImJihoKz0iZmxhdC1zaGFkaW5nOiIpLG8mJihoKz0ibW9ycGgtdGFyZ2V0czoiKSxhJiYoaCs9Im1vcnBoLW5vcm1hbHM6Iik7bGV0IGw9dGhpcy5jYWNoZS5nZXQoaCk7bHx8KGw9cy5jbG9uZSgpLG4mJihsLnZlcnRleENvbG9ycz0hMCksciYmKGwuZmxhdFNoYWRpbmc9ITApLG8mJihsLm1vcnBoVGFyZ2V0cz0hMCksYSYmKGwubW9ycGhOb3JtYWxzPSEwKSxpJiYobC52ZXJ0ZXhUYW5nZW50cz0hMCxsLm5vcm1hbFNjYWxlJiYobC5ub3JtYWxTY2FsZS55Kj0tMSksbC5jbGVhcmNvYXROb3JtYWxTY2FsZSYmKGwuY2xlYXJjb2F0Tm9ybWFsU2NhbGUueSo9LTEpKSx0aGlzLmNhY2hlLmFkZChoLGwpLHRoaXMuYXNzb2NpYXRpb25zLnNldChsLHRoaXMuYXNzb2NpYXRpb25zLmdldChzKSkpLHM9bH1zLmFvTWFwJiZlLmF0dHJpYnV0ZXMudXYyPT09dm9pZCAwJiZlLmF0dHJpYnV0ZXMudXYhPT12b2lkIDAmJmUuc2V0QXR0cmlidXRlKCJ1djIiLGUuYXR0cmlidXRlcy51diksdC5tYXRlcmlhbD1zfWdldE1hdGVyaWFsVHlwZSgpe3JldHVybiBtc31sb2FkTWF0ZXJpYWwodCl7Y29uc3QgZT10aGlzLHM9dGhpcy5qc29uLGk9dGhpcy5leHRlbnNpb25zLG49cy5tYXRlcmlhbHNbdF07bGV0IHI7Y29uc3Qgbz17fSxhPW4uZXh0ZW5zaW9uc3x8e30saD1bXTtpZihhW0kuS0hSX01BVEVSSUFMU19QQlJfU1BFQ1VMQVJfR0xPU1NJTkVTU10pe2NvbnN0IHU9aVtJLktIUl9NQVRFUklBTFNfUEJSX1NQRUNVTEFSX0dMT1NTSU5FU1NdO3I9dS5nZXRNYXRlcmlhbFR5cGUoKSxoLnB1c2godS5leHRlbmRQYXJhbXMobyxuLGUpKX1lbHNlIGlmKGFbSS5LSFJfTUFURVJJQUxTX1VOTElUXSl7Y29uc3QgdT1pW0kuS0hSX01BVEVSSUFMU19VTkxJVF07cj11LmdldE1hdGVyaWFsVHlwZSgpLGgucHVzaCh1LmV4dGVuZFBhcmFtcyhvLG4sZSkpfWVsc2V7Y29uc3QgdT1uLnBick1ldGFsbGljUm91Z2huZXNzfHx7fTtpZihvLmNvbG9yPW5ldyBQKDEsMSwxKSxvLm9wYWNpdHk9MSxBcnJheS5pc0FycmF5KHUuYmFzZUNvbG9yRmFjdG9yKSl7Y29uc3QgZD11LmJhc2VDb2xvckZhY3RvcjtvLmNvbG9yLmZyb21BcnJheShkKSxvLm9wYWNpdHk9ZFszXX11LmJhc2VDb2xvclRleHR1cmUhPT12b2lkIDAmJmgucHVzaChlLmFzc2lnblRleHR1cmUobywibWFwIix1LmJhc2VDb2xvclRleHR1cmUpKSxvLm1ldGFsbmVzcz11Lm1ldGFsbGljRmFjdG9yIT09dm9pZCAwP3UubWV0YWxsaWNGYWN0b3I6MSxvLnJvdWdobmVzcz11LnJvdWdobmVzc0ZhY3RvciE9PXZvaWQgMD91LnJvdWdobmVzc0ZhY3RvcjoxLHUubWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlIT09dm9pZCAwJiYoaC5wdXNoKGUuYXNzaWduVGV4dHVyZShvLCJtZXRhbG5lc3NNYXAiLHUubWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlKSksaC5wdXNoKGUuYXNzaWduVGV4dHVyZShvLCJyb3VnaG5lc3NNYXAiLHUubWV0YWxsaWNSb3VnaG5lc3NUZXh0dXJlKSkpLHI9dGhpcy5faW52b2tlT25lKGZ1bmN0aW9uKGQpe3JldHVybiBkLmdldE1hdGVyaWFsVHlwZSYmZC5nZXRNYXRlcmlhbFR5cGUodCl9KSxoLnB1c2goUHJvbWlzZS5hbGwodGhpcy5faW52b2tlQWxsKGZ1bmN0aW9uKGQpe3JldHVybiBkLmV4dGVuZE1hdGVyaWFsUGFyYW1zJiZkLmV4dGVuZE1hdGVyaWFsUGFyYW1zKHQsbyl9KSkpfW4uZG91YmxlU2lkZWQ9PT0hMCYmKG8uc2lkZT1Cbik7Y29uc3QgbD1uLmFscGhhTW9kZXx8UGkuT1BBUVVFO3JldHVybiBsPT09UGkuQkxFTkQ/KG8udHJhbnNwYXJlbnQ9ITAsby5kZXB0aFdyaXRlPSExKTooby50cmFuc3BhcmVudD0hMSxsPT09UGkuTUFTSyYmKG8uYWxwaGFUZXN0PW4uYWxwaGFDdXRvZmYhPT12b2lkIDA/bi5hbHBoYUN1dG9mZjouNSkpLG4ubm9ybWFsVGV4dHVyZSE9PXZvaWQgMCYmciE9PW5lJiYoaC5wdXNoKGUuYXNzaWduVGV4dHVyZShvLCJub3JtYWxNYXAiLG4ubm9ybWFsVGV4dHVyZSkpLG8ubm9ybWFsU2NhbGU9bmV3IE8oMSwtMSksbi5ub3JtYWxUZXh0dXJlLnNjYWxlIT09dm9pZCAwJiZvLm5vcm1hbFNjYWxlLnNldChuLm5vcm1hbFRleHR1cmUuc2NhbGUsLW4ubm9ybWFsVGV4dHVyZS5zY2FsZSkpLG4ub2NjbHVzaW9uVGV4dHVyZSE9PXZvaWQgMCYmciE9PW5lJiYoaC5wdXNoKGUuYXNzaWduVGV4dHVyZShvLCJhb01hcCIsbi5vY2NsdXNpb25UZXh0dXJlKSksbi5vY2NsdXNpb25UZXh0dXJlLnN0cmVuZ3RoIT09dm9pZCAwJiYoby5hb01hcEludGVuc2l0eT1uLm9jY2x1c2lvblRleHR1cmUuc3RyZW5ndGgpKSxuLmVtaXNzaXZlRmFjdG9yIT09dm9pZCAwJiZyIT09bmUmJihvLmVtaXNzaXZlPW5ldyBQKCkuZnJvbUFycmF5KG4uZW1pc3NpdmVGYWN0b3IpKSxuLmVtaXNzaXZlVGV4dHVyZSE9PXZvaWQgMCYmciE9PW5lJiZoLnB1c2goZS5hc3NpZ25UZXh0dXJlKG8sImVtaXNzaXZlTWFwIixuLmVtaXNzaXZlVGV4dHVyZSkpLFByb21pc2UuYWxsKGgpLnRoZW4oZnVuY3Rpb24oKXtsZXQgdTtyZXR1cm4gcj09PU9pP3U9aVtJLktIUl9NQVRFUklBTFNfUEJSX1NQRUNVTEFSX0dMT1NTSU5FU1NdLmNyZWF0ZU1hdGVyaWFsKG8pOnU9bmV3IHIobyksbi5uYW1lJiYodS5uYW1lPW4ubmFtZSksdS5tYXAmJih1Lm1hcC5lbmNvZGluZz1EbiksdS5lbWlzc2l2ZU1hcCYmKHUuZW1pc3NpdmVNYXAuZW5jb2Rpbmc9RG4pLFZ0KHUsbiksZS5hc3NvY2lhdGlvbnMuc2V0KHUse3R5cGU6Im1hdGVyaWFscyIsaW5kZXg6dH0pLG4uZXh0ZW5zaW9ucyYmTmUoaSx1LG4pLHV9KX1jcmVhdGVVbmlxdWVOYW1lKHQpe2NvbnN0IGU9Ri5zYW5pdGl6ZU5vZGVOYW1lKHR8fCIiKTtsZXQgcz1lO2ZvcihsZXQgaT0xO3RoaXMubm9kZU5hbWVzVXNlZFtzXTsrK2kpcz1lKyJfIitpO3JldHVybiB0aGlzLm5vZGVOYW1lc1VzZWRbc109ITAsc31sb2FkR2VvbWV0cmllcyh0KXtjb25zdCBlPXRoaXMscz10aGlzLmV4dGVuc2lvbnMsaT10aGlzLnByaW1pdGl2ZUNhY2hlO2Z1bmN0aW9uIG4obyl7cmV0dXJuIHNbSS5LSFJfRFJBQ09fTUVTSF9DT01QUkVTU0lPTl0uZGVjb2RlUHJpbWl0aXZlKG8sZSkudGhlbihmdW5jdGlvbihhKXtyZXR1cm4gRnIoYSxvLGUpfSl9Y29uc3Qgcj1bXTtmb3IobGV0IG89MCxhPXQubGVuZ3RoO288YTtvKyspe2NvbnN0IGg9dFtvXSxsPVdoKGgpLHU9aVtsXTtpZih1KXIucHVzaCh1LnByb21pc2UpO2Vsc2V7bGV0IGQ7aC5leHRlbnNpb25zJiZoLmV4dGVuc2lvbnNbSS5LSFJfRFJBQ09fTUVTSF9DT01QUkVTU0lPTl0/ZD1uKGgpOmQ9RnIobmV3IG9lLGgsZSksaVtsXT17cHJpbWl0aXZlOmgscHJvbWlzZTpkfSxyLnB1c2goZCl9fXJldHVybiBQcm9taXNlLmFsbChyKX1sb2FkTWVzaCh0KXtjb25zdCBlPXRoaXMscz10aGlzLmpzb24saT10aGlzLmV4dGVuc2lvbnMsbj1zLm1lc2hlc1t0XSxyPW4ucHJpbWl0aXZlcyxvPVtdO2ZvcihsZXQgYT0wLGg9ci5sZW5ndGg7YTxoO2ErKyl7Y29uc3QgbD1yW2FdLm1hdGVyaWFsPT09dm9pZCAwP1ZoKHRoaXMuY2FjaGUpOnRoaXMuZ2V0RGVwZW5kZW5jeSgibWF0ZXJpYWwiLHJbYV0ubWF0ZXJpYWwpO28ucHVzaChsKX1yZXR1cm4gby5wdXNoKGUubG9hZEdlb21ldHJpZXMocikpLFByb21pc2UuYWxsKG8pLnRoZW4oZnVuY3Rpb24oYSl7Y29uc3QgaD1hLnNsaWNlKDAsYS5sZW5ndGgtMSksbD1hW2EubGVuZ3RoLTFdLHU9W107Zm9yKGxldCBmPTAscD1sLmxlbmd0aDtmPHA7ZisrKXtjb25zdCBtPWxbZl0sZz1yW2ZdO2xldCB5O2NvbnN0IE09aFtmXTtpZihnLm1vZGU9PT1fdC5UUklBTkdMRVN8fGcubW9kZT09PV90LlRSSUFOR0xFX1NUUklQfHxnLm1vZGU9PT1fdC5UUklBTkdMRV9GQU58fGcubW9kZT09PXZvaWQgMCl5PW4uaXNTa2lubmVkTWVzaD09PSEwP25ldyBxYShtLE0pOm5ldyBBaShtLE0pLHkuaXNTa2lubmVkTWVzaD09PSEwJiYheS5nZW9tZXRyeS5hdHRyaWJ1dGVzLnNraW5XZWlnaHQubm9ybWFsaXplZCYmeS5ub3JtYWxpemVTa2luV2VpZ2h0cygpLGcubW9kZT09PV90LlRSSUFOR0xFX1NUUklQP3kuZ2VvbWV0cnk9SXIoeS5nZW9tZXRyeSxpYSk6Zy5tb2RlPT09X3QuVFJJQU5HTEVfRkFOJiYoeS5nZW9tZXRyeT1Jcih5Lmdlb21ldHJ5LE5uKSk7ZWxzZSBpZihnLm1vZGU9PT1fdC5MSU5FUyl5PW5ldyB6ZShtLE0pO2Vsc2UgaWYoZy5tb2RlPT09X3QuTElORV9TVFJJUCl5PW5ldyBMaShtLE0pO2Vsc2UgaWYoZy5tb2RlPT09X3QuTElORV9MT09QKXk9bmV3IFlhKG0sTSk7ZWxzZSBpZihnLm1vZGU9PT1fdC5QT0lOVFMpeT1uZXcgJGEobSxNKTtlbHNlIHRocm93IG5ldyBFcnJvcigiVEhSRUUuR0xURkxvYWRlcjogUHJpbWl0aXZlIG1vZGUgdW5zdXBwb3J0ZWQ6ICIrZy5tb2RlKTtPYmplY3Qua2V5cyh5Lmdlb21ldHJ5Lm1vcnBoQXR0cmlidXRlcykubGVuZ3RoPjAmJmpoKHksbikseS5uYW1lPWUuY3JlYXRlVW5pcXVlTmFtZShuLm5hbWV8fCJtZXNoXyIrdCksVnQoeSxuKSxnLmV4dGVuc2lvbnMmJk5lKGkseSxnKSxlLmFzc2lnbkZpbmFsTWF0ZXJpYWwoeSksdS5wdXNoKHkpfWlmKHUubGVuZ3RoPT09MSlyZXR1cm4gdVswXTtjb25zdCBkPW5ldyB2aTtmb3IobGV0IGY9MCxwPXUubGVuZ3RoO2Y8cDtmKyspZC5hZGQodVtmXSk7cmV0dXJuIGR9KX1sb2FkQ2FtZXJhKHQpe2xldCBlO2NvbnN0IHM9dGhpcy5qc29uLmNhbWVyYXNbdF0saT1zW3MudHlwZV07aWYoIWkpe2NvbnNvbGUud2FybigiVEhSRUUuR0xURkxvYWRlcjogTWlzc2luZyBjYW1lcmEgcGFyYW1ldGVycy4iKTtyZXR1cm59cmV0dXJuIHMudHlwZT09PSJwZXJzcGVjdGl2ZSI/ZT1uZXcgVGkoU2EucmFkVG9EZWcoaS55Zm92KSxpLmFzcGVjdFJhdGlvfHwxLGkuem5lYXJ8fDEsaS56ZmFyfHwyZTYpOnMudHlwZT09PSJvcnRob2dyYXBoaWMiJiYoZT1uZXcgdHIoLWkueG1hZyxpLnhtYWcsaS55bWFnLC1pLnltYWcsaS56bmVhcixpLnpmYXIpKSxzLm5hbWUmJihlLm5hbWU9dGhpcy5jcmVhdGVVbmlxdWVOYW1lKHMubmFtZSkpLFZ0KGUscyksUHJvbWlzZS5yZXNvbHZlKGUpfWxvYWRTa2luKHQpe2NvbnN0IGU9dGhpcy5qc29uLnNraW5zW3RdLHM9e2pvaW50czplLmpvaW50c307cmV0dXJuIGUuaW52ZXJzZUJpbmRNYXRyaWNlcz09PXZvaWQgMD9Qcm9taXNlLnJlc29sdmUocyk6dGhpcy5nZXREZXBlbmRlbmN5KCJhY2Nlc3NvciIsZS5pbnZlcnNlQmluZE1hdHJpY2VzKS50aGVuKGZ1bmN0aW9uKGkpe3JldHVybiBzLmludmVyc2VCaW5kTWF0cmljZXM9aSxzfSl9bG9hZEFuaW1hdGlvbih0KXtjb25zdCBzPXRoaXMuanNvbi5hbmltYXRpb25zW3RdLGk9W10sbj1bXSxyPVtdLG89W10sYT1bXTtmb3IobGV0IGg9MCxsPXMuY2hhbm5lbHMubGVuZ3RoO2g8bDtoKyspe2NvbnN0IHU9cy5jaGFubmVsc1toXSxkPXMuc2FtcGxlcnNbdS5zYW1wbGVyXSxmPXUudGFyZ2V0LHA9Zi5ub2RlIT09dm9pZCAwP2Yubm9kZTpmLmlkLG09cy5wYXJhbWV0ZXJzIT09dm9pZCAwP3MucGFyYW1ldGVyc1tkLmlucHV0XTpkLmlucHV0LGc9cy5wYXJhbWV0ZXJzIT09dm9pZCAwP3MucGFyYW1ldGVyc1tkLm91dHB1dF06ZC5vdXRwdXQ7aS5wdXNoKHRoaXMuZ2V0RGVwZW5kZW5jeSgibm9kZSIscCkpLG4ucHVzaCh0aGlzLmdldERlcGVuZGVuY3koImFjY2Vzc29yIixtKSksci5wdXNoKHRoaXMuZ2V0RGVwZW5kZW5jeSgiYWNjZXNzb3IiLGcpKSxvLnB1c2goZCksYS5wdXNoKGYpfXJldHVybiBQcm9taXNlLmFsbChbUHJvbWlzZS5hbGwoaSksUHJvbWlzZS5hbGwobiksUHJvbWlzZS5hbGwociksUHJvbWlzZS5hbGwobyksUHJvbWlzZS5hbGwoYSldKS50aGVuKGZ1bmN0aW9uKGgpe2NvbnN0IGw9aFswXSx1PWhbMV0sZD1oWzJdLGY9aFszXSxwPWhbNF0sbT1bXTtmb3IobGV0IHk9MCxNPWwubGVuZ3RoO3k8TTt5Kyspe2NvbnN0IHc9bFt5XSxfPXVbeV0sYj1kW3ldLEE9Zlt5XSxTPXBbeV07aWYodz09PXZvaWQgMCljb250aW51ZTt3LnVwZGF0ZU1hdHJpeCgpLHcubWF0cml4QXV0b1VwZGF0ZT0hMDtsZXQgdjtzd2l0Y2goSXRbUy5wYXRoXSl7Y2FzZSBJdC53ZWlnaHRzOnY9QmU7YnJlYWs7Y2FzZSBJdC5yb3RhdGlvbjp2PXVlO2JyZWFrO2Nhc2UgSXQucG9zaXRpb246Y2FzZSBJdC5zY2FsZTpkZWZhdWx0OnY9TGU7YnJlYWt9Y29uc3Qgaz13Lm5hbWU/dy5uYW1lOncudXVpZCx6PUEuaW50ZXJwb2xhdGlvbiE9PXZvaWQgMD9VaFtBLmludGVycG9sYXRpb25dOlp0LEw9W107SXRbUy5wYXRoXT09PUl0LndlaWdodHM/dy50cmF2ZXJzZShmdW5jdGlvbihUKXtULmlzTWVzaD09PSEwJiZULm1vcnBoVGFyZ2V0SW5mbHVlbmNlcyYmTC5wdXNoKFQubmFtZT9ULm5hbWU6VC51dWlkKX0pOkwucHVzaChrKTtsZXQgUj1iLmFycmF5O2lmKGIubm9ybWFsaXplZCl7Y29uc3QgVD1VaShSLmNvbnN0cnVjdG9yKSxEPW5ldyBGbG9hdDMyQXJyYXkoUi5sZW5ndGgpO2ZvcihsZXQgQz0wLFk9Ui5sZW5ndGg7QzxZO0MrKylEW0NdPVJbQ10qVDtSPUR9Zm9yKGxldCBUPTAsRD1MLmxlbmd0aDtUPEQ7VCsrKXtjb25zdCBDPW5ldyB2KExbVF0rIi4iK0l0W1MucGF0aF0sXy5hcnJheSxSLHopO0EuaW50ZXJwb2xhdGlvbj09PSJDVUJJQ1NQTElORSImJihDLmNyZWF0ZUludGVycG9sYW50PWZ1bmN0aW9uKGdlKXtyZXR1cm4gbmV3IG1lKHRoaXMudGltZXMsdGhpcy52YWx1ZXMsdGhpcy5nZXRWYWx1ZVNpemUoKS8zLGdlKX0sQy5jcmVhdGVJbnRlcnBvbGFudC5pc0ludGVycG9sYW50RmFjdG9yeU1ldGhvZEdMVEZDdWJpY1NwbGluZT0hMCksbS5wdXNoKEMpfX1jb25zdCBnPXMubmFtZT9zLm5hbWU6ImFuaW1hdGlvbl8iK3Q7cmV0dXJuIG5ldyBzaChnLHZvaWQgMCxtKX0pfWNyZWF0ZU5vZGVNZXNoKHQpe2NvbnN0IGU9dGhpcy5qc29uLHM9dGhpcyxpPWUubm9kZXNbdF07cmV0dXJuIGkubWVzaD09PXZvaWQgMD9udWxsOnMuZ2V0RGVwZW5kZW5jeSgibWVzaCIsaS5tZXNoKS50aGVuKGZ1bmN0aW9uKG4pe2NvbnN0IHI9cy5fZ2V0Tm9kZVJlZihzLm1lc2hDYWNoZSxpLm1lc2gsbik7cmV0dXJuIGkud2VpZ2h0cyE9PXZvaWQgMCYmci50cmF2ZXJzZShmdW5jdGlvbihvKXtpZighIW8uaXNNZXNoKWZvcihsZXQgYT0wLGg9aS53ZWlnaHRzLmxlbmd0aDthPGg7YSsrKW8ubW9ycGhUYXJnZXRJbmZsdWVuY2VzW2FdPWkud2VpZ2h0c1thXX0pLHJ9KX1sb2FkTm9kZSh0KXtjb25zdCBlPXRoaXMuanNvbixzPXRoaXMuZXh0ZW5zaW9ucyxpPXRoaXMsbj1lLm5vZGVzW3RdLHI9bi5uYW1lP2kuY3JlYXRlVW5pcXVlTmFtZShuLm5hbWUpOiIiO3JldHVybiBmdW5jdGlvbigpe2NvbnN0IG89W10sYT1pLl9pbnZva2VPbmUoZnVuY3Rpb24oaCl7cmV0dXJuIGguY3JlYXRlTm9kZU1lc2gmJmguY3JlYXRlTm9kZU1lc2godCl9KTtyZXR1cm4gYSYmby5wdXNoKGEpLG4uY2FtZXJhIT09dm9pZCAwJiZvLnB1c2goaS5nZXREZXBlbmRlbmN5KCJjYW1lcmEiLG4uY2FtZXJhKS50aGVuKGZ1bmN0aW9uKGgpe3JldHVybiBpLl9nZXROb2RlUmVmKGkuY2FtZXJhQ2FjaGUsbi5jYW1lcmEsaCl9KSksaS5faW52b2tlQWxsKGZ1bmN0aW9uKGgpe3JldHVybiBoLmNyZWF0ZU5vZGVBdHRhY2htZW50JiZoLmNyZWF0ZU5vZGVBdHRhY2htZW50KHQpfSkuZm9yRWFjaChmdW5jdGlvbihoKXtvLnB1c2goaCl9KSxQcm9taXNlLmFsbChvKX0oKS50aGVuKGZ1bmN0aW9uKG8pe2xldCBhO2lmKG4uaXNCb25lPT09ITA/YT1uZXcgcnI6by5sZW5ndGg+MT9hPW5ldyB2aTpvLmxlbmd0aD09PTE/YT1vWzBdOmE9bmV3IGosYSE9PW9bMF0pZm9yKGxldCBoPTAsbD1vLmxlbmd0aDtoPGw7aCsrKWEuYWRkKG9baF0pO2lmKG4ubmFtZSYmKGEudXNlckRhdGEubmFtZT1uLm5hbWUsYS5uYW1lPXIpLFZ0KGEsbiksbi5leHRlbnNpb25zJiZOZShzLGEsbiksbi5tYXRyaXghPT12b2lkIDApe2NvbnN0IGg9bmV3IEI7aC5mcm9tQXJyYXkobi5tYXRyaXgpLGEuYXBwbHlNYXRyaXg0KGgpfWVsc2Ugbi50cmFuc2xhdGlvbiE9PXZvaWQgMCYmYS5wb3NpdGlvbi5mcm9tQXJyYXkobi50cmFuc2xhdGlvbiksbi5yb3RhdGlvbiE9PXZvaWQgMCYmYS5xdWF0ZXJuaW9uLmZyb21BcnJheShuLnJvdGF0aW9uKSxuLnNjYWxlIT09dm9pZCAwJiZhLnNjYWxlLmZyb21BcnJheShuLnNjYWxlKTtyZXR1cm4gaS5hc3NvY2lhdGlvbnMuc2V0KGEse3R5cGU6Im5vZGVzIixpbmRleDp0fSksYX0pfWxvYWRTY2VuZSh0KXtjb25zdCBlPXRoaXMuanNvbixzPXRoaXMuZXh0ZW5zaW9ucyxpPXRoaXMuanNvbi5zY2VuZXNbdF0sbj10aGlzLHI9bmV3IHZpO2kubmFtZSYmKHIubmFtZT1uLmNyZWF0ZVVuaXF1ZU5hbWUoaS5uYW1lKSksVnQocixpKSxpLmV4dGVuc2lvbnMmJk5lKHMscixpKTtjb25zdCBvPWkubm9kZXN8fFtdLGE9W107Zm9yKGxldCBoPTAsbD1vLmxlbmd0aDtoPGw7aCsrKWEucHVzaChMcihvW2hdLHIsZSxuKSk7cmV0dXJuIFByb21pc2UuYWxsKGEpLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gcn0pfX1mdW5jdGlvbiBMcihjLHQsZSxzKXtjb25zdCBpPWUubm9kZXNbY107cmV0dXJuIHMuZ2V0RGVwZW5kZW5jeSgibm9kZSIsYykudGhlbihmdW5jdGlvbihuKXtpZihpLnNraW49PT12b2lkIDApcmV0dXJuIG47bGV0IHI7cmV0dXJuIHMuZ2V0RGVwZW5kZW5jeSgic2tpbiIsaS5za2luKS50aGVuKGZ1bmN0aW9uKG8pe3I9bztjb25zdCBhPVtdO2ZvcihsZXQgaD0wLGw9ci5qb2ludHMubGVuZ3RoO2g8bDtoKyspYS5wdXNoKHMuZ2V0RGVwZW5kZW5jeSgibm9kZSIsci5qb2ludHNbaF0pKTtyZXR1cm4gUHJvbWlzZS5hbGwoYSl9KS50aGVuKGZ1bmN0aW9uKG8pe3JldHVybiBuLnRyYXZlcnNlKGZ1bmN0aW9uKGEpe2lmKCFhLmlzTWVzaClyZXR1cm47Y29uc3QgaD1bXSxsPVtdO2ZvcihsZXQgdT0wLGQ9by5sZW5ndGg7dTxkO3UrKyl7Y29uc3QgZj1vW3VdO2lmKGYpe2gucHVzaChmKTtjb25zdCBwPW5ldyBCO3IuaW52ZXJzZUJpbmRNYXRyaWNlcyE9PXZvaWQgMCYmcC5mcm9tQXJyYXkoci5pbnZlcnNlQmluZE1hdHJpY2VzLmFycmF5LHUqMTYpLGwucHVzaChwKX1lbHNlIGNvbnNvbGUud2FybignVEhSRUUuR0xURkxvYWRlcjogSm9pbnQgIiVzIiBjb3VsZCBub3QgYmUgZm91bmQuJyxyLmpvaW50c1t1XSl9YS5iaW5kKG5ldyBSaShoLGwpLGEubWF0cml4V29ybGQpfSksbn0pfSkudGhlbihmdW5jdGlvbihuKXt0LmFkZChuKTtjb25zdCByPVtdO2lmKGkuY2hpbGRyZW4pe2NvbnN0IG89aS5jaGlsZHJlbjtmb3IobGV0IGE9MCxoPW8ubGVuZ3RoO2E8aDthKyspe2NvbnN0IGw9b1thXTtyLnB1c2goTHIobCxuLGUscykpfX1yZXR1cm4gUHJvbWlzZS5hbGwocil9KX1mdW5jdGlvbiBxaChjLHQsZSl7Y29uc3Qgcz10LmF0dHJpYnV0ZXMsaT1uZXcgb3Q7aWYocy5QT1NJVElPTiE9PXZvaWQgMCl7Y29uc3Qgbz1lLmpzb24uYWNjZXNzb3JzW3MuUE9TSVRJT05dLGE9by5taW4saD1vLm1heDtpZihhIT09dm9pZCAwJiZoIT09dm9pZCAwKXtpZihpLnNldChuZXcgeChhWzBdLGFbMV0sYVsyXSksbmV3IHgoaFswXSxoWzFdLGhbMl0pKSxvLm5vcm1hbGl6ZWQpe2NvbnN0IGw9VWkoZ3Nbby5jb21wb25lbnRUeXBlXSk7aS5taW4ubXVsdGlwbHlTY2FsYXIobCksaS5tYXgubXVsdGlwbHlTY2FsYXIobCl9fWVsc2V7Y29uc29sZS53YXJuKCJUSFJFRS5HTFRGTG9hZGVyOiBNaXNzaW5nIG1pbi9tYXggcHJvcGVydGllcyBmb3IgYWNjZXNzb3IgUE9TSVRJT04uIik7cmV0dXJufX1lbHNlIHJldHVybjtjb25zdCBuPXQudGFyZ2V0cztpZihuIT09dm9pZCAwKXtjb25zdCBvPW5ldyB4LGE9bmV3IHg7Zm9yKGxldCBoPTAsbD1uLmxlbmd0aDtoPGw7aCsrKXtjb25zdCB1PW5baF07aWYodS5QT1NJVElPTiE9PXZvaWQgMCl7Y29uc3QgZD1lLmpzb24uYWNjZXNzb3JzW3UuUE9TSVRJT05dLGY9ZC5taW4scD1kLm1heDtpZihmIT09dm9pZCAwJiZwIT09dm9pZCAwKXtpZihhLnNldFgoTWF0aC5tYXgoTWF0aC5hYnMoZlswXSksTWF0aC5hYnMocFswXSkpKSxhLnNldFkoTWF0aC5tYXgoTWF0aC5hYnMoZlsxXSksTWF0aC5hYnMocFsxXSkpKSxhLnNldFooTWF0aC5tYXgoTWF0aC5hYnMoZlsyXSksTWF0aC5hYnMocFsyXSkpKSxkLm5vcm1hbGl6ZWQpe2NvbnN0IG09VWkoZ3NbZC5jb21wb25lbnRUeXBlXSk7YS5tdWx0aXBseVNjYWxhcihtKX1vLm1heChhKX1lbHNlIGNvbnNvbGUud2FybigiVEhSRUUuR0xURkxvYWRlcjogTWlzc2luZyBtaW4vbWF4IHByb3BlcnRpZXMgZm9yIGFjY2Vzc29yIFBPU0lUSU9OLiIpfX1pLmV4cGFuZEJ5VmVjdG9yKG8pfWMuYm91bmRpbmdCb3g9aTtjb25zdCByPW5ldyBwdDtpLmdldENlbnRlcihyLmNlbnRlciksci5yYWRpdXM9aS5taW4uZGlzdGFuY2VUbyhpLm1heCkvMixjLmJvdW5kaW5nU3BoZXJlPXJ9ZnVuY3Rpb24gRnIoYyx0LGUpe2NvbnN0IHM9dC5hdHRyaWJ1dGVzLGk9W107ZnVuY3Rpb24gbihyLG8pe3JldHVybiBlLmdldERlcGVuZGVuY3koImFjY2Vzc29yIixyKS50aGVuKGZ1bmN0aW9uKGEpe2Muc2V0QXR0cmlidXRlKG8sYSl9KX1mb3IoY29uc3QgciBpbiBzKXtjb25zdCBvPVBoW3JdfHxyLnRvTG93ZXJDYXNlKCk7byBpbiBjLmF0dHJpYnV0ZXN8fGkucHVzaChuKHNbcl0sbykpfWlmKHQuaW5kaWNlcyE9PXZvaWQgMCYmIWMuaW5kZXgpe2NvbnN0IHI9ZS5nZXREZXBlbmRlbmN5KCJhY2Nlc3NvciIsdC5pbmRpY2VzKS50aGVuKGZ1bmN0aW9uKG8pe2Muc2V0SW5kZXgobyl9KTtpLnB1c2gocil9cmV0dXJuIFZ0KGMsdCkscWgoYyx0LGUpLFByb21pc2UuYWxsKGkpLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gdC50YXJnZXRzIT09dm9pZCAwP0hoKGMsdC50YXJnZXRzLGUpOmN9KX1mdW5jdGlvbiBJcihjLHQpe2xldCBlPWMuZ2V0SW5kZXgoKTtpZihlPT09bnVsbCl7Y29uc3Qgcj1bXSxvPWMuZ2V0QXR0cmlidXRlKCJwb3NpdGlvbiIpO2lmKG8hPT12b2lkIDApe2ZvcihsZXQgYT0wO2E8by5jb3VudDthKyspci5wdXNoKGEpO2Muc2V0SW5kZXgociksZT1jLmdldEluZGV4KCl9ZWxzZSByZXR1cm4gY29uc29sZS5lcnJvcigiVEhSRUUuR0xURkxvYWRlci50b1RyaWFuZ2xlc0RyYXdNb2RlKCk6IFVuZGVmaW5lZCBwb3NpdGlvbiBhdHRyaWJ1dGUuIFByb2Nlc3Npbmcgbm90IHBvc3NpYmxlLiIpLGN9Y29uc3Qgcz1lLmNvdW50LTIsaT1bXTtpZih0PT09Tm4pZm9yKGxldCByPTE7cjw9cztyKyspaS5wdXNoKGUuZ2V0WCgwKSksaS5wdXNoKGUuZ2V0WChyKSksaS5wdXNoKGUuZ2V0WChyKzEpKTtlbHNlIGZvcihsZXQgcj0wO3I8cztyKyspciUyPT09MD8oaS5wdXNoKGUuZ2V0WChyKSksaS5wdXNoKGUuZ2V0WChyKzEpKSxpLnB1c2goZS5nZXRYKHIrMikpKTooaS5wdXNoKGUuZ2V0WChyKzIpKSxpLnB1c2goZS5nZXRYKHIrMSkpLGkucHVzaChlLmdldFgocikpKTtpLmxlbmd0aC8zIT09cyYmY29uc29sZS5lcnJvcigiVEhSRUUuR0xURkxvYWRlci50b1RyaWFuZ2xlc0RyYXdNb2RlKCk6IFVuYWJsZSB0byBnZW5lcmF0ZSBjb3JyZWN0IGFtb3VudCBvZiB0cmlhbmdsZXMuIik7Y29uc3Qgbj1jLmNsb25lKCk7cmV0dXJuIG4uc2V0SW5kZXgoaSksbn1jbGFzcyBaaHtjb25zdHJ1Y3Rvcih0LGUpe0UodGhpcywiZWxOdW0iKTtFKHRoaXMsIm1hdHJpeCIpO3RoaXMuZWxOdW09dCx0aGlzLm1hdHJpeD1lfX1jbGFzcyBYaHtjb25zdHJ1Y3Rvcih0LGU9bmV3IHgpe0UodGhpcywib3JpZ2luIixuZXcgeCk7RSh0aGlzLCJlbGVtZW50RGF0YXMiLG5ldyBNYXApO0UodGhpcywiaW5zdGFuY2VHZW9tcyIsbmV3IE1hcCk7RSh0aGlzLCJzaGFyZWRHZW9tcyIsbmV3IE1hcCk7RSh0aGlzLCJsem1hIik7RSh0aGlzLCJuZWVkRml4RWxlbWVudHNEYXRhIiwhMSk7RSh0aGlzLCJsb2FkUHJvZ3Jlc3MiLDApO0UodGhpcywib25Qcm9ncmVzc0NhbGxiYWNrIik7dGhpcy5vcmlnaW49ZSx0aGlzLmx6bWE9dH1vblByb2dyZXNzKHQpe3JldHVybiB0aGlzLm9uUHJvZ3Jlc3NDYWxsYmFjaz10LHRoaXN9dXBkYXRlUHJvZ3Jlc3ModCxlPSExKXt0aGlzLmxvYWRQcm9ncmVzcys9dDtjb25zdCBzPWU/dDp0aGlzLmxvYWRQcm9ncmVzczt0aGlzLm9uUHJvZ3Jlc3NDYWxsYmFjayYmdGhpcy5vblByb2dyZXNzQ2FsbGJhY2socyksY29uc29sZS5sb2coInBlcmNlbnQ6ICIrcyl9YXN5bmMgcHJvY2Vzc0dlb21EYXRhKHQsZSxzKXtjb25zdCBpPW5ldyBVaW50OEFycmF5KHQpO2NvbnNvbGUuaW5mbygiRGVjb21wcmVzc2luZyBnZW9tZXRyeSBtZXRhZGF0YTogIitlKTtsZXQgbj1hd2FpdCB0aGlzLmx6bWEuZGVjb21wcmVzcyhpKTt0eXBlb2YgbiE9InN0cmluZyImJihuPW5ldyBUZXh0RGVjb2RlcigidXRmLTgiKS5kZWNvZGUobi5idWZmZXIpKTtjb25zdCByPUpTT04ucGFyc2Uobik7Zm9yKGxldCBvPTA7bzxyLmxlbmd0aDtvKyspe2NvbnN0IGE9cltvXS5Cb3VuZGluZ0JveCxoPXJbb10uU3ViRWxlbWVudHMsbD1uZXcgeXM7YSYmKGwuYmJveD1uZXcgb3QobmV3IHgoYVswXSxhWzFdLGFbNV0pLG5ldyB4KGFbM10sYVs0XSxhWzJdKSksbC5pc0xvYWRlZD0hMCksaCYmKGwuc3ViRWxzPWgpLHRoaXMuZWxlbWVudERhdGFzLnNldChwZS5nZXRHZW9tRWxOdW1iZXIocyxvKSxsKX10aGlzLm5lZWRGaXhFbGVtZW50c0RhdGE9ITB9YXN5bmMgcHJvY2Vzc0dlb21ldHJ5KHQsZSxzLGksbixyLG8pe2NvbnN0IGE9bi80O2xldCBoPW5ldyBVaW50OEFycmF5KHQpO2NvbnNvbGUuaW5mbygiRGVjb21wcmVzc2luZyBnZW9tZXRyeTogIitlKTtjb25zdCBsPWF3YWl0IHRoaXMubHptYS5kZWNvbXByZXNzKGgpO3RoaXMubHptYS50ZXJtaW5hdGUmJnRoaXMubHptYS50ZXJtaW5hdGUoKTtjb25zdCB1PW5ldyBVaW50OEFycmF5KGwpO3RoaXMudXBkYXRlUHJvZ3Jlc3MoYSksY29uc29sZS5sb2coIlBhcnNpbmcgZ2VvbWV0cnk6IitlKSxuZXcgRWgoKS5wYXJzZSh1LmJ1ZmZlciwiIixhc3luYyBmPT57dGhpcy51cGRhdGVQcm9ncmVzcyhhKSxjb25zb2xlLmxvZygiUHJlcGFyaW5nIGdlb21ldHJ5OiAiK2UpO2NvbnN0IHA9YXdhaXQgZi5wYXJzZXIuZ2V0RGVwZW5kZW5jaWVzKCJtYXRlcmlhbCIpO2Yuc2NlbmUudHJhdmVyc2UoZz0+e3ZhciB5LE0sdyxfLGIsQTtpZihnIGluc3RhbmNlb2YgQWl8fGcgaW5zdGFuY2VvZiB6ZSlpZihnLm5hbWUuc3RhcnRzV2l0aCgiaSIpfHwoKHk9Zy5wYXJlbnQpPT1udWxsP3ZvaWQgMDp5Lm5hbWUuc3RhcnRzV2l0aCgiaSIpKSl7Y29uc3QgUz1nLmdlb21ldHJ5LnV1aWQ7bGV0IHY7aWYoKE09Zy5wYXJlbnQpIT1udWxsJiZNLm5hbWUuc3RhcnRzV2l0aCgiaSIpKXtpZih2PWcucGFyZW50Lm1hdHJpeCwhZy5wYXJlbnQuaXNUcmFuc2Zvcm1lZCl7Y29uc3QgVD1uZXcgeCgpLnNldEZyb21NYXRyaXhQb3NpdGlvbih2KTt2LnNldFBvc2l0aW9uKFQueC10aGlzLm9yaWdpbi54LFQueS10aGlzLm9yaWdpbi55LFQuei10aGlzLm9yaWdpbi56KTtjb25zdCBEPWcucGFyZW50O0QuaXNUcmFuc2Zvcm1lZD0hMH19ZWxzZXt2PWcubWF0cml4O2NvbnN0IFQ9bmV3IHgoKS5zZXRGcm9tTWF0cml4UG9zaXRpb24odik7dGhpcy5vcmlnaW4ubGVuZ3RoKCk9PTAmJnRoaXMub3JpZ2luLmNvcHkoVCksdi5zZXRQb3NpdGlvbihULngtdGhpcy5vcmlnaW4ueCxULnktdGhpcy5vcmlnaW4ueSxULnotdGhpcy5vcmlnaW4ueil9Y29uc3Qgaz1nLm1hdGVyaWFsLm5hbWU9PSIiP2cubWF0ZXJpYWwudXVpZDpnLm1hdGVyaWFsLm5hbWU7dGhpcy5zaGFyZWRHZW9tcy5oYXMoayl8fHRoaXMuc2hhcmVkR2VvbXMuc2V0KGssbmV3IFNyKGcubWF0ZXJpYWwsZyxzLGksdGhpcy5vcmlnaW4pKSx0aGlzLmluc3RhbmNlR2VvbXMuaGFzKFMpfHwodGhpcy5pbnN0YW5jZUdlb21zLnNldChTLG5ldyBUaChzKSksKHc9dGhpcy5pbnN0YW5jZUdlb21zLmdldChTKSk9PW51bGx8fHcucHJvY2Vzc0dlb21ldHJ5KGcscCkpO2NvbnN0IHo9KF89Zy5wYXJlbnQpIT1udWxsJiZfLm5hbWUuc3RhcnRzV2l0aCgiaSIpP2cucGFyZW50Lm5hbWUuc3BsaXQoIl8iKTpnLm5hbWUuc3BsaXQoIl8iKSxMPXBlLmdldEdlb21FbE51bWJlcihzLHBhcnNlSW50KHpbMV0pKSxSPW5ldyBaaChMLHYpO2lmKChiPXRoaXMuaW5zdGFuY2VHZW9tcy5nZXQoUykpPT1udWxsfHxiLmluc3RhbmNlcy5wdXNoKFIpLCF0aGlzLmVsZW1lbnREYXRhcy5oYXMoTCkpe2NvbnN0IFQ9bmV3IHlzO1QuYmJveD0oQT10aGlzLmluc3RhbmNlR2VvbXMuZ2V0KFMpKT09bnVsbD92b2lkIDA6QS5ib3guY2xvbmUoKS5hcHBseU1hdHJpeDQodiksVC5iU3BoZXJlPVQuYmJveC5nZXRCb3VuZGluZ1NwaGVyZShuZXcgcHQpLHRoaXMuZWxlbWVudERhdGFzLnNldChMLFQpfX1lbHNle2NvbnN0IFM9Zy5tYXRlcmlhbC5uYW1lPT0iIj9nLm1hdGVyaWFsLnV1aWQ6Zy5tYXRlcmlhbC5uYW1lO3RoaXMuc2hhcmVkR2VvbXMuaGFzKFMpfHx0aGlzLnNoYXJlZEdlb21zLnNldChTLG5ldyBTcihnLm1hdGVyaWFsLGcscyxpLHRoaXMub3JpZ2luKSk7Y29uc3Qgdj10aGlzLnNoYXJlZEdlb21zLmdldChTKTt2PT1udWxsfHx2LnByb2Nlc3NTaGFyZWRHZW9tZXRyeShnLHMsaSksdGhpcy5zaGFyZWRHZW9tcy5zZXQoUyx2KX19KSx0aGlzLm1lcmdlSW5zdGFuY2VHZW9tZXRyeSh0aGlzLnNoYXJlZEdlb21zLHRoaXMuaW5zdGFuY2VHZW9tcyx0aGlzLmVsZW1lbnREYXRhcyksdGhpcy5nZW5lcmF0ZUluZGljZXNNYXAodGhpcy5zaGFyZWRHZW9tcyx0aGlzLmVsZW1lbnREYXRhcyksdGhpcy5uZWVkRml4RWxlbWVudHNEYXRhJiZ0aGlzLmZpeEVsZW1lbnRzRGF0YSh0aGlzLmVsZW1lbnREYXRhcyksdGhpcy51cGRhdGVQcm9ncmVzcyhhKTtsZXQgbT17ZWxlbWVudERhdGFzOnRoaXMuZWxlbWVudERhdGFzLHNoYXJlZEdlb21zOnRoaXMuc2hhcmVkR2VvbXMsaW5zdGFuY2VHZW9tczp0aGlzLmluc3RhbmNlR2VvbXMsZ2VvbUZpbGVOdW1iZXI6cyxnZW9tRmlsZVRvdGFsOml9O3ImJnIobnVsbCxtKX0sZj0+e3RoaXMudXBkYXRlUHJvZ3Jlc3MoYSksciYmbyhudWxsLHtnZW9tRmlsZU51bWJlcjpzLGdlb21GaWxlVG90YWw6aSxlcnJvcjpmfSl9KX1tZXJnZUluc3RhbmNlR2VvbWV0cnkodCxlLHMpe3ZhciBpLG4scjtjb25zb2xlLmluZm8oIk1lcmdpbmcgZ2VvbWV0cnkuLi4iKTtmb3IoY29uc3QgbyBvZiBBcnJheS5mcm9tKGUua2V5cygpKSl7Y29uc3QgYT1lLmdldChvKTtpZighYSljb250aW51ZTtpZihhLnR5cGU9PSJsaW5lInx8YS52ZXJ0cy5sZW5ndGg8MWUzJiZhLmluc3RhbmNlcy5sZW5ndGg8Nnx8YS52ZXJ0cy5sZW5ndGg8MWU0JiZhLmluc3RhbmNlcy5sZW5ndGg8Myl7Y29uc3QgbD10LmdldChhLm1hdE5hbWUpO2w9PW51bGx8fGwuaW5zdGFuY2VzLnB1c2gobyl9fWZvcihjb25zdCBvIG9mIEFycmF5LmZyb20odC5rZXlzKCkpKXtsZXQgYTtjb25zdCBoPXQuZ2V0KG8pO2lmKCFoKWNvbnRpbnVlO2xldCBsPWgudmVydHM/aC52ZXJ0cy5sZW5ndGgvMzowLHU9aC5pbmRleD9oLmluZGV4Lmxlbmd0aDowO2ZvcihhIGluIGguaW5zdGFuY2VzKXtjb25zdCBtPWUuZ2V0KGguaW5zdGFuY2VzW2FdKTshbXx8KGwrPW0udmVydHMubGVuZ3RoLzMqbS5pbnN0YW5jZXMubGVuZ3RoLHUrPW0uaW5kZXgubGVuZ3RoKm0uaW5zdGFuY2VzLmxlbmd0aCl9bGV0IGQ9MCxmPTA7Y29uc3QgcD1uZXcgcGU7aWYocC52ZXJ0cz1uZXcgRmxvYXQzMkFycmF5KGwqMykscC5lbE51bXM9bmV3IEZsb2F0MzJBcnJheShsKSxwLmluZGV4PW5ldyBVaW50MzJBcnJheSh1KSwoKGk9aC52ZXJ0cyk9PW51bGw/dm9pZCAwOmkubGVuZ3RoKT4wKXt0aGlzLmluc2VydEJ1ZmZlcnMocCxoLGQsZixuZXcgQiksZCs9aC52ZXJ0cy5sZW5ndGgvMyxmKz1oLmluZGV4Lmxlbmd0aDtmb3IobGV0IG09MDttPGgudmVydHMubGVuZ3RoLzM7bT1tKzEpe2NvbnN0IGc9aC5lbE51bXNbbV0seT1oLnZlcnRzW20qM10sTT1oLnZlcnRzW20qMysxXSx3PWgudmVydHNbbSozKzJdO2lmKHMuaGFzKGcpKXtpZighKChuPXMuZ2V0KGcpKSE9bnVsbCYmbi5pc0xvYWRlZCkpe2NvbnN0IF89cy5nZXQoZyk7Xy5iYm94LmV4cGFuZEJ5UG9pbnQobmV3IHgoeSxNLHcpKSxfLmJTcGhlcmU9Xy5iYm94LmdldEJvdW5kaW5nU3BoZXJlKG5ldyBwdCl9fWVsc2V7Y29uc3QgXz1uZXcgeXM7cy5zZXQoZyxfKSxfLmJib3g9bmV3IG90KG5ldyB4KHktMSxNLTEsdy0xKSxuZXcgeCh5LE0sdykpfX19Zm9yKGEgaW4gaC5pbnN0YW5jZXMpe2NvbnN0IG09ZS5nZXQoaC5pbnN0YW5jZXNbYV0pO2lmKCEhbSl7Zm9yKGNvbnN0IGcgaW4gbS5pbnN0YW5jZXMpaWYodGhpcy5pbnNlcnRCdWZmZXJzKHAsbSxkLGYsbS5pbnN0YW5jZXNbZ10ubWF0cml4LG0uaW5zdGFuY2VzW2ddLmVsTnVtKSxkKz1tLnZlcnRzLmxlbmd0aC8zLGYrPW0uaW5kZXgubGVuZ3RoLHMuaGFzKG0uaW5zdGFuY2VzW2ddLmVsTnVtKSkocj1zLmdldChtLmluc3RhbmNlc1tnXS5lbE51bSkpPT1udWxsfHxyLmJib3gudW5pb24obS5ib3guY2xvbmUoKS5hcHBseU1hdHJpeDQobS5pbnN0YW5jZXNbZ10ubWF0cml4KSk7ZWxzZXtjb25zdCB5PW5ldyB5cztzLnNldChtLmluc3RhbmNlc1tnXS5lbE51bSx5KSx5LmJib3g9bS5ib3guY2xvbmUoKS5hcHBseU1hdHJpeDQobS5pbnN0YW5jZXNbZ10ubWF0cml4KX1lLmRlbGV0ZShoLmluc3RhbmNlc1thXSl9fWgudmVydHM9cC52ZXJ0cyxoLmdlb21GaWxlTnVtYmVyPXAuZ2VvbUZpbGVOdW1iZXIsaC5lbE51bXM9cC5lbE51bXMsaC5pbmRleD1wLmluZGV4LGguYm94PXAuYm94fX1pbnNlcnRCdWZmZXJzKHQsZSxzLGksbixyPXZvaWQgMCl7Zm9yKGxldCBvPTA7bzxlLnZlcnRzLmxlbmd0aC8zO289bysxKXtjb25zdCBhPW5ldyB4KGUudmVydHNbbyozXSxlLnZlcnRzW28qMysxXSxlLnZlcnRzW28qMysyXSkuYXBwbHlNYXRyaXg0KG4pO3QudmVydHNbbyozK3MqM109YS54LHQudmVydHNbbyozKzErcyozXT1hLnksdC52ZXJ0c1tvKjMrMitzKjNdPWEueix0Lmdlb21GaWxlTnVtYmVyPWUuZ2VvbUZpbGVOdW1iZXIsdC5lbE51bXNbbytzXT1yIT1udWxsP3I6ZS5lbE51bXNbb119Zm9yKGxldCBvPTA7bzxlLmluZGV4Lmxlbmd0aDtvPW8rMSl0LmluZGV4W28raV09ZS5pbmRleFtvXStzLHQuYm94LnVuaW9uKGUuYm94LmNsb25lKCkuYXBwbHlNYXRyaXg0KG4pKX1maXhFbGVtZW50c0RhdGEodCl7Y29uc3QgZT10aGlzLm9yaWdpbi5jbG9uZSgpLm5lZ2F0ZSgpO2Zvcihjb25zdFtzLGldb2YgdClpLmJib3gudHJhbnNsYXRlKGUpLGkuYmJveC5pc0VtcHR5KCl8fChpLmJTcGhlcmU9aS5iYm94LmdldEJvdW5kaW5nU3BoZXJlKG5ldyBwdCkpfWdlbmVyYXRlSW5kaWNlc01hcCh0LGUpe2NvbnN0IHM9bmV3IE1hcDtmb3IobGV0W2ksbl1vZiB0KWlmKG4udHlwZT09PSJtZXNoInx8bi50eXBlPT09ImxpbmUiKXtjb25zdCByPW4uZWxOdW1zLG89bi52ZXJ0cyxhPW4uaW5kZXg7aWYoIXMuaGFzKG4ubWF0TmFtZSkpe2xldCBoPVtyLG8sYV07cy5zZXQobi5tYXROYW1lLGgpfX1mb3IobGV0W2ksbl1vZiBzKXtsZXQgcj1uWzBdLG89blsyXTtmb3IobGV0IGE9MDthPG8ubGVuZ3RoO2E9YSszKXtsZXQgaD1vW2FdLGw9b1thKzFdLHU9b1thKzJdLGQ9cltoXTtpZihlLmhhcyhkKSl7bGV0IGY9ZS5nZXQoZCk7aWYoZiE9bnVsbCYmZi5pbmRlY2VzLmhhcyhpKSl7bGV0IHA9Zj09bnVsbD92b2lkIDA6Zi5pbmRlY2VzLmdldChpKTtwPT1udWxsfHxwLnB1c2goaCkscD09bnVsbHx8cC5wdXNoKGwpLHA9PW51bGx8fHAucHVzaCh1KX1lbHNle2xldCBwPVtdO3AucHVzaChoKSxwLnB1c2gobCkscC5wdXNoKHUpLGY9PW51bGx8fGYuaW5kZWNlcy5zZXQoaSxwKX19fX19fXZhciBZaD1gLyoKCldlYndvcmtlciBCYWNrZW5kIGZvciBcYGpzLWx6bWFcYC4KVGhpcyBpcyB0aGUgTWFpbiBCYWNrZ3JvdW5kIFRhc2suCgpDb3B5cmlnaHQgKGMpIDIwMTcgTWFyY2VsIEdyZXRlciAoaHR0cDovL2dpdGh1Yi5jb20vbWdyZXRlcikKClBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkKb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgIlNvZnR3YXJlIiksIHRvIGRlYWwKaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cwp0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsCmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcwpmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOgoKVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4KYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuCgpUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgIkFTIElTIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUgpJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwKRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFCkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIKTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwKT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTgpUSEUgU09GVFdBUkUuCgoqLwoKInVzZSBzdHJpY3QiOwoKLy8gbWF5YmUgYWxyZWFkeSBleGlzdGluZz8KLy8gc291cmNlcyBtaWdodCBiZSBqb2luZWQ/Ci8vdmFyIExaTUEgPSBMWk1BOwoKIAoKCgoKCnZhciBMWk1BID0gTFpNQSB8fCB7fTsKCihmdW5jdGlvbihMWk1BKSB7CgoidXNlIHN0cmljdCI7CgpMWk1BLk91dFdpbmRvdyA9IGZ1bmN0aW9uKCl7CiAgdGhpcy5fd2luZG93U2l6ZSA9IDA7Cn07CgpMWk1BLk91dFdpbmRvdy5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24od2luZG93U2l6ZSl7CiAgaWYgKCAoIXRoaXMuX2J1ZmZlcikgfHwgKHRoaXMuX3dpbmRvd1NpemUgIT09IHdpbmRvd1NpemUpICl7CiAgICAvLyB1c2luZyBhIHR5cGVkIGFycmF5IGhlcmUgZ2l2ZXMgYSBiaWcgYm9vc3Qgb24gRmlyZWZveAogICAgLy8gbm90IG11Y2ggY2hhbmdlIGluIGNocm9tZSAoYnV0IG1vcmUgbWVtb3J5IGVmZmljaWVudCkKICAgIHRoaXMuX2J1ZmZlciA9IG5ldyBVaW50OEFycmF5KHdpbmRvd1NpemUpOwogIH0KICB0aGlzLl93aW5kb3dTaXplID0gd2luZG93U2l6ZTsKICB0aGlzLl9wb3MgPSAwOwogIHRoaXMuX3N0cmVhbVBvcyA9IDA7Cn07CgpMWk1BLk91dFdpbmRvdy5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbigpewogIHZhciBzaXplID0gdGhpcy5fcG9zIC0gdGhpcy5fc3RyZWFtUG9zOwogIGlmIChzaXplICE9PSAwKXsKICAgIGlmICh0aGlzLl9zdHJlYW0ud3JpdGVCeXRlcyl7CiAgICAgIHRoaXMuX3N0cmVhbS53cml0ZUJ5dGVzKHRoaXMuX2J1ZmZlciwgc2l6ZSk7CiAgICB9IGVsc2UgewogICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkgKyspewogICAgICAgIHRoaXMuX3N0cmVhbS53cml0ZUJ5dGUodGhpcy5fYnVmZmVyW2ldKTsKICAgICAgfQogICAgfQogICAgaWYgKHRoaXMuX3BvcyA+PSB0aGlzLl93aW5kb3dTaXplKXsKICAgICAgdGhpcy5fcG9zID0gMDsKICAgIH0KICAgIHRoaXMuX3N0cmVhbVBvcyA9IHRoaXMuX3BvczsKICB9Cn07CgpMWk1BLk91dFdpbmRvdy5wcm90b3R5cGUucmVsZWFzZVN0cmVhbSA9IGZ1bmN0aW9uKCl7CiAgdGhpcy5mbHVzaCgpOwogIHRoaXMuX3N0cmVhbSA9IG51bGw7Cn07CgpMWk1BLk91dFdpbmRvdy5wcm90b3R5cGUuc2V0U3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKXsKICB0aGlzLnJlbGVhc2VTdHJlYW0oKTsKICB0aGlzLl9zdHJlYW0gPSBzdHJlYW07Cn07CgpMWk1BLk91dFdpbmRvdy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKHNvbGlkKXsKICBpZiAoIXNvbGlkKXsKICAgIHRoaXMuX3N0cmVhbVBvcyA9IDA7CiAgICB0aGlzLl9wb3MgPSAwOwogIH0KfTsKCkxaTUEuT3V0V2luZG93LnByb3RvdHlwZS5jb3B5QmxvY2sgPSBmdW5jdGlvbihkaXN0YW5jZSwgbGVuKXsKICB2YXIgcG9zID0gdGhpcy5fcG9zIC0gZGlzdGFuY2UgLSAxOwogIGlmIChwb3MgPCAwKXsKICAgIHBvcyArPSB0aGlzLl93aW5kb3dTaXplOwogIH0KICB3aGlsZShsZW4gLS0pewogICAgaWYgKHBvcyA+PSB0aGlzLl93aW5kb3dTaXplKXsKICAgICAgcG9zID0gMDsKICAgIH0KICAgIHRoaXMuX2J1ZmZlclt0aGlzLl9wb3MgKytdID0gdGhpcy5fYnVmZmVyW3BvcyArK107CiAgICBpZiAodGhpcy5fcG9zID49IHRoaXMuX3dpbmRvd1NpemUpewogICAgICB0aGlzLmZsdXNoKCk7CiAgICB9CiAgfQp9OwoKTFpNQS5PdXRXaW5kb3cucHJvdG90eXBlLnB1dEJ5dGUgPSBmdW5jdGlvbihiKXsKICB0aGlzLl9idWZmZXJbdGhpcy5fcG9zICsrXSA9IGI7CiAgaWYgKHRoaXMuX3BvcyA+PSB0aGlzLl93aW5kb3dTaXplKXsKICAgIHRoaXMuZmx1c2goKTsKICB9Cn07CgpMWk1BLk91dFdpbmRvdy5wcm90b3R5cGUuZ2V0Qnl0ZSA9IGZ1bmN0aW9uKGRpc3RhbmNlKXsKICB2YXIgcG9zID0gdGhpcy5fcG9zIC0gZGlzdGFuY2UgLSAxOwogIGlmIChwb3MgPCAwKXsKICAgIHBvcyArPSB0aGlzLl93aW5kb3dTaXplOwogIH0KICByZXR1cm4gdGhpcy5fYnVmZmVyW3Bvc107Cn07CgpMWk1BLlJhbmdlRGVjb2RlciA9IGZ1bmN0aW9uKCl7Cn07CgpMWk1BLlJhbmdlRGVjb2Rlci5wcm90b3R5cGUuc2V0U3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKXsKICB0aGlzLl9zdHJlYW0gPSBzdHJlYW07Cn07CgpMWk1BLlJhbmdlRGVjb2Rlci5wcm90b3R5cGUucmVsZWFzZVN0cmVhbSA9IGZ1bmN0aW9uKCl7CiAgdGhpcy5fc3RyZWFtID0gbnVsbDsKfTsKCkxaTUEuUmFuZ2VEZWNvZGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXsKICB2YXIgaSA9IDU7CgogIHRoaXMuX2NvZGUgPSAwOwogIHRoaXMuX3JhbmdlID0gLTE7CgogIHdoaWxlKGkgLS0pewogICAgdGhpcy5fY29kZSA9ICh0aGlzLl9jb2RlIDw8IDgpIHwgdGhpcy5fc3RyZWFtLnJlYWRCeXRlKCk7CiAgfQp9OwoKTFpNQS5SYW5nZURlY29kZXIucHJvdG90eXBlLmRlY29kZURpcmVjdEJpdHMgPSBmdW5jdGlvbihudW1Ub3RhbEJpdHMpewogIHZhciByZXN1bHQgPSAwLCBpID0gbnVtVG90YWxCaXRzLCB0OwoKICB3aGlsZShpIC0tKXsKICAgIHRoaXMuX3JhbmdlID4+Pj0gMTsKICAgIHQgPSAodGhpcy5fY29kZSAtIHRoaXMuX3JhbmdlKSA+Pj4gMzE7CiAgICB0aGlzLl9jb2RlIC09IHRoaXMuX3JhbmdlICYgKHQgLSAxKTsKICAgIHJlc3VsdCA9IChyZXN1bHQgPDwgMSkgfCAoMSAtIHQpOwoKICAgIGlmICggKHRoaXMuX3JhbmdlICYgMHhmZjAwMDAwMCkgPT09IDApewogICAgICB0aGlzLl9jb2RlID0gKHRoaXMuX2NvZGUgPDwgOCkgfCB0aGlzLl9zdHJlYW0ucmVhZEJ5dGUoKTsKICAgICAgdGhpcy5fcmFuZ2UgPDw9IDg7CiAgICB9CiAgfQoKICByZXR1cm4gcmVzdWx0Owp9OwoKTFpNQS5SYW5nZURlY29kZXIucHJvdG90eXBlLmRlY29kZUJpdCA9IGZ1bmN0aW9uKHByb2JzLCBpbmRleCl7CiAgdmFyIHByb2IgPSBwcm9ic1tpbmRleF0sCiAgICAgIG5ld0JvdW5kID0gKHRoaXMuX3JhbmdlID4+PiAxMSkgKiBwcm9iOwoKICBpZiAoICh0aGlzLl9jb2RlIF4gMHg4MDAwMDAwMCkgPCAobmV3Qm91bmQgXiAweDgwMDAwMDAwKSApewogICAgdGhpcy5fcmFuZ2UgPSBuZXdCb3VuZDsKICAgIHByb2JzW2luZGV4XSArPSAoMjA0OCAtIHByb2IpID4+PiA1OwogICAgaWYgKCAodGhpcy5fcmFuZ2UgJiAweGZmMDAwMDAwKSA9PT0gMCl7CiAgICAgIHRoaXMuX2NvZGUgPSAodGhpcy5fY29kZSA8PCA4KSB8IHRoaXMuX3N0cmVhbS5yZWFkQnl0ZSgpOwogICAgICB0aGlzLl9yYW5nZSA8PD0gODsKICAgIH0KICAgIHJldHVybiAwOwogIH0KCiAgdGhpcy5fcmFuZ2UgLT0gbmV3Qm91bmQ7CiAgdGhpcy5fY29kZSAtPSBuZXdCb3VuZDsKICBwcm9ic1tpbmRleF0gLT0gcHJvYiA+Pj4gNTsKICBpZiAoICh0aGlzLl9yYW5nZSAmIDB4ZmYwMDAwMDApID09PSAwKXsKICAgIHRoaXMuX2NvZGUgPSAodGhpcy5fY29kZSA8PCA4KSB8IHRoaXMuX3N0cmVhbS5yZWFkQnl0ZSgpOwogICAgdGhpcy5fcmFuZ2UgPDw9IDg7CiAgfQogIHJldHVybiAxOwp9OwoKTFpNQS5pbml0Qml0TW9kZWxzID0gZnVuY3Rpb24ocHJvYnMsIGxlbil7CiAgd2hpbGUobGVuIC0tKXsKICAgIHByb2JzW2xlbl0gPSAxMDI0OwogIH0KfTsKCkxaTUEuQml0VHJlZURlY29kZXIgPSBmdW5jdGlvbihudW1CaXRMZXZlbHMpewogIHRoaXMuX21vZGVscyA9IFtdOwogIHRoaXMuX251bUJpdExldmVscyA9IG51bUJpdExldmVsczsKfTsKCkxaTUEuQml0VHJlZURlY29kZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpewogIExaTUEuaW5pdEJpdE1vZGVscyh0aGlzLl9tb2RlbHMsIDEgPDwgdGhpcy5fbnVtQml0TGV2ZWxzKTsKfTsKCkxaTUEuQml0VHJlZURlY29kZXIucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKHJhbmdlRGVjb2Rlcil7CiAgdmFyIG0gPSAxLCBpID0gdGhpcy5fbnVtQml0TGV2ZWxzOwoKICB3aGlsZShpIC0tKXsKICAgIG0gPSAobSA8PCAxKSB8IHJhbmdlRGVjb2Rlci5kZWNvZGVCaXQodGhpcy5fbW9kZWxzLCBtKTsKICB9CiAgcmV0dXJuIG0gLSAoMSA8PCB0aGlzLl9udW1CaXRMZXZlbHMpOwp9OwoKTFpNQS5CaXRUcmVlRGVjb2Rlci5wcm90b3R5cGUucmV2ZXJzZURlY29kZSA9IGZ1bmN0aW9uKHJhbmdlRGVjb2Rlcil7CiAgdmFyIG0gPSAxLCBzeW1ib2wgPSAwLCBpID0gMCwgYml0OwoKICBmb3IgKDsgaSA8IHRoaXMuX251bUJpdExldmVsczsgKysgaSl7CiAgICBiaXQgPSByYW5nZURlY29kZXIuZGVjb2RlQml0KHRoaXMuX21vZGVscywgbSk7CiAgICBtID0gKG0gPDwgMSkgfCBiaXQ7CiAgICBzeW1ib2wgfD0gYml0IDw8IGk7CiAgfQogIHJldHVybiBzeW1ib2w7Cn07CgpMWk1BLnJldmVyc2VEZWNvZGUyID0gZnVuY3Rpb24obW9kZWxzLCBzdGFydEluZGV4LCByYW5nZURlY29kZXIsIG51bUJpdExldmVscyl7CiAgdmFyIG0gPSAxLCBzeW1ib2wgPSAwLCBpID0gMCwgYml0OwoKICBmb3IgKDsgaSA8IG51bUJpdExldmVsczsgKysgaSl7CiAgICBiaXQgPSByYW5nZURlY29kZXIuZGVjb2RlQml0KG1vZGVscywgc3RhcnRJbmRleCArIG0pOwogICAgbSA9IChtIDw8IDEpIHwgYml0OwogICAgc3ltYm9sIHw9IGJpdCA8PCBpOwogIH0KICByZXR1cm4gc3ltYm9sOwp9OwoKTFpNQS5MZW5EZWNvZGVyID0gZnVuY3Rpb24oKXsKICB0aGlzLl9jaG9pY2UgPSBbXTsKICB0aGlzLl9sb3dDb2RlciA9IFtdOwogIHRoaXMuX21pZENvZGVyID0gW107CiAgdGhpcy5faGlnaENvZGVyID0gbmV3IExaTUEuQml0VHJlZURlY29kZXIoOCk7CiAgdGhpcy5fbnVtUG9zU3RhdGVzID0gMDsKfTsKCkxaTUEuTGVuRGVjb2Rlci5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24obnVtUG9zU3RhdGVzKXsKICBmb3IgKDsgdGhpcy5fbnVtUG9zU3RhdGVzIDwgbnVtUG9zU3RhdGVzOyArKyB0aGlzLl9udW1Qb3NTdGF0ZXMpewogICAgdGhpcy5fbG93Q29kZXJbdGhpcy5fbnVtUG9zU3RhdGVzXSA9IG5ldyBMWk1BLkJpdFRyZWVEZWNvZGVyKDMpOwogICAgdGhpcy5fbWlkQ29kZXJbdGhpcy5fbnVtUG9zU3RhdGVzXSA9IG5ldyBMWk1BLkJpdFRyZWVEZWNvZGVyKDMpOwogIH0KfTsKCkxaTUEuTGVuRGVjb2Rlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7CiAgdmFyIGkgPSB0aGlzLl9udW1Qb3NTdGF0ZXM7CiAgTFpNQS5pbml0Qml0TW9kZWxzKHRoaXMuX2Nob2ljZSwgMik7CiAgd2hpbGUoaSAtLSl7CiAgICB0aGlzLl9sb3dDb2RlcltpXS5pbml0KCk7CiAgICB0aGlzLl9taWRDb2RlcltpXS5pbml0KCk7CiAgfQogIHRoaXMuX2hpZ2hDb2Rlci5pbml0KCk7Cn07CgpMWk1BLkxlbkRlY29kZXIucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKHJhbmdlRGVjb2RlciwgcG9zU3RhdGUpewogIGlmIChyYW5nZURlY29kZXIuZGVjb2RlQml0KHRoaXMuX2Nob2ljZSwgMCkgPT09IDApewogICAgcmV0dXJuIHRoaXMuX2xvd0NvZGVyW3Bvc1N0YXRlXS5kZWNvZGUocmFuZ2VEZWNvZGVyKTsKICB9CiAgaWYgKHJhbmdlRGVjb2Rlci5kZWNvZGVCaXQodGhpcy5fY2hvaWNlLCAxKSA9PT0gMCl7CiAgICByZXR1cm4gOCArIHRoaXMuX21pZENvZGVyW3Bvc1N0YXRlXS5kZWNvZGUocmFuZ2VEZWNvZGVyKTsKICB9CiAgcmV0dXJuIDE2ICsgdGhpcy5faGlnaENvZGVyLmRlY29kZShyYW5nZURlY29kZXIpOwp9OwoKTFpNQS5EZWNvZGVyMiA9IGZ1bmN0aW9uKCl7CiAgdGhpcy5fZGVjb2RlcnMgPSBbXTsKfTsKCkxaTUEuRGVjb2RlcjIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpewogIExaTUEuaW5pdEJpdE1vZGVscyh0aGlzLl9kZWNvZGVycywgMHgzMDApOwp9OwoKTFpNQS5EZWNvZGVyMi5wcm90b3R5cGUuZGVjb2RlTm9ybWFsID0gZnVuY3Rpb24ocmFuZ2VEZWNvZGVyKXsKICB2YXIgc3ltYm9sID0gMTsKCiAgZG97CiAgICBzeW1ib2wgPSAoc3ltYm9sIDw8IDEpIHwgcmFuZ2VEZWNvZGVyLmRlY29kZUJpdCh0aGlzLl9kZWNvZGVycywgc3ltYm9sKTsKICB9d2hpbGUoc3ltYm9sIDwgMHgxMDApOwoKICByZXR1cm4gc3ltYm9sICYgMHhmZjsKfTsKCkxaTUEuRGVjb2RlcjIucHJvdG90eXBlLmRlY29kZVdpdGhNYXRjaEJ5dGUgPSBmdW5jdGlvbihyYW5nZURlY29kZXIsIG1hdGNoQnl0ZSl7CiAgdmFyIHN5bWJvbCA9IDEsIG1hdGNoQml0LCBiaXQ7CgogIGRvewogICAgbWF0Y2hCaXQgPSAobWF0Y2hCeXRlID4+IDcpICYgMTsKICAgIG1hdGNoQnl0ZSA8PD0gMTsKICAgIGJpdCA9IHJhbmdlRGVjb2Rlci5kZWNvZGVCaXQodGhpcy5fZGVjb2RlcnMsICggKDEgKyBtYXRjaEJpdCkgPDwgOCkgKyBzeW1ib2wpOwogICAgc3ltYm9sID0gKHN5bWJvbCA8PCAxKSB8IGJpdDsKICAgIGlmIChtYXRjaEJpdCAhPT0gYml0KXsKICAgICAgd2hpbGUoc3ltYm9sIDwgMHgxMDApewogICAgICAgIHN5bWJvbCA9IChzeW1ib2wgPDwgMSkgfCByYW5nZURlY29kZXIuZGVjb2RlQml0KHRoaXMuX2RlY29kZXJzLCBzeW1ib2wpOwogICAgICB9CiAgICAgIGJyZWFrOwogICAgfQogIH13aGlsZShzeW1ib2wgPCAweDEwMCk7CgogIHJldHVybiBzeW1ib2wgJiAweGZmOwp9OwoKTFpNQS5MaXRlcmFsRGVjb2RlciA9IGZ1bmN0aW9uKCl7Cn07CgpMWk1BLkxpdGVyYWxEZWNvZGVyLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbihudW1Qb3NCaXRzLCBudW1QcmV2Qml0cyl7CiAgdmFyIGk7CgogIGlmICh0aGlzLl9jb2RlcnMKICAgICYmICh0aGlzLl9udW1QcmV2Qml0cyA9PT0gbnVtUHJldkJpdHMpCiAgICAmJiAodGhpcy5fbnVtUG9zQml0cyA9PT0gbnVtUG9zQml0cykgKXsKICAgIHJldHVybjsKICB9CiAgdGhpcy5fbnVtUG9zQml0cyA9IG51bVBvc0JpdHM7CiAgdGhpcy5fcG9zTWFzayA9ICgxIDw8IG51bVBvc0JpdHMpIC0gMTsKICB0aGlzLl9udW1QcmV2Qml0cyA9IG51bVByZXZCaXRzOwoKICB0aGlzLl9jb2RlcnMgPSBbXTsKCiAgaSA9IDEgPDwgKHRoaXMuX251bVByZXZCaXRzICsgdGhpcy5fbnVtUG9zQml0cyk7CiAgd2hpbGUoaSAtLSl7CiAgICB0aGlzLl9jb2RlcnNbaV0gPSBuZXcgTFpNQS5EZWNvZGVyMigpOwogIH0KfTsKCkxaTUEuTGl0ZXJhbERlY29kZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpewogIHZhciBpID0gMSA8PCAodGhpcy5fbnVtUHJldkJpdHMgKyB0aGlzLl9udW1Qb3NCaXRzKTsKICB3aGlsZShpIC0tKXsKICAgIHRoaXMuX2NvZGVyc1tpXS5pbml0KCk7CiAgfQp9OwoKTFpNQS5MaXRlcmFsRGVjb2Rlci5wcm90b3R5cGUuZ2V0RGVjb2RlciA9IGZ1bmN0aW9uKHBvcywgcHJldkJ5dGUpewogIHJldHVybiB0aGlzLl9jb2RlcnNbKCAocG9zICYgdGhpcy5fcG9zTWFzaykgPDwgdGhpcy5fbnVtUHJldkJpdHMpCiAgICArICggKHByZXZCeXRlICYgMHhmZikgPj4+ICg4IC0gdGhpcy5fbnVtUHJldkJpdHMpICldOwp9OwoKTFpNQS5EZWNvZGVyID0gZnVuY3Rpb24oKXsKICB0aGlzLl9vdXRXaW5kb3cgPSBuZXcgTFpNQS5PdXRXaW5kb3coKTsKICB0aGlzLl9yYW5nZURlY29kZXIgPSBuZXcgTFpNQS5SYW5nZURlY29kZXIoKTsKICB0aGlzLl9pc01hdGNoRGVjb2RlcnMgPSBbXTsKICB0aGlzLl9pc1JlcERlY29kZXJzID0gW107CiAgdGhpcy5faXNSZXBHMERlY29kZXJzID0gW107CiAgdGhpcy5faXNSZXBHMURlY29kZXJzID0gW107CiAgdGhpcy5faXNSZXBHMkRlY29kZXJzID0gW107CiAgdGhpcy5faXNSZXAwTG9uZ0RlY29kZXJzID0gW107CiAgdGhpcy5fcG9zU2xvdERlY29kZXIgPSBbXTsKICB0aGlzLl9wb3NEZWNvZGVycyA9IFtdOwogIHRoaXMuX3Bvc0FsaWduRGVjb2RlciA9IG5ldyBMWk1BLkJpdFRyZWVEZWNvZGVyKDQpOwogIHRoaXMuX2xlbkRlY29kZXIgPSBuZXcgTFpNQS5MZW5EZWNvZGVyKCk7CiAgdGhpcy5fcmVwTGVuRGVjb2RlciA9IG5ldyBMWk1BLkxlbkRlY29kZXIoKTsKICB0aGlzLl9saXRlcmFsRGVjb2RlciA9IG5ldyBMWk1BLkxpdGVyYWxEZWNvZGVyKCk7CiAgdGhpcy5fZGljdGlvbmFyeVNpemUgPSAtMTsKICB0aGlzLl9kaWN0aW9uYXJ5U2l6ZUNoZWNrID0gLTE7CgogIHRoaXMuX3Bvc1Nsb3REZWNvZGVyWzBdID0gbmV3IExaTUEuQml0VHJlZURlY29kZXIoNik7CiAgdGhpcy5fcG9zU2xvdERlY29kZXJbMV0gPSBuZXcgTFpNQS5CaXRUcmVlRGVjb2Rlcig2KTsKICB0aGlzLl9wb3NTbG90RGVjb2RlclsyXSA9IG5ldyBMWk1BLkJpdFRyZWVEZWNvZGVyKDYpOwogIHRoaXMuX3Bvc1Nsb3REZWNvZGVyWzNdID0gbmV3IExaTUEuQml0VHJlZURlY29kZXIoNik7Cn07CgpMWk1BLkRlY29kZXIucHJvdG90eXBlLnNldERpY3Rpb25hcnlTaXplID0gZnVuY3Rpb24oZGljdGlvbmFyeVNpemUpewogIGlmIChkaWN0aW9uYXJ5U2l6ZSA8IDApewogICAgcmV0dXJuIGZhbHNlOwogIH0KICBpZiAodGhpcy5fZGljdGlvbmFyeVNpemUgIT09IGRpY3Rpb25hcnlTaXplKXsKICAgIHRoaXMuX2RpY3Rpb25hcnlTaXplID0gZGljdGlvbmFyeVNpemU7CiAgICB0aGlzLl9kaWN0aW9uYXJ5U2l6ZUNoZWNrID0gTWF0aC5tYXgodGhpcy5fZGljdGlvbmFyeVNpemUsIDEpOwogICAgdGhpcy5fb3V0V2luZG93LmNyZWF0ZSggTWF0aC5tYXgodGhpcy5fZGljdGlvbmFyeVNpemVDaGVjaywgNDA5NikgKTsKICB9CiAgcmV0dXJuIHRydWU7Cn07CgpMWk1BLkRlY29kZXIucHJvdG90eXBlLnNldExjTHBQYiA9IGZ1bmN0aW9uKGxjLCBscCwgcGIpewogIHZhciBudW1Qb3NTdGF0ZXMgPSAxIDw8IHBiOwoKICBpZiAobGMgPiA4IHx8IGxwID4gNCB8fCBwYiA+IDQpewogICAgcmV0dXJuIGZhbHNlOwogIH0KCiAgdGhpcy5fbGl0ZXJhbERlY29kZXIuY3JlYXRlKGxwLCBsYyk7CgogIHRoaXMuX2xlbkRlY29kZXIuY3JlYXRlKG51bVBvc1N0YXRlcyk7CiAgdGhpcy5fcmVwTGVuRGVjb2Rlci5jcmVhdGUobnVtUG9zU3RhdGVzKTsKICB0aGlzLl9wb3NTdGF0ZU1hc2sgPSBudW1Qb3NTdGF0ZXMgLSAxOwoKICByZXR1cm4gdHJ1ZTsKfTsKCkxaTUEuRGVjb2Rlci5wcm90b3R5cGUuc2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uKHByb3BzKXsKICBpZiAoICF0aGlzLnNldExjTHBQYihwcm9wcy5sYywgcHJvcHMubHAsIHByb3BzLnBiKSApewogICAgdGhyb3cgRXJyb3IoIkluY29ycmVjdCBzdHJlYW0gcHJvcGVydGllcyIpOwogIH0KICBpZiAoICF0aGlzLnNldERpY3Rpb25hcnlTaXplKHByb3BzLmRpY3Rpb25hcnlTaXplKSApewogICAgdGhyb3cgRXJyb3IoIkludmFsaWQgZGljdGlvbmFyeSBzaXplIik7CiAgfQp9OwoKTFpNQS5EZWNvZGVyLnByb3RvdHlwZS5kZWNvZGVIZWFkZXIgPSBmdW5jdGlvbihpblN0cmVhbSl7CgogIHZhciBwcm9wZXJ0aWVzLCBsYywgbHAsIHBiLAogICAgICB1bmNvbXByZXNzZWRTaXplLAogICAgICBkaWN0aW9uYXJ5U2l6ZTsKCiAgaWYgKGluU3RyZWFtLnNpemUgPCAxMyl7CiAgICByZXR1cm4gZmFsc2U7CiAgfQoKICAvLyArLS0tLS0tLS0tLS0tKy0tLS0rLS0tLSstLS0tKy0tLS0rLS0rLS0rLS0rLS0rLS0rLS0rLS0rLS0rCiAgLy8gfCBQcm9wZXJ0aWVzIHwgIERpY3Rpb25hcnkgU2l6ZSAgfCAgIFVuY29tcHJlc3NlZCBTaXplICAgfAogIC8vICstLS0tLS0tLS0tLS0rLS0tLSstLS0tKy0tLS0rLS0tLSstLSstLSstLSstLSstLSstLSstLSstLSsKCiAgcHJvcGVydGllcyA9IGluU3RyZWFtLnJlYWRCeXRlKCk7CiAgbGMgPSBwcm9wZXJ0aWVzICUgOTsKICBwcm9wZXJ0aWVzID0gfn4ocHJvcGVydGllcyAvIDkpOwogIGxwID0gcHJvcGVydGllcyAlIDU7CiAgcGIgPSB+fihwcm9wZXJ0aWVzIC8gNSk7CgogIGRpY3Rpb25hcnlTaXplID0gaW5TdHJlYW0ucmVhZEJ5dGUoKTsKICBkaWN0aW9uYXJ5U2l6ZSB8PSBpblN0cmVhbS5yZWFkQnl0ZSgpIDw8IDg7CiAgZGljdGlvbmFyeVNpemUgfD0gaW5TdHJlYW0ucmVhZEJ5dGUoKSA8PCAxNjsKICBkaWN0aW9uYXJ5U2l6ZSArPSBpblN0cmVhbS5yZWFkQnl0ZSgpICogMTY3NzcyMTY7CgogIHVuY29tcHJlc3NlZFNpemUgPSBpblN0cmVhbS5yZWFkQnl0ZSgpOwogIHVuY29tcHJlc3NlZFNpemUgfD0gaW5TdHJlYW0ucmVhZEJ5dGUoKSA8PCA4OwogIHVuY29tcHJlc3NlZFNpemUgfD0gaW5TdHJlYW0ucmVhZEJ5dGUoKSA8PCAxNjsKICB1bmNvbXByZXNzZWRTaXplICs9IGluU3RyZWFtLnJlYWRCeXRlKCkgKiAxNjc3NzIxNjsKCiAgaW5TdHJlYW0ucmVhZEJ5dGUoKTsKICBpblN0cmVhbS5yZWFkQnl0ZSgpOwogIGluU3RyZWFtLnJlYWRCeXRlKCk7CiAgaW5TdHJlYW0ucmVhZEJ5dGUoKTsKCiAgcmV0dXJuIHsKICAgIC8vIFRoZSBudW1iZXIgb2YgaGlnaCBiaXRzIG9mIHRoZSBwcmV2aW91cwogICAgLy8gYnl0ZSB0byB1c2UgYXMgYSBjb250ZXh0IGZvciBsaXRlcmFsIGVuY29kaW5nLgogICAgbGM6IGxjLAogICAgLy8gVGhlIG51bWJlciBvZiBsb3cgYml0cyBvZiB0aGUgZGljdGlvbmFyeQogICAgLy8gcG9zaXRpb24gdG8gaW5jbHVkZSBpbiBsaXRlcmFsX3Bvc19zdGF0ZS4KICAgIGxwOiBscCwKICAgIC8vIFRoZSBudW1iZXIgb2YgbG93IGJpdHMgb2YgdGhlIGRpY3Rpb25hcnkKICAgIC8vIHBvc2l0aW9uIHRvIGluY2x1ZGUgaW4gcG9zX3N0YXRlLgogICAgcGI6IHBiLAogICAgLy8gRGljdGlvbmFyeSBTaXplIGlzIHN0b3JlZCBhcyBhbiB1bnNpZ25lZCAzMi1iaXQKICAgIC8vIGxpdHRsZSBlbmRpYW4gaW50ZWdlci4gQW55IDMyLWJpdCB2YWx1ZSBpcyBwb3NzaWJsZSwKICAgIC8vIGJ1dCBmb3IgbWF4aW11bSBwb3J0YWJpbGl0eSwgb25seSBzaXplcyBvZiAyXm4gYW5kCiAgICAvLyAyXm4gKyAyXihuLTEpIHNob3VsZCBiZSB1c2VkLgogICAgZGljdGlvbmFyeVNpemU6IGRpY3Rpb25hcnlTaXplLAogICAgLy8gVW5jb21wcmVzc2VkIFNpemUgaXMgc3RvcmVkIGFzIHVuc2lnbmVkIDY0LWJpdCBsaXR0bGUKICAgIC8vIGVuZGlhbiBpbnRlZ2VyLiBBIHNwZWNpYWwgdmFsdWUgb2YgMHhGRkZGX0ZGRkZfRkZGRl9GRkZGCiAgICAvLyBpbmRpY2F0ZXMgdGhhdCBVbmNvbXByZXNzZWQgU2l6ZSBpcyB1bmtub3duLgogICAgdW5jb21wcmVzc2VkU2l6ZTogdW5jb21wcmVzc2VkU2l6ZQogIH07Cn07CgpMWk1BLkRlY29kZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpewogIHZhciBpID0gNDsKCiAgdGhpcy5fb3V0V2luZG93LmluaXQoZmFsc2UpOwoKICBMWk1BLmluaXRCaXRNb2RlbHModGhpcy5faXNNYXRjaERlY29kZXJzLCAxOTIpOwogIExaTUEuaW5pdEJpdE1vZGVscyh0aGlzLl9pc1JlcDBMb25nRGVjb2RlcnMsIDE5Mik7CiAgTFpNQS5pbml0Qml0TW9kZWxzKHRoaXMuX2lzUmVwRGVjb2RlcnMsIDEyKTsKICBMWk1BLmluaXRCaXRNb2RlbHModGhpcy5faXNSZXBHMERlY29kZXJzLCAxMik7CiAgTFpNQS5pbml0Qml0TW9kZWxzKHRoaXMuX2lzUmVwRzFEZWNvZGVycywgMTIpOwogIExaTUEuaW5pdEJpdE1vZGVscyh0aGlzLl9pc1JlcEcyRGVjb2RlcnMsIDEyKTsKICBMWk1BLmluaXRCaXRNb2RlbHModGhpcy5fcG9zRGVjb2RlcnMsIDExNCk7CgogIHRoaXMuX2xpdGVyYWxEZWNvZGVyLmluaXQoKTsKCiAgd2hpbGUoaSAtLSl7CiAgICB0aGlzLl9wb3NTbG90RGVjb2RlcltpXS5pbml0KCk7CiAgfQoKICB0aGlzLl9sZW5EZWNvZGVyLmluaXQoKTsKICB0aGlzLl9yZXBMZW5EZWNvZGVyLmluaXQoKTsKICB0aGlzLl9wb3NBbGlnbkRlY29kZXIuaW5pdCgpOwogIHRoaXMuX3JhbmdlRGVjb2Rlci5pbml0KCk7Cn07CgpMWk1BLkRlY29kZXIucHJvdG90eXBlLmRlY29kZUJvZHkgPSBmdW5jdGlvbihpblN0cmVhbSwgb3V0U3RyZWFtLCBtYXhTaXplKXsKICB2YXIgc3RhdGUgPSAwLCByZXAwID0gMCwgcmVwMSA9IDAsIHJlcDIgPSAwLCByZXAzID0gMCwgbm93UG9zNjQgPSAwLCBwcmV2Qnl0ZSA9IDAsCiAgICAgIHBvc1N0YXRlLCBkZWNvZGVyMiwgbGVuLCBkaXN0YW5jZSwgcG9zU2xvdCwgbnVtRGlyZWN0Qml0czsKCiAgdGhpcy5fcmFuZ2VEZWNvZGVyLnNldFN0cmVhbShpblN0cmVhbSk7CiAgdGhpcy5fb3V0V2luZG93LnNldFN0cmVhbShvdXRTdHJlYW0pOwoKICB0aGlzLmluaXQoKTsKCiAgd2hpbGUobWF4U2l6ZSA8IDAgfHwgbm93UG9zNjQgPCBtYXhTaXplKXsKICAgIHBvc1N0YXRlID0gbm93UG9zNjQgJiB0aGlzLl9wb3NTdGF0ZU1hc2s7CgogICAgaWYgKHRoaXMuX3JhbmdlRGVjb2Rlci5kZWNvZGVCaXQodGhpcy5faXNNYXRjaERlY29kZXJzLCAoc3RhdGUgPDwgNCkgKyBwb3NTdGF0ZSkgPT09IDApewogICAgICBkZWNvZGVyMiA9IHRoaXMuX2xpdGVyYWxEZWNvZGVyLmdldERlY29kZXIobm93UG9zNjQgKyssIHByZXZCeXRlKTsKCiAgICAgIGlmIChzdGF0ZSA+PSA3KXsKICAgICAgICBwcmV2Qnl0ZSA9IGRlY29kZXIyLmRlY29kZVdpdGhNYXRjaEJ5dGUodGhpcy5fcmFuZ2VEZWNvZGVyLCB0aGlzLl9vdXRXaW5kb3cuZ2V0Qnl0ZShyZXAwKSApOwogICAgICB9ZWxzZXsKICAgICAgICBwcmV2Qnl0ZSA9IGRlY29kZXIyLmRlY29kZU5vcm1hbCh0aGlzLl9yYW5nZURlY29kZXIpOwogICAgICB9CiAgICAgIHRoaXMuX291dFdpbmRvdy5wdXRCeXRlKHByZXZCeXRlKTsKCiAgICAgIHN0YXRlID0gc3RhdGUgPCA0PyAwOiBzdGF0ZSAtIChzdGF0ZSA8IDEwPyAzOiA2KTsKCiAgICB9ZWxzZXsKCiAgICAgIGlmICh0aGlzLl9yYW5nZURlY29kZXIuZGVjb2RlQml0KHRoaXMuX2lzUmVwRGVjb2RlcnMsIHN0YXRlKSA9PT0gMSl7CiAgICAgICAgbGVuID0gMDsKICAgICAgICBpZiAodGhpcy5fcmFuZ2VEZWNvZGVyLmRlY29kZUJpdCh0aGlzLl9pc1JlcEcwRGVjb2RlcnMsIHN0YXRlKSA9PT0gMCl7CiAgICAgICAgICBpZiAodGhpcy5fcmFuZ2VEZWNvZGVyLmRlY29kZUJpdCh0aGlzLl9pc1JlcDBMb25nRGVjb2RlcnMsIChzdGF0ZSA8PCA0KSArIHBvc1N0YXRlKSA9PT0gMCl7CiAgICAgICAgICAgIHN0YXRlID0gc3RhdGUgPCA3PyA5OiAxMTsKICAgICAgICAgICAgbGVuID0gMTsKICAgICAgICAgIH0KICAgICAgICB9ZWxzZXsKICAgICAgICAgIGlmICh0aGlzLl9yYW5nZURlY29kZXIuZGVjb2RlQml0KHRoaXMuX2lzUmVwRzFEZWNvZGVycywgc3RhdGUpID09PSAwKXsKICAgICAgICAgICAgZGlzdGFuY2UgPSByZXAxOwogICAgICAgICAgfWVsc2V7CiAgICAgICAgICAgIGlmICh0aGlzLl9yYW5nZURlY29kZXIuZGVjb2RlQml0KHRoaXMuX2lzUmVwRzJEZWNvZGVycywgc3RhdGUpID09PSAwKXsKICAgICAgICAgICAgICBkaXN0YW5jZSA9IHJlcDI7CiAgICAgICAgICAgIH1lbHNlewogICAgICAgICAgICAgIGRpc3RhbmNlID0gcmVwMzsKICAgICAgICAgICAgICByZXAzID0gcmVwMjsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXAyID0gcmVwMTsKICAgICAgICAgIH0KICAgICAgICAgIHJlcDEgPSByZXAwOwogICAgICAgICAgcmVwMCA9IGRpc3RhbmNlOwogICAgICAgIH0KICAgICAgICBpZiAobGVuID09PSAwKXsKICAgICAgICAgIGxlbiA9IDIgKyB0aGlzLl9yZXBMZW5EZWNvZGVyLmRlY29kZSh0aGlzLl9yYW5nZURlY29kZXIsIHBvc1N0YXRlKTsKICAgICAgICAgIHN0YXRlID0gc3RhdGUgPCA3PyA4OiAxMTsKICAgICAgICB9CiAgICAgIH1lbHNlewogICAgICAgIHJlcDMgPSByZXAyOwogICAgICAgIHJlcDIgPSByZXAxOwogICAgICAgIHJlcDEgPSByZXAwOwoKICAgICAgICBsZW4gPSAyICsgdGhpcy5fbGVuRGVjb2Rlci5kZWNvZGUodGhpcy5fcmFuZ2VEZWNvZGVyLCBwb3NTdGF0ZSk7CiAgICAgICAgc3RhdGUgPSBzdGF0ZSA8IDc/IDc6IDEwOwoKICAgICAgICBwb3NTbG90ID0gdGhpcy5fcG9zU2xvdERlY29kZXJbbGVuIDw9IDU/IGxlbiAtIDI6IDNdLmRlY29kZSh0aGlzLl9yYW5nZURlY29kZXIpOwogICAgICAgIGlmIChwb3NTbG90ID49IDQpewoKICAgICAgICAgIG51bURpcmVjdEJpdHMgPSAocG9zU2xvdCA+PiAxKSAtIDE7CiAgICAgICAgICByZXAwID0gKDIgfCAocG9zU2xvdCAmIDEpICkgPDwgbnVtRGlyZWN0Qml0czsKCiAgICAgICAgICBpZiAocG9zU2xvdCA8IDE0KXsKICAgICAgICAgICAgcmVwMCArPSBMWk1BLnJldmVyc2VEZWNvZGUyKHRoaXMuX3Bvc0RlY29kZXJzLAogICAgICAgICAgICAgICAgcmVwMCAtIHBvc1Nsb3QgLSAxLCB0aGlzLl9yYW5nZURlY29kZXIsIG51bURpcmVjdEJpdHMpOwogICAgICAgICAgfWVsc2V7CiAgICAgICAgICAgIHJlcDAgKz0gdGhpcy5fcmFuZ2VEZWNvZGVyLmRlY29kZURpcmVjdEJpdHMobnVtRGlyZWN0Qml0cyAtIDQpIDw8IDQ7CiAgICAgICAgICAgIHJlcDAgKz0gdGhpcy5fcG9zQWxpZ25EZWNvZGVyLnJldmVyc2VEZWNvZGUodGhpcy5fcmFuZ2VEZWNvZGVyKTsKICAgICAgICAgICAgaWYgKHJlcDAgPCAwKXsKICAgICAgICAgICAgICBpZiAocmVwMCA9PT0gLTEpewogICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgICAgICAgfQogICAgICAgICAgfQogICAgICAgIH1lbHNlewogICAgICAgICAgcmVwMCA9IHBvc1Nsb3Q7CiAgICAgICAgfQogICAgICB9CgogICAgICBpZiAocmVwMCA+PSBub3dQb3M2NCB8fCByZXAwID49IHRoaXMuX2RpY3Rpb25hcnlTaXplQ2hlY2spewogICAgICAgIHJldHVybiBmYWxzZTsKICAgICAgfQoKICAgICAgdGhpcy5fb3V0V2luZG93LmNvcHlCbG9jayhyZXAwLCBsZW4pOwogICAgICBub3dQb3M2NCArPSBsZW47CiAgICAgIHByZXZCeXRlID0gdGhpcy5fb3V0V2luZG93LmdldEJ5dGUoMCk7CiAgICB9CiAgfQoKICB0aGlzLl9vdXRXaW5kb3cuZmx1c2goKTsKICB0aGlzLl9vdXRXaW5kb3cucmVsZWFzZVN0cmVhbSgpOwogIHRoaXMuX3JhbmdlRGVjb2Rlci5yZWxlYXNlU3RyZWFtKCk7CgogIHJldHVybiB0cnVlOwp9OwoKTFpNQS5EZWNvZGVyLnByb3RvdHlwZS5zZXREZWNvZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKHByb3BlcnRpZXMpewogIHZhciB2YWx1ZSwgbGMsIGxwLCBwYiwgZGljdGlvbmFyeVNpemU7CgogIGlmIChwcm9wZXJ0aWVzLnNpemUgPCA1KXsKICAgIHJldHVybiBmYWxzZTsKICB9CgogIHZhbHVlID0gcHJvcGVydGllcy5yZWFkQnl0ZSgpOwogIGxjID0gdmFsdWUgJSA5OwogIHZhbHVlID0gfn4odmFsdWUgLyA5KTsKICBscCA9IHZhbHVlICUgNTsKICBwYiA9IH5+KHZhbHVlIC8gNSk7CgogIGlmICggIXRoaXMuc2V0TGNMcFBiKGxjLCBscCwgcGIpICl7CiAgICByZXR1cm4gZmFsc2U7CiAgfQoKICBkaWN0aW9uYXJ5U2l6ZSA9IHByb3BlcnRpZXMucmVhZEJ5dGUoKTsKICBkaWN0aW9uYXJ5U2l6ZSB8PSBwcm9wZXJ0aWVzLnJlYWRCeXRlKCkgPDwgODsKICBkaWN0aW9uYXJ5U2l6ZSB8PSBwcm9wZXJ0aWVzLnJlYWRCeXRlKCkgPDwgMTY7CiAgZGljdGlvbmFyeVNpemUgKz0gcHJvcGVydGllcy5yZWFkQnl0ZSgpICogMTY3NzcyMTY7CgogIHJldHVybiB0aGlzLnNldERpY3Rpb25hcnlTaXplKGRpY3Rpb25hcnlTaXplKTsKfTsKCkxaTUEuZGVjb21wcmVzcyA9IGZ1bmN0aW9uKHByb3BlcnRpZXMsIGluU3RyZWFtLCBvdXRTdHJlYW0sIG91dFNpemUpewogIHZhciBkZWNvZGVyID0gbmV3IExaTUEuRGVjb2RlcigpOwoKICBpZiAoICFkZWNvZGVyLnNldERlY29kZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXMpICl7CiAgICB0aHJvdyBFcnJvcigiSW5jb3JyZWN0IGx6bWEgc3RyZWFtIHByb3BlcnRpZXMiKTsKICB9CgogIGlmICggIWRlY29kZXIuZGVjb2RlQm9keShpblN0cmVhbSwgb3V0U3RyZWFtLCBvdXRTaXplKSApewogICAgdGhyb3cgRXJyb3IoIkVycm9yIGluIGx6bWEgZGF0YSBzdHJlYW0iKTsKICB9CgogIHJldHVybiBvdXRTdHJlYW07Cn07CgpMWk1BLmRlY29tcHJlc3NGaWxlID0gZnVuY3Rpb24oaW5TdHJlYW0sIG91dFN0cmVhbSl7CiAgLy8gdXBncmFkZSBBcnJheUJ1ZmZlciB0byBpbnB1dCBzdHJlYW0KICBpZiAoaW5TdHJlYW0gaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgewogICAgaW5TdHJlYW0gPSBuZXcgTFpNQS5pU3RyZWFtKGluU3RyZWFtKTsKICB9CiAgLy8gb3B0aW9uYWx5IGNyZWF0ZSBhIG5ldyBvdXRwdXQgc3RyZWFtCiAgaWYgKCFvdXRTdHJlYW0gJiYgTFpNQS5vU3RyZWFtKSB7CiAgICBvdXRTdHJlYW0gPSBuZXcgTFpNQS5vU3RyZWFtKCk7CiAgfQogIC8vIGNyZWF0ZSBtYWluIGRlY29kZXIgaW5zdGFuY2UKICB2YXIgZGVjb2RlciA9IG5ldyBMWk1BLkRlY29kZXIoKTsKICAvLyByZWFkIGFsbCB0aGUgaGVhZGVyIHByb3BlcnRpZXMKICB2YXIgaGVhZGVyID0gZGVjb2Rlci5kZWNvZGVIZWFkZXIoaW5TdHJlYW0pOwogIC8vIGdldCBtYXhpbXVtIG91dHB1dCBzaXplICh2ZXJ5IGJpZyE/KQogIHZhciBtYXhTaXplID0gaGVhZGVyLnVuY29tcHJlc3NlZFNpemU7CiAgLy8gc2V0dXAvaW5pdCBkZWNvZGVyIHN0YXRlcwogIGRlY29kZXIuc2V0UHJvcGVydGllcyhoZWFkZXIpOwogIC8vIGludm9rZSB0aGUgbWFpbiBkZWNvZGVyIGZ1bmN0aW9uCiAgaWYgKCAhZGVjb2Rlci5kZWNvZGVCb2R5KGluU3RyZWFtLCBvdXRTdHJlYW0sIG1heFNpemUpICl7CiAgICAvLyBvbmx5IGdlbmVyaWMgZXJyb3IgZ2l2ZW4gaGVyZQogICAgdGhyb3cgRXJyb3IoIkVycm9yIGluIGx6bWEgZGF0YSBzdHJlYW0iKTsKICB9CiAgLy8gcmV0dXJuIHJlc3VsdAogIHJldHVybiBvdXRTdHJlYW07Cn07CgpMWk1BLmRlY29kZSA9IExaTUEuZGVjb21wcmVzc0ZpbGU7Cgp9KShMWk1BKTsKCgoKCihmdW5jdGlvbiAoTFpNQSkgewoKCS8vIHZlcnkgc2ltcGxlIGluIG1lbW9yeSBpbnB1dCBzdHJlYW0gY2xhc3MKCUxaTUEuaVN0cmVhbSA9IGZ1bmN0aW9uKGJ1ZmZlcikKCXsKCQkvLyBjcmVhdGUgYnl0ZSBhcnJheSB2aWV3IG9mIGJ1ZmZlcgoJCXRoaXMuYXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXIpOwoJCS8vIGNvbnZlbmllbmNlIHN0YXR1cyBtZW1iZXIKCQl0aGlzLnNpemUgPSBidWZmZXIuYnl0ZUxlbmd0aDsKCQkvLyBwb3NpdGlvbiBwb2ludGVyCgkJdGhpcy5vZmZzZXQgPSAwOwoJfQoKCS8vIHNpbXBseSByZXR1cm4gdGhlIG5leHQgYnl0ZSBmcm9tIG1lbW9yeQoJTFpNQS5pU3RyZWFtLnByb3RvdHlwZS5yZWFkQnl0ZSA9IGZ1bmN0aW9uKCkKCXsKCQkvLyBhZHZhbmNlIHBvaW50ZXIgYW5kIHJldHVybiBieXRlCgkJcmV0dXJuIHRoaXMuYXJyYXlbdGhpcy5vZmZzZXQrK107Cgl9CgoJLy8gb3V0cHV0IHN0cmVhbSBjb25zdHJ1Y3RvcgoJTFpNQS5vU3RyZWFtID0gZnVuY3Rpb24oYnVmZmVycykKCXsKCQkvLyBhZ2dyZWdhdGVkIHNpemUKCQl0aGlzLnNpemUgPSAwOwoJCS8vIGluaXRpYWxpemUgZW1wdHkKCQl0aGlzLmJ1ZmZlcnMgPSBbXTsKCQlidWZmZXJzID0gYnVmZmVycyB8fCBbXTsKCQkvLyBtYWtlIHN1cmUgc2l6ZSBtYXRjaGVzIGRhdGEKCQlmb3IgKHZhciBpID0gMCwgTCA9IGJ1ZmZlcnMubGVuZ3RoOyBpIDwgTDsgaSsrKSB7CgkJCS8vIHVud3JhcCBuZXN0ZWQgb3V0cHV0IHN0cmVhbXMKCQkJaWYgKGJ1ZmZlcnNbaV0gaW5zdGFuY2VvZiBMWk1BLm9TdHJlYW0pIHsKCQkJCXZhciBvQnVmZmVycyA9IGJ1ZmZlcnNbaV0uYnVmZmVyczsKCQkJCWZvciAodmFyIG4gPSAwOyBuIDwgb0J1ZmZlcnMubGVuZ3RoOyBuKyspIHsKCQkJCQl0aGlzLmJ1ZmZlcnMucHVzaChidWZmZXJzW2ldLmJ1ZmZlcnNbbl0pOwoJCQkJCXRoaXMuc2l6ZSArPSBidWZmZXJzW2ldLmJ1ZmZlcnNbbl0ubGVuZ3RoOwoJCQkJfQoJCQl9IGVsc2UgewoJCQkJLy8gc2ltcGx5IGFwcGVuZCB0aGUgb25lIGJ1ZmZlcgoJCQkJdGhpcy5idWZmZXJzLnB1c2goYnVmZmVyc1tpXSk7CgkJCQl0aGlzLnNpemUgKz0gYnVmZmVyc1tpXS5sZW5ndGg7CgkJCX0KCQl9Cgl9CgoJLy8gd2UgZXhwZWN0IGEgVWludDhBcnJheSBidWZmZXIgYW5kIHRoZSBzaXplIHRvIHJlYWQgZnJvbQoJLy8gY3JlYXRlcyBhIGNvcHkgb2YgdGhlIGJ1ZmZlciBhcyBuZWVkZWQgc28geW91IGNhbiByZS11c2UgaXQKCS8vIHRlc3RzIHdpdGgganMtbHptYSBoYXZlIHNob3duIHRoYXQgdGhpcyBpcyBhdCBtb3N0IGZvciAxNk1CCglMWk1BLm9TdHJlYW0ucHJvdG90eXBlLndyaXRlQnl0ZXMgPSBmdW5jdGlvbiB3cml0ZUJ5dGVzKGJ1ZmZlciwgc2l6ZSkKCXsKCQkvLyBjYW4gd2UganVzdCB0YWtlIHRoZSBmdWxsIGJ1ZmZlcj8KCQkvLyBvciBqdXN0IHNvbWUgcGFydCBvZiB0aGUgYnVmZmVyPwoJCWlmIChzaXplIDw9IGJ1ZmZlci5ieXRlTGVuZ3RoKSB7CgkJCS8vIHdlIG5lZWQgdG8gbWFrZSBhIGNvcHksIGFzIHRoZSBvcmlnaW5hbAoJCQkvLyBidWZmZXIgd2lsbCBiZSByZS11c2VkLiBObyB3YXkgYXJvdW5kIQoJCQl0aGlzLmJ1ZmZlcnMucHVzaChidWZmZXIuc2xpY2UoMCwgc2l6ZSkpOwoJCX0KCQkvLyBhc3NlcnRpb24gZm9yIG91dCBvZiBib3VuZGFyeSBhY2Nlc3MKCQllbHNlIHsgdGhyb3cgRXJyb3IoIkJ1ZmZlciB0b28gc21hbGw/Iik7IH0KCQkvLyBpbmNyZWFzZSBjb3VudGVyCgkJdGhpcy5zaXplICs9IHNpemU7Cgl9CgoJLy8gcmV0dXJuIGEgY29udGlub3VzIFVpbnQ4QXJyYXkgd2l0aCB0aGUgZnVsbCBjb250ZW50CgkvLyB0aGUgdHlwZWQgYXJyYXkgaXMgZ3VhcmFudGVlZCB0byBoYXZlIHRvIGNvcnJlY3QgbGVuZ3RoCgkvLyBhbHNvIG1lYW5pbmcgdGhhdCB0aGVyZSBpcyBubyBzcGFjZSByZW1haW5pbmcgdG8gYWRkIG1vcmUKCS8vIHlvdSBtYXkgc2hvdWxkIGV4cGVjdCBtYWxsb2MgZXJyb3JzIGlmIHNpemUgZ2V0cyBhIGZldyAxME1CCgkvLyBjYWxsaW5nIHRoaXMgcmVwZWF0ZWRseSBhbHdheXMgcmV0dXJucyB0aGUgc2FtZSBhcnJheSBpbnN0YW5jZQoJLy8gTk9URTogQW4gYWx0ZXJuYXRpdmUgYXBwcm9hY2ggd291bGQgYmUgdG8gdXNlIGEgQmxvYi4gQSBCbG9iCgkvLyBjYW4gYmUgY3JlYXRlZCBvdXQgb2YgYW4gYXJyYXkgb2YgYXJyYXkgY2h1bmtzIChvdXIgYnVmZmVycykuCgkvLyBWaWEgYSBGaWxlUmVhZGVyIHdlIGNhbiB0aGVuIGNvbnZlcnQgaXQgYmFjayB0byBhIGNvbnRpbm91cwoJLy8gVWludDhBcnJheS4gQnV0IHRoaXMgd291bGQgbWFrZSB0aGlzIG1ldGhvZCBhc3luYyBpbiBuYXR1cmUhCglMWk1BLm9TdHJlYW0ucHJvdG90eXBlLnRvVWludDhBcnJheSA9IGZ1bmN0aW9uIHRvVWludDhBcnJheSgpCgl7CgkJLy8gbG9jYWwgdmFyaWFibGUgYWNjZXNzCgkJdmFyIHNpemUgPSB0aGlzLnNpemUsCgkJCWJ1ZmZlcnMgPSB0aGlzLmJ1ZmZlcnM7CgoJCS8vIHRoZSBzaW1wbGUgY2FzZSB3aXRoIG9ubHkgb25lIGJ1ZmZlcgoJCWlmIChidWZmZXJzLmxlbmd0aCA9PSAxKSB7CgkJCS8vIG1ha2UgYSBjb3B5IGlmIG5lZWRlZCEKCQkJcmV0dXJuIGJ1ZmZlcnNbMF07CgkJfQoJCS8vIG90aGVyd2lzZSB3ZSBuZWVkIHRvIGNvbmNhdCB0aGVtIGFsbCBub3cKCQl0cnkgewoJCQkvLyBhbGxvY2F0ZSB0aGUgY29udGlub3VzIG1lbW9yeSBjaHVuawoJCQl2YXIgY29udGlub3VzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7CgkJCS8vIHByb2Nlc3MgZWFjaCBidWZmZXIgaW4gdGhlIG91dHB1dCBxdWV1ZQoJCQlmb3IgKHZhciBpID0gMCwgb2Zmc2V0ID0gMDsgaSA8IGJ1ZmZlcnMubGVuZ3RoOyBpKyspIHsKCQkJCWNvbnRpbm91cy5zZXQoYnVmZmVyc1tpXSwgb2Zmc2V0KTsKCQkJCW9mZnNldCArPSBidWZmZXJzW2ldLmxlbmd0aDsKCQkJfQoJCQkvLyByZWxlYXNlIG1lbW9yeSBjaHVua3MKCQkJYnVmZmVyc1swXSA9IGNvbnRpbm91czsKCQkJLy8gb25seSBvbmUgY2h1bmsgbGVmdAoJCQlidWZmZXJzLmxlbmd0aCA9IDE7CgkJCS8vIHJldHVybiB0eXBlZCBhcnJheQoJCQlyZXR1cm4gY29udGlub3VzOwoJCQkvLyBBc3luY2hyb25vdXMgYWx0ZXJuYXRpdmU6CgkJCS8vIHZhciBibG9iID0gbmV3IEJsb2Iob3V0U3RyZWFtLmJ1ZmZlcnMpOwoJCQkvLyB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTsKCQkJLy8gcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkgeyAuLi4gfTsKCQkJLy8gcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpOwoJCX0KCQkvLyBwcm9iYWJseSBhbGxvY2F0aW9uIGVycm9yCgkJY2F0Y2ggKGVycikgewoJCQkvLyB0aGlzIGVycm9yIGlzIHNvbWV3aGF0IGV4cGVjdGVkIHNvIHlvdSBzaG91bGQgdGFrZSBjYXJlIG9mIGl0CgkJCWNvbnNvbGUuZXJyb3IoIkVycm9yIGFsbG9jYXRpbmcgVWludDhBcnJheSBvZiBzaXplOiAiLCBzaXplKTsKCQkJY29uc29sZS5lcnJvcigiTWVzc2FnZSBnaXZlbiB3YXM6ICIsIGVyci50b1N0cmluZygpKTsKCQl9CgkJLy8gbWFsbG9jIGVycm9yCgkJcmV0dXJuIG51bGw7Cgl9CgoJLy8gaW52b2tlIGZuIG9uIGV2ZXJ5IFVpbnQ4QXJyYXkgaW4gdGhlIHN0cmVhbQoJLy8gdXNpbmcgdGhpcyBpbnRlcmZhY2UgY2FuIGF2b2lkIHRoZSBuZWVkIHRvCgkvLyBjcmVhdGUgYSBmdWxsIGNvbnRpbm91cyBidWZmZXIgb2YgdGhlIHJlc3VsdAoJTFpNQS5vU3RyZWFtLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikKCXsKCQlmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnVmZmVycy5sZW5ndGg7IGkrKykgewoJCQlmbi5jYWxsKHRoaXMsIHRoaXMuYnVmZmVyc1tpXSk7CgkJfQoJfQoKCS8vIHJldHVybnMgYSB0eXBlZCBhcnJheSBvZiBjb2RlcG9pbnRzOyBkZXBlbmRpbmcgaWYKCS8vIFVURjggZGVjb2RlciBpcyBsb2FkZWQsIHdlIHRyZWF0IHRoZSBieXRlIHNlcXVlbmNlCgkvLyBlaXRoZXIgYXMgYW4gVVRGOCBzZXF1ZW5jZSBvciBmaXhlZCBvbmUgYnl0ZSBlbmNvZGluZwoJLy8gdGhlIHJlc3VsdCBjYW4gdGhlbiBiZSBjb252ZXJ0ZWQgYmFjayB0byBhIEpTIHN0cmluZwoJTFpNQS5vU3RyZWFtLnByb3RvdHlwZS50b0NvZGVQb2ludHMgPSBmdW5jdGlvbiB0b0NvZGVQb2ludHMoKQoJewoJCS8vIHRyZWF0IGFzIG9uZSBieXRlIGVuY29kaW5nIChpLmUuIFVTLUFTQ0lJKQoJCWlmICghTFpNQS5VVEY4KSB7IHRoaXMudG9VaW50OEFycmF5KCk7IH0KCQkvLyB3ZSBjb3VsZCBwcm9iYWJseSBtYWtlIHRoaXMgd29yayB3aXRoIG91ciBjaHVua2VkCgkJLy8gYnVmZmVycyBkaXJlY3RseSwgYnV0IHVuc3VyZSBob3cgbXVjaCB3ZSBjb3VsZCBnYWluCgkJcmV0dXJuIExaTUEuVVRGOC5kZWNvZGUodGhpcy50b1VpbnQ4QXJyYXkoKSk7Cgl9CgoJLy8gY29udmVydCB0aGUgYnVmZmVyIHRvIGEgamF2YXNjcmlwdCBzdHJpbmcgb2JqZWN0CglMWk1BLm9TdHJlYW0ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKQoJewoJCXZhciBidWZmZXJzID0gdGhpcy5idWZmZXJzLCBzdHJpbmcgPSAnJzsKCQkvLyBvcHRpb25hbGx5IGdldCB0aGUgVVRGOCBjb2RlcG9pbnRzCgkJLy8gcG9zc2libHkgYXZvaWQgY3JlYXRpbmcgYSBjb250aW5vdXMgYnVmZmVyCgkJaWYgKExaTUEuVVRGOCkgYnVmZmVycyA9IFsgdGhpcy50b0NvZGVQb2ludHMoKSBdOwoJCWZvciAodmFyIG4gPSAwLCBuTCA9IGJ1ZmZlcnMubGVuZ3RoOyBuIDwgbkw7IG4rKykgewoJCQlmb3IgKHZhciBpID0gMCwgaUwgPSBidWZmZXJzW25dLmxlbmd0aDsgaSA8IGlMOyBpKyspIHsKCQkJCXN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZmZlcnNbbl1baV0pOwoJCQl9CgkJfQoJCXJldHVybiBzdHJpbmc7Cgl9Cgp9KShMWk1BKTsKCgoKCgoKCi8vIG9wdGlvbmFsIGltcG9ydHMKLy9pZiAoIUxaTUEpIGltcG9ydFNjcmlwdHMoJ2x6bWEuanMnKTsKLy9pZiAoIUxaTUEub1N0cmVhbSkgaW1wb3J0U2NyaXB0cygnbHptYS5zaGltLmpzJyk7Cgpvbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7CiAgLy8gZ2V0IGJ1ZmZlciBmcm9tIGRhdGEKICB2YXIgd2lkID0gZS5kYXRhWzBdLAogICAgICBidWZmZXIgPSBlLmRhdGFbMV07CiAgLy8gY3JlYXRlIHRoZSBpbnB1dCBzdHJlYW0gaW5zdGFuY2UKICB2YXIgaW5TdHJlYW0gPSBuZXcgTFpNQS5pU3RyZWFtKGJ1ZmZlcik7CiAgLy8gY3JlYXRlIHRoZSBvdXRwdXQgc3RyZWFtIGluc3RhbmNlCiAgdmFyIG91dFN0cmVhbSA9IG5ldyBMWk1BLm9TdHJlYW0oKTsKICAvLyBjYXRjaCBzdHJlYW0gZXJyb3JzCiAgdHJ5IHsKICAgIC8vIGludm9rZSBtYWluIGRlY29tcHJlc3MgZnVuY3Rpb24KICAgIExaTUEuZGVjb21wcmVzc0ZpbGUoaW5TdHJlYW0sIG91dFN0cmVhbSkKICAgIC8vIGNyZWF0ZSBhIGNvbnRpbm91cyBieXRlIGFycmF5CiAgICB2YXIgYnVmZmVycyA9IG91dFN0cmVhbS5idWZmZXJzLCBwYXNzID0gW107CiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1ZmZlcnMubGVuZ3RoOyBpKyspIHsKICAgICAgcGFzc1tpXSA9IGJ1ZmZlcnNbaV0uYnVmZmVyOwogICAgfQogICAgLy8gcGFzcyBiYWNrIHRoZSBjb250aW5vdXMgYnVmZmVyCiAgICBwb3N0TWVzc2FnZShbd2lkLCBidWZmZXJzXSwgcGFzcyk7CiAgfQogIGNhdGNoIChlcnIpIHsKICAgIC8vIG5lZWQgdG8gY3JlYXRlIGEgcG9vciBtYW5zIGNsb25lIGFzIG5vdCB0cmFuc2ZlcmFibGUKICAgIHZhciBlcnJvciA9IHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UsIHN0YWNrOiBlcnIuc3RhY2sgfTsKICAgIC8vIHBhc3MgYmFjayB0aGUgY29tcGxldGUgZXJyb3Igb2JqZWN0CiAgICBwb3N0TWVzc2FnZShbd2lkLCBudWxsLCBlcnJvcl0pOwogIH0KCn0KCnBvc3RNZXNzYWdlKCJyZWFkeSIpOwpgO2NsYXNzICRoe2NvbnN0cnVjdG9yKHQ9OCl7RSh0aGlzLCJudW1Xb3JrZXJzIik7RSh0aGlzLCJxdWV1ZSIsW10pO0UodGhpcywid29ya2VycyIsW10pO0UodGhpcywidXJsIik7RSh0aGlzLCJsaXN0ZW5lcnMiLFtdKTtFKHRoaXMsImlzUmVhZHkiLCExKTtFKHRoaXMsInN0YXJ0ZWQiLDApO0UodGhpcywiaWRsZSIpO0UodGhpcywibmV4dCIpO2NvbnN0IGU9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbWWhdLHt0eXBlOiJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0In0pKTt0aGlzLm51bVdvcmtlcnM9dCx0aGlzLnVybD1lLHRoaXMub25SZWFkeT10aGlzLm9uUmVhZHkuYmluZCh0aGlzKSx0aGlzLm9uUmVzdWx0PXRoaXMub25SZXN1bHQuYmluZCh0aGlzKTtmb3IobGV0IHM9MDtzPHRoaXMubnVtV29ya2VycztzKyspe2NvbnN0IGk9bmV3IFdvcmtlcihlKTtpLm9ubWVzc2FnZT10aGlzLm9uUmVhZHksaS5pZGxlPSEwLHRoaXMud29ya2Vycy5wdXNoKGkpfXRoaXMuaWRsZT10LHRoaXMubmV4dD0wfW9uUmVzdWx0KHQpe2NvbnN0IGU9dC5kYXRhWzBdLHM9dC5kYXRhWzFdLGk9dC5kYXRhWzJdLG49dGhpcyxyPXRoaXMudGljazt0LmN1cnJlbnRUYXJnZXQuaWRsZT0hMCxuLmlkbGUrKywobi5uZXh0PT0tMXx8bi5uZXh0PmUpJiYobi5uZXh0PWUpLGk/dC5jdXJyZW50VGFyZ2V0LnJlamVjdChpKTpzP3QuY3VycmVudFRhcmdldC5yZXNvbHZlKHMpOnQuY3VycmVudFRhcmdldC5yZWplY3QobnVsbCksdC5jdXJyZW50VGFyZ2V0LnJlc29sdmU9bnVsbCx0LmN1cnJlbnRUYXJnZXQucmVqZWN0PW51bGwsci5jYWxsKHRoaXMpfW9uTWFuYWdlclJlYWR5KCl7Y29uc3QgdD10aGlzLmxpc3RlbmVycztmb3IoO3QubGVuZ3RoOyl0LnNoaWZ0KCkuY2FsbCh0aGlzKTt0aGlzLmlzUmVhZHk9ITB9b25SZWFkeSh0KXtjb25zdCBlPXRoaXM7aWYodC5kYXRhPT09InJlYWR5Iil0LmN1cnJlbnRUYXJnZXQub25tZXNzYWdlPXRoaXMub25SZXN1bHQsdGhpcy5pc1JlYWR5PSEwLGUuc3RhcnRlZCsrLGUuc3RhcnRlZD09ZS53b3JrZXJzLmxlbmd0aCYmdGhpcy5vbk1hbmFnZXJSZWFkeS5jYWxsKGUpO2Vsc2UgdGhyb3cgRXJyb3IoIldvcmtlciBkaWQgbm90IHN0YXJ0dXAhPyIpfXRlcm1pbmF0ZSgpe2Zvcihjb25zdCB0IG9mIHRoaXMud29ya2Vycyl0LnRlcm1pbmF0ZSgpfXRpY2soKXtmb3IoO3RoaXMucXVldWUubGVuZ3RoJiZ0aGlzLmlkbGU7KXtjb25zdCB0PXRoaXMubmV4dCxlPXRoaXMucXVldWUuc2hpZnQoKTt0eXBlb2YgZVswXT09ImZ1bmN0aW9uIiYmKGVbMF09ZVswXS5jYWxsKHRoaXMpKTtjb25zdCBzPXRoaXMud29ya2Vyc1t0XTtpZighcylkZWJ1Z2dlcjtzLnBvc3RNZXNzYWdlKFt0LGVbMF1dLFtlWzBdXSkscy5yZXNvbHZlPWVbMV0scy5yZWplY3Q9ZVsyXSxzLmlkbGU9ITEsdGhpcy5pZGxlLT0xO2ZvcihsZXQgaT10O2k8dGhpcy53b3JrZXJzLmxlbmd0aDtpKyspaWYodGhpcy53b3JrZXJzW2ldLmlkbGUpe3RoaXMubmV4dD1pO3JldHVybn10aGlzLm5leHQ9LTF9fW1lcmdlRGVjb2RlZEJ1ZmZlcnModCl7bGV0IGU9MDt0LmZvckVhY2goaT0+e2U9ZStpLmxlbmd0aH0pO2NvbnN0IHM9bmV3IFVpbnQ4QXJyYXkoZSk7Zm9yKGxldCBpPTAsbj0wO2k8dC5sZW5ndGg7aSsrKXMuc2V0KHRbaV0sbiksbis9dFtpXS5sZW5ndGg7cmV0dXJuIFVpbnQ4QXJyYXkuZnJvbShzKX1hc3luYyBkZWNvbXByZXNzKHQpe2NvbnN0IGU9YXdhaXQgdGhpcy5kZWNvZGUodCk7cmV0dXJuIHRoaXMubWVyZ2VEZWNvZGVkQnVmZmVycyhlKX1hc3luYyBkZWNvZGUodCl7Y29uc3QgZT10aGlzLnF1ZXVlLHM9dGhpcy50aWNrLGk9dGhpcztyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24obixyKXtlLnB1c2goW3QuYnVmZmVyLG4scl0pLHMuY2FsbChpKX0pfX1jb25zdCBEZT1zZWxmO2xldCBDcj0wLHllPTAsa3I9bmV3IHg7YWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsYz0+e2lmKGMuZGF0YS50eXBlPT0iZmV0Y2hzZXQiKXtjb25zb2xlLmxvZygic3RhcnQgZ2VvbWV0cnkgZmV0aGluZyB3b3JrZXIiKTtjb25zdCB0PWMuZGF0YS5ndWlkcy5zcGxpdCgiOyIpO2tyPW5ldyB4KGMuZGF0YS5vcmlnaW4ueCxjLmRhdGEub3JpZ2luLnksYy5kYXRhLm9yaWdpbi56KTtsZXQgZT0tMTtWaSgxMCk7Y29uc3Qgcz03MC90Lmxlbmd0aDtmb3IobGV0IGkgaW4gdClLaChjLmRhdGEuc2VydmVyLHRbaV0sKytlLHQubGVuZ3RoLHMpfX0pO2Z1bmN0aW9uIFZpKGMsdD0hMSl7Q3IrPWM7dmFyIGU9dD9jOkNyO0RlLnBvc3RNZXNzYWdlKHt0eXBlOiJvblByb2dyZXNzIixwcm9ncmVzczplfSksY29uc29sZS5sb2coInBlcmNlbnQ6ICIrZSl9YXN5bmMgZnVuY3Rpb24gSmgoYyx0KXtyZXR1cm4gYXdhaXQgem4uZ2V0KGMrIi9hcGkvYXBwL2RhdGEvIit0KyIvc3RyZWFtP3N0b3JhZ2VUeXBlPXRhbmdsLWdlb21kYXRhIix7cmVzcG9uc2VUeXBlOiJhcnJheWJ1ZmZlciJ9KS5jYXRjaChlPT4oY29uc29sZS53YXJuKCJHZW9tZXRyeSBtZXRhZGF0YSBub3QgZm91bmQuIEl0IHdpbGwgYmUgZ2VuZXJhdGVkIGxhdGVyLi4iKSwhMSkpfWFzeW5jIGZ1bmN0aW9uIEtoKGMsdCxlLHMsaSl7Y29uc29sZS5pbmZvKCJGZXRjaGluZyBnZW9tZXRyeTogIit0KTtjb25zdCBuPWkvNCxyPW5ldyAkaCxvPW5ldyBYaChyLGtyKS5vblByb2dyZXNzKGw9PntEZS5wb3N0TWVzc2FnZSh7dHlwZToib25Qcm9ncmVzcyIscHJvZ3Jlc3M6bH0pfSksYT1hd2FpdCBKaChjLHQpO2EmJmF3YWl0IG8ucHJvY2Vzc0dlb21EYXRhKGEuZGF0YSx0LGUpO2xldCBoPWF3YWl0IHpuLmdldChjKyIvYXBpL2FwcC9kYXRhLyIrdCsiL3N0cmVhbT9zdG9yYWdlVHlwZT10YW5nbC1nbGIiLHtyZXNwb25zZVR5cGU6ImFycmF5YnVmZmVyIn0pLmNhdGNoKGw9PntWaShuKSx5ZSsrLERlLnBvc3RNZXNzYWdlKHt0eXBlOiJvbk5vdEZvdW5kIixsb2FkZWRHZW9tRmlsZXM6eWUsZ2VvbUZpbGVOdW1iZXI6ZSxnZW9tRmlsZVRvdGFsOnMsbXNnOiJcdTA0MTNcdTA0MzVcdTA0M0VcdTA0M0NcdTA0MzVcdTA0NDJcdTA0NDBcdTA0MzhcdTA0NEYgXHUwNDNDXHUwNDNFXHUwNDM0XHUwNDM1XHUwNDNCXHUwNDM4IFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzAiLGVycjpsfSl9KTtWaShuKSxhd2FpdCBvLnByb2Nlc3NHZW9tZXRyeShoLmRhdGEsdCxlLHMsaSwoKT0+e3llKyssRGUucG9zdE1lc3NhZ2Uoe3R5cGU6Im9uTG9hZGVkIixpZDp0LGxvYWRlZEdlb21GaWxlczp5ZSxlbGVtZW50RGF0YXM6by5lbGVtZW50RGF0YXMsc2hhcmVkR2VvbXM6by5zaGFyZWRHZW9tcyxpbnN0YW5jZUdlb21zOm8uaW5zdGFuY2VHZW9tcyxnZW9tRmlsZU51bWJlcjplLGdlb21GaWxlVG90YWw6c30pfSwobCx1KT0+e3llKyssRGUucG9zdE1lc3NhZ2Uoe3R5cGU6Im9uRXJyb3IiLGxvYWRlZEdlb21GaWxlczp5ZSxnZW9tRmlsZU51bWJlcjplLGdlb21GaWxlVG90YWw6cyxtc2c6Ilx1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0MzdcdTA0MzBcdTA0MzNcdTA0NDBcdTA0NDNcdTA0MzdcdTA0M0FcdTA0MzggXHUwNDNDXHUwNDNFXHUwNDM0XHUwNDM1XHUwNDNCXHUwNDM4OiAke2lkfSIsZXJyOnUuZXJyb3J9KX0pfX0pKCk7Cg==", Zd = typeof window < "u" && window.Blob && new Blob([atob(ls)], { type: "text/javascript;charset=utf-8" });
function In() {
  const n = Zd && (window.URL || window.webkitURL).createObjectURL(Zd);
  try {
    return n ? new Worker(n) : new Worker("data:application/javascript;base64," + ls);
  } finally {
    n && (window.URL || window.webkitURL).revokeObjectURL(n);
  }
}
class Qc extends Event {
  constructor(l) {
    super(el.Progress, {});
    Z(this, "progress");
    this.progress = l;
  }
}
class gn extends Event {
  constructor(l = [], c = !1) {
    super(el.Selected, {});
    Z(this, "elNums");
    Z(this, "forceAdd");
    this.elNums = l, this.forceAdd = c;
  }
}
var el = /* @__PURE__ */ ((n) => (n.Progress = "progress", n.AllLoaded = "allloaded", n.Selected = "selected", n))(el || {}), Hc = /* @__PURE__ */ ((n) => (n[n.Normal = 0] = "Normal", n[n.Hidden = -1] = "Hidden", n[n.Empty = -2] = "Empty", n[n.Inactive = -3] = "Inactive", n[n.White = 1] = "White", n[n.Transparent = 2] = "Transparent", n))(Hc || {});
class Yn {
  constructor(e) {
    Z(this, "sceneManager");
    this.sceneManager = e;
  }
  setElementsColor(e, l, c = void 0) {
    let t;
    this.sceneManager.traverseElementsWithValues(
      e,
      l,
      (d, s, i, a) => {
        const o = new v(a);
        t[i * 3] = o.r, t[i * 3 + 1] = o.g, t[i * 3 + 2] = o.b;
      },
      (d) => {
        d.setAttribute("color", new tl(t, 3));
      },
      (d, s) => {
        c == null ? t = d.getAttribute("color").array : (c[s] == null && (c[s] = new Float32Array(d.getAttribute("color").array)), t = c[s]);
      },
      (d, s, i, a, o, b) => {
        const m = new v(b), X = d.geometry.getAttribute("color");
        X.setXYZ(o, m.r, m.g, m.b), X.needsUpdate = !0;
      }
    );
  }
  setElementsState(e, l = Hc.Normal, c = void 0) {
    let t;
    this.sceneManager.traverseElementsWithValues(
      e,
      l,
      (d, s, i, a) => {
        t[i] = a;
      },
      (d, s) => {
        d.setAttribute("state_1", new tl(t, 1)), this.sceneManager.meshTools.optimizeSharedVisibility(d, !s);
      },
      (d, s) => {
        c == null ? t = d.getAttribute("state_1").array : (c[s] == null && (c[s] = new Float32Array(d.getAttribute("state_1").array)), t = c[s]);
      },
      (d, s, i, a, o, b) => {
        const m = d.geometry.getAttribute("state_1");
        m.setX(o, b), m.needsUpdate = !0;
      }
    );
  }
  optimizeAllElementsVisibility() {
    this.sceneManager.scene.traverse((e) => {
      e instanceof Pl ? this.sceneManager.meshTools.optimizeInstancesVisibility(e) : e instanceof w ? this.sceneManager.meshTools.optimizeSharedVisibility(e.geometry, !1) : e instanceof al && this.sceneManager.meshTools.optimizeSharedVisibility(e.geometry, !0);
    });
  }
  hideElements(e) {
    for (let l in e) {
      const c = this.sceneManager.elementDatas.get(e[l]);
      c.isHidden = !0;
    }
    this.sceneManager.traverseElements2(
      e,
      (l, c, t) => {
      },
      (l, c) => {
        c ? (this.sceneManager.meshTools.optimizeSharedVisibility(l, !1), Rc(l)) : this.sceneManager.meshTools.optimizeSharedVisibility(l, !0);
      },
      (l, c) => {
      },
      (l, c, t, d, s) => {
      },
      (l, c) => {
        this.sceneManager.meshTools.optimizeInstancesVisibility(l);
      }
    );
  }
  isolateElements(e) {
    if (e.length == 1 && e[0] == -1)
      this.showAllElements();
    else {
      this.hideAllElements();
      for (let l in e) {
        const c = this.sceneManager.elementDatas.get(e[l]);
        c.isHidden = !1;
      }
      this.optimizeAllElementsVisibility(), this.sceneManager.traverseElements2(
        e,
        (l, c, t) => {
        },
        (l, c) => {
          c && Rc(l);
        },
        (l, c) => {
        },
        (l, c, t, d, s) => {
        },
        (l, c) => {
        }
      );
    }
  }
  hideAllElements() {
    for (let [e, l] of this.sceneManager.elementDatas)
      l.isHidden = !0;
  }
  showAllElements() {
    for (let [e, l] of this.sceneManager.elementDatas)
      l.isHidden = !1;
    this.optimizeAllElementsVisibility();
  }
}
class gc {
  constructor() {
    Z(this, "colorAttr", new Array());
    Z(this, "elNumAttr", new Array());
    Z(this, "selectedAttr", new Array());
    Z(this, "stateAttr", new Array());
    Z(this, "matrixAttr", new Array());
  }
  add(e, l) {
    this.colorAttr.push(e.geometry.getAttribute("color").array[l * 3]), this.colorAttr.push(e.geometry.getAttribute("color").array[l * 3 + 1]), this.colorAttr.push(e.geometry.getAttribute("color").array[l * 3 + 2]), this.elNumAttr.push(e.geometry.getAttribute("_elementnum").array[l]), this.selectedAttr.push(e.geometry.getAttribute("selected").array[l]), this.stateAttr.push(e.geometry.getAttribute("state_1").array[l]);
    const c = new B();
    e.getMatrixAt(l, c), this.matrixAttr.push(c);
  }
  fillAttributes(e, l = 0) {
    const c = e.geometry;
    c.setAttribute("color", new Hl(new Float32Array(this.colorAttr), 3)), c.setAttribute("_elementnum", new Hl(new Float32Array(this.elNumAttr), 1)), c.setAttribute("state_1", new Hl(new Float32Array(this.stateAttr), 1)), c.setAttribute("selected", new Hl(new Float32Array(this.selectedAttr), 1)), c.getAttribute("color").needsUpdate = !0, c.getAttribute("_elementnum").needsUpdate = !0, c.getAttribute("state_1").needsUpdate = !0, c.getAttribute("selected").needsUpdate = !0;
    for (let t = 0; t < this.elNumAttr.length; t++)
      e.setMatrixAt(t, this.matrixAttr[t]);
    e.instanceMatrix.needsUpdate = !0;
  }
  concat(e) {
    const l = new gc();
    return l.colorAttr = this.colorAttr.concat(e.colorAttr), l.elNumAttr = this.elNumAttr.concat(e.elNumAttr), l.selectedAttr = this.selectedAttr.concat(e.selectedAttr), l.stateAttr = this.stateAttr.concat(e.stateAttr), l.matrixAttr = this.matrixAttr.concat(e.matrixAttr), l;
  }
  getSize() {
    return this.elNumAttr.length;
  }
}
class Cn {
  constructor(e) {
    Z(this, "sceneManager");
    this.sceneManager = e;
  }
  optimizeInstancesVisibility(e) {
    const l = e.geometry, c = new gc(), t = new gc(), d = l.getAttribute("_elementnum").array;
    l.getAttribute("state_1").array;
    for (let i = 0; i < d.length; i++) {
      const a = this.sceneManager.elementDatas.get(d[i]);
      let o = !(a != null && a.isHidden);
      o && (o = this.sceneManager.clippingTools.isSharedMeshVisible(a)), o ? c.add(e, i) : t.add(e, i);
    }
    c.concat(t).fillAttributes(e), e.count = c.getSize();
  }
  optimizeSharedVisibility(e, l) {
    const c = this.sceneManager.originalIndices.get(e.uuid), t = [], d = /* @__PURE__ */ new Map(), s = e.getAttribute("_elementnum").array, i = e.getAttribute("state_1").array, a = l ? 2 : 3;
    for (let o = 0; o < c.length; o = o + a) {
      let b = !0;
      const m = c[o], X = this.sceneManager.elementDatas.get(s[m]);
      d.has(s[m]) ? b = d.get(s[m]) : X ? (b = !X.isHidden, b && (b = i[m] != Hc.Hidden), b && (b = this.sceneManager.clippingTools.isSharedMeshVisible(X)), d.set(s[m], b)) : b = !1, b && (t.push(c[o]), t.push(c[o + 1]), l || t.push(c[o + 2]));
    }
    e.setIndex(new tl(new Uint32Array(t), 1));
  }
}
const es = new ys({
  color: 3355443
});
es.flatShading = !0;
class Sn {
  constructor(e) {
    Z(this, "origin");
    Z(this, "plane");
    Z(this, "material");
    Z(this, "isActive", !0);
    this.plane = e, this.material = es.clone(), this.material.flatShading = !0, this.update();
  }
  update() {
    this.origin = this.plane.normal.clone().negate().multiplyScalar(this.plane.constant);
  }
}
class Kn {
  constructor(e) {
    Z(this, "capsColor", "#cccccc");
    Z(this, "sceneManager");
    Z(this, "planes", /* @__PURE__ */ new Map());
    Z(this, "planeSize", 10);
    Z(this, "scene", new ut());
    Z(this, "planesGroup", new Xl());
    Z(this, "backMat", new Nl({
      colorWrite: !1,
      depthWrite: !1,
      side: bt
    }));
    Z(this, "frontMat", new Nl({
      colorWrite: !1,
      depthWrite: !1,
      side: Ve
    }));
    this.sceneManager = e, this.scene.add(this.planesGroup), this.initLights();
  }
  initLights() {
    const e = new Td(3355459, 0, 4);
    e.groundColor.setHSL(0.095, 1, 0.95), e.position.set(0, 0, 0);
    const l = new Be(15794158, 0.7);
    l.position.set(-0.5, 1.75, 1), l.shadow.mapSize.width = 1024, l.shadow.mapSize.height = 1024;
    const c = 10;
    l.shadow.camera.left = -c, l.shadow.camera.right = c, l.shadow.camera.top = c, l.shadow.camera.bottom = -c, l.shadow.camera.far = 1e3;
    const t = new Be(16777215, 1);
    t.color.setHSL(0.3, 1, 1), t.position.set(0.5, 1.75, -1), this.scene.children.push(e), this.scene.children.push(l), this.scene.children.push(t);
  }
  setPlanes(e, l = !1) {
    l && this.planes.clear(), e.forEach((c, t) => {
      this.planes.has(t) ? (this.planes.get(t).plane = c, this.planes.get(t).update()) : this.planes.set(t, new Sn(c));
    }), this.updateMaterials(), this.sceneManager.tools.optimizeAllElementsVisibility();
  }
  updateMaterials() {
    const e = this.getPlanes(), l = this.getActivePlanes();
    for (const c of this.sceneManager.materials.keys()) {
      const t = this.sceneManager.materials.get(c);
      t.clippingPlanes = e;
    }
    this.planes.forEach((c, t) => {
      c.material.clippingPlanes = this.getPlanesExceptKey(t), c.material.color = new v(this.capsColor);
    }), this.frontMat.clippingPlanes = l, this.backMat.clippingPlanes = l;
  }
  deletePlanes(e) {
    e.forEach((l) => {
      this.planes.has(l) && this.planes.delete(l);
    }), this.updateMaterials(), this.sceneManager.tools.optimizeAllElementsVisibility();
  }
  getPlanes() {
    return Array.from(this.planes.values()).map((e) => e.plane);
  }
  getActivePlanes() {
    return Array.from(this.planes.values()).filter((e, l) => e.isActive).map((e) => e.plane);
  }
  updatePlanes(e) {
    this.planesGroup.clear();
    const l = e.getCenter(new R());
    this.planes.forEach((c, t) => {
      const d = new Ws(this.planeSize, this.planeSize);
      d.lookAt(c.plane.normal.clone().negate());
      const s = c.origin, a = c.plane.projectPoint(l, new R()).sub(s);
      d.translate(s.x, s.y, s.z), d.translate(a.x, a.y, a.z), d.computeVertexNormals(), this.planesGroup.add(new w(d, c.material));
    });
  }
  isInstanceMeshVisible(e, l) {
    var i;
    const c = e.geometry, t = new B();
    e.getMatrixAt(l, t), c.boundingSphere || c.computeBoundingSphere();
    const d = (i = c.boundingSphere) == null ? void 0 : i.clone(), s = d.radius * 2;
    d.applyMatrix4(t);
    for (const a of this.planes)
      if (a[1].plane.distanceToSphere(d) < -s)
        return !1;
    return !0;
  }
  isSharedMeshVisible(e) {
    if (e.bbox = new U(e.bbox.min, e.bbox.max), e.bSphere || (e.bSphere = e.bbox.getBoundingSphere(new Jl())), e.bSphere) {
      const l = e.bSphere.radius * 2;
      for (const c of this.planes)
        if (c[1].plane.distanceToSphere(e.bSphere) < -l)
          return !1;
    }
    return !0;
  }
  updatePlanesStatus(e) {
    for (const [l, c] of this.planes) {
      const t = c.plane.normal.clone().negate().multiplyScalar(c.plane.constant), d = e.position.clone().sub(t);
      c.isActive = c.plane.normal.dot(d) < 0;
    }
    this.updateMaterials();
  }
  getPlanesExceptKey(e) {
    const l = new Array();
    return this.planes.forEach((c, t) => {
      t != e && l.push(c.plane);
    }), l;
  }
  render(e, l, c = !0) {
    if (this.sceneManager.clippingTools.getPlanes().length > 0) {
      this.sceneManager.groupFantoms.visible = !1, this.sceneManager.clippingTools.updatePlanesStatus(l), this.sceneManager.clippingTools.updatePlanes(this.sceneManager.sceneBox), e.autoClearStencil = !1;
      const t = e.getContext(), d = e.state;
      e.state.buffers.stencil.setTest(!0), d.buffers.stencil.setLocked(!0), d.buffers.stencil.setClear(0), e.clearStencil(), e.autoClear = !1, d.buffers.stencil.setFunc(t.ALWAYS, 1, 255), d.buffers.stencil.setOp(t.KEEP, t.KEEP, t.INCR), this.sceneManager.scene.overrideMaterial = this.sceneManager.clippingTools.backMat, e.render(this.sceneManager.scene, l), d.buffers.stencil.setFunc(t.ALWAYS, 1, 255), d.buffers.stencil.setOp(t.KEEP, t.KEEP, t.DECR), this.sceneManager.scene.overrideMaterial = this.sceneManager.clippingTools.frontMat, e.render(this.sceneManager.scene, l), e.state.buffers.stencil.setFunc(t.EQUAL, 1, 255), e.state.buffers.stencil.setOp(t.KEEP, t.KEEP, t.KEEP), e.render(this.sceneManager.clippingTools.scene, l), c && (e.state.buffers.stencil.setFunc(t.EQUAL, 2, 255), e.state.buffers.stencil.setOp(t.KEEP, t.KEEP, t.KEEP), e.render(this.sceneManager.clippingTools.scene, l)), e.state.buffers.stencil.setTest(!1), d.buffers.stencil.setLocked(!1), e.clearStencil(), this.sceneManager.scene.overrideMaterial = null, this.sceneManager.groupFantoms.visible = !0;
    }
  }
  updatePlaneSizes(e) {
    let c = e.getBoundingSphere(new Jl()).radius * 2.2 + 5;
    this.planeSize = c;
  }
}
class La extends EventTarget {
  constructor(l = "https://api.st.tangl.cloud") {
    super();
    Z(this, "tools");
    Z(this, "clippingTools");
    Z(this, "meshTools");
    Z(this, "scene", new ut());
    Z(this, "modelIds", /* @__PURE__ */ new Set());
    Z(this, "group", new Xl());
    Z(this, "groupLines", new Xl());
    Z(this, "groupFantoms", new Xl());
    Z(this, "groupTrans", new Xl());
    Z(this, "materials", /* @__PURE__ */ new Map());
    Z(this, "originalIndices", /* @__PURE__ */ new Map());
    Z(this, "originalMatrices", /* @__PURE__ */ new Map());
    Z(this, "elementDatas", /* @__PURE__ */ new Map());
    Z(this, "selBox", new U());
    Z(this, "sceneBox", new U());
    Z(this, "isProgressive", !0);
    Z(this, "selElNums", new Array());
    Z(this, "isNavigationStarted", !1);
    Z(this, "loadProgress", 0);
    Z(this, "loadProgressShow", !1);
    Z(this, "origin", new R());
    Z(this, "isNoData", !1);
    Z(this, "totalDegradedChilds", 0);
    Z(this, "globalOrigin", new R());
    Z(this, "clock", new Xt());
    Z(this, "deltaMed", 0);
    Z(this, "maxDegradeSharedLength", 0);
    Z(this, "maxDegradeInstancesLength", 0);
    Z(this, "server");
    Z(this, "progressCallback");
    Z(this, "loadedCallback");
    Z(this, "allLoadedCallback");
    this.tools = new Yn(this), this.clippingTools = new Kn(this), this.meshTools = new Cn(this), this.server = l, this.scene.name = "main", this.groupTrans.name = "groupTrans", this.groupFantoms.name = "groupFantoms", this.groupLines.name = "groupLines", this.group.name = "groupMain";
    const c = new Xl();
    c.name = "main", this.scene.add(c), c.add(this.group), c.add(this.groupLines), this.scene.add(this.groupTrans), this.scene.add(this.groupFantoms), this.initLights();
  }
  initLights() {
    const l = new Td(3355459, 0, 4);
    l.groundColor.setHSL(0.095, 1, 0.95), l.position.set(0, 0, 0);
    const c = new Be(15794158, 0.7);
    c.position.set(-0.5, 1.75, 1), c.shadow.mapSize.width = 1024, c.shadow.mapSize.height = 1024;
    const t = 10;
    c.shadow.camera.left = -t, c.shadow.camera.right = t, c.shadow.camera.top = t, c.shadow.camera.bottom = -t, c.shadow.camera.far = 1e3;
    const d = new Be(16777215, 1);
    d.color.setHSL(0.3, 1, 1), d.position.set(0.5, 1.75, -1), this.scene.children.push(l), this.scene.children.push(c), this.scene.children.push(d);
  }
  getGlobalOrigin() {
    return this.globalOrigin;
  }
  getSceneChldren(l = !0, c = !0, t = !0) {
    let d = new Array();
    return l && (d = d.concat(this.group.children)), c && (d = d.concat(this.groupTrans.children)), t && (d = d.concat(this.groupLines.children)), d;
  }
  onProgress(l) {
    return this.progressCallback = l, this;
  }
  onLoaded(l) {
    return this.loadedCallback = l, this;
  }
  onAllLoaded(l) {
    return this.allLoadedCallback = l, this;
  }
  addModelData(l, c, t) {
    var a, o;
    console.info("Final geometry processing");
    const d = new U();
    l.forEach((b, m) => {
      this.elementDatas.set(m, b);
    });
    const s = [...c.values()];
    this.globalOrigin = s[0].nOrigin;
    for (let b of c.keys()) {
      let m = c.get(b);
      d.union(m.box);
      const X = new de();
      X.setAttribute("position", new tl(m.verts, 3)), X.setAttribute("color", new tl(new Float32Array(m.verts.length).fill(1), 3)), X.setAttribute("_elementnum", new tl(m.elNums, 1)), X.setAttribute("selected", new tl(new Float32Array(m.elNums.length), 1)), X.setAttribute("state_1", new tl(new Float32Array(m.elNums.length), 1)), X.setIndex(new tl(m.index, 1)), X.computeVertexNormals();
      const G = X.getIndex();
      G && this.originalIndices.set(X.uuid, G.array);
      let h, u;
      this.materials.has(m.matName) ? u = this.materials.get(m.matName) : (u = new il({
        name: m.matName,
        opacity: m.opacity,
        lights: !0,
        clipping: !0,
        side: xc,
        transparent: m.transparent,
        vertexColors: !0,
        uniforms: rn([
          md.common,
          md.lights,
          {
            diffuse: { value: new v(m.color) },
            emissive: { value: new v(0) },
            specular: { value: new v(1118481) },
            opacity: { value: m.opacity },
            shininess: { value: 30 },
            time: { value: 1 }
          }
        ]),
        vertexShader: Ln,
        fragmentShader: Rn
      }), u.flatShading = !0, this.materials.set(m.matName, u)), m.type == "mesh" ? (h = new w(X, u), h.name = m.matName, u.name == "RoomMaterial" ? this.groupFantoms.add(h) : u.opacity < 1 ? this.groupTrans.add(h) : this.group.add(h)) : m.type == "line" && (this.materials.set(u.name, u), h = new al(X, u), h.name = m.matName, this.groupLines.add(h));
    }
    let i = 0;
    console.info("Instance geometry processing");
    for (let b of t.keys()) {
      const m = t.get(b);
      let X = new de();
      X.setAttribute("position", new se(m.verts, 3)), X.setAttribute("color", new Hl(new Float32Array(m.instances.length * 3).fill(1), 3)), X.setAttribute("selected", new Hl(new Float32Array(m.instances.length), 1)), X.setAttribute("state_1", new Hl(new Float32Array(m.instances.length), 1)), X.setIndex(new tl(m.index, 1)), X.computeVertexNormals(), X.computeBoundingBox();
      let G = null;
      if (this.materials.has(m.matName) && (G = this.materials.get(m.matName)), !!G) {
        if (m.type == "mesh") {
          const h = new Pl(X, G, m.instances.length);
          this.originalMatrices.has(X.uuid) || this.originalMatrices.set(X.uuid, []);
          const u = new Float32Array(m.instances.length);
          for (let p in m.instances) {
            const W = Number.parseInt(p), V = new B().fromArray(m.instances[p].matrix.elements);
            h.setMatrixAt(W, V), (a = this.originalMatrices.get(X.uuid)) == null || a.push(V), u[p] = m.instances[p].elNum;
            const r = (o = X.boundingBox) == null ? void 0 : o.clone();
            r && (r.applyMatrix4(V), d.union(r));
          }
          const y = new Hl(u, 1);
          X.setAttribute("_elementnum", y), G.opacity < 1 ? this.groupTrans.add(h) : this.group.add(h);
        } else if (m.type == "line") {
          const h = new al(X, G);
          this.groupLines.add(h);
        }
        console.log("number of dedicated instances: " + m.instances.length), i++;
      }
    }
    console.log("total number of dedicated instance geoms: " + i), console.log("total buffers for merging: " + c.size), this.postGeometryLoaded(d);
  }
  load(l) {
    console.log("Start scene loading..."), typeof l == "string" && (l = l.split(","));
    const c = [];
    for (const d of l)
      this.modelIds.has(d) || (this.modelIds.add(d), c.push(d));
    if (!c.length) {
      this.allLoadedCallback && this.allLoadedCallback(), this.dispatchEvent(new Event(el.AllLoaded));
      return;
    }
    const t = new In();
    this.loadProgressShow = !0, t.onmessage = (d) => {
      if (d.data.type == "onProgress" && (this.loadProgress = d.data.progress, this.progressCallback && this.progressCallback(this.loadProgress), this.dispatchEvent(new Qc(this.loadProgress))), d.data.type == "onNotFound" && (console.log(d.data.msg + ": " + d.data.err), this.checkAllLoaded(d, t)), d.data.type == "onError")
        console.error(d.data.msg + ": " + d.data.err), this.checkAllLoaded(d, t);
      else if (d.data.type == "onLoaded") {
        console.info("Final geometry processing");
        const s = d.data.elementDatas;
        this.addModelData(s, d.data.sharedGeoms, d.data.instanceGeoms), this.loadedCallback && this.loadedCallback(d.data.id), this.checkAllLoaded(d, t);
      }
    }, t.postMessage({
      type: "fetchset",
      guids: c.join(),
      origin: { x: this.origin.x, y: this.origin.y, z: this.origin.z },
      server: this.server
    });
  }
  checkAllLoaded(l, c) {
    if (l.data.loadedGeomFiles == l.data.geomFileTotal) {
      if (!this.selBox) {
        this.isNoData = !0, c.terminate(), this.allLoadedCallback && this.allLoadedCallback(), this.loadProgress = 0, this.dispatchEvent(new Qc(this.loadProgress)), this.dispatchEvent(new Event(el.AllLoaded));
        return;
      }
      this.sceneBox = this.selBox.clone(), this.clippingTools.updatePlaneSizes(this.sceneBox), console.log("done: all"), this.loadProgress = 100, this.loadProgressShow = !1, this.allLoadedCallback && (this.scene.autoUpdate = !1, this.allLoadedCallback(), this.dispatchEvent(new Event(el.AllLoaded))), this.loadProgress = 0, this.dispatchEvent(new Qc(this.loadProgress));
    }
  }
  postGeometryLoaded(l = new U()) {
    this.selBox.union(l);
  }
  degradeScene() {
    this.deltaMed = this.clock.getDelta();
    const l = this.deltaMed > 0.05;
    if (this.isProgressive && this.isNavigationStarted && l) {
      this.maxDegradeSharedLength = 0, this.maxDegradeInstancesLength = 0;
      let c, t = 3;
      for (let d = 0; d < t; d++)
        this.scene.traverse((s) => {
          if (s.visible)
            if (s instanceof Pl) {
              const i = s.count;
              i > 100 && (s.visible = !1, this.maxDegradeInstancesLength = i, this.totalDegradedChilds++);
            } else if (s instanceof w) {
              const a = s.geometry.getIndex().array.length;
              a > this.maxDegradeSharedLength && a > 6e4 && (c = s, this.maxDegradeSharedLength = a);
            } else
              s instanceof al && (s.visible = !1, this.totalDegradedChilds++);
        }), c && (c.visible = !1, this.totalDegradedChilds++);
    }
  }
  undegradeScene() {
    !this.isProgressive || (this.isNavigationStarted = !1, this.totalDegradedChilds = 0, this.scene.traverse((l) => {
      (l instanceof w || l instanceof Pl || l instanceof al) && (l.visible = !0);
    }));
  }
  updateSelection(l = [], c = !1, t = !0) {
    console.log("UpdateSelection", l);
    let d;
    for (d in l)
      if (this.elementDatas.has(l[d])) {
        const b = this.elementDatas.get(l[d]);
        b.subEls.length > 0 && (l = l.concat(b.subEls));
      }
    c ? this.selElNums = this.selElNums.concat(l) : this.selElNums = l;
    const s = new R(), i = /* @__PURE__ */ new Set();
    for (d in l)
      i.add(l[d]);
    const a = this.selElNums[0] == -1 || this.selElNums.length == 0, o = [];
    this.scene.traverse((b) => {
      let m;
      if (b instanceof Pl) {
        if (b.geometry !== void 0 && !b.geometry.hasAttribute("visualize")) {
          const X = b.geometry, G = X.getAttribute("selected").array;
          for (c || G.fill(0), m = 0; m < b.count; m++) {
            const h = X.getAttribute("_elementnum").array[m];
            if (i.has(h)) {
              G[m] = 1;
              const u = new B();
              b.getMatrixAt(m, u);
              const y = X.boundingBox.clone().applyMatrix4(u);
              a || (o.push(y.min), o.push(y.max));
            }
          }
          X.setAttribute("selected", new Hl(G, 1));
        }
      } else if (b instanceof w || b instanceof al) {
        const X = b.geometry, G = X.getAttribute("_elementnum").array, h = X.getAttribute("selected").array, u = X.getAttribute("position").array, y = [];
        for (m = 0; m < G.length; m = m + 1) {
          c || (h[m] = 0);
          let p = !1;
          y[G[m]] != null ? p = y[G[m]] : (i.has(G[m]) && (p = !0), y[G[m]] = p), s.set(
            u[m * 3],
            u[m * 3 + 1],
            u[m * 3 + 2]
          ), p && (h[m] = 1, a || o.push(s.clone()));
        }
        X.setAttribute("selected", new tl(h, 1));
      }
    }), a ? this.selBox.copy(this.sceneBox) : this.selBox = new U().setFromPoints(o), t && this.dispatchEvent(new gn(l, c));
  }
  traverseElementsWithValues(l, c, t, d, s, i, a, o = void 0) {
    let b = 0;
    const m = new B(), X = /* @__PURE__ */ new Map(), G = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Map();
    let u;
    c instanceof Array && c.length == 0 && (c = !1);
    const y = c instanceof Array, p = l.length == 0;
    for (let W in l) {
      const V = l[W];
      G.add(V), h.set(V, y ? c[W] : c);
    }
    this.scene.traverse((W) => {
      let V, r;
      if (W instanceof Pl) {
        const I = W.geometry;
        for (a && a(W, b), r = 0; r < I.getAttribute("_elementnum").array.length; r++) {
          V = !1, u = void 0;
          const g = I.getAttribute("_elementnum").array[r];
          if (W.getMatrixAt(r, m), p)
            u = y ? c[0] : c, V = !0;
          else {
            const L = g;
            h.has(L) && (V = !0, u = y ? h.get(L) : c);
          }
          !V || i && i(W, b, g, m, r, u);
        }
        o && o(W, b);
      } else if (W instanceof w || W instanceof al) {
        const I = W instanceof w, g = W.geometry;
        s && s(g, b, I);
        const L = g.getAttribute("_elementnum").array;
        for (r = 0; r < L.length; r = r + 1) {
          if (V = !1, u = void 0, p)
            u = y ? c[0] : c, V = !0;
          else if (X.has(L[r]))
            u = y ? X.get(L[r]) : c, V = !0;
          else {
            const Y = L[r];
            h.has(Y) && (V = !0, X.set(L[r], h.get(Y)), u = y ? X.get(L[r]) : c);
          }
          V != !1 && t(g, L[r], r, u);
        }
        d(g, I);
      }
      b += 1;
    });
  }
  traverseElements2(l, c, t, d, s, i = void 0) {
    let a = 0;
    const o = new Set(l), b = new B();
    this.scene.traverse((m) => {
      let X, G, h;
      if (m instanceof Pl) {
        G = m.geometry;
        let u = !1;
        for (h = 0; h < G.getAttribute("_elementnum").array.length; h++) {
          const y = G.getAttribute("_elementnum").array[h];
          X = y, o.has(X) && (u = !0, m.getMatrixAt(h, b), s && u && s(m, a, y, b, h));
        }
        i && i(m, a);
      } else if (m instanceof w || m instanceof al) {
        const u = m instanceof w;
        let y = !1;
        G = m.geometry, d && d(G, a, u);
        const p = G.getAttribute("_elementnum").array;
        for (h = 0; h < p.length; h = h + 1)
          X = p[h], o.has(X) && (y = !0, c(G, p[h], h));
        t && y && t(G, u);
      }
      a += 1;
    });
  }
  traverseAllElements(l, c, t, d) {
    let s = 0;
    const i = new B();
    this.scene.traverse((a) => {
      let o, b;
      if (a instanceof Pl)
        for (b = a.geometry, o = 0; o < b.getAttribute("_elementnum").array.length; o++) {
          const m = b.getAttribute("_elementnum").array[o];
          a.getMatrixAt(o, i), d && d(a, s, m, i, o);
        }
      else if (a instanceof w || a instanceof al) {
        const m = a instanceof w;
        b = a.geometry, t && t(b, s, m);
        const X = b.getAttribute("_elementnum").array;
        for (o = 0; o < X.length; o = o + 1)
          l(b, X[o], o);
        c(b, m);
      }
      s += 1;
    });
  }
}
class Al {
  constructor() {
    Z(this, "verts", new Float32Array(0));
    Z(this, "elNums", new Float32Array(0));
    Z(this, "index", new Uint32Array(0));
    Z(this, "geomFileNumber", 0);
    Z(this, "box", new U());
  }
  static getGeomElNumber(e, l) {
    return (e + 1) * 1e6 + l;
  }
  static getGeomNumber(e) {
    return Math.floor(e / 1e6) - 1;
  }
}
class Xd extends Al {
  constructor(l, c, t, d, s) {
    super();
    Z(this, "origin");
    Z(this, "nOrigin");
    Z(this, "type", "mesh");
    Z(this, "geomFileTotal");
    Z(this, "opacity");
    Z(this, "color");
    Z(this, "matName");
    Z(this, "instances", []);
    Z(this, "transparent", !0);
    this.origin = s, this.nOrigin = new R().copy(this.origin).negate();
    const i = l.name == "" ? l.uuid : l.name;
    let a = "mesh";
    c instanceof N.LineSegments && (a = "line", l.opacity = 1, l.transparent = !1), this.type = a, this.opacity = l.opacity, this.color = l.color, this.matName = i, this.geomFileNumber = t, this.geomFileTotal = d;
  }
  processSharedGeometry(l, c, t) {
    var m;
    const d = l.geometry, s = d.getAttribute("position"), i = d.getAttribute("_elementnum"), a = new Float32Array(s.count), o = new Float32Array(s.count * 3);
    this.origin.length() == 0 && s.array.length > 0 && (this.origin.set(s.array[0], s.array[1], s.array[2]), this.nOrigin = new R().copy(this.origin).negate());
    for (let X = 0; X < a.length; X = X + 1) {
      const G = Al.getGeomElNumber(c, i.array[X]);
      a[X] = G, o[X * 3] = s.array[X * 3] - this.origin.x, o[X * 3 + 1] = s.array[X * 3 + 1] - this.origin.y, o[X * 3 + 2] = s.array[X * 3 + 2] - this.origin.z;
    }
    let b = "mesh";
    l instanceof N.LineSegments && (b = "line", this.opacity = 1, this.transparent = !1), this.verts = o, this.geomFileNumber = c, this.elNums = a, this.index = (m = d.index) == null ? void 0 : m.array, this.type = b, d.boundingBox && (this.box = d.boundingBox.translate(this.nOrigin)), this.geomFileTotal = t;
  }
}
class xn extends Al {
  constructor(l) {
    super();
    Z(this, "origin", new R());
    Z(this, "type", "");
    Z(this, "box", new U());
    Z(this, "opacity", 0);
    Z(this, "color", new v());
    Z(this, "matName", "");
    Z(this, "instances", new Array());
    this.geomFileNumber = l;
  }
  processGeometry(l, c) {
    var m;
    const t = l.geometry, d = l.material, s = d.name == "" ? d.uuid : d.name;
    let i;
    d.name == "" ? i = c.find((X) => X.uuid === (d == null ? void 0 : d.uuid)) : i = c.find((X) => X.name === (d == null ? void 0 : d.name));
    const a = i || l.material, o = t.getAttribute("position");
    let b = "mesh";
    l instanceof N.LineSegments && (b = "line", a.opacity = 1, a.transparent = !1), this.verts = o.array, this.index = (m = t.index) == null ? void 0 : m.array, this.opacity = a.opacity, this.color = a.color, this.matName = s, this.type = b, t.boundingBox && (this.box = t.boundingBox);
  }
}
class dc {
  constructor() {
    Z(this, "isLoaded", !1);
    Z(this, "bbox", new U());
    Z(this, "isHidden", !1);
    Z(this, "bSphere");
    Z(this, "subEls", []);
    Z(this, "indeces", /* @__PURE__ */ new Map());
  }
}
class Hn extends rs {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(l) {
      return new Mn(l);
    }), this.register(function(l) {
      return new Tn(l);
    }), this.register(function(l) {
      return new kn(l);
    }), this.register(function(l) {
      return new Fn(l);
    }), this.register(function(l) {
      return new Nn(l);
    }), this.register(function(l) {
      return new vn(l);
    });
  }
  load(e, l, c, t) {
    const d = this;
    let s;
    this.resourcePath !== "" ? s = this.resourcePath : this.path !== "" ? s = this.path : s = ke.extractUrlBase(e), this.manager.itemStart(e);
    const i = function(o) {
      t ? t(o) : console.error(o), d.manager.itemError(e), d.manager.itemEnd(e);
    }, a = new kd(this.manager);
    a.setPath(this.path), a.setResponseType("arraybuffer"), a.setRequestHeader(this.requestHeader), a.setWithCredentials(this.withCredentials), a.load(e, function(o) {
      try {
        d.parse(o, s, function(b) {
          l(b), d.manager.itemEnd(e);
        }, i);
      } catch (b) {
        i(b);
      }
    }, c, i);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setDDSLoader() {
    throw new Error(
      'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
    );
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, l, c, t) {
    let d;
    const s = {}, i = {};
    if (typeof e == "string")
      d = e;
    else if (ke.decodeText(new Uint8Array(e, 0, 4)) === cs) {
      try {
        s[F.KHR_BINARY_GLTF] = new fn(e);
      } catch (m) {
        t && t(m);
        return;
      }
      d = s[F.KHR_BINARY_GLTF].content;
    } else
      d = ke.decodeText(new Uint8Array(e));
    const a = JSON.parse(d);
    if (a.asset === void 0 || a.asset.version[0] < 2) {
      t && t(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const o = new On(a, {
      path: l || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    o.fileLoader.setRequestHeader(this.requestHeader);
    for (let b = 0; b < this.pluginCallbacks.length; b++) {
      const m = this.pluginCallbacks[b](o);
      i[m.name] = m, s[m.name] = !0;
    }
    if (a.extensionsUsed)
      for (let b = 0; b < a.extensionsUsed.length; ++b) {
        const m = a.extensionsUsed[b], X = a.extensionsRequired || [];
        switch (m) {
          case F.KHR_MATERIALS_UNLIT:
            s[m] = new Jn();
            break;
          case F.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
            s[m] = new Un();
            break;
          case F.KHR_TEXTURE_TRANSFORM:
            s[m] = new Bn();
            break;
          case F.KHR_MESH_QUANTIZATION:
            s[m] = new wn();
            break;
          default:
            X.indexOf(m) >= 0 && i[m] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + m + '".');
        }
      }
    o.setExtensions(s), o.setPlugins(i), o.parse(c, t);
  }
}
function zn() {
  let n = {};
  return {
    get: function(e) {
      return n[e];
    },
    add: function(e, l) {
      n[e] = l;
    },
    remove: function(e) {
      delete n[e];
    },
    removeAll: function() {
      n = {};
    }
  };
}
const F = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression"
};
class Nn {
  constructor(e) {
    this.parser = e, this.name = F.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, l = this.parser.json.nodes || [];
    for (let c = 0, t = l.length; c < t; c++) {
      const d = l[c];
      d.extensions && d.extensions[this.name] && d.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, d.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const l = this.parser, c = "light:" + e;
    let t = l.cache.get(c);
    if (t)
      return t;
    const d = l.json, a = ((d.extensions && d.extensions[this.name] || {}).lights || [])[e];
    let o;
    const b = new v(16777215);
    a.color !== void 0 && b.fromArray(a.color);
    const m = a.range !== void 0 ? a.range : 0;
    switch (a.type) {
      case "directional":
        o = new Be(b), o.target.position.set(0, 0, -1), o.add(o.target);
        break;
      case "point":
        o = new Rs(b), o.distance = m;
        break;
      case "spot":
        o = new Ls(b), o.distance = m, a.spot = a.spot || {}, a.spot.innerConeAngle = a.spot.innerConeAngle !== void 0 ? a.spot.innerConeAngle : 0, a.spot.outerConeAngle = a.spot.outerConeAngle !== void 0 ? a.spot.outerConeAngle : Math.PI / 4, o.angle = a.spot.outerConeAngle, o.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle, o.target.position.set(0, 0, -1), o.add(o.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
    }
    return o.position.set(0, 0, 0), o.decay = 2, a.intensity !== void 0 && (o.intensity = a.intensity), o.name = l.createUniqueName(a.name || "light_" + e), t = Promise.resolve(o), l.cache.add(c, t), t;
  }
  createNodeAttachment(e) {
    const l = this, c = this.parser, d = c.json.nodes[e], i = (d.extensions && d.extensions[this.name] || {}).light;
    return i === void 0 ? null : this._loadLight(i).then(function(a) {
      return c._getNodeRef(l.cache, i, a);
    });
  }
}
class Jn {
  constructor() {
    this.name = F.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return Nl;
  }
  extendParams(e, l, c) {
    const t = [];
    e.color = new v(1, 1, 1), e.opacity = 1;
    const d = l.pbrMetallicRoughness;
    if (d) {
      if (Array.isArray(d.baseColorFactor)) {
        const s = d.baseColorFactor;
        e.color.fromArray(s), e.opacity = s[3];
      }
      d.baseColorTexture !== void 0 && t.push(c.assignTexture(e, "map", d.baseColorTexture));
    }
    return Promise.all(t);
  }
}
class Mn {
  constructor(e) {
    this.parser = e, this.name = F.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const c = this.parser.json.materials[e];
    return !c.extensions || !c.extensions[this.name] ? null : vd;
  }
  extendMaterialParams(e, l) {
    const c = this.parser, t = c.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const d = [], s = t.extensions[this.name];
    if (s.clearcoatFactor !== void 0 && (l.clearcoat = s.clearcoatFactor), s.clearcoatTexture !== void 0 && d.push(c.assignTexture(l, "clearcoatMap", s.clearcoatTexture)), s.clearcoatRoughnessFactor !== void 0 && (l.clearcoatRoughness = s.clearcoatRoughnessFactor), s.clearcoatRoughnessTexture !== void 0 && d.push(c.assignTexture(l, "clearcoatRoughnessMap", s.clearcoatRoughnessTexture)), s.clearcoatNormalTexture !== void 0 && (d.push(c.assignTexture(l, "clearcoatNormalMap", s.clearcoatNormalTexture)), s.clearcoatNormalTexture.scale !== void 0)) {
      const i = s.clearcoatNormalTexture.scale;
      l.clearcoatNormalScale = new T(i, -i);
    }
    return Promise.all(d);
  }
}
class Fn {
  constructor(e) {
    this.parser = e, this.name = F.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const c = this.parser.json.materials[e];
    return !c.extensions || !c.extensions[this.name] ? null : vd;
  }
  extendMaterialParams(e, l) {
    const c = this.parser, t = c.json.materials[e];
    if (!t.extensions || !t.extensions[this.name])
      return Promise.resolve();
    const d = [], s = t.extensions[this.name];
    return s.transmissionFactor !== void 0 && (l.transmission = s.transmissionFactor), s.transmissionTexture !== void 0 && d.push(c.assignTexture(l, "transmissionMap", s.transmissionTexture)), Promise.all(d);
  }
}
class Tn {
  constructor(e) {
    this.parser = e, this.name = F.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const l = this.parser, c = l.json, t = c.textures[e];
    if (!t.extensions || !t.extensions[this.name])
      return null;
    const d = t.extensions[this.name], s = c.images[d.source], i = l.options.ktx2Loader;
    if (!i) {
      if (c.extensionsRequired && c.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return l.loadTextureImage(e, s, i);
  }
}
class kn {
  constructor(e) {
    this.parser = e, this.name = F.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const l = this.name, c = this.parser, t = c.json, d = t.textures[e];
    if (!d.extensions || !d.extensions[l])
      return null;
    const s = d.extensions[l], i = t.images[s.source];
    let a = c.textureLoader;
    if (i.uri) {
      const o = c.options.manager.getHandler(i.uri);
      o !== null && (a = o);
    }
    return this.detectSupport().then(function(o) {
      if (o)
        return c.loadTextureImage(e, i, a);
      if (t.extensionsRequired && t.extensionsRequired.indexOf(l) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return c.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const l = new Image();
      l.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", l.onload = l.onerror = function() {
        e(l.height === 1);
      };
    })), this.isSupported;
  }
}
class vn {
  constructor(e) {
    this.name = F.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const l = this.parser.json, c = l.bufferViews[e];
    if (c.extensions && c.extensions[this.name]) {
      const t = c.extensions[this.name], d = this.parser.getDependency("buffer", t.buffer), s = this.parser.options.meshoptDecoder;
      if (!s || !s.supported) {
        if (l.extensionsRequired && l.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return Promise.all([d, s.ready]).then(function(i) {
        const a = t.byteOffset || 0, o = t.byteLength || 0, b = t.count, m = t.byteStride, X = new ArrayBuffer(b * m), G = new Uint8Array(i[0], a, o);
        return s.decodeGltfBuffer(new Uint8Array(X), b, m, G, t.mode, t.filter), X;
      });
    } else
      return null;
  }
}
const cs = "glTF", He = 12, Gd = { JSON: 1313821514, BIN: 5130562 };
class fn {
  constructor(e) {
    this.name = F.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const l = new DataView(e, 0, He);
    if (this.header = {
      magic: ke.decodeText(new Uint8Array(e.slice(0, 4))),
      version: l.getUint32(4, !0),
      length: l.getUint32(8, !0)
    }, this.header.magic !== cs)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const c = this.header.length - He, t = new DataView(e, He);
    let d = 0;
    for (; d < c; ) {
      const s = t.getUint32(d, !0);
      d += 4;
      const i = t.getUint32(d, !0);
      if (d += 4, i === Gd.JSON) {
        const a = new Uint8Array(e, He + d, s);
        this.content = ke.decodeText(a);
      } else if (i === Gd.BIN) {
        const a = He + d;
        this.body = e.slice(a, a + s);
      }
      d += s;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Bn {
  constructor() {
    this.name = F.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, l) {
    return l.texCoord !== void 0 && console.warn('THREE.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.'), l.offset === void 0 && l.rotation === void 0 && l.scale === void 0 || (e = e.clone(), l.offset !== void 0 && e.offset.fromArray(l.offset), l.rotation !== void 0 && (e.rotation = l.rotation), l.scale !== void 0 && e.repeat.fromArray(l.scale), e.needsUpdate = !0), e;
  }
}
class nt extends ht {
  constructor(e) {
    super(), this.isGLTFSpecularGlossinessMaterial = !0;
    const l = [
      "#ifdef USE_SPECULARMAP",
      "	uniform sampler2D specularMap;",
      "#endif"
    ].join(`
`), c = [
      "#ifdef USE_GLOSSINESSMAP",
      "	uniform sampler2D glossinessMap;",
      "#endif"
    ].join(`
`), t = [
      "vec3 specularFactor = specular;",
      "#ifdef USE_SPECULARMAP",
      "	vec4 texelSpecular = texture2D( specularMap, vUv );",
      "	texelSpecular = sRGBToLinear( texelSpecular );",
      "	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture",
      "	specularFactor *= texelSpecular.rgb;",
      "#endif"
    ].join(`
`), d = [
      "float glossinessFactor = glossiness;",
      "#ifdef USE_GLOSSINESSMAP",
      "	vec4 texelGlossiness = texture2D( glossinessMap, vUv );",
      "	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture",
      "	glossinessFactor *= texelGlossiness.a;",
      "#endif"
    ].join(`
`), s = [
      "PhysicalMaterial material;",
      "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );",
      "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );",
      "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );",
      "material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.",
      "material.specularRoughness += geometryRoughness;",
      "material.specularRoughness = min( material.specularRoughness, 1.0 );",
      "material.specularColor = specularFactor;"
    ].join(`
`), i = {
      specular: { value: new v().setHex(16777215) },
      glossiness: { value: 1 },
      specularMap: { value: null },
      glossinessMap: { value: null }
    };
    this._extraUniforms = i, this.onBeforeCompile = function(a) {
      for (const o in i)
        a.uniforms[o] = i[o];
      a.fragmentShader = a.fragmentShader.replace("uniform float roughness;", "uniform vec3 specular;").replace("uniform float metalness;", "uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>", l).replace("#include <metalnessmap_pars_fragment>", c).replace("#include <roughnessmap_fragment>", t).replace("#include <metalnessmap_fragment>", d).replace("#include <lights_physical_fragment>", s);
    }, Object.defineProperties(this, {
      specular: {
        get: function() {
          return i.specular.value;
        },
        set: function(a) {
          i.specular.value = a;
        }
      },
      specularMap: {
        get: function() {
          return i.specularMap.value;
        },
        set: function(a) {
          i.specularMap.value = a, a ? this.defines.USE_SPECULARMAP = "" : delete this.defines.USE_SPECULARMAP;
        }
      },
      glossiness: {
        get: function() {
          return i.glossiness.value;
        },
        set: function(a) {
          i.glossiness.value = a;
        }
      },
      glossinessMap: {
        get: function() {
          return i.glossinessMap.value;
        },
        set: function(a) {
          i.glossinessMap.value = a, a ? (this.defines.USE_GLOSSINESSMAP = "", this.defines.USE_UV = "") : (delete this.defines.USE_GLOSSINESSMAP, delete this.defines.USE_UV);
        }
      }
    }), delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.specularMap = e.specularMap, this.specular.copy(e.specular), this.glossinessMap = e.glossinessMap, this.glossiness = e.glossiness, delete this.metalness, delete this.roughness, delete this.metalnessMap, delete this.roughnessMap, this;
  }
}
class Un {
  constructor() {
    this.name = F.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS, this.specularGlossinessParams = [
      "color",
      "map",
      "lightMap",
      "lightMapIntensity",
      "aoMap",
      "aoMapIntensity",
      "emissive",
      "emissiveIntensity",
      "emissiveMap",
      "bumpMap",
      "bumpScale",
      "normalMap",
      "normalMapType",
      "displacementMap",
      "displacementScale",
      "displacementBias",
      "specularMap",
      "specular",
      "glossinessMap",
      "glossiness",
      "alphaMap",
      "envMap",
      "envMapIntensity",
      "refractionRatio"
    ];
  }
  getMaterialType() {
    return nt;
  }
  extendParams(e, l, c) {
    const t = l.extensions[this.name];
    e.color = new v(1, 1, 1), e.opacity = 1;
    const d = [];
    if (Array.isArray(t.diffuseFactor)) {
      const s = t.diffuseFactor;
      e.color.fromArray(s), e.opacity = s[3];
    }
    if (t.diffuseTexture !== void 0 && d.push(c.assignTexture(e, "map", t.diffuseTexture)), e.emissive = new v(0, 0, 0), e.glossiness = t.glossinessFactor !== void 0 ? t.glossinessFactor : 1, e.specular = new v(1, 1, 1), Array.isArray(t.specularFactor) && e.specular.fromArray(t.specularFactor), t.specularGlossinessTexture !== void 0) {
      const s = t.specularGlossinessTexture;
      d.push(c.assignTexture(e, "glossinessMap", s)), d.push(c.assignTexture(e, "specularMap", s));
    }
    return Promise.all(d);
  }
  createMaterial(e) {
    const l = new nt(e);
    return l.fog = !0, l.color = e.color, l.map = e.map === void 0 ? null : e.map, l.lightMap = null, l.lightMapIntensity = 1, l.aoMap = e.aoMap === void 0 ? null : e.aoMap, l.aoMapIntensity = 1, l.emissive = e.emissive, l.emissiveIntensity = 1, l.emissiveMap = e.emissiveMap === void 0 ? null : e.emissiveMap, l.bumpMap = e.bumpMap === void 0 ? null : e.bumpMap, l.bumpScale = 1, l.normalMap = e.normalMap === void 0 ? null : e.normalMap, l.normalMapType = Is, e.normalScale && (l.normalScale = e.normalScale), l.displacementMap = null, l.displacementScale = 1, l.displacementBias = 0, l.specularMap = e.specularMap === void 0 ? null : e.specularMap, l.specular = e.specular, l.glossinessMap = e.glossinessMap === void 0 ? null : e.glossinessMap, l.glossiness = e.glossiness, l.alphaMap = null, l.envMap = e.envMap === void 0 ? null : e.envMap, l.envMapIntensity = 1, l.refractionRatio = 0.98, l;
  }
}
class wn {
  constructor() {
    this.name = F.KHR_MESH_QUANTIZATION;
  }
}
class Re extends Vs {
  constructor(e, l, c, t) {
    super(e, l, c, t);
  }
  copySampleValue_(e) {
    const l = this.resultBuffer, c = this.sampleValues, t = this.valueSize, d = e * t * 3 + t;
    for (let s = 0; s !== t; s++)
      l[s] = c[d + s];
    return l;
  }
}
Re.prototype.beforeStart_ = Re.prototype.copySampleValue_;
Re.prototype.afterEnd_ = Re.prototype.copySampleValue_;
Re.prototype.interpolate_ = function(n, e, l, c) {
  const t = this.resultBuffer, d = this.sampleValues, s = this.valueSize, i = s * 2, a = s * 3, o = c - e, b = (l - e) / o, m = b * b, X = m * b, G = n * a, h = G - a, u = -2 * X + 3 * m, y = X - m, p = 1 - u, W = y - m + b;
  for (let V = 0; V !== s; V++) {
    const r = d[h + V + s], I = d[h + V + i] * o, g = d[G + V + s], L = d[G + V] * o;
    t[V] = p * r + W * I + u * g + y * L;
  }
  return t;
};
const Cl = {
  FLOAT: 5126,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, Yc = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, ud = {
  9728: Me,
  9729: fe,
  9984: vs,
  9985: fs,
  9986: Bs,
  9987: fd
}, hd = {
  33071: Us,
  33648: ws,
  10497: ve
}, pd = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Pn = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv2",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, Ul = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Qn = {
  CUBICSPLINE: void 0,
  LINEAR: Bd,
  STEP: Ps
}, jc = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function yd(n, e) {
  return typeof n != "string" || n === "" ? "" : (/^https?:\/\//i.test(e) && /^\//.test(n) && (e = e.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(n) || /^data:.*,.*$/i.test(n) || /^blob:.*$/i.test(n) ? n : e + n);
}
function jn(n) {
  return n.DefaultMaterial === void 0 && (n.DefaultMaterial = new ht({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: Ve
  })), n.DefaultMaterial;
}
function ze(n, e, l) {
  for (const c in l.extensions)
    n[c] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[c] = l.extensions[c]);
}
function $l(n, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(n.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function En(n, e, l) {
  let c = !1, t = !1;
  for (let i = 0, a = e.length; i < a; i++) {
    const o = e[i];
    if (o.POSITION !== void 0 && (c = !0), o.NORMAL !== void 0 && (t = !0), c && t)
      break;
  }
  if (!c && !t)
    return Promise.resolve(n);
  const d = [], s = [];
  for (let i = 0, a = e.length; i < a; i++) {
    const o = e[i];
    if (c) {
      const b = o.POSITION !== void 0 ? l.getDependency("accessor", o.POSITION) : n.attributes.position;
      d.push(b);
    }
    if (t) {
      const b = o.NORMAL !== void 0 ? l.getDependency("accessor", o.NORMAL) : n.attributes.normal;
      s.push(b);
    }
  }
  return Promise.all([
    Promise.all(d),
    Promise.all(s)
  ]).then(function(i) {
    const a = i[0], o = i[1];
    return c && (n.morphAttributes.position = a), t && (n.morphAttributes.normal = o), n.morphTargetsRelative = !0, n;
  });
}
function An(n, e) {
  if (n.updateMorphTargets(), e.weights !== void 0)
    for (let l = 0, c = e.weights.length; l < c; l++)
      n.morphTargetInfluences[l] = e.weights[l];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const l = e.extras.targetNames;
    if (n.morphTargetInfluences.length === l.length) {
      n.morphTargetDictionary = {};
      for (let c = 0, t = l.length; c < t; c++)
        n.morphTargetDictionary[l[c]] = c;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Dn(n) {
  const e = n.extensions && n.extensions[F.KHR_DRACO_MESH_COMPRESSION];
  let l;
  return e ? l = "draco:" + e.bufferView + ":" + e.indices + ":" + Wd(e.attributes) : l = n.indices + ":" + Wd(n.attributes) + ":" + n.mode, l;
}
function Wd(n) {
  let e = "";
  const l = Object.keys(n).sort();
  for (let c = 0, t = l.length; c < t; c++)
    e += l[c] + ":" + n[l[c]] + ";";
  return e;
}
function at(n) {
  switch (n) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
class On {
  constructor(e = {}, l = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = l, this.cache = new zn(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.textureCache = {}, this.nodeNamesUsed = {}, typeof createImageBitmap < "u" && /Firefox/.test(navigator.userAgent) === !1 ? this.textureLoader = new gs(this.options.manager) : this.textureLoader = new Ys(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new kd(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, l) {
    const c = this, t = this.json, d = this.extensions;
    this.cache.removeAll(), this._invokeAll(function(s) {
      return s._markDefs && s._markDefs();
    }), Promise.all(this._invokeAll(function(s) {
      return s.beforeRoot && s.beforeRoot();
    })).then(function() {
      return Promise.all([
        c.getDependencies("scene"),
        c.getDependencies("animation"),
        c.getDependencies("camera")
      ]);
    }).then(function(s) {
      const i = {
        scene: s[0][t.scene || 0],
        scenes: s[0],
        animations: s[1],
        cameras: s[2],
        asset: t.asset,
        parser: c,
        userData: {}
      };
      ze(d, i, t), $l(i, t), Promise.all(c._invokeAll(function(a) {
        return a.afterRoot && a.afterRoot(i);
      })).then(function() {
        e(i);
      });
    }).catch(l);
  }
  _markDefs() {
    const e = this.json.nodes || [], l = this.json.skins || [], c = this.json.meshes || [];
    for (let t = 0, d = l.length; t < d; t++) {
      const s = l[t].joints;
      for (let i = 0, a = s.length; i < a; i++)
        e[s[i]].isBone = !0;
    }
    for (let t = 0, d = e.length; t < d; t++) {
      const s = e[t];
      s.mesh !== void 0 && (this._addNodeRef(this.meshCache, s.mesh), s.skin !== void 0 && (c[s.mesh].isSkinnedMesh = !0)), s.camera !== void 0 && this._addNodeRef(this.cameraCache, s.camera);
    }
  }
  _addNodeRef(e, l) {
    l !== void 0 && (e.refs[l] === void 0 && (e.refs[l] = e.uses[l] = 0), e.refs[l]++);
  }
  _getNodeRef(e, l, c) {
    if (e.refs[l] <= 1)
      return c;
    const t = c.clone();
    return t.name += "_instance_" + e.uses[l]++, t;
  }
  _invokeOne(e) {
    const l = Object.values(this.plugins);
    l.push(this);
    for (let c = 0; c < l.length; c++) {
      const t = e(l[c]);
      if (t)
        return t;
    }
    return null;
  }
  _invokeAll(e) {
    const l = Object.values(this.plugins);
    l.unshift(this);
    const c = [];
    for (let t = 0; t < l.length; t++) {
      const d = e(l[t]);
      d && c.push(d);
    }
    return c;
  }
  getDependency(e, l) {
    const c = e + ":" + l;
    let t = this.cache.get(c);
    if (!t) {
      switch (e) {
        case "scene":
          t = this.loadScene(l);
          break;
        case "node":
          t = this.loadNode(l);
          break;
        case "mesh":
          t = this._invokeOne(function(d) {
            return d.loadMesh && d.loadMesh(l);
          });
          break;
        case "accessor":
          t = this.loadAccessor(l);
          break;
        case "bufferView":
          t = this._invokeOne(function(d) {
            return d.loadBufferView && d.loadBufferView(l);
          });
          break;
        case "buffer":
          t = this.loadBuffer(l);
          break;
        case "material":
          t = this._invokeOne(function(d) {
            return d.loadMaterial && d.loadMaterial(l);
          });
          break;
        case "texture":
          t = this._invokeOne(function(d) {
            return d.loadTexture && d.loadTexture(l);
          });
          break;
        case "skin":
          t = this.loadSkin(l);
          break;
        case "animation":
          t = this.loadAnimation(l);
          break;
        case "camera":
          t = this.loadCamera(l);
          break;
        default:
          throw new Error("Unknown type: " + e);
      }
      this.cache.add(c, t);
    }
    return t;
  }
  getDependencies(e) {
    let l = this.cache.get(e);
    if (!l) {
      const c = this, t = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      l = Promise.all(t.map(function(d, s) {
        return c.getDependency(e, s);
      })), this.cache.add(e, l);
    }
    return l;
  }
  loadBuffer(e) {
    const l = this.json.buffers[e], c = this.fileLoader;
    if (l.type && l.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + l.type + " buffer type is not supported.");
    if (l.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[F.KHR_BINARY_GLTF].body);
    const t = this.options;
    return new Promise(function(d, s) {
      c.load(yd(l.uri, t.path), d, void 0, function() {
        s(new Error('THREE.GLTFLoader: Failed to load buffer "' + l.uri + '".'));
      });
    });
  }
  loadBufferView(e) {
    const l = this.json.bufferViews[e];
    return this.getDependency("buffer", l.buffer).then(function(c) {
      const t = l.byteLength || 0, d = l.byteOffset || 0;
      return c.slice(d, d + t);
    });
  }
  loadAccessor(e) {
    const l = this, c = this.json, t = this.json.accessors[e];
    if (t.bufferView === void 0 && t.sparse === void 0)
      return Promise.resolve(null);
    const d = [];
    return t.bufferView !== void 0 ? d.push(this.getDependency("bufferView", t.bufferView)) : d.push(null), t.sparse !== void 0 && (d.push(this.getDependency("bufferView", t.sparse.indices.bufferView)), d.push(this.getDependency("bufferView", t.sparse.values.bufferView))), Promise.all(d).then(function(s) {
      const i = s[0], a = pd[t.type], o = Yc[t.componentType], b = o.BYTES_PER_ELEMENT, m = b * a, X = t.byteOffset || 0, G = t.bufferView !== void 0 ? c.bufferViews[t.bufferView].byteStride : void 0, h = t.normalized === !0;
      let u, y;
      if (G && G !== m) {
        const p = Math.floor(X / G), W = "InterleavedBuffer:" + t.bufferView + ":" + t.componentType + ":" + p + ":" + t.count;
        let V = l.cache.get(W);
        V || (u = new o(i, p * G, t.count * G / b), V = new Cs(u, G / b), l.cache.add(W, V)), y = new le(V, a, X % G / b, h);
      } else
        i === null ? u = new o(t.count * a) : u = new o(i, X, t.count * a), y = new tl(u, a, h);
      if (t.sparse !== void 0) {
        const p = pd.SCALAR, W = Yc[t.sparse.indices.componentType], V = t.sparse.indices.byteOffset || 0, r = t.sparse.values.byteOffset || 0, I = new W(s[1], V, t.sparse.count * p), g = new o(s[2], r, t.sparse.count * a);
        i !== null && (y = new tl(y.array.slice(), y.itemSize, y.normalized));
        for (let L = 0, Y = I.length; L < Y; L++) {
          const C = I[L];
          if (y.setX(C, g[L * a]), a >= 2 && y.setY(C, g[L * a + 1]), a >= 3 && y.setZ(C, g[L * a + 2]), a >= 4 && y.setW(C, g[L * a + 3]), a >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return y;
    });
  }
  loadTexture(e) {
    const l = this.json, c = this.options, t = l.textures[e], d = l.images[t.source];
    let s = this.textureLoader;
    if (d.uri) {
      const i = c.manager.getHandler(d.uri);
      i !== null && (s = i);
    }
    return this.loadTextureImage(e, d, s);
  }
  loadTextureImage(e, l, c) {
    const t = this, d = this.json, s = this.options, i = d.textures[e], a = (l.uri || l.bufferView) + ":" + i.sampler;
    if (this.textureCache[a])
      return this.textureCache[a];
    const o = self.URL || self.webkitURL;
    let b = l.uri || "", m = !1, X = !0;
    const G = b.search(/\.jpe?g($|\?)/i) > 0 || b.search(/^data\:image\/jpeg/) === 0;
    if ((l.mimeType === "image/jpeg" || G) && (X = !1), l.bufferView !== void 0)
      b = t.getDependency("bufferView", l.bufferView).then(function(u) {
        if (l.mimeType === "image/png") {
          const p = new DataView(u, 25, 1).getUint8(0, !1);
          X = p === 6 || p === 4 || p === 3;
        }
        m = !0;
        const y = new Blob([u], { type: l.mimeType });
        return b = o.createObjectURL(y), b;
      });
    else if (l.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const h = Promise.resolve(b).then(function(u) {
      return new Promise(function(y, p) {
        let W = y;
        c.isImageBitmapLoader === !0 && (W = function(V) {
          y(new Qs(V));
        }), c.load(yd(u, s.path), W, void 0, p);
      });
    }).then(function(u) {
      m === !0 && o.revokeObjectURL(b), u.flipY = !1, i.name && (u.name = i.name), X || (u.format = We);
      const p = (d.samplers || {})[i.sampler] || {};
      return u.magFilter = ud[p.magFilter] || fe, u.minFilter = ud[p.minFilter] || fd, u.wrapS = hd[p.wrapS] || ve, u.wrapT = hd[p.wrapT] || ve, t.associations.set(u, {
        type: "textures",
        index: e
      }), u;
    });
    return this.textureCache[a] = h, h;
  }
  assignTexture(e, l, c) {
    const t = this;
    return this.getDependency("texture", c.index).then(function(d) {
      if (c.texCoord !== void 0 && c.texCoord != 0 && !(l === "aoMap" && c.texCoord == 1) && console.warn("THREE.GLTFLoader: Custom UV set " + c.texCoord + " for texture " + l + " not yet supported."), t.extensions[F.KHR_TEXTURE_TRANSFORM]) {
        const s = c.extensions !== void 0 ? c.extensions[F.KHR_TEXTURE_TRANSFORM] : void 0;
        if (s) {
          const i = t.associations.get(d);
          d = t.extensions[F.KHR_TEXTURE_TRANSFORM].extendTexture(d, s), t.associations.set(d, i);
        }
      }
      e[l] = d;
    });
  }
  assignFinalMaterial(e) {
    const l = e.geometry;
    let c = e.material;
    const t = l.attributes.tangent !== void 0, d = l.attributes.color !== void 0, s = l.attributes.normal === void 0, i = Object.keys(l.morphAttributes).length > 0, a = i && l.morphAttributes.normal !== void 0;
    if (e.isPoints) {
      const o = "PointsMaterial:" + c.uuid;
      let b = this.cache.get(o);
      b || (b = new Ss(), gt.prototype.copy.call(b, c), b.color.copy(c.color), b.map = c.map, b.sizeAttenuation = !1, this.cache.add(o, b)), c = b;
    } else if (e.isLine) {
      const o = "LineBasicMaterial:" + c.uuid;
      let b = this.cache.get(o);
      b || (b = new Ks(), gt.prototype.copy.call(b, c), b.color.copy(c.color), this.cache.add(o, b)), c = b;
    }
    if (t || d || s || i) {
      let o = "ClonedMaterial:" + c.uuid + ":";
      c.isGLTFSpecularGlossinessMaterial && (o += "specular-glossiness:"), t && (o += "vertex-tangents:"), d && (o += "vertex-colors:"), s && (o += "flat-shading:"), i && (o += "morph-targets:"), a && (o += "morph-normals:");
      let b = this.cache.get(o);
      b || (b = c.clone(), d && (b.vertexColors = !0), s && (b.flatShading = !0), i && (b.morphTargets = !0), a && (b.morphNormals = !0), t && (b.vertexTangents = !0, b.normalScale && (b.normalScale.y *= -1), b.clearcoatNormalScale && (b.clearcoatNormalScale.y *= -1)), this.cache.add(o, b), this.associations.set(b, this.associations.get(c))), c = b;
    }
    c.aoMap && l.attributes.uv2 === void 0 && l.attributes.uv !== void 0 && l.setAttribute("uv2", l.attributes.uv), e.material = c;
  }
  getMaterialType() {
    return ht;
  }
  loadMaterial(e) {
    const l = this, c = this.json, t = this.extensions, d = c.materials[e];
    let s;
    const i = {}, a = d.extensions || {}, o = [];
    if (a[F.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
      const m = t[F.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
      s = m.getMaterialType(), o.push(m.extendParams(i, d, l));
    } else if (a[F.KHR_MATERIALS_UNLIT]) {
      const m = t[F.KHR_MATERIALS_UNLIT];
      s = m.getMaterialType(), o.push(m.extendParams(i, d, l));
    } else {
      const m = d.pbrMetallicRoughness || {};
      if (i.color = new v(1, 1, 1), i.opacity = 1, Array.isArray(m.baseColorFactor)) {
        const X = m.baseColorFactor;
        i.color.fromArray(X), i.opacity = X[3];
      }
      m.baseColorTexture !== void 0 && o.push(l.assignTexture(i, "map", m.baseColorTexture)), i.metalness = m.metallicFactor !== void 0 ? m.metallicFactor : 1, i.roughness = m.roughnessFactor !== void 0 ? m.roughnessFactor : 1, m.metallicRoughnessTexture !== void 0 && (o.push(l.assignTexture(i, "metalnessMap", m.metallicRoughnessTexture)), o.push(l.assignTexture(i, "roughnessMap", m.metallicRoughnessTexture))), s = this._invokeOne(function(X) {
        return X.getMaterialType && X.getMaterialType(e);
      }), o.push(Promise.all(this._invokeAll(function(X) {
        return X.extendMaterialParams && X.extendMaterialParams(e, i);
      })));
    }
    d.doubleSided === !0 && (i.side = xc);
    const b = d.alphaMode || jc.OPAQUE;
    return b === jc.BLEND ? (i.transparent = !0, i.depthWrite = !1) : (i.transparent = !1, b === jc.MASK && (i.alphaTest = d.alphaCutoff !== void 0 ? d.alphaCutoff : 0.5)), d.normalTexture !== void 0 && s !== Nl && (o.push(l.assignTexture(i, "normalMap", d.normalTexture)), i.normalScale = new T(1, -1), d.normalTexture.scale !== void 0 && i.normalScale.set(d.normalTexture.scale, -d.normalTexture.scale)), d.occlusionTexture !== void 0 && s !== Nl && (o.push(l.assignTexture(i, "aoMap", d.occlusionTexture)), d.occlusionTexture.strength !== void 0 && (i.aoMapIntensity = d.occlusionTexture.strength)), d.emissiveFactor !== void 0 && s !== Nl && (i.emissive = new v().fromArray(d.emissiveFactor)), d.emissiveTexture !== void 0 && s !== Nl && o.push(l.assignTexture(i, "emissiveMap", d.emissiveTexture)), Promise.all(o).then(function() {
      let m;
      return s === nt ? m = t[F.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(i) : m = new s(i), d.name && (m.name = d.name), m.map && (m.map.encoding = lt), m.emissiveMap && (m.emissiveMap.encoding = lt), $l(m, d), l.associations.set(m, { type: "materials", index: e }), d.extensions && ze(t, m, d), m;
    });
  }
  createUniqueName(e) {
    const l = xs.sanitizeNodeName(e || "");
    let c = l;
    for (let t = 1; this.nodeNamesUsed[c]; ++t)
      c = l + "_" + t;
    return this.nodeNamesUsed[c] = !0, c;
  }
  loadGeometries(e) {
    const l = this, c = this.extensions, t = this.primitiveCache;
    function d(i) {
      return c[F.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(i, l).then(function(a) {
        return Vd(a, i, l);
      });
    }
    const s = [];
    for (let i = 0, a = e.length; i < a; i++) {
      const o = e[i], b = Dn(o), m = t[b];
      if (m)
        s.push(m.promise);
      else {
        let X;
        o.extensions && o.extensions[F.KHR_DRACO_MESH_COMPRESSION] ? X = d(o) : X = Vd(new de(), o, l), t[b] = { primitive: o, promise: X }, s.push(X);
      }
    }
    return Promise.all(s);
  }
  loadMesh(e) {
    const l = this, c = this.json, t = this.extensions, d = c.meshes[e], s = d.primitives, i = [];
    for (let a = 0, o = s.length; a < o; a++) {
      const b = s[a].material === void 0 ? jn(this.cache) : this.getDependency("material", s[a].material);
      i.push(b);
    }
    return i.push(l.loadGeometries(s)), Promise.all(i).then(function(a) {
      const o = a.slice(0, a.length - 1), b = a[a.length - 1], m = [];
      for (let G = 0, h = b.length; G < h; G++) {
        const u = b[G], y = s[G];
        let p;
        const W = o[G];
        if (y.mode === Cl.TRIANGLES || y.mode === Cl.TRIANGLE_STRIP || y.mode === Cl.TRIANGLE_FAN || y.mode === void 0)
          p = d.isSkinnedMesh === !0 ? new Hs(u, W) : new w(u, W), p.isSkinnedMesh === !0 && !p.geometry.attributes.skinWeight.normalized && p.normalizeSkinWeights(), y.mode === Cl.TRIANGLE_STRIP ? p.geometry = rd(p.geometry, js) : y.mode === Cl.TRIANGLE_FAN && (p.geometry = rd(p.geometry, Ud));
        else if (y.mode === Cl.LINES)
          p = new al(u, W);
        else if (y.mode === Cl.LINE_STRIP)
          p = new zs(u, W);
        else if (y.mode === Cl.LINE_LOOP)
          p = new Ns(u, W);
        else if (y.mode === Cl.POINTS)
          p = new Js(u, W);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + y.mode);
        Object.keys(p.geometry.morphAttributes).length > 0 && An(p, d), p.name = l.createUniqueName(d.name || "mesh_" + e), $l(p, d), y.extensions && ze(t, p, y), l.assignFinalMaterial(p), m.push(p);
      }
      if (m.length === 1)
        return m[0];
      const X = new Xl();
      for (let G = 0, h = m.length; G < h; G++)
        X.add(m[G]);
      return X;
    });
  }
  loadCamera(e) {
    let l;
    const c = this.json.cameras[e], t = c[c.type];
    if (!t) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return c.type === "perspective" ? l = new Fd(Gt.radToDeg(t.yfov), t.aspectRatio || 1, t.znear || 1, t.zfar || 2e6) : c.type === "orthographic" && (l = new mt(-t.xmag, t.xmag, t.ymag, -t.ymag, t.znear, t.zfar)), c.name && (l.name = this.createUniqueName(c.name)), $l(l, c), Promise.resolve(l);
  }
  loadSkin(e) {
    const l = this.json.skins[e], c = { joints: l.joints };
    return l.inverseBindMatrices === void 0 ? Promise.resolve(c) : this.getDependency("accessor", l.inverseBindMatrices).then(function(t) {
      return c.inverseBindMatrices = t, c;
    });
  }
  loadAnimation(e) {
    const c = this.json.animations[e], t = [], d = [], s = [], i = [], a = [];
    for (let o = 0, b = c.channels.length; o < b; o++) {
      const m = c.channels[o], X = c.samplers[m.sampler], G = m.target, h = G.node !== void 0 ? G.node : G.id, u = c.parameters !== void 0 ? c.parameters[X.input] : X.input, y = c.parameters !== void 0 ? c.parameters[X.output] : X.output;
      t.push(this.getDependency("node", h)), d.push(this.getDependency("accessor", u)), s.push(this.getDependency("accessor", y)), i.push(X), a.push(G);
    }
    return Promise.all([
      Promise.all(t),
      Promise.all(d),
      Promise.all(s),
      Promise.all(i),
      Promise.all(a)
    ]).then(function(o) {
      const b = o[0], m = o[1], X = o[2], G = o[3], h = o[4], u = [];
      for (let p = 0, W = b.length; p < W; p++) {
        const V = b[p], r = m[p], I = X[p], g = G[p], L = h[p];
        if (V === void 0)
          continue;
        V.updateMatrix(), V.matrixAutoUpdate = !0;
        let Y;
        switch (Ul[L.path]) {
          case Ul.weights:
            Y = Ds;
            break;
          case Ul.rotation:
            Y = As;
            break;
          case Ul.position:
          case Ul.scale:
          default:
            Y = Es;
            break;
        }
        const C = V.name ? V.name : V.uuid, S = g.interpolation !== void 0 ? Qn[g.interpolation] : Bd, x = [];
        Ul[L.path] === Ul.weights ? V.traverse(function(K) {
          K.isMesh === !0 && K.morphTargetInfluences && x.push(K.name ? K.name : K.uuid);
        }) : x.push(C);
        let H = I.array;
        if (I.normalized) {
          const K = at(H.constructor), M = new Float32Array(H.length);
          for (let J = 0, P = H.length; J < P; J++)
            M[J] = H[J] * K;
          H = M;
        }
        for (let K = 0, M = x.length; K < M; K++) {
          const J = new Y(
            x[K] + "." + Ul[L.path],
            r.array,
            H,
            S
          );
          g.interpolation === "CUBICSPLINE" && (J.createInterpolant = function(O) {
            return new Re(this.times, this.values, this.getValueSize() / 3, O);
          }, J.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0), u.push(J);
        }
      }
      const y = c.name ? c.name : "animation_" + e;
      return new Ms(y, void 0, u);
    });
  }
  createNodeMesh(e) {
    const l = this.json, c = this, t = l.nodes[e];
    return t.mesh === void 0 ? null : c.getDependency("mesh", t.mesh).then(function(d) {
      const s = c._getNodeRef(c.meshCache, t.mesh, d);
      return t.weights !== void 0 && s.traverse(function(i) {
        if (!!i.isMesh)
          for (let a = 0, o = t.weights.length; a < o; a++)
            i.morphTargetInfluences[a] = t.weights[a];
      }), s;
    });
  }
  loadNode(e) {
    const l = this.json, c = this.extensions, t = this, d = l.nodes[e], s = d.name ? t.createUniqueName(d.name) : "";
    return function() {
      const i = [], a = t._invokeOne(function(o) {
        return o.createNodeMesh && o.createNodeMesh(e);
      });
      return a && i.push(a), d.camera !== void 0 && i.push(t.getDependency("camera", d.camera).then(function(o) {
        return t._getNodeRef(t.cameraCache, d.camera, o);
      })), t._invokeAll(function(o) {
        return o.createNodeAttachment && o.createNodeAttachment(e);
      }).forEach(function(o) {
        i.push(o);
      }), Promise.all(i);
    }().then(function(i) {
      let a;
      if (d.isBone === !0 ? a = new Fs() : i.length > 1 ? a = new Xl() : i.length === 1 ? a = i[0] : a = new Ts(), a !== i[0])
        for (let o = 0, b = i.length; o < b; o++)
          a.add(i[o]);
      if (d.name && (a.userData.name = d.name, a.name = s), $l(a, d), d.extensions && ze(c, a, d), d.matrix !== void 0) {
        const o = new B();
        o.fromArray(d.matrix), a.applyMatrix4(o);
      } else
        d.translation !== void 0 && a.position.fromArray(d.translation), d.rotation !== void 0 && a.quaternion.fromArray(d.rotation), d.scale !== void 0 && a.scale.fromArray(d.scale);
      return t.associations.set(a, { type: "nodes", index: e }), a;
    });
  }
  loadScene(e) {
    const l = this.json, c = this.extensions, t = this.json.scenes[e], d = this, s = new Xl();
    t.name && (s.name = d.createUniqueName(t.name)), $l(s, t), t.extensions && ze(c, s, t);
    const i = t.nodes || [], a = [];
    for (let o = 0, b = i.length; o < b; o++)
      a.push(ts(i[o], s, l, d));
    return Promise.all(a).then(function() {
      return s;
    });
  }
}
function ts(n, e, l, c) {
  const t = l.nodes[n];
  return c.getDependency("node", n).then(function(d) {
    if (t.skin === void 0)
      return d;
    let s;
    return c.getDependency("skin", t.skin).then(function(i) {
      s = i;
      const a = [];
      for (let o = 0, b = s.joints.length; o < b; o++)
        a.push(c.getDependency("node", s.joints[o]));
      return Promise.all(a);
    }).then(function(i) {
      return d.traverse(function(a) {
        if (!a.isMesh)
          return;
        const o = [], b = [];
        for (let m = 0, X = i.length; m < X; m++) {
          const G = i[m];
          if (G) {
            o.push(G);
            const h = new B();
            s.inverseBindMatrices !== void 0 && h.fromArray(s.inverseBindMatrices.array, m * 16), b.push(h);
          } else
            console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', s.joints[m]);
        }
        a.bind(new ks(o, b), a.matrixWorld);
      }), d;
    });
  }).then(function(d) {
    e.add(d);
    const s = [];
    if (t.children) {
      const i = t.children;
      for (let a = 0, o = i.length; a < o; a++) {
        const b = i[a];
        s.push(ts(b, d, l, c));
      }
    }
    return Promise.all(s);
  });
}
function _n(n, e, l) {
  const c = e.attributes, t = new U();
  if (c.POSITION !== void 0) {
    const i = l.json.accessors[c.POSITION], a = i.min, o = i.max;
    if (a !== void 0 && o !== void 0) {
      if (t.set(
        new R(a[0], a[1], a[2]),
        new R(o[0], o[1], o[2])
      ), i.normalized) {
        const b = at(Yc[i.componentType]);
        t.min.multiplyScalar(b), t.max.multiplyScalar(b);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const d = e.targets;
  if (d !== void 0) {
    const i = new R(), a = new R();
    for (let o = 0, b = d.length; o < b; o++) {
      const m = d[o];
      if (m.POSITION !== void 0) {
        const X = l.json.accessors[m.POSITION], G = X.min, h = X.max;
        if (G !== void 0 && h !== void 0) {
          if (a.setX(Math.max(Math.abs(G[0]), Math.abs(h[0]))), a.setY(Math.max(Math.abs(G[1]), Math.abs(h[1]))), a.setZ(Math.max(Math.abs(G[2]), Math.abs(h[2]))), X.normalized) {
            const u = at(Yc[X.componentType]);
            a.multiplyScalar(u);
          }
          i.max(a);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    t.expandByVector(i);
  }
  n.boundingBox = t;
  const s = new Jl();
  t.getCenter(s.center), s.radius = t.min.distanceTo(t.max) / 2, n.boundingSphere = s;
}
function Vd(n, e, l) {
  const c = e.attributes, t = [];
  function d(s, i) {
    return l.getDependency("accessor", s).then(function(a) {
      n.setAttribute(i, a);
    });
  }
  for (const s in c) {
    const i = Pn[s] || s.toLowerCase();
    i in n.attributes || t.push(d(c[s], i));
  }
  if (e.indices !== void 0 && !n.index) {
    const s = l.getDependency("accessor", e.indices).then(function(i) {
      n.setIndex(i);
    });
    t.push(s);
  }
  return $l(n, e), _n(n, e, l), Promise.all(t).then(function() {
    return e.targets !== void 0 ? En(n, e.targets, l) : n;
  });
}
function rd(n, e) {
  let l = n.getIndex();
  if (l === null) {
    const s = [], i = n.getAttribute("position");
    if (i !== void 0) {
      for (let a = 0; a < i.count; a++)
        s.push(a);
      n.setIndex(s), l = n.getIndex();
    } else
      return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), n;
  }
  const c = l.count - 2, t = [];
  if (e === Ud)
    for (let s = 1; s <= c; s++)
      t.push(l.getX(0)), t.push(l.getX(s)), t.push(l.getX(s + 1));
  else
    for (let s = 0; s < c; s++)
      s % 2 === 0 ? (t.push(l.getX(s)), t.push(l.getX(s + 1)), t.push(l.getX(s + 2))) : (t.push(l.getX(s + 2)), t.push(l.getX(s + 1)), t.push(l.getX(s)));
  t.length / 3 !== c && console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
  const d = n.clone();
  return d.setIndex(t), d;
}
class qn {
  constructor(e, l) {
    Z(this, "elNum");
    Z(this, "matrix");
    this.elNum = e, this.matrix = l;
  }
}
class Ra {
  constructor(e, l = new R()) {
    Z(this, "origin", new R());
    Z(this, "elementDatas", /* @__PURE__ */ new Map());
    Z(this, "instanceGeoms", /* @__PURE__ */ new Map());
    Z(this, "sharedGeoms", /* @__PURE__ */ new Map());
    Z(this, "lzma");
    Z(this, "needFixElementsData", !1);
    Z(this, "loadProgress", 0);
    Z(this, "onProgressCallback");
    this.origin = l, this.lzma = e;
  }
  onProgress(e) {
    return this.onProgressCallback = e, this;
  }
  updateProgress(e, l = !1) {
    this.loadProgress += e;
    const c = l ? e : this.loadProgress;
    this.onProgressCallback && this.onProgressCallback(c), console.log("percent: " + c);
  }
  async processGeomData(e, l, c) {
    const t = new Uint8Array(e);
    console.info("Decompressing geometry metadata: " + l);
    let d = await this.lzma.decompress(t);
    typeof d != "string" && (d = new TextDecoder("utf-8").decode(d.buffer));
    const s = JSON.parse(d);
    for (let i = 0; i < s.length; i++) {
      const a = s[i].BoundingBox, o = s[i].SubElements, b = new dc();
      a && (b.bbox = new U(
        new R(a[0], a[1], a[5]),
        new R(a[3], a[4], a[2])
      ), b.isLoaded = !0), o && (b.subEls = o), this.elementDatas.set(Al.getGeomElNumber(c, i), b);
    }
    this.needFixElementsData = !0;
  }
  async processGeometry(e, l, c, t, d, s, i) {
    const a = d / 4;
    let o = new Uint8Array(e);
    console.info("Decompressing geometry: " + l);
    const b = await this.lzma.decompress(o);
    this.lzma.terminate && this.lzma.terminate();
    const m = new Uint8Array(b);
    this.updateProgress(a), console.log("Parsing geometry:" + l), new Hn().parse(
      m.buffer,
      "",
      async (G) => {
        this.updateProgress(a), console.log("Preparing geometry: " + l);
        const h = await G.parser.getDependencies("material");
        G.scene.traverse((y) => {
          var p, W, V, r, I, g;
          if (y instanceof w || y instanceof al)
            if (y.name.startsWith("i") || ((p = y.parent) == null ? void 0 : p.name.startsWith("i"))) {
              const L = y.geometry.uuid;
              let Y;
              if ((W = y.parent) != null && W.name.startsWith("i")) {
                if (Y = y.parent.matrix, !y.parent.isTransformed) {
                  const K = new R().setFromMatrixPosition(Y);
                  Y.setPosition(K.x - this.origin.x, K.y - this.origin.y, K.z - this.origin.z);
                  const M = y.parent;
                  M.isTransformed = !0;
                }
              } else {
                Y = y.matrix;
                const K = new R().setFromMatrixPosition(Y);
                this.origin.length() == 0 && this.origin.copy(K), Y.setPosition(K.x - this.origin.x, K.y - this.origin.y, K.z - this.origin.z);
              }
              const C = y.material.name == "" ? y.material.uuid : y.material.name;
              this.sharedGeoms.has(C) || this.sharedGeoms.set(C, new Xd(y.material, y, c, t, this.origin)), this.instanceGeoms.has(L) || (this.instanceGeoms.set(L, new xn(c)), (V = this.instanceGeoms.get(L)) == null || V.processGeometry(y, h));
              const S = (r = y.parent) != null && r.name.startsWith("i") ? y.parent.name.split("_") : y.name.split("_"), x = Al.getGeomElNumber(c, parseInt(S[1])), H = new qn(x, Y);
              if ((I = this.instanceGeoms.get(L)) == null || I.instances.push(H), !this.elementDatas.has(x)) {
                const K = new dc();
                K.bbox = (g = this.instanceGeoms.get(L)) == null ? void 0 : g.box.clone().applyMatrix4(Y), K.bSphere = K.bbox.getBoundingSphere(new Jl()), this.elementDatas.set(x, K);
              }
            } else {
              const L = y.material.name == "" ? y.material.uuid : y.material.name;
              this.sharedGeoms.has(L) || this.sharedGeoms.set(L, new Xd(y.material, y, c, t, this.origin));
              const Y = this.sharedGeoms.get(L);
              Y == null || Y.processSharedGeometry(y, c, t), this.sharedGeoms.set(L, Y);
            }
        }), this.mergeInstanceGeometry(this.sharedGeoms, this.instanceGeoms, this.elementDatas), this.generateIndicesMap(this.sharedGeoms, this.elementDatas), this.needFixElementsData && this.fixElementsData(this.elementDatas), this.updateProgress(a);
        let u = {
          elementDatas: this.elementDatas,
          sharedGeoms: this.sharedGeoms,
          instanceGeoms: this.instanceGeoms,
          geomFileNumber: c,
          geomFileTotal: t
        };
        s && s(null, u);
      },
      (G) => {
        this.updateProgress(a), s && i(null, {
          geomFileNumber: c,
          geomFileTotal: t,
          error: G
        });
      }
    );
  }
  mergeInstanceGeometry(e, l, c) {
    var t, d, s;
    console.info("Merging geometry...");
    for (const i of Array.from(l.keys())) {
      const a = l.get(i);
      if (!a)
        continue;
      if (a.type == "line" || a.verts.length < 1e3 && a.instances.length < 6 || a.verts.length < 1e4 && a.instances.length < 3) {
        const b = e.get(a.matName);
        b == null || b.instances.push(i);
      }
    }
    for (const i of Array.from(e.keys())) {
      let a;
      const o = e.get(i);
      if (!o)
        continue;
      let b = o.verts ? o.verts.length / 3 : 0, m = o.index ? o.index.length : 0;
      for (a in o.instances) {
        const u = l.get(o.instances[a]);
        !u || (b += u.verts.length / 3 * u.instances.length, m += u.index.length * u.instances.length);
      }
      let X = 0, G = 0;
      const h = new Al();
      if (h.verts = new Float32Array(b * 3), h.elNums = new Float32Array(b), h.index = new Uint32Array(m), ((t = o.verts) == null ? void 0 : t.length) > 0) {
        this.insertBuffers(h, o, X, G, new B()), X += o.verts.length / 3, G += o.index.length;
        for (let u = 0; u < o.verts.length / 3; u = u + 1) {
          const y = o.elNums[u], p = o.verts[u * 3], W = o.verts[u * 3 + 1], V = o.verts[u * 3 + 2];
          if (c.has(y)) {
            if (!((d = c.get(y)) != null && d.isLoaded)) {
              const r = c.get(y);
              r.bbox.expandByPoint(new R(p, W, V)), r.bSphere = r.bbox.getBoundingSphere(new Jl());
            }
          } else {
            const r = new dc();
            c.set(y, r), r.bbox = new U(new R(p - 1, W - 1, V - 1), new R(p, W, V));
          }
        }
      }
      for (a in o.instances) {
        const u = l.get(o.instances[a]);
        if (!!u) {
          for (const y in u.instances)
            if (this.insertBuffers(h, u, X, G, u.instances[y].matrix, u.instances[y].elNum), X += u.verts.length / 3, G += u.index.length, c.has(u.instances[y].elNum))
              (s = c.get(u.instances[y].elNum)) == null || s.bbox.union(u.box.clone().applyMatrix4(u.instances[y].matrix));
            else {
              const p = new dc();
              c.set(u.instances[y].elNum, p), p.bbox = u.box.clone().applyMatrix4(u.instances[y].matrix);
            }
          l.delete(o.instances[a]);
        }
      }
      o.verts = h.verts, o.geomFileNumber = h.geomFileNumber, o.elNums = h.elNums, o.index = h.index, o.box = h.box;
    }
  }
  insertBuffers(e, l, c, t, d, s = void 0) {
    for (let i = 0; i < l.verts.length / 3; i = i + 1) {
      const a = new R(l.verts[i * 3], l.verts[i * 3 + 1], l.verts[i * 3 + 2]).applyMatrix4(d);
      e.verts[i * 3 + c * 3] = a.x, e.verts[i * 3 + 1 + c * 3] = a.y, e.verts[i * 3 + 2 + c * 3] = a.z, e.geomFileNumber = l.geomFileNumber, e.elNums[i + c] = s != null ? s : l.elNums[i];
    }
    for (let i = 0; i < l.index.length; i = i + 1)
      e.index[i + t] = l.index[i] + c, e.box.union(l.box.clone().applyMatrix4(d));
  }
  fixElementsData(e) {
    const l = this.origin.clone().negate();
    for (const [c, t] of e)
      t.bbox.translate(l), t.bbox.isEmpty() || (t.bSphere = t.bbox.getBoundingSphere(new Jl()));
  }
  generateIndicesMap(e, l) {
    const c = /* @__PURE__ */ new Map();
    for (let [t, d] of e)
      if (d.type === "mesh" || d.type === "line") {
        const s = d.elNums, i = d.verts, a = d.index;
        if (!c.has(d.matName)) {
          let o = [s, i, a];
          c.set(d.matName, o);
        }
      }
    for (let [t, d] of c) {
      let s = d[0], i = d[2];
      for (let a = 0; a < i.length; a = a + 3) {
        let o = i[a], b = i[a + 1], m = i[a + 2], X = s[o];
        if (l.has(X)) {
          let G = l.get(X);
          if (G != null && G.indeces.has(t)) {
            let h = G == null ? void 0 : G.indeces.get(t);
            h == null || h.push(o), h == null || h.push(b), h == null || h.push(m);
          } else {
            let h = [];
            h.push(o), h.push(b), h.push(m), G == null || G.indeces.set(t, h);
          }
        }
      }
    }
  }
}
const ds = "dmFyIHZ5PU9iamVjdC5kZWZpbmVQcm9wZXJ0eTt2YXIgeHk9KFZ0LGhuLEFuKT0+aG4gaW4gVnQ/dnkoVnQsaG4se2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOkFufSk6VnRbaG5dPUFuO3ZhciBNdD0oVnQsaG4sQW4pPT4oeHkoVnQsdHlwZW9mIGhuIT0ic3ltYm9sIj9obisiIjpobixBbiksQW4pOyhmdW5jdGlvbigpeyJ1c2Ugc3RyaWN0Ijt2YXIgVnQ9dHlwZW9mIGdsb2JhbFRoaXM8InUiP2dsb2JhbFRoaXM6dHlwZW9mIHdpbmRvdzwidSI/d2luZG93OnR5cGVvZiBnbG9iYWw8InUiP2dsb2JhbDp0eXBlb2Ygc2VsZjwidSI/c2VsZjp7fTtmdW5jdGlvbiBobihkKXtyZXR1cm4gZCYmZC5fX2VzTW9kdWxlJiZPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZCwiZGVmYXVsdCIpP2QuZGVmYXVsdDpkfXZhciBBbj17ZXhwb3J0czp7fX0sWHI9e2V4cG9ydHM6e319LEdzPWZ1bmN0aW9uKHIsaSl7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBoPW5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKSxjPTA7YzxoLmxlbmd0aDtjKyspaFtjXT1hcmd1bWVudHNbY107cmV0dXJuIHIuYXBwbHkoaSxoKX19LG1mPUdzLFZyPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsSnI9ZnVuY3Rpb24oZCl7cmV0dXJuIGZ1bmN0aW9uKHIpe3ZhciBpPVZyLmNhbGwocik7cmV0dXJuIGRbaV18fChkW2ldPWkuc2xpY2UoOCwtMSkudG9Mb3dlckNhc2UoKSl9fShPYmplY3QuY3JlYXRlKG51bGwpKTtmdW5jdGlvbiBObihkKXtyZXR1cm4gZD1kLnRvTG93ZXJDYXNlKCksZnVuY3Rpb24oaSl7cmV0dXJuIEpyKGkpPT09ZH19ZnVuY3Rpb24gUXIoZCl7cmV0dXJuIEFycmF5LmlzQXJyYXkoZCl9ZnVuY3Rpb24gWWUoZCl7cmV0dXJuIHR5cGVvZiBkPiJ1In1mdW5jdGlvbiBnZihkKXtyZXR1cm4gZCE9PW51bGwmJiFZZShkKSYmZC5jb25zdHJ1Y3RvciE9PW51bGwmJiFZZShkLmNvbnN0cnVjdG9yKSYmdHlwZW9mIGQuY29uc3RydWN0b3IuaXNCdWZmZXI9PSJmdW5jdGlvbiImJmQuY29uc3RydWN0b3IuaXNCdWZmZXIoZCl9dmFyICRzPU5uKCJBcnJheUJ1ZmZlciIpO2Z1bmN0aW9uIHlmKGQpe3ZhciByO3JldHVybiB0eXBlb2YgQXJyYXlCdWZmZXI8InUiJiZBcnJheUJ1ZmZlci5pc1ZpZXc/cj1BcnJheUJ1ZmZlci5pc1ZpZXcoZCk6cj1kJiZkLmJ1ZmZlciYmJHMoZC5idWZmZXIpLHJ9ZnVuY3Rpb24gdmYoZCl7cmV0dXJuIHR5cGVvZiBkPT0ic3RyaW5nIn1mdW5jdGlvbiB4ZihkKXtyZXR1cm4gdHlwZW9mIGQ9PSJudW1iZXIifWZ1bmN0aW9uIGtzKGQpe3JldHVybiBkIT09bnVsbCYmdHlwZW9mIGQ9PSJvYmplY3QifWZ1bmN0aW9uIEtlKGQpe2lmKEpyKGQpIT09Im9iamVjdCIpcmV0dXJuITE7dmFyIHI9T2JqZWN0LmdldFByb3RvdHlwZU9mKGQpO3JldHVybiByPT09bnVsbHx8cj09PU9iamVjdC5wcm90b3R5cGV9dmFyIHdmPU5uKCJEYXRlIiksQWY9Tm4oIkZpbGUiKSxTZj1ObigiQmxvYiIpLGJmPU5uKCJGaWxlTGlzdCIpO2Z1bmN0aW9uIGpyKGQpe3JldHVybiBWci5jYWxsKGQpPT09IltvYmplY3QgRnVuY3Rpb25dIn1mdW5jdGlvbiBFZihkKXtyZXR1cm4ga3MoZCkmJmpyKGQucGlwZSl9ZnVuY3Rpb24gTWYoZCl7dmFyIHI9IltvYmplY3QgRm9ybURhdGFdIjtyZXR1cm4gZCYmKHR5cGVvZiBGb3JtRGF0YT09ImZ1bmN0aW9uIiYmZCBpbnN0YW5jZW9mIEZvcm1EYXRhfHxWci5jYWxsKGQpPT09cnx8anIoZC50b1N0cmluZykmJmQudG9TdHJpbmcoKT09PXIpfXZhciBSZj1ObigiVVJMU2VhcmNoUGFyYW1zIik7ZnVuY3Rpb24gemYoZCl7cmV0dXJuIGQudHJpbT9kLnRyaW0oKTpkLnJlcGxhY2UoL15ccyt8XHMrJC9nLCIiKX1mdW5jdGlvbiBMZigpe3JldHVybiB0eXBlb2YgbmF2aWdhdG9yPCJ1IiYmKG5hdmlnYXRvci5wcm9kdWN0PT09IlJlYWN0TmF0aXZlInx8bmF2aWdhdG9yLnByb2R1Y3Q9PT0iTmF0aXZlU2NyaXB0Inx8bmF2aWdhdG9yLnByb2R1Y3Q9PT0iTlMiKT8hMTp0eXBlb2Ygd2luZG93PCJ1IiYmdHlwZW9mIGRvY3VtZW50PCJ1In1mdW5jdGlvbiB0aShkLHIpe2lmKCEoZD09PW51bGx8fHR5cGVvZiBkPiJ1IikpaWYodHlwZW9mIGQhPSJvYmplY3QiJiYoZD1bZF0pLFFyKGQpKWZvcih2YXIgaT0wLGY9ZC5sZW5ndGg7aTxmO2krKylyLmNhbGwobnVsbCxkW2ldLGksZCk7ZWxzZSBmb3IodmFyIGggaW4gZClPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZCxoKSYmci5jYWxsKG51bGwsZFtoXSxoLGQpfWZ1bmN0aW9uIG5pKCl7dmFyIGQ9e307ZnVuY3Rpb24gcihoLGMpe0tlKGRbY10pJiZLZShoKT9kW2NdPW5pKGRbY10saCk6S2UoaCk/ZFtjXT1uaSh7fSxoKTpRcihoKT9kW2NdPWguc2xpY2UoKTpkW2NdPWh9Zm9yKHZhciBpPTAsZj1hcmd1bWVudHMubGVuZ3RoO2k8ZjtpKyspdGkoYXJndW1lbnRzW2ldLHIpO3JldHVybiBkfWZ1bmN0aW9uIEJmKGQscixpKXtyZXR1cm4gdGkocixmdW5jdGlvbihoLGMpe2kmJnR5cGVvZiBoPT0iZnVuY3Rpb24iP2RbY109bWYoaCxpKTpkW2NdPWh9KSxkfWZ1bmN0aW9uIERmKGQpe3JldHVybiBkLmNoYXJDb2RlQXQoMCk9PT02NTI3OSYmKGQ9ZC5zbGljZSgxKSksZH1mdW5jdGlvbiBUZihkLHIsaSxmKXtkLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHIucHJvdG90eXBlLGYpLGQucHJvdG90eXBlLmNvbnN0cnVjdG9yPWQsaSYmT2JqZWN0LmFzc2lnbihkLnByb3RvdHlwZSxpKX1mdW5jdGlvbiBDZihkLHIsaSl7dmFyIGYsaCxjLGc9e307cj1yfHx7fTtkb3tmb3IoZj1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkKSxoPWYubGVuZ3RoO2gtLSA+MDspYz1mW2hdLGdbY118fChyW2NdPWRbY10sZ1tjXT0hMCk7ZD1PYmplY3QuZ2V0UHJvdG90eXBlT2YoZCl9d2hpbGUoZCYmKCFpfHxpKGQscikpJiZkIT09T2JqZWN0LnByb3RvdHlwZSk7cmV0dXJuIHJ9ZnVuY3Rpb24gSWYoZCxyLGkpe2Q9U3RyaW5nKGQpLChpPT09dm9pZCAwfHxpPmQubGVuZ3RoKSYmKGk9ZC5sZW5ndGgpLGktPXIubGVuZ3RoO3ZhciBmPWQuaW5kZXhPZihyLGkpO3JldHVybiBmIT09LTEmJmY9PT1pfWZ1bmN0aW9uIE9mKGQpe2lmKCFkKXJldHVybiBudWxsO3ZhciByPWQubGVuZ3RoO2lmKFllKHIpKXJldHVybiBudWxsO2Zvcih2YXIgaT1uZXcgQXJyYXkocik7ci0tID4wOylpW3JdPWRbcl07cmV0dXJuIGl9dmFyIFBmPWZ1bmN0aW9uKGQpe3JldHVybiBmdW5jdGlvbihyKXtyZXR1cm4gZCYmciBpbnN0YW5jZW9mIGR9fSh0eXBlb2YgVWludDhBcnJheTwidSImJk9iamVjdC5nZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSkscHQ9e2lzQXJyYXk6UXIsaXNBcnJheUJ1ZmZlcjokcyxpc0J1ZmZlcjpnZixpc0Zvcm1EYXRhOk1mLGlzQXJyYXlCdWZmZXJWaWV3OnlmLGlzU3RyaW5nOnZmLGlzTnVtYmVyOnhmLGlzT2JqZWN0OmtzLGlzUGxhaW5PYmplY3Q6S2UsaXNVbmRlZmluZWQ6WWUsaXNEYXRlOndmLGlzRmlsZTpBZixpc0Jsb2I6U2YsaXNGdW5jdGlvbjpqcixpc1N0cmVhbTpFZixpc1VSTFNlYXJjaFBhcmFtczpSZixpc1N0YW5kYXJkQnJvd3NlckVudjpMZixmb3JFYWNoOnRpLG1lcmdlOm5pLGV4dGVuZDpCZix0cmltOnpmLHN0cmlwQk9NOkRmLGluaGVyaXRzOlRmLHRvRmxhdE9iamVjdDpDZixraW5kT2Y6SnIsa2luZE9mVGVzdDpObixlbmRzV2l0aDpJZix0b0FycmF5Ok9mLGlzVHlwZWRBcnJheTpQZixpc0ZpbGVMaXN0OmJmfSxRbj1wdDtmdW5jdGlvbiBZcyhkKXtyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGQpLnJlcGxhY2UoLyUzQS9naSwiOiIpLnJlcGxhY2UoLyUyNC9nLCIkIikucmVwbGFjZSgvJTJDL2dpLCIsIikucmVwbGFjZSgvJTIwL2csIisiKS5yZXBsYWNlKC8lNUIvZ2ksIlsiKS5yZXBsYWNlKC8lNUQvZ2ksIl0iKX12YXIgS3M9ZnVuY3Rpb24ocixpLGYpe2lmKCFpKXJldHVybiByO3ZhciBoO2lmKGYpaD1mKGkpO2Vsc2UgaWYoUW4uaXNVUkxTZWFyY2hQYXJhbXMoaSkpaD1pLnRvU3RyaW5nKCk7ZWxzZXt2YXIgYz1bXTtRbi5mb3JFYWNoKGksZnVuY3Rpb24oQSxSKXtBPT09bnVsbHx8dHlwZW9mIEE+InUifHwoUW4uaXNBcnJheShBKT9SPVIrIltdIjpBPVtBXSxRbi5mb3JFYWNoKEEsZnVuY3Rpb24oUyl7UW4uaXNEYXRlKFMpP1M9Uy50b0lTT1N0cmluZygpOlFuLmlzT2JqZWN0KFMpJiYoUz1KU09OLnN0cmluZ2lmeShTKSksYy5wdXNoKFlzKFIpKyI9IitZcyhTKSl9KSl9KSxoPWMuam9pbigiJiIpfWlmKGgpe3ZhciBnPXIuaW5kZXhPZigiIyIpO2chPT0tMSYmKHI9ci5zbGljZSgwLGcpKSxyKz0oci5pbmRleE9mKCI/Iik9PT0tMT8iPyI6IiYiKStofXJldHVybiByfSxGZj1wdDtmdW5jdGlvbiBYZSgpe3RoaXMuaGFuZGxlcnM9W119WGUucHJvdG90eXBlLnVzZT1mdW5jdGlvbihyLGksZil7cmV0dXJuIHRoaXMuaGFuZGxlcnMucHVzaCh7ZnVsZmlsbGVkOnIscmVqZWN0ZWQ6aSxzeW5jaHJvbm91czpmP2Yuc3luY2hyb25vdXM6ITEscnVuV2hlbjpmP2YucnVuV2hlbjpudWxsfSksdGhpcy5oYW5kbGVycy5sZW5ndGgtMX0sWGUucHJvdG90eXBlLmVqZWN0PWZ1bmN0aW9uKHIpe3RoaXMuaGFuZGxlcnNbcl0mJih0aGlzLmhhbmRsZXJzW3JdPW51bGwpfSxYZS5wcm90b3R5cGUuZm9yRWFjaD1mdW5jdGlvbihyKXtGZi5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsZnVuY3Rpb24oZil7ZiE9PW51bGwmJnIoZil9KX07dmFyIE5mPVhlLFVmPXB0LFdmPWZ1bmN0aW9uKHIsaSl7VWYuZm9yRWFjaChyLGZ1bmN0aW9uKGgsYyl7YyE9PWkmJmMudG9VcHBlckNhc2UoKT09PWkudG9VcHBlckNhc2UoKSYmKHJbaV09aCxkZWxldGUgcltjXSl9KX0sWHM9cHQ7ZnVuY3Rpb24gam4oZCxyLGksZixoKXtFcnJvci5jYWxsKHRoaXMpLHRoaXMubWVzc2FnZT1kLHRoaXMubmFtZT0iQXhpb3NFcnJvciIsciYmKHRoaXMuY29kZT1yKSxpJiYodGhpcy5jb25maWc9aSksZiYmKHRoaXMucmVxdWVzdD1mKSxoJiYodGhpcy5yZXNwb25zZT1oKX1Ycy5pbmhlcml0cyhqbixFcnJvcix7dG9KU09OOmZ1bmN0aW9uKCl7cmV0dXJue21lc3NhZ2U6dGhpcy5tZXNzYWdlLG5hbWU6dGhpcy5uYW1lLGRlc2NyaXB0aW9uOnRoaXMuZGVzY3JpcHRpb24sbnVtYmVyOnRoaXMubnVtYmVyLGZpbGVOYW1lOnRoaXMuZmlsZU5hbWUsbGluZU51bWJlcjp0aGlzLmxpbmVOdW1iZXIsY29sdW1uTnVtYmVyOnRoaXMuY29sdW1uTnVtYmVyLHN0YWNrOnRoaXMuc3RhY2ssY29uZmlnOnRoaXMuY29uZmlnLGNvZGU6dGhpcy5jb2RlLHN0YXR1czp0aGlzLnJlc3BvbnNlJiZ0aGlzLnJlc3BvbnNlLnN0YXR1cz90aGlzLnJlc3BvbnNlLnN0YXR1czpudWxsfX19KTt2YXIgVnM9am4ucHJvdG90eXBlLEpzPXt9O1siRVJSX0JBRF9PUFRJT05fVkFMVUUiLCJFUlJfQkFEX09QVElPTiIsIkVDT05OQUJPUlRFRCIsIkVUSU1FRE9VVCIsIkVSUl9ORVRXT1JLIiwiRVJSX0ZSX1RPT19NQU5ZX1JFRElSRUNUUyIsIkVSUl9ERVBSRUNBVEVEIiwiRVJSX0JBRF9SRVNQT05TRSIsIkVSUl9CQURfUkVRVUVTVCIsIkVSUl9DQU5DRUxFRCJdLmZvckVhY2goZnVuY3Rpb24oZCl7SnNbZF09e3ZhbHVlOmR9fSksT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoam4sSnMpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWcywiaXNBeGlvc0Vycm9yIix7dmFsdWU6ITB9KSxqbi5mcm9tPWZ1bmN0aW9uKGQscixpLGYsaCxjKXt2YXIgZz1PYmplY3QuY3JlYXRlKFZzKTtyZXR1cm4gWHMudG9GbGF0T2JqZWN0KGQsZyxmdW5jdGlvbihBKXtyZXR1cm4gQSE9PUVycm9yLnByb3RvdHlwZX0pLGpuLmNhbGwoZyxkLm1lc3NhZ2UscixpLGYsaCksZy5uYW1lPWQubmFtZSxjJiZPYmplY3QuYXNzaWduKGcsYyksZ307dmFyIHRlPWpuLFFzPXtzaWxlbnRKU09OUGFyc2luZzohMCxmb3JjZWRKU09OUGFyc2luZzohMCxjbGFyaWZ5VGltZW91dEVycm9yOiExfSxKdD1wdDtmdW5jdGlvbiBaZihkLHIpe3I9cnx8bmV3IEZvcm1EYXRhO3ZhciBpPVtdO2Z1bmN0aW9uIGYoYyl7cmV0dXJuIGM9PT1udWxsPyIiOkp0LmlzRGF0ZShjKT9jLnRvSVNPU3RyaW5nKCk6SnQuaXNBcnJheUJ1ZmZlcihjKXx8SnQuaXNUeXBlZEFycmF5KGMpP3R5cGVvZiBCbG9iPT0iZnVuY3Rpb24iP25ldyBCbG9iKFtjXSk6QnVmZmVyLmZyb20oYyk6Y31mdW5jdGlvbiBoKGMsZyl7aWYoSnQuaXNQbGFpbk9iamVjdChjKXx8SnQuaXNBcnJheShjKSl7aWYoaS5pbmRleE9mKGMpIT09LTEpdGhyb3cgRXJyb3IoIkNpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAiK2cpO2kucHVzaChjKSxKdC5mb3JFYWNoKGMsZnVuY3Rpb24oQSxSKXtpZighSnQuaXNVbmRlZmluZWQoQSkpe3ZhciBNPWc/ZysiLiIrUjpSLFM7aWYoQSYmIWcmJnR5cGVvZiBBPT0ib2JqZWN0Iil7aWYoSnQuZW5kc1dpdGgoUiwie30iKSlBPUpTT04uc3RyaW5naWZ5KEEpO2Vsc2UgaWYoSnQuZW5kc1dpdGgoUiwiW10iKSYmKFM9SnQudG9BcnJheShBKSkpe1MuZm9yRWFjaChmdW5jdGlvbih3KXshSnQuaXNVbmRlZmluZWQodykmJnIuYXBwZW5kKE0sZih3KSl9KTtyZXR1cm59fWgoQSxNKX19KSxpLnBvcCgpfWVsc2Ugci5hcHBlbmQoZyxmKGMpKX1yZXR1cm4gaChkKSxyfXZhciBqcz1aZixlaSx0bztmdW5jdGlvbiBxZigpe2lmKHRvKXJldHVybiBlaTt0bz0xO3ZhciBkPXRlO3JldHVybiBlaT1mdW5jdGlvbihpLGYsaCl7dmFyIGM9aC5jb25maWcudmFsaWRhdGVTdGF0dXM7IWguc3RhdHVzfHwhY3x8YyhoLnN0YXR1cyk/aShoKTpmKG5ldyBkKCJSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICIraC5zdGF0dXMsW2QuRVJSX0JBRF9SRVFVRVNULGQuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihoLnN0YXR1cy8xMDApLTRdLGguY29uZmlnLGgucmVxdWVzdCxoKSl9LGVpfXZhciByaSxubztmdW5jdGlvbiBIZigpe2lmKG5vKXJldHVybiByaTtubz0xO3ZhciBkPXB0O3JldHVybiByaT1kLmlzU3RhbmRhcmRCcm93c2VyRW52KCk/ZnVuY3Rpb24oKXtyZXR1cm57d3JpdGU6ZnVuY3Rpb24oZixoLGMsZyx2LEEpe3ZhciBSPVtdO1IucHVzaChmKyI9IitlbmNvZGVVUklDb21wb25lbnQoaCkpLGQuaXNOdW1iZXIoYykmJlIucHVzaCgiZXhwaXJlcz0iK25ldyBEYXRlKGMpLnRvR01UU3RyaW5nKCkpLGQuaXNTdHJpbmcoZykmJlIucHVzaCgicGF0aD0iK2cpLGQuaXNTdHJpbmcodikmJlIucHVzaCgiZG9tYWluPSIrdiksQT09PSEwJiZSLnB1c2goInNlY3VyZSIpLGRvY3VtZW50LmNvb2tpZT1SLmpvaW4oIjsgIil9LHJlYWQ6ZnVuY3Rpb24oZil7dmFyIGg9ZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoIihefDtcXHMqKSgiK2YrIik9KFteO10qKSIpKTtyZXR1cm4gaD9kZWNvZGVVUklDb21wb25lbnQoaFszXSk6bnVsbH0scmVtb3ZlOmZ1bmN0aW9uKGYpe3RoaXMud3JpdGUoZiwiIixEYXRlLm5vdygpLTg2NGU1KX19fSgpOmZ1bmN0aW9uKCl7cmV0dXJue3dyaXRlOmZ1bmN0aW9uKCl7fSxyZWFkOmZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9LHJlbW92ZTpmdW5jdGlvbigpe319fSgpLHJpfXZhciBHZj1mdW5jdGlvbihyKXtyZXR1cm4vXihbYS16XVthLXpcZCtcLS5dKjopP1wvXC8vaS50ZXN0KHIpfSwkZj1mdW5jdGlvbihyLGkpe3JldHVybiBpP3IucmVwbGFjZSgvXC8rJC8sIiIpKyIvIitpLnJlcGxhY2UoL15cLysvLCIiKTpyfSxrZj1HZixZZj0kZixlbz1mdW5jdGlvbihyLGkpe3JldHVybiByJiYha2YoaSk/WWYocixpKTppfSxpaSxybztmdW5jdGlvbiBLZigpe2lmKHJvKXJldHVybiBpaTtybz0xO3ZhciBkPXB0LHI9WyJhZ2UiLCJhdXRob3JpemF0aW9uIiwiY29udGVudC1sZW5ndGgiLCJjb250ZW50LXR5cGUiLCJldGFnIiwiZXhwaXJlcyIsImZyb20iLCJob3N0IiwiaWYtbW9kaWZpZWQtc2luY2UiLCJpZi11bm1vZGlmaWVkLXNpbmNlIiwibGFzdC1tb2RpZmllZCIsImxvY2F0aW9uIiwibWF4LWZvcndhcmRzIiwicHJveHktYXV0aG9yaXphdGlvbiIsInJlZmVyZXIiLCJyZXRyeS1hZnRlciIsInVzZXItYWdlbnQiXTtyZXR1cm4gaWk9ZnVuY3Rpb24oZil7dmFyIGg9e30sYyxnLHY7cmV0dXJuIGYmJmQuZm9yRWFjaChmLnNwbGl0KGAKYCksZnVuY3Rpb24oUil7aWYodj1SLmluZGV4T2YoIjoiKSxjPWQudHJpbShSLnN1YnN0cigwLHYpKS50b0xvd2VyQ2FzZSgpLGc9ZC50cmltKFIuc3Vic3RyKHYrMSkpLGMpe2lmKGhbY10mJnIuaW5kZXhPZihjKT49MClyZXR1cm47Yz09PSJzZXQtY29va2llIj9oW2NdPShoW2NdP2hbY106W10pLmNvbmNhdChbZ10pOmhbY109aFtjXT9oW2NdKyIsICIrZzpnfX0pLGh9LGlpfXZhciBzaSxpbztmdW5jdGlvbiBYZigpe2lmKGlvKXJldHVybiBzaTtpbz0xO3ZhciBkPXB0O3JldHVybiBzaT1kLmlzU3RhbmRhcmRCcm93c2VyRW52KCk/ZnVuY3Rpb24oKXt2YXIgaT0vKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLGY9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiYSIpLGg7ZnVuY3Rpb24gYyhnKXt2YXIgdj1nO3JldHVybiBpJiYoZi5zZXRBdHRyaWJ1dGUoImhyZWYiLHYpLHY9Zi5ocmVmKSxmLnNldEF0dHJpYnV0ZSgiaHJlZiIsdikse2hyZWY6Zi5ocmVmLHByb3RvY29sOmYucHJvdG9jb2w/Zi5wcm90b2NvbC5yZXBsYWNlKC86JC8sIiIpOiIiLGhvc3Q6Zi5ob3N0LHNlYXJjaDpmLnNlYXJjaD9mLnNlYXJjaC5yZXBsYWNlKC9eXD8vLCIiKToiIixoYXNoOmYuaGFzaD9mLmhhc2gucmVwbGFjZSgvXiMvLCIiKToiIixob3N0bmFtZTpmLmhvc3RuYW1lLHBvcnQ6Zi5wb3J0LHBhdGhuYW1lOmYucGF0aG5hbWUuY2hhckF0KDApPT09Ii8iP2YucGF0aG5hbWU6Ii8iK2YucGF0aG5hbWV9fXJldHVybiBoPWMod2luZG93LmxvY2F0aW9uLmhyZWYpLGZ1bmN0aW9uKHYpe3ZhciBBPWQuaXNTdHJpbmcodik/Yyh2KTp2O3JldHVybiBBLnByb3RvY29sPT09aC5wcm90b2NvbCYmQS5ob3N0PT09aC5ob3N0fX0oKTpmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiEwfX0oKSxzaX12YXIgb2ksc287ZnVuY3Rpb24gVmUoKXtpZihzbylyZXR1cm4gb2k7c289MTt2YXIgZD10ZSxyPXB0O2Z1bmN0aW9uIGkoZil7ZC5jYWxsKHRoaXMsZj09bnVsbD8iY2FuY2VsZWQiOmYsZC5FUlJfQ0FOQ0VMRUQpLHRoaXMubmFtZT0iQ2FuY2VsZWRFcnJvciJ9cmV0dXJuIHIuaW5oZXJpdHMoaSxkLHtfX0NBTkNFTF9fOiEwfSksb2k9aSxvaX12YXIgdWksb287ZnVuY3Rpb24gVmYoKXtyZXR1cm4gb298fChvbz0xLHVpPWZ1bmN0aW9uKHIpe3ZhciBpPS9eKFstK1x3XXsxLDI1fSkoOj9cL1wvfDopLy5leGVjKHIpO3JldHVybiBpJiZpWzFdfHwiIn0pLHVpfXZhciBhaSx1bztmdW5jdGlvbiBhbygpe2lmKHVvKXJldHVybiBhaTt1bz0xO3ZhciBkPXB0LHI9cWYoKSxpPUhmKCksZj1LcyxoPWVvLGM9S2YoKSxnPVhmKCksdj1RcyxBPXRlLFI9VmUoKSxNPVZmKCk7cmV0dXJuIGFpPWZ1bmN0aW9uKHcpe3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihOLGx0KXt2YXIgWD13LmRhdGEscnQ9dy5oZWFkZXJzLHd0PXcucmVzcG9uc2VUeXBlLEk7ZnVuY3Rpb24gdXQoKXt3LmNhbmNlbFRva2VuJiZ3LmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKEkpLHcuc2lnbmFsJiZ3LnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCJhYm9ydCIsSSl9ZC5pc0Zvcm1EYXRhKFgpJiZkLmlzU3RhbmRhcmRCcm93c2VyRW52KCkmJmRlbGV0ZSBydFsiQ29udGVudC1UeXBlIl07dmFyIFQ9bmV3IFhNTEh0dHBSZXF1ZXN0O2lmKHcuYXV0aCl7dmFyIEN0PXcuYXV0aC51c2VybmFtZXx8IiIsQXQ9dy5hdXRoLnBhc3N3b3JkP3VuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudCh3LmF1dGgucGFzc3dvcmQpKToiIjtydC5BdXRob3JpemF0aW9uPSJCYXNpYyAiK2J0b2EoQ3QrIjoiK0F0KX12YXIgV3Q9aCh3LmJhc2VVUkwsdy51cmwpO1Qub3Blbih3Lm1ldGhvZC50b1VwcGVyQ2FzZSgpLGYoV3Qsdy5wYXJhbXMsdy5wYXJhbXNTZXJpYWxpemVyKSwhMCksVC50aW1lb3V0PXcudGltZW91dDtmdW5jdGlvbiBndCgpe2lmKCEhVCl7dmFyIGF0PSJnZXRBbGxSZXNwb25zZUhlYWRlcnMiaW4gVD9jKFQuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpOm51bGwsc249IXd0fHx3dD09PSJ0ZXh0Inx8d3Q9PT0ianNvbiI/VC5yZXNwb25zZVRleHQ6VC5yZXNwb25zZSxadD17ZGF0YTpzbixzdGF0dXM6VC5zdGF0dXMsc3RhdHVzVGV4dDpULnN0YXR1c1RleHQsaGVhZGVyczphdCxjb25maWc6dyxyZXF1ZXN0OlR9O3IoZnVuY3Rpb24oYmUpe04oYmUpLHV0KCl9LGZ1bmN0aW9uKGJlKXtsdChiZSksdXQoKX0sWnQpLFQ9bnVsbH19aWYoIm9ubG9hZGVuZCJpbiBUP1Qub25sb2FkZW5kPWd0OlQub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7IVR8fFQucmVhZHlTdGF0ZSE9PTR8fFQuc3RhdHVzPT09MCYmIShULnJlc3BvbnNlVVJMJiZULnJlc3BvbnNlVVJMLmluZGV4T2YoImZpbGU6Iik9PT0wKXx8c2V0VGltZW91dChndCl9LFQub25hYm9ydD1mdW5jdGlvbigpeyFUfHwobHQobmV3IEEoIlJlcXVlc3QgYWJvcnRlZCIsQS5FQ09OTkFCT1JURUQsdyxUKSksVD1udWxsKX0sVC5vbmVycm9yPWZ1bmN0aW9uKCl7bHQobmV3IEEoIk5ldHdvcmsgRXJyb3IiLEEuRVJSX05FVFdPUkssdyxULFQpKSxUPW51bGx9LFQub250aW1lb3V0PWZ1bmN0aW9uKCl7dmFyIHNuPXcudGltZW91dD8idGltZW91dCBvZiAiK3cudGltZW91dCsibXMgZXhjZWVkZWQiOiJ0aW1lb3V0IGV4Y2VlZGVkIixadD13LnRyYW5zaXRpb25hbHx8djt3LnRpbWVvdXRFcnJvck1lc3NhZ2UmJihzbj13LnRpbWVvdXRFcnJvck1lc3NhZ2UpLGx0KG5ldyBBKHNuLFp0LmNsYXJpZnlUaW1lb3V0RXJyb3I/QS5FVElNRURPVVQ6QS5FQ09OTkFCT1JURUQsdyxUKSksVD1udWxsfSxkLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpe3ZhciBNbj0ody53aXRoQ3JlZGVudGlhbHN8fGcoV3QpKSYmdy54c3JmQ29va2llTmFtZT9pLnJlYWQody54c3JmQ29va2llTmFtZSk6dm9pZCAwO01uJiYocnRbdy54c3JmSGVhZGVyTmFtZV09TW4pfSJzZXRSZXF1ZXN0SGVhZGVyImluIFQmJmQuZm9yRWFjaChydCxmdW5jdGlvbihzbixadCl7dHlwZW9mIFg+InUiJiZadC50b0xvd2VyQ2FzZSgpPT09ImNvbnRlbnQtdHlwZSI/ZGVsZXRlIHJ0W1p0XTpULnNldFJlcXVlc3RIZWFkZXIoWnQsc24pfSksZC5pc1VuZGVmaW5lZCh3LndpdGhDcmVkZW50aWFscyl8fChULndpdGhDcmVkZW50aWFscz0hIXcud2l0aENyZWRlbnRpYWxzKSx3dCYmd3QhPT0ianNvbiImJihULnJlc3BvbnNlVHlwZT13LnJlc3BvbnNlVHlwZSksdHlwZW9mIHcub25Eb3dubG9hZFByb2dyZXNzPT0iZnVuY3Rpb24iJiZULmFkZEV2ZW50TGlzdGVuZXIoInByb2dyZXNzIix3Lm9uRG93bmxvYWRQcm9ncmVzcyksdHlwZW9mIHcub25VcGxvYWRQcm9ncmVzcz09ImZ1bmN0aW9uIiYmVC51cGxvYWQmJlQudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoInByb2dyZXNzIix3Lm9uVXBsb2FkUHJvZ3Jlc3MpLCh3LmNhbmNlbFRva2VufHx3LnNpZ25hbCkmJihJPWZ1bmN0aW9uKGF0KXshVHx8KGx0KCFhdHx8YXQmJmF0LnR5cGU/bmV3IFI6YXQpLFQuYWJvcnQoKSxUPW51bGwpfSx3LmNhbmNlbFRva2VuJiZ3LmNhbmNlbFRva2VuLnN1YnNjcmliZShJKSx3LnNpZ25hbCYmKHcuc2lnbmFsLmFib3J0ZWQ/SSgpOncuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoImFib3J0IixJKSkpLFh8fChYPW51bGwpO3ZhciBSbj1NKFd0KTtpZihSbiYmWyJodHRwIiwiaHR0cHMiLCJmaWxlIl0uaW5kZXhPZihSbik9PT0tMSl7bHQobmV3IEEoIlVuc3VwcG9ydGVkIHByb3RvY29sICIrUm4rIjoiLEEuRVJSX0JBRF9SRVFVRVNULHcpKTtyZXR1cm59VC5zZW5kKFgpfSl9LGFpfXZhciBmaSxmbztmdW5jdGlvbiBKZigpe3JldHVybiBmb3x8KGZvPTEsZmk9bnVsbCksZml9dmFyIGN0PXB0LGhvPVdmLGNvPXRlLFFmPVFzLGpmPWpzLHRoPXsiQ29udGVudC1UeXBlIjoiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIn07ZnVuY3Rpb24gbG8oZCxyKXshY3QuaXNVbmRlZmluZWQoZCkmJmN0LmlzVW5kZWZpbmVkKGRbIkNvbnRlbnQtVHlwZSJdKSYmKGRbIkNvbnRlbnQtVHlwZSJdPXIpfWZ1bmN0aW9uIG5oKCl7dmFyIGQ7cmV0dXJuKHR5cGVvZiBYTUxIdHRwUmVxdWVzdDwidSJ8fHR5cGVvZiBwcm9jZXNzPCJ1IiYmT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpPT09IltvYmplY3QgcHJvY2Vzc10iKSYmKGQ9YW8oKSksZH1mdW5jdGlvbiBlaChkLHIsaSl7aWYoY3QuaXNTdHJpbmcoZCkpdHJ5e3JldHVybihyfHxKU09OLnBhcnNlKShkKSxjdC50cmltKGQpfWNhdGNoKGYpe2lmKGYubmFtZSE9PSJTeW50YXhFcnJvciIpdGhyb3cgZn1yZXR1cm4oaXx8SlNPTi5zdHJpbmdpZnkpKGQpfXZhciBKZT17dHJhbnNpdGlvbmFsOlFmLGFkYXB0ZXI6bmgoKSx0cmFuc2Zvcm1SZXF1ZXN0OltmdW5jdGlvbihyLGkpe2lmKGhvKGksIkFjY2VwdCIpLGhvKGksIkNvbnRlbnQtVHlwZSIpLGN0LmlzRm9ybURhdGEocil8fGN0LmlzQXJyYXlCdWZmZXIocil8fGN0LmlzQnVmZmVyKHIpfHxjdC5pc1N0cmVhbShyKXx8Y3QuaXNGaWxlKHIpfHxjdC5pc0Jsb2IocikpcmV0dXJuIHI7aWYoY3QuaXNBcnJheUJ1ZmZlclZpZXcocikpcmV0dXJuIHIuYnVmZmVyO2lmKGN0LmlzVVJMU2VhcmNoUGFyYW1zKHIpKXJldHVybiBsbyhpLCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCIpLHIudG9TdHJpbmcoKTt2YXIgZj1jdC5pc09iamVjdChyKSxoPWkmJmlbIkNvbnRlbnQtVHlwZSJdLGM7aWYoKGM9Y3QuaXNGaWxlTGlzdChyKSl8fGYmJmg9PT0ibXVsdGlwYXJ0L2Zvcm0tZGF0YSIpe3ZhciBnPXRoaXMuZW52JiZ0aGlzLmVudi5Gb3JtRGF0YTtyZXR1cm4gamYoYz97ImZpbGVzW10iOnJ9OnIsZyYmbmV3IGcpfWVsc2UgaWYoZnx8aD09PSJhcHBsaWNhdGlvbi9qc29uIilyZXR1cm4gbG8oaSwiYXBwbGljYXRpb24vanNvbiIpLGVoKHIpO3JldHVybiByfV0sdHJhbnNmb3JtUmVzcG9uc2U6W2Z1bmN0aW9uKHIpe3ZhciBpPXRoaXMudHJhbnNpdGlvbmFsfHxKZS50cmFuc2l0aW9uYWwsZj1pJiZpLnNpbGVudEpTT05QYXJzaW5nLGg9aSYmaS5mb3JjZWRKU09OUGFyc2luZyxjPSFmJiZ0aGlzLnJlc3BvbnNlVHlwZT09PSJqc29uIjtpZihjfHxoJiZjdC5pc1N0cmluZyhyKSYmci5sZW5ndGgpdHJ5e3JldHVybiBKU09OLnBhcnNlKHIpfWNhdGNoKGcpe2lmKGMpdGhyb3cgZy5uYW1lPT09IlN5bnRheEVycm9yIj9jby5mcm9tKGcsY28uRVJSX0JBRF9SRVNQT05TRSx0aGlzLG51bGwsdGhpcy5yZXNwb25zZSk6Z31yZXR1cm4gcn1dLHRpbWVvdXQ6MCx4c3JmQ29va2llTmFtZToiWFNSRi1UT0tFTiIseHNyZkhlYWRlck5hbWU6IlgtWFNSRi1UT0tFTiIsbWF4Q29udGVudExlbmd0aDotMSxtYXhCb2R5TGVuZ3RoOi0xLGVudjp7Rm9ybURhdGE6SmYoKX0sdmFsaWRhdGVTdGF0dXM6ZnVuY3Rpb24ocil7cmV0dXJuIHI+PTIwMCYmcjwzMDB9LGhlYWRlcnM6e2NvbW1vbjp7QWNjZXB0OiJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyoifX19O2N0LmZvckVhY2goWyJkZWxldGUiLCJnZXQiLCJoZWFkIl0sZnVuY3Rpb24ocil7SmUuaGVhZGVyc1tyXT17fX0pLGN0LmZvckVhY2goWyJwb3N0IiwicHV0IiwicGF0Y2giXSxmdW5jdGlvbihyKXtKZS5oZWFkZXJzW3JdPWN0Lm1lcmdlKHRoKX0pO3ZhciBoaT1KZSxyaD1wdCxpaD1oaSxzaD1mdW5jdGlvbihyLGksZil7dmFyIGg9dGhpc3x8aWg7cmV0dXJuIHJoLmZvckVhY2goZixmdW5jdGlvbihnKXtyPWcuY2FsbChoLHIsaSl9KSxyfSxjaSxwbztmdW5jdGlvbiBfbygpe3JldHVybiBwb3x8KHBvPTEsY2k9ZnVuY3Rpb24ocil7cmV0dXJuISEociYmci5fX0NBTkNFTF9fKX0pLGNpfXZhciBtbz1wdCxsaT1zaCxvaD1fbygpLHVoPWhpLGFoPVZlKCk7ZnVuY3Rpb24gZGkoZCl7aWYoZC5jYW5jZWxUb2tlbiYmZC5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCksZC5zaWduYWwmJmQuc2lnbmFsLmFib3J0ZWQpdGhyb3cgbmV3IGFofXZhciBmaD1mdW5jdGlvbihyKXtkaShyKSxyLmhlYWRlcnM9ci5oZWFkZXJzfHx7fSxyLmRhdGE9bGkuY2FsbChyLHIuZGF0YSxyLmhlYWRlcnMsci50cmFuc2Zvcm1SZXF1ZXN0KSxyLmhlYWRlcnM9bW8ubWVyZ2Uoci5oZWFkZXJzLmNvbW1vbnx8e30sci5oZWFkZXJzW3IubWV0aG9kXXx8e30sci5oZWFkZXJzKSxtby5mb3JFYWNoKFsiZGVsZXRlIiwiZ2V0IiwiaGVhZCIsInBvc3QiLCJwdXQiLCJwYXRjaCIsImNvbW1vbiJdLGZ1bmN0aW9uKGgpe2RlbGV0ZSByLmhlYWRlcnNbaF19KTt2YXIgaT1yLmFkYXB0ZXJ8fHVoLmFkYXB0ZXI7cmV0dXJuIGkocikudGhlbihmdW5jdGlvbihoKXtyZXR1cm4gZGkociksaC5kYXRhPWxpLmNhbGwocixoLmRhdGEsaC5oZWFkZXJzLHIudHJhbnNmb3JtUmVzcG9uc2UpLGh9LGZ1bmN0aW9uKGgpe3JldHVybiBvaChoKXx8KGRpKHIpLGgmJmgucmVzcG9uc2UmJihoLnJlc3BvbnNlLmRhdGE9bGkuY2FsbChyLGgucmVzcG9uc2UuZGF0YSxoLnJlc3BvbnNlLmhlYWRlcnMsci50cmFuc2Zvcm1SZXNwb25zZSkpKSxQcm9taXNlLnJlamVjdChoKX0pfSxUdD1wdCxnbz1mdW5jdGlvbihyLGkpe2k9aXx8e307dmFyIGY9e307ZnVuY3Rpb24gaChNLFMpe3JldHVybiBUdC5pc1BsYWluT2JqZWN0KE0pJiZUdC5pc1BsYWluT2JqZWN0KFMpP1R0Lm1lcmdlKE0sUyk6VHQuaXNQbGFpbk9iamVjdChTKT9UdC5tZXJnZSh7fSxTKTpUdC5pc0FycmF5KFMpP1Muc2xpY2UoKTpTfWZ1bmN0aW9uIGMoTSl7aWYoVHQuaXNVbmRlZmluZWQoaVtNXSkpe2lmKCFUdC5pc1VuZGVmaW5lZChyW01dKSlyZXR1cm4gaCh2b2lkIDAscltNXSl9ZWxzZSByZXR1cm4gaChyW01dLGlbTV0pfWZ1bmN0aW9uIGcoTSl7aWYoIVR0LmlzVW5kZWZpbmVkKGlbTV0pKXJldHVybiBoKHZvaWQgMCxpW01dKX1mdW5jdGlvbiB2KE0pe2lmKFR0LmlzVW5kZWZpbmVkKGlbTV0pKXtpZighVHQuaXNVbmRlZmluZWQocltNXSkpcmV0dXJuIGgodm9pZCAwLHJbTV0pfWVsc2UgcmV0dXJuIGgodm9pZCAwLGlbTV0pfWZ1bmN0aW9uIEEoTSl7aWYoTSBpbiBpKXJldHVybiBoKHJbTV0saVtNXSk7aWYoTSBpbiByKXJldHVybiBoKHZvaWQgMCxyW01dKX12YXIgUj17dXJsOmcsbWV0aG9kOmcsZGF0YTpnLGJhc2VVUkw6dix0cmFuc2Zvcm1SZXF1ZXN0OnYsdHJhbnNmb3JtUmVzcG9uc2U6dixwYXJhbXNTZXJpYWxpemVyOnYsdGltZW91dDp2LHRpbWVvdXRNZXNzYWdlOnYsd2l0aENyZWRlbnRpYWxzOnYsYWRhcHRlcjp2LHJlc3BvbnNlVHlwZTp2LHhzcmZDb29raWVOYW1lOnYseHNyZkhlYWRlck5hbWU6dixvblVwbG9hZFByb2dyZXNzOnYsb25Eb3dubG9hZFByb2dyZXNzOnYsZGVjb21wcmVzczp2LG1heENvbnRlbnRMZW5ndGg6dixtYXhCb2R5TGVuZ3RoOnYsYmVmb3JlUmVkaXJlY3Q6dix0cmFuc3BvcnQ6dixodHRwQWdlbnQ6dixodHRwc0FnZW50OnYsY2FuY2VsVG9rZW46dixzb2NrZXRQYXRoOnYscmVzcG9uc2VFbmNvZGluZzp2LHZhbGlkYXRlU3RhdHVzOkF9O3JldHVybiBUdC5mb3JFYWNoKE9iamVjdC5rZXlzKHIpLmNvbmNhdChPYmplY3Qua2V5cyhpKSksZnVuY3Rpb24oUyl7dmFyIHc9UltTXXx8YyxMPXcoUyk7VHQuaXNVbmRlZmluZWQoTCkmJnchPT1BfHwoZltTXT1MKX0pLGZ9LHBpLHlvO2Z1bmN0aW9uIHZvKCl7cmV0dXJuIHlvfHwoeW89MSxwaT17dmVyc2lvbjoiMC4yNy4yIn0pLHBpfXZhciBoaD12bygpLnZlcnNpb24sU249dGUsX2k9e307WyJvYmplY3QiLCJib29sZWFuIiwibnVtYmVyIiwiZnVuY3Rpb24iLCJzdHJpbmciLCJzeW1ib2wiXS5mb3JFYWNoKGZ1bmN0aW9uKGQscil7X2lbZF09ZnVuY3Rpb24oZil7cmV0dXJuIHR5cGVvZiBmPT09ZHx8ImEiKyhyPDE/Im4gIjoiICIpK2R9fSk7dmFyIHhvPXt9O19pLnRyYW5zaXRpb25hbD1mdW5jdGlvbihyLGksZil7ZnVuY3Rpb24gaChjLGcpe3JldHVybiJbQXhpb3MgdiIraGgrIl0gVHJhbnNpdGlvbmFsIG9wdGlvbiAnIitjKyInIitnKyhmPyIuICIrZjoiIil9cmV0dXJuIGZ1bmN0aW9uKGMsZyx2KXtpZihyPT09ITEpdGhyb3cgbmV3IFNuKGgoZywiIGhhcyBiZWVuIHJlbW92ZWQiKyhpPyIgaW4gIitpOiIiKSksU24uRVJSX0RFUFJFQ0FURUQpO3JldHVybiBpJiYheG9bZ10mJih4b1tnXT0hMCxjb25zb2xlLndhcm4oaChnLCIgaGFzIGJlZW4gZGVwcmVjYXRlZCBzaW5jZSB2IitpKyIgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUiKSkpLHI/cihjLGcsdik6ITB9fTtmdW5jdGlvbiBjaChkLHIsaSl7aWYodHlwZW9mIGQhPSJvYmplY3QiKXRocm93IG5ldyBTbigib3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCIsU24uRVJSX0JBRF9PUFRJT05fVkFMVUUpO2Zvcih2YXIgZj1PYmplY3Qua2V5cyhkKSxoPWYubGVuZ3RoO2gtLSA+MDspe3ZhciBjPWZbaF0sZz1yW2NdO2lmKGcpe3ZhciB2PWRbY10sQT12PT09dm9pZCAwfHxnKHYsYyxkKTtpZihBIT09ITApdGhyb3cgbmV3IFNuKCJvcHRpb24gIitjKyIgbXVzdCBiZSAiK0EsU24uRVJSX0JBRF9PUFRJT05fVkFMVUUpO2NvbnRpbnVlfWlmKGkhPT0hMCl0aHJvdyBuZXcgU24oIlVua25vd24gb3B0aW9uICIrYyxTbi5FUlJfQkFEX09QVElPTil9fXZhciBsaD17YXNzZXJ0T3B0aW9uczpjaCx2YWxpZGF0b3JzOl9pfSx3bz1wdCxkaD1LcyxBbz1OZixTbz1maCxRZT1nbyxwaD1lbyxibz1saCxuZT1iby52YWxpZGF0b3JzO2Z1bmN0aW9uIGVlKGQpe3RoaXMuZGVmYXVsdHM9ZCx0aGlzLmludGVyY2VwdG9ycz17cmVxdWVzdDpuZXcgQW8scmVzcG9uc2U6bmV3IEFvfX1lZS5wcm90b3R5cGUucmVxdWVzdD1mdW5jdGlvbihyLGkpe3R5cGVvZiByPT0ic3RyaW5nIj8oaT1pfHx7fSxpLnVybD1yKTppPXJ8fHt9LGk9UWUodGhpcy5kZWZhdWx0cyxpKSxpLm1ldGhvZD9pLm1ldGhvZD1pLm1ldGhvZC50b0xvd2VyQ2FzZSgpOnRoaXMuZGVmYXVsdHMubWV0aG9kP2kubWV0aG9kPXRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk6aS5tZXRob2Q9ImdldCI7dmFyIGY9aS50cmFuc2l0aW9uYWw7ZiE9PXZvaWQgMCYmYm8uYXNzZXJ0T3B0aW9ucyhmLHtzaWxlbnRKU09OUGFyc2luZzpuZS50cmFuc2l0aW9uYWwobmUuYm9vbGVhbiksZm9yY2VkSlNPTlBhcnNpbmc6bmUudHJhbnNpdGlvbmFsKG5lLmJvb2xlYW4pLGNsYXJpZnlUaW1lb3V0RXJyb3I6bmUudHJhbnNpdGlvbmFsKG5lLmJvb2xlYW4pfSwhMSk7dmFyIGg9W10sYz0hMDt0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24oTCl7dHlwZW9mIEwucnVuV2hlbj09ImZ1bmN0aW9uIiYmTC5ydW5XaGVuKGkpPT09ITF8fChjPWMmJkwuc3luY2hyb25vdXMsaC51bnNoaWZ0KEwuZnVsZmlsbGVkLEwucmVqZWN0ZWQpKX0pO3ZhciBnPVtdO3RoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24oTCl7Zy5wdXNoKEwuZnVsZmlsbGVkLEwucmVqZWN0ZWQpfSk7dmFyIHY7aWYoIWMpe3ZhciBBPVtTbyx2b2lkIDBdO2ZvcihBcnJheS5wcm90b3R5cGUudW5zaGlmdC5hcHBseShBLGgpLEE9QS5jb25jYXQoZyksdj1Qcm9taXNlLnJlc29sdmUoaSk7QS5sZW5ndGg7KXY9di50aGVuKEEuc2hpZnQoKSxBLnNoaWZ0KCkpO3JldHVybiB2fWZvcih2YXIgUj1pO2gubGVuZ3RoOyl7dmFyIE09aC5zaGlmdCgpLFM9aC5zaGlmdCgpO3RyeXtSPU0oUil9Y2F0Y2godyl7Uyh3KTticmVha319dHJ5e3Y9U28oUil9Y2F0Y2godyl7cmV0dXJuIFByb21pc2UucmVqZWN0KHcpfWZvcig7Zy5sZW5ndGg7KXY9di50aGVuKGcuc2hpZnQoKSxnLnNoaWZ0KCkpO3JldHVybiB2fSxlZS5wcm90b3R5cGUuZ2V0VXJpPWZ1bmN0aW9uKHIpe3I9UWUodGhpcy5kZWZhdWx0cyxyKTt2YXIgaT1waChyLmJhc2VVUkwsci51cmwpO3JldHVybiBkaChpLHIucGFyYW1zLHIucGFyYW1zU2VyaWFsaXplcil9LHdvLmZvckVhY2goWyJkZWxldGUiLCJnZXQiLCJoZWFkIiwib3B0aW9ucyJdLGZ1bmN0aW9uKHIpe2VlLnByb3RvdHlwZVtyXT1mdW5jdGlvbihpLGYpe3JldHVybiB0aGlzLnJlcXVlc3QoUWUoZnx8e30se21ldGhvZDpyLHVybDppLGRhdGE6KGZ8fHt9KS5kYXRhfSkpfX0pLHdvLmZvckVhY2goWyJwb3N0IiwicHV0IiwicGF0Y2giXSxmdW5jdGlvbihyKXtmdW5jdGlvbiBpKGYpe3JldHVybiBmdW5jdGlvbihjLGcsdil7cmV0dXJuIHRoaXMucmVxdWVzdChRZSh2fHx7fSx7bWV0aG9kOnIsaGVhZGVyczpmP3siQ29udGVudC1UeXBlIjoibXVsdGlwYXJ0L2Zvcm0tZGF0YSJ9Ont9LHVybDpjLGRhdGE6Z30pKX19ZWUucHJvdG90eXBlW3JdPWkoKSxlZS5wcm90b3R5cGVbcisiRm9ybSJdPWkoITApfSk7dmFyIF9oPWVlLG1pLEVvO2Z1bmN0aW9uIG1oKCl7aWYoRW8pcmV0dXJuIG1pO0VvPTE7dmFyIGQ9VmUoKTtmdW5jdGlvbiByKGkpe2lmKHR5cGVvZiBpIT0iZnVuY3Rpb24iKXRocm93IG5ldyBUeXBlRXJyb3IoImV4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4iKTt2YXIgZjt0aGlzLnByb21pc2U9bmV3IFByb21pc2UoZnVuY3Rpb24oZyl7Zj1nfSk7dmFyIGg9dGhpczt0aGlzLnByb21pc2UudGhlbihmdW5jdGlvbihjKXtpZighIWguX2xpc3RlbmVycyl7dmFyIGcsdj1oLl9saXN0ZW5lcnMubGVuZ3RoO2ZvcihnPTA7Zzx2O2crKyloLl9saXN0ZW5lcnNbZ10oYyk7aC5fbGlzdGVuZXJzPW51bGx9fSksdGhpcy5wcm9taXNlLnRoZW49ZnVuY3Rpb24oYyl7dmFyIGcsdj1uZXcgUHJvbWlzZShmdW5jdGlvbihBKXtoLnN1YnNjcmliZShBKSxnPUF9KS50aGVuKGMpO3JldHVybiB2LmNhbmNlbD1mdW5jdGlvbigpe2gudW5zdWJzY3JpYmUoZyl9LHZ9LGkoZnVuY3Rpb24oZyl7aC5yZWFzb258fChoLnJlYXNvbj1uZXcgZChnKSxmKGgucmVhc29uKSl9KX1yZXR1cm4gci5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZD1mdW5jdGlvbigpe2lmKHRoaXMucmVhc29uKXRocm93IHRoaXMucmVhc29ufSxyLnByb3RvdHlwZS5zdWJzY3JpYmU9ZnVuY3Rpb24oZil7aWYodGhpcy5yZWFzb24pe2YodGhpcy5yZWFzb24pO3JldHVybn10aGlzLl9saXN0ZW5lcnM/dGhpcy5fbGlzdGVuZXJzLnB1c2goZik6dGhpcy5fbGlzdGVuZXJzPVtmXX0sci5wcm90b3R5cGUudW5zdWJzY3JpYmU9ZnVuY3Rpb24oZil7aWYoISF0aGlzLl9saXN0ZW5lcnMpe3ZhciBoPXRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGYpO2ghPT0tMSYmdGhpcy5fbGlzdGVuZXJzLnNwbGljZShoLDEpfX0sci5zb3VyY2U9ZnVuY3Rpb24oKXt2YXIgZixoPW5ldyByKGZ1bmN0aW9uKGcpe2Y9Z30pO3JldHVybnt0b2tlbjpoLGNhbmNlbDpmfX0sbWk9cixtaX12YXIgZ2ksTW87ZnVuY3Rpb24gZ2goKXtyZXR1cm4gTW98fChNbz0xLGdpPWZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbihmKXtyZXR1cm4gci5hcHBseShudWxsLGYpfX0pLGdpfXZhciB5aSxSbztmdW5jdGlvbiB5aCgpe2lmKFJvKXJldHVybiB5aTtSbz0xO3ZhciBkPXB0O3JldHVybiB5aT1mdW5jdGlvbihpKXtyZXR1cm4gZC5pc09iamVjdChpKSYmaS5pc0F4aW9zRXJyb3I9PT0hMH0seWl9dmFyIHpvPXB0LHZoPUdzLGplPV9oLHhoPWdvLHdoPWhpO2Z1bmN0aW9uIExvKGQpe3ZhciByPW5ldyBqZShkKSxpPXZoKGplLnByb3RvdHlwZS5yZXF1ZXN0LHIpO3JldHVybiB6by5leHRlbmQoaSxqZS5wcm90b3R5cGUsciksem8uZXh0ZW5kKGksciksaS5jcmVhdGU9ZnVuY3Rpb24oaCl7cmV0dXJuIExvKHhoKGQsaCkpfSxpfXZhciBSdD1Mbyh3aCk7UnQuQXhpb3M9amUsUnQuQ2FuY2VsZWRFcnJvcj1WZSgpLFJ0LkNhbmNlbFRva2VuPW1oKCksUnQuaXNDYW5jZWw9X28oKSxSdC5WRVJTSU9OPXZvKCkudmVyc2lvbixSdC50b0Zvcm1EYXRhPWpzLFJ0LkF4aW9zRXJyb3I9dGUsUnQuQ2FuY2VsPVJ0LkNhbmNlbGVkRXJyb3IsUnQuYWxsPWZ1bmN0aW9uKHIpe3JldHVybiBQcm9taXNlLmFsbChyKX0sUnQuc3ByZWFkPWdoKCksUnQuaXNBeGlvc0Vycm9yPXloKCksWHIuZXhwb3J0cz1SdCxYci5leHBvcnRzLmRlZmF1bHQ9UnQsZnVuY3Rpb24oZCl7ZC5leHBvcnRzPVhyLmV4cG9ydHN9KEFuKTt2YXIgQWg9aG4oQW4uZXhwb3J0cyk7Y29uc3QgU2g9IlRhbmdsQXV0aCIseHQ9Im1ldGEiLGJoPTE7Y2xhc3MgQm97c3RhdGljIGFzeW5jIGdldERiQXN5bmMoKXtyZXR1cm4gbmV3IFByb21pc2UoKHIsaSk9Pntjb25zdCBoPShzZWxmLmluZGV4ZWREQnx8d2luZG93LmluZGV4ZWREQikub3BlbihTaCxiaCk7aC5vbmJsb2NrZWQ9Yz0+e2NvbnNvbGUuZXJyb3IoIklkYiBlcnJvcjogZGIgYmxvY2tlZCIsYyksaSgiQmxvY2tlZCIpfSxoLm9uZXJyb3I9Yz0+e2NvbnNvbGUubG9nKCJFcnJvciBvcGVuaW5nIGRiIixjKSxpKCJFcnJvciIpfSxoLm9uc3VjY2Vzcz1jPT57bGV0IGc9Yy50YXJnZXQucmVzdWx0O3IoZyl9LGgub251cGdyYWRlbmVlZGVkPWM9PntjLnRhcmdldC5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoeHQse2F1dG9JbmNyZW1lbnQ6ITF9KX19KX1zdGF0aWMgYXN5bmMgY2xlYXJTdG9yYWdlQXN5bmMoKXtjb25zdCByPWF3YWl0IHRoaXMuZ2V0RGJBc3luYygpO3JldHVybiBuZXcgUHJvbWlzZSgoaSxmKT0+e2NvbnN0IGg9ci50cmFuc2FjdGlvbihbeHRdLCJyZWFkd3JpdGUiKTtoLm9uY29tcGxldGU9KCk9PntpKCl9LGgub25lcnJvcj1nPT57Y29uc29sZS5lcnJvcigiSURCIGVycm9yIixnKSxmKGcpfTtjb25zdCBjPWgub2JqZWN0U3RvcmUoeHQpO2M9PW51bGx8fGMuY2xlYXIoKX0pfXN0YXRpYyBhc3luYyBkZWxldGVEYXRhQXN5bmMocil7Y29uc3QgaT1hd2FpdCB0aGlzLmdldERiQXN5bmMoKTtyZXR1cm4gbmV3IFByb21pc2UoZj0+e2NvbnN0IGg9aS50cmFuc2FjdGlvbihbeHRdLCJyZWFkd3JpdGUiKTtoLm9uY29tcGxldGU9KCk9PntmKCl9LGgub25lcnJvcj1nPT57Y29uc29sZS5lcnJvcigiSURCIGVycm9yIitnKSxmKCl9LGgub2JqZWN0U3RvcmUoeHQpLmRlbGV0ZShyLmlkKX0pfXN0YXRpYyBhc3luYyBnZXREYXRhTGlzdEFzeW5jKCl7bGV0IHI9YXdhaXQgdGhpcy5nZXREYkFzeW5jKCk7Y29uc3QgaT1bXTtyZXR1cm4gbmV3IFByb21pc2UoZj0+e2xldCBoPXIudHJhbnNhY3Rpb24oW3h0XSwicmVhZG9ubHkiKTtoLm9uY29tcGxldGU9KCk9PntmKGkpfTtjb25zdCBjPWgub2JqZWN0U3RvcmUoeHQpO2Mub3BlbkN1cnNvcigpLm9uc3VjY2Vzcz1nPT57Y29uc3Qgdj1nLnRhcmdldC5yZXN1bHQ7diYmKGkucHVzaCh2LnZhbHVlKSx2LmNvbnRpbnVlKCkpfX0pfXN0YXRpYyBhc3luYyBnZXREYXRhQnlLZXlzQXN5bmMocil7Y29uc3QgaT1uZXcgU2V0KHIpO2xldCBmPWF3YWl0IHRoaXMuZ2V0RGJBc3luYygpO3JldHVybiBuZXcgUHJvbWlzZShoPT57aWYoaT09bnVsbCl7aChbXSk7cmV0dXJufWNvbnN0IGM9W107bGV0IGc9Zi50cmFuc2FjdGlvbihbeHRdLCJyZWFkb25seSIpO2cub25jb21wbGV0ZT0oKT0+e30sZy5vbmVycm9yPUE9Pntjb25zb2xlLmVycm9yKCJJREIgZXJyb3IiK0EpfTtjb25zdCB2PWcub2JqZWN0U3RvcmUoeHQpO2Zvcihjb25zdCBBIGluIHIpe2NvbnN0IFI9SURCS2V5UmFuZ2Uub25seShyW0FdKTt2Lm9wZW5DdXJzb3IoUikub25zdWNjZXNzPU09Pntjb25zdCBTPU0udGFyZ2V0LnJlc3VsdDtTJiYoY1tBXT1TLnZhbHVlLGkuZGVsZXRlKHJbQV0pLGkuc2l6ZT09MD9oKGMpOlMuY29udGludWUoKSl9fX0pfXN0YXRpYyBhc3luYyBnZXREYXRhQnlLZXlBc3luYyhyKXtsZXQgaT1hd2FpdCB0aGlzLmdldERiQXN5bmMoKTtyZXR1cm4gbmV3IFByb21pc2UoZj0+e2lmKHI9PW51bGwpe2Yodm9pZCAwKTtyZXR1cm59bGV0IGgsYz1pLnRyYW5zYWN0aW9uKFt4dF0sInJlYWRvbmx5Iik7Yy5vbmNvbXBsZXRlPSgpPT57ZihoLnJlc3VsdCl9LGMub25lcnJvcj12PT57Y29uc29sZS5lcnJvcigiSURCIGVycm9yIit2KX0saD1jLm9iamVjdFN0b3JlKHh0KS5nZXQocil9KX1zdGF0aWMgYXN5bmMgc2F2ZURhdGFBc3luYyhyLGk9dm9pZCAwKXtsZXQgZj1hd2FpdCB0aGlzLmdldERiQXN5bmMoKTtyZXR1cm4gbmV3IFByb21pc2UoaD0+e2xldCBjPWYudHJhbnNhY3Rpb24oW3h0XSwicmVhZHdyaXRlIik7Yy5vbmNvbXBsZXRlPSgpPT57aCgpfTtsZXQgZz1jLm9iamVjdFN0b3JlKHh0KTtpP2cuYWRkKHIsaSk6Zy5wdXQocil9KX1zdGF0aWMgYXN5bmMgc2F2ZUJhdGNoRGF0YUFzeW5jKHI9eHQsaSxmKXtsZXQgaD1hd2FpdCB0aGlzLmdldERiQXN5bmMoKTtyZXR1cm4gbmV3IFByb21pc2UoKGMsZyk9PntsZXQgdj1oLnRyYW5zYWN0aW9uKFtyXSwicmVhZHdyaXRlIik7di5vbmVycm9yPVI9Pntjb25zb2xlLmVycm9yKCJJREIgdHJhbnNhY3Rpb24gZXJyb3IiLFIpLGcoIkVycm9yIil9LHYub25jb21wbGV0ZT0oKT0+e2MoKX0sdi5vbmFib3J0PSgpPT57ZygiQWJvcnRlZCIpLGNvbnNvbGUubG9nKCJJREIgVHJhbnNhY3Rpb24gYWJvcnRlZCIpfTtsZXQgQT12Lm9iamVjdFN0b3JlKHh0KTtmb3IobGV0IFI9MDtSPGYubGVuZ3RoO1I9UisxKUEuYWRkKGlbUl0sZltSXSl9KX19dmFyIEVoPWAvKgoKV2Vid29ya2VyIEJhY2tlbmQgZm9yIFxganMtbHptYVxgLgpUaGlzIGlzIHRoZSBNYWluIEJhY2tncm91bmQgVGFzay4KCkNvcHlyaWdodCAoYykgMjAxNyBNYXJjZWwgR3JldGVyIChodHRwOi8vZ2l0aHViLmNvbS9tZ3JldGVyKQoKUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weQpvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAiU29mdHdhcmUiKSwgdG8gZGVhbAppbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzCnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwKY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzCmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6CgpUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbgphbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS4KClRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAiQVMgSVMiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SCklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLApGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUKQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUgpMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLApPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOClRIRSBTT0ZUV0FSRS4KCiovCgoidXNlIHN0cmljdCI7CgovLyBtYXliZSBhbHJlYWR5IGV4aXN0aW5nPwovLyBzb3VyY2VzIG1pZ2h0IGJlIGpvaW5lZD8KLy92YXIgTFpNQSA9IExaTUE7CgogCgoKCgoKdmFyIExaTUEgPSBMWk1BIHx8IHt9OwoKKGZ1bmN0aW9uKExaTUEpIHsKCiJ1c2Ugc3RyaWN0IjsKCkxaTUEuT3V0V2luZG93ID0gZnVuY3Rpb24oKXsKICB0aGlzLl93aW5kb3dTaXplID0gMDsKfTsKCkxaTUEuT3V0V2luZG93LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbih3aW5kb3dTaXplKXsKICBpZiAoICghdGhpcy5fYnVmZmVyKSB8fCAodGhpcy5fd2luZG93U2l6ZSAhPT0gd2luZG93U2l6ZSkgKXsKICAgIC8vIHVzaW5nIGEgdHlwZWQgYXJyYXkgaGVyZSBnaXZlcyBhIGJpZyBib29zdCBvbiBGaXJlZm94CiAgICAvLyBub3QgbXVjaCBjaGFuZ2UgaW4gY2hyb21lIChidXQgbW9yZSBtZW1vcnkgZWZmaWNpZW50KQogICAgdGhpcy5fYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkod2luZG93U2l6ZSk7CiAgfQogIHRoaXMuX3dpbmRvd1NpemUgPSB3aW5kb3dTaXplOwogIHRoaXMuX3BvcyA9IDA7CiAgdGhpcy5fc3RyZWFtUG9zID0gMDsKfTsKCkxaTUEuT3V0V2luZG93LnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uKCl7CiAgdmFyIHNpemUgPSB0aGlzLl9wb3MgLSB0aGlzLl9zdHJlYW1Qb3M7CiAgaWYgKHNpemUgIT09IDApewogICAgaWYgKHRoaXMuX3N0cmVhbS53cml0ZUJ5dGVzKXsKICAgICAgdGhpcy5fc3RyZWFtLndyaXRlQnl0ZXModGhpcy5fYnVmZmVyLCBzaXplKTsKICAgIH0gZWxzZSB7CiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSArKyl7CiAgICAgICAgdGhpcy5fc3RyZWFtLndyaXRlQnl0ZSh0aGlzLl9idWZmZXJbaV0pOwogICAgICB9CiAgICB9CiAgICBpZiAodGhpcy5fcG9zID49IHRoaXMuX3dpbmRvd1NpemUpewogICAgICB0aGlzLl9wb3MgPSAwOwogICAgfQogICAgdGhpcy5fc3RyZWFtUG9zID0gdGhpcy5fcG9zOwogIH0KfTsKCkxaTUEuT3V0V2luZG93LnByb3RvdHlwZS5yZWxlYXNlU3RyZWFtID0gZnVuY3Rpb24oKXsKICB0aGlzLmZsdXNoKCk7CiAgdGhpcy5fc3RyZWFtID0gbnVsbDsKfTsKCkxaTUEuT3V0V2luZG93LnByb3RvdHlwZS5zZXRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pewogIHRoaXMucmVsZWFzZVN0cmVhbSgpOwogIHRoaXMuX3N0cmVhbSA9IHN0cmVhbTsKfTsKCkxaTUEuT3V0V2luZG93LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oc29saWQpewogIGlmICghc29saWQpewogICAgdGhpcy5fc3RyZWFtUG9zID0gMDsKICAgIHRoaXMuX3BvcyA9IDA7CiAgfQp9OwoKTFpNQS5PdXRXaW5kb3cucHJvdG90eXBlLmNvcHlCbG9jayA9IGZ1bmN0aW9uKGRpc3RhbmNlLCBsZW4pewogIHZhciBwb3MgPSB0aGlzLl9wb3MgLSBkaXN0YW5jZSAtIDE7CiAgaWYgKHBvcyA8IDApewogICAgcG9zICs9IHRoaXMuX3dpbmRvd1NpemU7CiAgfQogIHdoaWxlKGxlbiAtLSl7CiAgICBpZiAocG9zID49IHRoaXMuX3dpbmRvd1NpemUpewogICAgICBwb3MgPSAwOwogICAgfQogICAgdGhpcy5fYnVmZmVyW3RoaXMuX3BvcyArK10gPSB0aGlzLl9idWZmZXJbcG9zICsrXTsKICAgIGlmICh0aGlzLl9wb3MgPj0gdGhpcy5fd2luZG93U2l6ZSl7CiAgICAgIHRoaXMuZmx1c2goKTsKICAgIH0KICB9Cn07CgpMWk1BLk91dFdpbmRvdy5wcm90b3R5cGUucHV0Qnl0ZSA9IGZ1bmN0aW9uKGIpewogIHRoaXMuX2J1ZmZlclt0aGlzLl9wb3MgKytdID0gYjsKICBpZiAodGhpcy5fcG9zID49IHRoaXMuX3dpbmRvd1NpemUpewogICAgdGhpcy5mbHVzaCgpOwogIH0KfTsKCkxaTUEuT3V0V2luZG93LnByb3RvdHlwZS5nZXRCeXRlID0gZnVuY3Rpb24oZGlzdGFuY2UpewogIHZhciBwb3MgPSB0aGlzLl9wb3MgLSBkaXN0YW5jZSAtIDE7CiAgaWYgKHBvcyA8IDApewogICAgcG9zICs9IHRoaXMuX3dpbmRvd1NpemU7CiAgfQogIHJldHVybiB0aGlzLl9idWZmZXJbcG9zXTsKfTsKCkxaTUEuUmFuZ2VEZWNvZGVyID0gZnVuY3Rpb24oKXsKfTsKCkxaTUEuUmFuZ2VEZWNvZGVyLnByb3RvdHlwZS5zZXRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pewogIHRoaXMuX3N0cmVhbSA9IHN0cmVhbTsKfTsKCkxaTUEuUmFuZ2VEZWNvZGVyLnByb3RvdHlwZS5yZWxlYXNlU3RyZWFtID0gZnVuY3Rpb24oKXsKICB0aGlzLl9zdHJlYW0gPSBudWxsOwp9OwoKTFpNQS5SYW5nZURlY29kZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpewogIHZhciBpID0gNTsKCiAgdGhpcy5fY29kZSA9IDA7CiAgdGhpcy5fcmFuZ2UgPSAtMTsKCiAgd2hpbGUoaSAtLSl7CiAgICB0aGlzLl9jb2RlID0gKHRoaXMuX2NvZGUgPDwgOCkgfCB0aGlzLl9zdHJlYW0ucmVhZEJ5dGUoKTsKICB9Cn07CgpMWk1BLlJhbmdlRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlRGlyZWN0Qml0cyA9IGZ1bmN0aW9uKG51bVRvdGFsQml0cyl7CiAgdmFyIHJlc3VsdCA9IDAsIGkgPSBudW1Ub3RhbEJpdHMsIHQ7CgogIHdoaWxlKGkgLS0pewogICAgdGhpcy5fcmFuZ2UgPj4+PSAxOwogICAgdCA9ICh0aGlzLl9jb2RlIC0gdGhpcy5fcmFuZ2UpID4+PiAzMTsKICAgIHRoaXMuX2NvZGUgLT0gdGhpcy5fcmFuZ2UgJiAodCAtIDEpOwogICAgcmVzdWx0ID0gKHJlc3VsdCA8PCAxKSB8ICgxIC0gdCk7CgogICAgaWYgKCAodGhpcy5fcmFuZ2UgJiAweGZmMDAwMDAwKSA9PT0gMCl7CiAgICAgIHRoaXMuX2NvZGUgPSAodGhpcy5fY29kZSA8PCA4KSB8IHRoaXMuX3N0cmVhbS5yZWFkQnl0ZSgpOwogICAgICB0aGlzLl9yYW5nZSA8PD0gODsKICAgIH0KICB9CgogIHJldHVybiByZXN1bHQ7Cn07CgpMWk1BLlJhbmdlRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlQml0ID0gZnVuY3Rpb24ocHJvYnMsIGluZGV4KXsKICB2YXIgcHJvYiA9IHByb2JzW2luZGV4XSwKICAgICAgbmV3Qm91bmQgPSAodGhpcy5fcmFuZ2UgPj4+IDExKSAqIHByb2I7CgogIGlmICggKHRoaXMuX2NvZGUgXiAweDgwMDAwMDAwKSA8IChuZXdCb3VuZCBeIDB4ODAwMDAwMDApICl7CiAgICB0aGlzLl9yYW5nZSA9IG5ld0JvdW5kOwogICAgcHJvYnNbaW5kZXhdICs9ICgyMDQ4IC0gcHJvYikgPj4+IDU7CiAgICBpZiAoICh0aGlzLl9yYW5nZSAmIDB4ZmYwMDAwMDApID09PSAwKXsKICAgICAgdGhpcy5fY29kZSA9ICh0aGlzLl9jb2RlIDw8IDgpIHwgdGhpcy5fc3RyZWFtLnJlYWRCeXRlKCk7CiAgICAgIHRoaXMuX3JhbmdlIDw8PSA4OwogICAgfQogICAgcmV0dXJuIDA7CiAgfQoKICB0aGlzLl9yYW5nZSAtPSBuZXdCb3VuZDsKICB0aGlzLl9jb2RlIC09IG5ld0JvdW5kOwogIHByb2JzW2luZGV4XSAtPSBwcm9iID4+PiA1OwogIGlmICggKHRoaXMuX3JhbmdlICYgMHhmZjAwMDAwMCkgPT09IDApewogICAgdGhpcy5fY29kZSA9ICh0aGlzLl9jb2RlIDw8IDgpIHwgdGhpcy5fc3RyZWFtLnJlYWRCeXRlKCk7CiAgICB0aGlzLl9yYW5nZSA8PD0gODsKICB9CiAgcmV0dXJuIDE7Cn07CgpMWk1BLmluaXRCaXRNb2RlbHMgPSBmdW5jdGlvbihwcm9icywgbGVuKXsKICB3aGlsZShsZW4gLS0pewogICAgcHJvYnNbbGVuXSA9IDEwMjQ7CiAgfQp9OwoKTFpNQS5CaXRUcmVlRGVjb2RlciA9IGZ1bmN0aW9uKG51bUJpdExldmVscyl7CiAgdGhpcy5fbW9kZWxzID0gW107CiAgdGhpcy5fbnVtQml0TGV2ZWxzID0gbnVtQml0TGV2ZWxzOwp9OwoKTFpNQS5CaXRUcmVlRGVjb2Rlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7CiAgTFpNQS5pbml0Qml0TW9kZWxzKHRoaXMuX21vZGVscywgMSA8PCB0aGlzLl9udW1CaXRMZXZlbHMpOwp9OwoKTFpNQS5CaXRUcmVlRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24ocmFuZ2VEZWNvZGVyKXsKICB2YXIgbSA9IDEsIGkgPSB0aGlzLl9udW1CaXRMZXZlbHM7CgogIHdoaWxlKGkgLS0pewogICAgbSA9IChtIDw8IDEpIHwgcmFuZ2VEZWNvZGVyLmRlY29kZUJpdCh0aGlzLl9tb2RlbHMsIG0pOwogIH0KICByZXR1cm4gbSAtICgxIDw8IHRoaXMuX251bUJpdExldmVscyk7Cn07CgpMWk1BLkJpdFRyZWVEZWNvZGVyLnByb3RvdHlwZS5yZXZlcnNlRGVjb2RlID0gZnVuY3Rpb24ocmFuZ2VEZWNvZGVyKXsKICB2YXIgbSA9IDEsIHN5bWJvbCA9IDAsIGkgPSAwLCBiaXQ7CgogIGZvciAoOyBpIDwgdGhpcy5fbnVtQml0TGV2ZWxzOyArKyBpKXsKICAgIGJpdCA9IHJhbmdlRGVjb2Rlci5kZWNvZGVCaXQodGhpcy5fbW9kZWxzLCBtKTsKICAgIG0gPSAobSA8PCAxKSB8IGJpdDsKICAgIHN5bWJvbCB8PSBiaXQgPDwgaTsKICB9CiAgcmV0dXJuIHN5bWJvbDsKfTsKCkxaTUEucmV2ZXJzZURlY29kZTIgPSBmdW5jdGlvbihtb2RlbHMsIHN0YXJ0SW5kZXgsIHJhbmdlRGVjb2RlciwgbnVtQml0TGV2ZWxzKXsKICB2YXIgbSA9IDEsIHN5bWJvbCA9IDAsIGkgPSAwLCBiaXQ7CgogIGZvciAoOyBpIDwgbnVtQml0TGV2ZWxzOyArKyBpKXsKICAgIGJpdCA9IHJhbmdlRGVjb2Rlci5kZWNvZGVCaXQobW9kZWxzLCBzdGFydEluZGV4ICsgbSk7CiAgICBtID0gKG0gPDwgMSkgfCBiaXQ7CiAgICBzeW1ib2wgfD0gYml0IDw8IGk7CiAgfQogIHJldHVybiBzeW1ib2w7Cn07CgpMWk1BLkxlbkRlY29kZXIgPSBmdW5jdGlvbigpewogIHRoaXMuX2Nob2ljZSA9IFtdOwogIHRoaXMuX2xvd0NvZGVyID0gW107CiAgdGhpcy5fbWlkQ29kZXIgPSBbXTsKICB0aGlzLl9oaWdoQ29kZXIgPSBuZXcgTFpNQS5CaXRUcmVlRGVjb2Rlcig4KTsKICB0aGlzLl9udW1Qb3NTdGF0ZXMgPSAwOwp9OwoKTFpNQS5MZW5EZWNvZGVyLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbihudW1Qb3NTdGF0ZXMpewogIGZvciAoOyB0aGlzLl9udW1Qb3NTdGF0ZXMgPCBudW1Qb3NTdGF0ZXM7ICsrIHRoaXMuX251bVBvc1N0YXRlcyl7CiAgICB0aGlzLl9sb3dDb2Rlclt0aGlzLl9udW1Qb3NTdGF0ZXNdID0gbmV3IExaTUEuQml0VHJlZURlY29kZXIoMyk7CiAgICB0aGlzLl9taWRDb2Rlclt0aGlzLl9udW1Qb3NTdGF0ZXNdID0gbmV3IExaTUEuQml0VHJlZURlY29kZXIoMyk7CiAgfQp9OwoKTFpNQS5MZW5EZWNvZGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXsKICB2YXIgaSA9IHRoaXMuX251bVBvc1N0YXRlczsKICBMWk1BLmluaXRCaXRNb2RlbHModGhpcy5fY2hvaWNlLCAyKTsKICB3aGlsZShpIC0tKXsKICAgIHRoaXMuX2xvd0NvZGVyW2ldLmluaXQoKTsKICAgIHRoaXMuX21pZENvZGVyW2ldLmluaXQoKTsKICB9CiAgdGhpcy5faGlnaENvZGVyLmluaXQoKTsKfTsKCkxaTUEuTGVuRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24ocmFuZ2VEZWNvZGVyLCBwb3NTdGF0ZSl7CiAgaWYgKHJhbmdlRGVjb2Rlci5kZWNvZGVCaXQodGhpcy5fY2hvaWNlLCAwKSA9PT0gMCl7CiAgICByZXR1cm4gdGhpcy5fbG93Q29kZXJbcG9zU3RhdGVdLmRlY29kZShyYW5nZURlY29kZXIpOwogIH0KICBpZiAocmFuZ2VEZWNvZGVyLmRlY29kZUJpdCh0aGlzLl9jaG9pY2UsIDEpID09PSAwKXsKICAgIHJldHVybiA4ICsgdGhpcy5fbWlkQ29kZXJbcG9zU3RhdGVdLmRlY29kZShyYW5nZURlY29kZXIpOwogIH0KICByZXR1cm4gMTYgKyB0aGlzLl9oaWdoQ29kZXIuZGVjb2RlKHJhbmdlRGVjb2Rlcik7Cn07CgpMWk1BLkRlY29kZXIyID0gZnVuY3Rpb24oKXsKICB0aGlzLl9kZWNvZGVycyA9IFtdOwp9OwoKTFpNQS5EZWNvZGVyMi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7CiAgTFpNQS5pbml0Qml0TW9kZWxzKHRoaXMuX2RlY29kZXJzLCAweDMwMCk7Cn07CgpMWk1BLkRlY29kZXIyLnByb3RvdHlwZS5kZWNvZGVOb3JtYWwgPSBmdW5jdGlvbihyYW5nZURlY29kZXIpewogIHZhciBzeW1ib2wgPSAxOwoKICBkb3sKICAgIHN5bWJvbCA9IChzeW1ib2wgPDwgMSkgfCByYW5nZURlY29kZXIuZGVjb2RlQml0KHRoaXMuX2RlY29kZXJzLCBzeW1ib2wpOwogIH13aGlsZShzeW1ib2wgPCAweDEwMCk7CgogIHJldHVybiBzeW1ib2wgJiAweGZmOwp9OwoKTFpNQS5EZWNvZGVyMi5wcm90b3R5cGUuZGVjb2RlV2l0aE1hdGNoQnl0ZSA9IGZ1bmN0aW9uKHJhbmdlRGVjb2RlciwgbWF0Y2hCeXRlKXsKICB2YXIgc3ltYm9sID0gMSwgbWF0Y2hCaXQsIGJpdDsKCiAgZG97CiAgICBtYXRjaEJpdCA9IChtYXRjaEJ5dGUgPj4gNykgJiAxOwogICAgbWF0Y2hCeXRlIDw8PSAxOwogICAgYml0ID0gcmFuZ2VEZWNvZGVyLmRlY29kZUJpdCh0aGlzLl9kZWNvZGVycywgKCAoMSArIG1hdGNoQml0KSA8PCA4KSArIHN5bWJvbCk7CiAgICBzeW1ib2wgPSAoc3ltYm9sIDw8IDEpIHwgYml0OwogICAgaWYgKG1hdGNoQml0ICE9PSBiaXQpewogICAgICB3aGlsZShzeW1ib2wgPCAweDEwMCl7CiAgICAgICAgc3ltYm9sID0gKHN5bWJvbCA8PCAxKSB8IHJhbmdlRGVjb2Rlci5kZWNvZGVCaXQodGhpcy5fZGVjb2RlcnMsIHN5bWJvbCk7CiAgICAgIH0KICAgICAgYnJlYWs7CiAgICB9CiAgfXdoaWxlKHN5bWJvbCA8IDB4MTAwKTsKCiAgcmV0dXJuIHN5bWJvbCAmIDB4ZmY7Cn07CgpMWk1BLkxpdGVyYWxEZWNvZGVyID0gZnVuY3Rpb24oKXsKfTsKCkxaTUEuTGl0ZXJhbERlY29kZXIucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKG51bVBvc0JpdHMsIG51bVByZXZCaXRzKXsKICB2YXIgaTsKCiAgaWYgKHRoaXMuX2NvZGVycwogICAgJiYgKHRoaXMuX251bVByZXZCaXRzID09PSBudW1QcmV2Qml0cykKICAgICYmICh0aGlzLl9udW1Qb3NCaXRzID09PSBudW1Qb3NCaXRzKSApewogICAgcmV0dXJuOwogIH0KICB0aGlzLl9udW1Qb3NCaXRzID0gbnVtUG9zQml0czsKICB0aGlzLl9wb3NNYXNrID0gKDEgPDwgbnVtUG9zQml0cykgLSAxOwogIHRoaXMuX251bVByZXZCaXRzID0gbnVtUHJldkJpdHM7CgogIHRoaXMuX2NvZGVycyA9IFtdOwoKICBpID0gMSA8PCAodGhpcy5fbnVtUHJldkJpdHMgKyB0aGlzLl9udW1Qb3NCaXRzKTsKICB3aGlsZShpIC0tKXsKICAgIHRoaXMuX2NvZGVyc1tpXSA9IG5ldyBMWk1BLkRlY29kZXIyKCk7CiAgfQp9OwoKTFpNQS5MaXRlcmFsRGVjb2Rlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7CiAgdmFyIGkgPSAxIDw8ICh0aGlzLl9udW1QcmV2Qml0cyArIHRoaXMuX251bVBvc0JpdHMpOwogIHdoaWxlKGkgLS0pewogICAgdGhpcy5fY29kZXJzW2ldLmluaXQoKTsKICB9Cn07CgpMWk1BLkxpdGVyYWxEZWNvZGVyLnByb3RvdHlwZS5nZXREZWNvZGVyID0gZnVuY3Rpb24ocG9zLCBwcmV2Qnl0ZSl7CiAgcmV0dXJuIHRoaXMuX2NvZGVyc1soIChwb3MgJiB0aGlzLl9wb3NNYXNrKSA8PCB0aGlzLl9udW1QcmV2Qml0cykKICAgICsgKCAocHJldkJ5dGUgJiAweGZmKSA+Pj4gKDggLSB0aGlzLl9udW1QcmV2Qml0cykgKV07Cn07CgpMWk1BLkRlY29kZXIgPSBmdW5jdGlvbigpewogIHRoaXMuX291dFdpbmRvdyA9IG5ldyBMWk1BLk91dFdpbmRvdygpOwogIHRoaXMuX3JhbmdlRGVjb2RlciA9IG5ldyBMWk1BLlJhbmdlRGVjb2RlcigpOwogIHRoaXMuX2lzTWF0Y2hEZWNvZGVycyA9IFtdOwogIHRoaXMuX2lzUmVwRGVjb2RlcnMgPSBbXTsKICB0aGlzLl9pc1JlcEcwRGVjb2RlcnMgPSBbXTsKICB0aGlzLl9pc1JlcEcxRGVjb2RlcnMgPSBbXTsKICB0aGlzLl9pc1JlcEcyRGVjb2RlcnMgPSBbXTsKICB0aGlzLl9pc1JlcDBMb25nRGVjb2RlcnMgPSBbXTsKICB0aGlzLl9wb3NTbG90RGVjb2RlciA9IFtdOwogIHRoaXMuX3Bvc0RlY29kZXJzID0gW107CiAgdGhpcy5fcG9zQWxpZ25EZWNvZGVyID0gbmV3IExaTUEuQml0VHJlZURlY29kZXIoNCk7CiAgdGhpcy5fbGVuRGVjb2RlciA9IG5ldyBMWk1BLkxlbkRlY29kZXIoKTsKICB0aGlzLl9yZXBMZW5EZWNvZGVyID0gbmV3IExaTUEuTGVuRGVjb2RlcigpOwogIHRoaXMuX2xpdGVyYWxEZWNvZGVyID0gbmV3IExaTUEuTGl0ZXJhbERlY29kZXIoKTsKICB0aGlzLl9kaWN0aW9uYXJ5U2l6ZSA9IC0xOwogIHRoaXMuX2RpY3Rpb25hcnlTaXplQ2hlY2sgPSAtMTsKCiAgdGhpcy5fcG9zU2xvdERlY29kZXJbMF0gPSBuZXcgTFpNQS5CaXRUcmVlRGVjb2Rlcig2KTsKICB0aGlzLl9wb3NTbG90RGVjb2RlclsxXSA9IG5ldyBMWk1BLkJpdFRyZWVEZWNvZGVyKDYpOwogIHRoaXMuX3Bvc1Nsb3REZWNvZGVyWzJdID0gbmV3IExaTUEuQml0VHJlZURlY29kZXIoNik7CiAgdGhpcy5fcG9zU2xvdERlY29kZXJbM10gPSBuZXcgTFpNQS5CaXRUcmVlRGVjb2Rlcig2KTsKfTsKCkxaTUEuRGVjb2Rlci5wcm90b3R5cGUuc2V0RGljdGlvbmFyeVNpemUgPSBmdW5jdGlvbihkaWN0aW9uYXJ5U2l6ZSl7CiAgaWYgKGRpY3Rpb25hcnlTaXplIDwgMCl7CiAgICByZXR1cm4gZmFsc2U7CiAgfQogIGlmICh0aGlzLl9kaWN0aW9uYXJ5U2l6ZSAhPT0gZGljdGlvbmFyeVNpemUpewogICAgdGhpcy5fZGljdGlvbmFyeVNpemUgPSBkaWN0aW9uYXJ5U2l6ZTsKICAgIHRoaXMuX2RpY3Rpb25hcnlTaXplQ2hlY2sgPSBNYXRoLm1heCh0aGlzLl9kaWN0aW9uYXJ5U2l6ZSwgMSk7CiAgICB0aGlzLl9vdXRXaW5kb3cuY3JlYXRlKCBNYXRoLm1heCh0aGlzLl9kaWN0aW9uYXJ5U2l6ZUNoZWNrLCA0MDk2KSApOwogIH0KICByZXR1cm4gdHJ1ZTsKfTsKCkxaTUEuRGVjb2Rlci5wcm90b3R5cGUuc2V0TGNMcFBiID0gZnVuY3Rpb24obGMsIGxwLCBwYil7CiAgdmFyIG51bVBvc1N0YXRlcyA9IDEgPDwgcGI7CgogIGlmIChsYyA+IDggfHwgbHAgPiA0IHx8IHBiID4gNCl7CiAgICByZXR1cm4gZmFsc2U7CiAgfQoKICB0aGlzLl9saXRlcmFsRGVjb2Rlci5jcmVhdGUobHAsIGxjKTsKCiAgdGhpcy5fbGVuRGVjb2Rlci5jcmVhdGUobnVtUG9zU3RhdGVzKTsKICB0aGlzLl9yZXBMZW5EZWNvZGVyLmNyZWF0ZShudW1Qb3NTdGF0ZXMpOwogIHRoaXMuX3Bvc1N0YXRlTWFzayA9IG51bVBvc1N0YXRlcyAtIDE7CgogIHJldHVybiB0cnVlOwp9OwoKTFpNQS5EZWNvZGVyLnByb3RvdHlwZS5zZXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24ocHJvcHMpewogIGlmICggIXRoaXMuc2V0TGNMcFBiKHByb3BzLmxjLCBwcm9wcy5scCwgcHJvcHMucGIpICl7CiAgICB0aHJvdyBFcnJvcigiSW5jb3JyZWN0IHN0cmVhbSBwcm9wZXJ0aWVzIik7CiAgfQogIGlmICggIXRoaXMuc2V0RGljdGlvbmFyeVNpemUocHJvcHMuZGljdGlvbmFyeVNpemUpICl7CiAgICB0aHJvdyBFcnJvcigiSW52YWxpZCBkaWN0aW9uYXJ5IHNpemUiKTsKICB9Cn07CgpMWk1BLkRlY29kZXIucHJvdG90eXBlLmRlY29kZUhlYWRlciA9IGZ1bmN0aW9uKGluU3RyZWFtKXsKCiAgdmFyIHByb3BlcnRpZXMsIGxjLCBscCwgcGIsCiAgICAgIHVuY29tcHJlc3NlZFNpemUsCiAgICAgIGRpY3Rpb25hcnlTaXplOwoKICBpZiAoaW5TdHJlYW0uc2l6ZSA8IDEzKXsKICAgIHJldHVybiBmYWxzZTsKICB9CgogIC8vICstLS0tLS0tLS0tLS0rLS0tLSstLS0tKy0tLS0rLS0tLSstLSstLSstLSstLSstLSstLSstLSstLSsKICAvLyB8IFByb3BlcnRpZXMgfCAgRGljdGlvbmFyeSBTaXplICB8ICAgVW5jb21wcmVzc2VkIFNpemUgICB8CiAgLy8gKy0tLS0tLS0tLS0tLSstLS0tKy0tLS0rLS0tLSstLS0tKy0tKy0tKy0tKy0tKy0tKy0tKy0tKy0tKwoKICBwcm9wZXJ0aWVzID0gaW5TdHJlYW0ucmVhZEJ5dGUoKTsKICBsYyA9IHByb3BlcnRpZXMgJSA5OwogIHByb3BlcnRpZXMgPSB+fihwcm9wZXJ0aWVzIC8gOSk7CiAgbHAgPSBwcm9wZXJ0aWVzICUgNTsKICBwYiA9IH5+KHByb3BlcnRpZXMgLyA1KTsKCiAgZGljdGlvbmFyeVNpemUgPSBpblN0cmVhbS5yZWFkQnl0ZSgpOwogIGRpY3Rpb25hcnlTaXplIHw9IGluU3RyZWFtLnJlYWRCeXRlKCkgPDwgODsKICBkaWN0aW9uYXJ5U2l6ZSB8PSBpblN0cmVhbS5yZWFkQnl0ZSgpIDw8IDE2OwogIGRpY3Rpb25hcnlTaXplICs9IGluU3RyZWFtLnJlYWRCeXRlKCkgKiAxNjc3NzIxNjsKCiAgdW5jb21wcmVzc2VkU2l6ZSA9IGluU3RyZWFtLnJlYWRCeXRlKCk7CiAgdW5jb21wcmVzc2VkU2l6ZSB8PSBpblN0cmVhbS5yZWFkQnl0ZSgpIDw8IDg7CiAgdW5jb21wcmVzc2VkU2l6ZSB8PSBpblN0cmVhbS5yZWFkQnl0ZSgpIDw8IDE2OwogIHVuY29tcHJlc3NlZFNpemUgKz0gaW5TdHJlYW0ucmVhZEJ5dGUoKSAqIDE2Nzc3MjE2OwoKICBpblN0cmVhbS5yZWFkQnl0ZSgpOwogIGluU3RyZWFtLnJlYWRCeXRlKCk7CiAgaW5TdHJlYW0ucmVhZEJ5dGUoKTsKICBpblN0cmVhbS5yZWFkQnl0ZSgpOwoKICByZXR1cm4gewogICAgLy8gVGhlIG51bWJlciBvZiBoaWdoIGJpdHMgb2YgdGhlIHByZXZpb3VzCiAgICAvLyBieXRlIHRvIHVzZSBhcyBhIGNvbnRleHQgZm9yIGxpdGVyYWwgZW5jb2RpbmcuCiAgICBsYzogbGMsCiAgICAvLyBUaGUgbnVtYmVyIG9mIGxvdyBiaXRzIG9mIHRoZSBkaWN0aW9uYXJ5CiAgICAvLyBwb3NpdGlvbiB0byBpbmNsdWRlIGluIGxpdGVyYWxfcG9zX3N0YXRlLgogICAgbHA6IGxwLAogICAgLy8gVGhlIG51bWJlciBvZiBsb3cgYml0cyBvZiB0aGUgZGljdGlvbmFyeQogICAgLy8gcG9zaXRpb24gdG8gaW5jbHVkZSBpbiBwb3Nfc3RhdGUuCiAgICBwYjogcGIsCiAgICAvLyBEaWN0aW9uYXJ5IFNpemUgaXMgc3RvcmVkIGFzIGFuIHVuc2lnbmVkIDMyLWJpdAogICAgLy8gbGl0dGxlIGVuZGlhbiBpbnRlZ2VyLiBBbnkgMzItYml0IHZhbHVlIGlzIHBvc3NpYmxlLAogICAgLy8gYnV0IGZvciBtYXhpbXVtIHBvcnRhYmlsaXR5LCBvbmx5IHNpemVzIG9mIDJebiBhbmQKICAgIC8vIDJebiArIDJeKG4tMSkgc2hvdWxkIGJlIHVzZWQuCiAgICBkaWN0aW9uYXJ5U2l6ZTogZGljdGlvbmFyeVNpemUsCiAgICAvLyBVbmNvbXByZXNzZWQgU2l6ZSBpcyBzdG9yZWQgYXMgdW5zaWduZWQgNjQtYml0IGxpdHRsZQogICAgLy8gZW5kaWFuIGludGVnZXIuIEEgc3BlY2lhbCB2YWx1ZSBvZiAweEZGRkZfRkZGRl9GRkZGX0ZGRkYKICAgIC8vIGluZGljYXRlcyB0aGF0IFVuY29tcHJlc3NlZCBTaXplIGlzIHVua25vd24uCiAgICB1bmNvbXByZXNzZWRTaXplOiB1bmNvbXByZXNzZWRTaXplCiAgfTsKfTsKCkxaTUEuRGVjb2Rlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7CiAgdmFyIGkgPSA0OwoKICB0aGlzLl9vdXRXaW5kb3cuaW5pdChmYWxzZSk7CgogIExaTUEuaW5pdEJpdE1vZGVscyh0aGlzLl9pc01hdGNoRGVjb2RlcnMsIDE5Mik7CiAgTFpNQS5pbml0Qml0TW9kZWxzKHRoaXMuX2lzUmVwMExvbmdEZWNvZGVycywgMTkyKTsKICBMWk1BLmluaXRCaXRNb2RlbHModGhpcy5faXNSZXBEZWNvZGVycywgMTIpOwogIExaTUEuaW5pdEJpdE1vZGVscyh0aGlzLl9pc1JlcEcwRGVjb2RlcnMsIDEyKTsKICBMWk1BLmluaXRCaXRNb2RlbHModGhpcy5faXNSZXBHMURlY29kZXJzLCAxMik7CiAgTFpNQS5pbml0Qml0TW9kZWxzKHRoaXMuX2lzUmVwRzJEZWNvZGVycywgMTIpOwogIExaTUEuaW5pdEJpdE1vZGVscyh0aGlzLl9wb3NEZWNvZGVycywgMTE0KTsKCiAgdGhpcy5fbGl0ZXJhbERlY29kZXIuaW5pdCgpOwoKICB3aGlsZShpIC0tKXsKICAgIHRoaXMuX3Bvc1Nsb3REZWNvZGVyW2ldLmluaXQoKTsKICB9CgogIHRoaXMuX2xlbkRlY29kZXIuaW5pdCgpOwogIHRoaXMuX3JlcExlbkRlY29kZXIuaW5pdCgpOwogIHRoaXMuX3Bvc0FsaWduRGVjb2Rlci5pbml0KCk7CiAgdGhpcy5fcmFuZ2VEZWNvZGVyLmluaXQoKTsKfTsKCkxaTUEuRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlQm9keSA9IGZ1bmN0aW9uKGluU3RyZWFtLCBvdXRTdHJlYW0sIG1heFNpemUpewogIHZhciBzdGF0ZSA9IDAsIHJlcDAgPSAwLCByZXAxID0gMCwgcmVwMiA9IDAsIHJlcDMgPSAwLCBub3dQb3M2NCA9IDAsIHByZXZCeXRlID0gMCwKICAgICAgcG9zU3RhdGUsIGRlY29kZXIyLCBsZW4sIGRpc3RhbmNlLCBwb3NTbG90LCBudW1EaXJlY3RCaXRzOwoKICB0aGlzLl9yYW5nZURlY29kZXIuc2V0U3RyZWFtKGluU3RyZWFtKTsKICB0aGlzLl9vdXRXaW5kb3cuc2V0U3RyZWFtKG91dFN0cmVhbSk7CgogIHRoaXMuaW5pdCgpOwoKICB3aGlsZShtYXhTaXplIDwgMCB8fCBub3dQb3M2NCA8IG1heFNpemUpewogICAgcG9zU3RhdGUgPSBub3dQb3M2NCAmIHRoaXMuX3Bvc1N0YXRlTWFzazsKCiAgICBpZiAodGhpcy5fcmFuZ2VEZWNvZGVyLmRlY29kZUJpdCh0aGlzLl9pc01hdGNoRGVjb2RlcnMsIChzdGF0ZSA8PCA0KSArIHBvc1N0YXRlKSA9PT0gMCl7CiAgICAgIGRlY29kZXIyID0gdGhpcy5fbGl0ZXJhbERlY29kZXIuZ2V0RGVjb2Rlcihub3dQb3M2NCArKywgcHJldkJ5dGUpOwoKICAgICAgaWYgKHN0YXRlID49IDcpewogICAgICAgIHByZXZCeXRlID0gZGVjb2RlcjIuZGVjb2RlV2l0aE1hdGNoQnl0ZSh0aGlzLl9yYW5nZURlY29kZXIsIHRoaXMuX291dFdpbmRvdy5nZXRCeXRlKHJlcDApICk7CiAgICAgIH1lbHNlewogICAgICAgIHByZXZCeXRlID0gZGVjb2RlcjIuZGVjb2RlTm9ybWFsKHRoaXMuX3JhbmdlRGVjb2Rlcik7CiAgICAgIH0KICAgICAgdGhpcy5fb3V0V2luZG93LnB1dEJ5dGUocHJldkJ5dGUpOwoKICAgICAgc3RhdGUgPSBzdGF0ZSA8IDQ/IDA6IHN0YXRlIC0gKHN0YXRlIDwgMTA/IDM6IDYpOwoKICAgIH1lbHNlewoKICAgICAgaWYgKHRoaXMuX3JhbmdlRGVjb2Rlci5kZWNvZGVCaXQodGhpcy5faXNSZXBEZWNvZGVycywgc3RhdGUpID09PSAxKXsKICAgICAgICBsZW4gPSAwOwogICAgICAgIGlmICh0aGlzLl9yYW5nZURlY29kZXIuZGVjb2RlQml0KHRoaXMuX2lzUmVwRzBEZWNvZGVycywgc3RhdGUpID09PSAwKXsKICAgICAgICAgIGlmICh0aGlzLl9yYW5nZURlY29kZXIuZGVjb2RlQml0KHRoaXMuX2lzUmVwMExvbmdEZWNvZGVycywgKHN0YXRlIDw8IDQpICsgcG9zU3RhdGUpID09PSAwKXsKICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZSA8IDc/IDk6IDExOwogICAgICAgICAgICBsZW4gPSAxOwogICAgICAgICAgfQogICAgICAgIH1lbHNlewogICAgICAgICAgaWYgKHRoaXMuX3JhbmdlRGVjb2Rlci5kZWNvZGVCaXQodGhpcy5faXNSZXBHMURlY29kZXJzLCBzdGF0ZSkgPT09IDApewogICAgICAgICAgICBkaXN0YW5jZSA9IHJlcDE7CiAgICAgICAgICB9ZWxzZXsKICAgICAgICAgICAgaWYgKHRoaXMuX3JhbmdlRGVjb2Rlci5kZWNvZGVCaXQodGhpcy5faXNSZXBHMkRlY29kZXJzLCBzdGF0ZSkgPT09IDApewogICAgICAgICAgICAgIGRpc3RhbmNlID0gcmVwMjsKICAgICAgICAgICAgfWVsc2V7CiAgICAgICAgICAgICAgZGlzdGFuY2UgPSByZXAzOwogICAgICAgICAgICAgIHJlcDMgPSByZXAyOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJlcDIgPSByZXAxOwogICAgICAgICAgfQogICAgICAgICAgcmVwMSA9IHJlcDA7CiAgICAgICAgICByZXAwID0gZGlzdGFuY2U7CiAgICAgICAgfQogICAgICAgIGlmIChsZW4gPT09IDApewogICAgICAgICAgbGVuID0gMiArIHRoaXMuX3JlcExlbkRlY29kZXIuZGVjb2RlKHRoaXMuX3JhbmdlRGVjb2RlciwgcG9zU3RhdGUpOwogICAgICAgICAgc3RhdGUgPSBzdGF0ZSA8IDc/IDg6IDExOwogICAgICAgIH0KICAgICAgfWVsc2V7CiAgICAgICAgcmVwMyA9IHJlcDI7CiAgICAgICAgcmVwMiA9IHJlcDE7CiAgICAgICAgcmVwMSA9IHJlcDA7CgogICAgICAgIGxlbiA9IDIgKyB0aGlzLl9sZW5EZWNvZGVyLmRlY29kZSh0aGlzLl9yYW5nZURlY29kZXIsIHBvc1N0YXRlKTsKICAgICAgICBzdGF0ZSA9IHN0YXRlIDwgNz8gNzogMTA7CgogICAgICAgIHBvc1Nsb3QgPSB0aGlzLl9wb3NTbG90RGVjb2RlcltsZW4gPD0gNT8gbGVuIC0gMjogM10uZGVjb2RlKHRoaXMuX3JhbmdlRGVjb2Rlcik7CiAgICAgICAgaWYgKHBvc1Nsb3QgPj0gNCl7CgogICAgICAgICAgbnVtRGlyZWN0Qml0cyA9IChwb3NTbG90ID4+IDEpIC0gMTsKICAgICAgICAgIHJlcDAgPSAoMiB8IChwb3NTbG90ICYgMSkgKSA8PCBudW1EaXJlY3RCaXRzOwoKICAgICAgICAgIGlmIChwb3NTbG90IDwgMTQpewogICAgICAgICAgICByZXAwICs9IExaTUEucmV2ZXJzZURlY29kZTIodGhpcy5fcG9zRGVjb2RlcnMsCiAgICAgICAgICAgICAgICByZXAwIC0gcG9zU2xvdCAtIDEsIHRoaXMuX3JhbmdlRGVjb2RlciwgbnVtRGlyZWN0Qml0cyk7CiAgICAgICAgICB9ZWxzZXsKICAgICAgICAgICAgcmVwMCArPSB0aGlzLl9yYW5nZURlY29kZXIuZGVjb2RlRGlyZWN0Qml0cyhudW1EaXJlY3RCaXRzIC0gNCkgPDwgNDsKICAgICAgICAgICAgcmVwMCArPSB0aGlzLl9wb3NBbGlnbkRlY29kZXIucmV2ZXJzZURlY29kZSh0aGlzLl9yYW5nZURlY29kZXIpOwogICAgICAgICAgICBpZiAocmVwMCA8IDApewogICAgICAgICAgICAgIGlmIChyZXAwID09PSAtMSl7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgICAgICB9CiAgICAgICAgICB9CiAgICAgICAgfWVsc2V7CiAgICAgICAgICByZXAwID0gcG9zU2xvdDsKICAgICAgICB9CiAgICAgIH0KCiAgICAgIGlmIChyZXAwID49IG5vd1BvczY0IHx8IHJlcDAgPj0gdGhpcy5fZGljdGlvbmFyeVNpemVDaGVjayl7CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICB9CgogICAgICB0aGlzLl9vdXRXaW5kb3cuY29weUJsb2NrKHJlcDAsIGxlbik7CiAgICAgIG5vd1BvczY0ICs9IGxlbjsKICAgICAgcHJldkJ5dGUgPSB0aGlzLl9vdXRXaW5kb3cuZ2V0Qnl0ZSgwKTsKICAgIH0KICB9CgogIHRoaXMuX291dFdpbmRvdy5mbHVzaCgpOwogIHRoaXMuX291dFdpbmRvdy5yZWxlYXNlU3RyZWFtKCk7CiAgdGhpcy5fcmFuZ2VEZWNvZGVyLnJlbGVhc2VTdHJlYW0oKTsKCiAgcmV0dXJuIHRydWU7Cn07CgpMWk1BLkRlY29kZXIucHJvdG90eXBlLnNldERlY29kZXJQcm9wZXJ0aWVzID0gZnVuY3Rpb24ocHJvcGVydGllcyl7CiAgdmFyIHZhbHVlLCBsYywgbHAsIHBiLCBkaWN0aW9uYXJ5U2l6ZTsKCiAgaWYgKHByb3BlcnRpZXMuc2l6ZSA8IDUpewogICAgcmV0dXJuIGZhbHNlOwogIH0KCiAgdmFsdWUgPSBwcm9wZXJ0aWVzLnJlYWRCeXRlKCk7CiAgbGMgPSB2YWx1ZSAlIDk7CiAgdmFsdWUgPSB+fih2YWx1ZSAvIDkpOwogIGxwID0gdmFsdWUgJSA1OwogIHBiID0gfn4odmFsdWUgLyA1KTsKCiAgaWYgKCAhdGhpcy5zZXRMY0xwUGIobGMsIGxwLCBwYikgKXsKICAgIHJldHVybiBmYWxzZTsKICB9CgogIGRpY3Rpb25hcnlTaXplID0gcHJvcGVydGllcy5yZWFkQnl0ZSgpOwogIGRpY3Rpb25hcnlTaXplIHw9IHByb3BlcnRpZXMucmVhZEJ5dGUoKSA8PCA4OwogIGRpY3Rpb25hcnlTaXplIHw9IHByb3BlcnRpZXMucmVhZEJ5dGUoKSA8PCAxNjsKICBkaWN0aW9uYXJ5U2l6ZSArPSBwcm9wZXJ0aWVzLnJlYWRCeXRlKCkgKiAxNjc3NzIxNjsKCiAgcmV0dXJuIHRoaXMuc2V0RGljdGlvbmFyeVNpemUoZGljdGlvbmFyeVNpemUpOwp9OwoKTFpNQS5kZWNvbXByZXNzID0gZnVuY3Rpb24ocHJvcGVydGllcywgaW5TdHJlYW0sIG91dFN0cmVhbSwgb3V0U2l6ZSl7CiAgdmFyIGRlY29kZXIgPSBuZXcgTFpNQS5EZWNvZGVyKCk7CgogIGlmICggIWRlY29kZXIuc2V0RGVjb2RlclByb3BlcnRpZXMocHJvcGVydGllcykgKXsKICAgIHRocm93IEVycm9yKCJJbmNvcnJlY3QgbHptYSBzdHJlYW0gcHJvcGVydGllcyIpOwogIH0KCiAgaWYgKCAhZGVjb2Rlci5kZWNvZGVCb2R5KGluU3RyZWFtLCBvdXRTdHJlYW0sIG91dFNpemUpICl7CiAgICB0aHJvdyBFcnJvcigiRXJyb3IgaW4gbHptYSBkYXRhIHN0cmVhbSIpOwogIH0KCiAgcmV0dXJuIG91dFN0cmVhbTsKfTsKCkxaTUEuZGVjb21wcmVzc0ZpbGUgPSBmdW5jdGlvbihpblN0cmVhbSwgb3V0U3RyZWFtKXsKICAvLyB1cGdyYWRlIEFycmF5QnVmZmVyIHRvIGlucHV0IHN0cmVhbQogIGlmIChpblN0cmVhbSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7CiAgICBpblN0cmVhbSA9IG5ldyBMWk1BLmlTdHJlYW0oaW5TdHJlYW0pOwogIH0KICAvLyBvcHRpb25hbHkgY3JlYXRlIGEgbmV3IG91dHB1dCBzdHJlYW0KICBpZiAoIW91dFN0cmVhbSAmJiBMWk1BLm9TdHJlYW0pIHsKICAgIG91dFN0cmVhbSA9IG5ldyBMWk1BLm9TdHJlYW0oKTsKICB9CiAgLy8gY3JlYXRlIG1haW4gZGVjb2RlciBpbnN0YW5jZQogIHZhciBkZWNvZGVyID0gbmV3IExaTUEuRGVjb2RlcigpOwogIC8vIHJlYWQgYWxsIHRoZSBoZWFkZXIgcHJvcGVydGllcwogIHZhciBoZWFkZXIgPSBkZWNvZGVyLmRlY29kZUhlYWRlcihpblN0cmVhbSk7CiAgLy8gZ2V0IG1heGltdW0gb3V0cHV0IHNpemUgKHZlcnkgYmlnIT8pCiAgdmFyIG1heFNpemUgPSBoZWFkZXIudW5jb21wcmVzc2VkU2l6ZTsKICAvLyBzZXR1cC9pbml0IGRlY29kZXIgc3RhdGVzCiAgZGVjb2Rlci5zZXRQcm9wZXJ0aWVzKGhlYWRlcik7CiAgLy8gaW52b2tlIHRoZSBtYWluIGRlY29kZXIgZnVuY3Rpb24KICBpZiAoICFkZWNvZGVyLmRlY29kZUJvZHkoaW5TdHJlYW0sIG91dFN0cmVhbSwgbWF4U2l6ZSkgKXsKICAgIC8vIG9ubHkgZ2VuZXJpYyBlcnJvciBnaXZlbiBoZXJlCiAgICB0aHJvdyBFcnJvcigiRXJyb3IgaW4gbHptYSBkYXRhIHN0cmVhbSIpOwogIH0KICAvLyByZXR1cm4gcmVzdWx0CiAgcmV0dXJuIG91dFN0cmVhbTsKfTsKCkxaTUEuZGVjb2RlID0gTFpNQS5kZWNvbXByZXNzRmlsZTsKCn0pKExaTUEpOwoKCgoKKGZ1bmN0aW9uIChMWk1BKSB7CgoJLy8gdmVyeSBzaW1wbGUgaW4gbWVtb3J5IGlucHV0IHN0cmVhbSBjbGFzcwoJTFpNQS5pU3RyZWFtID0gZnVuY3Rpb24oYnVmZmVyKQoJewoJCS8vIGNyZWF0ZSBieXRlIGFycmF5IHZpZXcgb2YgYnVmZmVyCgkJdGhpcy5hcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7CgkJLy8gY29udmVuaWVuY2Ugc3RhdHVzIG1lbWJlcgoJCXRoaXMuc2l6ZSA9IGJ1ZmZlci5ieXRlTGVuZ3RoOwoJCS8vIHBvc2l0aW9uIHBvaW50ZXIKCQl0aGlzLm9mZnNldCA9IDA7Cgl9CgoJLy8gc2ltcGx5IHJldHVybiB0aGUgbmV4dCBieXRlIGZyb20gbWVtb3J5CglMWk1BLmlTdHJlYW0ucHJvdG90eXBlLnJlYWRCeXRlID0gZnVuY3Rpb24oKQoJewoJCS8vIGFkdmFuY2UgcG9pbnRlciBhbmQgcmV0dXJuIGJ5dGUKCQlyZXR1cm4gdGhpcy5hcnJheVt0aGlzLm9mZnNldCsrXTsKCX0KCgkvLyBvdXRwdXQgc3RyZWFtIGNvbnN0cnVjdG9yCglMWk1BLm9TdHJlYW0gPSBmdW5jdGlvbihidWZmZXJzKQoJewoJCS8vIGFnZ3JlZ2F0ZWQgc2l6ZQoJCXRoaXMuc2l6ZSA9IDA7CgkJLy8gaW5pdGlhbGl6ZSBlbXB0eQoJCXRoaXMuYnVmZmVycyA9IFtdOwoJCWJ1ZmZlcnMgPSBidWZmZXJzIHx8IFtdOwoJCS8vIG1ha2Ugc3VyZSBzaXplIG1hdGNoZXMgZGF0YQoJCWZvciAodmFyIGkgPSAwLCBMID0gYnVmZmVycy5sZW5ndGg7IGkgPCBMOyBpKyspIHsKCQkJLy8gdW53cmFwIG5lc3RlZCBvdXRwdXQgc3RyZWFtcwoJCQlpZiAoYnVmZmVyc1tpXSBpbnN0YW5jZW9mIExaTUEub1N0cmVhbSkgewoJCQkJdmFyIG9CdWZmZXJzID0gYnVmZmVyc1tpXS5idWZmZXJzOwoJCQkJZm9yICh2YXIgbiA9IDA7IG4gPCBvQnVmZmVycy5sZW5ndGg7IG4rKykgewoJCQkJCXRoaXMuYnVmZmVycy5wdXNoKGJ1ZmZlcnNbaV0uYnVmZmVyc1tuXSk7CgkJCQkJdGhpcy5zaXplICs9IGJ1ZmZlcnNbaV0uYnVmZmVyc1tuXS5sZW5ndGg7CgkJCQl9CgkJCX0gZWxzZSB7CgkJCQkvLyBzaW1wbHkgYXBwZW5kIHRoZSBvbmUgYnVmZmVyCgkJCQl0aGlzLmJ1ZmZlcnMucHVzaChidWZmZXJzW2ldKTsKCQkJCXRoaXMuc2l6ZSArPSBidWZmZXJzW2ldLmxlbmd0aDsKCQkJfQoJCX0KCX0KCgkvLyB3ZSBleHBlY3QgYSBVaW50OEFycmF5IGJ1ZmZlciBhbmQgdGhlIHNpemUgdG8gcmVhZCBmcm9tCgkvLyBjcmVhdGVzIGEgY29weSBvZiB0aGUgYnVmZmVyIGFzIG5lZWRlZCBzbyB5b3UgY2FuIHJlLXVzZSBpdAoJLy8gdGVzdHMgd2l0aCBqcy1sem1hIGhhdmUgc2hvd24gdGhhdCB0aGlzIGlzIGF0IG1vc3QgZm9yIDE2TUIKCUxaTUEub1N0cmVhbS5wcm90b3R5cGUud3JpdGVCeXRlcyA9IGZ1bmN0aW9uIHdyaXRlQnl0ZXMoYnVmZmVyLCBzaXplKQoJewoJCS8vIGNhbiB3ZSBqdXN0IHRha2UgdGhlIGZ1bGwgYnVmZmVyPwoJCS8vIG9yIGp1c3Qgc29tZSBwYXJ0IG9mIHRoZSBidWZmZXI/CgkJaWYgKHNpemUgPD0gYnVmZmVyLmJ5dGVMZW5ndGgpIHsKCQkJLy8gd2UgbmVlZCB0byBtYWtlIGEgY29weSwgYXMgdGhlIG9yaWdpbmFsCgkJCS8vIGJ1ZmZlciB3aWxsIGJlIHJlLXVzZWQuIE5vIHdheSBhcm91bmQhCgkJCXRoaXMuYnVmZmVycy5wdXNoKGJ1ZmZlci5zbGljZSgwLCBzaXplKSk7CgkJfQoJCS8vIGFzc2VydGlvbiBmb3Igb3V0IG9mIGJvdW5kYXJ5IGFjY2VzcwoJCWVsc2UgeyB0aHJvdyBFcnJvcigiQnVmZmVyIHRvbyBzbWFsbD8iKTsgfQoJCS8vIGluY3JlYXNlIGNvdW50ZXIKCQl0aGlzLnNpemUgKz0gc2l6ZTsKCX0KCgkvLyByZXR1cm4gYSBjb250aW5vdXMgVWludDhBcnJheSB3aXRoIHRoZSBmdWxsIGNvbnRlbnQKCS8vIHRoZSB0eXBlZCBhcnJheSBpcyBndWFyYW50ZWVkIHRvIGhhdmUgdG8gY29ycmVjdCBsZW5ndGgKCS8vIGFsc28gbWVhbmluZyB0aGF0IHRoZXJlIGlzIG5vIHNwYWNlIHJlbWFpbmluZyB0byBhZGQgbW9yZQoJLy8geW91IG1heSBzaG91bGQgZXhwZWN0IG1hbGxvYyBlcnJvcnMgaWYgc2l6ZSBnZXRzIGEgZmV3IDEwTUIKCS8vIGNhbGxpbmcgdGhpcyByZXBlYXRlZGx5IGFsd2F5cyByZXR1cm5zIHRoZSBzYW1lIGFycmF5IGluc3RhbmNlCgkvLyBOT1RFOiBBbiBhbHRlcm5hdGl2ZSBhcHByb2FjaCB3b3VsZCBiZSB0byB1c2UgYSBCbG9iLiBBIEJsb2IKCS8vIGNhbiBiZSBjcmVhdGVkIG91dCBvZiBhbiBhcnJheSBvZiBhcnJheSBjaHVua3MgKG91ciBidWZmZXJzKS4KCS8vIFZpYSBhIEZpbGVSZWFkZXIgd2UgY2FuIHRoZW4gY29udmVydCBpdCBiYWNrIHRvIGEgY29udGlub3VzCgkvLyBVaW50OEFycmF5LiBCdXQgdGhpcyB3b3VsZCBtYWtlIHRoaXMgbWV0aG9kIGFzeW5jIGluIG5hdHVyZSEKCUxaTUEub1N0cmVhbS5wcm90b3R5cGUudG9VaW50OEFycmF5ID0gZnVuY3Rpb24gdG9VaW50OEFycmF5KCkKCXsKCQkvLyBsb2NhbCB2YXJpYWJsZSBhY2Nlc3MKCQl2YXIgc2l6ZSA9IHRoaXMuc2l6ZSwKCQkJYnVmZmVycyA9IHRoaXMuYnVmZmVyczsKCgkJLy8gdGhlIHNpbXBsZSBjYXNlIHdpdGggb25seSBvbmUgYnVmZmVyCgkJaWYgKGJ1ZmZlcnMubGVuZ3RoID09IDEpIHsKCQkJLy8gbWFrZSBhIGNvcHkgaWYgbmVlZGVkIQoJCQlyZXR1cm4gYnVmZmVyc1swXTsKCQl9CgkJLy8gb3RoZXJ3aXNlIHdlIG5lZWQgdG8gY29uY2F0IHRoZW0gYWxsIG5vdwoJCXRyeSB7CgkJCS8vIGFsbG9jYXRlIHRoZSBjb250aW5vdXMgbWVtb3J5IGNodW5rCgkJCXZhciBjb250aW5vdXMgPSBuZXcgVWludDhBcnJheShzaXplKTsKCQkJLy8gcHJvY2VzcyBlYWNoIGJ1ZmZlciBpbiB0aGUgb3V0cHV0IHF1ZXVlCgkJCWZvciAodmFyIGkgPSAwLCBvZmZzZXQgPSAwOyBpIDwgYnVmZmVycy5sZW5ndGg7IGkrKykgewoJCQkJY29udGlub3VzLnNldChidWZmZXJzW2ldLCBvZmZzZXQpOwoJCQkJb2Zmc2V0ICs9IGJ1ZmZlcnNbaV0ubGVuZ3RoOwoJCQl9CgkJCS8vIHJlbGVhc2UgbWVtb3J5IGNodW5rcwoJCQlidWZmZXJzWzBdID0gY29udGlub3VzOwoJCQkvLyBvbmx5IG9uZSBjaHVuayBsZWZ0CgkJCWJ1ZmZlcnMubGVuZ3RoID0gMTsKCQkJLy8gcmV0dXJuIHR5cGVkIGFycmF5CgkJCXJldHVybiBjb250aW5vdXM7CgkJCS8vIEFzeW5jaHJvbm91cyBhbHRlcm5hdGl2ZToKCQkJLy8gdmFyIGJsb2IgPSBuZXcgQmxvYihvdXRTdHJlYW0uYnVmZmVycyk7CgkJCS8vIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpOwoJCQkvLyByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7IC4uLiB9OwoJCQkvLyByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYik7CgkJfQoJCS8vIHByb2JhYmx5IGFsbG9jYXRpb24gZXJyb3IKCQljYXRjaCAoZXJyKSB7CgkJCS8vIHRoaXMgZXJyb3IgaXMgc29tZXdoYXQgZXhwZWN0ZWQgc28geW91IHNob3VsZCB0YWtlIGNhcmUgb2YgaXQKCQkJY29uc29sZS5lcnJvcigiRXJyb3IgYWxsb2NhdGluZyBVaW50OEFycmF5IG9mIHNpemU6ICIsIHNpemUpOwoJCQljb25zb2xlLmVycm9yKCJNZXNzYWdlIGdpdmVuIHdhczogIiwgZXJyLnRvU3RyaW5nKCkpOwoJCX0KCQkvLyBtYWxsb2MgZXJyb3IKCQlyZXR1cm4gbnVsbDsKCX0KCgkvLyBpbnZva2UgZm4gb24gZXZlcnkgVWludDhBcnJheSBpbiB0aGUgc3RyZWFtCgkvLyB1c2luZyB0aGlzIGludGVyZmFjZSBjYW4gYXZvaWQgdGhlIG5lZWQgdG8KCS8vIGNyZWF0ZSBhIGZ1bGwgY29udGlub3VzIGJ1ZmZlciBvZiB0aGUgcmVzdWx0CglMWk1BLm9TdHJlYW0ucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKQoJewoJCWZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idWZmZXJzLmxlbmd0aDsgaSsrKSB7CgkJCWZuLmNhbGwodGhpcywgdGhpcy5idWZmZXJzW2ldKTsKCQl9Cgl9CgoJLy8gcmV0dXJucyBhIHR5cGVkIGFycmF5IG9mIGNvZGVwb2ludHM7IGRlcGVuZGluZyBpZgoJLy8gVVRGOCBkZWNvZGVyIGlzIGxvYWRlZCwgd2UgdHJlYXQgdGhlIGJ5dGUgc2VxdWVuY2UKCS8vIGVpdGhlciBhcyBhbiBVVEY4IHNlcXVlbmNlIG9yIGZpeGVkIG9uZSBieXRlIGVuY29kaW5nCgkvLyB0aGUgcmVzdWx0IGNhbiB0aGVuIGJlIGNvbnZlcnRlZCBiYWNrIHRvIGEgSlMgc3RyaW5nCglMWk1BLm9TdHJlYW0ucHJvdG90eXBlLnRvQ29kZVBvaW50cyA9IGZ1bmN0aW9uIHRvQ29kZVBvaW50cygpCgl7CgkJLy8gdHJlYXQgYXMgb25lIGJ5dGUgZW5jb2RpbmcgKGkuZS4gVVMtQVNDSUkpCgkJaWYgKCFMWk1BLlVURjgpIHsgdGhpcy50b1VpbnQ4QXJyYXkoKTsgfQoJCS8vIHdlIGNvdWxkIHByb2JhYmx5IG1ha2UgdGhpcyB3b3JrIHdpdGggb3VyIGNodW5rZWQKCQkvLyBidWZmZXJzIGRpcmVjdGx5LCBidXQgdW5zdXJlIGhvdyBtdWNoIHdlIGNvdWxkIGdhaW4KCQlyZXR1cm4gTFpNQS5VVEY4LmRlY29kZSh0aGlzLnRvVWludDhBcnJheSgpKTsKCX0KCgkvLyBjb252ZXJ0IHRoZSBidWZmZXIgdG8gYSBqYXZhc2NyaXB0IHN0cmluZyBvYmplY3QKCUxaTUEub1N0cmVhbS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpCgl7CgkJdmFyIGJ1ZmZlcnMgPSB0aGlzLmJ1ZmZlcnMsIHN0cmluZyA9ICcnOwoJCS8vIG9wdGlvbmFsbHkgZ2V0IHRoZSBVVEY4IGNvZGVwb2ludHMKCQkvLyBwb3NzaWJseSBhdm9pZCBjcmVhdGluZyBhIGNvbnRpbm91cyBidWZmZXIKCQlpZiAoTFpNQS5VVEY4KSBidWZmZXJzID0gWyB0aGlzLnRvQ29kZVBvaW50cygpIF07CgkJZm9yICh2YXIgbiA9IDAsIG5MID0gYnVmZmVycy5sZW5ndGg7IG4gPCBuTDsgbisrKSB7CgkJCWZvciAodmFyIGkgPSAwLCBpTCA9IGJ1ZmZlcnNbbl0ubGVuZ3RoOyBpIDwgaUw7IGkrKykgewoJCQkJc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmZmVyc1tuXVtpXSk7CgkJCX0KCQl9CgkJcmV0dXJuIHN0cmluZzsKCX0KCn0pKExaTUEpOwoKCgoKCgoKLy8gb3B0aW9uYWwgaW1wb3J0cwovL2lmICghTFpNQSkgaW1wb3J0U2NyaXB0cygnbHptYS5qcycpOwovL2lmICghTFpNQS5vU3RyZWFtKSBpbXBvcnRTY3JpcHRzKCdsem1hLnNoaW0uanMnKTsKCm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHsKICAvLyBnZXQgYnVmZmVyIGZyb20gZGF0YQogIHZhciB3aWQgPSBlLmRhdGFbMF0sCiAgICAgIGJ1ZmZlciA9IGUuZGF0YVsxXTsKICAvLyBjcmVhdGUgdGhlIGlucHV0IHN0cmVhbSBpbnN0YW5jZQogIHZhciBpblN0cmVhbSA9IG5ldyBMWk1BLmlTdHJlYW0oYnVmZmVyKTsKICAvLyBjcmVhdGUgdGhlIG91dHB1dCBzdHJlYW0gaW5zdGFuY2UKICB2YXIgb3V0U3RyZWFtID0gbmV3IExaTUEub1N0cmVhbSgpOwogIC8vIGNhdGNoIHN0cmVhbSBlcnJvcnMKICB0cnkgewogICAgLy8gaW52b2tlIG1haW4gZGVjb21wcmVzcyBmdW5jdGlvbgogICAgTFpNQS5kZWNvbXByZXNzRmlsZShpblN0cmVhbSwgb3V0U3RyZWFtKQogICAgLy8gY3JlYXRlIGEgY29udGlub3VzIGJ5dGUgYXJyYXkKICAgIHZhciBidWZmZXJzID0gb3V0U3RyZWFtLmJ1ZmZlcnMsIHBhc3MgPSBbXTsKICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmZmVycy5sZW5ndGg7IGkrKykgewogICAgICBwYXNzW2ldID0gYnVmZmVyc1tpXS5idWZmZXI7CiAgICB9CiAgICAvLyBwYXNzIGJhY2sgdGhlIGNvbnRpbm91cyBidWZmZXIKICAgIHBvc3RNZXNzYWdlKFt3aWQsIGJ1ZmZlcnNdLCBwYXNzKTsKICB9CiAgY2F0Y2ggKGVycikgewogICAgLy8gbmVlZCB0byBjcmVhdGUgYSBwb29yIG1hbnMgY2xvbmUgYXMgbm90IHRyYW5zZmVyYWJsZQogICAgdmFyIGVycm9yID0geyBtZXNzYWdlOiBlcnIubWVzc2FnZSwgc3RhY2s6IGVyci5zdGFjayB9OwogICAgLy8gcGFzcyBiYWNrIHRoZSBjb21wbGV0ZSBlcnJvciBvYmplY3QKICAgIHBvc3RNZXNzYWdlKFt3aWQsIG51bGwsIGVycm9yXSk7CiAgfQoKfQoKcG9zdE1lc3NhZ2UoInJlYWR5Iik7CmA7Y2xhc3MgTWh7Y29uc3RydWN0b3Iocj04KXtNdCh0aGlzLCJudW1Xb3JrZXJzIik7TXQodGhpcywicXVldWUiLFtdKTtNdCh0aGlzLCJ3b3JrZXJzIixbXSk7TXQodGhpcywidXJsIik7TXQodGhpcywibGlzdGVuZXJzIixbXSk7TXQodGhpcywiaXNSZWFkeSIsITEpO010KHRoaXMsInN0YXJ0ZWQiLDApO010KHRoaXMsImlkbGUiKTtNdCh0aGlzLCJuZXh0Iik7Y29uc3QgaT1VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtFaF0se3R5cGU6ImFwcGxpY2F0aW9uL2phdmFzY3JpcHQifSkpO3RoaXMubnVtV29ya2Vycz1yLHRoaXMudXJsPWksdGhpcy5vblJlYWR5PXRoaXMub25SZWFkeS5iaW5kKHRoaXMpLHRoaXMub25SZXN1bHQ9dGhpcy5vblJlc3VsdC5iaW5kKHRoaXMpO2ZvcihsZXQgZj0wO2Y8dGhpcy5udW1Xb3JrZXJzO2YrKyl7Y29uc3QgaD1uZXcgV29ya2VyKGkpO2gub25tZXNzYWdlPXRoaXMub25SZWFkeSxoLmlkbGU9ITAsdGhpcy53b3JrZXJzLnB1c2goaCl9dGhpcy5pZGxlPXIsdGhpcy5uZXh0PTB9b25SZXN1bHQocil7Y29uc3QgaT1yLmRhdGFbMF0sZj1yLmRhdGFbMV0saD1yLmRhdGFbMl0sYz10aGlzLGc9dGhpcy50aWNrO3IuY3VycmVudFRhcmdldC5pZGxlPSEwLGMuaWRsZSsrLChjLm5leHQ9PS0xfHxjLm5leHQ+aSkmJihjLm5leHQ9aSksaD9yLmN1cnJlbnRUYXJnZXQucmVqZWN0KGgpOmY/ci5jdXJyZW50VGFyZ2V0LnJlc29sdmUoZik6ci5jdXJyZW50VGFyZ2V0LnJlamVjdChudWxsKSxyLmN1cnJlbnRUYXJnZXQucmVzb2x2ZT1udWxsLHIuY3VycmVudFRhcmdldC5yZWplY3Q9bnVsbCxnLmNhbGwodGhpcyl9b25NYW5hZ2VyUmVhZHkoKXtjb25zdCByPXRoaXMubGlzdGVuZXJzO2Zvcig7ci5sZW5ndGg7KXIuc2hpZnQoKS5jYWxsKHRoaXMpO3RoaXMuaXNSZWFkeT0hMH1vblJlYWR5KHIpe2NvbnN0IGk9dGhpcztpZihyLmRhdGE9PT0icmVhZHkiKXIuY3VycmVudFRhcmdldC5vbm1lc3NhZ2U9dGhpcy5vblJlc3VsdCx0aGlzLmlzUmVhZHk9ITAsaS5zdGFydGVkKyssaS5zdGFydGVkPT1pLndvcmtlcnMubGVuZ3RoJiZ0aGlzLm9uTWFuYWdlclJlYWR5LmNhbGwoaSk7ZWxzZSB0aHJvdyBFcnJvcigiV29ya2VyIGRpZCBub3Qgc3RhcnR1cCE/Iil9dGVybWluYXRlKCl7Zm9yKGNvbnN0IHIgb2YgdGhpcy53b3JrZXJzKXIudGVybWluYXRlKCl9dGljaygpe2Zvcig7dGhpcy5xdWV1ZS5sZW5ndGgmJnRoaXMuaWRsZTspe2NvbnN0IHI9dGhpcy5uZXh0LGk9dGhpcy5xdWV1ZS5zaGlmdCgpO3R5cGVvZiBpWzBdPT0iZnVuY3Rpb24iJiYoaVswXT1pWzBdLmNhbGwodGhpcykpO2NvbnN0IGY9dGhpcy53b3JrZXJzW3JdO2lmKCFmKWRlYnVnZ2VyO2YucG9zdE1lc3NhZ2UoW3IsaVswXV0sW2lbMF1dKSxmLnJlc29sdmU9aVsxXSxmLnJlamVjdD1pWzJdLGYuaWRsZT0hMSx0aGlzLmlkbGUtPTE7Zm9yKGxldCBoPXI7aDx0aGlzLndvcmtlcnMubGVuZ3RoO2grKylpZih0aGlzLndvcmtlcnNbaF0uaWRsZSl7dGhpcy5uZXh0PWg7cmV0dXJufXRoaXMubmV4dD0tMX19bWVyZ2VEZWNvZGVkQnVmZmVycyhyKXtsZXQgaT0wO3IuZm9yRWFjaChoPT57aT1pK2gubGVuZ3RofSk7Y29uc3QgZj1uZXcgVWludDhBcnJheShpKTtmb3IobGV0IGg9MCxjPTA7aDxyLmxlbmd0aDtoKyspZi5zZXQocltoXSxjKSxjKz1yW2hdLmxlbmd0aDtyZXR1cm4gVWludDhBcnJheS5mcm9tKGYpfWFzeW5jIGRlY29tcHJlc3Mocil7Y29uc3QgaT1hd2FpdCB0aGlzLmRlY29kZShyKTtyZXR1cm4gdGhpcy5tZXJnZURlY29kZWRCdWZmZXJzKGkpfWFzeW5jIGRlY29kZShyKXtjb25zdCBpPXRoaXMucXVldWUsZj10aGlzLnRpY2ssaD10aGlzO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihjLGcpe2kucHVzaChbci5idWZmZXIsYyxnXSksZi5jYWxsKGgpfSl9fXZhciByZT17ZXhwb3J0czp7fX07LyoqCiAqIEBsaWNlbnNlCiAqIExvZGFzaCA8aHR0cHM6Ly9sb2Rhc2guY29tLz4KICogQ29weXJpZ2h0IE9wZW5KUyBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vb3BlbmpzZi5vcmcvPgogKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+CiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+CiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9ycwogKi8oZnVuY3Rpb24oZCxyKXsoZnVuY3Rpb24oKXt2YXIgaSxmPSI0LjE3LjIxIixoPTIwMCxjPSJVbnN1cHBvcnRlZCBjb3JlLWpzIHVzZS4gVHJ5IGh0dHBzOi8vbnBtcy5pby9zZWFyY2g/cT1wb255ZmlsbC4iLGc9IkV4cGVjdGVkIGEgZnVuY3Rpb24iLHY9IkludmFsaWQgYHZhcmlhYmxlYCBvcHRpb24gcGFzc2VkIGludG8gYF8udGVtcGxhdGVgIixBPSJfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fIixSPTUwMCxNPSJfX2xvZGFzaF9wbGFjZWhvbGRlcl9fIixTPTEsdz0yLEw9NCxOPTEsbHQ9MixYPTEscnQ9Mix3dD00LEk9OCx1dD0xNixUPTMyLEN0PTY0LEF0PTEyOCxXdD0yNTYsZ3Q9NTEyLE1uPTMwLFJuPSIuLi4iLGF0PTgwMCxzbj0xNixadD0xLEFpPTIsYmU9Myxxbj0xLzAsem49OTAwNzE5OTI1NDc0MDk5MSxCaD0xNzk3NjkzMTM0ODYyMzE1N2UyOTIsZXI9MC8wLG9uPTQyOTQ5NjcyOTUsRGg9b24tMSxUaD1vbj4+PjEsQ2g9W1siYXJ5IixBdF0sWyJiaW5kIixYXSxbImJpbmRLZXkiLHJ0XSxbImN1cnJ5IixJXSxbImN1cnJ5UmlnaHQiLHV0XSxbImZsaXAiLGd0XSxbInBhcnRpYWwiLFRdLFsicGFydGlhbFJpZ2h0IixDdF0sWyJyZWFyZyIsV3RdXSx1ZT0iW29iamVjdCBBcmd1bWVudHNdIixycj0iW29iamVjdCBBcnJheV0iLEloPSJbb2JqZWN0IEFzeW5jRnVuY3Rpb25dIixFZT0iW29iamVjdCBCb29sZWFuXSIsTWU9IltvYmplY3QgRGF0ZV0iLE9oPSJbb2JqZWN0IERPTUV4Y2VwdGlvbl0iLGlyPSJbb2JqZWN0IEVycm9yXSIsc3I9IltvYmplY3QgRnVuY3Rpb25dIixObz0iW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0iLFF0PSJbb2JqZWN0IE1hcF0iLFJlPSJbb2JqZWN0IE51bWJlcl0iLFBoPSJbb2JqZWN0IE51bGxdIixsbj0iW29iamVjdCBPYmplY3RdIixVbz0iW29iamVjdCBQcm9taXNlXSIsRmg9IltvYmplY3QgUHJveHldIix6ZT0iW29iamVjdCBSZWdFeHBdIixqdD0iW29iamVjdCBTZXRdIixMZT0iW29iamVjdCBTdHJpbmddIixvcj0iW29iamVjdCBTeW1ib2xdIixOaD0iW29iamVjdCBVbmRlZmluZWRdIixCZT0iW29iamVjdCBXZWFrTWFwXSIsVWg9IltvYmplY3QgV2Vha1NldF0iLERlPSJbb2JqZWN0IEFycmF5QnVmZmVyXSIsYWU9IltvYmplY3QgRGF0YVZpZXddIixTaT0iW29iamVjdCBGbG9hdDMyQXJyYXldIixiaT0iW29iamVjdCBGbG9hdDY0QXJyYXldIixFaT0iW29iamVjdCBJbnQ4QXJyYXldIixNaT0iW29iamVjdCBJbnQxNkFycmF5XSIsUmk9IltvYmplY3QgSW50MzJBcnJheV0iLHppPSJbb2JqZWN0IFVpbnQ4QXJyYXldIixMaT0iW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0iLEJpPSJbb2JqZWN0IFVpbnQxNkFycmF5XSIsRGk9IltvYmplY3QgVWludDMyQXJyYXldIixXaD0vXGJfX3AgXCs9ICcnOy9nLFpoPS9cYihfX3AgXCs9KSAnJyBcKy9nLHFoPS8oX19lXCguKj9cKXxcYl9fdFwpKSBcK1xuJyc7L2csV289LyYoPzphbXB8bHR8Z3R8cXVvdHwjMzkpOy9nLFpvPS9bJjw+IiddL2csSGg9UmVnRXhwKFdvLnNvdXJjZSksR2g9UmVnRXhwKFpvLnNvdXJjZSksJGg9LzwlLShbXHNcU10rPyklPi9nLGtoPS88JShbXHNcU10rPyklPi9nLHFvPS88JT0oW1xzXFNdKz8pJT4vZyxZaD0vXC58XFsoPzpbXltcXV0qfChbIiddKSg/Oig/IVwxKVteXFxdfFxcLikqP1wxKVxdLyxLaD0vXlx3KiQvLFhoPS9bXi5bXF1dK3xcWyg/OigtP1xkKyg/OlwuXGQrKT8pfChbIiddKSgoPzooPyFcMilbXlxcXXxcXC4pKj8pXDIpXF18KD89KD86XC58XFtcXSkoPzpcLnxcW1xdfCQpKS9nLFRpPS9bXFxeJC4qKz8oKVtcXXt9fF0vZyxWaD1SZWdFeHAoVGkuc291cmNlKSxDaT0vXlxzKy8sSmg9L1xzLyxRaD0vXHsoPzpcblwvXCogXFt3cmFwcGVkIHdpdGggLitcXSBcKlwvKT9cbj8vLGpoPS9ce1xuXC9cKiBcW3dyYXBwZWQgd2l0aCAoLispXF0gXCovLHRjPS8sPyAmIC8sbmM9L1teXHgwMC1ceDJmXHgzYS1ceDQwXHg1Yi1ceDYwXHg3Yi1ceDdmXSsvZyxlYz0vWygpPSx7fVxbXF1cL1xzXS8scmM9L1xcKFxcKT8vZyxpYz0vXCRceyhbXlxcfV0qKD86XFwuW15cXH1dKikqKVx9L2csSG89L1x3KiQvLHNjPS9eWy0rXTB4WzAtOWEtZl0rJC9pLG9jPS9eMGJbMDFdKyQvaSx1Yz0vXlxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXF0kLyxhYz0vXjBvWzAtN10rJC9pLGZjPS9eKD86MHxbMS05XVxkKikkLyxoYz0vW1x4YzAtXHhkNlx4ZDgtXHhmNlx4ZjgtXHhmZlx1MDEwMC1cdTAxN2ZdL2csdXI9LygkXikvLGNjPS9bJ1xuXHJcdTIwMjhcdTIwMjlcXF0vZyxhcj0iXFx1ZDgwMC1cXHVkZmZmIixsYz0iXFx1MDMwMC1cXHUwMzZmIixkYz0iXFx1ZmUyMC1cXHVmZTJmIixwYz0iXFx1MjBkMC1cXHUyMGZmIixHbz1sYytkYytwYywkbz0iXFx1MjcwMC1cXHUyN2JmIixrbz0iYS16XFx4ZGYtXFx4ZjZcXHhmOC1cXHhmZiIsX2M9IlxceGFjXFx4YjFcXHhkN1xceGY3IixtYz0iXFx4MDAtXFx4MmZcXHgzYS1cXHg0MFxceDViLVxceDYwXFx4N2ItXFx4YmYiLGdjPSJcXHUyMDAwLVxcdTIwNmYiLHljPSIgXFx0XFx4MGJcXGZcXHhhMFxcdWZlZmZcXG5cXHJcXHUyMDI4XFx1MjAyOVxcdTE2ODBcXHUxODBlXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMGFcXHUyMDJmXFx1MjA1ZlxcdTMwMDAiLFlvPSJBLVpcXHhjMC1cXHhkNlxceGQ4LVxceGRlIixLbz0iXFx1ZmUwZVxcdWZlMGYiLFhvPV9jK21jK2djK3ljLElpPSJbJ1x1MjAxOV0iLHZjPSJbIithcisiXSIsVm89IlsiK1hvKyJdIixmcj0iWyIrR28rIl0iLEpvPSJcXGQrIix4Yz0iWyIrJG8rIl0iLFFvPSJbIitrbysiXSIsam89IlteIithcitYbytKbyskbytrbytZbysiXSIsT2k9IlxcdWQ4M2NbXFx1ZGZmYi1cXHVkZmZmXSIsd2M9Iig/OiIrZnIrInwiK09pKyIpIix0dT0iW14iK2FyKyJdIixQaT0iKD86XFx1ZDgzY1tcXHVkZGU2LVxcdWRkZmZdKXsyfSIsRmk9IltcXHVkODAwLVxcdWRiZmZdW1xcdWRjMDAtXFx1ZGZmZl0iLGZlPSJbIitZbysiXSIsbnU9IlxcdTIwMGQiLGV1PSIoPzoiK1FvKyJ8IitqbysiKSIsQWM9Iig/OiIrZmUrInwiK2pvKyIpIixydT0iKD86IitJaSsiKD86ZHxsbHxtfHJlfHN8dHx2ZSkpPyIsaXU9Iig/OiIrSWkrIig/OkR8TEx8TXxSRXxTfFR8VkUpKT8iLHN1PXdjKyI/IixvdT0iWyIrS28rIl0/IixTYz0iKD86IitudSsiKD86IitbdHUsUGksRmldLmpvaW4oInwiKSsiKSIrb3Urc3UrIikqIixiYz0iXFxkKig/OjFzdHwybmR8M3JkfCg/IVsxMjNdKVxcZHRoKSg/PVxcYnxbQS1aX10pIixFYz0iXFxkKig/OjFTVHwyTkR8M1JEfCg/IVsxMjNdKVxcZFRIKSg/PVxcYnxbYS16X10pIix1dT1vdStzdStTYyxNYz0iKD86IitbeGMsUGksRmldLmpvaW4oInwiKSsiKSIrdXUsUmM9Iig/OiIrW3R1K2ZyKyI/IixmcixQaSxGaSx2Y10uam9pbigifCIpKyIpIix6Yz1SZWdFeHAoSWksImciKSxMYz1SZWdFeHAoZnIsImciKSxOaT1SZWdFeHAoT2krIig/PSIrT2krIil8IitSYyt1dSwiZyIpLEJjPVJlZ0V4cChbZmUrIj8iK1FvKyIrIitydSsiKD89IitbVm8sZmUsIiQiXS5qb2luKCJ8IikrIikiLEFjKyIrIitpdSsiKD89IitbVm8sZmUrZXUsIiQiXS5qb2luKCJ8IikrIikiLGZlKyI/IitldSsiKyIrcnUsZmUrIisiK2l1LEVjLGJjLEpvLE1jXS5qb2luKCJ8IiksImciKSxEYz1SZWdFeHAoIlsiK251K2FyK0dvK0tvKyJdIiksVGM9L1thLXpdW0EtWl18W0EtWl17Mn1bYS16XXxbMC05XVthLXpBLVpdfFthLXpBLVpdWzAtOV18W15hLXpBLVowLTkgXS8sQ2M9WyJBcnJheSIsIkJ1ZmZlciIsIkRhdGFWaWV3IiwiRGF0ZSIsIkVycm9yIiwiRmxvYXQzMkFycmF5IiwiRmxvYXQ2NEFycmF5IiwiRnVuY3Rpb24iLCJJbnQ4QXJyYXkiLCJJbnQxNkFycmF5IiwiSW50MzJBcnJheSIsIk1hcCIsIk1hdGgiLCJPYmplY3QiLCJQcm9taXNlIiwiUmVnRXhwIiwiU2V0IiwiU3RyaW5nIiwiU3ltYm9sIiwiVHlwZUVycm9yIiwiVWludDhBcnJheSIsIlVpbnQ4Q2xhbXBlZEFycmF5IiwiVWludDE2QXJyYXkiLCJVaW50MzJBcnJheSIsIldlYWtNYXAiLCJfIiwiY2xlYXJUaW1lb3V0IiwiaXNGaW5pdGUiLCJwYXJzZUludCIsInNldFRpbWVvdXQiXSxJYz0tMSxqPXt9O2pbU2ldPWpbYmldPWpbRWldPWpbTWldPWpbUmldPWpbemldPWpbTGldPWpbQmldPWpbRGldPSEwLGpbdWVdPWpbcnJdPWpbRGVdPWpbRWVdPWpbYWVdPWpbTWVdPWpbaXJdPWpbc3JdPWpbUXRdPWpbUmVdPWpbbG5dPWpbemVdPWpbanRdPWpbTGVdPWpbQmVdPSExO3ZhciBRPXt9O1FbdWVdPVFbcnJdPVFbRGVdPVFbYWVdPVFbRWVdPVFbTWVdPVFbU2ldPVFbYmldPVFbRWldPVFbTWldPVFbUmldPVFbUXRdPVFbUmVdPVFbbG5dPVFbemVdPVFbanRdPVFbTGVdPVFbb3JdPVFbemldPVFbTGldPVFbQmldPVFbRGldPSEwLFFbaXJdPVFbc3JdPVFbQmVdPSExO3ZhciBPYz17XHUwMEMwOiJBIixcdTAwQzE6IkEiLFx1MDBDMjoiQSIsXHUwMEMzOiJBIixcdTAwQzQ6IkEiLFx1MDBDNToiQSIsXHUwMEUwOiJhIixcdTAwRTE6ImEiLFx1MDBFMjoiYSIsXHUwMEUzOiJhIixcdTAwRTQ6ImEiLFx1MDBFNToiYSIsXHUwMEM3OiJDIixcdTAwRTc6ImMiLFx1MDBEMDoiRCIsXHUwMEYwOiJkIixcdTAwQzg6IkUiLFx1MDBDOToiRSIsXHUwMENBOiJFIixcdTAwQ0I6IkUiLFx1MDBFODoiZSIsXHUwMEU5OiJlIixcdTAwRUE6ImUiLFx1MDBFQjoiZSIsXHUwMENDOiJJIixcdTAwQ0Q6IkkiLFx1MDBDRToiSSIsXHUwMENGOiJJIixcdTAwRUM6ImkiLFx1MDBFRDoiaSIsXHUwMEVFOiJpIixcdTAwRUY6ImkiLFx1MDBEMToiTiIsXHUwMEYxOiJuIixcdTAwRDI6Ik8iLFx1MDBEMzoiTyIsXHUwMEQ0OiJPIixcdTAwRDU6Ik8iLFx1MDBENjoiTyIsXHUwMEQ4OiJPIixcdTAwRjI6Im8iLFx1MDBGMzoibyIsXHUwMEY0OiJvIixcdTAwRjU6Im8iLFx1MDBGNjoibyIsXHUwMEY4OiJvIixcdTAwRDk6IlUiLFx1MDBEQToiVSIsXHUwMERCOiJVIixcdTAwREM6IlUiLFx1MDBGOToidSIsXHUwMEZBOiJ1IixcdTAwRkI6InUiLFx1MDBGQzoidSIsXHUwMEREOiJZIixcdTAwRkQ6InkiLFx1MDBGRjoieSIsXHUwMEM2OiJBZSIsXHUwMEU2OiJhZSIsXHUwMERFOiJUaCIsXHUwMEZFOiJ0aCIsXHUwMERGOiJzcyIsXHUwMTAwOiJBIixcdTAxMDI6IkEiLFx1MDEwNDoiQSIsXHUwMTAxOiJhIixcdTAxMDM6ImEiLFx1MDEwNToiYSIsXHUwMTA2OiJDIixcdTAxMDg6IkMiLFx1MDEwQToiQyIsXHUwMTBDOiJDIixcdTAxMDc6ImMiLFx1MDEwOToiYyIsXHUwMTBCOiJjIixcdTAxMEQ6ImMiLFx1MDEwRToiRCIsXHUwMTEwOiJEIixcdTAxMEY6ImQiLFx1MDExMToiZCIsXHUwMTEyOiJFIixcdTAxMTQ6IkUiLFx1MDExNjoiRSIsXHUwMTE4OiJFIixcdTAxMUE6IkUiLFx1MDExMzoiZSIsXHUwMTE1OiJlIixcdTAxMTc6ImUiLFx1MDExOToiZSIsXHUwMTFCOiJlIixcdTAxMUM6IkciLFx1MDExRToiRyIsXHUwMTIwOiJHIixcdTAxMjI6IkciLFx1MDExRDoiZyIsXHUwMTFGOiJnIixcdTAxMjE6ImciLFx1MDEyMzoiZyIsXHUwMTI0OiJIIixcdTAxMjY6IkgiLFx1MDEyNToiaCIsXHUwMTI3OiJoIixcdTAxMjg6IkkiLFx1MDEyQToiSSIsXHUwMTJDOiJJIixcdTAxMkU6IkkiLFx1MDEzMDoiSSIsXHUwMTI5OiJpIixcdTAxMkI6ImkiLFx1MDEyRDoiaSIsXHUwMTJGOiJpIixcdTAxMzE6ImkiLFx1MDEzNDoiSiIsXHUwMTM1OiJqIixcdTAxMzY6IksiLFx1MDEzNzoiayIsXHUwMTM4OiJrIixcdTAxMzk6IkwiLFx1MDEzQjoiTCIsXHUwMTNEOiJMIixcdTAxM0Y6IkwiLFx1MDE0MToiTCIsXHUwMTNBOiJsIixcdTAxM0M6ImwiLFx1MDEzRToibCIsXHUwMTQwOiJsIixcdTAxNDI6ImwiLFx1MDE0MzoiTiIsXHUwMTQ1OiJOIixcdTAxNDc6Ik4iLFx1MDE0QToiTiIsXHUwMTQ0OiJuIixcdTAxNDY6Im4iLFx1MDE0ODoibiIsXHUwMTRCOiJuIixcdTAxNEM6Ik8iLFx1MDE0RToiTyIsXHUwMTUwOiJPIixcdTAxNEQ6Im8iLFx1MDE0RjoibyIsXHUwMTUxOiJvIixcdTAxNTQ6IlIiLFx1MDE1NjoiUiIsXHUwMTU4OiJSIixcdTAxNTU6InIiLFx1MDE1NzoiciIsXHUwMTU5OiJyIixcdTAxNUE6IlMiLFx1MDE1QzoiUyIsXHUwMTVFOiJTIixcdTAxNjA6IlMiLFx1MDE1QjoicyIsXHUwMTVEOiJzIixcdTAxNUY6InMiLFx1MDE2MToicyIsXHUwMTYyOiJUIixcdTAxNjQ6IlQiLFx1MDE2NjoiVCIsXHUwMTYzOiJ0IixcdTAxNjU6InQiLFx1MDE2NzoidCIsXHUwMTY4OiJVIixcdTAxNkE6IlUiLFx1MDE2QzoiVSIsXHUwMTZFOiJVIixcdTAxNzA6IlUiLFx1MDE3MjoiVSIsXHUwMTY5OiJ1IixcdTAxNkI6InUiLFx1MDE2RDoidSIsXHUwMTZGOiJ1IixcdTAxNzE6InUiLFx1MDE3MzoidSIsXHUwMTc0OiJXIixcdTAxNzU6InciLFx1MDE3NjoiWSIsXHUwMTc3OiJ5IixcdTAxNzg6IlkiLFx1MDE3OToiWiIsXHUwMTdCOiJaIixcdTAxN0Q6IloiLFx1MDE3QToieiIsXHUwMTdDOiJ6IixcdTAxN0U6InoiLFx1MDEzMjoiSUoiLFx1MDEzMzoiaWoiLFx1MDE1MjoiT2UiLFx1MDE1Mzoib2UiLFx1MDE0OToiJ24iLFx1MDE3RjoicyJ9LFBjPXsiJiI6IiZhbXA7IiwiPCI6IiZsdDsiLCI+IjoiJmd0OyIsJyInOiImcXVvdDsiLCInIjoiJiMzOTsifSxGYz17IiZhbXA7IjoiJiIsIiZsdDsiOiI8IiwiJmd0OyI6Ij4iLCImcXVvdDsiOiciJywiJiMzOTsiOiInIn0sTmM9eyJcXCI6IlxcIiwiJyI6IiciLCJcbiI6Im4iLCJcciI6InIiLCJcdTIwMjgiOiJ1MjAyOCIsIlx1MjAyOSI6InUyMDI5In0sVWM9cGFyc2VGbG9hdCxXYz1wYXJzZUludCxhdT10eXBlb2YgVnQ9PSJvYmplY3QiJiZWdCYmVnQuT2JqZWN0PT09T2JqZWN0JiZWdCxaYz10eXBlb2Ygc2VsZj09Im9iamVjdCImJnNlbGYmJnNlbGYuT2JqZWN0PT09T2JqZWN0JiZzZWxmLF90PWF1fHxaY3x8RnVuY3Rpb24oInJldHVybiB0aGlzIikoKSxVaT1yJiYhci5ub2RlVHlwZSYmcixIbj1VaSYmITAmJmQmJiFkLm5vZGVUeXBlJiZkLGZ1PUhuJiZIbi5leHBvcnRzPT09VWksV2k9ZnUmJmF1LnByb2Nlc3MscXQ9ZnVuY3Rpb24oKXt0cnl7dmFyIF89SG4mJkhuLnJlcXVpcmUmJkhuLnJlcXVpcmUoInV0aWwiKS50eXBlcztyZXR1cm4gX3x8V2kmJldpLmJpbmRpbmcmJldpLmJpbmRpbmcoInV0aWwiKX1jYXRjaHt9fSgpLGh1PXF0JiZxdC5pc0FycmF5QnVmZmVyLGN1PXF0JiZxdC5pc0RhdGUsbHU9cXQmJnF0LmlzTWFwLGR1PXF0JiZxdC5pc1JlZ0V4cCxwdT1xdCYmcXQuaXNTZXQsX3U9cXQmJnF0LmlzVHlwZWRBcnJheTtmdW5jdGlvbiBJdChfLHgseSl7c3dpdGNoKHkubGVuZ3RoKXtjYXNlIDA6cmV0dXJuIF8uY2FsbCh4KTtjYXNlIDE6cmV0dXJuIF8uY2FsbCh4LHlbMF0pO2Nhc2UgMjpyZXR1cm4gXy5jYWxsKHgseVswXSx5WzFdKTtjYXNlIDM6cmV0dXJuIF8uY2FsbCh4LHlbMF0seVsxXSx5WzJdKX1yZXR1cm4gXy5hcHBseSh4LHkpfWZ1bmN0aW9uIHFjKF8seCx5LEQpe2Zvcih2YXIgVT0tMSxZPV89PW51bGw/MDpfLmxlbmd0aDsrK1U8WTspe3ZhciBmdD1fW1VdO3goRCxmdCx5KGZ0KSxfKX1yZXR1cm4gRH1mdW5jdGlvbiBIdChfLHgpe2Zvcih2YXIgeT0tMSxEPV89PW51bGw/MDpfLmxlbmd0aDsrK3k8RCYmeChfW3ldLHksXykhPT0hMTspO3JldHVybiBffWZ1bmN0aW9uIEhjKF8seCl7Zm9yKHZhciB5PV89PW51bGw/MDpfLmxlbmd0aDt5LS0mJngoX1t5XSx5LF8pIT09ITE7KTtyZXR1cm4gX31mdW5jdGlvbiBtdShfLHgpe2Zvcih2YXIgeT0tMSxEPV89PW51bGw/MDpfLmxlbmd0aDsrK3k8RDspaWYoIXgoX1t5XSx5LF8pKXJldHVybiExO3JldHVybiEwfWZ1bmN0aW9uIExuKF8seCl7Zm9yKHZhciB5PS0xLEQ9Xz09bnVsbD8wOl8ubGVuZ3RoLFU9MCxZPVtdOysreTxEOyl7dmFyIGZ0PV9beV07eChmdCx5LF8pJiYoWVtVKytdPWZ0KX1yZXR1cm4gWX1mdW5jdGlvbiBocihfLHgpe3ZhciB5PV89PW51bGw/MDpfLmxlbmd0aDtyZXR1cm4hIXkmJmhlKF8seCwwKT4tMX1mdW5jdGlvbiBaaShfLHgseSl7Zm9yKHZhciBEPS0xLFU9Xz09bnVsbD8wOl8ubGVuZ3RoOysrRDxVOylpZih5KHgsX1tEXSkpcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gbnQoXyx4KXtmb3IodmFyIHk9LTEsRD1fPT1udWxsPzA6Xy5sZW5ndGgsVT1BcnJheShEKTsrK3k8RDspVVt5XT14KF9beV0seSxfKTtyZXR1cm4gVX1mdW5jdGlvbiBCbihfLHgpe2Zvcih2YXIgeT0tMSxEPXgubGVuZ3RoLFU9Xy5sZW5ndGg7Kyt5PEQ7KV9bVSt5XT14W3ldO3JldHVybiBffWZ1bmN0aW9uIHFpKF8seCx5LEQpe3ZhciBVPS0xLFk9Xz09bnVsbD8wOl8ubGVuZ3RoO2ZvcihEJiZZJiYoeT1fWysrVV0pOysrVTxZOyl5PXgoeSxfW1VdLFUsXyk7cmV0dXJuIHl9ZnVuY3Rpb24gR2MoXyx4LHksRCl7dmFyIFU9Xz09bnVsbD8wOl8ubGVuZ3RoO2ZvcihEJiZVJiYoeT1fWy0tVV0pO1UtLTspeT14KHksX1tVXSxVLF8pO3JldHVybiB5fWZ1bmN0aW9uIEhpKF8seCl7Zm9yKHZhciB5PS0xLEQ9Xz09bnVsbD8wOl8ubGVuZ3RoOysreTxEOylpZih4KF9beV0seSxfKSlyZXR1cm4hMDtyZXR1cm4hMX12YXIgJGM9R2koImxlbmd0aCIpO2Z1bmN0aW9uIGtjKF8pe3JldHVybiBfLnNwbGl0KCIiKX1mdW5jdGlvbiBZYyhfKXtyZXR1cm4gXy5tYXRjaChuYyl8fFtdfWZ1bmN0aW9uIGd1KF8seCx5KXt2YXIgRDtyZXR1cm4geShfLGZ1bmN0aW9uKFUsWSxmdCl7aWYoeChVLFksZnQpKXJldHVybiBEPVksITF9KSxEfWZ1bmN0aW9uIGNyKF8seCx5LEQpe2Zvcih2YXIgVT1fLmxlbmd0aCxZPXkrKEQ/MTotMSk7RD9ZLS06KytZPFU7KWlmKHgoX1tZXSxZLF8pKXJldHVybiBZO3JldHVybi0xfWZ1bmN0aW9uIGhlKF8seCx5KXtyZXR1cm4geD09PXg/c2woXyx4LHkpOmNyKF8seXUseSl9ZnVuY3Rpb24gS2MoXyx4LHksRCl7Zm9yKHZhciBVPXktMSxZPV8ubGVuZ3RoOysrVTxZOylpZihEKF9bVV0seCkpcmV0dXJuIFU7cmV0dXJuLTF9ZnVuY3Rpb24geXUoXyl7cmV0dXJuIF8hPT1ffWZ1bmN0aW9uIHZ1KF8seCl7dmFyIHk9Xz09bnVsbD8wOl8ubGVuZ3RoO3JldHVybiB5P2tpKF8seCkveTplcn1mdW5jdGlvbiBHaShfKXtyZXR1cm4gZnVuY3Rpb24oeCl7cmV0dXJuIHg9PW51bGw/aTp4W19dfX1mdW5jdGlvbiAkaShfKXtyZXR1cm4gZnVuY3Rpb24oeCl7cmV0dXJuIF89PW51bGw/aTpfW3hdfX1mdW5jdGlvbiB4dShfLHgseSxELFUpe3JldHVybiBVKF8sZnVuY3Rpb24oWSxmdCxKKXt5PUQ/KEQ9ITEsWSk6eCh5LFksZnQsSil9KSx5fWZ1bmN0aW9uIFhjKF8seCl7dmFyIHk9Xy5sZW5ndGg7Zm9yKF8uc29ydCh4KTt5LS07KV9beV09X1t5XS52YWx1ZTtyZXR1cm4gX31mdW5jdGlvbiBraShfLHgpe2Zvcih2YXIgeSxEPS0xLFU9Xy5sZW5ndGg7KytEPFU7KXt2YXIgWT14KF9bRF0pO1khPT1pJiYoeT15PT09aT9ZOnkrWSl9cmV0dXJuIHl9ZnVuY3Rpb24gWWkoXyx4KXtmb3IodmFyIHk9LTEsRD1BcnJheShfKTsrK3k8XzspRFt5XT14KHkpO3JldHVybiBEfWZ1bmN0aW9uIFZjKF8seCl7cmV0dXJuIG50KHgsZnVuY3Rpb24oeSl7cmV0dXJuW3ksX1t5XV19KX1mdW5jdGlvbiB3dShfKXtyZXR1cm4gXyYmXy5zbGljZSgwLEV1KF8pKzEpLnJlcGxhY2UoQ2ksIiIpfWZ1bmN0aW9uIE90KF8pe3JldHVybiBmdW5jdGlvbih4KXtyZXR1cm4gXyh4KX19ZnVuY3Rpb24gS2koXyx4KXtyZXR1cm4gbnQoeCxmdW5jdGlvbih5KXtyZXR1cm4gX1t5XX0pfWZ1bmN0aW9uIFRlKF8seCl7cmV0dXJuIF8uaGFzKHgpfWZ1bmN0aW9uIEF1KF8seCl7Zm9yKHZhciB5PS0xLEQ9Xy5sZW5ndGg7Kyt5PEQmJmhlKHgsX1t5XSwwKT4tMTspO3JldHVybiB5fWZ1bmN0aW9uIFN1KF8seCl7Zm9yKHZhciB5PV8ubGVuZ3RoO3ktLSYmaGUoeCxfW3ldLDApPi0xOyk7cmV0dXJuIHl9ZnVuY3Rpb24gSmMoXyx4KXtmb3IodmFyIHk9Xy5sZW5ndGgsRD0wO3ktLTspX1t5XT09PXgmJisrRDtyZXR1cm4gRH12YXIgUWM9JGkoT2MpLGpjPSRpKFBjKTtmdW5jdGlvbiB0bChfKXtyZXR1cm4iXFwiK05jW19dfWZ1bmN0aW9uIG5sKF8seCl7cmV0dXJuIF89PW51bGw/aTpfW3hdfWZ1bmN0aW9uIGNlKF8pe3JldHVybiBEYy50ZXN0KF8pfWZ1bmN0aW9uIGVsKF8pe3JldHVybiBUYy50ZXN0KF8pfWZ1bmN0aW9uIHJsKF8pe2Zvcih2YXIgeCx5PVtdOyEoeD1fLm5leHQoKSkuZG9uZTspeS5wdXNoKHgudmFsdWUpO3JldHVybiB5fWZ1bmN0aW9uIFhpKF8pe3ZhciB4PS0xLHk9QXJyYXkoXy5zaXplKTtyZXR1cm4gXy5mb3JFYWNoKGZ1bmN0aW9uKEQsVSl7eVsrK3hdPVtVLERdfSkseX1mdW5jdGlvbiBidShfLHgpe3JldHVybiBmdW5jdGlvbih5KXtyZXR1cm4gXyh4KHkpKX19ZnVuY3Rpb24gRG4oXyx4KXtmb3IodmFyIHk9LTEsRD1fLmxlbmd0aCxVPTAsWT1bXTsrK3k8RDspe3ZhciBmdD1fW3ldOyhmdD09PXh8fGZ0PT09TSkmJihfW3ldPU0sWVtVKytdPXkpfXJldHVybiBZfWZ1bmN0aW9uIGxyKF8pe3ZhciB4PS0xLHk9QXJyYXkoXy5zaXplKTtyZXR1cm4gXy5mb3JFYWNoKGZ1bmN0aW9uKEQpe3lbKyt4XT1EfSkseX1mdW5jdGlvbiBpbChfKXt2YXIgeD0tMSx5PUFycmF5KF8uc2l6ZSk7cmV0dXJuIF8uZm9yRWFjaChmdW5jdGlvbihEKXt5WysreF09W0QsRF19KSx5fWZ1bmN0aW9uIHNsKF8seCx5KXtmb3IodmFyIEQ9eS0xLFU9Xy5sZW5ndGg7KytEPFU7KWlmKF9bRF09PT14KXJldHVybiBEO3JldHVybi0xfWZ1bmN0aW9uIG9sKF8seCx5KXtmb3IodmFyIEQ9eSsxO0QtLTspaWYoX1tEXT09PXgpcmV0dXJuIEQ7cmV0dXJuIER9ZnVuY3Rpb24gbGUoXyl7cmV0dXJuIGNlKF8pP2FsKF8pOiRjKF8pfWZ1bmN0aW9uIHRuKF8pe3JldHVybiBjZShfKT9mbChfKTprYyhfKX1mdW5jdGlvbiBFdShfKXtmb3IodmFyIHg9Xy5sZW5ndGg7eC0tJiZKaC50ZXN0KF8uY2hhckF0KHgpKTspO3JldHVybiB4fXZhciB1bD0kaShGYyk7ZnVuY3Rpb24gYWwoXyl7Zm9yKHZhciB4PU5pLmxhc3RJbmRleD0wO05pLnRlc3QoXyk7KSsreDtyZXR1cm4geH1mdW5jdGlvbiBmbChfKXtyZXR1cm4gXy5tYXRjaChOaSl8fFtdfWZ1bmN0aW9uIGhsKF8pe3JldHVybiBfLm1hdGNoKEJjKXx8W119dmFyIGNsPWZ1bmN0aW9uIF8oeCl7eD14PT1udWxsP190OmRlLmRlZmF1bHRzKF90Lk9iamVjdCgpLHgsZGUucGljayhfdCxDYykpO3ZhciB5PXguQXJyYXksRD14LkRhdGUsVT14LkVycm9yLFk9eC5GdW5jdGlvbixmdD14Lk1hdGgsSj14Lk9iamVjdCxWaT14LlJlZ0V4cCxsbD14LlN0cmluZyxHdD14LlR5cGVFcnJvcixkcj15LnByb3RvdHlwZSxkbD1ZLnByb3RvdHlwZSxwZT1KLnByb3RvdHlwZSxwcj14WyJfX2NvcmUtanNfc2hhcmVkX18iXSxfcj1kbC50b1N0cmluZyxWPXBlLmhhc093blByb3BlcnR5LHBsPTAsTXU9ZnVuY3Rpb24oKXt2YXIgdD0vW14uXSskLy5leGVjKHByJiZwci5rZXlzJiZwci5rZXlzLklFX1BST1RPfHwiIik7cmV0dXJuIHQ/IlN5bWJvbChzcmMpXzEuIit0OiIifSgpLG1yPXBlLnRvU3RyaW5nLF9sPV9yLmNhbGwoSiksbWw9X3QuXyxnbD1WaSgiXiIrX3IuY2FsbChWKS5yZXBsYWNlKFRpLCJcXCQmIikucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXCgpfCBmb3IgLis/KD89XFxcXSkvZywiJDEuKj8iKSsiJCIpLGdyPWZ1P3guQnVmZmVyOmksVG49eC5TeW1ib2wseXI9eC5VaW50OEFycmF5LFJ1PWdyP2dyLmFsbG9jVW5zYWZlOmksdnI9YnUoSi5nZXRQcm90b3R5cGVPZixKKSx6dT1KLmNyZWF0ZSxMdT1wZS5wcm9wZXJ0eUlzRW51bWVyYWJsZSx4cj1kci5zcGxpY2UsQnU9VG4/VG4uaXNDb25jYXRTcHJlYWRhYmxlOmksQ2U9VG4/VG4uaXRlcmF0b3I6aSxHbj1Ubj9Ubi50b1N0cmluZ1RhZzppLHdyPWZ1bmN0aW9uKCl7dHJ5e3ZhciB0PVhuKEosImRlZmluZVByb3BlcnR5Iik7cmV0dXJuIHQoe30sIiIse30pLHR9Y2F0Y2h7fX0oKSx5bD14LmNsZWFyVGltZW91dCE9PV90LmNsZWFyVGltZW91dCYmeC5jbGVhclRpbWVvdXQsdmw9RCYmRC5ub3chPT1fdC5EYXRlLm5vdyYmRC5ub3cseGw9eC5zZXRUaW1lb3V0IT09X3Quc2V0VGltZW91dCYmeC5zZXRUaW1lb3V0LEFyPWZ0LmNlaWwsU3I9ZnQuZmxvb3IsSmk9Si5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsd2w9Z3I/Z3IuaXNCdWZmZXI6aSxEdT14LmlzRmluaXRlLEFsPWRyLmpvaW4sU2w9YnUoSi5rZXlzLEopLGh0PWZ0Lm1heCx5dD1mdC5taW4sYmw9RC5ub3csRWw9eC5wYXJzZUludCxUdT1mdC5yYW5kb20sTWw9ZHIucmV2ZXJzZSxRaT1Ybih4LCJEYXRhVmlldyIpLEllPVhuKHgsIk1hcCIpLGppPVhuKHgsIlByb21pc2UiKSxfZT1Ybih4LCJTZXQiKSxPZT1Ybih4LCJXZWFrTWFwIiksUGU9WG4oSiwiY3JlYXRlIiksYnI9T2UmJm5ldyBPZSxtZT17fSxSbD1WbihRaSksemw9Vm4oSWUpLExsPVZuKGppKSxCbD1WbihfZSksRGw9Vm4oT2UpLEVyPVRuP1RuLnByb3RvdHlwZTppLEZlPUVyP0VyLnZhbHVlT2Y6aSxDdT1Fcj9Fci50b1N0cmluZzppO2Z1bmN0aW9uIHUodCl7aWYoaXQodCkmJiFXKHQpJiYhKHQgaW5zdGFuY2VvZiAkKSl7aWYodCBpbnN0YW5jZW9mICR0KXJldHVybiB0O2lmKFYuY2FsbCh0LCJfX3dyYXBwZWRfXyIpKXJldHVybiBJYSh0KX1yZXR1cm4gbmV3ICR0KHQpfXZhciBnZT1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXt9cmV0dXJuIGZ1bmN0aW9uKG4pe2lmKCFldChuKSlyZXR1cm57fTtpZih6dSlyZXR1cm4genUobik7dC5wcm90b3R5cGU9bjt2YXIgZT1uZXcgdDtyZXR1cm4gdC5wcm90b3R5cGU9aSxlfX0oKTtmdW5jdGlvbiBNcigpe31mdW5jdGlvbiAkdCh0LG4pe3RoaXMuX193cmFwcGVkX189dCx0aGlzLl9fYWN0aW9uc19fPVtdLHRoaXMuX19jaGFpbl9fPSEhbix0aGlzLl9faW5kZXhfXz0wLHRoaXMuX192YWx1ZXNfXz1pfXUudGVtcGxhdGVTZXR0aW5ncz17ZXNjYXBlOiRoLGV2YWx1YXRlOmtoLGludGVycG9sYXRlOnFvLHZhcmlhYmxlOiIiLGltcG9ydHM6e186dX19LHUucHJvdG90eXBlPU1yLnByb3RvdHlwZSx1LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj11LCR0LnByb3RvdHlwZT1nZShNci5wcm90b3R5cGUpLCR0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0kdDtmdW5jdGlvbiAkKHQpe3RoaXMuX193cmFwcGVkX189dCx0aGlzLl9fYWN0aW9uc19fPVtdLHRoaXMuX19kaXJfXz0xLHRoaXMuX19maWx0ZXJlZF9fPSExLHRoaXMuX19pdGVyYXRlZXNfXz1bXSx0aGlzLl9fdGFrZUNvdW50X189b24sdGhpcy5fX3ZpZXdzX189W119ZnVuY3Rpb24gVGwoKXt2YXIgdD1uZXcgJCh0aGlzLl9fd3JhcHBlZF9fKTtyZXR1cm4gdC5fX2FjdGlvbnNfXz16dCh0aGlzLl9fYWN0aW9uc19fKSx0Ll9fZGlyX189dGhpcy5fX2Rpcl9fLHQuX19maWx0ZXJlZF9fPXRoaXMuX19maWx0ZXJlZF9fLHQuX19pdGVyYXRlZXNfXz16dCh0aGlzLl9faXRlcmF0ZWVzX18pLHQuX190YWtlQ291bnRfXz10aGlzLl9fdGFrZUNvdW50X18sdC5fX3ZpZXdzX189enQodGhpcy5fX3ZpZXdzX18pLHR9ZnVuY3Rpb24gQ2woKXtpZih0aGlzLl9fZmlsdGVyZWRfXyl7dmFyIHQ9bmV3ICQodGhpcyk7dC5fX2Rpcl9fPS0xLHQuX19maWx0ZXJlZF9fPSEwfWVsc2UgdD10aGlzLmNsb25lKCksdC5fX2Rpcl9fKj0tMTtyZXR1cm4gdH1mdW5jdGlvbiBJbCgpe3ZhciB0PXRoaXMuX193cmFwcGVkX18udmFsdWUoKSxuPXRoaXMuX19kaXJfXyxlPVcodCkscz1uPDAsbz1lP3QubGVuZ3RoOjAsYT1rZCgwLG8sdGhpcy5fX3ZpZXdzX18pLGw9YS5zdGFydCxwPWEuZW5kLG09cC1sLGI9cz9wOmwtMSxFPXRoaXMuX19pdGVyYXRlZXNfXyx6PUUubGVuZ3RoLEI9MCxDPXl0KG0sdGhpcy5fX3Rha2VDb3VudF9fKTtpZighZXx8IXMmJm89PW0mJkM9PW0pcmV0dXJuIHJhKHQsdGhpcy5fX2FjdGlvbnNfXyk7dmFyIFA9W107dDpmb3IoO20tLSYmQjxDOyl7Yis9bjtmb3IodmFyIHE9LTEsRj10W2JdOysrcTx6Oyl7dmFyIEc9RVtxXSxrPUcuaXRlcmF0ZWUsTnQ9Ry50eXBlLEV0PWsoRik7aWYoTnQ9PUFpKUY9RXQ7ZWxzZSBpZighRXQpe2lmKE50PT1adCljb250aW51ZSB0O2JyZWFrIHR9fVBbQisrXT1GfXJldHVybiBQfSQucHJvdG90eXBlPWdlKE1yLnByb3RvdHlwZSksJC5wcm90b3R5cGUuY29uc3RydWN0b3I9JDtmdW5jdGlvbiAkbih0KXt2YXIgbj0tMSxlPXQ9PW51bGw/MDp0Lmxlbmd0aDtmb3IodGhpcy5jbGVhcigpOysrbjxlOyl7dmFyIHM9dFtuXTt0aGlzLnNldChzWzBdLHNbMV0pfX1mdW5jdGlvbiBPbCgpe3RoaXMuX19kYXRhX189UGU/UGUobnVsbCk6e30sdGhpcy5zaXplPTB9ZnVuY3Rpb24gUGwodCl7dmFyIG49dGhpcy5oYXModCkmJmRlbGV0ZSB0aGlzLl9fZGF0YV9fW3RdO3JldHVybiB0aGlzLnNpemUtPW4/MTowLG59ZnVuY3Rpb24gRmwodCl7dmFyIG49dGhpcy5fX2RhdGFfXztpZihQZSl7dmFyIGU9blt0XTtyZXR1cm4gZT09PUE/aTplfXJldHVybiBWLmNhbGwobix0KT9uW3RdOml9ZnVuY3Rpb24gTmwodCl7dmFyIG49dGhpcy5fX2RhdGFfXztyZXR1cm4gUGU/blt0XSE9PWk6Vi5jYWxsKG4sdCl9ZnVuY3Rpb24gVWwodCxuKXt2YXIgZT10aGlzLl9fZGF0YV9fO3JldHVybiB0aGlzLnNpemUrPXRoaXMuaGFzKHQpPzA6MSxlW3RdPVBlJiZuPT09aT9BOm4sdGhpc30kbi5wcm90b3R5cGUuY2xlYXI9T2wsJG4ucHJvdG90eXBlLmRlbGV0ZT1QbCwkbi5wcm90b3R5cGUuZ2V0PUZsLCRuLnByb3RvdHlwZS5oYXM9TmwsJG4ucHJvdG90eXBlLnNldD1VbDtmdW5jdGlvbiBkbih0KXt2YXIgbj0tMSxlPXQ9PW51bGw/MDp0Lmxlbmd0aDtmb3IodGhpcy5jbGVhcigpOysrbjxlOyl7dmFyIHM9dFtuXTt0aGlzLnNldChzWzBdLHNbMV0pfX1mdW5jdGlvbiBXbCgpe3RoaXMuX19kYXRhX189W10sdGhpcy5zaXplPTB9ZnVuY3Rpb24gWmwodCl7dmFyIG49dGhpcy5fX2RhdGFfXyxlPVJyKG4sdCk7aWYoZTwwKXJldHVybiExO3ZhciBzPW4ubGVuZ3RoLTE7cmV0dXJuIGU9PXM/bi5wb3AoKTp4ci5jYWxsKG4sZSwxKSwtLXRoaXMuc2l6ZSwhMH1mdW5jdGlvbiBxbCh0KXt2YXIgbj10aGlzLl9fZGF0YV9fLGU9UnIobix0KTtyZXR1cm4gZTwwP2k6bltlXVsxXX1mdW5jdGlvbiBIbCh0KXtyZXR1cm4gUnIodGhpcy5fX2RhdGFfXyx0KT4tMX1mdW5jdGlvbiBHbCh0LG4pe3ZhciBlPXRoaXMuX19kYXRhX18scz1ScihlLHQpO3JldHVybiBzPDA/KCsrdGhpcy5zaXplLGUucHVzaChbdCxuXSkpOmVbc11bMV09bix0aGlzfWRuLnByb3RvdHlwZS5jbGVhcj1XbCxkbi5wcm90b3R5cGUuZGVsZXRlPVpsLGRuLnByb3RvdHlwZS5nZXQ9cWwsZG4ucHJvdG90eXBlLmhhcz1IbCxkbi5wcm90b3R5cGUuc2V0PUdsO2Z1bmN0aW9uIHBuKHQpe3ZhciBuPS0xLGU9dD09bnVsbD8wOnQubGVuZ3RoO2Zvcih0aGlzLmNsZWFyKCk7KytuPGU7KXt2YXIgcz10W25dO3RoaXMuc2V0KHNbMF0sc1sxXSl9fWZ1bmN0aW9uICRsKCl7dGhpcy5zaXplPTAsdGhpcy5fX2RhdGFfXz17aGFzaDpuZXcgJG4sbWFwOm5ldyhJZXx8ZG4pLHN0cmluZzpuZXcgJG59fWZ1bmN0aW9uIGtsKHQpe3ZhciBuPVVyKHRoaXMsdCkuZGVsZXRlKHQpO3JldHVybiB0aGlzLnNpemUtPW4/MTowLG59ZnVuY3Rpb24gWWwodCl7cmV0dXJuIFVyKHRoaXMsdCkuZ2V0KHQpfWZ1bmN0aW9uIEtsKHQpe3JldHVybiBVcih0aGlzLHQpLmhhcyh0KX1mdW5jdGlvbiBYbCh0LG4pe3ZhciBlPVVyKHRoaXMsdCkscz1lLnNpemU7cmV0dXJuIGUuc2V0KHQsbiksdGhpcy5zaXplKz1lLnNpemU9PXM/MDoxLHRoaXN9cG4ucHJvdG90eXBlLmNsZWFyPSRsLHBuLnByb3RvdHlwZS5kZWxldGU9a2wscG4ucHJvdG90eXBlLmdldD1ZbCxwbi5wcm90b3R5cGUuaGFzPUtsLHBuLnByb3RvdHlwZS5zZXQ9WGw7ZnVuY3Rpb24ga24odCl7dmFyIG49LTEsZT10PT1udWxsPzA6dC5sZW5ndGg7Zm9yKHRoaXMuX19kYXRhX189bmV3IHBuOysrbjxlOyl0aGlzLmFkZCh0W25dKX1mdW5jdGlvbiBWbCh0KXtyZXR1cm4gdGhpcy5fX2RhdGFfXy5zZXQodCxBKSx0aGlzfWZ1bmN0aW9uIEpsKHQpe3JldHVybiB0aGlzLl9fZGF0YV9fLmhhcyh0KX1rbi5wcm90b3R5cGUuYWRkPWtuLnByb3RvdHlwZS5wdXNoPVZsLGtuLnByb3RvdHlwZS5oYXM9Smw7ZnVuY3Rpb24gbm4odCl7dmFyIG49dGhpcy5fX2RhdGFfXz1uZXcgZG4odCk7dGhpcy5zaXplPW4uc2l6ZX1mdW5jdGlvbiBRbCgpe3RoaXMuX19kYXRhX189bmV3IGRuLHRoaXMuc2l6ZT0wfWZ1bmN0aW9uIGpsKHQpe3ZhciBuPXRoaXMuX19kYXRhX18sZT1uLmRlbGV0ZSh0KTtyZXR1cm4gdGhpcy5zaXplPW4uc2l6ZSxlfWZ1bmN0aW9uIHRkKHQpe3JldHVybiB0aGlzLl9fZGF0YV9fLmdldCh0KX1mdW5jdGlvbiBuZCh0KXtyZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModCl9ZnVuY3Rpb24gZWQodCxuKXt2YXIgZT10aGlzLl9fZGF0YV9fO2lmKGUgaW5zdGFuY2VvZiBkbil7dmFyIHM9ZS5fX2RhdGFfXztpZighSWV8fHMubGVuZ3RoPGgtMSlyZXR1cm4gcy5wdXNoKFt0LG5dKSx0aGlzLnNpemU9KytlLnNpemUsdGhpcztlPXRoaXMuX19kYXRhX189bmV3IHBuKHMpfXJldHVybiBlLnNldCh0LG4pLHRoaXMuc2l6ZT1lLnNpemUsdGhpc31ubi5wcm90b3R5cGUuY2xlYXI9UWwsbm4ucHJvdG90eXBlLmRlbGV0ZT1qbCxubi5wcm90b3R5cGUuZ2V0PXRkLG5uLnByb3RvdHlwZS5oYXM9bmQsbm4ucHJvdG90eXBlLnNldD1lZDtmdW5jdGlvbiBJdSh0LG4pe3ZhciBlPVcodCkscz0hZSYmSm4odCksbz0hZSYmIXMmJkZuKHQpLGE9IWUmJiFzJiYhbyYmd2UodCksbD1lfHxzfHxvfHxhLHA9bD9ZaSh0Lmxlbmd0aCxsbCk6W10sbT1wLmxlbmd0aDtmb3IodmFyIGIgaW4gdCkobnx8Vi5jYWxsKHQsYikpJiYhKGwmJihiPT0ibGVuZ3RoInx8byYmKGI9PSJvZmZzZXQifHxiPT0icGFyZW50Iil8fGEmJihiPT0iYnVmZmVyInx8Yj09ImJ5dGVMZW5ndGgifHxiPT0iYnl0ZU9mZnNldCIpfHx5bihiLG0pKSkmJnAucHVzaChiKTtyZXR1cm4gcH1mdW5jdGlvbiBPdSh0KXt2YXIgbj10Lmxlbmd0aDtyZXR1cm4gbj90W2hzKDAsbi0xKV06aX1mdW5jdGlvbiByZCh0LG4pe3JldHVybiBXcih6dCh0KSxZbihuLDAsdC5sZW5ndGgpKX1mdW5jdGlvbiBpZCh0KXtyZXR1cm4gV3IoenQodCkpfWZ1bmN0aW9uIHRzKHQsbixlKXsoZSE9PWkmJiFlbih0W25dLGUpfHxlPT09aSYmIShuIGluIHQpKSYmX24odCxuLGUpfWZ1bmN0aW9uIE5lKHQsbixlKXt2YXIgcz10W25dOyghKFYuY2FsbCh0LG4pJiZlbihzLGUpKXx8ZT09PWkmJiEobiBpbiB0KSkmJl9uKHQsbixlKX1mdW5jdGlvbiBScih0LG4pe2Zvcih2YXIgZT10Lmxlbmd0aDtlLS07KWlmKGVuKHRbZV1bMF0sbikpcmV0dXJuIGU7cmV0dXJuLTF9ZnVuY3Rpb24gc2QodCxuLGUscyl7cmV0dXJuIENuKHQsZnVuY3Rpb24obyxhLGwpe24ocyxvLGUobyksbCl9KSxzfWZ1bmN0aW9uIFB1KHQsbil7cmV0dXJuIHQmJmFuKG4sZHQobiksdCl9ZnVuY3Rpb24gb2QodCxuKXtyZXR1cm4gdCYmYW4obixCdChuKSx0KX1mdW5jdGlvbiBfbih0LG4sZSl7bj09Il9fcHJvdG9fXyImJndyP3dyKHQsbix7Y29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITAsdmFsdWU6ZSx3cml0YWJsZTohMH0pOnRbbl09ZX1mdW5jdGlvbiBucyh0LG4pe2Zvcih2YXIgZT0tMSxzPW4ubGVuZ3RoLG89eShzKSxhPXQ9PW51bGw7KytlPHM7KW9bZV09YT9pOk9zKHQsbltlXSk7cmV0dXJuIG99ZnVuY3Rpb24gWW4odCxuLGUpe3JldHVybiB0PT09dCYmKGUhPT1pJiYodD10PD1lP3Q6ZSksbiE9PWkmJih0PXQ+PW4/dDpuKSksdH1mdW5jdGlvbiBrdCh0LG4sZSxzLG8sYSl7dmFyIGwscD1uJlMsbT1uJncsYj1uJkw7aWYoZSYmKGw9bz9lKHQscyxvLGEpOmUodCkpLGwhPT1pKXJldHVybiBsO2lmKCFldCh0KSlyZXR1cm4gdDt2YXIgRT1XKHQpO2lmKEUpe2lmKGw9S2QodCksIXApcmV0dXJuIHp0KHQsbCl9ZWxzZXt2YXIgej12dCh0KSxCPXo9PXNyfHx6PT1ObztpZihGbih0KSlyZXR1cm4gb2EodCxwKTtpZih6PT1sbnx8ej09dWV8fEImJiFvKXtpZihsPW18fEI/e306RWEodCksIXApcmV0dXJuIG0/RmQodCxvZChsLHQpKTpQZCh0LFB1KGwsdCkpfWVsc2V7aWYoIVFbel0pcmV0dXJuIG8/dDp7fTtsPVhkKHQseixwKX19YXx8KGE9bmV3IG5uKTt2YXIgQz1hLmdldCh0KTtpZihDKXJldHVybiBDO2Euc2V0KHQsbCksdGYodCk/dC5mb3JFYWNoKGZ1bmN0aW9uKEYpe2wuYWRkKGt0KEYsbixlLEYsdCxhKSl9KTpRYSh0KSYmdC5mb3JFYWNoKGZ1bmN0aW9uKEYsRyl7bC5zZXQoRyxrdChGLG4sZSxHLHQsYSkpfSk7dmFyIFA9Yj9tP3dzOnhzOm0/QnQ6ZHQscT1FP2k6UCh0KTtyZXR1cm4gSHQocXx8dCxmdW5jdGlvbihGLEcpe3EmJihHPUYsRj10W0ddKSxOZShsLEcsa3QoRixuLGUsRyx0LGEpKX0pLGx9ZnVuY3Rpb24gdWQodCl7dmFyIG49ZHQodCk7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBGdShlLHQsbil9fWZ1bmN0aW9uIEZ1KHQsbixlKXt2YXIgcz1lLmxlbmd0aDtpZih0PT1udWxsKXJldHVybiFzO2Zvcih0PUoodCk7cy0tOyl7dmFyIG89ZVtzXSxhPW5bb10sbD10W29dO2lmKGw9PT1pJiYhKG8gaW4gdCl8fCFhKGwpKXJldHVybiExfXJldHVybiEwfWZ1bmN0aW9uIE51KHQsbixlKXtpZih0eXBlb2YgdCE9ImZ1bmN0aW9uIil0aHJvdyBuZXcgR3QoZyk7cmV0dXJuICRlKGZ1bmN0aW9uKCl7dC5hcHBseShpLGUpfSxuKX1mdW5jdGlvbiBVZSh0LG4sZSxzKXt2YXIgbz0tMSxhPWhyLGw9ITAscD10Lmxlbmd0aCxtPVtdLGI9bi5sZW5ndGg7aWYoIXApcmV0dXJuIG07ZSYmKG49bnQobixPdChlKSkpLHM/KGE9WmksbD0hMSk6bi5sZW5ndGg+PWgmJihhPVRlLGw9ITEsbj1uZXcga24obikpO3Q6Zm9yKDsrK288cDspe3ZhciBFPXRbb10sej1lPT1udWxsP0U6ZShFKTtpZihFPXN8fEUhPT0wP0U6MCxsJiZ6PT09eil7Zm9yKHZhciBCPWI7Qi0tOylpZihuW0JdPT09eiljb250aW51ZSB0O20ucHVzaChFKX1lbHNlIGEobix6LHMpfHxtLnB1c2goRSl9cmV0dXJuIG19dmFyIENuPWNhKHVuKSxVdT1jYShycywhMCk7ZnVuY3Rpb24gYWQodCxuKXt2YXIgZT0hMDtyZXR1cm4gQ24odCxmdW5jdGlvbihzLG8sYSl7cmV0dXJuIGU9ISFuKHMsbyxhKSxlfSksZX1mdW5jdGlvbiB6cih0LG4sZSl7Zm9yKHZhciBzPS0xLG89dC5sZW5ndGg7KytzPG87KXt2YXIgYT10W3NdLGw9bihhKTtpZihsIT1udWxsJiYocD09PWk/bD09PWwmJiFGdChsKTplKGwscCkpKXZhciBwPWwsbT1hfXJldHVybiBtfWZ1bmN0aW9uIGZkKHQsbixlLHMpe3ZhciBvPXQubGVuZ3RoO2ZvcihlPVooZSksZTwwJiYoZT0tZT5vPzA6bytlKSxzPXM9PT1pfHxzPm8/bzpaKHMpLHM8MCYmKHMrPW8pLHM9ZT5zPzA6ZWYocyk7ZTxzOyl0W2UrK109bjtyZXR1cm4gdH1mdW5jdGlvbiBXdSh0LG4pe3ZhciBlPVtdO3JldHVybiBDbih0LGZ1bmN0aW9uKHMsbyxhKXtuKHMsbyxhKSYmZS5wdXNoKHMpfSksZX1mdW5jdGlvbiBtdCh0LG4sZSxzLG8pe3ZhciBhPS0xLGw9dC5sZW5ndGg7Zm9yKGV8fChlPUpkKSxvfHwobz1bXSk7KythPGw7KXt2YXIgcD10W2FdO24+MCYmZShwKT9uPjE/bXQocCxuLTEsZSxzLG8pOkJuKG8scCk6c3x8KG9bby5sZW5ndGhdPXApfXJldHVybiBvfXZhciBlcz1sYSgpLFp1PWxhKCEwKTtmdW5jdGlvbiB1bih0LG4pe3JldHVybiB0JiZlcyh0LG4sZHQpfWZ1bmN0aW9uIHJzKHQsbil7cmV0dXJuIHQmJlp1KHQsbixkdCl9ZnVuY3Rpb24gTHIodCxuKXtyZXR1cm4gTG4obixmdW5jdGlvbihlKXtyZXR1cm4gdm4odFtlXSl9KX1mdW5jdGlvbiBLbih0LG4pe249T24obix0KTtmb3IodmFyIGU9MCxzPW4ubGVuZ3RoO3QhPW51bGwmJmU8czspdD10W2ZuKG5bZSsrXSldO3JldHVybiBlJiZlPT1zP3Q6aX1mdW5jdGlvbiBxdSh0LG4sZSl7dmFyIHM9bih0KTtyZXR1cm4gVyh0KT9zOkJuKHMsZSh0KSl9ZnVuY3Rpb24gU3QodCl7cmV0dXJuIHQ9PW51bGw/dD09PWk/Tmg6UGg6R24mJkduIGluIEoodCk/JGQodCk6aXAodCl9ZnVuY3Rpb24gaXModCxuKXtyZXR1cm4gdD5ufWZ1bmN0aW9uIGhkKHQsbil7cmV0dXJuIHQhPW51bGwmJlYuY2FsbCh0LG4pfWZ1bmN0aW9uIGNkKHQsbil7cmV0dXJuIHQhPW51bGwmJm4gaW4gSih0KX1mdW5jdGlvbiBsZCh0LG4sZSl7cmV0dXJuIHQ+PXl0KG4sZSkmJnQ8aHQobixlKX1mdW5jdGlvbiBzcyh0LG4sZSl7Zm9yKHZhciBzPWU/Wmk6aHIsbz10WzBdLmxlbmd0aCxhPXQubGVuZ3RoLGw9YSxwPXkoYSksbT0xLzAsYj1bXTtsLS07KXt2YXIgRT10W2xdO2wmJm4mJihFPW50KEUsT3QobikpKSxtPXl0KEUubGVuZ3RoLG0pLHBbbF09IWUmJihufHxvPj0xMjAmJkUubGVuZ3RoPj0xMjApP25ldyBrbihsJiZFKTppfUU9dFswXTt2YXIgej0tMSxCPXBbMF07dDpmb3IoOysrejxvJiZiLmxlbmd0aDxtOyl7dmFyIEM9RVt6XSxQPW4/bihDKTpDO2lmKEM9ZXx8QyE9PTA/QzowLCEoQj9UZShCLFApOnMoYixQLGUpKSl7Zm9yKGw9YTstLWw7KXt2YXIgcT1wW2xdO2lmKCEocT9UZShxLFApOnModFtsXSxQLGUpKSljb250aW51ZSB0fUImJkIucHVzaChQKSxiLnB1c2goQyl9fXJldHVybiBifWZ1bmN0aW9uIGRkKHQsbixlLHMpe3JldHVybiB1bih0LGZ1bmN0aW9uKG8sYSxsKXtuKHMsZShvKSxhLGwpfSksc31mdW5jdGlvbiBXZSh0LG4sZSl7bj1PbihuLHQpLHQ9TGEodCxuKTt2YXIgcz10PT1udWxsP3Q6dFtmbihLdChuKSldO3JldHVybiBzPT1udWxsP2k6SXQocyx0LGUpfWZ1bmN0aW9uIEh1KHQpe3JldHVybiBpdCh0KSYmU3QodCk9PXVlfWZ1bmN0aW9uIHBkKHQpe3JldHVybiBpdCh0KSYmU3QodCk9PURlfWZ1bmN0aW9uIF9kKHQpe3JldHVybiBpdCh0KSYmU3QodCk9PU1lfWZ1bmN0aW9uIFplKHQsbixlLHMsbyl7cmV0dXJuIHQ9PT1uPyEwOnQ9PW51bGx8fG49PW51bGx8fCFpdCh0KSYmIWl0KG4pP3QhPT10JiZuIT09bjptZCh0LG4sZSxzLFplLG8pfWZ1bmN0aW9uIG1kKHQsbixlLHMsbyxhKXt2YXIgbD1XKHQpLHA9VyhuKSxtPWw/cnI6dnQodCksYj1wP3JyOnZ0KG4pO209bT09dWU/bG46bSxiPWI9PXVlP2xuOmI7dmFyIEU9bT09bG4sej1iPT1sbixCPW09PWI7aWYoQiYmRm4odCkpe2lmKCFGbihuKSlyZXR1cm4hMTtsPSEwLEU9ITF9aWYoQiYmIUUpcmV0dXJuIGF8fChhPW5ldyBubiksbHx8d2UodCk/QWEodCxuLGUscyxvLGEpOkhkKHQsbixtLGUscyxvLGEpO2lmKCEoZSZOKSl7dmFyIEM9RSYmVi5jYWxsKHQsIl9fd3JhcHBlZF9fIiksUD16JiZWLmNhbGwobiwiX193cmFwcGVkX18iKTtpZihDfHxQKXt2YXIgcT1DP3QudmFsdWUoKTp0LEY9UD9uLnZhbHVlKCk6bjtyZXR1cm4gYXx8KGE9bmV3IG5uKSxvKHEsRixlLHMsYSl9fXJldHVybiBCPyhhfHwoYT1uZXcgbm4pLEdkKHQsbixlLHMsbyxhKSk6ITF9ZnVuY3Rpb24gZ2QodCl7cmV0dXJuIGl0KHQpJiZ2dCh0KT09UXR9ZnVuY3Rpb24gb3ModCxuLGUscyl7dmFyIG89ZS5sZW5ndGgsYT1vLGw9IXM7aWYodD09bnVsbClyZXR1cm4hYTtmb3IodD1KKHQpO28tLTspe3ZhciBwPWVbb107aWYobCYmcFsyXT9wWzFdIT09dFtwWzBdXTohKHBbMF1pbiB0KSlyZXR1cm4hMX1mb3IoOysrbzxhOyl7cD1lW29dO3ZhciBtPXBbMF0sYj10W21dLEU9cFsxXTtpZihsJiZwWzJdKXtpZihiPT09aSYmIShtIGluIHQpKXJldHVybiExfWVsc2V7dmFyIHo9bmV3IG5uO2lmKHMpdmFyIEI9cyhiLEUsbSx0LG4seik7aWYoIShCPT09aT9aZShFLGIsTnxsdCxzLHopOkIpKXJldHVybiExfX1yZXR1cm4hMH1mdW5jdGlvbiBHdSh0KXtpZighZXQodCl8fGpkKHQpKXJldHVybiExO3ZhciBuPXZuKHQpP2dsOnVjO3JldHVybiBuLnRlc3QoVm4odCkpfWZ1bmN0aW9uIHlkKHQpe3JldHVybiBpdCh0KSYmU3QodCk9PXplfWZ1bmN0aW9uIHZkKHQpe3JldHVybiBpdCh0KSYmdnQodCk9PWp0fWZ1bmN0aW9uIHhkKHQpe3JldHVybiBpdCh0KSYma3IodC5sZW5ndGgpJiYhIWpbU3QodCldfWZ1bmN0aW9uICR1KHQpe3JldHVybiB0eXBlb2YgdD09ImZ1bmN0aW9uIj90OnQ9PW51bGw/RHQ6dHlwZW9mIHQ9PSJvYmplY3QiP1codCk/S3UodFswXSx0WzFdKTpZdSh0KTpwZih0KX1mdW5jdGlvbiB1cyh0KXtpZighR2UodCkpcmV0dXJuIFNsKHQpO3ZhciBuPVtdO2Zvcih2YXIgZSBpbiBKKHQpKVYuY2FsbCh0LGUpJiZlIT0iY29uc3RydWN0b3IiJiZuLnB1c2goZSk7cmV0dXJuIG59ZnVuY3Rpb24gd2QodCl7aWYoIWV0KHQpKXJldHVybiBycCh0KTt2YXIgbj1HZSh0KSxlPVtdO2Zvcih2YXIgcyBpbiB0KXM9PSJjb25zdHJ1Y3RvciImJihufHwhVi5jYWxsKHQscykpfHxlLnB1c2gocyk7cmV0dXJuIGV9ZnVuY3Rpb24gYXModCxuKXtyZXR1cm4gdDxufWZ1bmN0aW9uIGt1KHQsbil7dmFyIGU9LTEscz1MdCh0KT95KHQubGVuZ3RoKTpbXTtyZXR1cm4gQ24odCxmdW5jdGlvbihvLGEsbCl7c1srK2VdPW4obyxhLGwpfSksc31mdW5jdGlvbiBZdSh0KXt2YXIgbj1Tcyh0KTtyZXR1cm4gbi5sZW5ndGg9PTEmJm5bMF1bMl0/UmEoblswXVswXSxuWzBdWzFdKTpmdW5jdGlvbihlKXtyZXR1cm4gZT09PXR8fG9zKGUsdCxuKX19ZnVuY3Rpb24gS3UodCxuKXtyZXR1cm4gRXModCkmJk1hKG4pP1JhKGZuKHQpLG4pOmZ1bmN0aW9uKGUpe3ZhciBzPU9zKGUsdCk7cmV0dXJuIHM9PT1pJiZzPT09bj9QcyhlLHQpOlplKG4scyxOfGx0KX19ZnVuY3Rpb24gQnIodCxuLGUscyxvKXt0IT09biYmZXMobixmdW5jdGlvbihhLGwpe2lmKG98fChvPW5ldyBubiksZXQoYSkpQWQodCxuLGwsZSxCcixzLG8pO2Vsc2V7dmFyIHA9cz9zKFJzKHQsbCksYSxsKyIiLHQsbixvKTppO3A9PT1pJiYocD1hKSx0cyh0LGwscCl9fSxCdCl9ZnVuY3Rpb24gQWQodCxuLGUscyxvLGEsbCl7dmFyIHA9UnModCxlKSxtPVJzKG4sZSksYj1sLmdldChtKTtpZihiKXt0cyh0LGUsYik7cmV0dXJufXZhciBFPWE/YShwLG0sZSsiIix0LG4sbCk6aSx6PUU9PT1pO2lmKHope3ZhciBCPVcobSksQz0hQiYmRm4obSksUD0hQiYmIUMmJndlKG0pO0U9bSxCfHxDfHxQP1cocCk/RT1wOnN0KHApP0U9enQocCk6Qz8oej0hMSxFPW9hKG0sITApKTpQPyh6PSExLEU9dWEobSwhMCkpOkU9W106a2UobSl8fEpuKG0pPyhFPXAsSm4ocCk/RT1yZihwKTooIWV0KHApfHx2bihwKSkmJihFPUVhKG0pKSk6ej0hMX16JiYobC5zZXQobSxFKSxvKEUsbSxzLGEsbCksbC5kZWxldGUobSkpLHRzKHQsZSxFKX1mdW5jdGlvbiBYdSh0LG4pe3ZhciBlPXQubGVuZ3RoO2lmKCEhZSlyZXR1cm4gbis9bjwwP2U6MCx5bihuLGUpP3Rbbl06aX1mdW5jdGlvbiBWdSh0LG4sZSl7bi5sZW5ndGg/bj1udChuLGZ1bmN0aW9uKGEpe3JldHVybiBXKGEpP2Z1bmN0aW9uKGwpe3JldHVybiBLbihsLGEubGVuZ3RoPT09MT9hWzBdOmEpfTphfSk6bj1bRHRdO3ZhciBzPS0xO249bnQobixPdChPKCkpKTt2YXIgbz1rdSh0LGZ1bmN0aW9uKGEsbCxwKXt2YXIgbT1udChuLGZ1bmN0aW9uKGIpe3JldHVybiBiKGEpfSk7cmV0dXJue2NyaXRlcmlhOm0saW5kZXg6KytzLHZhbHVlOmF9fSk7cmV0dXJuIFhjKG8sZnVuY3Rpb24oYSxsKXtyZXR1cm4gT2QoYSxsLGUpfSl9ZnVuY3Rpb24gU2QodCxuKXtyZXR1cm4gSnUodCxuLGZ1bmN0aW9uKGUscyl7cmV0dXJuIFBzKHQscyl9KX1mdW5jdGlvbiBKdSh0LG4sZSl7Zm9yKHZhciBzPS0xLG89bi5sZW5ndGgsYT17fTsrK3M8bzspe3ZhciBsPW5bc10scD1Lbih0LGwpO2UocCxsKSYmcWUoYSxPbihsLHQpLHApfXJldHVybiBhfWZ1bmN0aW9uIGJkKHQpe3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gS24obix0KX19ZnVuY3Rpb24gZnModCxuLGUscyl7dmFyIG89cz9LYzpoZSxhPS0xLGw9bi5sZW5ndGgscD10O2Zvcih0PT09biYmKG49enQobikpLGUmJihwPW50KHQsT3QoZSkpKTsrK2E8bDspZm9yKHZhciBtPTAsYj1uW2FdLEU9ZT9lKGIpOmI7KG09byhwLEUsbSxzKSk+LTE7KXAhPT10JiZ4ci5jYWxsKHAsbSwxKSx4ci5jYWxsKHQsbSwxKTtyZXR1cm4gdH1mdW5jdGlvbiBRdSh0LG4pe2Zvcih2YXIgZT10P24ubGVuZ3RoOjAscz1lLTE7ZS0tOyl7dmFyIG89bltlXTtpZihlPT1zfHxvIT09YSl7dmFyIGE9bzt5bihvKT94ci5jYWxsKHQsbywxKTpkcyh0LG8pfX1yZXR1cm4gdH1mdW5jdGlvbiBocyh0LG4pe3JldHVybiB0K1NyKFR1KCkqKG4tdCsxKSl9ZnVuY3Rpb24gRWQodCxuLGUscyl7Zm9yKHZhciBvPS0xLGE9aHQoQXIoKG4tdCkvKGV8fDEpKSwwKSxsPXkoYSk7YS0tOylsW3M/YTorK29dPXQsdCs9ZTtyZXR1cm4gbH1mdW5jdGlvbiBjcyh0LG4pe3ZhciBlPSIiO2lmKCF0fHxuPDF8fG4+em4pcmV0dXJuIGU7ZG8gbiUyJiYoZSs9dCksbj1TcihuLzIpLG4mJih0Kz10KTt3aGlsZShuKTtyZXR1cm4gZX1mdW5jdGlvbiBIKHQsbil7cmV0dXJuIHpzKHphKHQsbixEdCksdCsiIil9ZnVuY3Rpb24gTWQodCl7cmV0dXJuIE91KEFlKHQpKX1mdW5jdGlvbiBSZCh0LG4pe3ZhciBlPUFlKHQpO3JldHVybiBXcihlLFluKG4sMCxlLmxlbmd0aCkpfWZ1bmN0aW9uIHFlKHQsbixlLHMpe2lmKCFldCh0KSlyZXR1cm4gdDtuPU9uKG4sdCk7Zm9yKHZhciBvPS0xLGE9bi5sZW5ndGgsbD1hLTEscD10O3AhPW51bGwmJisrbzxhOyl7dmFyIG09Zm4obltvXSksYj1lO2lmKG09PT0iX19wcm90b19fInx8bT09PSJjb25zdHJ1Y3RvciJ8fG09PT0icHJvdG90eXBlIilyZXR1cm4gdDtpZihvIT1sKXt2YXIgRT1wW21dO2I9cz9zKEUsbSxwKTppLGI9PT1pJiYoYj1ldChFKT9FOnluKG5bbysxXSk/W106e30pfU5lKHAsbSxiKSxwPXBbbV19cmV0dXJuIHR9dmFyIGp1PWJyP2Z1bmN0aW9uKHQsbil7cmV0dXJuIGJyLnNldCh0LG4pLHR9OkR0LHpkPXdyP2Z1bmN0aW9uKHQsbil7cmV0dXJuIHdyKHQsInRvU3RyaW5nIix7Y29uZmlndXJhYmxlOiEwLGVudW1lcmFibGU6ITEsdmFsdWU6TnMobiksd3JpdGFibGU6ITB9KX06RHQ7ZnVuY3Rpb24gTGQodCl7cmV0dXJuIFdyKEFlKHQpKX1mdW5jdGlvbiBZdCh0LG4sZSl7dmFyIHM9LTEsbz10Lmxlbmd0aDtuPDAmJihuPS1uPm8/MDpvK24pLGU9ZT5vP286ZSxlPDAmJihlKz1vKSxvPW4+ZT8wOmUtbj4+PjAsbj4+Pj0wO2Zvcih2YXIgYT15KG8pOysrczxvOylhW3NdPXRbcytuXTtyZXR1cm4gYX1mdW5jdGlvbiBCZCh0LG4pe3ZhciBlO3JldHVybiBDbih0LGZ1bmN0aW9uKHMsbyxhKXtyZXR1cm4gZT1uKHMsbyxhKSwhZX0pLCEhZX1mdW5jdGlvbiBEcih0LG4sZSl7dmFyIHM9MCxvPXQ9PW51bGw/czp0Lmxlbmd0aDtpZih0eXBlb2Ygbj09Im51bWJlciImJm49PT1uJiZvPD1UaCl7Zm9yKDtzPG87KXt2YXIgYT1zK28+Pj4xLGw9dFthXTtsIT09bnVsbCYmIUZ0KGwpJiYoZT9sPD1uOmw8bik/cz1hKzE6bz1hfXJldHVybiBvfXJldHVybiBscyh0LG4sRHQsZSl9ZnVuY3Rpb24gbHModCxuLGUscyl7dmFyIG89MCxhPXQ9PW51bGw/MDp0Lmxlbmd0aDtpZihhPT09MClyZXR1cm4gMDtuPWUobik7Zm9yKHZhciBsPW4hPT1uLHA9bj09PW51bGwsbT1GdChuKSxiPW49PT1pO288YTspe3ZhciBFPVNyKChvK2EpLzIpLHo9ZSh0W0VdKSxCPXohPT1pLEM9ej09PW51bGwsUD16PT09eixxPUZ0KHopO2lmKGwpdmFyIEY9c3x8UDtlbHNlIGI/Rj1QJiYoc3x8Qik6cD9GPVAmJkImJihzfHwhQyk6bT9GPVAmJkImJiFDJiYoc3x8IXEpOkN8fHE/Rj0hMTpGPXM/ejw9bjp6PG47Rj9vPUUrMTphPUV9cmV0dXJuIHl0KGEsRGgpfWZ1bmN0aW9uIHRhKHQsbil7Zm9yKHZhciBlPS0xLHM9dC5sZW5ndGgsbz0wLGE9W107KytlPHM7KXt2YXIgbD10W2VdLHA9bj9uKGwpOmw7aWYoIWV8fCFlbihwLG0pKXt2YXIgbT1wO2FbbysrXT1sPT09MD8wOmx9fXJldHVybiBhfWZ1bmN0aW9uIG5hKHQpe3JldHVybiB0eXBlb2YgdD09Im51bWJlciI/dDpGdCh0KT9lcjordH1mdW5jdGlvbiBQdCh0KXtpZih0eXBlb2YgdD09InN0cmluZyIpcmV0dXJuIHQ7aWYoVyh0KSlyZXR1cm4gbnQodCxQdCkrIiI7aWYoRnQodCkpcmV0dXJuIEN1P0N1LmNhbGwodCk6IiI7dmFyIG49dCsiIjtyZXR1cm4gbj09IjAiJiYxL3Q9PS1xbj8iLTAiOm59ZnVuY3Rpb24gSW4odCxuLGUpe3ZhciBzPS0xLG89aHIsYT10Lmxlbmd0aCxsPSEwLHA9W10sbT1wO2lmKGUpbD0hMSxvPVppO2Vsc2UgaWYoYT49aCl7dmFyIGI9bj9udWxsOlpkKHQpO2lmKGIpcmV0dXJuIGxyKGIpO2w9ITEsbz1UZSxtPW5ldyBrbn1lbHNlIG09bj9bXTpwO3Q6Zm9yKDsrK3M8YTspe3ZhciBFPXRbc10sej1uP24oRSk6RTtpZihFPWV8fEUhPT0wP0U6MCxsJiZ6PT09eil7Zm9yKHZhciBCPW0ubGVuZ3RoO0ItLTspaWYobVtCXT09PXopY29udGludWUgdDtuJiZtLnB1c2goeikscC5wdXNoKEUpfWVsc2UgbyhtLHosZSl8fChtIT09cCYmbS5wdXNoKHopLHAucHVzaChFKSl9cmV0dXJuIHB9ZnVuY3Rpb24gZHModCxuKXtyZXR1cm4gbj1PbihuLHQpLHQ9TGEodCxuKSx0PT1udWxsfHxkZWxldGUgdFtmbihLdChuKSldfWZ1bmN0aW9uIGVhKHQsbixlLHMpe3JldHVybiBxZSh0LG4sZShLbih0LG4pKSxzKX1mdW5jdGlvbiBUcih0LG4sZSxzKXtmb3IodmFyIG89dC5sZW5ndGgsYT1zP286LTE7KHM/YS0tOisrYTxvKSYmbih0W2FdLGEsdCk7KTtyZXR1cm4gZT9ZdCh0LHM/MDphLHM/YSsxOm8pOll0KHQscz9hKzE6MCxzP286YSl9ZnVuY3Rpb24gcmEodCxuKXt2YXIgZT10O3JldHVybiBlIGluc3RhbmNlb2YgJCYmKGU9ZS52YWx1ZSgpKSxxaShuLGZ1bmN0aW9uKHMsbyl7cmV0dXJuIG8uZnVuYy5hcHBseShvLnRoaXNBcmcsQm4oW3NdLG8uYXJncykpfSxlKX1mdW5jdGlvbiBwcyh0LG4sZSl7dmFyIHM9dC5sZW5ndGg7aWYoczwyKXJldHVybiBzP0luKHRbMF0pOltdO2Zvcih2YXIgbz0tMSxhPXkocyk7KytvPHM7KWZvcih2YXIgbD10W29dLHA9LTE7KytwPHM7KXAhPW8mJihhW29dPVVlKGFbb118fGwsdFtwXSxuLGUpKTtyZXR1cm4gSW4obXQoYSwxKSxuLGUpfWZ1bmN0aW9uIGlhKHQsbixlKXtmb3IodmFyIHM9LTEsbz10Lmxlbmd0aCxhPW4ubGVuZ3RoLGw9e307KytzPG87KXt2YXIgcD1zPGE/bltzXTppO2UobCx0W3NdLHApfXJldHVybiBsfWZ1bmN0aW9uIF9zKHQpe3JldHVybiBzdCh0KT90OltdfWZ1bmN0aW9uIG1zKHQpe3JldHVybiB0eXBlb2YgdD09ImZ1bmN0aW9uIj90OkR0fWZ1bmN0aW9uIE9uKHQsbil7cmV0dXJuIFcodCk/dDpFcyh0LG4pP1t0XTpDYShLKHQpKX12YXIgRGQ9SDtmdW5jdGlvbiBQbih0LG4sZSl7dmFyIHM9dC5sZW5ndGg7cmV0dXJuIGU9ZT09PWk/czplLCFuJiZlPj1zP3Q6WXQodCxuLGUpfXZhciBzYT15bHx8ZnVuY3Rpb24odCl7cmV0dXJuIF90LmNsZWFyVGltZW91dCh0KX07ZnVuY3Rpb24gb2EodCxuKXtpZihuKXJldHVybiB0LnNsaWNlKCk7dmFyIGU9dC5sZW5ndGgscz1SdT9SdShlKTpuZXcgdC5jb25zdHJ1Y3RvcihlKTtyZXR1cm4gdC5jb3B5KHMpLHN9ZnVuY3Rpb24gZ3ModCl7dmFyIG49bmV3IHQuY29uc3RydWN0b3IodC5ieXRlTGVuZ3RoKTtyZXR1cm4gbmV3IHlyKG4pLnNldChuZXcgeXIodCkpLG59ZnVuY3Rpb24gVGQodCxuKXt2YXIgZT1uP2dzKHQuYnVmZmVyKTp0LmJ1ZmZlcjtyZXR1cm4gbmV3IHQuY29uc3RydWN0b3IoZSx0LmJ5dGVPZmZzZXQsdC5ieXRlTGVuZ3RoKX1mdW5jdGlvbiBDZCh0KXt2YXIgbj1uZXcgdC5jb25zdHJ1Y3Rvcih0LnNvdXJjZSxIby5leGVjKHQpKTtyZXR1cm4gbi5sYXN0SW5kZXg9dC5sYXN0SW5kZXgsbn1mdW5jdGlvbiBJZCh0KXtyZXR1cm4gRmU/SihGZS5jYWxsKHQpKTp7fX1mdW5jdGlvbiB1YSh0LG4pe3ZhciBlPW4/Z3ModC5idWZmZXIpOnQuYnVmZmVyO3JldHVybiBuZXcgdC5jb25zdHJ1Y3RvcihlLHQuYnl0ZU9mZnNldCx0Lmxlbmd0aCl9ZnVuY3Rpb24gYWEodCxuKXtpZih0IT09bil7dmFyIGU9dCE9PWkscz10PT09bnVsbCxvPXQ9PT10LGE9RnQodCksbD1uIT09aSxwPW49PT1udWxsLG09bj09PW4sYj1GdChuKTtpZighcCYmIWImJiFhJiZ0Pm58fGEmJmwmJm0mJiFwJiYhYnx8cyYmbCYmbXx8IWUmJm18fCFvKXJldHVybiAxO2lmKCFzJiYhYSYmIWImJnQ8bnx8YiYmZSYmbyYmIXMmJiFhfHxwJiZlJiZvfHwhbCYmb3x8IW0pcmV0dXJuLTF9cmV0dXJuIDB9ZnVuY3Rpb24gT2QodCxuLGUpe2Zvcih2YXIgcz0tMSxvPXQuY3JpdGVyaWEsYT1uLmNyaXRlcmlhLGw9by5sZW5ndGgscD1lLmxlbmd0aDsrK3M8bDspe3ZhciBtPWFhKG9bc10sYVtzXSk7aWYobSl7aWYocz49cClyZXR1cm4gbTt2YXIgYj1lW3NdO3JldHVybiBtKihiPT0iZGVzYyI/LTE6MSl9fXJldHVybiB0LmluZGV4LW4uaW5kZXh9ZnVuY3Rpb24gZmEodCxuLGUscyl7Zm9yKHZhciBvPS0xLGE9dC5sZW5ndGgsbD1lLmxlbmd0aCxwPS0xLG09bi5sZW5ndGgsYj1odChhLWwsMCksRT15KG0rYiksej0hczsrK3A8bTspRVtwXT1uW3BdO2Zvcig7KytvPGw7KSh6fHxvPGEpJiYoRVtlW29dXT10W29dKTtmb3IoO2ItLTspRVtwKytdPXRbbysrXTtyZXR1cm4gRX1mdW5jdGlvbiBoYSh0LG4sZSxzKXtmb3IodmFyIG89LTEsYT10Lmxlbmd0aCxsPS0xLHA9ZS5sZW5ndGgsbT0tMSxiPW4ubGVuZ3RoLEU9aHQoYS1wLDApLHo9eShFK2IpLEI9IXM7KytvPEU7KXpbb109dFtvXTtmb3IodmFyIEM9bzsrK208YjspeltDK21dPW5bbV07Zm9yKDsrK2w8cDspKEJ8fG88YSkmJih6W0MrZVtsXV09dFtvKytdKTtyZXR1cm4gen1mdW5jdGlvbiB6dCh0LG4pe3ZhciBlPS0xLHM9dC5sZW5ndGg7Zm9yKG58fChuPXkocykpOysrZTxzOyluW2VdPXRbZV07cmV0dXJuIG59ZnVuY3Rpb24gYW4odCxuLGUscyl7dmFyIG89IWU7ZXx8KGU9e30pO2Zvcih2YXIgYT0tMSxsPW4ubGVuZ3RoOysrYTxsOyl7dmFyIHA9blthXSxtPXM/cyhlW3BdLHRbcF0scCxlLHQpOmk7bT09PWkmJihtPXRbcF0pLG8/X24oZSxwLG0pOk5lKGUscCxtKX1yZXR1cm4gZX1mdW5jdGlvbiBQZCh0LG4pe3JldHVybiBhbih0LGJzKHQpLG4pfWZ1bmN0aW9uIEZkKHQsbil7cmV0dXJuIGFuKHQsU2EodCksbil9ZnVuY3Rpb24gQ3IodCxuKXtyZXR1cm4gZnVuY3Rpb24oZSxzKXt2YXIgbz1XKGUpP3FjOnNkLGE9bj9uKCk6e307cmV0dXJuIG8oZSx0LE8ocywyKSxhKX19ZnVuY3Rpb24geWUodCl7cmV0dXJuIEgoZnVuY3Rpb24obixlKXt2YXIgcz0tMSxvPWUubGVuZ3RoLGE9bz4xP2Vbby0xXTppLGw9bz4yP2VbMl06aTtmb3IoYT10Lmxlbmd0aD4zJiZ0eXBlb2YgYT09ImZ1bmN0aW9uIj8oby0tLGEpOmksbCYmYnQoZVswXSxlWzFdLGwpJiYoYT1vPDM/aTphLG89MSksbj1KKG4pOysrczxvOyl7dmFyIHA9ZVtzXTtwJiZ0KG4scCxzLGEpfXJldHVybiBufSl9ZnVuY3Rpb24gY2EodCxuKXtyZXR1cm4gZnVuY3Rpb24oZSxzKXtpZihlPT1udWxsKXJldHVybiBlO2lmKCFMdChlKSlyZXR1cm4gdChlLHMpO2Zvcih2YXIgbz1lLmxlbmd0aCxhPW4/bzotMSxsPUooZSk7KG4/YS0tOisrYTxvKSYmcyhsW2FdLGEsbCkhPT0hMTspO3JldHVybiBlfX1mdW5jdGlvbiBsYSh0KXtyZXR1cm4gZnVuY3Rpb24obixlLHMpe2Zvcih2YXIgbz0tMSxhPUoobiksbD1zKG4pLHA9bC5sZW5ndGg7cC0tOyl7dmFyIG09bFt0P3A6KytvXTtpZihlKGFbbV0sbSxhKT09PSExKWJyZWFrfXJldHVybiBufX1mdW5jdGlvbiBOZCh0LG4sZSl7dmFyIHM9biZYLG89SGUodCk7ZnVuY3Rpb24gYSgpe3ZhciBsPXRoaXMmJnRoaXMhPT1fdCYmdGhpcyBpbnN0YW5jZW9mIGE/bzp0O3JldHVybiBsLmFwcGx5KHM/ZTp0aGlzLGFyZ3VtZW50cyl9cmV0dXJuIGF9ZnVuY3Rpb24gZGEodCl7cmV0dXJuIGZ1bmN0aW9uKG4pe249SyhuKTt2YXIgZT1jZShuKT90bihuKTppLHM9ZT9lWzBdOm4uY2hhckF0KDApLG89ZT9QbihlLDEpLmpvaW4oIiIpOm4uc2xpY2UoMSk7cmV0dXJuIHNbdF0oKStvfX1mdW5jdGlvbiB2ZSh0KXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHFpKGxmKGNmKG4pLnJlcGxhY2UoemMsIiIpKSx0LCIiKX19ZnVuY3Rpb24gSGUodCl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzO3N3aXRjaChuLmxlbmd0aCl7Y2FzZSAwOnJldHVybiBuZXcgdDtjYXNlIDE6cmV0dXJuIG5ldyB0KG5bMF0pO2Nhc2UgMjpyZXR1cm4gbmV3IHQoblswXSxuWzFdKTtjYXNlIDM6cmV0dXJuIG5ldyB0KG5bMF0sblsxXSxuWzJdKTtjYXNlIDQ6cmV0dXJuIG5ldyB0KG5bMF0sblsxXSxuWzJdLG5bM10pO2Nhc2UgNTpyZXR1cm4gbmV3IHQoblswXSxuWzFdLG5bMl0sblszXSxuWzRdKTtjYXNlIDY6cmV0dXJuIG5ldyB0KG5bMF0sblsxXSxuWzJdLG5bM10sbls0XSxuWzVdKTtjYXNlIDc6cmV0dXJuIG5ldyB0KG5bMF0sblsxXSxuWzJdLG5bM10sbls0XSxuWzVdLG5bNl0pfXZhciBlPWdlKHQucHJvdG90eXBlKSxzPXQuYXBwbHkoZSxuKTtyZXR1cm4gZXQocyk/czplfX1mdW5jdGlvbiBVZCh0LG4sZSl7dmFyIHM9SGUodCk7ZnVuY3Rpb24gbygpe2Zvcih2YXIgYT1hcmd1bWVudHMubGVuZ3RoLGw9eShhKSxwPWEsbT14ZShvKTtwLS07KWxbcF09YXJndW1lbnRzW3BdO3ZhciBiPWE8MyYmbFswXSE9PW0mJmxbYS0xXSE9PW0/W106RG4obCxtKTtpZihhLT1iLmxlbmd0aCxhPGUpcmV0dXJuIHlhKHQsbixJcixvLnBsYWNlaG9sZGVyLGksbCxiLGksaSxlLWEpO3ZhciBFPXRoaXMmJnRoaXMhPT1fdCYmdGhpcyBpbnN0YW5jZW9mIG8/czp0O3JldHVybiBJdChFLHRoaXMsbCl9cmV0dXJuIG99ZnVuY3Rpb24gcGEodCl7cmV0dXJuIGZ1bmN0aW9uKG4sZSxzKXt2YXIgbz1KKG4pO2lmKCFMdChuKSl7dmFyIGE9TyhlLDMpO249ZHQobiksZT1mdW5jdGlvbihwKXtyZXR1cm4gYShvW3BdLHAsbyl9fXZhciBsPXQobixlLHMpO3JldHVybiBsPi0xP29bYT9uW2xdOmxdOml9fWZ1bmN0aW9uIF9hKHQpe3JldHVybiBnbihmdW5jdGlvbihuKXt2YXIgZT1uLmxlbmd0aCxzPWUsbz0kdC5wcm90b3R5cGUudGhydTtmb3IodCYmbi5yZXZlcnNlKCk7cy0tOyl7dmFyIGE9bltzXTtpZih0eXBlb2YgYSE9ImZ1bmN0aW9uIil0aHJvdyBuZXcgR3QoZyk7aWYobyYmIWwmJk5yKGEpPT0id3JhcHBlciIpdmFyIGw9bmV3ICR0KFtdLCEwKX1mb3Iocz1sP3M6ZTsrK3M8ZTspe2E9bltzXTt2YXIgcD1OcihhKSxtPXA9PSJ3cmFwcGVyIj9BcyhhKTppO20mJk1zKG1bMF0pJiZtWzFdPT0oQXR8SXxUfFd0KSYmIW1bNF0ubGVuZ3RoJiZtWzldPT0xP2w9bFtOcihtWzBdKV0uYXBwbHkobCxtWzNdKTpsPWEubGVuZ3RoPT0xJiZNcyhhKT9sW3BdKCk6bC50aHJ1KGEpfXJldHVybiBmdW5jdGlvbigpe3ZhciBiPWFyZ3VtZW50cyxFPWJbMF07aWYobCYmYi5sZW5ndGg9PTEmJlcoRSkpcmV0dXJuIGwucGxhbnQoRSkudmFsdWUoKTtmb3IodmFyIHo9MCxCPWU/blt6XS5hcHBseSh0aGlzLGIpOkU7Kyt6PGU7KUI9blt6XS5jYWxsKHRoaXMsQik7cmV0dXJuIEJ9fSl9ZnVuY3Rpb24gSXIodCxuLGUscyxvLGEsbCxwLG0sYil7dmFyIEU9biZBdCx6PW4mWCxCPW4mcnQsQz1uJihJfHV0KSxQPW4mZ3QscT1CP2k6SGUodCk7ZnVuY3Rpb24gRigpe2Zvcih2YXIgRz1hcmd1bWVudHMubGVuZ3RoLGs9eShHKSxOdD1HO050LS07KWtbTnRdPWFyZ3VtZW50c1tOdF07aWYoQyl2YXIgRXQ9eGUoRiksVXQ9SmMoayxFdCk7aWYocyYmKGs9ZmEoayxzLG8sQykpLGEmJihrPWhhKGssYSxsLEMpKSxHLT1VdCxDJiZHPGIpe3ZhciBvdD1EbihrLEV0KTtyZXR1cm4geWEodCxuLElyLEYucGxhY2Vob2xkZXIsZSxrLG90LHAsbSxiLUcpfXZhciBybj16P2U6dGhpcyx3bj1CP3JuW3RdOnQ7cmV0dXJuIEc9ay5sZW5ndGgscD9rPXNwKGsscCk6UCYmRz4xJiZrLnJldmVyc2UoKSxFJiZtPEcmJihrLmxlbmd0aD1tKSx0aGlzJiZ0aGlzIT09X3QmJnRoaXMgaW5zdGFuY2VvZiBGJiYod249cXx8SGUod24pKSx3bi5hcHBseShybixrKX1yZXR1cm4gRn1mdW5jdGlvbiBtYSh0LG4pe3JldHVybiBmdW5jdGlvbihlLHMpe3JldHVybiBkZChlLHQsbihzKSx7fSl9fWZ1bmN0aW9uIE9yKHQsbil7cmV0dXJuIGZ1bmN0aW9uKGUscyl7dmFyIG87aWYoZT09PWkmJnM9PT1pKXJldHVybiBuO2lmKGUhPT1pJiYobz1lKSxzIT09aSl7aWYobz09PWkpcmV0dXJuIHM7dHlwZW9mIGU9PSJzdHJpbmcifHx0eXBlb2Ygcz09InN0cmluZyI/KGU9UHQoZSkscz1QdChzKSk6KGU9bmEoZSkscz1uYShzKSksbz10KGUscyl9cmV0dXJuIG99fWZ1bmN0aW9uIHlzKHQpe3JldHVybiBnbihmdW5jdGlvbihuKXtyZXR1cm4gbj1udChuLE90KE8oKSkpLEgoZnVuY3Rpb24oZSl7dmFyIHM9dGhpcztyZXR1cm4gdChuLGZ1bmN0aW9uKG8pe3JldHVybiBJdChvLHMsZSl9KX0pfSl9ZnVuY3Rpb24gUHIodCxuKXtuPW49PT1pPyIgIjpQdChuKTt2YXIgZT1uLmxlbmd0aDtpZihlPDIpcmV0dXJuIGU/Y3Mobix0KTpuO3ZhciBzPWNzKG4sQXIodC9sZShuKSkpO3JldHVybiBjZShuKT9Qbih0bihzKSwwLHQpLmpvaW4oIiIpOnMuc2xpY2UoMCx0KX1mdW5jdGlvbiBXZCh0LG4sZSxzKXt2YXIgbz1uJlgsYT1IZSh0KTtmdW5jdGlvbiBsKCl7Zm9yKHZhciBwPS0xLG09YXJndW1lbnRzLmxlbmd0aCxiPS0xLEU9cy5sZW5ndGgsej15KEUrbSksQj10aGlzJiZ0aGlzIT09X3QmJnRoaXMgaW5zdGFuY2VvZiBsP2E6dDsrK2I8RTspeltiXT1zW2JdO2Zvcig7bS0tOyl6W2IrK109YXJndW1lbnRzWysrcF07cmV0dXJuIEl0KEIsbz9lOnRoaXMseil9cmV0dXJuIGx9ZnVuY3Rpb24gZ2EodCl7cmV0dXJuIGZ1bmN0aW9uKG4sZSxzKXtyZXR1cm4gcyYmdHlwZW9mIHMhPSJudW1iZXIiJiZidChuLGUscykmJihlPXM9aSksbj14bihuKSxlPT09aT8oZT1uLG49MCk6ZT14bihlKSxzPXM9PT1pP248ZT8xOi0xOnhuKHMpLEVkKG4sZSxzLHQpfX1mdW5jdGlvbiBGcih0KXtyZXR1cm4gZnVuY3Rpb24obixlKXtyZXR1cm4gdHlwZW9mIG49PSJzdHJpbmciJiZ0eXBlb2YgZT09InN0cmluZyJ8fChuPVh0KG4pLGU9WHQoZSkpLHQobixlKX19ZnVuY3Rpb24geWEodCxuLGUscyxvLGEsbCxwLG0sYil7dmFyIEU9biZJLHo9RT9sOmksQj1FP2k6bCxDPUU/YTppLFA9RT9pOmE7bnw9RT9UOkN0LG4mPX4oRT9DdDpUKSxuJnd0fHwobiY9fihYfHJ0KSk7dmFyIHE9W3QsbixvLEMseixQLEIscCxtLGJdLEY9ZS5hcHBseShpLHEpO3JldHVybiBNcyh0KSYmQmEoRixxKSxGLnBsYWNlaG9sZGVyPXMsRGEoRix0LG4pfWZ1bmN0aW9uIHZzKHQpe3ZhciBuPWZ0W3RdO3JldHVybiBmdW5jdGlvbihlLHMpe2lmKGU9WHQoZSkscz1zPT1udWxsPzA6eXQoWihzKSwyOTIpLHMmJkR1KGUpKXt2YXIgbz0oSyhlKSsiZSIpLnNwbGl0KCJlIiksYT1uKG9bMF0rImUiKygrb1sxXStzKSk7cmV0dXJuIG89KEsoYSkrImUiKS5zcGxpdCgiZSIpLCsob1swXSsiZSIrKCtvWzFdLXMpKX1yZXR1cm4gbihlKX19dmFyIFpkPV9lJiYxL2xyKG5ldyBfZShbLC0wXSkpWzFdPT1xbj9mdW5jdGlvbih0KXtyZXR1cm4gbmV3IF9lKHQpfTpacztmdW5jdGlvbiB2YSh0KXtyZXR1cm4gZnVuY3Rpb24obil7dmFyIGU9dnQobik7cmV0dXJuIGU9PVF0P1hpKG4pOmU9PWp0P2lsKG4pOlZjKG4sdChuKSl9fWZ1bmN0aW9uIG1uKHQsbixlLHMsbyxhLGwscCl7dmFyIG09biZydDtpZighbSYmdHlwZW9mIHQhPSJmdW5jdGlvbiIpdGhyb3cgbmV3IEd0KGcpO3ZhciBiPXM/cy5sZW5ndGg6MDtpZihifHwobiY9fihUfEN0KSxzPW89aSksbD1sPT09aT9sOmh0KFoobCksMCkscD1wPT09aT9wOloocCksYi09bz9vLmxlbmd0aDowLG4mQ3Qpe3ZhciBFPXMsej1vO3M9bz1pfXZhciBCPW0/aTpBcyh0KSxDPVt0LG4sZSxzLG8sRSx6LGEsbCxwXTtpZihCJiZlcChDLEIpLHQ9Q1swXSxuPUNbMV0sZT1DWzJdLHM9Q1szXSxvPUNbNF0scD1DWzldPUNbOV09PT1pP20/MDp0Lmxlbmd0aDpodChDWzldLWIsMCksIXAmJm4mKEl8dXQpJiYobiY9fihJfHV0KSksIW58fG49PVgpdmFyIFA9TmQodCxuLGUpO2Vsc2Ugbj09SXx8bj09dXQ/UD1VZCh0LG4scCk6KG49PVR8fG49PShYfFQpKSYmIW8ubGVuZ3RoP1A9V2QodCxuLGUscyk6UD1Jci5hcHBseShpLEMpO3ZhciBxPUI/anU6QmE7cmV0dXJuIERhKHEoUCxDKSx0LG4pfWZ1bmN0aW9uIHhhKHQsbixlLHMpe3JldHVybiB0PT09aXx8ZW4odCxwZVtlXSkmJiFWLmNhbGwocyxlKT9uOnR9ZnVuY3Rpb24gd2EodCxuLGUscyxvLGEpe3JldHVybiBldCh0KSYmZXQobikmJihhLnNldChuLHQpLEJyKHQsbixpLHdhLGEpLGEuZGVsZXRlKG4pKSx0fWZ1bmN0aW9uIHFkKHQpe3JldHVybiBrZSh0KT9pOnR9ZnVuY3Rpb24gQWEodCxuLGUscyxvLGEpe3ZhciBsPWUmTixwPXQubGVuZ3RoLG09bi5sZW5ndGg7aWYocCE9bSYmIShsJiZtPnApKXJldHVybiExO3ZhciBiPWEuZ2V0KHQpLEU9YS5nZXQobik7aWYoYiYmRSlyZXR1cm4gYj09biYmRT09dDt2YXIgej0tMSxCPSEwLEM9ZSZsdD9uZXcga246aTtmb3IoYS5zZXQodCxuKSxhLnNldChuLHQpOysrejxwOyl7dmFyIFA9dFt6XSxxPW5bel07aWYocyl2YXIgRj1sP3MocSxQLHosbix0LGEpOnMoUCxxLHosdCxuLGEpO2lmKEYhPT1pKXtpZihGKWNvbnRpbnVlO0I9ITE7YnJlYWt9aWYoQyl7aWYoIUhpKG4sZnVuY3Rpb24oRyxrKXtpZighVGUoQyxrKSYmKFA9PT1HfHxvKFAsRyxlLHMsYSkpKXJldHVybiBDLnB1c2goayl9KSl7Qj0hMTticmVha319ZWxzZSBpZighKFA9PT1xfHxvKFAscSxlLHMsYSkpKXtCPSExO2JyZWFrfX1yZXR1cm4gYS5kZWxldGUodCksYS5kZWxldGUobiksQn1mdW5jdGlvbiBIZCh0LG4sZSxzLG8sYSxsKXtzd2l0Y2goZSl7Y2FzZSBhZTppZih0LmJ5dGVMZW5ndGghPW4uYnl0ZUxlbmd0aHx8dC5ieXRlT2Zmc2V0IT1uLmJ5dGVPZmZzZXQpcmV0dXJuITE7dD10LmJ1ZmZlcixuPW4uYnVmZmVyO2Nhc2UgRGU6cmV0dXJuISh0LmJ5dGVMZW5ndGghPW4uYnl0ZUxlbmd0aHx8IWEobmV3IHlyKHQpLG5ldyB5cihuKSkpO2Nhc2UgRWU6Y2FzZSBNZTpjYXNlIFJlOnJldHVybiBlbigrdCwrbik7Y2FzZSBpcjpyZXR1cm4gdC5uYW1lPT1uLm5hbWUmJnQubWVzc2FnZT09bi5tZXNzYWdlO2Nhc2UgemU6Y2FzZSBMZTpyZXR1cm4gdD09bisiIjtjYXNlIFF0OnZhciBwPVhpO2Nhc2UganQ6dmFyIG09cyZOO2lmKHB8fChwPWxyKSx0LnNpemUhPW4uc2l6ZSYmIW0pcmV0dXJuITE7dmFyIGI9bC5nZXQodCk7aWYoYilyZXR1cm4gYj09bjtzfD1sdCxsLnNldCh0LG4pO3ZhciBFPUFhKHAodCkscChuKSxzLG8sYSxsKTtyZXR1cm4gbC5kZWxldGUodCksRTtjYXNlIG9yOmlmKEZlKXJldHVybiBGZS5jYWxsKHQpPT1GZS5jYWxsKG4pfXJldHVybiExfWZ1bmN0aW9uIEdkKHQsbixlLHMsbyxhKXt2YXIgbD1lJk4scD14cyh0KSxtPXAubGVuZ3RoLGI9eHMobiksRT1iLmxlbmd0aDtpZihtIT1FJiYhbClyZXR1cm4hMTtmb3IodmFyIHo9bTt6LS07KXt2YXIgQj1wW3pdO2lmKCEobD9CIGluIG46Vi5jYWxsKG4sQikpKXJldHVybiExfXZhciBDPWEuZ2V0KHQpLFA9YS5nZXQobik7aWYoQyYmUClyZXR1cm4gQz09biYmUD09dDt2YXIgcT0hMDthLnNldCh0LG4pLGEuc2V0KG4sdCk7Zm9yKHZhciBGPWw7Kyt6PG07KXtCPXBbel07dmFyIEc9dFtCXSxrPW5bQl07aWYocyl2YXIgTnQ9bD9zKGssRyxCLG4sdCxhKTpzKEcsayxCLHQsbixhKTtpZighKE50PT09aT9HPT09a3x8byhHLGssZSxzLGEpOk50KSl7cT0hMTticmVha31GfHwoRj1CPT0iY29uc3RydWN0b3IiKX1pZihxJiYhRil7dmFyIEV0PXQuY29uc3RydWN0b3IsVXQ9bi5jb25zdHJ1Y3RvcjtFdCE9VXQmJiJjb25zdHJ1Y3RvciJpbiB0JiYiY29uc3RydWN0b3IiaW4gbiYmISh0eXBlb2YgRXQ9PSJmdW5jdGlvbiImJkV0IGluc3RhbmNlb2YgRXQmJnR5cGVvZiBVdD09ImZ1bmN0aW9uIiYmVXQgaW5zdGFuY2VvZiBVdCkmJihxPSExKX1yZXR1cm4gYS5kZWxldGUodCksYS5kZWxldGUobikscX1mdW5jdGlvbiBnbih0KXtyZXR1cm4genMoemEodCxpLEZhKSx0KyIiKX1mdW5jdGlvbiB4cyh0KXtyZXR1cm4gcXUodCxkdCxicyl9ZnVuY3Rpb24gd3ModCl7cmV0dXJuIHF1KHQsQnQsU2EpfXZhciBBcz1icj9mdW5jdGlvbih0KXtyZXR1cm4gYnIuZ2V0KHQpfTpacztmdW5jdGlvbiBOcih0KXtmb3IodmFyIG49dC5uYW1lKyIiLGU9bWVbbl0scz1WLmNhbGwobWUsbik/ZS5sZW5ndGg6MDtzLS07KXt2YXIgbz1lW3NdLGE9by5mdW5jO2lmKGE9PW51bGx8fGE9PXQpcmV0dXJuIG8ubmFtZX1yZXR1cm4gbn1mdW5jdGlvbiB4ZSh0KXt2YXIgbj1WLmNhbGwodSwicGxhY2Vob2xkZXIiKT91OnQ7cmV0dXJuIG4ucGxhY2Vob2xkZXJ9ZnVuY3Rpb24gTygpe3ZhciB0PXUuaXRlcmF0ZWV8fFVzO3JldHVybiB0PXQ9PT1Vcz8kdTp0LGFyZ3VtZW50cy5sZW5ndGg/dChhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdKTp0fWZ1bmN0aW9uIFVyKHQsbil7dmFyIGU9dC5fX2RhdGFfXztyZXR1cm4gUWQobik/ZVt0eXBlb2Ygbj09InN0cmluZyI/InN0cmluZyI6Imhhc2giXTplLm1hcH1mdW5jdGlvbiBTcyh0KXtmb3IodmFyIG49ZHQodCksZT1uLmxlbmd0aDtlLS07KXt2YXIgcz1uW2VdLG89dFtzXTtuW2VdPVtzLG8sTWEobyldfXJldHVybiBufWZ1bmN0aW9uIFhuKHQsbil7dmFyIGU9bmwodCxuKTtyZXR1cm4gR3UoZSk/ZTppfWZ1bmN0aW9uICRkKHQpe3ZhciBuPVYuY2FsbCh0LEduKSxlPXRbR25dO3RyeXt0W0duXT1pO3ZhciBzPSEwfWNhdGNoe312YXIgbz1tci5jYWxsKHQpO3JldHVybiBzJiYobj90W0duXT1lOmRlbGV0ZSB0W0duXSksb312YXIgYnM9Smk/ZnVuY3Rpb24odCl7cmV0dXJuIHQ9PW51bGw/W106KHQ9Sih0KSxMbihKaSh0KSxmdW5jdGlvbihuKXtyZXR1cm4gTHUuY2FsbCh0LG4pfSkpfTpxcyxTYT1KaT9mdW5jdGlvbih0KXtmb3IodmFyIG49W107dDspQm4obixicyh0KSksdD12cih0KTtyZXR1cm4gbn06cXMsdnQ9U3Q7KFFpJiZ2dChuZXcgUWkobmV3IEFycmF5QnVmZmVyKDEpKSkhPWFlfHxJZSYmdnQobmV3IEllKSE9UXR8fGppJiZ2dChqaS5yZXNvbHZlKCkpIT1Vb3x8X2UmJnZ0KG5ldyBfZSkhPWp0fHxPZSYmdnQobmV3IE9lKSE9QmUpJiYodnQ9ZnVuY3Rpb24odCl7dmFyIG49U3QodCksZT1uPT1sbj90LmNvbnN0cnVjdG9yOmkscz1lP1ZuKGUpOiIiO2lmKHMpc3dpdGNoKHMpe2Nhc2UgUmw6cmV0dXJuIGFlO2Nhc2Ugemw6cmV0dXJuIFF0O2Nhc2UgTGw6cmV0dXJuIFVvO2Nhc2UgQmw6cmV0dXJuIGp0O2Nhc2UgRGw6cmV0dXJuIEJlfXJldHVybiBufSk7ZnVuY3Rpb24ga2QodCxuLGUpe2Zvcih2YXIgcz0tMSxvPWUubGVuZ3RoOysrczxvOyl7dmFyIGE9ZVtzXSxsPWEuc2l6ZTtzd2l0Y2goYS50eXBlKXtjYXNlImRyb3AiOnQrPWw7YnJlYWs7Y2FzZSJkcm9wUmlnaHQiOm4tPWw7YnJlYWs7Y2FzZSJ0YWtlIjpuPXl0KG4sdCtsKTticmVhaztjYXNlInRha2VSaWdodCI6dD1odCh0LG4tbCk7YnJlYWt9fXJldHVybntzdGFydDp0LGVuZDpufX1mdW5jdGlvbiBZZCh0KXt2YXIgbj10Lm1hdGNoKGpoKTtyZXR1cm4gbj9uWzFdLnNwbGl0KHRjKTpbXX1mdW5jdGlvbiBiYSh0LG4sZSl7bj1PbihuLHQpO2Zvcih2YXIgcz0tMSxvPW4ubGVuZ3RoLGE9ITE7KytzPG87KXt2YXIgbD1mbihuW3NdKTtpZighKGE9dCE9bnVsbCYmZSh0LGwpKSlicmVhazt0PXRbbF19cmV0dXJuIGF8fCsrcyE9bz9hOihvPXQ9PW51bGw/MDp0Lmxlbmd0aCwhIW8mJmtyKG8pJiZ5bihsLG8pJiYoVyh0KXx8Sm4odCkpKX1mdW5jdGlvbiBLZCh0KXt2YXIgbj10Lmxlbmd0aCxlPW5ldyB0LmNvbnN0cnVjdG9yKG4pO3JldHVybiBuJiZ0eXBlb2YgdFswXT09InN0cmluZyImJlYuY2FsbCh0LCJpbmRleCIpJiYoZS5pbmRleD10LmluZGV4LGUuaW5wdXQ9dC5pbnB1dCksZX1mdW5jdGlvbiBFYSh0KXtyZXR1cm4gdHlwZW9mIHQuY29uc3RydWN0b3I9PSJmdW5jdGlvbiImJiFHZSh0KT9nZSh2cih0KSk6e319ZnVuY3Rpb24gWGQodCxuLGUpe3ZhciBzPXQuY29uc3RydWN0b3I7c3dpdGNoKG4pe2Nhc2UgRGU6cmV0dXJuIGdzKHQpO2Nhc2UgRWU6Y2FzZSBNZTpyZXR1cm4gbmV3IHMoK3QpO2Nhc2UgYWU6cmV0dXJuIFRkKHQsZSk7Y2FzZSBTaTpjYXNlIGJpOmNhc2UgRWk6Y2FzZSBNaTpjYXNlIFJpOmNhc2Ugemk6Y2FzZSBMaTpjYXNlIEJpOmNhc2UgRGk6cmV0dXJuIHVhKHQsZSk7Y2FzZSBRdDpyZXR1cm4gbmV3IHM7Y2FzZSBSZTpjYXNlIExlOnJldHVybiBuZXcgcyh0KTtjYXNlIHplOnJldHVybiBDZCh0KTtjYXNlIGp0OnJldHVybiBuZXcgcztjYXNlIG9yOnJldHVybiBJZCh0KX19ZnVuY3Rpb24gVmQodCxuKXt2YXIgZT1uLmxlbmd0aDtpZighZSlyZXR1cm4gdDt2YXIgcz1lLTE7cmV0dXJuIG5bc109KGU+MT8iJiAiOiIiKStuW3NdLG49bi5qb2luKGU+Mj8iLCAiOiIgIiksdC5yZXBsYWNlKFFoLGB7Ci8qIFt3cmFwcGVkIHdpdGggYCtuK2BdICovCmApfWZ1bmN0aW9uIEpkKHQpe3JldHVybiBXKHQpfHxKbih0KXx8ISEoQnUmJnQmJnRbQnVdKX1mdW5jdGlvbiB5bih0LG4pe3ZhciBlPXR5cGVvZiB0O3JldHVybiBuPW49PW51bGw/em46biwhIW4mJihlPT0ibnVtYmVyInx8ZSE9InN5bWJvbCImJmZjLnRlc3QodCkpJiZ0Pi0xJiZ0JTE9PTAmJnQ8bn1mdW5jdGlvbiBidCh0LG4sZSl7aWYoIWV0KGUpKXJldHVybiExO3ZhciBzPXR5cGVvZiBuO3JldHVybihzPT0ibnVtYmVyIj9MdChlKSYmeW4obixlLmxlbmd0aCk6cz09InN0cmluZyImJm4gaW4gZSk/ZW4oZVtuXSx0KTohMX1mdW5jdGlvbiBFcyh0LG4pe2lmKFcodCkpcmV0dXJuITE7dmFyIGU9dHlwZW9mIHQ7cmV0dXJuIGU9PSJudW1iZXIifHxlPT0ic3ltYm9sInx8ZT09ImJvb2xlYW4ifHx0PT1udWxsfHxGdCh0KT8hMDpLaC50ZXN0KHQpfHwhWWgudGVzdCh0KXx8biE9bnVsbCYmdCBpbiBKKG4pfWZ1bmN0aW9uIFFkKHQpe3ZhciBuPXR5cGVvZiB0O3JldHVybiBuPT0ic3RyaW5nInx8bj09Im51bWJlciJ8fG49PSJzeW1ib2wifHxuPT0iYm9vbGVhbiI/dCE9PSJfX3Byb3RvX18iOnQ9PT1udWxsfWZ1bmN0aW9uIE1zKHQpe3ZhciBuPU5yKHQpLGU9dVtuXTtpZih0eXBlb2YgZSE9ImZ1bmN0aW9uInx8IShuIGluICQucHJvdG90eXBlKSlyZXR1cm4hMTtpZih0PT09ZSlyZXR1cm4hMDt2YXIgcz1BcyhlKTtyZXR1cm4hIXMmJnQ9PT1zWzBdfWZ1bmN0aW9uIGpkKHQpe3JldHVybiEhTXUmJk11IGluIHR9dmFyIHRwPXByP3ZuOkhzO2Z1bmN0aW9uIEdlKHQpe3ZhciBuPXQmJnQuY29uc3RydWN0b3IsZT10eXBlb2Ygbj09ImZ1bmN0aW9uIiYmbi5wcm90b3R5cGV8fHBlO3JldHVybiB0PT09ZX1mdW5jdGlvbiBNYSh0KXtyZXR1cm4gdD09PXQmJiFldCh0KX1mdW5jdGlvbiBSYSh0LG4pe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gZT09bnVsbD8hMTplW3RdPT09biYmKG4hPT1pfHx0IGluIEooZSkpfX1mdW5jdGlvbiBucCh0KXt2YXIgbj1Hcih0LGZ1bmN0aW9uKHMpe3JldHVybiBlLnNpemU9PT1SJiZlLmNsZWFyKCksc30pLGU9bi5jYWNoZTtyZXR1cm4gbn1mdW5jdGlvbiBlcCh0LG4pe3ZhciBlPXRbMV0scz1uWzFdLG89ZXxzLGE9bzwoWHxydHxBdCksbD1zPT1BdCYmZT09SXx8cz09QXQmJmU9PVd0JiZ0WzddLmxlbmd0aDw9bls4XXx8cz09KEF0fFd0KSYmbls3XS5sZW5ndGg8PW5bOF0mJmU9PUk7aWYoIShhfHxsKSlyZXR1cm4gdDtzJlgmJih0WzJdPW5bMl0sb3w9ZSZYPzA6d3QpO3ZhciBwPW5bM107aWYocCl7dmFyIG09dFszXTt0WzNdPW0/ZmEobSxwLG5bNF0pOnAsdFs0XT1tP0RuKHRbM10sTSk6bls0XX1yZXR1cm4gcD1uWzVdLHAmJihtPXRbNV0sdFs1XT1tP2hhKG0scCxuWzZdKTpwLHRbNl09bT9Ebih0WzVdLE0pOm5bNl0pLHA9bls3XSxwJiYodFs3XT1wKSxzJkF0JiYodFs4XT10WzhdPT1udWxsP25bOF06eXQodFs4XSxuWzhdKSksdFs5XT09bnVsbCYmKHRbOV09bls5XSksdFswXT1uWzBdLHRbMV09byx0fWZ1bmN0aW9uIHJwKHQpe3ZhciBuPVtdO2lmKHQhPW51bGwpZm9yKHZhciBlIGluIEoodCkpbi5wdXNoKGUpO3JldHVybiBufWZ1bmN0aW9uIGlwKHQpe3JldHVybiBtci5jYWxsKHQpfWZ1bmN0aW9uIHphKHQsbixlKXtyZXR1cm4gbj1odChuPT09aT90Lmxlbmd0aC0xOm4sMCksZnVuY3Rpb24oKXtmb3IodmFyIHM9YXJndW1lbnRzLG89LTEsYT1odChzLmxlbmd0aC1uLDApLGw9eShhKTsrK288YTspbFtvXT1zW24rb107bz0tMTtmb3IodmFyIHA9eShuKzEpOysrbzxuOylwW29dPXNbb107cmV0dXJuIHBbbl09ZShsKSxJdCh0LHRoaXMscCl9fWZ1bmN0aW9uIExhKHQsbil7cmV0dXJuIG4ubGVuZ3RoPDI/dDpLbih0LFl0KG4sMCwtMSkpfWZ1bmN0aW9uIHNwKHQsbil7Zm9yKHZhciBlPXQubGVuZ3RoLHM9eXQobi5sZW5ndGgsZSksbz16dCh0KTtzLS07KXt2YXIgYT1uW3NdO3Rbc109eW4oYSxlKT9vW2FdOml9cmV0dXJuIHR9ZnVuY3Rpb24gUnModCxuKXtpZighKG49PT0iY29uc3RydWN0b3IiJiZ0eXBlb2YgdFtuXT09ImZ1bmN0aW9uIikmJm4hPSJfX3Byb3RvX18iKXJldHVybiB0W25dfXZhciBCYT1UYShqdSksJGU9eGx8fGZ1bmN0aW9uKHQsbil7cmV0dXJuIF90LnNldFRpbWVvdXQodCxuKX0senM9VGEoemQpO2Z1bmN0aW9uIERhKHQsbixlKXt2YXIgcz1uKyIiO3JldHVybiB6cyh0LFZkKHMsb3AoWWQocyksZSkpKX1mdW5jdGlvbiBUYSh0KXt2YXIgbj0wLGU9MDtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgcz1ibCgpLG89c24tKHMtZSk7aWYoZT1zLG8+MCl7aWYoKytuPj1hdClyZXR1cm4gYXJndW1lbnRzWzBdfWVsc2Ugbj0wO3JldHVybiB0LmFwcGx5KGksYXJndW1lbnRzKX19ZnVuY3Rpb24gV3IodCxuKXt2YXIgZT0tMSxzPXQubGVuZ3RoLG89cy0xO2ZvcihuPW49PT1pP3M6bjsrK2U8bjspe3ZhciBhPWhzKGUsbyksbD10W2FdO3RbYV09dFtlXSx0W2VdPWx9cmV0dXJuIHQubGVuZ3RoPW4sdH12YXIgQ2E9bnAoZnVuY3Rpb24odCl7dmFyIG49W107cmV0dXJuIHQuY2hhckNvZGVBdCgwKT09PTQ2JiZuLnB1c2goIiIpLHQucmVwbGFjZShYaCxmdW5jdGlvbihlLHMsbyxhKXtuLnB1c2gobz9hLnJlcGxhY2UocmMsIiQxIik6c3x8ZSl9KSxufSk7ZnVuY3Rpb24gZm4odCl7aWYodHlwZW9mIHQ9PSJzdHJpbmcifHxGdCh0KSlyZXR1cm4gdDt2YXIgbj10KyIiO3JldHVybiBuPT0iMCImJjEvdD09LXFuPyItMCI6bn1mdW5jdGlvbiBWbih0KXtpZih0IT1udWxsKXt0cnl7cmV0dXJuIF9yLmNhbGwodCl9Y2F0Y2h7fXRyeXtyZXR1cm4gdCsiIn1jYXRjaHt9fXJldHVybiIifWZ1bmN0aW9uIG9wKHQsbil7cmV0dXJuIEh0KENoLGZ1bmN0aW9uKGUpe3ZhciBzPSJfLiIrZVswXTtuJmVbMV0mJiFocih0LHMpJiZ0LnB1c2gocyl9KSx0LnNvcnQoKX1mdW5jdGlvbiBJYSh0KXtpZih0IGluc3RhbmNlb2YgJClyZXR1cm4gdC5jbG9uZSgpO3ZhciBuPW5ldyAkdCh0Ll9fd3JhcHBlZF9fLHQuX19jaGFpbl9fKTtyZXR1cm4gbi5fX2FjdGlvbnNfXz16dCh0Ll9fYWN0aW9uc19fKSxuLl9faW5kZXhfXz10Ll9faW5kZXhfXyxuLl9fdmFsdWVzX189dC5fX3ZhbHVlc19fLG59ZnVuY3Rpb24gdXAodCxuLGUpeyhlP2J0KHQsbixlKTpuPT09aSk/bj0xOm49aHQoWihuKSwwKTt2YXIgcz10PT1udWxsPzA6dC5sZW5ndGg7aWYoIXN8fG48MSlyZXR1cm5bXTtmb3IodmFyIG89MCxhPTAsbD15KEFyKHMvbikpO288czspbFthKytdPVl0KHQsbyxvKz1uKTtyZXR1cm4gbH1mdW5jdGlvbiBhcCh0KXtmb3IodmFyIG49LTEsZT10PT1udWxsPzA6dC5sZW5ndGgscz0wLG89W107KytuPGU7KXt2YXIgYT10W25dO2EmJihvW3MrK109YSl9cmV0dXJuIG99ZnVuY3Rpb24gZnAoKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoO2lmKCF0KXJldHVybltdO2Zvcih2YXIgbj15KHQtMSksZT1hcmd1bWVudHNbMF0scz10O3MtLTspbltzLTFdPWFyZ3VtZW50c1tzXTtyZXR1cm4gQm4oVyhlKT96dChlKTpbZV0sbXQobiwxKSl9dmFyIGhwPUgoZnVuY3Rpb24odCxuKXtyZXR1cm4gc3QodCk/VWUodCxtdChuLDEsc3QsITApKTpbXX0pLGNwPUgoZnVuY3Rpb24odCxuKXt2YXIgZT1LdChuKTtyZXR1cm4gc3QoZSkmJihlPWkpLHN0KHQpP1VlKHQsbXQobiwxLHN0LCEwKSxPKGUsMikpOltdfSksbHA9SChmdW5jdGlvbih0LG4pe3ZhciBlPUt0KG4pO3JldHVybiBzdChlKSYmKGU9aSksc3QodCk/VWUodCxtdChuLDEsc3QsITApLGksZSk6W119KTtmdW5jdGlvbiBkcCh0LG4sZSl7dmFyIHM9dD09bnVsbD8wOnQubGVuZ3RoO3JldHVybiBzPyhuPWV8fG49PT1pPzE6WihuKSxZdCh0LG48MD8wOm4scykpOltdfWZ1bmN0aW9uIHBwKHQsbixlKXt2YXIgcz10PT1udWxsPzA6dC5sZW5ndGg7cmV0dXJuIHM/KG49ZXx8bj09PWk/MTpaKG4pLG49cy1uLFl0KHQsMCxuPDA/MDpuKSk6W119ZnVuY3Rpb24gX3AodCxuKXtyZXR1cm4gdCYmdC5sZW5ndGg/VHIodCxPKG4sMyksITAsITApOltdfWZ1bmN0aW9uIG1wKHQsbil7cmV0dXJuIHQmJnQubGVuZ3RoP1RyKHQsTyhuLDMpLCEwKTpbXX1mdW5jdGlvbiBncCh0LG4sZSxzKXt2YXIgbz10PT1udWxsPzA6dC5sZW5ndGg7cmV0dXJuIG8/KGUmJnR5cGVvZiBlIT0ibnVtYmVyIiYmYnQodCxuLGUpJiYoZT0wLHM9byksZmQodCxuLGUscykpOltdfWZ1bmN0aW9uIE9hKHQsbixlKXt2YXIgcz10PT1udWxsPzA6dC5sZW5ndGg7aWYoIXMpcmV0dXJuLTE7dmFyIG89ZT09bnVsbD8wOlooZSk7cmV0dXJuIG88MCYmKG89aHQocytvLDApKSxjcih0LE8obiwzKSxvKX1mdW5jdGlvbiBQYSh0LG4sZSl7dmFyIHM9dD09bnVsbD8wOnQubGVuZ3RoO2lmKCFzKXJldHVybi0xO3ZhciBvPXMtMTtyZXR1cm4gZSE9PWkmJihvPVooZSksbz1lPDA/aHQocytvLDApOnl0KG8scy0xKSksY3IodCxPKG4sMyksbywhMCl9ZnVuY3Rpb24gRmEodCl7dmFyIG49dD09bnVsbD8wOnQubGVuZ3RoO3JldHVybiBuP210KHQsMSk6W119ZnVuY3Rpb24geXAodCl7dmFyIG49dD09bnVsbD8wOnQubGVuZ3RoO3JldHVybiBuP210KHQscW4pOltdfWZ1bmN0aW9uIHZwKHQsbil7dmFyIGU9dD09bnVsbD8wOnQubGVuZ3RoO3JldHVybiBlPyhuPW49PT1pPzE6WihuKSxtdCh0LG4pKTpbXX1mdW5jdGlvbiB4cCh0KXtmb3IodmFyIG49LTEsZT10PT1udWxsPzA6dC5sZW5ndGgscz17fTsrK248ZTspe3ZhciBvPXRbbl07c1tvWzBdXT1vWzFdfXJldHVybiBzfWZ1bmN0aW9uIE5hKHQpe3JldHVybiB0JiZ0Lmxlbmd0aD90WzBdOml9ZnVuY3Rpb24gd3AodCxuLGUpe3ZhciBzPXQ9PW51bGw/MDp0Lmxlbmd0aDtpZighcylyZXR1cm4tMTt2YXIgbz1lPT1udWxsPzA6WihlKTtyZXR1cm4gbzwwJiYobz1odChzK28sMCkpLGhlKHQsbixvKX1mdW5jdGlvbiBBcCh0KXt2YXIgbj10PT1udWxsPzA6dC5sZW5ndGg7cmV0dXJuIG4/WXQodCwwLC0xKTpbXX12YXIgU3A9SChmdW5jdGlvbih0KXt2YXIgbj1udCh0LF9zKTtyZXR1cm4gbi5sZW5ndGgmJm5bMF09PT10WzBdP3NzKG4pOltdfSksYnA9SChmdW5jdGlvbih0KXt2YXIgbj1LdCh0KSxlPW50KHQsX3MpO3JldHVybiBuPT09S3QoZSk/bj1pOmUucG9wKCksZS5sZW5ndGgmJmVbMF09PT10WzBdP3NzKGUsTyhuLDIpKTpbXX0pLEVwPUgoZnVuY3Rpb24odCl7dmFyIG49S3QodCksZT1udCh0LF9zKTtyZXR1cm4gbj10eXBlb2Ygbj09ImZ1bmN0aW9uIj9uOmksbiYmZS5wb3AoKSxlLmxlbmd0aCYmZVswXT09PXRbMF0/c3MoZSxpLG4pOltdfSk7ZnVuY3Rpb24gTXAodCxuKXtyZXR1cm4gdD09bnVsbD8iIjpBbC5jYWxsKHQsbil9ZnVuY3Rpb24gS3QodCl7dmFyIG49dD09bnVsbD8wOnQubGVuZ3RoO3JldHVybiBuP3Rbbi0xXTppfWZ1bmN0aW9uIFJwKHQsbixlKXt2YXIgcz10PT1udWxsPzA6dC5sZW5ndGg7aWYoIXMpcmV0dXJuLTE7dmFyIG89cztyZXR1cm4gZSE9PWkmJihvPVooZSksbz1vPDA/aHQocytvLDApOnl0KG8scy0xKSksbj09PW4/b2wodCxuLG8pOmNyKHQseXUsbywhMCl9ZnVuY3Rpb24genAodCxuKXtyZXR1cm4gdCYmdC5sZW5ndGg/WHUodCxaKG4pKTppfXZhciBMcD1IKFVhKTtmdW5jdGlvbiBVYSh0LG4pe3JldHVybiB0JiZ0Lmxlbmd0aCYmbiYmbi5sZW5ndGg/ZnModCxuKTp0fWZ1bmN0aW9uIEJwKHQsbixlKXtyZXR1cm4gdCYmdC5sZW5ndGgmJm4mJm4ubGVuZ3RoP2ZzKHQsbixPKGUsMikpOnR9ZnVuY3Rpb24gRHAodCxuLGUpe3JldHVybiB0JiZ0Lmxlbmd0aCYmbiYmbi5sZW5ndGg/ZnModCxuLGksZSk6dH12YXIgVHA9Z24oZnVuY3Rpb24odCxuKXt2YXIgZT10PT1udWxsPzA6dC5sZW5ndGgscz1ucyh0LG4pO3JldHVybiBRdSh0LG50KG4sZnVuY3Rpb24obyl7cmV0dXJuIHluKG8sZSk/K286b30pLnNvcnQoYWEpKSxzfSk7ZnVuY3Rpb24gQ3AodCxuKXt2YXIgZT1bXTtpZighKHQmJnQubGVuZ3RoKSlyZXR1cm4gZTt2YXIgcz0tMSxvPVtdLGE9dC5sZW5ndGg7Zm9yKG49TyhuLDMpOysrczxhOyl7dmFyIGw9dFtzXTtuKGwscyx0KSYmKGUucHVzaChsKSxvLnB1c2gocykpfXJldHVybiBRdSh0LG8pLGV9ZnVuY3Rpb24gTHModCl7cmV0dXJuIHQ9PW51bGw/dDpNbC5jYWxsKHQpfWZ1bmN0aW9uIElwKHQsbixlKXt2YXIgcz10PT1udWxsPzA6dC5sZW5ndGg7cmV0dXJuIHM/KGUmJnR5cGVvZiBlIT0ibnVtYmVyIiYmYnQodCxuLGUpPyhuPTAsZT1zKToobj1uPT1udWxsPzA6WihuKSxlPWU9PT1pP3M6WihlKSksWXQodCxuLGUpKTpbXX1mdW5jdGlvbiBPcCh0LG4pe3JldHVybiBEcih0LG4pfWZ1bmN0aW9uIFBwKHQsbixlKXtyZXR1cm4gbHModCxuLE8oZSwyKSl9ZnVuY3Rpb24gRnAodCxuKXt2YXIgZT10PT1udWxsPzA6dC5sZW5ndGg7aWYoZSl7dmFyIHM9RHIodCxuKTtpZihzPGUmJmVuKHRbc10sbikpcmV0dXJuIHN9cmV0dXJuLTF9ZnVuY3Rpb24gTnAodCxuKXtyZXR1cm4gRHIodCxuLCEwKX1mdW5jdGlvbiBVcCh0LG4sZSl7cmV0dXJuIGxzKHQsbixPKGUsMiksITApfWZ1bmN0aW9uIFdwKHQsbil7dmFyIGU9dD09bnVsbD8wOnQubGVuZ3RoO2lmKGUpe3ZhciBzPURyKHQsbiwhMCktMTtpZihlbih0W3NdLG4pKXJldHVybiBzfXJldHVybi0xfWZ1bmN0aW9uIFpwKHQpe3JldHVybiB0JiZ0Lmxlbmd0aD90YSh0KTpbXX1mdW5jdGlvbiBxcCh0LG4pe3JldHVybiB0JiZ0Lmxlbmd0aD90YSh0LE8obiwyKSk6W119ZnVuY3Rpb24gSHAodCl7dmFyIG49dD09bnVsbD8wOnQubGVuZ3RoO3JldHVybiBuP1l0KHQsMSxuKTpbXX1mdW5jdGlvbiBHcCh0LG4sZSl7cmV0dXJuIHQmJnQubGVuZ3RoPyhuPWV8fG49PT1pPzE6WihuKSxZdCh0LDAsbjwwPzA6bikpOltdfWZ1bmN0aW9uICRwKHQsbixlKXt2YXIgcz10PT1udWxsPzA6dC5sZW5ndGg7cmV0dXJuIHM/KG49ZXx8bj09PWk/MTpaKG4pLG49cy1uLFl0KHQsbjwwPzA6bixzKSk6W119ZnVuY3Rpb24ga3AodCxuKXtyZXR1cm4gdCYmdC5sZW5ndGg/VHIodCxPKG4sMyksITEsITApOltdfWZ1bmN0aW9uIFlwKHQsbil7cmV0dXJuIHQmJnQubGVuZ3RoP1RyKHQsTyhuLDMpKTpbXX12YXIgS3A9SChmdW5jdGlvbih0KXtyZXR1cm4gSW4obXQodCwxLHN0LCEwKSl9KSxYcD1IKGZ1bmN0aW9uKHQpe3ZhciBuPUt0KHQpO3JldHVybiBzdChuKSYmKG49aSksSW4obXQodCwxLHN0LCEwKSxPKG4sMikpfSksVnA9SChmdW5jdGlvbih0KXt2YXIgbj1LdCh0KTtyZXR1cm4gbj10eXBlb2Ygbj09ImZ1bmN0aW9uIj9uOmksSW4obXQodCwxLHN0LCEwKSxpLG4pfSk7ZnVuY3Rpb24gSnAodCl7cmV0dXJuIHQmJnQubGVuZ3RoP0luKHQpOltdfWZ1bmN0aW9uIFFwKHQsbil7cmV0dXJuIHQmJnQubGVuZ3RoP0luKHQsTyhuLDIpKTpbXX1mdW5jdGlvbiBqcCh0LG4pe3JldHVybiBuPXR5cGVvZiBuPT0iZnVuY3Rpb24iP246aSx0JiZ0Lmxlbmd0aD9Jbih0LGksbik6W119ZnVuY3Rpb24gQnModCl7aWYoISh0JiZ0Lmxlbmd0aCkpcmV0dXJuW107dmFyIG49MDtyZXR1cm4gdD1Mbih0LGZ1bmN0aW9uKGUpe2lmKHN0KGUpKXJldHVybiBuPWh0KGUubGVuZ3RoLG4pLCEwfSksWWkobixmdW5jdGlvbihlKXtyZXR1cm4gbnQodCxHaShlKSl9KX1mdW5jdGlvbiBXYSh0LG4pe2lmKCEodCYmdC5sZW5ndGgpKXJldHVybltdO3ZhciBlPUJzKHQpO3JldHVybiBuPT1udWxsP2U6bnQoZSxmdW5jdGlvbihzKXtyZXR1cm4gSXQobixpLHMpfSl9dmFyIHRfPUgoZnVuY3Rpb24odCxuKXtyZXR1cm4gc3QodCk/VWUodCxuKTpbXX0pLG5fPUgoZnVuY3Rpb24odCl7cmV0dXJuIHBzKExuKHQsc3QpKX0pLGVfPUgoZnVuY3Rpb24odCl7dmFyIG49S3QodCk7cmV0dXJuIHN0KG4pJiYobj1pKSxwcyhMbih0LHN0KSxPKG4sMikpfSkscl89SChmdW5jdGlvbih0KXt2YXIgbj1LdCh0KTtyZXR1cm4gbj10eXBlb2Ygbj09ImZ1bmN0aW9uIj9uOmkscHMoTG4odCxzdCksaSxuKX0pLGlfPUgoQnMpO2Z1bmN0aW9uIHNfKHQsbil7cmV0dXJuIGlhKHR8fFtdLG58fFtdLE5lKX1mdW5jdGlvbiBvXyh0LG4pe3JldHVybiBpYSh0fHxbXSxufHxbXSxxZSl9dmFyIHVfPUgoZnVuY3Rpb24odCl7dmFyIG49dC5sZW5ndGgsZT1uPjE/dFtuLTFdOmk7cmV0dXJuIGU9dHlwZW9mIGU9PSJmdW5jdGlvbiI/KHQucG9wKCksZSk6aSxXYSh0LGUpfSk7ZnVuY3Rpb24gWmEodCl7dmFyIG49dSh0KTtyZXR1cm4gbi5fX2NoYWluX189ITAsbn1mdW5jdGlvbiBhXyh0LG4pe3JldHVybiBuKHQpLHR9ZnVuY3Rpb24gWnIodCxuKXtyZXR1cm4gbih0KX12YXIgZl89Z24oZnVuY3Rpb24odCl7dmFyIG49dC5sZW5ndGgsZT1uP3RbMF06MCxzPXRoaXMuX193cmFwcGVkX18sbz1mdW5jdGlvbihhKXtyZXR1cm4gbnMoYSx0KX07cmV0dXJuIG4+MXx8dGhpcy5fX2FjdGlvbnNfXy5sZW5ndGh8fCEocyBpbnN0YW5jZW9mICQpfHwheW4oZSk/dGhpcy50aHJ1KG8pOihzPXMuc2xpY2UoZSwrZSsobj8xOjApKSxzLl9fYWN0aW9uc19fLnB1c2goe2Z1bmM6WnIsYXJnczpbb10sdGhpc0FyZzppfSksbmV3ICR0KHMsdGhpcy5fX2NoYWluX18pLnRocnUoZnVuY3Rpb24oYSl7cmV0dXJuIG4mJiFhLmxlbmd0aCYmYS5wdXNoKGkpLGF9KSl9KTtmdW5jdGlvbiBoXygpe3JldHVybiBaYSh0aGlzKX1mdW5jdGlvbiBjXygpe3JldHVybiBuZXcgJHQodGhpcy52YWx1ZSgpLHRoaXMuX19jaGFpbl9fKX1mdW5jdGlvbiBsXygpe3RoaXMuX192YWx1ZXNfXz09PWkmJih0aGlzLl9fdmFsdWVzX189bmYodGhpcy52YWx1ZSgpKSk7dmFyIHQ9dGhpcy5fX2luZGV4X18+PXRoaXMuX192YWx1ZXNfXy5sZW5ndGgsbj10P2k6dGhpcy5fX3ZhbHVlc19fW3RoaXMuX19pbmRleF9fKytdO3JldHVybntkb25lOnQsdmFsdWU6bn19ZnVuY3Rpb24gZF8oKXtyZXR1cm4gdGhpc31mdW5jdGlvbiBwXyh0KXtmb3IodmFyIG4sZT10aGlzO2UgaW5zdGFuY2VvZiBNcjspe3ZhciBzPUlhKGUpO3MuX19pbmRleF9fPTAscy5fX3ZhbHVlc19fPWksbj9vLl9fd3JhcHBlZF9fPXM6bj1zO3ZhciBvPXM7ZT1lLl9fd3JhcHBlZF9ffXJldHVybiBvLl9fd3JhcHBlZF9fPXQsbn1mdW5jdGlvbiBfXygpe3ZhciB0PXRoaXMuX193cmFwcGVkX187aWYodCBpbnN0YW5jZW9mICQpe3ZhciBuPXQ7cmV0dXJuIHRoaXMuX19hY3Rpb25zX18ubGVuZ3RoJiYobj1uZXcgJCh0aGlzKSksbj1uLnJldmVyc2UoKSxuLl9fYWN0aW9uc19fLnB1c2goe2Z1bmM6WnIsYXJnczpbTHNdLHRoaXNBcmc6aX0pLG5ldyAkdChuLHRoaXMuX19jaGFpbl9fKX1yZXR1cm4gdGhpcy50aHJ1KExzKX1mdW5jdGlvbiBtXygpe3JldHVybiByYSh0aGlzLl9fd3JhcHBlZF9fLHRoaXMuX19hY3Rpb25zX18pfXZhciBnXz1DcihmdW5jdGlvbih0LG4sZSl7Vi5jYWxsKHQsZSk/Kyt0W2VdOl9uKHQsZSwxKX0pO2Z1bmN0aW9uIHlfKHQsbixlKXt2YXIgcz1XKHQpP211OmFkO3JldHVybiBlJiZidCh0LG4sZSkmJihuPWkpLHModCxPKG4sMykpfWZ1bmN0aW9uIHZfKHQsbil7dmFyIGU9Vyh0KT9MbjpXdTtyZXR1cm4gZSh0LE8obiwzKSl9dmFyIHhfPXBhKE9hKSx3Xz1wYShQYSk7ZnVuY3Rpb24gQV8odCxuKXtyZXR1cm4gbXQocXIodCxuKSwxKX1mdW5jdGlvbiBTXyh0LG4pe3JldHVybiBtdChxcih0LG4pLHFuKX1mdW5jdGlvbiBiXyh0LG4sZSl7cmV0dXJuIGU9ZT09PWk/MTpaKGUpLG10KHFyKHQsbiksZSl9ZnVuY3Rpb24gcWEodCxuKXt2YXIgZT1XKHQpP0h0OkNuO3JldHVybiBlKHQsTyhuLDMpKX1mdW5jdGlvbiBIYSh0LG4pe3ZhciBlPVcodCk/SGM6VXU7cmV0dXJuIGUodCxPKG4sMykpfXZhciBFXz1DcihmdW5jdGlvbih0LG4sZSl7Vi5jYWxsKHQsZSk/dFtlXS5wdXNoKG4pOl9uKHQsZSxbbl0pfSk7ZnVuY3Rpb24gTV8odCxuLGUscyl7dD1MdCh0KT90OkFlKHQpLGU9ZSYmIXM/WihlKTowO3ZhciBvPXQubGVuZ3RoO3JldHVybiBlPDAmJihlPWh0KG8rZSwwKSksWXIodCk/ZTw9byYmdC5pbmRleE9mKG4sZSk+LTE6ISFvJiZoZSh0LG4sZSk+LTF9dmFyIFJfPUgoZnVuY3Rpb24odCxuLGUpe3ZhciBzPS0xLG89dHlwZW9mIG49PSJmdW5jdGlvbiIsYT1MdCh0KT95KHQubGVuZ3RoKTpbXTtyZXR1cm4gQ24odCxmdW5jdGlvbihsKXthWysrc109bz9JdChuLGwsZSk6V2UobCxuLGUpfSksYX0pLHpfPUNyKGZ1bmN0aW9uKHQsbixlKXtfbih0LGUsbil9KTtmdW5jdGlvbiBxcih0LG4pe3ZhciBlPVcodCk/bnQ6a3U7cmV0dXJuIGUodCxPKG4sMykpfWZ1bmN0aW9uIExfKHQsbixlLHMpe3JldHVybiB0PT1udWxsP1tdOihXKG4pfHwobj1uPT1udWxsP1tdOltuXSksZT1zP2k6ZSxXKGUpfHwoZT1lPT1udWxsP1tdOltlXSksVnUodCxuLGUpKX12YXIgQl89Q3IoZnVuY3Rpb24odCxuLGUpe3RbZT8wOjFdLnB1c2gobil9LGZ1bmN0aW9uKCl7cmV0dXJuW1tdLFtdXX0pO2Z1bmN0aW9uIERfKHQsbixlKXt2YXIgcz1XKHQpP3FpOnh1LG89YXJndW1lbnRzLmxlbmd0aDwzO3JldHVybiBzKHQsTyhuLDQpLGUsbyxDbil9ZnVuY3Rpb24gVF8odCxuLGUpe3ZhciBzPVcodCk/R2M6eHUsbz1hcmd1bWVudHMubGVuZ3RoPDM7cmV0dXJuIHModCxPKG4sNCksZSxvLFV1KX1mdW5jdGlvbiBDXyh0LG4pe3ZhciBlPVcodCk/TG46V3U7cmV0dXJuIGUodCwkcihPKG4sMykpKX1mdW5jdGlvbiBJXyh0KXt2YXIgbj1XKHQpP091Ok1kO3JldHVybiBuKHQpfWZ1bmN0aW9uIE9fKHQsbixlKXsoZT9idCh0LG4sZSk6bj09PWkpP249MTpuPVoobik7dmFyIHM9Vyh0KT9yZDpSZDtyZXR1cm4gcyh0LG4pfWZ1bmN0aW9uIFBfKHQpe3ZhciBuPVcodCk/aWQ6TGQ7cmV0dXJuIG4odCl9ZnVuY3Rpb24gRl8odCl7aWYodD09bnVsbClyZXR1cm4gMDtpZihMdCh0KSlyZXR1cm4gWXIodCk/bGUodCk6dC5sZW5ndGg7dmFyIG49dnQodCk7cmV0dXJuIG49PVF0fHxuPT1qdD90LnNpemU6dXModCkubGVuZ3RofWZ1bmN0aW9uIE5fKHQsbixlKXt2YXIgcz1XKHQpP0hpOkJkO3JldHVybiBlJiZidCh0LG4sZSkmJihuPWkpLHModCxPKG4sMykpfXZhciBVXz1IKGZ1bmN0aW9uKHQsbil7aWYodD09bnVsbClyZXR1cm5bXTt2YXIgZT1uLmxlbmd0aDtyZXR1cm4gZT4xJiZidCh0LG5bMF0sblsxXSk/bj1bXTplPjImJmJ0KG5bMF0sblsxXSxuWzJdKSYmKG49W25bMF1dKSxWdSh0LG10KG4sMSksW10pfSksSHI9dmx8fGZ1bmN0aW9uKCl7cmV0dXJuIF90LkRhdGUubm93KCl9O2Z1bmN0aW9uIFdfKHQsbil7aWYodHlwZW9mIG4hPSJmdW5jdGlvbiIpdGhyb3cgbmV3IEd0KGcpO3JldHVybiB0PVoodCksZnVuY3Rpb24oKXtpZigtLXQ8MSlyZXR1cm4gbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fWZ1bmN0aW9uIEdhKHQsbixlKXtyZXR1cm4gbj1lP2k6bixuPXQmJm49PW51bGw/dC5sZW5ndGg6bixtbih0LEF0LGksaSxpLGksbil9ZnVuY3Rpb24gJGEodCxuKXt2YXIgZTtpZih0eXBlb2YgbiE9ImZ1bmN0aW9uIil0aHJvdyBuZXcgR3QoZyk7cmV0dXJuIHQ9Wih0KSxmdW5jdGlvbigpe3JldHVybi0tdD4wJiYoZT1uLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksdDw9MSYmKG49aSksZX19dmFyIERzPUgoZnVuY3Rpb24odCxuLGUpe3ZhciBzPVg7aWYoZS5sZW5ndGgpe3ZhciBvPURuKGUseGUoRHMpKTtzfD1UfXJldHVybiBtbih0LHMsbixlLG8pfSksa2E9SChmdW5jdGlvbih0LG4sZSl7dmFyIHM9WHxydDtpZihlLmxlbmd0aCl7dmFyIG89RG4oZSx4ZShrYSkpO3N8PVR9cmV0dXJuIG1uKG4scyx0LGUsbyl9KTtmdW5jdGlvbiBZYSh0LG4sZSl7bj1lP2k6bjt2YXIgcz1tbih0LEksaSxpLGksaSxpLG4pO3JldHVybiBzLnBsYWNlaG9sZGVyPVlhLnBsYWNlaG9sZGVyLHN9ZnVuY3Rpb24gS2EodCxuLGUpe249ZT9pOm47dmFyIHM9bW4odCx1dCxpLGksaSxpLGksbik7cmV0dXJuIHMucGxhY2Vob2xkZXI9S2EucGxhY2Vob2xkZXIsc31mdW5jdGlvbiBYYSh0LG4sZSl7dmFyIHMsbyxhLGwscCxtLGI9MCxFPSExLHo9ITEsQj0hMDtpZih0eXBlb2YgdCE9ImZ1bmN0aW9uIil0aHJvdyBuZXcgR3QoZyk7bj1YdChuKXx8MCxldChlKSYmKEU9ISFlLmxlYWRpbmcsej0ibWF4V2FpdCJpbiBlLGE9ej9odChYdChlLm1heFdhaXQpfHwwLG4pOmEsQj0idHJhaWxpbmciaW4gZT8hIWUudHJhaWxpbmc6Qik7ZnVuY3Rpb24gQyhvdCl7dmFyIHJuPXMsd249bztyZXR1cm4gcz1vPWksYj1vdCxsPXQuYXBwbHkod24scm4pLGx9ZnVuY3Rpb24gUChvdCl7cmV0dXJuIGI9b3QscD0kZShHLG4pLEU/QyhvdCk6bH1mdW5jdGlvbiBxKG90KXt2YXIgcm49b3QtbSx3bj1vdC1iLF9mPW4tcm47cmV0dXJuIHo/eXQoX2YsYS13bik6X2Z9ZnVuY3Rpb24gRihvdCl7dmFyIHJuPW90LW0sd249b3QtYjtyZXR1cm4gbT09PWl8fHJuPj1ufHxybjwwfHx6JiZ3bj49YX1mdW5jdGlvbiBHKCl7dmFyIG90PUhyKCk7aWYoRihvdCkpcmV0dXJuIGsob3QpO3A9JGUoRyxxKG90KSl9ZnVuY3Rpb24gayhvdCl7cmV0dXJuIHA9aSxCJiZzP0Mob3QpOihzPW89aSxsKX1mdW5jdGlvbiBOdCgpe3AhPT1pJiZzYShwKSxiPTAscz1tPW89cD1pfWZ1bmN0aW9uIEV0KCl7cmV0dXJuIHA9PT1pP2w6ayhIcigpKX1mdW5jdGlvbiBVdCgpe3ZhciBvdD1IcigpLHJuPUYob3QpO2lmKHM9YXJndW1lbnRzLG89dGhpcyxtPW90LHJuKXtpZihwPT09aSlyZXR1cm4gUChtKTtpZih6KXJldHVybiBzYShwKSxwPSRlKEcsbiksQyhtKX1yZXR1cm4gcD09PWkmJihwPSRlKEcsbikpLGx9cmV0dXJuIFV0LmNhbmNlbD1OdCxVdC5mbHVzaD1FdCxVdH12YXIgWl89SChmdW5jdGlvbih0LG4pe3JldHVybiBOdSh0LDEsbil9KSxxXz1IKGZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gTnUodCxYdChuKXx8MCxlKX0pO2Z1bmN0aW9uIEhfKHQpe3JldHVybiBtbih0LGd0KX1mdW5jdGlvbiBHcih0LG4pe2lmKHR5cGVvZiB0IT0iZnVuY3Rpb24ifHxuIT1udWxsJiZ0eXBlb2YgbiE9ImZ1bmN0aW9uIil0aHJvdyBuZXcgR3QoZyk7dmFyIGU9ZnVuY3Rpb24oKXt2YXIgcz1hcmd1bWVudHMsbz1uP24uYXBwbHkodGhpcyxzKTpzWzBdLGE9ZS5jYWNoZTtpZihhLmhhcyhvKSlyZXR1cm4gYS5nZXQobyk7dmFyIGw9dC5hcHBseSh0aGlzLHMpO3JldHVybiBlLmNhY2hlPWEuc2V0KG8sbCl8fGEsbH07cmV0dXJuIGUuY2FjaGU9bmV3KEdyLkNhY2hlfHxwbiksZX1Hci5DYWNoZT1wbjtmdW5jdGlvbiAkcih0KXtpZih0eXBlb2YgdCE9ImZ1bmN0aW9uIil0aHJvdyBuZXcgR3QoZyk7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzO3N3aXRjaChuLmxlbmd0aCl7Y2FzZSAwOnJldHVybiF0LmNhbGwodGhpcyk7Y2FzZSAxOnJldHVybiF0LmNhbGwodGhpcyxuWzBdKTtjYXNlIDI6cmV0dXJuIXQuY2FsbCh0aGlzLG5bMF0sblsxXSk7Y2FzZSAzOnJldHVybiF0LmNhbGwodGhpcyxuWzBdLG5bMV0sblsyXSl9cmV0dXJuIXQuYXBwbHkodGhpcyxuKX19ZnVuY3Rpb24gR18odCl7cmV0dXJuICRhKDIsdCl9dmFyICRfPURkKGZ1bmN0aW9uKHQsbil7bj1uLmxlbmd0aD09MSYmVyhuWzBdKT9udChuWzBdLE90KE8oKSkpOm50KG10KG4sMSksT3QoTygpKSk7dmFyIGU9bi5sZW5ndGg7cmV0dXJuIEgoZnVuY3Rpb24ocyl7Zm9yKHZhciBvPS0xLGE9eXQocy5sZW5ndGgsZSk7KytvPGE7KXNbb109bltvXS5jYWxsKHRoaXMsc1tvXSk7cmV0dXJuIEl0KHQsdGhpcyxzKX0pfSksVHM9SChmdW5jdGlvbih0LG4pe3ZhciBlPURuKG4seGUoVHMpKTtyZXR1cm4gbW4odCxULGksbixlKX0pLFZhPUgoZnVuY3Rpb24odCxuKXt2YXIgZT1EbihuLHhlKFZhKSk7cmV0dXJuIG1uKHQsQ3QsaSxuLGUpfSksa189Z24oZnVuY3Rpb24odCxuKXtyZXR1cm4gbW4odCxXdCxpLGksaSxuKX0pO2Z1bmN0aW9uIFlfKHQsbil7aWYodHlwZW9mIHQhPSJmdW5jdGlvbiIpdGhyb3cgbmV3IEd0KGcpO3JldHVybiBuPW49PT1pP246WihuKSxIKHQsbil9ZnVuY3Rpb24gS18odCxuKXtpZih0eXBlb2YgdCE9ImZ1bmN0aW9uIil0aHJvdyBuZXcgR3QoZyk7cmV0dXJuIG49bj09bnVsbD8wOmh0KFoobiksMCksSChmdW5jdGlvbihlKXt2YXIgcz1lW25dLG89UG4oZSwwLG4pO3JldHVybiBzJiZCbihvLHMpLEl0KHQsdGhpcyxvKX0pfWZ1bmN0aW9uIFhfKHQsbixlKXt2YXIgcz0hMCxvPSEwO2lmKHR5cGVvZiB0IT0iZnVuY3Rpb24iKXRocm93IG5ldyBHdChnKTtyZXR1cm4gZXQoZSkmJihzPSJsZWFkaW5nImluIGU/ISFlLmxlYWRpbmc6cyxvPSJ0cmFpbGluZyJpbiBlPyEhZS50cmFpbGluZzpvKSxYYSh0LG4se2xlYWRpbmc6cyxtYXhXYWl0Om4sdHJhaWxpbmc6b30pfWZ1bmN0aW9uIFZfKHQpe3JldHVybiBHYSh0LDEpfWZ1bmN0aW9uIEpfKHQsbil7cmV0dXJuIFRzKG1zKG4pLHQpfWZ1bmN0aW9uIFFfKCl7aWYoIWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuW107dmFyIHQ9YXJndW1lbnRzWzBdO3JldHVybiBXKHQpP3Q6W3RdfWZ1bmN0aW9uIGpfKHQpe3JldHVybiBrdCh0LEwpfWZ1bmN0aW9uIHRtKHQsbil7cmV0dXJuIG49dHlwZW9mIG49PSJmdW5jdGlvbiI/bjppLGt0KHQsTCxuKX1mdW5jdGlvbiBubSh0KXtyZXR1cm4ga3QodCxTfEwpfWZ1bmN0aW9uIGVtKHQsbil7cmV0dXJuIG49dHlwZW9mIG49PSJmdW5jdGlvbiI/bjppLGt0KHQsU3xMLG4pfWZ1bmN0aW9uIHJtKHQsbil7cmV0dXJuIG49PW51bGx8fEZ1KHQsbixkdChuKSl9ZnVuY3Rpb24gZW4odCxuKXtyZXR1cm4gdD09PW58fHQhPT10JiZuIT09bn12YXIgaW09RnIoaXMpLHNtPUZyKGZ1bmN0aW9uKHQsbil7cmV0dXJuIHQ+PW59KSxKbj1IdShmdW5jdGlvbigpe3JldHVybiBhcmd1bWVudHN9KCkpP0h1OmZ1bmN0aW9uKHQpe3JldHVybiBpdCh0KSYmVi5jYWxsKHQsImNhbGxlZSIpJiYhTHUuY2FsbCh0LCJjYWxsZWUiKX0sVz15LmlzQXJyYXksb209aHU/T3QoaHUpOnBkO2Z1bmN0aW9uIEx0KHQpe3JldHVybiB0IT1udWxsJiZrcih0Lmxlbmd0aCkmJiF2bih0KX1mdW5jdGlvbiBzdCh0KXtyZXR1cm4gaXQodCkmJkx0KHQpfWZ1bmN0aW9uIHVtKHQpe3JldHVybiB0PT09ITB8fHQ9PT0hMXx8aXQodCkmJlN0KHQpPT1FZX12YXIgRm49d2x8fEhzLGFtPWN1P090KGN1KTpfZDtmdW5jdGlvbiBmbSh0KXtyZXR1cm4gaXQodCkmJnQubm9kZVR5cGU9PT0xJiYha2UodCl9ZnVuY3Rpb24gaG0odCl7aWYodD09bnVsbClyZXR1cm4hMDtpZihMdCh0KSYmKFcodCl8fHR5cGVvZiB0PT0ic3RyaW5nInx8dHlwZW9mIHQuc3BsaWNlPT0iZnVuY3Rpb24ifHxGbih0KXx8d2UodCl8fEpuKHQpKSlyZXR1cm4hdC5sZW5ndGg7dmFyIG49dnQodCk7aWYobj09UXR8fG49PWp0KXJldHVybiF0LnNpemU7aWYoR2UodCkpcmV0dXJuIXVzKHQpLmxlbmd0aDtmb3IodmFyIGUgaW4gdClpZihWLmNhbGwodCxlKSlyZXR1cm4hMTtyZXR1cm4hMH1mdW5jdGlvbiBjbSh0LG4pe3JldHVybiBaZSh0LG4pfWZ1bmN0aW9uIGxtKHQsbixlKXtlPXR5cGVvZiBlPT0iZnVuY3Rpb24iP2U6aTt2YXIgcz1lP2UodCxuKTppO3JldHVybiBzPT09aT9aZSh0LG4saSxlKTohIXN9ZnVuY3Rpb24gQ3ModCl7aWYoIWl0KHQpKXJldHVybiExO3ZhciBuPVN0KHQpO3JldHVybiBuPT1pcnx8bj09T2h8fHR5cGVvZiB0Lm1lc3NhZ2U9PSJzdHJpbmciJiZ0eXBlb2YgdC5uYW1lPT0ic3RyaW5nIiYmIWtlKHQpfWZ1bmN0aW9uIGRtKHQpe3JldHVybiB0eXBlb2YgdD09Im51bWJlciImJkR1KHQpfWZ1bmN0aW9uIHZuKHQpe2lmKCFldCh0KSlyZXR1cm4hMTt2YXIgbj1TdCh0KTtyZXR1cm4gbj09c3J8fG49PU5vfHxuPT1JaHx8bj09Rmh9ZnVuY3Rpb24gSmEodCl7cmV0dXJuIHR5cGVvZiB0PT0ibnVtYmVyIiYmdD09Wih0KX1mdW5jdGlvbiBrcih0KXtyZXR1cm4gdHlwZW9mIHQ9PSJudW1iZXIiJiZ0Pi0xJiZ0JTE9PTAmJnQ8PXpufWZ1bmN0aW9uIGV0KHQpe3ZhciBuPXR5cGVvZiB0O3JldHVybiB0IT1udWxsJiYobj09Im9iamVjdCJ8fG49PSJmdW5jdGlvbiIpfWZ1bmN0aW9uIGl0KHQpe3JldHVybiB0IT1udWxsJiZ0eXBlb2YgdD09Im9iamVjdCJ9dmFyIFFhPWx1P090KGx1KTpnZDtmdW5jdGlvbiBwbSh0LG4pe3JldHVybiB0PT09bnx8b3ModCxuLFNzKG4pKX1mdW5jdGlvbiBfbSh0LG4sZSl7cmV0dXJuIGU9dHlwZW9mIGU9PSJmdW5jdGlvbiI/ZTppLG9zKHQsbixTcyhuKSxlKX1mdW5jdGlvbiBtbSh0KXtyZXR1cm4gamEodCkmJnQhPSt0fWZ1bmN0aW9uIGdtKHQpe2lmKHRwKHQpKXRocm93IG5ldyBVKGMpO3JldHVybiBHdSh0KX1mdW5jdGlvbiB5bSh0KXtyZXR1cm4gdD09PW51bGx9ZnVuY3Rpb24gdm0odCl7cmV0dXJuIHQ9PW51bGx9ZnVuY3Rpb24gamEodCl7cmV0dXJuIHR5cGVvZiB0PT0ibnVtYmVyInx8aXQodCkmJlN0KHQpPT1SZX1mdW5jdGlvbiBrZSh0KXtpZighaXQodCl8fFN0KHQpIT1sbilyZXR1cm4hMTt2YXIgbj12cih0KTtpZihuPT09bnVsbClyZXR1cm4hMDt2YXIgZT1WLmNhbGwobiwiY29uc3RydWN0b3IiKSYmbi5jb25zdHJ1Y3RvcjtyZXR1cm4gdHlwZW9mIGU9PSJmdW5jdGlvbiImJmUgaW5zdGFuY2VvZiBlJiZfci5jYWxsKGUpPT1fbH12YXIgSXM9ZHU/T3QoZHUpOnlkO2Z1bmN0aW9uIHhtKHQpe3JldHVybiBKYSh0KSYmdD49LXpuJiZ0PD16bn12YXIgdGY9cHU/T3QocHUpOnZkO2Z1bmN0aW9uIFlyKHQpe3JldHVybiB0eXBlb2YgdD09InN0cmluZyJ8fCFXKHQpJiZpdCh0KSYmU3QodCk9PUxlfWZ1bmN0aW9uIEZ0KHQpe3JldHVybiB0eXBlb2YgdD09InN5bWJvbCJ8fGl0KHQpJiZTdCh0KT09b3J9dmFyIHdlPV91P090KF91KTp4ZDtmdW5jdGlvbiB3bSh0KXtyZXR1cm4gdD09PWl9ZnVuY3Rpb24gQW0odCl7cmV0dXJuIGl0KHQpJiZ2dCh0KT09QmV9ZnVuY3Rpb24gU20odCl7cmV0dXJuIGl0KHQpJiZTdCh0KT09VWh9dmFyIGJtPUZyKGFzKSxFbT1GcihmdW5jdGlvbih0LG4pe3JldHVybiB0PD1ufSk7ZnVuY3Rpb24gbmYodCl7aWYoIXQpcmV0dXJuW107aWYoTHQodCkpcmV0dXJuIFlyKHQpP3RuKHQpOnp0KHQpO2lmKENlJiZ0W0NlXSlyZXR1cm4gcmwodFtDZV0oKSk7dmFyIG49dnQodCksZT1uPT1RdD9YaTpuPT1qdD9scjpBZTtyZXR1cm4gZSh0KX1mdW5jdGlvbiB4bih0KXtpZighdClyZXR1cm4gdD09PTA/dDowO2lmKHQ9WHQodCksdD09PXFufHx0PT09LXFuKXt2YXIgbj10PDA/LTE6MTtyZXR1cm4gbipCaH1yZXR1cm4gdD09PXQ/dDowfWZ1bmN0aW9uIFoodCl7dmFyIG49eG4odCksZT1uJTE7cmV0dXJuIG49PT1uP2U/bi1lOm46MH1mdW5jdGlvbiBlZih0KXtyZXR1cm4gdD9ZbihaKHQpLDAsb24pOjB9ZnVuY3Rpb24gWHQodCl7aWYodHlwZW9mIHQ9PSJudW1iZXIiKXJldHVybiB0O2lmKEZ0KHQpKXJldHVybiBlcjtpZihldCh0KSl7dmFyIG49dHlwZW9mIHQudmFsdWVPZj09ImZ1bmN0aW9uIj90LnZhbHVlT2YoKTp0O3Q9ZXQobik/bisiIjpufWlmKHR5cGVvZiB0IT0ic3RyaW5nIilyZXR1cm4gdD09PTA/dDordDt0PXd1KHQpO3ZhciBlPW9jLnRlc3QodCk7cmV0dXJuIGV8fGFjLnRlc3QodCk/V2ModC5zbGljZSgyKSxlPzI6OCk6c2MudGVzdCh0KT9lcjordH1mdW5jdGlvbiByZih0KXtyZXR1cm4gYW4odCxCdCh0KSl9ZnVuY3Rpb24gTW0odCl7cmV0dXJuIHQ/WW4oWih0KSwtem4sem4pOnQ9PT0wP3Q6MH1mdW5jdGlvbiBLKHQpe3JldHVybiB0PT1udWxsPyIiOlB0KHQpfXZhciBSbT15ZShmdW5jdGlvbih0LG4pe2lmKEdlKG4pfHxMdChuKSl7YW4obixkdChuKSx0KTtyZXR1cm59Zm9yKHZhciBlIGluIG4pVi5jYWxsKG4sZSkmJk5lKHQsZSxuW2VdKX0pLHNmPXllKGZ1bmN0aW9uKHQsbil7YW4obixCdChuKSx0KX0pLEtyPXllKGZ1bmN0aW9uKHQsbixlLHMpe2FuKG4sQnQobiksdCxzKX0pLHptPXllKGZ1bmN0aW9uKHQsbixlLHMpe2FuKG4sZHQobiksdCxzKX0pLExtPWduKG5zKTtmdW5jdGlvbiBCbSh0LG4pe3ZhciBlPWdlKHQpO3JldHVybiBuPT1udWxsP2U6UHUoZSxuKX12YXIgRG09SChmdW5jdGlvbih0LG4pe3Q9Sih0KTt2YXIgZT0tMSxzPW4ubGVuZ3RoLG89cz4yP25bMl06aTtmb3IobyYmYnQoblswXSxuWzFdLG8pJiYocz0xKTsrK2U8czspZm9yKHZhciBhPW5bZV0sbD1CdChhKSxwPS0xLG09bC5sZW5ndGg7KytwPG07KXt2YXIgYj1sW3BdLEU9dFtiXTsoRT09PWl8fGVuKEUscGVbYl0pJiYhVi5jYWxsKHQsYikpJiYodFtiXT1hW2JdKX1yZXR1cm4gdH0pLFRtPUgoZnVuY3Rpb24odCl7cmV0dXJuIHQucHVzaChpLHdhKSxJdChvZixpLHQpfSk7ZnVuY3Rpb24gQ20odCxuKXtyZXR1cm4gZ3UodCxPKG4sMyksdW4pfWZ1bmN0aW9uIEltKHQsbil7cmV0dXJuIGd1KHQsTyhuLDMpLHJzKX1mdW5jdGlvbiBPbSh0LG4pe3JldHVybiB0PT1udWxsP3Q6ZXModCxPKG4sMyksQnQpfWZ1bmN0aW9uIFBtKHQsbil7cmV0dXJuIHQ9PW51bGw/dDpadSh0LE8obiwzKSxCdCl9ZnVuY3Rpb24gRm0odCxuKXtyZXR1cm4gdCYmdW4odCxPKG4sMykpfWZ1bmN0aW9uIE5tKHQsbil7cmV0dXJuIHQmJnJzKHQsTyhuLDMpKX1mdW5jdGlvbiBVbSh0KXtyZXR1cm4gdD09bnVsbD9bXTpMcih0LGR0KHQpKX1mdW5jdGlvbiBXbSh0KXtyZXR1cm4gdD09bnVsbD9bXTpMcih0LEJ0KHQpKX1mdW5jdGlvbiBPcyh0LG4sZSl7dmFyIHM9dD09bnVsbD9pOktuKHQsbik7cmV0dXJuIHM9PT1pP2U6c31mdW5jdGlvbiBabSh0LG4pe3JldHVybiB0IT1udWxsJiZiYSh0LG4saGQpfWZ1bmN0aW9uIFBzKHQsbil7cmV0dXJuIHQhPW51bGwmJmJhKHQsbixjZCl9dmFyIHFtPW1hKGZ1bmN0aW9uKHQsbixlKXtuIT1udWxsJiZ0eXBlb2Ygbi50b1N0cmluZyE9ImZ1bmN0aW9uIiYmKG49bXIuY2FsbChuKSksdFtuXT1lfSxOcyhEdCkpLEhtPW1hKGZ1bmN0aW9uKHQsbixlKXtuIT1udWxsJiZ0eXBlb2Ygbi50b1N0cmluZyE9ImZ1bmN0aW9uIiYmKG49bXIuY2FsbChuKSksVi5jYWxsKHQsbik/dFtuXS5wdXNoKGUpOnRbbl09W2VdfSxPKSxHbT1IKFdlKTtmdW5jdGlvbiBkdCh0KXtyZXR1cm4gTHQodCk/SXUodCk6dXModCl9ZnVuY3Rpb24gQnQodCl7cmV0dXJuIEx0KHQpP0l1KHQsITApOndkKHQpfWZ1bmN0aW9uICRtKHQsbil7dmFyIGU9e307cmV0dXJuIG49TyhuLDMpLHVuKHQsZnVuY3Rpb24ocyxvLGEpe19uKGUsbihzLG8sYSkscyl9KSxlfWZ1bmN0aW9uIGttKHQsbil7dmFyIGU9e307cmV0dXJuIG49TyhuLDMpLHVuKHQsZnVuY3Rpb24ocyxvLGEpe19uKGUsbyxuKHMsbyxhKSl9KSxlfXZhciBZbT15ZShmdW5jdGlvbih0LG4sZSl7QnIodCxuLGUpfSksb2Y9eWUoZnVuY3Rpb24odCxuLGUscyl7QnIodCxuLGUscyl9KSxLbT1nbihmdW5jdGlvbih0LG4pe3ZhciBlPXt9O2lmKHQ9PW51bGwpcmV0dXJuIGU7dmFyIHM9ITE7bj1udChuLGZ1bmN0aW9uKGEpe3JldHVybiBhPU9uKGEsdCksc3x8KHM9YS5sZW5ndGg+MSksYX0pLGFuKHQsd3ModCksZSkscyYmKGU9a3QoZSxTfHd8TCxxZCkpO2Zvcih2YXIgbz1uLmxlbmd0aDtvLS07KWRzKGUsbltvXSk7cmV0dXJuIGV9KTtmdW5jdGlvbiBYbSh0LG4pe3JldHVybiB1Zih0LCRyKE8obikpKX12YXIgVm09Z24oZnVuY3Rpb24odCxuKXtyZXR1cm4gdD09bnVsbD97fTpTZCh0LG4pfSk7ZnVuY3Rpb24gdWYodCxuKXtpZih0PT1udWxsKXJldHVybnt9O3ZhciBlPW50KHdzKHQpLGZ1bmN0aW9uKHMpe3JldHVybltzXX0pO3JldHVybiBuPU8obiksSnUodCxlLGZ1bmN0aW9uKHMsbyl7cmV0dXJuIG4ocyxvWzBdKX0pfWZ1bmN0aW9uIEptKHQsbixlKXtuPU9uKG4sdCk7dmFyIHM9LTEsbz1uLmxlbmd0aDtmb3Iob3x8KG89MSx0PWkpOysrczxvOyl7dmFyIGE9dD09bnVsbD9pOnRbZm4obltzXSldO2E9PT1pJiYocz1vLGE9ZSksdD12bihhKT9hLmNhbGwodCk6YX1yZXR1cm4gdH1mdW5jdGlvbiBRbSh0LG4sZSl7cmV0dXJuIHQ9PW51bGw/dDpxZSh0LG4sZSl9ZnVuY3Rpb24gam0odCxuLGUscyl7cmV0dXJuIHM9dHlwZW9mIHM9PSJmdW5jdGlvbiI/czppLHQ9PW51bGw/dDpxZSh0LG4sZSxzKX12YXIgYWY9dmEoZHQpLGZmPXZhKEJ0KTtmdW5jdGlvbiB0Zyh0LG4sZSl7dmFyIHM9Vyh0KSxvPXN8fEZuKHQpfHx3ZSh0KTtpZihuPU8obiw0KSxlPT1udWxsKXt2YXIgYT10JiZ0LmNvbnN0cnVjdG9yO28/ZT1zP25ldyBhOltdOmV0KHQpP2U9dm4oYSk/Z2UodnIodCkpOnt9OmU9e319cmV0dXJuKG8/SHQ6dW4pKHQsZnVuY3Rpb24obCxwLG0pe3JldHVybiBuKGUsbCxwLG0pfSksZX1mdW5jdGlvbiBuZyh0LG4pe3JldHVybiB0PT1udWxsPyEwOmRzKHQsbil9ZnVuY3Rpb24gZWcodCxuLGUpe3JldHVybiB0PT1udWxsP3Q6ZWEodCxuLG1zKGUpKX1mdW5jdGlvbiByZyh0LG4sZSxzKXtyZXR1cm4gcz10eXBlb2Ygcz09ImZ1bmN0aW9uIj9zOmksdD09bnVsbD90OmVhKHQsbixtcyhlKSxzKX1mdW5jdGlvbiBBZSh0KXtyZXR1cm4gdD09bnVsbD9bXTpLaSh0LGR0KHQpKX1mdW5jdGlvbiBpZyh0KXtyZXR1cm4gdD09bnVsbD9bXTpLaSh0LEJ0KHQpKX1mdW5jdGlvbiBzZyh0LG4sZSl7cmV0dXJuIGU9PT1pJiYoZT1uLG49aSksZSE9PWkmJihlPVh0KGUpLGU9ZT09PWU/ZTowKSxuIT09aSYmKG49WHQobiksbj1uPT09bj9uOjApLFluKFh0KHQpLG4sZSl9ZnVuY3Rpb24gb2codCxuLGUpe3JldHVybiBuPXhuKG4pLGU9PT1pPyhlPW4sbj0wKTplPXhuKGUpLHQ9WHQodCksbGQodCxuLGUpfWZ1bmN0aW9uIHVnKHQsbixlKXtpZihlJiZ0eXBlb2YgZSE9ImJvb2xlYW4iJiZidCh0LG4sZSkmJihuPWU9aSksZT09PWkmJih0eXBlb2Ygbj09ImJvb2xlYW4iPyhlPW4sbj1pKTp0eXBlb2YgdD09ImJvb2xlYW4iJiYoZT10LHQ9aSkpLHQ9PT1pJiZuPT09aT8odD0wLG49MSk6KHQ9eG4odCksbj09PWk/KG49dCx0PTApOm49eG4obikpLHQ+bil7dmFyIHM9dDt0PW4sbj1zfWlmKGV8fHQlMXx8biUxKXt2YXIgbz1UdSgpO3JldHVybiB5dCh0K28qKG4tdCtVYygiMWUtIisoKG8rIiIpLmxlbmd0aC0xKSkpLG4pfXJldHVybiBocyh0LG4pfXZhciBhZz12ZShmdW5jdGlvbih0LG4sZSl7cmV0dXJuIG49bi50b0xvd2VyQ2FzZSgpLHQrKGU/aGYobik6bil9KTtmdW5jdGlvbiBoZih0KXtyZXR1cm4gRnMoSyh0KS50b0xvd2VyQ2FzZSgpKX1mdW5jdGlvbiBjZih0KXtyZXR1cm4gdD1LKHQpLHQmJnQucmVwbGFjZShoYyxRYykucmVwbGFjZShMYywiIil9ZnVuY3Rpb24gZmcodCxuLGUpe3Q9Syh0KSxuPVB0KG4pO3ZhciBzPXQubGVuZ3RoO2U9ZT09PWk/czpZbihaKGUpLDAscyk7dmFyIG89ZTtyZXR1cm4gZS09bi5sZW5ndGgsZT49MCYmdC5zbGljZShlLG8pPT1ufWZ1bmN0aW9uIGhnKHQpe3JldHVybiB0PUsodCksdCYmR2gudGVzdCh0KT90LnJlcGxhY2UoWm8samMpOnR9ZnVuY3Rpb24gY2codCl7cmV0dXJuIHQ9Syh0KSx0JiZWaC50ZXN0KHQpP3QucmVwbGFjZShUaSwiXFwkJiIpOnR9dmFyIGxnPXZlKGZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdCsoZT8iLSI6IiIpK24udG9Mb3dlckNhc2UoKX0pLGRnPXZlKGZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdCsoZT8iICI6IiIpK24udG9Mb3dlckNhc2UoKX0pLHBnPWRhKCJ0b0xvd2VyQ2FzZSIpO2Z1bmN0aW9uIF9nKHQsbixlKXt0PUsodCksbj1aKG4pO3ZhciBzPW4/bGUodCk6MDtpZighbnx8cz49bilyZXR1cm4gdDt2YXIgbz0obi1zKS8yO3JldHVybiBQcihTcihvKSxlKSt0K1ByKEFyKG8pLGUpfWZ1bmN0aW9uIG1nKHQsbixlKXt0PUsodCksbj1aKG4pO3ZhciBzPW4/bGUodCk6MDtyZXR1cm4gbiYmczxuP3QrUHIobi1zLGUpOnR9ZnVuY3Rpb24gZ2codCxuLGUpe3Q9Syh0KSxuPVoobik7dmFyIHM9bj9sZSh0KTowO3JldHVybiBuJiZzPG4/UHIobi1zLGUpK3Q6dH1mdW5jdGlvbiB5Zyh0LG4sZSl7cmV0dXJuIGV8fG49PW51bGw/bj0wOm4mJihuPStuKSxFbChLKHQpLnJlcGxhY2UoQ2ksIiIpLG58fDApfWZ1bmN0aW9uIHZnKHQsbixlKXtyZXR1cm4oZT9idCh0LG4sZSk6bj09PWkpP249MTpuPVoobiksY3MoSyh0KSxuKX1mdW5jdGlvbiB4Zygpe3ZhciB0PWFyZ3VtZW50cyxuPUsodFswXSk7cmV0dXJuIHQubGVuZ3RoPDM/bjpuLnJlcGxhY2UodFsxXSx0WzJdKX12YXIgd2c9dmUoZnVuY3Rpb24odCxuLGUpe3JldHVybiB0KyhlPyJfIjoiIikrbi50b0xvd2VyQ2FzZSgpfSk7ZnVuY3Rpb24gQWcodCxuLGUpe3JldHVybiBlJiZ0eXBlb2YgZSE9Im51bWJlciImJmJ0KHQsbixlKSYmKG49ZT1pKSxlPWU9PT1pP29uOmU+Pj4wLGU/KHQ9Syh0KSx0JiYodHlwZW9mIG49PSJzdHJpbmcifHxuIT1udWxsJiYhSXMobikpJiYobj1QdChuKSwhbiYmY2UodCkpP1BuKHRuKHQpLDAsZSk6dC5zcGxpdChuLGUpKTpbXX12YXIgU2c9dmUoZnVuY3Rpb24odCxuLGUpe3JldHVybiB0KyhlPyIgIjoiIikrRnMobil9KTtmdW5jdGlvbiBiZyh0LG4sZSl7cmV0dXJuIHQ9Syh0KSxlPWU9PW51bGw/MDpZbihaKGUpLDAsdC5sZW5ndGgpLG49UHQobiksdC5zbGljZShlLGUrbi5sZW5ndGgpPT1ufWZ1bmN0aW9uIEVnKHQsbixlKXt2YXIgcz11LnRlbXBsYXRlU2V0dGluZ3M7ZSYmYnQodCxuLGUpJiYobj1pKSx0PUsodCksbj1Lcih7fSxuLHMseGEpO3ZhciBvPUtyKHt9LG4uaW1wb3J0cyxzLmltcG9ydHMseGEpLGE9ZHQobyksbD1LaShvLGEpLHAsbSxiPTAsRT1uLmludGVycG9sYXRlfHx1cix6PSJfX3AgKz0gJyIsQj1WaSgobi5lc2NhcGV8fHVyKS5zb3VyY2UrInwiK0Uuc291cmNlKyJ8IisoRT09PXFvP2ljOnVyKS5zb3VyY2UrInwiKyhuLmV2YWx1YXRlfHx1cikuc291cmNlKyJ8JCIsImciKSxDPSIvLyMgc291cmNlVVJMPSIrKFYuY2FsbChuLCJzb3VyY2VVUkwiKT8obi5zb3VyY2VVUkwrIiIpLnJlcGxhY2UoL1xzL2csIiAiKToibG9kYXNoLnRlbXBsYXRlU291cmNlc1siKyArK0ljKyJdIikrYApgO3QucmVwbGFjZShCLGZ1bmN0aW9uKEYsRyxrLE50LEV0LFV0KXtyZXR1cm4ga3x8KGs9TnQpLHorPXQuc2xpY2UoYixVdCkucmVwbGFjZShjYyx0bCksRyYmKHA9ITAseis9YCcgKwpfX2UoYCtHK2ApICsKJ2ApLEV0JiYobT0hMCx6Kz1gJzsKYCtFdCtgOwpfX3AgKz0gJ2ApLGsmJih6Kz1gJyArCigoX190ID0gKGAraytgKSkgPT0gbnVsbCA/ICcnIDogX190KSArCidgKSxiPVV0K0YubGVuZ3RoLEZ9KSx6Kz1gJzsKYDt2YXIgUD1WLmNhbGwobiwidmFyaWFibGUiKSYmbi52YXJpYWJsZTtpZighUCl6PWB3aXRoIChvYmopIHsKYCt6K2AKfQpgO2Vsc2UgaWYoZWMudGVzdChQKSl0aHJvdyBuZXcgVSh2KTt6PShtP3oucmVwbGFjZShXaCwiIik6eikucmVwbGFjZShaaCwiJDEiKS5yZXBsYWNlKHFoLCIkMTsiKSx6PSJmdW5jdGlvbigiKyhQfHwib2JqIikrYCkgewpgKyhQPyIiOmBvYmogfHwgKG9iaiA9IHt9KTsKYCkrInZhciBfX3QsIF9fcCA9ICcnIisocD8iLCBfX2UgPSBfLmVzY2FwZSI6IiIpKyhtP2AsIF9faiA9IEFycmF5LnByb3RvdHlwZS5qb2luOwpmdW5jdGlvbiBwcmludCgpIHsgX19wICs9IF9fai5jYWxsKGFyZ3VtZW50cywgJycpIH0KYDpgOwpgKSt6K2ByZXR1cm4gX19wCn1gO3ZhciBxPWRmKGZ1bmN0aW9uKCl7cmV0dXJuIFkoYSxDKyJyZXR1cm4gIit6KS5hcHBseShpLGwpfSk7aWYocS5zb3VyY2U9eixDcyhxKSl0aHJvdyBxO3JldHVybiBxfWZ1bmN0aW9uIE1nKHQpe3JldHVybiBLKHQpLnRvTG93ZXJDYXNlKCl9ZnVuY3Rpb24gUmcodCl7cmV0dXJuIEsodCkudG9VcHBlckNhc2UoKX1mdW5jdGlvbiB6Zyh0LG4sZSl7aWYodD1LKHQpLHQmJihlfHxuPT09aSkpcmV0dXJuIHd1KHQpO2lmKCF0fHwhKG49UHQobikpKXJldHVybiB0O3ZhciBzPXRuKHQpLG89dG4obiksYT1BdShzLG8pLGw9U3UocyxvKSsxO3JldHVybiBQbihzLGEsbCkuam9pbigiIil9ZnVuY3Rpb24gTGcodCxuLGUpe2lmKHQ9Syh0KSx0JiYoZXx8bj09PWkpKXJldHVybiB0LnNsaWNlKDAsRXUodCkrMSk7aWYoIXR8fCEobj1QdChuKSkpcmV0dXJuIHQ7dmFyIHM9dG4odCksbz1TdShzLHRuKG4pKSsxO3JldHVybiBQbihzLDAsbykuam9pbigiIil9ZnVuY3Rpb24gQmcodCxuLGUpe2lmKHQ9Syh0KSx0JiYoZXx8bj09PWkpKXJldHVybiB0LnJlcGxhY2UoQ2ksIiIpO2lmKCF0fHwhKG49UHQobikpKXJldHVybiB0O3ZhciBzPXRuKHQpLG89QXUocyx0bihuKSk7cmV0dXJuIFBuKHMsbykuam9pbigiIil9ZnVuY3Rpb24gRGcodCxuKXt2YXIgZT1NbixzPVJuO2lmKGV0KG4pKXt2YXIgbz0ic2VwYXJhdG9yImluIG4/bi5zZXBhcmF0b3I6bztlPSJsZW5ndGgiaW4gbj9aKG4ubGVuZ3RoKTplLHM9Im9taXNzaW9uImluIG4/UHQobi5vbWlzc2lvbik6c310PUsodCk7dmFyIGE9dC5sZW5ndGg7aWYoY2UodCkpe3ZhciBsPXRuKHQpO2E9bC5sZW5ndGh9aWYoZT49YSlyZXR1cm4gdDt2YXIgcD1lLWxlKHMpO2lmKHA8MSlyZXR1cm4gczt2YXIgbT1sP1BuKGwsMCxwKS5qb2luKCIiKTp0LnNsaWNlKDAscCk7aWYobz09PWkpcmV0dXJuIG0rcztpZihsJiYocCs9bS5sZW5ndGgtcCksSXMobykpe2lmKHQuc2xpY2UocCkuc2VhcmNoKG8pKXt2YXIgYixFPW07Zm9yKG8uZ2xvYmFsfHwobz1WaShvLnNvdXJjZSxLKEhvLmV4ZWMobykpKyJnIikpLG8ubGFzdEluZGV4PTA7Yj1vLmV4ZWMoRSk7KXZhciB6PWIuaW5kZXg7bT1tLnNsaWNlKDAsej09PWk/cDp6KX19ZWxzZSBpZih0LmluZGV4T2YoUHQobykscCkhPXApe3ZhciBCPW0ubGFzdEluZGV4T2Yobyk7Qj4tMSYmKG09bS5zbGljZSgwLEIpKX1yZXR1cm4gbStzfWZ1bmN0aW9uIFRnKHQpe3JldHVybiB0PUsodCksdCYmSGgudGVzdCh0KT90LnJlcGxhY2UoV28sdWwpOnR9dmFyIENnPXZlKGZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdCsoZT8iICI6IiIpK24udG9VcHBlckNhc2UoKX0pLEZzPWRhKCJ0b1VwcGVyQ2FzZSIpO2Z1bmN0aW9uIGxmKHQsbixlKXtyZXR1cm4gdD1LKHQpLG49ZT9pOm4sbj09PWk/ZWwodCk/aGwodCk6WWModCk6dC5tYXRjaChuKXx8W119dmFyIGRmPUgoZnVuY3Rpb24odCxuKXt0cnl7cmV0dXJuIEl0KHQsaSxuKX1jYXRjaChlKXtyZXR1cm4gQ3MoZSk/ZTpuZXcgVShlKX19KSxJZz1nbihmdW5jdGlvbih0LG4pe3JldHVybiBIdChuLGZ1bmN0aW9uKGUpe2U9Zm4oZSksX24odCxlLERzKHRbZV0sdCkpfSksdH0pO2Z1bmN0aW9uIE9nKHQpe3ZhciBuPXQ9PW51bGw/MDp0Lmxlbmd0aCxlPU8oKTtyZXR1cm4gdD1uP250KHQsZnVuY3Rpb24ocyl7aWYodHlwZW9mIHNbMV0hPSJmdW5jdGlvbiIpdGhyb3cgbmV3IEd0KGcpO3JldHVybltlKHNbMF0pLHNbMV1dfSk6W10sSChmdW5jdGlvbihzKXtmb3IodmFyIG89LTE7KytvPG47KXt2YXIgYT10W29dO2lmKEl0KGFbMF0sdGhpcyxzKSlyZXR1cm4gSXQoYVsxXSx0aGlzLHMpfX0pfWZ1bmN0aW9uIFBnKHQpe3JldHVybiB1ZChrdCh0LFMpKX1mdW5jdGlvbiBOcyh0KXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdH19ZnVuY3Rpb24gRmcodCxuKXtyZXR1cm4gdD09bnVsbHx8dCE9PXQ/bjp0fXZhciBOZz1fYSgpLFVnPV9hKCEwKTtmdW5jdGlvbiBEdCh0KXtyZXR1cm4gdH1mdW5jdGlvbiBVcyh0KXtyZXR1cm4gJHUodHlwZW9mIHQ9PSJmdW5jdGlvbiI/dDprdCh0LFMpKX1mdW5jdGlvbiBXZyh0KXtyZXR1cm4gWXUoa3QodCxTKSl9ZnVuY3Rpb24gWmcodCxuKXtyZXR1cm4gS3UodCxrdChuLFMpKX12YXIgcWc9SChmdW5jdGlvbih0LG4pe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gV2UoZSx0LG4pfX0pLEhnPUgoZnVuY3Rpb24odCxuKXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIFdlKHQsZSxuKX19KTtmdW5jdGlvbiBXcyh0LG4sZSl7dmFyIHM9ZHQobiksbz1McihuLHMpO2U9PW51bGwmJiEoZXQobikmJihvLmxlbmd0aHx8IXMubGVuZ3RoKSkmJihlPW4sbj10LHQ9dGhpcyxvPUxyKG4sZHQobikpKTt2YXIgYT0hKGV0KGUpJiYiY2hhaW4iaW4gZSl8fCEhZS5jaGFpbixsPXZuKHQpO3JldHVybiBIdChvLGZ1bmN0aW9uKHApe3ZhciBtPW5bcF07dFtwXT1tLGwmJih0LnByb3RvdHlwZVtwXT1mdW5jdGlvbigpe3ZhciBiPXRoaXMuX19jaGFpbl9fO2lmKGF8fGIpe3ZhciBFPXQodGhpcy5fX3dyYXBwZWRfXyksej1FLl9fYWN0aW9uc19fPXp0KHRoaXMuX19hY3Rpb25zX18pO3JldHVybiB6LnB1c2goe2Z1bmM6bSxhcmdzOmFyZ3VtZW50cyx0aGlzQXJnOnR9KSxFLl9fY2hhaW5fXz1iLEV9cmV0dXJuIG0uYXBwbHkodCxCbihbdGhpcy52YWx1ZSgpXSxhcmd1bWVudHMpKX0pfSksdH1mdW5jdGlvbiBHZygpe3JldHVybiBfdC5fPT09dGhpcyYmKF90Ll89bWwpLHRoaXN9ZnVuY3Rpb24gWnMoKXt9ZnVuY3Rpb24gJGcodCl7cmV0dXJuIHQ9Wih0KSxIKGZ1bmN0aW9uKG4pe3JldHVybiBYdShuLHQpfSl9dmFyIGtnPXlzKG50KSxZZz15cyhtdSksS2c9eXMoSGkpO2Z1bmN0aW9uIHBmKHQpe3JldHVybiBFcyh0KT9HaShmbih0KSk6YmQodCl9ZnVuY3Rpb24gWGcodCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB0PT1udWxsP2k6S24odCxuKX19dmFyIFZnPWdhKCksSmc9Z2EoITApO2Z1bmN0aW9uIHFzKCl7cmV0dXJuW119ZnVuY3Rpb24gSHMoKXtyZXR1cm4hMX1mdW5jdGlvbiBRZygpe3JldHVybnt9fWZ1bmN0aW9uIGpnKCl7cmV0dXJuIiJ9ZnVuY3Rpb24gdHkoKXtyZXR1cm4hMH1mdW5jdGlvbiBueSh0LG4pe2lmKHQ9Wih0KSx0PDF8fHQ+em4pcmV0dXJuW107dmFyIGU9b24scz15dCh0LG9uKTtuPU8obiksdC09b247Zm9yKHZhciBvPVlpKHMsbik7KytlPHQ7KW4oZSk7cmV0dXJuIG99ZnVuY3Rpb24gZXkodCl7cmV0dXJuIFcodCk/bnQodCxmbik6RnQodCk/W3RdOnp0KENhKEsodCkpKX1mdW5jdGlvbiByeSh0KXt2YXIgbj0rK3BsO3JldHVybiBLKHQpK259dmFyIGl5PU9yKGZ1bmN0aW9uKHQsbil7cmV0dXJuIHQrbn0sMCksc3k9dnMoImNlaWwiKSxveT1PcihmdW5jdGlvbih0LG4pe3JldHVybiB0L259LDEpLHV5PXZzKCJmbG9vciIpO2Z1bmN0aW9uIGF5KHQpe3JldHVybiB0JiZ0Lmxlbmd0aD96cih0LER0LGlzKTppfWZ1bmN0aW9uIGZ5KHQsbil7cmV0dXJuIHQmJnQubGVuZ3RoP3pyKHQsTyhuLDIpLGlzKTppfWZ1bmN0aW9uIGh5KHQpe3JldHVybiB2dSh0LER0KX1mdW5jdGlvbiBjeSh0LG4pe3JldHVybiB2dSh0LE8obiwyKSl9ZnVuY3Rpb24gbHkodCl7cmV0dXJuIHQmJnQubGVuZ3RoP3pyKHQsRHQsYXMpOml9ZnVuY3Rpb24gZHkodCxuKXtyZXR1cm4gdCYmdC5sZW5ndGg/enIodCxPKG4sMiksYXMpOml9dmFyIHB5PU9yKGZ1bmN0aW9uKHQsbil7cmV0dXJuIHQqbn0sMSksX3k9dnMoInJvdW5kIiksbXk9T3IoZnVuY3Rpb24odCxuKXtyZXR1cm4gdC1ufSwwKTtmdW5jdGlvbiBneSh0KXtyZXR1cm4gdCYmdC5sZW5ndGg/a2kodCxEdCk6MH1mdW5jdGlvbiB5eSh0LG4pe3JldHVybiB0JiZ0Lmxlbmd0aD9raSh0LE8obiwyKSk6MH1yZXR1cm4gdS5hZnRlcj1XXyx1LmFyeT1HYSx1LmFzc2lnbj1SbSx1LmFzc2lnbkluPXNmLHUuYXNzaWduSW5XaXRoPUtyLHUuYXNzaWduV2l0aD16bSx1LmF0PUxtLHUuYmVmb3JlPSRhLHUuYmluZD1Ecyx1LmJpbmRBbGw9SWcsdS5iaW5kS2V5PWthLHUuY2FzdEFycmF5PVFfLHUuY2hhaW49WmEsdS5jaHVuaz11cCx1LmNvbXBhY3Q9YXAsdS5jb25jYXQ9ZnAsdS5jb25kPU9nLHUuY29uZm9ybXM9UGcsdS5jb25zdGFudD1Ocyx1LmNvdW50Qnk9Z18sdS5jcmVhdGU9Qm0sdS5jdXJyeT1ZYSx1LmN1cnJ5UmlnaHQ9S2EsdS5kZWJvdW5jZT1YYSx1LmRlZmF1bHRzPURtLHUuZGVmYXVsdHNEZWVwPVRtLHUuZGVmZXI9Wl8sdS5kZWxheT1xXyx1LmRpZmZlcmVuY2U9aHAsdS5kaWZmZXJlbmNlQnk9Y3AsdS5kaWZmZXJlbmNlV2l0aD1scCx1LmRyb3A9ZHAsdS5kcm9wUmlnaHQ9cHAsdS5kcm9wUmlnaHRXaGlsZT1fcCx1LmRyb3BXaGlsZT1tcCx1LmZpbGw9Z3AsdS5maWx0ZXI9dl8sdS5mbGF0TWFwPUFfLHUuZmxhdE1hcERlZXA9U18sdS5mbGF0TWFwRGVwdGg9Yl8sdS5mbGF0dGVuPUZhLHUuZmxhdHRlbkRlZXA9eXAsdS5mbGF0dGVuRGVwdGg9dnAsdS5mbGlwPUhfLHUuZmxvdz1OZyx1LmZsb3dSaWdodD1VZyx1LmZyb21QYWlycz14cCx1LmZ1bmN0aW9ucz1VbSx1LmZ1bmN0aW9uc0luPVdtLHUuZ3JvdXBCeT1FXyx1LmluaXRpYWw9QXAsdS5pbnRlcnNlY3Rpb249U3AsdS5pbnRlcnNlY3Rpb25CeT1icCx1LmludGVyc2VjdGlvbldpdGg9RXAsdS5pbnZlcnQ9cW0sdS5pbnZlcnRCeT1IbSx1Lmludm9rZU1hcD1SXyx1Lml0ZXJhdGVlPVVzLHUua2V5Qnk9el8sdS5rZXlzPWR0LHUua2V5c0luPUJ0LHUubWFwPXFyLHUubWFwS2V5cz0kbSx1Lm1hcFZhbHVlcz1rbSx1Lm1hdGNoZXM9V2csdS5tYXRjaGVzUHJvcGVydHk9WmcsdS5tZW1vaXplPUdyLHUubWVyZ2U9WW0sdS5tZXJnZVdpdGg9b2YsdS5tZXRob2Q9cWcsdS5tZXRob2RPZj1IZyx1Lm1peGluPVdzLHUubmVnYXRlPSRyLHUubnRoQXJnPSRnLHUub21pdD1LbSx1Lm9taXRCeT1YbSx1Lm9uY2U9R18sdS5vcmRlckJ5PUxfLHUub3Zlcj1rZyx1Lm92ZXJBcmdzPSRfLHUub3ZlckV2ZXJ5PVlnLHUub3ZlclNvbWU9S2csdS5wYXJ0aWFsPVRzLHUucGFydGlhbFJpZ2h0PVZhLHUucGFydGl0aW9uPUJfLHUucGljaz1WbSx1LnBpY2tCeT11Zix1LnByb3BlcnR5PXBmLHUucHJvcGVydHlPZj1YZyx1LnB1bGw9THAsdS5wdWxsQWxsPVVhLHUucHVsbEFsbEJ5PUJwLHUucHVsbEFsbFdpdGg9RHAsdS5wdWxsQXQ9VHAsdS5yYW5nZT1WZyx1LnJhbmdlUmlnaHQ9SmcsdS5yZWFyZz1rXyx1LnJlamVjdD1DXyx1LnJlbW92ZT1DcCx1LnJlc3Q9WV8sdS5yZXZlcnNlPUxzLHUuc2FtcGxlU2l6ZT1PXyx1LnNldD1RbSx1LnNldFdpdGg9am0sdS5zaHVmZmxlPVBfLHUuc2xpY2U9SXAsdS5zb3J0Qnk9VV8sdS5zb3J0ZWRVbmlxPVpwLHUuc29ydGVkVW5pcUJ5PXFwLHUuc3BsaXQ9QWcsdS5zcHJlYWQ9S18sdS50YWlsPUhwLHUudGFrZT1HcCx1LnRha2VSaWdodD0kcCx1LnRha2VSaWdodFdoaWxlPWtwLHUudGFrZVdoaWxlPVlwLHUudGFwPWFfLHUudGhyb3R0bGU9WF8sdS50aHJ1PVpyLHUudG9BcnJheT1uZix1LnRvUGFpcnM9YWYsdS50b1BhaXJzSW49ZmYsdS50b1BhdGg9ZXksdS50b1BsYWluT2JqZWN0PXJmLHUudHJhbnNmb3JtPXRnLHUudW5hcnk9Vl8sdS51bmlvbj1LcCx1LnVuaW9uQnk9WHAsdS51bmlvbldpdGg9VnAsdS51bmlxPUpwLHUudW5pcUJ5PVFwLHUudW5pcVdpdGg9anAsdS51bnNldD1uZyx1LnVuemlwPUJzLHUudW56aXBXaXRoPVdhLHUudXBkYXRlPWVnLHUudXBkYXRlV2l0aD1yZyx1LnZhbHVlcz1BZSx1LnZhbHVlc0luPWlnLHUud2l0aG91dD10Xyx1LndvcmRzPWxmLHUud3JhcD1KXyx1Lnhvcj1uXyx1LnhvckJ5PWVfLHUueG9yV2l0aD1yXyx1LnppcD1pXyx1LnppcE9iamVjdD1zXyx1LnppcE9iamVjdERlZXA9b18sdS56aXBXaXRoPXVfLHUuZW50cmllcz1hZix1LmVudHJpZXNJbj1mZix1LmV4dGVuZD1zZix1LmV4dGVuZFdpdGg9S3IsV3ModSx1KSx1LmFkZD1peSx1LmF0dGVtcHQ9ZGYsdS5jYW1lbENhc2U9YWcsdS5jYXBpdGFsaXplPWhmLHUuY2VpbD1zeSx1LmNsYW1wPXNnLHUuY2xvbmU9al8sdS5jbG9uZURlZXA9bm0sdS5jbG9uZURlZXBXaXRoPWVtLHUuY2xvbmVXaXRoPXRtLHUuY29uZm9ybXNUbz1ybSx1LmRlYnVycj1jZix1LmRlZmF1bHRUbz1GZyx1LmRpdmlkZT1veSx1LmVuZHNXaXRoPWZnLHUuZXE9ZW4sdS5lc2NhcGU9aGcsdS5lc2NhcGVSZWdFeHA9Y2csdS5ldmVyeT15Xyx1LmZpbmQ9eF8sdS5maW5kSW5kZXg9T2EsdS5maW5kS2V5PUNtLHUuZmluZExhc3Q9d18sdS5maW5kTGFzdEluZGV4PVBhLHUuZmluZExhc3RLZXk9SW0sdS5mbG9vcj11eSx1LmZvckVhY2g9cWEsdS5mb3JFYWNoUmlnaHQ9SGEsdS5mb3JJbj1PbSx1LmZvckluUmlnaHQ9UG0sdS5mb3JPd249Rm0sdS5mb3JPd25SaWdodD1ObSx1LmdldD1Pcyx1Lmd0PWltLHUuZ3RlPXNtLHUuaGFzPVptLHUuaGFzSW49UHMsdS5oZWFkPU5hLHUuaWRlbnRpdHk9RHQsdS5pbmNsdWRlcz1NXyx1LmluZGV4T2Y9d3AsdS5pblJhbmdlPW9nLHUuaW52b2tlPUdtLHUuaXNBcmd1bWVudHM9Sm4sdS5pc0FycmF5PVcsdS5pc0FycmF5QnVmZmVyPW9tLHUuaXNBcnJheUxpa2U9THQsdS5pc0FycmF5TGlrZU9iamVjdD1zdCx1LmlzQm9vbGVhbj11bSx1LmlzQnVmZmVyPUZuLHUuaXNEYXRlPWFtLHUuaXNFbGVtZW50PWZtLHUuaXNFbXB0eT1obSx1LmlzRXF1YWw9Y20sdS5pc0VxdWFsV2l0aD1sbSx1LmlzRXJyb3I9Q3MsdS5pc0Zpbml0ZT1kbSx1LmlzRnVuY3Rpb249dm4sdS5pc0ludGVnZXI9SmEsdS5pc0xlbmd0aD1rcix1LmlzTWFwPVFhLHUuaXNNYXRjaD1wbSx1LmlzTWF0Y2hXaXRoPV9tLHUuaXNOYU49bW0sdS5pc05hdGl2ZT1nbSx1LmlzTmlsPXZtLHUuaXNOdWxsPXltLHUuaXNOdW1iZXI9amEsdS5pc09iamVjdD1ldCx1LmlzT2JqZWN0TGlrZT1pdCx1LmlzUGxhaW5PYmplY3Q9a2UsdS5pc1JlZ0V4cD1Jcyx1LmlzU2FmZUludGVnZXI9eG0sdS5pc1NldD10Zix1LmlzU3RyaW5nPVlyLHUuaXNTeW1ib2w9RnQsdS5pc1R5cGVkQXJyYXk9d2UsdS5pc1VuZGVmaW5lZD13bSx1LmlzV2Vha01hcD1BbSx1LmlzV2Vha1NldD1TbSx1LmpvaW49TXAsdS5rZWJhYkNhc2U9bGcsdS5sYXN0PUt0LHUubGFzdEluZGV4T2Y9UnAsdS5sb3dlckNhc2U9ZGcsdS5sb3dlckZpcnN0PXBnLHUubHQ9Ym0sdS5sdGU9RW0sdS5tYXg9YXksdS5tYXhCeT1meSx1Lm1lYW49aHksdS5tZWFuQnk9Y3ksdS5taW49bHksdS5taW5CeT1keSx1LnN0dWJBcnJheT1xcyx1LnN0dWJGYWxzZT1Icyx1LnN0dWJPYmplY3Q9UWcsdS5zdHViU3RyaW5nPWpnLHUuc3R1YlRydWU9dHksdS5tdWx0aXBseT1weSx1Lm50aD16cCx1Lm5vQ29uZmxpY3Q9R2csdS5ub29wPVpzLHUubm93PUhyLHUucGFkPV9nLHUucGFkRW5kPW1nLHUucGFkU3RhcnQ9Z2csdS5wYXJzZUludD15Zyx1LnJhbmRvbT11Zyx1LnJlZHVjZT1EXyx1LnJlZHVjZVJpZ2h0PVRfLHUucmVwZWF0PXZnLHUucmVwbGFjZT14Zyx1LnJlc3VsdD1KbSx1LnJvdW5kPV95LHUucnVuSW5Db250ZXh0PV8sdS5zYW1wbGU9SV8sdS5zaXplPUZfLHUuc25ha2VDYXNlPXdnLHUuc29tZT1OXyx1LnNvcnRlZEluZGV4PU9wLHUuc29ydGVkSW5kZXhCeT1QcCx1LnNvcnRlZEluZGV4T2Y9RnAsdS5zb3J0ZWRMYXN0SW5kZXg9TnAsdS5zb3J0ZWRMYXN0SW5kZXhCeT1VcCx1LnNvcnRlZExhc3RJbmRleE9mPVdwLHUuc3RhcnRDYXNlPVNnLHUuc3RhcnRzV2l0aD1iZyx1LnN1YnRyYWN0PW15LHUuc3VtPWd5LHUuc3VtQnk9eXksdS50ZW1wbGF0ZT1FZyx1LnRpbWVzPW55LHUudG9GaW5pdGU9eG4sdS50b0ludGVnZXI9Wix1LnRvTGVuZ3RoPWVmLHUudG9Mb3dlcj1NZyx1LnRvTnVtYmVyPVh0LHUudG9TYWZlSW50ZWdlcj1NbSx1LnRvU3RyaW5nPUssdS50b1VwcGVyPVJnLHUudHJpbT16Zyx1LnRyaW1FbmQ9TGcsdS50cmltU3RhcnQ9QmcsdS50cnVuY2F0ZT1EZyx1LnVuZXNjYXBlPVRnLHUudW5pcXVlSWQ9cnksdS51cHBlckNhc2U9Q2csdS51cHBlckZpcnN0PUZzLHUuZWFjaD1xYSx1LmVhY2hSaWdodD1IYSx1LmZpcnN0PU5hLFdzKHUsZnVuY3Rpb24oKXt2YXIgdD17fTtyZXR1cm4gdW4odSxmdW5jdGlvbihuLGUpe1YuY2FsbCh1LnByb3RvdHlwZSxlKXx8KHRbZV09bil9KSx0fSgpLHtjaGFpbjohMX0pLHUuVkVSU0lPTj1mLEh0KFsiYmluZCIsImJpbmRLZXkiLCJjdXJyeSIsImN1cnJ5UmlnaHQiLCJwYXJ0aWFsIiwicGFydGlhbFJpZ2h0Il0sZnVuY3Rpb24odCl7dVt0XS5wbGFjZWhvbGRlcj11fSksSHQoWyJkcm9wIiwidGFrZSJdLGZ1bmN0aW9uKHQsbil7JC5wcm90b3R5cGVbdF09ZnVuY3Rpb24oZSl7ZT1lPT09aT8xOmh0KFooZSksMCk7dmFyIHM9dGhpcy5fX2ZpbHRlcmVkX18mJiFuP25ldyAkKHRoaXMpOnRoaXMuY2xvbmUoKTtyZXR1cm4gcy5fX2ZpbHRlcmVkX18/cy5fX3Rha2VDb3VudF9fPXl0KGUscy5fX3Rha2VDb3VudF9fKTpzLl9fdmlld3NfXy5wdXNoKHtzaXplOnl0KGUsb24pLHR5cGU6dCsocy5fX2Rpcl9fPDA/IlJpZ2h0IjoiIil9KSxzfSwkLnByb3RvdHlwZVt0KyJSaWdodCJdPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJldmVyc2UoKVt0XShlKS5yZXZlcnNlKCl9fSksSHQoWyJmaWx0ZXIiLCJtYXAiLCJ0YWtlV2hpbGUiXSxmdW5jdGlvbih0LG4pe3ZhciBlPW4rMSxzPWU9PVp0fHxlPT1iZTskLnByb3RvdHlwZVt0XT1mdW5jdGlvbihvKXt2YXIgYT10aGlzLmNsb25lKCk7cmV0dXJuIGEuX19pdGVyYXRlZXNfXy5wdXNoKHtpdGVyYXRlZTpPKG8sMyksdHlwZTplfSksYS5fX2ZpbHRlcmVkX189YS5fX2ZpbHRlcmVkX198fHMsYX19KSxIdChbImhlYWQiLCJsYXN0Il0sZnVuY3Rpb24odCxuKXt2YXIgZT0idGFrZSIrKG4/IlJpZ2h0IjoiIik7JC5wcm90b3R5cGVbdF09ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1tlXSgxKS52YWx1ZSgpWzBdfX0pLEh0KFsiaW5pdGlhbCIsInRhaWwiXSxmdW5jdGlvbih0LG4pe3ZhciBlPSJkcm9wIisobj8iIjoiUmlnaHQiKTskLnByb3RvdHlwZVt0XT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9fZmlsdGVyZWRfXz9uZXcgJCh0aGlzKTp0aGlzW2VdKDEpfX0pLCQucHJvdG90eXBlLmNvbXBhY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5maWx0ZXIoRHQpfSwkLnByb3RvdHlwZS5maW5kPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmZpbHRlcih0KS5oZWFkKCl9LCQucHJvdG90eXBlLmZpbmRMYXN0PWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnJldmVyc2UoKS5maW5kKHQpfSwkLnByb3RvdHlwZS5pbnZva2VNYXA9SChmdW5jdGlvbih0LG4pe3JldHVybiB0eXBlb2YgdD09ImZ1bmN0aW9uIj9uZXcgJCh0aGlzKTp0aGlzLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gV2UoZSx0LG4pfSl9KSwkLnByb3RvdHlwZS5yZWplY3Q9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuZmlsdGVyKCRyKE8odCkpKX0sJC5wcm90b3R5cGUuc2xpY2U9ZnVuY3Rpb24odCxuKXt0PVoodCk7dmFyIGU9dGhpcztyZXR1cm4gZS5fX2ZpbHRlcmVkX18mJih0PjB8fG48MCk/bmV3ICQoZSk6KHQ8MD9lPWUudGFrZVJpZ2h0KC10KTp0JiYoZT1lLmRyb3AodCkpLG4hPT1pJiYobj1aKG4pLGU9bjwwP2UuZHJvcFJpZ2h0KC1uKTplLnRha2Uobi10KSksZSl9LCQucHJvdG90eXBlLnRha2VSaWdodFdoaWxlPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnJldmVyc2UoKS50YWtlV2hpbGUodCkucmV2ZXJzZSgpfSwkLnByb3RvdHlwZS50b0FycmF5PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudGFrZShvbil9LHVuKCQucHJvdG90eXBlLGZ1bmN0aW9uKHQsbil7dmFyIGU9L14oPzpmaWx0ZXJ8ZmluZHxtYXB8cmVqZWN0KXxXaGlsZSQvLnRlc3Qobikscz0vXig/OmhlYWR8bGFzdCkkLy50ZXN0KG4pLG89dVtzPyJ0YWtlIisobj09Imxhc3QiPyJSaWdodCI6IiIpOm5dLGE9c3x8L15maW5kLy50ZXN0KG4pOyFvfHwodS5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbD10aGlzLl9fd3JhcHBlZF9fLHA9cz9bMV06YXJndW1lbnRzLG09bCBpbnN0YW5jZW9mICQsYj1wWzBdLEU9bXx8VyhsKSx6PWZ1bmN0aW9uKEcpe3ZhciBrPW8uYXBwbHkodSxCbihbR10scCkpO3JldHVybiBzJiZCP2tbMF06a307RSYmZSYmdHlwZW9mIGI9PSJmdW5jdGlvbiImJmIubGVuZ3RoIT0xJiYobT1FPSExKTt2YXIgQj10aGlzLl9fY2hhaW5fXyxDPSEhdGhpcy5fX2FjdGlvbnNfXy5sZW5ndGgsUD1hJiYhQixxPW0mJiFDO2lmKCFhJiZFKXtsPXE/bDpuZXcgJCh0aGlzKTt2YXIgRj10LmFwcGx5KGwscCk7cmV0dXJuIEYuX19hY3Rpb25zX18ucHVzaCh7ZnVuYzpacixhcmdzOlt6XSx0aGlzQXJnOml9KSxuZXcgJHQoRixCKX1yZXR1cm4gUCYmcT90LmFwcGx5KHRoaXMscCk6KEY9dGhpcy50aHJ1KHopLFA/cz9GLnZhbHVlKClbMF06Ri52YWx1ZSgpOkYpfSl9KSxIdChbInBvcCIsInB1c2giLCJzaGlmdCIsInNvcnQiLCJzcGxpY2UiLCJ1bnNoaWZ0Il0sZnVuY3Rpb24odCl7dmFyIG49ZHJbdF0sZT0vXig/OnB1c2h8c29ydHx1bnNoaWZ0KSQvLnRlc3QodCk/InRhcCI6InRocnUiLHM9L14oPzpwb3B8c2hpZnQpJC8udGVzdCh0KTt1LnByb3RvdHlwZVt0XT1mdW5jdGlvbigpe3ZhciBvPWFyZ3VtZW50cztpZihzJiYhdGhpcy5fX2NoYWluX18pe3ZhciBhPXRoaXMudmFsdWUoKTtyZXR1cm4gbi5hcHBseShXKGEpP2E6W10sbyl9cmV0dXJuIHRoaXNbZV0oZnVuY3Rpb24obCl7cmV0dXJuIG4uYXBwbHkoVyhsKT9sOltdLG8pfSl9fSksdW4oJC5wcm90b3R5cGUsZnVuY3Rpb24odCxuKXt2YXIgZT11W25dO2lmKGUpe3ZhciBzPWUubmFtZSsiIjtWLmNhbGwobWUscyl8fChtZVtzXT1bXSksbWVbc10ucHVzaCh7bmFtZTpuLGZ1bmM6ZX0pfX0pLG1lW0lyKGkscnQpLm5hbWVdPVt7bmFtZToid3JhcHBlciIsZnVuYzppfV0sJC5wcm90b3R5cGUuY2xvbmU9VGwsJC5wcm90b3R5cGUucmV2ZXJzZT1DbCwkLnByb3RvdHlwZS52YWx1ZT1JbCx1LnByb3RvdHlwZS5hdD1mXyx1LnByb3RvdHlwZS5jaGFpbj1oXyx1LnByb3RvdHlwZS5jb21taXQ9Y18sdS5wcm90b3R5cGUubmV4dD1sXyx1LnByb3RvdHlwZS5wbGFudD1wXyx1LnByb3RvdHlwZS5yZXZlcnNlPV9fLHUucHJvdG90eXBlLnRvSlNPTj11LnByb3RvdHlwZS52YWx1ZU9mPXUucHJvdG90eXBlLnZhbHVlPW1fLHUucHJvdG90eXBlLmZpcnN0PXUucHJvdG90eXBlLmhlYWQsQ2UmJih1LnByb3RvdHlwZVtDZV09ZF8pLHV9LGRlPWNsKCk7SG4/KChIbi5leHBvcnRzPWRlKS5fPWRlLFVpLl89ZGUpOl90Ll89ZGV9KS5jYWxsKFZ0KX0pKHJlLHJlLmV4cG9ydHMpOy8qKgogKiBAbGljZW5zZQogKiBDb3B5cmlnaHQgMjAxMC0yMDIyIFRocmVlLmpzIEF1dGhvcnMKICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IE1JVAogKi9jb25zdCBEbz0iMTQyIjtmdW5jdGlvbiBUbyhkLHIsaSl7cmV0dXJuIE1hdGgubWF4KHIsTWF0aC5taW4oaSxkKSl9Y2xhc3MgUmh7Y29uc3RydWN0b3Iocj0wLGk9MCxmPTAsaD0xKXt0aGlzLmlzUXVhdGVybmlvbj0hMCx0aGlzLl94PXIsdGhpcy5feT1pLHRoaXMuX3o9Zix0aGlzLl93PWh9c3RhdGljIHNsZXJwKHIsaSxmLGgpe3JldHVybiBjb25zb2xlLndhcm4oIlRIUkVFLlF1YXRlcm5pb246IFN0YXRpYyAuc2xlcnAoKSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgcW0uc2xlcnBRdWF0ZXJuaW9ucyggcWEsIHFiLCB0ICkgaW5zdGVhZC4iKSxmLnNsZXJwUXVhdGVybmlvbnMocixpLGgpfXN0YXRpYyBzbGVycEZsYXQocixpLGYsaCxjLGcsdil7bGV0IEE9ZltoKzBdLFI9ZltoKzFdLE09ZltoKzJdLFM9ZltoKzNdO2NvbnN0IHc9Y1tnKzBdLEw9Y1tnKzFdLE49Y1tnKzJdLGx0PWNbZyszXTtpZih2PT09MCl7cltpKzBdPUEscltpKzFdPVIscltpKzJdPU0scltpKzNdPVM7cmV0dXJufWlmKHY9PT0xKXtyW2krMF09dyxyW2krMV09TCxyW2krMl09TixyW2krM109bHQ7cmV0dXJufWlmKFMhPT1sdHx8QSE9PXd8fFIhPT1MfHxNIT09Til7bGV0IFg9MS12O2NvbnN0IHJ0PUEqdytSKkwrTSpOK1MqbHQsd3Q9cnQ+PTA/MTotMSxJPTEtcnQqcnQ7aWYoST5OdW1iZXIuRVBTSUxPTil7Y29uc3QgVD1NYXRoLnNxcnQoSSksQ3Q9TWF0aC5hdGFuMihULHJ0Knd0KTtYPU1hdGguc2luKFgqQ3QpL1Qsdj1NYXRoLnNpbih2KkN0KS9UfWNvbnN0IHV0PXYqd3Q7aWYoQT1BKlgrdyp1dCxSPVIqWCtMKnV0LE09TSpYK04qdXQsUz1TKlgrbHQqdXQsWD09PTEtdil7Y29uc3QgVD0xL01hdGguc3FydChBKkErUipSK00qTStTKlMpO0EqPVQsUio9VCxNKj1ULFMqPVR9fXJbaV09QSxyW2krMV09UixyW2krMl09TSxyW2krM109U31zdGF0aWMgbXVsdGlwbHlRdWF0ZXJuaW9uc0ZsYXQocixpLGYsaCxjLGcpe2NvbnN0IHY9ZltoXSxBPWZbaCsxXSxSPWZbaCsyXSxNPWZbaCszXSxTPWNbZ10sdz1jW2crMV0sTD1jW2crMl0sTj1jW2crM107cmV0dXJuIHJbaV09dipOK00qUytBKkwtUip3LHJbaSsxXT1BKk4rTSp3K1IqUy12KkwscltpKzJdPVIqTitNKkwrdip3LUEqUyxyW2krM109TSpOLXYqUy1BKnctUipMLHJ9Z2V0IHgoKXtyZXR1cm4gdGhpcy5feH1zZXQgeChyKXt0aGlzLl94PXIsdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpfWdldCB5KCl7cmV0dXJuIHRoaXMuX3l9c2V0IHkocil7dGhpcy5feT1yLHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKX1nZXQgeigpe3JldHVybiB0aGlzLl96fXNldCB6KHIpe3RoaXMuX3o9cix0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCl9Z2V0IHcoKXtyZXR1cm4gdGhpcy5fd31zZXQgdyhyKXt0aGlzLl93PXIsdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpfXNldChyLGksZixoKXtyZXR1cm4gdGhpcy5feD1yLHRoaXMuX3k9aSx0aGlzLl96PWYsdGhpcy5fdz1oLHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKSx0aGlzfWNsb25lKCl7cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuX3gsdGhpcy5feSx0aGlzLl96LHRoaXMuX3cpfWNvcHkocil7cmV0dXJuIHRoaXMuX3g9ci54LHRoaXMuX3k9ci55LHRoaXMuX3o9ci56LHRoaXMuX3c9ci53LHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKSx0aGlzfXNldEZyb21FdWxlcihyLGkpe2lmKCEociYmci5pc0V1bGVyKSl0aHJvdyBuZXcgRXJyb3IoIlRIUkVFLlF1YXRlcm5pb246IC5zZXRGcm9tRXVsZXIoKSBub3cgZXhwZWN0cyBhbiBFdWxlciByb3RhdGlvbiByYXRoZXIgdGhhbiBhIFZlY3RvcjMgYW5kIG9yZGVyLiIpO2NvbnN0IGY9ci5feCxoPXIuX3ksYz1yLl96LGc9ci5fb3JkZXIsdj1NYXRoLmNvcyxBPU1hdGguc2luLFI9dihmLzIpLE09dihoLzIpLFM9dihjLzIpLHc9QShmLzIpLEw9QShoLzIpLE49QShjLzIpO3N3aXRjaChnKXtjYXNlIlhZWiI6dGhpcy5feD13Kk0qUytSKkwqTix0aGlzLl95PVIqTCpTLXcqTSpOLHRoaXMuX3o9UipNKk4rdypMKlMsdGhpcy5fdz1SKk0qUy13KkwqTjticmVhaztjYXNlIllYWiI6dGhpcy5feD13Kk0qUytSKkwqTix0aGlzLl95PVIqTCpTLXcqTSpOLHRoaXMuX3o9UipNKk4tdypMKlMsdGhpcy5fdz1SKk0qUyt3KkwqTjticmVhaztjYXNlIlpYWSI6dGhpcy5feD13Kk0qUy1SKkwqTix0aGlzLl95PVIqTCpTK3cqTSpOLHRoaXMuX3o9UipNKk4rdypMKlMsdGhpcy5fdz1SKk0qUy13KkwqTjticmVhaztjYXNlIlpZWCI6dGhpcy5feD13Kk0qUy1SKkwqTix0aGlzLl95PVIqTCpTK3cqTSpOLHRoaXMuX3o9UipNKk4tdypMKlMsdGhpcy5fdz1SKk0qUyt3KkwqTjticmVhaztjYXNlIllaWCI6dGhpcy5feD13Kk0qUytSKkwqTix0aGlzLl95PVIqTCpTK3cqTSpOLHRoaXMuX3o9UipNKk4tdypMKlMsdGhpcy5fdz1SKk0qUy13KkwqTjticmVhaztjYXNlIlhaWSI6dGhpcy5feD13Kk0qUy1SKkwqTix0aGlzLl95PVIqTCpTLXcqTSpOLHRoaXMuX3o9UipNKk4rdypMKlMsdGhpcy5fdz1SKk0qUyt3KkwqTjticmVhaztkZWZhdWx0OmNvbnNvbGUud2FybigiVEhSRUUuUXVhdGVybmlvbjogLnNldEZyb21FdWxlcigpIGVuY291bnRlcmVkIGFuIHVua25vd24gb3JkZXI6ICIrZyl9cmV0dXJuIGkhPT0hMSYmdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpLHRoaXN9c2V0RnJvbUF4aXNBbmdsZShyLGkpe2NvbnN0IGY9aS8yLGg9TWF0aC5zaW4oZik7cmV0dXJuIHRoaXMuX3g9ci54KmgsdGhpcy5feT1yLnkqaCx0aGlzLl96PXIueipoLHRoaXMuX3c9TWF0aC5jb3MoZiksdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpLHRoaXN9c2V0RnJvbVJvdGF0aW9uTWF0cml4KHIpe2NvbnN0IGk9ci5lbGVtZW50cyxmPWlbMF0saD1pWzRdLGM9aVs4XSxnPWlbMV0sdj1pWzVdLEE9aVs5XSxSPWlbMl0sTT1pWzZdLFM9aVsxMF0sdz1mK3YrUztpZih3PjApe2NvbnN0IEw9LjUvTWF0aC5zcXJ0KHcrMSk7dGhpcy5fdz0uMjUvTCx0aGlzLl94PShNLUEpKkwsdGhpcy5feT0oYy1SKSpMLHRoaXMuX3o9KGctaCkqTH1lbHNlIGlmKGY+diYmZj5TKXtjb25zdCBMPTIqTWF0aC5zcXJ0KDErZi12LVMpO3RoaXMuX3c9KE0tQSkvTCx0aGlzLl94PS4yNSpMLHRoaXMuX3k9KGgrZykvTCx0aGlzLl96PShjK1IpL0x9ZWxzZSBpZih2PlMpe2NvbnN0IEw9MipNYXRoLnNxcnQoMSt2LWYtUyk7dGhpcy5fdz0oYy1SKS9MLHRoaXMuX3g9KGgrZykvTCx0aGlzLl95PS4yNSpMLHRoaXMuX3o9KEErTSkvTH1lbHNle2NvbnN0IEw9MipNYXRoLnNxcnQoMStTLWYtdik7dGhpcy5fdz0oZy1oKS9MLHRoaXMuX3g9KGMrUikvTCx0aGlzLl95PShBK00pL0wsdGhpcy5fej0uMjUqTH1yZXR1cm4gdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpLHRoaXN9c2V0RnJvbVVuaXRWZWN0b3JzKHIsaSl7bGV0IGY9ci5kb3QoaSkrMTtyZXR1cm4gZjxOdW1iZXIuRVBTSUxPTj8oZj0wLE1hdGguYWJzKHIueCk+TWF0aC5hYnMoci56KT8odGhpcy5feD0tci55LHRoaXMuX3k9ci54LHRoaXMuX3o9MCx0aGlzLl93PWYpOih0aGlzLl94PTAsdGhpcy5feT0tci56LHRoaXMuX3o9ci55LHRoaXMuX3c9ZikpOih0aGlzLl94PXIueSppLnotci56KmkueSx0aGlzLl95PXIueippLngtci54Kmkueix0aGlzLl96PXIueCppLnktci55KmkueCx0aGlzLl93PWYpLHRoaXMubm9ybWFsaXplKCl9YW5nbGVUbyhyKXtyZXR1cm4gMipNYXRoLmFjb3MoTWF0aC5hYnMoVG8odGhpcy5kb3QociksLTEsMSkpKX1yb3RhdGVUb3dhcmRzKHIsaSl7Y29uc3QgZj10aGlzLmFuZ2xlVG8ocik7aWYoZj09PTApcmV0dXJuIHRoaXM7Y29uc3QgaD1NYXRoLm1pbigxLGkvZik7cmV0dXJuIHRoaXMuc2xlcnAocixoKSx0aGlzfWlkZW50aXR5KCl7cmV0dXJuIHRoaXMuc2V0KDAsMCwwLDEpfWludmVydCgpe3JldHVybiB0aGlzLmNvbmp1Z2F0ZSgpfWNvbmp1Z2F0ZSgpe3JldHVybiB0aGlzLl94Kj0tMSx0aGlzLl95Kj0tMSx0aGlzLl96Kj0tMSx0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCksdGhpc31kb3Qocil7cmV0dXJuIHRoaXMuX3gqci5feCt0aGlzLl95KnIuX3krdGhpcy5feipyLl96K3RoaXMuX3cqci5fd31sZW5ndGhTcSgpe3JldHVybiB0aGlzLl94KnRoaXMuX3grdGhpcy5feSp0aGlzLl95K3RoaXMuX3oqdGhpcy5feit0aGlzLl93KnRoaXMuX3d9bGVuZ3RoKCl7cmV0dXJuIE1hdGguc3FydCh0aGlzLl94KnRoaXMuX3grdGhpcy5feSp0aGlzLl95K3RoaXMuX3oqdGhpcy5feit0aGlzLl93KnRoaXMuX3cpfW5vcm1hbGl6ZSgpe2xldCByPXRoaXMubGVuZ3RoKCk7cmV0dXJuIHI9PT0wPyh0aGlzLl94PTAsdGhpcy5feT0wLHRoaXMuX3o9MCx0aGlzLl93PTEpOihyPTEvcix0aGlzLl94PXRoaXMuX3gqcix0aGlzLl95PXRoaXMuX3kqcix0aGlzLl96PXRoaXMuX3oqcix0aGlzLl93PXRoaXMuX3cqciksdGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpLHRoaXN9bXVsdGlwbHkocixpKXtyZXR1cm4gaSE9PXZvaWQgMD8oY29uc29sZS53YXJuKCJUSFJFRS5RdWF0ZXJuaW9uOiAubXVsdGlwbHkoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5tdWx0aXBseVF1YXRlcm5pb25zKCBhLCBiICkgaW5zdGVhZC4iKSx0aGlzLm11bHRpcGx5UXVhdGVybmlvbnMocixpKSk6dGhpcy5tdWx0aXBseVF1YXRlcm5pb25zKHRoaXMscil9cHJlbXVsdGlwbHkocil7cmV0dXJuIHRoaXMubXVsdGlwbHlRdWF0ZXJuaW9ucyhyLHRoaXMpfW11bHRpcGx5UXVhdGVybmlvbnMocixpKXtjb25zdCBmPXIuX3gsaD1yLl95LGM9ci5feixnPXIuX3csdj1pLl94LEE9aS5feSxSPWkuX3osTT1pLl93O3JldHVybiB0aGlzLl94PWYqTStnKnYraCpSLWMqQSx0aGlzLl95PWgqTStnKkErYyp2LWYqUix0aGlzLl96PWMqTStnKlIrZipBLWgqdix0aGlzLl93PWcqTS1mKnYtaCpBLWMqUix0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCksdGhpc31zbGVycChyLGkpe2lmKGk9PT0wKXJldHVybiB0aGlzO2lmKGk9PT0xKXJldHVybiB0aGlzLmNvcHkocik7Y29uc3QgZj10aGlzLl94LGg9dGhpcy5feSxjPXRoaXMuX3osZz10aGlzLl93O2xldCB2PWcqci5fdytmKnIuX3graCpyLl95K2Mqci5fejtpZih2PDA/KHRoaXMuX3c9LXIuX3csdGhpcy5feD0tci5feCx0aGlzLl95PS1yLl95LHRoaXMuX3o9LXIuX3osdj0tdik6dGhpcy5jb3B5KHIpLHY+PTEpcmV0dXJuIHRoaXMuX3c9Zyx0aGlzLl94PWYsdGhpcy5feT1oLHRoaXMuX3o9Yyx0aGlzO2NvbnN0IEE9MS12KnY7aWYoQTw9TnVtYmVyLkVQU0lMT04pe2NvbnN0IEw9MS1pO3JldHVybiB0aGlzLl93PUwqZytpKnRoaXMuX3csdGhpcy5feD1MKmYraSp0aGlzLl94LHRoaXMuX3k9TCpoK2kqdGhpcy5feSx0aGlzLl96PUwqYytpKnRoaXMuX3osdGhpcy5ub3JtYWxpemUoKSx0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCksdGhpc31jb25zdCBSPU1hdGguc3FydChBKSxNPU1hdGguYXRhbjIoUix2KSxTPU1hdGguc2luKCgxLWkpKk0pL1Isdz1NYXRoLnNpbihpKk0pL1I7cmV0dXJuIHRoaXMuX3c9ZypTK3RoaXMuX3cqdyx0aGlzLl94PWYqUyt0aGlzLl94KncsdGhpcy5feT1oKlMrdGhpcy5feSp3LHRoaXMuX3o9YypTK3RoaXMuX3oqdyx0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCksdGhpc31zbGVycFF1YXRlcm5pb25zKHIsaSxmKXtyZXR1cm4gdGhpcy5jb3B5KHIpLnNsZXJwKGksZil9cmFuZG9tKCl7Y29uc3Qgcj1NYXRoLnJhbmRvbSgpLGk9TWF0aC5zcXJ0KDEtciksZj1NYXRoLnNxcnQociksaD0yKk1hdGguUEkqTWF0aC5yYW5kb20oKSxjPTIqTWF0aC5QSSpNYXRoLnJhbmRvbSgpO3JldHVybiB0aGlzLnNldChpKk1hdGguY29zKGgpLGYqTWF0aC5zaW4oYyksZipNYXRoLmNvcyhjKSxpKk1hdGguc2luKGgpKX1lcXVhbHMocil7cmV0dXJuIHIuX3g9PT10aGlzLl94JiZyLl95PT09dGhpcy5feSYmci5fej09PXRoaXMuX3omJnIuX3c9PT10aGlzLl93fWZyb21BcnJheShyLGk9MCl7cmV0dXJuIHRoaXMuX3g9cltpXSx0aGlzLl95PXJbaSsxXSx0aGlzLl96PXJbaSsyXSx0aGlzLl93PXJbaSszXSx0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCksdGhpc310b0FycmF5KHI9W10saT0wKXtyZXR1cm4gcltpXT10aGlzLl94LHJbaSsxXT10aGlzLl95LHJbaSsyXT10aGlzLl96LHJbaSszXT10aGlzLl93LHJ9ZnJvbUJ1ZmZlckF0dHJpYnV0ZShyLGkpe3JldHVybiB0aGlzLl94PXIuZ2V0WChpKSx0aGlzLl95PXIuZ2V0WShpKSx0aGlzLl96PXIuZ2V0WihpKSx0aGlzLl93PXIuZ2V0VyhpKSx0aGlzfV9vbkNoYW5nZShyKXtyZXR1cm4gdGhpcy5fb25DaGFuZ2VDYWxsYmFjaz1yLHRoaXN9X29uQ2hhbmdlQ2FsbGJhY2soKXt9KltTeW1ib2wuaXRlcmF0b3JdKCl7eWllbGQgdGhpcy5feCx5aWVsZCB0aGlzLl95LHlpZWxkIHRoaXMuX3oseWllbGQgdGhpcy5fd319Y2xhc3MgdHR7Y29uc3RydWN0b3Iocj0wLGk9MCxmPTApe3R0LnByb3RvdHlwZS5pc1ZlY3RvcjM9ITAsdGhpcy54PXIsdGhpcy55PWksdGhpcy56PWZ9c2V0KHIsaSxmKXtyZXR1cm4gZj09PXZvaWQgMCYmKGY9dGhpcy56KSx0aGlzLng9cix0aGlzLnk9aSx0aGlzLno9Zix0aGlzfXNldFNjYWxhcihyKXtyZXR1cm4gdGhpcy54PXIsdGhpcy55PXIsdGhpcy56PXIsdGhpc31zZXRYKHIpe3JldHVybiB0aGlzLng9cix0aGlzfXNldFkocil7cmV0dXJuIHRoaXMueT1yLHRoaXN9c2V0WihyKXtyZXR1cm4gdGhpcy56PXIsdGhpc31zZXRDb21wb25lbnQocixpKXtzd2l0Y2gocil7Y2FzZSAwOnRoaXMueD1pO2JyZWFrO2Nhc2UgMTp0aGlzLnk9aTticmVhaztjYXNlIDI6dGhpcy56PWk7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoImluZGV4IGlzIG91dCBvZiByYW5nZTogIityKX1yZXR1cm4gdGhpc31nZXRDb21wb25lbnQocil7c3dpdGNoKHIpe2Nhc2UgMDpyZXR1cm4gdGhpcy54O2Nhc2UgMTpyZXR1cm4gdGhpcy55O2Nhc2UgMjpyZXR1cm4gdGhpcy56O2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKCJpbmRleCBpcyBvdXQgb2YgcmFuZ2U6ICIrcil9fWNsb25lKCl7cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMueCx0aGlzLnksdGhpcy56KX1jb3B5KHIpe3JldHVybiB0aGlzLng9ci54LHRoaXMueT1yLnksdGhpcy56PXIueix0aGlzfWFkZChyLGkpe3JldHVybiBpIT09dm9pZCAwPyhjb25zb2xlLndhcm4oIlRIUkVFLlZlY3RvcjM6IC5hZGQoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5hZGRWZWN0b3JzKCBhLCBiICkgaW5zdGVhZC4iKSx0aGlzLmFkZFZlY3RvcnMocixpKSk6KHRoaXMueCs9ci54LHRoaXMueSs9ci55LHRoaXMueis9ci56LHRoaXMpfWFkZFNjYWxhcihyKXtyZXR1cm4gdGhpcy54Kz1yLHRoaXMueSs9cix0aGlzLnorPXIsdGhpc31hZGRWZWN0b3JzKHIsaSl7cmV0dXJuIHRoaXMueD1yLngraS54LHRoaXMueT1yLnkraS55LHRoaXMuej1yLnoraS56LHRoaXN9YWRkU2NhbGVkVmVjdG9yKHIsaSl7cmV0dXJuIHRoaXMueCs9ci54KmksdGhpcy55Kz1yLnkqaSx0aGlzLnorPXIueippLHRoaXN9c3ViKHIsaSl7cmV0dXJuIGkhPT12b2lkIDA/KGNvbnNvbGUud2FybigiVEhSRUUuVmVjdG9yMzogLnN1YigpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLnN1YlZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLiIpLHRoaXMuc3ViVmVjdG9ycyhyLGkpKToodGhpcy54LT1yLngsdGhpcy55LT1yLnksdGhpcy56LT1yLnosdGhpcyl9c3ViU2NhbGFyKHIpe3JldHVybiB0aGlzLngtPXIsdGhpcy55LT1yLHRoaXMuei09cix0aGlzfXN1YlZlY3RvcnMocixpKXtyZXR1cm4gdGhpcy54PXIueC1pLngsdGhpcy55PXIueS1pLnksdGhpcy56PXIuei1pLnosdGhpc31tdWx0aXBseShyLGkpe3JldHVybiBpIT09dm9pZCAwPyhjb25zb2xlLndhcm4oIlRIUkVFLlZlY3RvcjM6IC5tdWx0aXBseSgpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLm11bHRpcGx5VmVjdG9ycyggYSwgYiApIGluc3RlYWQuIiksdGhpcy5tdWx0aXBseVZlY3RvcnMocixpKSk6KHRoaXMueCo9ci54LHRoaXMueSo9ci55LHRoaXMueio9ci56LHRoaXMpfW11bHRpcGx5U2NhbGFyKHIpe3JldHVybiB0aGlzLngqPXIsdGhpcy55Kj1yLHRoaXMueio9cix0aGlzfW11bHRpcGx5VmVjdG9ycyhyLGkpe3JldHVybiB0aGlzLng9ci54KmkueCx0aGlzLnk9ci55KmkueSx0aGlzLno9ci56Kmkueix0aGlzfWFwcGx5RXVsZXIocil7cmV0dXJuIHImJnIuaXNFdWxlcnx8Y29uc29sZS5lcnJvcigiVEhSRUUuVmVjdG9yMzogLmFwcGx5RXVsZXIoKSBub3cgZXhwZWN0cyBhbiBFdWxlciByb3RhdGlvbiByYXRoZXIgdGhhbiBhIFZlY3RvcjMgYW5kIG9yZGVyLiIpLHRoaXMuYXBwbHlRdWF0ZXJuaW9uKENvLnNldEZyb21FdWxlcihyKSl9YXBwbHlBeGlzQW5nbGUocixpKXtyZXR1cm4gdGhpcy5hcHBseVF1YXRlcm5pb24oQ28uc2V0RnJvbUF4aXNBbmdsZShyLGkpKX1hcHBseU1hdHJpeDMocil7Y29uc3QgaT10aGlzLngsZj10aGlzLnksaD10aGlzLnosYz1yLmVsZW1lbnRzO3JldHVybiB0aGlzLng9Y1swXSppK2NbM10qZitjWzZdKmgsdGhpcy55PWNbMV0qaStjWzRdKmYrY1s3XSpoLHRoaXMuej1jWzJdKmkrY1s1XSpmK2NbOF0qaCx0aGlzfWFwcGx5Tm9ybWFsTWF0cml4KHIpe3JldHVybiB0aGlzLmFwcGx5TWF0cml4MyhyKS5ub3JtYWxpemUoKX1hcHBseU1hdHJpeDQocil7Y29uc3QgaT10aGlzLngsZj10aGlzLnksaD10aGlzLnosYz1yLmVsZW1lbnRzLGc9MS8oY1szXSppK2NbN10qZitjWzExXSpoK2NbMTVdKTtyZXR1cm4gdGhpcy54PShjWzBdKmkrY1s0XSpmK2NbOF0qaCtjWzEyXSkqZyx0aGlzLnk9KGNbMV0qaStjWzVdKmYrY1s5XSpoK2NbMTNdKSpnLHRoaXMuej0oY1syXSppK2NbNl0qZitjWzEwXSpoK2NbMTRdKSpnLHRoaXN9YXBwbHlRdWF0ZXJuaW9uKHIpe2NvbnN0IGk9dGhpcy54LGY9dGhpcy55LGg9dGhpcy56LGM9ci54LGc9ci55LHY9ci56LEE9ci53LFI9QSppK2cqaC12KmYsTT1BKmYrdippLWMqaCxTPUEqaCtjKmYtZyppLHc9LWMqaS1nKmYtdipoO3JldHVybiB0aGlzLng9UipBK3cqLWMrTSotdi1TKi1nLHRoaXMueT1NKkErdyotZytTKi1jLVIqLXYsdGhpcy56PVMqQSt3Ki12K1IqLWctTSotYyx0aGlzfXByb2plY3Qocil7cmV0dXJuIHRoaXMuYXBwbHlNYXRyaXg0KHIubWF0cml4V29ybGRJbnZlcnNlKS5hcHBseU1hdHJpeDQoci5wcm9qZWN0aW9uTWF0cml4KX11bnByb2plY3Qocil7cmV0dXJuIHRoaXMuYXBwbHlNYXRyaXg0KHIucHJvamVjdGlvbk1hdHJpeEludmVyc2UpLmFwcGx5TWF0cml4NChyLm1hdHJpeFdvcmxkKX10cmFuc2Zvcm1EaXJlY3Rpb24ocil7Y29uc3QgaT10aGlzLngsZj10aGlzLnksaD10aGlzLnosYz1yLmVsZW1lbnRzO3JldHVybiB0aGlzLng9Y1swXSppK2NbNF0qZitjWzhdKmgsdGhpcy55PWNbMV0qaStjWzVdKmYrY1s5XSpoLHRoaXMuej1jWzJdKmkrY1s2XSpmK2NbMTBdKmgsdGhpcy5ub3JtYWxpemUoKX1kaXZpZGUocil7cmV0dXJuIHRoaXMueC89ci54LHRoaXMueS89ci55LHRoaXMuei89ci56LHRoaXN9ZGl2aWRlU2NhbGFyKHIpe3JldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyKDEvcil9bWluKHIpe3JldHVybiB0aGlzLng9TWF0aC5taW4odGhpcy54LHIueCksdGhpcy55PU1hdGgubWluKHRoaXMueSxyLnkpLHRoaXMuej1NYXRoLm1pbih0aGlzLnosci56KSx0aGlzfW1heChyKXtyZXR1cm4gdGhpcy54PU1hdGgubWF4KHRoaXMueCxyLngpLHRoaXMueT1NYXRoLm1heCh0aGlzLnksci55KSx0aGlzLno9TWF0aC5tYXgodGhpcy56LHIueiksdGhpc31jbGFtcChyLGkpe3JldHVybiB0aGlzLng9TWF0aC5tYXgoci54LE1hdGgubWluKGkueCx0aGlzLngpKSx0aGlzLnk9TWF0aC5tYXgoci55LE1hdGgubWluKGkueSx0aGlzLnkpKSx0aGlzLno9TWF0aC5tYXgoci56LE1hdGgubWluKGkueix0aGlzLnopKSx0aGlzfWNsYW1wU2NhbGFyKHIsaSl7cmV0dXJuIHRoaXMueD1NYXRoLm1heChyLE1hdGgubWluKGksdGhpcy54KSksdGhpcy55PU1hdGgubWF4KHIsTWF0aC5taW4oaSx0aGlzLnkpKSx0aGlzLno9TWF0aC5tYXgocixNYXRoLm1pbihpLHRoaXMueikpLHRoaXN9Y2xhbXBMZW5ndGgocixpKXtjb25zdCBmPXRoaXMubGVuZ3RoKCk7cmV0dXJuIHRoaXMuZGl2aWRlU2NhbGFyKGZ8fDEpLm11bHRpcGx5U2NhbGFyKE1hdGgubWF4KHIsTWF0aC5taW4oaSxmKSkpfWZsb29yKCl7cmV0dXJuIHRoaXMueD1NYXRoLmZsb29yKHRoaXMueCksdGhpcy55PU1hdGguZmxvb3IodGhpcy55KSx0aGlzLno9TWF0aC5mbG9vcih0aGlzLnopLHRoaXN9Y2VpbCgpe3JldHVybiB0aGlzLng9TWF0aC5jZWlsKHRoaXMueCksdGhpcy55PU1hdGguY2VpbCh0aGlzLnkpLHRoaXMuej1NYXRoLmNlaWwodGhpcy56KSx0aGlzfXJvdW5kKCl7cmV0dXJuIHRoaXMueD1NYXRoLnJvdW5kKHRoaXMueCksdGhpcy55PU1hdGgucm91bmQodGhpcy55KSx0aGlzLno9TWF0aC5yb3VuZCh0aGlzLnopLHRoaXN9cm91bmRUb1plcm8oKXtyZXR1cm4gdGhpcy54PXRoaXMueDwwP01hdGguY2VpbCh0aGlzLngpOk1hdGguZmxvb3IodGhpcy54KSx0aGlzLnk9dGhpcy55PDA/TWF0aC5jZWlsKHRoaXMueSk6TWF0aC5mbG9vcih0aGlzLnkpLHRoaXMuej10aGlzLno8MD9NYXRoLmNlaWwodGhpcy56KTpNYXRoLmZsb29yKHRoaXMueiksdGhpc31uZWdhdGUoKXtyZXR1cm4gdGhpcy54PS10aGlzLngsdGhpcy55PS10aGlzLnksdGhpcy56PS10aGlzLnosdGhpc31kb3Qocil7cmV0dXJuIHRoaXMueCpyLngrdGhpcy55KnIueSt0aGlzLnoqci56fWxlbmd0aFNxKCl7cmV0dXJuIHRoaXMueCp0aGlzLngrdGhpcy55KnRoaXMueSt0aGlzLnoqdGhpcy56fWxlbmd0aCgpe3JldHVybiBNYXRoLnNxcnQodGhpcy54KnRoaXMueCt0aGlzLnkqdGhpcy55K3RoaXMueip0aGlzLnopfW1hbmhhdHRhbkxlbmd0aCgpe3JldHVybiBNYXRoLmFicyh0aGlzLngpK01hdGguYWJzKHRoaXMueSkrTWF0aC5hYnModGhpcy56KX1ub3JtYWxpemUoKXtyZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIodGhpcy5sZW5ndGgoKXx8MSl9c2V0TGVuZ3RoKHIpe3JldHVybiB0aGlzLm5vcm1hbGl6ZSgpLm11bHRpcGx5U2NhbGFyKHIpfWxlcnAocixpKXtyZXR1cm4gdGhpcy54Kz0oci54LXRoaXMueCkqaSx0aGlzLnkrPShyLnktdGhpcy55KSppLHRoaXMueis9KHIuei10aGlzLnopKmksdGhpc31sZXJwVmVjdG9ycyhyLGksZil7cmV0dXJuIHRoaXMueD1yLngrKGkueC1yLngpKmYsdGhpcy55PXIueSsoaS55LXIueSkqZix0aGlzLno9ci56KyhpLnotci56KSpmLHRoaXN9Y3Jvc3MocixpKXtyZXR1cm4gaSE9PXZvaWQgMD8oY29uc29sZS53YXJuKCJUSFJFRS5WZWN0b3IzOiAuY3Jvc3MoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5jcm9zc1ZlY3RvcnMoIGEsIGIgKSBpbnN0ZWFkLiIpLHRoaXMuY3Jvc3NWZWN0b3JzKHIsaSkpOnRoaXMuY3Jvc3NWZWN0b3JzKHRoaXMscil9Y3Jvc3NWZWN0b3JzKHIsaSl7Y29uc3QgZj1yLngsaD1yLnksYz1yLnosZz1pLngsdj1pLnksQT1pLno7cmV0dXJuIHRoaXMueD1oKkEtYyp2LHRoaXMueT1jKmctZipBLHRoaXMuej1mKnYtaCpnLHRoaXN9cHJvamVjdE9uVmVjdG9yKHIpe2NvbnN0IGk9ci5sZW5ndGhTcSgpO2lmKGk9PT0wKXJldHVybiB0aGlzLnNldCgwLDAsMCk7Y29uc3QgZj1yLmRvdCh0aGlzKS9pO3JldHVybiB0aGlzLmNvcHkocikubXVsdGlwbHlTY2FsYXIoZil9cHJvamVjdE9uUGxhbmUocil7cmV0dXJuIHZpLmNvcHkodGhpcykucHJvamVjdE9uVmVjdG9yKHIpLHRoaXMuc3ViKHZpKX1yZWZsZWN0KHIpe3JldHVybiB0aGlzLnN1Yih2aS5jb3B5KHIpLm11bHRpcGx5U2NhbGFyKDIqdGhpcy5kb3QocikpKX1hbmdsZVRvKHIpe2NvbnN0IGk9TWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3EoKSpyLmxlbmd0aFNxKCkpO2lmKGk9PT0wKXJldHVybiBNYXRoLlBJLzI7Y29uc3QgZj10aGlzLmRvdChyKS9pO3JldHVybiBNYXRoLmFjb3MoVG8oZiwtMSwxKSl9ZGlzdGFuY2VUbyhyKXtyZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VUb1NxdWFyZWQocikpfWRpc3RhbmNlVG9TcXVhcmVkKHIpe2NvbnN0IGk9dGhpcy54LXIueCxmPXRoaXMueS1yLnksaD10aGlzLnotci56O3JldHVybiBpKmkrZipmK2gqaH1tYW5oYXR0YW5EaXN0YW5jZVRvKHIpe3JldHVybiBNYXRoLmFicyh0aGlzLngtci54KStNYXRoLmFicyh0aGlzLnktci55KStNYXRoLmFicyh0aGlzLnotci56KX1zZXRGcm9tU3BoZXJpY2FsKHIpe3JldHVybiB0aGlzLnNldEZyb21TcGhlcmljYWxDb29yZHMoci5yYWRpdXMsci5waGksci50aGV0YSl9c2V0RnJvbVNwaGVyaWNhbENvb3JkcyhyLGksZil7Y29uc3QgaD1NYXRoLnNpbihpKSpyO3JldHVybiB0aGlzLng9aCpNYXRoLnNpbihmKSx0aGlzLnk9TWF0aC5jb3MoaSkqcix0aGlzLno9aCpNYXRoLmNvcyhmKSx0aGlzfXNldEZyb21DeWxpbmRyaWNhbChyKXtyZXR1cm4gdGhpcy5zZXRGcm9tQ3lsaW5kcmljYWxDb29yZHMoci5yYWRpdXMsci50aGV0YSxyLnkpfXNldEZyb21DeWxpbmRyaWNhbENvb3JkcyhyLGksZil7cmV0dXJuIHRoaXMueD1yKk1hdGguc2luKGkpLHRoaXMueT1mLHRoaXMuej1yKk1hdGguY29zKGkpLHRoaXN9c2V0RnJvbU1hdHJpeFBvc2l0aW9uKHIpe2NvbnN0IGk9ci5lbGVtZW50cztyZXR1cm4gdGhpcy54PWlbMTJdLHRoaXMueT1pWzEzXSx0aGlzLno9aVsxNF0sdGhpc31zZXRGcm9tTWF0cml4U2NhbGUocil7Y29uc3QgaT10aGlzLnNldEZyb21NYXRyaXhDb2x1bW4ociwwKS5sZW5ndGgoKSxmPXRoaXMuc2V0RnJvbU1hdHJpeENvbHVtbihyLDEpLmxlbmd0aCgpLGg9dGhpcy5zZXRGcm9tTWF0cml4Q29sdW1uKHIsMikubGVuZ3RoKCk7cmV0dXJuIHRoaXMueD1pLHRoaXMueT1mLHRoaXMuej1oLHRoaXN9c2V0RnJvbU1hdHJpeENvbHVtbihyLGkpe3JldHVybiB0aGlzLmZyb21BcnJheShyLmVsZW1lbnRzLGkqNCl9c2V0RnJvbU1hdHJpeDNDb2x1bW4ocixpKXtyZXR1cm4gdGhpcy5mcm9tQXJyYXkoci5lbGVtZW50cyxpKjMpfXNldEZyb21FdWxlcihyKXtyZXR1cm4gdGhpcy54PXIuX3gsdGhpcy55PXIuX3ksdGhpcy56PXIuX3osdGhpc31lcXVhbHMocil7cmV0dXJuIHIueD09PXRoaXMueCYmci55PT09dGhpcy55JiZyLno9PT10aGlzLnp9ZnJvbUFycmF5KHIsaT0wKXtyZXR1cm4gdGhpcy54PXJbaV0sdGhpcy55PXJbaSsxXSx0aGlzLno9cltpKzJdLHRoaXN9dG9BcnJheShyPVtdLGk9MCl7cmV0dXJuIHJbaV09dGhpcy54LHJbaSsxXT10aGlzLnkscltpKzJdPXRoaXMueixyfWZyb21CdWZmZXJBdHRyaWJ1dGUocixpLGYpe3JldHVybiBmIT09dm9pZCAwJiZjb25zb2xlLndhcm4oIlRIUkVFLlZlY3RvcjM6IG9mZnNldCBoYXMgYmVlbiByZW1vdmVkIGZyb20gLmZyb21CdWZmZXJBdHRyaWJ1dGUoKS4iKSx0aGlzLng9ci5nZXRYKGkpLHRoaXMueT1yLmdldFkoaSksdGhpcy56PXIuZ2V0WihpKSx0aGlzfXJhbmRvbSgpe3JldHVybiB0aGlzLng9TWF0aC5yYW5kb20oKSx0aGlzLnk9TWF0aC5yYW5kb20oKSx0aGlzLno9TWF0aC5yYW5kb20oKSx0aGlzfXJhbmRvbURpcmVjdGlvbigpe2NvbnN0IHI9KE1hdGgucmFuZG9tKCktLjUpKjIsaT1NYXRoLnJhbmRvbSgpKk1hdGguUEkqMixmPU1hdGguc3FydCgxLXIqKjIpO3JldHVybiB0aGlzLng9ZipNYXRoLmNvcyhpKSx0aGlzLnk9ZipNYXRoLnNpbihpKSx0aGlzLno9cix0aGlzfSpbU3ltYm9sLml0ZXJhdG9yXSgpe3lpZWxkIHRoaXMueCx5aWVsZCB0aGlzLnkseWllbGQgdGhpcy56fX1jb25zdCB2aT1uZXcgdHQsQ289bmV3IFJoO2NsYXNzIElve2NvbnN0cnVjdG9yKHI9bmV3IHR0KDEvMCwxLzAsMS8wKSxpPW5ldyB0dCgtMS8wLC0xLzAsLTEvMCkpe3RoaXMuaXNCb3gzPSEwLHRoaXMubWluPXIsdGhpcy5tYXg9aX1zZXQocixpKXtyZXR1cm4gdGhpcy5taW4uY29weShyKSx0aGlzLm1heC5jb3B5KGkpLHRoaXN9c2V0RnJvbUFycmF5KHIpe2xldCBpPTEvMCxmPTEvMCxoPTEvMCxjPS0xLzAsZz0tMS8wLHY9LTEvMDtmb3IobGV0IEE9MCxSPXIubGVuZ3RoO0E8UjtBKz0zKXtjb25zdCBNPXJbQV0sUz1yW0ErMV0sdz1yW0ErMl07TTxpJiYoaT1NKSxTPGYmJihmPVMpLHc8aCYmKGg9dyksTT5jJiYoYz1NKSxTPmcmJihnPVMpLHc+diYmKHY9dyl9cmV0dXJuIHRoaXMubWluLnNldChpLGYsaCksdGhpcy5tYXguc2V0KGMsZyx2KSx0aGlzfXNldEZyb21CdWZmZXJBdHRyaWJ1dGUocil7bGV0IGk9MS8wLGY9MS8wLGg9MS8wLGM9LTEvMCxnPS0xLzAsdj0tMS8wO2ZvcihsZXQgQT0wLFI9ci5jb3VudDtBPFI7QSsrKXtjb25zdCBNPXIuZ2V0WChBKSxTPXIuZ2V0WShBKSx3PXIuZ2V0WihBKTtNPGkmJihpPU0pLFM8ZiYmKGY9UyksdzxoJiYoaD13KSxNPmMmJihjPU0pLFM+ZyYmKGc9Uyksdz52JiYodj13KX1yZXR1cm4gdGhpcy5taW4uc2V0KGksZixoKSx0aGlzLm1heC5zZXQoYyxnLHYpLHRoaXN9c2V0RnJvbVBvaW50cyhyKXt0aGlzLm1ha2VFbXB0eSgpO2ZvcihsZXQgaT0wLGY9ci5sZW5ndGg7aTxmO2krKyl0aGlzLmV4cGFuZEJ5UG9pbnQocltpXSk7cmV0dXJuIHRoaXN9c2V0RnJvbUNlbnRlckFuZFNpemUocixpKXtjb25zdCBmPVVuLmNvcHkoaSkubXVsdGlwbHlTY2FsYXIoLjUpO3JldHVybiB0aGlzLm1pbi5jb3B5KHIpLnN1YihmKSx0aGlzLm1heC5jb3B5KHIpLmFkZChmKSx0aGlzfXNldEZyb21PYmplY3QocixpPSExKXtyZXR1cm4gdGhpcy5tYWtlRW1wdHkoKSx0aGlzLmV4cGFuZEJ5T2JqZWN0KHIsaSl9Y2xvbmUoKXtyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoKS5jb3B5KHRoaXMpfWNvcHkocil7cmV0dXJuIHRoaXMubWluLmNvcHkoci5taW4pLHRoaXMubWF4LmNvcHkoci5tYXgpLHRoaXN9bWFrZUVtcHR5KCl7cmV0dXJuIHRoaXMubWluLng9dGhpcy5taW4ueT10aGlzLm1pbi56PTEvMCx0aGlzLm1heC54PXRoaXMubWF4Lnk9dGhpcy5tYXguej0tMS8wLHRoaXN9aXNFbXB0eSgpe3JldHVybiB0aGlzLm1heC54PHRoaXMubWluLnh8fHRoaXMubWF4Lnk8dGhpcy5taW4ueXx8dGhpcy5tYXguejx0aGlzLm1pbi56fWdldENlbnRlcihyKXtyZXR1cm4gdGhpcy5pc0VtcHR5KCk/ci5zZXQoMCwwLDApOnIuYWRkVmVjdG9ycyh0aGlzLm1pbix0aGlzLm1heCkubXVsdGlwbHlTY2FsYXIoLjUpfWdldFNpemUocil7cmV0dXJuIHRoaXMuaXNFbXB0eSgpP3Iuc2V0KDAsMCwwKTpyLnN1YlZlY3RvcnModGhpcy5tYXgsdGhpcy5taW4pfWV4cGFuZEJ5UG9pbnQocil7cmV0dXJuIHRoaXMubWluLm1pbihyKSx0aGlzLm1heC5tYXgociksdGhpc31leHBhbmRCeVZlY3RvcihyKXtyZXR1cm4gdGhpcy5taW4uc3ViKHIpLHRoaXMubWF4LmFkZChyKSx0aGlzfWV4cGFuZEJ5U2NhbGFyKHIpe3JldHVybiB0aGlzLm1pbi5hZGRTY2FsYXIoLXIpLHRoaXMubWF4LmFkZFNjYWxhcihyKSx0aGlzfWV4cGFuZEJ5T2JqZWN0KHIsaT0hMSl7ci51cGRhdGVXb3JsZE1hdHJpeCghMSwhMSk7Y29uc3QgZj1yLmdlb21ldHJ5O2lmKGYhPT12b2lkIDApaWYoaSYmZi5hdHRyaWJ1dGVzIT1udWxsJiZmLmF0dHJpYnV0ZXMucG9zaXRpb24hPT12b2lkIDApe2NvbnN0IGM9Zi5hdHRyaWJ1dGVzLnBvc2l0aW9uO2ZvcihsZXQgZz0wLHY9Yy5jb3VudDtnPHY7ZysrKVVuLmZyb21CdWZmZXJBdHRyaWJ1dGUoYyxnKS5hcHBseU1hdHJpeDQoci5tYXRyaXhXb3JsZCksdGhpcy5leHBhbmRCeVBvaW50KFVuKX1lbHNlIGYuYm91bmRpbmdCb3g9PT1udWxsJiZmLmNvbXB1dGVCb3VuZGluZ0JveCgpLHhpLmNvcHkoZi5ib3VuZGluZ0JveCkseGkuYXBwbHlNYXRyaXg0KHIubWF0cml4V29ybGQpLHRoaXMudW5pb24oeGkpO2NvbnN0IGg9ci5jaGlsZHJlbjtmb3IobGV0IGM9MCxnPWgubGVuZ3RoO2M8ZztjKyspdGhpcy5leHBhbmRCeU9iamVjdChoW2NdLGkpO3JldHVybiB0aGlzfWNvbnRhaW5zUG9pbnQocil7cmV0dXJuIShyLng8dGhpcy5taW4ueHx8ci54PnRoaXMubWF4Lnh8fHIueTx0aGlzLm1pbi55fHxyLnk+dGhpcy5tYXgueXx8ci56PHRoaXMubWluLnp8fHIuej50aGlzLm1heC56KX1jb250YWluc0JveChyKXtyZXR1cm4gdGhpcy5taW4ueDw9ci5taW4ueCYmci5tYXgueDw9dGhpcy5tYXgueCYmdGhpcy5taW4ueTw9ci5taW4ueSYmci5tYXgueTw9dGhpcy5tYXgueSYmdGhpcy5taW4uejw9ci5taW4ueiYmci5tYXguejw9dGhpcy5tYXguen1nZXRQYXJhbWV0ZXIocixpKXtyZXR1cm4gaS5zZXQoKHIueC10aGlzLm1pbi54KS8odGhpcy5tYXgueC10aGlzLm1pbi54KSwoci55LXRoaXMubWluLnkpLyh0aGlzLm1heC55LXRoaXMubWluLnkpLChyLnotdGhpcy5taW4ueikvKHRoaXMubWF4LnotdGhpcy5taW4ueikpfWludGVyc2VjdHNCb3gocil7cmV0dXJuIShyLm1heC54PHRoaXMubWluLnh8fHIubWluLng+dGhpcy5tYXgueHx8ci5tYXgueTx0aGlzLm1pbi55fHxyLm1pbi55PnRoaXMubWF4Lnl8fHIubWF4Lno8dGhpcy5taW4uenx8ci5taW4uej50aGlzLm1heC56KX1pbnRlcnNlY3RzU3BoZXJlKHIpe3JldHVybiB0aGlzLmNsYW1wUG9pbnQoci5jZW50ZXIsVW4pLFVuLmRpc3RhbmNlVG9TcXVhcmVkKHIuY2VudGVyKTw9ci5yYWRpdXMqci5yYWRpdXN9aW50ZXJzZWN0c1BsYW5lKHIpe2xldCBpLGY7cmV0dXJuIHIubm9ybWFsLng+MD8oaT1yLm5vcm1hbC54KnRoaXMubWluLngsZj1yLm5vcm1hbC54KnRoaXMubWF4LngpOihpPXIubm9ybWFsLngqdGhpcy5tYXgueCxmPXIubm9ybWFsLngqdGhpcy5taW4ueCksci5ub3JtYWwueT4wPyhpKz1yLm5vcm1hbC55KnRoaXMubWluLnksZis9ci5ub3JtYWwueSp0aGlzLm1heC55KTooaSs9ci5ub3JtYWwueSp0aGlzLm1heC55LGYrPXIubm9ybWFsLnkqdGhpcy5taW4ueSksci5ub3JtYWwuej4wPyhpKz1yLm5vcm1hbC56KnRoaXMubWluLnosZis9ci5ub3JtYWwueip0aGlzLm1heC56KTooaSs9ci5ub3JtYWwueip0aGlzLm1heC56LGYrPXIubm9ybWFsLnoqdGhpcy5taW4ueiksaTw9LXIuY29uc3RhbnQmJmY+PS1yLmNvbnN0YW50fWludGVyc2VjdHNUcmlhbmdsZShyKXtpZih0aGlzLmlzRW1wdHkoKSlyZXR1cm4hMTt0aGlzLmdldENlbnRlcihTZSksdHIuc3ViVmVjdG9ycyh0aGlzLm1heCxTZSksaWUuc3ViVmVjdG9ycyhyLmEsU2UpLHNlLnN1YlZlY3RvcnMoci5iLFNlKSxvZS5zdWJWZWN0b3JzKHIuYyxTZSksYm4uc3ViVmVjdG9ycyhzZSxpZSksRW4uc3ViVmVjdG9ycyhvZSxzZSksV24uc3ViVmVjdG9ycyhpZSxvZSk7bGV0IGk9WzAsLWJuLnosYm4ueSwwLC1Fbi56LEVuLnksMCwtV24ueixXbi55LGJuLnosMCwtYm4ueCxFbi56LDAsLUVuLngsV24ueiwwLC1Xbi54LC1ibi55LGJuLngsMCwtRW4ueSxFbi54LDAsLVduLnksV24ueCwwXTtyZXR1cm4hd2koaSxpZSxzZSxvZSx0cil8fChpPVsxLDAsMCwwLDEsMCwwLDAsMV0sIXdpKGksaWUsc2Usb2UsdHIpKT8hMToobnIuY3Jvc3NWZWN0b3JzKGJuLEVuKSxpPVtuci54LG5yLnksbnIuel0sd2koaSxpZSxzZSxvZSx0cikpfWNsYW1wUG9pbnQocixpKXtyZXR1cm4gaS5jb3B5KHIpLmNsYW1wKHRoaXMubWluLHRoaXMubWF4KX1kaXN0YW5jZVRvUG9pbnQocil7cmV0dXJuIFVuLmNvcHkocikuY2xhbXAodGhpcy5taW4sdGhpcy5tYXgpLnN1YihyKS5sZW5ndGgoKX1nZXRCb3VuZGluZ1NwaGVyZShyKXtyZXR1cm4gdGhpcy5nZXRDZW50ZXIoci5jZW50ZXIpLHIucmFkaXVzPXRoaXMuZ2V0U2l6ZShVbikubGVuZ3RoKCkqLjUscn1pbnRlcnNlY3Qocil7cmV0dXJuIHRoaXMubWluLm1heChyLm1pbiksdGhpcy5tYXgubWluKHIubWF4KSx0aGlzLmlzRW1wdHkoKSYmdGhpcy5tYWtlRW1wdHkoKSx0aGlzfXVuaW9uKHIpe3JldHVybiB0aGlzLm1pbi5taW4oci5taW4pLHRoaXMubWF4Lm1heChyLm1heCksdGhpc31hcHBseU1hdHJpeDQocil7cmV0dXJuIHRoaXMuaXNFbXB0eSgpP3RoaXM6KGNuWzBdLnNldCh0aGlzLm1pbi54LHRoaXMubWluLnksdGhpcy5taW4ueikuYXBwbHlNYXRyaXg0KHIpLGNuWzFdLnNldCh0aGlzLm1pbi54LHRoaXMubWluLnksdGhpcy5tYXgueikuYXBwbHlNYXRyaXg0KHIpLGNuWzJdLnNldCh0aGlzLm1pbi54LHRoaXMubWF4LnksdGhpcy5taW4ueikuYXBwbHlNYXRyaXg0KHIpLGNuWzNdLnNldCh0aGlzLm1pbi54LHRoaXMubWF4LnksdGhpcy5tYXgueikuYXBwbHlNYXRyaXg0KHIpLGNuWzRdLnNldCh0aGlzLm1heC54LHRoaXMubWluLnksdGhpcy5taW4ueikuYXBwbHlNYXRyaXg0KHIpLGNuWzVdLnNldCh0aGlzLm1heC54LHRoaXMubWluLnksdGhpcy5tYXgueikuYXBwbHlNYXRyaXg0KHIpLGNuWzZdLnNldCh0aGlzLm1heC54LHRoaXMubWF4LnksdGhpcy5taW4ueikuYXBwbHlNYXRyaXg0KHIpLGNuWzddLnNldCh0aGlzLm1heC54LHRoaXMubWF4LnksdGhpcy5tYXgueikuYXBwbHlNYXRyaXg0KHIpLHRoaXMuc2V0RnJvbVBvaW50cyhjbiksdGhpcyl9dHJhbnNsYXRlKHIpe3JldHVybiB0aGlzLm1pbi5hZGQociksdGhpcy5tYXguYWRkKHIpLHRoaXN9ZXF1YWxzKHIpe3JldHVybiByLm1pbi5lcXVhbHModGhpcy5taW4pJiZyLm1heC5lcXVhbHModGhpcy5tYXgpfX1jb25zdCBjbj1bbmV3IHR0LG5ldyB0dCxuZXcgdHQsbmV3IHR0LG5ldyB0dCxuZXcgdHQsbmV3IHR0LG5ldyB0dF0sVW49bmV3IHR0LHhpPW5ldyBJbyxpZT1uZXcgdHQsc2U9bmV3IHR0LG9lPW5ldyB0dCxibj1uZXcgdHQsRW49bmV3IHR0LFduPW5ldyB0dCxTZT1uZXcgdHQsdHI9bmV3IHR0LG5yPW5ldyB0dCxabj1uZXcgdHQ7ZnVuY3Rpb24gd2koZCxyLGksZixoKXtmb3IobGV0IGM9MCxnPWQubGVuZ3RoLTM7Yzw9ZztjKz0zKXtabi5mcm9tQXJyYXkoZCxjKTtjb25zdCB2PWgueCpNYXRoLmFicyhabi54KStoLnkqTWF0aC5hYnMoWm4ueSkraC56Kk1hdGguYWJzKFpuLnopLEE9ci5kb3QoWm4pLFI9aS5kb3QoWm4pLE09Zi5kb3QoWm4pO2lmKE1hdGgubWF4KC1NYXRoLm1heChBLFIsTSksTWF0aC5taW4oQSxSLE0pKT52KXJldHVybiExfXJldHVybiEwfXR5cGVvZiBfX1RIUkVFX0RFVlRPT0xTX188InUiJiZfX1RIUkVFX0RFVlRPT0xTX18uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoInJlZ2lzdGVyIix7ZGV0YWlsOntyZXZpc2lvbjpEb319KSksdHlwZW9mIHdpbmRvdzwidSImJih3aW5kb3cuX19USFJFRV9fP2NvbnNvbGUud2FybigiV0FSTklORzogTXVsdGlwbGUgaW5zdGFuY2VzIG9mIFRocmVlLmpzIGJlaW5nIGltcG9ydGVkLiIpOndpbmRvdy5fX1RIUkVFX189RG8pO2NsYXNzIHpoe2NvbnN0cnVjdG9yKCl7TXQodGhpcywidmVydHMiLG5ldyBGbG9hdDMyQXJyYXkoMCkpO010KHRoaXMsImVsTnVtcyIsbmV3IEZsb2F0MzJBcnJheSgwKSk7TXQodGhpcywiaW5kZXgiLG5ldyBVaW50MzJBcnJheSgwKSk7TXQodGhpcywiZ2VvbUZpbGVOdW1iZXIiLDApO010KHRoaXMsImJveCIsbmV3IElvKX1zdGF0aWMgZ2V0R2VvbUVsTnVtYmVyKHIsaSl7cmV0dXJuKHIrMSkqMWU2K2l9c3RhdGljIGdldEdlb21OdW1iZXIocil7cmV0dXJuIE1hdGguZmxvb3Ioci8xZTYpLTF9fWNvbnN0IE9vPXNlbGY7bGV0IFBvPTA7Y29uc3QgRm89bmV3IFNldDthZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIixhc3luYyBkPT57aWYoZC5kYXRhLnR5cGU9PSJmZXRjaHNldCIpe2NvbnNvbGUubG9nKCJzdGFydCBtZXRhIGZldGNoaW5nIHdvcmtlciIpO2NvbnN0IHI9ZC5kYXRhLmd1aWRzLnNwbGl0KCI7Iik7bGV0IGk9LTE7YXdhaXQgQm8uY2xlYXJTdG9yYWdlQXN5bmMoKTtmb3IoY29uc3QgZiBpbiByKWF3YWl0IExoKGQuZGF0YS5zZXJ2ZXIscltmXSwrK2ksci5sZW5ndGgpfX0pO2FzeW5jIGZ1bmN0aW9uIExoKGQscixpLGYpe2NvbnNvbGUuaW5mbygiRmV0Y2hpbmcgbWV0YTogIityKTtsZXQgaD1bXSxjO2NvbnN0IGc9YXdhaXQgQWguZ2V0KGQrIi9hcGkvYXBwL2RhdGEvIityKyIvc3RyZWFtP3N0b3JhZ2VUeXBlPXRhbmdsLW1ldGEiLHtyZXNwb25zZVR5cGU6ImFycmF5YnVmZmVyIn0pLmNhdGNoKEk9PntQbysrLE9vLnBvc3RNZXNzYWdlKHt0eXBlOiJvbk5vdEZvdW5kIixsb2FkZWRHZW9tRmlsZXM6UG8sZ2VvbUZpbGVOdW1iZXI6aSxnZW9tRmlsZVRvdGFsOmYsbXNnOiJcdTA0MTNcdTA0MzVcdTA0M0VcdTA0M0NcdTA0MzVcdTA0NDJcdTA0NDBcdTA0MzhcdTA0NEYgXHUwNDNDXHUwNDNFXHUwNDM0XHUwNDM1XHUwNDNCXHUwNDM4IFx1MDQzRFx1MDQzNSBcdTA0M0RcdTA0MzBcdTA0MzlcdTA0MzRcdTA0MzVcdTA0M0RcdTA0MzAiLGVycjpJfSl9KSx2PW5ldyBVaW50OEFycmF5KGcuZGF0YSksUj1hd2FpdCBuZXcgTWgoKS5kZWNvbXByZXNzKHYpO2NvbnNvbGUuaW5mbygiUGFyc2luZyBtZXRhOiIrcik7Y29uc3QgTT1uZXcgVGV4dERlY29kZXIoInV0Zi04IiksUz1KU09OLnBhcnNlKE0uZGVjb2RlKFVpbnQ4QXJyYXkuZnJvbShSKSkpLHc9bmV3IE1hcCxMPW5ldyBNYXA7bGV0IE49LTE7Zm9yKGxldCBJPTA7STxTLmxlbmd0aDtJPUkrMSl7Y29uc3QgdXQ9emguZ2V0R2VvbUVsTnVtYmVyKGksSSk7U1tJXS5nZW9tTnVtPWksU1tJXS5lbE51bT11dCx3LnNldCh1dCxTW0ldLkd1aWQpLEwuc2V0KFNbSV0uR3VpZCx1dCksTj09LTEmJlNbSV0uSXNSZWY9PSEwJiYoTj1JKX1jb25zdCBsdD1TLnNsaWNlKE4pO2M9Uy5tYXAoST0+KHtndWlkOkkuR3VpZCxjb3VudDo1LGNhdGVnb3J5OkkuQ2F0ZWdvcnksdHlwZTpJLlR5cGUsbmFtZTpJLk5hbWUsaWQ6SS5JZCxlbE51bTpJLmVsTnVtLGdlb21OdW06SS5nZW9tTnVtLGlzUmVmOkkuSXNSZWZ9KSkuZmlsdGVyKEk9PiFJLmlzUmVmKSxjPXJlLmV4cG9ydHMuc29ydEJ5KGMsST0+SS5jYXRlZ29yeSksYz1yZS5leHBvcnRzLmdyb3VwQnkoYyxJPT5JLmNhdGVnb3J5KTtjb25zdCBYPVtdO09iamVjdC5rZXlzKGMpLm1hcCgoSSx1dCk9Pntjb25zdCBUPVtdLEN0PXJlLmV4cG9ydHMuc29ydEJ5KGNbSV0sZ3Q9Pmd0LnR5cGUpLEF0PXJlLmV4cG9ydHMuZ3JvdXBCeShDdCxndD0+Z3QudHlwZSksV3Q9ImdfIitpKyJfY18iK3V0O09iamVjdC5rZXlzKEF0KS5tYXAoKGd0LE1uKT0+e2NvbnN0IFJuPVd0KyJfdF8iK01uO1QucHVzaCh7c3RhdGU6e2xldmVsOjN9LGNvdW50OkF0W2d0XS5sZW5ndGgsa2V5OlJuLG5hbWU6Z3QsY2hpbGRyZW46T2JqZWN0LnZhbHVlcyhBdFtndF0pLm1hcCgoYXQsc24pPT57Y29uc3QgWnQ9Um4rIl9lXyIrc247cmV0dXJue25hbWU6YXQubmFtZSxrZXk6WnQsc3RhdGU6e2d1aWQ6YXQuZ3VpZCxlbE51bTphdC5lbE51bSxnZW9tTnVtOmF0Lmdlb21OdW0saWQ6YXQuaWQsbGV2ZWw6NH19fSl9KX0pLFgucHVzaCh7a2V5Old0LG5hbWU6SSxjb3VudDpULnJlZHVjZSgoZ3QsTW4pPT5ndCtNbi5jb3VudCwwKSxjaGlsZHJlbjpULHN0YXRlOntsZXZlbDoyfX0pfSksT28ucG9zdE1lc3NhZ2Uoe3R5cGU6Im9uTG9hZGVkIixtZXRhVHJlZTpYLG1ldGFEYXRhczpoLGxvYWRlZEZpbGU6aSxmaWxlVG90YWw6ZixudW1zVG9HdWlkczp3LGd1aWRUb051bXM6TH0pO2NvbnN0IHJ0PVtdLHd0PVtdO2ZvcihsZXQgST0wO0k8Uy5sZW5ndGg7ST1JKzEpRm8uaGFzKFNbSV0uR3VpZCl8fChGby5hZGQoU1tJXS5HdWlkKSx3dC5wdXNoKFNbSV0pLHJ0LnB1c2goU1tJXS5HdWlkKSk7d3QucHVzaChsdCkscnQucHVzaCgicmVmc18iK2kpLGF3YWl0IEJvLnNhdmVCYXRjaERhdGFBc3luYygibWV0YSIsd3QscnQpfX0pKCk7Cg==", Ld = typeof window < "u" && window.Blob && new Blob([atob(ds)], { type: "text/javascript;charset=utf-8" });
function $n() {
  const n = Ld && (window.URL || window.webkitURL).createObjectURL(Ld);
  try {
    return n ? new Worker(n) : new Worker("data:application/javascript;base64," + ds);
  } finally {
    n && (window.URL || window.webkitURL).revokeObjectURL(n);
  }
}
const la = "TanglAuth", cl = "meta", ea = 1;
class sc {
  static async getDbAsync() {
    return new Promise((e, l) => {
      const t = (self.indexedDB || window.indexedDB).open(la, ea);
      t.onblocked = (d) => {
        console.error("Idb error: db blocked", d), l("Blocked");
      }, t.onerror = (d) => {
        console.log("Error opening db", d), l("Error");
      }, t.onsuccess = (d) => {
        let s = d.target.result;
        e(s);
      }, t.onupgradeneeded = (d) => {
        d.target.result.createObjectStore(cl, { autoIncrement: !1 });
      };
    });
  }
  static async clearStorageAsync() {
    const e = await this.getDbAsync();
    return new Promise((l, c) => {
      const t = e.transaction([cl], "readwrite");
      t.oncomplete = () => {
        l();
      }, t.onerror = (s) => {
        console.error("IDB error", s), c(s);
      };
      const d = t.objectStore(cl);
      d == null || d.clear();
    });
  }
  static async deleteDataAsync(e) {
    const l = await this.getDbAsync();
    return new Promise((c) => {
      const t = l.transaction([cl], "readwrite");
      t.oncomplete = () => {
        c();
      }, t.onerror = (s) => {
        console.error("IDB error" + s), c();
      }, t.objectStore(cl).delete(e.id);
    });
  }
  static async getDataListAsync() {
    let e = await this.getDbAsync();
    const l = [];
    return new Promise((c) => {
      let t = e.transaction([cl], "readonly");
      t.oncomplete = () => {
        c(l);
      };
      const d = t.objectStore(cl);
      d.openCursor().onsuccess = (s) => {
        const i = s.target.result;
        i && (l.push(i.value), i.continue());
      };
    });
  }
  static async getDataByKeysAsync(e) {
    const l = new Set(e);
    let c = await this.getDbAsync();
    return new Promise(
      (t) => {
        if (l == null) {
          t([]);
          return;
        }
        const d = [];
        let s = c.transaction([cl], "readonly");
        s.oncomplete = () => {
        }, s.onerror = (a) => {
          console.error("IDB error" + a);
        };
        const i = s.objectStore(cl);
        for (const a in e) {
          const o = IDBKeyRange.only(e[a]);
          i.openCursor(o).onsuccess = (b) => {
            const m = b.target.result;
            m && (d[a] = m.value, l.delete(e[a]), l.size == 0 ? t(d) : m.continue());
          };
        }
      }
    );
  }
  static async getDataByKeyAsync(e) {
    let l = await this.getDbAsync();
    return new Promise((c) => {
      if (e == null) {
        c(void 0);
        return;
      }
      let t, d = l.transaction([cl], "readonly");
      d.oncomplete = () => {
        c(t.result);
      }, d.onerror = (i) => {
        console.error("IDB error" + i);
      }, t = d.objectStore(cl).get(e);
    });
  }
  static async saveDataAsync(e, l = void 0) {
    let c = await this.getDbAsync();
    return new Promise((t) => {
      let d = c.transaction([cl], "readwrite");
      d.oncomplete = () => {
        t();
      };
      let s = d.objectStore(cl);
      l ? s.add(e, l) : s.put(e);
    });
  }
  static async saveBatchDataAsync(e = cl, l, c) {
    let t = await this.getDbAsync();
    return new Promise((d, s) => {
      let i = t.transaction([e], "readwrite");
      i.onerror = (o) => {
        console.error("IDB transaction error", o), s("Error");
      }, i.oncomplete = () => {
        d();
      }, i.onabort = () => {
        s("Aborted"), console.log("IDB Transaction aborted");
      };
      let a = i.objectStore(cl);
      for (let o = 0; o < c.length; o = o + 1)
        a.add(l[o], c[o]);
    });
  }
}
class Ia extends EventTarget {
  constructor(l = "https://api.st.tangl.cloud") {
    super();
    Z(this, "modelIds", /* @__PURE__ */ new Set());
    Z(this, "metaTree", []);
    Z(this, "guidToNums", /* @__PURE__ */ new Map());
    Z(this, "numsToGuids", /* @__PURE__ */ new Map());
    Z(this, "server");
    Z(this, "loadProgressShow", !1);
    Z(this, "loadProgress", 0);
    Z(this, "loadedCallback");
    Z(this, "allLoadedCallback");
    this.server = l;
  }
  onLoaded(l) {
    return this.loadedCallback = l, this;
  }
  onAllLoaded(l) {
    return this.allLoadedCallback = l, this;
  }
  load(l) {
    console.log("Start meta loading...");
    const c = [];
    for (const d of l)
      this.modelIds.has(d.id) || (this.modelIds.add(d.id), c.push(d));
    if (!c.length) {
      this.allLoadedCallback && this.allLoadedCallback(), this.dispatchEvent(new Event(el.AllLoaded));
      return;
    }
    this.metaTree = [];
    const t = new $n();
    t.onmessage = (d) => {
      d.data.type == "onError" ? (this.loadProgress = 0, this.loadProgressShow = !1, console.log(d.data.msg + ": " + d.data.err)) : d.data.type == "onLoaded" && (this.numsToGuids = new Map([...this.numsToGuids, ...d.data.numsToGuids]), this.guidToNums = new Map([...this.guidToNums, ...d.data.guidToNums]), this.metaTree.push({
        key: "g_" + d.data.loadedFile,
        name: l[d.data.loadedFile].name,
        children: d.data.metaTree,
        count: d.data.metaTree.reduce((s, i) => s + i.count, 0),
        state: {
          level: 1
        }
      }), this.loadedCallback && this.loadedCallback(l[d.data.loadedFile].id), this.metaTree.length == d.data.fileTotal && (this.allLoadedCallback && this.allLoadedCallback(), this.dispatchEvent(new Event(el.AllLoaded))));
    }, t.postMessage({
      type: "fetchset",
      guids: c.map((d) => d.id).join(";"),
      server: this.server
    });
  }
  getElementGuid(l) {
    if (this.numsToGuids.has(l)) {
      const c = this.numsToGuids.get(l);
      if (c)
        return c;
    }
  }
  getElementNums(l) {
    if (this.guidToNums.has(l)) {
      const c = this.guidToNums.get(l);
      if (c)
        return c;
    }
  }
  async getElementsMetasByGuids(l) {
    var s;
    const c = l.map((i) => this.guidToNums.get(i)), t = /* @__PURE__ */ new Map(), d = await sc.getDataByKeysAsync(l);
    for (const i in d) {
      const a = c[i], o = Al.getGeomNumber(a);
      await this.getRefMetas(o), await this.collectDataRefs(t, (s = d[i]) == null ? void 0 : s.Meta.Element, 2);
    }
    return d;
  }
  async collectDataRefs(l, c, t) {
    if (t != 0)
      for (const d in c)
        if (c[d].hasOwnProperty("RefIdx")) {
          const s = this.getElementGuid(c[d].RefIdx);
          let i;
          s && l.has(s) && (i = l.get(s)), i && (await this.collectDataRefs(l, i, t - 1), c[d] = i == null ? void 0 : i.Meta.Element);
        } else
          c[d].constructor.name === "Object" && await this.collectDataRefs(l, c[d], t);
  }
  async getRefMetas(l) {
    const c = await sc.getDataByKeyAsync("refs_" + l);
    return new Map(c.map((t) => [t.Guid, t]));
  }
  async getElementMetaByNumbers(l) {
    const c = Al.getGeomNumber(l), t = this.getElementGuid(l);
    t || console.warn("Can`t get GUID for: " + l);
    const d = await this.getRefMetas(c);
    let s = await sc.getDataByKeyAsync(t);
    return await this.collectDataRefs(d, s == null ? void 0 : s.Meta.Element, 2), s;
  }
  async getElementMetaByGuid(l) {
    if (!this.guidToNums.has(l))
      return {};
    const c = this.guidToNums.get(l);
    return await this.getElementMetaByNumbers(c);
  }
  traverse(l, c = void 0) {
    this.traverseNodes([], this.metaTree, l, c);
  }
  traverseNodes(l, c, t, d = void 0) {
    for (let s = 0; s < c.length; s++)
      if (c[s].children && this.traverseNodes(l.concat(c[s]), c[s].children, t, d), t != null) {
        if (d == null)
          t(c[s], l);
        else if (d == c[s].state.elNum) {
          t(c[s], l);
          return;
        }
      }
  }
  collectEndNodes(l) {
    const c = [];
    return l && (l.children ? l.children && this.traverseNodes([], l.children, (t) => {
      (!t.children || t.isLeaf) && c.push(t);
    }) : c.push(l)), c;
  }
  destroy() {
    sc.clearStorageAsync();
  }
}
class ca extends Ad {
  constructor(l) {
    super(l, "mainExt.name", "mdi-cube-outline");
    Z(this, "tooltipExt");
    Z(this, "state", new qd());
  }
  onSceneLoaded() {
    const l = this.getRenderManager();
    l.sceneManager.isProgressive = this.state.progressive;
  }
  added() {
    var c;
    this.restoreState();
    const l = this.getRenderManager();
    l.state = this.state, this.onSceneLoaded = this.onSceneLoaded.bind(this), (c = l == null ? void 0 : l.sceneManager) == null || c.addEventListener(el.AllLoaded, this.onSceneLoaded);
  }
  deleted() {
    var c;
    const l = this.getRenderManager();
    (c = l == null ? void 0 : l.sceneManager) == null || c.removeEventListener(el.AllLoaded, this.onSceneLoaded);
  }
  selected() {
    this.tooltipExt && (this.tooltipExt.content = void 0), this.setup();
  }
  unselected() {
  }
  setup() {
    const l = this.getRenderManager();
    !l || (l.sceneManager.tools.setElementsState([], Hc.Normal), l.sceneManager.tools.setElementsColor([], 16777215));
  }
}
Z(ca, "getName", () => "general");
const Rd = 1e-6;
class ta extends Wt {
  constructor(l) {
    super(l, "orbitExt.name", "mdi-rotate-orbit");
    Z(this, "minDistance", 0);
    Z(this, "maxDistance", 1 / 0);
    Z(this, "minZoom", 0);
    Z(this, "maxZoom", 1 / 0);
    Z(this, "minPolarAngle", 0);
    Z(this, "maxPolarAngle", Math.PI);
    Z(this, "minAzimuthAngle", -1 / 0);
    Z(this, "maxAzimuthAngle", 1 / 0);
    Z(this, "enableDamping", !1);
    Z(this, "dampingFactor", 0.05);
    Z(this, "enableZoom", !0);
    Z(this, "zoomSpeed", 1);
    Z(this, "enableRotate", !0);
    Z(this, "rotateSpeed", 1);
    Z(this, "enablePan", !0);
    Z(this, "panSpeed", 1);
    Z(this, "screenSpacePanning", !0);
    Z(this, "keyPanSpeed", 7);
    Z(this, "autoRotate", !1);
    Z(this, "autoRotateSpeed", 2);
    Z(this, "mouseButtons", { LEFT: Wl.ROTATE, MIDDLE: Wl.DOLLY, RIGHT: Wl.PAN });
    Z(this, "touches", { ONE: kl.ROTATE, TWO: kl.DOLLY_PAN });
    Z(this, "spherical", new Yt());
    Z(this, "sphericalDelta", new Yt());
    Z(this, "scale", 1);
    Z(this, "panOffset", new R());
    Z(this, "zoomChanged", !1);
    Z(this, "rotateStart", new T());
    Z(this, "rotateEnd", new T());
    Z(this, "rotateDelta", new T());
    Z(this, "panStart", new T());
    Z(this, "panEnd", new T());
    Z(this, "panDelta", new T());
    Z(this, "dollyStart", new T());
    Z(this, "dollyEnd", new T());
    Z(this, "dollyDelta", new T());
    Z(this, "pointerState");
    Z(this, "_onMouseMove");
    Z(this, "_onMouseDown");
    Z(this, "_onMouseUp");
    Z(this, "_onPointerMove");
    Z(this, "_onPointerUp");
    Z(this, "_onPointerDown");
    Z(this, "_onMouseWheel2");
    Z(this, "_onTouchStart");
    Z(this, "_onTouchEnd");
    Z(this, "_onTouchMove");
    this.screenSpacePanning = !1, this.mouseButtons.LEFT = Wl.PAN, this.mouseButtons.RIGHT = Wl.ROTATE, this.touches.ONE = kl.PAN, this.touches.TWO = kl.DOLLY_ROTATE, this.mouseButtons = {
      LEFT: -1,
      MIDDLE: Wl.PAN,
      RIGHT: Wl.ROTATE
    }, this.screenSpacePanning = !0, this.minDistance = 1, this.maxDistance = 1e5;
  }
  getPolarAngle() {
    return this.spherical.phi;
  }
  getAzimuthalAngle() {
    return this.spherical.theta;
  }
  getAutoRotationAngle() {
    return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
  }
  getZoomScale() {
    return Math.pow(0.95, this.zoomSpeed);
  }
  rotateLeft(l) {
    this.sphericalDelta.theta -= l;
  }
  rotateUp(l) {
    this.sphericalDelta.phi -= l;
  }
  panLeft(l, c) {
    const t = new R();
    t.setFromMatrixColumn(c, 0), t.multiplyScalar(-l), this.panOffset.add(t);
  }
  panUp(l, c) {
    const t = new R();
    this.screenSpacePanning ? t.setFromMatrixColumn(c, 1) : (t.setFromMatrixColumn(c, 0), t.crossVectors(this.camera.up, t)), t.multiplyScalar(l), this.panOffset.add(t);
  }
  pan(l, c) {
    const t = new R(), d = this.domElement;
    if (this.camera.isPerspectiveCamera) {
      const s = this.camera.position;
      t.copy(s).sub(this.target);
      let i = t.length();
      i *= Math.tan(this.camera.fov / 2 * Math.PI / 180), this.panLeft(2 * l * i / d.clientHeight, this.camera.matrix), this.panUp(2 * c * i / d.clientHeight, this.camera.matrix);
    } else
      console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1;
  }
  dollyOut(l) {
    this.camera.isPerspectiveCamera ? this.scale /= l : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  dollyIn(l) {
    this.camera.isPerspectiveCamera ? this.scale *= l : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  onPointerDown(l) {
    if (!!this.isEnabled)
      switch (this.renderMan.navigationStarted(), l.pointerType) {
        case "mouse":
        case "pen":
          this.onMouseDown(l);
          break;
      }
  }
  onPointerMove(l) {
    if (!!this.isEnabled)
      switch (l.pointerType) {
        case "mouse":
        case "pen":
          this.onMouseMove2(l);
          break;
      }
  }
  onPointerUp(l) {
    if (!!this.isEnabled)
      switch (l.pointerType) {
        case "mouse":
        case "pen":
          this.onMouseUp(l);
          break;
      }
  }
  onMouseDown(l) {
    if (!this.isEnabled)
      return;
    this.renderMan.navigationStarted(), l.preventDefault(), this.domElement.focus ? this.domElement.focus() : window.focus();
    let c;
    switch (l.button) {
      case 0:
        c = this.mouseButtons.LEFT;
        break;
      case 1:
        c = this.mouseButtons.MIDDLE;
        break;
      case 2:
        c = this.mouseButtons.RIGHT;
        break;
      default:
        c = -1;
    }
    switch (c) {
      case Wl.DOLLY:
        if (!this.enableZoom)
          return;
        this.handleMouseDownDolly(l), this.pointerState = 1;
        break;
      case Wl.ROTATE:
        if (l.ctrlKey || l.metaKey || l.shiftKey) {
          if (!this.enablePan)
            return;
          this.handleMouseDownPan(l), this.pointerState = 2;
        } else {
          if (!this.enableRotate)
            return;
          this.handleMouseDownRotate(l), this.pointerState = 0;
        }
        break;
      case Wl.PAN:
        if (l.ctrlKey || l.metaKey || l.shiftKey) {
          if (!this.enableRotate)
            return;
          this.handleMouseDownRotate(l), this.pointerState = 0;
        } else {
          if (!this.enablePan)
            return;
          this.handleMouseDownPan(l), this.pointerState = 2;
        }
        break;
      default:
        this.pointerState = -1;
    }
  }
  onMouseMove2(l) {
    if (!!this.isEnabled)
      switch (l.preventDefault(), this.pointerState) {
        case 0:
          if (!this.enableRotate)
            return;
          this.handleMouseMoveRotate(l);
          break;
        case 1:
          if (!this.enableZoom)
            return;
          this.handleMouseMoveDolly(l);
          break;
        case 2:
          if (!this.enablePan)
            return;
          this.handleMouseMovePan(l);
          break;
      }
  }
  onMouseUp(l) {
    !this.isEnabled || (this.renderMan.navigationEnded(), this.handleMouseUp(), this.pointerState = -1);
  }
  onMouseWheel2(l) {
    !this.isEnabled || !this.enableZoom || this.pointerState !== -1 && this.pointerState !== 0 || (l.preventDefault(), this.handleMouseWheel(l));
  }
  onTouchStart(l) {
    if (!!this.isEnabled) {
      switch (this.renderMan.navigationStarted(), l.preventDefault(), l.touches.length) {
        case 1:
          switch (this.touches.ONE) {
            case kl.ROTATE:
              if (!this.enableRotate)
                return;
              this.handleTouchStartRotate(l), this.pointerState = 3;
              break;
            case kl.PAN:
              if (!this.enablePan)
                return;
              this.handleTouchStartPan(l), this.pointerState = 4;
              break;
            default:
              this.pointerState = -1;
          }
          break;
        case 2:
          switch (this.touches.TWO) {
            case kl.DOLLY_PAN:
              if (!this.enableZoom && !this.enablePan)
                return;
              this.handleTouchStartDollyPan(l), this.pointerState = 5;
              break;
            case kl.DOLLY_ROTATE:
              if (!this.enableZoom && !this.enableRotate)
                return;
              this.handleTouchStartDollyRotate(l), this.pointerState = 6;
              break;
            default:
              this.pointerState = -1;
          }
          break;
        default:
          this.pointerState = -1;
      }
      this.pointerState;
    }
  }
  onTouchMove(l) {
    if (!!this.isEnabled)
      switch (l.preventDefault(), this.pointerState) {
        case 3:
          if (!this.enableRotate)
            return;
          this.handleTouchMoveRotate(l), this.renderMan.requestUpdate();
          break;
        case 4:
          if (!this.enablePan)
            return;
          this.handleTouchMovePan(l), this.renderMan.requestUpdate();
          break;
        case 5:
          if (!this.enableZoom && !this.enablePan)
            return;
          this.handleTouchMoveDollyPan(l), this.renderMan.requestUpdate();
          break;
        case 6:
          if (!this.enableZoom && !this.enableRotate)
            return;
          this.handleTouchMoveDollyRotate(l), this.renderMan.requestUpdate();
          break;
        default:
          this.pointerState = -1;
      }
  }
  onTouchEnd(l) {
    !this.isEnabled || (this.renderMan.navigationEnded(), this.handleTouchEnd(), this.pointerState = -1);
  }
  onContextMenu(l) {
    l.preventDefault();
  }
  onSelected() {
    this.renderMan.requestUpdate();
  }
  handleTouchStartRotate(l) {
    if (l.touches.length == 1)
      this.rotateStart.set(l.touches[0].pageX, l.touches[0].pageY);
    else {
      const c = 0.5 * (l.touches[0].pageX + l.touches[1].pageX), t = 0.5 * (l.touches[0].pageY + l.touches[1].pageY);
      this.rotateStart.set(c, t);
    }
  }
  handleTouchStartPan(l) {
    if (l.touches.length == 1)
      this.panStart.set(l.touches[0].pageX, l.touches[0].pageY);
    else {
      const c = 0.5 * (l.touches[0].pageX + l.touches[1].pageX), t = 0.5 * (l.touches[0].pageY + l.touches[1].pageY);
      this.panStart.set(c, t);
    }
  }
  handleTouchStartDolly(l) {
    const c = l.touches[0].pageX - l.touches[1].pageX, t = l.touches[0].pageY - l.touches[1].pageY, d = Math.sqrt(c * c + t * t);
    this.dollyStart.set(0, d);
  }
  handleTouchStartDollyPan(l) {
    this.enableZoom && this.handleTouchStartDolly(l), this.enablePan && this.handleTouchStartPan(l);
  }
  handleTouchStartDollyRotate(l) {
    this.enableZoom && this.handleTouchStartDolly(l), this.enableRotate && this.handleTouchStartRotate(l);
  }
  handleTouchMoveRotate(l) {
    if (l.touches.length == 1)
      this.rotateEnd.set(l.touches[0].pageX, l.touches[0].pageY);
    else {
      const t = 0.5 * (l.touches[0].pageX + l.touches[1].pageX), d = 0.5 * (l.touches[0].pageY + l.touches[1].pageY);
      this.rotateEnd.set(t, d);
    }
    this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(this.rotateSpeed);
    const c = this.domElement;
    this.rotateLeft(2 * Math.PI * this.rotateDelta.x / c.clientHeight), this.rotateUp(2 * Math.PI * this.rotateDelta.y / c.clientHeight), this.rotateStart.copy(this.rotateEnd);
  }
  handleTouchMovePan(l) {
    if (l.touches.length == 1)
      this.panEnd.set(l.touches[0].pageX, l.touches[0].pageY);
    else {
      const c = 0.5 * (l.touches[0].pageX + l.touches[1].pageX), t = 0.5 * (l.touches[0].pageY + l.touches[1].pageY);
      this.panEnd.set(c, t);
    }
    this.panDelta.subVectors(this.panEnd, this.panStart).multiplyScalar(this.panSpeed), this.pan(this.panDelta.x, this.panDelta.y), this.panStart.copy(this.panEnd);
  }
  handleTouchMoveDolly(l) {
    const c = l.touches[0].pageX - l.touches[1].pageX, t = l.touches[0].pageY - l.touches[1].pageY, d = Math.sqrt(c * c + t * t);
    this.dollyEnd.set(0, d), this.dollyDelta.set(0, Math.pow(this.dollyEnd.y / this.dollyStart.y, this.zoomSpeed)), this.dollyOut(this.dollyDelta.y), this.dollyStart.copy(this.dollyEnd);
  }
  handleTouchMoveDollyPan(l) {
    this.enableZoom && this.handleTouchMoveDolly(l), this.enablePan && this.handleTouchMovePan(l);
  }
  handleTouchMoveDollyRotate(l) {
    this.enableZoom && this.handleTouchMoveDolly(l), this.enableRotate && this.handleTouchMoveRotate(l);
  }
  handleMouseDownRotate(l) {
    this.rotateStart.set(l.clientX, l.clientY);
  }
  handleMouseDownDolly(l) {
    this.dollyStart.set(l.clientX, l.clientY);
  }
  handleMouseDownPan(l) {
    this.panStart.set(l.clientX, l.clientY);
  }
  handleMouseMoveRotate(l) {
    this.rotateEnd.set(l.clientX, l.clientY), this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(this.rotateSpeed);
    const c = this.domElement;
    this.rotateLeft(2 * Math.PI * this.rotateDelta.x / c.clientHeight), this.rotateUp(2 * Math.PI * this.rotateDelta.y / c.clientHeight), this.rotateStart.copy(this.rotateEnd), this.renderMan.requestUpdate();
  }
  handleMouseMoveDolly(l) {
    this.dollyEnd.set(l.clientX, l.clientY), this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart), this.dollyDelta.y > 0 ? this.dollyOut(this.getZoomScale()) : this.dollyDelta.y < 0 && this.dollyIn(this.getZoomScale()), this.dollyStart.copy(this.dollyEnd), this.renderMan.requestUpdate();
  }
  handleMouseMovePan(l) {
    this.panEnd.set(l.clientX, l.clientY), this.panDelta.subVectors(this.panEnd, this.panStart).multiplyScalar(this.panSpeed), this.pan(this.panDelta.x, this.panDelta.y), this.panStart.copy(this.panEnd), this.renderMan.requestUpdate();
  }
  handleMouseUp() {
  }
  handleMouseWheel(l) {
    l.deltaY < 0 ? this.dollyIn(this.getZoomScale()) : l.deltaY > 0 && this.dollyOut(this.getZoomScale()), this.renderMan.requestUpdate();
  }
  handleTouchEnd() {
  }
  added() {
  }
  selected() {
    console.log("selected"), this._onMouseMove = this.onMouseMove2.bind(this), this._onMouseDown = this.onMouseDown.bind(this), this._onMouseUp = this.onMouseUp.bind(this), this._onPointerMove = this.onPointerMove.bind(this), this._onPointerUp = this.onPointerUp.bind(this), this._onPointerDown = this.onPointerDown.bind(this), this._onMouseWheel2 = this.onMouseWheel2.bind(this), this._onTouchStart = this.onTouchStart.bind(this), this._onTouchEnd = this.onTouchEnd.bind(this), this._onTouchMove = this.onTouchMove.bind(this), this.domElement.addEventListener("contextmenu", this.onContextMenu), this.domElement.ownerDocument.addEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.addEventListener("pointerup", this._onPointerUp), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("wheel", this._onMouseWheel2, { passive: !1 }), this.domElement.addEventListener("touchstart", this._onTouchStart, { passive: !1 }), this.domElement.addEventListener("touchend", this._onTouchEnd), this.domElement.addEventListener("touchmove", this._onTouchMove, { passive: !1 });
  }
  unselected() {
    this.domElement.removeEventListener("contextmenu", this.onContextMenu), this.domElement.ownerDocument.removeEventListener("pointermove", this._onPointerMove), this.domElement.ownerDocument.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("wheel", this._onMouseWheel2), this.domElement.removeEventListener("touchstart", this._onTouchStart), this.domElement.removeEventListener("touchend", this._onTouchEnd), this.domElement.removeEventListener("touchmove", this._onTouchMove);
  }
  updated(l) {
    if (!this.isEnabled)
      return;
    const c = new R(), t = new Ct().setFromUnitVectors(this.camera.up, new R(0, 1, 0)), d = t.clone().invert(), s = new R(), i = new Ct(), a = 2 * Math.PI, o = this.camera.position;
    c.copy(o).sub(this.target), c.applyQuaternion(t), this.spherical.setFromVector3(c), this.autoRotate && this.pointerState === -1 && this.rotateLeft(this.getAutoRotationAngle()), this.enableDamping ? (this.spherical.theta += this.sphericalDelta.theta * this.dampingFactor, this.spherical.phi += this.sphericalDelta.phi * this.dampingFactor) : (this.spherical.theta += this.sphericalDelta.theta, this.spherical.phi += this.sphericalDelta.phi);
    let b = this.minAzimuthAngle, m = this.maxAzimuthAngle;
    if (isFinite(b) && isFinite(m) && (b < -Math.PI ? b += a : b > Math.PI && (b -= a), m < -Math.PI ? m += a : m > Math.PI && (m -= a), b <= m ? this.spherical.theta = Math.max(b, Math.min(m, this.spherical.theta)) : this.spherical.theta = this.spherical.theta > (b + m) / 2 ? Math.max(b, this.spherical.theta) : Math.min(m, this.spherical.theta)), this.spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this.spherical.phi)), this.spherical.makeSafe(), this.spherical.radius *= this.scale, this.spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this.spherical.radius)), this.enableDamping ? this.target.addScaledVector(this.panOffset, this.dampingFactor) : this.target.add(this.panOffset), c.setFromSpherical(this.spherical), c.applyQuaternion(d), o.copy(this.target).add(c), this.camera.lookAt(this.target), this.enableDamping ? (this.sphericalDelta.theta *= 1 - this.dampingFactor, this.sphericalDelta.phi *= 1 - this.dampingFactor, this.panOffset.multiplyScalar(1 - this.dampingFactor)) : (this.sphericalDelta.set(0, 0, 0), this.panOffset.set(0, 0, 0)), this.scale = 1, this.zoomChanged || s.distanceToSquared(this.camera.position) > Rd || 8 * (1 - i.dot(this.camera.quaternion)) > Rd) {
      s.copy(this.camera.position), i.copy(this.camera.quaternion), this.zoomChanged = !1;
      return;
    }
    this.renderMan.navigationChanged();
  }
  getTargetClone() {
    return this.target.clone();
  }
  deleted() {
    this.unselected();
  }
}
Z(ta, "getName", () => "orbit");
const Xe = new Os(0, 0, 0, "YXZ");
new R();
const Id = Math.PI / 2;
class da extends Wt {
  constructor(l) {
    super(l, "flyExt.name", "mdi-airplane");
    Z(this, "minPolarAngle", 0);
    Z(this, "maxPolarAngle", Math.PI);
    Z(this, "pointerSpeed", 1);
    Z(this, "isLocked", !1);
    Z(this, "_onPointerlockError");
    Z(this, "_onPointerlockChange");
    Z(this, "_onMouseMove");
    Z(this, "_onMouseDown");
    Z(this, "_onMouseUp");
    Z(this, "_onKeyDown");
    Z(this, "_onKeyUp");
    Z(this, "moveDown", !1);
    Z(this, "moveBackward", !1);
    Z(this, "moveUp", !1);
    Z(this, "moveLeft", !1);
    Z(this, "moveRight", !1);
    Z(this, "moveForward", !1);
    Z(this, "movementSpeed", 20);
  }
  onSelected() {
    this.renderMan.requestUpdate();
  }
  selected() {
    this._onMouseMove = this.onMouseMove2.bind(this), this._onMouseDown = this.onMouseDown.bind(this), this._onMouseUp = this.onMouseUp.bind(this), this._onPointerlockChange = this.onPointerLockChange.bind(this), this._onPointerlockError = this.onPointerLockError.bind(this), this._onKeyDown = this.onKeyDown.bind(this), this._onKeyUp = this.onKeyUp.bind(this), this.domElement.ownerDocument.addEventListener("mousemove", this._onMouseMove), this.domElement.addEventListener("pointerdown", this._onMouseDown), this.domElement.addEventListener("pointerup", this._onMouseUp), window.addEventListener("keydown", this._onKeyDown), window.addEventListener("keyup", this._onKeyUp), this.domElement.ownerDocument.addEventListener("pointerlockchange", this._onPointerlockChange), this.domElement.ownerDocument.addEventListener("pointerlockerror", this._onPointerlockError);
  }
  unselected() {
    this.domElement.ownerDocument.removeEventListener("mousemove", this._onMouseMove), this.domElement.ownerDocument.removeEventListener("pointerlockchange", this._onPointerlockChange), this.domElement.ownerDocument.removeEventListener("pointerlockerror", this._onPointerlockError), this.domElement.removeEventListener("pointerdown", this._onMouseDown), this.domElement.removeEventListener("pointerup", this._onMouseUp), window.removeEventListener("keydown", this._onKeyDown), window.removeEventListener("keyup", this._onKeyUp);
  }
  deleted() {
    this.unselected();
  }
  lock() {
    this.domElement.requestPointerLock(), this.renderMan.setContinuesUpdate(!0);
  }
  unlock() {
    this.domElement.ownerDocument.exitPointerLock(), this.renderMan.setContinuesUpdate(!1);
  }
  onMouseDown(l) {
    switch (this.domElement instanceof Document || this.domElement.focus(), l.button) {
      case 0:
        break;
      case 2:
        this.lock(), this.renderMan.navigationStarted();
        break;
    }
  }
  onMouseUp(l) {
    switch (l.button) {
      case 0:
        break;
      case 2:
        this.unlock(), this.renderMan.navigationEnded();
        break;
    }
  }
  onMouseMove2(l) {
    if (this.isLocked === !1)
      return;
    const c = l.movementX || 0, t = l.movementY || 0;
    Xe.setFromQuaternion(this.camera.quaternion), Xe.y -= c * 2e-3 * this.pointerSpeed, Xe.x -= t * 2e-3 * this.pointerSpeed, Xe.x = Math.max(Id - this.maxPolarAngle, Math.min(Id - this.minPolarAngle, Xe.x)), this.camera.quaternion.setFromEuler(Xe);
  }
  onKeyDown(l) {
    if (!!this.isLocked)
      switch (l.code) {
        case "ArrowUp":
        case "KeyW":
          this.moveForward = !0;
          break;
        case "ArrowLeft":
        case "KeyA":
          this.moveLeft = !0;
          break;
        case "ArrowDown":
        case "KeyS":
          this.moveBackward = !0;
          break;
        case "ArrowRight":
        case "KeyD":
          this.moveRight = !0;
          break;
        case "KeyR":
          this.moveUp = !0;
          break;
        case "KeyF":
          this.moveDown = !0;
          break;
      }
  }
  onKeyUp(l) {
    switch (l.code) {
      case "ArrowUp":
      case "KeyW":
        this.moveForward = !1;
        break;
      case "ArrowLeft":
      case "KeyA":
        this.moveLeft = !1;
        break;
      case "ArrowDown":
      case "KeyS":
        this.moveBackward = !1;
        break;
      case "ArrowRight":
      case "KeyD":
        this.moveRight = !1;
        break;
      case "KeyR":
        this.moveUp = !1;
        break;
      case "KeyF":
        this.moveDown = !1;
        break;
    }
  }
  onPointerLockChange() {
    this.isLocked = this.domElement.ownerDocument.pointerLockElement === this.domElement;
  }
  onPointerLockError() {
    console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
  }
  updated(l) {
    const c = l * this.movementSpeed;
    this.moveForward && this.camera.translateZ(-c), this.moveBackward && this.camera.translateZ(c), this.moveLeft && this.camera.translateX(-c * 0.5), this.moveRight && this.camera.translateX(c * 0.5), this.moveUp && this.camera.translateY(c), this.moveDown && this.camera.translateY(-c);
  }
  getTargetClone() {
    const l = new R();
    return this.camera.getWorldDirection(l), this.camera.position.clone().add(l.setScalar(20));
  }
  added() {
  }
}
Z(da, "getName", () => "fly");
const Cc = class extends Ol {
  constructor(l) {
    super(l);
    Z(this, "state", { isShow: !0 });
    Z(this, "content");
    Z(this, "isVisible", !1);
    Z(this, "mouse", new T());
    Z(this, "ownerExt");
    Z(this, "renderMan");
    this.renderMan = this.getRenderManager(), this.ui = Cc.getTooltipName();
  }
  static getTooltipName() {
    return `t-${Cc.getName()}-tooltip`;
  }
  added() {
    this.restoreState();
  }
  deleted() {
  }
  onMouseMove(l) {
    const c = document.getElementById("tgv-tooltip-ref");
    if (!c)
      return;
    let t = this.renderMan.mousePointer.x + 10, d = this.renderMan.mousePointer.y - c.clientHeight - 10;
    t + c.clientWidth + 10 > this.renderMan.viewerElement.offsetWidth && (t = this.renderMan.viewerElement.offsetWidth - c.clientWidth - 10), this.renderMan.mousePointer.y - c.clientHeight - 10 < 0 && (d = 0), this.mouse.set(t, d);
  }
};
let Ec = Cc;
Z(Ec, "getName", () => "tooltip");
const Ge = new Rl(), wl = new pt(), Ne = new T(), gd = new R(), ic = new R(), Ac = new R(), Yd = new B();
class sa extends _s {
  constructor(e, l, c) {
    super(), c.style.touchAction = "none";
    let t = null, d = null;
    const s = [], i = this;
    function a() {
      c.addEventListener("pointermove", G), c.addEventListener("pointerdown", h), c.addEventListener("pointerup", u), c.addEventListener("pointerleave", u);
    }
    function o() {
      c.removeEventListener("pointermove", G), c.removeEventListener("pointerdown", h), c.removeEventListener("pointerup", u), c.removeEventListener("pointerleave", u), c.style.cursor = "";
    }
    function b() {
      o();
    }
    function m() {
      return e;
    }
    function X() {
      return wl;
    }
    function G(p) {
      if (i.enabled !== !1) {
        if (y(p), wl.setFromCamera(Ne, l), t) {
          wl.ray.intersectPlane(Ge, ic) && t.position.copy(ic.sub(gd).applyMatrix4(Yd)), i.dispatchEvent({ type: "drag", object: t });
          return;
        }
        if (p.pointerType === "mouse" || p.pointerType === "pen")
          if (s.length = 0, wl.setFromCamera(Ne, l), wl.intersectObjects(e, !0, s), s.length > 0) {
            const W = s[0].object;
            Ge.setFromNormalAndCoplanarPoint(l.getWorldDirection(Ge.normal), Ac.setFromMatrixPosition(W.matrixWorld)), d !== W && d !== null && (i.dispatchEvent({ type: "hoveroff", object: d }), c.style.cursor = "auto", d = null), d !== W && (i.dispatchEvent({ type: "hoveron", object: W }), c.style.cursor = "pointer", d = W);
          } else
            d !== null && (i.dispatchEvent({ type: "hoveroff", object: d }), c.style.cursor = "auto", d = null);
      }
    }
    function h(p) {
      i.enabled !== !1 && (y(p), s.length = 0, wl.setFromCamera(Ne, l), wl.intersectObjects(e, !0, s), s.length > 0 && (t = i.transformGroup === !0 ? e[0] : s[0].object, Ge.setFromNormalAndCoplanarPoint(l.getWorldDirection(Ge.normal), Ac.setFromMatrixPosition(t.matrixWorld)), wl.ray.intersectPlane(Ge, ic) && (Yd.copy(t.parent.matrixWorld).invert(), gd.copy(ic).sub(Ac.setFromMatrixPosition(t.matrixWorld))), c.style.cursor = "move", i.dispatchEvent({ type: "dragstart", object: t })));
    }
    function u() {
      i.enabled !== !1 && (t && (i.dispatchEvent({ type: "dragend", object: t }), t = null), c.style.cursor = d ? "pointer" : "auto");
    }
    function y(p) {
      const W = c.getBoundingClientRect();
      Ne.x = (p.clientX - W.left) / W.width * 2 - 1, Ne.y = -(p.clientY - W.top) / W.height * 2 + 1;
    }
    a(), this.enabled = !0, this.transformGroup = !1, this.activate = a, this.deactivate = o, this.dispose = b, this.getObjects = m, this.getRaycaster = X;
  }
}
const ia = `uniform float offset;

void main() {
	float distance = -(modelViewMatrix * vec4(position, 1.0)).z;
	vec4 pos = modelViewMatrix * vec4( position + normal * (-offset * distance/1000.0), 1.0 );
	gl_Position = projectionMatrix * pos;
    
}`, na = `void main(){
gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.8 );
}`;
var ss = /* @__PURE__ */ ((n) => (n.X = "crop-x", n.NX = "crop-nx", n.Y = "crop-y", n.NY = "crop-ny", n.Z = "crop-z", n.NZ = "crop-nz", n))(ss || {});
let Cd = [], Sl;
const nc = new Xl();
let z;
class aa extends Ol {
  constructor(l) {
    super(l);
    Z(this, "isCropOn", !1);
    Z(this, "gizmos", {});
    Z(this, "planes", /* @__PURE__ */ new Map());
    Z(this, "renderer");
    Z(this, "camera");
    Z(this, "gizmoMat", new il({
      uniforms: {
        offset: { value: 1 }
      },
      vertexShader: ia,
      fragmentShader: na,
      transparent: !0
    }));
    Z(this, "dControl");
    Z(this, "startPosition");
    Z(this, "isNoData", !1);
  }
  added() {
    var c;
    const l = this.getRenderManager();
    this.onSceneLoaded = this.onSceneLoaded.bind(this), (c = l == null ? void 0 : l.sceneManager) == null || c.addEventListener(el.AllLoaded, this.onSceneLoaded), this.onMouseWheel = this.onMouseWheel.bind(this), l == null || l.addEventListener(he.Wheel, this.onMouseWheel), this.onMouseMove = this.onMouseMove.bind(this), l == null || l.addEventListener(he.Move, this.onMouseMove), this.renderer = l.renderer, this.camera = l.camera;
  }
  deleted() {
    var c;
    const l = this.getRenderManager();
    (c = l == null ? void 0 : l.sceneManager) == null || c.removeEventListener(el.AllLoaded, this.onSceneLoaded), l == null || l.removeEventListener(he.Wheel, this.onMouseWheel), l == null || l.removeEventListener(he.Move, this.onMouseMove);
  }
  onSceneLoaded() {
    const l = this.getRenderManager();
    l.sceneManager.isNoData || (z = l.sceneManager.sceneBox.clone(), z.min = z.min.add(new R(-0.5, -0.5, -0.5)), z.max = z.max.add(new R(0.5, 0.5, 0.5)));
  }
  init() {
    const l = this.getRenderManager();
    if (this.isNoData)
      return;
    z.getSize(new R());
    const c = z.getCenter(new R()), t = new qs(1, 1, 1), d = new $s({
      color: 1118481,
      opacity: 0.3,
      transparent: !0,
      dashSize: 0.1,
      gapSize: 0.1,
      clippingPlanes: Cd
    }), s = new li(t);
    Sl = new al(s, d), Sl.computeLineDistances(), l.helpersScene.add(Sl), l.helpersScene.add(nc), this.addGizmo("crop-x", new R(z.max.x, c.y, c.z)), this.addGizmo("crop-nx", new R(z.min.x, c.y, c.z)), this.addGizmo("crop-y", new R(c.x, z.max.y, c.z)), this.addGizmo("crop-ny", new R(c.x, z.min.y, c.z)), this.addGizmo("crop-z", new R(c.x, c.y, z.max.z)), this.addGizmo("crop-nz", new R(c.x, c.y, z.min.z)), this.dControl = new sa(Object.values(this.gizmos), this.camera, this.renderer.domElement), this.dControl.addEventListener("dragstart", (i) => {
      l.blockControls(), l.setSelectionLock(!0), this.startPosition = i.object.position.clone();
    }), this.dControl.addEventListener("dragend", () => {
      l.unblockControls(), l.setSelectionLock(!1), this.hideFacesOutside();
    }), this.dControl.addEventListener("drag", (i) => {
      switch (i.object.name) {
        case "crop-x":
          i.object.position.z = this.startPosition.z, i.object.position.y = this.startPosition.y, z.max.x = i.object.position.x;
          break;
        case "crop-nx":
          i.object.position.z = this.startPosition.z, i.object.position.y = this.startPosition.y, z.min.x = i.object.position.x;
          break;
        case "crop-y":
          i.object.position.z = this.startPosition.z, i.object.position.x = this.startPosition.x, z.max.y = i.object.position.y;
          break;
        case "crop-ny":
          i.object.position.z = this.startPosition.z, i.object.position.x = this.startPosition.x, z.min.y = i.object.position.y;
          break;
        case "crop-z":
          i.object.position.x = this.startPosition.x, i.object.position.y = this.startPosition.y, z.max.z = i.object.position.z;
          break;
        case "crop-nz":
          i.object.position.x = this.startPosition.x, i.object.position.y = this.startPosition.y, z.min.z = i.object.position.z;
          break;
      }
      this.updateCropBox(), this.setupGizmos();
    }), this.updateCropBox(), this.setupGizmos();
  }
  setupGizmos(l = !1) {
    const c = z.getCenter(new R()), t = z.getSize(new R());
    for (let s in this.gizmos) {
      const i = this.gizmos[s];
      (t.x + t.y + t.z) / 3;
      const a = i.position.distanceTo(this.camera.position);
      switch (i.scale.set(a * 0.01, a * 0.01, a * 0.01), s) {
        case "crop-x":
          i.position.y = c.y, i.position.z = c.z, this.planes.get(s).constant = z.max.x, l && (i.position.x = z.max.x);
          break;
        case "crop-nx":
          i.position.y = c.y, i.position.z = c.z, this.planes.get(s).constant = -z.min.x, l && (i.position.x = z.min.x);
          break;
        case "crop-y":
          i.position.x = c.x, i.position.z = c.z, this.planes.get(s).constant = z.max.y, l && (i.position.y = z.max.y);
          break;
        case "crop-ny":
          i.position.x = c.x, i.position.z = c.z, this.planes.get(s).constant = -z.min.y, l && (i.position.y = z.min.y);
          break;
        case "crop-z":
          i.position.y = c.y, i.position.x = c.x, this.planes.get(s).constant = z.max.z, l && (i.position.z = z.max.z);
          break;
        case "crop-nz":
          i.position.y = c.y, i.position.x = c.x, this.planes.get(s).constant = -z.min.z, l && (i.position.z = z.min.z);
          break;
      }
    }
    this.getRenderManager().requestUpdate();
  }
  addGizmo(l, c) {
    const t = new wd(0.7, 6, 6), d = new w(t, this.gizmoMat);
    switch (d.position.copy(c), d.name = l, nc.add(d), this.gizmos[l] = d, l) {
      case "crop-x":
        this.planes.set(l, new Rl(new R(-1, 0, 0), z.max.x));
        break;
      case "crop-nx":
        this.planes.set(l, new Rl(new R(1, 0, 0), -z.min.x));
        break;
      case "crop-y":
        this.planes.set(l, new Rl(new R(0, -1, 0), z.max.y));
        break;
      case "crop-ny":
        this.planes.set(l, new Rl(new R(0, 1, 0), -z.min.y));
        break;
      case "crop-z":
        this.planes.set(l, new Rl(new R(0, 0, -1), z.max.z));
        break;
      case "crop-nz":
        this.planes.set(l, new Rl(new R(0, 0, 1), -z.min.z));
        break;
    }
    Cd = Object.values(this.planes);
  }
  onMouseMove() {
    z && this.isCropOn && this.setupGizmos(!1);
  }
  hideFacesOutside() {
    if (!this.isCropOn)
      return;
    this.getRenderManager().sceneManager.tools.optimizeAllElementsVisibility();
  }
  onMouseWheel(l) {
    this.isCropOn && this.setupGizmos(!1);
  }
  updateCropBox() {
    Sl == null && this.init();
    const l = z.getSize(new R()), c = z.getCenter(new R());
    Sl.scale.set(l.x, l.y, l.z), Sl.position.set(c.x, c.y, c.z);
  }
  setCropToSelected() {
    const l = this.getRenderManager();
    let c;
    const t = [];
    l.sceneManager.selElNums.length == 0 || l.sceneManager.selElNums.length == 1 && l.sceneManager.selElNums[0] == -1 ? z = l.sceneManager.sceneBox.clone() : (l.sceneManager.traverseElements2(
      l.sceneManager.selElNums,
      (d, s, i) => {
        const a = new R(
          c[i * 3],
          c[i * 3 + 1],
          c[i * 3 + 2]
        );
        t.push(a);
      },
      (d) => {
      },
      (d, s) => {
        c = d.getAttribute("position").array;
      },
      (d, s, i, a) => {
        const o = d.geometry.boundingBox.clone().applyMatrix4(a);
        t.push(o.min), t.push(o.max);
      }
    ), z = z.setFromPoints(t)), z = z.expandByScalar(0.5), l.zoomCameraToSelection(), this.updateCropBox(), this.setupGizmos(!0), this.setCrop(!0), l.requestUpdate();
  }
  setCrop(l) {
    const c = this.getRenderManager();
    this.isCropOn = l, Sl == null && this.init(), this.isCropOn ? (Sl.visible = !0, nc.visible = !0, c.sceneManager.clippingTools.setPlanes(this.planes), c.updateClippingPlanes(c.sceneManager.clippingTools.getPlanes())) : (Sl.visible = !1, nc.visible = !1, c.sceneManager.clippingTools.deletePlanes(Object.values(ss)), c.updateClippingPlanes(c.sceneManager.clippingTools.getPlanes())), this.hideFacesOutside();
  }
}
Z(aa, "getName", () => "crop");
class oa extends Ol {
  constructor(l) {
    super(l);
    Z(this, "isNoData");
  }
  added() {
  }
  deleted() {
  }
  onSceneLoaded() {
    this.getRenderManager().sceneManager.isNoData && (this.isNoData = !0);
  }
  hideSelected() {
    const l = this.getRenderManager();
    l.sceneManager.tools.hideElements(l.sceneManager.selElNums), l.extMan.getExtensionByName("crop");
  }
  showAll() {
    const l = this.getRenderManager();
    l.sceneManager.tools.showAllElements(), l.extMan.getExtensionByName("crop");
  }
  isolateSelected() {
    const l = this.getRenderManager();
    l.sceneManager.tools.isolateElements(l.sceneManager.selElNums), l.extMan.getExtensionByName("crop");
  }
}
Z(oa, "getName", () => "visibility");
const Sd = new U(), ac = new R();
class is extends ei {
  constructor() {
    super(), this.isLineSegmentsGeometry = !0, this.type = "LineSegmentsGeometry";
    const e = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0], l = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2], c = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];
    this.setIndex(c), this.setAttribute("position", new se(e, 3)), this.setAttribute("uv", new se(l, 2));
  }
  applyMatrix4(e) {
    const l = this.attributes.instanceStart, c = this.attributes.instanceEnd;
    return l !== void 0 && (l.applyMatrix4(e), c.applyMatrix4(e), l.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  setPositions(e) {
    let l;
    e instanceof Float32Array ? l = e : Array.isArray(e) && (l = new Float32Array(e));
    const c = new et(l, 6, 1);
    return this.setAttribute("instanceStart", new le(c, 3, 0)), this.setAttribute("instanceEnd", new le(c, 3, 3)), this.computeBoundingBox(), this.computeBoundingSphere(), this;
  }
  setColors(e) {
    let l;
    e instanceof Float32Array ? l = e : Array.isArray(e) && (l = new Float32Array(e));
    const c = new et(l, 6, 1);
    return this.setAttribute("instanceColorStart", new le(c, 3, 0)), this.setAttribute("instanceColorEnd", new le(c, 3, 3)), this;
  }
  fromWireframeGeometry(e) {
    return this.setPositions(e.attributes.position.array), this;
  }
  fromEdgesGeometry(e) {
    return this.setPositions(e.attributes.position.array), this;
  }
  fromMesh(e) {
    return this.fromWireframeGeometry(new ci(e.geometry)), this;
  }
  fromLineSegments(e) {
    const l = e.geometry;
    return this.setPositions(l.attributes.position.array), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new U());
    const e = this.attributes.instanceStart, l = this.attributes.instanceEnd;
    e !== void 0 && l !== void 0 && (this.boundingBox.setFromBufferAttribute(e), Sd.setFromBufferAttribute(l), this.boundingBox.union(Sd));
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Jl()), this.boundingBox === null && this.computeBoundingBox();
    const e = this.attributes.instanceStart, l = this.attributes.instanceEnd;
    if (e !== void 0 && l !== void 0) {
      const c = this.boundingSphere.center;
      this.boundingBox.getCenter(c);
      let t = 0;
      for (let d = 0, s = e.count; d < s; d++)
        ac.fromBufferAttribute(e, d), t = Math.max(t, c.distanceToSquared(ac)), ac.fromBufferAttribute(l, d), t = Math.max(t, c.distanceToSquared(ac));
      this.boundingSphere.radius = Math.sqrt(t), isNaN(this.boundingSphere.radius) && console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.", this);
    }
  }
  toJSON() {
  }
  applyMatrix(e) {
    return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."), this.applyMatrix4(e);
  }
}
mc.line = {
  worldUnits: { value: 1 },
  linewidth: { value: 1 },
  resolution: { value: new T(1, 1) },
  dashOffset: { value: 0 },
  dashScale: { value: 1 },
  dashSize: { value: 1 },
  gapSize: { value: 1 }
};
ce.line = {
  uniforms: Zt.merge([
    mc.common,
    mc.fog,
    mc.line
  ]),
  vertexShader: `
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				// get the offset direction as perpendicular to the view vector
				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 offset;
				if ( position.y < 0.5 ) {

					offset = normalize( cross( start.xyz, worldDir ) );

				} else {

					offset = normalize( cross( end.xyz, worldDir ) );

				}

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// extend the line bounds to encompass  endcaps
					start.xyz += - worldDir * linewidth * 0.5;
					end.xyz += worldDir * linewidth * 0.5;

					// shift the position of the quad so it hugs the forward edge of the line
					offset.xy -= dir * forwardOffset;
					offset.z += 0.5;

				#endif

				// endcaps
				if ( position.y > 1.0 || position.y < 0.0 ) {

					offset.xy += dir * 2.0 * forwardOffset;

				}

				// adjust for linewidth
				offset *= linewidth * 0.5;

				// set the world position
				worldPos = ( position.y < 0.5 ) ? start : end;
				worldPos.xyz += offset;

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,
  fragmentShader: `
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`
};
class Ie extends il {
  constructor(e) {
    super({
      type: "LineMaterial",
      uniforms: Zt.clone(ce.line.uniforms),
      vertexShader: ce.line.vertexShader,
      fragmentShader: ce.line.fragmentShader,
      clipping: !0
    }), this.isLineMaterial = !0, Object.defineProperties(this, {
      color: {
        enumerable: !0,
        get: function() {
          return this.uniforms.diffuse.value;
        },
        set: function(l) {
          this.uniforms.diffuse.value = l;
        }
      },
      worldUnits: {
        enumerable: !0,
        get: function() {
          return "WORLD_UNITS" in this.defines;
        },
        set: function(l) {
          l === !0 ? this.defines.WORLD_UNITS = "" : delete this.defines.WORLD_UNITS;
        }
      },
      linewidth: {
        enumerable: !0,
        get: function() {
          return this.uniforms.linewidth.value;
        },
        set: function(l) {
          this.uniforms.linewidth.value = l;
        }
      },
      dashed: {
        enumerable: !0,
        get: function() {
          return Boolean("USE_DASH" in this.defines);
        },
        set(l) {
          Boolean(l) !== Boolean("USE_DASH" in this.defines) && (this.needsUpdate = !0), l === !0 ? this.defines.USE_DASH = "" : delete this.defines.USE_DASH;
        }
      },
      dashScale: {
        enumerable: !0,
        get: function() {
          return this.uniforms.dashScale.value;
        },
        set: function(l) {
          this.uniforms.dashScale.value = l;
        }
      },
      dashSize: {
        enumerable: !0,
        get: function() {
          return this.uniforms.dashSize.value;
        },
        set: function(l) {
          this.uniforms.dashSize.value = l;
        }
      },
      dashOffset: {
        enumerable: !0,
        get: function() {
          return this.uniforms.dashOffset.value;
        },
        set: function(l) {
          this.uniforms.dashOffset.value = l;
        }
      },
      gapSize: {
        enumerable: !0,
        get: function() {
          return this.uniforms.gapSize.value;
        },
        set: function(l) {
          this.uniforms.gapSize.value = l;
        }
      },
      opacity: {
        enumerable: !0,
        get: function() {
          return this.uniforms.opacity.value;
        },
        set: function(l) {
          this.uniforms.opacity.value = l;
        }
      },
      resolution: {
        enumerable: !0,
        get: function() {
          return this.uniforms.resolution.value;
        },
        set: function(l) {
          this.uniforms.resolution.value.copy(l);
        }
      },
      alphaToCoverage: {
        enumerable: !0,
        get: function() {
          return Boolean("USE_ALPHA_TO_COVERAGE" in this.defines);
        },
        set: function(l) {
          Boolean(l) !== Boolean("USE_ALPHA_TO_COVERAGE" in this.defines) && (this.needsUpdate = !0), l === !0 ? (this.defines.USE_ALPHA_TO_COVERAGE = "", this.extensions.derivatives = !0) : (delete this.defines.USE_ALPHA_TO_COVERAGE, this.extensions.derivatives = !1);
        }
      }
    }), this.setValues(e);
  }
}
const Kd = new R(), xd = new R(), _ = new re(), q = new re(), rl = new re(), Dc = new R(), Oc = new B(), ll = new hl(), Hd = new R(), oc = new U(), bc = new Jl(), Ll = new re();
let gl, ot, ns, te;
function zd(n, e, l) {
  return Ll.set(0, 0, -e, 1).applyMatrix4(n.projectionMatrix), Ll.multiplyScalar(1 / Ll.w), Ll.x = te / l.width, Ll.y = te / l.height, Ll.applyMatrix4(n.projectionMatrixInverse), Ll.multiplyScalar(1 / Ll.w), Math.abs(Math.max(Ll.x, Ll.y));
}
function ba(n, e) {
  for (let l = 0, c = ot.count; l < c; l++) {
    ll.start.fromBufferAttribute(ot, l), ll.end.fromBufferAttribute(ns, l);
    const t = new R(), d = new R();
    gl.distanceSqToSegment(ll.start, ll.end, d, t), d.distanceTo(t) < te * 0.5 && e.push({
      point: d,
      pointOnLine: t,
      distance: gl.origin.distanceTo(d),
      object: n,
      face: null,
      faceIndex: l,
      uv: null,
      uv2: null
    });
  }
}
function ma(n, e, l) {
  const c = e.projectionMatrix, d = n.material.resolution, s = n.matrixWorld, i = n.geometry, a = i.attributes.instanceStart, o = i.attributes.instanceEnd, b = -e.near;
  gl.at(1, rl), rl.w = 1, rl.applyMatrix4(e.matrixWorldInverse), rl.applyMatrix4(c), rl.multiplyScalar(1 / rl.w), rl.x *= d.x / 2, rl.y *= d.y / 2, rl.z = 0, Dc.copy(rl), Oc.multiplyMatrices(e.matrixWorldInverse, s);
  for (let m = 0, X = a.count; m < X; m++) {
    if (_.fromBufferAttribute(a, m), q.fromBufferAttribute(o, m), _.w = 1, q.w = 1, _.applyMatrix4(Oc), q.applyMatrix4(Oc), _.z > b && q.z > b)
      continue;
    if (_.z > b) {
      const W = _.z - q.z, V = (_.z - b) / W;
      _.lerp(q, V);
    } else if (q.z > b) {
      const W = q.z - _.z, V = (q.z - b) / W;
      q.lerp(_, V);
    }
    _.applyMatrix4(c), q.applyMatrix4(c), _.multiplyScalar(1 / _.w), q.multiplyScalar(1 / q.w), _.x *= d.x / 2, _.y *= d.y / 2, q.x *= d.x / 2, q.y *= d.y / 2, ll.start.copy(_), ll.start.z = 0, ll.end.copy(q), ll.end.z = 0;
    const h = ll.closestPointToPointParameter(Dc, !0);
    ll.at(h, Hd);
    const u = Gt.lerp(_.z, q.z, h), y = u >= -1 && u <= 1, p = Dc.distanceTo(Hd) < te * 0.5;
    if (y && p) {
      ll.start.fromBufferAttribute(a, m), ll.end.fromBufferAttribute(o, m), ll.start.applyMatrix4(s), ll.end.applyMatrix4(s);
      const W = new R(), V = new R();
      gl.distanceSqToSegment(ll.start, ll.end, V, W), l.push({
        point: V,
        pointOnLine: W,
        distance: gl.origin.distanceTo(V),
        object: n,
        face: null,
        faceIndex: m,
        uv: null,
        uv2: null
      });
    }
  }
}
class Za extends w {
  constructor(e = new is(), l = new Ie({ color: Math.random() * 16777215 })) {
    super(e, l), this.isLineSegments2 = !0, this.type = "LineSegments2";
  }
  computeLineDistances() {
    const e = this.geometry, l = e.attributes.instanceStart, c = e.attributes.instanceEnd, t = new Float32Array(2 * l.count);
    for (let s = 0, i = 0, a = l.count; s < a; s++, i += 2)
      Kd.fromBufferAttribute(l, s), xd.fromBufferAttribute(c, s), t[i] = i === 0 ? 0 : t[i - 1], t[i + 1] = t[i] + Kd.distanceTo(xd);
    const d = new et(t, 2, 1);
    return e.setAttribute("instanceDistanceStart", new le(d, 1, 0)), e.setAttribute("instanceDistanceEnd", new le(d, 1, 1)), this;
  }
  raycast(e, l) {
    const c = this.material.worldUnits, t = e.camera;
    t === null && !c && console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');
    const d = e.params.Line2 !== void 0 && e.params.Line2.threshold || 0;
    gl = e.ray;
    const s = this.matrixWorld, i = this.geometry, a = this.material;
    te = a.linewidth + d, ot = i.attributes.instanceStart, ns = i.attributes.instanceEnd, i.boundingSphere === null && i.computeBoundingSphere(), bc.copy(i.boundingSphere).applyMatrix4(s);
    let o;
    if (c)
      o = te * 0.5;
    else {
      const m = Math.max(t.near, bc.distanceToPoint(gl.origin));
      o = zd(t, m, a.resolution);
    }
    if (bc.radius += o, gl.intersectsSphere(bc) === !1)
      return;
    i.boundingBox === null && i.computeBoundingBox(), oc.copy(i.boundingBox).applyMatrix4(s);
    let b;
    if (c)
      b = te * 0.5;
    else {
      const m = Math.max(t.near, oc.distanceToPoint(gl.origin));
      b = zd(t, m, a.resolution);
    }
    oc.expandByScalar(b), gl.intersectsBox(oc) !== !1 && (c ? ba(this, l) : ma(this, t, l));
  }
}
class jl extends is {
  constructor() {
    super(), this.isLineGeometry = !0, this.type = "LineGeometry";
  }
  setPositions(e) {
    const l = e.length - 3, c = new Float32Array(2 * l);
    for (let t = 0; t < l; t += 3)
      c[2 * t] = e[t], c[2 * t + 1] = e[t + 1], c[2 * t + 2] = e[t + 2], c[2 * t + 3] = e[t + 3], c[2 * t + 4] = e[t + 4], c[2 * t + 5] = e[t + 5];
    return super.setPositions(c), this;
  }
  setColors(e) {
    const l = e.length - 3, c = new Float32Array(2 * l);
    for (let t = 0; t < l; t += 3)
      c[2 * t] = e[t], c[2 * t + 1] = e[t + 1], c[2 * t + 2] = e[t + 2], c[2 * t + 3] = e[t + 3], c[2 * t + 4] = e[t + 4], c[2 * t + 5] = e[t + 5];
    return super.setColors(c), this;
  }
  fromLine(e) {
    const l = e.geometry;
    return this.setPositions(l.attributes.position.array), this;
  }
}
class ue extends Za {
  constructor(e = new jl(), l = new Ie({ color: Math.random() * 16777215 })) {
    super(e, l), this.isLine2 = !0, this.type = "Line2";
  }
}
const Xa = new N.MeshBasicMaterial({ color: 7356817 }), Ga = new N.MeshBasicMaterial({ color: 38383 }), ua = new Ie({ linewidth: 3e-3, color: 2490623 }), Nd = new Ie({ linewidth: 18e-4, color: 6045951 }), ha = new Ie({ linewidth: 3e-3, color: 42495 }), Jd = new Ie({ linewidth: 18e-4, color: 3586303 });
class pa {
  constructor(e) {
    Z(this, "labelX", 0);
    Z(this, "labelY", 0);
    Z(this, "labelGipText", 0);
    Z(this, "labelKvText", 0);
    Z(this, "labelKgText", 0);
    Z(this, "labelGipProjText", 0);
    Z(this, "labelKvProjText", 0);
    Z(this, "labelKgProjText", 0);
    Z(this, "startNormal", new R());
    Z(this, "endNormal", new R());
    Z(this, "scene");
    Z(this, "group", new Xl());
    Z(this, "startGizmo");
    Z(this, "endGizmo");
    Z(this, "endProjGizmo");
    Z(this, "mode", 0);
    Z(this, "lineGip", new ue(new jl(), ua));
    Z(this, "lineGipProj", new ue(new jl(), ha));
    Z(this, "lineKv", new ue(new jl(), Nd));
    Z(this, "lineKvProj", new ue(new jl(), Jd));
    Z(this, "lineKg", new ue(new jl(), Nd));
    Z(this, "lineKgProj", new ue(new jl(), Jd));
    this.scene = e, this.startGizmo = this.addGizmo(), this.endGizmo = this.addGizmo(), this.endProjGizmo = this.addGizmo(Ga), this.group.add(this.lineGip), this.group.add(this.lineKv), this.group.add(this.lineKg), this.group.add(this.lineGipProj), this.group.add(this.lineKvProj), this.group.add(this.lineKgProj), this.group.add(this.startGizmo), this.group.add(this.endGizmo), this.group.add(this.endProjGizmo), e.add(this.group);
  }
  updateLabel(e, l) {
    if (this.mode != 2)
      return;
    const c = this.startGizmo.position, t = this.endGizmo.position, s = c.clone().add(t).multiplyScalar(0.5).project(l);
    this.labelX = e.offsetWidth * (s.x + 1) / 2 + e.offsetLeft, this.labelY = -e.offsetHeight * (s.y - 1) / 2 + e.offsetTop;
  }
  updateSize(e) {
    var l = this.startGizmo.position.distanceTo(e);
    this.startGizmo.scale.set(l * 0.01, l * 0.01, l * 0.01);
    var c = this.endGizmo.position.distanceTo(e);
    this.endGizmo.scale.set(c * 0.01, c * 0.01, c * 0.01);
    var t = this.endProjGizmo.position.distanceTo(e);
    this.endProjGizmo.scale.set(t * 0.01, t * 0.01, t * 0.01);
  }
  reset() {
    this.mode = 0, this.startGizmo.visible = !1, this.endGizmo.visible = !1, this.endProjGizmo.visible = !1, this.lineGip.visible = !1, this.lineKv.visible = !1, this.lineKg.visible = !1, this.lineGipProj.visible = !1, this.lineKvProj.visible = !1, this.lineKgProj.visible = !1;
  }
  setPoint(e, l, c = !1) {
    if (this.mode == 0 || this.mode == 2)
      this.endGizmo.visible = !1, this.endProjGizmo.visible = !1, this.startNormal.copy(l), this.lineGip.visible = !1, this.lineKv.visible = !1, this.lineKg.visible = !1, this.lineGipProj.visible = !1, this.lineKvProj.visible = !1, this.lineKgProj.visible = !1, this.startGizmo.position.copy(e), this.startGizmo.visible = !0, this.mode = 1;
    else if (this.mode == 1) {
      this.endNormal.copy(l), this.endGizmo.position.copy(e);
      const s = this.startGizmo.position.clone(), i = this.endGizmo.position.clone();
      var t = new Rl(this.endNormal);
      const a = e.clone().add(s.clone().negate());
      t = t.translate(a);
      var d = new R();
      t.projectPoint(this.endNormal, d), d.add(s), this.endProjGizmo.position.copy(d), this.updateLine(this.lineGip, s, i), this.updateLine(this.lineKg, s, new R(i.x, s.y, i.z)), this.updateLine(this.lineKv, i, new R(i.x, s.y, i.z)), this.updateLine(this.lineGipProj, s, d), this.updateLine(this.lineKgProj, s, new R(d.x, s.y, d.z)), this.updateLine(this.lineKvProj, d, new R(d.x, s.y, d.z)), this.labelGipText = Math.round(s.distanceTo(i) * 1e3), this.labelKvText = Math.round(i.distanceTo(new R(i.x, s.y, i.z)) * 1e3), this.labelKgText = Math.round(s.distanceTo(new R(i.x, s.y, i.z)) * 1e3), this.labelGipProjText = Math.round(s.distanceTo(d) * 1e3), this.labelKvProjText = Math.round(d.distanceTo(new R(d.x, s.y, d.z)) * 1e3), this.labelKgProjText = Math.round(s.distanceTo(new R(d.x, s.y, d.z)) * 1e3), this.endGizmo.visible = !0, this.labelGipProjText > 0 && (this.endProjGizmo.visible = !0), this.lineGip.visible = !0, this.lineKv.visible = !0, this.lineKg.visible = !0, this.labelGipProjText > 0 && (this.lineGipProj.visible = !0), this.labelKvProjText > 0 && (this.lineKvProj.visible = !0), this.labelKgProjText > 0 && (this.lineKgProj.visible = !0), this.mode = 2;
    }
  }
  updateLine(e, l, c) {
    e.geometry = new jl().setPositions([l.x, l.y, l.z, c.x, c.y, c.z]);
  }
  addGizmo(e = Xa) {
    const l = new wd(0.5, 6, 6), c = new w(l, e);
    return c.visible = !1, c;
  }
}
const Je = new pt(), Md = new N.MeshBasicMaterial({ color: 16538115 }), Sc = class extends Ol {
  constructor(l) {
    super(l);
    Z(this, "cropExt");
    Z(this, "content");
    Z(this, "isVisible", !1);
    Z(this, "isActive", !1);
    Z(this, "isLabelsShow", !0);
    Z(this, "isBlockControls", !1);
    Z(this, "renderer");
    Z(this, "camera");
    Z(this, "rayPoint", new R());
    Z(this, "rayFaceNormal", new R());
    Z(this, "helper");
    Z(this, "helperSnap");
    Z(this, "meashure");
    const c = this.getRenderManager(), t = c.extMan;
    this.cropExt = t.getExtensionByName("crop"), this.meashure = new pa(c.helpersScene), this.ui = Sc.getPopupName();
  }
  added() {
    var c;
    const l = this.getRenderManager();
    this.onSceneLoaded = this.onSceneLoaded.bind(this), (c = l == null ? void 0 : l.sceneManager) == null || c.addEventListener(el.AllLoaded, this.onSceneLoaded), this.onMouseWheel = this.onMouseWheel.bind(this), l == null || l.addEventListener(he.Wheel, this.onMouseWheel), this.renderer = l.renderer, this.camera = l.camera;
  }
  deleted() {
    var c;
    const l = this.getRenderManager();
    (c = l == null ? void 0 : l.sceneManager) == null || c.removeEventListener(el.AllLoaded, this.onSceneLoaded);
  }
  async onSceneLoaded() {
    const l = this.getRenderManager(), c = new N.ConeGeometry(0.35, 5, 3);
    c.translate(0, -2.5, 0), c.rotateX(-Math.PI / 2), this.helper = new N.Mesh(c, Md);
    const t = new Pd(0.5, 6, 6);
    this.helperSnap = new N.Mesh(t, Md), l.helpersScene.add(this.helper), l.helpersScene.add(this.helperSnap), this.helper.visible = !1, this.helperSnap.visible = !1;
  }
  switchControlsBlock() {
    const l = this.getRenderManager();
    this.isBlockControls = !this.isBlockControls, this.isBlockControls ? l.blockControls() : l.unblockControls();
  }
  switchRulerMode() {
    const l = this.getRenderManager();
    if (this.isActive = !this.isActive, this.isActive) {
      const c = l.sceneManager.getSceneChldren();
      for (const t in c)
        Rc(c[t].geometry);
      l.setSelectionLock(!0), l.updateHover(), l.sceneManager.updateSelection();
    } else
      l.setSelectionLock(!1), this.reset(), l.unblockControls();
  }
  onChange() {
    const l = this.getRenderManager();
    this.meashure && this.meashure.mode == 2 && this.meashure.updateLabel(l.viewerElement, l.camera);
  }
  onStart() {
    this.isLabelsShow = !1;
  }
  onEnd() {
    this.isLabelsShow = !0;
  }
  reset() {
    this.meashure.reset(), this.helper.visible = !1, this.helperSnap.visible = !1;
  }
  onMouseWheel() {
    if (this.helper == null || !this.isActive)
      return;
    const l = this.getRenderManager();
    this.meashure.updateSize(l.camera.position), this.updateHelperScale(l.camera.position), this.updateHelperPos(), this.onChange();
  }
  onMouseMove() {
    if (this.helper == null || !this.isActive)
      return;
    const l = this.getRenderManager();
    this.updateHelperScale(l.camera.position), this.meashure.updateSize(l.camera.position), this.updateHelperPos();
  }
  findClosestVertex(l, c, t) {
    const d = l.geometry.attributes.position.array, s = [];
    for (let b = 0, m = d.length; b < m; b = b + 3)
      s.push(new R(d[b], d[b + 1], d[b + 2]));
    if (s.length === 0)
      return null;
    let i, a = null, o = l.worldToLocal(c.clone());
    for (let b = 0, m = s.length; b < m; b++)
      i = s[b].distanceTo(o), !(i > t) && (t = i, a = s[b]);
    return a === null ? null : l.localToWorld(a.clone());
  }
  updateHelperPos() {
    const l = this.getRenderManager();
    if (l.viewerElement == null || !this.isActive)
      return;
    var c = l.mouse.clone();
    l.isTouchDevice && (c.x -= 0.35), Je.firstHitOnly = !0, Je.setFromCamera(c, l.camera), Je.clipPlanes = Object.values(this.cropExt.planes), Je.isCropOn = this.cropExt.isCropOn;
    const t = Je.intersectObjects(l.sceneManager.getSceneChldren(!0, !0, !1));
    if (t.length > 0 && t[0].face) {
      const d = t[0].point, s = this.findClosestVertex(t[0].object, d, 0.2);
      if (this.helper.position.set(0, 0, 0), this.helper.lookAt(t[0].face.normal), !t[0].object.geometry.boundsTree)
        return;
      s ? (this.helperSnap.position.copy(s), this.rayPoint.copy(s), this.helper.visible = !1, this.helperSnap.visible = !0) : (this.helper.position.copy(t[0].point), this.rayPoint.copy(t[0].point), this.helper.visible = !0, this.helperSnap.visible = !1), this.rayFaceNormal.copy(t[0].face.normal), this.updateHelperScale(l.camera.position), l.requestUpdate();
    } else
      this.helper.visible = !1, this.helperSnap.visible = !1;
  }
  updateHelperScale(l) {
    var d, s;
    var c = (d = this.helper) == null ? void 0 : d.position.distanceTo(l);
    this.helper.scale.set(c * 0.01, c * 0.01, c * 0.01);
    var t = (s = this.helperSnap) == null ? void 0 : s.position.distanceTo(l);
    this.helperSnap.scale.set(t * 0.01, t * 0.01, t * 0.01);
  }
  addPoint() {
    var c, t, d;
    if (!this.isActive || !this.helper.visible && !this.helperSnap.visible)
      return;
    const l = this.getRenderManager();
    (c = this.meashure) == null || c.setPoint(this.rayPoint, this.rayFaceNormal, this.helperSnap.visible), (t = this.meashure) == null || t.updateSize(l.camera.position), (d = this.meashure) == null || d.updateLabel(l.viewerElement, l.camera);
  }
  onMouseClick() {
    this.getRenderManager().isTouchDevice || this.addPoint();
  }
  static getPopupName() {
    return `t-${Sc.getName()}-meashures`;
  }
};
let _c = Sc;
Z(_c, "getName", () => "meashure");
class ya {
  constructor() {
    Z(this, "mode", 0);
    Z(this, "labelX");
    Z(this, "labelY");
    Z(this, "posX");
    Z(this, "posY");
    Z(this, "posZ");
  }
  updateLabelPos(e, l, c) {
    if (this.mode == 0)
      return;
    const d = c.clone().project(l);
    this.labelX = e.offsetWidth * (d.x + 1) / 2 + e.offsetLeft + 10, this.labelY = -(e.offsetHeight * (d.y - 1) / 2 + e.offsetTop) - 10;
  }
  updateMode() {
    this.mode == 0 && (this.mode = 1);
  }
}
const qc = new pt(), Wa = new Nl({ color: 3381759 });
new Nl({ color: 3394611 });
const Kc = class extends Ol {
  constructor(l) {
    super(l);
    Z(this, "content");
    Z(this, "isVisible", !1);
    Z(this, "isActive", !1);
    Z(this, "isLabelsShow", !0);
    Z(this, "isBlockControls", !1);
    Z(this, "renderer");
    Z(this, "camera");
    Z(this, "rayPoint", new R());
    Z(this, "rayFaceNormal", new R());
    Z(this, "helperSnap");
    Z(this, "label");
    Z(this, "snapPoint");
    this.label = new ya(), this.ui = Kc.getLabelName();
  }
  async onSceneLoaded() {
    const l = this.getRenderManager(), c = new Pd(0.5, 6, 6);
    this.helperSnap = new w(c, Wa), l.helpersScene.add(this.helperSnap), this.helperSnap.visible = !1;
  }
  switchCoordinatesMode() {
    const l = this.getRenderManager();
    if (this.isActive = !this.isActive, this.isActive) {
      const c = l.sceneManager.getSceneChldren(!0, !0, !1);
      for (const t in c)
        Rc(c[t].geometry);
      l.setSelectionLock(!0), l.updateHover(), l.sceneManager.updateSelection();
    }
  }
  onMouseMove() {
    if (!this.isActive)
      return;
    const l = this.getRenderManager();
    this.updateHelperPos(), this.helperSnap.visible ? (this.label.updateMode(), this.label.updateLabelPos(l.viewerElement, l.camera, this.snapPoint)) : this.label.mode = 0;
  }
  findClosestVertex(l, c, t) {
    const d = l.geometry.attributes.position.array, s = [];
    for (let b = 0, m = d.length; b < m; b = b + 3)
      s.push(new R(d[b], d[b + 1], d[b + 2]));
    if (s.length === 0)
      return null;
    let i, a = null, o = l.worldToLocal(c.clone());
    for (let b = 0, m = s.length; b < m; b++)
      i = s[b].distanceTo(o), !(i > t) && (t = i, a = s[b]);
    return a === null ? null : l.localToWorld(a.clone());
  }
  updateHelperPos() {
    const l = this.getRenderManager(), c = l.sceneManager.getGlobalOrigin();
    if (l.viewerElement == null || !this.isActive)
      return;
    const t = l.mouse.clone();
    l.isTouchDevice && (t.x -= 0.35), qc.firstHitOnly = !0, qc.setFromCamera(t, l.camera);
    const d = l.sceneManager.getSceneChldren(!0, !0, !1), s = qc.intersectObjects(d);
    if (s.length > 0 && s[0].face) {
      const i = s[0].point, a = this.findClosestVertex(s[0].object, i, 0.2);
      if (!s[0].object.geometry.boundsTree)
        return;
      if (a) {
        this.helperSnap.position.copy(a), this.rayPoint.copy(a), this.helperSnap.visible = !0, this.snapPoint = a;
        const b = a.clone().sub(c);
        this.label.posX = (Math.round(b.x * 100) / 100).toFixed(3), this.label.posY = (Math.round(-b.z * 100) / 100).toFixed(3), this.label.posZ = (Math.round(b.y * 100) / 100).toFixed(3);
      } else
        this.rayPoint.copy(s[0].point), this.helperSnap.visible = !1, this.label.updateMode();
      this.rayFaceNormal.copy(s[0].face.normal), this.updateHelperScale(l.camera.position), l.requestUpdate();
    } else
      this.helperSnap.visible = !1;
  }
  updateHelperScale(l) {
    var t;
    const c = (t = this.helperSnap) == null ? void 0 : t.position.distanceTo(l);
    this.helperSnap.scale.set(c * 0.01, c * 0.01, c * 0.01);
  }
  static getLabelName() {
    return `t-${Kc.getName()}-label`;
  }
  added() {
    var c;
    const l = this.getRenderManager();
    this.onSceneLoaded = this.onSceneLoaded.bind(this), (c = l == null ? void 0 : l.sceneManager) == null || c.addEventListener(el.AllLoaded, this.onSceneLoaded);
  }
  deleted() {
    var c;
    const l = this.getRenderManager();
    (c = l == null ? void 0 : l.sceneManager) == null || c.removeEventListener(el.AllLoaded, this.onSceneLoaded);
  }
};
let $c = Kc;
Z($c, "getName", () => "coordinates");
var as = new yn();
export {
  Wt as ControllerExtensionBase,
  $c as CoordinatesExtension,
  aa as CropExtension,
  dc as ElementData,
  Hc as ElementState,
  Ol as ExtensionBase,
  Oi as ExtensionsManager,
  da as FlyControllerExtension,
  ca as GeneralModeExtension,
  sc as Idb,
  xn as InstanceGeometry,
  _c as MeashureExtension,
  Ia as MetaManager,
  Ad as ModeExtensionBase,
  Qc as ModelsProgressEvent,
  un as MoveEvent,
  ta as OrbitControllerExtension,
  he as RenderEvents,
  pn as RenderManager,
  el as SceneEvents,
  Ra as SceneLoader,
  La as SceneManager,
  Xd as SharedGeometry,
  Ec as TooltipExtension,
  yn as ViewerStore,
  oa as VisibilityExtension,
  as as viewerStore
};
