function addNewExpense(e){
  e.preventDefault();

  const sellingPrice = document.querySelector('input[name="expense"]').value;
  const productName = document.querySelector('input[name="description"]').value;
  const category = document.getElementById('category').value;

   axios.post('https://crudcrud.com/api/6832ee8f80f1498fa253ab6185cbd6a4/expenseTracker',{sellingPrice,productName,category})
   .then((res) => {
     document.getElementById('message').innerText='Product Added Succesfully!';
     fetchData();
   }).catch((err) => {
      console.error(err);
      document.getElementById('message').innerText='Error Adding Product';
   });
   document.getElementById('message').innerText='Product Added ...';
   sellingPrice.value='';
   productName.value='';
}

function fetchData(){
    axios.get('https://crudcrud.com/api/6832ee8f80f1498fa253ab6185cbd6a4/expenseTracker')
    .then(res=>{
        const products= res.data;

        document.getElementById('electronics').innerHTML='';
        document.getElementById('food').innerHTML='';
        document.getElementById('skincare').innerHTML='';

        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent=`Name:${product.productName}, 
            Price:${product.sellingPrice}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click',()=>deleteProduct(product._id));

            listItem.appendChild(deleteButton);
           
         
            const categoryListId = product.category.toLowerCase();
            const categoryList = document.getElementById(categoryListId);
            if (categoryList !== null) {
                categoryList.appendChild(listItem);
            } else {
                console.error(`Element with ID "${categoryListId}" not found.`);
            }
        });
    }).catch(err=>{
        console.error('Error fetching Products',err);
    })
}

fetchData();


function deleteProduct(_id){
    axios.delete(`https://crudcrud.com/api/6832ee8f80f1498fa253ab6185cbd6a4/expenseTracker/${_id}`)
    .then(res=>{
        console.log('Product deleted Successfuly!');
        fetchData();
    })
    .catch(err=>{
        console.error('Error deleting Product!',err);
    })
}