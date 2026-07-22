import { Property } from '../types';

export const CINCINNATI_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Grand Tudor Estate in Historic Hyde Park',
    tagline: 'Timeless architectural elegance paired with modern luxury amenities',
    price: 1475000,
    address: {
      street: '3420 Shaw Ave',
      city: 'Cincinnati',
      state: 'OH',
      zip: '45208',
      neighborhood: 'Hyde Park'
    },
    coordinates: {
      lat: 39.1415,
      lng: -84.4442
    },
    specs: {
      bedrooms: 5,
      bathrooms: 4.5,
      sqft: 4850,
      lotSizeAcres: 0.65,
      yearBuilt: 1928,
      garageSpaces: 3,
      propertyType: 'Single Family',
      hoaFeeMonthly: 0
    },
    status: 'For Sale',
    isFeatured: true,
    mlsNumber: 'CIN-1849201',
    dateListed: '2026-07-01',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Located in the heart of coveted Hyde Park, walking distance to Hyde Park Square, this stately 1920s Tudor residence has been impeccably renovated. Features include a chef\'s kitchen with Sub-Zero & Wolf appliances, custom quartz island, original restored hardwood floors, primary suite with marble spa bath, wine cellar, and professionally landscaped brick patio with outdoor fireplace.',
    features: [
      'Chef\'s Kitchen with Quartz Countertops',
      'Heated Primary Bathroom Floors',
      'Custom Wine Cellar with Temperature Control',
      'Restored Original Leadable Glass Windows',
      'Outdoor Kitchen & Brick Firepit Patio',
      'Integrated Sonos Sound System'
    ],
    amenities: [
      'Central A/C',
      'Fireplace',
      'Hardwood Floors',
      'Walk-In Closet',
      'Smart Thermostat',
      'Security System',
      'Irrigation System'
    ],
    virtualTourUrl: 'https://my.matterport.com/show/?m=sample-tudorestate',
    agent: {
      name: 'Pastor Sil',
      phone: '(513) 706-6312',
      email: 'pastorsilcotlg@gmail.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      title: 'Principal Broker & Founder'
    }
  },
  {
    id: 'prop-2',
    title: 'Riverfront Luxury Penthouse in Mount Adams',
    tagline: 'Panoramic views of Ohio River and Downtown Cincinnati skyline',
    price: 1890000,
    address: {
      street: '1105 Celestial St, Unit 801',
      city: 'Cincinnati',
      state: 'OH',
      zip: '45202',
      neighborhood: 'Mount Adams'
    },
    coordinates: {
      lat: 39.1086,
      lng: -84.4952
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3.5,
      sqft: 3600,
      yearBuilt: 2021,
      garageSpaces: 2,
      propertyType: 'Luxury Condo',
      hoaFeeMonthly: 780
    },
    status: 'For Sale',
    isFeatured: true,
    mlsNumber: 'CIN-1984210',
    dateListed: '2026-07-10',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Perched high in Mount Adams, this breathtaking penthouse features floor-to-ceiling glass walls overlooking the Ohio River, Roebling Suspension Bridge, and downtown Cincinnati. Includes private elevator access, 1,000 sq ft wrap-around terrace, gas fireplace, custom Italian cabinetry, motorized shades, and 2 secure climate-controlled parking spaces.',
    features: [
      '1,000 Sq Ft Private Riverview Terrace',
      'Direct Private Elevator Keyed Access',
      'Custom Poliform Italian Kitchen Cabinetry',
      'Motorized Lutron Roller Shades',
      'Floor-to-Ceiling Thermal Glass Walls'
    ],
    amenities: [
      'Concierge Service',
      'Fitness Center',
      'Elevator',
      'Balcony/Terrace',
      'Underground Parking',
      'Pet Friendly'
    ],
    virtualTourUrl: 'https://my.matterport.com/show/?m=sample-penthouse',
    agent: {
      name: 'Pastor Sil',
      phone: '(513) 706-6312',
      email: 'pastorsilcotlg@gmail.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      title: 'Principal Broker & Founder'
    }
  },
  {
    id: 'prop-3',
    title: 'Indian Hill Private Sanctuary Manor',
    tagline: 'Secluded 5-acre luxury compound with pool and private tennis court',
    price: 3450000,
    address: {
      street: '7850 Camargo Rd',
      city: 'Cincinnati',
      state: 'OH',
      zip: '45243',
      neighborhood: 'Indian Hill'
    },
    coordinates: {
      lat: 39.1824,
      lng: -84.3321
    },
    specs: {
      bedrooms: 6,
      bathrooms: 7.5,
      sqft: 8900,
      lotSizeAcres: 5.2,
      yearBuilt: 2018,
      garageSpaces: 4,
      propertyType: 'Single Family',
      hoaFeeMonthly: 0
    },
    status: 'For Sale',
    isFeatured: true,
    mlsNumber: 'CIN-2041920',
    dateListed: '2026-06-15',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Unparalleled privacy and craftsmanship in Indian Hill, Cincinnati\'s premier luxury address. Spanning 5.2 wooded acres, this masterpiece offers a heated saltwater pool, pool house, regulation tennis/pickleball court, 800-bottle wine cellar, home theater, guest house suite, and top-tier Indian Hill school district access.',
    features: [
      'Heated Saltwater Infinity Edge Pool & Spa',
      'Full-Size Tennis & Pickleball Court',
      'Independent Guest House Apartment',
      'Soundproof Dolby Atmos Home Theater',
      'Commercial-Grade Chef Kitchen & Catering Pantry'
    ],
    amenities: [
      'Pool',
      'Tennis Court',
      'Home Theater',
      'Guest House',
      'Gated Entry',
      'Smart Home Automation'
    ],
    virtualTourUrl: 'https://my.matterport.com/show/?m=sample-indianhill',
    agent: {
      name: 'Pastor Sil',
      phone: '(513) 706-6312',
      email: 'pastorsilcotlg@gmail.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      title: 'Principal Broker & Founder'
    }
  },
  {
    id: 'prop-4',
    title: 'Modernized Italianate Townhome in OTR',
    tagline: 'Historic charm meets contemporary design in Over-the-Rhine',
    price: 749000,
    address: {
      street: '1312 Race St',
      city: 'Cincinnati',
      state: 'OH',
      zip: '45202',
      neighborhood: 'Over-the-Rhine'
    },
    coordinates: {
      lat: 39.1098,
      lng: -84.5165
    },
    specs: {
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2450,
      yearBuilt: 1885,
      garageSpaces: 1,
      propertyType: 'Townhome',
      hoaFeeMonthly: 150
    },
    status: 'For Sale',
    isFeatured: false,
    mlsNumber: 'CIN-1923011',
    dateListed: '2026-07-12',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Steps away from Washington Park, Music Hall, and world-class dining in Over-the-Rhine. Exquisite exposed brick walls, 11-foot ceilings, custom floating staircase, rooftop deck with city views, updated gourmet kitchen, and rare attached 1-car garage.',
    features: [
      'Private Roof Deck with Downtown Views',
      'Exposed Original Brick & Timber Beams',
      '1-Car Attached Garage (Rare in OTR)',
      '11-Foot Ceilings & Custom Lighting',
      '15-Year Tax Abatement Eligible'
    ],
    amenities: [
      'Rooftop Deck',
      'Exposed Brick',
      'Attached Garage',
      'Smart Locks',
      'Walk Score 96'
    ],
    agent: {
      name: 'Elena Rostova',
      phone: '(513) 706-6312',
      email: 'pastorsilcotlg@gmail.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      title: 'Senior Residential Specialist'
    }
  },
  {
    id: 'prop-5',
    title: 'Family Executive Home in Mason Schools',
    tagline: 'Spacious 4-bed craftsman home in top-ranked Mason school district',
    price: 685000,
    address: {
      street: '5412 Crooked Tree Dr',
      city: 'Mason',
      state: 'OH',
      zip: '45040',
      neighborhood: 'Mason'
    },
    coordinates: {
      lat: 39.3601,
      lng: -84.3099
    },
    specs: {
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 3800,
      lotSizeAcres: 0.42,
      yearBuilt: 2015,
      garageSpaces: 3,
      propertyType: 'Single Family',
      hoaFeeMonthly: 75
    },
    status: 'For Sale',
    isFeatured: false,
    mlsNumber: 'CIN-1882049',
    dateListed: '2026-07-08',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Immaculate executive home in desirable Mason subdivision. Finished lower level with wet bar, theater zone, and extra bedroom option. Features a open floor plan, sunroom, granite kitchen island, composite deck, and community pool & clubhouse access.',
    features: [
      'Finished Lower Level with Custom Wet Bar',
      'Mason City Schools District',
      'Composite Deck overlooking Treed Yard',
      'Subdivision Pool, Tennis Courts & Trails',
      'Main Level Home Office Suite'
    ],
    amenities: [
      'Community Pool',
      'Finished Basement',
      '3-Car Garage',
      'Sunroom',
      'Fireplace'
    ],
    agent: {
      name: 'Marcus Vance',
      phone: '(513) 706-6312',
      email: 'pastorsilcotlg@gmail.com',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      title: 'Suburban & Investment Specialist'
    }
  },
  {
    id: 'prop-6',
    title: 'Charming Victorian in Columbia-Tusculum',
    tagline: 'Cincinnati\'s oldest neighborhood with colorful Painted Ladies architecture',
    price: 525000,
    address: {
      street: '3512 Tusculum Ave',
      city: 'Cincinnati',
      state: 'OH',
      zip: '45226',
      neighborhood: 'Columbia-Tusculum'
    },
    coordinates: {
      lat: 39.1172,
      lng: -84.4328
    },
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2100,
      lotSizeAcres: 0.18,
      yearBuilt: 1892,
      garageSpaces: 2,
      propertyType: 'Single Family',
      hoaFeeMonthly: 0
    },
    status: 'For Sale',
    isFeatured: false,
    mlsNumber: 'CIN-1773021',
    dateListed: '2026-07-05',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Storybook Victorian home in vibrant Columbia-Tusculum. Beautifully preserved original woodwork, stained glass entry, cozy front porch, updated kitchen with gas range, and private fenced backyard.',
    features: [
      'Original Stained Glass Windows',
      'Wrap-Around Porch',
      'Fenced Private Yard',
      'Minutes to Alms Park & Lunken Airport Trail'
    ],
    amenities: [
      'Hardwood Floors',
      'Porch',
      'Fenced Yard',
      'Detached 2-Car Garage'
    ],
    agent: {
      name: 'Pastor Sil',
      phone: '(513) 706-6312',
      email: 'pastorsilcotlg@gmail.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      title: 'Principal Broker & Founder'
    }
  },
  {
    id: 'prop-7',
    title: 'Luxury High-Rise Rental at The Banks',
    tagline: 'Modern downtown living overlooking Paycor Stadium & Smale Riverfront Park',
    price: 3200,
    rentPricePerMonth: 3200,
    address: {
      street: '180 E Freedom Way, Unit 1204',
      city: 'Cincinnati',
      state: 'OH',
      zip: '45202',
      neighborhood: 'Downtown'
    },
    coordinates: {
      lat: 39.0967,
      lng: -84.5098
    },
    specs: {
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1350,
      yearBuilt: 2022,
      garageSpaces: 1,
      propertyType: 'Rental',
      hoaFeeMonthly: 0
    },
    status: 'For Rent',
    isFeatured: true,
    mlsNumber: 'CIN-RENT-001',
    dateListed: '2026-07-14',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Premier downtown rental at The Banks! Enjoy floor-to-ceiling riverfront vistas, quartz countertops, stainless steel appliances, balcony, infinity rooftop lounge, dog park, and state-of-the-art fitness room.',
    features: [
      'Rooftop Infinity Pool & Fire Pits',
      'Dog Wash Station & On-Site Pet Park',
      '24/7 Security & Keycard Access',
      'Direct Access to Smale Park Trails'
    ],
    amenities: [
      'Rooftop Pool',
      'Fitness Center',
      'Pet Friendly',
      'In-Unit Washer/Dryer',
      'Covered Parking'
    ],
    agent: {
      name: 'Elena Rostova',
      phone: '(513) 706-6312',
      email: 'pastorsilcotlg@gmail.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      title: 'Senior Residential Specialist'
    }
  },
  {
    id: 'prop-8',
    title: 'Boutique Loft Rental in Walnut Hills',
    tagline: 'Artisanal studio apartment near Eden Park & Cincinnati Art Museum',
    price: 1850,
    rentPricePerMonth: 1850,
    address: {
      street: '2410 Gilbert Ave, Unit 3B',
      city: 'Cincinnati',
      state: 'OH',
      zip: '45206',
      neighborhood: 'Walnut Hills'
    },
    coordinates: {
      lat: 39.1245,
      lng: -84.4891
    },
    specs: {
      bedrooms: 1,
      bathrooms: 1,
      sqft: 850,
      yearBuilt: 2023,
      garageSpaces: 1,
      propertyType: 'Rental',
      hoaFeeMonthly: 0
    },
    status: 'For Rent',
    isFeatured: false,
    mlsNumber: 'CIN-RENT-002',
    dateListed: '2026-07-11',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Chic 1-bedroom industrial loft in rapidly growing Walnut Hills arts corridor. Concrete accents, oversized windows, high-speed fiber internet ready, and walkable to Five Points Alley coffee shops.',
    features: [
      'Polished Concrete Flooring',
      'Fiber Internet Ready',
      'Walkable to Esoteric Brewing & Local Cafes'
    ],
    amenities: [
      'Central AC',
      'In-Unit Laundry',
      'Off-Street Parking',
      'Secure Entry'
    ],
    agent: {
      name: 'Marcus Vance',
      phone: '(513) 706-6312',
      email: 'pastorsilcotlg@gmail.com',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      title: 'Suburban & Investment Specialist'
    }
  }
];
