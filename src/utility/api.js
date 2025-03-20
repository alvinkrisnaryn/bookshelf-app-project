const BASE_URL = "https://notes-api.dicoding.dev/v2";

async function getBooks() {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return { error: error.message };
  }
}

async function addBook(title) {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to add book! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to add book:", error);
    return { error: error.message };
  }
}

async function deleteBook(id) {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete book! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to delete book:", error);
    return { error: error.message };
  }
}

export { getBooks, addBook, deleteBook };