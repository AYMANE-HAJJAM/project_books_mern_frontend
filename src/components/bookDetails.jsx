import React, { useEffect, useState } from 'react';
import { BookOpen, Calendar, User, Tag, ArrowLeft, Star, Send } from 'lucide-react';

export default function BookDetails({ bookId }) {
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [orderForm, setOrderForm] = useState({
        fullName: '',
        email: '',
        address: '',
        city: ''
    });
    const [orderLoading, setOrderLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                // Replace 'bookId' with actual ID from URL params in your router
                const id = bookId || window.location.pathname.split('/').pop();
                const response = await fetch(`http://localhost:4000/books/${id}`);
                const data = await response.json();
                setBook(data.book);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setError('Error loading book details');
                setIsLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        setOrderLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookId: book._id,
                    ...orderForm
                }),
            });

            if (response.ok) {
                setOrderSuccess(true);
                setOrderForm({
                    fullName: '',
                    email: '',
                    address: '',
                    city: ''
                });
                setTimeout(() => setOrderSuccess(false), 5000);
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order. Please try again.');
        } finally {
            setOrderLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-white">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                    <BookOpen className="w-8 h-8 text-amber-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="mt-4 text-gray-600 font-medium">Loading book details...</p>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-white">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
                    <p className="text-red-600">{error || 'Book not found'}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Back</span>
                </button>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Side - Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={book.ImageUrl[selectedImage]}
                                alt={book.title}
                                className="w-full h-[500px] object-cover"
                            />
                        </div>

                        {/* Thumbnail Images */}
                        {book.ImageUrl.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {book.ImageUrl.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                            ? 'border-amber-600 shadow-md'
                                            : 'border-gray-200 hover:border-amber-400'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${book.title} ${index + 1}`}
                                            className="w-full h-24 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Side - Details */}
                    <div className="space-y-6">
                        {/* Genre Badge */}
                        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full">
                            <Tag className="w-4 h-4" />
                            <span className="text-sm font-semibold">{book.genre}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            {book.title}
                        </h1>

                        {/* Author & Date */}
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2 text-gray-600">
                                <User className="w-5 h-5 text-amber-600" />
                                <span className="font-medium">{book.author}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-5 h-5 text-amber-600" />
                                <span>{new Date(book.publishedDate).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>
                            <span className="text-gray-600 font-medium">(4.9)</span>
                            <span className="text-gray-500">2,847 reviews</span>
                        </div>

                        {/* Description */}
                        <div className="border-t border-b border-gray-200 py-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {book.description || "A captivating story that will take you on an unforgettable journey. This book combines masterful storytelling with profound insights into the human condition. Perfect for readers who appreciate literary excellence and emotional depth."}
                            </p>
                        </div>

                        {/* Book Details */}
                        <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Book Details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">ISBN:</span>
                                    <p className="font-medium text-gray-900">{book.isbn || 'N/A'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Pages:</span>
                                    <p className="font-medium text-gray-900">{book.pages || '352'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Language:</span>
                                    <p className="font-medium text-gray-900">{book.language || 'English'}</p>
                                </div>
                                <div>
                                    <span className="text-gray-500">Publisher:</span>
                                    <p className="font-medium text-gray-900">{book.publisher || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Order Form */}
                <div className="max-w-2xl mx-auto mt-6 bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Place Your Order</h3>

                    {orderSuccess && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                            <p className="font-medium">Order placed successfully! 🎉</p>
                            <p className="text-sm">We'll contact you soon with order details.</p>
                        </div>
                    )}

                    <form onSubmit={handleOrderSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={orderForm.fullName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={orderForm.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                                Address *
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={orderForm.address}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                placeholder="Street address"
                            />
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                                City *
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={orderForm.city}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                placeholder="Your city"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={orderLoading}
                            className="w-full bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {orderLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>Place Order</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}