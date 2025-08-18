import { motion } from 'framer-motion';

export default function PostSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-6">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="mt-4 h-48 bg-gray-200 rounded-lg animate-pulse" />

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
          <div className="flex space-x-6">
            <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          </div>
          <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
