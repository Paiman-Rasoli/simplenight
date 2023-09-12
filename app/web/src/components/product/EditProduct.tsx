import { BACKEND_SERVICE, BACKEND_URL } from "../../constants";
import { useState, useEffect } from 'react';
import { Modal } from "../reusable/Modal";
import { Product } from "./types";

interface EditProductProps {
   refetch: () => void;
   product : Product | undefined
   visible: boolean
   setVisible : (arg : boolean) => void
}

export default function EditProduct({ refetch, product, visible, setVisible } : EditProductProps ) {

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({name : "", description : "", price : 0})

    useEffect(() => {
      if(product){
         setForm({...product})
      }
    }, [product])

    const handleFormSubmit = async(e : any) => {
            // we can use state for saving form data or Formik lib. but for now I choose this.
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries()) as Record<string,any>
            // a simple form validation
      for(const key in data){
         if(!data[key]){
            alert(`${key} is required`)
            return;
          }
       }
      setLoading(true);
      try{
         let req;
         if(BACKEND_SERVICE === "YII"){
            req = await fetch(`${BACKEND_URL}/products/${product?.id}`,{
               method : "PUT",
               headers : {
                       "Content-Type" : "application/json"
                 },
                body : JSON.stringify({...data, price : +data?.price})
             });
         }else{
             req = await fetch(`${BACKEND_URL}/products`,{
                   method : "PUT",
                   headers : {
                       "Content-Type" : "application/json"
                    },
                     body : JSON.stringify({...data, price : +data?.price, id : product?.id})
                 });
         }
           
            const res = await req.json();

            if(res?.id){
                  refetch()
                  setLoading(false);
                  setVisible(false);   
            }else if(req?.status === 400){
                  setLoading(false)
                  alert(res?.message[0]);
            }else {
                  setLoading(false)
                  alert("Server error occurred");
             }
              }catch(err){
                setLoading(false)
                alert("Server error occurred");
       }
 }
      
  return (
      <Modal
      onClose={() => setVisible(false)}
      visible={visible}
      disableBackDrop={true}
      >
         <div className="form-wrapper py-4 px-8">
            <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                  <label>Name</label>
                  <br />
                  <input name="name" defaultValue={form.name} placeholder="Laptop" className="border border-gray-300 rounded-md py-2 px-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               <div>
                  <label>Price</label>
                  <br />
                  <input defaultValue={form.price} name="price" type="number" className="border border-gray-300 rounded-md py-2 px-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               <div className="col-span-4">
                  <label className="">Description</label>
                  <br />
                  <textarea 
                  name="description"
                  defaultValue={form.description}
                  className="resize border rounded-md p-2 text-gray-800"
                  rows={6}
                  cols={54}
                  placeholder="Enter product description"
                  />
               </div>
               <div>
                  <button
                    disabled={loading}
                    role="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md border border-purple-600">
                    {loading ? "Updating..." : "Update"}
                   </button>
               </div>
             </div>
            </form>
         </div>
      </Modal>
  )
}
