const STATS_API_URL = "https://script.google.com/macros/s/AKfycbys5TdJTlSbQ7JI7hBmWVgebQvcWlos5uIk7X2X__PrKxD8eacIvk1nwZ7mv9eFbDua/exec";
const WHATSAPP_NUMBER = "8801XXXXXXXXX";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const languageToggle = document.querySelector("[data-language-toggle]");
const popup = document.querySelector("[data-whatsapp-popup]");
const popupClose = document.querySelector("[data-popup-close]");
const popupLater = document.querySelector("[data-popup-later]");
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
  "Contact Us": "যোগাযোগ করুন",
  "WhatsApp": "WhatsApp",
  "Business Automation & Operational Solutions": "ব্যবসা অটোমেশন ও পরিচালনা সল্যুশন",
  "Smart Systems for Modern Businesses": "আধুনিক ব্যবসার জন্য স্মার্ট সিস্টেম",
  "We help Bangladesh SMEs automate operations, manage staff, track performance, and simplify workflows through modern digital solutions.": "আমরা বাংলাদেশের ছোট ও মাঝারি ব্যবসাকে কাজ অটোমেট করতে, স্টাফ পরিচালনা করতে, পারফরম্যান্স দেখতে এবং দৈনন্দিন কাজ সহজ করতে আধুনিক ডিজিটাল সল্যুশন দিই।",
  "Book Consultation": "পরামর্শ বুক করুন",
  "View Solutions": "সল্যুশন দেখুন",
  "Built for Bangladesh SMEs": "বাংলাদেশের ছোট ও মাঝারি ব্যবসার জন্য",
  "Affordable automation": "সাশ্রয়ী অটোমেশন",
  "Dashboard-first systems": "ড্যাশবোর্ড ভিত্তিক সিস্টেম",
  "Operations Command": "অপারেশন কন্ট্রোল",
  "Live sync": "লাইভ সিঙ্ক",
  "Connected": "সংযুক্ত",
  "Auto update": "স্বয়ংক্রিয় আপডেট",
  "Attendance": "হাজিরা",
  "Sales Tracked": "বিক্রয় ট্র্যাকিং",
  "Follow-ups": "ফলোআপ",
  "Live": "লাইভ",
  "Today": "আজ",
  "Weekly operations": "সাপ্তাহিক কার্যক্রম",
  "Performance": "পারফরম্যান্স",
  "Lead captured": "গ্রাহকের তথ্য সংগ্রহ",
  "Facebook form synced": "Facebook ফর্ম সিঙ্ক হয়েছে",
  "Auto assigned": "স্বয়ংক্রিয়ভাবে দায়িত্ব দেওয়া হয়েছে",
  "Sales team notified": "বিক্রয় টিমকে জানানো হয়েছে",
  "Manager view": "ম্যানেজার ভিউ",
  "Real-time status updated": "রিয়েল-টাইম অবস্থা আপডেট হয়েছে",
  "Business problems we solve": "যে ব্যবসায়িক সমস্যা আমরা সমাধান করি",
  "From daily manual work to visible, controlled operations for Bangladesh SMEs.": "দৈনন্দিন ম্যানুয়াল কাজ থেকে বাংলাদেশের ছোট ও মাঝারি ব্যবসার জন্য পরিষ্কার, নিয়ন্ত্রিত পরিচালনা।",
  "Manual reporting": "ম্যানুয়াল রিপোর্টিং",
  "Reports take hours to prepare and still miss important operational details.": "রিপোর্ট বানাতে ঘণ্টা লাগে, তবুও গুরুত্বপূর্ণ পরিচালনাগত তথ্য বাদ পড়ে যায়।",
  "Excel chaos": "Excel ফাইলের বিশৃঙ্খলা",
  "Multiple sheets, duplicate entries, and outdated files make decisions slower.": "অনেক শিট, ডুপ্লিকেট এন্ট্রি এবং পুরোনো ফাইল সিদ্ধান্ত নেওয়া ধীর করে দেয়।",
  "Staff mismanagement": "স্টাফ পরিচালনায় সমস্যা",
  "Attendance, performance, and accountability are hard to track consistently.": "হাজিরা, কাজের মান এবং জবাবদিহি নিয়মিত দেখা কঠিন হয়।",
  "No real-time business visibility": "রিয়েল-টাইম ব্যবসার চিত্র দেখা যায় না",
  "Owners and managers cannot quickly see what is happening across the business.": "মালিক ও ম্যানেজার দ্রুত বুঝতে পারেন না ব্যবসার কোথায় কী হচ্ছে।",
  "Inventory confusion": "ইনভেন্টরি বিভ্রান্তি",
  "Stock movement, sales, returns, and purchase decisions become unclear.": "স্টক চলাচল, বিক্রয়, রিটার্ন এবং কেনার সিদ্ধান্ত অস্পষ্ট হয়ে যায়।",
  "Missed customer follow-ups": "কাস্টমার ফলোআপ মিস হওয়া",
  "Leads and customers get lost when reminders and assignments are manual.": "রিমাইন্ডার ও দায়িত্ব দেওয়া ম্যানুয়াল হলে গ্রাহকের তথ্য ও ফলোআপ হারিয়ে যায়।",
  "Operational systems designed for how Bangladesh businesses actually work.": "বাংলাদেশের ব্যবসা বাস্তবে যেভাবে চলে, সেভাবেই ডিজাইন করা পরিচালনা সিস্টেম।",
  "Staff Attendance & KPI Systems": "স্টাফ হাজিরা ও KPI সিস্টেম",
  "Track presence, daily tasks, team performance, and manager approvals from one structured system.": "একটি সাজানো সিস্টেমে হাজিরা, দৈনিক কাজ, টিমের পারফরম্যান্স এবং ম্যানেজারের অনুমোদন দেখুন।",
  "Business Dashboards & Reports": "ব্যবসা ড্যাশবোর্ড ও রিপোর্ট",
  "Turn sales, operations, staff, dealer, distributor, and inventory data into clear dashboards for faster decisions.": "বিক্রয়, পরিচালনা, স্টাফ, ডিলার, ডিস্ট্রিবিউটর এবং ইনভেন্টরি তথ্যকে দ্রুত সিদ্ধান্তের জন্য পরিষ্কার ড্যাশবোর্ডে আনুন।",
  "Inventory & Sales Tracking": "ইনভেন্টরি ও বিক্রয় ট্র্যাকিং",
  "Monitor stock, sales, returns, low-stock alerts, and location-wise movement with reliable records.": "বিশ্বস্ত রেকর্ড দিয়ে স্টক, বিক্রয়, রিটার্ন, কম-স্টক অ্যালার্ট এবং লোকেশনভিত্তিক চলাচল দেখুন।",
  "WhatsApp/Facebook Lead Automation": "WhatsApp/Facebook গ্রাহক তথ্য অটোমেশন",
  "Capture leads, assign owners, send alerts, and maintain follow-up pipelines without manual chasing.": "ম্যানুয়াল চাপ ছাড়াই গ্রাহকের তথ্য সংগ্রহ, দায়িত্ব দেওয়া, অ্যালার্ট পাঠানো এবং ফলোআপ চালু রাখুন।",
  "AI Workflow Automation": "AI কাজের প্রক্রিয়া অটোমেশন",
  "Use practical AI assistance for summaries, task routing, customer response drafts, and recurring operations.": "সারাংশ, কাজ ভাগ করা, কাস্টমার রিপ্লাই খসড়া এবং নিয়মিত কাজের জন্য ব্যবহারিক AI সহায়তা নিন।",
  "Custom Operational Systems": "কাস্টম পরিচালনা সিস্টেম",
  "Build role-based systems that match your business process instead of forcing your team into generic tools.": "সাধারণ টুলে টিমকে মানিয়ে নেওয়ার বদলে আপনার ব্যবসার প্রক্রিয়া অনুযায়ী রোল-ভিত্তিক সিস্টেম তৈরি করুন।",
  "Built for Bangladesh teams that need control, visibility, and repeatable workflows.": "যেসব বাংলাদেশি টিমের নিয়ন্ত্রণ, পরিষ্কার ভিজিবিলিটি এবং পুনরাবৃত্ত কাজের প্রক্রিয়া দরকার, তাদের জন্য তৈরি।",
  "Restaurants": "রেস্টুরেন্ট",
  "Distributors & Dealers": "ডিস্ট্রিবিউটর ও ডিলার",
  "Offices & Agencies": "অফিস ও এজেন্সি",
  "Warehouses": "গুদাম",
  "Clinics": "ক্লিনিক",
  "E-commerce Businesses": "ই-কমার্স ব্যবসা",
  "Demo systems": "ডেমো সিস্টেম",
  "Preview the type of systems MIROBIT can tailor for your operation.": "আপনার পরিচালনার জন্য MIROBIT কী ধরনের সিস্টেম সাজিয়ে দিতে পারে তার প্রিভিউ দেখুন।",
  "Staff Management Dashboard": "স্টাফ পরিচালনা ড্যাশবোর্ড",
  "Attendance, KPIs, tasks, approvals, and manager summaries in a single operational view.": "হাজিরা, KPI, কাজ, অনুমোদন এবং ম্যানেজার সারাংশ এক জায়গায় দেখুন।",
  "Request Demo": "ডেমো চাই",
  "Restaurant Sales & Inventory Dashboard": "রেস্টুরেন্ট বিক্রয় ও ইনভেন্টরি ড্যাশবোর্ড",
  "Daily sales, item performance, stock movement, purchase alerts, and branch-level reports.": "দৈনিক বিক্রয়, আইটেম পারফরম্যান্স, স্টক চলাচল, কেনার অ্যালার্ট এবং ব্রাঞ্চভিত্তিক রিপোর্ট।",
  "Lead Automation Workflow": "গ্রাহক ফলোআপ অটোমেশন",
  "Lead capture, assignment, follow-up reminders, status tracking, and team accountability.": "গ্রাহকের তথ্য সংগ্রহ, দায়িত্ব দেওয়া, ফলোআপ রিমাইন্ডার, অবস্থা দেখা এবং টিমের জবাবদিহি।",
  "Why MIROBIT": "কেন MIROBIT",
  "Practical automation for real business operations.": "বাস্তব ব্যবসা পরিচালনার জন্য ব্যবহারিক অটোমেশন।",
  "Practical business experience": "বাস্তব ব্যবসার অভিজ্ঞতা",
  "Solutions are shaped around daily operator, manager, and owner needs.": "অপারেটর, ম্যানেজার এবং মালিকের দৈনন্দিন প্রয়োজন অনুযায়ী সল্যুশন তৈরি হয়।",
  "Automation-first approach": "অটোমেশন-প্রথম পদ্ধতি",
  "We remove repeated manual work before adding more screens.": "আরও স্ক্রিন যোগ করার আগে আমরা বারবার করা ম্যানুয়াল কাজ কমাই।",
  "Affordable for SMEs": "ছোট ও মাঝারি ব্যবসার জন্য সাশ্রয়ী",
  "Systems can start focused and grow as the business expands.": "সিস্টেম ছোটভাবে শুরু হয়ে ব্যবসা বড় হলে ধাপে ধাপে বাড়তে পারে।",
  "Bangladesh business understanding": "বাংলাদেশি ব্যবসার বাস্তবতা বোঝা",
  "Workflows consider local sales, staff, reporting, and communication habits.": "কাজের প্রক্রিয়ায় স্থানীয় বিক্রয়, স্টাফ, রিপোর্টিং এবং যোগাযোগের অভ্যাস বিবেচনা করা হয়।",
  "Scalable systems": "বড় করার মতো সিস্টেম",
  "Role access, dashboards, and data structures are planned for growth.": "রোল অ্যাক্সেস, ড্যাশবোর্ড এবং ডেটা কাঠামো গ্রোথ মাথায় রেখে পরিকল্পনা করা হয়।",
  "Operational efficiency focus": "পরিচালনাগত দক্ষতায় ফোকাস",
  "Every feature is tied to faster work, better tracking, or clearer decisions.": "প্রতিটি ফিচার দ্রুত কাজ, ভালো ট্র্যাকিং বা পরিষ্কার সিদ্ধান্তের সঙ্গে যুক্ত।",
  "Process": "প্রক্রিয়া",
  "A clear path from business problem to working system.": "ব্যবসার সমস্যা থেকে কার্যকর সিস্টেমে যাওয়ার পরিষ্কার পথ।",
  "Understand Business": "ব্যবসা বোঝা",
  "We learn your teams, reports, tools, bottlenecks, and decision points.": "আমরা আপনার টিম, রিপোর্ট, টুল, বাধা এবং সিদ্ধান্তের জায়গাগুলো বুঝি।",
  "Map Workflow": "কাজের প্রক্রিয়া ম্যাপ করা",
  "We define roles, data flow, approvals, automation points, and dashboard needs.": "রোল, ডেটা প্রবাহ, অনুমোদন, অটোমেশনের জায়গা এবং ড্যাশবোর্ড প্রয়োজন নির্ধারণ করি।",
  "Build System": "সিস্টেম তৈরি",
  "We create a practical solution focused on adoption and measurable outcomes.": "ব্যবহারযোগ্যতা এবং মাপা যায় এমন ফলাফলের দিকে ফোকাস করে বাস্তব সল্যুশন তৈরি করি।",
  "Train Team": "টিম ট্রেইনিং",
  "We help staff and managers use the system confidently from day one.": "প্রথম দিন থেকেই স্টাফ ও ম্যানেজার যেন আত্মবিশ্বাসের সঙ্গে সিস্টেম ব্যবহার করতে পারে, সে সহায়তা করি।",
  "Support & Improve": "সাপোর্ট ও উন্নয়ন",
  "We refine workflows as your business grows and new needs appear.": "ব্যবসা বড় হলে এবং নতুন প্রয়োজন এলে আমরা কাজের প্রক্রিয়া উন্নত করি।",
  "Ready to modernize your operations?": "আপনার পরিচালনা আধুনিক করতে প্রস্তুত?",
  "Share your current process and we will help identify where automation, dashboards, and workflow systems can create immediate value.": "আপনার বর্তমান প্রক্রিয়া জানালে আমরা দেখিয়ে দেব কোথায় অটোমেশন, ড্যাশবোর্ড ও কাজের সিস্টেম দ্রুত ভ্যালু তৈরি করতে পারে।",
  "Free Consultation Available": "ফ্রি পরামর্শ পাওয়া যাবে",
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
  "Staff, inventory, sales, dashboard, customer follow-up...": "স্টাফ, ইনভেন্টরি, বিক্রয়, ড্যাশবোর্ড, কাস্টমার ফলোআপ...",
  "LinkedIn": "LinkedIn",
  "Facebook": "Facebook",
  "YouTube": "YouTube",
  "MIROBIT. All rights reserved.": "MIROBIT. সর্বস্বত্ব সংরক্ষিত।",
  "Need help automating your business?": "ব্যবসার কাজ অটোমেটেড করতে চান?",
  "Get a free initial consultation for staff management, reports, dashboards, inventory, and follow-up automation.": "স্টাফ ম্যানেজমেন্ট, রিপোর্ট, ড্যাশবোর্ড, ইনভেন্টরি ও ফলোআপ অটোমেশনের জন্য ফ্রি প্রাথমিক পরামর্শ নিন।",
  "Maybe later": "পরে দেখব",
  "01": "০১",
  "02": "০২",
  "03": "০৩",
  "04": "০৪",
  "05": "০৫",
  "06": "০৬"
};


