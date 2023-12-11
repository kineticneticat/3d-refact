// import {Vec3} from './Vec'

// export class MRotation {
// 	a: number
// 	b: number
// 	y: number
// 	constructor(a:number, b:number, y:number) {
// 		this.a = a
// 		this.b = b
// 		this.y = y
// 	}
// 	isZero() {
// 		return (this.a == 0 && this.b == 0 && this.y == 0)
// 	}
// 	add(rot: MRotation) {
// 		return new MRotation(this.a+rot.a, this.b+rot.b, this.y+rot.y)
// 	}
// }

// export function extrinsic(a_: number, b_: number, y: number, pos: Vec3, ori: Vec3) {
// 	pos = pos.sub(ori)
// 	// console.log(a,b,y)
// 	a_ = dtr(a_)
// 	b_ = dtr(b_)
// 	y = dtr(y)
// 	// global zyx
// 	let a: number = Math.round(Math.sin(a_))
// 	let b: number = Math.round(Math.sin(b_))
// 	let c: number = Math.round(Math.sin(y))
// 	let d: number = Math.round(Math.cos(a_))
// 	let e: number = Math.round(Math.cos(b_))
// 	let f: number = Math.round(Math.cos(y))
// 	let R = [
// 		(pos.x*(e*f) + pos.y*(a*b*f-d*c) + pos.z*(d*b*f+a*c)),
// 		(pos.x*(e*c) + pos.y*(a*b*c+d*f) + pos.z*(d*b*c-a*f)),
// 		(pos.x*(-b)  +    pos.y*(a*e)    +    pos.z*(d*e)   )
// 	]
// 	// M = [
// 	// 	[e*f, a*b*f-d*c, d*b*f+a*c],
// 	// 	[e*c, a*b*c+d*f, d*b*c-a*f],
// 	// 	[-b ,    a*e   ,    d*e   ]
// 	// ]
// 	// print(M[0])
// 	// print(M[1])
// 	// print(M[2])
// 	return new Vec3(R[0], R[1], R[2])
// }

// export function intrinsic(a, b, y, pos, ori) {
// 	pos = pos.sub(ori)
// 	print(a,b,y)
// 	a = dtr(a)
// 	b = dtr(b)
// 	y = dtr(y)
// 	// local xyz
// 	let a = Math.round(Math.sin(a))
// 	let b = Math.round(Math.sin(b))
// 	let c = Math.round(Math.sin(y))
// 	let d = Math.round(Math.cos(a))
// 	let e = Math.round(Math.cos(b))
// 	let f = Math.round(Math.cos(y))
// 	let R = [
// 		(pos.x*(d*e) + pos.y*(d*b*c-a*d) + pos.z*(d*b*f+a*c)),
// 		(pos.x*(d*c) + pos.y*(a*b*c+d*f) + pos.z*(a*b*f-d*f)),
// 		(pos.x*(-b)  +    pos.y*(e*c)    +    pos.z*(e*f)   )
// 	]
// 	// M = [
// 	// 	[d*e, d*b*c-a*d, a*b*f+a*c],
// 	// 	[d*c, a*b*c+d*f, a*b*f-d*c],
// 	// 	[ -b,    e*c,      e*f    ] 
// 	// ]
// 	// print(M[0])
// 	// print(M[1])
// 	// print(M[2])
// 	return new Vec3(R[0], R[1], R[2])
// }