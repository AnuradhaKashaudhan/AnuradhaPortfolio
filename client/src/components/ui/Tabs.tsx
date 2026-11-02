import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id)

  const activeTab = tabs.find((t) => t.id === active)

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Tab list */}
      <div
        role="tablist"
        className="relative flex gap-1 p-1 rounded-xl bg-[var(--color-surface-elevated)] w-fit"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={cn(
              'relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
              'flex items-center gap-2 cursor-pointer',
              active === tab.id
                ? 'text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            )}
          >
            {active === tab.id && (
              <motion.div
                layoutId="active-tab-bg"
                className="absolute inset-0 bg-[var(--color-surface)] rounded-lg shadow"
                transition={{ type: 'spring', duration: 0.35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab panel */}
      {activeTab && (
        <div
          role="tabpanel"
          id={`panel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
        >
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab.content}
          </motion.div>
        </div>
      )}
    </div>
  )
}
