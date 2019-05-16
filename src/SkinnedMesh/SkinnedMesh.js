import CP from './ControlPoints';
import Vertex from './Vertex';
import Controller from '@/Controller';
import ImageDisplay from '@/ImageDisplay';

class SkinnedMesh {

    constructor([canvas1, canvas2], width, height, path) {
        this.width = width;
        this.height = height;
        this.canvas = canvas1;
        this.context = canvas1.getContext('2d');
        this.cp = [];
        this.v = [];
        this.ctrl_o = [];
        this.ctrl = new Controller(this.canvas, this.ctrl_o);
        this.img = new ImageDisplay(
            canvas2.getContext('webgl2'),
            path,
            [500, 500],
            [10, 10]
        );
    }

    async init() {
        this.cp.push(new CP([150, 150]));
        this.cp.push(new CP([350, 350]));
        const count = 50;
        
        this.v = this.img.outputVertex().map(item => new Vertex(item));

        for (let v of this.v) {
            v.addConstraint(this.cp[0], 1 / Math.pow(v.opos.distanceFrom(this.cp[0].opos), 4));
            v.addConstraint(this.cp[1], 1 / Math.pow(v.opos.distanceFrom(this.cp[1].opos), 4));
            v.init();
        }

        for (let cp of this.cp) {
            cp.calcTransform();
            for (let o of cp.ctrl_o) {
                this.ctrl_o.push(o);
            }
        }
        this.ctrl.reset();
        await this.img.init();
    }

    draw() {
        for (let cp of this.cp) {
            cp.calcTransform();
        }
        this.context.clearRect(0, 0, 500, 500);
        this.context.fillStyle="#00f";
        for (let v of this.v) {
            v.getRealPos();
        }
        this.img.setVertex(this.v);
        this.img.draw();
        for (let v of this.v) {
            this.context.beginPath();
            this.context.arc(v.x, v.y, 5, 0, Math.PI * 2);
            this.context.fill();
        }
        for (let cp of this.cp) {
            this.context.fillStyle="#000";
            let radius = cp.active ? 7 : 5;
            this.context.beginPath();
            this.context.arc(cp.x, cp.y, radius, 0, Math.PI * 2);
            this.context.fill();

            this.context.fillStyle="#f00";
            radius = cp.active ? 3 : 2;
            this.context.beginPath();
            this.context.arc(cp.rx, cp.ry, radius, 0, Math.PI * 2);
            this.context.fill();
        }
    }
}

export default SkinnedMesh;