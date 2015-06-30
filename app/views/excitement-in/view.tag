<excitement-in>
    <p>How excited are you?</p>
    <div>
        <input onclick={ excited } id="excited" type="radio" name="excitement" value="excited">
        <label for="excited" class="pure-radio">😀</label>
    </div>

    <div>
        <input onclick={ neutral } id="neutral" type="radio" name="excitement" value="neutral">
        <label for="neutral" class="pure-radio">😐</label>
    </div>

    <div>
        <input onclick={ bored } id="bored" type="radio" name="excitement" value="bored">
        <label for="bored" class="pure-radio">😒</label>
    </div>
    <script> require('./view')(this)</script>
    <style scoped>
        label {font-size: 8em;opacity:0.75;}
        input[type=radio] {display:none;}
        input[type=radio]:checked + label {opacity:1;}
    </style>
</excitement-in>


