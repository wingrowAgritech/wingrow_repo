import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductContext from '../../cartContext/ProductContext'
import Spinner from '../../components/Spinner'
import './Productspage.css'

const ProductsPage = () => {
  const {stallsData , Itemcount , handleClick } = useContext(ProductContext)
  return (
    <div className='products_page'>
      <div className='products_head'>
        <Link className='head_products' to={`../customers`}>Items</Link>
        <Link className='head_products' to="./cartspage">Cart {Itemcount}</Link>
      </div>
      <div className='products_container'>
        { stallsData && stallsData.length!==0 &&
          stallsData.map((e,i)=>{
            return(
              <div key={i} className='products'>
                <img className='img_products' alt='gift' src='https://tse2.mm.bing.net/th?id=OIP.iwB5ZHEBW7HiLsUfb4BYzwHaHa&pid=Api&P=0'/>
                <span className='content_product'>Market : {e.market}</span>
                <span className='content_product'>Commodity : {e.commodity}</span>
                <span className='content_product'>Price : {e.purchase_rate} / kg</span>
                <button id={e._id} onClick={handleClick} className='add_product'>Add to cart</button>
              </div>
            )
          })
        }
        { stallsData && stallsData.length === 0 &&
          <div className='products_non_container'>
            <h3>No stallsData available</h3>
          </div> 
        }
        { !stallsData &&
          <Spinner/>
        }
      </div>
    </div>
  )
}

export default ProductsPage