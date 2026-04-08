import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

export function TableSkeleton({ columns = 5, rows = 5 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-border/50">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="py-4 px-4">
              <Skeleton className="h-4 w-full max-w-[80%] rounded-md" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
