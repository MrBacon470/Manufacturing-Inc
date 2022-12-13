function D(x){return new Decimal(x)}
//create all the variables in a data object for saving
function getDefaultObject() {
    return {
        time: Date.now(),
        currentTab: 0,
        settingsToggles: [],
        buyAmounts: [],
        currentUpdate: 'v0.0.1',
        devSpeed: 1,
    }
}

let data = getDefaultObject()
//saving and loading
const saveName = 'inactiveTesting'
function save(){
    window.localStorage.setItem(saveName, JSON.stringify(data))
    $.notify('Game Saved','info')
}
function load() {
    let savedata = JSON.parse(window.localStorage.getItem(saveName))
    if(savedata === null || savedata === undefined) savedata = getDefaultObject()
    else if (savedata !== undefined) fixSave(data, savedata)
    //Update 1.0.0 Saves to Current Version
    if(data.currentUpdate !== getDefaultObject().currentUpdate){
        $.notify(`New Update: ${getDefaultObject().currentUpdate}`,'success')
        data.currentUpdate = getDefaultObject().currentUpdate
    }
}
//fix saves
function fixSave(main=getDefaultObject(), data) {
    if (typeof data === "object") {
        Object.keys(data).forEach(i => {
            if (main[i] instanceof Decimal) {
                main[i] = D(data[i]!==null?data[i]:main[i])
            } else if (typeof main[i]  == "object") {
                fixSave(main[i], data[i])
            } else {
                main[i] = data[i]
            }
        })
        return main
    }
    else return getDefaultObject()
}
function exportSave(){
    save()
    let exportedData = btoa(JSON.stringify(data));
    const exportedDataText = document.createElement("textarea");
    exportedDataText.value = exportedData;
    document.body.appendChild(exportedDataText);
    exportedDataText.select();
    exportedDataText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(exportedDataText);
    $.notify('Save File Exported to Clip Board','success')
}
function importSave(){
    let importedData = DOMCacheGetOrSet('promptInput').value
    if(importedData.length <= 0 || importedData === undefined) {
        $.notify('No Data Imported','error')
        DOMCacheGetOrSet('promptContainer').style.display = 'none'
        return
    }
    else if(importedData.toLowerCase() === '69' || importedData.toLowerCase() === '420'){
        $.notify('Nice','success')
        DOMCacheGetOrSet('promptContainer').style.display = 'none'
        return
    }
    data = Object.assign(getDefaultObject(), JSON.parse(atob(importedData)))
    save()
    location.reload()
}
window.setInterval(function(){
    save()
}, 30000);
window.onload = function (){
    load()
    generateEventHandlers()
    diff = (Date.now()-data.time)*data.devSpeed/1000
    $.notify('Welcome Back!\nYou were gone for ' + formatTime(diff), 'info')
    changeTab(data.currentTab)
    $.notify('Game Loaded','info')
    DOMCacheGetOrSet('titleText').innerText = `Manufacturing Inc - ${getDefaultObject().currentUpdate}`
}
//full reset
function fullReset(){
    exportSave()
    deleteSave()
}
function deleteSave(){
    window.localStorage.removeItem(saveName)
    location.reload()
}
