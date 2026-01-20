
export interface SignatureData {
  name: string;
  title: string;
  position: string;
  phone: string;
  phone2: string;
  email:string;
  website: string;
  address: string;
  imageUrl: string | null;
  companyPhone: string;
  facebook: string;
  youtube: string;
  twitter: string;
  linkedin: string;
  disclaimer: string;
  // Custom Icon URLs
  mobileIcon: string;
  mobileIcon2: string;
  emailIcon: string;
  addressIcon: string;
  // Fixed duplicate lineIcon identifier
  lineIcon: string;
  bannerImage: string; // Added bannerImage property
  companyPhoneIcon: string;
  companyWebsiteIcon: string;
  facebookIcon: string;
  youtubeIcon: string;
  twitterIcon: string;
  linkedinIcon: string;
}