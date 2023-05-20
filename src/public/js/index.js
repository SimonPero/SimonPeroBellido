const socket = io()

const formProducts = document.getElementById("form-products")
const submitButton = document.getElementById("submit-button")
const inputTitle = document.getElementById("form-title")
const inputDescript = document.getElementById("form-description")
const inputPrice = document.getElementById("form-price")
const inputCode = document.getElementById("form-code")
const inputStock = document.getElementById("form-stock")
const inputCategory = document.getElementById("form-category")

function deleteProduct(id) {
  socket.emit("delete-product", id)
}
// Handlebars template
const productsTemplate = `
      {{#each products}}
      <li id="{{this.id}}">
        <h3>{{this.title}}</h3>
        <p>ID: {{this.id}}</p>
        <p>{{this.description}}</p>
        <p>Precio: {{this.price}}</p>
        <p>Código: {{this.code}}</p>
        <p>Stock: {{this.stock}}</p>
        <p>Categoría: {{this.category}}</p>
        <button class="btn-delete"  onclick="deleteProduct('{{this.id}}')">Eliminar</button>
      </li>
      {{/each}}
`
// Compile Handlebars template
const template = Handlebars.compile(productsTemplate)
socket.on("msg_back_to_front", (data) => {
  renderEjemplo(data)
  
})

socket.on("product_deleted", (id) => {
  const li = document.getElementById(id)
  li.remove()
})

const renderEjemplo = (ejemplos) => {
  const html = template({ products: ejemplos })
  document.getElementById("ejemplo").innerHTML = html
}

submitButton.addEventListener("click",  (e) => {
  e.preventDefault()
  const title = inputTitle.value
  const description = inputDescript.value
  const price = inputPrice.value
  const code = inputCode.value
  const stock = inputStock.value
  const category = inputCategory.value
  socket.emit("new-product", title, description, price, code, stock, category)
  formProducts.reset()
})


// Add event listener to the parent element that wraps the product list
// document.getElementById("ejemplo").addEventListener("click", (event) => {
//   if (event.target.classList.contains("btn-delete")) {
//     const productId = event.target.dataset.id
//     socket.emit("delete-product", productId)
//   }
// })