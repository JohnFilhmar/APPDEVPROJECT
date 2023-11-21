const Branch = () => {
    return (
        <>
            <div className="container mx-auto">
                <h2 className="text-3xl mt-6 font-bold mb-4 text-center">About Us – JoeMar Motorshop</h2>
                <p className="text-justify ml-4 mr-4">
                    Welcome to JoeMar Motorshop, where our commitment to quality and passion for motors drive us to be your ultimate destination for premium motor parts. Established by [Owner's Name] on [Establishment Date], our multi-branched motor shop is designed to meet the diverse needs of automotive enthusiasts.
                </p>

                {/* Bayanan II Branch */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-center">Bayanan II Branch</h3>
                    <ul className="ml-6 mr-6">
                        <li>Establishment Date: [Date]</li>
                        <li>Address: [123 Main Street, Downtown City, State, Zip]</li>
                    </ul>
                </div>

                {/* Downtown Motors */}
                <div className="mt-6">
                    <p className="text-justify ml-4 mr-4 text-center">
                        Here at Bayanan II Branch, we bring the urban motor experience to life. Founded by [Owner's Name] on [Date], our branch in the heart of the city is dedicated to offering a premium selection of motor parts for various leading brands.
                    </p>
                </div>

                {/* Our Story */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-center">Our Story</h3>
                    <p className="text-justify ml-4 mr-4">
                        Established in [Year], JoeMar Motorshop was born out of a shared love for automobiles and a commitment to delivering premium motor parts to fellow enthusiasts. Our journey started with a simple idea: to create a one-stop-shop where customers could find everything they need to enhance, repair, or maintain their vehicles.
                    </p>
                    <p className="text-justify ml-4 mr-4">
                        Over the years, we have grown into a trusted online marketplace, serving customers nationwide. Our success is built on a foundation of customer satisfaction, quality products, and a passion for all things automotive.
                    </p>
                </div>

                {/* What Sets Us Apart */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-center">What Sets Us Apart?</h3>
                    <ul className="text-justify ml-6 mr-6">
                        <li>
                            <strong>Quality Assurance:</strong> We understand the importance of reliable performance. That's why we source our products from trusted manufacturers to guarantee durability and optimal functionality.
                        </li>
                        <li>
                            <strong>Wide Range of Products:</strong> Whether you're looking for replacement parts, performance upgrades, or accessories, we have you covered. Explore our extensive catalog to find the perfect fit for your vehicle.
                        </li>
                        <li>
                            <strong>User-Friendly Online Experience:</strong> Our website is designed with you in mind. Enjoy a hassle-free browsing experience, easy navigation, and secure checkout. We want your online shopping journey to be as smooth as possible.
                        </li>
                        <li>
                            <strong>Expert Customer Support:</strong> Have a question or need assistance? Our knowledgeable and friendly customer support team is here to help. We are dedicated to providing timely and helpful responses to ensure your satisfaction.
                        </li>
                    </ul>
                </div>

                {/* Our Commitment to Sustainability */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-center">Our Commitment to Sustainability</h3>
                    <p className="text-justify ml-4 mr-4">
                        At JoeMar Motorshop, we are committed to reducing our environmental footprint. We strive to work with eco-friendly manufacturers and implement sustainable practices in our operations. By choosing us, you're not only getting quality motor parts but also supporting a commitment to a greener future.
                    </p>
                </div>

                {/* Connect with Us */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-center">Connect with Us</h3>
                    <p className="text-justify ml-4 mr-4">
                        Join our community of motor enthusiasts on social media. Follow us on [Facebook, Instagram, Twitter] to stay updated on the latest products, promotions, and automotive trends. We love hearing from our customers and seeing how our products enhance your driving experience.
                    </p>
                </div>

                {/* Thank You Message */}
                <div className="mt-6">
                    <p className="text-justify ml-4 mr-4 text-center">
                        Thank you for choosing JoeMar Motorshop. We look forward to being your trusted partner in all your motor part needs. Drive with confidence!
                    </p>
                </div>
                {/* Footer */}
                <footer className="bg-gray-200 p-4 text-center">
                    &copy; 2023 JoeMar Motorshop. All rights reserved.
                </footer>
            </div>
        </>
    );
}

export default Branch;
