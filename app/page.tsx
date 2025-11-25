"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface LocalRecipe {
  id: number;
  title: string;
  shortDesc: string;
  desc: string;
  ingredients: string;
  image?: string;
}

interface ApiMeal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

const defaultRecipes: LocalRecipe[] = [
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
  const [localRecipes, setLocalRecipes] = useState<LocalRecipe[]>([]);
  const [apiRecipes, setApiRecipes] = useState<ApiMeal[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [newTitle, setNewTitle] = useState("");
  const [newShortDesc, setNewShortDesc] = useState("");
  const [newIngredients, setNewIngredients] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchApiRecipes = useCallback(async (query: string) => {
    if (query.trim() === "") {
      setApiRecipes(null);
      return;
    }

    setIsLoading(true);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Gagal mengambil data dari TheMealDB");
      }
      const data: { meals: ApiMeal[] | null } = await response.json();
      
      setApiRecipes(data.meals || []); 
    } catch (error) {
      console.error("Error saat mencari resep API:", error);
      setApiRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedRecipes = localStorage.getItem("my-recipes");
    
    if (savedRecipes) {
      const parsed = JSON.parse(savedRecipes);
      if (parsed.length > 0 && !parsed[0].ingredients) {
         setLocalRecipes(defaultRecipes);
         localStorage.setItem("my-recipes", JSON.stringify(defaultRecipes));
      } else {
         setLocalRecipes(parsed);
      }
    } else {
      setLocalRecipes(defaultRecipes);
      localStorage.setItem("my-recipes", JSON.stringify(defaultRecipes));
    }
  }, []);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchApiRecipes(searchQuery);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, fetchApiRecipes]);

  const handleAddRecipe = () => {
    if (!newTitle || !newShortDesc || !newDesc || !newIngredients) {
      alert("Mohon isi semua field ya 💗");
      return;
    }

    const newRecipe: LocalRecipe = {
      id: Date.now(),
      title: newTitle,
      shortDesc: newShortDesc,
      ingredients: newIngredients,
      desc: newDesc,
      image: newImage || "/icecreamberry.png",
    };

    const updatedRecipes = [...localRecipes, newRecipe];
    setLocalRecipes(updatedRecipes);
    localStorage.setItem("my-recipes", JSON.stringify(updatedRecipes));

    setNewTitle("");
    setNewShortDesc("");
    setNewIngredients("");
    setNewDesc("");
    setNewImage(null);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    const updatedRecipes = localRecipes.filter((recipe) => recipe.id !== id);
    setLocalRecipes(updatedRecipes);
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
            + Tambah Resep Lokal
          </button>
        </div>
        
        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Cari Resep dari TheMealDB API (misal: 'Cake' atau 'Brownie')"
            className="input w-full p-3 border-pink-400 border-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {showForm && (
          <div className="card mb-10 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Tambah Resep Lokal Baru 💗</h2>
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
        
        {searchQuery.trim() !== "" && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
              {isLoading ? "🔎 Mencari..." : `Hasil Pencarian API untuk "${searchQuery}"`}
            </h2>
            
            {isLoading && <p>Loading resep dari TheMealDB...</p>}
            
            {!isLoading && apiRecipes && apiRecipes.length === 0 && (
              <p className="text-gray-600">Tidak ditemukan resep dari API yang cocok dengan "{searchQuery}".</p>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {apiRecipes && apiRecipes.map((meal) => (
                <div className="card border-pink-500 border-4 shadow-pink-200 shadow-lg" key={meal.idMeal}>
                  <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-2xl mb-3 shadow-md" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  <h2 className="text-xl font-semibold mb-2">{meal.strMeal} (API)</h2>
                  <p className="text-sm mb-4 line-clamp-2">ID Meal: {meal.idMeal}</p>
                  <button 
                    className="button w-full bg-pink-700 hover:bg-pink-800"
                    onClick={() => alert(`Anda bisa membuat halaman detail untuk ID API: ${meal.idMeal}`)}
                  >
                    Lihat Detail API
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <hr className="my-10 border-t-2 border-pink-300" />
        
        <h2 className="text-2xl font-bold mb-4">Resep Lokal Anda (Total: {localRecipes.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {localRecipes.map((recipe) => (
            <div className="card" key={recipe.id}>
              {recipe.image && (
                <img src={recipe.image} alt={recipe.title} className="rounded-2xl mb-3 shadow-md" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              )}
              <h2 className="text-xl font-semibold mb-2">{recipe.title} (Lokal)</h2>
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