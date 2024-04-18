 import React ,{useState,useEffect}from 'react'
 import {Row,Col} from 'react-bootstrap'
 import Product from '../components/Product'
 import axios from 'axios'
 import {useDispatch, useSelector} from 'react-redux'
 import { listProducts } from '../actions/productActions'
 import Loader from '../components/Loader'
 import Message from '../components/Message'
 import Paginate from '../components/Paginate'
 import ProductCarousel from '../components/ProductCarousel'
 import { useNavigate ,useLocation} from 'react-router-dom'
 
 function HomeScreen() {
    
    const dispatch =useDispatch()

    const productList =useSelector(state=>state.productList)
    const {error,loading,products, page ,pages}=productList
    let location=useLocation()
    let q = location.search
    useEffect(()=>{  
       dispatch(listProducts(q))
    },[dispatch,q])
    console.log(q)
   return (
     <div>
         
         {!q && <ProductCarousel/>}
         
        <h1>Latest Products</h1>
        {loading?<Loader/>
                : error?<Message variant='danger'>{error}</Message>
                     : 
                     <div>
                     <Row>
                     {products.map(product=>(
                         <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                         <Product product={product}/>
                         </Col>
                     ))}
                 </Row>

                 <Paginate page={page} pages={pages} />

                 </div>
                 }

     </div>
   )
 }
 
 export default HomeScreen