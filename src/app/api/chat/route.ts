import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const systemMessage = {
      role: 'system' as const,
      content: `You are a helpful government service assistant. Your role is to help users with:
- Understanding government services and programs
- Filling out application forms
- Tracking application status
- Answering questions about document requirements
- Providing information about office locations and hours

Be helpful, clear, and concise. If you don't know the answer, suggest where the user might find more information. Always be respectful and professional.`
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    const responseMessage = completion.choices[0]?.message?.content || 'I apologize, but I encountered an issue processing your request.';

    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}
