<ctrl>

  <right onclick={next}>☞</right>
  <left onclick={prev}>☜</left>
  
  <script> require('./view')(this) </script>
  <style scoped>
    

    right, left {
      display:block;
      font-size: 5em;
      cursor:pointer;
      position:relative;


    }
    left {float:left;left:.3em;}
    right {float:right;right:.3em;}

  </style>
</ctrl>