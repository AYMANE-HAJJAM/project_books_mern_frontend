import React, { useEffect, useState } from 'react';
import { BookOpen, Calendar, User, Trash2, Edit, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Products() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/books`);
            const data = await response.json();
            setBooks(data.books);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching books:', error);
            setIsLoading(false);
            setError('Error fetching books');
        }
    };

    const handleDeleteBook = async (bookId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${bookId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setBooks(books.filter((book) => book._id !== bookId));
                setIsDeleted(true);
                setTimeout(() => setIsDeleted(false), 3000);
            } else {
                alert('Failed to delete book');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-white">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                    <BookOpen className="w-8 h-8 text-amber-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="mt-4 text-gray-600 font-medium">Loading amazing books...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-white">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <div className="flex items-center gap-3 mb-2">
                        <svg
                            className="w-6 h-6 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <h3 className="text-lg font-semibold text-red-800">
                            Error Loading Books
                        </h3>
                    </div>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our Book
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
                            {' '}
                            Collection
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover your next favorite read from our carefully curated selection
                    </p>
                </div>

                {/* Books Grid */}
                {isDeleted ? (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-md mx-auto">
                        <div className="flex items-center justify-center gap-3">
                            <svg
                                className="w-6 h-6 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <h3 className="text-lg font-semibold text-green-800">
                                Book Deleted Successfully
                            </h3>
                        </div>
                    </div>
                
                ):(

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.length === 0 ? (
                        <p className="text-center text-gray-500 col-span-full">
                            No books available right now.
                        </p>
                    ) : (
                        books.map((book) => (
                            <BookCard key={book._id} book={book} onDelete={handleDeleteBook} />
                        ))
                    )}
                </div>
                )}
            </div>
        </div>
    );
}

function BookCard({ book, onDelete }) {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        onDelete(book._id, book.title);
        setShowConfirm(false);
    };

    return (
        <>
            <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Book Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-rose-50">
                    <img
                        src={book.ImageUrl?.[0] || '/placeholder.jpg'}
                        alt={book.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-semibold text-amber-600">
                            {book.genre}
                        </span>
                    </div>
                </div>

                {/* Book Details */}
                <div className="p-5">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {book.title}
                    </h2>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4 text-amber-600" />
                            <span className="line-clamp-1">{book.author}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-amber-600" />
                            <span>
                                {book.publishedDate
                                    ? new Date(book.publishedDate).toLocaleDateString()
                                    : 'Unknown'}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                        <Link to={`/books/${book._id}`}>
                            <button className="w-full bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group/btn">
                                <span>View Details</span>
                                <BookOpen className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </Link>

                        <div className="grid grid-cols-2 gap-2 w-full">
                            <Link to={`/books/${book._id}/update`}>
                                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                                    <Edit className="w-4 h-4" />
                                    <span>Edit</span>
                                </button>
                            </Link>

                            <button
                                onClick={() => setShowConfirm(true)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Delete Modal */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
                    <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Confirm Delete
                            </h3>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-red-500">"{book.title}"</span>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
