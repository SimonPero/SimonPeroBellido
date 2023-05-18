const socket = io()

const formProducts = document.getElementById("form-products")
const inputTitle = document.getElementById("form-title")
const inputDescript = document.getElementById("form-description")
const inputPrice = document.getElementById("form-price")
const inputCode = document.getElementById("form-code")
const inputStock = document.getElementById("form-stock")
const inputCategory = document.getElementById("form-category")

// Handlebars template
const productsTemplate = `
  <section id="ejemplo">
    <ul>
      {{#each products}}
      <li>
        <h3>{{this.title}}</h3>
        <p>ID: {{this.id}}</p>
        <p>{{this.description}}</p>
        <p>Precio: {{this.price}}</p>
        <p>Código: {{this.code}}</p>
        <p>Stock: {{this.stock}}</p>
        <p>Categoría: {{this.category}}</p>
        <button class="btn-delete" data-id="{{this.id}}">Eliminar</button>
      </li>
      {{/each}}
    </ul>
  </section>
`

// Compile Handlebars template
const template = Handlebars.compile(productsTemplate)

socket.on("msg_back_to_front", (data) => {
  renderEjemplo(data)
  
})

const renderEjemplo = (ejemplos) => {
  const html = template({ products: ejemplos })
  document.getElementById("ejemplo").innerHTML = html
}

formProducts.addEventListener("click",  (e) => {
  e.preventDefault()
  const title = inputTitle.value
  const description = inputDescript.value
  const price = inputPrice.value
  const code = inputCode.value
  const stock = inputStock.value
  const category = inputCategory.value
  socket.emit("new-product", title, description, price, code, stock, category)
  document.getElementById("form-products").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que se envíe el formulario
    document.getElementById("form-title").value = "";
    document.getElementById("form-description").value = "";
    document.getElementById("form-price").value = "";
    document.getElementById("form-code").value = "";
    document.getElementById("form-stock").value = "";
    document.getElementById("form-category").value = "";
  });
  
})

// Add event listener to the parent element that wraps the product list
document.getElementById("ejemplo").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-delete")) {
    const productId = event.target.dataset.id
    socket.emit("delete-product", productId)
  }
})