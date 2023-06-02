export class GestureState {
    constructor(event, component, init = false) {
        this.dx1 = 0;
        this.dy1 = 0;
        this.dx2 = 0;
        this.dy2 = 0;
        this.scale = 1;
        this.rotate = 0;
        this.dx = 0;
        this.dy = 0;
        this.event = event;
        this.component = component;
        this._init = init;
        if (!event || event.touches.length !== 2) {
            return;
        }
        let touch1 = event.touches[0];
        let touch2 = event.touches[1];
        this.dx1 = (touch1.pageX - component.baseX) * component.scaleX;
        this.dy1 = (touch1.pageY - component.baseY) * component.scaleY;
        this.dx2 = (touch2.pageX - component.baseX2) * component.scaleX;
        this.dy2 = (touch2.pageY - component.baseY2) * component.scaleY;
        if (this.dx1 * this.dx2 >= 0) {
            this.dx = (this.dx1 + this.dx2) / 2;
        }
        if (this.dy1 * this.dy2 >= 0) {
            this.dy = (this.dy1 + this.dy2) / 2;
        }
        this.scale = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)) / component.baseDis;
        this.rotate = Math.atan2(touch2.pageY - touch1.pageY, touch2.pageX - touch1.pageX) - component.baseAng;
        if (this.rotate > Math.PI) {
            this.rotate -= Math.PI * 2;
        }
        else if (this.rotate < -Math.PI) {
            this.rotate += Math.PI * 2;
        }
    }
    moved() {
        return Math.max(Math.abs(this.dx1), Math.abs(this.dx2), Math.abs(this.dy1), Math.abs(this.dy2));
    }
    pageCenter() {
        let touch1 = this.event.touches[0];
        let touch2 = this.event.touches[1];
        return [(touch1.pageX + touch2.pageX) / 2, (touch1.pageY + touch2.pageY) / 2];
    }
    clientCenter() {
        let touch1 = this.event.touches[0];
        let touch2 = this.event.touches[1];
        return [(touch1.clientX + touch2.clientX) / 2, (touch1.clientY + touch2.clientY) / 2];
    }
}
