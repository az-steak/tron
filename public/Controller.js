function Controller (surface) {
    this.keys = {};

    surface.addEventListener('keydown', onKeyDown);
    surface.addEventListener('keyup', onKeyUp);

}

function onKeyDown (event) {
    console.log(event);
}

function onKeyUp (event) {
    console.log(event);
}


return Controller;
