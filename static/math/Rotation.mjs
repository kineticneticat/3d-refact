import {Vec3} from './Vec.mjs'

export class Rotation {
	constructor(a, b, y) {
		this.a = a
		this.b = b
		this.y = y
	}
	isZero() {
		return (this.a == 0 && this.b == 0 && this.y == 0)
	}
	add(rot) {
		return new Rotation(this.a+rot.a, this.b+rot.b, this.y+rot.y)
	}
}

function dtr(deg) { return deg * (Math.PI/180) }
function rtd(rad) { return rad / (Math.PI/180)}

export function extrinsic(α, β, γ, pos, ori) {
	pos = pos.sub(ori)
	// console.log(α,β,γ)
	α = dtr(α)
	β = dtr(β)
	γ = dtr(γ)
	// global zyx
	let a = Math.round(Math.sin(α))
	let b = Math.round(Math.sin(β))
	let c = Math.round(Math.sin(γ))
	let d = Math.round(Math.cos(α))
	let e = Math.round(Math.cos(β))
	let f = Math.round(Math.cos(γ))
	let R = [
		(pos.x*(e*f) + pos.y*(a*b*f-d*c) + pos.z*(d*b*f+a*c)),
		(pos.x*(e*c) + pos.y*(a*b*c+d*f) + pos.z*(d*b*c-a*f)),
		(pos.x*(-b)  +    pos.y*(a*e)    +    pos.z*(d*e)   )
	]
	// M = [
	// 	[e*f, a*b*f-d*c, d*b*f+a*c],
	// 	[e*c, a*b*c+d*f, d*b*c-a*f],
	// 	[-b ,    a*e   ,    d*e   ]
	// ]
	// print(M[0])
	// print(M[1])
	// print(M[2])
	return new Vec3(R[0], R[1], R[2])
}

export function intrinsic(α, β, γ, pos, ori) {
	pos = pos.sub(ori)
	print(α,β,γ)
	α = dtr(α)
	β = dtr(β)
	γ = dtr(γ)
	// local xyz
	let a = Math.round(Math.sin(α))
	let b = Math.round(Math.sin(β))
	let c = Math.round(Math.sin(γ))
	let d = Math.round(Math.cos(α))
	let e = Math.round(Math.cos(β))
	let f = Math.round(Math.cos(γ))
	let R = [
		(pos.x*(d*e) + pos.y*(d*b*c-a*d) + pos.z*(d*b*f+a*c)),
		(pos.x*(d*c) + pos.y*(a*b*c+d*f) + pos.z*(a*b*f-d*f)),
		(pos.x*(-b)  +    pos.y*(e*c)    +    pos.z*(e*f)   )
	]
	// M = [
	// 	[d*e, d*b*c-a*d, a*b*f+a*c],
	// 	[d*c, a*b*c+d*f, a*b*f-d*c],
	// 	[ -b,    e*c,      e*f    ] 
	// ]
	// print(M[0])
	// print(M[1])
	// print(M[2])
	return new Vec3(R[0], R[1], R[2])
}