Object.assign(translations, {
  "Smart Systems for Modern Businesses": "বাংলাদেশি ব্যবসার জন্য স্মার্ট অটোমেশন",
  "We help Bangladesh businesses automate operations, manage staff, track performance, and simplify workflows through modern digital solutions.": "স্টাফ ম্যানেজমেন্ট, বিক্রয় রিপোর্ট, ইনভেন্টরি, ফলোআপ ও ড্যাশবোর্ড—সবকিছু সহজভাবে পরিচালনার জন্য MIROBIT তৈরি করে বাস্তবভিত্তিক ডিজিটাল সিস্টেম।",
  "Book Consultation": "পরামর্শ নিন",
  "Affordable Automation": "সাশ্রয়ী অটোমেশন",
  "Dashboard-first Systems": "ড্যাশবোর্ড ভিত্তিক সিস্টেম",
  "Free Initial Consultation": "ফ্রি প্রাথমিক পরামর্শ",
  "Operations Command": "অপারেশন ড্যাশবোর্ড",
  "Sales Tracked": "বিক্রয়",
  "Auto assigned": "দায়িত্ব দেওয়া হয়েছে",
  "From manual work to controlled operations.": "যে সমস্যাগুলো আমরা সমাধান করি",
  "MIROBIT solutions for your business.": "আপনার ব্যবসার জন্য MIROBIT সল্যুশন",
  "Built for practical Bangladesh businesses.": "যেসব ব্যবসার জন্য উপযোগী",
  "See how a MIROBIT system can work.": "ডেমো সিস্টেম",
  "Why choose MIROBIT?": "কেন MIROBIT?",
  "A simple working process.": "কাজ করার সহজ প্রক্রিয়া",
  "Bangladesh automation": "বাংলাদেশে অটোমেশন",
  "Business Automation Solutions in Bangladesh": "বাংলাদেশে ব্যবসা অটোমেশন সল্যুশন",
  "MIROBIT helps restaurants, dealers, distributors, offices, warehouses, clinics, and e-commerce businesses in Bangladesh replace manual work with dashboards, staff systems, inventory tracking, reporting tools, and workflow automation.": "MIROBIT বাংলাদেশের রেস্টুরেন্ট, ডিলার, ডিস্ট্রিবিউটর, অফিস, ওয়্যারহাউস, ক্লিনিক ও ই-কমার্স ব্যবসার জন্য ড্যাশবোর্ড, স্টাফ সিস্টেম, ইনভেন্টরি ট্র্যাকিং, রিপোর্টিং টুলস এবং কাজের অটোমেশন তৈরি করে।",
  "Ready to modernize your operations?": "কথা বলুন আমাদের সাথে",
  "Staff Attendance & KPI System": "স্টাফ হাজিরা ও KPI সিস্টেম",
  "Business Dashboard & Reports": "ব্যবসা ড্যাশবোর্ড ও রিপোর্ট",
  "WhatsApp & Facebook Follow-up Automation": "WhatsApp ও Facebook ফলোআপ অটোমেশন",
  "Capture customer information, assign owners, send alerts, and maintain follow-up pipelines without manual chasing.": "গ্রাহকের তথ্য সংগ্রহ, দায়িত্ব দেওয়া, অ্যালার্ট ও ফলোআপ সহজে পরিচালনা করুন।",
  "Staff": "হাজিরা",
  "Reports": "রিপোর্ট",
  "Stock": "স্টক",
  "Follow": "ফলোআপ",
  "System": "সিস্টেম",
  "Quick Links": "দ্রুত লিংক",
  "Social": "সোশ্যাল",
  "Modern automation, dashboard, reporting, and workflow systems for Bangladesh SMEs.": "বাংলাদেশের SME ব্যবসার জন্য অটোমেশন, ড্যাশবোর্ড, রিপোর্টিং ও কাজের সিস্টেম।",
  "All rights reserved.": "সর্বস্বত্ব সংরক্ষিত।"
});

