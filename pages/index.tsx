import useSWR from 'swr'
import WeatherCard from '../components/WeatherCard'
import ForecastList from '../components/ForecastList'
import { useState } from 'react'

const fetcher = (url:string) => fetch(url).then(r=>r.json())

export default function Home(){
  const [city, setCity] = useState('New York')
  const [units, setUnits] = useState(process.env.NEXT_PUBLIC_DEFAULT_UNITS || 'metric')
  const [query, setQuery] = useState('New York')

  const { data, error } = useSWR(() => `/api/weather?q=${encodeURIComponent(query)}&units=${units}`, fetcher)

  async function handleSearch(e:any){
    e.preventDefault(); setQuery(city)
  }

  async function useMyLocation(){
    if (!navigator.geolocation) { alert('Geolocation not supported'); return }
    navigator.geolocation.getCurrentPosition(async pos => {
      const lat = pos.coords.latitude, lon = pos.coords.longitude
      setQuery(`lat:${lat},lon:${lon}`)
      // fetch via SWR by mutating the key
    })
  }

  return (
    <div style={{ maxWidth:920, margin:'32px auto', padding:16 }}>
      <h1>Weather Dashboard</h1>
      <form onSubmit={handleSearch} style={{ display:'flex', gap:8, marginBottom:12 }}>
        <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City name" style={{ flex:1, padding:8 }} />
        <select value={units} onChange={e=>setUnits(e.target.value)} style={{ padding:8 }}>
          <option value="metric">Metric (°C)</option>
          <option value="imperial">Imperial (°F)</option>
        </select>
        <button type="submit" style={{ padding:'8px 12px' }}>Search</button>
        <button type="button" onClick={useMyLocation} style={{ padding:'8px 12px' }}>Use my location</button>
      </form>

      {error && <div style={{ color:'red' }}>Failed to load: {error.error || JSON.stringify(error)}</div>}
      {!data && <div>Loading…</div>}

      {data?.current && <WeatherCard data={data.current} units={units} />}
      {data?.forecast && <ForecastList forecast={data.forecast} units={units} />}

      <div style={{ marginTop:20, fontSize:13, color:'#666' }}>Data provided by OpenWeatherMap. API key stored server-side.</div>
    </div>
  )
}
