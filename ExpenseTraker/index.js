async function addNewExpense(e) {
  e.preventDefault();

  const sellingPrice = document.querySelector('input[name="expense"]').value;
  const productName = document.querySelector('input[name="description"]').value;
  const category = document.getElementById("category").value;

  try {
    await axios.post(
      "https://crudcrud.com/api/c58f9b1dee844258a8a6a7c3f815f40d/expenseTracker",
      { sellingPrice, productName, category }
    );
    document.getElementById("message").innerText = "Product Added Succesfully!";
    console.log("Product Added Succesfully!");
    fetchData();
  } catch (err) {
    console.error(err);

    if (err.response) {
      if (err.response.status === 404) {
          console.log("Error: Product not found (404)");
      } else if (err.response.status === 500) {
          console.log("Error: Internal Server Error (500)");
      } else {
         console.log("Error Adding Product (Status Code: " + err.response.status + ")");
      }
    } else {
      console.error("Error Adding Product!", err.message);
      document.getElementById("message").innerText =
        "Error Adding Product: " + err.message;
    }
  }
  sellingPrice.value = "";
  productName.value = "";
}

async function fetchData() {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/c58f9b1dee844258a8a6a7c3f815f40d/expenseTracker"
    );
    const products = response.data;

    document.getElementById("electronics").innerText = "";
    document.getElementById("food").innerText = "";
    document.getElementById("skincare").innerText = "";

    products.forEach((product) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Name:${product.productName}, 
            Price:${product.sellingPrice}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteProduct(product._id));

      listItem.appendChild(deleteButton);

      const categoryListId = product.category.toLowerCase();
      const categoryList = document.getElementById(categoryListId);
      if (categoryList !== null) {
        categoryList.appendChild(listItem);
      } else {
        console.error(`Element with ID "${categoryListId}" not found.`);
      }
    });
  } catch (err) {
    console.error("Error fetching Products", err);
  }
}

fetchData();

async function deleteProduct(_id) {
  try {
    await axios.delete(
      `https://crudcrud.com/api/c58f9b1dee844258a8a6a7c3f815f40d/expenseTracker/${_id}`
    );
    console.log("Product deleted Successfuly!");
    fetchData();
  } catch (err) {
    console.error("Error deleting Product!", err);
  }
}
