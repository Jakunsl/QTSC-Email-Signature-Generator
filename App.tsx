import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SignatureForm } from './components/SignatureForm';
import { SignaturePreview } from './components/SignaturePreview';
import { type SignatureData } from './types';
import { CopyIcon, CheckIcon, DownloadIcon } from './components/icons';

const defaultSignatureData: SignatureData = {
    name: 'Lê Quốc Thắng',
    position: 'Chuyên viên',
    title: 'Administration Department',
    phone: '08888 77 586',
    phone2: '09090 99 888',
    email: 'thanglq@qtsc.com.vn',
    address: 'QTSC Building 1, QTSC, Trung My Tay Ward, Ho Chi Minh City, Vietnam',
    imageUrl: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-04.png',
    companyPhone: '(84-28) 3715 8888',
    website: 'www.qtsc.com.vn',
    facebook: 'https://www.facebook.com/QualityTechSolutionComplex',
    youtube: 'https://www.youtube.com/QualityTechSolutionComplex',
    twitter: 'https://x.com/QTSC',
    linkedin: 'https://www.linkedin.com/company/quality-tech-solution-complex',
    disclaimer: 'This message is intended only for the named recipients. If you are not the intended recipient, any disclosure, copying, distribution or action taken in reliance on the contents of this information, is strictly prohibited.',
    // Default Icon URLs
    mobileIcon: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-01.png',
    mobileIcon2: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-01.png',
    emailIcon: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-02.png',
    addressIcon: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-03.png',
    lineIcon: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-13.png',
    companyPhoneIcon: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-05.png',
    companyWebsiteIcon: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-06.png',
    facebookIcon: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-07.png',
    youtubeIcon: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-08.png',
    twitterIcon: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-09.png',
    linkedinIcon: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-10.png',
};

const getInitialState = (): SignatureData => {
    try {
        const savedData = localStorage.getItem('emailSignatureData');
        if (savedData) {
            return { ...defaultSignatureData, ...JSON.parse(savedData) };
        }
        const userDefaultData = localStorage.getItem('userDefaultSignatureData');
        if (userDefaultData) {
            return { ...defaultSignatureData, ...JSON.parse(userDefaultData) };
        }
    } catch (error) {
        console.error("Failed to load data from localStorage", error);
    }
    return defaultSignatureData;
};


const App: React.FC = () => {
    const [signatureData, setSignatureData] = useState<SignatureData>(getInitialState);
    const [isCopied, setIsCopied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            localStorage.setItem('emailSignatureData', JSON.stringify(signatureData));
        } catch (error) {
            console.error("Failed to save data to localStorage", error);
        }
    }, [signatureData]);

    const handleUpdate = useCallback((field: keyof SignatureData, value: string) => {
        setSignatureData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSaveAsDefault = useCallback(() => {
        try {
            const dataToSave = JSON.stringify(signatureData);
            localStorage.setItem('userDefaultSignatureData', dataToSave);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        } catch (error) {
            console.error("Failed to save default data to localStorage", error);
        }
    }, [signatureData]);
    
    const handleReset = useCallback(() => {
        if (window.confirm("Are you sure you want to reset?")) {
            localStorage.removeItem('userDefaultSignatureData');
            localStorage.removeItem('emailSignatureData');
            setSignatureData(defaultSignatureData);
        }
    }, []);
    
    const handleCopySignature = useCallback(() => {
        if (previewRef.current) {
            const signatureHtml = previewRef.current.innerHTML;
            const blob = new Blob([signatureHtml], { type: 'text/html' });
            const clipboardItem = new ClipboardItem({ 'text/html': blob });

            navigator.clipboard.write([clipboardItem]).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            }).catch(err => {
                const el = document.createElement('textarea');
                el.value = signatureHtml;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            });
        }
    }, []);

    const handleDownloadPNG = useCallback(async () => {
        if (previewRef.current && (window as any).html2canvas) {
            setIsDownloading(true);
            try {
                const canvas = await (window as any).html2canvas(previewRef.current, {
                    useCORS: true,
                    scale: 2, // Very high quality for professional look
                    backgroundColor: '#ffffff',
                    logging: false,
                    width: 800,
                    windowWidth: 800,
                });
                const link = document.createElement('a');
                const nameSlug = signatureData.name ? signatureData.name.toLowerCase().replace(/\s+/g, '-') : 'signature';
                link.download = `${nameSlug}-email-signature.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            } catch (err) {
                console.error('Failed to generate PNG:', err);
                alert('An error occurred while generating the image. Please check your network connection for remote images.');
            } finally {
                setIsDownloading(false);
            }
        }
    }, [signatureData.name]);

    return (
        <div className="min-h-screen font-sans text-slate-800">
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Trình tạo chữ ký email QTSC</h1>
                    <p className="text-slate-500 mt-1">Chữ ký với bố cục cố định chuyên nghiệp dành cho Webmail và Outlook.</p>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    <div className="lg:col-span-2">
                        <SignatureForm 
                            data={signatureData}
                            onUpdate={handleUpdate}
                            onSaveAsDefault={handleSaveAsDefault}
                            onReset={handleReset}
                            isSaved={isSaved}
                        />
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg sticky top-8 border border-slate-100">
                            <h2 className="text-xl font-semibold mb-4 text-slate-800">Xem trước Trực tiếp</h2>
                             <div className="bg-slate-100 p-6 rounded-lg overflow-x-auto border border-slate-200 flex justify-center">
                                <div className="bg-white shadow-sm p-4 rounded border border-slate-200" style={{ width: 'fit-content' }}>
                                    <SignaturePreview data={signatureData} ref={previewRef} />
                                </div>
                            </div>
                            
                            <div className="mt-8 space-y-6">
                                <div className="text-center">
                                    <button
                                        onClick={handleCopySignature}
                                        className={`w-full max-w-sm inline-flex items-center justify-center gap-2 px-6 py-4 font-bold text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md focus:outline-none focus:ring-4 ${
                                            isCopied
                                                ? 'bg-green-500 focus:ring-green-200'
                                                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-200'
                                        }`}
                                    >
                                        {isCopied ? <CheckIcon /> : <CopyIcon />}
                                        {isCopied ? 'HTML Copied!' : 'Copy for Webmail/Outlook (HTML)'}
                                    </button>
                                </div>

                                <div className="relative flex items-center py-2">
                                    <div className="flex-grow border-t border-slate-200"></div>
                                    <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">Hoặc</span>
                                    <div className="flex-grow border-t border-slate-200"></div>
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={handleDownloadPNG}
                                        disabled={isDownloading}
                                        className={`w-full max-w-sm inline-flex items-center justify-center gap-2 px-6 py-4 font-bold text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md focus:outline-none focus:ring-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:ring-blue-200 disabled:opacity-70 disabled:cursor-not-allowed`}
                                    >
                                        {isDownloading ? (
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : <DownloadIcon />}
                                        {isDownloading ? 'Processing...' : 'Download as PNG'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
             <footer className="text-center py-10 text-slate-400 text-xs">
                <p>&copy; {new Date().getFullYear()} Thiết kế và xây dựng bởi <span style={{ fontWeight: 'bold' }}>DƯƠNG VĂN THUẬN</span></p>
            </footer>
        </div>
    );
};

export default App;