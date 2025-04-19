
const BASE_URL = 'https://hanaflow.vercel.app/api';

export async function searchManga(query, source = 'comick', page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${BASE_URL}/manga/search?q=${encodeURIComponent(query)}&source=${source}&page=${page}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search manga');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching manga:', error);
    return { results: [] };
  }
}

export async function getPopularManga(source = 'comick', page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${BASE_URL}/manga/popular?source=${source}&page=${page}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get popular manga');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting popular manga:', error);
    return { results: [] };
  }
}

export async function getLatestManga(source = 'comick', page = 1, limit = 20) {
  try {
    const response = await fetch(
      `${BASE_URL}/manga/latest?source=${source}&page=${page}&limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get latest manga');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting latest manga:', error);
    return { results: [] };
  }
}

export async function getMangaDetails(id, source = 'comick') {
  try {
    const response = await fetch(
      `${BASE_URL}/manga/details?id=${id}&source=${source}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get manga details');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting manga details:', error);
    return null;
  }
}

export async function getMangaPages(id, chapter, source = 'comick') {
  try {
    const response = await fetch(
      `${BASE_URL}/manga/get-pages?id=${id}&chapter=${chapter}&source=${source}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get manga pages');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error getting manga pages:', error);
    return { pages: [] };
  }
}
