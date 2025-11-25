"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Recipe {
  id: number;
  title: string;
  shortDesc: string;
  desc: string;
  ingredients: string;
  image?: string;
}

export default function RecipeDetail() {
  const params = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("my-recipes");
    if (savedData) {
      const allRecipes: Recipe[] = JSON.parse(savedData);
      const found = allRecipes.find((r) => r.id == Number(params.id));
      if (found) {
        setRecipe(found);
      }
    }
  }, [params.id]);

  if (!recipe) {
    return <div className="text-center py-20 font-bold text-xl">Sedang memuat resep... 🍰</div>;
  }

  // Memisahkan teks berdasarkan baris baru (Enter)
  const ingredientsList = recipe.ingredients ? recipe.ingredients.split('\n') : [];
  const stepsList = recipe.desc ? recipe.desc.split('\n') : [];

  return (
    // Gunakan class CSS manual dari globals.css
    <main className="detail-container">
      
      {/* JUDUL */}
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        {recipe.title}
      </h1>

      {/* GAMBAR (Class: detail-image) */}
      {recipe.image ? (
        <img src={recipe.image} alt={recipe.title} className="detail-image" />
      ) : (
        <div style={{ width: '100%', height: '300px', backgroundColor: '#eee', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          No Image
        </div>
      )}

      {/* DESKRIPSI SINGKAT */}
      <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '30px', fontStyle: 'italic', color: '#555' }}>
        "{recipe.shortDesc}" 💗
      </p>

      {/* KOTAK PINK BESAR (Class: detail-card-pink) */}
      <div className="detail-card-pink">
        
        {/* BAHAN - BAHAN */}
        <div style={{ marginBottom: '40px' }}>
          <h2 className="detail-section-title">
            📌 Bahan - bahan
          </h2>
          {ingredientsList.length > 0 ? (
            <ul className="detail-list" style={{ listStyleType: 'disc' }}>
              {ingredientsList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
             <p>Data bahan belum diisi.</p>
          )}
        </div>

        {/* CARA MEMBUAT */}
        <div>
          <h2 className="detail-section-title">
            🧁 Cara Membuat
          </h2>
          {stepsList.length > 0 ? (
             <ol className="detail-list" style={{ listStyleType: 'decimal' }}>
                {stepsList.map((step, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>{step}</li>
                ))}
             </ol>
          ) : (
            <p>Data cara membuat belum diisi.</p>
          )}
        </div>
      </div>

      {/* TOMBOL KEMBALI */}
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => router.back()} className="btn-back">
            ⬅ Kembali ke Home
        </button>
      </div>

    </main>
  );
}