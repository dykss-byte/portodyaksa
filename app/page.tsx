"use client";

import { useState, useEffect } from "react";
import {
  WoodyFigure,
  BuzzFigure,
  AlienFigure,
  SlinkyFigure,
  ArmyManFigure,
  RexFigure,
  HammFigure,
  RCFigure,
  PixarBall,
  ForkyFigure,
  WheezyFigure,
  ParatrooperFigure,
} from "./components/ToyStoryArt";

// --- AUDIO SYNTHESIZER (Cartoon & Pixar Web Audio API) ---
class ToyStorySoundSynth {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1150, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  playLaser() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1850, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {}
  }

  playExplosion() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      // 1. Noise blast buffer for realistic cartoon "KABOOM!"
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.45);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      // Filter sweep to create deep cartoon explosion rumble
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3400, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(65, this.ctx.currentTime + 0.42);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.55, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.42);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      whiteNoise.start();

      // 2. Sub-bass punch (175Hz -> 20Hz)
      const osc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(175, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(22, this.ctx.currentTime + 0.4);
      subGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(subGain);
      subGain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch {}
  }

  playCartoonBoing() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(950, this.ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.34);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.34);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.34);
    } catch {}
  }

  playAlienOoh() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const freqs = [440, 554, 659, 880, 1108];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);
        gain.gain.setValueAtTime(0.14, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.18);
      });
    } catch {}
  }

  playSlinkyBoing() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(850, this.ctx.currentTime + 0.13);
      osc.frequency.exponentialRampToValueAtTime(280, this.ctx.currentTime + 0.32);
      gain.gain.setValueAtTime(0.24, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.32);
    } catch {}
  }

  playCoinDrop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1046.5, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1396.91, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.24);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.24);
    } catch {}
  }

  playPullStringFanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [392, 523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + i * 0.05);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.05 + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.05);
        osc.stop(this.ctx.currentTime + i * 0.05 + 0.16);
      });
    } catch {}
  }
}

const sfx = new ToyStorySoundSynth();

// --- DATA DEFINITIONS WITH ORIGINAL CHARACTER ART ---
const TOY_ROLES = [
  "To Infinity and Beyond! (Frontend Engineer)",
  "Sheriff Dyaksa @ SMKN 1 Jenangan (RPL)",
  "Pehobi Bersepeda & Fotografer Ponorogo 🚲📷",
  "Pencinta Jalan-Jalan & Penjelajah Sudut Kota 🎒",
  "Es Teh Manis Jumbo Lover di Ponorogo 🧋",
];

const TOY_CHARACTERS = [
  {
    id: "woody",
    render: <WoodyFigure size={58} />,
    name: "Sheriff Woody",
    color: "#f59e0b",
    badge: "SHERIFF WOODY EDITION ⭐",
    desc: "Pemimpin mainan kamar Andy yang setia kawan!",
    quote: "You've Got a Friend in Me! Ada bug di kodinganku, ayo kita basmi bareng!",
    word: "YEE-HAW! 🤠",
  },
  {
    id: "buzz",
    render: <BuzzFigure size={58} />,
    name: "Buzz Lightyear",
    color: "#22c55e",
    badge: "STAR COMMAND ALPHA 🚀",
    desc: "Penjaga luar angkasa dengan laser dan sayap siap meluncur!",
    quote: "To Infinity and Beyond! Siap meluncurkan web modern dengan Next.js 16!",
    word: "TO INFINITY! 🚀",
  },
  {
    id: "alien",
    render: <AlienFigure size={58} />,
    name: "Pizza Planet Alien",
    color: "#84cc16",
    badge: "THE CLAW CHOSEN 🍕",
    desc: "Penghuni mesin capit Pizza Planet yang bersyukur!",
    quote: "Ooooohhh! The Claaawww telah memilih portofolio Dyaksa di Ponorogo!",
    word: "OOOOHHH! 👽",
  },
  {
    id: "rex",
    render: <RexFigure size={58} />,
    name: "Rex Si Dinosaurus",
    color: "#10b981",
    badge: "COURAGEOUS REX 🦕",
    desc: "Dinosaurus hijau pemalu tapi super bersemangat!",
    quote: "Roaaar! Jangan khawatir, kodingan ini aman tanpa error 404!",
    word: "ROAAAR! 🦖",
  },
  {
    id: "slinky",
    render: <SlinkyFigure size={58} />,
    name: "Slinky Dog",
    color: "#eab308",
    badge: "SLINKY AGILITY 🚲",
    desc: "Anjing pegas yang lentur dan gemar gowes sepeda keliling Ponorogo!",
    quote: "Semangat gowes bersepeda menembus batas, stamina pegas selalu siap!",
    word: "GOWES! 🚲",
  },
];

const PATROL_TOYS = [
  { name: "Woody", img: "/characters/woody.png", phrase: "You've got a friend in me! Ada bug, kita basmi bareng!", sound: "woody", word: "YEE-HAW! 🤠" },
  { name: "Buzz Lightyear", img: "/characters/buzz.png", phrase: "To infinity and beyond! Siap meluncur ke galaksi koding!", sound: "buzz", word: "TO INFINITY! 🚀" },
  { name: "Jessie", img: "/characters/jessie.png", phrase: "Yee-haw! Semangat pantang menyerah!", sound: "woody", word: "YODEL-AY! 🤠" },
  { name: "Slinky Dog", img: "/characters/slinky.png", phrase: "Boiiing! Siap gowes bersepeda dan jalan-jalan memotret Ponorogo!", sound: "slinky", word: "GOWES! 🚲" },
  { name: "Aliens", img: "/characters/aliens.png", phrase: "Ooooohhh! The Claw telah memilih portofolio Dyaksa di Ponorogo!", sound: "alien", word: "THE CLAW! 👽" },
  { name: "Rex", img: "/characters/rex.png", phrase: "Roaaar! Tenang, kodingan ini 100% aman tanpa error 404!", sound: "pop", word: "ROAAAR! 🦖" },
  { name: "Hamm", img: "/characters/hamm.png", phrase: "Kumpulkan koin tabungan untuk beli es teh jumbo di Ponorogo!", sound: "coin", word: "KA-CHING! 🪙" },
  { name: "Mr. Potato", img: "/characters/mr_potato.png", phrase: "Lihat aksesori baruku, keren banget kan?!", sound: "pop", word: "POTATO! 🥔" },
  { name: "Bullseye", img: "/characters/bullseye.png", phrase: "Lari sekencang kilat!", sound: "woody", word: "RUN BULLSEYE! 🐴" },
  { name: "Forky", img: "/characters/forky.png", phrase: "Aku bukan sampah, aku developer hebat dari SMKN 1 Jenangan!", sound: "alien", word: "NOT TRASH! 🍴" },
];

const WHEEZY_TRACKS = [
  { title: "You've Got a Friend in Me", artist: "Randy Newman / Toy Story", vibe: "Andy's Room Classic" },
  { title: "Membasuh", artist: "Hindia, Ra Sekar", vibe: "Chill Nostalgia" },
  { title: "Langit Abu-Abu", artist: "Tulus", vibe: "Cloudy Sky Melow" },
  { title: "Gemilang", artist: "Perunggu", vibe: "Morning Energy" },
];

const TOY_PROJECTS = [
  {
    title: "Rumah Rajut — Website Usaha (Rumah Rona)",
    category: "Mini Project Serkom",
    categoryKey: "proyek",
    metric: "2026",
    iconRender: <WoodyFigure size={38} />,
    tag: "Mini Project Serkom · 2026",
    desc: "Website dinamis toko rajut: katalog produk dari database, pencarian, keranjang, checkout dengan validasi, transaksi, serta dashboard dan laporan penjualan untuk admin.",
    stack: ["next.js", "CSS", "TypeScript", "React"],
    longDesc: "Website dinamis toko rajut: katalog produk dari database, pencarian, keranjang, checkout dengan validasi, transaksi, serta dashboard dan laporan penjualan untuk admin.",
    linkUrl: "https://rumahrona.vercel.app/",
  },
  {
    title: "Praktik Kerja Lapangan — VernonCorp",
    category: "PKL",
    categoryKey: "pkl",
    metric: "6 April – 12 September 2026",
    iconRender: <BuzzFigure size={38} />,
    tag: "PKL · 2026",
    desc: "Menerapkan Git workflow profesional (branching, commit semantik, PR), penguji antarmuka responsif di multi-resolusi perangkat (mobile, tablet, desktop).",
    stack: ["Git Workflow", "Responsive Testing", "Web App"],
    longDesc: "Menerapkan Git workflow profesional (branching, commit semantik, dan pull requests). Menguji antarmuka responsif di multi-resolusi perangkat (mobile, tablet, desktop). Mempersiapkan diri menghadapi lingkungan kerja industri teknologi dengan dedikasi tinggi.",
    linkUrl: "",
  },
  {
    title: "Aplikasi Digital & Website Produk",
    category: "Proyek Sekolah",
    categoryKey: "sekolah",
    metric: "2025",
    iconRender: <AlienFigure size={38} />,
    tag: "Proyek Sekolah · 2025",
    desc: "Latihan membangun antarmuka aplikasi dan website produk yang rapi, konsisten.",
    stack: ["HTML", "CSS", "UI Design"],
    longDesc: "Latihan membangun antarmuka aplikasi dan halaman produk yang responsif menggunakan HTML, CSS, dan JavaScript dasar.",
    linkUrl: "",
  },
];

interface SkillNode {
  name: string;
  level: number;
  maxLevel: number;
  exp: number;
}

interface SkillGroup {
  title: string;
  renderIcon: React.ReactNode;
  items: SkillNode[];
}

const INITIAL_TOY_SKILLS: SkillGroup[] = [
  {
    title: "Woody's Foundation (Core)",
    renderIcon: <WoodyFigure size={32} />,
    items: [
      { name: "HTML5 Semantic & Canvas", level: 99, maxLevel: 100, exp: 990 },
      { name: "CSS3 Toy Physics & Animations", level: 96, maxLevel: 100, exp: 960 },
      { name: "Tailwind CSS v4 Modern", level: 94, maxLevel: 100, exp: 940 },
    ],
  },
  {
    title: "Buzz Star Command (Logic)",
    renderIcon: <BuzzFigure size={32} />,
    items: [
      { name: "JavaScript ES6+ Laser Mode", level: 92, maxLevel: 100, exp: 920 },
      { name: "React 19 Interactive System", level: 89, maxLevel: 100, exp: 890 },
      { name: "Next.js 16 App Router", level: 87, maxLevel: 100, exp: 870 },
    ],
  },
  {
    title: "Pizza Planet Vision (UI/UX)",
    renderIcon: <AlienFigure size={32} />,
    items: [
      { name: "Figma UI/UX Prototyping", level: 88, maxLevel: 100, exp: 880 },
      { name: "Responsive Andy Room Layout", level: 95, maxLevel: 100, exp: 950 },
      { name: "Audio Synth & Micro-Interactions", level: 92, maxLevel: 100, exp: 920 },
    ],
  },
];

const TOY_QUESTS = [
  {
    tag: "TOY STORY CHAPTER 1 · NOW",
    title: "Kamar Andy & Pendidikan SMK RPL",
    subtitle: "Menjalani masa SMK RPL, gowes bersepeda & fotografi",
    bullets: [
      { icon: <WoodyFigure size={24} />, text: "Fokus belajar di SMKN 1 Jenangan mengasah skill frontend engineering" },
      { icon: <SlinkyFigure size={24} />, text: "Rutin gowes bersepeda, memotret gambar lanskap, dan jalan-jalan di Ponorogo" },
      { icon: <PixarBall size={24} />, text: "Membangun portofolio unik bertema Toy Story yang interaktif" },
    ],
    chestReward: "'Ingat kata Woody: You've got a friend in me! Jangan pernah ragu untuk belajar hal baru!'",
  },
  {
    tag: "TOY STORY CHAPTER 2 · NEXT",
    title: "Al's Toy Barn & Karir Developer",
    subtitle: "Kelulusan gemilang & peluncuran produk",
    bullets: [
      { icon: <BuzzFigure size={24} />, text: "Lulus dari SMKN 1 Jenangan Ponorogo dengan predikat membanggakan" },
      { icon: <RCFigure size={24} />, text: "Merilis karya open-source dan aplikasi inovatif berstandar industri" },
      { icon: <ArmyManFigure size={24} />, text: "Menjadi Frontend Engineer profesional yang siap berkarya" },
    ],
    chestReward: "'Buzz Lightyear berkata: To infinity and beyond! Batasanmu hanyalah imajinasimu sendiri!'",
  },
  {
    tag: "TOY STORY CHAPTER 3 · FUTURE",
    title: "Sunnyside & Petualangan Global",
    subtitle: "Membahagiakan orang tua & keliling dunia",
    bullets: [
      { icon: <AlienFigure size={24} />, text: "Bekerja secara global dan menjelajahi tempat-tempat baru di dunia" },
      { icon: <HammFigure size={24} />, text: "Membahagiakan orang tua dan keluarga tercinta" },
      { icon: <RexFigure size={24} />, text: "Menciptakan karya digital yang menginspirasi generasi muda" },
    ],
    chestReward: "'The Claw telah memilih masa depan yang cerah untukmu! Selalu bersyukur dan rendah hati!'",
  },
];

const TOY_PRESETS = [
  "Halo Sheriff Dyaksa! Mau kenalan dan diskusi proyek web.",
  "Halo Star Command! Tertarik untuk kolaborasi frontend bareng.",
  "Halo Dyaksa! Mau ajak gowes bersepeda dan hunting foto di Ponorogo!",
  "Halo! Suka banget sama tampilan portofolio Toy Story ini!",
];

const ALIEN_DIALOGS = [
  "The Claaawww telah memilih portofolio Dyaksa di Ponorogo!",
  "Oooohhh! Jangan lupa minum es teh manis hari ini!",
  "Buzz Lightyear siap meluncur ke galaksi koding!",
  "Woody bilang: 'You've got a friend in me!'",
  "Ayo gowes bersepeda dan memotret gambar di Ponorogo!",
  "Kirim pesan ke Dyaksa via WhatsApp di bawah ya!",
];

// =======================================================
// 📚 9-PART PORTFOLIO OFFICIAL DATA MODELS
// =======================================================
interface EducationItem {
  period: string;
  institution: string;
  major: string;
  location: string;
  details: string;
  icon: string;
  badge: string;
}

const TOY_EDUCATION: EducationItem[] = [
  {
    period: "2024 – Sekarang",
    institution: "SMK Negeri 1 Jenangan",
    major: "Rekayasa Perangkat Lunak",
    location: "Ponorogo, Jawa Timur",
    details: "Pendidikan kejuruan fokus pada pengembangan perangkat lunak, pemrograman web, dan teknologi informasi.",
    icon: "🎓",
    badge: "Sedang Ditempuh ⭐",
  },
  {
    period: "2021 – 2024",
    institution: "MTsN 1 Ponorogo",
    major: "Madrasah Tsanawiyah",
    location: "Ponorogo, Jawa Timur",
    details: "Pendidikan menengah pertama di Ponorogo, Jawa Timur.",
    icon: "🏫",
    badge: "Lulus ✨",
  },
  {
    period: "2015 – 2021",
    institution: "MI PAS Gontor",
    major: "Madrasah Ibtidaiyah",
    location: "Ponorogo, Jawa Timur",
    details: "Pendidikan dasar di Ponorogo, Jawa Timur.",
    icon: "🎒",
    badge: "Lulus 🌟",
  },
];

interface ExperienceItem {
  category: "Pengalaman Belajar" | "Pengalaman Proyek" | "Pengalaman Organisasi" | "Pengalaman Bekerja / PKL";
  title: string;
  role: string;
  period: string;
  points: string[];
  icon: string;
  toyBadge: string;
}

const TOY_EXPERIENCES: ExperienceItem[] = [
  {
    category: "Pengalaman Bekerja / PKL",
    title: "Praktik Kerja Lapangan — VernonCorp",
    role: "PKL Trainee Web Developer",
    period: "6 April 2026 – 12 September 2026",
    points: [
      "Menerapkan Git workflow profesional (branching, commit semantik, dan pull requests).",
      "Menguji antarmuka responsif di multi-resolusi perangkat (mobile, tablet, desktop).",
      "Mempersiapkan diri menghadapi lingkungan kerja industri teknologi dengan dedikasi tinggi."
    ],
    icon: "🏢",
    toyBadge: "PKL VernonCorp",
  },
  {
    category: "Pengalaman Proyek",
    title: "Mini Project Uji Kompetensi — Rumah Rona",
    role: "Fullstack Web Developer",
    period: "2026",
    points: [
      "Membangun website usaha rajut secara mandiri: katalog dari database, pencarian dan filter kategori, keranjang belanja, checkout dengan validasi form, hingga panel admin ber-login untuk CRUD produk dan pengelolaan pesanan."
    ],
    icon: "🧶",
    toyBadge: "Proyek Serkom",
  },
  {
    category: "Pengalaman Belajar",
    title: "Proyek Mata Pelajaran Pemrograman Web",
    role: "Siswa Pengembang Web @ SMKN 1 Jenangan",
    period: "2025",
    points: [
      "Latihan membangun antarmuka aplikasi dan halaman produk yang responsif menggunakan HTML, CSS, dan JavaScript dasar."
    ],
    icon: "💻",
    toyBadge: "Proyek Sekolah",
  },
];

interface DetailedSkill {
  name: string;
  level: number;
  tier: "Mahir (Advanced)" | "Menengah ke Atas" | "Menengah (Intermediate)" | "Terampil";
  category: "Coding" | "Web Development" | "KKA" | "AI & Modern Tools" | "Soft Skills";
  icon: string;
  notes: string;
}

