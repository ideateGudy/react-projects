import { useState, useEffect } from "react";
import FAQItem from "./FAQItem";
import faqData from "../data/faqData";
import type { FAQListsProps } from "../interface/index";

const FAQLists = ({ toggleDarkMode, darkMode }: FAQListsProps) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState<boolean>(false);

  const toggleItem = (id: number) => {
    if (expandAll) {
      setExpandAll(false);
    }
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  const toggleExpandAll = () => {
    setExpandAll((prev) => !prev);
    setOpenId(null);
  };

  useEffect(() => {
    if (openId && typeof window !== "undefined") {
      const element = document.getElementById(`faq-item-${openId}`);
      setTimeout(() => {
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [openId]);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text text-center sm:text-left w-full sm:w-auto">
          Frequently Asked Questions
        </h2>
        <div className="flex items-center space-x-4">
          <button onClick={toggleExpandAll} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all duration-300 cursor-pointer">
            <i className={`bx bx-${expandAll ? "collapse-alt" : "expand-alt"} text-lg`}></i>
            <span>{expandAll ? "Collapse All" : "Expand All"}</span>
          </button>
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-r from-gray-200 to-gray-300 text-gray-700 dark:from-gray-700 dark:to-gray-800 dark:text-gray-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-300 cursor-pointer"
          >
            <div className={`bx text-xl bx-${darkMode ? "sun" : "moon"}`}></div>
          </button>
        </div>
      </div>
      <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg border border-indigo-100/50 dark:border-gray-900/30 overflow-hidden transition-all duration-300">
        {faqData.map((item) => (
          <FAQItem key={item.id} item={item} onClick={toggleItem} isOpen={expandAll || openId === item.id} />
        ))}
      </div>
    </div>
  );
};

export default FAQLists;
