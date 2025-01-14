// cabbages.ts
function pojo(target) {
  return typeof target == "object" && typeof target != null && Object.getPrototypeOf(target) == Object.prototype;
}
function apply(path, target, range, val, reviver) {
  let originalObject = target;
  let p = [...path];
  while (true) {
    let key = p.shift();
    if (!p.length) {
      if (typeof reviver == "function") {
        val = reviver(val, key, target, path, originalObject, range);
      }
      const RANGE_ARRAY = Array.isArray(range);
      if (pojo(target) && RANGE_ARRAY && typeof key == "undefined" && typeof range[0] == "string") {
        delete target[range[0]];
        return;
      }
      if (RANGE_ARRAY || typeof range == "number") {
        if (typeof key == "undefined") {
          throw new Error("cant treat top level as a seq");
        }
        key = key;
        let [start, end] = Array.isArray(range) ? range : [range, range + 1];
        const ZERO_LENGTH = Array.isArray(range) && range.length == 0;
        if (!ZERO_LENGTH && (start == null || end == null)) {
          throw new RangeError("it's all or nothing, no half measures");
        }
        const DELETE = typeof val == "undefined";
        const INSERT = start === end && !DELETE;
        const APPEND = ZERO_LENGTH && !DELETE;
        let op = DELETE ? "del" : APPEND ? "add" : INSERT ? "ins" : "replace";
        if (typeof target[key] == "undefined") {
          if (typeof val == "string") {
            target[key] = "";
          } else {
            target[key] = [];
          }
        }
        let seq = target[key];
        if (Array.isArray(seq)) {
          switch (op) {
            case "add": {
              Array.isArray(val) ? seq.push(...val) : seq.push(val);
              return;
            }
            case "replace":
            case "ins": {
              Array.isArray(val) ? seq.splice(start, end - start, ...val) : seq.splice(start, end - start, val);
              return;
            }
            case "del": {
              seq.splice(start, end - start);
              return;
            }
            default: {
              throw new Error("i don't know what happened");
            }
          }
        }
        if (typeof seq == "string") {
          switch (op) {
            case "add": {
              target[key] = seq + val;
              return;
            }
            case "replace":
            case "ins": {
              target[key] = seq.slice(0, start) + (typeof val == "string" ? val : val.join("")) + seq.slice(end);
              return;
            }
            case "del": {
              target[key] = seq.slice(0, start) + seq.slice(end);
              return;
            }
            default: {
              throw new Error("i don't know what happened");
            }
          }
        }
        if (pojo(seq) && RANGE_ARRAY && typeof range[0] == "string") {
          delete seq[range[0]];
        }
        throw new Error("not implemented");
      }
      if (typeof key == "undefined") {
        if (typeof range != "string") {
          throw new Error(`can't index top-level map with ${range}`);
        }
        if (typeof val == "undefined") {
          delete target[range];
        } else {
          target[range] = val;
        }
        return;
      }
      if (typeof target[key] == "undefined") {
        target[key] = {};
      }
      if (RANGE_ARRAY) {
        let [a, b] = range;
        if (a != null && b != null) {
          if (typeof val == "undefined" && a != null && b != null) {
            delete target[key][a || b];
          } else {
            target[key][a || b] = val;
          }
        }
      } else {
        if (typeof val == "undefined") {
          delete target[key][range];
        } else {
          target[key][range] = val;
        }
      }
      return;
    }
    if (typeof key == "undefined") {
      throw new Error("cant treat top level as a seq");
    }
    key = key;
    let nextkey = p[0];
    if (typeof target[key] == "undefined") {
      if (typeof nextkey == "string") {
        target[key] = {};
      } else if (typeof nextkey == "number") {
        target[key] = [];
      } else {
        throw new Error(`can't go down this road ${target}.${key}.${nextkey}`);
      }
    }
    target = target[key];
  }
}
var patch = apply;
var OperationError = class extends Error {
};
function fromAutomerge(autopatch) {
  let path = autopatch.path.slice(0, -1);
  let key = autopatch.path[autopatch.path.length - 1];
  switch (autopatch.action) {
    case "conflict":
    case "inc":
    case "mark":
    case "unmark":
      throw new OperationError(`can't handle this: ${autopatch.action}`);
    case "del": {
      return typeof key == "string" ? [path, key] : [path, [key, key + (autopatch.length || 1)]];
    }
    case "insert": {
      return [path, [key, key], autopatch.values];
    }
    case "splice": {
      return [path, [key, key], [autopatch.value]];
    }
    case "put": {
      return [path, key, autopatch.value];
    }
  }
}
export {
  apply,
  fromAutomerge,
  patch,
  pojo
};
