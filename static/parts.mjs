import {Vec3, Vec2} from './math/Vec.mjs'
import {extrinsic, intrinsic} from './math/Rotation.mjs'
import {settings, ctx, VertexRegistry, sun, offset} from './main.mjs'
let scale = 150

export class Vertex {
	constructor(pos) {
		this.pos = pos
		this.project()
	}
	get offset() {
		return this.pos.add(offset)
	}
	project() {
		this.proj = new Vec2((this.pos.add(offset).x*scale/(this.pos.add(offset).z+scale)), (this.pos.add(offset).y*scale/(this.pos.add(offset).z+scale)))
		this.proj = this.proj.add(new Vec2(settings.w/2, settings.h/2))
	}
	draw() {
		if (this.show) {
			this.project()
			ctx.beginPath()
			ctx.arc(this.proj.x, this.proj.y, 2, 0, Math.PI*2)
			ctx.fill()
		}
	}
	get show() {
		return this.offset.z > -150
	}
	turn(rot) {
		let actual = this.pos.add(this.offset)
		let rotated = extrinsic(rot.a, rot.b, rot.y, actual, new Vec3())
		this.offset = rotated.sub(this.pos)
	}
}

export class Edge {
	constructor(a, b) {
		this.a = a
		this.b = b
	}
	draw() {
		if (VertexRegistry[this.a].show
				&& VertexRegistry[this.b].show) {
			let proja = VertexRegistry[this.a].proj
			let projb = VertexRegistry[this.b].proj
			ctx.beginPath()
			ctx.moveTo(proja.x, proja.y)
			ctx.lineTo(projb.x, projb.y)
			ctx.stroke()
		}
	}
}

export class Face {
	constructor(a,b,c) {
		this.a = a
		this.b = b
		this.c = c
		this.shade()
	}
	shade() {
		let grey = (sun.dot(this.surfaceNormal) + 1) * 255
		this.colour = `rgb(${grey}, ${grey}, ${grey})`
	}
	get surfaceNormal() {
		// norm((b-a)x(c-a))
		return VertexRegistry[this.b].pos
			.sub(VertexRegistry[this.a].pos)
			.cross(
				VertexRegistry[this.c].pos
				.sub(VertexRegistry[this.a].pos)
			).norm
	}
	get centre() {
		return VertexRegistry[this.a].offset
			.add(VertexRegistry[this.b].offset)
			.add(VertexRegistry[this.c].offset)
			.div(3)
	}
	draw() {
		// console.log(this.a.show, this.b.show, this.c.show)
		if (VertexRegistry[this.a].show 
				&& VertexRegistry[this.b].show 
				&& VertexRegistry[this.c].show) {
			ctx.fillStyle = this.colour
			let proja = VertexRegistry[this.a].proj
			let projb = VertexRegistry[this.b].proj
			let projc = VertexRegistry[this.c].proj
			ctx.beginPath()
			ctx.moveTo(proja.x, proja.y)
			ctx.lineTo(projb.x, projb.y)
			ctx.lineTo(projc.x, projc.y)
			ctx.fill()
		}
	}
}