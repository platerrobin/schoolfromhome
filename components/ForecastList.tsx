import React from 'react'
import { format } from 'date-fns'

export default function ForecastList({ forecast, units }:{ forecast:any; units:string }){
  if (!forecast || !forecast.list) return null

  const days:any = {}
  forecast.list.forEach((item:any) => {
    const date = new Date(item.dt * 1000)
    const key = date.toISOString().slice(0,10)
    const hour = date.getHours()
    if (!days[key] || Math.abs(hour - 12) < Math.abs(new Date(days[key].dt*1000).getHours() - 12)) {
      days[key] = item
    }
  })

  const entries = Object.values(days).slice(0,5)
  const unitSymbol = units === 'imperial' ? '°F' : '°C'

  return (
    <div style={{ display:'flex', gap:12, marginTop:12, overflowX:'auto' }}>
      {entries.map((item:any) => (
        <div key={item.dt} style={{ background:'#fff', padding:12, borderRadius:8, minWidth:110, textAlign:'center', boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
          <div style={{ fontSize:12, color:'#666' }}>{format(new Date(item.dt*1000), 'eee MMM d')}</div>
          <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" style={{ width:60 }} />
          <div style={{ fontWeight:600 }}>{Math.round(item.main.temp)}{unitSymbol}</div>
          <div style={{ fontSize:12, color:'#666' }}>{item.weather[0].main}</div>
        </div>
      ))}
    </div>
  )
}
