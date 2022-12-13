const rawResourceNames = ['Iron Ore','Copper Ore','Coal','Stone']
const rawResourceIDs = ['rawResourceText','rawResourceButton','rawResourceUpButton']

function updateMiningHTML() {
    if(data.settingsToggles[0]) {

    }
    else {
        for(let i = 0; i < rawResourceNames.length; i++) {
            DOMCacheGetOrSet(`${rawResourceIDs[1]}${i}`).innerText = `Mine ${rawResourceNames[i]} | +1.00 (${formatSci(data.rawResourcesStored[i])})`
            DOMCacheGetOrSet(`${rawResourceIDs[2]}${i}`).innerText = `Upgrade to MK1 Miner [LOCKED] - Currently: Manual Mining`
            DOMCacheGetOrSet(`${rawResourceIDs[2]}${i}`).classList = `redButton`
        }
    }
}

//function upgradeMiner(i)

function mineOre(i) {
    //Implement Automated Mining Once we have Science Added
    if(data.settingsToggles[0]) {
        if(data.rawResourcesRemaining[i].gt(0)) {
            data.rawResourcesRemaining[i].sub(1)
            data.rawResourcesStored[i].add(1)
        }
    }
    else {
        data.rawResourcesStored[i].add(1)
    }
}