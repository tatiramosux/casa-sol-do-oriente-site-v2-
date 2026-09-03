import { NextResponse } from "next/server";
import {
  isGoogleCalendarConfigured,
  listGoogleCalendarEvents,
  type SiteCalendarEvent,
} from "@/lib/google-calendar";

export const dynamic = "force-dynamic";

function normalizedTitle(event: SiteCalendarEvent) {
  return event.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export async function GET() {
  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json({ configured: false, dates: {} });
  }

  const start = new Date();
  const end = new Date(start);
  end.setUTCFullYear(end.getUTCFullYear() + 1);

  try {
    const events =
      (await listGoogleCalendarEvents(start.toISOString(), end.toISOString())) ||
      [];
    const hospital = events.find((event) =>
      normalizedTitle(event).includes("hospital terapeutico"),
    );
    const griefSupport = events.find((event) => {
      const title = normalizedTitle(event);
      return (
        title.includes("grupo de apoio ao luto") ||
        title.includes("a vida continua")
      );
    });
    // Proxima gira com atendimento na Casa. Giras externas ficam de fora porque
    // nao oferecem o atendimento de segunda descrito na pagina /gira.
    const nextGira = events.find(
      (event) =>
        event.category === "giras" && !normalizedTitle(event).includes("externa"),
    );

    return NextResponse.json(
      {
        configured: true,
        dates: {
          hospital: hospital?.start,
          griefSupport: griefSupport?.start,
          nextGira: nextGira?.start,
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Upcoming project dates sync failed", error);
    return NextResponse.json(
      { configured: true, dates: {}, error: "Agenda indisponível." },
      { status: 502 },
    );
  }
}
