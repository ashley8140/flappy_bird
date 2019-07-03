export const e = function (sel) {
    return document.querySelectorAll(sel)
}

export const log = console.log.bind(console)

export const imageFromPath = function (path) {
    const img = new Image()
    img.src = path
    return img
}

export const rectIntersects = function (a, b) {
    if (b.y > a.y && b.y < a.y + a.h) {
        if (b.x < a.x + a.w && a.x < b.x + b.w) {
            return true
        }
    }
    return false
}

export const randomBetween = function (start, end) {
    const n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

export const hasClass = function (elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

export const addClass = function (elem, cls) {
    if (!hasClass(elem, cls)) {
        elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
    }
}

export const removeClass = function (elem, cls) {
    if (hasClass(elem, cls)) {
        let newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}
