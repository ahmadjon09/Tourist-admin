import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../Axios'
import {
  getProductError,
  getProductPending,
  getProductSuccess
} from '../../Toolkit/ProductsSlicer'
import { Calendar, MapPin, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Person } from '@phosphor-icons/react'

export const Products = () => {
  const dispatch = useDispatch()
  const { data, isPending, isError } = useSelector(state => state.products)

  useEffect(() => {
    const getAllProducts = async () => {
      dispatch(getProductPending())
      try {
        const response = await Axios.get('product')
        dispatch(getProductSuccess(response.data?.data || []))
      } catch (error) {
        dispatch(
          getProductError(error.response?.data?.message || 'Unknown error')
        )
      }
    }
    getAllProducts()
  }, [dispatch])

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await Axios.delete(`product/${id}`)
      dispatch(getProductSuccess(data.filter(product => product._id !== id)))
      alert('Product deleted successfully')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete product')
    }
  }

  return (
    <div className='p-8 bg-green-100 max-h-screen h-auto overflow-y-auto'>
      <div className='w-full flex justify-between items-center p-4'>
        <h1 className='text-3xl text-black'>Products</h1>
        <Link
          to={'/create-product'}
          className='bg-green-700 text-white px-4 py-2 rounded shadow hover:bg-green-800 transition-colors'
        >
          Create Product
        </Link>
      </div>
      {isPending ? (
        <div className='flex justify-center items-center mt-10'>
          <p className='text-xl text-gray-600'>Loading products...</p>
        </div>
      ) : isError ? (
        <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
      ) : data.length > 0 ? (
        <div className='grid h-auto pb-[100px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {data.map(product => {
            const discountedPrice =
              product.sale > 0
                ? product.price - product.price * (product.sale / 100)
                : product.price
            return (
              <div
                key={product._id}
                className='bg-white rounded-md shadow-lg overflow-hidden relative'
              >
                {product.sale > 0 && (
                  <div className='absolute z-10 top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm font-bold rounded'>
                    {product.sale}% OFF
                  </div>
                )}
                <div className='w-full max-h-60 overflow-hidden'>
                  <img
                    src={product.photos[0] || null}
                    alt='Product'
                    className='w-full max-h-60 h-60 object-cover hover:scale-110 transition-all duration-700'
                  />
                </div>
                <div className='w-full'>
                  <div className='flex justify-center items-center w-full h-[40px] border-b-2 '>
                    <div className='w-1/3 flex items-center gap-2 justify-center text-sm text-gray-500 border-r-2'>
                      <MapPin size={15} color='green' />
                      <p>{product.location}</p>
                    </div>
                    <div className='w-1/3 flex items-center gap-2 justify-center text-sm text-gray-500 border-r-2'>
                      <Calendar size={15} color='green' />
                      <p>{product.days} days</p>
                    </div>
                    <div className='w-1/3 flex items-center gap-2 justify-center text-sm text-gray-500 border-r-2'>
                      <Person size={15} color='green' />
                      <p>{product.person} Person</p>
                    </div>
                  </div>
                  <div className='p-4'>
                    <p className='text-gray-600 mt-2 text-lg font-bold'>
                      {product.sale > 0 ? (
                        <>
                          <span className='line-through text-red-500'>
                            ${product.price.toFixed(2)}
                          </span>{' '}
                          <span className='text-green-600'>
                            ${discountedPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        `$${product.price.toFixed(2)}`
                      )}
                    </p>
                    <p className='text-sm text-gray-500 mt-1'>
                      {product.description?.length > 150
                        ? product.description?.slice(0, 150) + ' ...' ||
                          'No description available'
                        : product.description || 'No description available'}
                    </p>
                    <div className='flex justify-between items-center mt-4'>
                      <Link
                        to={`/products/edit/${product._id}`}
                        className='bg-sky-600 text-white rounded-md px-3 py-1 text-sm hover:bg-sky-700'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className='bg-red-600 text-white rounded-md px-3 py-1 text-sm hover:bg-red-700'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className='text-gray-600 text-center text-lg mt-4'>
          No products found.
        </p>
      )}
    </div>
  )
}
