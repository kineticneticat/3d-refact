import { Vec2 } from './math/Vec.js';
import { settings, ctx, VertexRegistry, sun, offset } from './main.js';
var scale = 150;
var Vertex = (function () {
    function Vertex(pos) {
        this.pos = pos;
        this.project();
    }
    Object.defineProperty(Vertex.prototype, "offset", {
        get: function () {
            return this.pos.add(offset);
        },
        enumerable: false,
        configurable: true
    });
    Vertex.prototype.project = function () {
        this.proj = new Vec2((this.pos.add(offset).x * scale / (this.pos.add(offset).z + scale)), (this.pos.add(offset).y * scale / (this.pos.add(offset).z + scale)));
        this.proj = this.proj.add(new Vec2(settings.w / 2, settings.h / 2));
    };
    Vertex.prototype.draw = function () {
        if (this.show) {
            this.project();
            ctx.beginPath();
            ctx.arc(this.proj.x, this.proj.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };
    Object.defineProperty(Vertex.prototype, "show", {
        get: function () {
            return this.offset.z > -150;
        },
        enumerable: false,
        configurable: true
    });
    Vertex.prototype.turn = function (rot) {
        this.pos = rot.rotate(this.pos);
    };
    return Vertex;
}());
export { Vertex };
var Edge = (function () {
    function Edge(a, b) {
        this.a = a;
        this.b = b;
    }
    Edge.prototype.draw = function () {
        if (VertexRegistry[this.a].show
            && VertexRegistry[this.b].show) {
            var proja = VertexRegistry[this.a].proj;
            var projb = VertexRegistry[this.b].proj;
            ctx.beginPath();
            ctx.moveTo(proja.x, proja.y);
            ctx.lineTo(projb.x, projb.y);
            ctx.stroke();
        }
    };
    return Edge;
}());
export { Edge };
var Face = (function () {
    function Face(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.shade();
    }
    Face.prototype.shade = function () {
        var grey = (sun.dot(this.surfaceNormal) + 1) * 255;
        this.colour = "rgb(".concat(grey, ", ").concat(grey, ", ").concat(grey, ")");
    };
    Object.defineProperty(Face.prototype, "surfaceNormal", {
        get: function () {
            return VertexRegistry[this.b].pos
                .sub(VertexRegistry[this.a].pos)
                .cross(VertexRegistry[this.c].pos
                .sub(VertexRegistry[this.a].pos)).norm;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Face.prototype, "centre", {
        get: function () {
            return VertexRegistry[this.a].offset
                .add(VertexRegistry[this.b].offset)
                .add(VertexRegistry[this.c].offset)
                .div(3);
        },
        enumerable: false,
        configurable: true
    });
    Face.prototype.draw = function () {
        if (VertexRegistry[this.a].show
            && VertexRegistry[this.b].show
            && VertexRegistry[this.c].show) {
            ctx.fillStyle = this.colour;
            var proja = VertexRegistry[this.a].proj;
            var projb = VertexRegistry[this.b].proj;
            var projc = VertexRegistry[this.c].proj;
            ctx.beginPath();
            ctx.moveTo(proja.x, proja.y);
            ctx.lineTo(projb.x, projb.y);
            ctx.lineTo(projc.x, projc.y);
            ctx.fill();
        }
    };
    return Face;
}());
export { Face };
//# sourceMappingURL=parts.js.map