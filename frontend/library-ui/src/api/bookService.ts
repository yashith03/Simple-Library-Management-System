//frontend/library-ui/src/api/bookService.ts

import axios from 'axios';
import type { Book } from '../types/Book';

const API_URL = 'http://localhost:5000/api/books';

export const getBooks = async () => {
    const response = await axios.get<Book[]>(API_URL);
    return response.data;
};

export const getBook = async (id: number) => {
    const response = await axios.get<Book>(`${API_URL}/${id}`);
    return response.data;
};

export const createBook = async (book: Book) => {
    const response = await axios.post<Book>(API_URL, book);
    return response.data;
};

export const updateBook = async (id: number, book: Book) => {
    const response = await axios.put(`${API_URL}/${id}`, book);
    return response.data;
};

export const deleteBook = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};
