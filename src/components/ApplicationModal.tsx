'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import type { Application } from '@/types/application'

const applicationSchema = z.object({
    full_name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    age: z.number().min(18, 'Debes tener al menos 18 años').max(25, 'Debes tener máximo 25 años'),
    city: z.string().min(2, 'Ciudad requerida'),
    institution: z.string().min(3, 'Institución requerida'),
    phone: z.string().min(9, 'Teléfono inválido'),
    motivation: z.string().min(50, 'Describe tu motivación en al menos 50 caracteres'),
    business_idea: z.string().optional(),
    availability_confirmed: z.boolean().refine((val) => val === true, {
        message: 'Debes confirmar tu disponibilidad para participar'
    }),
    weekly_hours: z.enum(['2-5h', '5-10h', '10+h']),
    previous_experience: z.string().optional(),
    community: z.string().optional(),
})

type ApplicationForm = z.infer<typeof applicationSchema>

interface ApplicationModalProps {
    isOpen: boolean
    onClose: () => void
}

// Reusable input classes
const inputClasses = 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-yellow-400/60 focus:bg-white/[0.07] focus:outline-none transition-all text-white placeholder:text-white/30 text-sm'
const labelClasses = 'block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider'
const errorClasses = 'text-red-400 text-xs mt-1'

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [hasExperience, setHasExperience] = useState(false)
    const [hasCommunity, setHasCommunity] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const previousFocusRef = useRef<HTMLElement | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<ApplicationForm>({
        resolver: zodResolver(applicationSchema),
    })

    // Focus trap and ESC key handler
    useEffect(() => {
        if (!isOpen) return

        const scrollY = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.left = '0'
        document.body.style.right = '0'
        document.body.style.overflow = 'hidden'

        previousFocusRef.current = document.activeElement as HTMLElement

        const timer = setTimeout(() => {
            closeButtonRef.current?.focus()
        }, 100)

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !modalRef.current) return

            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            const firstElement = focusableElements[0] as HTMLElement
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault()
                lastElement?.focus()
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault()
                firstElement?.focus()
            }
        }

        document.addEventListener('keydown', handleEscape)
        document.addEventListener('keydown', handleTab)

        return () => {
            clearTimeout(timer)
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('keydown', handleTab)
            const scrollY = document.body.style.top
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.right = ''
            document.body.style.overflow = ''
            window.scrollTo(0, parseInt(scrollY || '0') * -1)
            if (previousFocusRef.current) previousFocusRef.current.focus()
        }
    }, [isOpen, onClose])

    const onSubmit = async (data: ApplicationForm) => {
        setIsSubmitting(true)
        setSubmitStatus('idle')
        setErrorMessage('')

        try {
            const { error } = await supabase
                .from('applications')
                .insert([
                    {
                        ...data,
                        business_idea: data.business_idea || null,
                        previous_experience: data.previous_experience || null,
                        community: data.community || null,
                    } as Application
                ])

            if (error) {
                if (error.code === '23505') {
                    setErrorMessage('Este email ya está registrado')
                } else {
                    setErrorMessage('Error al enviar la aplicación. Intenta de nuevo.')
                }
                setSubmitStatus('error')
            } else {
                setSubmitStatus('success')

                // Send confirmation email (fire-and-forget, don't block success)
                try {
                    await fetch('/api/send-confirmation', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            full_name: data.full_name,
                            email: data.email,
                        }),
                    })
                } catch (emailErr) {
                    console.error('Email send failed:', emailErr)
                }

                reset()
                setHasExperience(false)
                setHasCommunity(false)
                setTimeout(() => {
                    onClose()
                    setSubmitStatus('idle')
                }, 3000)
            }
        } catch (err) {
            setErrorMessage('Error de conexión. Verifica tu internet.')
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                            className="bg-[#0b1027]/60 backdrop-blur-3xl rounded-2xl shadow-[0_8px_60px_rgba(7,11,24,0.8)] w-full max-w-2xl max-h-[90vh] overflow-hidden pointer-events-auto ring-1 ring-white/[0.06]"
                        >
                            {/* Header */}
                            <div className="px-8 pt-8 pb-0 text-center relative">
                                <button
                                    ref={closeButtonRef}
                                    onClick={onClose}
                                    aria-label="Cerrar modal"
                                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4 text-white/40" />
                                </button>

                                {(() => {
                                    // Deadline: March 16, 2026 23:59:59 (Peru time UTC-5)
                                    const deadline = new Date('2026-03-17T04:59:59Z') // March 16 23:59:59 UTC-5
                                    const isPastDeadline = new Date() > deadline

                                    return isPastDeadline ? (
                                        <>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-400/10 rounded-full mb-4 border border-red-400/20">
                                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                                <span className="text-red-400 text-xs font-medium tracking-wide">Postulaciones cerradas</span>
                                            </div>
                                            <h2 id="modal-title" className="text-2xl font-bold text-white mb-1">
                                                Postulaciones cerradas
                                            </h2>
                                            <p className="text-white/40 text-sm">
                                                Pre-incubación START Lima 2026
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 rounded-full mb-4 border border-yellow-400/20">
                                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                                                <span className="text-yellow-400 text-xs font-medium tracking-wide">Postulaciones abiertas</span>
                                            </div>
                                            <h2 id="modal-title" className="text-2xl font-bold text-white mb-1">
                                                Postula al programa
                                            </h2>
                                            <p className="text-white/40 text-sm">
                                                Pre-incubación START Lima 2026
                                            </p>
                                        </>
                                    )
                                })()}
                            </div>

                            {/* Form Content */}
                            <div className="overflow-y-auto max-h-[calc(90vh-160px)] px-8 py-6 modal-scrollbar" style={{ overscrollBehavior: 'contain' }}>
                                {/* Deadline check */}
                                {new Date() > new Date('2026-03-17T04:59:59Z') ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-16"
                                    >
                                        <div className="w-16 h-16 bg-white/[0.03] rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                                            <AlertCircle className="w-8 h-8 text-white/40" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            Las postulaciones han cerrado
                                        </h3>
                                        <p className="text-white/40 text-sm max-w-sm mx-auto mb-6">
                                            El plazo para postular al programa de pre-incubación START Lima 2026 finalizó el 16 de marzo.
                                        </p>
                                        <p className="text-white/30 text-xs">
                                            Síguenos en nuestras redes para enterarte de futuras convocatorias.
                                        </p>
                                        <div className="flex justify-center gap-3 mt-4">
                                            <a href="https://www.instagram.com/start_lima/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 text-sm transition-colors">
                                                Instagram
                                            </a>
                                            <a href="https://www.linkedin.com/company/start-lima" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 text-sm transition-colors">
                                                LinkedIn
                                            </a>
                                        </div>
                                    </motion.div>
                                ) : submitStatus === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-16"
                                        role="status"
                                        aria-live="polite"
                                    >
                                        <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-400/20">
                                            <CheckCircle2 className="w-8 h-8 text-yellow-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            Postulación enviada
                                        </h3>
                                        <p className="text-white/40 text-sm max-w-xs mx-auto">
                                            Revisaremos tu aplicación y te contactaremos pronto.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                                        {/* Section: Personal */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-px flex-1 bg-white/[0.06]" />
                                                <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Datos personales</span>
                                                <div className="h-px flex-1 bg-white/[0.06]" />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="full_name" className={labelClasses}>
                                                        Nombre completo *
                                                    </label>
                                                    <input
                                                        {...register('full_name')}
                                                        id="full_name"
                                                        type="text"
                                                        aria-required="true"
                                                        aria-invalid={errors.full_name ? 'true' : 'false'}
                                                        aria-describedby={errors.full_name ? 'full_name-error' : undefined}
                                                        className={inputClasses}
                                                        placeholder="Juan Pérez García"
                                                    />
                                                    {errors.full_name && (
                                                        <p id="full_name-error" className={errorClasses} role="alert">
                                                            {errors.full_name.message}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="email" className={labelClasses}>
                                                        Email *
                                                    </label>
                                                    <input
                                                        {...register('email')}
                                                        id="email"
                                                        type="email"
                                                        aria-required="true"
                                                        aria-invalid={errors.email ? 'true' : 'false'}
                                                        className={inputClasses}
                                                        placeholder="tu@email.com"
                                                    />
                                                    {errors.email && (
                                                        <p className={errorClasses} role="alert">{errors.email.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="age" className={labelClasses}>
                                                        Edad *
                                                    </label>
                                                    <input
                                                        {...register('age', { valueAsNumber: true })}
                                                        id="age"
                                                        type="number"
                                                        min="18"
                                                        max="25"
                                                        aria-required="true"
                                                        onWheel={(e) => e.currentTarget.blur()}
                                                        className={`${inputClasses} age-input`}
                                                        placeholder="20"
                                                    />
                                                    {errors.age && (
                                                        <p className={errorClasses} role="alert">{errors.age.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="phone" className={labelClasses}>
                                                        Teléfono *
                                                    </label>
                                                    <input
                                                        {...register('phone')}
                                                        id="phone"
                                                        type="tel"
                                                        aria-required="true"
                                                        className={inputClasses}
                                                        placeholder="+51 999 999 999"
                                                    />
                                                    {errors.phone && (
                                                        <p className={errorClasses} role="alert">{errors.phone.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="city" className={labelClasses}>
                                                        Ciudad / Provincia *
                                                    </label>
                                                    <input
                                                        {...register('city')}
                                                        id="city"
                                                        type="text"
                                                        aria-required="true"
                                                        className={inputClasses}
                                                        placeholder="Cusco"
                                                    />
                                                    {errors.city && (
                                                        <p className={errorClasses} role="alert">{errors.city.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label htmlFor="institution" className={labelClasses}>
                                                        Universidad / Instituto *
                                                    </label>
                                                    <input
                                                        {...register('institution')}
                                                        id="institution"
                                                        type="text"
                                                        aria-required="true"
                                                        className={inputClasses}
                                                        placeholder="Universidad Nacional de..."
                                                    />
                                                    {errors.institution && (
                                                        <p className={errorClasses} role="alert">{errors.institution.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Section: Emprendimiento */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-px flex-1 bg-white/[0.06]" />
                                                <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Emprendimiento</span>
                                                <div className="h-px flex-1 bg-white/[0.06]" />
                                            </div>

                                            <div>
                                                <label htmlFor="motivation" className={labelClasses}>
                                                    Motivación e impacto esperado *
                                                </label>
                                                <textarea
                                                    {...register('motivation')}
                                                    id="motivation"
                                                    rows={3}
                                                    aria-required="true"
                                                    className={`${inputClasses} resize-none`}
                                                    placeholder="¿Por qué quieres participar y qué impacto esperas generar?"
                                                />
                                                {errors.motivation && (
                                                    <p className={errorClasses} role="alert">{errors.motivation.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="business_idea" className={labelClasses}>
                                                    Idea de negocio <span className="text-white/20">(opcional)</span>
                                                </label>
                                                <textarea
                                                    {...register('business_idea')}
                                                    id="business_idea"
                                                    rows={2}
                                                    className={`${inputClasses} resize-none`}
                                                    placeholder="Describe brevemente tu idea o proyecto..."
                                                />
                                            </div>
                                        </div>

                                        {/* Section: Compromiso */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-px flex-1 bg-white/[0.06]" />
                                                <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Compromiso</span>
                                                <div className="h-px flex-1 bg-white/[0.06]" />
                                            </div>

                                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        {...register('availability_confirmed')}
                                                        type="checkbox"
                                                        id="availability"
                                                        aria-required="true"
                                                        className="mt-1 w-4 h-4 rounded border border-white/20 bg-white/5 appearance-none checked:bg-yellow-400 checked:border-yellow-400 cursor-pointer transition-colors relative after:content-[''] after:absolute after:inset-0 after:flex after:items-center after:justify-center checked:after:content-['✓'] after:text-[10px] after:font-bold after:text-black after:leading-none after:top-px after:left-[3px]"
                                                    />
                                                    <label htmlFor="availability" className="text-sm text-white/60 flex-1">
                                                        <span className="text-white font-medium">Confirmo mi disponibilidad total *</span>
                                                        <span className="block mt-1 text-xs text-white/30">
                                                            Clases: Lunes a Viernes 7-8pm, Sábados 9-11am
                                                        </span>
                                                    </label>
                                                </div>
                                                {errors.availability_confirmed && (
                                                    <p className={`${errorClasses} mt-2`} role="alert">{errors.availability_confirmed.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="weekly_hours" className={labelClasses}>
                                                    Horas semanales para trabajo en equipo *
                                                </label>
                                                <select
                                                    {...register('weekly_hours')}
                                                    id="weekly_hours"
                                                    aria-required="true"
                                                    className={inputClasses}
                                                >
                                                    <option value="" className="bg-[#0a0e1a] text-white">Selecciona</option>
                                                    <option value="2-5h" className="bg-[#0a0e1a] text-white">2 - 5 horas</option>
                                                    <option value="5-10h" className="bg-[#0a0e1a] text-white">5 - 10 horas</option>
                                                    <option value="10+h" className="bg-[#0a0e1a] text-white">Más de 10 horas</option>
                                                </select>
                                                {errors.weekly_hours && (
                                                    <p className={errorClasses} role="alert">{errors.weekly_hours.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Section: Experiencia (Optional) */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="h-px flex-1 bg-white/[0.06]" />
                                                <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Experiencia</span>
                                                <div className="h-px flex-1 bg-white/[0.06]" />
                                            </div>

                                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        id="has_experience"
                                                        checked={hasExperience}
                                                        onChange={(e) => {
                                                            setHasExperience(e.target.checked)
                                                            if (!e.target.checked) setValue('previous_experience', '')
                                                        }}
                                                        className="mt-1 w-4 h-4 rounded border border-white/20 bg-white/5 appearance-none checked:bg-yellow-400 checked:border-yellow-400 cursor-pointer transition-colors relative after:content-[''] after:absolute after:inset-0 after:flex after:items-center after:justify-center checked:after:content-['\2713'] after:text-[10px] after:font-bold after:text-black after:leading-none after:top-px after:left-[3px]"
                                                    />
                                                    <label htmlFor="has_experience" className="text-sm text-white/60 cursor-pointer">
                                                        <span className="text-white font-medium">He participado en hackatones, bootcamps o competencias de innovación</span>
                                                    </label>
                                                </div>

                                                {hasExperience && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="mt-3"
                                                    >
                                                        <textarea
                                                            {...register('previous_experience')}
                                                            id="previous_experience"
                                                            rows={2}
                                                            className={`${inputClasses} resize-none`}
                                                            placeholder="Cuéntanos más sobre tu experiencia..."
                                                        />
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="checkbox"
                                                        id="has_community"
                                                        checked={hasCommunity}
                                                        onChange={(e) => {
                                                            setHasCommunity(e.target.checked)
                                                            if (!e.target.checked) setValue('community', '')
                                                        }}
                                                        className="mt-1 w-4 h-4 rounded border border-white/20 bg-white/5 appearance-none checked:bg-yellow-400 checked:border-yellow-400 cursor-pointer transition-colors relative after:content-[''] after:absolute after:inset-0 after:flex after:items-center after:justify-center checked:after:content-['\2713'] after:text-[10px] after:font-bold after:text-black after:leading-none after:top-px after:left-[3px]"
                                                    />
                                                    <label htmlFor="has_community" className="text-sm text-white/60 cursor-pointer">
                                                        <span className="text-white font-medium">Pertenezco a una comunidad de innovación o club de emprendimiento</span>
                                                    </label>
                                                </div>

                                                {hasCommunity && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="mt-3"
                                                    >
                                                        <input
                                                            {...register('community')}
                                                            id="community"
                                                            type="text"
                                                            className={inputClasses}
                                                            placeholder="Nombre de la comunidad..."
                                                        />
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Error message */}
                                        {submitStatus === 'error' && (
                                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3" role="alert">
                                                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                                                <p className="text-sm text-red-300">{errorMessage}</p>
                                            </div>
                                        )}

                                        {/* Submit */}
                                        <div className="pt-2 pb-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Enviando...
                                                    </>
                                                ) : (
                                                    <>
                                                        Enviar postulación
                                                        <Send className="w-4 h-4" />
                                                    </>
                                                )}
                                            </button>
                                            <p className="text-[11px] text-center text-white/20 mt-3">
                                                Al enviar, aceptas que tus datos sean utilizados para el proceso de selección.
                                            </p>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
