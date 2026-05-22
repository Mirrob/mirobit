const STATS_API_URL = "https://script.google.com/macros/s/AKfycbys5TdJTlSbQ7JI7hBmWVgebQvcWlos5uIk7X2X__PrKxD8eacIvk1nwZ7mv9eFbDua/exec";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const languageToggle = document.querySelector("[data-language-toggle]");
const year = document.querySelector("[data-year]");
const statTargets = {
  attendanceValue: document.querySelector('[data-stat="attendance-value"]'),
  attendanceLabel: document.querySelector('[data-stat="attendance-label"]'),
  salesValue: document.querySelector('[data-stat="sales-value"]'),
  salesLabel: document.querySelector('[data-stat="sales-label"]'),
  followupsValue: document.querySelector('[data-stat="followups-value"]'),
  followupsLabel: document.querySelector('[data-stat="followups-label"]'),
  leadTitle: document.querySelector('[data-stat="lead-title"]'),
  leadValue: document.querySelector('[data-stat="lead-value"]'),
  assignmentTitle: document.querySelector('[data-stat="assignment-title"]'),
  assignmentValue: document.querySelector('[data-stat="assignment-value"]'),
  managerTitle: document.querySelector('[data-stat="manager-title"]'),
  managerValue: document.querySelector('[data-stat="manager-value"]'),
};
const chartBars = [...document.querySelectorAll("[data-chart-bar]")];

let currentLanguage = localStorage.getItem("mirobit-language") || "en";

