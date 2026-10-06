// "use client";

// import { FormEvent, useState } from "react";
// import { Icon } from "@/components/Icon";
// import { ProtectedMediaImage } from "@/components/ProtectedMediaImage";
// import { api, Outfit, resolveMediaUrl, WeeklyResponse } from "@/lib/api";
// import { outfitTitle } from "@/lib/format";

// function imageFor(item: Record<string, unknown>) {
//   return resolveMediaUrl([item.transparent_image_url, item.transparent_url, item.model_url, item.image_url, item.image_path].find((value): value is string => typeof value === "string"));
// }

// export default function ChatPage() {
//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState<string[]>([]);
//   const [weekly, setWeekly] = useState<WeeklyResponse | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function send(event: FormEvent) {
//     event.preventDefault();
//     const message = text.trim();
//     if (!message) return;
//     setMessages((current) => [...current, message]); setText(""); setLoading(true);
//     try {
//       const result = await api.getWeeklyRecommendation({ latitude: 21.0285, longitude: 105.8542, prefer_dress: false, days: 1, styling_request: message });
//       setWeekly(result);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const outfit = weekly?.schedule?.[0]?.outfit as Outfit | undefined;
//   return <div className="content-page chat-page">
//     <div className="page-heading"><div><h1>Chat với HerStyle AI</h1><p>Hỏi bất cứ điều gì về thời trang, phối đồ, phong cách hay chăm sóc tủ đồ của bạn</p></div></div>
//     <div className="chat-layout">
//       <aside className="conversation-list"><button className="btn primary full" type="button" onClick={() => { setMessages([]); setWeekly(null); }}>+ Cuộc trò chuyện mới</button>{["Gợi ý outfit đi phỏng vấn", "Phối đồ đi Đà Lạt", "Trang phục mùa đông", "Phụ kiện phù hợp", "Chăm sóc quần áo"].map((label, index) => <button key={label} className={index === 0 ? "active" : ""} type="button" onClick={() => setText(label)}><Icon name="chat" size={16} /><div><strong>{label}</strong><span>{index === 0 ? "Hôm nay" : "Gần đây"}</span></div></button>)}</aside>
//       <section className="chat-main"><div className="chat-topline"><span>HerStyle AI · Trợ lý phong cách</span><div className="weather-inline"><Icon name="sun" size={18} /> Hà Nội · 28°C</div></div><div className="chat-messages">{messages.map((message, index) => <div className="bubble user" key={`${message}-${index}`}>{message}</div>)}{!messages.length ? <div className="bubble ai"><span className="ai-badge">AI</span><p>Chào bạn! Hãy nói cho mình biết bạn sẽ đi đâu, muốn mặc màu gì hoặc món đồ nào cần phối nhé.</p></div> : null}{loading ? <div className="bubble ai"><span className="ai-badge">AI</span><p>HerStyle AI đang xem tủ đồ của bạn…</p></div> : null}{!loading && outfit ? <div className="bubble ai"><span className="ai-badge">AI</span><p>Mình gợi ý <strong>{outfitTitle(outfit.structure, Object.keys(outfit.items ?? {}).length)}</strong> cho bạn:</p><div className="chat-outfit">{Object.values(outfit.items ?? {}).map((item) => <ProtectedMediaImage key={item.item_id} src={imageFor(item)} alt={String(item.subcategory ?? item.category ?? "Món đồ")} fallback={<Icon name="shirt" size={24} />} />)}</div><button className="text-link" type="button">Xem chi tiết outfit này</button></div> : null}</div><form className="chat-input" onSubmit={send}><input value={text} onChange={(event) => setText(event.target.value)} placeholder="Nhập câu hỏi của bạn..." /><button aria-label="Gửi"><Icon name="send" size={19} /></button></form></section>
//     </div>
//   </div>;
// }

"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { ProtectedMediaImage } from "@/components/ProtectedMediaImage";
import { api, Outfit, resolveMediaUrl, WeeklyResponse } from "@/lib/api";
import { outfitTitle } from "@/lib/format";

function imageFor(item: Record<string, unknown>) {
  return resolveMediaUrl([item.transparent_image_url, item.transparent_url, item.model_url, item.image_url, item.image_path].find((value): value is string => typeof value === "string"));
}

