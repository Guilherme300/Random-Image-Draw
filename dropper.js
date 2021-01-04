let images = []

const dropper = document.querySelector('#configs-dropper')
const imgLenElm = document.querySelector('#selected-images')
const buttonClean = document.querySelector('#cleaner')

const filesInput = document.querySelector('#files-input')

const body = document.querySelector('body')

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evN => {
    dropper.addEventListener(evN, preventDefaults)
    body.addEventListener(evN, preventDefaults)
})

;['dragenter', 'dragover'].forEach(evN => {
    dropper.addEventListener(evN, highlight, false)
    body.addEventListener(evN, highlight)
})

;['dragleave', 'drop'].forEach(evN => {
    dropper.addEventListener(evN, unhighlight, false)
    body.addEventListener(evN, unhighlight)
})

function highlight(){
    dropper.classList.add('highlight')
}

function unhighlight(){
    dropper.classList.remove('highlight')
}

function preventDefaults(ev){
    ev.preventDefault()
    ev.stopPropagation()
}


body.addEventListener('drop', (ev)=> setImages(ev))

dropper.addEventListener('drop', (ev) => setImages(ev))

function setImages(ev){
    let dt = ev.dataTransfer
    
    let files = [...dt.files]

    setImageData(files)

}

function setImageData(files){
    if (files.length > 0)
        files.forEach(i => { 
            images.push(i) 
    })
    
    imgLenElm.innerHTML = images.length
}

buttonClean.onclick = ()=>{
    images = []
    imgLenElm.innerHTML = '0'
}

filesInput.onchange = (ev) => {
    let files = [...ev.target.files]
    setImageData(files)
    console.log(images)
}

/*
function renderImagesOnDropper(imgx){
    const reader = new FileReader()
    reader.readAsDataURL(imgx)

    reader.onloadend = (ev) => {
        // Arrumar um local depois para deixar as imagens acumulando..
        const img = document.createElement('img')
        img.src = ev.target.result
        dropper.appendChild(img)
    }
}

// Criar um cleaner all e cleaner de unidade
*/