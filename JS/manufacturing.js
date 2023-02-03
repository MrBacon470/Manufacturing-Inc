const itemNames = ['Copper Plate','Iron Plate','Iron Gear','Automation Data Creation']
const itemImgIDs = ['copperPlate.png','ironPlate.png','ironGear.png','autoData.png']
const itemCosts = ['1 Copper Ingot','1 Iron Ingot','1 Iron Plate','4 Copper Plates + 2 Iron Gears']

function updateManufacturingHTML() {
    for(let i = 0; i < itemNames.length; i++) {
        DOMCacheGetOrSet(`Item${i}Amt`).innerText = `(${formatSci(data.manufacturedItems[i])})`
    }
    DOMCacheGetOrSet(`Item0Button`).classList = data.smeltedResourcesStored[1].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item1Button`).classList = data.smeltedResourcesStored[0].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item2Button`).classList = data.manufacturedItems[1].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item3Button`).classList = data.manufacturedItems[0].gte(4) && data.manufacturedItems[2].gte(2) ? 'greenButton' : 'redButton'
}

function produceItem(i) {
    switch(i) {
        case 0:
            if(data.smeltedResourcesStored[1].gte(1)) {
                data.smeltedResourcesStored[1] = data.smeltedResourcesStored[1].sub(1)
                data.manufacturedItems[0] = data.manufacturedItems[0].add(1)
            }
            break
        case 1: 
            if(data.smeltedResourcesStored[0].gte(1)) {
                data.smeltedResourcesStored[0] = data.smeltedResourcesStored[0].sub(1)
                data.manufacturedItems[1] = data.manufacturedItems[1].add(1)
            }
            break   
        case 2:
            if(data.manufacturedItems[1].gte(1)) {
                data.manufacturedItems[1] = data.manufacturedItems[1].sub(1)
                data.manufacturedItems[2] = data.manufacturedItems[2].add(1)
            }
            break
        case 3:
            if(data.manufacturedItems[0].gte(4) && data.manufacturedItems[2].gte(2)) {
                data.manufacturedItems[0] = data.manufacturedItems[0].sub(4)
                data.manufacturedItems[2] = data.manufacturedItems[2].sub(2)
                data.manufacturedItems[3] = data.manufacturedItems[3].add(1)
            }
    }

}