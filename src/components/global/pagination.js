import { useState } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleButtonClick = (pageNumber) => {
    setIsChecked(false);
    onPageChange(pageNumber);
  };

  return (
    <div className="">
      <input
        type="checkbox"
        id="pagination"
        value="pagination"
        className="peer"
        hidden
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor="pagination"
        className="px-4 py-2 rounded-xl border-2 border-text-title flex items-center text-xl justify-center w-36 gap-4 peer-checked:rounded-b-none"
      >
        <span>Page {currentPage} </span>
        <span className="mt-2">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="8"
          >
            <path
              data-name="Path 2024"
              d="M15.726 1.425 8.648 7.743A1.068 1.068 0 0 1 8 8.005a.98.98 0 0 1-.614-.231L.274 1.425A.786.786 0 0 1 .247.256.931.931 0 0 1 1.503.231l6.5 5.8 6.5-5.792a.931.931 0 0 1 1.256.025.781.781 0 0 1-.026 1.165Z"
              fill="#3a3735"
            />
          </svg>
        </span>
      </label>
      <div className={`hidden flex-col border-2 border-text-title rounded-xl rounded-t-none border-t-0 w-36 ${isChecked ? 'peer-checked:flex' : ''}`}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handleButtonClick(pageNumber)}
              className={`text-base hover:bg-blue/30 ${pageNumber ===
                currentPage
                ? 'text-text-title font-bold'
                : 'text-text-body'}`}
            >
              -{pageNumber}-
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;
