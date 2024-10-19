// pages/api/fetch-and-store.js
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/hooks/getDBConnection';
import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from 'next/dist/server/api-utils';
import { getToken } from 'next-auth/jwt';

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
        const [rows]: any = await connection.execute('SELECT * FROM survey_owners WHERE owner_email = ? LIMIT 1', [user_email]);

        if (rows.length === 0) {
            return NextResponse.json(new ApiError(404, 'User not found'));
        }
        return NextResponse.json(rows);
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