export default function GroupSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse relative">
        {/* Category Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <div className="w-16 h-6 bg-gray-300 rounded-full animate-pulse" />
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        {/* Header Skeleton */}
        <div className="mb-3">
          <div className="h-6 w-4/5 bg-gray-200 rounded animate-pulse mb-2" />
        </div>

        {/* Description Skeleton - with consistent height */}
        <div className="space-y-2 mb-4 flex-grow">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Location Skeleton */}
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />

        {/* Admin Skeleton */}
        <div className="flex items-center space-x-3 mb-4 p-2 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="space-y-1 flex-1">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
