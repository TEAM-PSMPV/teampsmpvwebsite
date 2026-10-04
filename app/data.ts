export type Service = {
  id: string;
  number: string;
  title: string;
  positioning: string;
  deliverables: string[];
  workflow: string;
};

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "About us", href: "/about-us" },
  { label: "Our work", href: "/case-study" },
  { label: "Our products", href: "/products" },
];

export const services: Service[] = [
  {
    id: "website-digital-presence",
    number: "01",
    title: "Website & Digital Presence",
    positioning:
      "Professional websites, landing pages and digital trust systems for businesses, clinics, hospitals, coaching centres and products.",
    deliverables: [
      "Business and service websites",
      "SEO, analytics and contact systems",
      "Privacy, support and product pages",
      "Hosting, DNS and launch handover",
    ],
    workflow:
      "Discovery → sitemap → content → interface → development → testing → deployment → support",
  },
  {
    id: "crm-dashboard-systems",
    number: "02",
    title: "CRM & Dashboard Systems",
    positioning:
      "Internal operating dashboards for leads, appointments, customers, payments, support issues and follow-ups.",
    deliverables: [
      "Role-based admin panels",
      "Lead and customer pipelines",
      "Appointment and follow-up modules",
      "Reporting, exports and audit trails",
    ],
    workflow:
      "Process map → data model → roles → wireframe → APIs → dashboard → automation → QA",
  },
  {
    id: "whatsapp-automation",
    number: "03",
    title: "WhatsApp Automation & Bots",
    positioning:
      "Consent-based lead capture, appointment booking, follow-ups, reminders and human handoff through official WhatsApp workflows.",
    deliverables: [
      "Cloud API and template setup",
      "Opt-in and chatbot flows",
      "Appointment reminders",
      "CRM integration and human escalation",
    ],
    workflow:
      "Use case → opt-in review → templates → API → bot flow → CRM → sandbox → monitoring",
  },
  {
    id: "ai-agents-chatbots",
    number: "04",
    title: "AI Agents & Chatbots",
    positioning:
      "AI assistants for website enquiries, FAQs, internal support, sales follow-up and approved document-based answers.",
    deliverables: [
      "Website and FAQ assistants",
      "Document-grounded answer systems",
      "Guardrails and escalation rules",
      "Analytics and human review queues",
    ],
    workflow:
      "Knowledge scope → approved sources → prompts → retrieval → safety QA → integration → improvement",
  },
  {
    id: "android-product-development",
    number: "05",
    title: "Android App & Product Development",
    positioning:
      "Client and internal Android products with Play Store readiness, privacy pages and a maintainable release process.",
    deliverables: [
      "Android apps and supporting APIs",
      "Play Store assets and policy pages",
      "Internal testing and staged rollout",
      "Crash monitoring and release notes",
    ],
    workflow:
      "Product brief → scope → UI → development → internal test → policy check → rollout → updates",
  },
  {
    id: "managed-it-operations",
    number: "06",
    title: "Maintenance, Support & Managed IT",
    positioning:
      "Recurring operational care that keeps websites, dashboards, bots and applications secure and dependable.",
    deliverables: [
      "Bug fixes and content updates",
      "Backups and uptime monitoring",
      "Security and access reviews",
      "Support tickets and monthly reports",
    ],
    workflow:
      "Handover → SLA → monitoring → triage → fix → client update → report → renewal review",
  },
  {
    id: "requirements-automation-audit",
    number: "07",
    title: "Requirement Analysis & Automation Audit",
    positioning:
      "A structured diagnostic that maps current operations and identifies what should be digitised or automated first.",
    deliverables: [
      "Current workflow and pain-point map",
      "Automation opportunity list",
      "Recommended modules and risks",
      "Timeline and implementation roadmap",
    ],
    workflow:
      "Interview → process map → gap analysis → options → roadmap → proposal → implementation handoff",
  },
];

export const deliveryPhases = [
  ["01", "Discovery", "Business context, users, constraints and measurable goals."],
  ["02", "Requirements", "Written scope, workflows, acceptance criteria and exclusions."],
  ["03", "Solution design", "Architecture, data model, interface direction and risk controls."],
  ["04", "Commercial approval", "Proposal, milestones, responsibilities and change process."],
  ["05", "Build", "Incremental engineering with documented reviews and demonstrations."],
  ["06", "Quality gates", "Functional, responsive, security and acceptance testing."],
  ["07", "Release", "Deployment, monitoring, training and controlled handover."],
  ["08", "Operate", "Support, reporting, maintenance and continuous improvement."],
];

export const faqs = [
  {
    question: "What does TEAM-PSMPV build?",
    answer:
      "We design and build websites, CRM and dashboard systems, WhatsApp automations, AI assistants, Android products and the operational foundations that keep them running.",
  },
  {
    question: "How does a project begin?",
    answer:
      "Every serious project begins with requirement analysis and workflow mapping. We turn the discussion into a written scope, delivery plan, milestones and clear acceptance criteria before implementation.",
  },
  {
    question: "Can you improve an existing system?",
    answer:
      "Yes. We first audit the current product, data, integrations and operating risks, then propose a staged repair, migration or maintenance plan.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. Maintenance, monitoring, backups, issue resolution and operational reporting can be structured as a recurring support engagement.",
  },
  {
    question: "How do you handle security?",
    answer:
      "Our delivery baseline includes least-privilege access, MFA where appropriate, secure credential handling, backups, change records and testing before release.",
  },
];
