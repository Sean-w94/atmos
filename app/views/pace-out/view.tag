<pace-out>        
  <h1> Pace </h1>
    <div id="tachometer">
      <div class="ii">
        <div><b><span class="num_1">0</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_2">1</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_3">2</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_4">3</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_5">4</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_6">5</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_7">6</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_8">7</span></b></div>
        <div><b></b></div>
        <div><b><span class="num_9">8</span></b></div>
      </div> 
      <div id="redline"></div>
      <div class={line: true} style="transform:rotate({rotation()})"></div>
      <div class="pin"><div class="inner"></div></div> 
    </div>

    <perc> { aggregate() } </perc>


  <script> require('./view')(this)</script>
  <style scoped>

      perc {
        display:block;
        position: relative;
        top: 221px;
        color: white;
        font-size: 1.5em;
        text-indent: .4em;
        width: 8em;
        margin: 0 auto;
      }

      @import url(http://fonts.googleapis.com/css?family=Open+Sans);

      #tachometer{
        background: #171717;
        width: 600px;
        height: 600px;
        box-shadow: inset 0px 0px 9px 3px rgba(0, 0, 0, 1);
        border: 5px solid #171717;
        border-radius: 100%;
        display: inline;
        position: absolute;
        transform: scale(0.41);
        margin-top: 1em;
        transform-origin: top center;
        margin-left: -304px;
      }


      .ii {
          position: absolute;
          width: 600px;
          height: 600px;
          z-index: 2;
          
      }
      .ii div {
          position: absolute;
          width: 600px;
          height: 600px;
          padding:4px;
          box-sizing: border-box;
      }
      .ii div b {
          position: absolute;
          display: block;
          left: 50%;
          width: 5px;
          height: 20px;
          background: #FFF;
          margin: 0 -5px 0;
          
      }
      .ii div:nth-child(2n+1) b {
          width: 10px;
          height: 35px;
          margin: 0 -5px 0;
      }

      .ii div:nth-child(1) {
          transform: rotate(240deg);
      }
      .ii div:nth-child(2) {
          transform: rotate(255deg);
      }
      .ii div:nth-child(3) {
          transform: rotate(270deg);
      }
      .ii div:nth-child(4) {
          transform: rotate(285deg);
      }
      .ii div:nth-child(5) {
          transform: rotate(300deg);
      }
      .ii div:nth-child(6) {
          transform: rotate(315deg);
      }
      .ii div:nth-child(7) {
          transform: rotate(330deg);
      }
      .ii div:nth-child(8) {
          transform: rotate(345deg);
      }
      .ii div:nth-child(9) {
          transform: rotate(0deg);/*---*/
      }
      .ii div:nth-child(10) {
          transform: rotate(15deg);
      }
      .ii div:nth-child(11) {
          transform: rotate(30deg);
      }
      .ii div:nth-child(12) {
          transform: rotate(45deg);
      }
      .ii div:nth-child(13) {
          transform: rotate(60deg);
      }
      .ii div:nth-child(14) {
          transform: rotate(75deg);
      }
      .ii div:nth-child(15) {
          transform: rotate(90deg);
      }
      .ii div:nth-child(16) {
          transform: rotate(105deg);
      }
      .ii div:nth-child(17) {
          transform: rotate(120deg);
      }


      [class^="num_"] {
          color:#FFF;
          display: block;
          position: absolute;
          width: 10px;
          font-size:40px;
          text-align: center;
          text-transform: uppercase;
          font-family: 'Open Sans', sans-serif;
          text-decoration:none;
            
      }

      .num_1 {transform: rotate(120deg); top:20px;}
      .num_2 {transform: rotate(90deg); top:13px; left:5px}
      .num_3 {transform: rotate(60deg); top:21px;}
      .num_4 {transform: rotate(30deg); top:25px;}
      .num_5 {transform: rotate(0deg);  top:30px;left:-8px}
      .num_6 {transform: rotate(330deg); top:35px;left:-10px}
      .num_7 {transform: rotate(300deg); top:35px;left:-7px;}
      .num_8 {transform: rotate(270deg);top:30px;}
      .num_9 {transform: rotate(240deg);top:30px;left:8px}

      #redline{     
        width:28px; height:150px;
        position:absolute;
        top:272px;
        right:12px;
        border-width: 22px;
        border-radius: 50%;
        border-style: solid;
        border-color:#171717 #F14134 #171717 #171717;
        transform:rotate(15deg);
        z-index:1;

      }


      .line {
        background: #F14134;
        height: 0;
        left: 50%;
        position: absolute;
        top: 50%;
        width: 0;
        transform-origin: 50% 100%;
        margin: -285px -8px 0;
        padding: 285px 8px 0;
        z-index:2;
        border-radius: 50% 50% 0 0;    
        transition: transform 1s;
        animation: maxedout;
        animation-duration: 2s;
        animation-iteration-count: 0;
      }

      .thrash {
        animation-iteration-count: infinite;    
        
      }

      .pin {
          width: 50px;
          height: 50px;
          left:50%;
          top:50%;
          margin: -25px 0 0 -25px;
          background-color: #343536;
          border-radius: 50%;
          position: absolute;
          box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.5);
          background-image: linear-gradient(to bottom, #F14134, #343536);
          z-index: 4;
      }


      .inner {
          width: 30px;
          height: 30px;
          margin: 10px auto 0;
          background-color: #343536;
          border-radius: 100%;
          box-shadow: inset 0 8px 15px 0 rgba(167, 23, 10, 0.4);
          position: relative;
      }



      @keyframes maxedout {
          1% {
              transform:rotate(116deg);
          }
          2% {
              transform:rotate(118deg);
          }
          3% {
              transform:rotate(116deg);
          }
          4% {
              transform:rotate(118deg);
          }
          5% {
              transform:rotate(116deg);
          }
          6% {
              transform:rotate(118deg);
          }
          7% {
              transform:rotate(116deg);
          }
          8% {
              transform:rotate(118deg);
          }
          9% {
              transform:rotate(116deg);
          }

          10% {
              transform:rotate(120deg);
          }

         
          11% {
              transform:rotate(116deg);
          }
          12% {
              transform:rotate(118deg);
          }
          13% {
              transform:rotate(116deg);
          }
          14% {
              transform:rotate(118deg);
          }
          15% {
              transform:rotate(116deg);
          }
          16% {
              transform:rotate(118deg);
          }
          17% {
              transform:rotate(116deg);
          }
          18% {
              transform:rotate(118deg);
          }
          19% {
              transform:rotate(116deg);
          }

          31% {
              transform:rotate(116deg);
          }
          32% {
              transform:rotate(118deg);
          }
          33% {
              transform:rotate(116deg);
          }
          34% {
              transform:rotate(118deg);
          }
          35% {
              transform:rotate(116deg);
          }
          36% {
              transform:rotate(118deg);
          }
          37% {
              transform:rotate(116deg);
          }
          38% {
              transform:rotate(118deg);
          }
          39% {
              transform:rotate(116deg);
          }

          41% {
              transform:rotate(116deg);
          }
          42% {
              transform:rotate(118deg);
          }
          43% {
              transform:rotate(116deg);
          }
          44% {
              transform:rotate(118deg);
          }
          45% {
              transform:rotate(116deg);
          }
          46% {
              transform:rotate(118deg);
          }
          47% {
              transform:rotate(116deg);
          }
          48% {
              transform:rotate(118deg);
          }
          49% {
              transform:rotate(116deg);
          }

          51% {
              transform:rotate(116deg);
          }
          52% {
              transform:rotate(118deg);
          }
          53% {
              transform:rotate(116deg);
          }
          54% {
              transform:rotate(118deg);
          }
          55% {
              transform:rotate(116deg);
          }
          56% {
              transform:rotate(118deg);
          }
          57% {
              transform:rotate(116deg);
          }
          58% {
              transform:rotate(118deg);
          }
          59% {
              transform:rotate(116deg);
          }
          
          61% {
              transform:rotate(116deg);
          }
          62% {
              transform:rotate(118deg);
          }
          63% {
              transform:rotate(116deg);
          }
          64% {
              transform:rotate(118deg);
          }
          65% {
              transform:rotate(116deg);
          }
          66% {
              transform:rotate(118deg);
          }
          67% {
              transform:rotate(116deg);
          }
          68% {
              transform:rotate(118deg);
          }
          69% {
              transform:rotate(116deg);
          }

       
         
      }


  </style>
</pace-out>
