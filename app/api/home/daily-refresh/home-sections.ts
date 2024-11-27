interface HomeSection {
  type: string;
  categories: Array<{ tag: string; title: string }>;
}

const homeSections: Array<HomeSection> = [
  {
    type: 'Mood',
    categories: [
      { tag: 'Bad Day', title: 'Comfort Food for Tough Times' },
      { tag: 'Chill', title: 'Relax and Savor the Moment' },
      { tag: 'Curious', title: 'Taste the Unexpected' },
      { tag: 'Date Night', title: 'Romantic Recipes to Set the Mood' },
      { tag: 'Energized', title: 'Power Up with Every Bite' },
      { tag: 'Feel Good', title: 'Meals That Brighten Your Day' },
      { tag: 'Guilty', title: 'Indulge Without Apologies' },
      { tag: 'Happy', title: 'Celebrate Every Bite' },
      { tag: 'Impress', title: 'Dishes to Dazzle Your Guests' },
      { tag: 'Lazy', title: 'Effortless Eats, Maximum Flavor' },
      { tag: 'Party', title: 'Crowd-Pleasing Creations' },
    ],
  },
  {
    type: 'Cuisine',
    categories: [
      { tag: 'African', title: 'Discover the Flavors of Africa' },
      { tag: 'American', title: 'Classic Comforts, American Style' },
      { tag: 'Asian', title: "A Journey Through Asia's Kitchens" },
      { tag: 'British', title: 'Timeless British Traditions' },
      { tag: 'Chinese', title: 'Savor the Taste of China' },
      { tag: 'European', title: "Explore Europe's Culinary Delights" },
      { tag: 'French', title: 'The Art of French Cuisine' },
      { tag: 'German', title: 'Hearty German Classics' },
      { tag: 'Georgian', title: 'Experience Georgian Hospitality' },
      { tag: 'Greek', title: 'Mediterranean Bliss from Greece' },
      { tag: 'Indian', title: 'Spices and Soul from India' },
      { tag: 'Israeli', title: 'Taste the Vibrancy of Israel' },
      { tag: 'Italian', title: 'Indulge in Italian Elegance' },
      { tag: 'Mediterranean', title: 'Fresh and Flavorful Mediterranean Eats' },
      { tag: 'Mexican', title: 'Fiery and Festive Mexican Plates' },
      { tag: 'Spanish', title: 'A Feast of Spanish Flavors' },
      { tag: 'Vietnamese', title: "Vietnam's Fresh and Fragrant Dishes" },
    ],
  },
  {
    type: 'Nutrition',
    categories: [
      { tag: 'Healthy', title: 'Nourish Your Body, Delight Your Taste Buds' },
      { tag: 'High Protein', title: 'Fuel Up with Protein-Packed Meals' },
      { tag: 'Low Energy', title: 'Light Meals for Easy Days' },
      { tag: 'Low Fat', title: 'Flavorful Dishes with Less Fat' },
      { tag: 'Low Sugars', title: 'Satisfy Your Cravings, Guilt-Free' },
      { tag: 'Vegan', title: 'Plant-Based Perfection' },
      { tag: 'Vegetarian', title: 'Meat-Free, Full of Flavor' },
    ],
  },
  {
    type: 'Complexity',
    categories: [
      { tag: 'Easy', title: 'Simple Dishes, Big Flavor' },
      { tag: 'Level Up', title: 'Master the Kitchen' },
      { tag: 'Skilled', title: 'For the Culinary Expert' },
    ],
  },
];

export { homeSections };
