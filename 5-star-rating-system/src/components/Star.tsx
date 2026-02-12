interface StarProps {
  index: number;
  rating: number;
  onRatingChange: (index: number, isLeftHalf: boolean) => void;
}
const Star = ({ index, rating, onRatingChange }: StarProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - left;
    const isLeftHalf = clickX < width / 2;
    onRatingChange(index, isLeftHalf);
  };

  const fill = rating >= index + 1 ? 100 : rating >= index + 0.5 ? 50 : 0;
  return (
    <div className="relative cursor-pointer text-5xl sm:text-7xl md:text-8xl lg:text-9xl" onClick={handleClick}>
      <i
        className={`bx bx-star text-green-400`}
      ></i>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${fill}%` }} // ✅ ADDED: controls half/full fill
      >
        <i className="bx bxs-star text-green-400"></i>
      </div>
    </div>
  );
};

export default Star;
