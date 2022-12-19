const dataCardNames = ['Automation Data','Logistics Data','Chemical Data','Utilization Data','Productivity Data','Rocketry Data']
const dataCardColors = ['--red','--green','--blue','--yellow','--purple','--white2']
//In the Future Add the Science Packs from SE (Biological, Material, Astronomical, Energy & Deep Space I-IV)
const researchObjs = [
    {
        name: 'Automation I',
        desc: 'The First Tier of Automating Boring Tasks',
        cost: {aD: D(10), lD: D(0), cD: D(0), uD: D(0), pD: D(0), rD: D(0)},
        reqs: [],
    },
    {
        name: 'Resource Procurement I',
        desc: 'Begin Producing Raw Materials Automatically with Mk1 Miners',
        cost: {aD: D(50), lD: D(0), cD: D(0), uD: D(0), pD: D(0), rD: D(0)},
        reqs: ['Automation'],
    },
]

function generateResearchTree() {

}