interface Project {
  name: string;
  description: string;
  images: string[];
}

export const data = new Map<string, Project>();
data.set("recipe-browser", {
  name: "Recipe Browser",
  description: "A recipe browser",
  images: ["/ryanchan.png", "/vietnam.png"],
});
