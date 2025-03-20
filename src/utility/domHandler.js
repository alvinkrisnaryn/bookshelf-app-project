function createBookElement(book, onDelete) {
  const bookElement = document.createElement("div");
  bookElement.dataset.bookid = book.id;
  bookElement.dataset.testid = "bookItem";

  // Pastikan book.body adalah string sebelum melakukan split
  const bodyText = typeof book.body === "string" ? book.body : "";
  const bodyParts = bodyText.split(", ");

  // Ambil informasi author dan year dengan pengecekan aman
  const authorPart = bodyParts.find((part) => part.startsWith("Author:"));
  const yearPart = bodyParts.find((part) => part.startsWith("Year:"));

  const author = authorPart ? authorPart.replace("Author: ", "") : "Unknown";
  const year = yearPart ? yearPart.replace("Year: ", "") : "Unknown";

  bookElement.innerHTML = `
    <h3 data-testid="bookItemTitle">${book.title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${author}</p>
    <p data-testid="bookItemYear">Tahun: ${year}</p>
    <p>Status: ${book.status}</p>
    <button class="btn btn-delete" data-testid="bookItemDeleteButton">Hapus Buku</button>
  `;

  bookElement.querySelector(".btn-delete").addEventListener("click", () => {
    if (typeof onDelete === "function") {
      onDelete(book.id);
    }
  });

  return bookElement;
}

export { createBookElement };
