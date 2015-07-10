<pace-in>
  <p class=question>This talk is...</p>
  <div>
    <input onclick={ fast } id="r-fast" type="radio" name="pace" value="fast">
    <label for="r-fast" class="pure-radio"> Too Fast </label>
  </div>

  <div>
    <input onclick={ perfect } id="r-perfect" type="radio" name="pace" value="perfect">
    <label for="r-perfect" class="pure-radio"> Just Right</label>
  </div>

  <div>
    <input onclick={ slow } id="r-slow" type="radio" name="pace" value="slow">
    <label for="r-slow" class="pure-radio"> Too Slow </label>
  </div>
  <script> 
    require('./view')(this)
  </script>

</pace-in>


