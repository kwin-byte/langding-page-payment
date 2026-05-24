import Image from "next/image";
import Link from "next/link";

type Props = {
  showText?: boolean;
  href?: string;
  className?: string;
  imageClassName?: string;
};

export function Logo({
  showText = true,
  href = "/",
  className = "",
  imageClassName = "h-14 w-auto sm:h-16",
}: Props) {
  const content = (
    <>
      <Image
        src="/Logo_Limdara.png"
        alt="Landing Payment"
        width={280}
        height={84}
        className={`object-contain ${imageClassName}`}
        priority
      />
      {showText && (
        <span className="hidden font-display text-sm font-bold uppercase tracking-widest text-white sm:inline">
          Landing Pay
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`group flex items-center gap-3 ${className}`}>
        {content}
      </Link>
    );
  }

  return <div className={`flex items-center gap-3 ${className}`}>{content}</div>;
}
