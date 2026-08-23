export default function GlowMesh() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,19,0.55) 0%, rgba(9,9,11,0.2) 45%, rgba(13,27,61,0.25) 100%)",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl [animation:aurora-a_32s_ease-in-out_infinite_alternate]"
        style={{
          top: "-25%",
          right: "-10%",
          width: "58vw",
          height: "70vh",
          willChange: "transform",
          background:
            "radial-gradient(circle at center, rgba(0,255,255,0.06) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[110px] [animation:aurora-b_40s_ease-in-out_infinite_alternate]"
        style={{
          top: "38%",
          left: "-18%",
          width: "55vw",
          height: "65vh",
          willChange: "transform",
          background:
            "radial-gradient(circle at center, rgba(30,42,120,0.30) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl [animation:aurora-c_36s_ease-in-out_infinite_alternate]"
        style={{
          top: "62%",
          right: "-12%",
          width: "42vw",
          height: "55vh",
          willChange: "transform",
          background:
            "radial-gradient(circle at center, rgba(196,181,253,0.07) 0%, transparent 66%)",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl [animation:aurora-a_44s_ease-in-out_infinite_reverse]"
        style={{
          bottom: "-26%",
          left: "4%",
          width: "52vw",
          height: "60vh",
          willChange: "transform",
          background:
            "radial-gradient(circle at center, rgba(248,209,106,0.065) 0%, transparent 66%)",
        }}
      />
      <div
        className="absolute -translate-x-1/2 rounded-full blur-3xl"
        style={{
          top: "45%",
          left: "50%",
          width: "100vw",
          height: "90vh",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.028) 0%, transparent 75%)",
        }}
      />
      <div
        className="absolute top-0 h-40 blur-2xl"
        style={{
          left: "10%",
          right: "10%",
          background:
            "linear-gradient(to bottom, rgba(0,255,255,0.06), transparent)",
        }}
      />
    </div>
  );
}
