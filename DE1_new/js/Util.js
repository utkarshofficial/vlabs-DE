// Utility
// used for components

import { Events } from "./Libs.js";

// for custom type
class MyHTMLElement extends HTMLElement {
  constructor() {
    super();
  }
}
window.customElements.define("my-html-element", MyHTMLElement);

const Util = {
  Quiz: {
    quizData: [
      {
        question:
          "Which of the following machine is used to measure compressive strength?",
        a: "Universal testing machine",
        b: "Impact testing machine",
        c: "Fatigue testing machine",
        d: "Erichsen machine",
        correct: "a",
      },
      {
        question:
          "Which one of the following, is not a unit of ultimate tensile strength?",
        a: "MPa",
        b: "N/m2",
        c: "Kg/m3",
        d: "PSI",
        correct: "c",
      },
      {
        question: "The extensometer can be attached anywhere to the specimen _",
        a: "Yes",
        b: "No",
        c: "No but sometime yes",
        d: "None of the above",
        correct: "b",
      },

      {
        question:
          "What is the smallest measurement that is possible by vernier calliper?",
        a: "Least count",
        b: "Actual reading",
        c: "Main scale division",
        d: "Vernier scale division",
        correct: "a",
      },
      {
        question:
          "What is the least count of a standard metric vernier caliper",
        a: "0.002mm",
        b: "0.02mm",
        c: "0.1mm",
        d: "0.2mm",
        correct: "b",
      },
    ],
    quiz_contianer: document.querySelector(".quiz-container"),
    quiz: document.getElementById("quiz"),
    answerEls: document.querySelectorAll(".answer"),
    questionEl: document.getElementById("question"),
    a_text: document.getElementById("a_text"),
    b_text: document.getElementById("b_text"),
    c_text: document.getElementById("c_text"),
    d_text: document.getElementById("d_text"),
    ansDom: document.getElementById("quizAns"),
    opsDom: [],
    loadQuizCallCount: 0,
    currentQuiz: 0,
    score: 0,
    loadQuiz() {
      if (this.currentQuiz >= this.quizData.length) {
        return;
      }
      document.querySelector(".transparent-box").style.display = "block";
      this.loadQuizCallCount++;
      window.speechSynthesis.cancel();
      setCC("Choose the correct answer.");
      this.deselectAnswers();
      this.quiz_contianer.style.display = "block";
      const currentQuizData = this.quizData[this.currentQuiz];

      this.questionEl.innerText = currentQuizData.question;
      this.a_text.innerText = currentQuizData.a;
      this.b_text.innerText = currentQuizData.b;
      this.c_text.innerText = currentQuizData.c;
      this.d_text.innerText = currentQuizData.d;
    },

    getSelected() {
      let answer = undefined;
      this.answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
          answer = answerEl.id;
        }
      });
      this.answerEls.forEach((answerEl) => {
        if (answer != undefined) {
          answerEl.disabled = true;
        }
      });

      return answer;
    },

    deselectAnswers() {
      this.answerEls.forEach((answerEl) => {
        answerEl.checked = false;
        answerEl.disabled = false;
      });
    },
    close() {
      this.quiz_contianer.style.display = "none";
      for (let od of this.opsDom) {
        od.style.color = "";
      }
      document.querySelector(".transparent-box").style.display = "none";

      // this.ansDom.style.display = "none";
    },
    init() {
      this.opsDom = [this.a_text, this.b_text, this.c_text, this.d_text];

      let okBtn = document.getElementById("quizSubmit");
      okBtn.textContent = "Submit";
      // onclick for quiz close btn
      // document.querySelector("#closeQuiz").onclick = () => {
      //   this.close();
      // };
      // onclick for quiz submit btn
      document.getElementById("quizSubmit").onclick = () => {
        // for disable multiple submit
        if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
          return;
        }
        // subtitle for quiz
        const answer = this.getSelected();
        if (answer) {
          // this.ansDom.style.display = "block";
          // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

          // updating options with the right and wrong emoji
          let ops = "abcd";
          for (let o in ops) {
            if (ops[o] == this.quizData[this.currentQuiz].correct) {
              this.opsDom[o].innerHTML += " ✔️";
              this.opsDom[o].style.color = "green";
            } else {
              this.opsDom[o].innerHTML += " ❌";
              this.opsDom[o].style.color = "red";
            }
          }

          if (answer === this.quizData[this.currentQuiz].correct) {
            this.score++;
          }
          this.currentQuiz++;

          //for ok button

          okBtn.textContent = "Ok";
          okBtn.onclick = function () {
            Quiz.close();
            Quiz.init();
          };

          // to stop the next question
          // if (this.currentQuiz < this.quizData.length) {
          // this.loadQuiz();
          // } else {
          //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
          // <button onclick="#">Reload</button>
          // `;
          // todo show above string to certificate
          // }
        }
        // this.close();
      };
    },
  },
  get(query) {
    let element = new MyHTMLElement();
    element = document.querySelector(query);
    return element;
  },
  
  // todo suggestion is not working
  getAll(query) {
    let element = [];
    element = document.querySelectorAll(query);
    return element;
  },
  toggleNextBtn() {
    let nextBtn = this.get(".btn-next");
    nextBtn.classList.toggle("btn-deactive");
  },

  // ! Cancel Speech
  cancelSpeech() {
    window.speechSynthesis.cancel();
    this.ccQueue = [];
  },
  // ! Text to Speech
  textToSpeech(text, speak = true) {
    // for filter <sub></sub>
    text = text.replaceAll("<sub>", " ").replaceAll("</sub>", " ");
    let utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = window.speechSynthesis.getVoices()[0];
    if (Events.isMute || !speak) {
      utterance.volume = 0;
      utterance.rate = 10;
    }
    window.speechSynthesis.speak(utterance);
    return utterance;
  },

  // ! Setting Subtitles
  ccQueue: [],
  ccObj: null,
  setCC(text = null, speed = 25, speak = true) {
    if (this.ccObj != null) {
      this.ccObj.destroy();
    }

    let ccDom = this.get(".steps-subtitle .subtitle");
    this.ccQueue.push(text);
    this.ccObj = new Typed(ccDom, {
      strings: ["", ...this.ccQueue],
      typeSpeed: speed,
      onStringTyped: () => {
        this.ccQueue.shift();
        // if(ccQueue.length != 0){
        //   setCC(ccQueue.shift())`
        // }
      },
    }); 
    let utterance = this.textToSpeech(text, speak);
    return {
      onend: (onCompleteCallback) => {
        utterance.onend = onCompleteCallback
      }
    };
  },

  //! To add temp text
  
};

export default Util;
