let items = {}
;['image-render', 'main-title', 'image-window', 'configs-window', 'start-button', 'time-opt', 'loop-opt', 'looprd-opt', 'next-button', 'pause-button', 'stop-button', 'prev-button', 'counter'].forEach( i => { 
    items = { ...items, [i]: document.querySelector('#'+i) }
})

let time
let loop
let index = 0
let paused = false

items['start-button'].onclick = () => {
    if (images.length < 2){
        createMessageBox('Selecione pelo menos 2 imagens')
        return    
    }   
        
    images = fileRandomizer.random(images)
    
    index = 0    
    loadImage(items['image-render'], images[index])               
    
    resetTime()
    
    changeWindows('img')
    startLoop()
}

items['next-button'].onclick = () => {
    if (images[index+1]){
        resetTime()
        index++
        loadImage(items['image-render'], images[index])
        return   
    }
    createMessageBox('Não há mais imagem para frente')
}

items['prev-button'].onclick = () => {
    if (images[index-1]){
        resetTime()
        index--
        loadImage(items['image-render'], images[index])
        return
    } 
    createMessageBox('Não há mais imagem para trás')
}

function resetTime(){
    time = sanitizeTime(items['time-opt'].value)
}

items['pause-button'].onclick = () => {
    if (paused){
        startLoop()
        items['pause-button'].src = 'assets/pause.png'
        paused = false
        return    
    }
    clearInterval(loop)
    items['pause-button'].src = 'assets/play-button.png'
    paused = true
            
}

items['stop-button'].onclick = () => {
    clearInterval(loop)
    changeWindows('options')
}

function startLoop(){
    loop = setInterval(()=>{
        if (time.minutes == 0 && time.seconds == 0){
            if (!images[index]){
                if (items['loop-opt'].checked){
                    if (items['looprd-opt'].checked)
                        images = fileRandomizer.random(images)
                        
                    index = 0
                    resetTime()
                    loadImage(items['image-render'], images[index])
                    return              
                }
                items['stop-button'].click()
                return            
            }
            
            index++
            loadImage(items['image-render'], images[index])            
                
            resetTime()
            return        
        }        
        
        if (time.seconds == 0){
            time.minutes--
            time.seconds = 59
        } else {
            time.seconds--        
        }
        
        items['counter'].innerHTML = `${nPutZero(time.minutes)}:${nPutZero(time.seconds)}`
    }, 1000)
}

function loadImage(to, image){
    const reader = new FileReader()
    reader.readAsDataURL(image)
    
    reader.onloadend = (ev)=>{
        to.src = ev.target.result    
    }
}

function nPutZero(n){
    if (typeof n == 'string') 
        if (n.length > 1)
            return n

    return n < 10 ? '0' + n : n    
}

function sanitizeTime(time){
    let newTime = parseInt(time.replace(/m|s/g, ''))
    newTime = nPutZero(newTime)
    
    if (time.indexOf('m') != -1){
        return { minutes: newTime, seconds: '00' }    
    } 
    return { minutes: '00', seconds: newTime }
}

function changeWindows(window){
    if (window == 'img'){
        items['main-title'].classList.add('side')
        items['configs-window'].classList.add('exiting')
        setTimeout(() => { items['configs-window'].style.display = 'none' }, 500)
        items['image-window'].style.display = 'flex'
        return
    }
    items['main-title'].classList.remove('side')
    items['configs-window'].classList.remove('exiting')
    items['configs-window'].style.display = 'block'
    items['image-window'].style.display = 'none'
}

function createMessageBox(msg, type = 1, maxTime = 5){
    let msgDiv = document.createElement('div')
    msgDiv.id = 'msgDiv'
    msgDiv.style.backgroundColor = type == 0 ? 'green' : '#FB6464'
    
    let text  = document.createElement('p')
    text.innerHTML = msg
    
    msgDiv.append(text)
    document.querySelector('body').appendChild(msgDiv)
    
    setTimeout(()=>{
        document.querySelector('body').removeChild(msgDiv)
    }, 1000 * maxTime)
}

class Randomizer{
    random(files){
        let newFile = files.slice()            
        let len = files.length              
        let useds = []          
            
        for(let i = 0, x = len; i < x; i++){
            let randN = this._getRand(len)

            if (!this._numberUsed(useds, randN)){
                newFile[randN] = newFile[i]
                newFile[i] = files[randN]
                useds.push(randN)
                useds.push(i)
            }
            
        }
        
        return newFile
    }
    
    _getRand(len){
        return Math.floor( Math.random() * len )        
    }
    
    _numberUsed(useds, number){
        for (let i = 0, x = useds.length; i < x; i++){
            if (useds[i] == number)
                return true        
        }    
        return false
    }

}

let fileRandomizer = new Randomizer

for(let i = 1; i <= 10; i++){
    let option = document.createElement('option')
    option.innerHTML = `${i}m`
    items['time-opt'].appendChild(option)
}