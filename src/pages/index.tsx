import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getProducts } from '../lib/products';
import { Product } from '../types/product';

interface HomePageProps {
    products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Link href={`/products/${product.id}`}>
                            {product.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const products = await getProducts();
    return {
        props: {
            products,
        },
        revalidate: 10, // ISR: обновление данных каждые 10 секунд
    };
};

export default HomePage;