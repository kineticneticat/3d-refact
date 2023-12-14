import { Vertex, Edge, Face } from './Parts.js';
import { Vec3 } from './math/Vec.js';
import { Quaternion } from './math/Quaternion.js';
import { read } from './Parse.js';
export var canvas = document.getElementById('canvas');
export var ctx = canvas.getContext('2d');
export var sun = new Vec3(-1, -1, 1);
export var offset = Vec3.zero;
export var rotation = Quaternion.none;
export var VertexRegistry = [];
export var EdgeRegistry = [];
export var FaceRegistry = [];
var FaceOrder = [];
var pi = Math.PI;
var keyCodes;
(function (keyCodes) {
    keyCodes[keyCodes["W"] = 87] = "W";
    keyCodes[keyCodes["A"] = 65] = "A";
    keyCodes[keyCodes["S"] = 83] = "S";
    keyCodes[keyCodes["D"] = 68] = "D";
    keyCodes[keyCodes["UP"] = 38] = "UP";
    keyCodes[keyCodes["DOWN"] = 40] = "DOWN";
    keyCodes[keyCodes["LEFT"] = 37] = "LEFT";
    keyCodes[keyCodes["RIGHT"] = 39] = "RIGHT";
    keyCodes[keyCodes["SPACE"] = 32] = "SPACE";
    keyCodes[keyCodes["SHIFT"] = 16] = "SHIFT";
})(keyCodes || (keyCodes = {}));
export function AddVertex(x, y, z) {
    return VertexRegistry.push(new Vertex(new Vec3(x, y, z))) - 1;
}
export function AddEdge(a, b) {
    return EdgeRegistry.push(new Edge(a, b)) - 1;
}
export function AddFace(a, b, c) {
    var reg = FaceRegistry.push(new Face(a, b, c)) - 1;
    FaceOrder.push([reg, FaceRegistry[reg].centre]);
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
    Down: false,
    Left: false,
    Right: false,
    Space: false,
    Shift: false
};
window.onload = function () {
    canvas.width = settings.w;
    canvas.height = settings.h;
    read();
    document.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            case keyCodes.W:
                key.W = true;
                break;
            case keyCodes.A:
                key.A = true;
                break;
            case keyCodes.S:
                key.S = true;
                break;
            case keyCodes.D:
                key.D = true;
                break;
            case keyCodes.UP:
                key.Up = true;
                break;
            case keyCodes.DOWN:
                key.Down = true;
                break;
            case keyCodes.LEFT:
                key.Left = true;
                break;
            case keyCodes.RIGHT:
                key.Right = true;
                break;
            case keyCodes.SPACE:
                key.Space = true;
                break;
            case keyCodes.SHIFT:
                key.Shift = true;
                break;
        }
    });
    document.addEventListener('keyup', function (e) {
        switch (e.keyCode) {
            case keyCodes.W:
                key.W = false;
                break;
            case keyCodes.A:
                key.A = false;
                break;
            case keyCodes.S:
                key.S = false;
                break;
            case keyCodes.D:
                key.D = false;
                break;
            case keyCodes.UP:
                key.Up = false;
                break;
            case keyCodes.DOWN:
                key.Down = false;
                break;
            case keyCodes.LEFT:
                key.Left = false;
                break;
            case keyCodes.RIGHT:
                key.Right = false;
                break;
            case keyCodes.SPACE:
                key.Space = false;
                break;
            case keyCodes.SHIFT:
                key.Shift = false;
                break;
        }
    });
    AddVertex(sun.x, sun.y, sun.z);
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
    if (key.Space) {
        movement = movement.add(new Vec3(0, 1, 0));
    }
    if (key.Shift) {
        movement = movement.add(new Vec3(0, -1, 0));
    }
    var div = pi / 64;
    rotation = Quaternion.none;
    if (key.Left) {
        rotation = Quaternion.aa(Vec3.j, div).compound(rotation);
    }
    if (key.Right) {
        rotation = Quaternion.aa(Vec3.j, -div).compound(rotation);
    }
    if (!movement.isZero) {
        offset = offset.add(movement);
    }
    if (!rotation.isNone) {
        VertexRegistry.forEach(function (x) { x.turn(); });
    }
    if (!(movement.isZero && rotation.isNone)) {
        VertexRegistry.forEach(function (x) { x.project(); });
    }
};
var order = function (a, b) {
    var OA = rotation.rotate(a).sub(offset).mag;
    var OB = rotation.rotate(b).sub(offset).mag;
    return OB - OA;
};
var draw = function () {
    FaceOrder.sort(function (a, b) { return order(a[1], b[1]); });
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
//# sourceMappingURL=Main.js.map