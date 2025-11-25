"use client";

export default function MochiPinkPage() {
  return (
    <main className="container py-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        🍡 Mochi Pink
      </h1>

      {/* IMAGE */}
      <div className="flex justify-center mb-8">
        <img
          src="/mochipink.png"
          alt="Mochi Pink"
          className="rounded-2xl shadow-lg"
          style={{ width: "500px", height: "auto", objectFit: "cover" }}
        />
      </div>

      {/* DESCRIPTION */}
      <p className="text-center text-lg mb-8">
        Mochi lembut dan kenyal dengan warna pink cantik, isi kacang merah manis.
        Cocok untuk cemilan lucu dan cantik di sore hari 💗
      </p>

      {/* RECIPE BOX */}
      <div
        className="card"
        style={{ padding: "24px", backgroundColor: "white" }}
      >
        <h2 className="text-2xl font-semibold mb-4">📌 Bahan - bahan</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>150 gr tepung ketan</li>
          <li>50 gr gula pasir</li>
          <li>200 ml susu cair</li>
          <li>Pasta strawberry / pewarna pink</li>
          <li>Tepung maizena sangrai secukupnya (untuk baluran)</li>
          <li>Isi kacang merah / coklat sesuai selera</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">🧁 Cara Membuat</h2>
        <ol className="list-decimal pl-6 leading-relaxed">
          <li>Campur tepung ketan, gula, dan susu cair, aduk rata.</li>
          <li>Tambahkan pewarna pink, aduk sampai merata.</li>
          <li>Masak dengan api kecil sambil diaduk hingga kalis.</li>
          <li>Dinginkan, lalu bagi adonan menjadi beberapa bagian.</li>
          <li>Isi dengan kacang merah, bentuk bulat, dan baluri maizena.</li>
          <li>Mochi Pink siap disajikan 💗</li>
        </ol>
      </div>

      {/* BACK BUTTON */}
      <div className="text-center mt-10">
        <button
          className="button"
          onClick={() => (window.location.href = "/")}
        >
          ⬅ Kembali
        </button>
      </div>
    </main>
  );
}