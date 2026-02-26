import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { full_name, email } = body

        if (!full_name || !email) {
            return NextResponse.json(
                { error: 'Nombre y email son requeridos' },
                { status: 400 }
            )
        }

        const firstName = full_name.split(' ')[0]

        const { data, error } = await resend.emails.send({
            from: 'START Lima <noreply@startlima.org>',
            to: email,
            subject: `${firstName}, recibimos tu postulación al programa de pre-incubación START Lima 🚀`,
            html: buildConfirmationEmail(firstName, full_name),
        })

        if (error) {
            console.error('Resend error:', error)
            return NextResponse.json(
                { error: 'Error al enviar el correo' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, id: data?.id })
    } catch (err) {
        console.error('API error:', err)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}

function buildConfirmationEmail(firstName: string, fullName: string): string {
    const currentDate = new Date().toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Postulación Recibida - START Lima</title>
</head>
<body style="margin: 0; padding: 0; background-color: #070b18; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #070b18; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0b1027; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 32px 40px 24px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <p style="margin: 0; color: #facc15; font-size: 16px; font-weight: 700; letter-spacing: 0.5px;">
                                START Lima
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <!-- Greeting -->
                            <h2 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 8px;">
                                ¡Hola, ${firstName}! 👋
                            </h2>
                            <p style="color: rgba(255,255,255,0.5); font-size: 14px; margin: 0 0 24px; line-height: 1.6;">
                                Recibimos tu postulación al programa de pre-incubación START Lima.
                            </p>

                            <!-- Confirmation Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                                                    <p style="color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">
                                                        Detalles de postulación
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding-top: 16px;">
                                                    <table width="100%" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td style="padding: 6px 0;">
                                                                <span style="color: rgba(255,255,255,0.4); font-size: 13px;">Postulante</span>
                                                            </td>
                                                            <td style="padding: 6px 0; text-align: right;">
                                                                <span style="color: #ffffff; font-size: 13px; font-weight: 600;">${fullName}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 6px 0;">
                                                                <span style="color: rgba(255,255,255,0.4); font-size: 13px;">Fecha</span>
                                                            </td>
                                                            <td style="padding: 6px 0; text-align: right;">
                                                                <span style="color: #ffffff; font-size: 13px; font-weight: 600;">${currentDate}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 6px 0;">
                                                                <span style="color: rgba(255,255,255,0.4); font-size: 13px;">Estado</span>
                                                            </td>
                                                            <td style="padding: 6px 0; text-align: right;">
                                                                <span style="display: inline-block; background-color: rgba(250,204,21,0.15); color: #facc15; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(250,204,21,0.2);">
                                                                    En revisión
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Next Steps -->
                            <h3 style="color: #ffffff; font-size: 16px; font-weight: 700; margin: 0 0 16px;">
                                ¿Qué sigue?
                            </h3>

                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 8px 0;">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="width: 28px; vertical-align: top;">
                                                    <span style="display: inline-block; width: 20px; height: 20px; background-color: rgba(250,204,21,0.15); color: #facc15; font-size: 11px; font-weight: 700; text-align: center; line-height: 20px; border-radius: 50%; border: 1px solid rgba(250,204,21,0.3);">1</span>
                                                </td>
                                                <td style="padding-left: 8px;">
                                                    <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin: 0; line-height: 1.5;">
                                                        Nuestro equipo revisará tu postulación cuidadosamente.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0;">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="width: 28px; vertical-align: top;">
                                                    <span style="display: inline-block; width: 20px; height: 20px; background-color: rgba(250,204,21,0.15); color: #facc15; font-size: 11px; font-weight: 700; text-align: center; line-height: 20px; border-radius: 50%; border: 1px solid rgba(250,204,21,0.3);">2</span>
                                                </td>
                                                <td style="padding-left: 8px;">
                                                    <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin: 0; line-height: 1.5;">
                                                        Te contactaremos por email con los resultados en los próximos días.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0;">
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="width: 28px; vertical-align: top;">
                                                    <span style="display: inline-block; width: 20px; height: 20px; background-color: rgba(250,204,21,0.15); color: #facc15; font-size: 11px; font-weight: 700; text-align: center; line-height: 20px; border-radius: 50%; border: 1px solid rgba(250,204,21,0.3);">3</span>
                                                </td>
                                                <td style="padding-left: 8px;">
                                                    <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin: 0; line-height: 1.5;">
                                                        Si eres seleccionado, recibirás las instrucciones para comenzar.
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Divider -->
                            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 24px 0;" />

                            <!-- Contact -->
                            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0; line-height: 1.6;">
                                ¿Tienes alguna pregunta? Escríbenos a 
                                <a href="mailto:camila.cabrera@start-lima.com" style="color: #facc15; text-decoration: none;">camila.cabrera@start-lima.com</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
                            <p style="color: rgba(255,255,255,0.2); font-size: 11px; margin: 0;">
                                © 2026 START Lima. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim()
}
