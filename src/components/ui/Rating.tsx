import { HiStar } from "react-icons/hi2";

interface RatingProps {
  value: string | number | undefined;
}

export default function Rating({ value }: RatingProps) {
  if (!value) return null;
  
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numericValue)) return null;

  // API is 0-10, normalize to 0-5
  const normalizedRating = (numericValue / 10) * 5;
  const ratingOutOfFive = Math.min(5, Math.max(0, normalizedRating));
  
  // Create an array representing 5 stars
  const starsArray = Array.from({ length: 5 }, (_, i) => {
    const starIndex = i + 1;
    if (ratingOutOfFive >= starIndex) {
      return "full";
    } else if (ratingOutOfFive >= starIndex - 0.5) {
      return "half";
    } else {
      return "empty";
    }
  });

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating: ${numericValue} out of 10`}>
      <div className="flex items-center text-amber-500">
        {starsArray.map((state, idx) => {
          if (state === "full") {
            return (
              <HiStar 
                key={idx} 
                size={16} 
                className="fill-amber-500 text-amber-500" 
                aria-hidden="true" 
              />
            );
          } else if (state === "half") {
            return (
              <div key={idx} className="relative inline-block" style={{ width: "16px", height: "16px" }}>
                <HiStar 
                  size={16} 
                  className="text-white/10 fill-white/10" 
                  aria-hidden="true" 
                />
                <div className="absolute top-0 left-0 overflow-hidden" style={{ width: "50%" }}>
                  <HiStar 
                    size={16} 
                    className="fill-amber-500 text-amber-500" 
                    aria-hidden="true" 
                  />
                </div>
              </div>
            );
          } else {
            return (
              <HiStar 
                key={idx} 
                size={16} 
                className="text-white/10 fill-white/10" 
                aria-hidden="true" 
              />
            );
          }
        })}
      </div>
      <span className="text-xs font-mono font-bold text-text-secondary leading-none">
        {numericValue.toFixed(1)}
      </span>
    </div>
  );
}
