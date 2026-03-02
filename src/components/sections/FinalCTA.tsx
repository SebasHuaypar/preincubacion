'use client'

import { motion } from 'framer-motion'
import { Rocket, Clock, Sparkles } from 'lucide-react'

export default function FinalCTA({ onOpenModal }: { onOpenModal: () => void }) {
    return (
        <section className="relative py-24 lg:py-32 bg-navy-900 border-t border-white/10">
            <div className="section-container">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 lg:p-16 shadow-2xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-semibold mb-6 border border-yellow-400/20">
                            <Sparkles className="w-4 h-4" />
                            <span>Última oportunidad</span>
                        </div>

                        <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            Transforma tu idea en <span className="text-yellow-400">realidad</span>
                        </h2>

                        <p className="text-xl lg:text-2xl text-neutral-300 mb-4 max-w-2xl mx-auto">
                            4 semanas para validar, construir y presentar tu proyecto ante expertos
                        </p>

                        <div className="flex items-center justify-center gap-2 text-yellow-400 mb-10">
                            <Clock className="w-5 h-5" />
                            <p className="font-semibold">
                                Cupos limitados • Cierre de postulaciones: 16 de Marzo
                            </p>
                        </div>

                        <motion.button
                            onClick={onOpenModal}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 bg-yellow-400 text-navy-900 font-bold text-xl px-12 py-5 rounded-2xl shadow-2xl shadow-yellow-400/25 hover:bg-yellow-300 transition-all duration-300"
                        >
                            Postula ahora
                            <Rocket className="w-6 h-6" />
                        </motion.button>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-neutral-400">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>100% gratuito</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>Certificado incluido</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>Mentoría personalizada</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
