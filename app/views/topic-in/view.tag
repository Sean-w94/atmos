<topic-in>
  <p class=question>Next topic should be...</p>
  <div>
    <input onclick={ topicA } id="r-topicA" type="radio" name="topic" value="topicA">
    <label for="r-topicA" class="pure-radio topic-a"> Five Month Benchmark </label>
  </div>

  <div>
    <input onclick={ topicB } id="r-topicB" type="radio" name="topic" value="topicB">
    <label for="r-topicB" class="pure-radio topic-b"> Journey<br>So Far </label>
  </div>

  <div>
    <input onclick={ topicC } id="r-topicC" type="radio" name="topic" value="topicC">
    <label for="r-topicC" class="pure-radio topic-c"> Innovation Challenge </label>
  </div>

  <div>
    <input onclick={ topicD } id="r-topicD" type="radio" name="topic" value="topicD">
    <label for="r-topicD" class="pure-radio topic-d"> Management Decision Tool </label>
  </div>

  <div>
    <input onclick={ topicE } id="r-topicE" type="radio" name="topic" value="topicE">
    <label for="r-topicE" class="pure-radio topic-e"> What's<br>Next? </label>
  </div>

  <script> require('./view')(this)</script>
  <style scoped>
    label {
      font-size: 1.5125em;
      width: 7.3em;
      display: inline-block;
      height: 2.25em;
      padding: 0.5em;
      margin-top: 0.6125em;
      background: rgb(74, 144, 226);
      color: rgb(255, 255, 255);
      border-radius: 1.5em;
    }

    .topic-a {
      background: rgba(0, 192, 0, 0.66);
    }

    .topic-b {
      background: rgba(0, 0, 192, 0.66);
    }

    .topic-c {
      background: rgba(192, 0, 0, 0.66);
    }

    .topic-d {
      background: rgba(0, 192, 192, 0.66);
    }

    .topic-e {
      background: rgba(192, 0, 192, 0.66);
    }

    div:last-child > label {
      height: 2.3em;
    }
    input[type=radio] {display:none;}

    input[type=radio]:checked + .topic-a {
      background: rgb(0, 192, 0);
    }

    input[type=radio]:checked + .topic-b {
      background: rgb(0, 0, 192);
    }

    input[type=radio]:checked + .topic-c {
      background: rgb(192, 0, 0);
    }

    input[type=radio]:checked + .topic-d {
      background: rgb(0, 192, 192);
    }

    input[type=radio]:checked + .topic-e {
      background: rgb(192, 0, 192);
    }

    .question { margin: 0; margin-top: 0.7em; margin-bottom: 0.6em; }
  </style>
</topic-in>


