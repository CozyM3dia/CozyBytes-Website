/**
 * Konstanta motion yang dipakai bersama seluruh halaman layanan.
 *
 * Sebelumnya tiap halaman menuliskan `[0.22, 1, 0.36, 1]` inline di puluhan
 * tempat, jadi easing gampang melenceng antar section tanpa ada yang sadar.
 * Satu sumber di sini membuat ritme animasi konsisten lintas halaman.
 */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Spring responsif — untuk elemen yang mengikuti kursor secara langsung. */
export const SPRING = { stiffness: 140, damping: 20, mass: 0.5 }

/** Spring lembut — untuk tilt/parallax yang harus terasa berat. */
export const SOFT_SPRING = { stiffness: 90, damping: 24, mass: 0.7 }
