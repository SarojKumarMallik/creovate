import React from 'react'

export interface BreadcrumbProps {
  pageTitle?: string;
}

export default function PageBreadcrumb({ pageTitle }: BreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {pageTitle}
      </h2>
    </div>
  )
}