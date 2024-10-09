import { Download, Scenes, Src, Dom, DomList, Util, DB } from "./Libs.js";


document.addEventListener('DOMContentLoaded', ()=>{
  // stepcalling
  Scenes.currentStep = 1;
  Scenes.next();

  Download.init()

  $( function() {
    $( "img" ).draggable();
    $( "span" ).draggable();
    $( ".video-box" ).draggable();
    $( ".modal-box" ).draggable();
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
