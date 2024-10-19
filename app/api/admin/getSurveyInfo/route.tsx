import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from "@/hooks/getDBConnection";
import { ApiError } from 'next/dist/server/api-utils';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token && process.env.NODE_ENV !== 'development') {
    return NextResponse.json(new ApiError(401, 'Unauthorized'));
  }

  const { searchParams } = new URL(req.url);
  const survey_id = searchParams.get('id');

  if (!survey_id) {
    return NextResponse.json(new ApiError(400, 'Missing survey ID'));
  }

  try {
    const connection = await connectToDatabase();
    const [rows]: any = await connection.execute(`
      SELECT
        sr.question_index,
        COUNT(*) as total_responses,
        sq.question_value
      FROM
        (
          SELECT
            id,
            survey_id
          FROM
            survey_interactions
          WHERE
            survey_id = ?
        ) si
      INNER JOIN survey_replies sr ON
        si.id = sr.survey_interaction_id
      LEFT JOIN survey_questions sq ON
        sq.survey_id = si.survey_id
        AND sq.question_index = sr.question_index - 1
      GROUP BY
        sr.question_index;
    `, [survey_id]);

    return NextResponse.json({
      survey_id,
      questions: rows.map((row: any) => ({
        question_index: row.question_index,
        total_responses: row.total_responses,
        question_value: row.question_value,
      })),
    });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(new ApiError(500, 'Internal server error'));
  }
}