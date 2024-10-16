import { Util } from "../js/Libs.js";

const DeveloperTools = {
  images: [],
  videos: [],
  texts: [],
  allSrcElements: [],
  imagesClass: ".step-images img",
  videosClass: ".step-videos img",
  textsClass: ".step-texts .temp",
  init() {
    this.setCSSinHTML()
    this.setHTMLTools()
    this.attachEvents()
    PropertiesTab.init()
  },
  attachEvents(){
    this.images = Util.getAll(this.imagesClass);
    this.videos = Util.getAll(this.videosClass);
    this.texts = Util.getAll(this.textsClass)

    this.allSrcElements = [...this.images, ...this.videos, ...this.texts];
    console.log(this.allSrcElements)

    this.addEventOnClick();
    // this.addResizable()
    // this.addDraggable();
    // this.addRotatable()
  },
  setHTMLTools(){
    let developerToolsHTML = `<div class="developer-tools">
    <div class="sidebar">
      <h3 class="element-name">
        Element
      </h3>
      <div class="group-box">
        <div class="group">
          <div class="head">
            <span class="title">Position</span>
            <button class="copy">
              <img src="./developer tools/img/copy-icon.png">
              CSS
            </button>
            <button class="copy">
              <img src="./developer tools/img/copy-icon.png">
              JS
            </button>
          </div>
          <div class="properties">
            <div class="input-box">
              <span class="label">Left</span>
              <input type="text" class="left">
              <span class="unit">px</span>
            </div>
            <div class="input-box">
              <span class="label">Top</span>
              <input type="text" class="top">
              <span class="unit">px</span>
            </div>
          </div>
        </div>
        <div class="group">
          <div class="head">
            <span class="title">Size</span>
            <button class="copy">
              <img src="./developer tools/img/copy-icon.png">
              CSS
            </button>
            <button class="copy">
              <img src="./developer tools/img/copy-icon.png">
              JS
            </button>
          </div>
          <div class="properties">
            <div class="input-box">
              <span class="label">Height</span>
              <input type="text" class="height">
              <span class="unit">px</span>
            </div>
            <div class="input-box">
              <span class="label">Width</span>
              <input type="text" class="width">
              <span class="unit">px</span>
            </div>
          </div>
        </div>
        <div class="group">
          <div class="head">
            <span class="title">Rotate</span>
            <button class="copy">
              <img src="./developer tools/img/copy-icon.png">
              CSS
            </button>
            <button class="copy">
              <img src="./developer tools/img/copy-icon.png">
              JS
            </button>
          </div>
          <div class="properties">
            <div class="input-box">
              <span class="label">Angle</span>
              <input type="text" class="rotate">
              <span class="unit">deg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`

    let body = Util.get("body")
    body.innerHTML = developerToolsHTML + body.innerHTML
  },
  setCSSinHTML(){
    let head = Util.get("head")
    let linkCSS = `
      <link href="./developer tools/developer_tools.css" rel="stylesheet" />`
    head.innerHTML = head.innerHTML + linkCSS
  },
  addEventOnClick() {
    this.allSrcElements.forEach((ele) => {
      ele.addEventListener("mousedown", () => {
        PropertiesTab.Element.update(ele)
      });
    });
  },
  addDraggable() {
    let dragConfig = {
      drag: function (event, ui) {
        PropertiesTab.ToolBar.updateProperties();
      },
    };

    $(".ui-wrapper").draggable(dragConfig);
    // $(this.imagesClass).draggable(dragConfig);
    // $(this.videosClass).draggable(dragConfig);
  },
  addResizable() {
    let resizeConfig = {
      // maxWidth: 500,
      // maxHeight:  500,
      // autoHide: true,
      // distance: 100,
      ghost: true,
      // resize: function(event, ui) {
      //     // Adjust height and width to fit content dynamically
      //     ui.size.height = 'auto'; // Set height to auto
      //     ui.size.width = 'auto'; // Set width to auto
      //     $(this).css({
      //         width: $(this).find('.content').outerWidth() + 'px',
      //         height: $(this).find('.content').outerHeight() + 'px'
      //     });
      // },
      // containment: 'parent'
      // aspectRatio: true,
    };

    // $("#formulas_universal").resizable(resizeConfig);
    $(this.imagesClass).resizable();
    $(this.videosClass).resizable();
    // $(".ui-wrapper").css({
    //     // height: 'fit-content',
    //     // width: 'fit-content',
    //     border: "1px solid"
    // });
  },
  addRotatable() {
    let rotateConfig = {};
    $("#formulas_universal").rotatable(rotateConfig);
  },
};

