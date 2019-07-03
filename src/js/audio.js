import * as utils from './utils'
import DOM from './dom'
import config from './config'
export default class Audio {
    constructor() {
        this.init()
    }
    init() {
        var audioParent = document.getElementById('u-globalAudio');
        audioParent.addEventListener('click', toggleAudio)
        function toggleAudio() {
            if (utils.hasClass(audioParent, 'close')) {
                DOM.audioControl.innerHTML = '音效开';
                utils.removeClass(audioParent, 'close');
                config.audio = true;
            } else {
                utils.addClass(audioParent, 'close');
                DOM.audioControl.innerHTML = '音效关';
                config.audio = false;
            }
        }
    }
}