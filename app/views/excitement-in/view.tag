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
    <script> require('./view')(this)</script>
    <style scoped>
        face {display:block;margin-top:1em;margin-bottom:1em;text-align:center;}
        label {opacity:0.5;width:9em;}
        label img {width:9em;}
        input[type=radio] {display:none;}
        input[type=radio]:checked + label {opacity:1;}
        .question { margin: 0; margin-top: 0.7em; margin-bottom: 0.1em; }
    </style>
</excitement-in>


