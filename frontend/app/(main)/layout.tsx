import { Profile } from "@/entities/profile";
import Navigation from "@/widgets/navigation/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-auto relative">
      <div className="w-full h-full relative flex justify-between md:p-0">
        <div className="w-1/5 h-screen hidden md:block sticky inset-y-0 min-w-[10%]">
          <Navigation />
        </div>
        <div className="w-full h-auto md:p-10 overflow-x-auto">{children}</div>
        <div className="w-2/6 h-screen sticky inset-0 p-5">
          <div className="w-full h-full hidden md:flex flex-col items-center rounded-xl bg-white p-5 ">
            <div className="w-4/5 h-1/5">
              <Profile type="base" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
