"use client";

export default function BoluStrawberryPage() {
  return (
    <main className="container py-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        🍰 Bolu Strawberry
      </h1>

      {/* IMAGE */}
      <div className="flex justify-center mb-8">
        <img
          src="/bolustrawberry.png"
          alt="Bolu Strawberry"
          className="rounded-2xl shadow-lg"
          style={{ width: "500px", height: "auto", objectFit: "cover" }}
        />
      </div>

      {/* DESCRIPTION */}
      <p className="text-center text-lg mb-8">
        Bolu lembut beraroma strawberry dengan tekstur moist dan rasa manis yang pas.
        Cocok untuk camilan sore ditemani teh hangat 💗
      </p>

      {/* RECIPE BOX */}
      <div
        className="card"
        style={{ padding: "24px", backgroundColor: "white" }}
      >
        <h2 className="text-2xl font-semibold mb-4">📌 Bahan - bahan</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>200 gr tepung terigu</li>
          <li>150 gr gula pasir</li>
          <li>4 butir telur</li>
          <li>100 ml minyak goreng</li>
          <li>4 sdm sirup / pasta strawberry</li>
          <li>1 sdt baking powder</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">🧁 Cara Membuat</h2>
        <ol className="list-decimal pl-6 leading-relaxed">
          <li>Kocok telur & gula hingga mengembang.</li>
          <li>Masukkan tepung & baking powder, aduk perlahan.</li>
          <li>Tambahkan minyak & pasta strawberry.</li>
          <li>Tuang ke loyang, panggang 30–40 menit suhu 170°C.</li>
          <li>Angkat, dinginkan, potong dan sajikan 💗</li>
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