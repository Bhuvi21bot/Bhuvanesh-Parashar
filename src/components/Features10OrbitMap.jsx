import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Code2,
  Cpu,
  Database,
  Globe,
  Sparkles,
  Server,
  Cloud,
  Layers,
  Terminal,
} from 'lucide-react'

// Defined concentric orbit tiers for Bhuvanesh's skill ecosystem
const orbitRings = [
  {
    id: 'core-frontend-backend',
    radius: 145, // px radius
    duration: 32,
    clockwise: true,
    nodes: [
      { name: 'React', category: 'Frontend', icon: Globe, color: '#61DAFB' },
      { name: 'Node.js', category: 'Backend', icon: Server, color: '#68A063' },
      { name: 'TypeScript', category: 'Languages', icon: Code2, color: '#3178C6' },
      { name: 'Express', category: 'Backend', icon: Terminal, color: '#4E85BF' },
    ],
  },
  {
    id: 'ai-db-ecosystem',
    radius: 235, // px radius
    duration: 48,
    clockwise: false,
    nodes: [
      { name: 'TensorFlow', category: 'AI / ML', icon: Cpu, color: '#FF6F00' },
      { name: 'PyTorch', category: 'AI / ML', icon: Sparkles, color: '#EE4C2C' },
      { name: 'MongoDB', category: 'Database', icon: Database, color: '#47A248' },
      { name: 'PostgreSQL', category: 'Database', icon: Database, color: '#336791' },
      { name: 'Python', category: 'Languages', icon: Code2, color: '#3776AB' },
    ],
  },
  {
    id: 'cloud-devops-tools',
    radius: 325, // px radius
    duration: 65,
    clockwise: true,
    nodes: [
      { name: 'Docker', category: 'DevOps', icon: Cloud, color: '#2496ED' },
      { name: 'AWS', category: 'Cloud', icon: Cloud, color: '#FF9900' },
      { name: 'Tailwind CSS', category: 'Frontend', icon: Layers, color: '#06B6D4' },
      { name: 'Git & GitHub', category: 'Tools', icon: Terminal, color: '#F05032' },
      { name: 'Scikit-learn', category: 'AI / ML', icon: Cpu, color: '#F7931E' },
      { name: 'Firebase', category: 'Database', icon: Database, color: '#FFA611' },
    ],
  },
]

export default function Features10OrbitMap() {
  const [selectedNode, setSelectedNode] = useState(null)
  const [paused, setPaused] = useState(false)

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-full h-[620px] sm:h-[720px] card-flat rounded-3xl overflow-hidden my-10 border hairline bg-surface/30 backdrop-blur-xl flex items-center justify-center select-none shadow-2xl"
    >
      {/* Background Radial Glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-accent2/10 blur-[120px] pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-orange2/10 blur-[100px] pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(78,133,191,0.06),transparent_70%)] pointer-events-none" />

      {/* Top Left Title Badge */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30">
        <span className="tag-mono text-[11px] text-accent2 uppercase tracking-widest block font-medium">
          // Integration Map • Features 10
        </span>
        <h4 className="font-display text-lg text-ink font-semibold mt-1">
          Full-Stack & AI Skill Orbit
        </h4>
        <p className="text-xs text-muted max-w-xs mt-0.5">
          Concentric real-time orbiting nodes. Hover on any node to freeze and inspect.
        </p>
      </div>

      {/* Central Hub: Bhuvanesh Parashar Core Engine */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 20px rgba(78,133,191,0.2)', '0 0 40px rgba(78,133,191,0.4)', '0 0 20px rgba(78,133,191,0.2)'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full card-flat bg-surface border-2 border-accent2/60 flex flex-col items-center justify-center p-3 text-center shadow-2xl relative"
        >
          <div className="w-8 h-8 rounded-full bg-accent2/20 flex items-center justify-center mb-1 text-accent2">
            <Sparkles size={16} />
          </div>
          <span className="font-display font-bold text-xs sm:text-sm text-ink leading-tight">
            Bhuvanesh
          </span>
          <span className="text-[10px] font-mono text-muted uppercase">Full Stack</span>
        </motion.div>
      </div>

      {/* Orbit Rings & Orbiting Nodes */}
      {orbitRings.map((orbit) => {
        const diameter = orbit.radius * 2
        return (
          <div
            key={orbit.id}
            style={{ width: `${diameter}px`, height: `${diameter}px` }}
            className="absolute rounded-full border border-ink/10 pointer-events-none"
          >
            {/* Spinning Orbit Track */}
            <motion.div
              animate={{ rotate: orbit.clockwise ? 360 : -360 }}
              transition={{
                repeat: Infinity,
                duration: paused ? 999999 : orbit.duration,
                ease: 'linear',
              }}
              className="w-full h-full relative"
            >
              {orbit.nodes.map((node, i) => {
                const angle = (360 / orbit.nodes.length) * i
                const Icon = node.icon

                return (
                  <div
                    key={node.name}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(${orbit.radius}px) rotate(-${angle}deg)`,
                    }}
                  >
                    {/* Counter-Rotation Layer so node icons & labels stay upright */}
                    <motion.div
                      animate={{ rotate: orbit.clockwise ? -360 : 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: paused ? 999999 : orbit.duration,
                        ease: 'linear',
                      }}
                    >
                      <button
                        onClick={() => setSelectedNode(node)}
                        data-cursor
                        className={`pointer-events-auto group px-3 py-1.5 rounded-full card-flat border hairline bg-surface/90 backdrop-blur-md shadow-lg flex items-center gap-2 hover:scale-115 hover:border-accent2 transition-all duration-300 ${
                          selectedNode?.name === node.name
                            ? 'border-accent2 ring-2 ring-accent2/30 scale-110'
                            : ''
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: node.color }}
                        />
                        <Icon size={13} className="text-muted group-hover:text-ink transition-colors" />
                        <span className="text-xs font-medium text-ink/90 whitespace-nowrap">
                          {node.name}
                        </span>
                      </button>
                    </motion.div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        )
      })}

      {/* Selected Node Details Card (Bottom Right Floating Glass Banner) */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12 }}
          className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 p-4 rounded-2xl card-flat border border-accent2/40 bg-surface/90 backdrop-blur-xl max-w-xs shadow-2xl"
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-semibold text-sm text-ink flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedNode.color }} />
              {selectedNode.name}
            </span>
            <span className="tag-mono text-[10px] text-accent2 bg-accent2/10 px-2 py-0.5 rounded-full">
              {selectedNode.category}
            </span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            Active node in Bhuvanesh's production workflow, powering full-stack pipelines & AI models.
          </p>
        </motion.div>
      )}
    </div>
  )
}
