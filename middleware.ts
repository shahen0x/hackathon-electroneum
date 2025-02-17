import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession, updateSession } from './utils/telegram/session'

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/telegram/protected')) {
		const session = await getSession()
		console.log("Session: ", session)

		if (!session) {
			return NextResponse.redirect(new URL('/telegram', request.url))
		}
	}

	return updateSession(request)
}

export const config = {
	matcher: ['/telegram/protected/:path*', '/api/:path*'],
}