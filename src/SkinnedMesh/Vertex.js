class Vertex {
    constructor(pos) {
        this.opos = this.pos = $V(pos) || $V([0, 0]);
        this.constraints = [];
        this.offsets = [];
    }

    init() {
        this.offsets.length = this.constraints.length;
        for (let i = 0; i < this.constraints.length; i++) {
            const {cp, weight} = this.constraints[i];
            let offset = this.opos.subtract(cp.opos);
            let p2 = offset.rotate(-cp.or, Vector.Zero(2));
            this.offsets[i] = $V([p2.e(1), p2.e(2), 1]);
        }
    }

    addConstraint(cp, weight) {
        this.constraints.push({
            cp,
            weight
        })
    }

    getRealPos() {
        if (this.constraints.length < 1) {
            return this.pos;
        }
        let result = $V([0, 0]);
        let w_acc = 0;
        for (let i = 0; i < this.constraints.length; i++) {
            const {cp, weight} = this.constraints[i];
            let p3 = cp.transform.multiply(this.offsets[i]);
            result = result.add($V([p3.e(1) / p3.e(3), p3.e(2) / p3.e(3)]).x(weight));
            w_acc += weight;
        }
        this.pos = result.x(1 / w_acc);
        return this.pos;
    }

    get x() {
        return this.pos.e(1);
    }

    get y() {
        return this.pos.e(2);
    }
}

export default Vertex;