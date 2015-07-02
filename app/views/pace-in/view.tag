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
  <script> require('./view')(this)</script>
  <style scoped>
    label {
      font-size: 3.25em;
      width: 5em;
      display: inline-block;
      height: 1.6em;
      padding-top: .5em;
      margin-top: 1.2em;
      background: rgb(74, 144, 226);
      color: #fff;
    }
    input[type=radio] {display:none;}
    input[type=radio]:checked + label {
      background: rgb(0, 87, 162);
      

    }
    .question { margin: 0; margin-top: 0.7em; margin-bottom: -2.4em; }
  </style>
</pace-in>