const history = ["Gợi ý outfit đi phỏng vấn", "Phối đồ đi Đà Lạt", "Trang phục mùa đông", "Phụ kiện phù hợp", "Chăm sóc quần áo"];
const quickPrompts = ["Outfit đi làm hôm nay", "Phối đồ đi cafe cuối tuần", "Mặc gì khi trời lạnh?", "Gợi ý đồ đi dự tiệc"];

export default function ChatPage() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [weekly, setWeekly] = useState<WeeklyResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, weekly]);

  async function ask(message: string) {
    const value = message.trim();
    if (!value || loading) return;
    setMessages((current) => [...current, value]);
    setText("");
    setLoading(true);
    try {
      const result = await api.getWeeklyRecommendation({ latitude: 21.0285, longitude: 105.8542, prefer_dress: false, days: 1, styling_request: value });
      setWeekly(result);
    } finally {
      setLoading(false);
    }
  }

  function send(event: FormEvent) {
    event.preventDefault();
    void ask(text);
  }

  function newChat() {
    setMessages([]);
    setWeekly(null);
    setText("");
  }

  const outfit = weekly?.schedule?.[0]?.outfit as Outfit | undefined;

  return <div className="chat-room">
    <section className="panel chat-panel">
      <aside className="chat-side">
        <div className="chat-title">
          <h1>
            Chat với <br />
            HerStyle AI
          </h1>
          <p>Hỏi bất cứ điều gì về thời trang, phối đồ, phong cách dựa trên tủ đồ của bạn</p>
          <button className="btn primary" type="button" onClick={newChat}><Icon name="plus" size={17} /> Cuộc trò chuyện mới</button>
        </div>
        <div className="chat-history">
          <span className="chat-history-label">Lịch sử</span>
          {history.map((label, index) => (
            <button key={label} type="button" className={`chat-history-item ${active === index ? "active" : ""}`} onClick={() => { setActive(index); setText(label); }}>
              <Icon name="chat" size={16} />
              <div><strong>{label}</strong><span>{index === 0 ? "Hôm nay" : "Gần đây"}</span></div>
            </button>
          ))}
        </div>
      </aside>

      <section className="chat-pane">
        <div className="chat-bar">
          <div className="chat-bar-id"><div><strong>HerStyle AI</strong><span>Trợ lý phong cách</span></div></div>
          <div className="chat-bar-weather"><Icon name="sun" size={18} /> Hà Nội · 28°C</div>
        </div>

        <div className="chat-scroll">
          {!messages.length ? (
            <div className="msg-row ai">
              <span className="ai-avatar">AI</span>
              <div className="msg-bubble">Chào bạn! Hãy nói cho mình biết bạn sẽ đi đâu, muốn mặc màu gì hoặc món đồ nào cần phối nhé.</div>
            </div>
          ) : null}

          {messages.map((message, index) => (
            <div className="msg-row user" key={`${message}-${index}`}><div className="msg-bubble">{message}</div></div>
          ))}

          {loading ? (
            <div className="msg-row ai">
              <span className="ai-avatar">AI</span>
              <div className="msg-bubble typing"><i /><i /><i /><em>Đang xem tủ đồ của bạn…</em></div>
            </div>
          ) : null}

          {!loading && outfit ? (
            <div className="msg-row ai">
              <span className="ai-avatar">AI</span>
              <div className="msg-bubble">
                <p>Mình gợi ý <strong>{outfitTitle(outfit.structure, Object.keys(outfit.items ?? {}).length)}</strong> cho bạn:</p>
                <div className="chat-outfit">
                  {Object.values(outfit.items ?? {}).map((item) => (
                    <div className="chat-outfit-item" key={item.item_id}>
                      <ProtectedMediaImage src={imageFor(item)} alt={String(item.subcategory ?? item.category ?? "Món đồ")} fallback={<Icon name="shirt" size={24} />} />
                    </div>
                  ))}
                </div>
                <button className="text-link" type="button">Xem chi tiết outfit này →</button>
              </div>
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        <div className="chat-foot">
          {!messages.length ? (
            <div className="chat-chips">
              {quickPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => void ask(prompt)}>{prompt}</button>)}
            </div>
          ) : null}
          <form className="chat-compose" onSubmit={send}>
            <input value={text} onChange={(event) => setText(event.target.value)} placeholder="Nhập câu hỏi của bạn..." />
            <button aria-label="Gửi" disabled={loading || !text.trim()}><Icon name="send" size={19} /></button>
          </form>
        </div>
      </section>
    </section>
  </div>;
}