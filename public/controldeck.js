$(function(){
    var iosocket = io.connect();

    iosocket.on('connect', function () {
        // console.log('connected');
    });
    iosocket.on('disconnect', function() {
        // console.log('disconnected');
    });

    $(window).keydown(function(e) {
        // console.log('Sending keyboard command: '+e.keyCode);
        iosocket.send(e.keyCode);
    });

    var press = Modernizr.touch ? 'touchstart' : 'click';
    $('body').on(press,'.btn', function(e) {
        e.preventDefault();
        if ($(this).attr('data-key')) {
            // console.log('sending button command: '+$(this).attr('data-key'));
            iosocket.send($(this).attr('data-key'));
        } else if ($(this).attr('data-goto')) {
            iosocket.send('goto:'+$(this).attr('data-goto'));
        }
    });
});