const socket = io();

const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("form-title");
const inputDescript = document.getElementById("form-description");
const inputPrice = document.getElementById("form-price");
const inputCode = document.getElementById("form-code");
const inputStock = document.getElementById("form-stock");
const inputCategory = document.getElementById("form-category");

// Handlebars template
const productsTemplate = `
  <section>
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
  <section>
    <form id="form-products" style="margin: auto">
      <div style="margin-bottom: 16px">
        <div>
          <label for="title"> Titulo: </label>
          <br />
          <input type="text" name="title" id="form-title" style="margin-bottom: 16px" class="form-control" />
        </div>
        <div>
          <label for="description"> Descripción: </label>
          <br />
          <input type="text" name="description" id="form-description" style="margin-bottom: 16px"
            class="form-control" />
        </div>
        <div>
          <label for="price"> Precio: </label>
          <br />
          <input type="number" name="price" id="form-price" style="margin-bottom: 16px" step="1" class="input-file" />
        </div>
        <div>
          <label for="code"> Codigo: </label>
          <br />
          <input type="text" name="code" id="form-code" style="margin-bottom: 16px" class="input-file" />
        </div>
        <div>
          <label for="stock"> Stock: </label>
          <br />
          <input type="number" name="stock" id="form-stock" style="margin-bottom: 16px" step="1" />
        </div>
        <div>
          <label for="category"> Categoria: </label>
          <br />
          <input type="text" name="category" id="form-category" style="margin-bottom: 16px" />
        </div>
        <div style="display: flex; justify-content: center; align-items: center">
          <button type="submit">Crear producto</button>
        </div>
      </div>
    </form>
  </section>
`;

// Compile Handlebars template
const template = Handlebars.compile(productsTemplate);

socket.on("msg_back_to_front", (data) => {
  renderEjemplo(data);
});

const renderEjemplo = (ejemplos) => {
  const html = template({ products: ejemplos });
  document.getElementById("ejemplo").innerHTML = html;
};

formProducts.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const description = inputDescript.value;
  const price = inputPrice.value;
  const code = inputCode.value;
  const stock = inputStock.value;
  const category = inputCategory.value;

  try {
    e.preventDefault
    await socket.emit("new-product", title, description, price, code, stock, category );
  } catch (error) {
    console.log(error);
  }
});

// Add event listener to the parent element that wraps the product list
document.getElementById("ejemplo").addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-delete")) {
    const productId = event.target.dataset.id;
    socket.emit("delete-product", productId);
  }
});