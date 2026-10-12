interface LogoTextOnlyProps {
  isDarkMode?: boolean;
}

export default function LogoTextOnly({
  isDarkMode = false,
}: LogoTextOnlyProps) {
  return (
    <span>
      <span className={isDarkMode ? "text-white" : "text-slate-900"}>
        Reverse
      </span>
      <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>
        Bid
      </span>
    </span>
  );
}
