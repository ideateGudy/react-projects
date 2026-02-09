export interface FAQListsProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

export interface FAQItemProps {
  item: {
    id: number;
    question: string;
    answer: string;
  }
    onClick: (id: number) => void;
    isOpen: boolean;
}