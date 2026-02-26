'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Youtube, Trophy } from 'lucide-react'

export default function DemoDay() {
    return (
        <section className="py-24 lg:py-32 bg-navy-900 border-t border-white/10">
            <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-semibold mb-6 border border-yellow-400/20">
                            Gran final
                        </span>

                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                            Demo Day <span className="text-yellow-400">Virtual</span>
                        </h2>

                        <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                            El cierre del programa será un evento en vivo donde presentarás tu proyecto ante
                            un jurado de expertos y la comunidad emprendedora. Es tu momento de brillar.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center border border-yellow-400/20">
                                    <Calendar className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Sábado 11 de Abril 2026</p>
                                    <p className="text-sm text-neutral-400">Evento de cierre del programa</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center border border-yellow-400/20">
                                    <Youtube className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Transmisión en YouTube Live</p>
                                    <p className="text-sm text-neutral-400">Accesible para todo el público</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center border border-yellow-400/20">
                                    <Trophy className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Pitch ante jurado experto</p>
                                    <p className="text-sm text-neutral-400">Presenta tu proyecto en 5 minutos</p>
                                </div>
                            </div>
                        </div>

                        <button className="px-8 py-4 bg-yellow-400 text-navy-900 rounded-xl font-bold hover:bg-yellow-300 transition-colors duration-300 shadow-lg shadow-yellow-400/25">
                            Conoce el Demo Day
                        </button>
                    </motion.div>

                    {/* Right - Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative">
                            <Image
                                src="/illustrations/demo-day.png"
                                alt="Demo Day Virtual"
                                width={600}
                                height={600}
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
