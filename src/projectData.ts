interface Project {
  name: string;
  description: string;
  imagesFolder: string;
  links?:{GitHub: string, Live: string};
}

const assets = import.meta.glob('./assets/projects/**/*.png', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

// Helper function to load all images from a specific project folder
function getImagesFromFolder(folderName: string): string[] {
  return Object.entries(assets)
    .filter(([key]) => key.includes(`/${folderName}/`))
    .map(([, value]) => value)
    .sort();
}

export const data = new Map<string, Project>();

data.set("recipe-browser", {
  name: "Recipe Book",
  description: "A recipe browser created by Ryan Chan, Mark Sto Domingo, and Brandon Ovwigho\nOur goal was to provide a user-friendly platform where people can easily find delicious recipes with an engaging environment to share and enjoy.\nTo achieve this, we utilized TheMealDB API, a crowd-sourced database of recipes.\n\nTechnologies Used:\n- Frontend: HTML, JavaScript, CSS\n- Backend: Node.js, Express\n- Database and API: SQLite, TheMealDB\n\nKey Features:\n- Browse and Search Recipes: Users can explore a wide variety of recipes and use search functionality to find specific dishes.\n- Recipe Details: Each recipe includes ingredients, preparation steps, and cooking time.\n- User Accounts: Users can create accounts to comment on recipes.\n- Responsive Design: The application is designed to be mobile-friendly and accessible on various devices.\n\nThis project showcases our ability to work collaboratively in a team, implement full-stack development, and create a functional web application that meets user needs.",
  imagesFolder: "recipe-book",
  links:{
    "GitHub": "https://github.com/Brandonovwigho/WebDevYuan",
    "Live":"https://recipe-project-demo.onrender.com/"
  }
});

export { getImagesFromFolder };
