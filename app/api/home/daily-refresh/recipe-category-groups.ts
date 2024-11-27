interface CategoryGroups {
  type: string;
  categories: Array<{ tag: string; title: string }>;
}

const recipeCategoryGroups: Array<CategoryGroups> = [
  {
    type: 'Mood',
    categories: [
      { tag: 'Bad Day', title: 'Comfort Food for Tough Times' },
      { tag: 'Chill', title: 'Relax and Savor the Moment' },
      { tag: 'Curious', title: 'Taste the Unexpected' },
      { tag: 'Date Night', title: 'Make It a Night to Remember' },
      { tag: 'Energized', title: 'Power Up with Every Bite' },
      { tag: 'Feel Good', title: 'Food to Make You Smile' },
      { tag: 'Guilty', title: 'Cheat Day Covered' },
      { tag: 'Happy', title: 'Celebrate Every Bite' },
      { tag: 'Impress', title: 'Cook to Impress' },
      { tag: 'Lazy', title: 'Cook Smart, Relax Hard' },
      { tag: 'Party', title: 'The Life of the Party' },
    ],
  },
  {
    type: 'Cuisine',
    categories: [
      { tag: 'African', title: 'A Bite of Africa' },
      { tag: 'American', title: 'Burgers, Fries, and Freedom' },
      { tag: 'Asian', title: 'Asia on a Plate' },
      { tag: 'British', title: 'Timeless British Traditions' },
      { tag: 'Chinese', title: 'Savor the Taste of China' },
      { tag: 'European', title: 'Passport to Flavor' },
      { tag: 'French', title: 'The Art of French Cuisine' },
      { tag: 'German', title: 'Hearty German Classics' },
      { tag: 'Georgian', title: 'Georgia Tastes, Every Bite' },
      { tag: 'Greek', title: 'Feta Than Ever' },
      { tag: 'Indian', title: 'Spices and Soul from India' },
      { tag: 'Israeli', title: 'Taste the Vibrancy of Israel' },
      { tag: 'Italian', title: 'Mamma Mia, That’s Good!' },
      { tag: 'Mexican', title: 'Vibrant Mexican Dishes' },
      { tag: 'Spanish', title: 'A Feast of Spanish Flavors' },
      { tag: 'Vietnamese', title: 'Bánh Mì and Beyond' },
    ],
  },
  {
    type: 'Nutrition',
    categories: [
      { tag: 'Healthy', title: 'Healthy Can Be Tasty!' },
      { tag: 'High Protein', title: 'Fuel Up with Protein Meals' },
      { tag: 'Low Energy', title: 'Eat Light, Stay Bright!' },
      { tag: 'Low Fat', title: 'No Fat, All Flavor!' },
      { tag: 'Low Sugars', title: 'Sweetness Without the Sugar' },
      { tag: 'Vegan', title: 'Plant-Based Perfection' },
      { tag: 'Vegetarian', title: 'No Meat, No Problem!' },
    ],
  },
  {
    type: 'Complexity',
    categories: [
      { tag: 'Easy', title: 'No Sweat, Just Eat!' },
      { tag: 'Level Up', title: 'Master the Kitchen' },
      { tag: 'Skilled', title: 'Chef Mode: Activated' },
    ],
  },
];

export { recipeCategoryGroups };
