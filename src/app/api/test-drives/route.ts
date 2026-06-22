import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    console.log("TEST DRIVE DATA:", body);


    const { error } = await supabase
      .from("test_drives")
      .insert([
        {
          vehicle: body.vehicle,
          date: body.date,
          time: body.time,
          name: body.name,
          email: body.email,
          phone: body.phone,
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


  } catch (err) {

    console.error("SERVER ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }

}