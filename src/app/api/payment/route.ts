import { NextResponse } from "next/server";
import Razorpay from "razorpay";

interface RazorpayOrder {
  id: string;
  currency: string;
  amount: number;
}

interface RequestBody {
  amount: number;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    console.log("Received request:", request);

    // Parse the request body to get the payment amount
    const { amount }: RequestBody = await request.json();
    console.log("Parsed amount:", amount);

    if (isNaN(amount)) {
      throw new Error("Invalid amount provided.");
    }

    // Initialize Razorpay instance with your key_id and key_secret
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_SECRET as string,
    });

    console.log("Razorpay instance created with:", {
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET ? "Provided" : "Not Provided",
    });

    // Create an order in Razorpay
    const options = {
      amount: amount * 100, // Amount is in the smallest currency unit (paise for INR)
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10e10)}`,
    };

    const order: RazorpayOrder = (await razorpay.orders.create(
      options
    )) as RazorpayOrder;

    console.log("Razorpay order created:", order);

    // Return the order details in the response
    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    if (error.response) {
      console.error("Razorpay Response Error Data:", error.response.data);
      console.error("Razorpay Response Status:", error.response.status);
      console.error("Razorpay Response Headers:", error.response.headers);
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
