const darkButton = document.querySelector('#dark-mode')

darkButton.onclick = () => {
    setDarkMode()
}

const setDarkMode = () => {
    const darkMode = window.localStorage.darkMode
    if (darkMode == 'dark'){
        document.documentElement.setAttribute('dark-theme', 'light')
        window.localStorage.setItem('darkMode', 'light')
        darkButton.src = 'assets/bedtime.svg'
        return
    }
    document.documentElement.setAttribute('dark-theme', 'dark')
    window.localStorage.setItem('darkMode', 'dark')
    darkButton.src = 'assets/bedtimeNo.svg'
}

window.onload = ()=>{
    const darkMode = window.localStorage.darkMode
    if (darkMode){
        setDarkMode()
        setDarkMode()
    }
}