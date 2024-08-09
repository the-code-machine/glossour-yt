import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

interface RequestBody {
  input: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    if (!body.input) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    const options = {
      method: "GET",
      url: "https://instagram-data1.p.rapidapi.com/user/info",
      params: {
        username: body.input,
      },
      headers: {
        "x-rapidapi-key": "3e4302d4aemshf20618d3c6f9d9dp195144jsnce9a6024ce10",
        "x-rapidapi-host": "instagram-data1.p.rapidapi.com",
      },
    };

    const responseData = await axios.request(options);
    const data = responseData.data;

    const imageResponse = await axios.get(data.profile_pic_url_hd, {
      responseType: "arraybuffer",
    });

    console.log("Instagram data:", data);

    // Convert the image buffer to a base64 string for easy transport in JSON
    const imageBase64 = Buffer.from(imageResponse.data, "binary").toString(
      "base64"
    );

    return NextResponse.json({ data, imageBase64 }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Instagram details" },
      { status: 500 }
    );
  }
}
