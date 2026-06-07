import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  href,
  linkText = "View All",
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between border-b border-[var(--color-border)] pb-3 mb-6 select-none animate-fade-in">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-400 text-xs mt-1 font-medium">{subtitle}</p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="flex items-center space-x-1.5 text-xs font-bold text-[var(--color-primary)] hover:text-white transition-colors duration-200 uppercase group"
        >
          <span>{linkText}</span>
          <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
