'use client'

import { motion } from 'framer-motion'
import { Award, Globe, Plane, Heart } from 'lucide-react'

const benefits = [
    {
        icon: Award,
        title: 'Certificado START Lima',
        description: 'Certificado oficial de participación en el programa'
    },
    {
        icon: Globe,
        title: 'Acceso al ecosistema',
        description: 'Conexión directa con el ecosistema emprendedor peruano'
    },
    {
        icon: Plane,
        title: 'Beca Road to START Fellowship',
        description: 'Oportunidad de llevar tu proyecto a Suiza para equipos finalistas'
    },
    {
        icon: Heart,
        title: 'Mentores y comunidad',
        description: 'Red de contactos con mentores, ponentes y aliados estratégicos'
    },
]

export default function Benefits() {
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
                        Beneficios
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-black text-white mb-6"
                    >
                        ¿Qué <span className="text-yellow-400">recibirás</span>?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-300 max-w-2xl mx-auto"
                    >
                        Más que un programa, es una puerta de entrada al mundo del emprendimiento
                    </motion.p>
                </div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex gap-6 group"
                        >
                            {/* Icon */}
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-yellow-400/10 rounded-2xl flex items-center justify-center border border-yellow-400/20 group-hover:bg-yellow-400/20 transition-colors duration-300">
                                    <benefit.icon className="w-8 h-8 text-yellow-400" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-neutral-300 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
