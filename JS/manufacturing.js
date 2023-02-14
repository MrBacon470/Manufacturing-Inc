const itemNames = ['Copper Plate','Iron Plate','Iron Gear','Automation Data Creation','Copper Wire','Green Circuit','Iron Rod','Yellow Conveyor Belt','Electric Inserter','Logistics Data Creation']
const itemImgIDs = ['copperPlate.png','ironPlate.png','ironGear.png','autoData.png','copperWire.png','greenChip.png','ironRod.png','yellowConveyor.png','inserter.png','logiData.png']
const itemCosts = ['1 Copper Ingot','1 Iron Ingot','1 Iron Plate','4 Copper Plates + 2 Iron Gears','1 Copper Plate','1 Copper Wire + 1 Iron Plate','1 Iron Plate','1 Iron Plate + 2 Iron Gears','1 Iron Rod, 1 Iron Plate, 1 Green Circuit','1 Electric Inserter + 1 Yellow Belt']

function updateManufacturingHTML() {
    for(let i = 0; i < itemNames.length; i++) {
        DOMCacheGetOrSet(`Item${i}Amt`).innerText = `(${formatSci(data.manufacturedItems[i])})`
    }
    DOMCacheGetOrSet(`Item0Button`).classList = data.smeltedResourcesStored[1].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item1Button`).classList = data.smeltedResourcesStored[0].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item2Button`).classList = data.manufacturedItems[1].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item3Button`).classList = data.manufacturedItems[0].gte(4) && data.manufacturedItems[2].gte(2) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item4Button`).classList = data.manufacturedItems[0].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item5Button`).classList = data.manufacturedItems[1].gte(1) && data.manufacturedItems[4].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item6Button`).classList = data.manufacturedItems[1].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item7Button`).classList = data.manufacturedItems[1].gte(1) && data.manufacturedItems[2].gte(2) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item8Button`).classList = data.manufacturedItems[6].gte(1) && data.manufacturedItems[1].gte(1) && data.manufacturedItems[5].gte(1) ? 'greenButton' : 'redButton'
    DOMCacheGetOrSet(`Item9Button`).classList = data.manufacturedItems[8].gte(1) && data.manufacturedItems[7].gte(1) ? 'greenButton' : 'redButton'
}

function produceItem(i) {
    switch(i) {
        default: 
            console.warn('Item Index not found, most likely not implemented yet')
            break
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
            break
        case 4:
            if(data.manufacturedItems[0].gte(1)) {
                data.manufacturedItems[0] = data.manufacturedItems[0].sub(1)
                data.manufacturedItems[4] = data.manufacturedItems[4].add(2)
            }
            break
        case 5:
            if(data.manufacturedItems[1].gte(1) && data.manufacturedItems[4].gte(1)) {
                data.manufacturedItems[1] = data.manufacturedItems[1].sub(1)
                data.manufacturedItems[4] = data.manufacturedItems[4].sub(1)
                data.manufacturedItems[5] = data.manufacturedItems[5].add(1)
            }
            break
        case 6:
            if(data.manufacturedItems[1].gte(1)) {
                data.manufacturedItems[1] = data.manufacturedItems[1].sub(1)
                data.manufacturedItems[6] = data.manufacturedItems[6].add(1)
            }
            break
        case 7:
            if(data.manufacturedItems[1].gte(1) && data.manufacturedItems[2].gte(2)) {
                data.manufacturedItems[1] = data.manufacturedItems[1].sub(1)
                data.manufacturedItems[2] = data.manufacturedItems[2].sub(2)
                data.manufacturedItems[7] = data.manufacturedItems[7].add(1)
            }
            break
        case 8:
            if(data.manufacturedItems[6].gte(1) && data.manufacturedItems[1].gte(1) && data.manufacturedItems[5].gte(1)) {
                data.manufacturedItems[6] = data.manufacturedItems[6].sub(1)
                data.manufacturedItems[1] = data.manufacturedItems[1].sub(1)
                data.manufacturedItems[5] = data.manufacturedItems[5].sub(1)
                data.manufacturedItems[8] = data.manufacturedItems[8].add(1)
            }
            break
        case 9:
            if(data.manufacturedItems[8].gte(1) && data.manufacturedItems[7].gte(1)) {
                data.manufacturedItems[8] = data.manufacturedItems[8].sub(1)
                data.manufacturedItems[7] = data.manufacturedItems[7].sub(1)
                data.manufacturedItems[9] = data.manufacturedItems[9].add(1)
            }
            break
        
    }

}