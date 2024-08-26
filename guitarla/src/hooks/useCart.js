import { useEffect, useState, useMemo } from "react"
import { db } from '../data/db'

export const useCart = () =>{

    const initialCart = ()=> {
        const localStorageCart = localStorage.getItem('cart')
        return  localStorageCart ? [...JSON.parse(localStorageCart)]: []
    }

    const [data, setData] = useState([])
    const [cart, setCart] = useState(initialCart)

    useEffect(() =>{
        setData(db)
    }, [])

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() =>{
        localStorage.setItem('cart', JSON.stringify(cart) )
    },[cart])


    function addToCart (item){
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        if (itemExist >= 0){
            const updateCart = [...Cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        }
        else{
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    function deleteToCart (id){
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id))
    }

    function increaseQuantity(id){
        const updateCart = cart.map( item =>{
            if (item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function restCart(id){
        const updateCart = cart.map( item =>{
            if (item.id === id && item.quantity >= MIN_ITEMS ){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function cleanCart(){
        setCart([])
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    
    
    
    return {
        data,
        cart,
        addToCart,
        deleteToCart,
        increaseQuantity,
        restCart,
        cleanCart,
        isEmpty,
        cartTotal
    }
}