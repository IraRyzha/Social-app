import { Profile } from "@/entities/profile";
import Header from "@/shared/ui/header/header";
import { Navigation } from "@/widgets/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-wull min-h-screen h-full max-h-screen overflow-y-auto overflow-x-auto">
      <Header />
      <div className="w-full h-full px-32 flex">
        <div className="w-1/4 min-w-[10%] h-auto">
          <Navigation />
        </div>
        <div className="w-full max-w-[80%] mx-5 overflow-x-auto">
          {children}
        </div>
        <div className="w-1/3 min-w-[20%] h-auto">
          <Profile type="base" />
        </div>
      </div>
    </div>
  );
}
