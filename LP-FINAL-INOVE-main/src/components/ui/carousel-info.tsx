import { useEffect, useState } from 'react';

interface InfoItem {
  title: string;
  description: string;
}

interface CarouselInfoProps {
  items: InfoItem[];
}

const CarouselInfo = ({ items }: CarouselInfoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [items.length, isAutoPlaying]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
    setIsDragging(true);
    setIsAutoPlaying(false);
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);

    const offset = currentTouch - touchStart;
    setDragOffset(offset);

    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isDragging || !touchStart || touchEnd === 0) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const threshold = 60;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }

    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(0);
    setTouchEnd(0);

    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  return (
    <div className="relative w-full">
      {/* Mobile: Carousel View */}
      <div className="sm:hidden">
        <div
          className="overflow-hidden touch-pan-x"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-x' }}
        >
          <div
            className={`flex carousel-container ${
              isDragging ? 'transition-none' : 'transition-transform duration-500 ease-out'
            }`}
            style={{
              transform: `translateX(${
                isDragging
                  ? -currentIndex * 100 + (dragOffset / 320) * 100
                  : -currentIndex * 100
              }%)`
            }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-3 transition-all duration-300 hover:bg-white/15 ${
                  isDragging ? 'scale-[0.98] bg-white/15' : 'scale-100'
                }`}>
                  <h4 className="text-sm font-semibold text-accent mb-1">{item.title}</h4>
                  <p className="text-xs text-white/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Indicators */}
        <div className="flex justify-center mt-2 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 8000);
              }}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-accent' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Grid View */}
      <div className="hidden sm:grid sm:grid-cols-2 gap-6 lg:gap-8">
        {items.map((item, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 lg:p-8 transition-all duration-300 hover:bg-white/15 hover:scale-105">
            <h4 className="text-sm lg:text-2xl font-semibold text-accent mb-1 lg:mb-3">{item.title}</h4>
            <p className="text-xs lg:text-xl text-white/80">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselInfo;
