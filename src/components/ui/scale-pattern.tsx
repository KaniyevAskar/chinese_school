import { cn } from '@/lib/utils'

/**
 * Dragon-scale (鱼鳞) motif echoing the logo mark. Rendered as a tiling SVG
 * pattern, used as a low-opacity atmospheric layer.
 */
export function ScalePattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none select-none', className)}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern id="dragon-scale" width="44" height="22" patternUnits="userSpaceOnUse">
          <path
            d="M0 22a22 22 0 0 1 22-22 22 22 0 0 1 22 22M-22 22A22 22 0 0 1 0 0M44 22a22 22 0 0 1 22-22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dragon-scale)" />
    </svg>
  )
}
