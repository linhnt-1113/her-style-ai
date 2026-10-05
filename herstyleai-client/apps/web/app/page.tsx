/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

const hero = "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=85";

export default function Home() {
  return <div className="home-page">
    <section className="hero-card">
      <div className="hero-copy">
        {/* <span className="pill soft"><Icon name="sparkle" size={15}/> Your Personal AI Stylist</span> */}
        <h1>Phong cách của bạn<br/>Phiên bản đẹp nhất<br/><em>với AI</em></h1>
        <p className="hero-desc">Đội thi HerStyleAI quy tụ các thành viên đến từ nhiều lĩnh vực khác nhau, với mong muốn mang đến một giải pháp công nghệ giúp thúc đẩy thời trang bền vững.</p>
        <div className="hero-actions"><Link href="/planner" className="btn primary">Bắt đầu ngay →</Link><Link href="/outfit" className="btn ghost">Xem demo</Link></div>
      </div>
      <div className="hero-visual"><div className="hero-blob"></div><img src={hero} alt="HerStyle AI fashion"/><span className="hand-note">Be your own<br/>style ♡</span></div>
    </section>

    <Reveal className="about-card">
      <span className="pill soft"><Icon name="sparkle" size={15}/> Về HerStyle AI</span>
      <h2>"Chẳng có gì để mặc?"</h2>
      <p>
        HerStyle AI giúp được! <br /> 
        Chỉ cần chụp ảnh tủ đồ, chúng tôi có thể gợi ý trang phục phù hợp với bối cảnh, <br />
        thời tiết và lịch trình của bạn!
      </p>
    </Reveal>

    {/* <section className="feature-band">
      <div className="feature-grid">
        <Link href="/wardrobe" className="feature-card">1</Link>
        <Link href="/planner" className="feature-card">2</Link>
        <Link href="/planner" className="feature-card">3</Link>
        <Link href="/chat" className="feature-card">4</Link>
      </div>
    </section> */}

    <section className="feature-band">
      <div className="feature-grid">
        <Link href="/wardrobe" className="feature-card">
          <span className="feature-icon blue"><Icon name="wardrobe" size={26}/></span>
          <strong>Quản lý tủ đồ</strong>
          <p>Số hóa toàn bộ trang phục. Hệ thống tự động nhận diện loại đồ, màu sắc, chất liệu từ ảnh bạn tải lên.</p>
        </Link>
        <Link href="/planner" className="feature-card">
          <span className="feature-icon blue"><Icon name="sparkle" size={26}/></span>
          <strong>Gợi ý phối đồ</strong>
          <p>AI đề xuất các set đồ cá nhân hóa, dựa trên món đồ hiện có và sở thích của bạn.</p>
        </Link>
        <Link href="/planner" className="feature-card">
          <span className="feature-icon orange"><Icon name="sun" size={26}/></span>
          <strong>Phù hợp thời tiết</strong>
          <p>Trang phục được chọn theo thời tiết trong ngày và bối cảnh, từ đi làm đến sự kiện.</p>
        </Link>
        <Link href="/chat" className="feature-card">
          <span className="feature-icon pink"><Icon name="clock" size={26}/></span>
          <strong>Tiết kiệm thời gian</strong>
          <p>Lên lịch phối đồ cả tuần và hỏi trực tiếp AI Stylist, không còn phân vân mỗi sáng.</p>
        </Link>
      </div>
    </section>
  </div>;
}