

var graphics = null;
var ball;
var game;
var isInside = 0;
var draw = true;
var color = 0xFFFFFF;

window.onload = function() {
    game = new Phaser.Game(400, 400, Phaser.CANVAS, null, {
        create: create,
        update: update,
        render: render
    });

    function create() {
        graphics = game.add.graphics(0, 0);
        ball = {x: 100, y: 200, c_x: 0, c_y: 0, angle: 0, spin_angle: 0, spin: 1};
        game.input.keyboard.addCallbacks(null, onKeyDown);
        game.paused = true;
    }

    function onKeyDown (e) {

        switch(e.keyCode) {
            case 39: //right
                ball.angle += 22.5;

                break;
            case 37: //left
                ball.angle -= 22.5;

                break;
            case 38: // up
                ball.spin = 0;
                ball.spin_angle = 0;
                ball.c_x = ball.c_y = 0;
                break;
            case 40: // down
                ball.spin++;
                break;
            default:
                game.paused = !game.paused;
        }

        return;
    }

    function update() {

        var angle = ball.angle * Math.PI/180;
        var spin_angle = ( ball.spin_angle + ball.angle ) * Math.PI/180;

        var sign_x = ball.c_x < 0 ? 1 : -1;
        var sign_y = ball.c_y < 0 ? 1 : -1;

        ball.x += Math.cos(angle);
        ball.y += Math.sin(angle);

        if (ball.x > 400) {
            ball.x = 0;
        }
        if (ball.y > 400) {
            ball.y = 0;
        }
        if (ball.x < 0) {
            ball.x = 400;
        }
        if (ball.y < 0) {
            ball.y = 400;
        }


        ball.c_x += ball.spin * Math.cos(spin_angle);
        ball.c_y += ball.spin * Math.sin(spin_angle);

        if (ball.spin > 1) {
            ball.spin_angle += 5;
            if (ball.spin_angle > 360) {
                ball.spin_angle = 1;
            }
        } else {

        }

        isInside = Math.abs(Math.pow(ball.c_x, 2) + Math.pow(ball.c_y, 2));

        if (isInside >= 49) {
            //ball.c_x *= sign_x;//= 8 * sign_x * Math.cos(angle);
            //ball.c_y *= sign_y;//= 8 * sign_y * Math.sin(angle);
            //game.paused = true;
            ball.spin *= -1;
            draw = !draw;
        }
    }

    function render() {
        var x = ball.x;
        var y = ball.y;
        var c_x = ball.c_x;
        var c_y = ball.c_y;


        graphics.clear();

        graphics.beginFill(0xF70303);
        graphics.drawCircle(x, y, 10 );
        graphics.endFill();

        /*for(var i = 0; i < 50;i++) {
            graphics.beginFill(0xF70303);
            graphics.drawRect((i * 10) + 100, 200, 1, 100 );
            graphics.endFill();
        }*/

        if (!draw) {
            color = 0x000000;
            return;
        } else {
            color = 0xFFFFFF;
        }

        graphics.beginFill(color);
        graphics.drawCircle(x + c_x, y + c_y, 2 );
        graphics.endFill();
    }
};
