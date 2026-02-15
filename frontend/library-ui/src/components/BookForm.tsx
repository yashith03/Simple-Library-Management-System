//frontend/library-ui/src/components/BookForm.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Book } from '../types/Book';
import { createBook, getBook, updateBook } from '../api/bookService';
import '../index.css'; // Ensure styles apply

const BookForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book>({
        title: '',
        author: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            if (id) {
                setLoading(true);
                try {
                    const data = await getBook(parseInt(id));
                    setBook(data);
                } catch (err) {
                    setError('Failed to fetch book details.');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchBook();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (id) {
                await updateBook(parseInt(id), book);
            } else {
                await createBook(book);
            }
            navigate('/');
        } catch (err) {
            setError('Failed to save book. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBook(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-medium underline">Loading details...</p>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                
                <h2 className="text-2xl font-bold text-white mb-2">{id ? 'Edit Book' : 'Add New Book'}</h2>
                <p className="text-slate-400 mb-8 text-sm">Fill in the information below to update the catalog.</p>
                
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                            Book Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={book.title}
                            onChange={handleChange}
                            placeholder="e.g. Madolduwa"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                            Author Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                            placeholder="e.g. Martin Wickramasinghe"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block ml-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={book.description || ''}
                            onChange={handleChange}
                            placeholder="Brief summary of the book..."
                            rows={4}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button 
                            type="button" 
                            onClick={() => navigate('/')} 
                            className="px-6 py-2.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-all font-medium text-sm"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : (id ? 'Save Changes' : 'Create Entry')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookForm;
