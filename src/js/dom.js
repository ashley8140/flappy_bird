import * as utils from './utils'

var DOM = {
    canvas: document.getElementById('canvas'),
    buttons: utils.e('.buttons')[0],
    startButton: document.getElementById('startButton'),
    loadingSpan: document.getElementById('loadingSpan'),
    okButton: document.getElementById('ok'),
    percent: document.getElementById('percent'),
    loadingContainer: utils.e('.loadingContainer')[0],
    progressbarDiv: document.getElementById('progressbarDiv'),
    modeButton: document.getElementById('mode'),
    beginAnimation: utils.e('.begin_animation')[0],
    firstPage: utils.e('.first_page')[0],
    gameOver: document.getElementById('game_over'),
    modeContainer: utils.e('.modeContainer')[0],
    radios: utils.e('input[name=mode]'),
    globalAudio: document.getElementById('u-globalAudio'),
    audioControl: utils.e('.audioControl')[0],
    point: document.getElementById('point'),
    die: document.getElementById('die'),
    hit: document.getElementById('hit'),
    wing: document.getElementById('wing'),
    swooshing: document.getElementById('swooshing'),
}

export default DOM