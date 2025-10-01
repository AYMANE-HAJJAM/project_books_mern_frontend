import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';

function Hero() {
    return (
        <div>
            {/* Decorative floating books */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-16 h-20 bg-amber-200 opacity-20 rounded transform rotate-12 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-12 h-16 bg-rose-200 opacity-20 rounded transform -rotate-6 animate-pulse delay-75"></div>
                <div className="absolute bottom-32 left-1/4 w-14 h-18 bg-orange-200 opacity-20 rounded transform rotate-45 animate-pulse delay-150"></div>
            </div>

            <div className="container mx-auto px-6 md:relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-medium text-gray-700">Discover Your Next Great Read</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                            Where Stories
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
                                Come Alive
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                            Explore thousands of captivating books across every genre. From timeless classics to contemporary bestsellers, find your perfect story today.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                                Browse Collection
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition-all duration-200">
                                View Bestsellers
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 pt-4">
                            <div>
                                <div className="text-3xl font-bold text-gray-900">50K+</div>
                                <div className="text-sm text-gray-600">Books Available</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">100K+</div>
                                <div className="text-sm text-gray-600">Happy Readers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">4.9★</div>
                                <div className="text-sm text-gray-600">Average Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Book Display */}
                    <div className="relative">
                        <div className="relative z-10">
                            {/* Main featured book */}
                            <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                                <div className="flex items-start gap-6">
                                    <div className="w-32 h-44 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="w-16 h-16 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-2">
                                            Featured
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            The Midnight Library
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4">
                                            A dazzling novel about the choices that go into a life well lived.
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex text-amber-500">
                                                {'★'.repeat(5)}
                                            </div>
                                            <span className="text-sm text-gray-500">(2,847 reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary book cards */}
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                                    <div className="w-16 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center rounded shadow mb-2">
                                        <BookOpen className="w-12 h-12 text-white" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-800">Mystery</p>
                                </div>
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow ">
                                    <div className="w-16 h-20 bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center rounded shadow mb-2">
                                        <BookOpen className="w-12 h-12 text-white" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-800">Romance</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative gradient blob */}
                        <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-amber-200 to-rose-200 rounded-full blur-3xl opacity-30 -z-10"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;