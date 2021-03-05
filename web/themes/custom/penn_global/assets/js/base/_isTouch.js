let istouch = {
    $html: ''
};

export function is_touch_device() {
    return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

export function init() {
    const _this = this;
    istouch.$html = document.querySelector('html');
    if (!_this.is_touch_device()) {
        istouch.$html.classList.add('no-touchevents');
    } else {
        istouch.$html.classList.add('touchevents');
    }
}


export default {
    init: init,
    is_touch_device: is_touch_device
};
