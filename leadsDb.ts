import { desc } from "drizzle-orm";
import { getDb } from "./db";
import {
  briefLeads,
  consultationLeads,
  type InsertBriefLead,
  type InsertConsultationLead,
} from "../drizzle/schema";

export async function insertBriefLead(data: InsertBriefLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(briefLeads).values(data);
}

export async function insertConsultationLead(data: InsertConsultationLead) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(consultationLeads).values(data);
}

export async function getAllBriefLeads() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(briefLeads).orderBy(desc(briefLeads.createdAt));
}

export async function getAllConsultationLeads() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(consultationLeads).orderBy(desc(consultationLeads.createdAt));
}

function toCSV(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      headers.map((h) => JSON.stringify(r[h] ?? "")).join(",")
    ),
  ];
  return lines.join("\n");
}

export { toCSV };
