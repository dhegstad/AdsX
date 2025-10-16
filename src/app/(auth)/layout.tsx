export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center space-x-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span className="font-mono text-lg font-bold">AX</span>
        </div>
        <span className="text-2xl font-semibold">AdsX</span>
      </div>
      {children}
    </div>
  );
}
