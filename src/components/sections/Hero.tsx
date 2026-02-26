'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Users, Rocket, ArrowRight } from 'lucide-react'

export default function Hero({ onOpenModal }: { onOpenModal: () => void }) {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-navy-900 text-white overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/plaza.jpg"
                    alt="Pre-incubación START Lima"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-navy-900/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-32">
                <motion.div
                    className="max-w-5xl mx-auto text-center"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {/* Eyebrow */}
                    <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-8">
                        <span className="h-px w-12 bg-yellow-400/60"></span>
                        <span className="text-yellow-400 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
                            Edición 2026: Inscripciones Abiertas
                        </span>
                        <span className="h-px w-12 bg-yellow-400/60"></span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 tracking-tight"
                    >
                        Transforma tu <span className="text-yellow-400">Idea</span><br />
                        en una <span className="text-yellow-400">Startup</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg md:text-xl lg:text-2xl text-neutral-200 leading-relaxed mb-12 max-w-3xl mx-auto"
                    >
                        El programa de pre-incubación <span className="font-semibold text-white">START Lima</span> que democratiza el emprendimiento: valida, construye y lanza tu MVP en solo <span className="font-bold text-yellow-400">4 semanas</span>
                    </motion.p>

                    {/* CTA */}
                    <motion.div variants={fadeInUp} className="mb-16">
                        <button
                            onClick={onOpenModal}
                            className="group px-10 py-4 bg-yellow-400 text-navy-900 font-bold text-lg rounded-full hover:bg-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center gap-3"
                        >
                            POSTULA AHORA
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                        <p className="mt-4 text-neutral-400 text-sm">
                            Postula hasta el 10 de marzo
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        variants={fadeInUp}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10 max-w-4xl mx-auto"
                    >
                        <div className="text-center">
                            <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                            <p className="text-white font-bold text-xl mb-1">4 Semanas</p>
                            <p className="text-xs text-neutral-400 uppercase tracking-wider">Duración</p>
                        </div>
                        <div className="text-center">
                            <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                            <p className="text-white font-bold text-xl mb-1">100% Virtual</p>
                            <p className="text-xs text-neutral-400 uppercase tracking-wider">Formato</p>
                        </div>
                        <div className="text-center">
                            <Rocket className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                            <p className="text-white font-bold text-xl mb-1">MVP Real</p>
                            <p className="text-xs text-neutral-400 uppercase tracking-wider">Objetivo</p>
                        </div>
                        <div className="text-center">
                            <span className="text-2xl text-yellow-400 font-bold block mb-2">S/.</span>
                            <p className="text-white font-bold text-xl mb-1">Gratuito</p>
                            <p className="text-xs text-neutral-400 uppercase tracking-wider">Inversión</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
