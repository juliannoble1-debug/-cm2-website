import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { getDb } from "./db";
import { leads, investorLeads } from "../drizzle/schema";
import { insertBriefLead, insertConsultationLead, getAllBriefLeads, getAllConsultationLeads, toCSV } from "./leadsDb";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { readFileSync, writeFileSync } from "fs";
import { sendLeadEmail, sendInvestorAutoResponse } from "./email";
import { resolve } from "path";

const ADMIN_PASSCODE = process.env.CM2_ADMIN_PASSCODE || "cm2admin2024";
const PROJECTS_PATH = resolve(process.cwd(), "client/src/data/projects.json");

function readProjects() {
  try {
    return JSON.parse(readFileSync(PROJECTS_PATH, "utf-8"));
  } catch {
    return [];
  }
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── Lead capture ──────────────────────────────────────────────────────────
  lead: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          whatsapp: z.string().min(1),
          email: z.string().email().optional(),
          budget: z.string().optional(),
          objective: z.string().optional(),
          market: z.string().optional(),
          unitType: z.string().optional(),
          timeline: z.string().optional(),
          notes: z.string().optional(),
          shortlist: z.array(z.string()).optional(),
          source: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (db) {
          await db.insert(leads).values({
            name: input.name,
            whatsapp: input.whatsapp,