const DETAILED_SKILLS: DetailedSkill[] = [
  // Pemrograman & Web
  { name: "HTML", level: 85, tier: "Mahir (Advanced)", category: "Coding", icon: "🌐", notes: "Mahir · 85%" },
  { name: "CSS", level: 80, tier: "Mahir (Advanced)", category: "Coding", icon: "🎨", notes: "Mahir · 80%" },
  { name: "JavaScript", level: 65, tier: "Menengah (Intermediate)", category: "Coding", icon: "⚡", notes: "Menengah · 65%" },
  { name: "PHP", level: 70, tier: "Menengah (Intermediate)", category: "Coding", icon: "🐘", notes: "Menengah · 70%" },
  { name: "MySQL", level: 70, tier: "Menengah (Intermediate)", category: "Coding", icon: "🛢️", notes: "Menengah · 70%" },
  { name: "C++ / Java / Python", level: 50, tier: "Terampil", category: "Coding", icon: "⚙️", notes: "Dasar · 50%" },

  // Aplikasi & Tools
  { name: "Construct 3 (Game Dev)", level: 85, tier: "Mahir (Advanced)", category: "AI & Modern Tools", icon: "🎮", notes: "Mahir · 85%" },
  { name: "VS Code & XAMPP", level: 80, tier: "Mahir (Advanced)", category: "AI & Modern Tools", icon: "🛠️", notes: "Mahir · 80%" },
  { name: "Edit Video Dasar", level: 55, tier: "Terampil", category: "AI & Modern Tools", icon: "🎬", notes: "Dasar · 55%" },

  // Analisis & Soft Skills
  { name: "Analisis Sistem", level: 70, tier: "Menengah (Intermediate)", category: "Soft Skills", icon: "📊", notes: "Menengah · 70%" },
  { name: "Problem Solving", level: 75, tier: "Menengah ke Atas", category: "Soft Skills", icon: "🧩", notes: "Menengah · 75%" },
  { name: "Kerja Sama Tim", level: 85, tier: "Mahir (Advanced)", category: "Soft Skills", icon: "🤝", notes: "Mahir · 85%" },
  { name: "Disiplin & Tanggung Jawab", level: 90, tier: "Mahir (Advanced)", category: "Soft Skills", icon: "⭐", notes: "Mahir · 90%" },
];

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  period?: string;
  type: "Sertifikasi" | "Pelatihan" | "Penghargaan" | "Kompetensi";
  icon: string;
  badgeColor: string;
  description: string;
  image?: string;
}

const TOY_CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-pkl",
    title: "Sertifikat Praktek Kerja Lapangan (Programmer)",
    issuer: "VernonCorp (Fennie Luigi - HR)",
    year: "2026",
    period: "6 April - 12 September 2026",
    type: "Sertifikasi",
    icon: "📜",
    badgeColor: "#16a34a",
    description: "Sertifikat resmi atas partisipasi & pencapaian dalam program Magang/PKL di VernonCorp pada posisi Programmer selama periode 6 April - 12 September 2026.",
    image: "/sertifikat_pkl.png",
  },
  {
    id: "cert-ukk",
    title: "Sertifikat Uji Kompetensi Keahlian (UKK) RPL",
    issuer: "SMKN 1 Jenangan & DUDI Mitra",
    year: "2026",
    period: "Tahun Ajaran 2025/2026",
    type: "Kompetensi",
    icon: "🎓",
    badgeColor: "#2563eb",
    description: "Telah mengikuti dan lulus Uji Kompetensi Keahlian Rekayasa Perangkat Lunak (RPL) dalam pembuatan aplikasi web dinamis dengan standar kualitas industri.",
  },
  {
    id: "cert-nakoa",
    title: "Penghargaan Proyek Aplikasi NAKOA F&B System",
    issuer: "Tim Pengembang VernonCorp",
    year: "2026",
    period: "Periode PKL 2026",
    type: "Penghargaan",
    icon: "🏆",
    badgeColor: "#ca8a04",
    description: "Penghargaan atas dedikasi dan performa terbaik dalam perancangan antarmuka & alur kerja sistem manajemen order NAKOA Checker & Kitchen.",
  },
];

interface ActivityItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  image: string;
  tags: string[];
}

const TOY_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    title: "Sesi Foto Bersama & Briefing Industri PKL VernonCorp",
    category: "PKL & Kolaborasi Tim",
    date: "Juli 2026",
    location: "VernonCorp HQ",
    description: "Dokumentasi kebersamaan peserta PKL, pembimbing industri, dan seluruh tim VernonCorp setelah sukses mengembangkan aplikasi manajemen order NAKOA Checker & Kitchen.",
    image: "/kegiatan_1.jpg",
    tags: ["PKL VernonCorp", "Kolaborasi Tim", "F&B Tech App"],
  },
  {
    id: "act-2",
    title: "Workshop & Sesi Pelatihan Pemrograman Web Berorientasi Best Practice",
    category: "Workshop & Kelas Teknis",
    date: "Agustus 2026",
    location: "Lab Komputer / Class Center",
    description: "Kegiatan pembelajaran teknis secara langsung dalam kelas, meliputi pendalaman algoritma, perancangan database MySQL, dan penulisan kode clean code.",
    image: "/kegiatan_2.png",
    tags: ["Web Development", "PHP & MySQL", "Class Learning"],
  },
];

interface ArticleSection {
  heading: string;
  content: string;
  codeSnippet?: string;
}

interface ArticleItem {
  date: string;
  title: string;
  snippet: string;
  category: string;
  readTime: string;
  author: string;
  fullContent: {
    intro: string;
    sections: ArticleSection[];
    conclusion: string;
  };
}

const TOY_ARTICLES: ArticleItem[] = [
  {
    date: "12 Agustus 2026",
    title: "Cara Menghubungkan PHP ke MySQL dengan MySQLi",
    snippet: "Langkah paling dasar sebelum membuat website dinamis: membuat koneksi, menangani error, dan mengatur charset agar huruf tidak berantakan.",
    category: "Tutorial Backend PHP",
    readTime: "5 Menit Baca",
    author: "Dyaksa Wiratara Maharshi",
    fullContent: {
      intro: "Saat baru belajar pemrograman web backend menggunakan PHP, menghubungkan script ke basis data (database) MySQL adalah salah satu langkah paling krusial. Dalam tutorial ini, kita akan membahas cara menggunakan ekstensi MySQLi (MySQL Improved) dengan pendekatan berorientasi objek (OOP) maupun prosedural yang rapi.",
      sections: [
        {
          heading: "1. Menyiapkan Parameter Koneksi",
          content: "Pertama, siapkan variabel konfigurasi database seperti host, username, password, dan nama database yang akan dituju. Pada server lokal seperti XAMPP atau Laragon, host umumnya localhost dan username default adalah root tanpa password.",
          codeSnippet: `$host = "localhost";\n$user = "root";\n$pass = "";\n$db   = "db_portofolio";`,
        },
        {
          heading: "2. Membuat Object Koneksi MySQLi",
          content: "Gunakan kelas mysqli bawaan PHP untuk membuka koneksi. Jangan lupa untuk selalu memeriksa apakah koneksi berhasil atau mengalami kegagalan dengan mengecek $conn->connect_error.",
          codeSnippet: `$conn = new mysqli($host, $user, $pass, $db);\n\nif ($conn->connect_error) {\n    die("Koneksi gagal: " . $conn->connect_error);\n}\n\n// Set charset utf8mb4 agar karakter khusus & emoji tersimpan sempurna\n$conn->set_charset("utf8mb4");\necho "Koneksi database berhasil!";`,
        },
        {
          heading: "3. Best Practice & Keamanan Dasar",
          content: "Selalu pastikan Anda menutup koneksi setelah query selesai dieksekusi menggunakan $conn->close(). Untuk operasi penambahan atau pengubahan data yang melibatkan input dari pengguna, sangat disarankan menggunakan Prepared Statements untuk mencegah celah keamanan SQL Injection.",
        },
      ],
      conclusion: "Menghubungkan PHP ke MySQL dengan MySQLi sangat sederhana dan handal. Memahami dasar ini akan memudahkan Anda saat membangun aplikasi web yang lebih kompleks seperti sistem manajemen toko, kasir, atau portal informasi sekolah.",
    },
  },
  {
    date: "28 Juli 2026",
    title: "Membuat Keranjang Belanja Sederhana dengan Session",
    snippet: "Keranjang belanja tidak harus langsung disimpan ke database. Untuk toko kecil, session PHP sudah cukup dan jauh lebih mudah dipahami.",
    category: "Web Dev & E-Commerce",
    readTime: "6 Menit Baca",
    author: "Dyaksa Wiratara Maharshi",
    fullContent: {
      intro: "Dalam pengembangan web toko online atau sistem pesanan makanan, fitur keranjang belanja (shopping cart) adalah komponen utama. Menyimpan barang belanjaan sementara di Session PHP adalah solusi cepat, ringan, dan efisien tanpa perlu sering melakukan query ke database.",
      sections: [
        {
          heading: "1. Menginisialisasi Session PHP",
          content: "Setiap file PHP yang ingin mengakses data keranjang harus diawali dengan fungsi session_start(). Inisialisasi array $_SESSION['cart'] jika belum dibuat sebelumnya.",
          codeSnippet: `session_start();\n\nif (!isset($_SESSION['cart'])) {\n    $_SESSION['cart'] = [];\n}`,
        },
        {
          heading: "2. Menambahkan Produk ke Keranjang",
          content: "Ketika pengguna menekan tombol 'Tambah ke Keranjang', ambil ID produk dan kuantitasnya, lalu simpan ke dalam array session. Jika produk sudah ada di keranjang, cukup tambahkan kuantitasnya.",
          codeSnippet: `$id = $_GET['id'];\n$qty = isset($_GET['qty']) ? (int)$_GET['qty'] : 1;\n\nif (isset($_SESSION['cart'][$id])) {\n    $_SESSION['cart'][$id] += $qty;\n} else {\n    $_SESSION['cart'][$id] = $qty;\n}`,
        },
        {
          heading: "3. Menampilkan & Menghitung Total Belanja",
          content: "Iterasi array $_SESSION['cart'] menggunakan perulangan foreach untuk menguraikan item belanjaan, harga per unit, serta kalkulasi total harga keseluruhan sebelum proses checkout.",
        },
      ],
      conclusion: "Dengan menggunakan Session PHP, Anda dapat membuat keranjang belanja yang interaktif dan cepat sebelum akhirnya pengguna melakukan konfirmasi transaksi akhir.",
    },
  },
  {
    date: "5 Juli 2026",
    title: "Pengalaman PKL: Belajar Membuat website NAKOA Checker & Kitchen — aplikasi manajemen order berbasis web untuk operasional F&B",
    snippet: "Cerita singkat selama PKL di VernonCorp.",
    category: "Pengalaman & Project PKL",
    readTime: "8 Menit Baca",
    author: "Dyaksa Wiratara Maharshi",
    fullContent: {
      intro: "Selama menjalani Praktik Kerja Lapangan (PKL) di VernonCorp, saya mendapatkan kesempatan berharga untuk terlibat langsung dalam pengembangan aplikasi dunia nyata untuk industri Food & Beverage (F&B), yaitu NAKOA Checker & Kitchen.",
      sections: [
        {
          heading: "1. Tantangan Operasional di Industri F&B",
          content: "Di bisnis F&B yang dinamis, koordinasi antara bagian kasir depan, checker pesanan, dan tim dapur (kitchen) memerlukan keakuratan tinggi. Aplikasi NAKOA dibangun untuk memvalidasi pesanan secara real-time, mencegah kesalahan pengolahan menu, dan mempercepat waktu penyajian.",
        },
        {
          heading: "2. Peran & Pengalaman Pemrograman Saya",
          content: "Dalam proyek ini, saya bertugas merancang antarmuka pengguna (UI/UX) yang intuitif untuk digunakan staf dapur pada layar tablet/desktop, serta mengimplementasikan logika pembaruan status pesanan (Pending, Cooking, Ready, Served).",
          codeSnippet: `// Logika Pembaruan Status Pesanan (Kitchen Dashboard)\nfunction updateOrderStatus(orderId, newStatus) {\n    return fetch('/api/orders/update-status', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ order_id: orderId, status: newStatus })\n    }).then(res => res.json());\n}`,
        },
        {
          heading: "3. Pembelajaran Berharga & Soft Skills",
          content: "Selain meningkatkan kemampuan teknis (PHP, JavaScript, Git version control, dan MySQL database), PKL di VernonCorp mengajari saya arti penting komunikasi tim yang efektif, penulisan kode berstandar (clean code), dan kedisiplinan tenggat waktu.",
        },
      ],
      conclusion: "Pengalaman PKL ini memperkuat komitmen saya untuk terus memperdalam ilmu rekayasa perangkat lunak dan siap berkontribusi secara positif di lingkungan kerja profesional.",
    },
  },
];

interface Explosion {
  id: number;
  x: number;
  y: number;
  word: string;
}

interface Stardust {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  rot: number;
  emoji: string;
}

