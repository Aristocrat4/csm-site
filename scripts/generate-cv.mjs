// Generates the one-page CSM CV PDF into /public, styled to echo the site:
// a serif name/headline, sans body, and the emerald accent.
//
//   node scripts/generate-cv.mjs
//
// Bracketed [placeholders] are intentional — the owner fills them in before use.
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "Gala-D-CSM-CV.pdf");

// ── Palette (matches the site tokens) ──────────────────────────────────────
const ink = rgb(0.078, 0.094, 0.102);
const muted = rgb(0.345, 0.408, 0.384);
const accent = rgb(0.043, 0.431, 0.31);
const border = rgb(0.886, 0.902, 0.89);

// ── Content ────────────────────────────────────────────────────────────────
const summary =
  "Customer-focused professional combining a proven sales record with hands-on software engineering. Spent over a year as the sole salesperson at a real-estate firm, closing a deal every month, then several years building the CRM and SaaS platforms customer teams depend on. Now focused on Customer Success, where relationship-building and technical fluency directly drive onboarding, retention, and growth.";

const skills =
  "Customer Success · Customer Onboarding · Customer Retention · Account Management · Client Relationship Management · Stakeholder Management · CRM platforms · SaaS · Customer Support · Technical troubleshooting · Sales";

const experience = [
  {
    // All engineering roles combined into one general entry (no employer names).
    role: "Web Developer",
    meta: "2022 – Present",
    bullets: [
      "Built and maintained web apps, CRMs, dashboards, and internal business platforms that customer and operations teams rely on daily.",
      "Delivered an end-to-end internal platform that replaced manual spreadsheets, improving how a team and its customers tracked operations.",
      "Partnered with stakeholders to ship what users actually needed — learning each product from the user’s side.",
    ],
  },
  {
    role: "Real-Estate Sales Specialist — DK Investment, Tbilisi",
    meta: "Jan 2020 – Jun 2021",
    bullets: [
      "Sole salesperson; closed at least one deal every month for a full year.",
      "Built and maintained daily client relationships from first contact through close.",
    ],
  },
];

const training = {
  text: "Completed an online Customer Success course led by Tekla, an Experience CSM Lead.",
  link: "linkedin.com/in/teklatoppings",
};
const languages = "English · Georgian";

// ── Render ───────────────────────────────────────────────────────────────
const doc = await PDFDocument.create();
doc.setTitle("Galaktioni Danelia — Customer Success Manager CV");
doc.setAuthor("Galaktioni Danelia");
doc.setSubject("Customer Success Manager");

const serif = await doc.embedFont(StandardFonts.TimesRoman);
const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
const sans = await doc.embedFont(StandardFonts.Helvetica);
const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);

const page = doc.addPage([595.28, 841.89]); // A4
const margin = 50;
const contentW = 595.28 - margin * 2;
let y = 841.89 - margin;

function wrap(str, font, size, maxW) {
  const lines = [];
  let line = "";
  for (const word of str.split(" ")) {
    const test = line ? `${line} ${word}` : word;
    if (line && font.widthOfTextAtSize(test, size) > maxW) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function line(str, font, size, color, { x = margin, lh = 1.34 } = {}) {
  page.drawText(str, { x, y: y - size, font, size, color });
  y -= size * lh;
}

function paragraph(str, font, size, color, { x = margin, maxW = contentW, lh = 1.34, gap = 5 } = {}) {
  for (const ln of wrap(str, font, size, maxW)) line(ln, font, size, color, { x, lh });
  y -= gap;
}

function section(title) {
  y -= 9;
  page.drawText(title.toUpperCase(), { x: margin, y: y - 9.5, font: sansBold, size: 9.5, color: accent });
  const ruleY = y - 15;
  page.drawLine({ start: { x: margin, y: ruleY }, end: { x: margin + contentW, y: ruleY }, thickness: 0.75, color: border });
  y = ruleY - 9;
}

function entry({ role, meta, bullets }) {
  page.drawText(role, { x: margin, y: y - 10.5, font: sansBold, size: 10.5, color: ink });
  if (meta) {
    const w = sans.widthOfTextAtSize(meta, 9);
    page.drawText(meta, { x: margin + contentW - w, y: y - 10.5, font: sans, size: 9, color: muted });
  }
  y -= 10.5 * 1.3 + 3;
  for (const b of bullets) {
    page.drawText("•", { x: margin + 3, y: y - 9.5, font: sans, size: 9.5, color: accent });
    for (const ln of wrap(b, sans, 9.5, contentW - 16)) {
      page.drawText(ln, { x: margin + 16, y: y - 9.5, font: sans, size: 9.5, color: ink });
      y -= 9.5 * 1.34;
    }
    y -= 1.5;
  }
  y -= 5;
}

function trainingBullet({ text, link }) {
  page.drawText("•", { x: margin + 3, y: y - 9.5, font: sans, size: 9.5, color: accent });
  for (const ln of wrap(text, sans, 9.5, contentW - 16)) {
    page.drawText(ln, { x: margin + 16, y: y - 9.5, font: sans, size: 9.5, color: ink });
    y -= 9.5 * 1.34;
  }
  page.drawText(link, { x: margin + 16, y: y - 9.5, font: sans, size: 9.5, color: accent });
  y -= 9.5 * 1.34 + 5;
}

// Header
page.drawText("GALAKTIONI DANELIA", { x: margin, y: y - 22, font: serifBold, size: 22, color: ink });
y -= 22 * 1.25;
line("Customer Success Manager", sans, 11.5, accent, { lh: 1.4 });
line(
  "Tbilisi, Georgia · Remote (GMT+4) · galadanelia1@gmail.com",
  sans,
  9.5,
  muted,
  { lh: 1.2 },
);
y -= 4;
page.drawLine({ start: { x: margin, y }, end: { x: margin + contentW, y }, thickness: 1.5, color: accent });
y -= 4;

section("Summary");
paragraph(summary, sans, 9.5, ink, { lh: 1.4 });

section("Core Skills");
paragraph(skills, sans, 9.5, ink, { lh: 1.45 });

section("Experience");
for (const e of experience) entry(e);

section("Customer Success Training");
trainingBullet(training);

section("Languages");
paragraph(languages, sans, 9.5, ink, { lh: 1.4 });

const bytes = await doc.save();
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, bytes);
console.log(`CV written to ${OUT} (${(bytes.length / 1024).toFixed(1)} KB), pages: ${doc.getPageCount()}, endY: ${y.toFixed(0)}`);
