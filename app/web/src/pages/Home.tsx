import Header from "../components/Header"
import ProductsTable from "../components/product/ProductsTable"

function Home() {
  return (
    <div className="main !h-full">
      <Header />
      <ProductsTable />
    </div>
  )
}

export default Home