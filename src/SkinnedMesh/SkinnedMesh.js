import CP from './ControlPoints';
import Vertex from './Vertex';
import Controller from '@/Controller';

class SkinnedMesh {

    constructor(canvas, width, height) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.cp = [];
        this.v = [];
        this.ctrl_o = [];
        this.ctrl = new Controller(this.canvas, this.ctrl_o);
        this.init();
    }

    init() {
        this.cp.push(new CP([50, 50]));
        this.cp.push(new CP([100, 100]));
        const count = 50;
        for (let i = 0; i < count; i++) {
            this.v.push(new Vertex([Math.random() * 500, Math.random() * 500]))
        }

        for (let v of this.v) {
            v.addConstraint(this.cp[0], .1);
            v.addConstraint(this.cp[1], 1);
            v.init();
        }

        for (let cp of this.cp) {
            cp.calcTransform();
            for (let o of cp.ctrl_o) {
                this.ctrl_o.push(o);
            }
        }
        this.ctrl.reset();

        setInterval(this.draw.bind(this), 1000 / 20);
        this.draw();
    }

    draw() {
        for (let cp of this.cp) {
            cp.calcTransform();
        }
        this.context.clearRect(0, 0, 500, 500);
        this.context.fillStyle="#00f";
        for (let v of this.v) {
            v.getRealPos();
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