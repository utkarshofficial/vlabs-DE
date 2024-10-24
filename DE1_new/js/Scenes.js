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
  experimentHeading(text, style = {}) {
    let expHeader = new Dom(".anime-header > p");
    expHeader.styles({
      textTransform: "upprcase",
      position: "relative",
      textAlign: "center",
      fontSize: "30px",
      ...style,
    });
    expHeader.setContent(text);
  },
  // todo udpate this video box in template
  videoBox(vBoxLeft, vBoxTop, srcVideo, vHeight, videoTitle) {
    let videoBox = new Dom(".video-box").set(vBoxLeft, vBoxTop);
    let video = new Dom(".video-box video");
    let videoTitleText = new Dom(".video-box .title").setContent(videoTitle);
    let btnRestart = new Dom(".video-box .controls button");

    // src video is a Dom element
    video.set(null, null, vHeight);
    video.item.src = srcVideo.item.src;

    btnRestart.item.onclick = () => {
      video.item.currentTime = 0;
      video.item.play();
    };

    return videoBox;
  },
  // todo update this also
  stepModal(
    boxContent,
    callBackOnClose = () => {},
    mBoxLeft = null,
    mBoxTop = null,
    mBoxWidth = null,
    mBoxHeight = null,
  ) {
    let content = {
      title: boxContent.title ? boxContent.title : "",
      description: boxContent.description ? boxContent.description : "",
    }
    
    let modalBox = new Dom(".modal-box");
    let modalTitle = new Dom(".modal-box .header .title");
    let modalContent = new Dom(".modal-box .content");
    let modalClose = new Dom(".modal-box .footer .btn1");

    let btn2  = new Dom(".modal-box .footer .btn2")
    btn2.hide()

    if(content.title == ""){
      modalTitle.hide()
    }else{
      modalTitle.show()
      modalTitle.setContent(content.title);
    }
    modalContent.setContent(content.description);
    modalClose.item.onclick = () => {
      modalBox.hide();
      callBackOnClose();
    };

    modalBox.set(mBoxLeft, mBoxTop, mBoxHeight, mBoxWidth).show("flex");

    return modalBox;
  },
  stepModalChoice(
    boxContent,
    btn1Text="", btn1onClick=()=>{},
    btn2Text="", btn2onClick=()=>{},
    mBoxLeft = null,
    mBoxTop = null,
    mBoxWidth = null,
    mBoxHeight = null,
  ) {
    let content = {
      title: boxContent.title ? boxContent.title : "",
      description: boxContent.description ? boxContent.description : "",
    }
    
    let modalBox = new Dom(".modal-box");
    let modalTitle = new Dom(".modal-box .header .title");
    let modalContent = new Dom(".modal-box .content");
    
    let btn1 = new Dom(".modal-box .footer .btn1").setContent(btn1Text)
    btn1.onClick(()=>{
      btn1onClick()
    })

    let btn2  = new Dom(".modal-box .footer .btn2").set().setContent(btn2Text);
    btn2.onClick(()=>{
      btn2onClick()
    })
    
    if(content.title == ""){
      modalTitle.hide()
    }else{
      modalTitle.show()
      modalTitle.setContent(content.title);
    }
    modalContent.setContent(content.description);
    


    modalBox.set(mBoxLeft, mBoxTop, mBoxHeight, mBoxWidth).show("flex");

    return modalBox;
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
    // * Step 0
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Drone is not responding – I");

      let styles = {
        rightTick: {
          filter: "hue-rotate(282deg)",
          zIndex:  1,

        }
      }

      // * Required images
      Src.drone_3d_img.set(11 + 60, 11, 260).zIndex(1);
      // Src.drone_3d_img.set(577,93,260).zIndex(1);
      let tabs = [
        Src.tab_1.set(28, -29, 68),
        Src.tab_2.set(28 + 230 * 1, -29, 68),
        Src.tab_3.set(28 + 230 * 2, -29, 68),
        Src.tab_4.set(28 + 230 * 3, -29, 68),
      ];
      let issues = [
        Src.issue_bat.set(32, 102, 224).hide(),
        Src.issue_pmu.set(32, 102, 224).hide(),
        Src.issue_1.set(32, 102, 224).hide(),
        Src.issue_2.set(32, 102, 224).hide(),
      ];
      let texts = [
        {
          title: "",
          description: "If drone is not responding then following issues can be happen -"
        },
        {
          title: "Battery Issues",
          description: "Either the battery wire connection may not be properly connected or the battery is not working properly."
        },

        
      ]
      let right_ricks = [
        Src.right_tick_1.set(42,-11,20).styles(styles.rightTick),
        Src.right_tick_2.set(42+ 230 * 1,-11,20).styles(styles.rightTick),
        Src.right_tick_3.set(42+ 230 * 2,-11,20).styles(styles.rightTick),
        Src.right_tick_4.set(42+ 230 * 3,-11,20).styles(styles.rightTick),
      ]
      // Src.front_page_box.set(285 + 40, 63, 286, 618);
      // Src.problem_1.set(330 + 38, 125, 61).zIndex(1);
      // Src.problem_2.set(330 + 32, 226, 61).zIndex(1);

      // Dom.setBlinkArrowRed(0,0)
      
      
      let droneAnime = anime({
        targets: Src.drone_3d_img.item,
        keyframes: [{ translateY: 105 }, { translateY: 11 }],
        duration: 3000,
        loop: true,
        easing: "linear",
      });

      // let btns = [Src.problem_1, Src.problem_2];

      // btns[0].item.onclick = ops1;
      // btns[1].item.onclick = ops2;

      // function ops1() {
      //   droneAnime.reset();
      //   Scenes.StepProcess.setIsProcessRunning(false);
      //   Scenes.currentStep = 1;
      //   Scenes.next();
      // }

      // function ops2() {
      //   droneAnime.reset();
      //   Scenes.StepProcess.setIsProcessRunning(false);
      //   Scenes.currentStep = 4;
      //   Scenes.next();
      // }

      // * Animation functions
      function anime1_text() {
        // main anime
        (function () {
          anime
            .timeline({
              easing: "linear",
              duration: 2000,
            })
            .add({
              begin() {
                modalBoxOnComplete();
              },
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[0], nextAnime, 350 + 60, 136,367);
          Util.setCC("Click on the close button")
        }

        // next anime on close
        function nextAnime() {
          anime2_drone_shifting_and_show_menu();
        }
      }

      function anime2_drone_shifting_and_show_menu() {
        // main anime
        (function () {
          anime({
            begin() {
              // videoBox.show("flex");
            },
            targets: Src.drone_3d_img.item,
            left: 577,
            top: 35,
            duration: 2000,
            easing: "linear",
            complete() {
              tabs.forEach(tab=>{
                anime({
                  begin(){
                    tab.show().opacity(0)
                    Dom.setBlinkArrowOnElement(Src.tab_1, "bottom")
                  },
                  targets: tab.item,
                  opacity: [0,1],
                  easing: "linear",
                  duration: 1000,
                })
              })
              modalBoxOnComplete();
            },
          });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[1], nextAnime, 94,175,350);
        }

        // next anime on close
        function nextAnime() {
          anime3_soldering_iron();
        }
      }

      function anime3_soldering_iron() {
        // main anime
        (function () {
          anime
            .timeline({
              easing: "linear",
              duration: 2000,
            })
            .add({
              begin() {
                Src.step_1_arrow_image_1.hide();
                Src.problem_1_drone_front_zoom_image.hide();
                modalBoxOnComplete();
              },
              targets: Src.problem_1_drone_front_image.item,
              rotate: 0,
              delay: 1000,
            })
            .add({
              begin() {
                Src.step_1_arrow_image_1
                  .set(190, 146, 116)
                  .opacity(0)
                  .rotate(180);
              },
              targets: Src.step_1_arrow_image_1.item,
              opacity: [0, 1],
            })
            .add({
              begin() {
                Src.problem_1_soldering_iron_of_connector
                  .set(304, 152, 311)
                  .opacity(0);
              },
              targets: Src.problem_1_soldering_iron_of_connector.item,
              opacity: [0, 1],
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[2], nextAnime, 458, -18, 110, 478);
        }

        // next anime on close
        function nextAnime() {
          anime4_video_box();
        }
      }

      function anime4_video_box() {
        // main anime
        (function () {
          anime({
            begin() {
              Scenes.videoBox(
                725,
                259,
                Src.yoke_front_to_back,
                150,
                "Yoke Back to Side"
              );
              modalBoxOnComplete();
            },
            duration: 2000,
            targets: videoBox.item,
            opacity: [0, 1],
            easing: "linear",
          });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(
            texts[texts.length - 1],
            nextAnime,
            703,
            147,
            96,
            239
          );
        }

        // next anime on close
        function nextAnime() {
          anime5_battery();
        }
      }

      function anime5_battery() {
        // main anime
        (function () {
          anime
            .timeline({
              easing: "linear",
              duration: 2000,
            })
            .add({
              begin() {
                modalBoxOnComplete();
                Src.step_1_arrow_image_1
                  .set(209, 115, 116)
                  .opacity(0)
                  .rotate(180);
                Src.problem_1_soldering_iron_of_connector.hide();
                videoBox.hide();
              },
              targets: Src.step_1_arrow_image_1.item,
              opacity: [0, 1],
            })
            .add({
              begin() {
                Src.problem_1_drone_front_zoom_image_2
                  .set(353, 123, 311)
                  .opacity(0);
              },
              targets: Src.problem_1_drone_front_zoom_image_2.item,
              opacity: [0, 1],
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[3], nextAnime, 458, -18, 110, 478);
        }

        // next anime on close
        function nextAnime() {
          anime6_image();
        }
      }

      function anime6_image() {
        // main anime
        (function () {
          anime({
            begin() {
              Src.problem_1_soldering_iron_of_connector.hide();
              Src.problem_1_battery_puffed.set(678, 191, 130).show().opacity(0);
              modalBoxOnComplete();
            },
            duration: 2000,
            targets: Src.problem_1_battery_puffed.item,
            opacity: [0, 1],
            easing: "linear",
          });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[4], nextAnime, 701, 314, 96, 239);
        }

        // next anime on close
        function nextAnime() {
          anime7_end();
        }
      }

      function anime7_end() {
        // main anime
        (function () {
          let toHide = [
            Src.problem_1_drone_front_zoom_image_2.hide(),
            Src.step_1_arrow_image_1.hide(),
            Src.problem_1_battery_puffed.hide(),
          ];
          anime
            .timeline({
              duration: 2000,
              easing: "linear",
            })
            .add({
              targets: Src.problem_1_drone_front_image.item,
              left: 241,
              top: -46,
              hight: 380,
              complete() {
                modalBoxOnComplete();
              },
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[5], nextAnime, 285, 363, 77, 404);
        }

        // next anime on close
        function nextAnime() {
          Scenes.currentStep = 1;
          Scenes.StepProcess.done();
        }
      }

      const start = anime2_drone_shifting_and_show_menu
      // start() 

      return true;
    },
    //! problem 1
    // * Step1
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Battery Issue");

      Src.drone_3d_img.set(296, 33, 325).zIndex(1);
      Src.black_arrow_1
        .set(80 + 219, 83, 118)
        .zIndex(1)
        .hide();
      Src.black_arrow_2
        .set(80 + 233, 187, 118)
        .zIndex(1)
        .hide();
      Src.issue_bat
        .set(80 + 419, 8, 183)
        .zIndex(1)
        .hide();
      Src.issue_pmu
        .set(80 + 419, 217, 183)
        .zIndex(1)
        .hide();
      Src.btn_start_tracing_1
        .set(80 + 666, 138, 38)
        .zIndex(2)
        .hide();
      Src.btn_start_tracing_2
        .set(80 + 666, 347, 38)
        .zIndex(2)
        .hide();

      anime
        .timeline({
          easing: "linear",
        })
        .add({
          targets: Src.drone_3d_img.item,
          left: [296, 17, 27],
          top: [33, -32, 31],
          duration: 3000,
        })
        .add(
          {
            begin() {
              Src.black_arrow_1.show();
            },
            targets: Src.black_arrow_1.item,
            opacity: [0, 1],
            duration: 1000,
          },
          3000
        )
        .add(
          {
            begin() {
              Src.black_arrow_2.show();
            },
            targets: Src.black_arrow_2.item,
            opacity: [0, 1],
            duration: 1000,
          },
          3000
        )
        .add({
          begin() {
            Src.issue_bat.show();
            Src.btn_start_tracing_1.show();
          },
          targets: Src.issue_bat.item,
          opacity: [0, 1],
        })
        .add({
          begin() {
            Src.issue_pmu.show();
            Src.btn_start_tracing_2.show();
          },
          targets: Src.issue_pmu.item,
          opacity: [0, 1],
        });

      let btns = [Src.btn_start_tracing_1, Src.btn_start_tracing_2];

      btns[0].item.onclick = ops1;
      btns[1].item.onclick = ops2;

      function ops1() {
        Scenes.StepProcess.setIsProcessRunning(false);
        Scenes.currentStep = 2;
        Scenes.next();
      }

      function ops2() {
        Scenes.StepProcess.setIsProcessRunning(false);
        Scenes.currentStep = 3;
        Scenes.next();
      }

      return true;
    },
    //! problem 1 issue 1
    //* step2
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Battery issues");

      Src.problem_1_drone_front_image.set(-13, -1, 400).zIndex(1);
      Src.flight_controller_zoom_img.set(388, 93, null, 264).zIndex(1).hide();
      Src.problem_1_drone_front_zoom_image_2
        .set(388, 93, null, 264)
        .zIndex(1)
        .hide();
      Src.problem_1_soldering_iron_of_connector
        .set(388, 93, 311, 264)
        .zIndex(1)
        .hide();
      Src.step_1_arrow_image_1.set(243, 69, 116).zIndex(1).rotate(180).hide();
      Src.problem_1_battery_puffed.set(676, 292, 130).hide();
      Src.zoom_battery_with_bcg_and_border.set(97, 58, 287).zIndex(2).hide()
      Src.zoom_without_battery_and_border.set(50, 58, 287).zIndex(2).hide()
      Src.mask.styles({cursor: "pointer", zIndex: 1000})
      let videoBox = new Dom("")
      let textCCIdx = 0
      let textCC = [
        "To check the battery, you will have to first remove the battery from the drone.",
        
        "The video explains how to remove battery.",
              
        "Click on the drone to see the zoom view.",

        "Click on the battery to remove it.",

        "Physically check whether battery is not puffed or swollen anywhere.",

        "Example of puffed or swollen battery.",

        "Is your battery puffed or damage from anywhere ?",

        "If it is swollen or have any damage then REPLACE it.",
      ]

      // * Animation functions
      const animes = [
        ()=>{
          Util.setCC("To check the battery, you will have to first remove the battery from the drone.")
          setTimeout(() => {
            frame2()
          }, 6000);
          Src.problem_1_drone_front_image.set(5,-20,444)
          function frame2(){
            videoBox = Scenes.videoBox(
              535,
              116,
              Src.battery_remove,
              200,
              "How to remove battery"
            )
            Scenes.stepModal({description: "The video explains how to remove battery."},()=>{
              videoBox.hide()
              frame3()
            }, 550,28)

            // Util.setCC(textCC[textCCIdx++]).onend(frame3)
          }

          function frame3(){
            Util.setCC("Click on the drone to see the zoom view.")
            Dom.setBlinkArrowRed(237, 273).play()
            videoBox.hide()

            Src.mask.set(168,140,120,184).onClick(()=>{
              Src.zoom_battery_with_bcg_and_border.show()
              Dom.setBlinkArrowRed().reset()
              frame4()
            })

          }
          

          function frame4() {
            Util.setCC("Click on the battery to remove it.") 
            Dom.setBlinkArrowRed(243, 230).play()
            
            Src.mask.set(201,184,35,107).onClick(()=>{
              Src.zoom_battery_with_bcg_and_border.hide()
              Src.zoom_without_battery_and_border.set(97, 58, 287).zIndex(1)
              Src.problem_1_battery.set(126,128,120).zIndex(2)
              Dom.setBlinkArrowRed().reset()

              anime({
                targets: Src.problem_1_battery.item,
                left: 645,
                top: 26,
                easing: "linear",
                duration: 2000,
                complete(){
                  Util.setCC("Physically check whether battery is not puffed or swollen anywhere.")
                  Scenes.stepModal({description: "Example of puffed or swollen battery."},()=>{
                    frame5()
                  },602,228,346).zIndex(500)
                  Src.problem_1_battery_puffed.set(630,300,130).zIndex(500)
                }
              })
            })
          }

          function frame5(){
            Scenes.stepModalChoice({
              description: "Is your battery puffed or damage from anywhere ?",
            }, 
            "Yes",()=>{

            },
            "No",()=>{  

            }, 612, 203, 323)
          }
          // Src.zoom_battery_with_bcg_and_border.show()
        },
      ]

      let idx = 0
      animes[idx]()

      return true;
    },
    //! problem 1 issue 2
    // * Step3
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("PMU (Power management unit) issues");

      Src.problem_1_drone_front_image.set(-13, -1, 400).zIndex(1);
      Src.problem_1_pmu_zoom_img.set(361, 49, null, 264).zIndex(1).hide();
      Src.step_1_arrow_image_1.set(283, 58, 89).zIndex(1).rotate(180).hide();
      Src.pmu_img.set(628, 241, 133).hide();

      let texts = [
        "Check neither PMU’s wire that is connected to flight controller or battery are loosely connected nor burnt.",

        "The video next to it explains how they are connected.",

        "Check whether PMU is physically damaged or not.",

        "If PMU is damaged, replace it with a new one.",

        "If everything is fine then there is no PMU issue.",
      ];

      let videoBox = Scenes.videoBox(
        725,
        259,
        Src.yoke_front_to_side,
        150,
        "Yoke Front to Side"
      ).hide();

      // * Animation functions
      (function anime1_drone() {
        // main anime
        (function () {
          anime
            .timeline({
              easing: "linear",
              duration: 2000,
            })
            .add({
              targets: Src.problem_1_drone_front_image.item,
              // rotate: 90,
              delay: 1000,
              complete() {
                modalBoxOnComplete();
              },
            })
            .add({
              begin() {
                Src.step_1_arrow_image_1.show().opacity(0);
              },
              targets: Src.step_1_arrow_image_1.item,
              opacity: [0, 1],
              easing: "linear",
            })
            .add({
              begin() {
                Src.problem_1_pmu_zoom_img.show().opacity(0);
              },
              targets: Src.problem_1_pmu_zoom_img.item,
              opacity: [0, 1],
              easing: "linear",
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[0], nextAnime, 466, 345, 97, 478);
        }

        // next anime on close
        function nextAnime() {
          anime2_video_box();
        }
      })();

      function anime2_video_box() {
        // main anime
        (function () {
          anime({
            begin() {
              videoBox.show("flex");
            },
            duration: 2000,
            targets: videoBox.item,
            opacity: [0, 1],
            easing: "linear",
            complete() {
              modalBoxOnComplete();
            },
          });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[1], nextAnime, 658, 134, 110, 284);
        }

        // next anime on close
        function nextAnime() {
          anime3_image();
        }
      }

      function anime3_image() {
        // main anime
        (function () {
          anime({
            begin() {
              videoBox.hide();
              Src.pmu_img.show().opacity(0);
              modalBoxOnComplete();
            },
            duration: 2000,
            targets: Src.pmu_img.item,
            opacity: [0, 1],
            easing: "linear",
          });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[2], nextAnime, 669, 151, 96, 268);
        }

        // next anime on close
        function nextAnime() {
          anime4_text();
        }
      }

      function anime4_text() {
        // main anime
        (function () {
          anime({
            begin() {
              modalBoxOnComplete();
            },
          });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[3], nextAnime, 669, 151, 96, 268);
        }

        // next anime on close
        function nextAnime() {
          anime7_end();
        }
      }

      function anime7_end() {
        // main anime
        (function () {
          let toHide = [
            Src.pmu_img.hide(),
            Src.step_1_arrow_image_1.hide(),
            Src.problem_1_pmu_zoom_img.hide(),
          ];
          anime
            .timeline({
              duration: 2000,
              easing: "linear",
            })
            .add({
              targets: Src.problem_1_drone_front_image.item,
              left: 241,
              top: -46,
              hight: 380,
              complete() {
                modalBoxOnComplete();
              },
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[4], nextAnime, 285, 363, 77, 404);
        }

        // next anime on close
        function nextAnime() {
          Scenes.currentStep = 0;
          Scenes.StepProcess.done();
        }
      }

      return true;
    },

    //! problem 2
    //* step4
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading(
        "Problem - 2 Drone does not respond to the controller"
      );

      Src.drone_3d_img.set(296, 33, 325).zIndex(1);
      Src.black_arrow_1
        .set(80 + 219, 83, 118)
        .zIndex(1)
        .hide();
      Src.black_arrow_2
        .set(80 + 233, 187, 118)
        .zIndex(1)
        .hide();
      Src.issue_1
        .set(80 + 419, -9, 195)
        .zIndex(1)
        .hide();
      Src.issue_2
        .set(80 + 419, 209, 195)
        .zIndex(1)
        .hide();
      Src.btn_start_tracing_1
        .set(80 + 666, 125, 38)
        .zIndex(2)
        .hide();
      Src.btn_start_tracing_2
        .set(80 + 666, 350, 38)
        .zIndex(2)
        .hide();

      anime
        .timeline({
          easing: "linear",
        })
        .add({
          targets: Src.drone_3d_img.item,
          left: [296, 17, 27],
          top: [33, -32, 31],
          duration: 3000,
        })
        .add(
          {
            begin() {
              Src.black_arrow_1.show();
            },
            targets: Src.black_arrow_1.item,
            opacity: [0, 1],
            duration: 1000,
          },
          3000
        )
        .add(
          {
            begin() {
              Src.black_arrow_2.show();
            },
            targets: Src.black_arrow_2.item,
            opacity: [0, 1],
            duration: 1000,
          },
          3000
        )
        .add({
          begin() {
            Src.issue_1.show();
            Src.btn_start_tracing_1.show();
          },
          targets: Src.issue_1.item,
          opacity: [0, 1],
        })
        .add({
          begin() {
            Src.issue_2.show();
            Src.btn_start_tracing_2.show();
          },
          targets: Src.issue_2.item,
          opacity: [0, 1],
        });

      let btns = [Src.btn_start_tracing_1, Src.btn_start_tracing_2];

      btns[0].item.onclick = ops1;
      btns[1].item.onclick = ops2;

      function ops1() {
        Scenes.StepProcess.setIsProcessRunning(false);
        Scenes.currentStep = 5;
        Scenes.next();
      }

      function ops2() {
        Scenes.StepProcess.setIsProcessRunning(false);
        Scenes.currentStep = 6;
        Scenes.next();
      }

      return true;
    },
    //! problem 2 issue 1
    //* step5
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Incorrect ports or lack of power");

      Src.fullfinal_drone.set(9, -12, 380).zIndex(1);
      Src.drone_front_side_after_removing_upper_plate
        .set(466, 61, 380)
        .zIndex(1)
        .hide();
      Src.flight_controller_zoom_img.set(361, 49, null, 264).zIndex(1).hide();
      Src.step_1_arrow_image_1.set(319, -19, 116).zIndex(1).rotate(196).hide();
      Src.pmu_img.set(628, 241, 133).hide();

      let texts = [
        "We have to remove the upper plate and battery to see the port's connection.",

        "The video explains how to remove battery.",

        "After removing the battery and upper plate.",

        "Check whether the ports are appropriate connected or not.",

        "The video explains how ports should be connected.",

        "You can also refer the above link for better understanding.",

        "If everything is fine then all the ports are connected properly.",
      ];

      let st = {
        cursor: "pointer",
        backgroundColor: "white",
        color: "blue",
        fontWeight: "bold",
        borderRadius: "10px",
        padding: "10px",
      };

      let text = new Elements.Text().dom;
      text
        .setContent(
          "<a target='_blank' href='https://virtual-labs.github.io/exp-drones-take-off-flight-and-landing-basics-iitd/simulation.html'> Click here to go to the Experiment</a>"
        )
        .set(677, 49, 39)
        .styles(st)
        .hide();

      let videoBox1 = Scenes.videoBox(
        491,
        182,
        Src.battery_remove,
        200,
        "How to remove battery"
      ).hide();

      let animeMove;
      (function anime1_text() {
        // main anime
        (function () {
          animeMove = anime
            .timeline({
              targets: Src.fullfinal_drone.item,
              translateY: [20, 0],
              easing: "easeInOutQuad",
              duration: 2000,
              loop: true,
            })
            .add({
              complete() {
                modalBoxOnComplete();
              },
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[0], nextAnime, 485, 140, 102, 365);
        }

        // next anime on close
        function nextAnime() {
          anime2_video_box();
          animeMove.reset();
        }
      })();

      function anime2_video_box() {
        // main anime
        (function () {
          anime({
            begin() {
              videoBox1.show("flex");
            },
            duration: 2000,
            targets: videoBox1.item,
            opacity: [0, 1],
            easing: "linear",
            complete() {
              modalBoxOnComplete();
            },
          });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[1], nextAnime, 495, 82, 80, 352);
        }

        // next anime on close
        function nextAnime() {
          anime3_back_drone_come();
        }
      }

      function anime3_back_drone_come() {
        // main anime
        (function () {
          anime
            .timeline({
              easing: "linear",
              duration: 2000,
            })
            .add({
              begin() {
                videoBox1.hide();
              },
              targets: Src.drone_back_side.item,
              // rotate: 90,
              delay: 1000,
              complete() {
                modalBoxOnComplete();
              },
            })
            .add({
              begin() {
                Src.step_1_arrow_image_1.show().opacity(0);
              },
              targets: Src.step_1_arrow_image_1.item,
              opacity: [0, 1],
              easing: "linear",
            })
            .add({
              begin() {
                Src.drone_front_side_after_removing_upper_plate
                  .show()
                  .opacity(0);
              },
              targets: Src.drone_front_side_after_removing_upper_plate.item,
              opacity: [0, 1],
              easing: "linear",
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[2], nextAnime, 565, -29, 73, 370);
        }

        // next anime on close
        function nextAnime() {
          anime4_drone_shifting();
        }
      }

      function anime4_drone_shifting() {
        // main anime
        (function () {
          anime
            .timeline({
              easing: "linear",
            })
            .add({
              begin() {
                let toHide = [
                  Src.fullfinal_drone.hide(),
                  Src.step_1_arrow_image_1.hide(),
                ];
              },
              complete() {
                modalBoxOnComplete();
              },
              targets: Src.drone_front_side_after_removing_upper_plate.item,
              top: 9,
              left: 12,
              duration: 2000,
            })
            //* adding
            .add({
              begin() {
                Src.step_1_arrow_image_1
                  .set(243, 69, 116)
                  .zIndex(1)
                  .rotate(180)
                  .opacity(0);
              },
              targets: Src.step_1_arrow_image_1.item,
              opacity: [0, 1],
              easing: "linear",
            })
            .add({
              begin() {
                Src.flight_controller_zoom_img.show().opacity(0);
              },
              targets: Src.flight_controller_zoom_img.item,
              opacity: [0, 1],
              easing: "linear",
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[3], nextAnime, 606, 327, 97, 330);
        }

        // next anime on close
        function nextAnime() {
          anime5_video_box();
        }
      }

      function anime5_video_box() {
        // main anime
        (function () {
          anime({
            begin() {
              videoBox1 = Scenes.videoBox(
                625,
                202,
                Src.battery_remove,
                150,
                "connection of flight controller and receiver."
              );
              videoBox1.show("flex");
            },
            duration: 2000,
            targets: videoBox1.item,
            opacity: [0, 1],
            easing: "linear",
            complete() {
              modalBoxOnComplete();
            },
          });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[4], nextAnime, 679, 104, 90, 250);
        }

        // next anime on close
        function nextAnime() {
          anime6_text();
        }
      }

      function anime6_text() {
        // main anime
        (function () {
          anime({
            begin() {
              text.show();
              modalBoxOnComplete();
            },
          });
        })();

        //modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[5], nextAnime, 658, 134 - 40, 94, 284);
        }

        // next anime on close
        function nextAnime() {
          anime7_end();
        }
      }

      function anime7_end() {
        // main anime
        (function () {
          let toHide = [
            text.hide(),
            videoBox1.hide(),
            Src.fullfinal_drone.hide(),
            Src.step_1_arrow_image_1.hide(),
            Src.flight_controller_zoom_img.hide(),
          ];
          anime
            .timeline({
              duration: 2000,
              easing: "linear",
            })
            .add({
              targets: Src.drone_front_side_after_removing_upper_plate.item,
              left: 284,
              top: -28,
              hight: 380,
              complete() {
                modalBoxOnComplete();
              },
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(
            texts[texts.length - 1],
            nextAnime,
            268,
            370,
            77,
            482
          );
        }

        // next anime on close
        function nextAnime() {
          Scenes.currentStep = 4;
          Scenes.StepProcess.done();
        }
      }

      return true;
    },

    //! problem 2 issue 2
    // * Step6
    () => {
      Scenes.StepProcess.start();

      Scenes.experimentHeading("Transmitter and receiver not bound");

      Src.fullfinal_drone.set(0, -1, 400).zIndex(1);
      Src.receiver_zoom_img.set(361, 49, null, 264).zIndex(1).hide();
      Src.step_1_arrow_image_1
        .set(125, 24, 165, 359)
        .zIndex(1)
        .rotate(168)
        .hide();

      let st = {
        cursor: "pointer",
        backgroundColor: "white",
        color: "blue",
        fontWeight: "bold",
        borderRadius: "10px",
        padding: "10px",
      };

      let text = new Elements.Text().dom;
      text
        .setContent(
          "<a target='_blank' href='https://virtual-labs.github.io/exp-drones-take-off-flight-and-landing-basics-iitd/simulation.html'> Click here to go to the Experiment</a>"
        )
        .set(677, 84, 39)
        .styles(st)
        .hide();

      let texts = [
        "Check whether the LED is stable or not if it’s not stable i.e. LED is blinking then bind it again with transmitter using binding key.",

        "The video next to it explains how receiver is bind with transmitter.",

        "You can also refer the above link for better understanding.",

        "If everything is fine then transmitter and receiver are bind correctly.",
      ];

      let videoBox = Scenes.videoBox(
        661,
        259,
        Src.binding,
        150,
        "Binding"
      ).hide();

      // * Animation functions
      (function anime1_drone() {
        // main anime
        (function () {
          anime
            .timeline({
              easing: "linear",
              duration: 2000,
            })
            .add({
              targets: Src.fullfinal_drone.item,
              // rotate: 90,
              delay: 1000,
              complete() {
                modalBoxOnComplete();
              },
            })
            .add({
              begin() {
                Src.step_1_arrow_image_1.show().opacity(0);
              },
              targets: Src.step_1_arrow_image_1.item,
              opacity: [0, 1],
              easing: "linear",
            })
            .add({
              begin() {
                Src.receiver_zoom_img.show().opacity(0);
              },
              targets: Src.receiver_zoom_img.item,
              opacity: [0, 1],
              easing: "linear",
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[0], nextAnime, 466, 345, 97, 478);
        }

        // next anime on close
        function nextAnime() {
          anime2_video_box();
        }
      })();

      function anime2_video_box() {
        // main anime
        (function () {
          anime({
            begin() {
              videoBox.show("flex");
            },
            duration: 2000,
            targets: videoBox.item,
            opacity: [0, 1],
            easing: "linear",
            complete() {
              modalBoxOnComplete();
            },
          });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[1], nextAnime, 658, 134, 110, 284);
        }

        // next anime on close
        function nextAnime() {
          anime3_text();
        }
      }

      function anime3_text() {
        // main anime
        (function () {
          anime({
            begin() {
              text.show();
              modalBoxOnComplete();
            },
          });
        })();

        //modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[2], nextAnime, 658, 134, 110, 284);
        }

        // next anime on close
        function nextAnime() {
          anime4_end();
        }
      }

      function anime4_end() {
        // main anime
        (function () {
          let toHide = [
            text.hide(),
            Src.step_1_arrow_image_1.hide(),
            Src.receiver_zoom_img.hide(),
            videoBox.hide(),
          ];
          anime
            .timeline({
              duration: 2000,
              easing: "linear",
            })
            .add({
              targets: Src.fullfinal_drone.item,
              left: 241,
              top: -40,
              hight: 380,
              complete() {
                modalBoxOnComplete();
              },
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[3], nextAnime, 225, 370, 77, 516);
        }

        // next anime on close
        function nextAnime() {
          Scenes.currentStep = 0;
          Scenes.StepProcess.done();
        }
      }

      return true;
    },
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
      Dom.setBlinkArrow(true, 804, 546).play();
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
