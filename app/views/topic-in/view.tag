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

  <script> 
    require('./view')(this)
    require('./style.tag')
  </script>
</topic-in>


