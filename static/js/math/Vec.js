var Vec3 = (function () {
    function Vec3(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Object.defineProperty(Vec3, "zero", {
        get: function () {
            return new Vec3();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "mag", {
        get: function () {
            return Math.sqrt((Math.pow(this.x, 2)) + (Math.pow(this.y, 2)) + (Math.pow(this.z, 2)));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "norm", {
        get: function () {
            return this.div(this.mag);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "isZero", {
        get: function () {
            return this.x == 0 && this.y == 0 && this.z == 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3, "i", {
        get: function () { return new Vec3(1, 0, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3, "j", {
        get: function () { return new Vec3(0, 1, 0); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vec3, "k", {
        get: function () { return new Vec3(0, 0, 1); },
        enumerable: false,
        configurable: true
    });
    Vec3.prototype.add = function (vec) {
        return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    };
    Vec3.prototype.sub = function (vec) {
        return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    };
    Vec3.prototype.mul = function (sca) {
        return new Vec3(this.x * sca, this.y * sca, this.z * sca);
    };
    Vec3.prototype.div = function (sca) {
        return new Vec3(this.x / sca, this.y / sca, this.z / sca);
    };
    Vec3.prototype.dot = function (vec) {
        return (this.x * vec.x) + (this.y * vec.y) + (this.z * vec.z);
    };
    Vec3.prototype.cross = function (vec) {
        var cx = this.y * vec.z - this.z * vec.y;
        var cy = this.z * vec.x - this.x * vec.z;
        var cz = this.x * vec.y - this.y * vec.x;
        return new Vec3(cx, cy, cz);
    };
    return Vec3;
}());
export { Vec3 };
var Vec2 = (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.add = function (vec) {
        return new Vec2(this.x + vec.x, this.y + vec.y);
    };
    Vec2.prototype.sub = function (vec) {
        return new Vec2(this.x - vec.x, this.y - vec.y);
    };
    Vec2.prototype.mul = function (sca) {
        return new Vec2(this.x * sca, this.y * sca);
    };
    Vec2.prototype.div = function (sca) {
        return new Vec2(this.x / sca, this.y / sca);
    };
    Vec2.prototype.dot = function (vec) {
        return (this.x * vec.x) + (this.y * vec.y);
    };
    Vec2.prototype.xy = function () {
        return [this.x, this.y];
    };
    return Vec2;
}());
export { Vec2 };
//# sourceMappingURL=Vec.js.map