import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest, res: NextResponse) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_SECRET });
  try {
    const reqBody = await req.json();
    console.log("body is", reqBody);
    const { query } = reqBody;
    console.log("body is", query);
    const completion = await openai.completions.create({
      model: "davinci-002",
      prompt: query,
    });
    return NextResponse.json({
      message: "Data fetched successfully!",
      success: true,
      successData: completion,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Failed to fetch data",
      success: false,
      error: error.message, // Send the specific error message to the client
    });
  }
}
