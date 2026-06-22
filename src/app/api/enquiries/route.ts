import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("ENQUIRY DATA:", data);

    const { error } = await supabase
      .from("enquiries")
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.message.split("\n\n")[0],
          message: data.message,
          source: data.source,
        },
      ]);

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}