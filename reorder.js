const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const cssPath = path.join(__dirname, 'styles.css');
const downloadsDir = path.join('C:', 'Users', 'Lenovo', 'Downloads');

// Copy files if they exist
const antesSrc = path.join(downloadsDir, 'antes.png');
const depoisSrc = path.join(downloadsDir, 'depois.png');

try {
    if (fs.existsSync(antesSrc)) fs.copyFileSync(antesSrc, path.join(__dirname, 'antes.png'));
    if (fs.existsSync(depoisSrc)) fs.copyFileSync(depoisSrc, path.join(__dirname, 'depois.png'));
} catch (e) {
    console.error('Error copying files:', e);
}

let content = fs.readFileSync(htmlPath, 'utf8');

const featuresStart = content.indexOf('    <!-- Features Section -->');
const teamStart = content.indexOf('    <!-- Team Section -->');
const ctaStart = content.indexOf('    <!-- CTA Section -->');

const featuresHtml = content.substring(featuresStart, teamStart);
const teamHtml = content.substring(teamStart, ctaStart);

const resultsHtml = `    <!-- Results Section -->
    <section class="results section" id="results">
        <div class="container text-center">
            <h2 class="section-title">Depoimentos</h2>
            <h3 class="section-subtitle">Resultados que <span>Inspiram</span></h3>
            <p class="section-desc">Confira algumas transformações reais e sorrisos lindos que devolvem a autoestima e confiança aos nossos pacientes.</p>

            <div class="results-grid">
                <div class="result-card">
                    <img src="antes.png" alt="Antes" class="result-img" onerror="this.src='https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'">
                </div>
                <div class="result-card">
                    <img src="depois.png" alt="Depois" class="result-img" onerror="this.src='https://images.unsplash.com/photo-1590625621453-61cefc489626?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'">
                </div>
                <div class="result-card">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Sorriso Lindo" class="result-img">
                </div>
            </div>
            
            <a href="https://wa.me/5515996829034" target="_blank" class="btn btn-primary btn-lg mt-4" style="margin-top: 40px;">
                Quero Transformar Meu Sorriso <i class="ph-fill ph-whatsapp-logo"></i>
            </a>
        </div>
    </section>

`;

const newContent = content.substring(0, featuresStart) + teamHtml + featuresHtml + resultsHtml + content.substring(ctaStart);

fs.writeFileSync(htmlPath, newContent, 'utf8');

const cssAddition = `
/* ========================================================================
   RESULTS SECTION
======================================================================== */
.results {
    background: var(--bg-white);
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 40px;
}

.result-card {
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
    background: #000;
}

.result-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
}

.result-img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
}

.result-card:hover .result-img {
    transform: scale(1.05);
}
`;

fs.appendFileSync(cssPath, cssAddition, 'utf8');

console.log('Done!');
