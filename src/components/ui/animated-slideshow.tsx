"use client"

/* eslint-disable react-refresh/only-export-components */

import * as React from "react"
import { type HTMLMotionProps, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextStaggerHoverProps {
  text: string
  index: number
}
interface HoverSliderImageProps {
  index: number
  imageUrl: string
}
interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}
// splitText removed — perf: TextStaggerHover now uses single CSS transition instead of per-char motion

const HoverSliderContext = React.createContext<HoverSliderContextValue | undefined>(undefined)

export function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (context === undefined) {
    throw new Error("useHoverSliderContext must be used within a HoverSliderProvider")
  }
  return context
}

export const HoverSlider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0)
  const changeSlide = React.useCallback(
    (index: number) => setActiveSlide(index),
    [setActiveSlide]
  )
  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div ref={ref} className={className} {...props}>{children}</div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = "HoverSlider"

export const TextStaggerHover = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & TextStaggerHoverProps
>(({ text, index, className, ...props }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const isActive = activeSlide === index
  const handleMouse = () => changeSlide(index)
  // Perf: replaced per-character MotionConfig (N*2 motion nodes per item, ~70 nodes) with single CSS transition.
  // Visual parity kept: active glows, inactive dims, hover lifts via translateY.
  return (
    <span
      className={cn(
        "relative inline-block cursor-pointer select-none transition-colors duration-300",
        isActive ? "text-[#00FFFF]" : "text-white/60 hover:text-white",
        className
      )}
      {...props}
      ref={ref as any}
      onMouseEnter={handleMouse}
    >
      <span className={cn("inline-block transition-transform duration-300", isActive ? "-translate-y-0.5" : "")}>
        {text}
      </span>
    </span>
  )
})
TextStaggerHover.displayName = "TextStaggerHover"

export const clipPathVariants = {
  visible: { opacity: 1, scale: 1 },
  hidden:  { opacity: 0, scale: 1.02 },
}

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className
      )}
      {...props}
    />
  )
})
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()
  const isActive = activeSlide === index
  return (
    <motion.img
      className={cn("inline-block align-middle will-change-transform", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.45 }}
      variants={clipPathVariants}
      animate={isActive ? "visible" : "hidden"}
      style={{ pointerEvents: isActive ? 'auto' : 'none' }}
      ref={ref}
      src={imageUrl}
      {...props}
    />
  )
})
HoverSliderImage.displayName = "HoverSliderImage"
