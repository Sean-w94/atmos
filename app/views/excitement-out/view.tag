<excitement-out>
  <h1> Excitement </h1>
  <graph>
    <span class=thermometer style="line-height: {top()};background: {gradient()}"> 
      <span id="perc">
        { aggregate() } 
      </span>
    </span>
  </graph>
  <script> 
    require('./view')(this)
    require('./style.tag')
  </script>
</excitement-out>
