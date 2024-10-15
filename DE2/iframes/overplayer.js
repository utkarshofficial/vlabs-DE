const overPlayer = {
  trial_banner: null,
  playBtn: null,
  playerNextBtn: null,
  headTitle: null,
  sliderIsPlaying: false,

  init() {
    this.trial_banner = document.querySelector(".trial_banner")
    this.playBtn = document.querySelector(".play-controls-container__play-pause-button")
    this.playerNextBtn = document.querySelector(".navigation-controls__button_next")
    this.headTitle = document.querySelector(".info-container__title div")

    this.hideTrialBanner();
    this.updateTitle();

    // * Hide player next btn
    this.playerNextBtn.style.opacity = 0

    // * slide is running state
    localStorage.setItem("isSlideEnded",false)


    // remove wher do you left 
    for(let key in localStorage){
      if(key.indexOf("ispring")!=-1){
        localStorage.removeItem(key)
        break
      }
    }
  },

  slidePlay() {
    const touchStartOn = function (el, x, y) {
      var e, err;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      try {
        e = document.createEvent("TouchEvent");
        e.initTouchEvent("touchstart", true, true);
      } catch (error) {
        err = error;
        try {
          e = document.createEvent("UIEvent");
          e.initUIEvent("touchstart", true, true);
        } catch (error) {
          err = error;
          e = document.createEvent("Event");
          e.initEvent("touchstart", true, true);
        }
      }
      e.targetTouches = [
        {
          pageX: x,
          pageY: y,
        },
      ];
      console.log(e)
      return el.dispatchEvent(e);
    };

    let btn = $(this.playBtn)
    let btnOffset = btn.offset()

    touchStartOn(this.playBtn, btnOffset.left + 5, btnOffset.top + 5)
  },
  slidePause() {},
  hideTrialBanner() {
    this.trial_banner.style.opacity = 0;
  },
  updateTitle() {
    this.headTitle.innerHTML = "Buck Converter";
  },
  isSlidePlaying() {
    let playBtnPath = document.querySelector(
      ".play-controls-container__play-pause-button svg path"
    );
    // if playing then the path.d[1] == 5 else == 7 pause
    // ! playing
    if (playBtnPath.attributes.d.value[1] == 5) {
      return true;
    }
    // ! pause
    return false;
  },
  addClassNameListener(elemId, callback) {
    var elem = document.getElementById(elemId);
    var lastClassName = elem.className;
    window.setInterval( function() {   
       var className = elem.className;
        if (className !== lastClassName) {
            callback();   
            lastClassName = className;
        }
    },10)
  },
  onPlayBtn(){
    window.setInterval(()=>{
      let pauseBtnName = 7
      let playBtnName = 5
      let btnName = this.playBtn.firstChild.firstChild.attributes.d.value[1]
      if(btnName == pauseBtnName){
        // capturing pause
        console.log(btnName,"pause")
      }else{
        // capturing play
        console.log(btnName,"Play")
      }
    },1000)
  },
  onSlidesEnd(){
    // * Capture the slides end

    var interval = window.setInterval(()=>{
      let isSlideEnded = localStorage.getItem("isSlideEnded")
      if(isSlideEnded=="false"){
        if(this.playerNextBtn.disabled == true){
          localStorage.setItem("isSlideEnded",true)
        }
      }else{
        window.clearInterval(interval)
      }

    },1000)
  },
};

overPlayer.init()
window.setTimeout(()=>{
  overPlayer.onSlidesEnd()
},2000)
// overPlayer.onPlayBtn()

