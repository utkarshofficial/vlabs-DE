import { Download, Scenes, Src, Dom, DomList, Util, DB, DeveloperTools } from "./Libs.js";


document.addEventListener('DOMContentLoaded', ()=>{
  // stepcalling
  Scenes.currentStep = 0;
  Scenes.next();

  Download.init()
  // DeveloperTools.init()

  $( function() {
    // $( "img" ).draggable({
    //   drag: function(event, ui){
    //     console.log(ui.position.left, ui.position.top)
    //   }
    // });
    // $( ".temp" ).draggable();
    // $( ".video-box" ).draggable();
    // $( ".modal-box" ).draggable();
  } );
});

// setTimeout(() => {
// $(".main-container").hide();
// }, 100);

// $(document).ready(function () {
//   // TODO uncomment
//   Download.init();
//   // Download.toggleSpinner()

//   window.onbeforeprint = () => {
//     Dom.setBlinkArrowRed(-1);
//     Dom.setBlinkArrow(-1);
//   };
// });
