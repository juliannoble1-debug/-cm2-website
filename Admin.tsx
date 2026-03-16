/* Design: Quiet Modernism — Admin CMS page
 * Passcode protected via tRPC admin.login
 * Tabs: Projects | Enquiry Leads | Brief Leads | Consultation Leads
 */
import { useState, useEffect } from "react";
import { Lock, Save, Plus, Trash2, AlertCircle, Download } from "lucide-react";
import { trpc } from "@/lib/trpc";
import type { Project } from "@/types/project";

const EMPTY_PROJECT: Project = {
  slug: "",
  name: "",
  market: "Abu Dhabi",
  typeLabel: "",
  oneLiner: "",
  image: "",
  facts: [""],
  why: [""],
  tags: [""],
  lastUpdated: new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
};

type Tab = "projects" | "enquiry-leads" | "brief-leads" | "consult-leads";

// ── Shared helpers ────────────────────────────────────────────────────────────
function downloadCSV(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function toCSVString(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(",")),
  ];
  return lines.join("\n");
}

function fmt(val: unknown): string {
  if (val instanceof Date) return val.toLocaleString("en-GB");
  if (typeof val === "string" && val.match(/^\d{4}-\d{2}-\d{2}T/)) {
    return new Date(val).toLocaleString("en-GB");
  }
  return String(val ?? "—");
}

