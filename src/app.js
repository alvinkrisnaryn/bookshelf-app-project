import { getBooks, addBook, deleteBook } from "./utils/api.js";
import { createBookElement } from "./utils/domHandler.js";

const bookForm = document.getElementById("bookForm");
const searchForm = document.getElementById("searchBook");
const incompleteBookList = document.getElementById("incompleteBookList");
const completeBookList = document.getElementById("completeBookList");

async function renderBooks() {
  const books = await getBooks();
  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  books.forEach((book) => {
    // Pisahkan title menjadi [judul, status] jika ada status
    const [title, status] = book.title.includes(" | status: ")
      ? book.title.split(" | status: ")
      : [book.title, "incomplete"]; // Default "incomplete" jika tidak ada status

    const bookData = {
      id: book.id,
      title: title,
      body: book.body, // API menyimpan author & year di dalam body
      status: status,
    };

    const bookElement = createBookElement(bookData, deleteBookHandler);

    if (status === "complete") {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
}

async function deleteBookHandler(bookId) {
  await deleteBook(bookId);
  renderBooks();
}

bookForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("bookFormTitle").value;
  const author = document.getElementById("bookFormAuthor").value;
  const year = document.getElementById("bookFormYear").value;
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  await addBook(title, author, year, isComplete);
  bookForm.reset();
  renderBooks();
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.getElementById("searchBookTitle").value.toLowerCase();
  renderBooks(query);
});

document.addEventListener("DOMContentLoaded", renderBooks);
