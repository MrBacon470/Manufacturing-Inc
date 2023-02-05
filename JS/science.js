const dataCardNames = ['Automation Data','Logistics Data','Chemical Data','Utilization Data','Productivity Data','Rocketry Data']
const dataCardColors = ['--red','--green','--blue','--yellow','--purple','--white2']
const rarityNames = ['Common','Uncommon','Rare','Epic','Legendary','Mythic']
const rarityColors = ['--white2','--green','--blue','--purple','--yellow','--red']
//In the Future Add the Science Packs from SE (Biological, Material, Astronomical, Energy & Deep Space I-IV)
//Maybe also Advanced, Singularity and Optimization from K2
const permanentPerks = [
    {
        name: 'Electric Miners',
        desc: 'Hey you wanted automation, right?',
        tier: 1
    }
]

const randomPerks = [
    {
        name: 'Mining Productivity',
        desc: 'Boosts mining output',
    },
    {

    }
]

function generateResearchTree() {
    
}

function updateScienceHTML() {
        DOMCacheGetOrSet(`dataText0`).innerText = `${dataCardNames[0]}: ${formatSci(data.manufacturedItems[3])}`
        for(let i = 1; i < dataCardNames.length; i++) {
            DOMCacheGetOrSet(`dataText${i}`).innerText = `${dataCardNames[i]}: N/A`
        }
}
