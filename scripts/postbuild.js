import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const baseIndex = path.join(distDir, 'index.html');

if (fs.existsSync(baseIndex)) {
  const html = fs.readFileSync(baseIndex, 'utf8');

  // Create dist/hesheng/index.html with Wugu Hesheng Temple OG tags for LINE/FB link preview
  const heshengDir = path.join(distDir, 'hesheng');
  fs.mkdirSync(heshengDir, { recursive: true });

  const heshengHtml = html
    .replaceAll('./assets/', '../assets/')
    .replace(
      /<title>.*?<\/title>/,
      '<title>五股賀聖宮 AI 語音導覽 | Wugu Hesheng Temple 360° & AI Guide</title>'
    )
    .replace(
      /<meta property="og:title" content=".*?" \/>/,
      '<meta property="og:title" content="五股賀聖宮 AI 語音導覽 | Wugu Hesheng Temple 360° & AI Guide" />'
    )
    .replace(
      /<meta property="og:description" content=".*?" \/>/,
      '<meta property="og:description" content="五股賀聖宮（主祀北極玄天上帝）360° 實景互動熱點與中/英/日/韓多語系 AI 語音導覽系統" />'
    )
    .replace(
      /<meta name="description" content=".*?" \/>/,
      '<meta name="description" content="五股賀聖宮（主祀北極玄天上帝）360° 實景互動熱點與中/英/日/韓多語系 AI 語音導覽系統" />'
    );

  fs.writeFileSync(path.join(heshengDir, 'index.html'), heshengHtml, 'utf8');
  console.log('✅ Generated dist/hesheng/index.html with Wugu Hesheng Temple OG preview tags');
}
