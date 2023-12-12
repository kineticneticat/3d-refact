export class Vec3 {
	x: number
	y: number
	z: number
	constructor(x=0, y=0, z=0) {
		this.x = x
		this.y = y
		this.z = z
	}
	static get zero() {
		return new Vec3()
	}
	get mag() {
		return Math.sqrt((this.x**2) + (this.y**2) + (this.z**2))
	}
	get norm() {
		return this.div(this.mag)
	}
	get isZero() {
		return this.x == 0 && this.y == 0 && this.z == 0
	}
	static get i() {return new Vec3(1, 0, 0)}
	static get j() {return new Vec3(0, 1, 0)}
	static get k() {return new Vec3(0, 0, 1)}
	add(vec: Vec3) {
		return new Vec3(this.x+vec.x, this.y+vec.y, this.z+vec.z)
	}
	sub(vec: Vec3) {
		return new Vec3(this.x-vec.x, this.y-vec.y, this.z-vec.z)
	}
	mul(sca: number) {
		return new Vec3(this.x*sca, this.y*sca, this.z*sca)
	}
	div(sca: number) {
		return new Vec3(this.x/sca, this.y/sca, this.z/sca)
	}
	dot(vec: Vec3) {
		return (this.x*vec.x) + (this.y*vec.y) + (this.z*vec.z)
	}
	cross(vec: Vec3) {
		//pain
		let cx = this.y*vec.z - this.z*vec.y
		let cy = this.z*vec.x - this.x*vec.z
		let cz = this.x*vec.y - this.y*vec.x
		return new Vec3(cx, cy, cz)
	}
}
export class Vec2 {
	x: number
	y: number
	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}
	add(vec: Vec2) {
		return new Vec2(this.x+vec.x, this.y+vec.y)
	}
	sub(vec: Vec2) {
		return new Vec2(this.x-vec.x, this.y-vec.y)
	}
	mul(sca: number) {
		return new Vec2(this.x*sca, this.y*sca)
	}
	div(sca: number) {
		return new Vec2(this.x/sca, this.y/sca)
	}
	dot(vec: Vec2) {
		return (this.x*vec.x) + (this.y*vec.y)
	}
	xy() {
		return [this.x, this.y]
	}
}

