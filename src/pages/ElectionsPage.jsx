import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Api } from '../api'

export default function ElectionsPage() {
  const [loadingPage, setLoadingPage] = useState(true)
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(null)  
  const [loadingElections, setLoadingElections] = useState(true)
  const [currentElections, setCurrentElections] = useState([])

  
useEffect(()=>{
    async function getCities(){
      setLoadingPage(true)
      const backendCities = await Api.getCities()
      setCities(backendCities)
      setSelectedCity(backendCities[0].id)
      setLoadingPage(false)
    }

    getCities()

}, [])


useEffect(()=>{
  if (!selectedCity){
    return
  }
  async function getElections(){
    setLoadingElections(true)
    const backendElections = await Api.getElections(selectedCity)
    setCurrentElections(backendElections)
    setLoadingElections(false)
  }

  getElections()

}, [selectedCity])


function handleButtonClick(event){
  const {currentTarget} = event
  setSelectedCity( currentTarget.value)
}

if(loadingPage){
  return (<div className="text-center mt-4">
          <ClipLoader/>
         </div>)
  }

  const citiesJsx = (<ul className="flex flex-row flex-wrap item-center justify-center">{
    cities.map(({id, name}) => {
      const isSelected = selectedCity === id ? 'bg-gray-500 text-white' : ''
      return (
        <li key={id}> 
          <button
            id={id} 
            onClick={handleButtonClick} 
            className={`bg-gray-200 w-28 m-1 rounded-md ${isSelected}`}
            value={id}>
            
            {name} 
          </button>
        </li>
        )
    })}
  </ul>)

let electionsDataJsx = (
  <div className="text-center mt-4">
    <ClipLoader/>
  </div>
)

  if(!loadingElections){
    const {city, votes } = currentElections
    electionsDataJsx = (
      <div className="border p-2 mt-4">
        <h2 className="text-center font-semibold mt-4">
          Eleições ein {city.name} 
        </h2>

        <h2>Total de eleitores: {city.votingPopulation}</h2>
        <h2>Comparecimento: {city.presence}</h2>
        <h2>Abstenção: {city.absence}</h2>

        <ul className="mt-4">
          {currentElections.votes.map((item, index) => {
            const position = index + 1 
            const { id, candidate, votes } = item
            const { name, username } = candidate

            return (
              <li key={id} className="flex flex-row items-center justify-start space-x-4">
                <span>{position}</span>
                <span>
                  <img className="rounded-full" width={30} src={`/img/${username}.png`} alt={name} />
                </span>
                <span className="w-25">{name}</span>
                <span>{votes} votos</span>
                <span>{((votes/ city.presence)*100).toFixed(2).padStart(6, String.fromCharCode(160))}% </span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }


  return (
    <div>
      {citiesJsx}
      {electionsDataJsx}
    </div>
  );
}
