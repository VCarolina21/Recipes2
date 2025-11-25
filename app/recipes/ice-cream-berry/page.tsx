"use client";

export default function IceCreamBerryPage() {
  return (
    <main className="container py-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        🍨 Ice Cream Berry
      </h1>

      {/* IMAGE */}
      <div className="flex justify-center mb-8">
        <img
          src="/icecreamberry.png"
          alt="Ice Cream Berry"
          className="rounded-2xl shadow-lg"
          style={{ width: "500px", height: "auto", objectFit: "cover" }}
        />
      </div>

      {/* DESCRIPTION */}
      <p className="text-center text-lg mb-8">
        Es krim lembut dengan perpaduan rasa berry segar yang manis dan sedikit asam. 
        Cocok dinikmati di siang hari yang panas atau sebagai pencuci mulut 🍓🫐
      </p>

      {/* RECIPE BOX */}
      <div
        className="card"
        style={{ padding: "24px", backgroundColor: "white" }}
      >
        <h2 className="text-2xl font-semibold mb-4">📌 Bahan - bahan</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>300 ml krim kental (whipping cream)</li>
          <li>200 ml susu cair</li>
          <li>100 gr gula pasir</li>
          <li>150 gr campuran berry (stroberi, blueberry, raspberry)</li>
          <li>1 sdt ekstrak vanila</li>
          <li>1 sdm air lemon (opsional)</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">🍦 Cara Membuat</h2>
        <ol className="list-decimal pl-6 leading-relaxed">
          <li>Kocok krim hingga mengental, sisihkan.</li>
          <li>Panaskan susu dengan gula hingga larut, jangan sampai mendidih.</li>
          <li>Tambahkan ekstrak vanila & campuran berry, blender hingga halus.</li>
          <li>Campurkan krim kocok ke larutan susu berry secara perlahan.</li>
          <li>Tuang ke wadah, simpan di freezer minimal 4 jam hingga beku.</li>
          <li>Sajikan dengan topping berry segar jika suka 🍓🫐</li>
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