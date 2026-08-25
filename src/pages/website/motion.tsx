/**
 * Primitif motion halaman ini sekarang tinggal di components/section/motion
 * supaya dipakai bersama keempat halaman layanan (website, landing-page,
 * ecommerce, uiux). File ini hanya re-export agar section yang sudah ada
 * tetap bisa `import { Reveal } from './motion'` tanpa diubah.
 */

export {
  SplitLines,
  Reveal,
  SectionHeading,
  MagneticButton,
  SpotlightCard,
  TiltCard,
  Counter,
  Hairline,
} from '../../components/section/motion'
