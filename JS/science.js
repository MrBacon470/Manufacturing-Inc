const dataCardNames = ['Automation Data','Logistics Data','Chemical Data','Utilization Data','Productivity Data','Rocketry Data']
const dataCardColors = ['--red','--green','--blue','--yellow','--purple','--white2']
//In the Future Add the Science Packs from SE (Biological, Material, Astronomical, Energy & Deep Space I-IV)
const researchObjs = [
    {
        name: 'Automation I',
        desc: 'The first tier of automating boring tasks',
        cost: {aD: D(10), lD: D(0), cD: D(0), uD: D(0), pD: D(0), rD: D(0)},
        reqs: [],
    },
    {
        name: 'Resource Extraction I',
        desc: 'Unlock the Mk1 electric miner',
        cost: {aD: D(25), lD: D(0), cD: D(0), uD: D(0), pD: D(0), rD: D(0)},
        reqs: ['Automation I'],
    },
    {
        name: 'Electronics',
        desc: 'Unlocks crude basic circuitry',
        cost: {aD: D(25), lD: D(0), cD: D(0), uD: D(0), pD: D(0), rD: D(0)},
        reqs: ['Automation I'],
    },
    {
        name: 'Logistical Data Procurement',
        desc: 'A new type of data for new tech',
        cost: {aD: D(25), lD: D(0), cD: D(0), uD: D(0), pD: D(0), rD: D(0)},
        reqs: ['Automation I','Electronics'],
    },
]

function generateResearchTree() {
    for(let i = 0; i < researchObjs.length / 5; i++) {
        htmlStr = `<div id="rRow${i}" class="manufactoryRow"></div>`
        DOMCacheGetOrSet('researchTreeHolder').insertAdjacentHTML('beforeend',htmlStr)
        for(let j = 0; j < 5; j++) {
            if(j + i*5 >= researchObjs.length) break
            htmlStr = 
            `<div id="researchHold" class="researchHolder">
            <h4 id="researchTitleText${j}" style="text-align:center">Research Name</h4>
            <p id="researchDescText${j}" style="text-align:center">Research Description</p>
            <p id="researchCostText${j}" style="text-align:center">Cost :D</p>
            <button id="researchButton${j}">Research This</button>
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
    }
}