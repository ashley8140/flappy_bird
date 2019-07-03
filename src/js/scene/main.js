import Game from '../game';
import config from '../config'
export default () => {
    const images = {
        bird: '/static/img/bird.png',
        flappy_bg: '/static/img/1.jpg',
        ground: '/static/img/ground.png',
        pipe: '/static/img/tube2.png',
        cloud1: '/static/img/cloud1.png',
        cloud2: '/static/img/cloud2.png',
    }
    const game = Game.instance(images)
    config.game = game
}