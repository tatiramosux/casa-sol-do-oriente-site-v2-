import { NextRequest, NextResponse } from "next/server";
import {
  isGoogleCalendarConfigured,
  listGoogleCalendarEvents,
} from "@/lib/google-calendar";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const year = Number(request.nextUrl.searchParams.get("year"));
  const month = Number(request.nextUrl.searchParams.get("month"));
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12
  ) {
    return NextResponse.json({ error: "Mês inválido." }, { status: 400 });
  }
  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json({ configured: false, events: [] });
  }
  const start = new Date(Date.UTC(year, month - 1, 1));
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 42);
  try {
    const events = await listGoogleCalendarEvents(
      start.toISOString(),
      end.toISOString(),
    );
    return NextResponse.json(
      {
        configured: true,
        events: events || [],
        syncedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control":
            "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (error) {
    console.error("Calendar sync failed", error);
    return NextResponse.json(
      { configured: true, error: "Não foi possível atualizar a agenda agora." },
      { status: 502 },
    );
  }
}
