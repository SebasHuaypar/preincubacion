'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Mail, Phone, Instagram, Linkedin } from 'lucide-react'
import LegalModal from '@/components/LegalModal'

export default function Footer() {
    const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'privacy' | 'terms' }>({
        isOpen: false,
        type: 'privacy',
    })

    return (
        <>
            <footer className="bg-navy-900 text-white py-16 border-t border-white/10">
                <div className="section-container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* Column 1 - Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Image
                                    src="/images/START Lima White.svg"
                                    alt="START Lima"
                                    width={120}
                                    height={40}
                                    className="h-10 w-auto"
                                />
                            </div>
                            <p className="text-neutral-300 text-sm leading-relaxed">
                                Democratizamos la innovación y el emprendimiento en jóvenes de provincias del Perú.
                            </p>
                        </div>

                        {/* Column 2 - Program */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Programa</h3>
                            <ul className="space-y-2 text-neutral-300 text-sm">
                                <li>
                                    <button
                                        onClick={() => document.getElementById('que-es')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="hover:text-yellow-400 transition-colors"
                                    >
                                        ¿Qué es?
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => document.getElementById('programa')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="hover:text-yellow-400 transition-colors"
                                    >
                                        Estructura
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="hover:text-yellow-400 transition-colors"
                                    >
                                        Beneficios
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => document.getElementById('demo-day')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="hover:text-yellow-400 transition-colors"
                                    >
                                        Demo Day
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3 - Contact */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Contacto</h3>
                            <ul className="space-y-3 text-neutral-300 text-sm">
                                <li>
                                    <a href="mailto:camila.cabrera@startlima.org" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                                        <Mail className="w-4 h-4" />
                                        camila.cabrera@startlima.org
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+51960062757" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                                        <Phone className="w-4 h-4" />
                                        +51 960 062 757
                                    </a>
                                </li>
                                <li className="pt-2">
                                    <p className="text-xs text-neutral-400">Camila Cabrera</p>
                                    <p className="text-xs text-neutral-400">Project Manager – START Lima</p>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4 - Social */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Síguenos</h3>
                            <div className="flex gap-3">
                                <a href="https://www.instagram.com/start_lima/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-navy-900 transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="https://www.linkedin.com/company/start-lima" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-navy-900 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="pt-8 border-t border-white/10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
                            <p>© 2026 START Lima. Todos los derechos reservados.</p>
                            <div className="flex gap-6">
                                <button
                                    onClick={() => setLegalModal({ isOpen: true, type: 'privacy' })}
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    Privacidad
                                </button>
                                <button
                                    onClick={() => setLegalModal({ isOpen: true, type: 'terms' })}
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    Términos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <LegalModal
                isOpen={legalModal.isOpen}
                onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
                type={legalModal.type}
            />
        </>
    )
}
