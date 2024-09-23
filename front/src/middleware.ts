import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const authenticated =
    token !== undefined && token.length >= 49 && token.length <= 53

  if (
    !authenticated &&
    (request.nextUrl.pathname.startsWith('/banner') ||
      request.nextUrl.pathname.startsWith('/business') ||
      request.nextUrl.pathname.startsWith('/user/update'))
  ) {
    return NextResponse.redirect(new URL('/user/login', request.url))
  }
  if (
    authenticated &&
    (request.nextUrl.pathname.startsWith('/user/recover') ||
      request.nextUrl.pathname.startsWith('/user/login') ||
      request.nextUrl.pathname.startsWith('/user/user'))
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}
