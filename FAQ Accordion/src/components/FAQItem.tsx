import { useRef, useState, useEffect } from "react";
import type { FAQItemProps } from "../interface/index";

const FAQItem = ({ item, onClick, isOpen }: FAQItemProps) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    if (isOpen && answerRef.current) {
      setMaxHeight(answerRef.current.scrollHeight);
    } else {
      setMaxHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className="border-b border-gray-200 dark:border-gray-700 last:border-none transition-colors duration-300 hover:bg-linear-to-r hover:from-gray-50/50 hover:to-transparent hover:dark:from-gray-800/50 hover:dark:to-transparent"
      id={`faq-item-${item.id}`}
    >
      <button
        className={`w-full py-5 px-4 flex justify-between items-center text-left focus:outline-none rounded-lg transition-all duration-300 cursor-pointer ${isOpen ? "bg-linear-to-r from-indigo-100 via-purple-100 to-indigo-100 dark:from-indigo-900/80 dark:via-purple-900/80 dark:to-indigo-900/70 text-indigo-900 dark:text-indigo-200 font-semibold" : "text-gray-900 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-300"} `}
        onClick={() => onClick(item.id)}
        aria-expanded={isOpen}
        aria-controls={`answer-${item.id}`}
      >
        <span className="text-lg font-medium pr-6">{item.question}</span>
        <div
          className={`shrink-0 flex items-center justify-center w-8 min-w-8 aspect-square rounded-full  ${isOpen ? "bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 shadow-md" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          <i
            className={`bx bx-plus ${isOpen ? "rotate-45 transition-all duration-1000 ease-in-out text-white" : "text-gray-600 dark:text-gray-400 rotate-90 transition-all duration-1000 ease-in-out"}`}
          ></i>
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-200 ease-out"
        id={`answer-${item.id}`}
        ref={answerRef}
        style={{
          maxHeight: `${maxHeight}px`,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="p-4 pt-0 pb-5 text-gray-700 dark:text-gray-200">
          <div className="p-3 rounded-lg overflow-y-auto max-h-75">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
