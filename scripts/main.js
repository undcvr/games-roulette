document.querySelector('.choose-classic').addEventListener('mouseover', function(e) {
    document.querySelector('.indcreese-circle-hover-classic').style.cssText = 
    `top: auto; left: auto; width: 0px; height: 0px;`
    
    var rect = e.target.getBoundingClientRect();
    let axisX = e.clientX - rect.left
    let axisY = e.clientY - rect.top
    
    document.querySelector('.indcreese-circle-hover-classic').style.cssText = 
    `top: ${axisY}px; left: ${axisX}px; width: 1000px; height: 1000px;`
    
    document.querySelector('.choose-classic-h4').style.color = 'black'
    
    document.querySelector('.choose-classic').addEventListener('mouseout', function() {
        document.querySelector('.indcreese-circle-hover-classic').style.cssText = 
        `top: ${axisY}px; left: ${axisX}px; width: 0px; height: 0px;`

        document.querySelector('.choose-classic-h4').style.color = 'var(--main-font)'
    })
})

document.querySelector('.choose-exc').addEventListener('mouseover', function(e) {
    document.querySelector('.indcreese-circle-hover-exp').style.cssText = 
    `top: auto; left: auto; width: 0px; height: 0px;`

    var rect = e.target.getBoundingClientRect();
    let axisX = e.clientX - rect.left
    let axisY = e.clientY - rect.top
    
    document.querySelector('.indcreese-circle-hover-exp').style.cssText = 
    `top: ${axisY}px; left: ${axisX}px; width: 1000px; height: 1000px;`

    document.querySelector('.choose-exp-h4').style.color = 'black'

    document.querySelector('.choose-exc').addEventListener('mouseout', function() {
        document.querySelector('.indcreese-circle-hover-exp').style.cssText = 
        `top: ${axisY}px; left: ${axisX}px; width: 0px; height: 0px;`
        
        document.querySelector('.choose-exp-h4').style.color = 'var(--main-font)'
    })
})

let classicMode = false
let excMode = false

document.querySelector('.choose-classic').addEventListener('click', function(e) {
    classicMode = true

    document.querySelector('.choose-container').style.opacity = 0
    setTimeout(() => {
        document.querySelector('.choose-container').style.display = 'none'
    }, 1000);
})

document.querySelector('.choose-exc').addEventListener('click', function(e) {
    excMode = true

    document.querySelector('.choose-container').style.opacity = 0
    setTimeout(() => {
        document.querySelector('.choose-container').style.display = 'none'
    }, 1000);
})

let addedGames = []

let checkRecentRandom = 0

function random() {
    let randomLet = Math.floor(Math.random() * addedGames.length)
    if (addedGames[randomLet] != checkRecentRandom) {
        checkRecentRandom = addedGames[randomLet]
        return addedGames[randomLet]
    } else {
        return random()
    }
}

document.querySelector('.search-result-container').addEventListener('click', function (e) {
    addedGames.push(e.target.id)

    let addedGames_block = document.createElement('div')
    addedGames_block.classList.add('games-content')
    addedGames_block.classList.add('g' + e.target.id)
    document.querySelector('.games-block').append(addedGames_block)

    let addedGames_h4 = document.createElement('h4')
    addedGames_h4.classList.add('games-content-delete')
    addedGames_h4.innerText = 'Удалить'
    addedGames_block.append(addedGames_h4)

    let addedGames_redCover = document.createElement('div')
    addedGames_redCover.classList.add('red-cover')
    addedGames_block.append(addedGames_redCover)

    let addedGames_img = document.createElement('img')
    addedGames_img.classList.add('games-content-banner')
    addedGames_img.src = `https://steamcdn-a.akamaihd.net/steam/apps/${e.target.id}/header.jpg`
    addedGames_block.append(addedGames_img)

    
    if (addedGames.length >= 2) {
        for(let i = 0; i < document.querySelectorAll('.luck-banner').length; i++) {
            document.querySelectorAll('.luck-banner')[i].src = `https://steamcdn-a.akamaihd.net/steam/apps/${random()}/header.jpg`
        }
    }

})

document.querySelector('.games-block').addEventListener('click', function(e) {
    for(let i = 0; i < addedGames.length; i++) {
        if(e.target.classList[1] == 'g'+addedGames[i]) {
            document.querySelector(`.g${addedGames[i]}`).remove()
            addedGames.splice(i, 1)
        }
    }
})

