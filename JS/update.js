function updateHTML() {
    //Globals
    
    if(data.currentTab === 0) {
        DOMCacheGetOrSet('setToggle0').innerText = data.settingsToggles[0] ? 'Depletable Resources [ON]' : 'Depletable Resources [OFF]'
    }
    else if(data.currentTab === 1) {
        updateMiningHTML()
    }
    else if(data.currentTab === 2) {
        updateSmeltingHTML()
    }
}
