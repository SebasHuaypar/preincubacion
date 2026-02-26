'use client'

import Image from 'next/image'

const logos = [
    { name: 'START Lima', src: '/images/START Lima White.svg' },
    { name: 'START Lima', src: '/images/START Lima White.svg' },
    { name: 'START Lima', src: '/images/START Lima White.svg' },
    { name: 'START Lima', src: '/images/START Lima White.svg' },
    { name: 'START Lima', src: '/images/START Lima White.svg' },
]

export default function SocialProof() {
    return (
        <section className="py-12 bg-navy-900 border-b border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center gap-10">

                    {/* Centered Label */}
                    <span className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase">
                        Respaldado por
                    </span>

                    {/* Marquee Container */}
                    <div className="relative w-full overflow-hidden group/marquee">
                        {/* Fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-navy-900 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-navy-900 to-transparent z-10 pointer-events-none" />

                        {/* Single animate-marquee wrapper with both copies inside */}
                        <div className="animate-marquee group-hover/marquee:[animation-play-state:paused]">
                            {/* First copy */}
                            <div className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20">
                                {logos.map((logo, idx) => (
                                    <div key={idx} className="relative h-6 w-28 md:h-8 md:w-32 flex-shrink-0 opacity-60">
                                        <Image
                                            src={logo.src}
                                            alt={logo.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Second copy for seamless loop */}
                            <div className="flex items-center gap-12 md:gap-20 pr-12 md:pr-20" aria-hidden="true">
                                {logos.map((logo, idx) => (
                                    <div key={`dup-${idx}`} className="relative h-6 w-28 md:h-8 md:w-32 flex-shrink-0 opacity-60">
                                        <Image
                                            src={logo.src}
                                            alt={logo.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
