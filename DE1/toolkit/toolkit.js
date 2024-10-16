import {Scenes} from '../js/Libs.js'

// Define the function
// to screenshot the div
const Download = {
  btnDownload: null,
  btnMute: null,
  isMobileUser: false,
  isSpinnerVisible: false,
  btnDownloadBlinkAnime: null,
  isBtnDownloadClicked: false,
  mainContainerHeight: 638,
  spinnerTimeoutSeconds: 2000, 
  checkForStepEndIntervalId: null,
  previousRealCurrentStep: null,
  // 1 step aage
  // removeDownloadFromTheseSteps: [],
  addDownloadToTheseSteps: [],
  init() {
    this.setOnClicks();
    this.showTookitForCurrentStep();
    this.setBtnDownloadBlink();
    this.checkForStepEnd();
    // TODO UNCOMMENT
    // this.stopImageDrag();
    this.disableRightClick();
    this.setBtnMuteOnClick();
    this.detectMobileUser();
    this.detectZoomLevel()
    // TODO UNCOMMENT
    // this.setHeightOfMainContainerAuto();
  },
  setOnClicks() {
    this.btnDownload = document.querySelector(".btn-download-pdf");
    this.btnMute = document.querySelector(".btn-mute");

    this.btnDownload.onclick = this.capture;
  },
  capture() {
    window.print();
    Download.setBlinkArrowYellow(-1)
  },
  showTookitForCurrentStep() {
    $(".toolkit").hide();

    let intervalForCheck = null;
    const checkForCurrentStepChange = () => {
      // ! don't try to understand (this is working)
      // * add download to these
      if (this.addDownloadToTheseSteps.indexOf(Scenes.realCurrentStep) != -1) {
        // clearInterval(intervalForCheck)
        $(".toolkit").show("slow");
        $(".main-window").removeClass("border-right-radius");
      } else {
        $(".toolkit").hide("slow");
        $(".main-window").addClass("border-right-radius");
      }
    };

    intervalForCheck = setInterval(() => {
      checkForCurrentStepChange();
    }, 1000);
  },
  checkForStepEnd() {
    if(this.checkForStepEndIntervalId != null){
      return
    }
    
    this.checkForStepEndIntervalId = setInterval(() => {
      if(this.previousRealCurrentStep == Scenes.realCurrentStep){
        return
      }
      if (
        this.addDownloadToTheseSteps.indexOf(Scenes.realCurrentStep) != -1 &&
        !isRunning
      ) {
        // * For running it only one time
        this.setBlinkArrowYellow(true, 12, 495).play();
        this.btnDownloadBlinkAnime.play();
        this.previousRealCurrentStep = Scenes.realCurrentStep
      }

    }, 1000);
  },
  playDownloadButtonAnime(){
     // ! for remoging check for step end
     if(!this.checkForStepEndIntervalId){
      clearInterval(this.checkForStepEndIntervalId)
     }
     
     // * For running it only one time
     this.setBlinkArrowYellow(true, 12, 495).play();
     this.btnDownloadBlinkAnime.play();
     setTimeout(() => {
      this.setBlinkArrowYellow(-1)
     }, 4000);
  },
  setBlinkArrowYellow(
    isX = true,
    left = null,
    top = null,
    height = 30,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom(".blinkArrowYellow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  },
  setBtnDownloadBlink() {
    this.btnDownloadBlinkAnime = anime({
      targets: this.btnDownload,
      autoplay: false,
      scale: [1, 1.2],
      backgroundColor: ["#ffdbc3", "#fff000"],
      loop: 4,
      duration: 1000,
      direction: 'alternate',
      complete(anim) {
        anim.reset();
      },
    });
  },
  stopImageDrag() {
    $("img").on("dragstart", function (event) {
      event.preventDefault();
    });
  },
  disableRightClick() {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  },
  setBtnMuteOnClick() {
    const btn_mute_old_functionality = () => {
      this.btnMute.onclick;
    };
    this.btnMute.onclick = () => {
      btn_mute_old_functionality();
      window.speechSynthesis.cancel();
    };
  },
  detectMobileUser() {
    let ratio = window.innerWidth / window.innerHeight;
    if (ratio <= 1) {
      this.isMobileUser = true;
    }
    // alert(`h: ${window.innerHeight}\nw: ${window.innerWidth}`)
  },
  // ! set main-container height according to display
  setHeightOfMainContainerAuto() {
    // ! for mobile resising using width
    if (this.isMobileUser) {
      return;
    }
    const windowInnerHeight = parseFloat(window.innerHeight);
    const mainContainerHeight = this.mainContainerHeight
    let scalePercent = windowInnerHeight / mainContainerHeight;
    let translateYValue =
      (windowInnerHeight - mainContainerHeight) / 2 / scalePercent;

    // ! scale maxed up to 2x
    if(scalePercent > 2){
      scalePercent = 2
      translateYValue = 160.4
    }

    // alert(scalePercent)
    document.querySelector(
      ".main-container"
    ).style.transform = `scale(${scalePercent}) translateY(${translateYValue}px)`;
  },
  toggleSpinner() {
    $(".main-spinner").show();
    $(".main-container").hide();

    setTimeout(() => {
      $(".main-container").show("slow");
      $(".main-spinner").hide("slow");
    }, this.spinnerTimeoutSeconds);
  },
  detectZoomLevel() {
    var screenCssPixelRatio = (window.outerWidth - 8) / window.innerWidth;
    let zoomLevel = ""
    if (screenCssPixelRatio >= 0.46 && screenCssPixelRatio <= 0.54) {
      zoomLevel = "-4";
    } else if (screenCssPixelRatio <= 0.64) {
      zoomLevel = "-3";
    } else if (screenCssPixelRatio <= 0.76) {
      zoomLevel = "-2";
    } else if (screenCssPixelRatio <= 0.92) {
      zoomLevel = "-1";
    } else if (screenCssPixelRatio <= 1.1) {
      zoomLevel = "0";
    } else if (screenCssPixelRatio <= 1.32) {
      zoomLevel = "1";
    } else if (screenCssPixelRatio <= 1.58) {
      zoomLevel = "2";
    } else if (screenCssPixelRatio <= 1.9) {
      zoomLevel = "3";
    } else if (screenCssPixelRatio <= 2.28) {
      zoomLevel = "4";
    } else if (screenCssPixelRatio <= 2.7) {
      zoomLevel = "5";
    } else {
      zoomLevel = "unknown";
    }
    //! if zoom not 100% just show message warning
    if(zoomLevel != "0" && !this.isMobileUser){
      $(".main-spinner .text").show();
      this.spinnerTimeoutSeconds = 5000
    }
    if(this.isMobileUser){
      $(".main-spinner .text").show();
      $(".main-spinner .text").html("For better user experience use <br><span>🖥️ Desktop Site</span> and");
      this.spinnerTimeoutSeconds = 5000
    }
    // alert(zoomLevel)
  },
};

export default Download
// * image converter
// capture() {
//   let div = document.querySelector(".main-container");

//   // Use the html2canvas
//   // function to take a screenshot
//   // and append it
//   // to the output div
//   html2canvas(div).then(function (canvas) {
//   //   document.getElementById("output").appendChild(canvas);

//     let image = canvas
//       .toDataURL("image/png")
//       .replace("image/png", "image/octet-stream");
//       console.log(canvas.toDataURL("image/png"))

//       // location.href = image

//       var a = document.createElement('a')
//       a.href = image
//       a.download = "Experiment.jpeg"

//       a.click()
//   });
// },
