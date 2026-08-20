import { useState } from "react";

// ─── Icons ──────────────────────────────────────────────────────────────────

const Icon = ({ path, size = 24, color = "currentColor", filled = false }: {
  path: string; size?: number; color?: string; filled?: boolean;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"}
    stroke={filled ? "none" : color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const Icons = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  translate: "M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6",
  history: "M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",
  learn: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  mic: "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8",
  camera: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  copy: "M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
  share: "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  swap: "M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4",
  wifi_off: "M1 6C3.91 3.89 7.82 2.5 12 2.5s8.09 1.39 11 3.5M5.46 9.81A10.47 10.47 0 0112 8c2.36 0 4.54.75 6.32 2.01M10.71 12.71A3.99 3.99 0 0112 12c.71 0 1.38.18 1.96.5M12 20h.01M1 1l22 22",
  chevron_right: "M9 18l6-6-6-6",
  check: "M20 6L9 17l-5-5",
  play: "M5 3l14 9-14 9V3z",
  volume: "M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07",
  x: "M18 6L6 18M6 6l12 12",
  arrow_left: "M19 12H5M12 19l-7-7 7-7",
  book: "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 014 17V5a2 2 0 012-2h14v14H6.5",
  filter: "M22 3H2l8 9.46V19l4 2v-8.54L22 3z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  message: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
  message2: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
  image: "M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
  info: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 8h.01M11 12h1v4h1",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  trash: "M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
  globe: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  sliders: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  check_circle: "M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3",
  refresh: "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  clock: "M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",
  moon: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
  text_size: "M4 7V4h16v3M9 20h6M12 4v16",
  briefcase: "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  graduation: "M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5",
  chat_bubble_left: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  chat_bubble_right: "M15 16h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h5l5 5v-5z",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const HISTORY = [
  { id: 1, ug: "مەن ئۆيگە قايتىمەن", zh: "我要回家了", time: "2分钟前", fav: true, dir: "ug→zh" },
  { id: 2, ug: "سالامەتلىكىڭىز قانداق؟", zh: "你好，你身体怎么样？", time: "1小时前", fav: false, dir: "ug→zh" },
  { id: 3, ug: "رەھمەت سىزگە", zh: "谢谢你", time: "昨天", fav: true, dir: "ug→zh" },
  { id: 4, ug: "بۈگۈن ھاۋا رايى ناھايىتى ياخشى", zh: "今天天气非常好", time: "昨天", fav: false, dir: "ug→zh" },
  { id: 5, ug: "مەن ئۇيغۇرچە ئۆگىنىۋاتىمەن", zh: "我正在学习维吾尔语", time: "2天前", fav: false, dir: "zh→ug" },
];

const VOCAB = [
  { ug: "سالام", zh: "你好", pinyin: "nǐ hǎo", level: "基础" },
  { ug: "رەھمەت", zh: "谢谢", pinyin: "xiè xiè", level: "基础" },
  { ug: "خوش كەلدىڭىز", zh: "欢迎", pinyin: "huān yíng", level: "基础" },
  { ug: "ئۆيۈم", zh: "我的家", pinyin: "wǒ de jiā", level: "中级" },
  { ug: "دوختۇر", zh: "医生", pinyin: "yī shēng", level: "中级" },
  { ug: "مەكتەپ", zh: "学校", pinyin: "xué xiào", level: "基础" },
];

const PHRASES = [
  { category: "问路", ug: "بۇ يەر قەيەردە؟", zh: "这个地方在哪里？" },
  { category: "购物", ug: "بۇ قانچىلىك تۇرىدۇ؟", zh: "这个多少钱？" },
  { category: "饮食", ug: "مەن ئاچقىنىم", zh: "我饿了" },
  { category: "紧急", ug: "ياردەم بىرىڭ!", zh: "请帮帮我！" },
];

const CONVERSATION = [
  { id: 1, speaker: "A", lang: "ug", text: "سالامەتلىكىڭىز قانداق؟", translation: "你好，最近怎么样？", time: "10:32" },
  { id: 2, speaker: "B", lang: "zh", text: "我很好，谢谢你！", translation: "مەن ياخشى، رەھمەت!", time: "10:32" },
  { id: 3, speaker: "A", lang: "ug", text: "بۈگۈن بازارغا بارامسىز؟", translation: "你今天去集市吗？", time: "10:33" },
  { id: 4, speaker: "B", lang: "zh", text: "对，下午三点去，你来吗？", translation: "ھەئە، چۈشتىن كىيىن سائەت ئۈچتە باراي، سىز كېلەمسىز؟", time: "10:33" },
  { id: 5, speaker: "A", lang: "ug", text: "كەلسەم بولىدۇ، بىللە بارايلى!", translation: "好的，我们一起去吧！", time: "10:34" },
];

const LANG_PACKS = [
  { name: "维吾尔语核心包", nameUg: "ئۇيغۇرچە ئاساسىي توپلام", size: "1.2 GB", status: "installed", updated: "2026-08-01" },
  { name: "汉语简体包", nameUg: "خەنزۇچە ئاددىي توپلام", size: "980 MB", status: "installed", updated: "2026-07-28" },
  { name: "维吾尔语扩展词典", nameUg: "ئۇيغۇرچە كەڭەيتىلگەن لۇغەت", size: "340 MB", status: "available", updated: "2026-08-10" },
  { name: "语音合成包", nameUg: "ئاۋاز سېنتېز توپلامى", size: "560 MB", status: "downloading", updated: "2026-08-15" },
];

const FAVORITES = [
  { id: 1, ug: "مەن ئۆيگە قايتىمەن", zh: "我要回家了", category: "日常", time: "今天" },
  { id: 2, ug: "رەھمەت سىزگە", zh: "谢谢你", category: "礼仪", time: "昨天" },
  { id: 3, ug: "بۇ قانچىلىك تۇرىدۇ؟", zh: "这个多少钱？", category: "购物", time: "本周" },
  { id: 4, ug: "دوختۇرخانا قەيەردە؟", zh: "医院在哪里？", category: "紧急", time: "本周" },
  { id: 5, ug: "مەن ئۇيغۇرچە ئۆگىنىۋاتىمەن", zh: "我正在学习维吾尔语", category: "学习", time: "上周" },
  { id: 6, ug: "خوش كەلدىڭىز بىزنىڭ دۇكىنىمىزغا", zh: "欢迎光临我们的店", category: "商业", time: "上周" },
];

const PHRASE_CATEGORIES = [
  {
    id: "travel", label: "旅行", labelUg: "سەپەر", icon: Icons.globe, color: "#2563EB", bg: "#EFF6FF",
    phrases: [
      { ug: "بىلەت قايەردىن سېتىلىدۇ؟", zh: "在哪里买票？", pinyin: "zài nǎlǐ mǎi piào?" },
      { ug: "تاكسى چاقىرىڭ", zh: "请叫一辆出租车", pinyin: "qǐng jiào yī liàng chūzūchē" },
      { ug: "مېھمانخانا قەيەردە؟", zh: "酒店在哪里？", pinyin: "jiǔdiàn zài nǎlǐ?" },
      { ug: "ئايروپىلانە بىكىتى قەيەردە؟", zh: "机场在哪里？", pinyin: "jīchǎng zài nǎlǐ?" },
    ]
  },
  {
    id: "trade", label: "贸易", labelUg: "تىجارەت", icon: Icons.briefcase, color: "#D97706", bg: "#FFFBEB",
    phrases: [
      { ug: "بۇ مال قانچىلىك تۇرىدۇ؟", zh: "这批货多少钱？", pinyin: "zhè pī huò duōshǎo qián?" },
      { ug: "شەرتنامە تۈزۈشكە بولامدۇ؟", zh: "可以签合同吗？", pinyin: "kěyǐ qiān hétong ma?" },
      { ug: "تاۋار ساپاسى ناھايىتى ياخشى", zh: "货物质量非常好", pinyin: "huòwù zhìliàng fēicháng hǎo" },
    ]
  },
  {
    id: "education", label: "教育", labelUg: "مائارىپ", icon: Icons.graduation, color: "#0D9488", bg: "#F0FDFA",
    phrases: [
      { ug: "مەكتەپ نەچچىدە باشلىنىدۇ؟", zh: "学校几点开始？", pinyin: "xuéxiào jǐdiǎn kāishǐ?" },
      { ug: "ئۆيگە ۋەزىپىنى تاپشۇرۇڭ", zh: "请交家庭作业", pinyin: "qǐng jiāo jiātíng zuòyè" },
      { ug: "بۇ دەرس مەنگە قىيىن", zh: "这门课对我来说很难", pinyin: "zhè mén kè duì wǒ lái shuō hěn nán" },
    ]
  },
  {
    id: "daily", label: "日常", labelUg: "كۈندىلىك", icon: Icons.message, color: "#7C3AED", bg: "#F5F3FF",
    phrases: [
      { ug: "بۈگۈن ھاۋا رايى قانداق؟", zh: "今天天气怎么样？", pinyin: "jīntiān tiānqì zěnme yàng?" },
      { ug: "ئاچقىنىم كەلدى", zh: "我饿了", pinyin: "wǒ è le" },
      { ug: "ئۇيقۇم كەلدى", zh: "我困了", pinyin: "wǒ kùn le" },
      { ug: "رەھمەت، خوش!", zh: "谢谢，再见！", pinyin: "xièxiè, zàijiàn!" },
    ]
  },
];

const FLASHCARDS = [
  { ug: "سالام", zh: "你好", pinyin: "nǐ hǎo", example_ug: "سالام، سىز قانداقسىز؟", example_zh: "你好，你怎么样？", level: 1, mastered: true },
  { ug: "رەھمەت", zh: "谢谢", pinyin: "xiè xiè", example_ug: "ياردىمىڭىز ئۈچۈن رەھمەت", example_zh: "谢谢你的帮助", level: 1, mastered: true },
  { ug: "خوش كەلدىڭىز", zh: "欢迎", pinyin: "huān yíng", example_ug: "خوش كەلدىڭىز بىزنىڭ ئۆيىمىزگە", example_zh: "欢迎来到我们家", level: 2, mastered: false },
  { ug: "كەچۈرۈڭ", zh: "对不起", pinyin: "duì bu qǐ", example_ug: "كەچۈرۈڭ، مەن يانلىشتىم", example_zh: "对不起，我错了", level: 2, mastered: false },
];

// ─── Shared Components ───────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-1">
      <span className="text-xs font-semibold text-[#0F172A]">9:41</span>
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5 items-end h-3">
          {[3,4,5,6].map(h => <div key={h} className="w-1 rounded-sm bg-[#0F172A]" style={{height: h}} />)}
        </div>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <rect x="0.5" y="0.5" width="13" height="9" rx="2" stroke="#0F172A" strokeWidth="1"/>
          <rect x="1.5" y="1.5" width="9" height="7" rx="1" fill="#0F172A"/>
          <path d="M14.5 3.5v3a1.5 1.5 0 000-3z" fill="#0F172A"/>
        </svg>
      </div>
    </div>
  );
}

function TabBar({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  const tabs = [
    { id: "home", label: "主页", icon: Icons.home },
    { id: "translate", label: "翻译", icon: Icons.translate },
    { id: "history", label: "历史", icon: Icons.history },
    { id: "learn", label: "学习", icon: Icons.learn },
    { id: "settings", label: "设置", icon: Icons.settings },
  ];
  return (
    <div className="flex border-t border-[#E2E8F0] bg-white pt-2 pb-safe">
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            className="flex-1 flex flex-col items-center gap-0.5 py-1 transition-colors"
            style={{ color: isActive ? "#2563EB" : "#94A3B8" }}>
            <Icon path={t.icon} size={22} color={isActive ? "#2563EB" : "#94A3B8"} />
            <span className="text-[10px] font-medium">{t.label}</span>
            {isActive && <div className="w-1 h-1 rounded-full bg-[#2563EB]" />}
          </button>
        );
      })}
    </div>
  );
}

