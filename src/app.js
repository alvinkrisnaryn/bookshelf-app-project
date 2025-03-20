
async function fetchBooks() {
  try {
      const response = await fetch("http://localhost:8080/api/books");
      if (!response.ok) throw new Error(`Failed to fetch books! Status: ${response.status}`);

      const data = await response.json();
      const books = Array.isArray(data) ? data : [];

      const bookList = document.getElementById("bookList");
      bookList.innerHTML = "";

      books.forEach(book => {
          const bookItem = document.createElement("div");
          bookItem.innerHTML = `<p>${book.title} - ${book.author}</p>`;
          bookList.appendChild(bookItem);
      });
  } catch (error) {
      console.error("Error fetching books:", error);
  }
}

async function addBook(event) {
  event.preventDefault(); 

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = parseInt(document.getElementById("year").value);
  const isComplete = document.getElementById("isComplete").checked;

  const bookData = { title, author, year, isComplete };

  try {
      const response = await fetch("http://localhost:8080/api/books", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(bookData)
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to add book! Status: ${response.status}, Message: ${errorText}`);
      }

      const result = await response.json();
      console.log("Buku berhasil ditambahkan:", result);
      fetchBooks();
  } catch (error) {
      console.error("Gagal menambahkan buku:", error);
  }
}

// Memanggil fungsi untuk pertama kali
fetchBooks();