Object.assign(translations, {
  "Packages": "প্যাকেজ",
  "Website Design & Digital Presence": "ওয়েবসাইট ডিজাইন ও ডিজিটাল উপস্থিতি",
  "We design clean, mobile-friendly business websites based on customer needs, budget, and future growth plans.": "গ্রাহকের প্রয়োজন, বাজেট ও ভবিষ্যৎ পরিকল্পনা অনুযায়ী আমরা সুন্দর, মোবাইল-ফ্রেন্ডলি ব্যবসায়িক ওয়েবসাইট তৈরি করি।",
  "Starter Packages for Bangladesh Businesses": "বাংলাদেশি ব্যবসার জন্য শুরু করার প্যাকেজ",
  "Choose a simple starting package, then we customize based on your business process.": "সহজ একটি প্যাকেজ দিয়ে শুরু করুন, তারপর আপনার ব্যবসার প্রক্রিয়া অনুযায়ী আমরা কাস্টমাইজ করি।",
  "Starter Website": "স্টার্টার ওয়েবসাইট",
  "Business Dashboard": "বিজনেস ড্যাশবোর্ড",
  "Staff & Operations System": "স্টাফ ও অপারেশন সিস্টেম",
  "Custom Automation": "কাস্টম অটোমেশন",
  "Starting from:": "শুরু:",
  "৳15,000": "৳১৫,০০০",
  "৳25,000": "৳২৫,০০০",
  "৳35,000": "৳৩৫,০০০",
  "Discuss after consultation": "পরামর্শের পর নির্ধারণ",
  "Best for:": "যাদের জন্য:",
  "Small businesses, restaurants, shops, and personal brands": "ছোট ব্যবসা, রেস্টুরেন্ট, দোকান ও ব্যক্তিগত ব্র্যান্ড",
  "Businesses that need sales, expense, inventory, or daily reporting": "বিক্রয়, খরচ, ইনভেন্টরি বা দৈনিক রিপোর্ট দরকার এমন ব্যবসা",
  "Offices, agencies, warehouses, and growing teams": "অফিস, এজেন্সি, ওয়্যারহাউস ও বড় হতে থাকা টিম",
  "Businesses with unique workflow, follow-up, inventory, or reporting needs": "বিশেষ ধরনের কাজের প্রক্রিয়া, ফলোআপ, ইনভেন্টরি বা রিপোর্টিং প্রয়োজন এমন ব্যবসা",
  "Includes:": "অন্তর্ভুক্ত:",
  "Mobile-friendly website": "মোবাইল-ফ্রেন্ডলি ওয়েবসাইট",
  "Basic SEO setup": "বেসিক SEO সেটআপ",
  "WhatsApp contact button": "WhatsApp যোগাযোগ বাটন",
  "Google Maps/contact section": "Google Maps/যোগাযোগ সেকশন",
  "Google Sheet or database-based dashboard": "Google Sheet বা ডাটাবেস ভিত্তিক ড্যাশবোর্ড",
  "Sales and expense tracking": "বিক্রয় ও খরচ ট্র্যাকিং",
  "Summary reports": "সামারি রিপোর্ট",
  "Basic admin view": "বেসিক অ্যাডমিন ভিউ",
  "Staff attendance tracking": "স্টাফ হাজিরা ট্র্যাকিং",
  "KPI or performance reports": "KPI বা পারফরম্যান্স রিপোর্ট",
  "Role-based admin view": "রোল অনুযায়ী অ্যাডমিন ভিউ",
  "Workflow reminders": "কাজের রিমাইন্ডার",
  "Process analysis": "কাজের প্রক্রিয়া বিশ্লেষণ",
  "Custom workflow system": "কাস্টম ওয়ার্কফ্লো সিস্টেম",
  "WhatsApp/Facebook follow-up support": "WhatsApp/Facebook ফলোআপ সাপোর্ট",
  "Ongoing improvement option": "নিয়মিত উন্নয়নের সুযোগ",
  "Request Consultation": "পরামর্শ নিন",
  "Recommended": "প্রস্তাবিত",
  "Final cost depends on features, workflow complexity, and support needs.": "ফিচার, কাজের জটিলতা ও সাপোর্টের প্রয়োজন অনুযায়ী চূড়ান্ত খরচ নির্ধারিত হবে।",
  "MIROBIT helps restaurants, dealers, distributors, offices, warehouses, clinics, and e-commerce businesses in Bangladesh replace manual work with dashboards, staff systems, inventory tracking, reporting tools, workflow automation, and mobile-friendly business websites.": "MIROBIT বাংলাদেশের রেস্টুরেন্ট, ডিলার, ডিস্ট্রিবিউটর, অফিস, ওয়্যারহাউস, ক্লিনিক ও ই-কমার্স ব্যবসার জন্য ড্যাশবোর্ড, স্টাফ সিস্টেম, ইনভেন্টরি ট্র্যাকিং, রিপোর্টিং টুলস, কাজের অটোমেশন এবং মোবাইল-ফ্রেন্ডলি ব্যবসায়িক ওয়েবসাইট তৈরি করে।"
});

