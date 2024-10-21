import { Util } from "./Libs.js";

const Layout = {
  // ! Drawer
  Drawer: {
    listItems: Util.getAll(".steps ol li"),
    activeIdx: 0,
    
    nextDrawerItem() {
      if (this.activeIdx < this.listItems.length) {
        this.listItems[this.activeIdx].classList.add("active");
        if (this.activeIdx > 0) {
          this.listItems[this.activeIdx - 1].classList.add("completed");
          this.listItems[this.activeIdx - 1].classList.remove("active");
        }
      }
      this.activeIdx = this.activeIdx < this.listItems.length ? this.activeIdx + 1 : this.activeIdx;
    },
  
    backDrawerItem() {
      if (this.activeIdx <= 1) return;
      this.activeIdx--;
      this.listItems[this.activeIdx].classList.remove("active");
      this.listItems[this.activeIdx].classList.add("completed");
      if (this.activeIdx > 0) {
        this.listItems[this.activeIdx - 1].classList.add("active");
      }
    },
  },

  // ! Progress Bar
  ProgressBar: {
    progress: Util.get("#progress"),
    progressSteps: Util.getAll(".progress-step"),
    currProgressStep: -1,
    // total steps from the number of drawer items
    totalProgressSteps: Util.getAll(".step").length,
  
    nextProgressBar() {
      if (this.currProgressStep < this.totalProgressSteps - 1) {
        this.currProgressStep++;
        this.updateProgressbar();
      }
    },
  
    backProgressBar() {
      if (this.currProgressStep > 0) {
        this.currProgressStep--;
        updateProgressbar();
      }
    },
  
    updateProgressbar() {
      this.progressSteps.forEach((progressStep, idx) => {
        if (idx < this.currProgressStep + 1) {
          progressStep.classList.add("progress-step-active");
        } else {
          progressStep.classList.remove("progress-step-active");
        }
      });
      let progressActive = Util.getAll(".progress-step-active");
      progress.style.width =
        ((progressActive.length - 1) / (this.progressSteps.length - 1)) * 100 + "%";
    },
  },

}

// const ProgressBar = Layout.ProgressBar
// const Drawer = Layout.Drawer
// export { ProgressBar, Drawer, Layout }

export default Layout