
var graphics = null;
var ball;
var game;
window.onload = function() {
    game = new Phaser.Game(1024, 768, Phaser.AUTO, null, {
        preload: preload,
        create: create
    });

    function preload() {
        game.input.keyboard.addCallbacks(this, onKeyDown);
    }

    function create() {
        graphics = game.add.graphics(0, 0);
        ball = {x: 10, y:50, c_x: 0, c_y: 0};

    }

    function onKeyDown (e) {

        var x = 0, y = 0;
        switch(e.keyCode) {
            case 40: //up
                ball.direction = 3;
                ball.angle = 90;

                break;
            case 39: //right
                ball.direction = 1;
                ball.angle = 0;

                break;
            case 38: //down
                ball.direction = 4;
                ball.angle = 270;

                break;
            case 37: //left
                ball.direction = 2;
                ball.angle = 180;

                break;
        }
        uPosition(ball, true); // erase previous

        var angle = ball.angle * Math.PI/180;
        ball.x += Math.cos(angle) * 2;
        ball.y += Math.sin(angle) * 2;

        if (ball.c_x > 17) {
            ball.c_x = -7;
        }

        if (ball.c_y > 17) {
            ball.c_y = -7;
        }

        if (ball.c_x < -17) {
            ball.c_x = 7;
        }

        if (ball.c_y < -17) {
            ball.c_y = 7;
        }

        ball.c_x += Math.cos(angle);
        ball.c_y += Math.sin(angle);

        uPosition(ball);
        return;
    }

    function uPosition(b, wipe) {
        graphics.moveTo(b.x, b.y);

        graphics.lineStyle(0);
        var color = wipe ? 0x000000 : 0xF70303;
        graphics.beginFill(color);
        graphics.drawCircle(b.x, b.y, 10 );
        graphics.endFill();

        if (ball.c_x > 7 || ball.c_y > 7 || ball.c_x < -7 || ball.c_y < -7) {
            return ;
        }

        color = wipe ? 0x000000 : 0xffffff;
        graphics.beginFill(color);
        graphics.drawCircle(b.x + b.c_x, b.y + b.c_y, 2 );
        graphics.endFill();
    }
};