export default function Home() {
  const [sfxEnabled, setSfxEnabled] = useState(true);

  // States
  const [roleIndex, setRoleIndex] = useState(0);
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  const [petCount, setPetCount] = useState(1995);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [projectFilter, setProjectFilter] = useState("all");
  const [selectedProjectModal, setSelectedProjectModal] = useState<(typeof TOY_PROJECTS)[0] | null>(null);
  const [selectedArticleModal, setSelectedArticleModal] = useState<(typeof TOY_ARTICLES)[0] | null>(null);
  const [selectedActivityModal, setSelectedActivityModal] = useState<(typeof TOY_ACTIVITIES)[0] | null>(null);
  const [selectedCertModal, setSelectedCertModal] = useState<(typeof TOY_CERTIFICATES)[0] | null>(null);
  const [skills, setSkills] = useState(INITIAL_TOY_SKILLS);
  const [detailedSkillsList, setDetailedSkillsList] = useState(DETAILED_SKILLS);
  const [skillCategoryFilter, setSkillCategoryFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [openedChests, setOpenedChests] = useState<Record<number, boolean>>({});
  const [particles, setParticles] = useState<Particle[]>([]);

  // Forky Cheers
  const [forkyScore, setForkyScore] = useState(1);

  // Hamm Savings Coin Slot Counter
  const [hammCoins, setHammCoins] = useState(25);

  // Etch Knobs
  const [etchKnobDeg, setEtchKnobDeg] = useState(0);

  // Road Active Toy Speech
  const [activePatrolMsg, setActivePatrolMsg] = useState("Barisan mainan kamar Andy siap berpatroli!");

  // Claw Game State
  const [gameScore, setGameScore] = useState(0);
  const [alienPos, setAlienPos] = useState({ top: 40, left: 48 });
  const [clawX, setClawX] = useState(48);
  const [gameCombo, setGameCombo] = useState(0);
  const [gameMsg, setGameMsg] = useState("Arahkan kursor & tangkap Alien Pizza Planet!");

  // Dramatic Effects State
  const [wingsDeployed, setWingsDeployed] = useState(false);
  const [laserActive, setLaserActive] = useState(false);
  const [screenShaking, setScreenShaking] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);
  const [buzzFlying, setBuzzFlying] = useState(false);
  const [toyCombo, setToyCombo] = useState(0);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [stardust, setStardust] = useState<Stardust[]>([]);
  const [pullStringActive, setPullStringActive] = useState(false);

  // Contact
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Mascot
  const [alienDialogIndex, setAlienDialogIndex] = useState(0);
  const [showAlienBalloon, setShowAlienBalloon] = useState(true);

  useEffect(() => {
    sfx.enabled = sfxEnabled;
  }, [sfxEnabled]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % TOY_ROLES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  // Combo Reset Timer
  useEffect(() => {
    if (toyCombo === 0) return;
    const timer = setTimeout(() => {
      setToyCombo(0);
    }, 2500);
    return () => clearTimeout(timer);
  }, [toyCombo]);

  // Cursor Stardust Generator
  const handleMouseMove = (e: React.MouseEvent) => {
    if (Math.random() > 0.4) return; // throttle for performance
    const newStar: Stardust = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      dx: (Math.random() - 0.5) * 35,
      dy: 10 + Math.random() * 25,
    };
    setStardust((prev) => [...prev.slice(-18), newStar]);
    setTimeout(() => {
      setStardust((prev) => prev.filter((s) => s.id !== newStar.id));
    }, 650);
  };

  // Comic Explosion Spawner on Touch / Click
  const triggerExplosion = (
    e: React.MouseEvent | React.TouchEvent,
    word: string = "KABOOM! 💥",
    sound:
      | "explosion"
      | "laser"
      | "boing"
      | "fanfare"
      | "coin"
      | "alien"
      | "pop"
      | "woody"
      | "buzz"
      | "slinky" = "explosion"
  ) => {
    // Sound
    if (sound === "explosion") sfx.playExplosion();
    else if (sound === "laser" || sound === "buzz") sfx.playLaser();
    else if (sound === "boing" || sound === "slinky") sfx.playCartoonBoing();
    else if (sound === "fanfare" || sound === "woody") sfx.playPullStringFanfare();
    else if (sound === "coin") sfx.playCoinDrop();
    else if (sound === "alien") sfx.playAlienOoh();
    else sfx.playPop();

    // Screen Jolt Shake & Flash
    setScreenShaking(true);
    setTimeout(() => setScreenShaking(false), 280);
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 120);

    // Increment Toy Combo
    setToyCombo((prev) => prev + 1);

    // Blast Position (supports both mouse and touch coordinates)
    let x = typeof window !== "undefined" ? window.innerWidth / 2 : 200;
    let y = typeof window !== "undefined" ? window.innerHeight / 2 : 200;

    if ("clientX" in e && typeof e.clientX === "number" && (e.clientX !== 0 || e.clientY !== 0)) {
      x = e.clientX;
      y = e.clientY;
    } else if ("touches" in e && e.touches && e.touches.length > 0) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }

    const newExplosion: Explosion = {
      id: Date.now() + Math.random(),
      x,
      y,
      word,
    };

    setExplosions((prev) => [...prev, newExplosion]);
    setTimeout(() => {
      setExplosions((prev) => prev.filter((ex) => ex.id !== newExplosion.id));
    }, 950);

    // Extra Confetti bursts
    spawnConfetti(e, ["⭐", "💥", "⚡", "✨", "🔥", "🎉", "🍕"]);
  };

  // Mega Detonator Blast: Chained Explosions Across Screen
  const handleMegaDetonator = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playExplosion();
    setScreenShaking(true);
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 180);
    setTimeout(() => setScreenShaking(false), 600);
    setBuzzFlying(true);
    setTimeout(() => setBuzzFlying(false), 2200);

    const burstCoords = [
      { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3, word: "KABOOOM! 💥", delay: 0 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.45, word: "MEGA BLAST! 🔥", delay: 90 },
      { x: window.innerWidth * 0.8, y: window.innerHeight * 0.35, word: "TO INFINITY! 🚀", delay: 180 },
      { x: window.innerWidth * 0.35, y: window.innerHeight * 0.65, word: "PEW-PEW! ⚡", delay: 270 },
      { x: window.innerWidth * 0.65, y: window.innerHeight * 0.7, word: "YEE-HAW! 🤠", delay: 360 },
    ];

    burstCoords.forEach((b) => {
      setTimeout(() => {
        const newEx: Explosion = {
          id: Date.now() + Math.random(),
          x: b.x,
          y: b.y,
          word: b.word,
        };
        setExplosions((prev) => [...prev, newEx]);
        setTimeout(() => {
          setExplosions((prev) => prev.filter((item) => item.id !== newEx.id));
        }, 950);
      }, b.delay);
    });

    setToyCombo((prev) => prev + 5);
  };

  // Global Page-Wide Click / Touch Explosion
  const handleGlobalClick = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest(
        "button, a, input, textarea, .patrol-toy-item, .bouncing-luxo-ball-toy, .tnt-detonator-box, .buzz-btn-oval, .sheriff-badge-brass, .toy-combo-badge"
      )
    ) {
      return; // Already handled by element's specific onClick
    }

    const RANDOM_WORDS = [
      "KABOOOM! 💥",
      "POW! 💥",
      "BAM! 💣",
      "BOOM! 🔥",
      "ZAP! ⚡",
      "SMASH! 🏸",
      "YEE-HAW! 🤠",
      "TO INFINITY! 🚀",
      "THE CLAW! 👽",
      "BOOIIING! 🌀",
      "KA-CHING! 🪙",
      "YIKES! 😱",
      "WOWWW! ✨",
    ];
    const word = RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)];
    triggerExplosion(e, word, "explosion");
  };

  // Particle Spawner
  const spawnConfetti = (e: React.MouseEvent | React.TouchEvent, emojis: string[] = ["⭐", "💥", "✨", "🔥", "🚀"]) => {
    let originX = typeof window !== "undefined" ? window.innerWidth / 2 : 200;
    let originY = typeof window !== "undefined" ? window.innerHeight / 2 : 200;

    if ("currentTarget" in e && e.currentTarget && typeof (e.currentTarget as HTMLElement).getBoundingClientRect === "function") {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    } else if ("clientX" in e && typeof e.clientX === "number") {
      originX = e.clientX;
      originY = e.clientY;
    }

    const newParticles: Particle[] = Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * 2 * Math.PI + (Math.random() - 0.5);
      const dist = 70 + Math.random() * 90;
      return {
        id: Date.now() + Math.random() + i,
        x: originX,
        y: originY,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - 35,
        rot: Math.random() * 360,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1100);
  };

  // Trigger Buzz Laser Blast Effect across screen
  const handleFireLaser = (e: React.MouseEvent) => {
    setLaserActive(true);
    setTimeout(() => setLaserActive(false), 450);
    setBuzzFlying(true);
    setTimeout(() => setBuzzFlying(false), 1900);
    triggerExplosion(e, "PEW PEW! ⚡", "laser");
  };

  // Pull-String Voice Box Trigger
  const handlePullString = (e: React.MouseEvent) => {
    setPullStringActive(true);
    setTimeout(() => setPullStringActive(false), 600);
    setPetCount((prev) => prev + 1);
    setSelectedCharIndex((prev) => (prev + 1) % TOY_CHARACTERS.length);
    triggerExplosion(e, "YEE-HAW! 🤠", "fanfare");
  };

  // Hamm Coin Drop Trigger
  const handleDropCoin = (e: React.MouseEvent) => {
    setHammCoins((p) => p + 1);
    triggerExplosion(e, "KA-CHING! 🪙", "coin");
  };

  // Forky Cheer
  const handleCheerForky = (e: React.MouseEvent) => {
    setForkyScore((p) => p + 1);
    triggerExplosion(e, "BUKAN SAMPAH! 🍴", "alien");
  };

  // Etch Knobs Shake
  const handleShakeEtch = (e: React.MouseEvent) => {
    setEtchKnobDeg((p) => p + 45);
    triggerExplosion(e, "SHAKE IT! 🔄", "boing");
  };

  const handleSkillLevelUp = (groupIndex: number, itemIndex: number, e: React.MouseEvent) => {
    triggerExplosion(e, "+100 EXP! ⚡", "laser");
    setSkills((prev) => {
      const newSkills = JSON.parse(JSON.stringify(prev));
      const target = newSkills[groupIndex].items[itemIndex];
      if (target.level < target.maxLevel) {
        target.level += 1;
        target.exp = Math.min(1000, target.exp + 10);
      }
      return newSkills;
    });
  };

  const handleDetailedSkillBoost = (index: number, e: React.MouseEvent) => {
    triggerExplosion(e, "+2% POWER! ⚡", "laser");
    setDetailedSkillsList((prev) => {
      const next = [...prev];
      if (next[index].level < 100) {
        next[index] = { ...next[index], level: Math.min(100, next[index].level + 2) };
      }
      return next;
    });
  };

  const handleOpenChest = (index: number, e: React.MouseEvent) => {
    triggerExplosion(e, "TREASURE! 🎁", "explosion");
    setOpenedChests((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCatchAlien = (e: React.MouseEvent) => {
    triggerExplosion(e, "THE CLAW! 👾", "alien");
    setGameScore((prev) => prev + 10);
    setGameCombo((prev) => prev + 1);

    const cheers = ["THE CLAW HAS CHOSEN! 👾", "PERFECT CATCH! 🍕", "OOOOHHH! YOU SAVED US! ⭐", "SUPER COMBO! 🚀"];
    setGameMsg(`${cheers[Math.floor(Math.random() * cheers.length)]} (Skor: ${gameScore + 10})`);

    const nextTop = 15 + Math.random() * 55;
    const nextLeft = 10 + Math.random() * 75;
    setAlienPos({ top: nextTop, left: nextLeft });
    setClawX(nextLeft);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playPullStringFanfare();

    const nameText = contactName.trim() ? contactName : "Teman Andy";
    const msgText = contactMessage.trim() ? contactMessage : "Halo Dyaksa! You've got a friend in me!";
    const fullText = `Halo Sheriff Dyaksa!\n\nDari: *${nameText}*\n\nPesan:\n"${msgText}"\n\n(Dikirim via Pizza Planet Communicator 🚀)`;

    const encoded = encodeURIComponent(fullText);
    const waUrl = `https://wa.me/6285904282198?text=${encoded}`;

    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }
  };

  const totalMasteryLevel = skills.reduce(
    (acc, grp) => acc + grp.items.reduce((s, it) => s + it.level, 0),
    0
  );

  const filteredProjects =
    projectFilter === "all" ? TOY_PROJECTS : TOY_PROJECTS.filter((p) => p.categoryKey === projectFilter);

  const curChar = TOY_CHARACTERS[selectedCharIndex];

  return (
    <div
      className={`andys-bedroom-wallpaper ${screenShaking ? "screen-jolt-shake" : ""}`}
      onMouseMove={handleMouseMove}
      onClick={handleGlobalClick}
    >
      {/* Dynamic Cursor Stardust Trail */}
      {stardust.map((s) => (
        <span
          key={s.id}
          className="cursor-stardust"
          style={{
            left: s.x,
            top: s.y,
            // @ts-expect-error custom css variable
            "--dx": `${s.dx}px`,
            "--dy": `${s.dy}px`,
          }}
        />
      ))}

      {/* Multi-Stage Cartoon Comic Explosion Bursts */}
      {explosions.map((ex) => (
        <div key={ex.id} className="comic-explosion-fx" style={{ left: ex.x, top: ex.y }}>
          {/* 1. Dramatic Flash Flare */}
          <div className="comic-blast-flash" />

          {/* 2. Expanding Cartoon Smoke & Fire Puffs */}
          <div className="comic-smoke-cluster">
            <span className="smoke-puff p1" />
            <span className="smoke-puff p2" />
            <span className="smoke-puff p3" />
            <span className="smoke-puff p4" />
            <span className="smoke-puff p5" />
            <span className="smoke-puff p6" />
          </div>

          {/* 3. 18-Point Sharp Jagged Starburst */}
          <div className="comic-blast-starburst" />

          {/* 4. Double Expanding Shockwaves */}
          <div className="comic-shockwave-ring ring-1" />
          <div className="comic-shockwave-ring ring-2" />

          {/* 5. Radiating Comic Spark Rays */}
          <div className="comic-sparks-orbit">
            <span className="spark-ray r1">⚡</span>
            <span className="spark-ray r2">💥</span>
            <span className="spark-ray r3">⭐</span>
            <span className="spark-ray r4">🔥</span>
            <span className="spark-ray r5">✨</span>
            <span className="spark-ray r6">⚡</span>
          </div>

          {/* 6. Giant 3D Extruded Comic Action Word */}
          <div className="comic-impact-word">{ex.word}</div>
        </div>
      ))}

      {/* Screen Flash on Huge Hits */}
      {screenFlash && <div className="comic-screen-flash" aria-hidden="true" />}

      {/* Explosive Combo Meter HUD */}
      {toyCombo > 0 && (
        <div
          className="toy-combo-badge"
          onClick={(e) => {
            e.stopPropagation();
            triggerExplosion(e, "MEGA COMBO! 🔥", "explosion");
          }}
          title="Klik untuk ledakan combo!"
        >
          <span>💥 COMBO x{toyCombo}!</span>
          <span style={{ fontSize: "0.82rem", background: "rgba(0,0,0,0.25)", padding: "0.15rem 0.6rem", borderRadius: "999px" }}>
            {toyCombo < 5 ? "NICE TAP! ⭐" : toyCombo < 10 ? "SUPER BLAST! 🔥" : "MEGA KABOOM! 🚀"}
          </span>
        </div>
      )}

      {/* Interactive Bouncing Pixar Luxo Ball Toy */}
      <div
        className="bouncing-luxo-ball-toy"
        onClick={(e) => {
          e.stopPropagation();
          triggerExplosion(e, "BOOIIING! 🏀", "slinky");
        }}
        title="Klik Bola Pixar untuk efek mantul & ledakan!"
      >
        <PixarBall size={72} />
      </div>

      {/* Ambient Paratroopers in the Sky (Pinned to extreme screen margins) */}
      <div className="ambient-paratrooper" style={{ left: "2%", animationDelay: "0s", zIndex: 1 }}>
        <ParatrooperFigure size={48} />
      </div>
      <div className="ambient-paratrooper" style={{ left: "94%", animationDelay: "8s", zIndex: 1 }}>
        <ParatrooperFigure size={44} />
      </div>

      {/* Full-Screen Laser Blast Sweep */}
      {laserActive && (
        <div className="laser-beam-flash" aria-hidden="true">
          <div className="laser-beam-line" />
        </div>
      )}

      {/* Buzz Lightyear Flying Glider Across the Sky */}
      {buzzFlying && (
        <div className="buzz-flyby-glider" aria-hidden="true">
          <BuzzFigure size={84} />
        </div>
      )}

      {/* Floating Andy's Bedroom Clouds Background */}
      <div className="clouds-layer-bg" aria-hidden="true">
        <div className="cloud-element" style={{ top: "8%", left: "-140px", animationDuration: "44s" }}>
          <svg width="220" height="130" viewBox="0 0 180 110" fill="none">
            <path d="M45 80C30 80 15 70 15 52C15 36 28 25 44 25C48 25 52 26 56 28C64 12 80 0 100 0C125 0 145 18 149 42C153 41 157 40 160 40C171 40 180 49 180 60C180 71 171 80 160 80L45 80Z" fill="#FFFFFF" fillOpacity="0.95" />
          </svg>
        </div>
        <div className="cloud-element" style={{ top: "36%", left: "-180px", animationDuration: "58s", animationDelay: "-20s" }}>
          <svg width="270" height="160" viewBox="0 0 180 110" fill="none">
            <path d="M45 80C30 80 15 70 15 52C15 36 28 25 44 25C48 25 52 26 56 28C64 12 80 0 100 0C125 0 145 18 149 42C153 41 157 40 160 40C171 40 180 49 180 60C180 71 171 80 160 80L45 80Z" fill="#FFFFFF" fillOpacity="0.9" />
          </svg>
        </div>
        <div className="cloud-element" style={{ top: "72%", left: "-120px", animationDuration: "50s", animationDelay: "-32s" }}>
          <svg width="240" height="140" viewBox="0 0 180 110" fill="none">
            <path d="M45 80C30 80 15 70 15 52C15 36 28 25 44 25C48 25 52 26 56 28C64 12 80 0 100 0C125 0 145 18 149 42C153 41 157 40 160 40C171 40 180 49 180 60C180 71 171 80 160 80L45 80Z" fill="#FFFFFF" fillOpacity="0.92" />
          </svg>
        </div>
      </div>

      {/* AMBIENT GREEN ARMY PARATROOPERS DESCENDING FROM SKY */}
      <div
        className="ambient-paratrooper"
        onClick={(e) => triggerExplosion(e, "ATTACK! 🪖", "explosion")}
        title="Klik Prajurit Terjun Payung!"
      >
        <ParatrooperFigure size={72} />
      </div>

      <div
        className="ambient-paratrooper-left"
        onClick={(e) => triggerExplosion(e, "BEBAS BUG! 🪖", "laser")}
        title="Klik Prajurit Terjun Payung!"
      >
        <ParatrooperFigure size={64} />
      </div>

      {/* Floating Confetti Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "fixed",
            left: p.x,
            top: p.y,
            pointerEvents: "none",
            zIndex: 200,
            fontSize: "1.6rem",
            transform: `translate(${p.tx}px, ${p.ty}px) rotate(${p.rot}deg)`,
            transition: "transform 1.1s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 1.1s ease",
            opacity: 0,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* ======================================================= */}
      {/* 🔤 TOPBAR: ALPHABET WOODEN TOY BLOCKS + PIXAR LUXO BALL */}
      {/* ======================================================= */}
      <header className="toy-header-bar">
        <div className="toy-header-inner">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", width: "auto" }}>
            <a
              href="#hero"
              className="alphabet-blocks-brand"
              onClick={(e) => triggerExplosion(e, "DYAKSA WIRATARA! ⭐", "fanfare")}
              title="Dyaksa Wiratara | Siswa RPL SMKN 1 Jenangan Ponorogo"
              style={{ textDecoration: "none" }}
            >
              <PixarBall size={36} />
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2.5px solid #f59e0b",
                  boxShadow: "0 2px 0 #b45309",
                  flexShrink: 0,
                  background: "#1e3a8a",
                }}
              >
                <img
                  src="/dyaksa_photo.png"
                  alt="Dyaksa Wiratara"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
              </div>
              <div className="block-cube" style={{ background: "linear-gradient(135deg, #ef4444, #b91c1c)" }}>D</div>
              <div className="block-cube" style={{ background: "linear-gradient(135deg, #fbbf24, #d97706)", color: "#78350f" }}>Y</div>
              <div className="block-cube" style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}>A</div>
              <div className="block-cube" style={{ background: "linear-gradient(135deg, #22c55e, #15803d)" }}>K</div>
              <div className="block-cube" style={{ background: "linear-gradient(135deg, #a855f7, #7e22ce)" }}>S</div>
              <div className="block-cube" style={{ background: "linear-gradient(135deg, #f97316, #c2410c)" }}>A</div>

              <div style={{ display: "flex", flexDirection: "column", marginLeft: "0.4rem", lineHeight: 1.1 }}>
                <span style={{ fontFamily: "var(--font-gill)", fontWeight: 900, fontSize: "0.98rem", color: "#78350f", letterSpacing: "0.02em" }}>
                  DYAKSA WIRATARA
                </span>
                <span style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 800 }}>
                  RPL · SMKN 1 JENANGAN PONOROGO
                </span>
              </div>
            </a>

            <button
              className="buzz-btn-oval buzz-btn-green"
              style={{ width: "auto", padding: "0.4rem 0.95rem", fontSize: "0.84rem", whiteSpace: "nowrap" }}
              onClick={(e) => {
                const next = !sfxEnabled;
                setSfxEnabled(next);
                if (next) triggerExplosion(e, "SOUND ON! 🔊", "laser");
              }}
              title="Toggle Sound Effects"
            >
              <span>{sfxEnabled ? "🔊 Sound ON" : "🔇 Sound OFF"}</span>
            </button>
          </div>

          <nav className="nav-pillbox-container" aria-label="Main Navigation">
            <a href="#hero" className="nav-pill-item" onClick={(e) => triggerExplosion(e, "BERANDA! ☁️", "boing")}>
              🏠 Beranda
            </a>
            <a href="#tentang-saya" className="nav-pill-item" onClick={(e) => triggerExplosion(e, "TENTANG! 🤠", "boing")}>
              🤠 Tentang Saya
            </a>
            <a href="#profil-profesional" className="nav-pill-item" onClick={(e) => triggerExplosion(e, "PROFIL! 💼", "laser")}>
              💼 Profil
            </a>
            <a href="#pendidikan" className="nav-pill-item" onClick={(e) => triggerExplosion(e, "PENDIDIKAN! 🎓", "fanfare")}>
              🎓 Pendidikan
            </a>
            <a href="#pengalaman" className="nav-pill-item" onClick={(e) => triggerExplosion(e, "PENGALAMAN! 🚀", "pop")}>
              🚀 Pengalaman
            </a>
            <a href="#keahlian" className="nav-pill-item" onClick={(e) => triggerExplosion(e, "KEAHLIAN! ⚡", "laser")}>
              ⚡ Keahlian
            </a>
            <a href="#portofolio" className="nav-pill-item" onClick={(e) => triggerExplosion(e, "KARYA! 🕹️", "pop")}>
              🕹️ Portofolio
            </a>
            <a href="#sertifikat-prestasi" className="nav-pill-item" onClick={(e) => triggerExplosion(e, "PRESTASI! 🏆", "fanfare")}>
              🏆 Prestasi
            </a>
            <a href="#kegiatan-workshop" className="nav-pill-item" onClick={(e) => triggerExplosion(e, "KEGIATAN! 📸", "pop")}>
              📸 Kegiatan
            </a>
            <a href="#kontak" className="nav-pill-item" onClick={(e) => triggerExplosion(e, "KONTAK! ✉️", "alien")}>
              ✉️ Kontak
            </a>
          </nav>
        </div>
      </header>

      {/* ======================================================= */}
      {/* 🚗 FOREGROUND PARADE ROAD WITH AUTHENTIC VECTOR FIGURES */}
      {/* ======================================================= */}
      <div className="foreground-toy-road" aria-label="Foreground Toy Parade Road">
        <div className="road-track-dashed" />
        <div className="marching-patrol-container">
          {PATROL_TOYS.map((toy, tIdx) => (
            <div
              key={toy.name}
              className="patrol-toy-item"
              style={{ animationDelay: `${tIdx * 0.18}s` }}
              onClick={(e) => {
                setActivePatrolMsg(`${toy.name}: "${toy.phrase}"`);
                triggerExplosion(
                  e,
                  toy.word,
                  toy.sound as "woody" | "buzz" | "alien" | "slinky" | "coin" | "laser" | "pop" | "explosion" | "boing" | "fanfare"
                );
              }}
              title={`Klik ${toy.name}!`}
            >
              <div className="toy-token-pedestal">
                <img src={toy.img} alt={toy.name} className="toy-token-img" />
                <span className="toy-token-name">{toy.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live speech ticker on the road */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", color: "#ffffff", fontWeight: 900, fontSize: "0.85rem", textShadow: "0 2px 0 rgba(0,0,0,0.4)", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
            <span style={{ background: "#dc2626", color: "#ffffff", padding: "0.22rem 0.75rem", borderRadius: "999px", fontSize: "0.78rem", border: "2px solid #ffffff", boxShadow: "0 3px 0 #991b1b", fontFamily: "var(--font-display)", flexShrink: 0 }}>
              PATROLI MAINAN ANDY ⭐
            </span>
            <span style={{ color: "#fef08a", fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{activePatrolMsg}</span>
          </div>
          <span style={{ fontSize: "0.82rem", background: "rgba(0,0,0,0.35)", padding: "0.22rem 0.75rem", borderRadius: "999px", border: "1.5px solid #fef08a", flexShrink: 0 }}>
            💥 KLIK KARAKTER UNTUK LEDAKAN!
          </span>
        </div>
      </div>

      {/* ======================================================= */}
      {/* 🧸 MAIN VIEWPORT                                        */}
      {/* ======================================================= */}
      <main style={{ maxWidth: "1380px", margin: "0 auto", padding: "2.5rem 1.75rem 8rem", position: "relative", zIndex: 10 }}>
        {/* HERO SECTION: SHERIFF WOODY COWHIDE & BRASS BADGE WIDGET */}
        {/* HERO SECTION: 3D LOGO, IDENTITY & CTA BUTTONS */}
        <section className="toy-hero-grid" id="hero">
          <div>
            {/* 3D Toy Story Hero Title Header */}
            <div className="toy-3d-hero-container">
              <div className="toy-disney-pixar-tag">
                <span className="toy-disney-script">Disney</span>
                <span className="toy-pixar-dot" />
                <span className="toy-pixar-slab">PIXAR</span>
              </div>
              <div className="toy-3d-intro-badge">
                <span>🤠 HALO, SAYA</span>
              </div>
              <h1 style={{ margin: "0.2rem 0 0", padding: 0, lineHeight: 0.9, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span className="toy-3d-title-dyaksa" aria-label="DYAKSA">
                  <span className="toy-letter toy-letter-d">D</span>
                  <span className="toy-letter toy-letter-y">Y</span>
                  <span className="toy-letter toy-letter-a1">A</span>
                  <span className="toy-letter toy-letter-k">K</span>
                  <span className="toy-letter toy-letter-s">S</span>
                  <span className="toy-letter toy-letter-a2">A</span>
                </span>
                <div className="toy-story-banner-box">
                  <span className="toy-3d-title-wira">WIRATARA</span>
                </div>
              </h1>
            </div>

            {/* Status Mission Ticker */}
            <div className="toy-3d-status-deck">
              <div className="toy-3d-status-label">⭐ STATUS MISI:</div>
              <div className="toy-3d-status-val">{TOY_ROLES[roleIndex]}</div>
            </div>

            <p style={{ marginTop: "1.4rem", fontSize: "1.15rem", lineHeight: 1.75, color: "#1e293b", fontWeight: 700, maxWidth: "620px" }}>
              Selamat datang di kamar mainan saya! Saya adalah siswa jurusan{" "}
              <strong style={{ color: "#78350f", background: "#fef08a", padding: "0.15rem 0.5rem", borderRadius: "8px", border: "1.5px solid #eab308" }}>
                Rekayasa Perangkat Lunak di SMKN 1 Jenangan (Ponorogo)
              </strong>{" "}
              yang gemar merakit antarmuka web interaktif, gowes bersepeda menjelajah sudut kota, memotret gambar, dan jalan-jalan!
            </p>

            {/* OFFICIAL IDENTITY & CTA BUTTONS (SESUAI STANDAR BAGIAN 2 DENGAN FOTO PROFESIONAL BESAR & JELAS) */}
            <div style={{ marginTop: "1.4rem", background: "#ffffff", border: "4px solid #f59e0b", borderRadius: "24px", padding: "1.3rem 1.5rem", boxShadow: "0 8px 0 #b45309, 0 16px 32px rgba(0,0,0,0.14)", maxWidth: "650px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <div style={{ position: "relative", width: "112px", height: "112px", borderRadius: "22px", overflow: "hidden", border: "4px solid #f59e0b", boxShadow: "0 6px 0 #b45309, 0 10px 20px rgba(0,0,0,0.18)", flexShrink: 0, background: "#1e3a8a" }}>
                  <img
                    src="/dyaksa_photo.png"
                    alt="Dyaksa Wiratara Maharshi"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                  />
                  <span style={{ position: "absolute", bottom: "3px", left: "50%", transform: "translateX(-50%)", background: "#fef08a", color: "#78350f", fontSize: "0.62rem", fontWeight: 900, padding: "0.1rem 0.45rem", borderRadius: "999px", border: "1px solid #ca8a04", whiteSpace: "nowrap", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                    PONOROGO
                  </span>
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-gill)", fontWeight: 900, fontSize: "1.35rem", color: "#78350f", lineHeight: 1.2 }}>
                    Dyaksa Wiratara Maharshi
                  </div>
                  <div style={{ fontSize: "0.88rem", color: "#16a34a", fontWeight: 800, marginTop: "0.25rem" }}>
                    Siswa Rekayasa Perangkat Lunak (RPL) · SMKN 1 Jenangan, Ponorogo
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.45rem" }}>
                    <span style={{ background: "#fef08a", color: "#78350f", fontSize: "0.74rem", fontWeight: 900, padding: "0.15rem 0.6rem", borderRadius: "999px", border: "1px solid #eab308" }}>
                      📍 Asli Ponorogo
                    </span>
                    <span style={{ background: "#e0f2fe", color: "#0369a1", fontSize: "0.74rem", fontWeight: 900, padding: "0.15rem 0.6rem", borderRadius: "999px", border: "1px solid #7dd3fc" }}>
                      🚲 Bersepeda
                    </span>
                    <span style={{ background: "#fce7f3", color: "#be185d", fontSize: "0.74rem", fontWeight: 900, padding: "0.15rem 0.6rem", borderRadius: "999px", border: "1px solid #f472b6" }}>
                      📷 Mempotret
                    </span>
                    <span style={{ background: "#dcfce7", color: "#15803d", fontSize: "0.74rem", fontWeight: 900, padding: "0.15rem 0.6rem", borderRadius: "999px", border: "1px solid #86efac" }}>
                      🎒 Jalan-Jalan
                    </span>
                  </div>
                </div>
              </div>

              <p style={{ margin: "0", fontSize: "0.95rem", lineHeight: 1.65, color: "#334155", fontWeight: 700 }}>
                "Siswa SMKN 1 Jenangan Ponorogo (alumni MTs di Ponorogo & MI di Ponorogo). Bersemangat merakit solusi web interaktif, aktif bersepeda gowes, mempotret gambar lanskap alam, dan jalan-jalan menjelajahi Ponorogo!"
              </p>
            </div>

            {/* SHERIFF WOODY COWHIDE & BRASS BADGE WIDGET */}
            <div className="woody-sheriff-widget" style={{ marginTop: "1.6rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div className="sheriff-badge-brass" onClick={handlePullString} title="Klik Bintang Sheriff Woody!">
                    <span style={{ fontWeight: 900, color: "#78350f", fontSize: "0.75rem", letterSpacing: "0.05em" }}>SHERIFF</span>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 900, color: "#78350f" }}>
                      Sheriff Woody Voice Box
                    </h3>
                    <span style={{ fontSize: "0.85rem", color: "#854d0e", fontWeight: 800 }}>
                      Tarik tali di punggung Woody untuk suara ikonik & ledakan komik!
                    </span>
                  </div>
                </div>

                {/* Interactive Pull String Cord Widget */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      width: pullStringActive ? "50px" : "15px",
                      height: "3px",
                      background: "#d97706",
                      transition: "width 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      border: "none",
                      background: "linear-gradient(180deg, #ef4444 0%, #b91c1c 100%)",
                      color: "#ffffff",
                      padding: "0.6rem 1.2rem",
                      borderRadius: "999px",
                      fontWeight: 900,
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 0 #7f1d1d",
                      transform: pullStringActive ? "scale(0.92) translateX(8px)" : "scale(1)",
                      transition: "transform 0.2s ease",
                    }}
                    onClick={handlePullString}
                  >
                    TARIK TALI VOICE BOX!
                  </button>
                </div>
              </div>

              {/* 3D Parchment Speech Card with Authentic Woody Portrait */}
              <div
                style={{
                  background: "linear-gradient(180deg, #fefce8 0%, #fef08a 100%)",
                  border: "3.5px solid #b45309",
                  borderRadius: "20px 8px 20px 8px",
                  padding: "1rem 1.3rem",
                  marginTop: "1.2rem",
                  boxShadow: "0 5px 0 #78350f, inset 0 2px 4px rgba(255,255,255,0.8)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                }}
              >
                <img
                  src="/characters/woody.png"
                  alt="Woody"
                  style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2.5px solid #78350f", flexShrink: 0, boxShadow: "0 3px 0 #78350f" }}
                />
                <div style={{ color: "#78350f", fontWeight: 900, fontSize: "1.02rem", lineHeight: 1.5 }}>
                  "{curChar.quote}"
                </div>
              </div>
            </div>

            {/* 🧨 TNT DETONATOR: MEGA CARTOON EXPLOSION WIDGET */}
            <div
              className="tnt-detonator-box"
              style={{ marginTop: "1.4rem" }}
              onClick={handleMegaDetonator}
              title="Klik untuk Ledakan Berantai & Buzz Meluncur!"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ fontSize: "2.5rem", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))" }}>
                  🧨
                </div>
                <div>
                  <div style={{ fontWeight: 900, fontSize: "1.15rem", letterSpacing: "0.04em", color: "#fef08a" }}>
                    PIZZA PLANET MEGA TNT DETONATOR 💥
                  </div>
                  <div style={{ fontSize: "0.84rem", color: "#fecaca", fontWeight: 700 }}>
                    Tekan untuk memicu ledakan beruntun, Buzz meluncur di langit, & guncangan layar!
                  </div>
                  <div className="tnt-stripes" />
                </div>
              </div>

              <button
                type="button"
                style={{
                  border: "none",
                  background: "linear-gradient(180deg, #fde047 0%, #ca8a04 100%)",
                  color: "#78350f",
                  padding: "0.7rem 1.4rem",
                  borderRadius: "999px",
                  fontWeight: 900,
                  fontSize: "0.92rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 0 #854d0e",
                  whiteSpace: "nowrap",
                }}
              >
                LEDAKKAN! 💣
              </button>
            </div>
          </div>

          {/* BUZZ LIGHTYEAR 3D BLISTER PACKAGING WIDGET */}
          <div>
            <div className="toy-blister-hanger-tab">
              <div className="toy-blister-hanger-hole" />
            </div>
            <div className="buzz-chest-panel" id="buzz-widget">
              <div className="toy-blister-gloss-reflection" />
              <div className="hazard-stripes-bar" />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <BuzzFigure size={44} />
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 900, color: "#0f172a" }}>
                    Buzz Lightyear Star Command Panel
                  </h3>
                  <span style={{ fontSize: "0.82rem", color: "#15803d", fontWeight: 900 }}>
                    ALPHA SUIT CONTROL SYSTEM ⚡
                  </span>
                </div>
              </div>

              <span style={{ background: wingsDeployed ? "#22c55e" : "#cbd5e1", color: wingsDeployed ? "#ffffff" : "#475569", padding: "0.3rem 0.85rem", borderRadius: "999px", fontWeight: 900, fontSize: "0.8rem", border: "2px solid #ffffff", boxShadow: "0 3px 0 rgba(0,0,0,0.15)" }}>
                {wingsDeployed ? "WINGS DEPLOYED!" : "WINGS FOLDED"}
              </span>
            </div>

            {/* Authentic Blue Oval Button */}
            <div className="buzz-oval-buttons">
              <div
                className="buzz-btn-oval buzz-btn-blue"
                onClick={(e) => triggerExplosion(e, "STAR COMMAND! ✨", "alien")}
                title="Star Command Voice Radio"
              >
                RADIO
              </div>
            </div>

            {/* 3D Action Figure Blister Card with Dyaksa Wiratara & Andy Signature */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "355px",
                borderRadius: "24px",
                overflow: "hidden",
                border: "4px solid #ffffff",
                boxShadow: "inset 0 0 35px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2)",
                background: "radial-gradient(circle at 50% 35%, #38bdf8 0%, #1e40af 65%, #0f172a 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
              }}
            >
              {/* Blister Card Cardboard Header */}
              <div
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  left: "1rem",
                  right: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  zIndex: 10,
                }}
              >
                <span
                  style={{
                    background: "#fde047",
                    color: "#78350f",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.82rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    border: "2px solid #ca8a04",
                    boxShadow: "0 2px 0 #854d0e",
                  }}
                >
                  ⭐ COLLECTOR EDITION ⭐
                </span>
                <span
                  style={{
                    background: "#ef4444",
                    color: "#ffffff",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.78rem",
                    padding: "0.22rem 0.65rem",
                    borderRadius: "999px",
                    border: "1.5px solid #ffffff",
                  }}
                >
                  AGES 4+
                </span>
              </div>

              {/* 3D Toy Figures in Card: Woody, Dyaksa's Real Photo & Buzz Avatar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "0.3rem", zIndex: 10 }}>
                <img
                  src="/characters/woody.png"
                  alt="Woody"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    border: "3.5px solid #ffffff",
                    boxShadow: "0 6px 0 #b45309, 0 14px 25px rgba(0,0,0,0.45)",
                    transform: "rotate(-8deg) translateY(-2px)",
                    background: "#ffffff",
                    flexShrink: 0,
                  }}
                />
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "122px",
                      height: "122px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "4.5px solid #fde047",
                      boxShadow: "0 8px 0 #ca8a04, 0 18px 32px rgba(0,0,0,0.6)",
                      background: "#1e3a8a",
                    }}
                  >
                    <img
                      src="/dyaksa_photo.png"
                      alt="Dyaksa Wiratara"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top center",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.38rem",
                      color: "#fde047",
                      textShadow: "0 3px 0 #78350f, 0 6px 14px rgba(0,0,0,0.6)",
                      letterSpacing: "0.04em",
                      marginTop: "0.35rem",
                    }}
                  >
                    SHERIFF DYAKSA
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "0.15rem",
                      background: "rgba(255,255,255,0.22)",
                      backdropFilter: "blur(4px)",
                      color: "#ffffff",
                      fontSize: "0.76rem",
                      fontWeight: 900,
                      padding: "0.15rem 0.75rem",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.4)",
                    }}
                  >
                    SMKN 1 JENANGAN · PONOROGO
                  </span>
                </div>
                <img
                  src="/characters/buzz.png"
                  alt="Buzz"
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    border: "3.5px solid #ffffff",
                    boxShadow: "0 6px 0 #15803d, 0 14px 25px rgba(0,0,0,0.45)",
                    transform: "rotate(8deg) translateY(-2px)",
                    background: "#ffffff",
                    flexShrink: 0,
                  }}
                />
              </div>

              {/* Sole of the Toy Boot with Andy's Sharpie Marker Signature */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  left: "0.75rem",
                  right: "0.75rem",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(8px)",
                  padding: "0.55rem 1rem",
                  borderRadius: "18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "3px solid #22c55e",
                  boxShadow: "0 4px 0 #15803d",
                  zIndex: 10,
                }}
              >
                <div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 900, color: "#15803d", display: "block", fontFamily: "var(--font-display)" }}>
                    PROPERTI KAMAR DYAKSA:
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.35rem",
                      letterSpacing: "0.14em",
                      color: "#78350f",
                    }}
                  >
                    D Y A K S A #{petCount}
                  </span>
                </div>

                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "linear-gradient(180deg, #ef4444 0%, #b91c1c 100%)",
                    color: "#ffffff",
                    padding: "0.45rem 1.1rem",
                    borderRadius: "999px",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 0 #7f1d1d",
                  }}
                  onClick={handleFireLaser}
                >
                  TRY ME! ⚡
                </button>
              </div>
            </div>

            {/* Wheezy Lo-Fi Jukebox Bar */}
            <div style={{ marginTop: "1rem", background: "#ffffff", border: "2.5px solid #38bdf8", borderRadius: "18px", padding: "0.85rem 1.1rem", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 0 #0284c7" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <WheezyFigure size={34} />
                <div>
                  <strong style={{ fontSize: "0.85rem", color: "#0f172a", display: "block" }}>
                    {WHEEZY_TRACKS[currentTrackIndex].title}
                  </strong>
                  <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 800 }}>
                    {WHEEZY_TRACKS[currentTrackIndex].artist}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                {isPlayingMusic && (
                  <div className="equalizer-container">
                    <div className="equalizer-bar" />
                    <div className="equalizer-bar" />
                    <div className="equalizer-bar" />
                    <div className="equalizer-bar" />
                  </div>
                )}
                <button
                  style={{ border: "none", background: isPlayingMusic ? "#22c55e" : "#ef4444", color: "#ffffff", padding: "0.35rem 0.75rem", borderRadius: "999px", fontWeight: 900, fontSize: "0.75rem", cursor: "pointer", boxShadow: "0 2px 0 rgba(0,0,0,0.2)" }}
                  onClick={(e) => {
                    const next = !isPlayingMusic;
                    setIsPlayingMusic(next);
                    triggerExplosion(e, next ? "JAMMIN'! 🎵" : "PAUSED! ⏸", "boing");
                  }}
                >
                  {isPlayingMusic ? "⏸ PAUSE" : "▶ PLAY"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* ======================================================= */}
        {/* 🐷 HAMM PIGGY BANK & FORKY CHEER WIDGETS                */}
        {/* ======================================================= */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem", marginTop: "2rem" }}>
          {/* Hamm Piggy Bank Coin Counter Widget */}
          <div className="hamm-coin-slot-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <HammFigure size={48} />
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 900, color: "#0f172a" }}>
                    Hamm's Piggy Bank
                  </h3>
                  <span style={{ fontSize: "0.82rem", color: "#db2777", fontWeight: 900 }}>
                    TABUNGAN KOIN KAMAR DYAKSA
                  </span>
                </div>
              </div>

              <div style={{ background: "#fef08a", border: "2px solid #eab308", color: "#78350f", fontWeight: 900, fontSize: "1rem", padding: "0.3rem 0.8rem", borderRadius: "999px", boxShadow: "0 3px 0 #ca8a04" }}>
                {hammCoins} COINS
              </div>
            </div>

            <p style={{ fontSize: "0.92rem", color: "#475569", fontWeight: 700, margin: "0 0 1rem" }}>
              Klik tombol di bawah untuk memasukkan koin ke lubang celengan Hamm dan dengarkan suaranya!
            </p>

            <button
              className="buzz-btn-oval buzz-btn-red"
              style={{ width: "100%", height: "46px", fontSize: "0.95rem" }}
              onClick={handleDropCoin}
            >
              MASUKKAN KOIN (INSERT COIN) 🪙
            </button>
          </div>

          {/* Forky Handmade Craft Banner Widget */}
          <div className="potato-head-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <ForkyFigure size={50} />
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 900, color: "#0f172a" }}>
                    Forky Cheer Counter
                  </h3>
                  <span style={{ fontSize: "0.82rem", color: "#92400e", fontWeight: 900 }}>
                    SEMANGAT #{forkyScore}
                  </span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.95rem", color: "#1e293b", fontWeight: 700, margin: "0 0 1rem" }}>
              "Aku bukan sampah! Aku adalah Frontend Developer handal dari SMKN 1 Jenangan Ponorogo! ✨"
            </p>

            <button
              className="buzz-btn-oval buzz-btn-green"
              style={{ width: "100%", height: "44px", fontSize: "0.92rem" }}
              onClick={handleCheerForky}
            >
              SEMANGATI FORKY! ❤️
            </button>
          </div>
        </section>

        {/* ======================================================= */}
        {/* 🤠 NO 3: TENTANG SAYA (DENGAN FOTO BESAR & JELAS)        */}
        {/* ======================================================= */}
        <section style={{ paddingTop: "5rem" }} id="tentang-saya">
          <div className="toy-section-tag">
            <WoodyFigure size={26} />
            <span>BAGIAN 03 · TENTANG SAYA</span>
          </div>

          <h2 className="toy-section-heading">
            Mengenal Sheriff Dyaksa Wiratara
          </h2>
          <p style={{ margin: "0.5rem 0 0", fontSize: "1.15rem", color: "#334155", fontWeight: 700 }}>
            Kisah di balik layar, biodata lengkap, bidang keahlian utama, serta prinsip dan visi pribadi.
          </p>

          <div className="etch-sketch-widget" style={{ marginTop: "2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1rem", color: "#fef08a", fontWeight: 900, fontSize: "1.35rem", letterSpacing: "0.14em" }}>
              MAGIC Etch A Sketch RETRO BOARD ⚡
            </div>

            <div className="etch-screen-frame">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.8rem", alignItems: "stretch" }}>
                {/* Kolom 1: FOTO PROFESIONAL BESAR & JELAS */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      background: "#ffffff",
                      border: "4px solid #f59e0b",
                      borderRadius: "24px",
                      padding: "1rem 1rem 1.4rem",
                      boxShadow: "0 8px 0 #b45309, 0 16px 30px rgba(0,0,0,0.22)",
                      width: "100%",
                      maxWidth: "340px",
                      textAlign: "center",
                      position: "relative",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Pin Marker Hiasan Andy */}
                    <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", fontSize: "1.7rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
                      📌
                    </div>

                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "360px",
                        borderRadius: "18px",
                        overflow: "hidden",
                        border: "3.5px solid #cbd5e1",
                        background: "#1e3a8a",
                        boxShadow: "inset 0 0 18px rgba(0,0,0,0.35)",
                      }}
                    >
                      <img
                        src="/dyaksa_photo.png"
                        alt="Dyaksa Wiratara Maharshi"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "top center",
                          display: "block",
                        }}
                      />
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                      <div style={{ fontFamily: "var(--font-gill)", fontWeight: 900, fontSize: "1.3rem", color: "#78350f" }}>
                        Dyaksa Wiratara Maharshi
                      </div>
                      <span style={{ display: "inline-block", marginTop: "0.25rem", background: "#fef08a", color: "#78350f", padding: "0.25rem 0.85rem", borderRadius: "999px", fontSize: "0.82rem", fontWeight: 900, border: "1.5px solid #eab308" }}>
                        SMKN 1 JENANGAN · ASLI PONOROGO
                      </span>
                      <div style={{ fontSize: "0.82rem", color: "#475569", fontWeight: 800, marginTop: "0.45rem" }}>
                        🚲 Bersepeda · 📷 Mempotret Gambar · 🎒 Jalan-Jalan
                      </div>
                    </div>
                  </div>
                </div>

                {/* Kolom 2: Biodata Singkat & Informasi Kontak */}
                <div
                  style={{
                    background: "#ffffff",
                    border: "4px solid #22c55e",
                    borderRadius: "24px",
                    padding: "1.5rem",
                    boxShadow: "0 8px 0 #15803d, 0 16px 30px rgba(0,0,0,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.1rem" }}>
                    <span style={{ fontSize: "1.7rem" }}>🤠</span>
                    <h3 style={{ fontSize: "1.38rem", fontWeight: 900, margin: 0, color: "#0f172a" }}>
                      Biodata & Informasi Kontak
                    </h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.95rem", color: "#1e293b", fontWeight: 700 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span style={{ color: "#78350f", width: "145px", flexShrink: 0 }}>TTL:</span>
                      <strong style={{ color: "#0f172a" }}>Ponorogo, 03 Maret 2009</strong>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span style={{ color: "#78350f", width: "145px", flexShrink: 0 }}>Domisili:</span>
                      <strong style={{ color: "#0f172a" }}>Ponorogo, Jawa Timur</strong>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span style={{ color: "#78350f", width: "145px", flexShrink: 0 }}>Instagram:</span>
                      <a href="https://instagram.com/dyaksaaovr" target="_blank" rel="noreferrer" style={{ color: "#be185d", fontWeight: 900, textDecoration: "underline" }}>
                        @dyaksaaovr
                      </a>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span style={{ color: "#78350f", width: "145px", flexShrink: 0 }}>Email:</span>
                      <a href="mailto:dyaksaaovr@gmail.com" style={{ color: "#0284c7", fontWeight: 900, textDecoration: "underline" }}>
                        dyaksaaovr@gmail.com
                      </a>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                      <span style={{ color: "#78350f", width: "145px", flexShrink: 0 }}>Sekolah Saat Ini:</span>
                      <span style={{ background: "#dcfce7", color: "#166534", padding: "0.18rem 0.65rem", borderRadius: "6px", border: "1.5px solid #86efac", fontWeight: 900 }}>
                        SMK Negeri 1 Jenangan (RPL)
                      </span>
                    </div>
                  </div>

                  <div style={{ marginTop: "auto", paddingTop: "1.1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ padding: "0.32rem 0.8rem", borderRadius: "999px", background: "#f0fdf4", fontWeight: 900, fontSize: "0.82rem", border: "2px solid #22c55e", color: "#166534", boxShadow: "0 2px 0 #15803d" }}>
                      🌐 Web Developer
                    </span>
                    <span style={{ padding: "0.32rem 0.8rem", borderRadius: "999px", background: "#eff6ff", fontWeight: 900, fontSize: "0.82rem", border: "2px solid #3b82f6", color: "#1d4ed8", boxShadow: "0 2px 0 #1e40af" }}>
                      💻 Front-End & Back-End
                    </span>
                    <span style={{ padding: "0.32rem 0.8rem", borderRadius: "999px", background: "#fffbeb", fontWeight: 900, fontSize: "0.82rem", border: "2px solid #f59e0b", color: "#78350f", boxShadow: "0 2px 0 #b45309" }}>
                      📍 Ponorogo, Jawa Timur
                    </span>
                  </div>
                </div>

                {/* Kolom 3: Visi, Misi & Prinsip Pribadi */}
                <div
                  style={{
                    background: "#ffffff",
                    border: "4px solid #3b82f6",
                    borderRadius: "24px",
                    padding: "1.5rem",
                    boxShadow: "0 8px 0 #1d4ed8, 0 16px 30px rgba(0,0,0,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.95rem",
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontSize: "1.7rem" }}>⭐</span>
                    <h3 style={{ fontSize: "1.38rem", fontWeight: 900, margin: 0, color: "#0f172a" }}>
                      Visi, Misi & Prinsip
                    </h3>
                  </div>

                  <div style={{ background: "#eff6ff", border: "2px solid #93c5fd", borderRadius: "14px", padding: "0.85rem 1rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#1e40af", display: "block", marginBottom: "0.25rem" }}>
                      🎯 VISI:
                    </span>
                    <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.55, color: "#1e293b", fontWeight: 700 }}>
                      Menjadi web developer yang mampu membuat perangkat lunak yang rapi, mudah digunakan, dan benar-benar bermanfaat bagi penggunanya.
                    </p>
                  </div>

                  <div style={{ background: "#f0fdf4", border: "2px solid #86efac", borderRadius: "14px", padding: "0.85rem 1rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#166534", display: "block", marginBottom: "0.25rem" }}>
                      🚀 MISI:
                    </span>
                    <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.55, color: "#1e293b", fontWeight: 700 }}>
                      Menguasai dasar pemrograman dengan kuat, membiasakan menulis kode sesuai best practice, dan menyelesaikan setiap proyek sampai tuntas.
                    </p>
                  </div>

                  <div style={{ background: "#fffbeb", border: "2px solid #fcd34d", borderRadius: "14px", padding: "0.85rem 1rem", marginTop: "auto" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 900, color: "#92400e", display: "block", marginBottom: "0.25rem" }}>
                      💡 PRINSIP PRIBADI:
                    </span>
                    <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.55, color: "#78350f", fontWeight: 700, fontStyle: "italic" }}>
                      Jujur pada hasil kerja sendiri, disiplin pada tenggat waktu, dan tidak berhenti bertanya ketika belum paham.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Knobs at Bottom */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.4rem", padding: "0 1rem" }}>
              <div className="etch-white-knob" style={{ transform: `rotate(${etchKnobDeg}deg)` }} onClick={handleShakeEtch} title="Putar Kenop Kiri!">
                ⚙️
              </div>
              <span style={{ color: "#fef08a", fontWeight: 900, fontSize: "0.92rem" }}>
                PUTAR KENOP PUTIH UNTUK MENGGOYANG PAPAN! 🔄
              </span>
              <div className="etch-white-knob" style={{ transform: `rotate(-${etchKnobDeg}deg)` }} onClick={handleShakeEtch} title="Putar Kenop Kanan!">
                ⚙️
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* 💼 NO 03: PROFIL PROFESIONAL                             */}
        {/* ======================================================= */}
        <section style={{ paddingTop: "5rem" }} id="profil-profesional">
          <div className="toy-section-tag">
            <BuzzFigure size={26} />
            <span>BAGIAN 03 · PROFIL PROFESIONAL</span>
          </div>

          <h2 className="toy-section-heading">
            Profil Profesional
          </h2>
          <p style={{ margin: "0.5rem 0 0", fontSize: "1.15rem", color: "#334155", fontWeight: 700 }}>
            Jabatan, instansi, dan bidang yang saya tekuni.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem", marginTop: "2rem" }}>
            {/* Card 1: Jabatan & Peran */}
            <div className="toy-card-surface" style={{ border: "4.5px solid #38bdf8", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "#e0f2fe", border: "2.5px solid #38bdf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>
                  💻
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "0.3rem 0.8rem", borderRadius: "999px", background: "#fef08a", color: "#78350f", border: "2px solid #eab308" }}>
                  JABATAN / STATUS ⭐
                </span>
              </div>

              <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 900, color: "#0f172a" }}>
                Siswa Aktif Kelas XII RPL & Junior Web Developer
              </h3>

              <p style={{ margin: 0, fontSize: "0.98rem", lineHeight: 1.7, color: "#334155", fontWeight: 700 }}>
                Siswa aktif kelas XII Rekayasa Perangkat Lunak sekaligus peserta uji kompetensi skema Junior Web Developer.
              </p>

              <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, padding: "0.25rem 0.7rem", borderRadius: "8px", background: "#f1f5f9", border: "1.5px solid #cbd5e1", color: "#0f172a" }}>
                  Kelas XII RPL
                </span>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, padding: "0.25rem 0.7rem", borderRadius: "8px", background: "#f1f5f9", border: "1.5px solid #cbd5e1", color: "#0f172a" }}>
                  Junior Web Developer
                </span>
              </div>
            </div>

            {/* Card 2: Instansi */}
            <div className="toy-card-surface" style={{ border: "4.5px solid #22c55e", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 10px 0 #15803d, 0 22px 45px rgba(0,0,0,0.14)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "#dcfce7", border: "2.5px solid #22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>
                  🏫
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "0.3rem 0.8rem", borderRadius: "999px", background: "#dcfce7", color: "#166534", border: "2px solid #86efac" }}>
                  INSTANSI 🏛️
                </span>
              </div>

              <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 900, color: "#0f172a" }}>
                SMK Negeri 1 Jenangan
              </h3>

              <p style={{ margin: 0, fontSize: "0.98rem", lineHeight: 1.7, color: "#334155", fontWeight: 700 }}>
                SMK Negeri 1 Jenangan, Jl. Niken Gandini No. 98, Setono, Jenangan, Kabupaten Ponorogo, Jawa Timur.
              </p>

              <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, padding: "0.25rem 0.7rem", borderRadius: "8px", background: "#f1f5f9", border: "1.5px solid #cbd5e1", color: "#0f172a" }}>
                  Jl. Niken Gandini No. 98, Setono
                </span>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, padding: "0.25rem 0.7rem", borderRadius: "8px", background: "#f1f5f9", border: "1.5px solid #cbd5e1", color: "#0f172a" }}>
                  Ponorogo, Jawa Timur
                </span>
              </div>
            </div>

            {/* Card 3: Bidang yang Ditekuni */}
            <div className="toy-card-surface" style={{ border: "4.5px solid #f59e0b", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 10px 0 #b45309, 0 22px 45px rgba(0,0,0,0.14)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "#fef3c7", border: "2.5px solid #f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>
                  🚀
                </div>
                <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "0.3rem 0.8rem", borderRadius: "999px", background: "#fef3c7", color: "#92400e", border: "2px solid #fcd34d" }}>
                  BIDANG DITEKUNI ⚡
                </span>
              </div>

              <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 900, color: "#0f172a" }}>
                Pengembangan Website & Modern Stack
              </h3>

              <p style={{ margin: 0, fontSize: "0.98rem", lineHeight: 1.7, color: "#334155", fontWeight: 700 }}>
                Pengembangan website (HTML, CSS, JavaScript, PHP, MySQL), Eksplorasi mandiri teknologi modern React 19, Next.js 16, dan Tailwind CSS v4.
              </p>

              <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, padding: "0.25rem 0.7rem", borderRadius: "8px", background: "#f1f5f9", border: "1.5px solid #cbd5e1", color: "#0f172a" }}>
                  HTML · CSS · JS · PHP · MySQL
                </span>
                <span style={{ fontSize: "0.8rem", fontWeight: 800, padding: "0.25rem 0.7rem", borderRadius: "8px", background: "#f1f5f9", border: "1.5px solid #cbd5e1", color: "#0f172a" }}>
                  React 19 · Next.js 16 · Tailwind v4
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* 🎓 NO 5: PENDIDIKAN (TERBARU KE TERLAMA)                 */}
        {/* ======================================================= */}
        <section style={{ paddingTop: "5rem" }} id="pendidikan">
          <div className="toy-section-tag">
            <PixarBall size={24} />
            <span>BAGIAN 05 · PENDIDIKAN</span>
          </div>

          <h2 className="toy-section-heading">
            Riwayat Pendidikan
          </h2>
          <p style={{ margin: "0.5rem 0 0", fontSize: "1.1rem", color: "#334155", fontWeight: 700 }}>
            Rekam jejak pendidikan akademis dari jenjang terbaru ke jenjang terlama.
          </p>

          <div className="toy-edu-track">
            {TOY_EDUCATION.map((edu, idx) => (
              <div
                key={edu.institution}
                className="toy-edu-card"
                onClick={(e) => triggerExplosion(e, "SEKOLAH! 🎓", "fanfare")}
                style={{ cursor: "pointer" }}
                title="Klik untuk efek kembang api!"
              >
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.85rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "54px", height: "54px", borderRadius: "18px", background: idx === 0 ? "#fef08a" : "#f1f5f9", border: "3px solid #f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.7rem", boxShadow: "0 4px 0 #b45309" }}>
                      {edu.icon}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                        <h3 style={{ margin: 0, fontSize: "1.45rem", fontWeight: 900, color: "#0f172a" }}>
                          {edu.institution}
                        </h3>
                        <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "0.2rem 0.75rem", borderRadius: "999px", background: idx === 0 ? "#dcfce7" : "#f1f5f9", color: idx === 0 ? "#166534" : "#475569", border: "1.5px solid #cbd5e1" }}>
                          {edu.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.92rem", color: "#16a34a", fontWeight: 800, marginTop: "0.2rem" }}>
                        {edu.major} · {edu.location}
                      </div>
                    </div>
                  </div>

                  <span style={{ background: "#fef08a", color: "#78350f", border: "2px solid #eab308", fontWeight: 900, fontSize: "0.9rem", padding: "0.4rem 1rem", borderRadius: "999px", boxShadow: "0 3px 0 #ca8a04" }}>
                    {edu.period}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: "0.98rem", lineHeight: 1.7, color: "#334155", fontWeight: 700 }}>
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================= */}
        {/* 🚀 NO 6: PENGALAMAN (4 PILAR UTAMA)                      */}
        {/* ======================================================= */}
        <section style={{ paddingTop: "5rem" }} id="pengalaman">
          <div className="toy-section-tag">
            <AlienFigure size={26} />
            <span>BAGIAN 06 · PENGALAMAN</span>
          </div>

          <h2 className="toy-section-heading">
            4 Pilar Pengalaman
          </h2>
          <p style={{ margin: "0.5rem 0 0", fontSize: "1.1rem", color: "#334155", fontWeight: 700 }}>
            Pengalaman Belajar, Pengalaman Bekerja/PKL, Pengalaman Organisasi, dan Pengalaman Proyek.
          </p>

          {/* Filter Pills for Experience */}
          <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {[
              { key: "all", label: "Semua Pengalaman" },
              { key: "Pengalaman Belajar", label: "Pengalaman Belajar" },
              { key: "Pengalaman Bekerja / PKL", label: "Pengalaman Bekerja / PKL" },
              { key: "Pengalaman Organisasi", label: "Pengalaman Organisasi" },
              { key: "Pengalaman Proyek", label: "Pengalaman Proyek" },
            ].map((f) => (
              <button
                key={f.key}
                className={`buzz-btn-oval ${experienceFilter === f.key ? "buzz-btn-red" : "buzz-btn-green"}`}
                style={{ width: "auto", padding: "0.45rem 1.1rem", fontSize: "0.88rem" }}
                onClick={(e) => {
                  setExperienceFilter(f.key);
                  triggerExplosion(e, "FILTER! 🚀", "pop");
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem" }}>
            {TOY_EXPERIENCES.filter((exp) => experienceFilter === "all" || exp.category === experienceFilter).map((exp) => (
              <div
                key={exp.title}
                className="toy-card-surface"
                style={{ border: "4.5px solid #f59e0b", padding: "1.8rem", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 10px 0 #b45309, 0 22px 45px rgba(0,0,0,0.14)", cursor: "pointer" }}
                onClick={(e) => triggerExplosion(e, "YEE-HAW! 🤠", "pop")}
                title="Klik untuk ledakan suara!"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 900, padding: "0.3rem 0.8rem", borderRadius: "999px", background: "#fef08a", color: "#78350f", border: "2px solid #eab308" }}>
                    {exp.category}
                  </span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#64748b" }}>
                    {exp.period}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{ fontSize: "2rem" }}>{exp.icon}</div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 900, color: "#0f172a" }}>
                      {exp.title}
                    </h3>
                    <span style={{ fontSize: "0.88rem", color: "#16a34a", fontWeight: 800 }}>
                      {exp.role}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", margin: "0.4rem 0" }}>
                  {exp.points.map((pt, pIdx) => (
                    <div key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", fontSize: "0.94rem", color: "#334155", fontWeight: 600, lineHeight: 1.55 }}>
                      <span style={{ color: "#22c55e", fontWeight: 900, flexShrink: 0 }}>✔</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "auto", paddingTop: "0.6rem", borderTop: "2px dashed #cbd5e1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#854d0e" }}>
                    ⭐ {exp.toyBadge}
                  </span>
                  <span style={{ fontSize: "0.8rem", background: "#f1f5f9", padding: "0.2rem 0.6rem", borderRadius: "6px", fontWeight: 800, color: "#475569" }}>
                    Andy Approved
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================= */}
        {/* ⚡ NO 05: KEAHLIAN (+ TINGKAT KEMAMPUAN %)                 */}
        {/* ======================================================= */}
        <section style={{ paddingTop: "5rem" }} id="keahlian">
          <div className="toy-section-tag">
            <RexFigure size={26} />
            <span>BAGIAN 05 · KEAHLIAN</span>
          </div>

          <h2 className="toy-section-heading">
            Keahlian & Tingkat Kemampuan
          </h2>
          <p style={{ margin: "0.5rem 0 0", fontSize: "1.1rem", color: "#334155", fontWeight: 700 }}>
            Keahlian teknis & tingkat kemampuan. Persentase di bawah adalah penilaian diri sendiri terhadap tingkat penguasaan saat ini.
          </p>

          {/* Filter Pills for Skills */}
          <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {[
              { key: "all", label: "Semua Kategori" },
              { key: "Coding", label: "Coding" },
              { key: "Web Development", label: "Web Development" },
              { key: "KKA", label: "KKA (Komputasional)" },
              { key: "AI & Modern Tools", label: "AI & Modern Tools" },
              { key: "Soft Skills", label: "Soft Skills" },
            ].map((f) => (
              <button
                key={f.key}
                className={`buzz-btn-oval ${skillCategoryFilter === f.key ? "buzz-btn-red" : "buzz-btn-green"}`}
                style={{ width: "auto", padding: "0.45rem 1.1rem", fontSize: "0.88rem" }}
                onClick={(e) => {
                  setSkillCategoryFilter(f.key);
                  triggerExplosion(e, "SKILLS! ⚡", "laser");
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.4rem" }}>
            {detailedSkillsList
              .map((skill, originalIdx) => ({ skill, originalIdx }))
              .filter(({ skill }) => skillCategoryFilter === "all" || skill.category === skillCategoryFilter)
              .map(({ skill, originalIdx }) => (
                <div key={skill.name} className="toy-skill-battery">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.65rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                      <span style={{ fontSize: "1.6rem" }}>{skill.icon}</span>
                      <div>
                        <strong style={{ fontSize: "1.02rem", color: "#0f172a", display: "block" }}>
                          {skill.name}
                        </strong>
                        <span style={{ fontSize: "0.78rem", color: "#16a34a", fontWeight: 800 }}>
                          {skill.tier}
                        </span>
                      </div>
                    </div>

                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 900, color: "#1e40af" }}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Meter Bar */}
                  <div className="toy-meter-bar">
                    <div className="toy-meter-fill" style={{ width: `${skill.level}%` }} />
                  </div>

                  <p style={{ margin: "0.65rem 0 0.85rem", fontSize: "0.85rem", color: "#475569", fontWeight: 600, lineHeight: 1.5 }}>
                    {skill.notes}
                  </p>

                  <button
                    className="buzz-btn-oval buzz-btn-blue"
                    style={{ width: "100%", height: "36px", fontSize: "0.82rem", padding: "0.2rem 0.6rem" }}
                    onClick={(e) => handleDetailedSkillBoost(originalIdx, e)}
                  >
                    ⚡ TINGKATKAN SKILL (+2%)
                  </button>
                </div>
              ))}
          </div>

          {/* Bagian Bahasa */}
          <div style={{ marginTop: "2rem", background: "#ffffff", border: "4px solid #22c55e", borderRadius: "24px", padding: "1.5rem", boxShadow: "0 8px 0 #15803d" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "1.25rem", fontWeight: 900, color: "#0f172a" }}>
              🗣️ Kemampuan Bahasa:
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem" }}>
              <span style={{ background: "#dcfce7", color: "#166534", padding: "0.5rem 1.1rem", borderRadius: "999px", fontWeight: 900, fontSize: "0.92rem", border: "2px solid #86efac" }}>
                🇮🇩 Indonesia — Aktif
              </span>
              <span style={{ background: "#fef08a", color: "#78350f", padding: "0.5rem 1.1rem", borderRadius: "999px", fontWeight: 900, fontSize: "0.92rem", border: "2px solid #eab308" }}>
                🌾 Jawa — Aktif
              </span>
              <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "0.5rem 1.1rem", borderRadius: "999px", fontWeight: 900, fontSize: "0.92rem", border: "2px solid #7dd3fc" }}>
                🇬🇧 Inggris — Dasar
              </span>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* 🕹️ NO 06: KARYA & PORTOFOLIO                             */}
        {/* ======================================================= */}
        <section style={{ paddingTop: "5rem" }} id="portofolio">
          <div className="toy-section-tag">
            <WoodyFigure size={26} />
            <span>BAGIAN 06 · KARYA & PORTOFOLIO</span>
          </div>

          <h2 className="toy-section-heading">
            Karya & Portofolio
          </h2>
          <p style={{ margin: "0.5rem 0 0", fontSize: "1.1rem", color: "#334155", fontWeight: 700 }}>
            Proyek yang sudah saya kerjakan.
          </p>

          <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {[
              { key: "all", label: "Semua Karya" },
              { key: "proyek", label: "Mini Project Serkom" },
              { key: "pkl", label: "PKL" },
              { key: "sekolah", label: "Proyek Sekolah" },
            ].map((f) => (
              <button
                key={f.key}
                className={`buzz-btn-oval ${projectFilter === f.key ? "buzz-btn-red" : "buzz-btn-green"}`}
                style={{ width: "auto", padding: "0.45rem 1.1rem", fontSize: "0.88rem" }}
                onClick={(e) => {
                  setProjectFilter(f.key);
                  triggerExplosion(e, "FILTER! 🔍", "pop");
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem" }}>
            {filteredProjects.map((p) => (
              <article key={p.title} style={{ background: "#ffffff", border: "4.5px solid #38bdf8", borderRadius: "32px 16px 34px 18px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 10px 0 #0284c7, 0 22px 45px rgba(0, 0, 0, 0.15)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "16px 6px 16px 6px", background: "#f8fafc", border: "3px solid #38bdf8", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 0 #0284c7" }}>
                    {p.iconRender}
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 900, padding: "0.25rem 0.65rem", borderRadius: "999px", background: "#dbeafe", color: "#1e40af", border: "1.5px solid #93c5fd" }}>
                      {p.category}
                    </span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 900, padding: "0.25rem 0.65rem", borderRadius: "999px", background: "#fef08a", color: "#854d0e", border: "1.5px solid #eab308" }}>
                      {p.tag}
                    </span>
                  </div>
                </div>

                <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 900, color: "#0f172a" }}>
                  {p.title}
                </h3>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "#334155", lineHeight: 1.65, fontWeight: 600 }}>
                  {p.desc}
                </p>

                <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {p.stack.map((t) => (
                    <span key={t} style={{ fontSize: "0.8rem", fontWeight: 800, padding: "0.25rem 0.7rem", borderRadius: "8px", background: "#f1f5f9", border: "1.5px solid #cbd5e1", color: "#0f172a" }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {p.linkUrl && (
                    <a
                      href={p.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="buzz-btn-oval buzz-btn-green"
                      style={{ width: "100%", height: "44px", fontSize: "0.92rem", textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                      onClick={(e) => triggerExplosion(e, "KUNJUNGI! 🔗", "pop")}
                    >
                      🌐 Kunjungi website
                    </a>
                  )}

                  <button
                    className="buzz-btn-oval buzz-btn-red"
                    style={{ width: "100%", height: "44px", fontSize: "0.92rem" }}
                    onClick={(e) => {
                      setSelectedProjectModal(p);
                      triggerExplosion(e, "UNBOXING! 📦", "explosion");
                    }}
                  >
                    BUKA KOTAK MAINAN
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ======================================================= */}
        {/* 🏆 NO 07: SERTIFIKAT & PRESTASI                          */}
        {/* ======================================================= */}
        <section style={{ paddingTop: "5rem" }} id="sertifikat-prestasi">
          <div className="toy-section-tag">
            <PixarBall size={24} />
            <span>BAGIAN 07 · SERTIFIKAT & PRESTASI</span>
          </div>

          <h2 className="toy-section-heading">
            Sertifikasi, Pelatihan, & Penghargaan
          </h2>
          <p style={{ margin: "0.5rem 0 0", fontSize: "1.1rem", color: "#334155", fontWeight: 700 }}>
            Sertifikasi, pelatihan, dan penghargaan.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem", marginTop: "2rem" }}>
            {TOY_CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                className="toy-cert-card"
                onClick={(e) => {
                  setSelectedCertModal(cert);
                  triggerExplosion(e, "PRESTASI! 🏆", "fanfare");
                }}
                style={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                title="Klik untuk melihat detail & foto sertifikat!"
              >
                <div>
                  {cert.image && (
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "170px",
                        borderRadius: "18px",
                        overflow: "hidden",
                        border: "3px solid #ca8a04",
                        marginBottom: "1.2rem",
                        boxShadow: "0 4px 0 #854d0e",
                        background: "#0f172a",
                      }}
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0.5rem",
                          right: "0.5rem",
                          background: "rgba(15, 23, 42, 0.85)",
                          color: "#fef08a",
                          fontSize: "0.75rem",
                          fontWeight: 900,
                          padding: "0.2rem 0.6rem",
                          borderRadius: "999px",
                          border: "1px solid #fde047",
                        }}
                      >
                        🔍 KLIK FOTO UNTUK ZOOM
                      </div>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "#fef08a", border: "3px solid #ca8a04", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.7rem", boxShadow: "0 4px 0 #854d0e" }}>
                      {cert.icon}
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ background: cert.badgeColor, color: "#ffffff", padding: "0.25rem 0.75rem", borderRadius: "999px", fontWeight: 900, fontSize: "0.78rem", border: "1.5px solid #ffffff", boxShadow: "0 2px 0 rgba(0,0,0,0.2)" }}>
                        {cert.type}
                      </span>
                      <span style={{ background: "#f1f5f9", color: "#0f172a", padding: "0.25rem 0.65rem", borderRadius: "999px", fontWeight: 800, fontSize: "0.8rem", border: "1.5px solid #cbd5e1" }}>
                        {cert.year}
                      </span>
                    </div>
                  </div>

                  <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.35 }}>
                    {cert.title}
                  </h3>
                  <span style={{ display: "block", marginTop: "0.3rem", fontSize: "0.88rem", color: "#16a34a", fontWeight: 800 }}>
                    Diterbitkan oleh: {cert.issuer}
                  </span>

                  {cert.period && (
                    <span style={{ display: "block", marginTop: "0.2rem", fontSize: "0.8rem", color: "#64748b", fontWeight: 700 }}>
                      Periode: {cert.period}
                    </span>
                  )}

                  <p style={{ margin: "0.85rem 0 0", fontSize: "0.92rem", lineHeight: 1.6, color: "#475569", fontWeight: 600 }}>
                    {cert.description}
                  </p>
                </div>

                <div style={{ marginTop: "1.2rem", paddingTop: "0.8rem", borderTop: "2px dashed #cbd5e1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#78350f" }}>
                    ✔ DIVERIFIKASI RESMI
                  </span>
                  <button
                    type="button"
                    style={{ border: "none", background: "linear-gradient(180deg, #fde047 0%, #ca8a04 100%)", color: "#78350f", padding: "0.35rem 0.85rem", borderRadius: "999px", fontWeight: 900, fontSize: "0.8rem", cursor: "pointer", boxShadow: "0 2px 0 #854d0e" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCertModal(cert);
                      triggerExplosion(e, "LIHAT FOTO! 📜", "fanfare");
                    }}
                  >
                    ⭐ {cert.image ? "LIHAT SERTIFIKAT" : "TERVERIFIKASI"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================= */}
        {/* 📸 NO 08: KEGIATAN & WORKSHOP                            */}
        {/* ======================================================= */}
        <section style={{ paddingTop: "5rem" }} id="kegiatan-workshop">
          <div className="toy-section-tag">
            <WoodyFigure size={26} />
            <span>BAGIAN 08 · KEGIATAN & WORKSHOP</span>
          </div>

          <h2 className="toy-section-heading">
            Dokumentasi Kegiatan Belajar, Workshop, & Seminar
          </h2>
          <p style={{ margin: "0.5rem 0 0", fontSize: "1.1rem", color: "#334155", fontWeight: 700 }}>
            Momen pembelajaran teknis, pelatihan industri, seminar teknologi, dan kolaborasi tim.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2.2rem", marginTop: "2rem" }}>
            {TOY_ACTIVITIES.map((act) => (
              <div
                key={act.id}
                style={{
                  background: "#ffffff",
                  border: "4.5px solid #38bdf8",
                  borderRadius: "32px 16px 34px 18px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 10px 0 #0284c7, 0 22px 45px rgba(0, 0, 0, 0.15)",
                }}
              >
                {/* Photo Frame Container */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "240px",
                    background: "#0f172a",
                    overflow: "hidden",
                    cursor: "pointer",
                    borderBottom: "3.5px solid #38bdf8",
                  }}
                  onClick={(e) => {
                    setSelectedActivityModal(act);
                    triggerExplosion(e, "LIHAT FOTO! 📸", "pop");
                  }}
                >
                  <img
                    src={act.image}
                    alt={act.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      transition: "transform 0.4s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "0.85rem",
                      left: "0.85rem",
                      background: "rgba(15, 23, 42, 0.85)",
                      color: "#38bdf8",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                      fontSize: "0.78rem",
                      fontWeight: 900,
                      border: "1.5px solid #38bdf8",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    🏷️ {act.category}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.85rem",
                      right: "0.85rem",
                      background: "linear-gradient(180deg, #fde047 0%, #ca8a04 100%)",
                      color: "#78350f",
                      padding: "0.3rem 0.85rem",
                      borderRadius: "999px",
                      fontSize: "0.82rem",
                      fontWeight: 900,
                      boxShadow: "0 2px 0 #854d0e",
                    }}
                  >
                    🔍 KLIK UNTUK ZOOM FOTO
                  </div>
                </div>

                {/* Content Box */}
                <div style={{ padding: "1.6rem", display: "flex", flexDirection: "column", gap: "0.85rem", flexGrow: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#16a34a", background: "#dcfce7", padding: "0.2rem 0.65rem", borderRadius: "999px", border: "1.5px solid #86efac" }}>
                      📅 {act.date}
                    </span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 900, color: "#0369a1", background: "#e0f2fe", padding: "0.2rem 0.65rem", borderRadius: "999px", border: "1.5px solid #bae6fd" }}>
                      📍 {act.location}
                    </span>
                  </div>

                  <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.4 }}>
                    {act.title}
                  </h3>

                  <p style={{ margin: 0, fontSize: "0.93rem", color: "#334155", lineHeight: 1.6, fontWeight: 600 }}>
                    {act.description}
                  </p>

                  <div style={{ marginTop: "auto", paddingTop: "0.8rem", display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                    {act.tags.map((t) => (
                      <span key={t} style={{ background: "#f1f5f9", color: "#475569", padding: "0.2rem 0.65rem", borderRadius: "999px", fontWeight: 800, fontSize: "0.78rem", border: "1px solid #cbd5e1" }}>
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="buzz-btn-oval buzz-btn-green"
                    style={{ width: "100%", height: "42px", fontSize: "0.9rem", marginTop: "0.5rem" }}
                    onClick={(e) => {
                      setSelectedActivityModal(act);
                      triggerExplosion(e, "DOKUMENTASI! 📸", "pop");
                    }}
                  >
                    BACA DOKUMENTASI KEGIATAN →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================= */}
        {/* 📝 NO 09: ARTIKEL & BLOG                                 */}
        {/* ======================================================= */}
        <section style={{ paddingTop: "5rem" }} id="artikel-blog">
          <div className="toy-section-tag">
            <AlienFigure size={26} />
            <span>BAGIAN 09 · ARTIKEL & BLOG</span>
          </div>

          <h2 className="toy-section-heading">
            Artikel & Blog
          </h2>
          <p style={{ margin: "0.5rem 0 0", fontSize: "1.1rem", color: "#334155", fontWeight: 700 }}>
            Catatan belajar dan tutorial singkat.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem", marginTop: "2rem" }}>
            {TOY_ARTICLES.map((art) => (
              <article
                key={art.title}
                style={{
                  background: "#ffffff",
                  border: "4.5px solid #22c55e",
                  borderRadius: "32px 16px 34px 18px",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  boxShadow: "0 10px 0 #15803d, 0 22px 45px rgba(0, 0, 0, 0.15)",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  setSelectedArticleModal(art);
                  triggerExplosion(e, "BACA BLOG! 📖", "pop");
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 900, padding: "0.25rem 0.75rem", borderRadius: "999px", background: "#dcfce7", color: "#166534", border: "1.5px solid #86efac" }}>
                    📅 {art.date}
                  </span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#15803d", background: "#f0fdf4", padding: "0.2rem 0.68rem", borderRadius: "999px", border: "1px solid #bbf7d0" }}>
                    ⏱️ {art.readTime}
                  </span>
                </div>

                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 900, color: "#0f172a", lineHeight: 1.4 }}>
                  {art.title}
                </h3>

                <p style={{ margin: 0, fontSize: "0.94rem", color: "#334155", lineHeight: 1.65, fontWeight: 600 }}>
                  {art.snippet}
                </p>

                <button
                  type="button"
                  className="buzz-btn-oval buzz-btn-green"
                  style={{ width: "100%", height: "42px", fontSize: "0.9rem", marginTop: "auto" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedArticleModal(art);
                    triggerExplosion(e, "BACA BLOG! 📖", "pop");
                  }}
                >
                  BACA SELENGKAPNYA →
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ======================================================= */}
        {/* 🗺️ ADVENTURE ROADMAP CHAPTERS                           */}
        {/* ======================================================= */}
        <section style={{ paddingTop: "5rem" }} id="roadmap">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.6rem 1.4rem", background: "#ffffff", border: "3.5px solid #f59e0b", borderRadius: "30px 10px 30px 10px", boxShadow: "0 5px 0 #b45309, 0 10px 20px rgba(0,0,0,0.12)", color: "#78350f", fontWeight: 900, fontSize: "0.95rem" }}>
            <PixarBall size={24} />
            <span>TOY STORY ADVENTURE MAP · CHAPTER 1, 2, 3</span>
          </div>

          <h2 style={{ margin: "1rem 0 0", fontSize: "clamp(2.5rem, 4.2vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#0f172a", textShadow: "0 3px 0 #ffffff" }}>
            Peta Misi & Petualangan Hidup
          </h2>

          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2rem" }}>
            {TOY_QUESTS.map((q, idx) => (
              <div key={q.title} style={{ background: "#ffffff", border: "4.5px solid #f59e0b", borderRadius: "32px 16px 36px 20px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 10px 0 #b45309, 0 22px 45px rgba(0, 0, 0, 0.15)" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "0.3rem 0.85rem", borderRadius: "999px", background: "#ffffff", border: "2px solid #f59e0b", color: "#78350f", width: "fit-content", boxShadow: "0 2px 0 #d97706" }}>
                  {q.tag}
                </span>

                <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 900, color: "#0f172a" }}>
                  {q.title}
                </h3>
                <span style={{ fontSize: "0.88rem", color: "#64748b", fontWeight: 800 }}>
                  {q.subtitle}
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", margin: "0.5rem 0" }}>
                  {q.bullets.map((b, bIdx) => (
                    <div key={bIdx} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", fontSize: "0.95rem", color: "#1e293b", fontWeight: 600 }}>
                      <div style={{ flexShrink: 0 }}>{b.icon}</div>
                      <span>{b.text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
                  <button
                    className="buzz-btn-oval buzz-btn-green"
                    style={{ width: "100%", height: "44px", fontSize: "0.9rem" }}
                    onClick={(e) => handleOpenChest(idx, e)}
                  >
                    {openedChests[idx] ? "PETI TERBUKA!" : "BUKA PETI RAHASIA WOODY"}
                  </button>

                  {openedChests[idx] && (
                    <div
                      style={{
                        marginTop: "0.85rem",
                        padding: "0.95rem",
                        borderRadius: "16px 6px 16px 6px",
                        background: "#fef08a",
                        border: "2.5px solid #eab308",
                        fontSize: "0.92rem",
                        fontWeight: 900,
                        color: "#78350f",
                        boxShadow: "0 3px 0 #ca8a04",
                      }}
                    >
                      {q.chestReward}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================= */}
        {/* 🍕 PIZZA PLANET ARCADE CLAW MACHINE WIDGET              */}
        {/* ======================================================= */}
        <section className="pizza-planet-cabinet-widget" id="minigame" style={{ marginTop: "5rem" }}>
          <div className="rocket-marquee-top">
            <AlienFigure size={32} />
            <span>PIZZA PLANET SPACE ARCADE · THE CLAW!</span>
            <AlienFigure size={32} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: "1.4rem", gap: "1rem" }}>
            <div>
              <p style={{ margin: 0, fontSize: "1.05rem", color: "#fef08a", fontWeight: 900 }}>
                {gameMsg}
              </p>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span style={{ fontWeight: 900, fontSize: "1.35rem", color: "#facc15" }}>
                SKOR: {gameScore} 🏆
              </span>
              <span style={{ fontWeight: 900, fontSize: "1.15rem", color: "#f87171" }}>
                COMBO: x{gameCombo} 🔥
              </span>
            </div>
          </div>

          <div style={{ height: "240px", borderRadius: "24px", background: "linear-gradient(180deg, #0c4a6e 0%, #082f49 100%)", border: "3.5px solid #38bdf8", boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.5)", position: "relative", overflow: "hidden", cursor: "crosshair" }}>
            <div style={{ position: "absolute", top: 0, left: `${clawX}%`, width: "5px", height: "50px", background: "#facc15", borderRadius: "999px" }} />
            
            <div
              style={{ position: "absolute", top: `${alienPos.top}%`, left: `${alienPos.left}%`, userSelect: "none", cursor: "pointer", transition: "transform 0.15s ease", filter: "drop-shadow(0 0 16px rgba(132, 204, 22, 0.8))" }}
              onClick={handleCatchAlien}
              title="TANGKAP ALIEN PIZZA PLANET!"
            >
              <AlienFigure size={58} />
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* ✉️ CONTACT - PIZZA PLANET COMMUNICATOR                  */}
        {/* ======================================================= */}
        <section style={{ paddingTop: "5rem" }} id="contact">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.6rem 1.4rem", background: "#ffffff", border: "3.5px solid #f59e0b", borderRadius: "30px 10px 30px 10px", boxShadow: "0 5px 0 #b45309, 0 10px 20px rgba(0,0,0,0.12)", color: "#78350f", fontWeight: 900, fontSize: "0.95rem" }}>
            <PixarBall size={24} />
            <span>PIZZA PLANET COMMUNICATOR · WHATSAPP</span>
          </div>

          <h2 style={{ margin: "1rem 0 0", fontSize: "clamp(2.5rem, 4.2vw, 4rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#0f172a", textShadow: "0 3px 0 #ffffff" }}>
            Kirim Pesan ke Sheriff Dyaksa!
          </h2>

          <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2.5rem" }}>
            <form style={{ background: "#ffffff", border: "5px solid #38bdf8", borderRadius: "36px 18px 40px 22px", padding: "2.2rem", boxShadow: "0 10px 0 #0284c7, 0 25px 50px rgba(0, 0, 0, 0.15)" }} onSubmit={handleSendWhatsApp}>
              <div style={{ marginBottom: "1.3rem" }}>
                <span style={{ display: "block", fontSize: "0.95rem", fontWeight: 900, marginBottom: "0.55rem", color: "#0f172a" }}>
                  Pilih Topik Cepat:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {TOY_PRESETS.map((p) => (
                    <button
                      type="button"
                      key={p}
                      style={{ padding: "0.4rem 0.9rem", borderRadius: "999px", border: "2px solid #38bdf8", background: "#f8fafc", color: "#0f172a", fontSize: "0.85rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 2px 0 #0284c7" }}
                      onClick={(e) => {
                        setContactMessage(p);
                        triggerExplosion(e, "TOPIC CHOSEN! ✉️", "pop");
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "1.3rem" }}>
                <label style={{ display: "block", fontWeight: 900, fontSize: "0.98rem", marginBottom: "0.45rem", color: "#0f172a" }} htmlFor="toy-name-input">
                  Nama Kamu / Organisasi:
                </label>
                <input
                  id="toy-name-input"
                  type="text"
                  style={{ width: "100%", padding: "0.95rem 1.2rem", borderRadius: "16px 6px 16px 6px", border: "2.5px solid #38bdf8", background: "#ffffff", color: "#0f172a", fontSize: "1rem", fontWeight: 700, outline: "none", boxShadow: "0 3px 0 rgba(56, 189, 248, 0.3)" }}
                  placeholder="Contoh: Andy Davis / Rekan Proyek"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: "1.3rem" }}>
                <label style={{ display: "block", fontWeight: 900, fontSize: "0.98rem", marginBottom: "0.45rem", color: "#0f172a" }} htmlFor="toy-msg-input">
                  Pesan Rahasia Kamu:
                </label>
                <textarea
                  id="toy-msg-input"
                  style={{ width: "100%", padding: "0.95rem 1.2rem", borderRadius: "16px 6px 16px 6px", border: "2.5px solid #38bdf8", background: "#ffffff", color: "#0f172a", fontSize: "1rem", fontWeight: 700, outline: "none", minHeight: "130px", resize: "vertical", boxShadow: "0 3px 0 rgba(56, 189, 248, 0.3)" }}
                  placeholder="Tuliskan pesanmu di sini..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="buzz-btn-oval buzz-btn-green"
                style={{ width: "100%", height: "52px", fontSize: "1.05rem" }}
                onClick={(e) => triggerExplosion(e, "LUNCURKAN! 🚀", "explosion")}
              >
                LUNCURKAN KE WHATSAPP (+62 859-0428-2198)
              </button>
            </form>

            {/* Quick Contact Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <a
                href="https://wa.me/6285904282198"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem", padding: "1.3rem", background: "#ffffff", border: "3.5px solid #38bdf8", borderRadius: "26px 10px 26px 10px", boxShadow: "0 6px 0 #0284c7" }}
                onClick={(e) => triggerExplosion(e, "WHATSAPP! 💬", "laser")}
              >
                <div style={{ width: "54px", height: "54px", borderRadius: "16px", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", border: "2.5px solid #86efac", flexShrink: 0, boxShadow: "0 3px 0 #16a34a" }}>
                  <WoodyFigure size={36} />
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: "1.15rem", color: "#0f172a" }}>WhatsApp Langsung</strong>
                  <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: 800 }}>+62 859 0428 2198 (Fast Response)</span>
                </div>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem", padding: "1.3rem", background: "#ffffff", border: "3.5px solid #38bdf8", borderRadius: "26px 10px 26px 10px", boxShadow: "0 6px 0 #0284c7" }}
                onClick={(e) => triggerExplosion(e, "GITHUB! 🐙", "pop")}
              >
                <div style={{ width: "54px", height: "54px", borderRadius: "16px", background: "#f1f5f9", color: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", border: "2.5px solid #cbd5e1", flexShrink: 0, boxShadow: "0 3px 0 #64748b" }}>
                  <BuzzFigure size={36} />
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: "1.15rem", color: "#0f172a" }}>GitHub Profile</strong>
                  <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: 800 }}>github.com/dykss-byte</span>
                </div>
              </a>

              <a
                href="https://instagram.com/dyaksaaovr"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "1rem", padding: "1.3rem", background: "#ffffff", border: "3.5px solid #38bdf8", borderRadius: "26px 10px 26px 10px", boxShadow: "0 6px 0 #0284c7" }}
                onClick={(e) => triggerExplosion(e, "INSTAGRAM! 📸", "pop")}
              >
                <div style={{ width: "54px", height: "54px", borderRadius: "16px", background: "#fce7f3", color: "#db2777", display: "flex", alignItems: "center", justifyContent: "center", border: "2.5px solid #fbcfe8", flexShrink: 0, boxShadow: "0 3px 0 #be185d" }}>
                  <AlienFigure size={36} />
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: "1.15rem", color: "#0f172a" }}>Instagram</strong>
                  <span style={{ fontSize: "0.9rem", color: "#475569", fontWeight: 800 }}>@dyaksaaovr</span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING ALIEN MASCOT */}
      <div style={{ position: "fixed", bottom: "4.2rem", right: "1.5rem", zIndex: 90, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.45rem" }}>
        {showAlienBalloon && (
          <div style={{ background: "#ffffff", color: "#0f172a", padding: "0.7rem 1.1rem", borderRadius: "20px 20px 4px 20px", fontSize: "0.88rem", fontWeight: 900, boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)", border: "3px solid #84cc16", maxWidth: "230px" }}>
            {ALIEN_DIALOGS[alienDialogIndex]}
          </div>
        )}

        <button
          style={{ width: "66px", height: "66px", borderRadius: "50%", background: "#ffffff", border: "4px solid #84cc16", boxShadow: "0 6px 0 #4d7c0f, 0 12px 24px rgba(0, 0, 0, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform 0.2s ease" }}
          onClick={(e) => {
            triggerExplosion(e, "THE CLAW! 👾", "alien");
            setAlienDialogIndex((p) => (p + 1) % ALIEN_DIALOGS.length);
            setShowAlienBalloon((p) => !p);
          }}
          title="Klik aku untuk suara Alien Toy Story!"
          aria-label="Little Green Alien"
        >
          <AlienFigure size={46} />
        </button>
      </div>

      {/* MODAL ACTION FIGURE PREVIEW */}
      {selectedProjectModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(10px)", zIndex: 150, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }} onClick={() => setSelectedProjectModal(null)}>
          <div style={{ background: "#ffffff", border: "4.5px solid #f59e0b", borderRadius: "34px 18px 36px 20px", padding: "2.2rem", maxWidth: "550px", width: "100%", boxShadow: "0 12px 0 #78350f, 0 30px 60px rgba(0, 0, 0, 0.3)", position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button
              style={{ position: "absolute", top: "1.25rem", right: "1.25rem", width: "38px", height: "38px", borderRadius: "50%", border: "2px solid #38bdf8", background: "#f1f5f9", color: "#0f172a", fontWeight: 900, fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              onClick={(e) => {
                triggerExplosion(e, "CLOSE! ✕", "pop");
                setSelectedProjectModal(null);
              }}
              aria-label="Tutup Kotak"
            >
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: "#fef08a", border: "2.5px solid #eab308", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {selectedProjectModal.iconRender}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.65rem", fontWeight: 900, color: "#0f172a" }}>
                  {selectedProjectModal.title}
                </h3>
                <span style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 900 }}>
                  {selectedProjectModal.category} · {selectedProjectModal.metric}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "1.02rem", lineHeight: 1.65, color: "#334155", margin: "1rem 0", fontWeight: 700 }}>
              {selectedProjectModal.longDesc}
            </p>

            <button
              className="buzz-btn-oval buzz-btn-green"
              style={{ width: "100%", height: "50px", fontSize: "1.05rem" }}
              onClick={(e) => {
                triggerExplosion(e, "LAUNCH DEMO! 🚀", "explosion");
                alert(`Membuka demo live mainan: ${selectedProjectModal.title} 🎉`);
              }}
            >
              BUKA DEMO MAINAN INTERAKTIF!
            </button>
          </div>
        </div>
      )}

      {/* MODAL ARTICLE READER */}
      {selectedArticleModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(10px)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSelectedArticleModal(null)}
        >
          <div
            style={{
              background: "#ffffff",
              border: "5px solid #22c55e",
              borderRadius: "36px 18px 40px 22px",
              padding: "2.2rem",
              maxWidth: "750px",
              width: "100%",
              maxHeight: "88vh",
              overflowY: "auto",
              boxShadow: "0 14px 0 #15803d, 0 35px 70px rgba(0, 0, 0, 0.35)",
              position: "relative",
              margin: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "2.5px solid #22c55e",
                background: "#f0fdf4",
                color: "#166534",
                fontWeight: 900,
                fontSize: "1.2rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 3px 0 #15803d",
              }}
              onClick={(e) => {
                triggerExplosion(e, "CLOSE! ✕", "pop");
                setSelectedArticleModal(null);
              }}
              aria-label="Tutup Artikel"
            >
              ✕
            </button>

            {/* Header Info */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center", marginBottom: "1rem", paddingRight: "3rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "0.3rem 0.85rem", borderRadius: "999px", background: "#dcfce7", color: "#166534", border: "1.5px solid #86efac" }}>
                📅 {selectedArticleModal.date}
              </span>
              <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "0.3rem 0.85rem", borderRadius: "999px", background: "#fef08a", color: "#78350f", border: "1.5px solid #fde047" }}>
                🏷️ {selectedArticleModal.category}
              </span>
              <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "0.3rem 0.85rem", borderRadius: "999px", background: "#e0f2fe", color: "#0369a1", border: "1.5px solid #bae6fd" }}>
                ⏱️ {selectedArticleModal.readTime}
              </span>
            </div>

            <h2 style={{ margin: "0 0 0.8rem", fontSize: "clamp(1.4rem, 3vw, 2.1rem)", fontWeight: 900, color: "#0f172a", lineHeight: 1.35 }}>
              {selectedArticleModal.title}
            </h2>

            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "2px dashed #cbd5e1" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)", color: "#ffffff", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", boxShadow: "0 2px 0 #14532d" }}>
                DW
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.95rem", fontWeight: 900, color: "#0f172a" }}>
                  {selectedArticleModal.author}
                </span>
                <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 700 }}>
                  Siswa RPL SMKN 1 Jenangan
                </span>
              </div>
            </div>

            {/* Body Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem", fontSize: "1.02rem", color: "#334155", lineHeight: 1.75, fontWeight: 600 }}>
              <p style={{ fontSize: "1.06rem", fontWeight: 700, color: "#1e293b", background: "#f8fafc", padding: "1rem 1.25rem", borderRadius: "16px", borderLeft: "5px solid #22c55e", margin: 0 }}>
                {selectedArticleModal.fullContent.intro}
              </p>

              {selectedArticleModal.fullContent.sections.map((sec, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 900, color: "#0f172a" }}>
                    {sec.heading}
                  </h3>
                  <p style={{ margin: 0 }}>{sec.content}</p>
                  {sec.codeSnippet && (
                    <pre style={{ background: "#0f172a", color: "#f8fafc", padding: "1.2rem", borderRadius: "16px", fontSize: "0.9rem", overflowX: "auto", border: "2px solid #334155", fontFamily: "monospace", margin: "0.4rem 0 0" }}>
                      <code>{sec.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              ))}

              <div style={{ background: "#f0fdf4", border: "2.5px solid #86efac", borderRadius: "20px", padding: "1.25rem", marginTop: "0.5rem" }}>
                <h4 style={{ margin: "0 0 0.4rem", fontSize: "1.1rem", fontWeight: 900, color: "#166534" }}>
                  💡 Kesimpulan & Catatan Belajar
                </h4>
                <p style={{ margin: 0, color: "#14532d", fontWeight: 700 }}>
                  {selectedArticleModal.fullContent.conclusion}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="buzz-btn-oval buzz-btn-green"
              style={{ width: "100%", height: "48px", fontSize: "1rem", marginTop: "2rem" }}
              onClick={(e) => {
                triggerExplosion(e, "SELESAI! ✔", "fanfare");
                setSelectedArticleModal(null);
              }}
            >
              ✔ SELESAI MEMBACA ARTIKEL
            </button>
          </div>
        </div>
      )}

      {/* MODAL ACTIVITY PHOTO VIEWER */}
      {selectedActivityModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(12px)",
            zIndex: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSelectedActivityModal(null)}
        >
          <div
            style={{
              background: "#ffffff",
              border: "5px solid #38bdf8",
              borderRadius: "36px 18px 40px 22px",
              padding: "2rem",
              maxWidth: "780px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 14px 0 #0284c7, 0 35px 70px rgba(0, 0, 0, 0.4)",
              position: "relative",
              margin: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "2.5px solid #38bdf8",
                background: "#e0f2fe",
                color: "#0284c7",
                fontWeight: 900,
                fontSize: "1.2rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 3px 0 #0369a1",
                zIndex: 10,
              }}
              onClick={(e) => {
                triggerExplosion(e, "CLOSE! ✕", "pop");
                setSelectedActivityModal(null);
              }}
              aria-label="Tutup Foto"
            >
              ✕
            </button>

            {/* High Res Photo Display */}
            <div
              style={{
                position: "relative",
                width: "100%",
                borderRadius: "24px",
                overflow: "hidden",
                border: "3.5px solid #0284c7",
                boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                background: "#0f172a",
                marginBottom: "1.4rem",
              }}
            >
              <img
                src={selectedActivityModal.image}
                alt={selectedActivityModal.title}
                style={{ width: "100%", height: "auto", maxHeight: "480px", objectFit: "contain", display: "block" }}
              />
            </div>

            {/* Photo Info & Description */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center", marginBottom: "0.85rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "0.3rem 0.85rem", borderRadius: "999px", background: "#e0f2fe", color: "#0369a1", border: "1.5px solid #bae6fd" }}>
                🏷️ {selectedActivityModal.category}
              </span>
              <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "0.3rem 0.85rem", borderRadius: "999px", background: "#dcfce7", color: "#166534", border: "1.5px solid #86efac" }}>
                📅 {selectedActivityModal.date}
              </span>
              <span style={{ fontSize: "0.82rem", fontWeight: 900, padding: "0.3rem 0.85rem", borderRadius: "999px", background: "#fef08a", color: "#78350f", border: "1.5px solid #fde047" }}>
                📍 {selectedActivityModal.location}
              </span>
            </div>

            <h2 style={{ margin: "0 0 0.7rem", fontSize: "clamp(1.3rem, 2.8vw, 1.85rem)", fontWeight: 900, color: "#0f172a", lineHeight: 1.35 }}>
              {selectedActivityModal.title}
            </h2>

            <p style={{ margin: "0 0 1.4rem", fontSize: "1.02rem", color: "#334155", lineHeight: 1.7, fontWeight: 600 }}>
              {selectedActivityModal.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {selectedActivityModal.tags.map((t) => (
                <span key={t} style={{ background: "#f1f5f9", color: "#334155", padding: "0.3rem 0.8rem", borderRadius: "999px", fontWeight: 800, fontSize: "0.82rem", border: "1.5px solid #cbd5e1" }}>
                  #{t}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="buzz-btn-oval buzz-btn-green"
              style={{ width: "100%", height: "48px", fontSize: "1rem" }}
              onClick={(e) => {
                triggerExplosion(e, "SELESAI! ✔", "fanfare");
                setSelectedActivityModal(null);
              }}
            >
              ✔ SELESAI MEMANTAU DOKUMENTASI
            </button>
          </div>
        </div>
      )}

      {/* MODAL CERTIFICATE VIEWER */}
      {selectedCertModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(12px)",
            zIndex: 230,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSelectedCertModal(null)}
        >
          <div
            style={{
              background: "#ffffff",
              border: "5px solid #ca8a04",
              borderRadius: "36px 18px 40px 22px",
              padding: "2rem",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 14px 0 #854d0e, 0 35px 70px rgba(0, 0, 0, 0.4)",
              position: "relative",
              margin: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "2.5px solid #ca8a04",
                background: "#fef08a",
                color: "#78350f",
                fontWeight: 900,
                fontSize: "1.2rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 3px 0 #854d0e",
                zIndex: 10,
              }}
              onClick={(e) => {
                triggerExplosion(e, "CLOSE! ✕", "pop");
                setSelectedCertModal(null);
              }}
              aria-label="Tutup Sertifikat"
            >
              ✕
            </button>

            {/* High Res Certificate Image Display */}
            {selectedCertModal.image && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "4px solid #ca8a04",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  background: "#0f172a",
                  marginBottom: "1.4rem",
                }}
              >
                <img
                  src={selectedCertModal.image}
                  alt={selectedCertModal.title}
                  style={{ width: "100%", height: "auto", maxHeight: "520px", objectFit: "contain", display: "block" }}
                />
              </div>
            )}

            {/* Info Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center", marginBottom: "0.85rem" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 900, padding: "0.3rem 0.85rem", borderRadius: "999px", background: selectedCertModal.badgeColor, color: "#ffffff", border: "1.5px solid #ffffff", boxShadow: "0 2px 0 rgba(0,0,0,0.2)" }}>
                {selectedCertModal.type}
              </span>
              <span style={{ fontSize: "0.85rem", fontWeight: 900, padding: "0.3rem 0.85rem", borderRadius: "999px", background: "#fef08a", color: "#78350f", border: "1.5px solid #fde047" }}>
                📅 Tahun {selectedCertModal.year}
              </span>
              {selectedCertModal.period && (
                <span style={{ fontSize: "0.85rem", fontWeight: 900, padding: "0.3rem 0.85rem", borderRadius: "999px", background: "#e0f2fe", color: "#0369a1", border: "1.5px solid #bae6fd" }}>
                  ⏱️ {selectedCertModal.period}
                </span>
              )}
            </div>

            <h2 style={{ margin: "0 0 0.5rem", fontSize: "clamp(1.3rem, 2.8vw, 1.9rem)", fontWeight: 900, color: "#0f172a", lineHeight: 1.35 }}>
              {selectedCertModal.title}
            </h2>

            <span style={{ display: "block", fontSize: "1rem", color: "#16a34a", fontWeight: 900, marginBottom: "1.2rem" }}>
              🏢 Diterbitkan oleh: {selectedCertModal.issuer}
            </span>

            <div style={{ background: "#f8fafc", padding: "1.2rem", borderRadius: "18px", borderLeft: "5px solid #ca8a04", marginBottom: "1.5rem" }}>
              <p style={{ margin: 0, fontSize: "1.02rem", color: "#334155", lineHeight: 1.65, fontWeight: 700 }}>
                {selectedCertModal.description}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fefce8", border: "2px dashed #ca8a04", padding: "0.85rem 1.25rem", borderRadius: "16px", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 900, color: "#78350f" }}>
                ✔ DIVERIFIKASI RESMI VERNONCORP / SMKN 1 JENANGAN
              </span>
              <span style={{ fontSize: "1.1rem" }}>⭐</span>
            </div>

            <button
              type="button"
              className="buzz-btn-oval buzz-btn-green"
              style={{ width: "100%", height: "48px", fontSize: "1rem" }}
              onClick={(e) => {
                triggerExplosion(e, "SELESAI! ✔", "fanfare");
                setSelectedCertModal(null);
              }}
            >
              ✔ SELESAI MEMANTAU SERTIFIKAT
            </button>
          </div>
        </div>
      )}

      {/* WOODEN FLOOR FOOTER WITH DYAKSA SIGNATURE BADGE, NAV, SOCIALS & COPYRIGHT */}
      <footer className="andys-wood-floor-footer">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1rem" }}>
          {/* Top Row: Signature Badge & Nama Lengkap */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "2.2rem" }}>
            <div className="andy-signature-badge">
              <span>D</span>
              <span>Y</span>
              <span>A</span>
              <span>K</span>
              <span>S</span>
              <span>A</span>
            </div>
            <h3 style={{ margin: "0.5rem 0 0", fontSize: "1.75rem", fontWeight: 900, color: "#fef08a", letterSpacing: "0.02em" }}>
              Dyaksa Wiratara Maharshi
            </h3>
            <span style={{ fontSize: "0.92rem", color: "#fde68a", fontWeight: 800, marginTop: "0.35rem" }}>
              Siswa Rekayasa Perangkat Lunak (RPL) · SMKN 1 Jenangan, Ponorogo, Jawa Timur
            </span>
          </div>

          {/* Middle Row: Grid Navigasi Singkat & Media Sosial */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "2.2rem",
              padding: "2.2rem 0",
              borderTop: "2px dashed rgba(254, 240, 138, 0.35)",
              borderBottom: "2px dashed rgba(254, 240, 138, 0.35)",
              textAlign: "left",
            }}
          >
            {/* Column 1: Navigasi Singkat */}
            <div>
              <h4 style={{ margin: "0 0 1.1rem", fontSize: "1.2rem", fontWeight: 900, color: "#fef08a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                🧭 Navigasi Singkat
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", fontSize: "0.92rem", fontWeight: 800 }}>
                <a href="#tentang-saya" style={{ color: "#fde68a", textDecoration: "none", transition: "all 0.2s ease" }}>• Tentang Saya</a>
                <a href="#pendidikan" style={{ color: "#fde68a", textDecoration: "none", transition: "all 0.2s ease" }}>• Pendidikan</a>
                <a href="#profil-profesional" style={{ color: "#fde68a", textDecoration: "none", transition: "all 0.2s ease" }}>• Profil Profesional</a>
                <a href="#pengalaman" style={{ color: "#fde68a", textDecoration: "none", transition: "all 0.2s ease" }}>• Pengalaman</a>
                <a href="#keahlian" style={{ color: "#fde68a", textDecoration: "none", transition: "all 0.2s ease" }}>• Keahlian</a>
                <a href="#portofolio" style={{ color: "#fde68a", textDecoration: "none", transition: "all 0.2s ease" }}>• Karya & Portofolio</a>
                <a href="#sertifikat-prestasi" style={{ color: "#fde68a", textDecoration: "none", transition: "all 0.2s ease" }}>• Sertifikat</a>
                <a href="#artikel-blog" style={{ color: "#fde68a", textDecoration: "none", transition: "all 0.2s ease" }}>• Artikel & Blog</a>
                <a href="#contact" style={{ color: "#fde68a", textDecoration: "none", transition: "all 0.2s ease" }}>• Kontak WhatsApp</a>
              </div>
            </div>

            {/* Column 2: Media Sosial & Kontak */}
            <div>
              <h4 style={{ margin: "0 0 1.1rem", fontSize: "1.2rem", fontWeight: 900, color: "#fef08a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                📱 Media Sosial & Kontak
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.94rem", fontWeight: 800 }}>
                <a href="https://instagram.com/dyaksaaovr" target="_blank" rel="noreferrer" style={{ color: "#fde68a", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
                  📸 Instagram: <span style={{ color: "#ffffff", textDecoration: "underline" }}>@dyaksaaovr</span>
                </a>
                <a href="https://github.com/dykss-byte" target="_blank" rel="noreferrer" style={{ color: "#fde68a", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
                  🐙 GitHub: <span style={{ color: "#ffffff", textDecoration: "underline" }}>github.com/dykss-byte</span>
                </a>
                <a href="https://wa.me/6285904282198" target="_blank" rel="noreferrer" style={{ color: "#fde68a", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
                  💬 WhatsApp: <span style={{ color: "#ffffff", textDecoration: "underline" }}>+62 859-0428-2198</span>
                </a>
                <a href="mailto:dyaksaaovr@gmail.com" style={{ color: "#fde68a", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
                  ✉️ Email: <span style={{ color: "#ffffff", textDecoration: "underline" }}>dyaksaaovr@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Row: Copyright Statement */}
          <div style={{ marginTop: "2.2rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.02rem", fontWeight: 900, color: "#fef08a" }}>
              © 2026 Dyaksa Wiratara Maharshi. Hak Cipta Dilindungi Undang-Undang.
            </div>
            <div style={{ fontSize: "0.86rem", color: "#fde68a", marginTop: "0.45rem", fontWeight: 800 }}>
              Dibuat dengan ❤️, Dyaksa's Cloud Wallpaper, Next.js 16, dan segelas es teh manis jumbo · Properti Kamar Dyaksa
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
