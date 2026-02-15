//frontend/library-ui/src/pages/Home.tsx

import React from 'react';
import BookList from '../components/BookList';

const Home: React.FC = () => {
    return (
        <div className="min-h-full">
            <BookList />
        </div>
    );
};

export default Home;
