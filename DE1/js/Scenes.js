import { Dom, Util, Layout, Sliders, Src, Elements } from "./Libs.js";

const Scenes = {
  // ! To Plot graph
  plotGraph(
    ctx,
    graphIdx,
    startEmpty = false,
    xLabel = "",
    yLabel = "",
    data = [],
    dataLabel = "",
    beginAtZero = true
  ) {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel;
    Scenes.items.chart.label[graphIdx].x = xLabel;
    // for label
    Scenes.items.yLabel.set(443, 216, null, 283).setContent(yLabel).styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(700, 352).setContent(xLabel).styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
    });

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset
    let datasets = [
      {
        label: dataLabel,
        fill: false,
        borderColor: "red",
        backgroundColor: "red",
        data: data,
        display: false,
      },
    ];

    if (startEmpty) {
      datasets = [];
    }

    graphRef = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: yLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: xLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
        },
      },
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef;
  },
  plotGraphBar(ctx, graphIdx, startEmpty = false, xLabel = "", yLabel = "") {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel;
    Scenes.items.chart.label[graphIdx].x = xLabel;
    // for label
    Scenes.items.yLabel.set(289, 310, null, 283).setContent(yLabel).styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(663, 409).setContent(xLabel).styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
      fontSize: "18px",
    });

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset
    let data = {
      labels: ["220", "470", "1000"],
      datasets: [
        {
          label: "1",
          backgroundColor: "rgba(0, 128, 0, 1)",
          borderColor: "rgba(0, 128, 0, 1)",
          borderWidth: 1,
          data: [],
        },
        {
          label: "10",
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderColor: "rgba(255, 0, 0, 1)",
          borderWidth: 1,
          data: [],
        },
        {
          label: "40",
          backgroundColor: "rgba(0, 0, 255, 1)",
          borderColor: "rgba(0, 0, 255, 1)",
          borderWidth: 1,
          data: [],
        },
      ],
    };

    let options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            ticks: {
              display: true,
              fontSize: 17,
              fontWeight: "bold",
              fontColor: "black",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              display: true,
              beginAtZero: true,
              // fontSize: 17,
              // fontWeight: 'bold',
              // fontColor: 'black',
              // beginAtZero: true,
              // autoSkip: false,
              // position: "right",
              // maxRotation: 90, // Rotate labels to 90 degrees
              // minRotation: 90,
              // callback: function(value) {
              //   return value // You can add custom formatting here if needed
              // }
            },
          },
        ],
      },
    };
    if (startEmpty) {
      datasets = [];
    }

    graphRef = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef;
  },

  // for adding new datasets to graph
  graphFeatures: {
    addDataset(chart, label, bgColor, data) {
      chart.data.datasets.push({
        label: label,
        fill: false,
        borderColor: bgColor,
        backgroundColor: bgColor,
        data: data,
      });
      chart.update();
    },
    addData(chart, index, data) {
      console.log(data);
      if (data.length > 0) {
        chart.data.datasets[index].data = data;
      } else {
        chart.data.datasets[index].data.push(data);
      }
      chart.update();
    },
    getSizeOfDatasets(chart) {
      return chart.data.datasets.length;
    },
  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  // ! for handeling current load selection in EE16
  currentLoad: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  hideStepHeading() {
    document.querySelector(".step-heading").style.visibility = "hidden";
  },
  experimentHeading(text, style={}){
    let expHeader = new Dom(".anime-header > p")
    expHeader.styles({
      textTransform: "upprcase",
      position: "relative",
      textAlign: "center",
      fontSize: "30px",
      ...style
    })
    expHeader.setContent(text)
  },
  // for typing hello text
  student_name: "",
  optionsDone: [0, 0, 0, 0],
  // ! for handeling current load selection in EE16
  operationAndWaveformDone: 0,

  // Todo create type object of steps like
  /* 

  steps: {
    intro: ()=>{},
    step1: ()=>{},
    step2: ()=>{},
    step3: ()=>{},
  }

  * And convert it to array in next 
  stepsArray = []
  for(let key in steps){
    stepsArray.push(steps[key])
  }

  */
  steps: [
    // * Step1
    () => {
      Scenes.StepProcess.start()
      Scenes.experimentHeading("problem - 1 Drone is not powering up.")
      // Scenes.setStepHeading("Baṣttery Issues", "");

      // Scenes.items.table_mat.set(11,-14, null,925).styles({borderRadius: "40px", border: "solid 10px white"})
      Src.problem_1_drone_front_image.set(-13,-1,400).zIndex(1)
      Src.problem_1_drone_front_zoom_image.set(388,93, null, 264).zIndex(1).hide()
      Src.step_1_arrow_image_1.set(243,69, 116).zIndex(1).rotate(180).hide()
      let videoBox = new Dom(".video-box")
      videoBox.set(654,249,null, 276).hide()
      let text1 = new Elements.Text().dom
      let text2 = new Elements.Text().dom
      let text3 = new Elements.Text().dom

      let textStyle = {
        fontSize: "16px",
        color: "#000000",
        fontFamily: "Arial",
        backgroundColor: "white",
        padding:  "10px",

      }
      
      text1.set(516,-17).setContent("1. Check whether the connection between these two (deans plug and battery) is fine or not, there is no looseness anywhere.").styles(textStyle).hide()
      text2.set(516, 24).setContent("2. The video next to it explains how they are connected to each other.").styles({
        ...textStyle,
        width: "379px"
      }).hide()
      text3.set(516, 44).setContent("3. If it is connected properly then check whether the Dean plug is properly connected to the plate or not, whether the iron soldering is done properly or not.").styles({
        ...textStyle,
        width: "379px"
      }).hide()
      
      anime.timeline({
        easing: "linear",
        duration: 2000,
      })
      .add({
        targets: Src.problem_1_drone_front_image.item,
        rotate: 90,
      })
      .add({
        begin(){
          Src.step_1_arrow_image_1.show().opacity(0)
        },
        targets: Src.step_1_arrow_image_1.item,
        opacity: [0,1],
        easing: "linear",
      })
      .add({
        begin(){
          Src.problem_1_drone_front_zoom_image.show().opacity(0)
        },
        targets: Src.problem_1_drone_front_zoom_image.item,
        opacity: [0,1],
        easing: "linear",
      })
      .add({
        begin(){
          videoBox.show().opacity(0)
        },
        targets: videoBox.item,
        opacity: [0,1],
        easing: "linear",
      })

      setTimeout(() => {
        // Scenes.StepProcess.done()
      }, 1000);
      return true
    },
    // * Step2
    () => {
      Scenes.StepProcess.start()
      Scenes.setStepHeading("Battery Issues", "2) Battery damage (e.g., puffiness).");

      Src.table_mat.set(11,-14, null,925).styles({borderRadius: "40px", border: "solid 10px white"})
      Src.problem_1_drone_front_image.set(21,12).zIndex(1)
      Src.problem_1_drone_front_zoom_image_2.set(417,0, null, 264).zIndex(2)
      Src.step_1_arrow_image_1.set(232,111, 97).zIndex(1).rotate(-25)
      Src.problem_1_battery_puffed.set(677, 26, null, 250).zIndex(1)
    

      let textStyle = {
        fontSize: "15px",
        color: "#000000",
        fontFamily: "Arial",
        backgroundColor: "white",
        padding:  "10px",

      }

      let k = Util.

      Src.tempTitle1.set(675,151).setContent("Example images of puffed battery").styles(textStyle)
      Src.tempTitle2.set(500,308).setContent("b) Check if the wires are burnt or not, if burnt then change the wires with new ones.").styles({
        ...textStyle,
        width: "379px"
      })
      
      Scenes.StepProcess.done()
      return true
    }
  ],
  // ! Scenes Process
  StepProcess: {
    isRunning: false,
    setIsProcessRunning(value) {
      // calling toggle the next
      if (value != this.isRunning) {
        Util.toggleNextBtn();
      }

      this.isRunning = value;
      if (value) {
        Util.cancelSpeech();
        Dom.hideAll();
      }
    },

    start() {
      this.setIsProcessRunning(true);
    },

    done(message = "Click 'Next' to go to next step") {
      Util.setCC(message);
      Dom.setBlinkArrow(true, 790, 444).play();
      this.setIsProcessRunning(false);
    },
  },

  // ! For adding realcurrentstep in every step
  // ! For tracking the current step accuratly
  realCurrentStep: null,
  setRealCurrentStep() {
    let count = 0;
    this.steps.forEach((step, idx) => {
      const constCount = count;
      let newStep = () => {
        this.realCurrentStep = constCount;
        console.log(`RealCurrentStep: ${this.realCurrentStep}`);
        return step();
      };

      count++;
      this.steps[idx] = newStep;
    });
  },
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      this.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = () => {};
      this.currentStep -= 2;
      this.steps[this.currentStep]();
      this.currentStep++;
      Layout.Drawer.backDrawerItem();
      Layout.ProgressBar.backProgressBar();
    }
  },
  next() {
    if (!this.realCurrentStep) {
      Scenes.setRealCurrentStep();
    }
    //! animation isRunning
    if (this.isRunning) {
      return;
    } else if (this.currentStep < this.steps.length) {
      this.StepProcess.start();
      this.steps[this.currentStep]();
      Layout.Drawer.nextDrawerItem();
      Layout.ProgressBar.nextProgressBar();
      this.currentStep++;
    }
  },
};

// stepcalling
Scenes.currentStep = 1;
// Scenes.next();

export default Scenes;
