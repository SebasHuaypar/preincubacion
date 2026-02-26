'use client'

import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

const programWeeks = [
    {
        week: 1,
        title: 'Mentalidad Emprendedora',
        dates: '14 - 21 Marzo',
        objective: 'Activar el mindset emprendedor, fomentar la mentalidad de crecimiento y formar equipos conscientes de sus habilidades',
        sessions: [
            'Introducción al ecosistema emprendedor',
            'El Mindset de Crecimiento: De la Idea al Impacto',
            'Identificando tu Súper Poder: Autodiagnóstico y Roles de Equipo',
            'Taller: Introducción a IA para Emprendedores',
        ],
        deliverable: 'Mapa de habilidades personales y de equipo',
    },
    {
        week: 2,
        title: 'Innovar desde el problema',
        dates: '24 - 27 Marzo',
        objective: 'Comprender al usuario, identificar problemas reales y validarlos con evidencia',
        sessions: [
            'Identificación y Validación de Problemas',
            'Entrevistas de Profundidad y Diseño del Problem Statement',
            'Taller: Mapeo del Usuario con Miro',
        ],
        deliverable: 'Documento de validación del problema',
    },
    {
        week: 3,
        title: 'De la idea al prototipo',
        dates: '31 Mar - 3 Abril',
        objective: 'Diseñar soluciones, priorizarlas y construir un prototipo o MVP inicial',
        sessions: [
            'Generación y Priorización de Soluciones: Del Problema al Valor',
            'Diseño de Prototipos: Definición del MVP y Mockups',
            'Taller: Prototipado Rápido con No-Code',
        ],
        deliverable: 'Boceto, mockup o MVP funcional',
    },
    {
        week: 4,
        title: 'Comunica, conecta y lanza',
        dates: '7 - 11 Abril',
        objective: 'Comunicar claramente la propuesta de valor y preparar a los equipos para presentar su proyecto',
        sessions: [
            'El Arte del Pitch: Storytelling y Estructura para Inversionistas',
            'Taller: Herramientas para crear un Pitch de impacto',
            'Demo Day Virtual – Transmisión en Vivo (YouTube Live)',
        ],
        deliverable: 'Pitch deck y Reporte de validación',
    },
]

export default function ProgramStructure() {
    const [activeSlide, setActiveSlide] = useState(0)
    const [direction, setDirection] = useState(0)

    const nextSlide = () => {
        setDirection(1)
        setActiveSlide((prev) => (prev + 1) % programWeeks.length)
    }

    const prevSlide = () => {
        setDirection(-1)
        setActiveSlide((prev) => (prev - 1 + programWeeks.length) % programWeeks.length)
    }

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50
        if (info.offset.x > swipeThreshold) {
            prevSlide()
        } else if (info.offset.x < -swipeThreshold) {
            nextSlide()
        }
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0
        })
    }

    return (
        <section id="programa" className="py-24 lg:py-32 bg-navy-900 border-t border-white/10">
            <div className="section-container">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-semibold mb-6 border border-yellow-400/20"
                    >
                        Programa completo
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-black text-white mb-6"
                    >
                        Estructura del <span className="text-yellow-400">programa</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-300 max-w-2xl mx-auto"
                    >
                        4 semanas intensivas de aprendizaje, construcción y mentoría
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Slider Container with fixed height */}
                    <div className="relative h-[580px] lg:h-[520px]">
                        {/* Navigation Arrows - Hidden on mobile */}
                        <button
                            onClick={prevSlide}
                            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110"
                            aria-label="Semana anterior"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full items-center justify-center text-white transition-all duration-300 hover:scale-110"
                            aria-label="Siguiente semana"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Slide Content with drag/swipe */}
                        <div className="h-full overflow-hidden">
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={activeSlide}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={handleDragEnd}
                                    className="h-full cursor-grab active:cursor-grabbing"
                                >
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 h-full flex flex-col">
                                        {/* Header */}
                                        <div className="mb-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="px-3 py-1 bg-yellow-400 text-navy-900 rounded-full text-sm font-bold">
                                                    Semana {programWeeks[activeSlide].week}
                                                </span>
                                                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{programWeeks[activeSlide].dates}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
                                                {programWeeks[activeSlide].title}
                                            </h3>

                                            <p className="text-neutral-300 text-base lg:text-lg leading-relaxed">
                                                {programWeeks[activeSlide].objective}
                                            </p>
                                        </div>

                                        {/* Sessions List */}
                                        <div className="mb-6">
                                            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 text-yellow-400">
                                                Sesiones
                                            </h4>
                                            <ul className="space-y-2">
                                                {programWeeks[activeSlide].sessions.map((session, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-neutral-300">
                                                        <span className="text-yellow-400 mt-1">•</span>
                                                        <span className="text-sm lg:text-base">{session}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Deliverable */}
                                        <div className="pt-6 border-t border-white/10 mt-auto">
                                            <span className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
                                                Entregable
                                            </span>
                                            <p className="text-white font-semibold mt-2 text-sm lg:text-base">
                                                {programWeeks[activeSlide].deliverable}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Dots Indicator */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
                            {programWeeks.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setDirection(index > activeSlide ? 1 : -1)
                                        setActiveSlide(index)
                                    }}
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-300",
                                        activeSlide === index
                                            ? "w-8 bg-yellow-400"
                                            : "w-2 bg-white/20 hover:bg-white/40"
                                    )}
                                    aria-label={`Ir a semana ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
