let diff = 0;

function generateHTMLAndHandlers() {
    //Settings Toggle Button Events
    for(let i = 0; i < data.settingsToggles.length; i++)
        DOMCacheGetOrSet(`setTog${i}`).addEventListener('click',() => {settingsToggle(i)})
    //Tab Button Events
    for(let i = 0; i < tabIDs.length; i++) 
        DOMCacheGetOrSet(`tabBut${i}`).addEventListener('click', () => { changeTab(i) })
    //Add Resource Holders for Raw Resources
    addResourceHolder('miningTab',4,'rawResource')
    
    let imgSrcs = ['ironOre.png','copperOre.png','coal.png','stone.png']
    //Update Raw Resource Image Sources
    for(let i = 0; i < imgSrcs.length; i++)
        DOMCacheGetOrSet(`rawResourceImg${i}`).src = `Imgs/${imgSrcs[i]}`
    //Add Raw Resource Button Events
    for(let i = 0; i < data.rawResourcesStored.length; i++)
        DOMCacheGetOrSet(`rawResourceButton${i}`).addEventListener('click',() => mineOre(i))
    
    console.log('Initialized Successfully')
}

function mainLoop() {
    diff = (Date.now()-data.time)*data.devSpeed/1000
    
    updateHTML()
    data.time = Date.now()
}
const tabIDs = ['settings','mining','smelting','manufacturing','lab']
function changeTab(i) {
    data.currentTab = i
    for(let j = 0; j < tabIDs.length; j++) {
        DOMCacheGetOrSet(`${tabIDs[j]}Tab`).style.display = j === data.currentTab ? 'flex' : 'none'
    }
}

function addResourceHolder(target,amount,name) {
    let htmlStr = ``
        
    for(let i = 0; i < amount; i++) {
        htmlStr = `<div id="${name}Holder${i}" class=resourceHolder>
        <img id="${name}Img${i}">
        <p id="${name}Text${i}"></p>
        <button id="${name}Button${i}"></button>
        <button id="${name}UpButton${i}"></button>
     </div>`
        DOMCacheGetOrSet(target).insertAdjacentHTML('beforeend',htmlStr)
    }
}

function createPrompt(a,b) {
    let old_element = document.getElementById("promptButton");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    DOMCacheGetOrSet('promptInput').value = ''
    DOMCacheGetOrSet('promptContainer').style.border = "4px solid whitesmoke"
    DOMCacheGetOrSet('promptTitle').innerText = a
    DOMCacheGetOrSet('prompt').style.display = 'block'
    DOMCacheGetOrSet('promptContainer').style.display = 'block'
    switch(b) {
        case 0:
            document.getElementById('promptButton').addEventListener('click', () => { importSave() })
            break
    }
}
function createConfirmation(a) {
    if((!data.flaskTested[2] || data.greenEnergy.lt(2.5e5) || data.mastering) && a === 'prestige') return
    if(a === 'prestige' && !data.settingsToggles[0]) {prestige(); return}
    if(a === 'mastery' && !data.settingsToggles[1]) {mastery(); return}
    
    let old_element = document.getElementById("yesConfirm");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    old_element = document.getElementById("noConfirm");
    new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    switch(a) {
        case 'reset':
            document.getElementById('confirmContainer').style.border = `4px solid var(--locked-color)`
            document.getElementById('confirmTitle').innerText = 'Are you sure you want to reset your game?'
            document.getElementById('confirmContent').innerText = 'This will export your savefile to the clipboard but delete your save game in local storage.'
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {fullReset();closeModal(2)})
            break
        case 'prestige':
            document.getElementById('confirmContainer').style.border = `4px solid var(--prestige-color)`
            document.getElementById('confirmTitle').innerText = 'Are you sure you want to prestige?'
            document.getElementById('confirmContent').innerText = 'This will reset all progress in exchange for Golden Flasks'
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {prestige();closeModal(2)})
            break
        case 'mastery': 
            document.getElementById('confirmContainer').style.border = `4px solid var(--mastery-color)`
            document.getElementById('confirmTitle').innerText = 'Are you sure you want to begin mastering?'
            document.getElementById('confirmContent').innerText = 'This will trigger a prestige reset and start mastery.'
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {mastery();closeModal(2)})
    }
}
function closeModal(i) {
    switch(i) {
        case 0:
            document.getElementById('alertContainer').style.display = 'none'
            document.getElementById('alert').style.display = 'none'
            break
        case 1:
            document.getElementById('promptContainer').style.display = 'none'
            document.getElementById('prompt').style.display = 'none'
            break
        case 2:
            document.getElementById('confirm').style.display = 'none'
            document.getElementById('confirmContainer').style.display = 'none'
            break
    }
    
}

function getTotalCost(b,s,a,i) {
    //b = base, s = scale, a = buyAmount, i = index
    //get the multiplier for bulk buying
    let bulkMult = Decimal.pow(s, a).minus(1).div(s.minus(1));
    //base cost * 1.01^owned * bulk mult
    let cost = b.times(Decimal.pow(s, 0)).times(bulkMult);
    
    return cost;
}

function settingsToggle(i) {
    data.settingsToggles[i] = !data.settingsToggles[i]
}

window.setInterval(function() {
    mainLoop()
},50)
