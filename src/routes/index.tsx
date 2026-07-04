import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  MapPin,
  Sparkles,
  UtensilsCrossed,
  BedDouble,
  Car,
  Church,
  Wine,
  Music,
  Camera,
  Check,
} from "lucide-react";

import heroImg from "@/assets/hero-amalfi.jpg";
import storyImg from "@/assets/story-couple.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import dressImg from "@/assets/dresscode.jpg";
import { OliveBranch, OliveLeaf } from "@/components/OliveBranch";

const WEDDING_DATE = new Date("2026-06-21T16:00:00+02:00");

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-28 md:py-40 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        {(eyebrow || title) && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            {eyebrow && <div className="eyebrow mb-5">{eyebrow}</div>}
            {title && (
              <h2 className="text-4xl md:text-6xl leading-[1.05] text-ink">{title}</h2>
            )}
            <div className="mt-6 flex justify-center text-olive">
              <OliveBranch className="w-40 h-6" />
            </div>
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Главная", "#home"],
    ["Наша история", "#story"],
    ["Детали", "#details"],
    ["Дресс-код", "#dress"],
    ["Программа", "#schedule"],
    ["Галерея", "#gallery"],
    ["Ответ", "#rsvp"],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-ivory/70 border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2 text-ink">
          <span className="font-serif text-2xl italic">S</span>
          <span className="script-amp text-lg">&amp;</span>
          <span className="font-serif text-2xl italic">M</span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-[13px] tracking-wide text-ink/80">
          {links.map(([l, h]) => (
            <a
              key={h}
              href={h}
              className="relative py-1 transition-colors hover:text-sea after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 hover:after:scale-x-100"
            >
              {l}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-ink text-sm tracking-widest uppercase"
          aria-label="Меню"
        >
          {open ? "Закрыть" : "Меню"}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-ivory/95 backdrop-blur">
          <div className="flex flex-col px-6 py-4">
            {links.map(([l, h]) => (
              <a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className="py-3 text-sm tracking-wide text-ink/80"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function FloatingLeaves() {
  const prefersReduced = useReducedMotion();
  const leaves = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 18 + Math.random() * 14,
        size: 18 + Math.random() * 22,
        rotate: Math.random() * 60 - 30,
        opacity: 0.35 + Math.random() * 0.35,
        color: i % 3 === 0 ? "#C9A96A" : "#6D7A5A",
      })),
    []
  );
  if (prefersReduced) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {leaves.map((l, i) => (
        <div
          key={i}
          className="absolute bottom-[-60px]"
          style={{
            left: `${l.left}%`,
            animation: `drift ${l.duration}s linear ${l.delay}s infinite`,
            color: l.color,
            opacity: l.opacity,
          }}
        >
          <OliveLeaf
            style={{
              width: l.size,
              transform: `rotate(${l.rotate}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative h-[100svh] min-h-[700px] w-full overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={heroImg}
          alt="Amalfi coastline at golden hour"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        {/* warm sunlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 via-transparent to-ivory/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,220,160,0.35),transparent_55%)]" />
      </motion.div>

      {/* Dust particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-white/60 animate-shimmer"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Swaying olive branch top-corner */}
      <div className="pointer-events-none absolute -top-6 left-4 md:left-16 text-olive/70">
        <div className="animate-sway">
          <OliveBranch className="w-56 h-20 md:w-80 md:h-24 rotate-[15deg]" />
        </div>
      </div>
      <div className="pointer-events-none absolute -top-4 right-4 md:right-16 text-olive/60">
        <div className="animate-sway" style={{ animationDelay: "1.5s" }}>
          <OliveBranch className="w-52 h-20 md:w-72 md:h-24 -rotate-[20deg] scale-x-[-1]" />
        </div>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ink"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="eyebrow"
        >
          Равелло · Побережье Амальфи · Италия
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.3 }}
          className="mt-8 font-serif text-6xl leading-[0.95] tracking-tight md:text-[9rem]"
        >
          София
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="script-amp my-2 text-5xl md:text-7xl italic"
        >
          &amp;
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.3 }}
          className="font-serif text-6xl leading-[0.95] tracking-tight md:text-[9rem]"
        >
          Маттео
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-10 max-w-md text-sm italic text-ink/70"
        >
          — мы женимся —
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-4 text-base tracking-[0.4em] uppercase text-ink/80"
        >
          21 · 06 · 2026
        </motion.p>

        <motion.a
          href="#story"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 1 }}
          className="mt-12 inline-flex items-center gap-3 rounded-full border border-ink/25 bg-ivory/40 px-8 py-3 text-xs tracking-[0.28em] uppercase text-ink backdrop-blur transition hover:border-gold hover:bg-ivory/70 hover:text-sea"
        >
          Узнать о нашем дне
        </motion.a>
      </motion.div>

      <motion.a
        href="#story"
        aria-label="Scroll"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-ink/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}

function Story() {
  const milestones = [
    { year: "2019", title: "Первый взгляд", text: "Летний вечер в Риме, общий стол друзей и разговор до глубокой ночи под бокал апероля." },
    { year: "2021", title: "Позитано в цвету", text: "Именно та поездка всё решила — лимонные сады, долгие прогулки и обещание, прошептанное под звёздами." },
    { year: "2024", title: "Тот самый вопрос", text: "На тихой террасе над морем, когда побережье раскинулось внизу, — маленькая бархатная коробочка." },
    { year: "2026", title: "Навсегда, у моря", text: "И теперь мы приглашаем вас разделить с нами начало нашей общей жизни." },
  ];
  return (
    <Section id="story" eyebrow="Наша история" title="Как море свело нас вместе">
      <div className="grid gap-14 md:grid-cols-2 md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
            <img
              src={storyImg}
              alt="Sofia and Matteo by the sea"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="pointer-events-none absolute -bottom-8 -left-8 text-olive/70">
            <OliveBranch className="w-40 h-14 rotate-[10deg]" />
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-transparent via-olive/40 to-transparent md:block" />
          <ol className="space-y-12">
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative md:pl-10"
              >
                <span className="absolute left-0 top-2 hidden h-3.5 w-3.5 rounded-full border border-gold bg-ivory md:block" />
                <div className="eyebrow mb-2">{m.year}</div>
                <h3 className="mb-3 font-serif text-3xl text-ink">{m.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  {m.text}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

function DetailCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-4 font-serif text-2xl text-ink">{title}</h3>
      <div className="space-y-1.5 text-sm text-muted-foreground">
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
      <div className="pointer-events-none absolute -right-6 -bottom-6 text-olive/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <OliveBranch className="w-40 h-14" />
      </div>
    </motion.div>
  );
}

function Details() {
  return (
    <Section id="details" eyebrow="Наш день" title="Детали торжества" className="bg-beige/40">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <DetailCard
          icon={Church}
          title="Церемония"
          lines={["Суббота, 21 июня 2026", "16:30", "Сады Виллы Чимброне"]}
        />
        <DetailCard
          icon={Wine}
          title="Приём"
          lines={["Коктейли в 17:30", "Ужин под оливковыми деревьями", "Танцы до полуночи"]}
        />
        <DetailCard
          icon={MapPin}
          title="Место проведения"
          lines={["Villa Cimbrone", "Via Santa Chiara, 26", "84010 Равелло, Италия"]}
        />
        <DetailCard
          icon={Car}
          title="Как добраться"
          lines={["Ближайший аэропорт: Неаполь (NAP)", "Трансфер 1 ч 45 мин", "Бесплатная парковка на территории"]}
        />
        <DetailCard
          icon={BedDouble}
          title="Где остановиться"
          lines={["Hotel Caruso — Belmond", "Palazzo Avino", "Специальные тарифы до 1 июля"]}
        />
        <DetailCard
          icon={UtensilsCrossed}
          title="Приветственный ужин"
          lines={["Пятница, 20 июня", "19:00", "Ristorante Rossellinis, Равелло"]}
        />
      </motion.div>
    </Section>
  );
}

function DressCode() {
  const swatches = [
    ["Айвори", "#FAF7F2"],
    ["Бежевый", "#EFE7DD"],
    ["Шампань", "#E7D6B5"],
    ["Приглушённый шалфей", "#B8C1A8"],
    ["Оливковый", "#6D7A5A"],
    ["Мягкий голубой", "#8FB0C8"],
  ];
  return (
    <Section id="dress" eyebrow="Наряд" title="Средиземноморская элегантность">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
        >
          <img
            src={dressImg}
            alt="Wedding dress code moodboard"
            loading="lazy"
            width={1400}
            height={900}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="space-y-10"
        >
          <motion.div variants={fadeUp}>
            <div className="eyebrow mb-3">Для неё</div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Длинные платья изо льна или шёлка в мягких природных тонах. Струящиеся рукава,
              нежное кружево, открытые спины. Плоские сандалии для сада, каблуки для террасы.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="eyebrow mb-3">Для него</div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Лёгкий льняной костюм цвета крема, песка или приглушённого голубого. Расстёгнутый
              воротник, галстук не обязателен. Лоферы или элегантные кожаные сандалии приветствуются.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="eyebrow mb-4">Цветовая палитра</div>
            <div className="flex flex-wrap gap-5">
              {swatches.map(([label, color]) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <span
                    className="h-14 w-14 rounded-full border border-border/60 shadow-inner"
                    style={{ background: color }}
                  />
                  <span className="text-[11px] tracking-widest uppercase text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.p variants={fadeUp} className="text-xs italic text-muted-foreground">
            Пожалуйста — без нарядов полностью в белом или цвета айвори.
          </motion.p>
        </motion.div>
      </div>
    </Section>
  );
}

function Schedule() {
  const events = [
    ["16:00", "Встреча гостей", "Аперитив на террасе"],
    ["16:30", "Церемония", "В садах бельведера"],
    ["17:30", "Коктейльный час", "С видом на побережье"],
    ["19:00", "Ужин", "Длинный стол под оливковыми деревьями"],
    ["21:00", "Первый танец", "Под гирляндами огней"],
    ["23:00", "Праздник", "Танцы до полуночи"],
  ];
  return (
    <Section id="schedule" eyebrow="Вечер" title="День у моря" className="bg-beige/30">
      <div className="relative mx-auto max-w-2xl">
        <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-olive/40 to-transparent md:block" />
        <ol className="space-y-14">
          {events.map(([time, title, sub], i) => (
            <motion.li
              key={time}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col items-center text-center md:flex-row md:text-left ${
                i % 2 === 0 ? "md:justify-start" : "md:flex-row-reverse md:justify-start"
              }`}
            >
              <div className="md:w-1/2 md:px-10">
                <div className="script-amp text-3xl italic">{time}</div>
                <h3 className="mt-2 font-serif text-3xl text-ink">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
              </div>
              <span className="mx-auto my-4 hidden h-3 w-3 rounded-full border border-gold bg-ivory md:absolute md:left-1/2 md:top-3 md:my-0 md:-translate-x-1/2 md:block" />
              <div className="md:w-1/2" />
              {i < events.length - 1 && (
                <div className="mt-6 flex justify-center text-olive/60 md:hidden">
                  <OliveBranch className="w-24 h-4" />
                </div>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  const items = [
    { src: g1, span: "md:col-span-2 md:row-span-2", alt: "Стол под оливковыми деревьями" },
    { src: g4, span: "md:col-span-1 md:row-span-2", alt: "Невеста у моря" },
    { src: g2, span: "md:col-span-1", alt: "Лимонный сад" },
    { src: g3, span: "md:col-span-1", alt: "Белая вилла с бугенвиллией" },
    { src: g5, span: "md:col-span-1 md:row-span-1", alt: "Свадебный букет" },
  ];
  return (
    <Section id="gallery" eyebrow="Впечатления" title="Моменты у побережья">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[240px]"
      >
        {items.map((it, i) => (
          <motion.button
            key={i}
            variants={fadeUp}
            onClick={() => setActive(it.src)}
            className={`group relative overflow-hidden rounded-2xl shadow-[var(--shadow-card)] ${it.span}`}
          >
            <img
              src={it.src}
              alt={it.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Camera className="absolute bottom-4 right-4 h-4 w-4 text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.button>
        ))}
      </motion.div>

      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
        >
          <motion.img
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            src={active}
            alt=""
            className="max-h-full max-w-full rounded-xl shadow-2xl"
          />
        </motion.div>
      )}
    </Section>
  );
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function Countdown() {
  const t = useCountdown(WEDDING_DATE);
  const items = [
    ["Дней", t.days],
    ["Часов", t.hours],
    ["Минут", t.minutes],
    ["Секунд", t.seconds],
  ] as const;
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-beige/50 p-10 text-center shadow-[var(--shadow-card)] md:p-16"
        >
          <div className="pointer-events-none absolute -left-6 top-6 text-olive/40">
            <OliveBranch className="w-52 h-16 rotate-[15deg]" />
          </div>
          <div className="pointer-events-none absolute -right-6 bottom-6 text-olive/40">
            <OliveBranch className="w-52 h-16 -rotate-[15deg] scale-x-[-1]" />
          </div>
          <div className="eyebrow mb-4">До нашего дня осталось</div>
          <h2 className="mb-10 font-serif text-4xl md:text-5xl text-ink">
            21 июня 2026 · Равелло
          </h2>
          <div className="grid grid-cols-4 gap-3 md:gap-8">
            {items.map(([label, value]) => (
              <div key={label} className="flex flex-col items-center">
                <div className="font-serif text-4xl md:text-7xl leading-none text-sea tabular-nums">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="mt-3 text-[10px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Rsvp() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Section id="rsvp" eyebrow="Ответьте нам" title="Будете ли вы с нами?">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-card)] md:p-14"
      >
        <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 text-olive/50">
          <OliveBranch className="w-48 h-14" />
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="py-8 text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 text-gold">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-4xl text-ink">Grazie mille</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Ваш ответ получен. Мы с нетерпением ждём встречи с вами на побережье.
            </p>
            <div className="relative mx-auto mt-8 h-16 w-full max-w-xs">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute text-olive"
                  style={{
                    left: `${i * 12}%`,
                    animation: `float-y ${4 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
                  }}
                >
                  <OliveLeaf style={{ width: 24 }} />
                </span>
              ))}
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="grid gap-5 md:grid-cols-2"
          >
            <Field label="Имя" name="first" required />
            <Field label="Фамилия" name="last" required />
            <Field label="Электронная почта" name="email" type="email" required className="md:col-span-2" />
            <Field label="Количество гостей" name="guests" type="number" min={1} defaultValue={1} />
            <div>
              <label className="mb-2 block text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
                Присутствие
              </label>
              <div className="flex gap-2">
                {["С радостью буду", "К сожалению, не смогу"].map((o, i) => (
                  <label
                    key={o}
                    className="flex flex-1 cursor-pointer items-center justify-center rounded-full border border-border bg-ivory/60 px-3 py-2.5 text-xs tracking-wide text-ink transition-colors hover:border-gold has-[:checked]:border-sea has-[:checked]:bg-sea has-[:checked]:text-primary-foreground"
                  >
                    <input
                      type="radio"
                      name="attend"
                      defaultChecked={i === 0}
                      className="sr-only"
                    />
                    {o}
                  </label>
                ))}
              </div>
            </div>
            <Field
              label="Особенности питания"
              name="diet"
              placeholder="Необязательно"
              className="md:col-span-2"
            />
            <div className="md:col-span-2 mt-4 flex justify-center">
              <button
                type="submit"
                className="group inline-flex items-center gap-3 rounded-full bg-sea px-10 py-4 text-xs tracking-[0.32em] uppercase text-primary-foreground shadow-[var(--shadow-soft)] transition-all duration-500 hover:bg-gold hover:text-accent-foreground"
              >
                Отправить ответ
                <Sparkles className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </Section>
  );
}

function Field({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-[11px] tracking-[0.28em] uppercase text-muted-foreground">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-lg border border-border bg-ivory/60 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
}

function Wave() {
  return (
    <div className="pointer-events-none relative h-28 w-full overflow-hidden">
      <svg
        className="absolute inset-x-0 bottom-0 h-28 w-[200%] animate-wave text-sea/25"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60 Q 150 20 300 60 T 600 60 T 900 60 T 1200 60 T 1500 60 T 1800 60 T 2100 60 T 2400 60 V120 H0 Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="absolute inset-x-0 bottom-0 h-24 w-[200%] animate-wave text-sea/40"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        style={{ animationDuration: "36s", animationDirection: "reverse" }}
      >
        <path
          d="M0 70 Q 150 30 300 70 T 600 70 T 900 70 T 1200 70 T 1500 70 T 1800 70 T 2100 70 T 2400 70 V120 H0 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative bg-sea text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <div className="flex justify-center text-primary-foreground/70">
          <OliveBranch className="w-32 h-6" />
        </div>
        <div className="mt-6 font-serif text-4xl italic">София &amp; Маттео</div>
        <div className="mt-3 text-xs tracking-[0.4em] uppercase text-primary-foreground/70">
          21 · 06 · 2026 · Равелло, Италия
        </div>
        <div className="mt-10 text-[11px] tracking-widest uppercase text-primary-foreground/60">
          Сделано с любовью — на побережье Амальфи
        </div>
      </div>
    </footer>
  );
}

export default function Invitation() {
  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      <Nav />
      <FloatingLeaves />
      <Hero />
      <Story />
      <Details />
      <DressCode />
      <Schedule />
      <Gallery />
      <Countdown />
      <Rsvp />
      <Wave />
      <Footer />
    </main>
  );
}
