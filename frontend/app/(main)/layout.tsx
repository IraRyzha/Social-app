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
      <div className="w-full h-full flex px-5 md:px-32 ">
        <div className="hidden md:block w-1/4 min-w-[10%] h-auto">
          <Navigation type="desktop" />
        </div>
        <div className="w-full md:max-w-[80%] md:mx-8 overflow-x-auto">
          {children}
        </div>
        <div className="hidden md:block w-1/3 min-w-[20%] h-auto">
          <Profile type="base" />
        </div>
      </div>
      <div className="block md:hidden w-1/4 min-w-[10%] h-auto">
        <Navigation type="mobile" />
      </div>
    </div>
  );
}
