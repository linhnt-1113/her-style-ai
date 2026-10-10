"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WeatherTime } from "./WeatherTime";
import { Icon } from "./Icon";
import { useAuth } from "@/lib/auth/auth-context";

const links = [
  ["/", "Trang chủ"],
  ["/wardrobe", "Tủ đồ của tôi"],
  ["/planner", "Lịch phối đồ"],
  ["/calendar", "Sự kiện"],
  ["/chat", "Chat với AI"],
] as const;

// MOBILE TAB
const tabs = [
  ["/", "Trang chủ"],
  ["/wardrobe", "Tủ đồ"],
  ["/planner", "Lịch"],
  ["/calendar", "Sự kiện"],
  ["/chat", "Chat AI"],
] as const;

const hideTabsOn = ["/login", "/register", "/forgot-password", "/reset-password"];

export function AppHeader() {
  const path = usePathname();
  const { user, status, logout } = useAuth();
  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "H";
  const showTabs = !hideTabsOn.some((p) => path.startsWith(p));

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand"><span className="brand-mark">H</span><span>HerStyle AI</span></Link>
          <nav className="top-nav">
            {links.map(([href, label]) => <Link key={href} className={path === href ? "active" : ""} href={href}>{label}</Link>)}
          </nav>
          <div className="header-actions">
            <WeatherTime />
            <button className="icon-btn" aria-label="Tìm kiếm"><Icon name="search" size={18} /></button>
            {status === "authenticated" ? <>
              <Link href="/profile" className="avatar" title={user?.email}>{initials}</Link>
              <button className="header-logout" type="button" onClick={() => void logout()}>Đăng xuất</button>
            </> : <Link href="/login" className="btn ghost header-login">Đăng nhập</Link>}
          </div>
        </div>
      </header>

      {showTabs && (
        <nav className="tab-bar" aria-label="Điều hướng chính">
          {tabs.map(([href, label]) => {
            const active = href === "/" ? path === "/" : path.startsWith(href);
            return (
              <Link key={href} href={href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>
                <span className="tab-dot" aria-hidden />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
