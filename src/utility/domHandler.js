function createBookElement(book, onDelete) {
  const bookElement = document.createElement("div");
  bookElement.dataset.bookid = book.id;
  bookElement.dataset.testid = "bookItem";

  // Ambil informasi author dan year dari body (format "Author: Nama, Year: 2024")
  const bodyParts = book.body.split(", ");
  const author = bodyParts.find((part) => part.startsWith("Author:"))
    ? bodyParts
        .find((part) => part.startsWith("Author:"))
        .replace("Author: ", "")
    : "Unknown";
  const year = bodyParts.find((part) => part.startsWith("Year:"))
    ? bodyParts.find((part) => part.startsWith("Year:")).replace("Year: ", "")
    : "Unknown";

  bookElement.innerHTML = `
    <h3 data-testid="bookItemTitle">${book.title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${author}</p>
    <p data-testid="bookItemYear">Tahun: ${year}</p>
    <p>Status: ${book.status}</p>
    <button class="btn btn-delete" data-testid="bookItemDeleteButton">Hapus Buku</button>
  `;

  bookElement
    .querySelector("[data-testid='bookItemDeleteButton']")
    .addEventListener("click", () => onDelete(book.id));

  return bookElement;
}
