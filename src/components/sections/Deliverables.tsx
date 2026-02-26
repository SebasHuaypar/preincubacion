'use client'

import { motion } from 'framer-motion'
import { FileUser, Search, Wrench, Presentation } from 'lucide-react'

const deliverables = [
    {
        week: 1,
        icon: FileUser,
        name: 'Mapa de habilidades',
        description: 'Identificación de fortalezas personales y roles de equipo',
    },
    {
        week: 2,
        icon: Search,
        name: 'Documento de validación',
        description: 'Problem statement validado con evidencia del usuario',
    },
    {
        week: 3,
        icon: Wrench,
        name: 'Mockup / MVP',
        description: 'Prototipo funcional o boceto de tu solución',
    },
    {
        week: 4,
        icon: Presentation,
        name: 'Pitch deck',
        description: 'Presentación profesional de tu proyecto finalizado',
    },
]

export default function Deliverables() {
    return (
        <section className="py-24 lg:py-32 bg-navy-900 border-t border-white/10">
            <div className="section-container">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-semibold mb-6 border border-yellow-400/20"
                    >
                        Lo que construirás
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-black text-white mb-6"
                    >
                        Entregables <span className="text-yellow-400">semanales</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-300 max-w-2xl mx-auto"
                    >
                        Cada semana construirás algo tangible que te acercará a tu MVP final
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {deliverables.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300"
                        >
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-xs font-bold mb-4 border border-yellow-400/20">
                                    Semana {item.week}
                                </span>

                                <div className="w-14 h-14 bg-yellow-400/10 rounded-xl flex items-center justify-center border border-yellow-400/20">
                                    <item.icon className="w-7 h-7 text-yellow-400" />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">
                                {item.name}
                            </h3>

                            <p className="text-neutral-300 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
