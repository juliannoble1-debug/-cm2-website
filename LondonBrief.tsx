                    A confirmation email has been sent to your inbox with a download link. If you have any questions, please contact Square Centimeter directly.
                  </p>
                  <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "#C9A96E",
                      color: "#0D1B2A",
                      padding: "0.75rem 1.5rem",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    <ExternalLink size={14} /> Open PDF Again
                  </a>
                </div>
              ) : (
                <form onSubmit={briefForm.handleSubmit(onBriefSubmit)}>
                  <p style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "oklch(48% 0.012 60)", marginBottom: "1.5rem" }}>
                    Private Enquiry
                  </p>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 400, marginBottom: "2rem" }}>Request the Investment Brief</h3>

                  {/* Full Name */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>Full Name *</label>
                    <input {...briefForm.register("fullName")} style={inputStyle} placeholder="Your full name" />
                    {briefForm.formState.errors.fullName && <p style={errorStyle}>{briefForm.formState.errors.fullName.message}</p>}
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>Email Address *</label>
                    <input {...briefForm.register("email")} type="email" style={inputStyle} placeholder="your@email.com" />
                    {briefForm.formState.errors.email && <p style={errorStyle}>{briefForm.formState.errors.email.message}</p>}
                  </div>

                  {/* WhatsApp */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>WhatsApp Number (optional)</label>
                    <input {...briefForm.register("whatsapp")} type="tel" style={inputStyle} placeholder="+44 7000 000000" />
                  </div>

                  {/* Country */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>Country of Residence</label>
                    <input {...briefForm.register("country")} style={inputStyle} placeholder="e.g. United Arab Emirates" />
                  </div>

                  {/* Investor Type */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>Investor Type *</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      {(["Capital Deployment", "End User"] as const).map((type) => (
                        <label key={type} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.625rem",
                          padding: "0.75rem",
                          border: `1px solid ${briefForm.watch("investorType") === type ? "#C9A96E" : "oklch(88% 0.006 80)"}`,
                          cursor: "pointer",
                          fontSize: "0.875rem",
                        }}>
                          <input
                            type="radio"
                            value={type}
                            {...briefForm.register("investorType")}
                            style={{ accentColor: "#C9A96E" }}
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                    {briefForm.formState.errors.investorType && <p style={errorStyle}>{briefForm.formState.errors.investorType.message}</p>}
                  </div>

                  {/* Budget Range */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <label style={labelStyle}>Investment Budget *</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      {(["Under £500k", "£500k – £1M", "£1M – £2M", "£2M+"] as const).map((range) => (
                        <label key={range} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.625rem",
                          padding: "0.75rem",
                          border: `1px solid ${briefForm.watch("budgetRange") === range ? "#C9A96E" : "oklch(88% 0.006 80)"}`,
                          cursor: "pointer",
                          fontSize: "0.875rem",
                        }}>
                          <input
                            type="radio"
                            value={range}
                            {...briefForm.register("budgetRange")}
                            style={{ accentColor: "#C9A96E" }}
                          />
                          {range}
                        </label>
                      ))}
                    </div>
                    {briefForm.formState.errors.budgetRange && <p style={errorStyle}>{briefForm.formState.errors.budgetRange.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitBrief.isPending}
                    style={{
                      width: "100%",
                      background: "oklch(13% 0.005 60)",
                      color: "oklch(98.8% 0.003 80)",
                      border: "none",
                      padding: "1rem",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: submitBrief.isPending ? "not-allowed" : "pointer",
                      opacity: submitBrief.isPending ? 0.7 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {submitBrief.isPending ? "Submitting…" : "Download Investment Brief"}
                  </button>
                  <p style={{ fontSize: "0.75rem", color: "oklch(48% 0.012 60)", textAlign: "center", marginTop: "1rem", lineHeight: 1.6 }}>
                    By appointment only. Your details are never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Investor Consultation ───────────────────────────────────────── */}
      <section ref={consultRef} style={{ padding: "6rem 0", background: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <div>
              <Eyebrow>Private Advisory</Eyebrow>
              <GoldDivider />
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 300, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
                Speak With a London Property Advisor
              </h2>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "oklch(48% 0.012 60)", marginBottom: "1.5rem" }}>
                Square Centimeter provides private advisory access to selected London property opportunities for international investors.
              </p>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.8, color: "oklch(48% 0.012 60)", marginBottom: "2.5rem" }}>
                If you would like to review current developments or discuss suitable investment options, request a consultation. A CM2 advisor will respond within 24 hours.
              </p>
              <div style={{ borderTop: "1px solid oklch(88% 0.006 80)", paddingTop: "2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  {[
                    { label: "Model", value: "By Appointment" },
                    { label: "Response", value: "Within 24 Hours" },
                    { label: "Markets", value: "London · Dubai · Abu Dhabi" },
                    { label: "Partner", value: "London Square (Aldar)" },
                  ].map((item, i) => (
                    <div key={i}>
                      <p style={{ fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "0.25rem" }}>{item.label}</p>
                      <p style={{ fontSize: "0.875rem", fontWeight: 400 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Consultation form */}
            <div style={{ background: "oklch(96% 0.004 80)", padding: "2.5rem" }}>
              {consultSubmitted ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <CheckCircle2 size={48} style={{ color: "#C9A96E", margin: "0 auto 1.5rem" }} />
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 400, marginBottom: "0.75rem" }}>Request received.</h3>
                  <p style={{ fontSize: "0.875rem", color: "oklch(48% 0.012 60)", lineHeight: 1.7 }}>
                    A CM2 advisor will contact you within 24 hours to arrange your consultation. No spam. No sharing of your data.
                  </p>
                </div>
              ) : (
                <form onSubmit={consultForm.handleSubmit(onConsultSubmit)}>
                  <p style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "oklch(48% 0.012 60)", marginBottom: "1.5rem" }}>
                    Investor Consultation
                  </p>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 400, marginBottom: "2rem" }}>
                    Request Investor Consultation
                    {contactProject && (
                      <span style={{ display: "block", fontSize: "0.875rem", fontWeight: 400, color: "#C9A96E", marginTop: "0.375rem" }}>
                        Re: {contactProject}
                      </span>
                    )}
                  </h3>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>Full Name *</label>
                    <input {...consultForm.register("fullName")} style={inputStyle} placeholder="Your full name" />
                    {consultForm.formState.errors.fullName && <p style={errorStyle}>{consultForm.formState.errors.fullName.message}</p>}
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>Email Address *</label>
                    <input {...consultForm.register("email")} type="email" style={inputStyle} placeholder="your@email.com" />
                    {consultForm.formState.errors.email && <p style={errorStyle}>{consultForm.formState.errors.email.message}</p>}
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>WhatsApp Number (optional)</label>
                    <input {...consultForm.register("whatsapp")} type="tel" style={inputStyle} placeholder="+44 7000 000000" />
                  </div>

                  <div style={{ marginBottom: "1.75rem" }}>
                    <label style={labelStyle}>Message (optional)</label>
                    <textarea
                      {...consultForm.register("message")}
                      style={{ ...inputStyle, height: "100px", resize: "vertical" }}
                      placeholder="Tell us about your investment objectives, preferred locations, or any specific questions…"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitConsult.isPending}
                    style={{
                      width: "100%",
                      background: "oklch(13% 0.005 60)",
                      color: "oklch(98.8% 0.003 80)",
                      border: "none",
                      padding: "1rem",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: submitConsult.isPending ? "not-allowed" : "pointer",
                      opacity: submitConsult.isPending ? 0.7 : 1,
                    }}
                  >
                    {submitConsult.isPending ? "Submitting…" : "Request Investor Consultation"}
                  </button>
                  <p style={{ fontSize: "0.75rem", color: "oklch(48% 0.012 60)", textAlign: "center", marginTop: "1rem", lineHeight: 1.6 }}>
                    A CM2 advisor will respond within 24 hours. No spam. No sharing of your data.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer style={{ background: "oklch(13% 0.005 60)", padding: "3rem 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
            <div>
              <p style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E", marginBottom: "1rem" }}>
                Square Centimeter · CM2
              </p>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "320px" }}>
                Private property investment advisory. Curated opportunities across London, Dubai, and Abu Dhabi.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>Markets</p>
              {["London", "Dubai", "Abu Dhabi"].map((m) => (
                <a key={m} href="https://www.thecm2.com/projects" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "0.5rem" }}>{m}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>Information</p>
              <a href="https://www.thecm2.com" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "0.5rem" }}>www.thecm2.com</a>
              <a href="https://www.thecm2.com/trust" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "0.5rem" }}>Trust & Transparency</a>
              <a href="https://www.thecm2.com/contact" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", marginBottom: "0.5rem" }}>Contact</a>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWr
(Content truncated due to size limit. Use line ranges to read remaining content)