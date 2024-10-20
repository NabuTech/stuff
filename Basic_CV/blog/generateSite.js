const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Paths to the files
const postsDir = path.join(__dirname, 'posts');
const outputDir = path.join(__dirname, 'output');
const jsonPath = path.join(outputDir, 'posts.json');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

function parseMetadata(content) {
    const metadata = {};
    const metadataStart = content.indexOf('---');
    const metadataEnd = content.indexOf('---', metadataStart + 3);

    if (metadataStart !== -1 && metadataEnd !== -1) {
        const metadataContent = content.slice(metadataStart + 3, metadataEnd).trim();
        const lines = metadataContent.split('\n').filter(Boolean);
        lines.forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
                metadata[key.trim()] = valueParts.join(':').trim();
            }
        });
    }
    return metadata;
}

// Function to generate individual blog post HTML
function generatePostHTML(post, markdownContent) {
    const markdownWithoutMetadata = markdownContent.replace(/---[\s\S]*?---/, '').trim();
    const htmlContent = marked(markdownWithoutMetadata);
    const asideNavigation = generateAsideNavigation(htmlContent);

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${post.title}</title>
            <link rel="stylesheet" href="../styles.css"> <!-- Link to styles.css -->
        </head>
        <body>
            <div class="container">
                <header>
                    <h1>Sammy John Rawlinson</h1>
                    <nav>
                        <div class="burger-menu" onclick="toggleMenu()">☰</div>
                        <ul id="nav-links">
                            <li><a href="#about">About</a></li>
                            <li><a href="#resume">Resume</a></li>
                            <li><a href="#portfolio">Portfolio</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <aside class="toc">
                        <h2>Table of Contents</h2>
                        ${asideNavigation} <!-- Table of contents dynamically generated -->
                    </aside>
                    <article>
                        ${htmlContent} <!-- Main blog post content -->
                    </article>
                </main>

                <footer class="site-footer">
                    <div class="footer-container">
                        <div class="footer-left">
                            <h4>Contact Us</h4>
                            <p>Email: contact@sammyjohnrawlinson.com</p>
                            <p>Phone: +123 456 7890</p>
                        </div>
                        <div class="footer-right">
                            <h4>Follow Us</h4>
                            <div class="social-links">
                                <a href="#" target="_blank"><i class="fab fa-twitter"></i> Twitter</a>
                                <a href="#" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
                                <a href="#" target="_blank"><i class="fab fa-github"></i> GitHub</a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2024 Sammy John Rawlinson. All rights reserved.</p>
                    </div>
                </footer>
            </div>

            <script src="../scripts.js"></script> <!-- Link to scripts.js -->
        </body>
        </html>
    `;
}

// Function to generate the aside navigation based on headings in the post
const cheerio = require('cheerio');
function generateAsideNavigation(htmlContent) {
    const $ = cheerio.load(htmlContent);
    const headings = $('h2, h3');
    let toc = '<ul>';
    headings.each((index, heading) => {
        const id = `heading-${index}`;
        $(heading).attr('id', id);
        toc += `<li><a href="#${id}">${$(heading).text()}</a></li>`;
    });
    toc += '</ul>';
    return toc;
}

// Function to generate the homepage HTML
function generateHomepageHTML(posts) {
    const latestPost = posts[0]; // The most recent post

    let postsList = posts.slice(1).map(post => {
        return `
            <div class="blog-post">
                <a href="${post.file.replace('.md', '.html')}" class="post-link">${post.title}</a>
                <p class="post-date">Published on ${post.date}</p>
                <button class="toggle-details">
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="post-details">
                    <div class="post-image">
                        <img src="../neonbackground.webp" alt="Blog Post Image">
                    </div>
                    <div class="post-text">
                        <p>${post.summary}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('\n');

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta name="description" content="Sammy John Rawlinson's personal development blog, featuring insights on software development, coding, and digital experiences.">
            <meta name="keywords" content="Sammy John Rawlinson, software development, coding, web development, personal development, tech blog">
            <meta name="author" content="Sammy John Rawlinson">
            <title>Sammy John Rawlinson - Software Development Personal Development Blog</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="../styles.css"> <!-- Link to styles.css -->
        </head>    
        <body>
            <main>
                <div class="container">
                    <header>
                        <h1>Sammy John Rawlinson</h1>
                        <nav>
                            <div class="burger-menu" onclick="toggleMenu()">☰</div>
                            <ul id="nav-links">
                                <li><a href="#about">About</a></li>
                                <li><a href="#resume">Resume</a></li>
                                <li><a href="#portfolio">Portfolio</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </nav>
                    </header>

                    <section class="hero">
                        <div class="hero-left">
                            <div class="featured-post">
                                <img src="../neonbackground.webp" alt="Featured Blog Post">
                                <div class="post-description">
                                    <p>${latestPost.summary}</p>
                                </div>
                            </div>
                            <h2>Latest Post: ${latestPost.title}</h2>
                        </div>

                        <div class="hero-right">
                            <div class="profile-image">
                                <img src="../calabim400x400.png" alt="Profile Image">
                            </div>
                            <div class="about-text">
                                <p>Hi, I'm Sammy John Rawlinson, a full-stack developer passionate about creating digital experiences and writing about the tech world.</p>
                                <div class="social-icons">
                                    <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
                                    <a href="#" target="_blank"><i class="fab fa-linkedin"></i></a>
                                    <a href="#" target="_blank"><i class="fab fa-github"></i></a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="posts-subscribe">
                        <div class="posts-left">
                            <a href="${latestPost.file.replace('.md', '.html')}" class="post-title">${latestPost.title}</a>
                            <p class="post-date">Published on ${latestPost.date}</p>
                            <p class="post-text">${latestPost.summary}</p>
                        </div>

                        <div class="subscribe-right">
                            <h3>Subscribe to Our Newsletter</h3>
                            <form class="subscribe-form">
                                <input type="email" placeholder="Enter your email" required>
                                <button type="submit">Subscribe</button>
                            </form>
                        </div>
                    </section>

                    <section class="blog-list-filter">
                        <div class="blog-list-left">
                            <h2>List of Blog Posts</h2>
                            ${postsList}
                        </div>

                        <div class="filter-right">
                            <h3>Filter by Date</h3>
                            <ul class="year-list">
                                <li>
                                    <button class="year-toggle">2024 <i class="fas fa-chevron-down"></i></button>
                                    <ul class="month-list">
                                        <li>October</li>
                                        <li>September</li>
                                        <li>August</li>
                                    </ul>
                                </li>
                                <li>
                                    <button class="year-toggle">2023 <i class="fas fa-chevron-down"></i></button>
                                    <ul class="month-list">
                                        <li>December</li>
                                        <li>November</li>
                                        <li>October</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <footer class="site-footer">
                        <div class="footer-container">
                            <div class="footer-left">
                                <h4>Contact Us</h4>
                                <p>Email: contact@sammyjohnrawlinson.com</p>
                                <p>Phone: +123 456 7890</p>
                            </div>

                            <div class="footer-right">
                                <h4>Follow Us</h4>
                                <div class="social-links">
                                    <a href="#" target="_blank"><i class="fab fa-twitter"></i> Twitter</a>
                                    <a href="#" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
                                    <a href="#" target="_blank"><i class="fab fa-github"></i> GitHub</a>
                                </div>
                            </div>
                        </div>

                        <div class="footer-bottom">
                            <p>&copy; 2024 Sammy John Rawlinson. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </main>

            <script src="../scripts.js"></script> <!-- Link to scripts.js -->
        </body>
        </html>
    `;
}

// Generate JSON metadata and blog posts
function generateBlog() {
    const postsMetadata = [];

    // Read each markdown file in the /posts directory
    const files = fs.readdirSync(postsDir);
    files.forEach(file => {
        if (file.endsWith('.md')) {
            const filePath = path.join(postsDir, file);
            const content = fs.readFileSync(filePath, 'utf8');

            const metadata = parseMetadata(content);

            if (!metadata.title || !metadata.summary) {
                console.warn(`Skipping file ${file} due to missing metadata.`);
                return;
            }

            metadata.file = file;
            postsMetadata.push(metadata);

            const postHTML = generatePostHTML(metadata, content);
            const outputFilePath = path.join(outputDir, file.replace('.md', '.html'));
            fs.writeFileSync(outputFilePath, postHTML, 'utf8');
        }
    });

    // Write the JSON metadata to a file
    fs.writeFileSync(jsonPath, JSON.stringify(postsMetadata, null, 2), 'utf8');

    // Generate and write the homepage
    const homepageHTML = generateHomepageHTML(postsMetadata);
    fs.writeFileSync(path.join(outputDir, 'index.html'), homepageHTML, 'utf8');

    console.log('Blog site generated successfully.');
}

// Run the blog generation
generateBlog();
