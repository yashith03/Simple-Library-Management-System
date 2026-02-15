//frontend/library-ui/src/components/BookList.tsx   

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '../types/Book';
import { deleteBook, getBooks } from '../api/bookService';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        setLoading(true);
        try {
            const data = await getBooks();
            setBooks(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch books. Ensure the backend URL is correct and running.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await deleteBook(id);
                setBooks(books.filter(b => b.id !== id));
            } catch (err) {
                alert('Failed to delete book.');
            }
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-medium">Loading collection...</p>
        </div>
    );

    if (error) return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
            <p className="text-red-400 font-medium mb-4">{error}</p>
            <button onClick={loadBooks} className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium">
                Retry Connection
            </button>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Library Books</h2>
                    <p className="text-slate-400 mt-1">Manage your digital collection</p>
                </div>
                <Link to="/add" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all font-semibold flex items-center gap-2">
                   <span>+</span> Add New Book
                </Link>
            </div>

            {books.length === 0 ? (
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
                    <div className="text-slate-600 text-5xl mb-4">📚</div>
                    <p className="text-slate-400 text-lg mb-6">No books available in the library.</p>
                    <Link to="/add" className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4">
                        Add your first book
                    </Link>
                </div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800/50 border-b border-slate-700">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Author</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">Description</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {books.map(book => (
                                    <tr key={book.id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                                                {book.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-slate-300">{book.author}</td>
                                        <td className="px-6 py-5 text-slate-400 hidden md:table-cell max-w-xs truncate italic text-sm">
                                            {book.description || 'No description provided.'}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <Link to={`/edit/${book.id}`} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="Edit">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                </Link>
                                                <button onClick={() => handleDelete(book.id!)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;
