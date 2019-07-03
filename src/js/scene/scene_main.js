import Scene from '../scene'
import Img from '../image'
import Animation from '../animation'
import config from '../config'
import * as utils from '../utils'
import Pipes from './pipes'
import DOM from '../dom'
class SceneMain extends Scene {
    constructor(game) {
        super(game)
        this.skipCount = 9
        // 添加背景
        var bg = Img.new(game, 'flappy_bg')
        bg.w = config.appWidth
        bg.h = config.appHeight
        this.addElement(bg)
        // 添加云朵
        this.cloudSpeed = config[this.game.mode].cloud_speed
        var cloud1 = Img.new(game, 'cloud1')
        var cloud2 = Img.new(game, 'cloud2')
        this.clouds = []
        cloud1.x = 0
        cloud1.y = -100
        cloud2.x = cloud1.w + 100
        cloud2.y = -100
        this.clouds.push(cloud1)
        this.clouds.push(cloud2)
        this.addElement(cloud1)
        this.addElement(cloud2)
        // 添加鸟
        var b = Animation.new(game)
        b.birdSpeed = config[this.game.mode].bird_speed
        this.bird = b
        this.addElement(b)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 添加循环移动的地面
        this.groundSpeed = config[this.game.mode].ground_speed
        this.grounds = []
        for (var i = 0; i < 2; i++) {
            var g = Img.new(game, 'ground')
            g.x = i * 313
            g.y = config.appHeight - g.h
            this.addElement(g)
            this.grounds.push(g)
        }
        this.setupInputs()
    }

    collide(a, b) {
        return utils.rectIntersects(a, b) || utils.rectIntersects(b, a)
    }
    update() {
        // 检测水管和鸟是否相撞
        for (var p of this.pipe.pipes) {
            if (this.collide(this.bird, p)) {
                this.bird.y += this.bird.vy
                this.bird.vy += this.bird.gy * 0.02
                // bird 26 地面 112
                var h = config.appHeight - config.bird_height - config.ground_height - 7
                if (this.bird.y > h) {
                    this.bird.y = h
                }
                if (this.bird.rotation < 90) {
                    this.bird.rotation += 5
                } else {
                    this.game.stop('hit')
                }
                return false
            }
        }
        // 没撞继续更新
        super.update()
        // 地面更新
        this.skipCount--;
        var offset = -this.groundSpeed
        if (this.skipCount === 0) {
            this.skipCount = 9
            offset = -(offset * 8)
        }
        for (var i = 0; i < 2; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
        // 云朵更新
        for (var i = 0; i < 2; i += 2) {
            var c1 = this.clouds[i]
            var c2 = this.clouds[i + 1]
            c1.x -= this.cloudSpeed
            c2.x -= this.cloudSpeed
            if (c1.x < -c1.w) {
                c1.x = c2.w + 100
            }
            if (c2.x < -c2.w) {
                c2.x = c1.w + 100
            }
        }
    }
    setupInputs() {
        var b = this.bird
        // 移动端
        /*       this.game.registerAction('touch', function (keyStatus) {
                  if (config.audio) {
                      DOM.audio.src = config.voice.wing
                      DOM.audio.paused && DOM.audio.play()
                  }
                  b.jump(keyStatus)
              }) */
        DOM.canvas.addEventListener('touchstart', function () {
            if (config.play) {
                if (config.audio) {
                    DOM.wing.paused && DOM.wing.play()
                }
                b.jump()
            }
        })
        // pc端
        this.game.registerAction('a', function (keyStatus) {
            config.audio && DOM.swooshing.paused && DOM.swooshing.play()
            b.move(-b.birdSpeed, keyStatus)
        })
        //向前
        this.game.registerAction('d', function (keyStatus) {
            config.audio && DOM.swooshing.paused && DOM.swooshing.play()
            b.move(b.birdSpeed, keyStatus)
        })
        //飞行
        this.game.registerAction('j', function (keyStatus) {
            config.audio && DOM.wing.paused && DOM.wing.play()
            b.jump(keyStatus)
        })
    }
}

export default SceneMain;