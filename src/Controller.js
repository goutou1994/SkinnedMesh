class Controller {
    constructor(canvas, objects) {
        this.canvas = canvas;
        this.objects = objects;
        this.listeners = [];
        this.dragging = null;
        this.hovering = null;
        this.lastPos = [0, 0];
    }

    _testIntersect(x, y) {
        for (let o of this.objects) {
            if (o.pos[0] <= x
                && o.pos[0] + o.pos[2] >=x
                && o.pos[1] <= y
                && o.pos[1] + o.pos[3] >=y) {
                return o;
            }
        }
    }

    _getEventPosition(e) {
        return [e.offsetX, e.offsetY];
    }

    reset() {
        for (let [l, f] of this.listeners) {
            this.canvas.removeEventListener(l, f);
        }
        this.listeners = [];

        // click
        const click_f = e => {
            const o = this._testIntersect(...this._getEventPosition(e));
            o && o.callbacks.click && o.callbacks.click();
            this.dragging = null;
        };
        this.canvas.addEventListener('click', click_f);
        this.listeners.push(['click', click_f]);

        // mousedown
        const md_f = e => {
            const o = this._testIntersect(...this._getEventPosition(e));
            o && o.callbacks.mousedown && o.callbacks.mousedown();
            this.dragging = o;
        };
        this.canvas.addEventListener('mousedown', md_f);
        this.listeners.push(['mousedown', md_f]);

        // mouseup
        const mu_f = e => {
            const o = this._testIntersect(...this._getEventPosition(e));
            o && o.callbacks.mouseup && o.callbacks.mouseup();
            this.dragging = null;
        };
        this.canvas.addEventListener('mouseup', mu_f);
        this.listeners.push(['mouseup', mu_f]);

        // move
        const move_f = e => {
            let pos = this._getEventPosition(e);
            const o = this._testIntersect(...pos);
            if (!this.dragging) {
                if (this.hovering && this.hovering !== o) {
                    this.hovering.callbacks.mouseout && this.hovering.callbacks.mouseout();
                }
                if (this.hovering !== o && o) {
                    o.callbacks.mousein && o.callbacks.mousein();
                }
                this.hovering = o;
            }
            if (this.dragging) {
                this.dragging.callbacks.drag
                && this.dragging.callbacks.drag(
                    pos[0] - this.lastPos[0],
                    pos[1] - this.lastPos[1],
                    pos[0],
                    pos[1]
                );
            }
            this.lastPos = pos;
        };
        this.canvas.addEventListener('mousemove', move_f);
        this.listeners.push(['mousemove', move_f]);
    }
}

export default Controller;