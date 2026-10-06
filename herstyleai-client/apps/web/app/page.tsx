/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

const hero = "/img/hero-page.png";
const hero2 = "/img/hero-page.png";
const teamPhoto = "/img/gioi-thieu-img.png";

const features = [
  { href: "/wardrobe", icon: "wardrobe", tone: "blue", title: "Quản lý tủ đồ", text: "Số hóa toàn bộ trang phục. Hệ thống tự động nhận diện loại đồ, màu sắc, chất liệu từ ảnh bạn tải lên." },
  { href: "/planner", icon: "sparkle", tone: "blue", title: "Gợi ý phối đồ", text: "AI đề xuất các set đồ cá nhân hóa, dựa trên món đồ hiện có và sở thích của bạn." },
  { href: "/planner", icon: "sun", tone: "orange", title: "Phù hợp thời tiết", text: "Trang phục được chọn theo thời tiết trong ngày và bối cảnh, từ đi làm đến sự kiện." },
  { href: "/chat", icon: "clock", tone: "pink", title: "Tiết kiệm thời gian", text: "Lên lịch phối đồ cả tuần và hỏi trực tiếp AI Stylist, không còn phân vân mỗi sáng." },
] as const;

export default function Home() {
  return <div className="home-page">
    {/* Màn hình đầu: không cần Reveal */}
    <section className="hero-card">
      <div className="hero-copy">
        <h1>Phong cách của bạn<br/>Phiên bản đẹp nhất<br/><em>với AI</em></h1>
        <div className="hero-actions">
          <Link href="/planner" className="btn primary">Khám phá ngay →</Link>
          <Link href="/outfit" className="btn ghost">Xem demo</Link>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-blob"></div>
        <img src={hero} alt="HerStyle AI fashion"/>
        <span className="hand-note">Be your own<br/>style ♡</span>
      </div>
    </section>

    {/* Hero 2: trượt từ trái vào */}
    <Reveal className="hero-card hero-reverse" effect="left">
      <div className="hero-copy">
        <h1 style={{ marginBottom: "20px" }}>Tủ đồ của bạn<br/>Thông minh hơn<br/><em>mỗi ngày</em></h1>
        <p className="hero-desc">
          Chẳng có gì để mặc? Đừng lo, HerStyleAI giúp được! <br />
          Với tính năng tự động quản lý tủ đồ, hệ thống của chúng tôi sẽ giúp bạn tận dụng tối đa các món đồ và dễ dàng tạo ra những bộ trang phục hoàn hảo mỗi ngày.
        </p>
        <div className="hero-actions"></div>
      </div>
      <div className="hero-visual">
        <div className="hero-blob"></div>
        <img src={hero2} alt="HerStyle AI fashion"/>
        <span className="hand-note">Be your own<br/>style ♡</span>
      </div>
    </Reveal>

    {/* Giới thiệu đội: phóng nhẹ */}
    <Reveal className="about-card team-card" effect="zoom">
      <div className="team-photo">
        {teamPhoto
          ? <img src={teamPhoto} alt="Đội thi HerStyle AI"/>
          : <div className="team-photo-placeholder"><Icon name="sparkle" size={34}/><span>Ảnh đội thi</span></div>}
      </div>
      <div className="team-body">
        <h2>HerStyleAI</h2>
        <p>
          <strong>HerStyleAI</strong> là đội thi quy tụ các thành viên đến từ nhiều lĩnh vực khác nhau,
          với mong muốn đem đến một giải pháp công nghệ giúp thúc đẩy thời trang bền vững.
        </p>
      </div>
    </Reveal>

    {/* Tính năng: khối trượt lên, 4 thẻ hiện lần lượt */}
    <Reveal className="feature-band" effect="up">
      <div className="feature-head">
        <h2 style={{ marginBottom: "40px" }}>Các tính năng nổi bật</h2>
      </div>
      <div className="feature-grid">
        {features.map((f, i) => (
          <Reveal as="div" key={f.title} effect="up" delay={i * 150} className="feature-wrap">
            <Link href={f.href} className="feature-card">
              <span className={`feature-icon ${f.tone}`}><Icon name={f.icon} size={26}/></span>
              <strong>{f.title}</strong>
              <p>{f.text}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Reveal>

    {/* Footer: trượt lên */}
    <Reveal as="footer" className="site-footer" effect="up">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo"><span className="brand-mark">H</span> HerStyle AI</div>
          <p>Tủ quần áo số thông minh, cùng bạn mặc đẹp mỗi ngày.</p>
        </div>
        <div className="footer-col">
          <h4>Liên hệ</h4>
          <a href="mailto:herstyleai@gmail.com">herstyleai@gmail.com</a>
          <a href="tel:12345678">123 4567 891</a>
          <span>Hà Nội, Việt Nam</span>
        </div>
        <div className="footer-col">
          <h4>Khám phá</h4>
          <Link href="/wardrobe">Tủ đồ của tôi</Link>
          <Link href="/planner">Lịch phối đồ</Link>
          <Link href="/chat">Chat với AI</Link>
        </div>
      </div>
      <div className="footer-bottom">© 2026 Cuộc thi Sáng Tạo Trẻ. Đội thi HerStyle AI.</div>
    </Reveal>
  </div>;
}