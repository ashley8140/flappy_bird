import config from './config'

class Animation {
    constructor(game) {
        this.game = game
        this.animations = {
            bird: [],
        }
        for (var i = 0; i < 3; i++) {
            var name = `bird`
            var t = game.textureByName(name)
            this.animations.bird.push(t)
        }
        this.animationName = 'bird'
        this.texture = this.frames()[0]
        this.x = 100
        this.y = 100
        this.sy = 0
        this.sx = 0
        this.sW = 35
        this.sH = 40
        this.w = 35
        this.h = 40
        this.frameIndex = 0
        this.frameCount = 15
        this.flipX = false
        this.rotation = 0
        //重力和加速度
        this.gy = 10
        this.vy = 0
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    collide(p) {

    }
    update() {
        //更新受力
        this.y += this.vy
        this.vy += this.gy * 0.02
        var h = config.appHeight - config.bird_height - config.ground_height - 2
        if (this.y > h) {
            this.y = h
            this.game.stop()
            return
        }
        //更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        this.frameCount--
            if (this.frameCount === 0) {
                this.frameCount = 5
                this.frameIndex = (this.frameIndex + 1) % this.frames().length
                this.texture = this.frames()[this.frameIndex]
                this.sx = 0 + this.frameIndex * 36
            }
    }
    draw() {
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2) //把旋转中心点和canvas原点调到元素中间
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, this.sx, this.sy, this.sW, this.sH, 0, 0, this.w, this.h)
        context.restore()
    }
    move(x, keyStatus) {
        this.flipX = (x < 0)
        this.x += x
    }
    jump(keyStatus) {
        this.vy = -5
        this.rotation = -45
    }
    changeAnimation(name) {
        this.animationName = name
    }
}

export default Animation;