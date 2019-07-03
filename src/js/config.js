let appWidth = document.querySelector('.game_box').clientWidth
let appHeight = document.querySelector('.game_box').clientHeight
const config = {
    devicePixelRatio: window.devicePixelRatio || 1,
    point: 600,
    audio: true,
    play: false,
    appWidth: appWidth,
    appHeight: appHeight,
    score: 0,
    defaultMode: 'easy',
    mode: 'easy',
    easy: {
        scoreMargin: 50,
        pipe_space: 200,
        pipe_margin: 350,
        bird_speed: 2,
        pipe_speed: 3,
        ground_speed: 2,
        cloud_speed: 2,
    },
    normal: {
        scoreMargin: 30,
        pipe_space: 190,
        pipe_margin: 350,
        bird_speed: 2,
        pipe_speed: 4,
        ground_speed: 3,
        cloud_speed: 3,
    },
    hard: {
        scoreMargin: 15,
        pipe_space: 170,
        pipe_margin: 250,
        bird_speed: 4,
        pipe_speed: 5,
        ground_speed: 6,
        cloud_speed: 5,
    },
/*     pipe_space: {
        _comment: '2根管子垂直方向的间距',
        value: 150,
        min: 100,
        max: 250,
    }, */
/*     pipe_margin: {
        _comment: '2根管子横向间距',
        value: 200,
        min: 200,
        max: 400,
    },
    bird_speed: {
        _comment: '鸟的速度',
        value: 2,
        min: 2,
        max: 10,
    },
    scene: {
        _comment: '场景帧速',
        value: 50,
        min: 10,
        max: 100,
        id: 'scene-speed'
    } */
}
export default config;