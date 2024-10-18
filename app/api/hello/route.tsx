"use server";
import { NextResponse } from 'next/server';

export async function GET(req: Request){
    console.log(req.body);
    return NextResponse.json({ status: 200, message: 'Hello, World!' });
}