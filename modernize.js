const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const cssPath = path.join(__dirname, 'styles.css');

// UPDATE HTML
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace('<h2 class="section-title text-white">Nossos Tratamentos</h2>', '<h2 class="section-title">Nossos Tratamentos</h2>');
html = html.replace('<h3 class="section-subtitle text-white">Especialidades <span>Odontológicas</span></h3>', '<h3 class="section-subtitle">Especialidades <span>Odontológicas</span></h3>');
html = html.replace('<p class="section-desc text-white">', '<p class="section-desc">');

// Wrap icons in spec-card
let cardsMatch = html.match(/<div class="specialties-grid">([\s\S]*?)<\/section>/);
if (cardsMatch) {
    let cardsHtml = cardsMatch[1];
    let newCardsHtml = cardsHtml.replace(/<i class="(ph-fill ph-[^"]+)"><\/i>/g, '<div class="spec-icon-wrapper">\n                        <i class="$1"></i>\n                    </div>');
    html = html.replace(cardsHtml, newCardsHtml);
}

fs.writeFileSync(htmlPath, html, 'utf8');

// UPDATE CSS
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace('.about {\n    background: var(--bg-white);\n}', '.about {\n    background: var(--bg-gray);\n}');
css = css.replace('.specialties {\n    background: linear-gradient(to right, var(--primary-dark), var(--primary-color));\n}', '.specialties {\n    background: var(--bg-white);\n}');

const cardStart = css.indexOf('.spec-card {');
const featureStart = css.indexOf('/* ========================================================================', cardStart);

const modernCardCss = `.spec-card {
    background: var(--bg-white);
    border: 1px solid rgba(0,0,0,0.05);
    padding: 40px 30px;
    border-radius: 24px;
    text-align: left;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.spec-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 4px;
    background: var(--primary-color);
    transition: var(--transition);
}

.spec-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-md);
    border-color: transparent;
}

.spec-card:hover::after {
    width: 100%;
}

.spec-icon-wrapper {
    width: 60px;
    height: 60px;
    background: var(--accent-color);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    transition: var(--transition);
}

.spec-card:hover .spec-icon-wrapper {
    background: var(--primary-color);
    transform: scale(1.05);
}

.spec-icon-wrapper i {
    font-size: 2rem;
    color: var(--primary-color);
    transition: var(--transition);
}

.spec-card:hover .spec-icon-wrapper i {
    color: white;
}

.spec-card h4 {
    font-size: 1.25rem;
    color: var(--primary-dark);
    margin-bottom: 12px;
}

.spec-card p {
    color: var(--text-muted);
    font-size: 0.95rem;
}

`;

css = css.substring(0, cardStart) + modernCardCss + css.substring(featureStart);

fs.writeFileSync(cssPath, css, 'utf8');

console.log('Modernization complete');
