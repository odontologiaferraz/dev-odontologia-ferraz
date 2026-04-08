import os
import shutil

html_path = r"C:\Users\Lenovo\.gemini\antigravity\scratch\odontologia-ferraz\index.html"
css_path = r"C:\Users\Lenovo\.gemini\antigravity\scratch\odontologia-ferraz\styles.css"
downloads_dir = r"C:\Users\Lenovo\Downloads"
target_dir = r"C:\Users\Lenovo\.gemini\antigravity\scratch\odontologia-ferraz"

# Copy images if they exist
antes_src = os.path.join(downloads_dir, "antes.png")
depois_src = os.path.join(downloads_dir, "depois.png")

if os.path.exists(antes_src):
    shutil.copy(antes_src, os.path.join(target_dir, "antes.png"))
if os.path.exists(depois_src):
    shutil.copy(depois_src, os.path.join(target_dir, "depois.png"))

# Read HTML
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

features_start = content.find("    <!-- Features Section -->")
team_start = content.find("    <!-- Team Section -->")
cta_start = content.find("    <!-- CTA Section -->")

features_html = content[features_start:team_start]
team_html = content[team_start:cta_start]

results_html = """    <!-- Results Section -->
    <section class="results section" id="results">
        <div class="container text-center">
            <h2 class="section-title">Resultados e Depoimentos</h2>
            <h3 class="section-subtitle">Sorrisos que <span>Inspiram</span></h3>
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
                Quero Transformar Meu Sorriso <i class="ph ph-whatsapp-logo"></i>
            </a>
        </div>
    </section>

"""

new_content = content[:features_start] + team_html + features_html + results_html + content[cta_start:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(new_content)

# Update CSS
css_addition = """
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
"""

with open(css_path, "a", encoding="utf-8") as f:
    f.write(css_addition)

print("HTML, CSS and Images updated successfully!")
