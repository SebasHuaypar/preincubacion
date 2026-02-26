'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mic2, Wrench, Users, Lightbulb, Presentation } from 'lucide-react'

const steps = [
    {
        number: 1,
        icon: Mic2,
        title: 'Charlas del ecosistema',
        description: 'Sesiones con fundadores, inversionistas y líderes del ecosistema emprendedor peruano que comparten su experiencia real.',
    },
    {
        number: 2,
        icon: Wrench,
        title: 'Talleres prácticos',
        description: 'Aprende haciendo: desde validación de ideas hasta prototipado rápido con herramientas no-code e inteligencia artificial.',
    },
    {
        number: 3,
        icon: Users,
        title: 'Trabajo en equipo',
        description: 'Forma equipo con personas de diferentes habilidades y provincias para construir soluciones con impacto real.',
    },
    {
        number: 4,
        icon: Lightbulb,
        title: 'Mentorías',
        description: 'Acompañamiento personalizado de mentores expertos que guían a tu equipo en cada etapa del proceso.',
    },
    {
        number: 5,
        icon: Presentation,
        title: 'Demo Day',
        description: 'Presenta tu proyecto ante un jurado de expertos en una transmisión en vivo por YouTube.',
    },
]

export default function Methodology() {
    const [activeStep, setActiveStep] = useState(0)

    return (
        <section id="metodologia" className="py-24 lg:py-32 bg-navy-900 border-t border-white/10">
            <div className="section-container">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-semibold mb-6 border border-yellow-400/20"
                    >
                        Metodología
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-black text-white mb-6"
                    >
                        Cómo <span className="text-yellow-400">funciona</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-300 max-w-2xl mx-auto"
                    >
                        Un proceso de 5 pasos diseñado para llevarte de la idea al producto
                    </motion.p>
                </div>

                {/* Desktop: Horizontal Stepper */}
                <div className="hidden lg:block max-w-5xl mx-auto">
                    {/* Steps bar — flex justify-between alinea centros a 0%, 25%, 50%, 75%, 100% */}
                    <div className="relative flex items-start justify-between mb-14">
                        {/* Línea de fondo */}
                        <div className="absolute left-[27px] right-[27px] top-[26px] h-0.5 bg-white/10 pointer-events-none" />

                        {/* Línea de progreso animada */}
                        {activeStep > 0 && (
                            <motion.div
                                className="absolute left-[27px] top-[26px] h-0.5 bg-yellow-400 pointer-events-none"
                                initial={{ width: 0 }}
                                animate={{
                                    width: `calc(${(activeStep / (steps.length - 1)) * 100}% - ${(activeStep / (steps.length - 1)) * 54}px)`,
                                }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            />
                        )}

                        {steps.map((step, index) => {
                            const StepIcon = step.icon
                            const isActive = index <= activeStep

                            return (
                                <div key={index} className="flex flex-col items-center relative z-10 w-[54px]">
                                    <button
                                        onClick={() => setActiveStep(index)}
                                        className="group"
                                        aria-label={`Ver paso ${index + 1}: ${step.title}`}
                                    >
                                        <div
                                            className={`
                                                w-[54px] h-[54px] rounded-xl flex items-center justify-center transition-all duration-300
                                                ${isActive
                                                    ? 'bg-yellow-400 text-navy-900 shadow-lg shadow-yellow-400/25'
                                                    : 'bg-navy-900 text-white/40 border border-white/10 hover:border-white/20'
                                                }
                                            `}
                                        >
                                            <StepIcon className="w-6 h-6" />
                                        </div>
                                    </button>

                                    <span
                                        className={`
                                            mt-3 text-xs font-medium text-center transition-colors duration-300 w-24
                                            ${isActive ? 'text-yellow-400' : 'text-white/40'}
                                        `}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    {/* Contenido del paso activo */}
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8"
                    >
                        <div className="flex items-start gap-6">
                            <div className="w-14 h-14 bg-yellow-400/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                {(() => {
                                    const ActiveIcon = steps[activeStep].icon
                                    return <ActiveIcon className="w-7 h-7 text-yellow-400" />
                                })()}
                            </div>
                            <div>
                                <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">
                                    Paso {steps[activeStep].number}
                                </span>
                                <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                                    {steps[activeStep].title}
                                </h3>
                                <p className="text-neutral-300 text-base leading-relaxed">
                                    {steps[activeStep].description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile: Vertical Timeline */}
                <div className="lg:hidden space-y-8">
                    {steps.map((step, index) => {
                        const StepIcon = step.icon
                        const isLast = index === steps.length - 1

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex gap-6"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 bg-yellow-400 text-navy-900 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <StepIcon className="w-6 h-6" />
                                    </div>
                                    {!isLast && (
                                        <div className="w-0.5 h-full bg-white/10 mt-3 min-h-[80px]" />
                                    )}
                                </div>

                                <div className="pb-8 flex-1">
                                    <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">
                                        Paso {step.number}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mt-1 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-neutral-400 text-base leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