const translations = {
  "Home": "হোম",
  "Solutions": "সল্যুশন",
  "Industries": "ইন্ডাস্ট্রি",
  "Demo": "ডেমো",
  "Contact": "যোগাযোগ",
  "WhatsApp": "WhatsApp",
  "Business Automation & Operational Solutions": "বিজনেস অটোমেশন ও অপারেশনাল সল্যুশন",
  "Smart Systems for Modern Businesses": "আধুনিক ব্যবসার জন্য স্মার্ট সিস্টেম",
  "We help Bangladesh SMEs automate operations, manage staff, track performance, and simplify workflows through modern digital solutions.": "আমরা বাংলাদেশের SME ব্যবসাকে অপারেশন অটোমেট করতে, স্টাফ ম্যানেজ করতে, পারফরম্যান্স ট্র্যাক করতে এবং দৈনন্দিন কাজের প্রক্রিয়া সহজ করতে আধুনিক ডিজিটাল সল্যুশন দিই।",
  "Book Consultation": "কনসালটেশন বুক করুন",
  "View Solutions": "সল্যুশন দেখুন",
  "Bangladesh SME focused": "বাংলাদেশ SME ফোকাসড",
  "Dashboard led": "ড্যাশবোর্ড-ভিত্তিক",
  "Workflow first": "ওয়ার্কফ্লো আগে",
  "Operations Command": "অপারেশনস কমান্ড",
  "Attendance": "অ্যাটেনডেন্স",
  "Sales Tracked": "সেলস ট্র্যাকড",
  "Follow-ups": "ফলো-আপ",
  "Live": "লাইভ",
  "Today": "আজ",
  "Lead captured": "লিড ক্যাপচার হয়েছে",
  "Facebook form synced": "Facebook ফর্ম সিঙ্ক হয়েছে",
  "Auto assigned": "অটো অ্যাসাইন হয়েছে",
  "Sales team notified": "সেলস টিমকে জানানো হয়েছে",
  "Manager view": "ম্যানেজার ভিউ",
  "Real-time status updated": "রিয়েল-টাইম স্ট্যাটাস আপডেটেড",
  "Business problems we solve": "যে ব্যবসায়িক সমস্যা আমরা সমাধান করি",
  "From daily manual work to visible, controlled operations for Bangladesh SMEs.": "দৈনন্দিন ম্যানুয়াল কাজ থেকে বাংলাদেশের SME ব্যবসার জন্য পরিষ্কার, নিয়ন্ত্রিত অপারেশন।",
  "Manual reporting": "ম্যানুয়াল রিপোর্টিং",
  "Reports take hours to prepare and still miss important operational details.": "রিপোর্ট বানাতে ঘণ্টা লাগে, তবুও গুরুত্বপূর্ণ অপারেশনাল তথ্য বাদ পড়ে যায়।",
  "Excel chaos": "Excel বিশৃঙ্খলা",
  "Multiple sheets, duplicate entries, and outdated files make decisions slower.": "অনেক শিট, ডুপ্লিকেট এন্ট্রি এবং পুরোনো ফাইল সিদ্ধান্ত নেওয়া ধীর করে দেয়।",
  "Staff mismanagement": "স্টাফ ম্যানেজমেন্ট সমস্যা",
  "Attendance, performance, and accountability are hard to track consistently.": "অ্যাটেনডেন্স, পারফরম্যান্স এবং জবাবদিহি নিয়মিত ট্র্যাক করা কঠিন হয়।",
  "No real-time business visibility": "রিয়েল-টাইম ব্যবসার ভিজিবিলিটি নেই",
  "Owners and managers cannot quickly see what is happening across the business.": "মালিক ও ম্যানেজার দ্রুত বুঝতে পারেন না ব্যবসার কোথায় কী হচ্ছে।",
  "Inventory confusion": "ইনভেন্টরি বিভ্রান্তি",
  "Stock movement, sales, returns, and purchase decisions become unclear.": "স্টক মুভমেন্ট, সেলস, রিটার্ন এবং পারচেজ সিদ্ধান্ত অস্পষ্ট হয়ে যায়।",
  "Missed customer follow-ups": "কাস্টমার ফলো-আপ মিস হওয়া",
  "Leads and customers get lost when reminders and assignments are manual.": "রিমাইন্ডার ও অ্যাসাইনমেন্ট ম্যানুয়াল হলে লিড ও কাস্টমার সহজেই হারিয়ে যায়।",
  "Operational systems designed for how Bangladesh businesses actually work.": "বাংলাদেশের ব্যবসা বাস্তবে যেভাবে চলে, সেভাবেই ডিজাইন করা অপারেশনাল সিস্টেম।",
  "Staff Attendance & KPI Systems": "স্টাফ অ্যাটেনডেন্স ও KPI সিস্টেম",
  "Track presence, daily tasks, team performance, and manager approvals from one structured system.": "একটি স্ট্রাকচার্ড সিস্টেমে উপস্থিতি, দৈনিক কাজ, টিম পারফরম্যান্স এবং ম্যানেজার অনুমোদন ট্র্যাক করুন।",
  "Business Dashboards & Reports": "বিজনেস ড্যাশবোর্ড ও রিপোর্ট",
  "Turn sales, operations, staff, dealer, distributor, and inventory data into clear dashboards for faster decisions.": "সেলস, অপারেশন, স্টাফ, ডিলার, ডিস্ট্রিবিউটর এবং ইনভেন্টরি ডেটাকে দ্রুত সিদ্ধান্তের জন্য পরিষ্কার ড্যাশবোর্ডে আনুন।",
  "Inventory & Sales Tracking": "ইনভেন্টরি ও সেলস ট্র্যাকিং",
  "Monitor stock, sales, returns, low-stock alerts, and location-wise movement with reliable records.": "বিশ্বস্ত রেকর্ড দিয়ে স্টক, সেলস, রিটার্ন, লো-স্টক অ্যালার্ট এবং লোকেশনভিত্তিক মুভমেন্ট মনিটর করুন।",
  "WhatsApp/Facebook Lead Automation": "WhatsApp/Facebook লিড অটোমেশন",
  "Capture leads, assign owners, send alerts, and maintain follow-up pipelines without manual chasing.": "ম্যানুয়াল ফলো-আপ ছাড়াই লিড ক্যাপচার, অ্যাসাইন, অ্যালার্ট এবং ফলো-আপ পাইপলাইন পরিচালনা করুন।",
  "AI Workflow Automation": "AI ওয়ার্কফ্লো অটোমেশন",
  "Use practical AI assistance for summaries, task routing, customer response drafts, and recurring operations.": "সামারি, টাস্ক রাউটিং, কাস্টমার রেসপন্স ড্রাফট এবং নিয়মিত কাজের জন্য ব্যবহারিক AI সহায়তা নিন।",
  "Custom Operational Systems": "কাস্টম অপারেশনাল সিস্টেম",
  "Build role-based systems that match your business process instead of forcing your team into generic tools.": "জেনেরিক টুলে টিমকে মানিয়ে নেওয়ার বদলে আপনার ব্যবসার প্রক্রিয়া অনুযায়ী রোল-ভিত্তিক সিস্টেম তৈরি করুন।",
  "Built for Bangladesh teams that need control, visibility, and repeatable workflows.": "যেসব বাংলাদেশি টিমের কন্ট্রোল, ভিজিবিলিটি এবং রিপিটেবল ওয়ার্কফ্লো দরকার, তাদের জন্য তৈরি।",
  "Restaurants": "রেস্টুরেন্ট",
  "Distributors & Dealers": "ডিস্ট্রিবিউটর ও ডিলার",
  "Offices & Agencies": "অফিস ও এজেন্সি",
  "Warehouses": "ওয়্যারহাউস",
  "Clinics": "ক্লিনিক",
  "E-commerce Businesses": "ই-কমার্স ব্যবসা",
  "Demo systems": "ডেমো সিস্টেম",
  "Preview the type of systems MIROBIT can tailor for your operation.": "আপনার অপারেশনের জন্য MIROBIT কী ধরনের সিস্টেম কাস্টমাইজ করতে পারে তার প্রিভিউ দেখুন।",
  "Staff Management Dashboard": "স্টাফ ম্যানেজমেন্ট ড্যাশবোর্ড",
  "Attendance, KPIs, tasks, approvals, and manager summaries in a single operational view.": "অ্যাটেনডেন্স, KPI, টাস্ক, অনুমোদন এবং ম্যানেজার সামারি এক অপারেশনাল ভিউতে।",
  "Request Demo": "ডেমো চাইুন",
  "Restaurant Sales & Inventory Dashboard": "রেস্টুরেন্ট সেলস ও ইনভেন্টরি ড্যাশবোর্ড",
  "Daily sales, item performance, stock movement, purchase alerts, and branch-level reports.": "দৈনিক সেলস, আইটেম পারফরম্যান্স, স্টক মুভমেন্ট, পারচেজ অ্যালার্ট এবং ব্রাঞ্চভিত্তিক রিপোর্ট।",
  "Lead Automation Workflow": "লিড অটোমেশন ওয়ার্কফ্লো",
  "Lead capture, assignment, follow-up reminders, status tracking, and team accountability.": "লিড ক্যাপচার, অ্যাসাইনমেন্ট, ফলো-আপ রিমাইন্ডার, স্ট্যাটাস ট্র্যাকিং এবং টিম জবাবদিহি।",
  "Why MIROBIT": "কেন MIROBIT",
  "Practical automation for real business operations.": "বাস্তব ব্যবসায়িক অপারেশনের জন্য ব্যবহারিক অটোমেশন।",
  "Practical business experience": "বাস্তব ব্যবসার অভিজ্ঞতা",
  "Solutions are shaped around daily operator, manager, and owner needs.": "অপারেটর, ম্যানেজার এবং মালিকের দৈনন্দিন প্রয়োজন অনুযায়ী সল্যুশন তৈরি হয়।",
  "Automation-first approach": "অটোমেশন-ফার্স্ট পদ্ধতি",
  "We remove repeated manual work before adding more screens.": "আরও স্ক্রিন যোগ করার আগে আমরা বারবার করা ম্যানুয়াল কাজ কমাই।",
  "Affordable for SMEs": "SME ব্যবসার জন্য সাশ্রয়ী",
  "Systems can start focused and grow as the business expands.": "সিস্টেম ছোট ও ফোকাসডভাবে শুরু হয়ে ব্যবসা বড় হলে স্কেল করতে পারে।",
  "Bangladesh business understanding": "বাংলাদেশি ব্যবসার বাস্তবতা বোঝা",
  "Workflows consider local sales, staff, reporting, and communication habits.": "ওয়ার্কফ্লোতে স্থানীয় সেলস, স্টাফ, রিপোর্টিং এবং কমিউনিকেশন অভ্যাস বিবেচনা করা হয়।",
  "Scalable systems": "স্কেলযোগ্য সিস্টেম",
  "Role access, dashboards, and data structures are planned for growth.": "রোল অ্যাক্সেস, ড্যাশবোর্ড এবং ডেটা স্ট্রাকচার গ্রোথ মাথায় রেখে পরিকল্পনা করা হয়।",
  "Operational efficiency focus": "অপারেশনাল দক্ষতায় ফোকাস",
  "Every feature is tied to faster work, better tracking, or clearer decisions.": "প্রতিটি ফিচার দ্রুত কাজ, ভালো ট্র্যাকিং বা পরিষ্কার সিদ্ধান্তের সঙ্গে যুক্ত।",
  "Process": "প্রক্রিয়া",
  "A clear path from business problem to working system.": "ব্যবসার সমস্যা থেকে কার্যকর সিস্টেমে যাওয়ার পরিষ্কার পথ।",
  "Understand Business": "ব্যবসা বোঝা",
  "We learn your teams, reports, tools, bottlenecks, and decision points.": "আমরা আপনার টিম, রিপোর্ট, টুল, বাধা এবং সিদ্ধান্তের জায়গাগুলো বুঝি।",
  "Map Workflow": "ওয়ার্কফ্লো ম্যাপ করা",
  "We define roles, data flow, approvals, automation points, and dashboard needs.": "রোল, ডেটা ফ্লো, অনুমোদন, অটোমেশন পয়েন্ট এবং ড্যাশবোর্ড প্রয়োজন নির্ধারণ করি।",
  "Build System": "সিস্টেম তৈরি",
  "We create a practical solution focused on adoption and measurable outcomes.": "ব্যবহারযোগ্যতা এবং মাপা যায় এমন ফলাফলের দিকে ফোকাস করে বাস্তব সল্যুশন তৈরি করি।",
  "Train Team": "টিম ট্রেইনিং",
  "We help staff and managers use the system confidently from day one.": "প্রথম দিন থেকেই স্টাফ ও ম্যানেজার যেন আত্মবিশ্বাসের সঙ্গে সিস্টেম ব্যবহার করতে পারে, সে সহায়তা করি।",
  "Support & Improve": "সাপোর্ট ও উন্নয়ন",
  "We refine workflows as your business grows and new needs appear.": "ব্যবসা বড় হলে এবং নতুন প্রয়োজন এলে আমরা ওয়ার্কফ্লো উন্নত করি।",
  "Ready to modernize your operations?": "আপনার অপারেশন আধুনিক করতে প্রস্তুত?",
  "Share your current process and we will help identify where automation, dashboards, and workflow systems can create immediate value.": "আপনার বর্তমান প্রক্রিয়া জানালে আমরা দেখিয়ে দেব কোথায় অটোমেশন, ড্যাশবোর্ড ও ওয়ার্কফ্লো সিস্টেম দ্রুত ভ্যালু তৈরি করতে পারে।",
  "Free initial consultation available.": "প্রথম কনসালটেশন ফ্রি।",
  "Chat on WhatsApp": "WhatsApp-এ কথা বলুন",
  "Email": "ইমেইল",
  "Office": "অফিস",
  "Dhaka, Bangladesh": "ঢাকা, বাংলাদেশ",
  "Full name": "পূর্ণ নাম",
  "Business name": "ব্যবসার নাম",
  "Phone or WhatsApp": "ফোন বা WhatsApp",
  "What do you want to improve?": "আপনি কী উন্নত করতে চান?",
  "Submit Request": "রিকোয়েস্ট পাঠান",
  "Your name": "আপনার নাম",
  "Company or shop name": "কোম্পানি বা দোকানের নাম",
  "Staff, inventory, sales, dashboard, lead follow-up...": "স্টাফ, ইনভেন্টরি, সেলস, ড্যাশবোর্ড, লিড ফলো-আপ...",
  "LinkedIn": "LinkedIn",
  "Facebook": "Facebook",
  "YouTube": "YouTube",
  "MIROBIT. All rights reserved.": "MIROBIT. সর্বস্বত্ব সংরক্ষিত।",
};