document.querySelector('.spin-btn').addEventListener('click', function() {
    if (addedGames.length < 2) {
        document.querySelector('.start_alert').style.cssText = 'top: 50px;'
        setTimeout(() => {
            document.querySelector('.start_alert').style.cssText = 'top: -50px;'
        }, 3000);
    } else {
        document.querySelector('.spin-btn').style.cssText = 'pointer-events: none; opacity: 0;'

        document.querySelector('.search-container').style.cssText = 'transform: translateX(-100%);'
        document.querySelector('.games-container').style.cssText = 'transform: translateX(100%);'
    
        let randomMargin = Math.floor(Math.random() * 30) * 10
        document.querySelector('.luck-container').style.filter = 'blur(0px)'
    
        document.querySelectorAll('.luck-banner')[0].style.cssText = `margin-left: -${randomMargin}px;`
    
        let i = 0
        let plusMargin = 10
        let speeds = [10, 10, 8, 6, 5, 4, 3, 2, 1.5, 1, 0.8, 0.6, 0.4, 0.2, 0.1, 0.05, 0.04]
        let checkSpeeds = 0
    
        let plusmargininterval = setInterval(() => {
            checkSpeeds +=1
            plusMargin = speeds[checkSpeeds]
            if (plusMargin == 0.04) {
                let first = document.querySelector('.luck-line').getBoundingClientRect().x - document.querySelectorAll('.luck-banner')[1].getBoundingClientRect().x;
                let second = document.querySelector('.luck-line').getBoundingClientRect().x - document.querySelectorAll('.luck-banner')[2].getBoundingClientRect().x;
                let winner

                if (first > 0) {
                    winner = document.querySelectorAll('.luck-banner')[1].classList[1]
                } if (second > 0) {
                    winner = document.querySelectorAll('.luck-banner')[2].classList[1]
                }
                
                if (excMode) {
                    for(let u = 0; u < document.querySelectorAll('.games-content').length; u++) {
                        if (document.querySelectorAll('.games-content')[u].classList[1] == `g${winner}`) {
                            document.querySelectorAll('.games-content')[u].remove()
                        }
                    }
                    
                    for(let w = 0; w < addedGames.length; w++) {
                        if (winner == addedGames[w]) {
                            addedGames.splice(w, 1)
                        }
                    }
                }
                clearInterval(plusmargininterval)
                clearInterval(animInterval)
    
                document.querySelector('.luck-container').style.filter = 'blur(100px)'

                document.querySelector('.search-container').style.cssText = 'transform: translateX(0);'
                document.querySelector('.games-container').style.cssText = 'transform: translateX(0);'

                document.querySelector('.spin-btn').style.cssText = 'pointer-events: auto; opacity: 1;'
            }
        }, 1000);
    
        let animInterval = setInterval(() => {
            i+= plusMargin
            document.querySelectorAll('.luck-banner')[0].style.cssText = `margin-left: -${i}px;`
            if (i >= 300) {
                let statRandom = random()
                i = 0
                document.querySelectorAll('.luck-banner')[0].remove()
    
                let luckBanner = document.createElement('img')
                luckBanner.classList.add('luck-banner')
                luckBanner.classList.add(statRandom)
                luckBanner.src = `https://steamcdn-a.akamaihd.net/steam/apps/${statRandom}/header.jpg`
    
                document.querySelector('.luck-content').append(luckBanner)
            }
        }, 1);
    }
})

fetch('games.json')
.then((response) => response.json())
.then(function (json) {
    document.querySelector('.search-enter-contanier').addEventListener('click', function(input) {
        while (document.querySelector('.search-result-container').firstChild) {
            document.querySelector('.search-result-container').removeChild(document.querySelector('.search-result-container').firstChild)
        }
        for(let i = 0; i < json.applist.apps.length; i++) {
            if (json.applist.apps[i].name.toLowerCase().includes(document.querySelector('.search-input').value.toLowerCase()) && 
            document.querySelector('.search-input').value != '' &&
            json.applist.apps[i].name.toLowerCase().includes('bundle') == false &&
            json.applist.apps[i].name.toLowerCase().includes('artbook') == false &&
            json.applist.apps[i].name.toLowerCase().includes('artwork') == false &&
            json.applist.apps[i].name.toLowerCase().includes('pass') == false &&
            json.applist.apps[i].name.toLowerCase().includes('Original Soundtrack') == false &&
            json.applist.apps[i].name.toLowerCase().includes('pack') == false &&
            json.applist.apps[i].appid != '' &&
            json.applist.apps[i].name.toLowerCase().includes('dlc') == false) {

                document.querySelector('.search-meme-container').style.display = 'none'
                async function checkGame() {
                    let gamediv = document.createElement('div')
                    gamediv.classList.add('search-result-game-block')
                    gamediv.id = json.applist.apps[i].appid
                    document.querySelector('.search-result-container').append(gamediv)
                    
                    let banner = document.createElement('img')
                    banner.classList.add('search-result-game-banner')
                    banner.src = `https://steamcdn-a.akamaihd.net/steam/apps/${json.applist.apps[i].appid}/header.jpg`

                    let banner_blured = document.createElement('img')
                    banner_blured.classList.add('search-result-game-bannerBlured')
                    banner_blured.src = `https://steamcdn-a.akamaihd.net/steam/apps/${json.applist.apps[i].appid}/header.jpg`
        
                    const options = {
                        method: "GET"
                    }

                    let responseimg = await fetch(banner.src, options)

                    if (responseimg.status === 200) {
                        gamediv.append(banner)
                        gamediv.append(banner_blured)
                    }

                    let gameName = document.createElement('h4')
                    gameName.classList.add('search-result-game-title')
                    gameName.innerText = `${json.applist.apps[i].name}`
                    gamediv.append(gameName)
                }
    
                checkGame()
            }
        }
    })
})

document.querySelector('.buildInfo').innerText = 'Build: 0.1 Beta'