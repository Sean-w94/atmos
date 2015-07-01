<topic-out>        
  <h1> Topic </h1>

  <graph id="topic-graph">
    <topic-a class=bar style="height: {topicA}" val="{topicA}" title="Topic A"></topic-a>
    <topic-b class=bar style="height: {topicB}" val="{topicB}" title="Topic B"></topic-b>
    <topic-c class=bar style="height: {topicC}" val="{topicC}" title="Topic C"></topic-c>

  </graph>

  <script>require('./view')(this)</script>
  <style scoped>
    graph {
      height: 18em;
      width: 17.5em;
      border-right: 1px solid black;
      border-bottom: 1px solid black;
      margin: 0 auto;
      display:block;
      position:relative;
    }

    .bar {
      display:block;
      height: 50%;
      width: 4.25em;
      position: absolute;
      bottom: 0;
      transition: height 300ms;
    }

    .bar:before {
      display: block;
      content: attr(val);
      margin-top: -1.1em;
    }

    .bar:after {
      display: block;
      content: attr(title);
      margin-top: -1em;
      position: absolute;
      bottom: -2.4em;
      text-align: center;
      min-width: 4.15em;
      left: -1.2em;
      transform: rotate(-38deg);
      text-align: right;
      white-space: nowrap;      
    }

    topic-a {
      left: 1em;
      background: rgb(192, 0, 0);
    }

    topic-b {
      left: 6.5em;
      background: rgb(0, 192, 0);
    }

    topic-c {
      left: 12em;
      background: rgb(0, 0, 192);
    }



  </style>
</topic-out>
