import React from 'react'
import { Outlet } from 'react-router-dom'

export default function WidgetLayout() {
  return (
    <div className="min-h-screen bg-transparent flex items-end justify-end p-4">
      <Outlet />
    </div>
  )
}
