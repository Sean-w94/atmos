<excitement-in>
    <p class=question>How excited are you?</p>
    <face onclick={ fastcheck.bind(null, 'excited') }>
        <input onclick={ excited } id="r-excited" type="radio" name="excitement" value="excited">
        <label for="r-excited" class="pure-radio"><img src="assets/excited.{ext}"></label>
    </face>

    <face onclick={ fastcheck.bind(null, 'neutral') }>
        <input onclick={ neutral } id="r-neutral" type="radio" name="excitement" value="neutral">
        <label for="r-neutral" class="pure-radio"><img src="assets/neutral.{ext}"></label>
    </face>

    <face onclick={ fastcheck.bind(null, 'bored') }>
        <input onclick={ bored } id="r-bored" type="radio" name="excitement" value="bored">
        <label for="r-bored" class="pure-radio"><img src="assets/bored.{ext}"></label>
    </face>
    <script> 
      require('./view')(this)
      require('./style.tag')
    </script>

</excitement-in>


