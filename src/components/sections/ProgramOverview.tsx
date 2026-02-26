'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Globe, Briefcase, Users, Presentation } from 'lucide-react'

const features = [
    {
        icon: Globe,
        title: '100% Virtual',
        description: 'Participa desde cualquier provincia del Perú con conexión a internet'
    },
    {
        icon: Briefcase,
        title: 'Basado en proyectos',
        description: 'Aprendizaje práctico construyendo tu propia solución de negocio'
    },
    {
        icon: Users,
        title: 'Mentorías reales',
        description: 'Acompañamiento de emprendedores y expertos del ecosistema'
    },
    {
        icon: Presentation,
        title: 'Demo Day final',
        description: 'Presenta tu proyecto ante jurado en transmisión en vivo'
    },
]

export default function ProgramOverview() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.6 }
    }

    return (
        <section id="que-es" className="py-24 lg:py-32 bg-navy-900 border-t border-white/10">
            <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src="/illustrations/teamwork.png"
                            alt="Trabajo en equipo"
                            width={600}
                            height={600}
                            className="w-full h-auto"
                        />
                    </motion.div>

                    {/* Right - Content */}
                    <div>
                        <motion.div {...fadeInUp}>
                            <span className="inline-block px-4 py-2 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-semibold mb-6 border border-yellow-400/20">
                                Sobre el programa
                            </span>
                        </motion.div>

                        <motion.h2
                            {...fadeInUp}
                            className="text-4xl lg:text-5xl font-black text-white mb-6"
                        >
                            ¿Qué es Pre-incubación{' '}
                            <span className="text-yellow-400">START Lima</span>?
                        </motion.h2>

                        <motion.p
                            {...fadeInUp}
                            className="text-lg text-neutral-300 mb-10 leading-relaxed"
                        >
                            Un programa intensivo de 1 mes diseñado para activar el mindset emprendedor en jóvenes de provincias.
                            Aprenderás a identificar problemas reales, diseñar soluciones innovadoras y construir tu primer MVP
                            junto a un equipo, mentores y el ecosistema emprendedor peruano.
                        </motion.p>

                        {/* Feature cards */}
                        <div className="grid sm:grid-cols-2 gap-5">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group bg-white/5 border border-white/10 rounded-2xl p-6 cursor-default hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-400/20 transition-colors duration-300">
                                        <feature.icon className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
