
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Home.css"; // Import CSS file

const Home = () => {
  const rootRef = useRef(null);

  const slides = useMemo(
    () => [
      {
        title: "Special Smells? Try Special Sorting.",
        subtitle:
          "แยกขยะให้ถูกประเภท ลดกลิ่น ลดปัญหา และเพิ่มการรีไซเคิลให้สูงสุด",
        cta: "เริ่มแยกขยะเลย",
        image: "/images/special-smells.png"
      },
      {
        title: "Organic to Gold",
        subtitle:
          "เศษอาหารแปลงเป็นปุ๋ยได้ ช่วยลดก๊าซเรือนกระจกและค่ากำจัด",
        cta: "ดูวิธีทำปุ๋ย",
        image: "/images/organic-to-gold.png",
      },
      {
        title: "E-Waste Matters",
        subtitle:
          "อุปกรณ์อิเล็กทรอนิกส์ต้องทิ้งให้ถูกที่ ปลอดภัยต่อคนและโลก",
        cta: "จุดรับทิ้งใกล้ฉัน",
        image: "/images/e-waste-matters.png",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const go = (dir) => {
    setActive((p) => {
      const n = p + dir;
      if (n < 0) return slides.length - 1;
      if (n >= slides.length) return 0;
      return n;
    });
  };

  useEffect(() => {
    const sidebarEl =
      document.querySelector(".sidebar") ||
      document.querySelector("[data-sidebar]") ||
      document.getElementById("sidebar");

    const getTopbar = () => {
      const nodes = Array.from(document.body.getElementsByTagName("*"));
      for (const el of nodes) {
        const cs = window.getComputedStyle(el);
        if (cs.position !== "fixed") continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 0 && rect.height >= 48 && rect.height <= 120 && rect.width >= window.innerWidth * 0.6) {
          return el;
        }
      }
      return null;
    };

    const topbarEl =
      getTopbar() ||
      document.querySelector(".topbar") ||
      document.querySelector(".navbar") ||
      document.querySelector("[data-topbar]");

    const applyOffsets = () => {
      const sidebarW =
        sidebarEl?.getBoundingClientRect
          ? Math.round(sidebarEl.getBoundingClientRect().width)
          : 0;

      const topbarH =
        topbarEl?.getBoundingClientRect
          ? Math.round(topbarEl.getBoundingClientRect().height)
          : 0;

      if (rootRef.current) {
        rootRef.current.style.setProperty("--wm-sidebar", `${sidebarW}px`);
        rootRef.current.style.setProperty("--wm-topbar", `${topbarH}px`);
      }
    };

    applyOffsets();

    let ro1, ro2;
    if ("ResizeObserver" in window) {
      if (sidebarEl) {
        ro1 = new ResizeObserver(applyOffsets);
        ro1.observe(sidebarEl);
      }
      if (topbarEl) {
        ro2 = new ResizeObserver(applyOffsets);
        ro2.observe(topbarEl);
      }
    }
    window.addEventListener("resize", applyOffsets);
    return () => {
      window.removeEventListener("resize", applyOffsets);
      ro1?.disconnect();
      ro2?.disconnect();
    };
  }, []);

  const items = useMemo(
    () => [
      {
        id: 1,
        name: "Recyclables",
        type: "recyclable",
        impact: 5,
        difficulty: 2,
        image:
          "https://images.unsplash.com/photo-1581579188871-45ea61f2a0c8?q=80&w=1200&auto=format&fit=crop",
        desc: "ขวดพลาสติก กระดาษ กระป๋องโลหะ",
      },
      {
        id: 2,
        name: "Organic Waste",
        type: "organic",
        impact: 4,
        difficulty: 1,
        image:
          "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop",
        desc: "เศษอาหาร ใบไม้ ทำปุ๋ยได้",
      },
      {
        id: 3,
        name: "Hazardous Waste",
        type: "hazardous",
        impact: 5,
        difficulty: 4,
        image:
          "https://images.unsplash.com/photo-1622032668855-4c1d1b1f7b2e?q=80&w=1200&auto=format&fit=crop",
        desc: "แบตเตอรี่ สี เคมี ต้องจัดการพิเศษ",
      },
      {
        id: 4,
        name: "E-Waste",
        type: "hazardous",
        impact: 5,
        difficulty: 3,
        image:
          "https://www.themobileindian.com/wp-content/uploads/2021/06/e-waste.jpg",
        desc: "มือถือ คอมพ์ อุปกรณ์ไฟฟ้า",
      },
      {
        id: 5,
        name: "Glass",
        type: "recyclable",
        impact: 3,
        difficulty: 2,
        image:
          "https://mindyourplastic.ca/wp-content/uploads/2021/09/nspackaging.com_.jpeg",
        desc: "ขวดแก้ว รีไซเคิลง่าย ล้างก่อนทิ้ง",
      },
      {
        id: 6,
        name: "Landfill (Residual)",
        type: "landfill",
        impact: 1,
        difficulty: 1,
        image:
          "https://assets.brandinside.asia/uploads/2023/06/Photo-05_%E0%B8%96%E0%B8%B1%E0%B8%87%E0%B8%82%E0%B8%A2%E0%B8%B0-6-%E0%B9%83%E0%B8%9A.jpg",
        desc: "สิ่งที่รีไซเคิลไม่ได้ ควรลดให้เหลือน้อยสุด",
      },
      {
        id: 7,
        name: "Metals",
        type: "recyclable",
        impact: 4,
        difficulty: 2,
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
        desc: "อะลูมิเนียม เหล็ก มูลค่าสูงในการรีไซเคิล",
      },
      {
        id: 8,
        name: "Paper & Cardboard",
        type: "recyclable",
        impact: 3,
        difficulty: 1,
        image:
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
        desc: "กระดาษไม่เปียกน้ำ ฉีก/พับให้เรียบร้อย",
      },
      {
  id: 9,
  name: "Special Sorting Poster",
  type: "recyclable",
  impact: 3,
  difficulty: 1,
  image: "/images/resized-a3384d5d-e06d-4d32-97a0-2087b7e71f3d.png",
  desc: "โปสเตอร์ให้ความรู้การแยกขยะ เพื่อเพิ่มการรีไซเคิล"
}

    ],
    []
  );

  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filtered = useMemo(() => {
    let data = [...items];
    if (type !== "all") {
      data = data.filter((i) => i.type === type);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter((i) => i.name.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case "impact":
        data.sort((a, b) => b.impact - a.impact);
        break;
      case "difficulty":
        data.sort((a, b) => a.difficulty - b.difficulty);
        break;
      default:
        data.sort((a, b) => a.name.localeCompare(b.name));
    }
    return data;
  }, [items, query, type, sortBy]);

  return (
    <div
      ref={rootRef}
      className="home-container wm-page min-h-screen bg-[#d4d8c8]"
    >
      <header className="home-header wm-header text-center py-6 px-4">
        <div className="wm-header-inner">
          <h1 className="text-4xl font-bold">Waste Management</h1>
          <nav className="mt-4"></nav>
        </div>
      </header>

      <section className="wm-hero">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`wm-slide ${idx === active ? "wm-slide--active" : ""}`}
            style={{ backgroundImage: `url(${s.image})` }}
            aria-hidden={idx !== active}
          >
            <div className="wm-slide-overlay">
              <h2 className="wm-slide-title">{s.title}</h2>
              <p className="wm-slide-sub">{s.subtitle}</p>
              <button className="wm-cta">{s.cta}</button>
            </div>
          </div>
        ))}

        <button className="wm-nav wm-nav--left" onClick={() => go(-1)}>‹</button>
        <button className="wm-nav wm-nav--right" onClick={() => go(1)}>›</button>

        <div className="wm-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`wm-dot ${i === active ? "wm-dot--active" : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </section>

      <section className="wm-controls">
        <div className="wm-controls-inner">
          <div className="wm-control">
            <label className="wm-label">ค้นหา</label>
            <input
              className="wm-input"
              placeholder="พิมพ์ชื่อประเภทขยะ…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="wm-control">
            <label className="wm-label">หมวดหมู่</label>
            <select
              className="wm-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">ทั้งหมด</option>
              <option value="recyclable">Recyclable</option>
              <option value="organic">Organic</option>
              <option value="hazardous">Hazardous / E-waste</option>
              <option value="landfill">Landfill</option>
            </select>
          </div>

          <div className="wm-control">
            <label className="wm-label">เรียงตาม</label>
            <select
              className="wm-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">ชื่อ (A→Z)</option>
              <option value="impact">ผลกระทบสูง → ต่ำ</option>
              <option value="difficulty">จัดการง่าย → ยาก</option>
            </select>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2e6] py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">Explore Waste Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-[1600px] mx-auto">
          {filtered.map((card) => (
          <div className="wm-card" key={card.id}>
  <img
    src={card.image}
    alt={card.name}
    className="w-full h-auto object-cover rounded-lg shadow-md"
    loading="lazy"
  />
  <div className="p-3">
    <h3 className="text-lg font-bold text-[#2d4d3a]">{card.name}</h3>
    <p className="text-[#6b7755] text-sm mt-1">{card.desc}</p>

    <div className="wm-meta mt-2 flex flex-wrap justify-center gap-2">
      <span className="wm-chip">Impact: {card.impact}/5</span>
      <span className="wm-chip">Difficulty: {card.difficulty}/5</span>
    </div>

    <button className="wm-btn mt-4 w-full">Learn More</button>
  </div>
</div>

          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
