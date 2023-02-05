import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './utils/getRandomLocation'

function App() {
  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  const [hasError,setHasError] = useState(false)
  // const [listLocation,setListLocation] = useState()
  // const [isShow,setIsShow] = useState(false)

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`
    axios.get(url)
      .then(res=> {
        setLocation(res.data),
        setHasError(false)
        })
      .catch(error => {
        console.log(error),
        setHasError(true)
        })
  }, [numberLocation])

  const handleSubmit = e => {
    e.preventDefault()
    if(e.target.inputLocation.value.trim().length===0) {
      setNumberLocation(getRandomLocation())
    } else if(e.target.inputLocation.value==='0' ) {
      setNumberLocation(getRandomLocation())
    } else {
      setNumberLocation(e.target.inputLocation.value.trim())
    }
    e.target.inputLocation.value = e.target.inputLocation.value.trim()
  }
  const handleChange = e => {
    console.log(e.target.value.trim()) 
    const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
    axios.get(url)
      .then(res=>setListLocation(res.data.results))
      .catch(error=>console.log(error))
  }

  const handleFocus = () => setIsShow(true)
  const handleBlur = () => setIsShow(false)

  return (
    <div className="app">
      <h1 className='app__title'>Rick and Morty</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input 
          className='form__input' 
          id="inputLocation" 
          type="text"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button className='form__btn'>Search</button>
      </form>
      {/* {   
        isShow &&   
        <ul>
          {
            listLocation?.map((loc) => (
              <li 
                onClick={() => setNumberLocation(loc.id)}
                key={loc.id}
                >
                {loc.name}
              </li>
            ))
          }
        </ul>
      } */}
      {hasError ? (
        <h2 className='app__error'>😡Hey! you must provide un id from 1 to 126😡</h2>
      ) : (
        <>
          <LocationInfo location={location} />
          <div className='residents__container'>
            {location?.residents.map((url) => (
              <ResidentInfo key={url} url={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App
