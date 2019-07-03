import RoundedRectangle from './roundedRectangle'

export default class Progressbar {
    constructor(strokeStyle, fillStyle, horizontalSizePercent, verticalSizePercent) {
        this.trough = new RoundedRectangle(strokeStyle, fillStyle, horizontalSizePercent, verticalSizePercent);

        this.SHADOW_COLOR = 'rgba(255, 255, 255, 0.5)';
        this.SHADOW_BLUR = 3;
        this.SHADOW_OFFSET_X = 2;
        this.SHADOW_OFFSET_Y = 2;

        this.percentComplete = 0;
        this.createCanvases();
        this.createDOMElement();
    }
    createCanvases() {
        this.context = document.createElement('canvas').getContext('2d');
        this.offscreen = document.createElement('canvas').getContext('2d');
    }
    createDOMElement() {
        this.domElement = document.createElement('div');
        this.domElement.appendChild(this.context.canvas);
    }
    draw(percentComplete) {
        if (percentComplete > 0) {
            this.context.drawImage(
                this.offscreen.canvas, 0, 0,
                this.offscreen.canvas.width * (percentComplete / 100),
                this.offscreen.canvas.height, 0, 0,
                this.offscreen.canvas.width * (percentComplete / 100),
                this.offscreen.canvas.height
            )
        }
    }
    erase() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    }
    appendTo(element) {
        element.appendChild(this.domElement);
        this.domElement.style.width = element.offsetWidth + 'px';
        this.domElement.style.height = element.offsetHeight + 'px';
        this.resize();
        this.trough.resize(element.offsetWidth, element.offsetHeight);
        this.trough.draw(this.offscreen);
    }
    resize() {
        var domElementParent = this.domElement.parentNode,
            w = domElementParent.offsetWidth,
            h = domElementParent.offsetHeight;
        this.setCanvasSize();
        this.context.canvas.width = w;
        this.context.canvas.height = h;
        this.offscreen.canvas.width = w;
        this.offscreen.canvas.height = h;

    }
    setCanvasSize() {
        var domElementParent = this.domElement.parentNode;
        this.context.canvas.width = domElementParent.offsetWidth;
        this.context.canvas.height = domElementParent.offsetHeight;
    }
}