export default function GroupSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200 animate-pulse" />
      
      <div className="p-6">
        {/* Header Skeleton */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Location Skeleton */}
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />

        {/* Admin Skeleton */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          <div className="space-y-1">
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
