import { NextResponse } from 'next/server';
import { connectToDatabase } from "@/hooks/getDBConnection";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const survey_id = searchParams.get('id');

  if (!survey_id) {
    return NextResponse.json({ status: 401, message: 'Unauthorized' });
  }

  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(`
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

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ status: 500, message: 'Internal server error' });
  }
}