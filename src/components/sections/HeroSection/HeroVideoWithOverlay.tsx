import { DynamicComponent } from '@/components/components-registry';
import { useState } from 'react';

export default function HeroVideoWithOverlay({ media, poster }) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div
            className="
                relative w-full overflow-hidden rounded-2xl
                bg-black/10
                h-[260px]
                sm:h-[320px]
                md:h-[380px]
                lg:h-[420px]
            "
        >
            {/* Poster */}
            {!isPlaying && (
                <>
                    <img
                        src={poster}
                        alt="Video preview"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40" />

                    <button
                        onClick={() => setIsPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center"
                        aria-label="Play video"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-8 h-8 text-black ml-1"
                                fill="currentColor"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </button>
                </>
            )}

            {/* Video */}
            {isPlaying && (
                <div className="absolute inset-0">
                    <DynamicComponent
                        {...media}
                        autoplay
                        controls
                    />
                </div>
            )}
        </div>
    );
}
