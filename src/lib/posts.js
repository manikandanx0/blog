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
      files = files.concat(
        getAllMarkdownFiles(fullPath, relativePath)
      );
    } else if (entry.name.endsWith(".md")) {
      files.push(relativePath);
    }
  }

  return files;
}

export function getAllPosts() {
  const markdownFiles = getAllMarkdownFiles(contentDirectory);

  const posts = markdownFiles.map((relativePath) => {
    const fullPath = path.join(contentDirectory, relativePath);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      slug: relativePath.replace(/\.md$/, ""),
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      content,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}