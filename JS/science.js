const dataCardNames = ['Automation Data','Logistics Data','Chemical Data','Utilization Data','Productivity Data','Rocketry Data']
const dataCardColors = ['--red','--green','--blue','--yellow','--purple','--white2']
const researchCap = D(10)
//In the Future Add the Science Packs from SE (Biological, Material, Astronomical, Energy & Deep Space I-IV)
//Maybe also Advanced, Singularity and Optimization from K2

const rarityObjs = [
    {
        name: 'Common',
        color: '--white2',
        boost: D(0.01),
        rarity: 0.75
    },
    {
        name: 'Uncommon',
        color: '--green',
        boost: D(0.025),
        rarity: 0.125
    },
    {
        name: 'Rare',
        color: '--blue',
        boost: D(0.05),
        rarity: 0.06
    },
    {
        name: 'Epic',
        color: '--purple',
        boost: D(0.1),
        rarity: 0.035
    },
    {
        name: 'Legendary',
        color: '--yellow',
        boost: D(0.25),
        rarity: 0.02
    },
    {
        name: 'Mythic',
        color: '--red',
        boost: D(0.5),
        rarity: 0.01
    }
]

const researches = [
    {
        name: 'Electric Miners Mk1',
        desc: 'Slow but better than doing it by hand (0.5 Ore/s)',
        tier: D(1)
    },
    {
        name: 'Auto Smelting Iron and Copper',
        desc: 'Hey its something alright you\'ll get some more later',
        tier: D(2)
    },
    {
        name: 'Basic Circuitry',
        desc: 'Unlocks Copper Wire and very basic electronics: Green Chips',
        tier: D(4)
    },
    {
        name: 'Steel Smelting',
        desc: 'Unlocks Steel Ingots for Heartier Machines',
        tier: D(5)
    },
    {
        name: 'Steel Furnaces',
        desc: 'Steel Furnace Upgrade gives permanent +2x Smelting productivity boost',
        tier: D(6)
    },
    {
        name: 'Automation Data Assembly',
        desc: 'Unlocks assemblers for Automation Data and its required items',
        tier: D(9)
    },
    {
        name: 'Logistics Data Acquisition',
        desc: 'Unlocks Belts, Inserters and Logistics Data for new research',
        tier: D(10)
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

function getResearchCost(tier) {
    tier = D(tier)
    return {
        aD: D(50).times(tier),
        lD: D(100).times(tier.sub(10)).lte(0) ? D(0) : D(100).times(tier.sub(10)),
        cD: D(150).times(tier.sub(20)).lte(0) ? D(0) : D(150).times(tier.sub(20)),
        uD: D(200).times(tier.sub(30)).lte(0) ? D(0) : D(200).times(tier.sub(30)),
        pD: D(200).times(tier.sub(40)).lte(0) ? D(0) : D(200).times(tier.sub(40)),
        rD: D(250).times(tier.sub(50)).lte(0) ? D(0) : D(250).times(tier.sub(50)),
    }
}

function getResearchCostString() {
    const researchCostObj = getResearchCost(data.researchTier.plus(1))
    let researchCostString = `Cost: ${formatSci(researchCostObj.aD)} Automation Data`
    if(researchCostObj.lD.gt(0)) researchCostString += `, ${formatSci(researchCostObj.lD)} Logistics Data`
    if(researchCostObj.cD.gt(0)) researchCostString += `, ${formatSci(researchCostObj.cD)} Chemical Data`
    if(researchCostObj.uD.gt(0)) researchCostString += `, ${formatSci(researchCostObj.uD)} Utilization Data`
    if(researchCostObj.pD.gt(0)) researchCostString += `, ${formatSci(researchCostObj.pD)} Productivity Data`
    if(researchCostObj.rD.gt(0)) researchCostString += `, ${formatSci(researchCostObj.rD)} Rocketry Data`
    return researchCostString
}

function getNextTierUnlockText() {
    //Check if next tier has a research assigned in const researches object otherwise return '3 Random Perks
    const nextTierResearch = researches.find(research => research.tier.eq(data.researchTier.plus(1)))
    if(nextTierResearch) return `Unlocks: ${nextTierResearch.name}\n(${nextTierResearch.desc})`
    return `Unlocks: 3 Random Perks`
}

function updateScienceHTML() {
    DOMCacheGetOrSet(`dataText0`).innerText = `${dataCardNames[0]}: ${formatSci(data.manufacturedItems[3])}`
    DOMCacheGetOrSet(`dataText1`).innerText = data.researchTier.lt(10) ? '' : `${dataCardNames[1]}: ${formatSci(data.manufacturedItems[9])}`
    for(let i = 2; i < dataCardNames.length; i++) {
        DOMCacheGetOrSet(`dataText${i}`).innerText = ``
    }
    for(let i = 0; i < randomPerks.length; i++) {
        DOMCacheGetOrSet(`perkText${i}`).innerText = `${randomPerks[i].name}\n(${formatSci(data.perkBoosts[i])}x)`
    }
    DOMCacheGetOrSet('nextTierRewardsHolder').style.display = data.pickPerkMode ? 'flex' : 'none'
    DOMCacheGetOrSet('nextTierHolder').style.display = !data.pickPerkMode ? 'block' : 'none'
    DOMCacheGetOrSet('tierUpButton').classList = canAffordNextTier() ? 'greenButton' : 'redButton'
}

function updateScienceHTMLStart() {
    DOMCacheGetOrSet('currentTierText').innerText = `Current Tier - ${toPlaces(data.researchTier, 0, data.researchTier.plus(1))}`
    DOMCacheGetOrSet('nextTierText').innerText = `Next Tier => ${toPlaces(data.researchTier.plus(1), 0, data.researchTier.plus(2))}`
    DOMCacheGetOrSet('nextTierUnlockText').innerText = getNextTierUnlockText()
    DOMCacheGetOrSet('nextTierCostText').innerText = getResearchCostString()
}

function canAffordNextTier() {
    const researchCostObj = getResearchCost(data.researchTier.plus(1))
    return data.manufacturedItems[3].gte(researchCostObj.aD)
}

function increaseTier() {
    if(data.researchTier.gte(10)) return
    if(!canAffordNextTier()) return
    if(getNextTierUnlockText().includes('Unlocks: 3 Random Perks')) {
        data.pickPerkMode = true
        updateScienceHTML()
        for(let i = 0; i < 3; i++) {
            data.perkIDs[i] = getRndInteger(0, randomPerks.length-1)
            data.perkRarities[i] = pickRarity()
            DOMCacheGetOrSet(`perkHolder${i+1}`).style.border = `2px solid var(${rarityObjs[data.perkRarities[i]].color})`
            DOMCacheGetOrSet(`perkName${i+1}`).innerText = `${randomPerks[data.perkIDs[i]].name}`
            DOMCacheGetOrSet(`perkDesc${i+1}`).innerText = `${randomPerks[data.perkIDs[i]].desc}`
            DOMCacheGetOrSet(`perkRarity${i+1}`).innerText = `[${rarityObjs[data.perkRarities[i]].name}]\n+${formatSci(rarityObjs[data.perkRarities[i]].boost*100)}% Boost`
        }
    }
    else {
        const researchCostObj = getResearchCost(data.researchTier.plus(1))
        data.manufacturedItems[3] = data.manufacturedItems[3].sub(researchCostObj.aD)
    }
    data.researchTier = data.researchTier.plus(1)
    updateScienceHTMLStart()
}
  
function selectPerk(i) {
    if(!data.pickPerkMode) return
    data.perkBoosts[data.perkIDs[i]] = data.perkBoosts[data.perkIDs[i]].add(rarityObjs[data.perkRarities[i]].boost)
    data.pickPerkMode = false
    updateScienceHTML()
}
  
// Define a function to randomly select a rarity based on its drop rate
function pickRarity() {
        // Generate a random number between 0 and 1
        let rand = Math.random();
    
        // Loop through the rarities and check if the random number falls within its drop rate range
        let drop = 0;
        for (let i = 0; i < rarityObjs.length; i++) {
        drop += rarityObjs[i].rarity;
        if (rand < drop) {
            return i;
        }
    }
}