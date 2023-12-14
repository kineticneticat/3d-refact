import {Vertex, Edge, Face} from './Parts.js'
import {Vec3} from './math/Vec.js'
import {Quaternion} from './math/Quaternion.js'
import {read} from './Parse.js'

export let canvas = document.getElementById('canvas') as HTMLCanvasElement
export let ctx = canvas.getContext('2d')
export let sun = new Vec3(-1,-1,1)
export let offset = Vec3.zero
export let VertexRegistry: Vertex[] = []
export let EdgeRegistry: Edge[] = []
export let FaceRegistry: Face[] = []
let FaceOrder: [number, Vec3][] = []
// export let ObjectRegistry = []
let pi = Math.PI

enum keyCodes {
	W = 87,
	A = 65,
	S = 83,
	D = 68,

	UP = 38,
	DOWN = 40,
	LEFT = 37,
	RIGHT = 39,

	SPACE = 32,
	SHIFT = 16
}

export function AddVertex(x:number, y:number, z:number) {
	return VertexRegistry.push(new Vertex(new Vec3(x, y, z))) -1
}

export function AddEdge(a:number, b:number) {
	return EdgeRegistry.push(new Edge(a, b)) -1
}

export function AddFace(a:number, b:number, c:number) {
	let reg = FaceRegistry.push(new Face(a, b, c)) -1
	FaceOrder.push([reg, FaceRegistry[reg].centre])
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
			case keyCodes.W:
				key.W = true
				break;
			case keyCodes.A:
				key.A = true
				break;
			case keyCodes.S:
				key.S = true
				break;
			case keyCodes.D:
				key.D = true
				break;
			case keyCodes.UP:
				key.Up = true
				break;
			case keyCodes.DOWN:
				key.Down = true
				break;
			case keyCodes.LEFT:
				key.Left = true
				break;
			case keyCodes.RIGHT:
				key.Right = true
				break;
			case keyCodes.SPACE:
				key.Space = true
				break;
			case keyCodes.SHIFT:
				key.Shift = true
				break;
		}
	})
	document.addEventListener('keyup', (e) => {
		switch (e.keyCode) {
			case keyCodes.W:
				key.W = false
				break;
			case keyCodes.A:
				key.A = false
				break;
			case keyCodes.S:
				key.S = false
				break;
			case keyCodes.D:
				key.D = false
				break;
			case keyCodes.UP:
				key.Up = false
				break;
			case keyCodes.DOWN:
				key.Down = false
				break;
			case keyCodes.LEFT:
				key.Left = false
				break;
			case keyCodes.RIGHT:
				key.Right = false
				break;
			case keyCodes.SPACE:
				key.Space = false
				break;
			case keyCodes.SHIFT:
				key.Shift = false
				break;
		}
	})
	AddVertex(sun.x, sun.y, sun.z)
	
	
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
	let div = pi/64
	let rotation = Quaternion.none
	if (key.Left) {
		rotation = Quaternion.aa(Vec3.j, div).compound(rotation)
	}
	if (key.Right) {
		rotation = Quaternion.aa(Vec3.j, -div).compound(rotation)
	}
	let localI = rotation.rotate(Vec3.i)
	if (key.Up) {
		rotation = Quaternion.aa(localI, -div).compound(rotation)
	}
	if (key.Down) {
		rotation = Quaternion.aa(localI, div).compound(rotation)
	}
	

	if (!movement.isZero) {
		// console.log(movement)
		offset = offset.add(movement)
	}
	if (!rotation.isNone) {
		VertexRegistry.forEach((x) => {x.turn(rotation)})
	}
	if (!(movement.isZero && rotation.isNone)) {
		VertexRegistry.forEach((x) => {x.project()})
	}
}

let order = (a:Vec3,b:Vec3) => {
	let OA = a.sub(offset).mag
	let OB = b.sub(offset).mag
	return OB - OA
}

let draw = () => {
	FaceOrder.sort((a, b) => {return order(a[1],b[1])})
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