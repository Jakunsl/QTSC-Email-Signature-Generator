import React, { forwardRef } from 'react';
import { type SignatureData } from '../types';

interface SignaturePreviewProps {
    data: SignatureData;
}

export const SignaturePreview = forwardRef<HTMLDivElement, SignaturePreviewProps>(({ data }, ref) => {
    const { 
        name, position, title, phone, phone2, email, address, imageUrl,
        companyPhone, website, facebook, youtube, twitter, linkedin, disclaimer,
        mobileIcon, mobileIcon2, emailIcon, addressIcon, lineIcon, companyPhoneIcon, companyWebsiteIcon,
        facebookIcon, youtubeIcon, twitterIcon, linkedinIcon
    } = data;
    const websiteUrl = website && !website.startsWith('http') ? `https://${website}` : website;
    
    const socialLinks = [
        { url: facebook, iconUrl: facebookIcon },
        { url: youtube, iconUrl: youtubeIcon },
        { url: twitter, iconUrl: twitterIcon },
        { url: linkedin, iconUrl: linkedinIcon },
    ].filter(link => link.url && link.url.trim() !== '');


    return (
        <div ref={ref} style={{ width: '700px', backgroundColor: '#ffffff', textAlign: 'left' }}>
            {/* Main Container Table - Strictly Fixed at 700px */}
            <table width="700" cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: 'Arial, sans-serif', color: '#000000', borderCollapse: 'collapse', width: '700px', tableLayout: 'fixed' }}>
                <tbody>
                     {/* --- PERSONAL INFO --- */}
                    <tr>
                        <td style={{ paddingBottom: '6px' }}>                            
                            <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse'/*, marginTop: '12px'*/ }}>
                                <tbody>
                                    {name && (
                                        <tr style={{ height: '19pt' }}>
                                            <td style={{ padding: '0' }}>
                                                <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ fontFamily: 'Arial, sans-serif', margin: 0, fontWeight: 'bold', fontSize: '13pt', color: '#000000', lineHeight: '1.2' }}>{name || 'Your Name'}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                    {position && (
                                        <tr style={{ height: '19pt' }}>
                                            <td style={{ padding: '0' }}>
                                                <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ fontFamily: 'Arial, sans-serif', margin: 0, fontSize: '12pt', color: '#000000', lineHeight: '1.2' }}>{position && <span style={{ fontWeight: 'bold' }}>{position}</span>}{position && title && ', '}{title}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                    {(phone || phone2 || email) && (
                                        <tr style={{ height: '19pt', fontSize: '12pt' }}>
                                            <td style={{ padding: '0' }}>
                                                <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
                                                    <tbody>
                                                        <tr>
                                                            {phone && (
                                                                <>
                                                                    <td style={{ verticalAlign: 'middle', padding: '2px 8px 2px 0' }}><img src={mobileIcon} alt="Mobile" width="16" height="16" style={{ border: '0', display: 'block', verticalAlign: 'middle' }} /></td>
                                                                    <td style={{ fontFamily: 'Arial, sans-serif', verticalAlign: 'middle', color: '#000000', whiteSpace: 'nowrap' }}>{phone}</td>
                                                                </>
                                                            )}
                                                            {phone && phone2 && (
                                                                <td style={{ verticalAlign: 'middle', padding: '0 10px', color: '#cccccc' }}></td>
                                                            )}
                                                            {phone2 && (
                                                                <>
                                                                    <td style={{ verticalAlign: 'middle', padding: '2px 8px 2px 0' }}><img src={mobileIcon2} alt="Mobile" width="16" height="16" style={{ border: '0', display: 'block', verticalAlign: 'middle' }} /></td>
                                                                    <td style={{ fontFamily: 'Arial, sans-serif', verticalAlign: 'middle', color: '#000000', whiteSpace: 'nowrap' }}>{phone2}</td>
                                                                </>
                                                            )}
                                                            {(phone || phone2) && email && (
                                                                <td style={{ verticalAlign: 'middle', padding: '0 10px', color: '#cccccc' }}></td>
                                                            )}
                                                            {email && (
                                                                <>
                                                                    <td style={{ verticalAlign: 'middle', padding: '2px 8px 2px 0' }}><img src={emailIcon} alt="Email" width="16" height="16" style={{ border: '0', display: 'block', verticalAlign: 'middle' }} /></td>
                                                                    <td style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                                                        <a href={`mailto:${email}`} style={{ fontFamily: 'Arial, sans-serif', color: '#000000', textDecoration: 'none' }}>{email}</a>
                                                                    </td>
                                                                </>
                                                            )}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                    {address && (
                                        <tr style={{ height: '19pt', fontSize: '12pt' }}>
                                            <td style={{ padding: '0' }}>
                                                <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ verticalAlign: 'middle', padding: '2px 8px 2px 0' }}><img src={addressIcon} alt="Address" width="16" height="16" style={{ border: '0', display: 'block', verticalAlign: 'middle' }} /></td>
                                                            <td style={{ fontFamily: 'Arial, sans-serif', verticalAlign: 'middle', color: '#000000' }}>{address}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    {/* --- RIGID SEPARATOR (700px) --- */}
                    <tr>
                        <td style={{ padding: '0 0 8px 0' }}>
                            <table width="600" cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse', width: '600px', tableLayout: 'fixed' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ verticalAlign: 'middle', padding: '0 8px 2px 0' }}><img src={lineIcon} alt="Line" width="600" height="2" style={{ border: '0', display: 'block', verticalAlign: 'middle' }} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    {/* --- COMPANY INFO --- */}
                    <tr>
                        <td>
                            <table width="600" cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse', width: '600px', tableLayout: 'fixed' }}>
                                <tbody>
                                    <tr>
                                        {/* Logo Column - Fixed 150px Width */}
                                        {imageUrl && (
                                            <td width="152" style={{ verticalAlign: 'top', width: '152px', paddingRight: '10.8px' }}>
                                                <img src={imageUrl} alt="Company Logo" width="152" style={{ width: '152px', maxWidth: '152px', border: '0', display: 'block' }} />
                                            </td>
                                        )}
                                        {/* Content Column - Fills Remaining Space (550px if logo exists) */}
                                        <td style={{ verticalAlign: 'top' }}>
                                            <table cellPadding="0" cellSpacing="0" border={0} style={{ borderCollapse: 'collapse' }}>
                                                <tbody>
                                                    <tr>
                                                        {companyPhone && (
                                                            <>
                                                                <td style={{ verticalAlign: 'middle' }}><img src={companyPhoneIcon} alt="Phone" width="24" height="24" style={{ border: '0', display: 'block', verticalAlign: 'middle' }} /></td>
                                                                <td style={{ fontFamily: 'Arial, sans-serif', verticalAlign: 'middle', paddingLeft: '8px', paddingRight: '15px', fontSize: '10pt', color: '#000000', whiteSpace: 'nowrap' }}>{companyPhone}</td>
                                                            </>
                                                        )}
                                                        {website && (
                                                            <>
                                                                <td style={{ verticalAlign: 'middle' }}><img src={companyWebsiteIcon} alt="Website" width="24" height="24" style={{ border: '0', display: 'block', verticalAlign: 'middle' }} /></td>
                                                                <td style={{ verticalAlign: 'middle', paddingLeft: '8px', fontSize: '10pt', whiteSpace: 'nowrap' }}>
                                                                    <a href={websiteUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Arial, sans-serif', color: '#000000', textDecoration: 'none' }}>{website}</a>
                                                                </td>
                                                            </>
                                                        )}
                                                        {socialLinks.map((link, index) => (
                                                            <td key={index} style={{ verticalAlign: 'middle', paddingLeft: index === 0 && (companyPhone || website) ? '15px' : '5px' }}>
                                                                <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                                    <img src={link.iconUrl} alt="Social Icon" width="24" height="24" style={{ border: '0', display: 'block', verticalAlign: 'middle' }} />
                                                                </a>
                                                            </td>
                                                        ))}
                                                    </tr>
                                                </tbody>
                                            </table>
                                            {disclaimer && (
                                                <p style={{ fontFamily: 'Arial, sans-serif', margin: '10px 0 0 0', fontSize: '7.5pt', color: '#808080',/* lineHeight: '1.4',*/ textAlign: 'justify' }}>
                                                    {disclaimer}
                                                </p>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});