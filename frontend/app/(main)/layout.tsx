import Header from "@/shared/ui/header/header";
import { Navigation } from "@/widgets/navigation";
import { Profile } from "@/widgets/profile";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-wull min-h-screen max-h-screen overflow-y-auto">
      <Header />
      <div className="w-full h-full px-32 flex">
        <div className="w-1/4 h-auto">
          <Navigation />
        </div>
        <div className="w-full mx-5">{children}</div>
        <div className="w-1/3 h-auto">
          <Profile />
        </div>
      </div>
    </div>
  );
}
