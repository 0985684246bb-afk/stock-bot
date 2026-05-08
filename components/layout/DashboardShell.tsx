import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen"><Sidebar /><main className="min-w-0 flex-1"><Header /><div className="p-4 lg:p-8">{children}</div></main></div>;
}
