// lib/themealdb.ts

interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

interface FilterResponse {
  meals: Meal[] | null;
}

/**
 * Mengambil daftar resep berdasarkan kategori "Dessert".
 * @returns Promise yang berisi array Meal atau null jika gagal/tidak ada data.
 */
export async function fetchDessertRecipes(): Promise<Meal[] | null> {
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';

  try {
    const response = await fetch(url, {
      // Opsi untuk caching: memaksa fetch baru setiap kali (opsional)
      // cache: 'no-store',
      // atau menggunakan Next.js revalidate (jika ini server component)
      // next: { revalidate: 3600 } // 1 jam
    });

    if (!response.ok) {
      // Ini akan tertangkap di blok catch
      throw new Error(`Gagal mengambil data: ${response.statusText}`);
    }

    const data: FilterResponse = await response.json();
    return data.meals;

  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil resep dessert:', error);
    return null;
  }
}