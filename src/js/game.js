import SceneMain from './scene/scene_main';
import config from './config';
//import Scene from './scene';
import DOM from './dom'

class Game {
    constructor(images) {
        this.images = images;
        this.scene = null;
        this.actions = {};
        this.keydowns = {};
        this.canvas = DOM.canvas;
        this.context = this.canvas.getContext('2d');
        this.mode = config.defaultMode;
        this.drawGetPointFlag = false;
        //events

        this.context.canvas.width = config.appWidth;
        this.context.canvas.height = config.appHeight;

        window.addEventListener('keydown', (event) => {
            console.log('keydown')
            this.keydowns[event.key] = 'down';
        })
        window.addEventListener('keyup', (event) => {
            this.keydowns[event.key] = 'up';
        })
        /*         DOM.canvas.addEventListener('touchstart', function (event) {
                    DOM.audio.play()
                    that.keydowns.touch = 'down';
                })
                DOM.canvas.addEventListener('touchend', function (event) {
                    that.keydowns.touch = 'up'
                }) */
        this.init();
    }
    static instance(...args) {
        this.i = this.i || new this(...args);
        return this.i;
    }
    drawImage(img) {
        this.context.drawImage(img.texture, img.x || 0, img.y || 0, img.w, img.h);
    }
    draw() {
        this.scene.draw();
        this.drawScore('16px Palatino', '#000', 'score: ' + config.score, 10, 20);
        this.drawGetPointFlag && this.drawScore('20px Palatino', 'red', '+100', config.appWidth / 2 - 50, this.pointY--);
    }
    drawScore(font, color, content, dx, dy) {
        this.context.save();
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(content, dx, dy);
        this.context.restore();
    }
    update() {
        this.scene.update && this.scene.update();
    }
    registerAction(key, callback) {
        this.actions[key] = callback;
    }

    run() {
        let actions = Object.keys(this.actions);
        if (config.play) { //按了开始按钮才能绘画
            for (let i = 0; i < actions.length; i++) {
                let key = actions[i];
                let status = this.keydowns[key];
                if (status === 'down') {
                    this.actions[key]('down');
                } else if (status === 'up') {
                    this.actions[key]('up');
                    this.keydowns[key] = null;
                }
            }

            // 更新位移
            this.update();
            //更新分数
            this.scoreMargin--;
            if (this.scoreMargin == 0) {
                config.score++;
                let scoreMargin = config[this.mode].scoreMargin;
                this.scoreMargin = scoreMargin;
            }
            this.point--;
            if (this.point == 550) {
                this.drawGetPointFlag = false;
            }
            if (this.point == 0) {
                if (config.audio) {
                    DOM.point.paused && DOM.point.play();
                }
                let point = config.point;
                this.point = point;
                config.score += 100;
                this.drawGetPointFlag = true;
                let pointY = config.appHeight / 2 - 50;
                this.pointY = pointY;
            }
        }

        // 擦除
        this.erase();
        // 重绘
        this.draw();
        requestNextAnimationFrame(this.run.bind(this));
    }
    erase() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    init() {
        let g = this;
        let loads = [];
        //预先载入所有图片
        let names = Object.keys(g.images);
        let l = names.length
        for (let i = 0; i < l; i++) {
            let name = names[i]; //这里要用let表示唯一性，用var会报错
            let path = g.images[name];
            let img = new Image(); //这里要用let
            img.src = path;
            img.onload = function () { //异步会导致game还没初始化好，导致var paddle = Paddle(game)报错
                //存入g.images中
                g.images[name] = img;
                //所有图片载入成功之后，运行run
                loads.push(1);
                config[name + '_height'] = img.height;
                if (loads.length == names.length) {
                    g.runWidthScene();
                }
            }
        }
    }
    textureByName(name) {
        var img = this.images[name];
        return img;
    }
    replaceScene(scene) {
        this.scene = scene;
    }
    reload() {
        this.mode = config.mode;
        //分数更新的间隔
        var scoreMargin = config[this.mode].scoreMargin;
        this.scoreMargin = scoreMargin;
        this.scene = SceneMain.new(this);
        var point = config.point;
        this.point = point;
    }
    runWidthScene() {
        //this.scene = Scene.new(this)//到这里图片已经加载好了，paddle(game)等的初始化不会报错
        this.scene = SceneMain.new(this); //初始化各种场景，地面，云朵，鸟...，调用超类Scene的new方法
        //开始运行
        requestNextAnimationFrame(this.run.bind(this));
    }
    stop(type) {
        if (type == 'hit') {
            if (config.audio) {
                DOM.hit.paused && DOM.hit.play()
            };

        } else {
            if (config.audio) {
                DOM.die.paused && DOM.die.play()
            };
        }
        config.play = false;
        DOM.canvas.style.zIndex = -1;
        DOM.buttons.style.visibility = 'visible';
        DOM.gameOver.style.visibility = 'visible';
    }
}

export default Game;