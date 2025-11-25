import { fetchDessertRecipes } from '@/lib/themealdb';

export default async function RecipesPage() {
  const dessertRecipes = await fetchDessertRecipes();

  if (!dessertRecipes) {
    return (
      <main>
        <h1>Daftar Resep</h1>
        <p>Gagal memuat resep atau tidak ada resep ditemukan.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>🍰 Resep Dessert TheMealDB</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {dessertRecipes.map((recipe) => (
          <li key={recipe.idMeal} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{recipe.strMeal}</h2>
            <p>ID: {recipe.idMeal}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}