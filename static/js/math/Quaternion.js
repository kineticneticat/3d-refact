import { Vec3 } from "./Vec.js";
var Quaternion = (function () {
    function Quaternion(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    Quaternion.aa = function (axis, angle) {
        var norm = axis.norm;
        var C = Math.cos(angle / 2);
        var S = Math.sin(angle / 2);
        return new Quaternion(C, norm.x * S, norm.y * S, norm.z * S);
    };
    Object.defineProperty(Quaternion.prototype, "isZero", {
        get: function () {
            return this.a == 1 && this.b == 0 && this.c == 0 && this.d == 0;
        },
        enumerable: false,
        configurable: true
    });
    Quaternion.asQuat = function (vec) {
        return new Quaternion(0, vec.x, vec.y, vec.z);
    };
    Object.defineProperty(Quaternion.prototype, "inv", {
        get: function () {
            return new Quaternion(this.a, -this.b, -this.c, -this.d);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "asVec3", {
        get: function () {
            return new Vec3(this.b, this.c, this.d);
        },
        enumerable: false,
        configurable: true
    });
    Quaternion.prototype.hamilton = function (a) {
        var b = this;
        return new Quaternion(a.a * b.a - a.b * b.b - a.c * b.c - a.d * b.d, a.a * b.b + a.b * b.a + a.c * b.d - a.d * b.c, a.a * a.c - a.b * b.d + a.c * b.a + a.d * b.b, a.a * b.d + a.b * b.c - a.c * b.b + a.d * b.d);
    };
    Quaternion.prototype.rotate = function (pos) {
        var p = Quaternion.asQuat(pos);
        var q = this;
        var q_ = q.inv;
        var v = q.hamilton(p.hamilton(q_));
        return v.asVec3;
    };
    return Quaternion;
}());
export { Quaternion };
//# sourceMappingURL=Quaternion.js.map