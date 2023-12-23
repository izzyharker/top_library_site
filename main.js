const library = []
let number_of_books = 0

const libraryDisplay = document.querySelector(".library-display")

const submitFormButton = document.getElementById("submit-form")
const form = document.getElementById("form")

submitFormButton.addEventListener("click", submitForm, false)

function submitForm(event) {
    console.log("Submitted form")

    // prevent default behavior
    event.preventDefault()

    // get form data
    const formData = new FormData(form, submitFormButton)

    // get vals from the form
    let vals = []
    for (const [key, value] of formData) {
        console.log(`${key}: ${value}`)
        vals.push(value)
    }

    // add book to library
    addBookToLibrary(vals[0], vals[1], Number(vals[2]), false)

    // reset form
    form.reset()
}

function Book(title, author, number_of_pages = 0, has_been_read = false) {
    this.title = title
    this.author = author
    this.number_of_pages = number_of_pages
    this.has_been_read = has_been_read
    this.index = number_of_books

    this.info = function() {
        return `
        Title: ${this.title}
        Author: ${this.author}
        Pages: ${this.number_of_pages}
        Has been read: ${this.has_been_read}
        index in list: ${this.index}`
    }

    this.displayHTML = function() {
        let returnString = `<h1>${this.title}</h1><h2>${this.author}</h2><p>${this.number_of_pages} pages, has been read? ${this.has_been_read}</p><button onclick=\"removeBookFromLibrary(\'${this.title}\')\">Remove Book</button><input type="checkbox" id=\"toggle-${this.title}-${this.author}\" onclick=\"toggleBookRead(\'${this.title}\')\">`
        
        return returnString
    }
}

function toggleBookRead(book_title) {
    // find book by title
    let i = 0
    for (i = 0; i < number_of_books; i++) {
        if (library[i].title == book_title) break
    }

    // identify book
    let book = library[i]

    const checkbox = document.getElementById(`toggle-${book.title}-${book.author}`)
    
    book.has_been_read = checkbox.checked

    updateLibraryDisplay()
}

function updateLibraryDisplay() {
    // updates the library display
    // first clear library display
    libraryDisplay.innerHTML = ""

    // then reset it for each book
    for (let i = 0; i < number_of_books; i++) {
        let card = document.createElement("div")
        card.innerHTML = library[i].displayHTML()
        libraryDisplay.appendChild(card)

        document.getElementById(`toggle-${library[i].title}-${library[i].author}`).checked = library[i].has_been_read
    }
}

function addBookToLibrary(title, author, num_pages, has_been_read) {
    // create a new book
    let book = new Book(title, author, num_pages, has_been_read)

    // incremenet number of books
    number_of_books++

    // append to list of books
    library.push(book)

    // update display to include new book
    updateLibraryDisplay()
}

function removeBookFromLibrary(book_title) {
    // find book by title
    let i = 0
    for (i = 0; i < number_of_books; i++) {
        if (library[i].title == book_title) break
    }

    // identify book
    let book = library[i]

    // remove book from list
    let current_index = book.index
    library.splice(current_index, 1)
    
    // update the indices of other books
    library.map((value) => {
        if (value.index > current_index) {
            value.index--
        }
    })

    // decrement number of books
    number_of_books--

    // update library display
    updateLibraryDisplay()
}

// add some books just to start
addBookToLibrary("Pride and Prejudice", "Jane Austen", 400, false)
addBookToLibrary("Throne of Glass", "Sarah J. Maas", 450, true)
addBookToLibrary("Hello world", "Me", 1, true)
