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
      outline: 1px solid #888;
      width: 5em;
      display: inline-block;
      height: 1.6em;
      padding-top: .5em;
      margin-top: 1.2em;
      background: #E6E6E6;
    }
    input[type=radio] {display:none;}
    input[type=radio]:checked + label {
      background: #888;
      color: #E6E6E6;

    }
    .question { margin: 0; margin-top: 0.7em; margin-bottom: -2.4em; }
  </style>
</topic-in>


