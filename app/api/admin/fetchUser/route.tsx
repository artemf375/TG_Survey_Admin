// pages/api/fetch-and-store.js
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/hooks/getDBConnection';
import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from 'next/dist/server/api-utils';
import { SurveyOwner } from '@/types/api-types';
import { RowDataPacket } from 'mysql2/promise';

export async function GET(req: NextRequest) {
    const token = await getSession();

    if (!token && process.env.NODE_ENV !== 'development') {
        return NextResponse.json(new ApiError(401, 'Unauthorized'));
    }

    const { searchParams } = new URL(req.url);
    const user_email = searchParams.get('email');

    if (!user_email) {
        return NextResponse.json(new ApiError(400, 'Missing user email'));
    }

    try {
        const connection = await connectToDatabase();
        console.log(`'SELECT * FROM survey_owners WHERE owner_email = ? LIMIT 1', [${user_email}]`);
        const [rows]: [RowDataPacket[], unknown] = await connection.execute<RowDataPacket[]>('SELECT * FROM survey_owners WHERE owner_email = ? LIMIT 1', [user_email]);
        const result: SurveyOwner[] = rows as SurveyOwner[];
        // rows = new SurveyOwner(rows);
        if (result.length === 0) {
            return NextResponse.json(new ApiError(404, 'User not found'));
        }

        const user: SurveyOwner = result[0];

        if (!user) {
            return NextResponse.json(new ApiError(500, 'Invalid user data'));
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json(new ApiError(500, 'Internal server error'));
    }
    // const connection = await connectToDatabase();

    // const data = await fetchDataFromDatabase();

    // // Store the data in the session
    // request.session.data = data;
    // await request.session.save();

    // res.status(200).json({ message: 'Data stored in session' });
}