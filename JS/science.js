const dataCardNames = ['Automation Data','Logistics Data','Chemical Data','Utilization Data','Productivity Data','Rocketry Data']
const dataCardColors = ['--red','--green','--blue','--yellow','--purple','--white2']

const researchObjs = [
    {
        name: 'Automation',
        cost: {aD: D(10), lD: D(0), cD: D(0), uD: D(0), pD: D(0), rD: D(0)},
        reqs: [],
    },
    {
        name: 'Logistics',
        cost: {aD: D(20), lD: D(0), cD: D(0), uD: D(0), pD: D(0), rD: D(0)},
        reqs: ['Automation'],
    },
]

function generateResearchTree() {

}