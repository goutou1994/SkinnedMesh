class ControlPoints {
    constructor(pos, r) {
        this.opos = this.pos = pos && $V(pos) || $V([0, 0]);
        this.or = this.r = r || 0;
        this.d = 13;
        this.updateRPos();
        this.transform = Matrix.I(3);
        this.calcTransform();
        this.active = false;
        const that = this;
        this.ctrl_o = [
            // move control point
            {
                pos: [that.x - 5, that.y - 5, 10, 10],
                callbacks: {
                    mousein() {
                        that.active = true;
                    },
                    mouseout() {
                        that.active = false;
                    },
                    drag(x, y) {
                        that.pos = that.pos.add($V([x, y]));
                        that.updateRPos();
                        that.updateControlObject();
                    }
                }
            },
            // rotate control point
            {
                pos: [that.x - 5, that.y - 5, 10, 10],
                callbacks: {
                    mousein() {
                        that.active = true;
                    },
                    mouseout() {
                        that.active = false;
                    },
                    drag(c1, c2, x, y) {
                        let polar = $V([x, y]).subtract(that.pos);
                        that.r = Math.atan(polar.e(2) / polar.e(1));
                        if (polar.e(1) < 0) that.r += Math.PI;
                        if (polar.e(1) >= 0 && polar.e(2) < 0) that.r += 2 * Math.PI;
                        that.updateRPos();
                        that.updateControlObject();
                    }
                }
            }
        ];
        this.updateControlObject();
    }

    updateRPos() {
        this.rpos = $V([
            this.x + this.d * Math.cos(this.r),
            this.y + this.d * Math.sin(this.r)
        ]);
    }

    updateControlObject() {
        this.ctrl_o[0].pos[0] = this.x - 5;
        this.ctrl_o[0].pos[1] = this.y - 5;
        this.ctrl_o[1].pos[0] = this.rx - 1;
        this.ctrl_o[1].pos[1] = this.ry - 1;
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

    get x() {
        return this.pos.e(1);
    }

    get y() {
        return this.pos.e(2);
    }

    get rx() {
        return this.rpos.e(1);
    }

    get ry() {
        return this.rpos.e(2);
    }
}

export default ControlPoints;