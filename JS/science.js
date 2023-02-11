const dataCardNames = ['Automation Data','Logistics Data','Chemical Data','Utilization Data','Productivity Data','Rocketry Data']
const dataCardColors = ['--red','--green','--blue','--yellow','--purple','--white2']
const rarityNames = ['Common','Uncommon','Rare','Epic','Legendary','Mythic']
const rarityColors = ['--white2','--green','--blue','--purple','--yellow','--red']
//In the Future Add the Science Packs from SE (Biological, Material, Astronomical, Energy & Deep Space I-IV)
//Maybe also Advanced, Singularity and Optimization from K2
const permanentPerks = [
    {
        name: 'Electric Miners Mk1',
        desc: 'Slow but better than doing it by hand',
        tier: 1
    },
    {
        name: 'Auto Smelting Iron and Copper',
        desc: 'Hey its something alright you\'ll get some more later',
        tier: 2
    },
    {
        name: 'Basic Circuitry',
        desc: 'Unlocks Copper Wire and very basic electronics: Green Chips',
        tier: 4
    },
    {
        name: 'Steel Smelting',
        desc: 'Unlocks Steel Ingots for Heartier Machines',
        tier: 5
    },
    {
        name: 'Steel Furnaces',
        desc: 'Steel Furnace Upgrade gives permanent +2x Smelting productivity boost',
        tier: 6
    },
    {
        name: 'Automation Data Assembly',
        desc: 'Unlocks assemblers for Automation Data and its required items',
        tier: 9
    },
    {
        name: 'Logistics Data Acquisition',
        desc: 'Unlocks Belts, Inserters and Logistics Data for new research',
        tier: 10
    }
]

const randomPerks = [
    {
        name: 'Mining Productivity',
        desc: 'Boosts items gained from mining',
    },
    {
        name: 'Assembler Productivity',
        desc: 'Boosts items gained from manufacturing',
    },
    {
        name: 'Smelting Productivity',
        desc: 'Boosts items gained from smelting',
    },
    {
        name: 'Research Efficiency',
        desc: 'Decreases research costs',
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
