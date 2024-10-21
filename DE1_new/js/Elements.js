import {Dom, Util} from './Libs.js'

const Elements = {
    Text: class Text{
        divTextContainer = Util.get(".step-texts")
        count = 1
        constructor(){
            this.span = document.createElement("span")
            this.span.classList.add("temp")  
            this.span.id = `text_${this.count}` 
            this.divTextContainer.appendChild(this.span)
            this.count++;
            this.dom = new Dom(this.span)
        }
        
    }

}

export default Elements