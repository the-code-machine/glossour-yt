interface VideoDetails {
  title: string;
  description: string;
  src: string;
  uploadDate: string;
  author: string;
  views: number;
  likes: number;
  subscribers: number;
  videoLength: number;
  category: string;
  country: string;
}
interface Plan {
  name: string;
  desc: string;
  price: number;
  src: string;
  isMostPop: boolean;
  features: string[];
}
export const generatePlans = (videoData: VideoDetails): Plan[] => {
  const basePlan = calculatePrice(
    7000,
    videoData.videoLength,
    videoData.country,
    videoData.subscribers
  ); // Adjust price based on views
  const proPlan = calculatePrice(
    13000,
    videoData.videoLength,
    videoData.country,
    videoData.subscribers
  );
  const premiumPlan = calculatePrice(
    100000,
    videoData.videoLength,
    videoData.country,
    videoData.subscribers
  );
  return [
    {
      name: "Basic",
      desc: `Boost your video with targeted promotion.`,
      price: basePlan,
      isMostPop: true,
      src: videoData.src,
      features: [
        "50k+ views",
        "2500+ likes",
        "250+ comments",
        "3k+ Subscriber",
        "Viral hashtags",
        "Account Decoration",
        "Targeted to similar content",
      ],
    },
    {
      name: "Pro",
      desc: `Increase visibility with enhanced promotion.`,
      price: proPlan,
      isMostPop: true,
      src: videoData.src,
      features: [
        "100k+ views",
        "5k+ likes",
        "500+ comments",
        "7k+ Subscriber",
        "Viral hashtags",
        "Account Decoration",
        "Press Release",
        "Ads campaigns",
        "Priority targeting",
      ],
    },
    {
      name: "Premium",
      desc: `Maximize reach with premium promotion.`,
      price: premiumPlan,
      isMostPop: true,
      src: videoData.src,
      features: [
        "1 million views",
        "50k likes",
        "5000+ comments",
        "15k+ Subscriber",
        "Viral hashtags",
        "Account Decoration",
        "Press Release",
        "Ads campaigns",
        "Full campaign management",
      ],
    },
  ];
};

function calculatePrice(
  planBasePrice: number,
  videoLength: number,
  country: string,
  subscribers: number
) {
  // Conversion rate from INR to USD
  const conversionRate = 83; // Example: 1 USD = 83 INR

  // Adjustments based on video length
  let videoLengthAdjustment = 1; // default (1-3 min)
  if (videoLength > 3 && videoLength <= 5) {
    videoLengthAdjustment = 1.1; // 10% increase for 3-5 min
  } else if (videoLength > 5) {
    videoLengthAdjustment = 1.2; // 20% increase for 5+ min
  }

  // Adjustments based on country
  let countryAdjustment = country.toLowerCase() !== "india" ? 1.3 : 1.0;

  // Adjustments based on subscriber count
  let subscriberAdjustment = 1; // default for 100k subscribers
  if (subscribers < 50000) {
    subscriberAdjustment = 1.2; // 20% increase for less than 50k subscribers
  } else if (subscribers < 100000) {
    subscriberAdjustment = 1.1; // 10% increase for less than 100k subscribers
  }

  // Final price calculation in INR
  let finalPriceInINR =
    planBasePrice *
    videoLengthAdjustment *
    countryAdjustment *
    subscriberAdjustment;

  // Convert final price to USD
  let finalPriceInUSD = finalPriceInINR / conversionRate;

  // Round to the nearest multiple of 10
  finalPriceInUSD = Math.round(finalPriceInUSD / 10) * 10;

  return finalPriceInUSD;
}
