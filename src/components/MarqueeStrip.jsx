import skillGroups from '../data/skills'

const allSkills = [...new Set(skillGroups.flatMap((g) => g.skills))]
const track = [...allSkills, ...allSkills]

export default function MarqueeStrip() {
  return (
    <div className="relative border-y hairline overflow-hidden py-5">
      <div className="flex w-max marquee-track">
        {track.map((s, i) => (
          <span key={i} className="tag-mono text-muted flex items-center gap-10 pr-10 shrink-0">
            {s}
            <span className="text-ink/15">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}
