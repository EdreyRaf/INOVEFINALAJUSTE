import { useEffect, useState, useRef } from 'react';

interface StatItem {
  value: string;
  title: string;
  description: string;
}

interface CarouselStatsProps {
  items: StatItem[];
}

const CarouselStats = ({ items }: CarouselStatsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);

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
    const threshold = 75;
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

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full">
      {/* Mobile: Carousel View */}
      <div className="md:hidden px-4">
        <div
          ref={carouselRef}
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
                  ? -currentIndex * 100 + (dragOffset / (carouselRef.current?.offsetWidth || 1)) * 100
                  : -currentIndex * 100
              }%)`
            }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <div className={`bg-white/95 backdrop-blur-sm rounded-3xl p-6 mx-2 text-center transition-all duration-300 hover:bg-white shadow-elegant hover:shadow-glow border-2 border-accent/20 hover:border-accent/40 ${
                  isDragging ? 'scale-[0.98]' : 'scale-100'
                }`}>
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ring-4 ring-accent/20 animate-pulse-glow">
                    <span className="font-bold" style={{ fontSize: '25px', color: '#ffffff' }}>{item.value}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-primary">{item.title}</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-accent' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Grid View */}
      <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12 px-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-10 text-center transition-all duration-300 hover:bg-white shadow-elegant hover:shadow-glow hover:scale-105 border-2 border-accent/20 hover:border-accent/40">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ring-4 ring-accent/20 animate-pulse-glow">
              <span className="lg:text-4xl font-bold" style={{ fontSize: '25px', color: '#ffffff' }}>{item.value}</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-primary">{item.title}</h3>
            <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselStats;
