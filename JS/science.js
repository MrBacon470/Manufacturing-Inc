const dataCardNames = ['Automation Data','Logistics Data','Chemical Data','Utilization Data','Productivity Data','Rocketry Data']
const dataCardColors = ['--red','--green','--blue','--yellow','--purple','--white2']
//In the Future Add the Science Packs from SE (Biological, Material, Astronomical, Energy & Deep Space I-IV)
//Maybe also Advanced, Singularity and Optimization from K2
const researchObjs = [
    {
        name: 'Automation I',
        desc: 'The Core Research and the point of this',
        cost: {aD: D(10), lD: D(0), cD: D(0), uD: D(0), pD: D(0), rD: D(0)},
        reqs: [],
    },
]

function generateResearchTree() {
    for(let i = 0; i < researchObjs.length / 5; i++) {
        htmlStr = `<div id="rRow${i}" class="manufactoryRow"></div>`
        DOMCacheGetOrSet('researchTreeHolder').insertAdjacentHTML('beforeend',htmlStr)
        for(let j = 0; j < 5; j++) {
            if(j + i*5 >= researchObjs.length) break
            htmlStr = 
            `<div id="researchHold${j+i*5}" class="researchHolder">
            <h4 id="researchTitleText${j+i*5}" style="text-align:center">Research Name</h4>
            <p id="researchDescText${j+i*5}" style="text-align:center">Research Description</p>
            <p id="researchCostText${j+i*5}" style="text-align:center">Cost :D</p>
            <button id="researchButton${j+i*5}">Research This</button>
            </div>`
            DOMCacheGetOrSet(`rRow${i}`).insertAdjacentHTML('beforeend',htmlStr)
        }
    }
    for(let i = 0; i < researchObjs.length; i++) {
        let costString = `Cost: <a style="color:var(--red);text-align:center">${formatSci(researchObjs[i].cost.aD)}</a>`
        if(researchObjs[i].cost.lD.gt(0)) costString += ` <a style="color:var(--green)">${formatSci(researchObjs[i].cost.lD)}</a>`
        if(researchObjs[i].cost.cD.gt(0)) costString += ` <a style="color:var(--blue)">${formatSci(researchObjs[i].cost.cD)}</a>`
        if(researchObjs[i].cost.uD.gt(0)) costString += ` <a style="color:var(--yellow)">${formatSci(researchObjs[i].cost.uD)}</a>`
        if(researchObjs[i].cost.pD.gt(0)) costString += ` <a style="color:var(--purple)">${formatSci(researchObjs[i].cost.pD)}</a>`
        if(researchObjs[i].cost.rD.gt(0)) costString += ` <a style="color:var(--white2)">${formatSci(researchObjs[i].cost.rD)}</a>`

        DOMCacheGetOrSet(`researchTitleText${i}`).innerText = researchObjs[i].name
        DOMCacheGetOrSet(`researchDescText${i}`).innerText = researchObjs[i].desc
        DOMCacheGetOrSet(`researchCostText${i}`).innerHTML = costString
        DOMCacheGetOrSet(`researchButton${i}`).addEventListener('click',() => {researchItem()})
        DOMCacheGetOrSet(`researchHold${i}`).style.border = '2px solid var(--red)'
        if(researchObjs[i].cost.lD.gt(0))
            DOMCacheGetOrSet(`researchHold${i}`).style.border = '2px solid var(--green)'
        if(researchObjs[i].cost.cD.gt(0))
            DOMCacheGetOrSet(`researchHold${i}`).style.border = '2px solid var(--blue)'
        if(researchObjs[i].cost.uD.gt(0))
            DOMCacheGetOrSet(`researchHold${i}`).style.border = '2px solid var(--yellow)'
        if(researchObjs[i].cost.pD.gt(0))
            DOMCacheGetOrSet(`researchHold${i}`).style.border = '2px solid var(--purple)'
        if(researchObjs[i].cost.rD.gt(0))
            DOMCacheGetOrSet(`researchHold${i}`).style.border = '2px solid var(--white2)'
    }
}

function updateScienceHTML() {
    for(let i = 0; i < researchObjs.length; i++) {
        //Check that all Pre-Requirements to Display research are unlocked
        let preReqsUnlocked = true 
        let purchasable = false
        if(researchObjs[i].cost.aD.lte(data.scienceAmounts[0]) && researchObjs[i].cost.lD.lte(data.scienceAmounts[1]) && researchObjs[i].cost.cD.lte(data.scienceAmounts[2])
        && researchObjs[i].cost.uD.lte(data.scienceAmounts[3]) && researchObjs[i].cost.pD.lte(data.scienceAmounts[4]) && researchObjs[i].cost.rD.lte(data.scienceAmounts[5]))
            purchasable = true
        for(let j = 0; j < researchObjs[i].reqs.length; j++)
            if(!data.researchedItem[researchObjs[i].reqs[j]]) preReqsUnlocked = false
        
        DOMCacheGetOrSet(`researchHold${i}`).style.display = preReqsUnlocked ? 'flex' : 'none'
        //Only Visually Update is Container is Displayed
        if(preReqsUnlocked) {
            DOMCacheGetOrSet(`researchButton${i}`).classList = purchasable ? 'greenButton' : 'redButton'
            DOMCacheGetOrSet(`researchButton${i}`).style.display = data.researchedItem[i] ? 'none' : 'inline'
        }
    }
}

function researchItem(i) {
    if(researchObjs[i].cost.aD.lte(data.scienceAmounts[0]) && researchObjs[i].cost.lD.lte(data.scienceAmounts[1]) && researchObjs[i].cost.cD.lte(data.scienceAmounts[2])
    && researchObjs[i].cost.uD.lte(data.scienceAmounts[3]) && researchObjs[i].cost.pD.lte(data.scienceAmounts[4]) && researchObjs[i].cost.rD.lte(data.scienceAmounts[5])) {
        data.scienceAmounts[0] = data.scienceAmounts[0].sub(researchObjs[i].cost.aD)
        data.scienceAmounts[1] = data.scienceAmounts[1].sub(researchObjs[i].cost.lD)
        data.scienceAmounts[2] = data.scienceAmounts[2].sub(researchObjs[i].cost.cD)
        data.scienceAmounts[3] = data.scienceAmounts[3].sub(researchObjs[i].cost.uD)
        data.scienceAmounts[4] = data.scienceAmounts[4].sub(researchObjs[i].cost.pD)
        data.scienceAmounts[5] = data.scienceAmounts[5].sub(researchObjs[i].cost.rD)
        data.researchedItem[i] = true
    } else return
}