class ControlPoints {
    constructor(pos, r) {
        this.opos = this.pos = pos || $V([0, 0]);
        this.or = this.r = r || 0;
        this.transform = Matrix.I(3);
        this.calcTransform();
    }

    calcTransform() {
        let translate = $M([
            [1, 0, this.pos.e(1)],
            [0, 1, this.pos.e(2)],
            [0, 0, 1]
        ]);
        let rotation = Matrix.RotationZ(this.r);
        this.transform = translate.multiply(rotation);
        return this.transform;
    }
}

export default ControlPoints;