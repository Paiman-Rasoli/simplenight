import { BACKEND_URL } from "../../constants"
import useFetch from "../../hooks/use-fetch"
import TimeAgo from 'react-timeago'
import AddNewProduct from "./AddNewProduct";
import { Loader } from "../reusable/Loader";
import EditProduct from "./EditProduct";
import { Product } from "./types";
import { useState, useMemo } from 'react';

function ProductsTable() {
 const { data, isLoading, error, doRefetch} = useFetch<Product[]>(`${BACKEND_URL}/products`);
 const [selectedProduct , setSelectedProduct] = useState<Product | undefined>(undefined)
 const [showEdit, setShowEdit] = useState<boolean>(false);

 const handleDelete = (id : number) => {
    fetch(`${BACKEND_URL}/products/${id}`, {method : "DELETE"}).then(async (res) => {
      const result = await res.json();
      if(result?.deleted){
        doRefetch();
        alert("Product deleted successfully.")
      } else{
        alert("Error while deleting.")
      }
    }).catch(() => alert("Server Error happened"))
 }

 const handleEdit = (id : number) => {
  const find = data?.find((product) => product?.id === id);
  setSelectedProduct(find);
  setShowEdit(true)
 }

 const EditModal = useMemo(
  () => <EditProduct
   product={selectedProduct}
   refetch={doRefetch}
   visible={showEdit}
  setVisible={(arg) => setShowEdit(arg)}/>,

  [doRefetch, selectedProduct, showEdit])
 
 if(isLoading) {
  return (
    <div className="h-screen">
        <Loader />
    </div>
  )
 }

 if(error){
  return(
    <div className="flex items-center justify-center mt-24">
        <p className="text-lg">Failed to fetch 😢</p>
   </div>
  )
 }

return (
  <div className="container max-w-6xl mx-auto sm:mx-10">
    <div className="flex flex-col items-start justify-center mt-10">
        <AddNewProduct refetch={doRefetch} />
        {EditModal}
   <div className="overflow-x-auto">
   <table className="border-collapse">
         <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Produced</th>
              <th className="py-2 px-6 border-b">Actions</th>
            </tr>
         </thead>
         <tbody>
            {data?.map((product) => (
              <tr key={product.id} className="bg-white" id={`product-row-${product.id}`}>
                  <td className="py-2 px-4 border-b">{product.id}</td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">
                    <strong>${product.price}</strong>
                  </td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b"><TimeAgo date={product.createdAt ?? new Date()} /></td>
                  <td className="py-2 px-4 border-b">
                    <div className="px-4">
                       <button 
                       className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" 
                       onClick={() => handleDelete(product.id)}
                       >
                        Delete
                       </button>
                       <button 
                       className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                       onClick={() => handleEdit(product.id)}
                       >
                        Edit
                      </button>
                    </div>
                  </td>
              </tr>
            ))}
         </tbody>
      </table>
      </div>
    </div>
  </div>
  )
}

export default ProductsTable