export function CyberBackground({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`cyber-page flex h-dvh min-h-0 flex-col ${className}`}>
      <div className="cyber-glow-orb -left-32 top-0 h-96 w-96 bg-cyber-blue/15" />
      <div className="cyber-glow-orb -right-24 bottom-0 h-80 w-80 bg-cyber-plum/25" />
      <div className="cyber-glow-orb left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 bg-cyber-purple/20" />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
