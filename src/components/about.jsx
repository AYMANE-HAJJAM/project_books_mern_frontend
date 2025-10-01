const aboutCards = [
    {
        id: 1,
        emoji: "📚",
        title: "Vast Collection",
        description:
            "Explore over 50,000 carefully curated books across every genre. From timeless classics to contemporary bestsellers, find your next great read.",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
    {
        id: 2,
        emoji: "🎯",
        title: "Personalized Recommendations",
        description:
            "Our AI-powered recommendation engine learns your preferences to suggest books you'll love. Discover hidden gems tailored just for you.",
        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
        id: 3,
        emoji: "👥",
        title: "Reading Community",
        description:
            "Join thousands of book lovers in discussions, book clubs, and reading challenges. Share reviews and connect with fellow readers worldwide.",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
        id: 4,
        emoji: "⭐",
        title: "Expert Reviews",
        description:
            "Access professional reviews, author interviews, and literary analysis from our team of experienced book critics and literary experts.",
        icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    },
    {
        id: 5,
        emoji: "🔖",
        title: "Reading Progress Tracking",
        description:
            "Keep track of your reading journey with smart bookmarks, progress tracking, and reading statistics. Set goals and celebrate milestones.",
        icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
    },
    {
        id: 6,
        emoji: "🎁",
        title: "Exclusive Content",
        description:
            "Get early access to new releases, author Q&As, and exclusive bonus chapters. Plus special discounts for our loyal community members.",
        icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
    },
];

function About() {
    return (
        <div className="max-w-7xl flex flex-col items-center justify-center gap-5 mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="font-bold text-xl leading-[1.1] md:text-4xl text-center">
                Crafted with Passion and Purpose 📖
            </h2>
            <p className="max-w-[85%] text-center leading-normal text-stone-600 sm:text-lg sm:leading-7">
                Every feature designed to enhance your reading experience and connect you with stories that matter
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aboutCards.map((card) => (
                    <AboutCard key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
}

const AboutCard = ({ card }) => {
    return (
        <div
            className="flex flex-col bg-white items-center justify-center gap-3 border border-stone-200 rounded-xl p-4"
            key={card.id}
        >
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={card.icon}></path>
                </svg>
            </div>
            <div className="flex items-center justify-center gap-3 text-xl font-[400]">
                <span>{card.emoji}</span>
                <span>{card.title}</span>
            </div>
            <span className="text-stone-600 text-sm leading-relaxed text-center">
                {card.description}
            </span>
        </div>
    );
};

export default About;