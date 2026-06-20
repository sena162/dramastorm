import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/Stripe'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Giriş yapmalısın' }, { status: 401 })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    customer_email: session.user.email,
    success_url: `${process.env.NEXTAUTH_URL}/premium/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/premium`,
    metadata: {
      userId: session.user.email,
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}