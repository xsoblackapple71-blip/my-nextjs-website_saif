import { NextRequest, NextResponse } from "next/server";

// Helper function to escape HTML in Telegram
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  const { name, email, message, projectType, timeline } = await req.json();

  // Validate required fields
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  // Validate message length
  if (message.trim().length < 30) {
    return NextResponse.json(
      { error: "Message should be at least 30 characters long" },
      { status: 400 }
    );
  }

  // Optional: Block disposable email providers
  const blockList = ["tempmail", "mailinator", "10minutemail", "guerrillamail"];
  const domain = email.split("@")[1];
  if (blockList.some((blocked) => domain.includes(blocked))) {
    return NextResponse.json(
      { error: "Temporary email addresses are not allowed" },
      { status: 403 }
    );
  }

  const telegramToken = "8954985660:AAGLnZ6MvTqhsO6AEbJr9efDLbT3L1q7nnE";
  const telegramChatId = "8513579969";
  const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

  try {
    // Build Telegram message
    const telegramMessage = `🔔 <b>New Portfolio Inquiry</b>
👤 <b>Name:</b> ${escapeHtml(name)}
📧 <b>Email:</b> ${escapeHtml(email)}
🎬 <b>Project Type:</b> ${projectType || "Not specified"}
⏰ <b>Timeline:</b> ${timeline || "Not specified"}
💬 <b>Message:</b>
${escapeHtml(message)}`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      const errorMessage = data.description || "Failed to send message to Telegram";
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
