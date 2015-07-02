<topic-in>
  <p class=question>Next topic should be...</p>
  <div>
    <input onclick={ topicA } id="r-topicA" type="radio" name="topic" value="topicA">
    <label for="r-topicA" class="pure-radio"> Topic A </label>
  </div>

  <div>
    <input onclick={ topicB } id="r-topicB" type="radio" name="topic" value="topicB">
    <label for="r-topicB" class="pure-radio"> Topic B </label>
  </div>

  <div>
    <input onclick={ topicC } id="r-topicC" type="radio" name="topic" value="topicC">
    <label for="r-topicC" class="pure-radio"> Topic C </label>
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
</topic-in>


