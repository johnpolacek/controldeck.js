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
        iosocket.emit("key down", { keyCode: e.keyCode, shiftKey: e.shiftKey, altKey: e.altKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey });
    });

    $(window).keyup(function(e) {
        // console.log('Sending keyboard command: '+e.keyCode);
        iosocket.emit("key up", { keyCode: e.keyCode, shiftKey: e.shiftKey, altKey: e.altKey, ctrlKey: e.ctrlKey, metaKey: e.metaKey });
    });

    var press = Modernizr.touch ? 'touchstart' : 'click';
    $('body').on(press,'.btn', function(e) {
        e.preventDefault();
        if ($(this).attr('data-key')) {
            // console.log('sending button command: '+$(this).attr('data-key'));
            iosocket.send($(this).attr('data-key'));
        }
        else if ($(this).attr('data-goto')) {
            iosocket.send('goto:'+$(this).attr('data-goto'));
        }
        else if ($(this).attr('data-command')) {
			iosocket.send($(this).attr('data-command'));
		}
    });

    iosocket.on('flowtime minimap complete', function(data){
        var minimap = $('<div class="minimap ft-default-progress"></div>');
        $('body').append(minimap);
        minimap.append(data.dom);
        var ftThumbs = document.querySelectorAll('.ft-page-thumb');
        $('body').on(press,'.ft-page-thumb', function(e) {
            e.preventDefault();
            for (var i = 0; i < ftThumbs.length; i++) {
                ftThumbs[i].classList.remove('actual');
            } 
            e.target.classList.add('actual');
            var s = e.target.getAttribute('data-section').replace('__', '');
            var p = e.target.getAttribute('data-page').replace('__', '');
            iosocket.emit("navigate", { section: Number(s), page: Number(p) });
            console.log("e.target", s, p);
        });

        iosocket.on('navigate', function(data){
            for (var i = 0; i < ftThumbs.length; i++) {
                ftThumbs[i].classList.remove('actual');
            }
            var actualThumb = document.querySelector('.ft-page-thumb[data-section=__' + data.section + '][data-page=__' + data.page + ']');
            actualThumb.classList.add('actual');
        });

    });
});