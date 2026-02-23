import { useState } from "react";
import { v4 as uuid } from "uuid";
type Product = {
  id:string;
  name:string;
  price:number;
  stock:number;
}
type ProductItemProps = 
Product
&
{addCart:(productId:string)=>void}
function ProductItem({id, name, price, stock, addCart}:ProductItemProps){
  return(
    <div>
      <p>{name}</p>
      <p>{price}</p>
      <p>{stock}</p>
      <div>
        <button onClick={()=>addCart(id)} type="button" disabled={stock <= 0}>追加</button>
      </div>
    </div>
  );
}

const products:Product[] = [
  {id:uuid(), name:"sample1", price:1000, stock:10},
  {id:uuid(), name:"sample2", price:2000, stock:3},
  {id:uuid(), name:"sample3", price:400, stock:13},
];
export default function ProductApp(){
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  function addCart(productId:string){
    const newProducts = currentProducts.map(product => {
      if(product.id === productId){
        if(product.stock <= 0){
          return product;
        }
        setTotalPrice(totalPrice + product.price);
        return {...product, stock:product.stock - 1};
      }
      return product;
    });
    setCurrentProducts(newProducts);
  }
  return(
    <>
      <p>合計金額: {totalPrice}円</p>
      {currentProducts.map(product => <ProductItem key={product.id} id={product.id} name={product.name} price={product.price} stock={product.stock} addCart={addCart}/>)}
    </>
  );
}