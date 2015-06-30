<mood>
  <p>I am feeling..</p>
  <label for="bright" class="pure-radio">
      <input onclick={ bright } id="bright" type="radio" name="optionsRadios" value="bright">
      Bright
  </label>

  <label for="stormy" class="pure-radio">
      <input onclick={ stormy } id="stormy" type="radio" name="optionsRadios" value="stormy">
      Stormy
  </label>
  <script> require('./view')(this)</script>
</mood>
