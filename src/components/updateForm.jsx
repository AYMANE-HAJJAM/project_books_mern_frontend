import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Tag, Image, FileText, ArrowLeft, Save } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateForm() {
    const { bookId } = useParams(); // Changed from 'id' to 'bookId'
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        publishedDate: '',
        description: '',
        ImageUrl: ['']
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!bookId) {
            setError('No book ID provided');
            setIsLoading(false);
            return;
        }

        fetchBook();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookId]);

    const fetchBook = async () => {
        try {
            console.log('Fetching book with ID:', bookId);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${bookId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch book');
            }

            const data = await response.json();
            console.log('Fetched book data:', data);

            const formattedDate = data.book.publishedDate
                ? new Date(data.book.publishedDate).toISOString().split('T')[0]
                : '';

            setFormData({
                title: data.book.title || '',
                author: data.book.author || '',
                genre: data.book.genre || '',
                publishedDate: formattedDate,
                description: data.book.description || '',
                ImageUrl: data.book.ImageUrl || ['']
            });
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching book:', error);
            setError('Failed to load book details');
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUrlChange = (index, value) => {
        const newImageUrls = [...formData.ImageUrl];
        newImageUrls[index] = value;
        setFormData(prev => ({
            ...prev,
            ImageUrl: newImageUrls
        }));
    };

    const addImageUrl = () => {
        setFormData(prev => ({
            ...prev,
            ImageUrl: [...prev.ImageUrl, '']
        }));
    };

    const removeImageUrl = (index) => {
        if (formData.ImageUrl.length > 1) {
            const newImageUrls = formData.ImageUrl.filter((_, i) => i !== index);
            setFormData(prev => ({
                ...prev,
                ImageUrl: newImageUrls
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const cleanedImageUrls = formData.ImageUrl.filter(url => url.trim() !== '');

            const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    ImageUrl: cleanedImageUrls.length > 0 ? cleanedImageUrls : ['']
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update book');
            }

            alert('Book updated successfully!');
            navigate(`/books/${bookId}`);
        } catch (error) {
            console.error('Error updating book:', error);
            setError('Failed to update book. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!bookId) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-white">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <div className="flex items-center gap-3 mb-2">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="text-lg font-semibold text-red-800">Invalid URL</h3>
                    </div>
                    <p className="text-red-600">No book ID provided in the URL</p>
                    <button
                        onClick={() => navigate('/books')}
                        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Back to Books
                    </button>
                </div>
            </div>
        );
    }

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

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-white">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <div className="flex items-center gap-3 mb-2">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="text-lg font-semibold text-red-800">Error</h3>
                    </div>
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={() => navigate('/books')}
                        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Back to Books
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-amber-50 to-rose-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </button>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Update
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600"> Book</span>
                    </h1>
                    <p className="text-gray-600">Update the information for your book</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <BookOpen className="w-4 h-4 text-amber-600" />
                            Book Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                            placeholder="Enter book title"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <User className="w-4 h-4 text-amber-600" />
                            Author *
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                            placeholder="Enter author name"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Tag className="w-4 h-4 text-amber-600" />
                            Genre *
                        </label>
                        <input
                            type="text"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                            placeholder="e.g., Fiction, Mystery, Romance"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 text-amber-600" />
                            Published Date *
                        </label>
                        <input
                            type="date"
                            name="publishedDate"
                            value={formData.publishedDate}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <FileText className="w-4 h-4 text-amber-600" />
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                            placeholder="Enter book description"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Image className="w-4 h-4 text-amber-600" />
                            Image URLs
                        </label>
                        <div className="space-y-2">
                            {formData.ImageUrl.map((url, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="url"
                                        value={url}
                                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {formData.ImageUrl.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeImageUrl(index)}
                                            className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addImageUrl}
                            className="mt-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
                        >
                            + Add another image URL
                        </button>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    <span>Update Book</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}