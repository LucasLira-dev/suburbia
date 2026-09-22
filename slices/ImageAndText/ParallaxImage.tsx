'use client';

import { ImageField } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useEffect, useRef } from "react";

interface ParallaxImageProps {
    foregroundImage: ImageField;
    backgroundImage: ImageField;
    className?: string;
}

export const ParallaxImage = ({ foregroundImage, backgroundImage, className }: ParallaxImageProps) => {

    const backgroundImageRef = useRef<HTMLDivElement>(null);
    const foregroundImageRef = useRef<HTMLDivElement>(null);
    
    const targetPosition = useRef({ x: 0, y: 0 });
    const currentPosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const frameId = requestAnimationFrame(animationFrame);
        window.addEventListener("mousemove", onMouseMove);

        function onMouseMove(event: MouseEvent) {
            const { innerWidth, innerHeight } = window;

            const xPercent = (event.clientX / innerWidth - 0.5) * 2;
            const yPercent = (event.clientY / innerHeight - 0.5) * 2;

            targetPosition.current = {
                x: xPercent * -20,
                y: yPercent * -20,
            }
        }

        function animationFrame() {
            const { x: targetX, y: targetY } = targetPosition.current;
            const { x: currentX, y: currentY } = currentPosition.current;

            const newX = currentX + (targetX - currentX) * 0.1;
            const newY = currentY + (targetY - currentY) * 0.1;

            currentPosition.current = { x: newX, y: newY };

            if (backgroundImageRef.current) {
                backgroundImageRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
            }

            if (foregroundImageRef.current) {
                foregroundImageRef.current.style.transform = `translate(${newX * 2.5}px, ${newY * 2.5}px)`;
            }

            requestAnimationFrame(animationFrame);
        }

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(frameId);
        }
    }, [])

    return (
        <div className={clsx("grid grid-cols-1 place-items-center", className)}>
            <div 
            ref={backgroundImageRef}
            className="col-start-1 row-start-1 flex h-full w-full items-center justify-center transition-transform">
                <PrismicNextImage 
                field={backgroundImage} 
                fallbackAlt=""
                className="w-11/12"
                />
            </div>
            <div 
            ref={foregroundImageRef}
            className="col-start-1 row-start-1 flex h-full w-full items-center justify-center transition-transform">
                <PrismicNextImage 
                field={foregroundImage} 
                fallbackAlt="" 
                imgixParams={{ height: 400 }}
                className="h-full max-h-125 w-auto"
                />
            </div>
        </div>
    )
}