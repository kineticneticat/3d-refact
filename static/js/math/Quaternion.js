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
    Quaternion.prototype.hamilton = function (a) {
        var b = this;
        return new Quaternion(a.a * b.a - a.b * b.b - a.c * b.c - a.d * b.d, a.a * b.b + a.b * b.a + a.c * b.d - a.d * b.c, a.a * a.c - a.b * b.d + a.c * b.a + a.d * b.b, a.a * b.d + a.b * b.c - a.c * b.b + a.d * b.d);
    };
    return Quaternion;
}());
export { Quaternion };
//# sourceMappingURL=Quaternion.js.map