const PropertiesTab = {
  ToolBar: {
    left: null,
    top: null,
    height: null,
    width: null,
    rotate: null,
    updateByInput() {

      PropertiesTab.Element.updatePositionAndSize(
        this.left.value,
        this.top.value,
        this.height.value,
        this.width.value,
        this.rotate.value,
      );
    },
    init() {
      this.gettingAllElementsFromHTML()
      this.addInputEvents();
    },
    gettingAllElementsFromHTML(){
      this.left = Util.get(`.developer-tools .left`)
      this.top = Util.get(`.developer-tools .top`)
      this.height = Util.get(`.developer-tools .height`)
      this.width = Util.get(`.developer-tools .width`)
      this.rotate = Util.get(`.developer-tools .rotate`)
    },
    addInputEvents() {
      this.toolBarInput = [this.left, this.top, this.height, this.width,  this.rotate];

      this.toolBarInput.forEach((barInput, idx, inputs) => {

        if(idx != inputs.length - 1)
          barInput.onkeyup = this.updateByInput;

        // barInput.onchange = this.updateByInput;

        barInput.addEventListener("keydown", (e) => {
          // todo
          // let nums = "0123456789"
          // if(nums.indexOf(e.key) == -1){
          //   e.value = ""
          //   console.log(e.key)
          //   return
          // }
          
          let currentValue = Number(barInput.value);
          let paddingWithCtrlKey = 1;
          if (e.ctrlKey) paddingWithCtrlKey = 10;

          switch (e.keyCode) {
            case 38:
              // str = 'Up Key pressed!';
              currentValue+=paddingWithCtrlKey;
              break;
            case 40:
              // str = 'Down Key pressed!';
              currentValue-=paddingWithCtrlKey;
              break;
          }
          barInput.value = currentValue;
          this.updateByInput();
        });

        barInput.addEventListener("wheel", (event) => {
          let currentValue = Number(barInput.value);
          let deltaValue = event.deltaY;
          if (deltaValue < 0) currentValue++;
          else currentValue--;
          barInput.value = currentValue;
          this.updateByInput();
        });
      });
      
      // on angle change
      this.rotate.addEventListener("keyup", (e)=>{

      })

      // to change left top as we click on the arrow buttons
      $("body").on("keydown", (e) => {
        if (PropertiesTab.Element.selected == null || e.target.nodeName == 'INPUT') return;

        let currentLeftValue = Number(this.left.value);
        let currentTopValue = Number(this.top.value);
        let paddingWithCtrlKey = 1;
        if (e.ctrlKey) paddingWithCtrlKey = 10;

        switch (e.keyCode) {
          case 37:
            // str = 'Left Key pressed!';
            currentLeftValue -= paddingWithCtrlKey;
            break;
          case 39:
            // str = 'Right Key pressed!';
            currentLeftValue += paddingWithCtrlKey;
            break;
          case 38:
            // str = 'Up Key pressed!';
            currentTopValue -= paddingWithCtrlKey;
            break;
          case 40:
            // str = 'Down Key pressed!';
            currentTopValue += paddingWithCtrlKey;
            break;
        }

        this.left.value = currentLeftValue;
        this.top.value = currentTopValue;
        this.updateByInput();
      });
    },
    updateProperties() { 
      // this.left.value = PropertiesTab.Element.selected.offsetLeft;
      // this.top.value = PropertiesTab.Element.selected.offsetTop;
      this.height.value = PropertiesTab.Element.selected.offsetHeight;
      this.width.value = PropertiesTab.Element.selected.offsetWidth;
    
      // PropertiesTab.Element.updatePositionAndSize(this.left.value,  this.top.value, this.height.value, this.width.value)
    },
    updatePropertiesUIWrapper(left, right) {
      this.left.value = left;
      this.top.value = right;
    },
  },
  Element: {
    left: 0,
    top: 0,
    height: 0,
    width: 0,
    rotate: 0,
    uiWrapper: ".ui-wrapper",
    uiDraggable: ".ui-draggable",
    // current Element
    selected: null,
    updatePositionAndSize(left, top, height, width, rotate) {
      this.left = left;
      this.top = top;
      this.height = height;
      this.width = width;
      this.rotate = rotate 

      this.selected.style.left = `${this.left}px`;
      this.selected.style.top = `${this.top}px`;
      this.selected.style.height = `${this.height}px`;
      this.selected.style.width = `${this.width}px`;

      if(this.selected.classList.contains("temp"))
        this.selected.style.rotate = `${this.rotate}deg`

      $(this.uiWrapper).css({
      left : `${this.left}px`,
        top: `${this.top}px`,
        height: this.height,
        width: this.width,
        rotate: `${this.rotate}deg`,
      });
    },
    onInput() {},
    update(ele) {
      if (this.selected != ele && this.selected != null) {
        $(this.selected).resizable("destroy");
        $(this.uiWrapper).draggable("destroy");

        // * If element is a text
        if(this.selected.classList.contains("temp")){
          $(this.selected).draggable("destroy");
        }
      }
      if(this.selected != ele){
        PropertiesTab.ToolBar.left.value =
          ele.offsetLeft;
        PropertiesTab.ToolBar.top.value =
          ele.offsetTop;
      }
      this.selected = ele;

      // update the left and top of input by  the current selected element
      PropertiesTab.ToolBar.rotate.value = PropertiesTab.Element.rotate

      $(this.selected).resizable({
        resize(event, ui) {
          PropertiesTab.ToolBar.updateProperties();
        },
      });
      $(this.uiWrapper).draggable({
        drag(event, ui) {
          PropertiesTab.ToolBar.updatePropertiesUIWrapper(
            event.target.offsetLeft,
            event.target.offsetTop
          );
        },
      });
      // * If element is a text
      if(this.selected.classList.contains("temp")){
        $(this.selected).draggable({
          drag(event, ui) {
            PropertiesTab.ToolBar.updatePropertiesUIWrapper(
              event.target.offsetLeft,
              event.target.offsetTop
            );
          },
        });
      }

      // show element name or id or class
      let elementName = Util.get(".developer-tools .element-name")
      if(this.selected.id.length != 0){
        elementName.innerHTML = this.selected.id
      }else{
        let eleClassName = this.selected.className
        let removeTheseName = ['ui-draggable', 'ui-draggable-handle', 'ui-resizable']
        removeTheseName.forEach(name=>{
          eleClassName = eleClassName.replace(name, "")
        })
        elementName.innerHTML = eleClassName
      }
      PropertiesTab.ToolBar.updateProperties();
    },
  },
  init() {
    PropertiesTab.ToolBar.init()
  },
};

export { DeveloperTools, PropertiesTab };