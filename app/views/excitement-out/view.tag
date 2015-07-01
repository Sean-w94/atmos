<excitement-out>        
  <h1> Excitement </h1>
  <graph>
    <span class=thermometer style="line-height: {top()};background: {gradient()}"> 
      <span id="perc">
        { aggregate() } 
      </span>
    </span>
  </graph>
  <script> require('./view')(this)</script>
  <style scoped>

    graph {
      display:block;
      height: 18em;
      position: relative;
    }

    #perc {font-size: 1.5em;}

    .thermometer {
      margin: 0% 0 0 50%;
      width: 1.875em;
      left: -1.875em;
      height: 14.375em;
      display: block;
      font: bold 1em/1em helvetica, arial, sans-serif;
      text-indent: 2.6em;
      background: linear-gradient(to bottom, #fff 0%, #fff 12%, #f20004 25%,#c1032d 56%,#a90329 100%);
      border-radius: 1.875em 1.875em 0 0;
      border: 0.3125em solid #4a1c03;
      border-bottom: none;
      position: absolute;
      box-shadow: inset 0 0 0 .25em #fff;
      color: #4a1c03;
      transition: line-height 200ms;
    }
     .thermometer:before {
      content: ' ';
      width: 3.25em;
      height: 3.25em;
      display: block;
      position: absolute;
      top: 13.74em;
      left: -1em;
      z-index: -1;
      background: #a90329;
      border-radius: 3.25em;
      border: .3125em solid #4a1c03;
      box-shadow: inset 0 0 0 4px #fff;
    }
     .thermometer:after {
      content: ' ';
      width: 1.375em;
      height: 0.4375em;
      display: block;
      position: absolute;
      top: 14.125em;
      left: 0.25em;
      background: #a90329;
    }


  </style>
</excitement-out>
