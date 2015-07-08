<pace-out>
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

      #tachometer{
        background: #171717;
        width: 600px;
        height: 600px;
        box-shadow: inset 0px 0px 9px 3px rgba(0, 0, 0, 1);
        border: 5px solid #171717;
        border-radius: 100%;
        display: inline;
        position: absolute;
        -webkit-transform: scale(0.41);
            -ms-transform: scale(0.41);
                transform: scale(0.41);
        margin-top: 1em;
        -webkit-transform-origin: top center;
            -ms-transform-origin: top center;
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
          -webkit-transform: rotate(240deg);
              -ms-transform: rotate(240deg);
                  transform: rotate(240deg);
      }
      .ii div:nth-child(2) {
          -webkit-transform: rotate(255deg);
              -ms-transform: rotate(255deg);
                  transform: rotate(255deg);
      }
      .ii div:nth-child(3) {
          -webkit-transform: rotate(270deg);
              -ms-transform: rotate(270deg);
                  transform: rotate(270deg);
      }
      .ii div:nth-child(4) {
          -webkit-transform: rotate(285deg);
              -ms-transform: rotate(285deg);
                  transform: rotate(285deg);
      }
      .ii div:nth-child(5) {
          -webkit-transform: rotate(300deg);
              -ms-transform: rotate(300deg);
                  transform: rotate(300deg);
      }
      .ii div:nth-child(6) {
          -webkit-transform: rotate(315deg);
              -ms-transform: rotate(315deg);
                  transform: rotate(315deg);
      }
      .ii div:nth-child(7) {
          -webkit-transform: rotate(330deg);
              -ms-transform: rotate(330deg);
                  transform: rotate(330deg);
      }
      .ii div:nth-child(8) {
          -webkit-transform: rotate(345deg);
              -ms-transform: rotate(345deg);
                  transform: rotate(345deg);
      }
      .ii div:nth-child(9) {
          -webkit-transform: rotate(0deg);
              -ms-transform: rotate(0deg);
                  transform: rotate(0deg);
      }
      .ii div:nth-child(10) {
          -webkit-transform: rotate(15deg);
              -ms-transform: rotate(15deg);
                  transform: rotate(15deg);
      }
      .ii div:nth-child(11) {
          -webkit-transform: rotate(30deg);
              -ms-transform: rotate(30deg);
                  transform: rotate(30deg);
      }
      .ii div:nth-child(12) {
          -webkit-transform: rotate(45deg);
              -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
      }
      .ii div:nth-child(13) {
          -webkit-transform: rotate(60deg);
              -ms-transform: rotate(60deg);
                  transform: rotate(60deg);
      }
      .ii div:nth-child(14) {
          -webkit-transform: rotate(75deg);
              -ms-transform: rotate(75deg);
                  transform: rotate(75deg);
      }
      .ii div:nth-child(15) {
          -webkit-transform: rotate(90deg);
              -ms-transform: rotate(90deg);
                  transform: rotate(90deg);
      }
      .ii div:nth-child(16) {
          -webkit-transform: rotate(105deg);
              -ms-transform: rotate(105deg);
                  transform: rotate(105deg);
      }
      .ii div:nth-child(17) {
          -webkit-transform: rotate(120deg);
              -ms-transform: rotate(120deg);
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
          text-decoration:none;
            
      }

      .num_1 {-webkit-transform: rotate(120deg);-ms-transform: rotate(120deg);transform: rotate(120deg); top:22px;}
      .num_2 {-webkit-transform: rotate(90deg);-ms-transform: rotate(90deg);transform: rotate(90deg); top:15px; left:4px}
      .num_3 {-webkit-transform: rotate(60deg);-ms-transform: rotate(60deg);transform: rotate(60deg); top:23px;}
      .num_4 {-webkit-transform: rotate(30deg);-ms-transform: rotate(30deg);transform: rotate(30deg); top:27px;}
      .num_5 {-webkit-transform: rotate(0deg);-ms-transform: rotate(0deg);transform: rotate(0deg);  top:32px;left:-7px}
      .num_6 {-webkit-transform: rotate(330deg);-ms-transform: rotate(330deg);transform: rotate(330deg); top:37px;left:-9px}
      .num_7 {-webkit-transform: rotate(300deg);-ms-transform: rotate(300deg);transform: rotate(300deg); top:37px;left:-6px;}
      .num_8 {-webkit-transform: rotate(270deg);-ms-transform: rotate(270deg);transform: rotate(270deg);top:32px;}
      .num_9 {-webkit-transform: rotate(240deg);-ms-transform: rotate(240deg);transform: rotate(240deg);top:32px;left:7px}

      #redline{     
        width:28px; height:150px;
        position:absolute;
        top:272px;
        right:12px;
        border-width: 22px;
        border-radius: 50%;
        border-style: solid;
        border-color:#171717 #F14134 #171717 #171717;
        -webkit-transform:rotate(15deg);
            -ms-transform:rotate(15deg);
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
        -webkit-transform-origin: 50% 100%;
            -ms-transform-origin: 50% 100%;
                transform-origin: 50% 100%;
        margin: -285px -8px 0;
        padding: 285px 8px 0;
        z-index:2;
        border-radius: 50% 50% 0 0;    
        -webkit-transition: -webkit-transform 1s;    
                transition: transform 1s;
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
          background-image: -webkit-linear-gradient(top, #F14134, #343536);
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

  </style>
</pace-out>