const rawResourceNames = ['Iron Ore','Copper Ore','Coal','Stone']
const rawResourceIDs = ['rawResourceText','rawResourceButton','rawResourceUpButton']

const smeltedResourceNames = ['Iron Ingot','Copper Ingot','Stone Brick','Steel Ingot']
const smeltedResourceIDs = ['smeltedResourceText','smeltedResourceButton']
const smeltedResourceReqs = [D(2),D(2),D(2),D(10)]

function updateMiningHTML() {
    if(data.settingsToggles[0]) {

    }
    else {
        for(let i = 0; i < rawResourceNames.length; i++) {
            DOMCacheGetOrSet(`${rawResourceIDs[1]}${i}`).innerText = `Mine ${rawResourceNames[i]} | +1.00 (${formatSci(data.rawResourcesStored[i])})`
            DOMCacheGetOrSet(`${rawResourceIDs[2]}${i}`).innerText = `Upgrade to MK1 Miner [LOCKED]`
            DOMCacheGetOrSet(`${rawResourceIDs[2]}${i}`).classList = `redButton`
        }
    }
}

function updateSmeltingHTML() {
    for(let i = 0; i < smeltedResourceNames.length-1; i++) {
            DOMCacheGetOrSet(`${smeltedResourceIDs[0]}${i}`).innerText = `${smeltedResourceNames[i]} Smelter (${formatSci(data.smeltedResourcesStored[i])})`
        if(i !== 2) {
            DOMCacheGetOrSet(`${smeltedResourceIDs[1]}${i}`).innerText = `Cost: ${formatSci(smeltedResourceReqs[i])} ${rawResourceNames[i]} + 1 Coal | +1 Ingot`
            DOMCacheGetOrSet(`${smeltedResourceIDs[1]}${i}`).classList = data.rawResourcesStored[i].lt(smeltedResourceReqs[i]) 
            || data.rawResourcesStored[2].lt(1) ? `redButton` : `greenButton`
        }
        else if(i === 2) {
            DOMCacheGetOrSet(`${smeltedResourceIDs[1]}${i}`).innerText = `Cost: ${formatSci(smeltedResourceReqs[i])} Stone + 2 Coal | +1 Brick`
            DOMCacheGetOrSet(`${smeltedResourceIDs[1]}${i}`).classList = data.rawResourcesStored[3].lt(smeltedResourceReqs[i]) 
            || data.rawResourcesStored[2].lt(1) ? `redButton` : `greenButton`
        }
        else if(i === 3) {
            DOMCacheGetOrSet(`${smeltedResourceIDs[1]}${i}`).innerText = `Cost: ${formatSci(smeltedResourceReqs[i])} Iron Ingot + 5 Coal | +1 Ingot`
            DOMCacheGetOrSet(`${smeltedResourceIDs[1]}${i}`).classList = data.smeltedResourcesStored[0].lt(smeltedResourceReqs[i]) 
            || data.rawResourcesStored[2].lt(1) ? `redButton` : `greenButton`
        }
    }
}

//function upgradeMiner(i)

function mineOre(i) {
    //TODO: Implement Automated Mining Once we have Science Added
    if(data.settingsToggles[0]) {
        if(data.rawResourcesRemaining[i].gt(0)) {
            data.rawResourcesRemaining[i] = data.rawResourcesRemaining[i].sub(1)
            data.rawResourcesStored[i] = data.rawResourcesStored[i].add(1)
        }
    }
    else {
        data.rawResourcesStored[i] = data.rawResourcesStored[i].add(1)
    }
}

function smelt(i) {
    if(i !== 2) {
        if(data.rawResourcesStored[i].gte(smeltedResourceReqs[i]) && data.rawResourcesStored[2].gte(1)) {
            data.rawResourcesStored[i] = data.rawResourcesStored[i].sub(smeltedResourceReqs[i])
            data.rawResourcesStored[2] = data.rawResourcesStored[2].sub(1)
            data.smeltedResourcesStored[i] = data.smeltedResourcesStored[i].add(1)
        }
    }
    else if(i === 2) {
        if(data.rawResourcesStored[3].gte(smeltedResourceReqs[i]) && data.rawResourcesStored[2].gte(1)) {
            data.rawResourcesStored[3] = data.rawResourcesStored[3].sub(smeltedResourceReqs[i])
            data.rawResourcesStored[2] = data.rawResourcesStored[2].sub(2)
            data.smeltedResourcesStored[i] = data.smeltedResourcesStored[i].add(1)
        }
    }
    else if(i === 3) {
        if(data.smeltedResourcesStored[0].gte(smeltedResourceReqs[i]) && data.rawResourcesStored[2].gte(1)) {
            data.smeltedResourcesStored[0] = data.smeltedResourcesStored[0].sub(smeltedResourceReqs[i])
            data.rawResourcesStored[2] = data.rawResourcesStored[2].sub(5)
            data.smeltedResourcesStored[i] = data.smeltedResourcesStored[i].add(1)
        }
    }
}