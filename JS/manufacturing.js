const itemNames = ['Copper Plate','Iron Plate','Iron Gear','Automation Data Creation']
const itemImgIDs = ['','','','autoData.png']
const itemCosts = ['1 Copper Ingot','1 Iron Ingot','1 Iron Plate','4 Copper Plates + 2 Iron Gears']

function updateManufacturingHTML() {
    for(let i = 0; i < itemNames.length; i++) {
        DOMCacheGetOrSet(`Item${i}Amt`).innerText = `(${formatSci(data.manufacturedItems[i])})`
    }
    DOMCacheGetOrSet(`Item0Button`).classList = data.smeltedResourcesStored[1].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item1Button`).classList = data.smeltedResourcesStored[0].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item2Button`).classList = data.manufacturedItems[1].gte(1) ? 'greenButton' : 'redButton'
}