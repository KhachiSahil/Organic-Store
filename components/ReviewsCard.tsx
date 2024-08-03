import React from "react";

interface ReviewCardProps {
  rating: number;
  review: string;
  reviewer: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ rating, review, reviewer }) => {
  const stars = Array(5).fill(false).map((_, index) => index < rating);

  return (
    <div className="flex flex-col items-center p-8 bg-white m-6 shadow-lg gap-5 w-1/6 min-w-72">
      <div className="flex w-24">
        {stars.map((isFilled, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            fill={isFilled ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        ))}
      </div>
      <div className="flex-nowrap">
        {review}
      </div>
      <div className="font-semibold">
        {reviewer}
      </div>
    </div>
  );
}

export default ReviewCard;
