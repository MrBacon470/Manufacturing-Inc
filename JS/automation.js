/**
 * @param i i is the identifier of what automator array to use
 * @param j j is the identifier of what automator to toggle
 */
function toggleAuto(i,j) {
    switch(i) {
        case 0:
            data.miningAuto[j] = !data.miningAuto[j]
            DOMCacheGetOrSet(`rawResource${j}AutoButton`).innerHTML = `Automation [${data.miningAuto[j]?'ON':'OFF'}]`
            break
        case 1:
            data.smeltingAuto[j] = !data.smeltingAuto[j]
            DOMCacheGetOrSet(`smeltedResource${j}AutoButton`).innerHTML = `Automation [${data.smeltingAuto[j]?'ON':'OFF'}]`
            break
        case 2:
            data.manufacturingAuto[j] = !data.manufacturingAuto[j]
            DOMCacheGetOrSet(`Item${j}AutoButton`).innerHTML = `Automation [${data.manufacturingAuto[j]?'ON':'OFF'}]`
            break
    }
}