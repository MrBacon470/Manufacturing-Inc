function updateHTML() {
    //Globals
    DOMCacheGetOrSet('ironIngotText').innerText = `Iron Ingots: ${formatSci(data.smeltedResourcesStored[0])}`
    DOMCacheGetOrSet('copperIngotText').innerText = `Copper Ingots: ${formatSci(data.smeltedResourcesStored[1])}`
    DOMCacheGetOrSet('stoneBrickText').innerText = `Stone Bricks: ${formatSci(data.smeltedResourcesStored[2])}`
    DOMCacheGetOrSet('steelIngotText').innerText = `Steel Ingots: ${formatSci(data.smeltedResourcesStored[3])}`
    DOMCacheGetOrSet('powerCapText').innerText = data.researchTier.gt(D(0)) ? '[LOCKED]' : `${formatPrefix(power,'Watts')}/${formatPrefix(powerCap,'Watts')}`
    if(data.currentTab === 0) {
        DOMCacheGetOrSet('setToggle0').innerText = data.settingsToggles[0] ? 'Depletable Resources [ON]' : 'Depletable Resources [OFF]'
    }
    else if(data.currentTab === 1) {
        updateMiningHTML()
        updateSmeltingHTML()
    }
    else if(data.currentTab === 2) {
        updateManufacturingHTML()
    }
    else if(data.currentTab === 3) {
        updateScienceHTML()
    }
}
