import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Not Found</h2>
      <p>Halaman yang kamu cari tidak ditemukan.</p>
      <Link href="/">Kembali ke Home</Link>
    </div>
  )
}