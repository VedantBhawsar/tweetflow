import { prismaClient } from '@/lib/prisma'

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return new Response('Email is required', { status: 400 })
  }

  const user = await prismaClient.subscribeUser.findUnique({
    where: { email },
  })

  if (user) {
    return new Response('User already subscribed', { status: 400 })
  }

  await prismaClient.subscribeUser.create({
    data: { email },
  })

  return new Response('Subscribed successfully', { status: 201 })
}
