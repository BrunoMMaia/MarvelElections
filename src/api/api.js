import axiosModule from 'axios'

const axios = axiosModule.create({
    baseURL: 'http://localhost:3001'
})

async function getCities(){
 const {data: cities} = await axios.get('/cities')
 
 cities.sort( (cityA, cityB) => {
    return cityA.name.localeCompare(cityB.name)
 })

 return cities
}


async function getCity(cityId){
    const cities = await getCities()

    return cities.find(city => city.id === cityId)
}
 
async function getCandidates(){
    const {data: cicandidates } = await axios.get('/candidates')
     
    return cicandidates
   }


async function getElections(cityId){
    const candidates = await getCandidates()
    const city = await getCity(cityId)
    

    const {data: filteredElections} = await axios.get(`/election?cityId=${cityId}`) 

    filteredElections.sort((a, b) => {
        return b.votes - a.votes
    })


    const result = {
        votes: filteredElections.map(item =>{ 
            return {
                ...item, 
                candidate: candidates.find(
                    candidate => candidate.id === item.candidateId
                    ),
            }
        }),
        city,
        candidates,
    }

    return result
}
    


export { getCities, getCandidates, getElections}