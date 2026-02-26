'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface LegalModalProps {
    isOpen: boolean
    onClose: () => void
    type: 'privacy' | 'terms'
}

const privacyContent = {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: febrero 2026',
    sections: [
        {
            heading: '1. Información que recopilamos',
            body: 'Recopilamos información personal que nos proporcionas voluntariamente al postularte al programa de pre-incubación START Lima, incluyendo: nombre completo, correo electrónico, número de teléfono, edad, ciudad de residencia, institución educativa, motivación, ideas de negocio y experiencia previa en emprendimiento.',
        },
        {
            heading: '2. Uso de la información',
            body: 'Utilizamos tu información exclusivamente para: evaluar tu postulación al programa, comunicarnos contigo sobre el estado de tu aplicación, enviarte información relevante sobre START Lima y mejorar nuestros procesos de selección.',
        },
        {
            heading: '3. Protección de datos',
            body: 'Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. Tus datos se almacenan en servidores seguros con encriptación de extremo a extremo.',
        },
        {
            heading: '4. Compartición de datos',
            body: 'No vendemos, comercializamos ni transferimos tu información personal a terceros. Podemos compartir datos agregados y anonimizados con fines estadísticos y de mejora del programa.',
        },
        {
            heading: '5. Retención de datos',
            body: 'Conservamos tu información personal durante el período necesario para cumplir con los fines descritos en esta política. Puedes solicitar la eliminación de tus datos en cualquier momento contactándonos directamente.',
        },
        {
            heading: '6. Tus derechos',
            body: 'Tienes derecho a acceder, rectificar, eliminar o limitar el procesamiento de tus datos personales. Para ejercer estos derechos, contáctanos a camila.cabrera@start-lima.com.',
        },
        {
            heading: '7. Contacto',
            body: 'Para cualquier consulta sobre esta política de privacidad, puedes escribirnos a camila.cabrera@start-lima.com o llamarnos al +51 960 062 757.',
        },
    ],
}

const termsContent = {
    title: 'Términos y Condiciones',
    lastUpdated: 'Última actualización: febrero 2026',
    sections: [
        {
            heading: '1. Aceptación de términos',
            body: 'Al postularte al programa de pre-incubación START Lima, aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguno de estos términos, no debes completar el formulario de postulación.',
        },
        {
            heading: '2. Descripción del programa',
            body: 'START Lima es un programa de pre-incubación diseñado para jóvenes emprendedores de 18 a 25 años en Perú. El programa incluye sesiones de formación, mentoría, trabajo en equipo y un Demo Day final. La participación es gratuita y sujeta a un proceso de selección.',
        },
        {
            heading: '3. Requisitos de participación',
            body: 'Los participantes deben tener entre 18 y 25 años, residir en Perú, estar disponibles para asistir a las sesiones programadas (Lunes a Viernes 7-8pm, Sábados 9-11am) y comprometerse a dedicar horas adicionales al trabajo en equipo.',
        },
        {
            heading: '4. Compromiso del participante',
            body: 'Al ser seleccionado, te comprometes a: asistir puntualmente a todas las sesiones, participar activamente en las actividades del programa, trabajar colaborativamente con tu equipo asignado y presentar tu proyecto en el Demo Day.',
        },
        {
            heading: '5. Propiedad intelectual',
            body: 'Los proyectos desarrollados durante el programa son propiedad de los equipos participantes. START Lima se reserva el derecho de utilizar información general sobre los proyectos con fines promocionales y educativos, sin revelar detalles confidenciales.',
        },
        {
            heading: '6. Exclusión del programa',
            body: 'START Lima se reserva el derecho de excluir a participantes que incumplan estos términos, falten reiteradamente a las sesiones sin justificación o mantengan conductas que afecten negativamente al grupo.',
        },
        {
            heading: '7. Limitación de responsabilidad',
            body: 'START Lima no garantiza resultados específicos derivados de la participación en el programa. El éxito de los proyectos depende del esfuerzo y dedicación de cada equipo.',
        },
        {
            heading: '8. Modificaciones',
            body: 'START Lima se reserva el derecho de modificar estos términos en cualquier momento. Los participantes serán notificados de cambios significativos a través de sus correos electrónicos registrados.',
        },
    ],
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)
    const content = type === 'privacy' ? privacyContent : termsContent

    useEffect(() => {
        if (!isOpen) return

        document.body.style.overflow = 'hidden'

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                        aria-hidden="true"
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="legal-modal-title"
                            className="bg-[#0b1027]/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden pointer-events-auto border border-white/[0.08] ring-1 ring-white/5"
                        >
                            {/* Header */}
                            <div className="px-8 pt-8 pb-4 text-center relative border-b border-white/[0.06]">
                                <button
                                    onClick={onClose}
                                    aria-label="Cerrar modal"
                                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4 text-white/40" />
                                </button>

                                <h2 id="legal-modal-title" className="text-xl font-bold text-white mb-1">
                                    {content.title}
                                </h2>
                                <p className="text-white/30 text-xs">
                                    {content.lastUpdated}
                                </p>
                            </div>

                            {/* Content */}
                            <div className="overflow-y-auto max-h-[calc(85vh-120px)] px-8 py-6 modal-scrollbar space-y-6">
                                {content.sections.map((section, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-sm font-semibold text-white/80 mb-2">
                                            {section.heading}
                                        </h3>
                                        <p className="text-sm text-white/40 leading-relaxed">
                                            {section.body}
                                        </p>
                                    </div>
                                ))}

                                <div className="pt-4 border-t border-white/[0.06]">
                                    <p className="text-xs text-white/20 text-center">
                                        START Lima — Pre-incubación 2026
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
