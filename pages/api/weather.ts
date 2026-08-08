import type { NextApiRequest, NextApiResponse } from 'next'

// Simple in-memory cache
type CacheEntry = { expires: number; data: any }
const cache = new Map<string, CacheEntry>()
const DEFAULT_TTL = 10 * 60 * 1000 // 10 minutes in ms

function cacheGet(key: string){
  const e = cache.get(key)
  if (!e) return null
  if (Date.now() > e.expires) { cache.delete(key); return null }
  return e.data
}
function cacheSet(key:string, data:any, ttl = DEFAULT_TTL){
  cache.set(key, { data, expires: Date.now()+ttl })
}

const OWM = 'https://api.openweathermap.org/data/2.5'
const API_KEY = process.env.OPENWEATHER_API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (!API_KEY) return res.status(500).json({ error: 'OPENWEATHER_API_KEY not set in env' })

  const { q, lat, lon, units = process.env.NEXT_PUBLIC_DEFAULT_UNITS || 'metric', type = 'both' } = req.query as any

  // build cache key
  const key = JSON.stringify({ q, lat, lon, units, type })
  const cached = cacheGet(key)
  if (cached) return res.status(200).json(cached)

  try {
    const results: any = {}

    // helper to fetch
    async function fetchUrl(path: string, params: Record<string,string|number>){
      const url = new URL(OWM+path)
      Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, String(v)))
      url.searchParams.set('appid', API_KEY)
      url.searchParams.set('units', units)
      const r = await fetch(url.toString())
      if (!r.ok) throw new Error(`OpenWeatherMap error ${r.status}`)
      return r.json()
    }

    if (type === 'current' || type === 'both'){
      if (q) results.current = await fetchUrl('/weather', { q })
      else if (lat && lon) results.current = await fetchUrl('/weather', { lat, lon })
    }
    if (type === 'forecast' || type === 'both'){
      if (q) results.forecast = await fetchUrl('/forecast', { q })
      else if (lat && lon) results.forecast = await fetchUrl('/forecast', { lat, lon })
    }

    cacheSet(key, results)
    return res.status(200).json(results)
  } catch (err:any){
    console.error('weather proxy error', err)
    return res.status(500).json({ error: err.message || 'failed' })
  }
}
