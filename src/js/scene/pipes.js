import Img from '../image'
import config from '../config'
import * as utils from '../utils'

export default class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.columsOfPipe = 3
        this.pipeSpace = config[this.game.mode].pipe_space
        this.pipeMargin = config[this.game.mode].pipe_margin
        this.pipeSpeed = config[this.game.mode].pipe_speed
        // 管子高320，地112
        this.randomBetween = config.appHeight - config.ground_height - this.pipeSpace
        if (this.randomBetween > config.pipe_height && this.randomBetween < config.pipe_height * 2) {
            this.minBetween = this.randomBetween - config.pipe_height * 2 + 10
            this.maxBetween = -10
        } else if (this.randomBetween < config.pipe_height) {
            this.minBetween = -config.pipe_height + 10
            this.maxBetween = this.randomBetween - config.pipe_height -10
        }

        for (var i = 0; i < 3; i++) {
            var p1 = Img.new(game, 'pipe')
            p1.flipY = true
            p1.x = 800 + i * this.pipeMargin
            var p2 = Img.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = utils.randomBetween(this.minBetween, this.maxBetween)
        p2.y = p1.y + p1.h + this.pipeSpace
    }

    update() {
        for (var i = 0; i < this.pipes.length; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i + 1]
            p1.x -= this.pipeSpeed
            p2.x -= this.pipeSpeed
            if (p1.x < -100) {
                p1.x += this.pipeMargin * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.pipeMargin * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2) //把旋转中心点和canvas原点调到元素中间
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0, p.w, p.h)
            context.restore()
        }
    }
}