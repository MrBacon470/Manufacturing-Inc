let diff = 0;

function generateHTMLAndHandlers() {
    //Settings Toggle Button Events
    for(let i = 0; i < getDefaultObject().settingsToggles.length; i++) 
        DOMCacheGetOrSet(`setToggle${i}`).addEventListener('click',() => {settingsToggle(i)})
    //Tab Button Events
    for(let i = 0; i < tabIDs.length; i++) 
        DOMCacheGetOrSet(`tabBut${i}`).addEventListener('click', () => { changeTab(i) })
    //Add Resource Holders for Raw Resources
    addHTML('miningHolder',4,'rawResource',0)
    
    let imgSrcs = ['ironOre.png','copperOre.png','coal.png','stone.png']
    //Update Raw Resource Image Sources
    for(let i = 0; i < imgSrcs.length; i++)
        DOMCacheGetOrSet(`rawResourceImg${i}`).src = `Imgs/${imgSrcs[i]}`
    //Add Raw Resource Button Events
    for(let i = 0; i < getDefaultObject().rawResourcesStored.length; i++)
        DOMCacheGetOrSet(`rawResourceButton${i}`).addEventListener('click',() => mineOre(i))
    //Add Smelted Resource Holders    
    addHTML('smeltingHolder',3,'smeltedResource',1)
    
    for(let i = 0; i < 3; i++)
        DOMCacheGetOrSet(`smeltedResourceButton${i}`).addEventListener('click', () => {smelt(i)})

    addHTML('manufactoriesHolder',itemNames.length,'',2)
    DOMCacheGetOrSet('Item3Name').style.color = 'var(--red)'
    for(let i = 0; i < itemNames.length; i++) {
        DOMCacheGetOrSet(`Item${i}Img`).src = `Imgs/${itemImgIDs[i]}`
        DOMCacheGetOrSet(`Item${i}Name`).innerText = itemNames[i]
        DOMCacheGetOrSet(`Item${i}Cost`).innerText = `Cost: ${itemCosts[i]}`
    }

    console.log('Initialized Successfully')
}

function mainLoop() {
    diff = (Date.now()-data.time)*data.devSpeed/1000
    
    updateHTML()
    data.time = Date.now()
}
const tabIDs = ['settings','mining','manufacturing','lab','power']
function changeTab(i) {
    data.currentTab = i
    for(let j = 0; j < tabIDs.length; j++) {
        DOMCacheGetOrSet(`${tabIDs[j]}Tab`).style.display = j === data.currentTab ? 'flex' : 'none'
    }
}

function addHTML(target,amount,name,id) {
    let htmlStr = ``
    if(id === 0) {
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
    else if(id === 1) {
        for(let i = 0; i < amount; i++) {
            htmlStr = 
            `<div class="resourceHolder">
            <img id="${name}Img${i}">
            <p id="${name}Text${i}"></p>
            <button id="${name}Button${i}"></button>
            </div>`
            DOMCacheGetOrSet(target).insertAdjacentHTML('beforeend',htmlStr)
        }
    }
    else if(id === 2) {
        for(let i = 0; i < amount; i++) {
            htmlStr = `
            <div id="manufactory${i}" class="manufactory">
                <img id="Item${i}Img" src="">
                <p id="Item${i}Name">Item Name</p>
                <p id="Item${i}Cost">Item Cost</p>
                <p id="Item${i}Amt">(0.00)</p>
                <button id="Item${i}Button">Produce Item</button>
            </div>`
            DOMCacheGetOrSet(target).insertAdjacentHTML('beforeend',htmlStr)
        }
        
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
    let old_element = document.getElementById("yesConfirm");
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    old_element = document.getElementById("noConfirm");
    new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    switch(a) {
        case 'reset':
            document.getElementById('confirmContainer').style.border = `4px solid var(--red)`
            document.getElementById('confirmTitle').innerText = 'Are you sure you want to reset your game?'
            document.getElementById('confirmContent').innerText = 'This will export your savefile to the clipboard but delete your save game in local storage.'
            document.getElementById('confirm').style.display = 'block'
            document.getElementById('confirmContainer').style.display = 'block'
            document.getElementById('noConfirm').addEventListener('click', () => {closeModal(2)})
            document.getElementById('yesConfirm').addEventListener('click', () => {fullReset();closeModal(2)})
            break
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