function LangBadge({ lang, rtl = false }: { lang: string; rtl?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EFF6FF] rounded-full">
      <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
      <span className="text-sm font-semibold text-[#2563EB]">{lang}</span>
    </div>
  );
}

function SwapButton({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center transition-transform active:scale-95">
      <Icon path={Icons.swap} size={18} color="#2563EB" />
    </button>
  );
}

function Badge({ children, color = "blue" }: { children: React.ReactNode; color?: "blue"|"gold"|"teal"|"gray" }) {
  const styles = {
    blue: "bg-[#EFF6FF] text-[#2563EB]",
    gold: "bg-[#FFFBEB] text-[#D97706]",
    teal: "bg-[#F0FDFA] text-[#0D9488]",
    gray: "bg-[#F1F5F9] text-[#475569]",
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles[color]}`}>{children}</span>;
}

// ─── Screen 1: Onboarding ────────────────────────────────────────────────────

function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [selectedLang, setSelectedLang] = useState<"ug"|"zh">("ug");

  if (step === 0) return (
    <div className="flex flex-col items-center justify-between h-full bg-white px-6 py-8">
      <div />
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center shadow-xl shadow-blue-200">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-white text-lg font-arabic font-bold leading-none">كامران</span>
            <div className="w-8 h-px bg-white/40" />
            <span className="text-white/80 text-[10px] font-chinese tracking-widest">卡姆兰</span>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">KAMRAN</h1>
          <p className="text-[#475569] text-sm mt-1">维吾尔语 · 汉语 AI 翻译</p>
          <p className="font-arabic text-[#475569] text-sm mt-0.5 rtl">ئۇيغۇرچە · خەنزۇچە AI تەرجىمىسى</p>
        </div>
        {/* Feature pills */}
        <div className="flex flex-col gap-3 w-full mt-2">
          {[
            { icon: Icons.translate, label: "文字翻译", sub: "مەتىن تەرجىمىسى", color: "#2563EB" },
            { icon: Icons.mic, label: "语音识别", sub: "ئاۋاز تونۇش", color: "#0D9488" },
            { icon: Icons.camera, label: "拍照翻译", sub: "ئوچۇق تەرجىمىسى", color: "#D97706" },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: f.color + "15" }}>
                <Icon path={f.icon} size={20} color={f.color} />
              </div>
              <div>
                <p className="font-semibold text-[#0F172A] text-sm">{f.label}</p>
                <p className="font-arabic text-[#94A3B8] text-xs rtl">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => setStep(1)}
        className="w-full py-4 rounded-2xl bg-[#2563EB] text-white font-semibold text-base shadow-lg shadow-blue-200 active:scale-98 transition-transform">
        开始使用 · باشلاش
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white px-6 py-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0F172A]">选择界面语言</h2>
          <p className="font-arabic text-[#475569] text-sm mt-1 rtl">ئىنتېرفەيس تىلىنى تاللاڭ</p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {([
            { id: "ug", label: "ئۇيغۇرچە", sub: "维吾尔语", flag: "🇨🇳", script: "arabic" },
            { id: "zh", label: "中文（简体）", sub: "خەنزۇچە", flag: "🇨🇳", script: "latin" },
          ] as const).map(l => (
            <button key={l.id} onClick={() => setSelectedLang(l.id)}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                selectedLang === l.id ? "border-[#2563EB] bg-[#EFF6FF]" : "border-[#E2E8F0] bg-white"
              }`}>
              <span className="text-3xl">{l.flag}</span>
              <div className="flex-1 text-left">
                <p className={`font-semibold text-[#0F172A] text-base ${l.script === "arabic" ? "font-arabic rtl" : ""}`}>
                  {l.label}
                </p>
                <p className={`text-[#94A3B8] text-sm ${l.script === "latin" ? "font-arabic rtl" : ""}`}>{l.sub}</p>
              </div>
              {selectedLang === l.id && (
                <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center">
                  <Icon path={Icons.check} size={14} color="white" />
                </div>
              )}
            </button>
          ))}
        </div>
        {/* Offline mode note */}
        <div className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
          <Icon path={Icons.zap} size={18} color="#D97706" />
          <div>
            <p className="text-sm font-medium text-[#92400E]">离线翻译可用</p>
            <p className="font-arabic text-xs text-[#92400E] rtl">توركەلمىسىز تەرجىمە يولى</p>
          </div>
        </div>
      </div>
      <button onClick={onDone}
        className="w-full py-4 rounded-2xl bg-[#2563EB] text-white font-semibold text-base shadow-lg shadow-blue-200">
        确认 · جەزملەش
      </button>
    </div>
  );
}

// ─── Screen 2: Home Dashboard ─────────────────────────────────────────────────

