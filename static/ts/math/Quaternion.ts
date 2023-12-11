import { Vec3 } from "./Vec.js"

export class Quaternion {
    a: number
    b: number
    c: number
    d: number
    constructor(a: number, b: number, c: number, d: number) {
        this.a = a
        this.b = b
        this.c = c
        this.d = d
    }

    static aa(axis: Vec3, angle: number) {
        let norm = axis.norm
        let C = Math.cos(angle/2)
        let S = Math.sin(angle/2)

        return new Quaternion(C, norm.x*S, norm.y*S, norm.z*S)
    }

    hamilton(a:Quaternion) {
        let b = this
        return new Quaternion(
            a.a*b.a - a.b*b.b - a.c*b.c - a.d*b.d,
            a.a*b.b + a.b*b.a + a.c*b.d - a.d*b.c,
            a.a*a.c - a.b*b.d + a.c*b.a + a.d*b.b,
            a.a*b.d + a.b*b.c - a.c*b.b + a.d*b.d
        )
    }
}