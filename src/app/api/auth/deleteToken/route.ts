import { NextResponse } from 'next/server';
import { deleteCookie } from 'cookies-next/server';

export async function DELETE() {
  const res = NextResponse.json({ message: 'Token deleted successfully' });

  await deleteCookie('authToken', { res });

  return res;
}
