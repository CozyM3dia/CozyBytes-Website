import React, { useRef, useState, useEffect } from 'react'
import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  MotionValue,
} from 'framer-motion'

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [0.72, 0.92] : [1.04, 1]
  }

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 28,
    mass: 0.6,
  })
  const rotate = useTransform(smoothProgress, [0, 0.56], [10, 0])
  const scale = useTransform(smoothProgress, [0, 0.58], scaleDimensions())
  const translate = useTransform(smoothProgress, [0, 0.72], [24, -120])
  const opacity = useTransform(smoothProgress, [0, 0.18], [0.35, 1])
  const titleParallax = useTransform(smoothProgress, [0.48, 1], [0, -180])

  return (
    <div
      className="h-[40rem] md:h-[55rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-8 md:py-16 w-full relative"
        style={{ perspective: '1600px' }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <motion.div style={{ opacity, y: titleParallax }}>
          <Card rotate={rotate} translate={translate} scale={scale}>
            {children}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: React.ReactNode
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="w-full mx-auto text-center flex flex-col items-center"
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 rgba(0,0,0,0.3), 0 18px 38px rgba(0,0,0,0.3), 0 60px 60px rgba(0,0,0,0.22), 0 130px 90px rgba(0,0,0,0.12)',
        transformOrigin: 'center top',
      }}
      className="w-full max-w-[92vw] md:max-w-[85vw] lg:max-w-7xl mx-auto aspect-video border border-white/10 p-2 md:p-5 bg-[#0a0a0e] rounded-[24px] md:rounded-[40px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-xl md:rounded-3xl">
        {children}
      </div>
    </motion.div>
  )
}
