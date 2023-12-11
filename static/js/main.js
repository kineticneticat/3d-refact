import { Vertex, Edge, Face } from './parts.js';
import { Vec3 } from './math/Vec.js';
import { read } from './parse.js';
export var canvas = document.getElementById('canvas');
export var ctx = canvas.getContext('2d');
export var sun = new Vec3(-1, -1, 1);
export var offset = Vec3.zero;
export var VertexRegistry = [];
export var EdgeRegistry = [];
export var FaceRegistry = [];
var FaceOrder = [];
export function AddVertex(x, y, z) {
    return VertexRegistry.push(new Vertex(new Vec3(x, y, z))) - 1;
}
export function AddEdge(a, b) {
    return EdgeRegistry.push(new Edge(a, b)) - 1;
}
export function AddFace(a, b, c) {
    var reg = FaceRegistry.push(new Face(a, b, c)) - 1;
    FaceOrder.push([reg, FaceRegistry[reg].centre.mag]);
    return reg;
}
export var settings = {
    w: 500,
    h: 500,
    fps: 10
};
var key = {
    W: false,
    A: false,
    S: false,
    D: false,
    Up: false,
    Do: false,
    Le: false,
    Ri: false,
    Sp: false,
    Sh: false
};
window.onload = function () {
    canvas.width = settings.w;
    canvas.height = settings.h;
    read();
    document.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            case 87:
                key.W = true;
                break;
            case 65:
                key.A = true;
                break;
            case 83:
                key.S = true;
                break;
            case 68:
                key.D = true;
                break;
            case 37:
                key.Le = true;
                break;
            case 38:
                key.Up = true;
                break;
            case 39:
                key.Ri = true;
                break;
            case 40:
                key.Do = true;
                break;
            case 32:
                key.Sp = true;
                break;
            case 16:
                key.Sh = true;
                break;
        }
    });
    document.addEventListener('keyup', function (e) {
        switch (e.keyCode) {
            case 87:
                key.W = false;
                break;
            case 65:
                key.A = false;
                break;
            case 83:
                key.S = false;
                break;
            case 68:
                key.D = false;
                break;
            case 37:
                key.Le = false;
                break;
            case 38:
                key.Up = false;
                break;
            case 39:
                key.Ri = false;
                break;
            case 40:
                key.Do = false;
                break;
            case 32:
                key.Sp = false;
                break;
            case 16:
                key.Sh = false;
                break;
        }
    });
    AddVertex(sun.x, sun.y, sun.z);
    FaceOrder.sort(function (a, b) { return b[1] - a[1]; });
    tick();
};
var tick = function () {
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0, 0, settings.w, settings.h);
    ctx.fillStyle = '#000';
    draw();
    move();
    requestAnimationFrame(tick);
};
var move = function () {
    var movement = new Vec3();
    if (key.W) {
        movement = movement.add(new Vec3(0, 0, -1));
    }
    if (key.A) {
        movement = movement.add(new Vec3(1, 0, 0));
    }
    if (key.S) {
        movement = movement.add(new Vec3(0, 0, 1));
    }
    if (key.D) {
        movement = movement.add(new Vec3(-1, 0, 0));
    }
    if (key.Sp) {
        movement = movement.add(new Vec3(0, 1, 0));
    }
    if (key.Sh) {
        movement = movement.add(new Vec3(0, -1, 0));
    }
    if (!movement.isZero) {
        offset = offset.add(movement);
        VertexRegistry.forEach(function (x) { x.project(); });
    }
};
var draw = function () {
    if (document.getElementById('vertices').checked) {
        VertexRegistry.forEach(function (x) { return x.draw(); });
    }
    if (document.getElementById('edges').checked) {
        EdgeRegistry.forEach(function (x) { return x.draw(); });
    }
    if (document.getElementById('faces').checked) {
        FaceOrder.forEach(function (x) { return FaceRegistry[x[0]].draw(); });
    }
};
//# sourceMappingURL=main.js.map