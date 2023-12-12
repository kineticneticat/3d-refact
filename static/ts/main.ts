import {Vertex, Edge, Face} from './parts.js'
import {Vec3} from './math/Vec.js'
import {Quaternion} from './math/Quaternion.js'
import {read} from './parse.js'

export let canvas = document.getElementById('canvas') as HTMLCanvasElement
export let ctx = canvas.getContext('2d')
export let sun = new Vec3(-1,-1,1)
export let offset = Vec3.zero
export let VertexRegistry: Vertex[] = []
export let EdgeRegistry: Edge[] = []
export let FaceRegistry: Face[] = []
let FaceOrder: [number, number][] = []
// export let ObjectRegistry = []
let pi = Math.PI



export function AddVertex(x:number, y:number, z:number) {
	return VertexRegistry.push(new Vertex(new Vec3(x, y, z))) -1
}
export function AddEdge(a:number, b:number) {
	return EdgeRegistry.push(new Edge(a, b)) -1
}
export function AddFace(a:number, b:number, c:number) {
	let reg = FaceRegistry.push(new Face(a, b, c)) -1
	FaceOrder.push([reg, FaceRegistry[reg].centre.mag])
	return reg
}


export let settings = {
	w:500,
	h:500,
	fps:10
}

let key = {
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
}



window.onload = () => {
	canvas.width = settings.w
	canvas.height = settings.h
	read()

	document.addEventListener('keydown', (e) => {
		// console.log(e.keyCode)
		switch (e.keyCode) {
			case 87:
				key.W = true
				break;
			case 65:
				key.A = true
				break;
			case 83:
				key.S = true
				break;
			case 68:
				key.D = true
				break;
			case 37:
				key.Left = true
				break;
			case 38:
				key.Up = true
				break;
			case 39:
				key.Right = true
				break;
			case 40:
				key.Down = true
				break;
			case 32:
				key.Space = true
				break;
			case 16:
				key.Shift = true
				break;
		}
	})
	document.addEventListener('keyup', (e) => {
		switch (e.keyCode) {
			case 87:
				key.W = false
				break;
			case 65:
				key.A = false
				break;
			case 83:
				key.S = false
				break;
			case 68:
				key.D = false
				break;
			case 37:
				key.Left = false
				break;
			case 38:
				key.Up = false
				break;
			case 39:
				key.Right = false
				break;
			case 40:
				key.Down = false
				break;
			case 32:
				key.Space = false
				break;
			case 16:
				key.Shift = false
				break;
		}
	})
	AddVertex(sun.x, sun.y, sun.z)
	FaceOrder.sort((a, b) => b[1]-a[1])
	
	tick()
}

let tick = () => {
	ctx.fillStyle = '#ddd'
	ctx.fillRect(0, 0, settings.w, settings.h)
	ctx.fillStyle = '#000'
	draw()
	move()
	// cull()

	// console.log([VertexRegistry[FaceRegistry[0].a], VertexRegistry[FaceRegistry[0].b], VertexRegistry[FaceRegistry[0].c]])
	
	// console.log(EdgeRegistr)	
	requestAnimationFrame(tick)
}

// let cull = () => {
// 	// console.log(2)
// 	VertexRegistry.forEach(x => x.cull())
// }

let move = () => {
	let movement = new Vec3()
	if (key.W) {
		movement = movement.add(new Vec3(0, 0, -1))
	}
	if (key.A) {
		movement = movement.add(new Vec3(1, 0, 0))
	}
	if (key.S) {
		movement = movement.add(new Vec3(0, 0, 1))
	}
	if (key.D) {
		movement = movement.add(new Vec3(-1, 0, 0))
	}
	if (key.Space) {
		movement = movement.add(new Vec3(0, 1, 0))
	}
	if (key.Shift) {
		movement = movement.add(new Vec3(0, -1, 0))
	}
	let div = pi/8
	let rotation = new Quaternion(1,0,0,0)
	if (key.Up) {
		rotation = (Quaternion.aa(Vec3.i, div)).hamilton(rotation)
	}
	if (key.Down) {
		rotation = (Quaternion.aa(Vec3.i, -div)).hamilton(rotation)
	}
	
	

	if (!movement.isZero) {
		// console.log(movement)
		offset = offset.add(movement)
		VertexRegistry.forEach((x) => {x.project()})
	}
	
	if (!rotation.isZero) {
		console.log("a")
		VertexRegistry.forEach((x) => {x.turn(rotation)})
	}
}

let draw = () => {
	if ((document.getElementById('vertices') as HTMLFormElement).checked) {
		VertexRegistry.forEach(x => x.draw())
	}
	if ((document.getElementById('edges') as HTMLFormElement).checked) {
		EdgeRegistry.forEach(x => x.draw())
	}
	if ((document.getElementById('faces') as HTMLFormElement).checked) {
		FaceOrder.forEach(x => FaceRegistry[x[0]].draw())
	}
}