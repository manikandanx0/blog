import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "archive");

function getAllMarkdownFiles(dir, basePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(getAllMarkdownFiles(fullPath, relativePath));
    } else if (entry.name.endsWith(".md")) {
      files.push(relativePath);
    }
  }

  return files;
}

function parseFile(relativePath) {
  const fullPath = path.join(contentDirectory, relativePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: relativePath.replace(/\.md$/, "").replace(/\\/g, "/"),
    section: relativePath.split(path.sep)[0],
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    content,
  };
}

// Original flat list — used by [...slug]/page.js
export function getAllPosts() {
  const files = getAllMarkdownFiles(contentDirectory);
  return files
    .map(parseFile)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Grouped by section — used by homepage
export function getPostsBySection() {
  const posts = getAllPosts();

  const sectionMap = {};

  for (const post of posts) {
    if (!sectionMap[post.section]) {
      sectionMap[post.section] = [];
    }
    sectionMap[post.section].push(post);
  }

  // Return as sorted array of { section, items }
  return Object.keys(sectionMap)
    .sort()
    .map((section) => ({
      section,
      items: sectionMap[section], // already date-sorted from getAllPosts()
    }));
}

// Get all section names — used by generateStaticParams
export function getAllSections() {
  return fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}