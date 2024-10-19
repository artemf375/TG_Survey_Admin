import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/hooks/getDBConnection";
import { ApiError } from "next/dist/server/api-utils";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token && process.env.NODE_ENV !== 'development') {
    return NextResponse.json(new ApiError(401, "Unauthorized"));
  }

  const { searchParams } = new URL(req.url);
  const user_email = searchParams.get('email');

  if (!user_email) {
    return NextResponse.json(new ApiError(400, "Missing user email"));
  }

  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT survey_database.* FROM survey_database INNER JOIN survey_owners ON survey_database.survey_owner_id = survey_owners.owner_id WHERE survey_owners.owner_email = ?', [user_email]);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ status: 500, message: 'Internal server error' });
  }
}