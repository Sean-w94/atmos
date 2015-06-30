<mood>
  <excitement>
    <p>How excited are you?</p>
    <label for="excited" class="pure-radio">
        <input onclick={ excited } id="excited" type="radio" name="optionsRadios" value="excited">
        😀
    </label>

    <label for="neutral" class="pure-radio">
        <input onclick={ neutral } id="neutral" type="radio" name="optionsRadios" value="neutral">
        😐
    </label>

    <label for="bored" class="pure-radio">
        <input onclick={ bored } id="bored" type="radio" name="optionsRadios" value="bored">
        😒
    </label>

  </excitement>
  <script> require('./view')(this)</script>
</mood>
