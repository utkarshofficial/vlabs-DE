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
    content,
    callBackOnClose = () => {},
    mBoxLeft = null,
    mBoxTop = null,
    mBoxHeight = null,
    mBoxWidth = null
  ) {
    let modalBox = new Dom(".modal-box");
    let modalContent = new Dom(".modal-box .content");
    let modalClose = new Dom(".modal-box .footer .btn1");

    modalContent.setContent(content);
    modalClose.item.onclick = () => {
      modalBox.hide();
      callBackOnClose();
    };

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
      Scenes.experimentHeading("Drone Repair and maintenance – I");

      Src.drone_3d_img.set(11, 11, 260).zIndex(1);
      Src.front_page_box.set(285+40, 63, 286, 618)
      Src.problem_1.set(330+38, 125, 61).zIndex(1)
      Src.problem_2.set(330+32, 226, 61).zIndex(1)


      let droneAnime = anime({
          targets: Src.drone_3d_img.item,
          keyframes: [
            {translateY: 105},
            {translateY: 11},
          ],
          duration: 3000,
          loop: true,
          easing: "linear"
        })

      let btns = [Src.problem_1, Src.problem_2];

      btns[0].item.onclick = ops1;
      btns[1].item.onclick = ops2;

      function ops1() {
        droneAnime.reset()
        Scenes.StepProcess.setIsProcessRunning(false)
        Scenes.currentStep = 1
        Scenes.next()
      }
      
      function ops2() {
        droneAnime.reset()
        Scenes.StepProcess.setIsProcessRunning(false)
        Scenes.currentStep = 4
        Scenes.next()
      }

      return true;
    },
    //! problem 1
    // * Step1
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Problem - 1 Drone is not powering up.");

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
        Scenes.StepProcess.setIsProcessRunning(false)
        Scenes.currentStep = 1
        Scenes.next()
      }

      function ops2() {
        Scenes.StepProcess.setIsProcessRunning(false)
        Scenes.currentStep = 2
        Scenes.next()
      }

      return true;
    },
    //! problem 1 issue 1
    //* step2
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Battery issues");

      Src.problem_1_drone_front_image.set(-13, -1, 400).zIndex(1);
      Src.problem_1_drone_front_zoom_image
        .set(388, 93, null, 264)
        .zIndex(1)
        .hide();
        Src.problem_1_drone_front_zoom_image_2.set(388, 93, null, 264).zIndex(1).hide()
      Src.problem_1_soldering_iron_of_connector
        .set(388, 93, 311, 264)
        .zIndex(1)
        .hide();
      Src.step_1_arrow_image_1.set(243, 69, 116).zIndex(1).rotate(180).hide();
      Src.problem_1_battery_puffed.set(676,292,130).hide()

      let texts = [
        "Check whether the connection between these two (deans plug and battery) is correct or not, there is no looseness anywhere.",

        "The video next to it explains how they are connected to each other.",

        "If it is connected properly then check whether the Dean plug is properly connected to the plate or not, whether the iron soldering is done properly or not.",

        "If it is also connected properly then check that the battery is not puffed or swollen anywhere.",

        "Example of puffed or swollen battery.",

        "If everything is fine then there is no battery issue.",

        "This video explains how iron soldering is done."
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
              rotate: 90,
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
                Src.problem_1_drone_front_zoom_image.show().opacity(0);
              },
              targets: Src.problem_1_drone_front_zoom_image.item,
              opacity: [0, 1],
              easing: "linear",
            });
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[0], nextAnime, 458, -18, 110, 478);
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
                Src.step_1_arrow_image_1.set(190, 146, 116).opacity(0).rotate(180);
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
          Scenes.stepModal(texts[texts.length - 1], nextAnime, 703, 147, 96, 239);
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
                Src.step_1_arrow_image_1.set(209, 115, 116).opacity(0).rotate(180)
                Src.problem_1_soldering_iron_of_connector.hide()
                videoBox.hide()
              },
              targets: Src.step_1_arrow_image_1.item,
              opacity: [0, 1],
            })
            .add({
              begin() {
                Src.problem_1_drone_front_zoom_image_2
                  .set(353,123,311)
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

      function anime6_image(){
        // main anime
        (function () {
          anime({
            begin() {
              Src.problem_1_soldering_iron_of_connector.hide()
              Src.problem_1_battery_puffed.set(678,191,130).show().opacity(0)
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

      function anime7_end(){
        // main anime
        (function () {
          let toHide = [
            Src.problem_1_drone_front_zoom_image_2.hide(),
            Src.step_1_arrow_image_1.hide(),
            Src.problem_1_battery_puffed.hide(),
          ]
          anime.timeline({
            duration: 2000,
            easing: "linear",
          })
          .add({
            targets: Src.problem_1_drone_front_image.item,
            left: 241,
            top: -46,
            hight: 380,
            complete(){
              modalBoxOnComplete()
            }
          })
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[5], nextAnime, 285, 363, 77, 404);
        }

        // next anime on close
        function nextAnime() {
          Scenes.currentStep = 0
          Scenes.StepProcess.done()
        }
      }
      
      return true;
    },
    //! problem 1 issue 2
    // * Step3
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("PMU (Power management unit) issues");

      Src.problem_1_drone_front_image.set(-13, -1, 400).zIndex(1);
      Src.problem_1_pmu_zoom_img
        .set(361,49, null, 264)
        .zIndex(1).hide()
      Src.step_1_arrow_image_1.set(283, 58, 89).zIndex(1).rotate(180).hide();
      Src.pmu_img.set(628, 241, 133).hide()
        

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

      function anime3_image(){
        // main anime
        (function () {
          anime({
            begin() {
              videoBox.hide()
              Src.pmu_img.show().opacity(0)
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

      function anime4_text(){
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

      function anime7_end(){
        // main anime
        (function () {
          let toHide = [
            Src.pmu_img.hide(),
            Src.step_1_arrow_image_1.hide(),
            Src.problem_1_pmu_zoom_img.hide(),
          ]
          anime.timeline({
            duration: 2000,
            easing: "linear",
          })
          .add({
            targets: Src.problem_1_drone_front_image.item,
            left: 241,
            top: -46,
            hight: 380,
            complete(){
              modalBoxOnComplete()
            }
          })
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[4], nextAnime, 285, 363, 77, 404);
        }

        // next anime on close
        function nextAnime() {
          Scenes.currentStep = 0
          Scenes.StepProcess.done()
        }
      }
      
      return true;
    },

    //! problem 2
    //* step4
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Problem - 2 Drone does not respond to the controller");

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
        Scenes.StepProcess.setIsProcessRunning(false)
        Scenes.currentStep = 5
        Scenes.next()
      }

      function ops2() {
        Scenes.StepProcess.setIsProcessRunning(false)
        Scenes.currentStep = 6
        Scenes.next()
      }

      return true;
    },
    //! problem 2 issue 1
    //* step5
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Incorrect ports or lack of power");

      Src.drone_back_side.set(-43, -54, 506).zIndex(1);
      Src.flight_controller_zoom_img
        .set(361,49, null, 264)
        .zIndex(1).hide()
      // Src.step_1_arrow_image_1.set(283, 58, 89).zIndex(1).rotate(0).hide();
      Src.step_1_arrow_image_1.set(197, 83, 116).zIndex(1).rotate(180).hide();
      Src.pmu_img.set(628, 241, 133).hide()
        

      let texts = [
        "Check whether the ports are appropriate connected or not.",

        "The video next to it explains how they are connected.",

        "If everything is fine then all the ports are connected properly.",

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
                Src.flight_controller_zoom_img.show().opacity(0);
              },
              targets: Src.flight_controller_zoom_img.item,
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
          anime7_end();
        }
      }

      function anime4_text(){
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

      function anime7_end(){
        // main anime
        (function () {
          let toHide = [
            Src.pmu_img.hide(),
            Src.step_1_arrow_image_1.hide(),
            Src.flight_controller_zoom_img.hide(),
            videoBox.hide()

          ]
          anime.timeline({
            duration: 2000,
            easing: "linear",
          })
          .add({
            targets: Src.drone_back_side.item,
            left: 241,
            top: -83,
            hight: 380,
            complete(){
              modalBoxOnComplete()
            }
          })
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[2], nextAnime, 268, 370, 77, 482);
        }

        // next anime on close
        function nextAnime() {
          Scenes.currentStep = 0
          Scenes.StepProcess.done()
        }
      }
      
      return true;
    },
    //! problem 2 issue 2
    // * Step6
    () => {
      Scenes.StepProcess.start();
      Scenes.experimentHeading("Transmitter and receiver not bound");

      Src.problem_1_drone_front_image.set(-13, -1, 400).zIndex(1);
      Src.flight_controller_zoom_img
        .set(361,49, null, 264)
        .zIndex(1).hide()
      Src.step_1_arrow_image_1.set(283, 58, 89).zIndex(1).rotate(180).hide();
      Src.pmu_img.set(628, 241, 133).hide()
        

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

      function anime3_image(){
        // main anime
        (function () {
          anime({
            begin() {
              videoBox.hide()
              Src.pmu_img.show().opacity(0)
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

      function anime4_text(){
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

      function anime7_end(){
        // main anime
        (function () {
          let toHide = [
            Src.pmu_img.hide(),
            Src.step_1_arrow_image_1.hide(),
            Src.problem_1_pmu_zoom_img.hide(),
          ]
          anime.timeline({
            duration: 2000,
            easing: "linear",
          })
          .add({
            targets: Src.problem_1_drone_front_image.item,
            left: 241,
            top: -46,
            hight: 380,
            complete(){
              modalBoxOnComplete()
            }
          })
        })();

        // modal box
        function modalBoxOnComplete() {
          Scenes.stepModal(texts[4], nextAnime, 285, 363, 77, 404);
        }

        // next anime on close
        function nextAnime() {
          Scenes.currentStep = 0
          Scenes.StepProcess.done()
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
