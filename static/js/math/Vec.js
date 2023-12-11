export class Vec3 {
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
	add(vec) {
		return new Vec3(this.x+vec.x, this.y+vec.y, this.z+vec.z)
	}
	sub(vec) {
		return new Vec3(this.x-vec.x, this.y-vec.y, this.z-vec.z)
	}
	mul(sca) {
		return new Vec3(this.x*sca, this.y*sca, this.z*sca)
	}
	div(sca) {
		return new Vec3(this.x/sca, this.y/sca, this.z/sca)
	}
	dot(vec) {
		return (this.x*vec.x) + (this.y*vec.y) + (this.z*vec.z)
	}
	cross(vec) {
		//pain
		let cx = this.y*vec.z - this.z*vec.y
		let cy = this.z*vec.x - this.x*vec.z
		let cz = this.x*vec.y - this.y*vec.x
		return new Vec3(cx, cy, cz)
	}
}
export class Vec2 {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
	add(vec) {
		return new Vec2(this.x+vec.x, this.y+vec.y)
	}
	sub(vec) {
		return new Vec2(this.x-vec.x, this.y-vec.y)
	}
	mul(sca) {
		return new Vec2(this.x*sca, this.y*sca)
	}
	div(sca) {
		return new Vec2(this.x/sca, this.y/sca)
	}
	dot(vec) {
		return (this.x*vec.x) + (this.y*vec.y)
	}
	xy() {
		return [this.x, this.y]
	}
}

