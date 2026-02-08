import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json()
        return NextResponse.json({data},{ status: 201 })
    } catch (error) {
        console.error('Error :', error)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}