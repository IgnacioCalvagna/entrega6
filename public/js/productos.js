const productSocket = io.connect();
const productButton = document.getElementById("buttonProduct");

productButton?.addEventListener("click", () => {
  const product = {
    nameProduct: document.getElementById("nameProduct").value,
    priceProduct: document.getElementById("priceProduct").value,
    imageProduct: document.getElementById("imageProduct").value,
  };

  if (!product.nameProduct || !product.priceProduct || !product.imageProduct) {
    alert("Recuerde ingresar todos los campos para la creacion del producto");
  } else {
    // console.log(message);
    //Guardar en doc
    productSocket.emit("new-product", product);
  }
});

productSocket.on("new-product-table", (products) => {
  const html = products.map((product) => {
    let contentProduct = `<tr>
        <td>${product.nameProduct}</td>
        <td>${product.priceProduct}</td>
        <td>
          <img
          
            src="${product.imageProduct} width="150px"
            title=""
          ></img></td>
      </tr>`;
    return contentProduct;
  });
  document.getElementById("table-data").innerHTML = html;
});