import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ status: 401, message: 'Unauthorized' });
  }
  return NextResponse.json({ status: 200, message: 'Hello, World!' });
}