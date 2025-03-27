interface SticksDisplayProps {
  count: number;
}

export default function SticksDisplay({ count }: SticksDisplayProps) {
  return (
    <div className="nes-container flex flex-wrap gap-1 justify-center">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          role="presentation"
          className="nes-icon coin is-medium"
        />
      ))}
    </div>
  );
}
