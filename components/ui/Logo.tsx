import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width = 48, height = 48 }: LogoProps) {
  return (
    <div>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="ReverseBid Logo"
          width={width}
          height={height}
          className="mx-auto mb-2"
        />
      </Link>
    </div>
  );
}
