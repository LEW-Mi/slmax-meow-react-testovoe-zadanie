import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getProductById, getProducts } from '../../lib/products';
import { Product } from '../../types/product';
import Link from 'next/link';


interface ProductPageProps {
    product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Link href="/"><button>Back</button></Link>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img src={product.imageUrl} alt={product.name} />
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await getProducts();
    const paths = products.map(product => ({
        params: { id: product.id },
    }));

    return {
        paths,
        fallback: true, // ISR: позволяет динамически генерировать страницы
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const product = await getProductById(params?.id as string);
    if (!product) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            product,
        },
        revalidate: 10, // ISR: обновление данных каждые 10 секунд
    };
};

export default ProductPage;