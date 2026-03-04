interface ButtonProps {
  text: string;
  textColor?: string;
  isActive?: boolean;
  outline?: boolean;
  onClick: () => void;
}

const Button = ({text, textColor, isActive, outline = false, onClick}: ButtonProps) => {
  return (
    <button className={`px-4 py-2 rounded-full bg-neutral-0 dark:bg-neutral-700 text-sm font-medium shadow hover:shadow-mist-50 hover:ring-2 hover:ring-red-500 active:ring-2 active:ring-rose-50 ${isActive ? 'bg-red-500 text-white dark:bg-red-600 dark:text-neutral-800' : ''} ${outline ? 'border border-neutral-500 text-red-500 dark:border-neutral-500 dark:text-red-500' : ''} ${textColor ? `text-${textColor} dark:text-white hover:bg-red-500 dark:hover:text-neutral-800 hover:text-white hover:border-none` : ''}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button