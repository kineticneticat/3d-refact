import { Vec2 } from './math/Vec.js';
import { settings, ctx, VertexRegistry, sun, offset } from './Main.js';
var scale = 150;
var Vertex = (function () {
    function Vertex(local) {
        this.local = local;
        this.project();
    }
    Object.defineProperty(Vertex.prototype, "global", {
        get: function () {
            return this.local.add(offset);
        },
        enumerable: false,
        configurable: true
    });
    Vertex.prototype.project = function () {
        this.proj = new Vec2((this.global.x * scale / (this.global.z + scale)), (this.global.y * scale / (this.global.z + scale)));
    };
    Object.defineProperty(Vertex.prototype, "projo", {
        get: function () {
            return this.proj.add(new Vec2(settings.w / 2, settings.h / 2));
        },
        enumerable: false,
        configurable: true
    });
    Vertex.prototype.draw = function () {
        if (this.show) {
            ctx.beginPath();
            ctx.arc(this.projo.x, this.projo.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };
    Object.defineProperty(Vertex.prototype, "show", {
        get: function () {
            return this.global.z > -150;
        },
        enumerable: false,
        configurable: true
    });
    Vertex.prototype.turn = function (rot) {
        var temp = this.local.sub(offset);
        temp = rot.rotate(temp);
        this.local = temp.add(offset);
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
            var proja = VertexRegistry[this.a].projo;
            var projb = VertexRegistry[this.b].projo;
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
            return VertexRegistry[this.b].local
                .sub(VertexRegistry[this.a].local)
                .cross(VertexRegistry[this.c].local
                .sub(VertexRegistry[this.a].local)).norm;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Face.prototype, "centre", {
        get: function () {
            return VertexRegistry[this.a].local
                .add(VertexRegistry[this.b].local)
                .add(VertexRegistry[this.c].local)
                .div(3);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Face.prototype, "show", {
        get: function () {
            return VertexRegistry[this.a].show
                && VertexRegistry[this.b].show
                && VertexRegistry[this.c].show;
        },
        enumerable: false,
        configurable: true
    });
    Face.prototype.draw = function () {
        if (this.show) {
            ctx.fillStyle = this.colour;
            var proja = VertexRegistry[this.a].projo;
            var projb = VertexRegistry[this.b].projo;
            var projc = VertexRegistry[this.c].projo;
            ctx.beginPath();
            ctx.moveTo(proja.x, proja.y);
            ctx.lineTo(projb.x, projb.y);
            ctx.lineTo(projc.x, projc.y);
            ctx.fill();
            if (document.getElementById("snorm").checked) {
                var A = new Vertex(this.centre);
                var B = new Vertex(this.centre.add(this.surfaceNormal));
                var b = B.local.norm.mul(255 * 4);
                ctx.strokeStyle = "rgb(".concat(b.x, ", ").concat(b.y, ", ").concat(b.z, ")");
                ctx.beginPath();
                canvas_arrow(ctx, A.projo, B.projo);
                ctx.stroke();
            }
        }
    };
    return Face;
}());
export { Face };
function canvas_arrow(context, from, to) {
    var headlen = 5;
    var d = to.sub(from);
    var angle = Math.atan2(d.y, d.x);
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.lineTo(to.x - headlen * Math.cos(angle - Math.PI / 6), to.y - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(to.x, to.y);
    context.lineTo(to.x - headlen * Math.cos(angle + Math.PI / 6), to.y - headlen * Math.sin(angle + Math.PI / 6));
}
//# sourceMappingURL=Parts.js.map