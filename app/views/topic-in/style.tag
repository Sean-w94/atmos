<topic-in>
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