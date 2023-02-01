const dataCardNames = ['Automation Data','Logistics Data','Chemical Data','Utilization Data','Productivity Data','Rocketry Data']
const dataCardColors = ['--red','--green','--blue','--yellow','--purple','--white2']
//In the Future Add the Science Packs from SE (Biological, Material, Astronomical, Energy & Deep Space I-IV)
//Maybe also Advanced, Singularity and Optimization from K2
const researchObjs = [
   
]

function generateResearchTree() {
    
}

function updateScienceHTML() {
   
}

function researchItem(i) {
    if(researchObjs[i].cost.aD.lte(data.scienceAmounts[0]) && researchObjs[i].cost.lD.lte(data.scienceAmounts[1]) && researchObjs[i].cost.cD.lte(data.scienceAmounts[2])
    && researchObjs[i].cost.uD.lte(data.scienceAmounts[3]) && researchObjs[i].cost.pD.lte(data.scienceAmounts[4]) && researchObjs[i].cost.rD.lte(data.scienceAmounts[5])) {
        data.scienceAmounts[0] = data.scienceAmounts[0].sub(researchObjs[i].cost.aD)
        data.scienceAmounts[1] = data.scienceAmounts[1].sub(researchObjs[i].cost.lD)
        data.scienceAmounts[2] = data.scienceAmounts[2].sub(researchObjs[i].cost.cD)
        data.scienceAmounts[3] = data.scienceAmounts[3].sub(researchObjs[i].cost.uD)
        data.scienceAmounts[4] = data.scienceAmounts[4].sub(researchObjs[i].cost.pD)
        data.scienceAmounts[5] = data.scienceAmounts[5].sub(researchObjs[i].cost.rD)
        data.researchedItem[i] = true
    } else return
}