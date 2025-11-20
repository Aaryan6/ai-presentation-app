import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Presentation } from '@/types/presentation';

export async function exportToPDF(presentation: Presentation) {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [1920, 1080],
  });

  // Get all slide elements
  const slideElements = document.querySelectorAll('.slide-container');

  for (let i = 0; i < slideElements.length; i++) {
    const slideElement = slideElements[i] as HTMLElement;

    // Capture slide as canvas
    const canvas = await html2canvas(slideElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: 1920,
      height: 1080,
    });

    const imgData = canvas.toDataURL('image/png');

    if (i > 0) {
      pdf.addPage();
    }

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
  }

  // Download PDF
  pdf.save(`${presentation.title}.pdf`);
}

export async function exportToHTML(presentation: Presentation) {
  // Create a complete HTML presentation
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${presentation.title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #000;
      overflow: hidden;
    }

    .presentation {
      width: 100vw;
      height: 100vh;
      position: relative;
    }

    .slide {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      padding: 3rem;
    }

    .slide.active {
      display: flex;
      flex-direction: column;
    }

    .slide-title {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 2rem;
      color: ${presentation.colorScheme.primary};
    }

    .slide-content {
      font-size: 1.5rem;
      line-height: 1.8;
    }

    .slide-content ul {
      list-style: none;
      padding-left: 0;
    }

    .slide-content li {
      margin-bottom: 1rem;
      padding-left: 2rem;
      position: relative;
    }

    .slide-content li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${presentation.colorScheme.accent};
      font-size: 2rem;
      line-height: 1.5;
    }

    .controls {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      display: flex;
      gap: 1rem;
      z-index: 1000;
    }

    button {
      padding: 1rem 2rem;
      background: ${presentation.colorScheme.primary};
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    button:hover {
      background: ${presentation.colorScheme.secondary};
      transform: translateY(-2px);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .slide-number {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      color: white;
      font-size: 1rem;
      background: rgba(0, 0, 0, 0.5);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
    }

    .title-slide {
      justify-content: center;
      align-items: center;
      text-align: center;
      background: linear-gradient(135deg, ${presentation.colorScheme.background} 0%, ${presentation.colorScheme.primary}20 100%);
    }

    .title-slide .slide-title {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .content-slide {
      background: ${presentation.colorScheme.background};
      color: ${presentation.colorScheme.text};
    }
  </style>
</head>
<body>
  <div class="presentation">
    ${presentation.slides
      .map(
        (slide, index) => `
      <div class="slide ${index === 0 ? 'active title-slide' : 'content-slide'}" data-slide="${index}">
        <h1 class="slide-title">${slide.title}</h1>
        <div class="slide-content">
          ${
            slide.content.length > 0
              ? `<ul>${slide.content.map((point) => `<li>${point}</li>`).join('')}</ul>`
              : ''
          }
        </div>
      </div>
    `
      )
      .join('')}

    <div class="slide-number">
      <span id="current-slide">1</span> / ${presentation.slides.length}
    </div>

    <div class="controls">
      <button id="prev-btn">← Previous</button>
      <button id="next-btn">Next →</button>
    </div>
  </div>

  <script>
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSlideEl = document.getElementById('current-slide');

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
      currentSlideEl.textContent = index + 1;

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === totalSlides - 1;
    }

    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
      } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
      }
    });

    // Initialize
    showSlide(0);
  </script>
</body>
</html>`;

  // Create and download HTML file
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${presentation.title}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
