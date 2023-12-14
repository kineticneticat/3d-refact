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
    /** Empty roation */
    static get none() {
        return new Quaternion(1, 0, 0, 0)
    }
    /**
     * Creates a Quaternion from an Axis & angle
     * @param axis - axis around which to rotate
     * @param angle - angle to rotate by (rad)
     */
    static aa(axis: Vec3, angle: number) {
        let norm = axis.norm
        let C = Math.cos(angle/2)
        let S = Math.sin(angle/2)

        return new Quaternion(C, norm.x*S, norm.y*S, norm.z*S)
    }
    get isNone() {
        return this.a==1&&this.b==0&&this.c==0&&this.d==0
    }
    static asQuat(vec: Vec3) {
        return new Quaternion(0, vec.x, vec.y, vec.z)
    }
    get inv() {
        return new Quaternion(this.a, -this.b, -this.c, -this.d)
    }
    get asVec3() {
        return new Vec3(this.b, this.c, this.d)
    }

    hamilton(b:Quaternion) {
        let a = this
        return new Quaternion(
            Math.round((a.a*b.a - a.b*b.b - a.c*b.c - a.d*b.d)*1e10)/1e10,
            Math.round((a.a*b.b + a.b*b.a + a.c*b.d - a.d*b.c)*1e10)/1e10,
            Math.round((a.a*b.c - a.b*b.d + a.c*b.a + a.d*b.b)*1e10)/1e10,
            Math.round((a.a*b.d + a.b*b.c - a.c*b.b + a.d*b.a)*1e10)/1e10
        )
    }

    // compount this ontop of a roatation
    compound(prev:Quaternion) {
        return this.hamilton(prev)
    }

    

    rotate(pos: Vec3) {
        let p = Quaternion.asQuat(pos)
        let q = this
        let q_ = q.inv
        let v = q.hamilton(p.hamilton(q_))
        return v.asVec3
    }
}