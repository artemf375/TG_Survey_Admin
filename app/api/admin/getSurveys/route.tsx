import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/hooks/getDBConnection";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token && process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ status: 401, message: 'Unauthorized' });
  }

  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM survey_database');

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ status: 500, message: 'Internal server error' });
  }
}