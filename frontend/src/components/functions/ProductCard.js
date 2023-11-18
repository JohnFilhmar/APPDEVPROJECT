import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ProductCard = ( {index, className, itemname, image, altimage, category, compatibility, branch, price} ) => {
    return (
        <>
            <Card
                className={className}
                imgSrc={image}
                imgAlt={altimage}
                key={index}
                >
                <Link to="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {compatibility} {category} {itemname} 
                    </h5>
                </Link>
                <div className="mb-5 mt-2.5 flex items-center">
                    Available at: {branch}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">₱{price}</span>
                    <Link
                    to="#"
                    className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    >
                    Add to cart
                    </Link>
                </div>
            </Card>
        </>
    );
}
 
export default ProductCard;