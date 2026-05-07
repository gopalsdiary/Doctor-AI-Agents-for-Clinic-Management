import React from 'react'

export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-transparent flex items-end justify-end p-4">
      {children}
    </div>
  )
}
