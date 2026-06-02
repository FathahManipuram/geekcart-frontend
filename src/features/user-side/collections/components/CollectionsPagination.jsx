const CollectionsPagination = ({
  pagination,

  onPageChange,
}) => {
  const {
    currentPage = 1,

    totalPages = 1,
  } = pagination || {};

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className="
        mt-12
        flex
        items-center
        justify-center
        gap-3
      "
    >
      {/* PREV */}
      <button
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(
            currentPage - 1,
          )
        }
        className="
          rounded-xl
          border
          px-4
          py-2
          disabled:opacity-40
        "
      >
        Prev
      </button>

      {/* PAGES */}
      {Array.from({
        length: totalPages,
      }).map((_, index) => {
        const page =
          index + 1;

        return (
          <button
            key={page}
            onClick={() =>
              onPageChange(
                page,
              )
            }
            className={`
              h-10
              w-10
              rounded-xl
              border
              
              ${
                currentPage ===
                page
                  ? "bg-black text-white"
                  : ""
              }
            `}
          >
            {page}
          </button>
        );
      })}

      {/* NEXT */}
      <button
        disabled={
          currentPage ===
          totalPages
        }
        onClick={() =>
          onPageChange(
            currentPage + 1,
          )
        }
        className="
          rounded-xl
          border
          px-4
          py-2
          disabled:opacity-40
        "
      >
        Next
      </button>
    </div>
  );
};

export default CollectionsPagination;