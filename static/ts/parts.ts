import {Vec3, Vec2} from './math/Vec.js'
import {settings, ctx, VertexRegistry, sun, offset} from './Main.js'
import { Quaternion } from './math/Quaternion.js'
let scale = 150

export class Vertex {
	local: Vec3
	proj: Vec2
	constructor(local: Vec3) {
		this.local = local
		this.project()
	}
	get global() {
		return this.local.add(offset)
	}
	project() {
		this.proj = new Vec2((this.global.x*scale/(this.global.z+scale)), (this.global.y*scale/(this.global.z+scale)))
	}
	get projo() {
		return this.proj.add(new Vec2(settings.w/2, settings.h/2))
	}
	draw() {
		if (this.show) {
			ctx.beginPath()
			ctx.arc(this.projo.x, this.projo.y, 2, 0, Math.PI*2)
			ctx.fill()
		}
	}
	get show() {
		return this.global.z > -150
	}
	turn(rot: Quaternion) {
		let temp = this.local.sub(offset)
		temp = rot.rotate(temp)
		this.local = temp.add(offset)
	}
}

export class Edge {
	a: number
	b: number
	constructor(a: number, b: number) {
		this.a = a
		this.b = b
	}
	draw() {
		if (VertexRegistry[this.a].show
				&& VertexRegistry[this.b].show) {
			let proja = VertexRegistry[this.a].projo
			let projb = VertexRegistry[this.b].projo
			ctx.beginPath()
			ctx.moveTo(proja.x, proja.y)
			ctx.lineTo(projb.x, projb.y)
			ctx.stroke()
		}
	}
}

export class Face {
	a: number
	b: number
	c: number
	colour: string
	constructor(a: number,b: number,c: number) {
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
		return VertexRegistry[this.b].local
			.sub(VertexRegistry[this.a].local)
			.cross(
				VertexRegistry[this.c].local
				.sub(VertexRegistry[this.a].local)
			).norm
	}
	get centre() {
		return VertexRegistry[this.a].local
			.add(VertexRegistry[this.b].local)
			.add(VertexRegistry[this.c].local)
			.div(3)
	}
	get show() {return VertexRegistry[this.a].show 
		&& VertexRegistry[this.b].show 
		&& VertexRegistry[this.c].show}
	draw() {
		// console.log(this.a.show, this.b.show, this.c.show)
		if (this.show) {
			ctx.fillStyle = this.colour
			let proja = VertexRegistry[this.a].projo
			let projb = VertexRegistry[this.b].projo
			let projc = VertexRegistry[this.c].projo
			ctx.beginPath()
			ctx.moveTo(proja.x, proja.y)
			ctx.lineTo(projb.x, projb.y)
			ctx.lineTo(projc.x, projc.y)
			ctx.fill()
		
			// draw normal
			if ((document.getElementById("snorm") as HTMLInputElement).checked) {
				let A = new Vertex(this.centre)
				let B = new Vertex(this.centre.add(this.surfaceNormal))
				let b = B.local.norm.mul(255*4)

				ctx.strokeStyle = `rgb(${b.x}, ${b.y}, ${b.z})`
				ctx.beginPath()
				canvas_arrow(ctx, A.projo, B.projo)
				ctx.stroke()
			}
		}
	}
}

function canvas_arrow(context:CanvasRenderingContext2D, from:Vec2, to:Vec2) {
	var headlen = 5; // length of head in pixels
	var d = to.sub(from)
	var angle = Math.atan2(d.y, d.x);
	context.moveTo(from.x, from.y);
	context.lineTo(to.x, to.y);
	context.lineTo(to.x - headlen * Math.cos(angle - Math.PI / 6), to.y - headlen * Math.sin(angle - Math.PI / 6));
	context.moveTo(to.x, to.y);
	context.lineTo(to.x - headlen * Math.cos(angle + Math.PI / 6), to.y - headlen * Math.sin(angle + Math.PI / 6));
  }
  