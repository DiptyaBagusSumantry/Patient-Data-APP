import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ currentPage, totalPages, onPageChange, onPrevChange, onNextChange, lengthData, limitData }) => {
  const maxVisiblePages = 3;
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
  
  let startPage = Math.max(1, currentPage - halfMaxVisiblePages);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageRange = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  
  return (
    <div>
      <div style={{alignItems: 'center', justifyContent: 'end', display: 'flex'}} className=' mt-[50px]'>
        <div className='flex items-center gap-[24px]'>
          <button onClick={onPrevChange} disabled={currentPage === 1} className='rounded-[3px] shadow-sm border-2 w-[35px] h-[35px]'>
            <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}} className='flex items-center justify-center'>
              <IoIosArrowBack className='text-[#667680] text-2xl' />
            </div>
          </button>
          <div className=' flex gap-[10px] items-center'>
            {startPage > 1 && (
              <>
                <button style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}} className='bg-white shadow-sm rounded-[3px] w-[35px] h-[35px] border-2 bg-opacity-10' onClick={() => onPageChange(1)}>
                  <h1 className='text-[#003748] text-[20px]'>1</h1>
                </button>
                {startPage > 2 && (
                  <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}} className='text-[#003748] bg-white shadow-sm rounded-[3px] w-[35px] h-[35px] border-2 flex items-center justify-center'>...</div>
                )}
              </>
            )}
            {pageRange.map((page) => (
              <button
                key={page}
                style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}
                className={currentPage === page ? 'bg-white shadow-sm rounded-[3px] w-[35px] h-[35px] border-2 flex items-center justify-center' : 'bg-white shadow-sm rounded-[3px] w-[35px] h-[35px] border-2 bg-opacity-10 flex items-center justify-center'}
                onClick={() => onPageChange(page)}
              >
                  <h1 style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}} className={currentPage === page ? 'text-white text-[14px] bg-blue-700 w-full h-full flex items-center justify-center' : 'text-[#003748] text-[14px]'}>{page}</h1>
              </button>
            ))}
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && (
                  <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}} className='text-[#003748] bg-white shadow-sm rounded-[3px] w-[35px] h-[35px] border-2 flex items-center justify-center'>...</div>
                )}
                <button style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}} className='bg-white shadow-sm rounded-[3px] w-[35px] h-[35px] border-2 bg-opacity-10 flex items-center justify-center' onClick={() => onPageChange(totalPages)}>
                  <h1 className='text-[#003748] text-[14px]'>{totalPages}</h1>
                </button>
              </>
            )}
          </div>
          <button onClick={onNextChange} disabled={currentPage === totalPages} className='rounded-[3px] shadow-sm border-2 w-[35px] h-[35px]'>
          <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}} className='flex items-center justify-center'>
              <IoIosArrowForward className='text-[#667680] text-2xl' />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
