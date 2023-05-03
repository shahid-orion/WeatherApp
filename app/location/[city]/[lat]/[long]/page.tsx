import { getClient } from '@/apollo-client'
import CalloutCard from '@/components/CalloutCard'
import HumidityChart from '@/components/HumidityChart'
import InformationPanel from '@/components/InformationPanel'
import RainChart from '@/components/RainChart'
import StatCard from '@/components/StatCard'
import TempChart from '@/components/TempChart'
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries'
import getBasePath from '@/lib/getBasePath'
import { cleanData } from '@/lib/cleanData'

export const revalidate = 1448 //???

type Props = {
  params: { city: string; lat: string; long: string }
}

const WeatherPage = async ({ params: { city, lat, long } }: Props) => {
  const client = getClient()

  //GETTING DATA
  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: 'true',
      longitude: long,
      latitude: lat,
      timezone: 'GMT',
    },
  })
  const results: Root = data.myQuery
  // console.log(results.hourly.time)

  const dataToSend = cleanData(results, city)

  const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ weatherData: dataToSend }),
  })

  const GPTData = await res.json()
  const { content } = GPTData

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* <InformationPanel or Side bar on bigger screen/> */}
      <InformationPanel city={city} results={results} long={long} lat={lat} />

      {/* < Body /> */}
      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today&apos;s Overview</h2>
            <p className="text-sm text-gray-500">Last Updated at: {''}</p>
            {new Date(results.current_weather.time).toLocaleString()} (
            {results.timezone})
          </div>

          {/* Callout Card: GPT */}
          {/* <div className="m-2 mb-10">
            <CalloutCard message={content} />
          </div> */}

          {/* StatCards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°C`}
              color="red"
            />
            <StatCard
              title="Minimum Temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°C`}
              color="green"
            />

            {/* UV Index */}
            <div>
              <StatCard
                title="UV Index"
                metric={`${results.daily.uv_index_max[0].toFixed(1)}`}
                color="rose"
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message="The UV is High today, be sure to wear SPF!"
                  warning
                />
              )}
            </div>
            {/* Wind speed */}
            <div className="flex space-x-3">
              <StatCard
                title="Wind speed"
                metric={`${results.current_weather.windspeed.toFixed(1)}Km/h`}
                color="green"
              />

              <StatCard
                title="Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="green"
              />
            </div>
          </div>
        </div>

        <hr className="mb-5" />

        {/* Charts */}
        <div className="space-y-3">
          {/* Temperature Chart */}
          <TempChart results={results} />

          {/* Rain Chart */}
          <RainChart results={results} />

          {/* Humidity Chart */}
          <HumidityChart results={results} />
        </div>
      </div>
    </div>
  )
}

export default WeatherPage
