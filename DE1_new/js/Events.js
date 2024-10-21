import { Util, Scenes } from './Libs.js'

const Events = {
    isMute: false,
    bind() {
      // * Next Button
      Util.get(".btn-next").addEventListener("click", () => {
        Scenes.next();
      });
  
      // * Back Button
      Util.get(".btn-back").addEventListener("click", () => {
        Scenes.back();
      }),
      // * Print Certificate Button
      Util.get(".btn-save").addEventListener("click", () => {
        window.print();
      });
  
      // * Mute Button
      Util.get(".btn-mute").addEventListener("click", () => {
        if (this.isMute) {
          this.isMute = false;
          muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
          muteBtn.title = "Click to Mute";
        } else {
          this.isMute = true;
          muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
          muteBtn.title = "Click to Unmute";
        }
      });
    },
  };
  Events.bind();

  export default Events