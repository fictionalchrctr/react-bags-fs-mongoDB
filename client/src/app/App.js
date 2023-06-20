import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, loadProductsList } from './store/productsSlice'
import NavBar from './components/navBar/navBar'
import { getCategories, loadCategoriesList } from './store/categorySlice'
import LoginPage from './pages/loginPage'
import Footer from './components/footer/footer'
import SignUpPage from './pages/signupPage'
import CartPage from './pages/cartPage'
import PrivatePage from './components/hoc/PrivatePage'
import ShopPage from './pages/shopPage'
import LayoutShop from './layouts/layoutShop'
import ProductPage from './pages/productPage'

function App() {
  const dispatch = useDispatch()
  const categories = useSelector(getCategories())
  const products = useSelector(fetchAllProducts())

  useEffect(() => {
    dispatch(loadProductsList())
    dispatch(loadCategoriesList())
  }, [dispatch])

  return products.length > 0 && categories.length > 0 ? (
    <div className='wrapper relative bg-white shadow-sm rounded-3xl max-w-6xl my-12 py-10 m-auto font-Inter'>
      <NavBar />
      <Routes>
        <Route path='/' element={<LayoutShop />}>
          <Route index element={<ShopPage />} />
          <Route path='product/:productId' element={<ProductPage />} />
        </Route>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/cart'
          element={
            <PrivatePage>
              <CartPage />
            </PrivatePage>
          }
        />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </div>
  ) : (
    <div>Loading</div>
  )
}

export default App
