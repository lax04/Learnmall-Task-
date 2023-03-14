import { createContext, useEffect, useState } from "react";

const ProductContext = createContext()

const ProductContextDistributer = ({children}) => {
    const [productsBackend, setProductsBackend] = useState()
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState()
    useEffect(() => {
        setTotal(cart.reduce((sum, ele) => sum + ele.price, 0))
        
    }, [cart])
    return (
        <ProductContext.Provider value={{ productsBackend, setProductsBackend, cart, setCart, total, setTotal }}>
            {children}
        </ProductContext.Provider>
    )
}

export { ProductContext, ProductContextDistributer }


