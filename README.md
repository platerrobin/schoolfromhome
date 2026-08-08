# Weather feature - serverless proxy

This branch adds a small Next.js weather dashboard that proxies requests to OpenWeatherMap from a serverless API route so the API key is not exposed to the browser.

.env.example

OPENWEATHER_API_KEY=your_openweathermap_api_key_here
NEXT_PUBLIC_DEFAULT_UNITS=metric

How to run locally
1. cp .env.example .env and set OPENWEATHER_API_KEY
2. npm install
3. npm run dev
4. Open http://localhost:3000

Notes
- The API route implements simple in-memory caching (10 minutes by default). For production use a persistent cache like Redis.
- Deploy to Vercel and add OPENWEATHER_API_KEY in project environment variables.
