import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the DB module so tests run without a real database
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
}));

// Mock notification so tests don't call external services
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("lead.submit", () => {
  it("returns success when DB is unavailable (graceful fallback)", async () => {
    const caller = appRouter.createCaller(createCtx());
    const result = await caller.lead.submit({
      name: "Test User",
      whatsapp: "+44 7000 000000",
      source: "contact_form",
    });
    expect(result).toEqual({ success: true });
  });

  it("accepts optional fields without throwing", async () => {
    const caller = appRouter.createCaller(createCtx());
    const result = await caller.lead.submit({
      name: "Investor A",
      whatsapp: "+971 50 000 0000",
      email: "investor@example.com",
      budget: "USD 2–5M",
      objective: "investor",
      market: "Abu Dhabi",
      unitType: "villa",
      timeline: "3-6months",
      notes: "Looking for Saadiyat villas",
      shortlist: ["saadiyat-lagoons"],
      source: "cm2gpt_modal",
    });
    expect(result).toEqual({ success: true });
  });
});

describe("admin.login", () => {
  const CORRECT_PASSCODE = process.env.CM2_ADMIN_PASSCODE || "cm2admin2024";

  it("returns success with correct passcode", async () => {
    const caller = appRouter.createCaller(createCtx());
    const result = await caller.admin.login({ passcode: CORRECT_PASSCODE });
    expect(result).toEqual({ success: true });
  });

  it("throws with incorrect passcode", async () => {
    const caller = appRouter.createCaller(createCtx());
    await expect(caller.admin.login({ passcode: "wrong" })).rejects.toThrow();
  });
});

describe("admin.getLeads", () => {
  it("returns empty array when DB is unavailable", async () => {
    const caller = appRouter.createCaller(createCtx());
    const result = await caller.admin.getLeads();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });
});

describe("admin.getProjects", () => {
  it("returns an array of projects from the JSON file", async () => {
    const caller = appRouter.createCaller(createCtx());
    const result = await caller.admin.getProjects();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});
