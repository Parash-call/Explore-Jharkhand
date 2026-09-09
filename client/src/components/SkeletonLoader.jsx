import React from 'react';

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl glass-card overflow-hidden animate-pulse border border-slate-200 dark:border-slate-800">
          <div className="h-56 bg-slate-200 dark:bg-slate-800 w-full"></div>
          <div className="p-5 space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
            <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
              <div className="h-6 bg-emerald-600/30 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
