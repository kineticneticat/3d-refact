import { AddVertex, AddEdge, AddFace } from './main.js';
import { data } from './obj.js';
export function read() {
    data.forEach(function (x) {
        switch (x.type) {
            case 'v':
                AddVertex(x.coords[0], x.coords[1], x.coords[2]);
                break;
            case 'f':
                var points = x.indices.map(Number);
                AddEdge(points[0], points[1]);
                AddEdge(points[1], points[2]);
                AddEdge(points[2], points[0]);
                AddFace.apply(void 0, points);
                break;
        }
    });
}
//# sourceMappingURL=parse.js.map