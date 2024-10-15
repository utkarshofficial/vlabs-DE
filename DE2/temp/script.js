import Data from './imgs.json' with {type: "json"}

let imgsBox = document.querySelector(".imgs")
function convertNameToDomImg(imgs){
    let dirName = './imgs/'
    let converted = ''
    for(let imgSrc of imgs){
        imgSrc = dirName + imgSrc
        converted += `<img class="main-windows-imgs" src="${imgSrc}" />`
    }
    return converted
}

let jsonURL = 'imgs.json'
const fetchData = async ()=>{
    await fetch(jsonURL)
    .then(res=>{
        if(!res.ok){
            throw new Error('Network response was not ok')
        }
        return res.json()
    })
    .then(data=>{
        imgsBox.innerHTML = convertNameToDomImg(data.imgs)
    })
    .catch(err=>{
        console.log(err)
    })
}

// fetchData()
imgsBox.innerHTML = convertNameToDomImg(Data.imgs)