// ── Leads table component ─────────────────────────────────────────────────────
function LeadsTable({
  title,
  columns,
  rows,
  isLoading,
  csvFilename,
}: {
  title: string;
  columns: { key: string; label: string }[];
  rows: Record<string, unknown>[];
  isLoading: boolean;
  csvFilename: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="cm2-label">{title}</p>
          {!isLoading && (
            <p className="text-[0.8125rem] text-[#9B9B9B] mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {rows.length} {rows.length === 1 ? "record" : "records"}
            </p>
          )}
        </div>
        {rows.length > 0 && (
          <button
            onClick={() => downloadCSV(csvFilename, toCSVString(rows))}
            className="btn-secondary flex items-center gap-2 text-[0.8125rem]"
          >
            <Download size={13} /> Export CSV
          </button>
        )}
      </div>

      {isLoading ? (
        <p className="text-[0.875rem] text-[#9B9B9B] py-8 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Loading…
        </p>
      ) : rows.length === 0 ? (
        <div className="border border-[#E0DDD8] p-12 text-center">
          <p className="text-[0.875rem] text-[#9B9B9B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            No records yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[0.8125rem] border-collapse" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <thead>
              <tr className="border-b border-[#E0DDD8]">
                {columns.map((c) => (
                  <th key={c.key} className="text-left py-2.5 px-3 text-[#6B6B6B] font-normal whitespace-nowrap">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-[#F0EDE8] hover:bg-[#FAF9F7] transition-colors">
                  {columns.map((c) => (
                    <td key={c.key} className="py-2.5 px-3 text-[#111111] align-top">
                      {fmt(row[c.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Main Admin component ──────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  const [projects, setProjects] = useState<Project[]>([]);
  const [saveMsg, setSaveMsg] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: () => setAuthed(true),
    onError: () => setLoginError("Incorrect passcode."),
  });

  const projectsQuery = trpc.admin.getProjects.useQuery(undefined, { enabled: authed });
  const saveProjectsMutation = trpc.admin.saveProjects.useMutation({
    onSuccess: () => setSaveMsg("All projects saved successfully."),
    onError: () => setSaveMsg("Save failed. Check server logs."),
  });

  const enquiryLeadsQuery = trpc.admin.getLeads.useQuery(undefined, { enabled: authed && activeTab === "enquiry-leads" });
  const briefLeadsQuery = trpc.admin.getBriefLeads.useQuery(undefined, { enabled: authed && activeTab === "brief-leads" });
  const consultLeadsQuery = trpc.admin.getConsultationLeads.useQuery(undefined, { enabled: authed && activeTab === "consult-leads" });

  useEffect(() => {
    if (projectsQuery.data) {
      setProjects(projectsQuery.data as Project[]);
    }
  }, [projectsQuery.data]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    loginMutation.mutate({ passcode });
  };

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setEditProject(JSON.parse(JSON.stringify(projects[idx])));
    setSaveMsg("");
  };

  const handleAddNew = () => {
    const newProj = { ...EMPTY_PROJECT };
    const updated = [...projects, newProj];
    setProjects(updated);
    const newIdx = updated.length - 1;
    setSelectedIdx(newIdx);
    setEditProject(JSON.parse(JSON.stringify(newProj)));
    setSaveMsg("");
  };

  const handleDelete = (idx: number) => {
    if (!confirm("Delete this project?")) return;
    const updated = projects.filter((_, i) => i !== idx);
    setProjects(updated);
    setSelectedIdx(null);
    setEditProject(null);
  };

  const handleSaveEdit = () => {
    if (selectedIdx === null || !editProject) return;
    const updated = [...projects];
    updated[selectedIdx] = editProject;
    setProjects(updated);
    setSaveMsg("Changes applied locally. Click 'Save All' to persist.");
  };

  const handleSaveAll = () => {
    setSaveMsg("");
    saveProjectsMutation.mutate(projects);
  };

  const updateField = (field: keyof Project, value: string) => {
    if (!editProject) return;
    setEditProject({ ...editProject, [field]: value });
  };

  const updateArrayField = (field: "facts" | "why" | "tags", idx: number, value: string) => {
    if (!editProject) return;
    const arr = [...editProject[field]];
    arr[idx] = value;
    setEditProject({ ...editProject, [field]: arr });
  };

  const addArrayItem = (field: "facts" | "why" | "tags") => {
    if (!editProject) return;
    setEditProject({ ...editProject, [field]: [...editProject[field], ""] });
  };

  const removeArrayItem = (field: "facts" | "why" | "tags", idx: number) => {
    if (!editProject) return;
    const arr = editProject[field].filter((_: string, i: number) => i !== idx);
    setEditProject({ ...editProject, [field]: arr });
  };

  // ── Login screen ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-20">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Lock size={32} className="mx-auto text-[#111111] mb-4" />
            <p className="cm2-label mb-2">Admin Access</p>
            <h1 className="text-[2rem] text-[#111111]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              CM2 Admin
            </h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="cm2-label block mb-1.5">Passcode</label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full border border-[#E0DDD8] px-3 py-3 text-[0.875rem] bg-white focus:outline-none focus:border-[#111111] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                placeholder="Enter admin passcode"
              />
            </div>
            {loginError && (
              <p className="text-[0.8125rem] text-red-600 flex items-center gap-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <AlertCircle size={14} /> {loginError}
              </p>
            )}
            <button type="submit" disabled={loginMutation.isPending} className="btn-primary w-full justify-center">
              {loginMutation.isPending ? "Checking..." : "Enter"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Tab navigation ────────────────────────────────────────────────────────
  const tabs: { id: Tab; label: string }[] = [
    { id: "projects", label: "Projects" },
    { id: "enquiry-leads", label: "Enquiry Leads" },
    { id: "brief-leads", label: "Brief Leads" },
    { id: "consult-leads", label: "Consultation Leads" },
  ];

  return (
    <div className="min-h-screen py-10">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="cm2-label mb-1">Admin</p>
            <h1 className="text-[1.75rem] text-[#111111]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
              CM2 Admin
            </h1>
          </div>
          {activeTab === "projects" && (
            <div className="flex gap-3 items-center">
              {saveMsg && (
                <p className="text-[0.8125rem] text-[#6B6B6B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{saveMsg}</p>
              )}
              <button onClick={handleSaveAll} disabled={saveProjectsMutation.isPending} className="btn-primary flex items-center gap-2">
                <Save size={14} /> {saveProjectsMutation.isPending ? "Saving..." : "Save All"}
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-[#E0DDD8] mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-[0.8125rem] whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? "border-[#111111] text-[#111111]"
                  : "border-transparent text-[#9B9B9B] hover:text-[#6B6B6B]"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Projects tab ── */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project list */}
            <div className="lg:col-span-1">
              <div className="flex items-center justify-between mb-3">
                <p className="cm2-label">Projects ({projects.length})</p>
                <button onClick={handleAddNew} className="flex items-center gap-1 text-[0.8125rem] text-[#6B6B6B] hover:text-[#111111] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <Plus size={14} /> Add
                </button>
              </div>
              {projectsQuery.isLoading ? (
                <p className="text-[0.875rem] text-[#9B9B9B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Loading projects...</p>
              ) : (
                <div className="space-y-1">
                  {projects.map((p, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${
                        selectedIdx === i
                          ? "border-[#111111] bg-[#F4F2EE]"
                          : "border-[#E0DDD8] hover:border-[#C0BDB8]"
                      }`}
                      onClick={() => handleSelect(i)}
                    >
                      <div>
                        <div className="text-[0.875rem] text-[#111111]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {p.name || "Untitled"}
                        </div>
                        <div className="text-[0.75rem] text-[#9B9B9B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {p.market}
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(i); }}
                        className="p-1 text-[#C0BDB8] hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Edit panel */}
            <div className="lg:col-span-2">
              {editProject ? (
                <div className="border border-[#E0DDD8] p-6">
                  <div className="flex items-center justify-between mb-5">
                    <p className="cm2-label">Edit Project</p>
                    <button onClick={handleSaveEdit} className="btn-primary text-[0.75rem] py-1.5 px-3">
                      Apply Changes
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(["name", "slug", "typeLabel", "oneLiner", "image", "lastUpdated"] as const).map((field) => (
                      <div key={field}>
                        <label className="cm2-label block mb-1.5">{field}</label>
                        <input
                          value={editProject[field] as string}
                          onChange={(e) => updateField(field, e.target.value)}
                          className="w-full border border-[#E0DDD8] px-3 py-2 text-[0.875rem] bg-white focus:outline-none focus:border-[#111111] transition-colors"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="cm2-label block mb-1.5">Market</label>
                      <select
                        value={editProject.market}
                        onChange={(e) => updateField("market", e.target.value)}
                        className="w-full border border-[#E0DDD8] px-3 py-2 text-[0.875rem] bg-white focus:outline-none focus:border-[#111111] transition-colors"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {["Abu Dhabi", "Dubai", "London"].map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    {(["facts", "why", "tags"] as const).map((field) => (
                      <div key={field}>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="cm2-label">{field}</label>
                          <button onClick={() => addArrayItem(field)} className="text-[0.75rem] text-[#6B6B6B] hover:text-[#111111]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            + Add
                          </button>
                        </div>
                        <div className="space-y-2">
                          {editProject[field].map((item: string, i: number) => (
                            <div key={i} className="flex gap-2">
                              <input
                                value={item}
                                onChange={(e) => updateArrayField(field, i, e.target.value)}
                                className="flex-1 border border-[#E0DDD8] px-3 py-2 text-[0.875rem] bg-white focus:outline-none focus:border-[#111111] transition-colors"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              />
                              <button onClick={() => removeArrayItem(field, i)} className="p-2 text-[#C0BDB8] hover:text-red-500 transition-colors">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border border-[#E0DDD8] p-12 text-center">
                  <p className="text-[0.875rem] text-[#9B9B9B]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Select a project from the list to edit, or click Add to create a new one.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Enquiry Leads tab ── */}
        {activeTab === "enquiry-leads" && (
          <LeadsTable
            title="Enquiry Leads (CM2 GPT)"
            csvFilename="cm2-enquiry-leads.csv"
            isLoading={enquiryLeadsQuery.isLoading}
            rows={(enquiryLeadsQuery.data ?? []) as Record<string, unknown>[]}
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "Name" },
              { key: "whatsapp", label: "WhatsApp" },
              { key: "email", label: "Email" },
              { key: "budget", label: "Budget" },
              { key: "market", label: "Market" },
              { key: "objective", label: "Objective" },
              { key: "timeline", label: "Timeline" },
              { key: "source", label: "Source" },
              { key: "createdAt", label: "Date" },
            ]}
          />
        )}

        {/* ── Brief Leads tab ── */}
        {activeTab === "brief-leads" && (
          <LeadsTable
            title="London Investment Brief Leads"
            csvFilename="cm2-brief-leads.csv"
            isLoading={briefLeadsQuery.isLoading}
            rows={(briefLeadsQuery.data ?? []) as Record<string, unknown>[]}
            columns={[
              { key: "id", label: "ID" },
              { key: "fullName", label: "Name" },
              { key: "email", label: "Email" },
              { key: "whatsapp", label: "WhatsApp" },
              { key: "investorType", label: "Investor Type" },
              { key: "budgetRange", label: "Budget" },
              { key: "country", label: "Country" },
              { key: "createdAt", label: "Date" },
            ]}
          />
        )}

        {/* ── Consultation Leads tab ── */}
        {activeTab === "consult-leads" && (
          <LeadsTable
            title="Consultation Request Leads"
            csvFilename="cm2-consultation-leads.csv"
            isLoading={consultLeadsQuery.isLoading}
            rows={(consultLeadsQuery.data ?? []) as Record<string, unknown>[]}
            columns={[
              { key: "id", label: "ID" },
              { key: "fullName", label: "Name" },
              { key: "email", label: "Email" },
              { key: "whatsapp", label: "WhatsApp" },
              { key: "message", label: "Message" },
              { key: "createdAt", label: "Date" },
            ]}
          />
        )}
      </div>
    </div>
  );
}
