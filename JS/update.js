function updateHTML() {
    //Globals
    DOMCacheGetOrSet('ironIngotText').innerText = `Iron Ingots: ${formatSci(data.smeltedResourcesStored[0])}`
    DOMCacheGetOrSet('copperIngotText').innerText = `Copper Ingots: ${formatSci(data.smeltedResourcesStored[1])}`
    DOMCacheGetOrSet('stoneBrickText').innerText = `Stone Bricks: ${formatSci(data.smeltedResourcesStored[2])}`
    DOMCacheGetOrSet('steelIngotText').innerText = `Steel Ingots: ${formatSci(data.smeltedResourcesStored[3])}`
    if(data.currentTab === 0) {
        DOMCacheGetOrSet('setToggle0').innerText = data.settingsToggles[0] ? 'Depletable Resources [ON]' : 'Depletable Resources [OFF]'
    }
    else if(data.currentTab === 1) {
        updateMiningHTML()
        updateSmeltingHTML()
        for(let i = 0; i < data.miningAuto.length; i++)
            DOMCacheGetOrSet(`rawResource${i}AutoButton`).style.display = data.researchTier.gte(1) ? 'block' : 'none'
        for(let i = 0; i < 2; i++)
            DOMCacheGetOrSet(`smeltedResource${i}AutoButton`).style.display = data.researchTier.gte(2) ? 'block' : 'none'
        DOMCacheGetOrSet(`smeltedResource2AutoButton`).style.display = 'none'
    }
    else if(data.currentTab === 2) {
        updateManufacturingHTML()
        for(let i = 0; i < 4; i++) 
            DOMCacheGetOrSet(`Item${i}AutoButton`).style.display = data.researchTier.gte(9) ? 'block' : 'none'
        for(let i = 4; i < 6; i++) {
            DOMCacheGetOrSet(`manufactory${i}`).style.display = data.researchTier.gte(4) ? 'flex' : 'none'
            DOMCacheGetOrSet(`Item${i}AutoButton`).style.display = 'none'
        }
            
    }
    else if(data.currentTab === 3) {
        updateScienceHTML()
    }
}
