
import React, { useCallback, useState } from 'react';
import { type SignatureData } from '../types';
import { CheckIcon, SaveIcon, ResetIcon, PhotoIcon, UploadIcon } from './icons';

interface SignatureFormProps {
    data: SignatureData;
    onUpdate: (field: keyof SignatureData, value: string) => void;
    onSaveAsDefault: () => void;
    onReset: () => void;
    isSaved: boolean;
}

const PREDEFINED_LOGOS = [
    { name: 'QTSC', url: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-04.png' },
    { name: 'TTCNS', url: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-11.png' },
    { name: 'TTANM', url: 'https://www.qtsc.com.vn/uploads/files/2022/03/01/chu-ky-email-12.png' }
];

const InputField: React.FC<{
    label: string;
    name: keyof SignatureData;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, placeholder, onChange }) => (
    <div>
        <label htmlFor={name} className='block text-sm font-medium text-slate-700 mb-1'>
            {label}
        </label>
        <input
            type="text"
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
    </div>
);

const TextAreaField: React.FC<{
    label: string;
    name: keyof SignatureData;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ label, name, value, placeholder, onChange }) => (
    <div>
        <label htmlFor={name} className='block text-sm font-medium text-slate-700 mb-1'>
            {label}
        </label>
        <textarea
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            rows={4}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
    </div>
);


export const SignatureForm: React.FC<SignatureFormProps> = ({ data, onUpdate, onSaveAsDefault, onReset, isSaved }) => {
    const [iconsExpanded, setIconsExpanded] = useState(false);
    const [customLogoExpanded, setCustomLogoExpanded] = useState(false);
    const [showUrlInput, setShowUrlInput] = useState(false);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onUpdate(name as keyof SignatureData, value);
    }, [onUpdate]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdate('imageUrl', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [onUpdate]);
    
    const iconFields: { label: string; name: keyof SignatureData }[] = [
        { label: "Mobile Icon URL", name: "mobileIcon" },
        { label: "Mobile Icon 2 URL", name: "mobileIcon2" },
        { label: "Email Icon URL", name: "emailIcon" },
        { label: "Address Icon URL", name: "addressIcon" },
        { label: "Company Phone Icon URL", name: "companyPhoneIcon" },
        { label: "Website Icon URL", name: "companyWebsiteIcon" },
        { label: "Facebook Icon URL", name: "facebookIcon" },
        { label: "YouTube Icon URL", name: "youtubeIcon" },
        { label: "Twitter Icon URL", name: "twitterIcon" },
        { label: "LinkedIn Icon URL", name: "linkedinIcon" },
    ];


    return (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-100">
            <h2 className="text-xl font-semibold mb-6 text-slate-800">Thông Tin Của Bạn</h2>
            <div className="space-y-6">
                
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-slate-700 border-b pb-2">Cập nhật thông tin của bạn vào Form bên dưới.</h3>
                    <InputField label="Họ và tên" name="name" value={data.name} placeholder="e.g., Lê Quốc Thắng" onChange={handleChange} />
                    <InputField label="Chức vụ" name="position" value={data.position} placeholder="e.g., Officer" onChange={handleChange} />
                    <InputField label="Phòng / Trung tâm" name="title" value={data.title} placeholder="e.g., Administration Department" onChange={handleChange} />
                    <InputField label="Số di động" name="phone" value={data.phone} placeholder="e.g., 08888 77 586" onChange={handleChange} />
                    <InputField label="Số di động" name="phone2" value={data.phone2} placeholder="e.g., 09090 99 888" onChange={handleChange} />
                    <InputField label="Địa chỉ Email" name="email" value={data.email} placeholder="e.g., thanglq@qtsc.com.vn" onChange={handleChange} />
                    <InputField label="Địa chỉ Công ty" name="address" value={data.address} placeholder="e.g., QTSC Building 1, QTSC, Trung My Tay Ward, Ho Chi Minh City, Vietnam" onChange={handleChange} />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-slate-700 border-b pb-2">Chọn Logo</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {PREDEFINED_LOGOS.map((logo, idx) => (
                            <button
                                key={idx}
                                onClick={() => onUpdate('imageUrl', logo.url)}
                                className={`relative p-3 rounded-lg border-2 transition-all duration-200 bg-white hover:border-blue-400 group ${
                                    data.imageUrl === logo.url ? 'border-blue-600 ring-2 ring-blue-100 shadow-sm' : 'border-slate-200'
                                }`}
                            >
                                <div className="h-16 flex items-center justify-center overflow-hidden mb-1">
                                    <img src={logo.url} alt={logo.name} className="max-h-full max-w-full object-contain" />
                                </div>
                                <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-blue-500 tracking-wider">{logo.name}</span>
                                {data.imageUrl === logo.url && (
                                    <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5">
                                        <CheckIcon />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-6 mt-6 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onSaveAsDefault}
                        className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 font-semibold text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            isSaved
                                ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-600'
                        }`}
                    >
                        {isSaved ? <CheckIcon /> : <SaveIcon />}
                        {isSaved ? 'Default Saved!' : 'Save as Default'}
                    </button>
                    <button
                        onClick={onReset}
                        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    >
                        <ResetIcon />
                        Reset to Original
                    </button>
                </div>

            </div>
        </div>
    );
};
