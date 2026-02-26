'use client'

import { useState } from 'react'
import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import ProgramOverview from '@/components/sections/ProgramOverview'
import TargetAudience from '@/components/sections/TargetAudience'
import Methodology from '@/components/sections/Methodology'
import ProgramStructure from '@/components/sections/ProgramStructure'
import Deliverables from '@/components/sections/Deliverables'
import Benefits from '@/components/sections/Benefits'
import DemoDay from '@/components/sections/DemoDay'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/sections/Footer'
import ApplicationModal from '@/components/ApplicationModal'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <main id="main-content" className="min-h-screen">
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <SocialProof />
        <ProgramOverview />
        <TargetAudience />
        <Methodology />
        <ProgramStructure />
        <Deliverables />
        <Benefits />
        <DemoDay />
        <FinalCTA onOpenModal={() => setIsModalOpen(true)} />
        <Footer />

        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </>
  )
}
