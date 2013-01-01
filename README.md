<h1>controldeck.js</h1>
<h2>Control HTML5 Presentations with node.js</h2><p>Created by <a href="http://twitter.com/johnpolacek">John Polacek</a>
<h3>Getting Started</h3>
<p>First, <a href="https://github.com/dfcb/controldeck.js/archive/master.zip">download the source</a>. Open up a terminal window, and run the app.</p>
<p class="code"><code>node app</code></p>
<p>Go to <a href="http://localhost:8080" target="_blank">http://localhost:8080</a> to view the demo page.</p>
<p>Choose one of the demos and open the slides and controller links in separate windows. Push the buttons in the controller window to control the slides.</p>

<h3>Make Your Own</h3>
<p>Create your own slide deck using one of the presentation frameworks. Embed the socket.io and controldeck-slide.js scripts at the bottom of the page, before the <code>&lt;/body&gt;</code> tag.</p>
<p class="code"><code>&lt;!-- controldeck.js --&gt;<br />
&lt;script src="/socket.io/socket.io.js">&lt;/script&gt;<br />
&lt;script src="/controldeck-slides.js">&lt;/script&gt;</code></p>
<p>Use the 2 button controller or create your own. Refer to the examples for how to do it. The code is  straightforward. The controller pages simply use Node.js and socket.io to pass along commands to the slides page.</p>

* * *
### Draftfcb Chicago
We are the development group at Draftfcb Chicago. If you want to work on big digital ideas for big brands, get in touch with us at [devrecruiting@draftfcb.com](mailto:devrecruiting@draftfcb.com).