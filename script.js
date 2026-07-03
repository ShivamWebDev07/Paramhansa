document.addEventListener("DOMContentLoaded", () => {
    // Live CDN Testing Images Array
    let slideData = [
      {
        id: 1,
        image: "babakuti.png", 
        title: "Paramhans Laxminath Gowswami Samiti",
        subtitle: "A sacred sanctuary dedicated to spiritual enlightenment and divine devotion"
      },
      {
        id: 2,
        image: "thakurbari.png",
        title: "Divine Blessings & Eternal Teachings",
        subtitle: "Explore the internal wisdom, peace, and spiritual journey guided by Babaji"
      },
      {
        id: 3,
        image: "https://picsum.photos/id/1018/1920/1080",
        title: "Spiritual Community & Satsang",
        subtitle: "Experience collective growth and inner transformation with devotion"
      }
    ];

    let currentIdx = 0;
    let slideInterval;

    const bgContainer = document.getElementById("slideshow-bg");
    const titleElement = document.getElementById("hero-title");
    const subtitleElement = document.getElementById("hero-subtitle");

    if (titleElement && subtitleElement) {
        titleElement.style.transition = "opacity 0.4s ease-in-out";
        subtitleElement.style.transition = "opacity 0.4s ease-in-out";
    }

    function renderSlideshow() {
        if (!bgContainer) return;
        bgContainer.innerHTML = ""; 

        slideData.forEach((slide, index) => {
            const img = document.createElement("img");
            img.src = slide.image;
            img.classList.add("slide-img");
            if (index === currentIdx) {
                img.classList.add("active");
            }
            bgContainer.appendChild(img);
        });
        
        if (titleElement) titleElement.innerText = slideData[currentIdx].title;
        if (subtitleElement) subtitleElement.innerText = slideData[currentIdx].subtitle;
    }

    function nextSlide() {
        const allImgElements = document.querySelectorAll(".slide-img");
        if (allImgElements.length <= 1) return;

        allImgElements[currentIdx].classList.remove("active");
        currentIdx = (currentIdx + 1) % slideData.length;
        allImgElements[currentIdx].classList.add("active");

        if (titleElement && subtitleElement) {
            titleElement.style.opacity = "0";
            subtitleElement.style.opacity = "0";

            setTimeout(() => {
                titleElement.innerText = slideData[currentIdx].title;
                subtitleElement.innerText = slideData[currentIdx].subtitle;
                titleElement.style.opacity = "1";
                subtitleElement.style.opacity = "1";
            }, 300);
        }
    }

    // Fire slider engine
    renderSlideshow();
    
    if (slideData.length > 1) {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // --- Baaki features ka safe code (Ab bina crash ke chalega) ---
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.bottom-nav-item').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
