<compose>
  <p> beam your thoughts </p>
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
</compose>