function HomeScreen({ setTab }: { setTab: (t: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] px-6 pt-2 pb-8 rounded-b-3xl shadow-lg shadow-blue-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-blue-200 text-sm font-arabic rtl">خەيرلىك ئەتىگەن</p>
            <h1 className="text-white text-2xl font-bold mt-0.5">早上好 👋</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white text-sm font-bold">K</span>
          </div>
        </div>
        {/* Quick translate bar */}
        <button onClick={() => setTab("translate")}
          className="w-full bg-white/15 border border-white/25 rounded-2xl px-4 py-3 flex items-center gap-3 text-left">
          <Icon path={Icons.search} size={18} color="rgba(255,255,255,0.7)" />
          <span className="text-white/60 text-sm">输入文字翻译... مەتىن كىرگۈزۈڭ</span>
        </button>
      </div>

      <div className="px-4 pt-4 pb-4 flex flex-col gap-4">
        {/* Quick actions */}
        <div>
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">快捷功能</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Icons.translate, label: "文字", sub: "مەتىن", color: "#2563EB", bg: "#EFF6FF", tab: "translate" },
              { icon: Icons.mic, label: "语音", sub: "ئاۋاز", color: "#0D9488", bg: "#F0FDFA", tab: "voice" },
              { icon: Icons.camera, label: "拍照", sub: "رەسىم", color: "#D97706", bg: "#FFFBEB", tab: "camera" },
            ].map(a => (
              <button key={a.tab} onClick={() => setTab(a.tab)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm active:scale-95 transition-transform">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: a.bg }}>
                  <Icon path={a.icon} size={22} color={a.color} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-[#0F172A]">{a.label}</p>
                  <p className="font-arabic text-[10px] text-[#94A3B8]">{a.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Offline status */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#E2E8F0]">
          <div className="w-8 h-8 rounded-full bg-[#F0FDFA] flex items-center justify-center">
            <Icon path={Icons.zap} size={16} color="#0D9488" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[#0F172A]">离线模式已就绪</p>
            <p className="font-arabic text-xs text-[#94A3B8] rtl">توركەلمىسىز ھالەت تەييار</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#0D9488]" />
        </div>

        {/* Recent translation */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">最近翻译</p>
            <button onClick={() => setTab("history")} className="text-xs text-[#2563EB] font-medium">查看全部</button>
          </div>
          <div className="flex flex-col gap-2">
            {HISTORY.slice(0, 3).map(h => (
              <div key={h.id} className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <Badge color="blue">{h.dir === "ug→zh" ? "维→汉" : "汉→维"}</Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#94A3B8]">{h.time}</span>
                    {h.fav && <Icon path={Icons.star} size={12} color="#D97706" filled />}
                  </div>
                </div>
                <p className="font-arabic text-sm text-[#0F172A] rtl leading-relaxed">{h.ug}</p>
                <div className="my-2 border-t border-[#F1F5F9]" />
                <p className="font-chinese text-sm text-[#475569]">{h.zh}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learn prompt */}
        <button onClick={() => setTab("learn")}
          className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#0D9488] to-[#0F766E] text-white shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Icon path={Icons.book} size={20} color="white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">今日词汇 · بۈگۈنكى سۆز</p>
            <p className="text-teal-100 text-xs mt-0.5">6 个新词汇等你学习</p>
          </div>
          <Icon path={Icons.chevron_right} size={18} color="rgba(255,255,255,0.7)" />
        </button>
      </div>
    </div>
  );
}

// ─── Screen 3: Text Translate ─────────────────────────────────────────────────

function TextTranslateScreen() {
  const [inputLang, setInputLang] = useState<"ug"|"zh">("ug");
  const [inputText, setInputText] = useState("مەن ئۆيگە قايتىمەن");
  const [translated, setTranslated] = useState("我要回家了");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favd, setFavd] = useState(false);

  const isUgInput = inputLang === "ug";

  function swap() {
    setInputLang(l => l === "ug" ? "zh" : "ug");
    setInputText(translated);
    setTranslated(inputText);
  }

  function translate() {
    setLoading(true);
    setTimeout(() => { setLoading(false); }, 1200);
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Lang selector */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E2E8F0]">
        <LangBadge lang={isUgInput ? "维吾尔语 · ئۇيغۇرچە" : "中文（简体）"} />
        <SwapButton onClick={swap} />
        <LangBadge lang={!isUgInput ? "维吾尔语 · ئۇيغۇرچە" : "中文（简体）"} />
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar gap-3 p-4">
        {/* Input */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-4">
            <textarea
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className={`w-full resize-none text-[#0F172A] text-base leading-relaxed outline-none bg-transparent min-h-[100px] ${
                isUgInput ? "font-arabic rtl text-right" : "font-chinese"
              }`}
              placeholder={isUgInput ? "مەتىن كىرگۈزۈڭ..." : "输入文字..."}
              rows={4}
            />
          </div>
          <div className="flex items-center justify-between px-4 py-2 border-t border-[#F1F5F9]">
            <span className="text-xs text-[#94A3B8]">{inputText.length} 字符</span>
            <div className="flex gap-2">
              <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9]">
                <Icon path={Icons.volume} size={18} color="#94A3B8" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-[#F1F5F9]" onClick={() => setInputText("")}>
                <Icon path={Icons.x} size={18} color="#94A3B8" />
              </button>
            </div>
          </div>
        </div>

        {/* Translate button */}
        <button onClick={translate}
          className="w-full py-3.5 rounded-2xl bg-[#2563EB] text-white font-semibold shadow-lg shadow-blue-200 active:scale-98 transition-all flex items-center justify-center gap-2">
          {loading ? (
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          ) : (
            <>
              <Icon path={Icons.translate} size={18} color="white" />
              <span>翻译 · تەرجىمە</span>
            </>
          )}
        </button>

        {/* Output */}
        {translated && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span className="text-xs font-semibold text-[#2563EB]">翻译结果</span>
              <Badge color="teal">AI</Badge>
            </div>
            <div className="p-4">
              <p className={`text-[#0F172A] text-lg leading-relaxed ${
                !isUgInput ? "font-arabic rtl text-right" : "font-chinese"
              }`}>
                {loading ? (
                  <span className="text-[#94A3B8]">翻译中...</span>
                ) : translated}
              </p>
            </div>
            {/* Action bar */}
            <div className="flex border-t border-[#F1F5F9]">
              {[
                { icon: Icons.volume, label: "朗读", action: () => {} },
                { icon: Icons.copy, label: copied ? "已复制" : "复制", action: () => { setCopied(true); setTimeout(() => setCopied(false), 2000); } },
                { icon: Icons.star, label: favd ? "已收藏" : "收藏", action: () => setFavd(f => !f), active: favd },
                { icon: Icons.share, label: "分享", action: () => {} },
              ].map((btn, i) => (
                <button key={i} onClick={btn.action}
                  className="flex-1 flex flex-col items-center gap-1 py-3 hover:bg-[#F8FAFC] transition-colors">
                  <Icon path={btn.icon} size={18} color={btn.active ? "#D97706" : "#94A3B8"} filled={btn.active} />
                  <span className="text-[10px] text-[#94A3B8]">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Phrasebook suggestion */}
        <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
          <p className="text-xs text-[#92400E] font-medium mb-2">相关短语 · مۇناسىۋەتلىك ئىبارەلەر</p>
          <div className="flex flex-wrap gap-2">
            {["مەن ئۆيۈمگە قايتىمەن", "ئۆي قەيەردە?"].map(p => (
              <button key={p} onClick={() => setInputText(p)}
                className="font-arabic text-xs px-2 py-1 rounded-lg bg-white border border-[#FDE68A] text-[#92400E] rtl">
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 4: Voice Translate ────────────────────────────────────────────────

function VoiceTranslateScreen() {
  const [state, setState] = useState<"idle"|"listening"|"done">("idle");

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Lang selector */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E2E8F0]">
        <LangBadge lang="维吾尔语" />
        <SwapButton />
        <LangBadge lang="中文" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-between px-6 py-8">
        {/* Waveform / Idle */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
          {state === "idle" && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F1F5F9] flex items-center justify-center">
                <Icon path={Icons.mic} size={28} color="#94A3B8" />
              </div>
              <p className="text-[#94A3B8] text-sm text-center">按下麦克风开始录音<br /><span className="font-arabic">مىكروفوننى بېسىپ باشلاڭ</span></p>
            </div>
          )}

          {state === "listening" && (
            <div className="flex flex-col items-center gap-8 w-full">
              {/* Waveform */}
              <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-xs">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="wave-bar w-2 rounded-full bg-[#2563EB]"
                    style={{ animationDelay: `${(i % 9) * 0.1}s`, opacity: 0.4 + (i % 5) * 0.15 }} />
                ))}
              </div>
              {/* Live transcript */}
              <div className="w-full p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                <p className="text-xs text-[#94A3B8] mb-2 font-semibold">实时识别 · ئۆز ۋاقتىدا تونۇش</p>
                <p className="font-arabic text-base text-[#0F172A] rtl leading-relaxed">
                  مەن ئۆيگە قايتىمەن<span className="animate-pulse">▋</span>
                </p>
              </div>
            </div>
          )}

          {state === "done" && (
            <div className="flex flex-col gap-4 w-full">
              {/* Source */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Badge color="blue">维吾尔语</Badge>
                </div>
                <p className="font-arabic text-base text-[#0F172A] rtl leading-relaxed">مەن ئۆيگە قايتىمەن</p>
                <button className="mt-2 flex items-center gap-1.5 text-xs text-[#2563EB]">
                  <Icon path={Icons.play} size={14} color="#2563EB" />
                  播放原音
                </button>
              </div>
              {/* Translation */}
              <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Badge color="teal">中文</Badge>
                  <Badge color="gray">AI 翻译</Badge>
                </div>
                <p className="font-chinese text-xl font-medium text-[#0F172A] leading-relaxed">我要回家了</p>
                <div className="flex gap-3 mt-3">
                  <button className="flex items-center gap-1.5 text-xs text-[#0D9488]">
                    <Icon path={Icons.volume} size={14} color="#0D9488" />
                    朗读译文
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-[#475569]">
                    <Icon path={Icons.copy} size={14} color="#475569" />
                    复制
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-[#D97706]">
                    <Icon path={Icons.star} size={14} color="#D97706" />
                    收藏
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mic button */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {state === "listening" && (
              <>
                <div className="pulse-ring absolute inset-0 rounded-full border-2 border-[#2563EB] scale-110" />
                <div className="pulse-ring absolute inset-0 rounded-full border-2 border-[#2563EB]/40 scale-125" style={{ animationDelay: "0.5s" }} />
              </>
            )}
            <button
              onClick={() => setState(s => s === "idle" ? "listening" : s === "listening" ? "done" : "idle")}
              className="w-20 h-20 rounded-full shadow-xl flex items-center justify-center transition-all active:scale-95"
              style={{ background: state === "listening" ? "#EF4444" : "#2563EB", boxShadow: state === "listening" ? "0 8px 30px rgba(239,68,68,0.35)" : "0 8px 30px rgba(37,99,235,0.35)" }}>
              <Icon path={state === "listening" ? Icons.x : Icons.mic} size={30} color="white" />
            </button>
          </div>
          <p className="text-xs text-[#94A3B8]">
            {state === "idle" ? "点击录音" : state === "listening" ? "录音中... 点击停止" : "点击重录"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 5: Camera / OCR ───────────────────────────────────────────────────

function CameraScreen() {
  const [scanned, setScanned] = useState(false);

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Camera viewfinder */}
      <div className="relative flex-1 bg-[#1a1a1a] overflow-hidden">
        {/* Simulated camera bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          {[1,2].map(i => <div key={i} className="absolute left-0 right-0 border-t border-white" style={{ top: `${i*33.3}%` }} />)}
          {[1,2].map(i => <div key={i} className="absolute top-0 bottom-0 border-l border-white" style={{ left: `${i*33.3}%` }} />)}
        </div>

        {/* Scan frame */}
        <div className="absolute" style={{ top: "15%", left: "10%", right: "10%", bottom: "30%" }}>
          {/* Corners */}
          {[["top-0 left-0 border-t-2 border-l-2 rounded-tl-lg", "top"],
            ["top-0 right-0 border-t-2 border-r-2 rounded-tr-lg", "top"],
            ["bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg", "bottom"],
            ["bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg", "bottom"]
          ].map(([cls], i) => (
            <div key={i} className={`absolute w-8 h-8 border-[#2563EB] ${cls}`} />
          ))}

          {/* Scan line */}
          {!scanned && (
            <div className="scan-line absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent"
              style={{ position: "absolute" }} />
          )}

          {/* Detected text overlay (when scanned) */}
          {scanned && (
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 p-4">
              {["مەكتەپ كىتابخانىسى", "图书馆"].map((t, i) => (
                <div key={i} className={`px-3 py-1.5 bg-[#2563EB]/80 rounded-lg backdrop-blur-sm ${i === 0 ? "font-arabic" : "font-chinese"}`}>
                  <span className="text-white text-sm">{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top toolbar */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-5 py-4">
          <button className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <Icon path={Icons.x} size={18} color="white" />
          </button>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-full bg-[#2563EB]/80 backdrop-blur-sm">
              <span className="text-white text-xs font-semibold">OCR</span>
            </button>
            <button className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
              <span className="text-white text-xs">即时</span>
            </button>
          </div>
        </div>

        {/* Hint text */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-1">
          <p className="text-white/70 text-xs">将文字对准扫描框</p>
          <p className="font-arabic text-white/50 text-xs rtl">مەتىننى سىكانىرلاش رامكىسىغا توغىرلاڭ</p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="bg-[#0F172A] px-6 py-5 flex flex-col gap-4">
        {scanned && (
          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Badge color="teal">识别结果</Badge>
            </div>
            <p className="font-arabic text-white rtl text-base leading-relaxed">مەكتەپ كىتابخانىسى</p>
            <div className="my-2 border-t border-white/10" />
            <p className="font-chinese text-white/80 text-base">学校图书馆</p>
            <div className="flex gap-3 mt-3">
              {[Icons.copy, Icons.share, Icons.star].map((icon, i) => (
                <button key={i} className="p-2 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon path={icon} size={16} color="white" />
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-around">
          <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <Icon path={Icons.history} size={22} color="white" />
          </button>
          <button onClick={() => setScanned(s => !s)}
            className="w-16 h-16 rounded-full bg-[#2563EB] border-4 border-white/20 flex items-center justify-center shadow-lg shadow-blue-900/50 active:scale-95 transition-transform">
            <Icon path={Icons.camera} size={26} color="white" />
          </button>
          <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <Icon path={Icons.zap} size={22} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 6: History ────────────────────────────────────────────────────────

function HistoryScreen() {
  const [query, setQuery] = useState("");
  const [favOnly, setFavOnly] = useState(false);
  const [items, setItems] = useState(HISTORY);

  const filtered = items.filter(h =>
    (!favOnly || h.fav) &&
    (!query || h.ug.includes(query) || h.zh.includes(query))
  );

  function toggleFav(id: number) {
    setItems(items.map(h => h.id === id ? { ...h, fav: !h.fav } : h));
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Search bar */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-3 flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-[#F1F5F9] rounded-xl px-3 py-2.5">
          <Icon path={Icons.search} size={18} color="#94A3B8" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="搜索翻译记录... تارىخنى ئىزدەڭ"
            className="flex-1 bg-transparent text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8]" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setFavOnly(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              !favOnly ? "bg-[#2563EB] text-white" : "bg-[#F1F5F9] text-[#475569]"
            }`}>全部</button>
          <button onClick={() => setFavOnly(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
              favOnly ? "bg-[#D97706] text-white" : "bg-[#F1F5F9] text-[#475569]"
            }`}>
            <Icon path={Icons.star} size={12} color={favOnly ? "white" : "#94A3B8"} />
            收藏
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16">
            <div className="w-16 h-16 rounded-2xl bg-[#F1F5F9] flex items-center justify-center">
              <Icon path={Icons.search} size={28} color="#CBD5E1" />
            </div>
            <p className="text-[#94A3B8] text-sm">没有找到翻译记录</p>
            <p className="font-arabic text-[#94A3B8] text-xs rtl">تەرجىمە تارىخى تېپىلمىدى</p>
          </div>
        ) : filtered.map(h => (
          <div key={h.id} className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge color="blue">{h.dir === "ug→zh" ? "维→汉" : "汉→维"}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#94A3B8]">{h.time}</span>
                <button onClick={() => toggleFav(h.id)}>
                  <Icon path={Icons.star} size={16} color={h.fav ? "#D97706" : "#CBD5E1"} filled={h.fav} />
                </button>
              </div>
            </div>
            <p className="font-arabic text-sm text-[#0F172A] rtl leading-relaxed">{h.ug}</p>
            <div className="my-2.5 border-t border-[#F1F5F9]" />
            <p className="font-chinese text-sm text-[#475569] leading-relaxed">{h.zh}</p>
            <div className="flex gap-3 mt-3 pt-2 border-t border-[#F1F5F9]">
              {[Icons.volume, Icons.copy, Icons.share].map((icon, i) => (
                <button key={i} className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
                  <Icon path={icon} size={14} color="#94A3B8" />
                  {["朗读", "复制", "分享"][i]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 7: Learn ──────────────────────────────────────────────────────────

function LearnScreen() {
  const [activeTab, setActiveTab] = useState<"vocab"|"phrases">("vocab");
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Tab toggle */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-3">
        <div className="flex bg-[#F1F5F9] p-1 rounded-xl">
          {[{ id: "vocab", label: "词汇 · سۆزلەر" }, { id: "phrases", label: "短语 · ئىبارەلەر" }].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id as any)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === t.id ? "bg-white text-[#0F172A] shadow-sm" : "text-[#94A3B8]"
              }`}>{t.label}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 flex flex-col gap-3">
        {activeTab === "vocab" ? (
          <>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-[#94A3B8]">今日学习进度</p>
              <p className="text-xs font-semibold text-[#0D9488]">3 / 6 完成</p>
            </div>
            {/* Progress bar */}
            <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-[#0D9488] to-[#14B8A6] rounded-full" style={{ width: "50%" }} />
            </div>

            {VOCAB.map((v, i) => (
              <button key={i} onClick={() => setFlipped(flipped === i ? null : i)}
                className={`w-full p-4 rounded-2xl border shadow-sm text-left transition-all active:scale-98 ${
                  flipped === i ? "bg-[#EFF6FF] border-[#BFDBFE]" : "bg-white border-[#E2E8F0]"
                }`}>
                <div className="flex items-start justify-between mb-2">
                  <Badge color={v.level === "基础" ? "teal" : "gold"}>{v.level}</Badge>
                  <span className="text-[10px] text-[#94A3B8]">{i < 3 ? "✓" : "○"}</span>
                </div>
                <p className="font-arabic text-xl text-[#0F172A] rtl leading-relaxed mb-1">{v.ug}</p>
                {flipped === i ? (
                  <div className="mt-2 pt-2 border-t border-[#BFDBFE]">
                    <p className="font-chinese text-lg font-medium text-[#2563EB]">{v.zh}</p>
                    <p className="text-[#94A3B8] text-sm italic mt-0.5">{v.pinyin}</p>
                    <div className="flex gap-2 mt-2">
                      <button className="flex items-center gap-1 text-xs text-[#0D9488]">
                        <Icon path={Icons.volume} size={14} color="#0D9488" />
                        发音
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#94A3B8] text-sm">点击查看翻译</p>
                )}
              </button>
            ))}
          </>
        ) : (
          <>
            {PHRASES.map((p, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <Badge color={["blue","teal","gold","gray"][i % 4] as any}>{p.category}</Badge>
                  <button>
                    <Icon path={Icons.volume} size={16} color="#94A3B8" />
                  </button>
                </div>
                <p className="font-arabic text-base text-[#0F172A] rtl leading-relaxed mb-2">{p.ug}</p>
                <div className="border-t border-[#F1F5F9] pt-2">
                  <p className="font-chinese text-base text-[#475569]">{p.zh}</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="flex items-center gap-1 text-xs text-[#2563EB]">
                    <Icon path={Icons.star} size={12} color="#2563EB" />
                    加入学习列表
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Screen: Settings ─────────────────────────────────────────────────────────

function SettingsScreen() {
  const [offline, setOffline] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [rtl, setRtl] = useState(true);

  const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
    <button onClick={onChange}
      className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 ${on ? "bg-[#2563EB]" : "bg-[#CBD5E1]"}`}>
      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-y-auto no-scrollbar">
      {/* Profile */}
      <div className="bg-white border-b border-[#E2E8F0] px-6 py-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center shadow">
          <span className="text-white text-xl font-bold">K</span>
        </div>
        <div>
          <p className="font-semibold text-[#0F172A] text-base">KAMRAN</p>
          <p className="text-[#94A3B8] text-sm">AI 翻译助手 v2.1.0</p>
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Language settings */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase px-4 pt-3 pb-2 tracking-wider">语言设置</p>
          {[
            { label: "界面语言", sub: "维吾尔语", right: <Icon path={Icons.chevron_right} size={16} color="#94A3B8" /> },
            { label: "默认翻译方向", sub: "维 → 汉", right: <Icon path={Icons.chevron_right} size={16} color="#94A3B8" /> },
            { label: "自动检测语言", sub: "ئاپتوماتىك تونۇش", right: <Toggle on={autoDetect} onChange={() => setAutoDetect(v => !v)} /> },
            { label: "RTL 文字布局", sub: "维吾尔语从右到左", right: <Toggle on={rtl} onChange={() => setRtl(v => !v)} /> },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3.5 border-t border-[#F1F5F9] first:border-t-0">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{row.label}</p>
                <p className="text-xs text-[#94A3B8] font-arabic">{row.sub}</p>
              </div>
              {row.right}
            </div>
          ))}
        </div>

        {/* AI & Offline */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase px-4 pt-3 pb-2 tracking-wider">AI 与离线</p>
          {[
            { label: "离线翻译模式", sub: "ئىنتېرنېتسىز تەرجىمە", right: <Toggle on={offline} onChange={() => setOffline(v => !v)} /> },
            { label: "AI 模型", sub: "KAMRAN-v2 (本地)", right: <Icon path={Icons.chevron_right} size={16} color="#94A3B8" /> },
            { label: "下载语言包", sub: "2.3 GB 可用", right: <Icon path={Icons.chevron_right} size={16} color="#94A3B8" /> },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3.5 border-t border-[#F1F5F9] first:border-t-0">
              <div>
                <p className="text-sm font-medium text-[#0F172A]">{row.label}</p>
                <p className="text-xs text-[#94A3B8] font-arabic">{row.sub}</p>
              </div>
              {row.right}
            </div>
          ))}
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <p className="text-xs font-semibold text-[#94A3B8] uppercase px-4 pt-3 pb-2 tracking-wider">关于</p>
          {["关于 KAMRAN", "隐私政策", "使用条款", "反馈与建议"].map((label, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3.5 border-t border-[#F1F5F9] first:border-t-0">
              <p className="text-sm font-medium text-[#0F172A]">{label}</p>
              <Icon path={Icons.chevron_right} size={16} color="#94A3B8" />
            </div>
          ))}
        </div>

        {/* Version */}
        <p className="text-center text-xs text-[#CBD5E1] pb-2">
          KAMRAN v2.1.0 · كامران · 卡姆兰
        </p>
      </div>
    </div>
  );
}

// ─── Shared: Toggle ──────────────────────────────────────────────────────────

function Toggle({ on, onChange, size = "md" }: { on: boolean; onChange: () => void; size?: "sm"|"md" }) {
  const w = size === "sm" ? "w-9 h-5" : "w-11 h-6";
  const thumb = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const shift = size === "sm" ? "translate-x-4" : "translate-x-5";
  return (
    <button onClick={onChange}
      className={`${w} rounded-full transition-colors flex items-center px-0.5 ${on ? "bg-[#2563EB]" : "bg-[#CBD5E1]"}`}>
      <div className={`${thumb} rounded-full bg-white shadow transition-transform ${on ? shift : "translate-x-0"}`} />
    </button>
  );
}

// ─── Shared: ScreenHeader ─────────────────────────────────────────────────────

function ScreenHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#E2E8F0]">
      <div>
        <h2 className="text-base font-bold text-[#0F172A]">{title}</h2>
        {subtitle && <p className="font-arabic text-[10px] text-[#94A3B8] rtl">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

// ─── Shared: EmptyState ───────────────────────────────────────────────────────

function EmptyState({ icon, label, sub }: { icon: string; label: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="w-16 h-16 rounded-2xl bg-[#F1F5F9] flex items-center justify-center">
        <Icon path={icon} size={28} color="#CBD5E1" />
      </div>
      <p className="text-[#94A3B8] text-sm font-medium">{label}</p>
      <p className="font-arabic text-[#94A3B8] text-xs rtl">{sub}</p>
    </div>
  );
}

// ─── S1: Conversation Mode ────────────────────────────────────────────────────

function ConversationScreen() {
  const [messages, setMessages] = useState(CONVERSATION);
  const [isListening, setIsListening] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<"A"|"B">("A");

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Speaker header */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-3">
        <div className="flex gap-2">
          {(["A","B"] as const).map(s => {
            const isA = s === "A";
            const label = isA ? "维吾尔语" : "中文";
            const labelUg = isA ? "ئۇيغۇرچە" : "خەنزۇچە";
            const active = activeSpeaker === s;
            return (
              <button key={s} onClick={() => setActiveSpeaker(s)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border transition-all ${
                  active ? "bg-[#EFF6FF] border-[#BFDBFE]" : "bg-[#F8FAFC] border-[#E2E8F0]"
                }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  active ? "bg-[#2563EB] text-white" : "bg-[#E2E8F0] text-[#94A3B8]"
                }`}>{s}</div>
                <span className={`text-[10px] font-semibold ${active ? "text-[#2563EB]" : "text-[#94A3B8]"}`}>{label}</span>
                <span className="font-arabic text-[9px] text-[#94A3B8]">{labelUg}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 flex flex-col gap-3">
        {messages.map(msg => {
          const isA = msg.speaker === "A";
          const isUg = msg.lang === "ug";
          return (
            <div key={msg.id} className={`flex flex-col gap-1 ${isA ? "items-start" : "items-end"}`}>
              <div className={`flex items-end gap-2 max-w-[85%] ${isA ? "flex-row" : "flex-row-reverse"}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                  isA ? "bg-[#2563EB] text-white" : "bg-[#0D9488] text-white"
                }`}>{msg.speaker}</div>
                <div className={`rounded-2xl px-3.5 py-2.5 shadow-sm ${
                  isA ? "bg-white border border-[#E2E8F0] rounded-tl-sm" : "bg-[#2563EB] rounded-tr-sm"
                }`}>
                  <p className={`text-sm leading-relaxed ${isUg ? "font-arabic rtl" : "font-chinese"} ${isA ? "text-[#0F172A]" : "text-white"}`}>
                    {msg.text}
                  </p>
                </div>
              </div>
              {/* Translation bubble */}
              <div className={`max-w-[80%] px-3 py-1.5 rounded-xl ${isA ? "ml-8 bg-[#F0FDFA] border border-[#CCFBF1]" : "mr-8 bg-[#FFFBEB] border border-[#FDE68A]"}`}>
                <p className={`text-[11px] leading-relaxed ${!isUg ? "font-arabic rtl" : "font-chinese"} ${isA ? "text-[#0D9488]" : "text-[#D97706]"}`}>
                  {msg.translation}
                </p>
              </div>
              <span className="text-[9px] text-[#94A3B8] px-8">{msg.time}</span>
            </div>
          );
        })}
        {/* Listening indicator */}
        {isListening && (
          <div className={`flex items-end gap-2 ${activeSpeaker === "A" ? "flex-row" : "flex-row-reverse"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
              activeSpeaker === "A" ? "bg-[#2563EB] text-white" : "bg-[#0D9488] text-white"
            }`}>{activeSpeaker}</div>
            <div className="bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 flex items-center gap-1 shadow-sm">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#2563EB] animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="bg-white border-t border-[#E2E8F0] px-4 py-3 flex items-center gap-3">
        <button className="p-2.5 rounded-xl bg-[#F1F5F9]">
          <Icon path={Icons.swap} size={18} color="#94A3B8" />
        </button>
        <button
          onMouseDown={() => setIsListening(true)}
          onMouseUp={() => setIsListening(false)}
          onTouchStart={() => setIsListening(true)}
          onTouchEnd={() => setIsListening(false)}
          className={`flex-1 py-3.5 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm transition-all ${
            isListening ? "bg-red-500 shadow-lg shadow-red-200" : "bg-[#2563EB] shadow-lg shadow-blue-200"
          } text-white`}>
          <Icon path={Icons.mic} size={18} color="white" />
          {isListening ? "松开停止" : `${activeSpeaker === "A" ? "说维吾尔语" : "说中文"}`}
        </button>
        <button className="p-2.5 rounded-xl bg-[#F1F5F9]">
          <Icon path={Icons.volume} size={18} color="#94A3B8" />
        </button>
      </div>
    </div>
  );
}

// ─── S2: Offline Mode ─────────────────────────────────────────────────────────

function OfflineModeScreen() {
  const [offlineEnabled, setOfflineEnabled] = useState(true);
  const [packs, setPacks] = useState(LANG_PACKS);
  const [downloading, setDownloading] = useState<string | null>("语音合成包");

  function toggleDownload(name: string) {
    if (packs.find(p => p.name === name)?.status === "available") {
      setDownloading(name);
      setPacks(prev => prev.map(p => p.name === name ? { ...p, status: "downloading" } : p));
      setTimeout(() => {
        setPacks(prev => prev.map(p => p.name === name ? { ...p, status: "installed" } : p));
        setDownloading(null);
      }, 3000);
    }
  }

  const statusColor = { installed: "#0D9488", available: "#2563EB", downloading: "#D97706" };
  const statusLabel = { installed: "已安装", available: "可下载", downloading: "下载中" };
  const statusUg = { installed: "تاقىلدى", available: "چۈشۈرگىلى بولىدۇ", downloading: "چۈشۈرۈلۈۋاتىدۇ" };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-y-auto no-scrollbar">
      {/* Connection status banner */}
      <div className={`mx-4 mt-3 mb-1 p-4 rounded-2xl border ${offlineEnabled ? "bg-[#F0FDFA] border-[#CCFBF1]" : "bg-[#FFFBEB] border-[#FDE68A]"}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${offlineEnabled ? "bg-[#0D9488]" : "bg-[#D97706]"}`}>
            <Icon path={offlineEnabled ? Icons.zap : Icons.wifi_off} size={20} color="white" />
          </div>
          <div className="flex-1">
            <p className={`font-semibold text-sm ${offlineEnabled ? "text-[#0F766E]" : "text-[#92400E]"}`}>
              {offlineEnabled ? "离线模式已启用" : "离线模式已关闭"}
            </p>
            <p className={`font-arabic text-[10px] rtl ${offlineEnabled ? "text-[#0D9488]" : "text-[#D97706]"}`}>
              {offlineEnabled ? "توركەلمىسىز ھالەت ئاچتىلدى" : "توركەلمىسىز ھالەت تاقالدى"}
            </p>
          </div>
          <Toggle on={offlineEnabled} onChange={() => setOfflineEnabled(v => !v)} />
        </div>
        {offlineEnabled && (
          <div className="mt-3 pt-3 border-t border-[#CCFBF1] grid grid-cols-3 gap-3">
            {[
              { label: "已安装", value: "2", sub: "语言包" },
              { label: "可用", value: "1.1 GB", sub: "存储空间" },
              { label: "更新", value: "5天前", sub: "上次同步" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-base font-bold text-[#0F766E]">{s.value}</p>
                <p className="text-[10px] text-[#0D9488]">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-3 flex flex-col gap-3">
        <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">语言包管理 · تىل توپلامى</p>

        {packs.map((pack, i) => {
          const st = pack.status as keyof typeof statusColor;
          const isDown = pack.status === "downloading";
          return (
            <div key={i} className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                  <Icon path={Icons.globe} size={20} color="#475569" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-[#0F172A] truncate">{pack.name}</p>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: statusColor[st] + "15", color: statusColor[st] }}>
                      {statusLabel[st]}
                    </span>
                  </div>
                  <p className="font-arabic text-[10px] text-[#94A3B8] rtl">{pack.nameUg}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-[#94A3B8]">{pack.size} · 更新 {pack.updated}</span>
                    {isDown ? (
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                          <div className="h-full bg-[#D97706] rounded-full animate-pulse" style={{ width: "60%" }} />
                        </div>
                        <span className="text-[10px] text-[#D97706]">60%</span>
                      </div>
                    ) : pack.status === "available" ? (
                      <button onClick={() => toggleDownload(pack.name)}
                        className="flex items-center gap-1 text-[10px] font-semibold text-[#2563EB]">
                        <Icon path={Icons.download} size={12} color="#2563EB" />
                        下载
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 text-[10px] text-[#0D9488]">
                        <Icon path={Icons.check_circle} size={12} color="#0D9488" />
                        就绪
                      </div>
                    )}
                  </div>
                  {isDown && (
                    <div className="mt-2 h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-full animate-pulse" style={{ width: "60%" }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Storage info */}
        <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0]">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-[#0F172A]">存储空间</p>
            <span className="text-xs text-[#94A3B8]">2.18 GB / 16 GB</span>
          </div>
          <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full" style={{ width: "14%" }} />
          </div>
          <p className="font-arabic text-[10px] text-[#94A3B8] rtl mt-1.5">ساقلىغۇچ بوشلۇقى</p>
        </div>
      </div>
    </div>
  );
}

// ─── S3: OCR Result ───────────────────────────────────────────────────────────

function OcrResultScreen() {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const regions = [
    { id: 0, ug: "مەكتەپ كىتابخانىسى", zh: "学校图书馆", confidence: 98, x: "15%", y: "18%", w: "70%", h: "14%" },
    { id: 1, ug: "كىرىش ئىشىكى", zh: "入口", confidence: 95, x: "30%", y: "42%", w: "40%", h: "10%" },
    { id: 2, ug: "ئوقۇغۇچىلار ئۈچۈن", zh: "仅限学生", confidence: 87, x: "20%", y: "62%", w: "60%", h: "10%" },
  ];

  const sel = selectedRegion !== null ? regions[selectedRegion] : null;

  return (
    <div className="flex flex-col h-full bg-[#0F172A]">
      {/* Image preview with overlay */}
      <div className="relative bg-[#1E293B] flex-shrink-0" style={{ height: "45%" }}>
        {/* Simulated image */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#334155] to-[#1E293B] flex items-center justify-center">
          {/* Architectural mock */}
          <div className="w-full h-full relative opacity-60">
            <div className="absolute inset-x-8 top-8 bottom-16 bg-[#475569] rounded-lg" />
            <div className="absolute inset-x-16 top-16 bottom-24 bg-[#334155] rounded" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-12 bg-[#475569]" />
          </div>
        </div>
        {/* Image label */}
        <div className="absolute top-3 left-3">
          <div className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm">
            <span className="text-white text-[10px] font-semibold">扫描图像 · سىكان رەسىمى</span>
          </div>
        </div>
        {/* Detected text regions overlay */}
        {regions.map(r => (
          <button key={r.id} onClick={() => setSelectedRegion(r.id)}
            className="absolute rounded border-2 transition-all"
            style={{
              left: r.x, top: r.y, width: r.w, height: r.h,
              borderColor: selectedRegion === r.id ? "#2563EB" : "#34D399",
              background: selectedRegion === r.id ? "rgba(37,99,235,0.2)" : "rgba(52,211,153,0.1)",
            }}>
            <span className="absolute -top-4 left-0 text-[9px] font-bold px-1 rounded"
              style={{ background: selectedRegion === r.id ? "#2563EB" : "#10B981", color: "white" }}>
              {r.confidence}%
            </span>
          </button>
        ))}
        {/* Retake button */}
        <button className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-sm flex items-center gap-1.5">
          <Icon path={Icons.camera} size={14} color="white" />
          <span className="text-white text-xs">重拍</span>
        </button>
      </div>

      {/* Results panel */}
      <div className="flex-1 bg-white rounded-t-3xl overflow-y-auto no-scrollbar">
        <div className="px-4 pt-4 pb-3 border-b border-[#F1F5F9]">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-bold text-[#0F172A]">识别结果</p>
            <Badge color="teal">{regions.length} 个文本区域</Badge>
          </div>
          <p className="font-arabic text-[10px] text-[#94A3B8] rtl">بايقالغان مەتىن رايونلىرى</p>
        </div>

        <div className="px-4 py-3 flex flex-col gap-3">
          {/* Region selector */}
          <div className="flex gap-2">
            {regions.map(r => (
              <button key={r.id} onClick={() => setSelectedRegion(r.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedRegion === r.id ? "bg-[#2563EB] text-white" : "bg-[#F1F5F9] text-[#475569]"
                }`}>区域 {r.id + 1}</button>
            ))}
          </div>

          {sel && (
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-3">
                <Badge color="blue">维吾尔语原文</Badge>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                  <span className="text-[10px] text-[#0D9488] font-semibold">置信度 {sel.confidence}%</span>
                </div>
              </div>
              <p className="font-arabic text-lg text-[#0F172A] rtl leading-relaxed mb-3">{sel.ug}</p>
              <div className="border-t border-[#E2E8F0] pt-3">
                <Badge color="teal">中文翻译</Badge>
                <p className="font-chinese text-lg font-medium text-[#0F172A] mt-2">{sel.zh}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Icons.copy, label: copied ? "已复制" : "复制", color: "#2563EB", action: () => { setCopied(true); setTimeout(() => setCopied(false), 2000); } },
              { icon: Icons.share, label: "分享", color: "#0D9488", action: () => {} },
              { icon: Icons.star, label: "收藏", color: "#D97706", action: () => {} },
              { icon: Icons.translate, label: "全文翻", color: "#7C3AED", action: () => {} },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-[#E2E8F0] shadow-sm">
                <Icon path={btn.icon} size={18} color={btn.color} />
                <span className="text-[10px] font-medium text-[#475569]">{btn.label}</span>
              </button>
            ))}
          </div>

          {/* All regions list */}
          <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mt-1">全部识别文字</p>
          {regions.map(r => (
            <button key={r.id} onClick={() => setSelectedRegion(r.id)}
              className={`w-full p-3 rounded-xl border text-left transition-all ${
                selectedRegion === r.id ? "border-[#BFDBFE] bg-[#EFF6FF]" : "border-[#E2E8F0] bg-white"
              }`}>
              <p className="font-arabic text-sm text-[#0F172A] rtl">{r.ug}</p>
              <p className="font-chinese text-xs text-[#475569] mt-0.5">{r.zh}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── S4: Translation Detail ───────────────────────────────────────────────────

function TranslationDetailScreen() {
  const [favd, setFavd] = useState(false);
  const [copied, setCopied] = useState(false);

  const item = HISTORY[0];
  const confidence = 97;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-y-auto no-scrollbar">
      {/* Source text card */}
      <div className="mx-4 mt-3 p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <Badge color="blue">维吾尔语 · ئۇيغۇرچە</Badge>
          <button className="p-1.5 rounded-lg bg-[#F1F5F9]">
            <Icon path={Icons.volume} size={16} color="#2563EB" />
          </button>
        </div>
        <p className="font-arabic text-xl text-[#0F172A] rtl leading-relaxed">{item.ug}</p>
        {/* Pronunciation hint */}
        <p className="font-arabic text-xs text-[#94A3B8] rtl mt-2 leading-relaxed">
          [mæn ɵjgæ qɑjtimæn]
        </p>
      </div>

      {/* Confidence meter */}
      <div className="mx-4 mt-3 p-3 rounded-xl bg-white border border-[#E2E8F0] flex items-center gap-3">
        <div className="flex-1">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs text-[#475569] font-medium">翻译置信度</span>
            <span className="text-xs font-bold text-[#0D9488]">{confidence}%</span>
          </div>
          <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#0D9488] to-[#14B8A6]" style={{ width: `${confidence}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F0FDFA]">
          <Icon path={Icons.check_circle} size={14} color="#0D9488" />
          <span className="text-[10px] font-semibold text-[#0D9488]">高</span>
        </div>
      </div>

      {/* Translation card */}
      <div className="mx-4 mt-3 p-4 rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-[#BFDBFE] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <Badge color="teal">中文译文</Badge>
          <div className="flex items-center gap-1.5">
            <Badge color="gray">AI</Badge>
            <Badge color="gray">v2.1</Badge>
          </div>
        </div>
        <p className="font-chinese text-2xl font-medium text-[#0F172A] leading-relaxed">{item.zh}</p>
        {/* Pinyin */}
        <p className="text-sm text-[#475569] italic mt-1.5">wǒ yào huí jiā le</p>
        <button className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 border border-[#BFDBFE]">
          <Icon path={Icons.volume} size={14} color="#2563EB" />
          <span className="text-xs font-medium text-[#2563EB]">朗读中文</span>
        </button>
      </div>

      {/* Alternative translations */}
      <div className="mx-4 mt-3 p-4 rounded-2xl bg-white border border-[#E2E8F0]">
        <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">备选译文</p>
        {["我要回家了", "我得回家了", "我想回家"].map((alt, i) => (
          <div key={i} className={`flex items-center gap-3 py-2.5 ${i > 0 ? "border-t border-[#F1F5F9]" : ""}`}>
            <div className="w-5 h-5 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[10px] font-bold text-[#94A3B8]">
              {i + 1}
            </div>
            <p className="font-chinese text-sm text-[#0F172A] flex-1">{alt}</p>
            <button className="p-1"><Icon path={Icons.copy} size={14} color="#94A3B8" /></button>
          </div>
        ))}
      </div>

      {/* Action bar */}
      <div className="mx-4 mt-3 mb-3 grid grid-cols-4 gap-2">
        {[
          { icon: Icons.copy, label: copied ? "已复制" : "复制", color: "#2563EB", action: () => { setCopied(true); setTimeout(() => setCopied(false), 2000); } },
          { icon: Icons.star, label: favd ? "已收藏" : "收藏", color: "#D97706", action: () => setFavd(v => !v), active: favd },
          { icon: Icons.share, label: "分享", color: "#0D9488", action: () => {} },
          { icon: Icons.history, label: "历史", color: "#7C3AED", action: () => {} },
        ].map((btn, i) => (
          <button key={i} onClick={btn.action}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border shadow-sm ${
              btn.active ? "bg-[#FFFBEB] border-[#FDE68A]" : "bg-white border-[#E2E8F0]"
            }`}>
            <Icon path={btn.icon} size={18} color={btn.color} filled={btn.active} />
            <span className="text-[10px] font-medium text-[#475569]">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── S5: Favorites ────────────────────────────────────────────────────────────

function FavoritesScreen() {
  const [items, setItems] = useState(FAVORITES);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [query, setQuery] = useState("");

  const categories = ["全部", "日常", "礼仪", "购物", "紧急", "学习", "商业"];

  const filtered = items.filter(f =>
    (activeCategory === "全部" || f.category === activeCategory) &&
    (!query || f.ug.includes(query) || f.zh.includes(query))
  );

  function remove(id: number) {
    setItems(prev => prev.filter(f => f.id !== id));
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Search */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-3 flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-[#F1F5F9] rounded-xl px-3 py-2.5">
          <Icon path={Icons.search} size={18} color="#94A3B8" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="搜索收藏... ساقلانغانلارنى ئىزدەڭ"
            className="flex-1 bg-transparent text-sm outline-none text-[#0F172A] placeholder:text-[#94A3B8]" />
        </div>
        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === c ? "bg-[#2563EB] text-white" : "bg-[#F1F5F9] text-[#475569]"
              }`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <EmptyState icon={Icons.star} label="暂无收藏" sub="ساقلانغان تەرجىمە يوق" />
        ) : (
          <>
            <p className="text-xs text-[#94A3B8]">{filtered.length} 条收藏 · {filtered.length} ساقلانغان</p>
            {filtered.map(f => (
              <div key={f.id} className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge color={
                      f.category === "紧急" ? "gold" : f.category === "学习" ? "teal" : "gray"
                    }>{f.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#94A3B8]">{f.time}</span>
                    <button onClick={() => remove(f.id)}>
                      <Icon path={Icons.trash} size={14} color="#CBD5E1" />
                    </button>
                  </div>
                </div>
                <p className="font-arabic text-base text-[#0F172A] rtl leading-relaxed">{f.ug}</p>
                <div className="my-2 border-t border-[#F1F5F9]" />
                <p className="font-chinese text-sm text-[#475569]">{f.zh}</p>
                <div className="flex gap-3 mt-2.5 pt-2 border-t border-[#F1F5F9]">
                  {[Icons.volume, Icons.copy, Icons.share].map((icon, i) => (
                    <button key={i} className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
                      <Icon path={icon} size={14} color="#94A3B8" />
                      {["朗读", "复制", "分享"][i]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ─── S6: Vocab Flashcard ──────────────────────────────────────────────────────

function VocabFlashcardScreen() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [mastered, setMastered] = useState<boolean[]>(FLASHCARDS.map(f => f.mastered));

  const card = FLASHCARDS[index];
  const total = FLASHCARDS.length;
  const masteredCount = mastered.filter(Boolean).length;

  function next(wasMastered: boolean) {
    setMastered(prev => { const n = [...prev]; n[index] = wasMastered; return n; });
    setRevealed(false);
    setIndex(i => (i + 1) % total);
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Progress */}
      <div className="px-4 pt-3 pb-2 bg-white border-b border-[#E2E8F0]">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-[#94A3B8]">卡片 {index + 1} / {total}</span>
          <span className="text-xs font-semibold text-[#0D9488]">已掌握 {masteredCount}/{total}</span>
        </div>
        <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#0D9488] to-[#14B8A6] rounded-full transition-all"
            style={{ width: `${((index) / total) * 100}%` }} />
        </div>
        <div className="flex gap-1 mt-2">
          {FLASHCARDS.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full transition-colors"
              style={{ background: mastered[i] ? "#0D9488" : i === index ? "#2563EB" : "#E2E8F0" }} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between px-4 py-4">
        {/* Flashcard */}
        <div className="w-full flex-1 flex flex-col">
          {/* Front: Uyghur */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-lg shadow-slate-100 mb-4">
            <Badge color={card.level === 1 ? "teal" : "gold"}>
              {card.level === 1 ? "基础" : "中级"}
            </Badge>
            <p className="font-arabic text-4xl text-[#0F172A] rtl leading-relaxed mt-4 mb-2 text-center">
              {card.ug}
            </p>
            <p className="font-arabic text-sm text-[#94A3B8] rtl text-center leading-relaxed">
              {card.example_ug}
            </p>
            <button className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]">
              <Icon path={Icons.volume} size={16} color="#2563EB" />
              <span className="text-xs font-medium text-[#2563EB]">维吾尔语发音</span>
            </button>
          </div>

          {/* Revealed answer */}
          {revealed ? (
            <div className="p-5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Badge color="blue">中文</Badge>
                <Badge color="gray">{card.pinyin}</Badge>
              </div>
              <p className="font-chinese text-3xl font-medium text-[#0F172A]">{card.zh}</p>
              <p className="font-chinese text-sm text-[#475569] mt-1">{card.example_zh}</p>
              <button className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#BFDBFE]">
                <Icon path={Icons.volume} size={14} color="#2563EB" />
                <span className="text-xs text-[#2563EB]">普通话发音</span>
              </button>
            </div>
          ) : (
            <button onClick={() => setRevealed(true)}
              className="w-full py-4 rounded-2xl border-2 border-dashed border-[#BFDBFE] bg-[#F8FAFC] flex items-center justify-center gap-2 text-[#2563EB] font-semibold">
              <Icon path={Icons.info} size={18} color="#2563EB" />
              点击查看中文翻译
            </button>
          )}
        </div>

        {/* Action buttons */}
        {revealed && (
          <div className="flex gap-3 w-full mt-4">
            <button onClick={() => next(false)}
              className="flex-1 py-3.5 rounded-2xl border-2 border-[#FCA5A5] bg-[#FFF1F2] text-[#DC2626] font-semibold text-sm flex items-center justify-center gap-2">
              <Icon path={Icons.x} size={16} color="#DC2626" />
              再练习
            </button>
            <button onClick={() => next(true)}
              className="flex-1 py-3.5 rounded-2xl bg-[#0D9488] text-white font-semibold text-sm shadow-lg shadow-teal-200 flex items-center justify-center gap-2">
              <Icon path={Icons.check} size={16} color="white" />
              已掌握
            </button>
          </div>
        )}
        {!revealed && (
          <button onClick={() => next(false)}
            className="mt-3 text-xs text-[#94A3B8] underline underline-offset-2">
            跳过此卡片
          </button>
        )}
      </div>
    </div>
  );
}

// ─── S7: Phrase Library ───────────────────────────────────────────────────────

function PhraseLibraryScreen() {
  const [activeCategory, setActiveCategory] = useState("travel");
  const [expandedPhrase, setExpandedPhrase] = useState<number | null>(null);

  const cat = PHRASE_CATEGORIES.find(c => c.id === activeCategory)!;

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Category grid */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-3">
        <div className="grid grid-cols-4 gap-2">
          {PHRASE_CATEGORIES.map(c => {
            const active = activeCategory === c.id;
            return (
              <button key={c.id} onClick={() => setActiveCategory(c.id)}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all ${
                  active ? "border-transparent shadow-sm" : "border-[#E2E8F0] bg-white"
                }`}
                style={active ? { background: c.bg, borderColor: c.color + "40" } : {}}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: active ? c.color : "#F1F5F9" }}>
                  <Icon path={c.icon} size={16} color={active ? "white" : "#94A3B8"} />
                </div>
                <span className="text-[10px] font-semibold" style={{ color: active ? c.color : "#94A3B8" }}>
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category header */}
      <div className="px-4 pt-3 pb-1 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: cat.color }}>
          <Icon path={cat.icon} size={16} color="white" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#0F172A]">{cat.label} · <span className="font-arabic">{cat.labelUg}</span></p>
          <p className="text-[10px] text-[#94A3B8]">{cat.phrases.length} 个实用短语</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-2 flex flex-col gap-2.5">
        {cat.phrases.map((p, i) => {
          const expanded = expandedPhrase === i;
          return (
            <div key={i} className="rounded-2xl bg-white border border-[#E2E8F0] shadow-sm overflow-hidden">
              <button onClick={() => setExpandedPhrase(expanded ? null : i)}
                className="w-full p-4 text-left">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-arabic text-base text-[#0F172A] rtl leading-relaxed">{p.ug}</p>
                    <p className="font-chinese text-sm text-[#475569] mt-1">{p.zh}</p>
                  </div>
                  <Icon path={Icons.chevron_right} size={16} color="#94A3B8"
                    />
                </div>
              </button>
              {expanded && (
                <div className="px-4 pb-4 pt-0 border-t border-[#F1F5F9]">
                  <div className="flex items-center gap-2 py-2">
                    <span className="text-xs text-[#94A3B8]">拼音：</span>
                    <span className="text-sm font-medium text-[#475569] italic">{p.pinyin}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFF6FF] text-[#2563EB] text-xs font-medium">
                      <Icon path={Icons.volume} size={14} color="#2563EB" />
                      发音
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F1F5F9] text-[#475569] text-xs font-medium">
                      <Icon path={Icons.copy} size={14} color="#475569" />
                      复制
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFBEB] text-[#D97706] text-xs font-medium">
                      <Icon path={Icons.star} size={14} color="#D97706" />
                      收藏
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty callout for more */}
        <div className="p-4 rounded-2xl border border-dashed border-[#E2E8F0] flex items-center gap-3 mt-1">
          <div className="w-8 h-8 rounded-xl bg-[#F1F5F9] flex items-center justify-center">
            <Icon path={Icons.zap} size={16} color="#94A3B8" />
          </div>
          <div>
            <p className="text-xs font-medium text-[#475569]">更多短语即将推出</p>
            <p className="font-arabic text-[10px] text-[#94A3B8] rtl">يەنە كۆپ ئىبارەلەر كىلىدۇ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── S8: Advanced Settings ────────────────────────────────────────────────────

function AdvancedSettingsScreen() {
  const [offline, setOffline] = useState(true);
  const [autoDetect, setAutoDetect] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [rtlLayout, setRtlLayout] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [fontSize, setFontSize] = useState(2);
  const [voiceSpeed, setVoiceSpeed] = useState(2);

  const fontLabels = ["小", "中", "大", "超大"];
  const speedLabels = ["慢", "正常", "快", "更快"];

  function SettingRow({ label, sub, right }: { label: string; sub: string; right: React.ReactNode }) {
    return (
      <div className="flex items-center justify-between px-4 py-3.5 border-t border-[#F1F5F9] first:border-t-0">
        <div className="flex-1 mr-4">
          <p className="text-sm font-medium text-[#0F172A]">{label}</p>
          <p className="text-xs text-[#94A3B8] font-arabic">{sub}</p>
        </div>
        {right}
      </div>
    );
  }

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        <p className="text-xs font-semibold text-[#94A3B8] uppercase px-4 pt-3 pb-1.5 tracking-wider">{title}</p>
        {children}
      </div>
    );
  }

  function StepSelector({ value, labels, onChange, color }: { value: number; labels: string[]; onChange: (v: number) => void; color: string }) {
    return (
      <div className="flex gap-1">
        {labels.map((l, i) => (
          <button key={i} onClick={() => onChange(i)}
            className="w-8 h-7 rounded-lg text-[10px] font-bold transition-all"
            style={value === i ? { background: color, color: "white" } : { background: "#F1F5F9", color: "#94A3B8" }}>
            {l}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-y-auto no-scrollbar">
      {/* Profile card */}
      <div className="mx-4 mt-3 p-4 rounded-2xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] shadow-lg shadow-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <span className="text-white text-lg font-bold">K</span>
          </div>
          <div>
            <p className="text-white font-bold">KAMRAN AI</p>
            <p className="text-blue-200 text-xs">已登录 · 高级版</p>
            <p className="font-arabic text-blue-200 text-[10px] rtl">كىرگەن · ئىلغار نۇسخا</p>
          </div>
          <div className="ml-auto">
            <div className="px-2.5 py-1 rounded-full bg-[#D97706]">
              <span className="text-white text-[10px] font-bold">PRO</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "翻译次数", value: "1,247" },
            { label: "收藏", value: "86" },
            { label: "学习词汇", value: "342" },
          ].map(s => (
            <div key={s.label} className="bg-white/15 rounded-xl p-2 text-center">
              <p className="text-white font-bold text-sm">{s.value}</p>
              <p className="text-blue-200 text-[10px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 flex flex-col gap-3">
        {/* Language */}
        <Section title="语言与翻译 · تىل ۋە تەرجىمە">
          <SettingRow label="界面语言" sub="ئىنتېرفەيس تىلى" right={
            <div className="flex items-center gap-1.5 text-xs text-[#2563EB] font-semibold">
              维吾尔语 <Icon path={Icons.chevron_right} size={14} color="#2563EB" />
            </div>
          } />
          <SettingRow label="默认方向" sub="كۆڭۈلدىكى يۆنىلىش" right={
            <div className="flex items-center gap-1.5 text-xs text-[#475569]">
              维→汉 <Icon path={Icons.chevron_right} size={14} color="#94A3B8" />
            </div>
          } />
          <SettingRow label="自动检测语言" sub="ئاپتوماتىك تونۇش" right={<Toggle on={autoDetect} onChange={() => setAutoDetect(v => !v)} />} />
          <SettingRow label="RTL 布局" sub="ئوڭدىن سولغا تىل" right={<Toggle on={rtlLayout} onChange={() => setRtlLayout(v => !v)} />} />
        </Section>

        {/* Display */}
        <Section title="显示与无障碍 · كۆرسىتىش">
          <SettingRow label="深色模式" sub="قاراڭغۇ ھالەت" right={<Toggle on={darkMode} onChange={() => setDarkMode(v => !v)} />} />
          <SettingRow label="字体大小" sub="يېزىق چوڭلۇقى"
            right={<StepSelector value={fontSize} labels={fontLabels} onChange={setFontSize} color="#2563EB" />} />
        </Section>

        {/* Voice */}
        <Section title="语音与速度 · ئاۋاز">
          <SettingRow label="语音速度" sub="ئاۋاز تېزلىكى"
            right={<StepSelector value={voiceSpeed} labels={speedLabels} onChange={setVoiceSpeed} color="#0D9488" />} />
          <SettingRow label="语音引擎" sub="ئاۋاز دۆلىتى" right={
            <div className="flex items-center gap-1.5 text-xs text-[#475569]">
              KAMRAN TTS <Icon path={Icons.chevron_right} size={14} color="#94A3B8" />
            </div>
          } />
        </Section>

        {/* Privacy */}
        <Section title="隐私与数据 · مەخپىيەتلىك">
          <SettingRow label="保存翻译历史" sub="تەرجىمە تارىخى" right={<Toggle on={saveHistory} onChange={() => setSaveHistory(v => !v)} />} />
          <SettingRow label="离线模式" sub="توركەلمىسىز ھالەت" right={<Toggle on={offline} onChange={() => setOffline(v => !v)} />} />
          <SettingRow label="清除历史记录" sub="تارىخنى تازىلاش" right={
            <button className="text-xs font-semibold text-red-500">清除</button>
          } />
        </Section>

        {/* Account */}
        <Section title="账户 · ھېسابات">
          {["修改密码", "通知设置", "联系支持", "退出登录"].map((label, i) => (
            <SettingRow key={i} label={label} sub={["ئىم ئۆزگەرتىش", "ئۇقتۇرۇش", "قوللاش", "چىقىش"][i]}
              right={<Icon path={i === 3 ? Icons.arrow_left : Icons.chevron_right} size={16}
                color={i === 3 ? "#EF4444" : "#94A3B8"} />} />
          ))}
        </Section>

        <p className="text-center text-[10px] text-[#CBD5E1] pb-2">KAMRAN v2.2.0 · كامران · 卡姆兰</p>
      </div>
    </div>
  );
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────

function PhoneFrame({ children, label, active, onClick }: {
  children: React.ReactNode; label: string; active?: boolean; onClick?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 cursor-pointer" onClick={onClick}>
      <div className={`relative rounded-[3rem] border-[6px] shadow-2xl transition-all duration-300 ${
        active ? "border-[#2563EB] shadow-blue-300/40 scale-102" : "border-[#1E293B] shadow-slate-900/30"
      }`} style={{ width: 290, height: 580 }}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#1E293B] rounded-b-2xl z-10 flex items-center justify-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#374151]" />
          <div className="w-6 h-1.5 rounded-full bg-[#374151]" />
        </div>
        {/* Side buttons */}
        <div className="absolute -right-2.5 top-24 w-1.5 h-10 bg-[#1E293B] rounded-r-sm" />
        <div className="absolute -left-2.5 top-20 w-1.5 h-8 bg-[#1E293B] rounded-l-sm" />
        <div className="absolute -left-2.5 top-32 w-1.5 h-8 bg-[#1E293B] rounded-l-sm" />
        {/* Screen */}
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-[#F8FAFC]">
          {children}
        </div>
      </div>
      <span className={`text-xs font-semibold ${active ? "text-[#2563EB]" : "text-[#94A3B8]"}`}>{label}</span>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

function MobileApp() {
  const [tab, setTab] = useState("home");
  const [onboarded, setOnboarded] = useState(false);

  if (!onboarded) {
    return (
      <div className="flex flex-col h-full bg-white">
        <StatusBar />
        <div className="flex-1 overflow-hidden">
          <OnboardingScreen onDone={() => setOnboarded(true)} />
        </div>
      </div>
    );
  }

  const screenLabels: Record<string, string> = {
    home: "主页", translate: "文字翻译", voice: "语音翻译", camera: "拍照翻译",
    history: "历史", learn: "学习", settings: "设置",
    conversation: "对话模式", offline: "离线模式", ocr_result: "OCR 结果",
    detail: "翻译详情", favorites: "我的收藏", flashcard: "词汇练习",
    phrases: "短语库", adv_settings: "设置"
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Status + Header */}
      <StatusBar />
      <div className="flex items-center gap-3 px-4 py-2 border-b border-[#E2E8F0] bg-white">
        {(tab === "voice" || tab === "camera") && (
          <button onClick={() => setTab("translate")} className="p-1.5 -ml-1">
            <Icon path={Icons.arrow_left} size={20} color="#0F172A" />
          </button>
        )}
        <h2 className="text-base font-bold text-[#0F172A] flex-1">{screenLabels[tab]}</h2>
        {tab === "translate" && (
          <div className="flex gap-2">
            <button onClick={() => setTab("voice")}
              className="p-2 rounded-xl bg-[#F0FDFA] flex items-center justify-center">
              <Icon path={Icons.mic} size={18} color="#0D9488" />
            </button>
            <button onClick={() => setTab("camera")}
              className="p-2 rounded-xl bg-[#FFFBEB] flex items-center justify-center">
              <Icon path={Icons.camera} size={18} color="#D97706" />
            </button>
          </div>
        )}
      </div>

      {/* Screen content */}
      <div className="flex-1 overflow-hidden">
        {tab === "home" && <HomeScreen setTab={setTab} />}
        {tab === "translate" && <TextTranslateScreen />}
        {tab === "voice" && <VoiceTranslateScreen />}
        {tab === "camera" && <CameraScreen />}
        {tab === "history" && <HistoryScreen />}
        {tab === "learn" && <LearnScreen />}
        {tab === "settings" && <SettingsScreen />}
        {tab === "conversation" && <ConversationScreen />}
        {tab === "offline" && <OfflineModeScreen />}
        {tab === "ocr_result" && <OcrResultScreen />}
        {tab === "detail" && <TranslationDetailScreen />}
        {tab === "favorites" && <FavoritesScreen />}
        {tab === "flashcard" && <VocabFlashcardScreen />}
        {tab === "phrases" && <PhraseLibraryScreen />}
        {tab === "adv_settings" && <AdvancedSettingsScreen />}
      </div>

      {/* Tab bar */}
      {tab !== "voice" && tab !== "camera" && (
        <TabBar active={["home","translate","history","learn","settings"].includes(tab) ? tab : "translate"}
          onChange={setTab} />
      )}
    </div>
  );
}

// ─── Gallery / Overview ───────────────────────────────────────────────────────

export default function App() {
  const [activeScreen, setActiveScreen] = useState<string | null>(null);
  const [view, setView] = useState<"gallery"|"app">("gallery");

  if (view === "app") {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#F1F5F9]">
        <div className="relative rounded-[3rem] border-[6px] border-[#1E293B] shadow-2xl shadow-slate-900/40 overflow-hidden"
          style={{ width: 390, height: 844 }}>
          <MobileApp />
        </div>
        <button onClick={() => setView("gallery")}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-md border border-[#E2E8F0] text-sm font-medium text-[#475569]">
          <Icon path={Icons.arrow_left} size={16} color="#475569" />
          所有屏幕
        </button>
      </div>
    );
  }

  const screens1 = [
    { id: "onboarding", label: "启动页", component: <OnboardingScreen onDone={() => {}} /> },
    { id: "home", label: "主页", component: <ScreenWithNav tab="home"><HomeScreen setTab={() => {}} /></ScreenWithNav> },
    { id: "translate", label: "文字翻译", component: <ScreenWithNav tab="translate"><TextTranslateScreen /></ScreenWithNav> },
    { id: "voice", label: "语音翻译", component: <ScreenWithNav tab="translate" noTabBar><VoiceTranslateScreen /></ScreenWithNav> },
    { id: "camera", label: "拍照翻译", component: <ScreenWithNav tab="translate" noTabBar><CameraScreen /></ScreenWithNav> },
    { id: "history", label: "历史记录", component: <ScreenWithNav tab="history"><HistoryScreen /></ScreenWithNav> },
    { id: "learn", label: "学习", component: <ScreenWithNav tab="learn"><LearnScreen /></ScreenWithNav> },
  ];

  const screens2 = [
    { id: "conversation", label: "对话模式", component: <ScreenWithNav tab="translate" noTabBar><ConversationScreen /></ScreenWithNav> },
    { id: "offline", label: "离线模式", component: <ScreenWithNav tab="settings" label="离线模式"><OfflineModeScreen /></ScreenWithNav> },
    { id: "ocr_result", label: "OCR 结果", component: <ScreenWithNav tab="translate" noTabBar><OcrResultScreen /></ScreenWithNav> },
    { id: "detail", label: "翻译详情", component: <ScreenWithNav tab="translate" noTabBar><TranslationDetailScreen /></ScreenWithNav> },
    { id: "favorites", label: "我的收藏", component: <ScreenWithNav tab="history"><FavoritesScreen /></ScreenWithNav> },
    { id: "flashcard", label: "词汇练习", component: <ScreenWithNav tab="learn"><VocabFlashcardScreen /></ScreenWithNav> },
    { id: "phrases", label: "短语库", component: <ScreenWithNav tab="learn"><PhraseLibraryScreen /></ScreenWithNav> },
    { id: "adv_settings", label: "高级设置", component: <AdvancedSettingsScreen /> },
  ];

  function GalleryRow({ screens, label }: { screens: typeof screens1; label: string }) {
    return (
      <div className="max-w-[1400px] mx-auto mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-[#E2E8F0]" />
          <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-widest">{label}</span>
          <div className="h-px flex-1 bg-[#E2E8F0]" />
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {screens.map(s => (
            <PhoneFrame key={s.id} label={s.label} active={activeScreen === s.id}
              onClick={() => { setActiveScreen(s.id); setView("app"); }}>
              <div className="flex flex-col h-full">
                <StatusBar />
                <div className="flex-1 overflow-hidden pointer-events-none">
                  {s.component}
                </div>
              </div>
            </PhoneFrame>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#F0FDFA] p-8">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-white text-sm font-arabic font-bold">كامران</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">KAMRAN</h1>
            <p className="text-[#475569] text-sm">AI-Powered Uyghur–Chinese Translator · ئۇيغۇرچە-خەنزۇچە AI تەرجىمان</p>
          </div>
          <div className="ml-auto flex gap-2 flex-wrap justify-end">
            <Badge color="blue">iOS / Android</Badge>
            <Badge color="teal">RTL 支持</Badge>
            <Badge color="gold">离线可用</Badge>
            <Badge color="gray">15 个屏幕</Badge>
          </div>
        </div>
        <p className="text-[#94A3B8] text-xs mt-2">点击任意屏幕进入交互预览 · Click any screen to interact</p>
      </div>

      {/* Screen rows */}
      <GalleryRow screens={screens1} label="第一组 · 核心功能" />
      <GalleryRow screens={screens2} label="第二组 · 高级功能" />

      {/* Design system legend */}
      <div className="max-w-[1400px] mx-auto mt-10 p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm">
        <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">设计系统</p>
        <div className="flex flex-wrap gap-6">
          {[
            { label: "主色", color: "#2563EB", name: "Primary Blue" },
            { label: "金色", color: "#D97706", name: "Uyghur Gold" },
            { label: "青色", color: "#0D9488", name: "Teal Accent" },
            { label: "文字", color: "#0F172A", name: "Foreground" },
            { label: "次级", color: "#475569", name: "Secondary" },
            { label: "弱化", color: "#94A3B8", name: "Muted" },
          ].map(c => (
            <div key={c.label} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg shadow-sm border border-black/5" style={{ background: c.color }} />
              <div>
                <p className="text-xs font-semibold text-[#0F172A]">{c.label}</p>
                <p className="text-[10px] text-[#94A3B8]">{c.name}</p>
              </div>
            </div>
          ))}
          <div className="ml-auto flex gap-6 items-center">
            <div>
              <p className="text-xs font-semibold text-[#0F172A] mb-1">字体</p>
              <p className="text-xs text-[#475569]">Inter · Noto Kufi Arabic · Noto Sans SC</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0F172A] mb-1">圆角</p>
              <p className="text-xs text-[#475569]">8pt Grid · 16px 圆角</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper: wrap screen with nav chrome
function ScreenWithNav({ children, tab, noTabBar, label }: {
  children: React.ReactNode; tab: string; noTabBar?: boolean; label?: string;
}) {
  const labels: Record<string, string> = {
    home: "主页", translate: "翻译", history: "历史", learn: "学习", settings: "设置"
  };
  const title = label || labels[tab] || "翻译";
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-2 border-b border-[#E2E8F0] bg-white">
        <h2 className="text-base font-bold text-[#0F172A] flex-1">{title}</h2>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
      {!noTabBar && (
        <div className="flex border-t border-[#E2E8F0] bg-white pt-2 pb-2">
          {[
            { id: "home", label: "主页", icon: Icons.home },
            { id: "translate", label: "翻译", icon: Icons.translate },
            { id: "history", label: "历史", icon: Icons.history },
            { id: "learn", label: "学习", icon: Icons.learn },
            { id: "settings", label: "设置", icon: Icons.settings },
          ].map(t => {
            const isActive = tab === t.id;
            return (
              <div key={t.id} className="flex-1 flex flex-col items-center gap-0.5 py-1"
                style={{ color: isActive ? "#2563EB" : "#94A3B8" }}>
                <Icon path={t.icon} size={20} color={isActive ? "#2563EB" : "#94A3B8"} />
                <span className="text-[10px] font-medium">{t.label}</span>
                {isActive && <div className="w-1 h-1 rounded-full bg-[#2563EB]" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
