import {AddVertex, AddEdge, AddFace} from './Main.js'
import {data} from './obj.js'

export function read() {
	data.forEach(x => {
		switch (x.type) {
			case 'v':
				AddVertex(x.coords[0], x.coords[1], x.coords[2])
				break;
			case 'f':
				// -- works for any polygon --
				// let pairs = []
				// for (let p=0; p<x.indices.length; p++) {
				// 	if (p == x.indices.length-1) {
				// 			pairs.push([x.indices[p], x.indices[0]])
				// 	} else {
				// 			pairs.push([x.indices[p], x.indices[p+1]])
				// 	}
				// }
				// pairs.forEach(p => {AddEdge(p[0], p[1])})

				// -- assumes triangle --
				
			
				let points = x.indices.map(Number)
				AddEdge(points[0], points[1])
				AddEdge(points[1], points[2])
				AddEdge(points[2], points[0])
				// @ts-ignore
				AddFace(...points)
				break;
		}
	})
}