import CP from './ControlPoints';
import Vertex from './Vertex';

class SkinnedMesh {
    
    constructor(canvas, width, height) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        // this.context = canvas.getContext('2d');
        this.cp = [];
        this.v = [];
        this.init();
    }

    init() {
        this.cp.push(new CP());
        this.v.push(new Vertex($V([1, 0])));
        this.v[0].addConstraint(this.cp[0], 1);
        
    }
}

export default SkinnedMesh;