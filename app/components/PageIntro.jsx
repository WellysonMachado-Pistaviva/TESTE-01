import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Cover from './Cover';

// One editorial header for collections and tools. Photography is optional so
// utility pages keep their controls close to the beginning of the page.
export default function PageIntro({ eyebrow, title, children, image, imageAlt = '', action, compact = false }) {
  return (
    <header className={`pv-intro${image ? ' pv-intro--photo' : ''}${compact ? ' pv-intro--compact' : ''}`}>
      {image && <div className="pv-intro-media"><Cover src={image} alt={imageAlt} priority /></div>}
      <div className="wrap pv-intro-inner">
        <div className="pv-intro-copy">
          {eyebrow && <p className="pv-kicker">{eyebrow}</p>}
          <h1>{title}</h1>
          {children && <div className="pv-intro-lead">{children}</div>}
        </div>
        {action && <Link href={action.href} className="pv-action pv-action--primary">{action.label}<ArrowUpRight size={19} aria-hidden="true" /></Link>}
      </div>
    </header>
  );
}
