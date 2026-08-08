import React from 'react'

export default function WeatherCard({ data, units }:{ data:any; units:string }){
  if (!data) return null
  const temp = Math.round(data.main.temp)
  const cond = data.weather?.[0]?.description || ''
  const icon = data.weather?.[0]?.icon
  const unitSymbol = units === 'imperial' ? '°F' : '°C'

  return (
    <div style={{ padding:16, borderRadius:8, background:'#fff', boxShadow:'0 1px 4px rgba(0,0,0,0.08)', marginTop:12 }}>
      <div style={{ display:'flex', alignItems:'center' }}>
        <div style={{ marginRight:16 }}>
          {icon && <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={cond} />}
        </div>
        <div>
          <h2 style={{ margin:0 }}>{data.name}, {data.sys?.country}</h2>
          <div style={{ fontSize:28, fontWeight:600 }}>{temp}{unitSymbol}</div>
          <div style={{ color:'#555' }}>{cond}</div>
        </div>
      </div>
      <div style={{ marginTop:12, fontSize:13, color:'#444' }}>
        Humidity: {data.main.humidity}% • Wind: {Math.round(data.wind.speed)} {units === 'imperial' ? 'mph' : 'm/s'}
      </div>
    </div>
  )
}
