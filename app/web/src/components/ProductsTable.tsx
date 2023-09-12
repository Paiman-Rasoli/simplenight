import { BACKEND_URL } from "../constants"
import useFetch from "../hooks/use-fetch"

interface ProductResponse {
  id: number;
  name : string;
  description: string;
  price: number
}

function ProductsTable() {
 const {data , isLoading , error} = useFetch<ProductResponse[]>(`${BACKEND_URL}/products`)

return (
    <div>ProductsTable</div>
  )
}

export default ProductsTable