if (year) {
  year.textContent = new Date().getFullYear();
}

const translated = (value) => {
  if (currentLanguage !== "bn") return value;
  return translations[value] || value;
};

const setLocalizedText = (element, englishValue) => {
  if (!element || englishValue == null) return;
  const value = String(englishValue);
  element.dataset.originalText = value;
  element.textContent = translated(value);
  if (element.firstChild?.nodeType === Node.TEXT_NODE) {
    element.firstChild.originalText = value;
  }
};

const formatPercentMetric = (value, fractionDigits = 0) => {
  if (typeof value !== "number") return value;
  const normalized = value > 0 && value <= 1 ? value * 100 : value;
  return `${normalized.toFixed(fractionDigits)}%`;
};

const formatMetric = (value) => {
  if (value == null) return value;
  return typeof value === "number" ? String(value) : value;
};

const applyLanguage = (language) => {
  currentLanguage = language === "bn" ? "bn" : "en";
  localStorage.setItem("mirobit-language", currentLanguage);
  document.documentElement.lang = currentLanguage === "bn" ? "bn" : "en";
  document.body.classList.toggle("is-bangla", currentLanguage === "bn");

  document.querySelectorAll("[data-lang-option]").forEach((option) => {
    option.classList.toggle("is-active", option.dataset.langOption === currentLanguage);
  });

  document.querySelectorAll("body *:not(script):not(style)").forEach((element) => {
    element.childNodes.forEach((node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const trimmed = node.textContent.trim();
      if (!trimmed || trimmed === "MIROBIT") return;
      node.originalText ||= trimmed;
      const replacement = translated(node.originalText);
      node.textContent = node.textContent.replace(trimmed, replacement);
    });

    if ("placeholder" in element && element.placeholder) {
      element.dataset.originalPlaceholder ||= element.placeholder;
      element.placeholder = translated(element.dataset.originalPlaceholder);
    }
  });

  const metaDescription = document.querySelector('meta[name="description"]:not([lang])');
  if (metaDescription) {
    metaDescription.content = currentLanguage === "bn"
      ? document.querySelector('meta[name="description"][lang="bn"]')?.content || metaDescription.content
      : "MIROBIT helps Bangladesh SMEs automate operations, manage staff, track performance, improve inventory tracking, and simplify workflows with modern business dashboards.";
  }
};

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

