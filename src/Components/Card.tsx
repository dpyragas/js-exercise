import React from "react";

interface CardProps {
  src: string;
}
const Card = ({ src }: CardProps) => {
  return (
    <div>
      <img style={{ width: "300px", height: "300px" }} src={src} alt={src} />
    </div>
  );
};

export default Card;
