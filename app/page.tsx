"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Recipe {
  id: number;
  title: string;
  shortDesc: string;
  desc: string;
  ingredients: string;
  image?: string;
}

// DATA DEFAULT YANG SUDAH DIPERBAIKI (Format List)
const defaultRecipes: Recipe[] = [
  {
    id: 1,
    title: "🍰 Bolu Strawberry",
    shortDesc: "Bolu lembut beraroma strawberry dengan tekstur moist dan rasa manis yang pas. Cocok untuk camilan sore ditemani teh hangat",
    ingredients: "200 gr tepung terigu\n150 gr gula pasir\n4 butir telur\n100 ml minyak goreng\n4 sdm sirup / pasta strawberry\n1 sdt baking powder",
    desc: "1. Kocok telur & gula hingga mengembang.\n2. Masukkan tepung & baking powder, aduk perlahan.\n3. Tambahkan minyak & pasta strawberry.\n4. Tuang ke loyang, panggang 30–40 menit suhu 170°C.\n5. Angkat, dinginkan, potong dan sajikan 💗",
    image: "/bolustrawberry.png",
  },
  {
    id: 2,
    title: "🍡 Mochi Pink",
    shortDesc: "Mochi kenyal isi kacang merah favorit semua orang",
    ingredients: "200 gr tepung ketan\n100 ml susu cair\n50 gr gula pasir\nPewarna makanan pink\nIsian kacang merah",
    desc: "1. Campur tepung ketan, gula, dan santan.\n2. Kukus adonan selama 20 menit.\n3. Beri pewarna pink.\n4. Isi dengan pasta kacang merah dan bulatkan.",
    image: "/mochipink.png",
  },
  {
    id: 3,
    title: "🍨 Ice Cream Berry",
    shortDesc: "Ice cream homemade creamy rasa berry segar",
    ingredients: "200 ml whipping cream\n100 ml susu kental manis\n100 gr buah berry (strawberry/blueberry)\n1 sdt lemon juice",
    desc: "1. Haluskan buah berry segar.\n2. Campur dengan whipped cream cair.\n3. Mixer hingga kaku.\n4. Bekukan di freezer semalaman.",
    image: "/icecreamberry.png",
  },
];

export default function Home() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  
  // State Form
  const [newTitle, setNewTitle] = useState("");
  const [newShortDesc, setNewShortDesc] = useState("");
  const [newIngredients, setNewIngredients] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Cek LocalStorage
    const savedRecipes = localStorage.getItem("my-recipes");
    
    // LOGIKA UPDATE: Jika data di browser kosong ATAU data lama tidak punya 'ingredients', kita timpa dengan data baru
    if (savedRecipes) {
      const parsed = JSON.parse(savedRecipes);
      // Cek apakah data lama punya ingredients? Kalau tidak, kita reset pakai default baru.
      if (parsed.length > 0 && !parsed[0].ingredients) {
         setRecipes(defaultRecipes);
         localStorage.setItem("my-recipes", JSON.stringify(defaultRecipes));
      } else {
         setRecipes(parsed);
      }
    } else {
      setRecipes(defaultRecipes);
      localStorage.setItem("my-recipes", JSON.stringify(defaultRecipes));
    }
  }, []);

  const handleAddRecipe = () => {
    if (!newTitle || !newShortDesc || !newDesc || !newIngredients) {
      alert("Mohon isi semua field ya 💗");
      return;
    }

    const newRecipe: Recipe = {
      id: Date.now(),
      title: newTitle,
      shortDesc: newShortDesc,
      ingredients: newIngredients,
      desc: newDesc,
      image: newImage || "/icecreamberry.png",
    };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem("my-recipes", JSON.stringify(updatedRecipes));

    setNewTitle("");
    setNewShortDesc("");
    setNewIngredients("");
    setNewDesc("");
    setNewImage(null);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem("my-recipes", JSON.stringify(updatedRecipes));
  };

  const handleNavigate = (id: number) => {
    router.push(`/recipes/${id}`);
  };

  return (
    <main>
      <header style={{ backgroundColor: "#FFD6E7" }} className="py-20 w-full text-center">
        <h1 className="text-4xl font-extrabold text-black mb-3">Resep Makanan Manis 💗</h1>
        <p className="text-2xl font-bold text-black">Vivian Carolina - 535240060</p>
      </header>

      <section className="container mt-10 px-4 mx-auto pb-20">
        <div className="text-center mb-10">
          <button className="button" onClick={() => setShowForm(!showForm)}>
            + Tambah Resep
          </button>
        </div>

        {showForm && (
          <div className="card mb-10 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Tambah Resep Baru 💗</h2>
            
            <input type="text" placeholder="Nama Resep" className="input mb-4" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            
            <div className="mb-4">
               <p className="text-sm mb-1 text-gray-500">Upload Foto Makanan:</p>
               <input type="file" accept="image/*" className="input" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setNewImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
              }} />
            </div>

            <input type="text" placeholder="Deskripsi Singkat" className="input mb-4" value={newShortDesc} onChange={(e) => setNewShortDesc(e.target.value)} />
            <textarea placeholder="Bahan-bahan (Tekan Enter untuk baris baru)" className="input h-28 mb-4" value={newIngredients} onChange={(e) => setNewIngredients(e.target.value)} />
            <textarea placeholder="Cara Membuat (1. blabla [Enter] 2. blabla)" className="input h-28 mb-4" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
            
            <button className="button w-full" onClick={handleAddRecipe}>Simpan Resep</button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div className="card" key={recipe.id}>
              {recipe.image && (
                <img src={recipe.image} alt={recipe.title} className="rounded-2xl mb-3 shadow-md" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              )}
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-sm mb-4 line-clamp-2">{recipe.shortDesc}</p>
              <div className="flex gap-3 mt-auto">
                <button className="button flex-1" onClick={() => handleNavigate(recipe.id)}>Lihat Resep</button>
                <button className="button flex-1" style={{ backgroundColor: "#ff6b81" }} onClick={() => handleDelete(recipe.id)}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}