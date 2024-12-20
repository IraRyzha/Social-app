export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="size-full flex justify-center items-center">{children}</div>
  );
}
