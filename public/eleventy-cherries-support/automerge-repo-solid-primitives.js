import { createContext as F, useContext as D, createResource as j, createEffect as p, on as $, onCleanup as _, $PROXY as s, $TRACK as k, getListener as R, batch as q, createSignal as z, getOwner as H, runWithOwner as L } from "solid-js";
import { fromAutomerge as V, apply as M } from "cabbages";
const C = F(null);
function v() {
  const e = D(C);
  if (!e) throw new Error("Please wrap me in a <RepoContext value={repo}>");
  return e;
}
function X(e, n) {
  let t = D(C);
  if (!n?.repo && !t)
    throw new Error("use outside <RepoContext> requires options.repo");
  let o = n?.repo || t, [r, { mutate: f }] = j(e, (c) => {
    if (!c) return;
    let i = o.find(c);
    return i.isReady() ? i : i.whenReady().then(() => i);
  });
  return p($(e, (c) => c || f())), r;
}
function ee(e, n) {
  let t = X(e, n), [o, { refetch: r, mutate: f }] = j(t, (i) => i.doc(), {
    initialValue: t()?.docSync()
  });
  function c() {
    f(), r();
  }
  return p(
    $(t, (i) => {
      i?.on("change", r), i?.on("delete", c), _(() => {
        i?.off("change", r), i?.off("delete", c);
      });
    })
  ), p($(e, (i) => i || f())), [
    o,
    (i, u) => {
      t()?.change(i, u);
    }
  ];
}
const O = Symbol("store-raw"), a = Symbol("store-node"), l = Symbol("store-has"), x = Symbol("store-self");
function E(e) {
  let n = e[s];
  if (!n && (Object.defineProperty(e, s, {
    value: n = new Proxy(e, G)
  }), !Array.isArray(e))) {
    const t = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
    for (let r = 0, f = t.length; r < f; r++) {
      const c = t[r];
      o[c].get && Object.defineProperty(e, c, {
        enumerable: o[c].enumerable,
        get: o[c].get.bind(n)
      });
    }
  }
  return n;
}
function d(e) {
  let n;
  return e != null && typeof e == "object" && (e[s] || !(n = Object.getPrototypeOf(e)) || n === Object.prototype || Array.isArray(e));
}
function y(e, n = /* @__PURE__ */ new Set()) {
  let t, o, r, f;
  if (t = e != null && e[O]) return t;
  if (!d(e) || n.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? e = e.slice(0) : n.add(e);
    for (let c = 0, i = e.length; c < i; c++)
      r = e[c], (o = y(r, n)) !== r && (e[c] = o);
  } else {
    Object.isFrozen(e) ? e = Object.assign({}, e) : n.add(e);
    const c = Object.keys(e), i = Object.getOwnPropertyDescriptors(e);
    for (let u = 0, P = c.length; u < P; u++)
      f = c[u], !i[f].get && (r = e[f], (o = y(r, n)) !== r && (e[f] = o));
  }
  return e;
}
function A(e, n) {
  let t = e[n];
  return t || Object.defineProperty(e, n, {
    value: t = /* @__PURE__ */ Object.create(null)
  }), t;
}
function h(e, n, t) {
  if (e[n]) return e[n];
  const [o, r] = z(t, {
    equals: !1,
    internal: !0
  });
  return o.$ = r, e[n] = o;
}
function Y(e, n) {
  const t = Reflect.getOwnPropertyDescriptor(e, n);
  return !t || t.get || !t.configurable || n === s || n === a || (delete t.value, delete t.writable, t.get = () => e[s][n]), t;
}
function K(e) {
  R() && h(A(e, a), x)();
}
function B(e) {
  return K(e), Reflect.ownKeys(e);
}
const G = {
  get(e, n, t) {
    if (n === O) return e;
    if (n === s) return t;
    if (n === k)
      return K(e), t;
    const o = A(e, a), r = o[n];
    let f = r ? r() : e[n];
    if (n === a || n === l || n === "__proto__") return f;
    if (!r) {
      const c = Object.getOwnPropertyDescriptor(e, n);
      R() && (typeof f != "function" || e.hasOwnProperty(n)) && !(c && c.get) && (f = h(o, n, f)());
    }
    return d(f) ? E(f) : f;
  },
  has(e, n) {
    return n === O || n === s || n === k || n === a || n === l || n === "__proto__" ? !0 : (R() && h(A(e, l), n)(), n in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: B,
  getOwnPropertyDescriptor: Y
};
function g(e, n, t, o = !1) {
  if (!o && e[n] === t) return;
  const r = e[n], f = e.length;
  t === void 0 ? (delete e[n], e[l] && e[l][n] && r !== void 0 && e[l][n].$()) : (e[n] = t, e[l] && e[l][n] && r === void 0 && e[l][n].$());
  let c = A(e, a), i;
  if ((i = h(c, n, r)) && i.$(() => t), Array.isArray(e) && e.length !== f) {
    for (let u = e.length; u < f; u++) (i = c[u]) && i.$();
    (i = h(c, "length", f)) && i.$(e.length);
  }
  (i = c[x]) && i.$();
}
function N(e, n) {
  const t = Object.keys(n);
  for (let o = 0; o < t.length; o += 1) {
    const r = t[o];
    g(e, r, n[r]);
  }
}
function I(e, n) {
  if (typeof n == "function" && (n = n(e)), n = y(n), Array.isArray(n)) {
    if (e === n) return;
    let t = 0, o = n.length;
    for (; t < o; t++) {
      const r = n[t];
      e[t] !== r && g(e, t, r);
    }
    g(e, "length", o);
  } else N(e, n);
}
function w(e, n, t = []) {
  let o, r = e;
  if (n.length > 1) {
    o = n.shift();
    const c = typeof o, i = Array.isArray(e);
    if (Array.isArray(o)) {
      for (let u = 0; u < o.length; u++)
        w(e, [o[u]].concat(n), t);
      return;
    } else if (i && c === "function") {
      for (let u = 0; u < e.length; u++)
        o(e[u], u) && w(e, [u].concat(n), t);
      return;
    } else if (i && c === "object") {
      const {
        from: u = 0,
        to: P = e.length - 1,
        by: W = 1
      } = o;
      for (let S = u; S <= P; S += W)
        w(e, [S].concat(n), t);
      return;
    } else if (n.length > 1) {
      w(e[o], n, [o].concat(t));
      return;
    }
    r = e[o], t = [o].concat(t);
  }
  let f = n[0];
  typeof f == "function" && (f = f(r, t), f === r) || o === void 0 && f == null || (f = y(f), o === void 0 || d(r) && d(f) && !Array.isArray(f) ? N(r, f) : g(e, o, f));
}
function J(...[e, n]) {
  const t = y(e || {}), o = Array.isArray(t), r = E(t);
  function f(...c) {
    q(() => {
      o && c.length === 1 ? I(t, c[0]) : w(t, c);
    });
  }
  return [r, f];
}
const b = /* @__PURE__ */ new WeakMap(), T = {
  get(e, n) {
    if (n === O) return e;
    const t = e[n];
    let o;
    return d(t) ? b.get(t) || (b.set(t, o = new Proxy(t, T)), o) : t;
  },
  set(e, n, t) {
    return g(e, n, y(t)), !0;
  },
  deleteProperty(e, n) {
    return g(e, n, void 0, !0), !0;
  }
};
function Q(e) {
  return (n) => {
    if (d(n)) {
      let t;
      (t = b.get(n)) || b.set(n, t = new Proxy(n, T)), e(t);
    }
    return n;
  };
}
function U(e) {
  return Q((n) => {
    for (let t of e) {
      const [o, r, f] = V(t);
      M(o, n, r, f);
    }
  });
}
function ne(e) {
  let n = H(), [t] = j(
    e,
    async (o) => {
      await o.whenReady();
      let [r, f] = J(o.docSync());
      function c(i) {
        f(U(i.patches));
      }
      return o.on("change", c), L(n, () => _(() => o.off("change", c))), r;
    },
    {
      initialValue: e()?.docSync()
    }
  );
  return t;
}
export {
  C as RepoContext,
  ne as createDocumentStore,
  ee as useDocument,
  X as useHandle,
  v as useRepo
};
