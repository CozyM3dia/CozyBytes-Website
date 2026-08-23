const ITEMS = ['Website Profesional', 'Tanpa Pusing', 'Dari Bandar Lampung', 'Untuk Indonesia']

function Copy() {
  return (
    <div className="flex items-center">
      {[0, 1, 2].flatMap((r) =>
        ITEMS.map((item, idx) => {
          const i = r * ITEMS.length + idx
          const outlined = i % 2 === 1
          return (
            <span key={i} className="flex items-center">
              <span
                className="font-display text-3xl font-medium uppercase tracking-tight text-white/85 md:text-5xl"
                style={
                  outlined
                    ? { WebkitTextStroke: '1px rgba(255,255,255,0.28)', color: 'transparent' }
                    : undefined
                }
              >
                {item}
              </span>
              <span aria-hidden className="mx-6 text-xl text-[#00FFFF]/60 md:mx-10 md:text-2xl">
                ✦
              </span>
            </span>
          )
        }),
      )}
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="relative overflow-x-clip py-10 md:py-14">
      <div className="group -ml-[2%] w-[104%] -rotate-1 border-y border-white/[0.08] bg-white/[0.015]">
        <div className="flex w-max items-center whitespace-nowrap py-5 will-change-transform [animation:marquee_26s_linear_infinite] group-hover:[animation-play-state:paused] md:py-7">
          <Copy />
          <div aria-hidden>
            <Copy />
          </div>
        </div>
      </div>
    </section>
  )
}
