import React, { useEffect, useState } from 'react';
import { get } from '../services/api';
import useAuthState from '../hooks/useAuthState';
import { Product } from './types';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const {idToken} = useAuthState();
    const {logout} = useLogout();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const products = await get<{data: {products: Product[]}}>('/products', idToken);
            setIsLoading(false);
            setProducts(products.data.products);
        } catch (err) {
            setProducts([]);
            return err;
        } finally {
            setIsLoading(false);
        }
    }

    const onLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div>
            <h1>Home</h1>
            {isLoading && <p>Loading...</p>}
            {!isLoading && products.length === 0 && <p>No products</p>}
            <button type='button' onClick={onLogout}>Logout</button>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;