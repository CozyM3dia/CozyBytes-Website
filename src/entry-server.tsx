// react-router v7 tidak lagi punya subpath /server; StaticRouter ada di entry utama
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { prerenderToNodeStream } from 'react-dom/static'
import AppRoutes from './AppRoutes'

export type RenderResult = {
  /** Markup untuk <div id="root"> */
  html: string
  /** Tag metadata (title/meta/link) yang harus dipindah ke <head> */
  head: string
}

/**
 * Node Readable itu AsyncIterable, jadi stream dibaca lewat for-await saja.
 * Tipe lokal ini dipakai supaya file tidak bergantung pada @types/node —
 * tsconfig app ini ber-lib DOM, di mana `NodeJS.ReadableStream` malah resolve
 * ke ReadableStream versi web yang tidak punya `.on`.
 */
type ChunkStream = AsyncIterable<Uint8Array | string>

async function streamToString(stream: ChunkStream): Promise<string> {
  const decoder = new TextDecoder()
  let out = ''
  for await (const chunk of stream) {
    out += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true })
  }
  return out + decoder.decode()
}

/**
 * Deretan tag metadata yang React angkat ke depan output.
 *
 * Di React 19, react-helmet-async tidak lagi mengisi `context` (lihat catatan
 * "React 19 SSR" di README-nya) — tag <title>/<meta>/<link> di dalam <Helmet>
 * ikut jadi output render, lalu React memindahkannya ke paling depan stream.
 * Karena kita merender fragment (bukan dokumen utuh), tidak ada <head> yang
 * bisa dituju React, jadi prefix itu kita potong sendiri di sini dan script
 * prerender yang menempelkannya ke <head> milik template Vite.
 */
const HOISTED_METADATA =
  /^(?:\s*(?:<link\b[^>]*?\/?>|<meta\b[^>]*?\/?>|<title\b[^>]*?>[\s\S]*?<\/title>))+/

/**
 * Render satu route jadi HTML statis.
 *
 * Pakai prerenderToNodeStream (React 19) dan bukan renderToString karena route
 * di-load pakai React.lazy — renderToString akan berhenti di Suspense fallback
 * dan metadata di dalam halaman (termasuk og:image) tidak akan pernah ikut.
 * prerenderToNodeStream menunggu semua Suspense boundary selesai dulu.
 */
export async function render(url: string): Promise<RenderResult> {
  const { prelude } = await prerenderToNodeStream(
    <HelmetProvider>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>,
  )

  const rendered = await streamToString(prelude as unknown as ChunkStream)

  const match = rendered.match(HOISTED_METADATA)
  const head = match ? match[0].trim() : ''
  const html = match ? rendered.slice(match[0].length) : rendered

  return { html, head }
}