const banglaDigits = { "0": "\u09E6", "1": "\u09E7", "2": "\u09E8", "3": "\u09E9", "4": "\u09EA", "5": "\u09EB", "6": "\u09EC", "7": "\u09ED", "8": "\u09EE", "9": "\u09EF" };
const toBanglaDigits = (value) => String(value).replace(/[0-9]/g, (digit) => banglaDigits[digit] || digit);
const toBanglaNumber = toBanglaDigits;

const formatLocalizedMetric = (value, lang) => {
  if (value == null) return value;
  const metric = String(value);
  if (lang !== "bn") return metric;

  const withBanglaUnit = metric.replace(/L\b/i, " লাখ");
  return toBanglaDigits(withBanglaUnit);
};

const whatsappMessages = {
  en: "Hello MIROBIT, I want to know more about your business automation solutions.",
  bn: "হ্যালো MIROBIT, আপনাদের ব্যবসা অটোমেশন সল্যুশন সম্পর্কে জানতে চাই।",
};

const updateYear = () => {
  if (!year) return;
  const currentYear = new Date().getFullYear();
  year.textContent = currentLanguage === "bn" ? toBanglaNumber(currentYear) : currentYear;
};

updateYear();

const translated = (value) => {
  if (currentLanguage !== "bn") return value;
  return translations[value] || value;
};

