const dotenv=require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Tag = require("../models/Tag");

const predefinedTags = [
  "Career",
  "JobSearch",
  "Freelancing",
  "RemoteWork",
  "Resume",
  "Interview",
  "Entrepreneurship",
  "Productivity",
  "SelfImprovement",
  "MentalHealth",
  "Fitness",
  "WeightLoss",
  "Parenting",
  "Relationships",
  "ConflictResolution",
  "Marriage",
  "Friendship",
  "SelfCare",
  "Motivation",
  "TimeManagement",
  "Study",
  "Learning",
  "PublicSpeaking",
  "Writing",
  "SocialSkills",
  "Finance",
  "Investing",
  "Crypto",
  "StockMarket",
  "DebtManagement",
  "MoneySaving",
  "Startup",
  "Business",
  "Marketing",
  "ContentCreation",
  "SocialMedia",
  "Health",
  "Diet",
  "Skincare",
  "HairCare",
  "Support",
  "Yoga",
  "Travel",
  "LifeHacks",
  "Tools",
  "StudyMotivation",
  "Academics",
  "TechSupport",
  "WebDevelopment",
  "Programming",
  "MachineLearning",
  "AI",
  "Cybersecurity",
  "CareerChange",
  "TechCareer",
  "WorkLifeBalance",
  "DigitalMarketing",
  "RealEstate",
  "Renovation",
  "Legal",
  "Counseling",
  "Addiction",
  "Grief",
  "Dating",
  "Troubles",
  "PetCare",
  "Transitions",
  "GoalSetting",
  "Leadership",
  "Networking",
  "Workplace",
  "Teamwork",
  "Negotiation",
];

async function seedTags() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    for (const tag of predefinedTags) {
      await Tag.updateOne({ name: tag }, { name: tag }, { upsert: true });
    }

    console.log("Tags seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

seedTags();
