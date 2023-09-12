import { BACKEND_URL } from "../../constants";
import { Modal } from "../reusable/Modal";
import { useState } from 'react';

interface AddNewProductProps {
      refetch : () => void
}

export default function AddNewProduct({refetch} : AddNewProductProps) {
 const [visible, setVisible] = useState(false);
 const [loading, setLoading] = useState(false)
 const handleShowModal = () => {
      setVisible(true)
 }

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
        const req = await fetch(`${BACKEND_URL}/products`,{
            method : "POST",
            headers : {
                  "Content-Type" : "application/json"
            },
            body : JSON.stringify({...data, price : +data?.price})
            });
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
    <div className='my-4'>
      <button className='bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full shadow' onClick={handleShowModal}>
            Add New Product
      </button>
      <Modal
      onClose={() => setVisible(false)}
      visible={visible}
      disableBackDrop={loading}
      >
         <div className="form-wrapper py-4 px-8">
            <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                  <label>Name</label>
                  <br />
                  <input name="name" placeholder="Laptop" className="border border-gray-300 rounded-md py-2 px-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               <div>
                  <label>Price</label>
                  <br />
                  <input name="price" type="number" className="border border-gray-300 rounded-md py-2 px-1 focus:outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               <div className="col-span-4">
                  <label className="">Description</label>
                  <br />
                  <textarea 
                  name="description"
                  className="resize border rounded-md p-2 text-gray-800"
                  rows={6}
                  cols={54}
                  placeholder="Enter product description"
                  />
               </div>
               <div>
                  <button disabled={loading} role="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md border border-purple-600">{loading ? "Loading..." : "Save"}</button>
               </div>
             </div>
            </form>
         </div>
      </Modal>
    </div>
  )
}
