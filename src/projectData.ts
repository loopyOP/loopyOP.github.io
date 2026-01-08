interface Project {
  name: string;
  description: string;
  imagesFolder: string;
  links?:{GitHub?: string, Live?: string};
}

const assets = import.meta.glob('./assets/projects/**/*.{png,svg}', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

// Helper function to load all images from a specific project folder
function getImagesFromFolder(folderName: string): string[] {
  return Object.entries(assets)
    .filter(([key]) => key.includes(`/${folderName}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map(([, value]) => value);
}

export const data = new Map<string, Project>();

data.set("recipe-book", {
  name: "Recipe Book",
  description: "A recipe browser created by Ryan Chan, Mark Sto Domingo, and Brandon Ovwigho.\nOur goal was to provide a user-friendly platform where people can easily find delicious recipes with an engaging environment to share and enjoy.\nTo achieve this, we utilized TheMealDB API, a crowd-sourced database of recipes.\n\nTechnologies Used:\n- Frontend: HTML, JavaScript, CSS\n- Backend: Node.js, Express\n- Database: SQLite\n- API: TheMealDB\n\nKey Features:\n- Browse and Search Recipes: Users can explore a wide variety of recipes and use search functionality to find specific dishes.\n- Recipe Details: Each recipe includes ingredients, preparation steps, and cooking time.\n- User Accounts: Users can create accounts to comment on recipes.\n- Responsive Design: The application is designed to be mobile-friendly and accessible on various devices.\n\nThis project showcases our ability to work collaboratively in a team, implement full-stack development, and create a functional web application that meets user needs.",
  imagesFolder: "recipe-book",
  links:{
    "GitHub": "https://github.com/Brandonovwigho/WebDevYuan",
    "Live":"https://recipe-project-demo.onrender.com/"
  }
});
data.set("pantry-guard", {
  name: "Pantry Guard",
  description: "Pantry Guard is a mobile application developed by Ryan Chan, and Christopher Cuevas. The app is designed to help users manage their pantry inventory effectively, reducing food waste and ensuring that ingredients are used before they expire.\n\nTechnologies Used:\n- Frontend: React Native + Expo\n- Backend: Node.js, Express\n- Database: Neon (PostgreSQL)\n- API: Open Food Facts\n\nKey Features:\n- Barcode Scanning: Utilizing the user's phone camera, it can scan barcodes of products (it will check Open Food Facts API for information on the product). \n- Inventory Management: Users can add, update, and delete pantry items, along with their quantities and expiration dates.\n- Expiration Alerts: The app sends notifications to users when items are nearing their expiration dates.\n- User Authentication: Secure login and registration system for user experience.\n- Real-time Data Sync: Multiple users can be logged into the same account and seamlessly update information in real-time. \n\nThis project highlights our skills in mobile app development, backend integration, and user-centric design.",
  imagesFolder: "pantry-guard",
  links:{
    "GitHub": "https://github.com/loopyOP/Pantry-Tracker",
  }
});
data.set("portfolio", {
  name: "Portfolio Website",
  description: "My personal website showcasing my projects and skills.\nThis portfolio site serves as a platform to present my work, share my experiences, and connect with potential collaborators or employers. It features a clean and modern design, easy navigation, and responsive layout to ensure a great user experience across all devices.\n\nTechnologies Used:\n- Frontend: React, TypeScript, CSS\n\nKey Features:\n- Project Showcase: A dedicated section to highlight my projects with descriptions, images, and links to live demos or repositories.\n- About Me: A section providing insights into my background, skills, and interests.\n- Contact Information: Easy access to my email and social media profiles for networking opportunities.\n\nFeel free to explore the site and reach out if you'd like to connect!",
  imagesFolder: "portfolio",
  links:{
    "GitHub": "https://github.com/loopyOP/loopyOP.github.io",
    "Live":"https://loopyop.github.io/"
  }
});
data.set("moodcurve", {
  name: "MoodCurve",
  description: "MoodCurve, developed by Levi Cervantes, Ryan Chan, and Love Pavlicek, is a machine learning project that scores how well songs transition from one to the next. Our goal with this project was to turn the subjective idea of \"playlist flow\" into something measurable, so we could identify weak transitions and make data-driven improvements to song ordering.\n\nTechnologies Used:\n- Machine Learning: Python, scikit-learn (Gradient Boosting)\n- Data Processing: Pandas, NumPy\n- Visualization: Matplotlib, Seaborn\n\nKey Findings:\n- Large jumps in energy, happiness/valence, danceability, and tempo tended to reduce transition quality.\n- Musical context mattered: key/mode/genre alignment (and sometimes artist similarity) often improved perceived smoothness.\n- A feature-based regression approach can predict transition quality well enough to rank transitions and flag problematic song pairs.\n\nConclusions:\n- Transition scoring is feasible with engineered audio features and supervised learning, and it provides a practical tool for playlist refinement.\n- The score remains influenced by listener subjectivity and dataset bias, so broader data/labels are important for stronger generalization.",
  imagesFolder: "moodcurve",
  links:{
    "GitHub": "https://github.com/lov-pav/moodcurve"
  }
});

export { getImagesFromFolder };
