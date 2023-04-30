//Since we have not fully migrated to Next.js 13 yet,
//if you are using the `app` directory introduced in Next.js 13,
//wrap your tremor components in another component by using the `"use client"` directive.
'use client'

import CityPicker from '@/components/CityPicker'
import { Card, Divider, Subtitle, Text } from '@tremor/react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394F68] to-[#183B7E] p-10 flex flex-col justify-center items-center">
      <Card className="max-w-4xl mx-auto">
        <Text className="text-6xl font-bold text-center mb-10">
          {' '}
          Weather AI
        </Text>
        <Subtitle className="text-xl text-center">
          Powered by OpenAI, Next.js 13.3, TailwindCSS, Tremor 2.0 + more!
        </Subtitle>
        <Divider className="my-10" />

        <Card className="bg-gradient-to-br from-[#394F68] to-[#183B7E]">
          {/* CityPicker */}
          <CityPicker />
        </Card>
      </Card>
    </div>
  )
}
