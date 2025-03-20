const BASE_URL = "https://notes-api.dicoding.dev/v2";

async function getBooks() {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

async function addBook(title, author, year, isComplete) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, year, isComplete }),
  });
  const result = await response.json();
  return result;
}

async function deleteBook(bookId) {
  await fetch(`${BASE_URL}/notes/${bookId}`, { method: "DELETE" });
}

export { getBooks, addBook, deleteBook };

const loadingIndicator = document.getElementById("loadingIndicator");

async function getBooks() {
  try {
    loadingIndicator.style.display = "block";  // Tampilkan loading
    const response = await fetch(`${BASE_URL}/notes`);
    const result = await response.json();
    return result.data.map(book => ({
      id: book.id,
      title: book.title,
      author: "Unknown", // API tidak menyimpan author
      year: new Date(book.createdAt).getFullYear(),
      isComplete: false, // API tidak memiliki isComplete
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  } finally {
    loadingIndicator.style.display = "none";  // Sembunyikan loading
  }
}
