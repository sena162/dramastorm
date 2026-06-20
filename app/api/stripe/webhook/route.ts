import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/Stripe'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Webhook hatası' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const email = session.customer_email

    // Kullanıcıyı premium yap
    await supabaseAdmin
      .from('profiles')
      .update({ is_premium: true })
      .eq('email', email)
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as any
    const customer = await stripe.customers.retrieve(subscription.customer)
    const email = (customer as any).email

    // Premium'u kaldır
    await supabaseAdmin
      .from('profiles')
      .update({ is_premium: false })
      .eq('email', email)
  }

  return NextResponse.json({ received: true })
}