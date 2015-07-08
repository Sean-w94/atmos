<topic-out>
  <style scoped>
    graph {
        font-size: 0.9em;
        height: 18em;
        width: 18em;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        margin: 0 auto;
        display:block;
        position:relative;
      }

      .bar {
        display:block;
        height: 50%;
        width: 3em;
        position: absolute;
        bottom: 0;
        -webkit-transition: height 300ms;
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
        position: absolute;
        bottom: -2.4em;
        width: 5em;
        left: -2.9em;
        -webkit-transform: rotate(-32deg);
        -ms-transform: rotate(-32deg);
        transform: rotate(-32deg);
        text-align: right;
        white-space: nowrap;
        color: gray;   
      }

      topic-a {
        left: .5em;
        background: rgb(0, 192, 0);
      }

      topic-b {
        left: 4em;
        background: rgb(0, 0, 192);
      }

      topic-c {
        left: 7.5em;
        background: rgb(192, 0, 0);
      }

      topic-d {
        left: 11em;
        background: rgb(0, 192, 192);

      }

      topic-e {
        left: 14.5em;
        background: rgb(192, 0, 192);
      }
  </style>
</topic-out>