import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import CTASection from '../sections/CTASection'

const teamMembers = [
  {
    role: 'Founder',
    name: 'Sibgha Alfirdausi Rambe',
    image: '/team/sibgha-alfirdausi-rambe.png',
    desc: 'Mengarahkan visi Cozybytes Media, menjaga standar kreatif, dan memastikan setiap proyek terasa strategis untuk bisnis klien.',
  },
  {
    role: 'Co-Founder · Outreach & Marketing',
    name: 'Ubaidillah Rafi Ussalam',
    image: '/team/ubaidillah-rafi-ussalam.png',
    desc: 'Menangani research, sales, marketing, dan outreach agar solusi Cozybytes tepat sasaran dan dekat dengan kebutuhan pasar.',
  },
  {
    role: 'Co-Founder · Technology',
    name: 'Hanan Ghaffari',
    image: '/team/hanan-ghaffari.png',
    desc: 'Memimpin sisi teknis, engineering, dan implementasi website supaya desain yang rapi juga kuat, cepat, dan stabil.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen text-white/90">
      <Navbar />

      {/* Hero / Header Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,255,255,0.15) 0%, transparent 70%)' }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 
              className="text-3xl sm:text-5xl md:text-7xl mb-6 leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Tiga Kepala, Satu Visi.<br />
              <em className="text-[#00FFFF] italic">Dari Lampung untuk Indonesia.</em>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed px-2">
              Kami adalah tim kecil dengan mimpi besar. Membantu UMKM dan bisnis merintis langkah percaya diri di era digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Story Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-white/70 text-lg leading-relaxed font-light"
            >
              <h2 
                className="text-4xl text-white mb-8"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                Cerita Kami
              </h2>
              <p>
                Berawal dari semangat yang sama di <strong>Bandar Lampung</strong>, Cozybytes Media lahir dari tangan tiga orang pemuda yang percaya bahwa setiap bisnis, sekecil apapun, berhak memiliki representasi digital yang premium dan profesional.
              </p>
              <p>
                Sebagai tim yang juga sedang merintis, kami sangat memahami tantangan yang dihadapi oleh UMKM dan startup lokal. Anggaran yang terbatas seringkali menjadi penghalang untuk mendapatkan website berkualitas tinggi. Itulah mengapa kami hadir: untuk menjembatani kesenjangan tersebut.
              </p>
              <p>
                Meski kami baru memulai perjalanan ini, dedikasi kami tidak main-main. Kami menggabungkan estetika desain modern, keahlian teknis (SEO & UI/UX), dan strategi copywriting yang berpusat pada konversi. Kami tidak sekadar membuat website, kami merancang <span className="text-[#00FFFF]">aset digital</span> yang bekerja siang-malam untuk Anda.
              </p>
            </motion.div>

            {/* Visual/Image Area */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden liquid-glass relative z-10 p-2">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Tim Cozybytes Media Lampung" 
                  className="w-full h-full object-cover rounded-2xl opacity-80"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#00FFFF]/20 blur-3xl rounded-full z-0" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 
              className="text-4xl md:text-5xl mb-6"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Meet Our Team
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Tiga kepala di balik layar Cozybytes Media. Kami menggabungkan strategi, kreativitas, dan teknologi untuk mewujudkan visi digital Anda.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div 
                key={member.name} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="liquid-glass p-5 rounded-3xl border border-white/5 flex flex-col items-center text-center group hover:border-[#00FFFF]/25 transition-colors duration-500"
              >
                <div className="w-full aspect-[4/5] rounded-2xl mb-6 overflow-hidden bg-white/5 border border-white/10 group-hover:border-[#00FFFF]/45 transition-colors duration-300 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover grayscale-[12%] saturate-110 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                </div>
                
                <h3 className="text-2xl text-white font-medium mb-1" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  {member.name}
                </h3>
                <p className="text-[#00FFFF] text-sm font-semibold tracking-wide uppercase mb-4">
                  {member.role}
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 relative bg-white/[0.02]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 
              className="text-4xl md:text-5xl mb-12"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Nilai yang Kami Pegang
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Personal & Intim', desc: 'Karena kami tim kecil, komunikasi menjadi jauh lebih luwes. Kami mendengarkan cerita bisnis Anda layaknya seorang partner, bukan sekadar vendor.' },
                { title: 'Kualitas Premium', desc: 'Ukuran tim tidak membatasi standar kami. Setiap baris kode dan setiap piksel desain dikerjakan dengan standar estetika tertinggi.' },
                { title: 'Fokus pada Hasil', desc: 'Desain yang cantik tidak ada artinya tanpa konversi. Kami memastikan setiap halaman dioptimasi untuk SEO dan psikologi pengguna.' }
              ].map((val, i) => (
                <div key={i} className="liquid-glass p-8 rounded-2xl text-left border border-white/5 hover:border-[#00FFFF]/30 transition-colors duration-500">
                  <h3 className="text-xl text-white mb-3 font-medium">{val.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  )
}
