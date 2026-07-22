export type PropertyType = 'Single Family' | 'Luxury Condo' | 'Townhome' | 'Multi-Family' | 'Commercial' | 'Rental';

export type ListingStatus = 'For Sale' | 'For Rent' | 'Pending' | 'Sold' | 'Featured';

export interface Property {
  id: string;
  title: string;
  tagline: string;
  price: number;
  rentPricePerMonth?: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    neighborhood: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    lotSizeAcres?: number;
    yearBuilt: number;
    garageSpaces: number;
    propertyType: PropertyType;
    hoaFeeMonthly?: number;
  };
  status: ListingStatus;
  images: string[];
  description: string;
  features: string[];
  amenities: string[];
  virtualTourUrl?: string;
  mlsNumber: string;
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
    title: string;
  };
  isFeatured?: boolean;
  dateListed: string;
}

export interface PropertyFilterState {
  searchQuery: string;
  neighborhood: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string; // 'any', '1+', '2+', '3+', '4+', '5+'
  bathrooms: string; // 'any', '1+', '2+', '3+', '4+'
  minSqft: number;
  status: string; // 'all', 'For Sale', 'For Rent'
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'sqft-desc';
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Buying Tips' | 'Selling Tips' | 'Market Trends' | 'Investment' | 'Cincinnati Neighborhood Guides';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  phone: string;
  email: string;
  image: string;
  specialties: string[];
  salesVolume: string;
}

export interface NeighborhoodProfile {
  id: string;
  name: string;
  tagline: string;
  medianPrice: string;
  schoolRating: string;
  vibe: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface ShowingRequest {
  propertyId: string;
  propertyTitle: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface ValuationRequest {
  address: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  estimatedSqft: number;
  condition: string;
  name: string;
  email: string;
  phone: string;
  timeframeToSell: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: 'Buying' | 'Selling' | 'Renting' | 'Investing' | 'General';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedProperties?: Property[];
}
