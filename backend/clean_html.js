const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Remove all <script>...</script> tags
html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

// Add our custom main.js right before </body>
html = html.replace('</body>', '<script src="/js/main.js"></script>\n</body>');

// Pretty print (very basic)
html = html.replace(/></g, '>\n<');

fs.writeFileSync(indexPath, html);
console.log('Cleaned Next.js scripts from index.html');
