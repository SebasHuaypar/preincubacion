'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Globe2, Lightbulb } from 'lucide-react'

const audiences = [
    {
        icon: GraduationCap,
        title: 'Estudiantes técnicos o universitarios',
        description: 'De cualquier carrera, con ganas de crear algo propio y aprender habilidades de emprendimiento reales.',
        highlight: 'Cualquier carrera',
    },
    {
        icon: Globe2,
        title: 'Jóvenes de provincias',
        description: 'De 18 a 25 años, con acceso a internet y motivación para transformar su entorno desde donde estén.',
        highlight: '18–25 años',
    },
    {
        icon: Lightbulb,
        title: 'Interés en innovación e impacto',
        description: 'No necesitas experiencia previa: solo curiosidad, ganas de resolver problemas y disposición para trabajar en equipo.',
        highlight: 'Sin experiencia previa',
    },
]

export default function TargetAudience() {
    return (
        <section id="para-quien" className="py-24 lg:py-32 bg-navy-900 border-t border-white/10">
            <div className="section-container">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-semibold mb-6 border border-yellow-400/20"
                    >
                        ¿Para quién es?
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-black text-white mb-6"
                    >
                        ¿Este programa es{' '}
                        <span className="text-yellow-400">para ti</span>?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-300 max-w-2xl mx-auto"
                    >
                        START Lima está diseñado para jóvenes con motivación y ganas de construir algo que importe
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {audiences.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 bg-yellow-400/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-400/20 transition-colors duration-300">
                                <item.icon className="w-7 h-7 text-yellow-400" />
                            </div>

                            {/* Highlight Badge */}
                            <span className="inline-block px-3 py-1 bg-white/10 text-white/70 rounded-full text-xs font-semibold mb-4">
                                {item.highlight}
                            </span>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
