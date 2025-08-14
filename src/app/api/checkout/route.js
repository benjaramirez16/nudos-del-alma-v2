import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export async function POST(request) {
  const cart = await request.json();

  try {
    const items = cart.map(item => ({
      title: item.name,
      unit_price: Number(item.price.replace(/[^0-9,-]+/g, "").replace(",", ".")),
      quantity: item.quantity,
      currency_id: 'ARS',
    }));

    const preferenceBody = {
      items: items,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_API_URL}/pago-exitoso`,
        failure: `${process.env.NEXT_PUBLIC_API_URL}/pago-fallido`,
      },
      auto_return: 'approved',
    };

    // AÑADIMOS ESTE CONSOLE.LOG PARA DEPURAR
    console.log("PREFERENCIA ENVIADA A MERCADO PAGO:", JSON.stringify(preferenceBody, null, 2));

    const preference = new Preference(client);
    const result = await preference.create({ body: preferenceBody });
    
    return NextResponse.json({ url: result.init_point });

  } catch (error) {
    console.error("Error al crear la preferencia de pago:", error.cause || error.message);
    return NextResponse.json({ error: 'Error al crear el pago' }, { status: 500 });
  }
}