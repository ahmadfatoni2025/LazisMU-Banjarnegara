import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Image as ImageIcon, User, Tag, Send, Upload, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const FadeInUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const BuatBerita = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('edit');
    const [loading, setLoading] = useState(false);
    const [uploadingImg, setUploadingImg] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: 'Administrator',
        image_url: '',
        category: 'Berita',
        status: 'published'
    });

    const [activeTab, setActiveTab] = useState<'settings' | 'seo'>('settings');

    const fetchNewsDetail = useCallback(async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/berita/${id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData(data);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            alert('Akses ditolak. Silakan login sebagai admin.');
            navigate('/login');
            return;
        }

        if (editId) {
            fetchNewsDetail(editId);
        }
    }, [editId, navigate, fetchNewsDetail]);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContentChange = (content: string) => {
        setFormData({ ...formData, content });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const formDataPayload = new FormData();
        formDataPayload.append('file', file);

        setUploadingImg(true);
        try {
            const res = await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formDataPayload
            });
            const data = await res.json();
            if (res.ok) {
                setFormData(prev => ({ ...prev, image_url: data.url }));
            } else {
                alert('Gagal mengupload gambar: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Gagal mengupload gambar. Pastikan backend berjalan.');
        } finally {
            setUploadingImg(false);
        }
    };

    const handleSubmit = async (status: 'draft' | 'published') => {
        setLoading(true);
        const token = localStorage.getItem('admin_token');
        const safeStatus = status === 'published' ? 'publish' : 'draft';

        const url = editId
            ? `http://localhost:3000/api/berita_admin/${editId}`
            : 'http://localhost:3000/api/berita_admin';

        const method = editId ? 'PUT' : 'POST';

        try {
            const payload = { ...formData, status: safeStatus };
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert(`Berita berhasil ${editId ? 'diperbarui' : 'dibuat'}!`);
                navigate('/berita');
            } else {
                const err = await res.json();
                alert(`Gagal: ${err.message || 'Terjadi kesalahan'}`);
            }
        } catch (error) {
            console.error('Error saving news:', error);
            alert('Terjadi kesalahan koneksi');
        } finally {
            setLoading(false);
        }
    };

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video', 'blockquote', 'code-block'],
            ['clean']
        ],
    }), []);

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900 flex flex-col">
            <Navbar />

            {/* Minimalist Page Header (Matches Artikel.tsx) */}
            <section className="pt-32 pb-10 bg-white shadow-xs z-30 relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div>
                            <FadeInUp>
                                <div className="inline-flex items-center space-x-2 bg-orange-50 border border-orange-100 text-orange-600 px-4 py-1.5 rounded-full mb-6">
                                    <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                                    <span className="text-xs font-bold tracking-widest uppercase">Editor Konten</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-4">
                                    {editId ? 'Edit Dokumen' : 'Buat Berita Baru'} <span className="text-orange-600">.</span>
                                </h1>
                                <p className="text-lg text-gray-500 font-light">
                                    Tulis dan publikasikan kabar terbaru untuk umat dan donatur.
                                </p>
                            </FadeInUp>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleSubmit('draft')}
                                disabled={loading}
                                className="px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-2xl font-bold hover:border-orange-600 hover:text-orange-600 transition-all shadow-sm"
                            >
                                Simpan Draft
                            </button>
                            <button
                                onClick={() => handleSubmit('published')}
                                disabled={loading}
                                className="px-8 py-3 bg-orange-600 text-white rounded-2xl font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 flex items-center gap-2"
                            >
                                {loading ? 'Processing...' : (editId ? 'Update & Publish' : 'Publikasikan')}
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex-1 flex flex-col lg:flex-row items-start justify-center overflow-hidden relative z-10 bg-gray-50/50">
                <div className="w-full max-w-[1400px] flex flex-col lg:flex-row h-full mx-auto shadow-2xl shadow-gray-200/50 rounded-[2.5rem] my-4 lg:my-8 bg-white overflow-hidden border border-gray-100">

                    {/* Main Editor Area */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-10 pb-32 custom-scrollbar bg-white">
                        <FadeInUp className="w-full" delay={0.1}>
                            <div className="min-h-[900px] flex flex-col relative">
                                {/* Title Input - Integrated cleanly */}
                                <div className="mb-8">
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Judul Berita..."
                                        className="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder:text-gray-300 border-none p-0 focus:ring-0 bg-transparent tracking-tight leading-tight"
                                    />
                                    <div className="h-1 w-24 bg-orange-500 rounded-full mt-6 opacity-20"></div>
                                </div>

                                {/* Editor Content */}
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={handleContentChange}
                                    modules={modules}
                                    className="quill-document-editor flex-1"
                                    placeholder="Mulai menulis cerita inspiratif..."
                                />
                            </div>
                        </FadeInUp>
                    </div>

                    {/* Right Sidebar - Properties */}
                    <div className="w-full lg:w-[400px] bg-gray-50/50 border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col h-auto lg:h-full overflow-y-auto relative z-20">
                        <div className="flex items-center border-b border-gray-100 px-8 pt-6 bg-white/50 backdrop-blur-sm sticky top-0 z-30">
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors mr-6 ${activeTab === 'settings' ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                Pengaturan
                            </button>
                            <button
                                onClick={() => setActiveTab('seo')}
                                className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'seo' ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                Ringkasan & SEO
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            {activeTab === 'settings' ? (
                                <FadeInUp delay={0.2} className="space-y-8">
                                    {/* Cover Image Section */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <ImageIcon className="w-3 h-3" /> Gambar Sampul
                                        </label>

                                        <div className="group relative rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/10 transition-all aspect-video flex flex-col items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                            {formData.image_url ? (
                                                <>
                                                    <img src={formData.image_url} alt="Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                    <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm">
                                                        <Upload className="w-4 h-4 mr-2" /> Ganti Gambar
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-6">
                                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm text-orange-500 flex items-center justify-center mx-auto mb-4 border border-gray-100 group-hover:scale-110 transition-transform">
                                                        <ImageIcon className="w-8 h-8" />
                                                    </div>
                                                    <span className="text-sm text-gray-600 font-bold block">Upload Gambar</span>
                                                    <span className="text-xs text-gray-400 mt-1 block font-light">JPG, PNG, WEBP (Max 2MB)</span>
                                                </div>
                                            )}
                                            {uploadingImg && (
                                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm z-20">
                                                    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                                </div>
                                            )}
                                        </div>
                                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

                                        {/* URL Fallback */}
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                name="image_url"
                                                value={formData.image_url}
                                                onChange={handleChange}
                                                placeholder="Atau tempel URL..."
                                                className="w-full pl-10 pr-4 py-4 text-xs font-semibold bg-gray-50 border border-gray-100 rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 group-hover:bg-white"
                                            />
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                                <Upload className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Metadata Fields */}
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                <Tag className="w-3 h-3" /> Kategori
                                            </label>
                                            <div className="relative group">
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 focus:border-orange-500 focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer hover:bg-white"
                                                >
                                                    <option value="Berita">Berita</option>
                                                    <option value="Program">Program</option>
                                                    <option value="Laporan">Laporan</option>
                                                    <option value="Artikel">Artikel</option>
                                                    <option value="Video">Video</option>
                                                </select>
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                <User className="w-3 h-3" /> Penulis
                                            </label>
                                            <input
                                                type="text"
                                                name="author"
                                                value={formData.author}
                                                onChange={handleChange}
                                                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 focus:border-orange-500 focus:bg-white focus:outline-none transition-all hover:bg-white"
                                            />
                                        </div>
                                    </div>
                                </FadeInUp>
                            ) : (
                                <FadeInUp delay={0.2} className="space-y-6">
                                    <div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white text-orange-600 flex items-center justify-center shadow-sm shrink-0">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-900 mb-1">Preview Kartu</h4>
                                                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                                    Ringkasan ini akan tampil di halaman depan website. Buatlah menarik agar pembaca penasaran.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <textarea
                                            name="excerpt"
                                            value={formData.excerpt}
                                            onChange={handleChange}
                                            maxLength={200}
                                            rows={8}
                                            placeholder="Mulai ketik ringkasan..."
                                            className="w-full p-6 text-sm bg-gray-50 border border-gray-100 rounded-[2rem] text-gray-600 placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:outline-none resize-none leading-relaxed font-medium transition-all hover:bg-white"
                                        />
                                        <div className="absolute bottom-6 right-6 text-[10px] font-bold text-gray-400 bg-white/50 px-2 py-1 rounded-lg backdrop-blur">
                                            {formData.excerpt.length}/200
                                        </div>
                                    </div>
                                </FadeInUp>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .quill-document-editor .ql-toolbar.ql-snow {
                    border: none;
                    border-bottom: 2px dashed #F3F4F6;
                    padding: 20px 48px;
                    background: white;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                .quill-document-editor .ql-container.ql-snow {
                    border: none;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 16px;
                    line-height: 1.8;
                    color: #374151;
                }
                .quill-document-editor .ql-editor {
                    padding: 40px 48px;
                    min-height: 800px;
                }
                .quill-document-editor .ql-editor.ql-blank::before {
                    left: 48px;
                    font-style: italic;
                    color: #9CA3AF;
                }
                /* Custom Scrollbar */
                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                    background: #E5E7EB;
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #D1D5DB;
                }
            `}</style>
        </div>
    );
};

export default BuatBerita;
