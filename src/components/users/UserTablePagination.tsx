import { ChevronLeft, ChevronRight } from "lucide-react";



// Pagination component for user tables
interface UserTablePaginationProps {

  currentPage: number;
  totalPages: number;
  hasNext: boolean | null | undefined | string;
  onPrev: () => void;
  onNext: () => void;

}



export function UserTablePagination({ currentPage, totalPages, hasNext, onPrev, onNext, }: UserTablePaginationProps) {


  if (totalPages <= 1) return null;


  return (


    <div className="flex items-center justify-end space-x-2 mt-4 pt-4">


      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-muted disabled:opacity-50 transition-colors"
      >

        <ChevronLeft className="h-4 w-4" />

      </button>


      <span className="text-sm text-muted-foreground font-medium">
        Page {currentPage} of {totalPages}
      </span>


      <button
        onClick={onNext}
        disabled={currentPage === totalPages || !hasNext}
        className="p-2 rounded-lg hover:bg-muted disabled:opacity-50 transition-colors"
      >

        <ChevronRight className="h-4 w-4" />

      </button>

    </div>

  );


}
