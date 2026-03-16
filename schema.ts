import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// CM2 lead capture table
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 64 }).notNull(),
  email: varchar("email", { length: 320 }),
  budget: varchar("budget", { length: 128 }),
  objective: varchar("objective", { length: 64 }),
  market: varchar("market", { length: 64 }),
  unitType: varchar("unitType", { length: 64 }),
  timeline: varchar("timeline", { length: 64 }),
  notes: text("notes"),
  shortlist: text("shortlist"), // JSON array of project slugs
  source: varchar("source", { length: 64 }).default("cm2_gpt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

// Investment Brief Leads — submitted via the PDF download form
export const briefLeads = mysqlTable("briefLeads", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 64 }),
  investorType: mysqlEnum("investorType", ["Capital Deployment", "End User"]).notNull(),
  budgetRange: mysqlEnum("budgetRange", ["Under \u00a3500k", "\u00a3500k \u2013 \u00a31M", "\u00a31M \u2013 \u00a32M", "\u00a32M+"]).notNull(),
  country: varchar("country", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BriefLead = typeof briefLeads.$inferSelect;
export type InsertBriefLead = typeof briefLeads.$inferInsert;

// Investor Consultation Leads — submitted via the advisory booking form
export const consultationLeads = mysqlTable("consultationLeads", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 64 }),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ConsultationLead = typeof consultationLeads.$inferSelect;
export type InsertConsultationLead = typeof consultationLeads.$inferInsert;

// Unified Investor Leads — central lead capture table for all forms
export const investorLeads = mysqlTable("investorLeads", {
  id: int("id").autoincrement().primaryKey(),
  pageSource: varchar("pageSource", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 64 }).notNull(),
  country: varchar("country", { length: 128 }).notNull(),
  investorType: mysqlEnum("investorType", ["Capital Deployment", "End User"]).notNull(),
  investmentBudget: mysqlEnum("investmentBudget", ["Under \u00a3500k", "\u00a3500k \u2013 \u00a31M", "\u00a31M \u2013 \u00a33M", "\u00a33M+"]).notNull(),
  investmentInterest: mysqlEnum("investmentInterest", ["London", "UAE", "Both"]),
  timeline: varchar("timeline", { length: 128 }),
  notes: text("notes"),
  utmSource: varchar("utmSource", { length: 255 }),
  utmMedium: varchar("utmMedium", { length: 255 }),
  utmCampaign: varchar("utmCampaign", { length: 255 }),
  ipAddress: varchar("ipAddress", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type InvestorLead = typeof investorLeads.$inferSelect;
export type InsertInvestorLead = typeof investorLeads.$inferInsert;
