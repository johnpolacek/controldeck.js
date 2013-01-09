var messageHandler;
if (typeof jQuery === 'undefined') jQuery = {};

function messageHandler(message, a, b, c, d) {
    if      (message === '37')      			Flowtime.prevSection(a);
    else if (message === '38')      			Flowtime.prev(a);
    else if (message === '39')      			Flowtime.nextSection(a);
    else if (message === '40')      			Flowtime.next(a);
    else if (message === '33')                  Flowtime.gotoTop();
    else if (message === '34')                  Flowtime.gotoBottom();
    else if (message === '36')                  Flowtime.gotoHome();
    else if (message === '35')                  Flowtime.gotoEnd();
    else if (message === '27')                  Flowtime.toggleOverview(true);
    else if (message === '13')                  Flowtime.toggleOverview(false);
    else if (message === 'prev')    	  		Flowtime.prev();
    else if (message === 'prev(true)')    		Flowtime.prev(true);
    else if (message === 'next')	      		Flowtime.next();
    else if (message === 'next(true)')    		Flowtime.next(true);
    else if (message === 'prevSection')     	Flowtime.prevSection();
    else if (message === 'prevSection(true)')	Flowtime.prevSection(true);
    else if (message === 'nextSection')     	Flowtime.nextSection();
    else if (message === 'nextSection(true)')	Flowtime.nextSection(true);
    else if (message === 'overview')      		Flowtime.toggleOverview(true);
    else if (message === 'navigate')  			Flowtime.gotoPage(a,b);
}

var iosocket = io.connect();

iosocket.on('connect', function () {
    console.log('connected');
});

iosocket.on('message', function(message) {
    messageHandler(message);
});

iosocket.on('key down', function(data) {
    if (typeof Flowtime === 'undefined') {
        messageHandler("" +data.keyCode, data.shiftKey, data.altKey, data.ctrlKey, data.metaKey);
    }
});

iosocket.on('key up', function(data) {
    if (typeof Flowtime !== 'undefined') {
        messageHandler("" + data.keyCode, data.shiftKey, data.altKey, data.ctrlKey, data.metaKey);
    }
});

iosocket.on('navigate', function(data) {
    messageHandler("" + 'navigate', data.section, data.page);
});

iosocket.on('disconnect', function() {
    console.log('disconnected');
});