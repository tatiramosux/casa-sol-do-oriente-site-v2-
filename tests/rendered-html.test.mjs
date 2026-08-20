import assert from "node:assert/strict";
import test from "node:test";

async function request(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza o calendário da Casa Sol do Oriente", async () => {
  const response = await request("/calendario");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Casa Sol do Oriente/);
  assert.match(html, /Calendário/);
  assert.match(html, /Agenda da Casa/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("rejeita parâmetros inválidos na API do calendário", async () => {
  const response = await request("/api/calendar?year=2026&month=13");
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Mês inválido." });
});