languageToggle?.addEventListener("click", () => {
  applyLanguage(currentLanguage === "en" ? "bn" : "en");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const renderStats = (stats) => {
  setLocalizedText(statTargets.attendanceValue, formatPercentMetric(stats?.attendance?.value) || statTargets.attendanceValue?.dataset.originalText || "94%");
  setLocalizedText(statTargets.attendanceLabel, formatPercentMetric(stats?.attendance?.label, 2) || statTargets.attendanceLabel?.dataset.originalText || "+8.4%");
  setLocalizedText(statTargets.salesValue, stats?.sales?.value || statTargets.salesValue?.dataset.originalText || "৳8.6L");
  setLocalizedText(statTargets.salesLabel, stats?.sales?.label || statTargets.salesLabel?.dataset.originalText || "Live");
  setLocalizedText(statTargets.followupsValue, formatMetric(stats?.followups?.value) || statTargets.followupsValue?.dataset.originalText || "128");
  setLocalizedText(statTargets.followupsLabel, stats?.followups?.label || statTargets.followupsLabel?.dataset.originalText || "Today");
  setLocalizedText(statTargets.leadTitle, stats?.lead_status?.title || statTargets.leadTitle?.dataset.originalText || "Lead captured");
  setLocalizedText(statTargets.leadValue, stats?.lead_status?.value || statTargets.leadValue?.dataset.originalText || "Facebook form synced");
  setLocalizedText(statTargets.assignmentTitle, stats?.assignment_status?.title || statTargets.assignmentTitle?.dataset.originalText || "Auto assigned");
  setLocalizedText(statTargets.assignmentValue, stats?.assignment_status?.value || statTargets.assignmentValue?.dataset.originalText || "Sales team notified");
  setLocalizedText(statTargets.managerTitle, stats?.manager_status?.title || statTargets.managerTitle?.dataset.originalText || "Manager view");
  setLocalizedText(statTargets.managerValue, stats?.manager_status?.value || statTargets.managerValue?.dataset.originalText || "Real-time status updated");

  if (Array.isArray(stats?.chart)) {
    stats.chart.slice(0, chartBars.length).forEach((value, index) => {
      const safeValue = Math.max(8, Math.min(100, Number(value) || 0));
      chartBars[index].style.height = `${safeValue}%`;
    });
  }
};

const loadStats = async () => {
  try {
    const response = await fetch(STATS_API_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`Stats API returned ${response.status}`);
    const stats = await response.json();
    renderStats(stats);
  } catch (error) {
    console.warn("MIROBIT stats API unavailable; keeping demo dashboard values.", error);
  }
};

applyLanguage(currentLanguage);
loadStats();