// Localization updates visible copy, form placeholders, year formatting, and WhatsApp messages.
const setLocalizedText = (element, englishValue) => {
  if (!element || englishValue == null) return;
  const value = String(englishValue);
  element.dataset.originalText = value;
  element.textContent = formatLocalizedMetric(translated(value), currentLanguage);
  if (element.firstChild?.nodeType === Node.TEXT_NODE) {
    element.firstChild.originalText = value;
  }
};

const syncLocalizedStats = () => {
  document.querySelectorAll("[data-stat]").forEach((element) => {
    const value = element.dataset.originalText || element.textContent.trim();
    if (!value) return;
    element.dataset.originalText = value;
    element.textContent = formatLocalizedMetric(translated(value), currentLanguage);
  });
};

const updateWhatsAppLinks = () => {
  const message = encodeURIComponent(whatsappMessages[currentLanguage]);
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  });
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
      : "MIROBIT provides business automation, staff management systems, dashboards, inventory tracking, reporting tools, workflow automation, and affordable business website design for Bangladesh SMEs.";
  }

  updateYear();
  updateWhatsAppLinks();
  syncLocalizedStats();
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

// Live stats: fetches Google Sheet-backed dashboard values and keeps demo fallbacks on failure.
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

const closePopup = () => {
  if (!popup) return;
  popup.classList.remove("is-visible");
  sessionStorage.setItem("mirobit-popup-shown", "true");
};

const showPopup = () => {
  if (!popup || sessionStorage.getItem("mirobit-popup-shown") === "true") return;
  popup.hidden = false;
  requestAnimationFrame(() => popup.classList.add("is-visible"));
  sessionStorage.setItem("mirobit-popup-shown", "true");
};

const maybeShowPopupOnScroll = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;
  if (window.scrollY / maxScroll >= 0.4) {
    showPopup();
    window.removeEventListener("scroll", maybeShowPopupOnScroll);
  }
};

popupClose?.addEventListener("click", closePopup);
popupLater?.addEventListener("click", closePopup);
window.addEventListener("scroll", maybeShowPopupOnScroll, { passive: true });
window.setTimeout(showPopup, 10000);

applyLanguage(currentLanguage);
loadStats();
