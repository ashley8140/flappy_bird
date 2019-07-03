import '../css/reset.css'
import '../css/index.css'
import '../css/flappy_bird.css'

import config from './config'
import main from './scene/main'
import * as utils from './utils'
import DOM from './dom'
import Progressbar from './progressbar'
import Audio from './audio'
import './requestNextAnimationFrame'
main();

var handle = {
    init: function () {
        let progressbar = new Progressbar('rgba(0,0,0,0.2)', 'rgb(171, 201, 62)', 90, 10),
            percentComplete = 0;
        progressbar.appendTo(DOM.progressbarDiv);

        const loadProgressBarShow = () => {
            DOM.gameOver.style.visibility = 'hidden';
            DOM.loadingContainer.style.visibility = 'visible';
            DOM.buttons.style.visibility = 'hidden';
            DOM.percent.style.display = 'block';
            loadProgressBar();
        }
        const loadProgressBar = () => {
            percentComplete += 3.0;
            if (percentComplete > 100) {
                DOM.percent.innerHTML = '100%';
                percentComplete = 0;
                DOM.loadingContainer.style.visibility = 'hidden';
                config.play = true;
                config.score = 0;
                config.game.reload();
                DOM.canvas.style.zIndex = 1000;
            } else {
                DOM.percent.innerHTML = percentComplete + '%';
                progressbar.erase();
                progressbar.draw(percentComplete);
                requestNextAnimationFrame(loadProgressBar);
            }
        }
        setTimeout(() => {
            utils.addClass(DOM.beginAnimation, 'z-viewArea');
        }, 0)
        setTimeout(() => {
            utils.addClass(DOM.firstPage, 'none');
        }, 2000)
        setTimeout(() => {
            DOM.canvas.style.display = 'block';
            DOM.buttons.style.visibility = 'visible';
            DOM.globalAudio.style.display = 'block';
            DOM.startButton.addEventListener('click', loadProgressBarShow)
            DOM.modeButton.addEventListener('click', chooseModeShow)
            DOM.okButton.addEventListener('click', showButton)
        }, 3000)

        const chooseModeShow = () => {
            DOM.buttons.style.visibility = 'hidden';
            DOM.modeContainer.style.visibility = 'visible';
        }

        const showButton = () => {
            DOM.buttons.style.visibility = 'visible';
            DOM.modeContainer.style.visibility = 'hidden';
            config.mode = getMode();
        }

        const getMode = () => {
            let radios = DOM.radios;
            let l = radios.length;
     
            for (let i = 0; i < l; i++) {
                if (radios[i].checked) {
                    return radios[i].value
                }
            }
        }
    }
}

handle.init();
var audio = new Audio();