// The Food Audit - Core Data Model & Mock Database
// Synthesized multi-platform review store for CSCE 3055.401 Phase 2

const RESTAURANTS_DATA = [
  {
    id: "el-camino",
    name: "El Camino Taqueria",
    cuisine: "Mexican",
    category: "Tacos",
    rating: 4.8,
    reviewCount: 612,
    totalSynthesizedReviews: 1240,
    priceLevel: "$$",
    distanceMiles: 0.6,
    hasStudentDeal: true,
    studentDealDetails: "10% off any order with valid student ID after 2 PM",
    address: "214 E Hickory St, Denton, TX 76201",
    hours: "11:00 AM - 11:00 PM",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    tags: ["Mexican", "$$", "0.6 mi", "Student Deal"],
    auditMetrics: {
      foodQuality: 96,
      serviceSpeed: 91,
      valueForMoney: 89,
      noiseLevel: 78, // Higher = noisier
      parkingDifficulty: 72 // Higher = harder
    },
    auditSummary: {
      headline: "Synthesized from 1,240+ reviews across Google, Yelp, and In-App Reports",
      pros: [
        "Standout al pastor – regulars call it the best in the area",
        "Fast turnaround, even during the peak lunch rush",
        "Generous salsa bar with house-made roasted habanero and avocado crema"
      ],
      cons: [
        "Gets loud and cramped after 8:00 PM on weekends",
        "Street parking only – plan a few extra minutes during peak hours",
        "Limited indoor seating during inclement weather"
      ]
    },
    signatureDish: "Tacos Al Pastor with grilled pineapple",
    bestFor: "Quick lunch and casual group dinner"
  },
  {
    id: "marzanos-pizzeria",
    name: "Marzano's Pizzeria",
    cuisine: "Italian",
    category: "Pizza",
    rating: 4.7,
    reviewCount: 489,
    totalSynthesizedReviews: 980,
    priceLevel: "$$",
    distanceMiles: 0.4,
    hasStudentDeal: false,
    studentDealDetails: null,
    address: "318 Elm St, Denton, TX 76201",
    hours: "11:30 AM - 10:00 PM",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    tags: ["Pizza", "$$", "0.4 mi"],
    auditMetrics: {
      foodQuality: 94,
      serviceSpeed: 82,
      valueForMoney: 88,
      noiseLevel: 55,
      parkingDifficulty: 40
    },
    auditSummary: {
      headline: "Synthesized from 980+ reviews across Google, Yelp, and In-App Reports",
      pros: [
        "Authentic wood-fired sourdough crust with ideal crisp and char",
        "Generous topping portions and high-grade San Marzano sauce",
        "Quiet and relaxed atmosphere suitable for dates and study sessions"
      ],
      cons: [
        "Pizzas made fresh-to-order can take 20-25 mins during weekend rush",
        "Gluten-free crust options sell out by late evening"
      ]
    },
    signatureDish: "Margherita D.O.P. & Truffle Mushroom Pie",
    bestFor: "Date night and quiet group dining"
  },
  {
    id: "green-fork",
    name: "Green Fork Vegan Kitchen",
    cuisine: "Plant-Based",
    category: "Vegan",
    rating: 4.5,
    reviewCount: 320,
    totalSynthesizedReviews: 640,
    priceLevel: "$$",
    distanceMiles: 0.7,
    hasStudentDeal: true,
    studentDealDetails: "Free kombucha refill with student combo purchase",
    address: "502 W Oak St, Denton, TX 76201",
    hours: "9:00 AM - 9:00 PM",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    tags: ["Vegan", "$$", "0.7 mi", "Eco-friendly"],
    auditMetrics: {
      foodQuality: 91,
      serviceSpeed: 87,
      valueForMoney: 81,
      noiseLevel: 42,
      parkingDifficulty: 35
    },
    auditSummary: {
      headline: "Synthesized from 640+ reviews across Google, Yelp, and In-App Reports",
      pros: [
        "100% plant-based menu with house-made cashew cheese and gluten-free wraps",
        "Ultra clean dining room and certified compostable packaging",
        "Consistent freshness of locally sourced greens and produce"
      ],
      cons: [
        "Slightly higher price point compared to neighboring cafes",
        "Seating capacity is small (approx. 20 seats)"
      ]
    },
    signatureDish: "Spicy Jackfruit Carnitas Bowl",
    bestFor: "Healthy eating and quick casual lunch"
  },
  {
    id: "denton-coffee-roasters",
    name: "Common Ground Coffee",
    cuisine: "Cafe & Bakery",
    category: "Coffee",
    rating: 4.9,
    reviewCount: 742,
    totalSynthesizedReviews: 1450,
    priceLevel: "$",
    distanceMiles: 0.3,
    hasStudentDeal: true,
    studentDealDetails: "15% off drip coffee & cold brew with Student ID",
    address: "110 N Locust St, Denton, TX 76201",
    hours: "7:00 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    tags: ["Coffee", "$", "0.3 mi", "Study Friendly"],
    auditMetrics: {
      foodQuality: 98,
      serviceSpeed: 93,
      valueForMoney: 95,
      noiseLevel: 60,
      parkingDifficulty: 50
    },
    auditSummary: {
      headline: "Synthesized from 1,450+ reviews across Google, Yelp, and In-App Reports",
      pros: [
        "Award-winning single-origin espresso and silky oat milk lattes",
        "Abundant power outlets and reliable high-speed campus WiFi",
        "Fresh daily artisanal pastries delivered by 7:30 AM"
      ],
      cons: [
        "Tables fill up completely by 10:00 AM during midterms/finals week",
        "Acoustics can be echoey when barista grinders are running"
      ]
    },
    signatureDish: "Honey Lavender Draft Cold Brew",
    bestFor: "Studying, remote work, and morning caffeine run"
  },
  {
    id: "night-owl-diner",
    name: "The Night Owl 24/7 Grill",
    cuisine: "American Diner",
    category: "Late Night",
    rating: 4.4,
    reviewCount: 512,
    totalSynthesizedReviews: 1100,
    priceLevel: "$",
    distanceMiles: 1.1,
    hasStudentDeal: true,
    studentDealDetails: "$6 Midnight Pancake Stack between 12 AM - 4 AM",
    address: "812 W University Dr, Denton, TX 76201",
    hours: "Open 24 Hours",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    tags: ["Late Night", "$", "1.1 mi", "Open 24/7"],
    auditMetrics: {
      foodQuality: 84,
      serviceSpeed: 89,
      valueForMoney: 94,
      noiseLevel: 85,
      parkingDifficulty: 25
    },
    auditSummary: {
      headline: "Synthesized from 1,100+ reviews across Google, Yelp, and In-App Reports",
      pros: [
        "True 24/7 availability with full breakfast and burger menu served all night",
        "Massive, dedicated free parking lot behind the building",
        "Extremely affordable meal combos under $10"
      ],
      cons: [
        "Can become rowdy after 1:30 AM following bar close",
        "Grease levels are high – comfort food, not light dining"
      ]
    },
    signatureDish: "Midnight Double Smashburger & Curly Fries",
    bestFor: "Post-study late-night cravings and weekend nightcaps"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RESTAURANTS_DATA };
}
