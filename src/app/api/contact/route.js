import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { name, email, message } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Nudos Del Alma <onboarding@resend.dev>', 
      to: ['benjaramirez2003@hotmail.com'], 
      subject: `Nuevo Mensaje de ${name} desde tu web`,
      html: `<p>Has recibido un nuevo mensaje de contacto:</p>
             <p><strong>Nombre:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensaje:</strong></p>
             <p>${message}</p>`,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}