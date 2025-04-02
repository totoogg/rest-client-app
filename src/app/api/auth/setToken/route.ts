import { NextResponse } from 'next/server';
import { setCookie } from 'cookies-next';
import { IncomingMessage, ServerResponse } from 'node:http';

export async function POST(req: Request) {
  const { token } = await req.json();

  if (token) {
    const res = NextResponse.json({ message: 'Token set successfully' });

    await setCookie('authToken', token, {
      req: req as unknown as IncomingMessage,
      res: res as unknown as ServerResponse<IncomingMessage>,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res;
  }

  return NextResponse.json({ error: 'Token is required' }, { status: 400 });
}
