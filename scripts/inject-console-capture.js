const fs = require('fs');
const path = require('path');

const SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>';
const BUILD_DIR = path.join(process.cwd(), '.next/server/app');

function injectScriptIntoHTML(htmlContent) {
  if (htmlContent.includes(SCRIPT_TAG)) {
    return htmlContent;
  }
  
  if (htmlContent.includes('</head>')) {
    return htmlContent.replace('</head>', `${SCRIPT_TAG}</head>`);
  }
  
  if (htmlContent.includes('<body')) {
    return htmlContent.replace('<body', `${SCRIPT_TAG}<body`);
  }
  
  return htmlContent;
}

function processDirectory(directory) {
  try {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith('.html')) {
        let content = fs.readFileSync(filePath, 'utf8');
        const updatedContent = injectScriptIntoHTML(content);
        
        if (content !== updatedContent) {
          fs.writeFileSync(filePath, updatedContent, 'utf8');
          console.log(`Injected console capture script into: ${filePath}`);
        }
      }
    });
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

console.log('Starting console capture script injection...');
processDirectory(BUILD_DIR);
console.log('Console capture script injection complete!');