<pace-out>        
  <h1> Pace </h1>
    <div id="tachometer">
      <div class="ii">
        <div><b><span class="num_1">0</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_2">1</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_3">2</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_4">3</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_5">4</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_6">5</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_7">6</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_8">7</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_9">8</span></b></div>
      </div> 
      <div id="redline"></div>
      <div class='line' style="{prefix}transform:rotate({rotation()})"></div>
      <div class="pin"><div class="inner"></div></div> 
    </div>

    <perc> { aggregate() } </perc>

  <script> 
    require('./view')(this)
    require('./style.tag')
  </script>

</pace-out>
