//Since we have not fully migrated to Next.js 13 yet,
//if you are using the `app` directory introduced in Next.js 13,
//wrap your tremor components in another component by using the `"use client"` directive.
'use client'

import React, { useState } from 'react'

import { Country, City } from 'country-state-city'
import Select from 'react-select'
import { useRouter } from 'next/navigation'
import { GlobeIcon } from '@heroicons/react/solid'

//options type
type Option = {
  value: {
    latitude: string
    longitude: string
    isoCode: string
  }
  label: string
} | null

//CityOption type
type CityOption = {
  value: {
    latitude: string
    longitude: string
    countryCode: string
    name: string
    stateCode: string
  }
  label: string
} | null

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}))
// const cityOptions = City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(
//   (city) => ({
//     value: {
//       latitude: city.latitude,
//       longitude: city.longitude,
//       countryCode: city.countryCode,
//       name: city.name,
//       stateCode: city.stateCode,
//     },
//     label: city.name,
//   })
// )

type Props = {}

const CityPicker = (props: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<Option>(null)
  const [selectedCity, setSelectedCity] = useState<CityOption>(null)
  //Nextjs 13- useRouter imported from next/navigation
  const router = useRouter()

  const handleSelectedCountry = (option: Option) => {
    setSelectedCountry(option)
    setSelectedCity(null)
  }
  const handleSelectedCity = (option: CityOption) => {
    setSelectedCity(option)
    router.push(
      `/location/${option?.value.name}/${option?.value.latitude}/${option?.value.longitude}`
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-3 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          className="text-black"
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
        />
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="country">City</label>
          </div>
          <Select
            className="text-black"
            value={selectedCity}
            onChange={handleSelectedCity}
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((state) => ({
              value: {
                latitude: state.latitude,
                longitude: state.longitude,
                countryCode: state.countryCode,
                name: state.name,
                stateCode: state.stateCode,
              },
              label: state.name,
            }))}
          />
        </div>
      )}
    </div>
  )
}

export default CityPicker
