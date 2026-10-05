gsap.registerPlugin(ScrollTrigger);

const horizontalTrack = document.querySelector("#horizontal-track");
const hamburgerMenu = document.getElementById("hamburger");
const marqueeTrack1 = document.querySelector("#marquee-track1");
const marqueeGroup1 = document.querySelector("#marquee-group1");
const marqueeTrack2 = document.querySelector("#marquee-track2");
const marqueeGroup2 = document.querySelector("#marquee-group2");
const mobileNav = document.getElementById("mobile-nav");

const isDesktop = () => window.innerWidth >= 768;

// --- Mobile Navigation ---
let showMobileNav = false;
if (hamburgerMenu && mobileNav) {
  hamburgerMenu.addEventListener("click", () => {
    if (!showMobileNav) {
      showMobileNav = true;
      document.body.style.overflowY = "hidden";
      mobileNav.classList.replace("hidden", "fixed");
    } else {
      showMobileNav = false;
      document.body.style.overflowY = "auto";
      mobileNav.classList.replace("fixed", "hidden");
    }
  });
}

// --- Navbar Show / Hide on Scroll (Sync dengan ScrollTrigger & GSAP Ticker) ---
let showNav = true;

ScrollTrigger.create({
  start: "top top",
  end: 999999,
  onUpdate: (self) => {
    const currentScrollProgress = self.scroll();

    // Di paling atas selalu tampilkan navbar
    if (currentScrollProgress <= 20) {
      if (!showNav) {
        gsap.to(".nav", { y: 0, ease: "power2.out", duration: 0.35, overwrite: "auto" });
        showNav = true;
      }
    } else if (self.direction === 1 && showNav && currentScrollProgress > 80) {
      // Scroll ke bawah: sembunyikan navbar
      gsap.to(".nav", { y: -100, ease: "power2.out", duration: 0.35, overwrite: "auto" });
      showNav = false;
    } else if (self.direction === -1 && !showNav) {
      // Scroll ke atas: munculkan navbar
      gsap.to(".nav", { y: 0, ease: "power2.out", duration: 0.35, overwrite: "auto" });
      showNav = true;
    }
  }
});

// --- Marquee Continuous Animations ---
if (marqueeTrack1 && marqueeGroup1) {
  gsap.to(marqueeTrack1, {
    x: () => -marqueeGroup1.offsetWidth,
    duration: 15,
    ease: "none",
    repeat: -1,
  });
}

if (marqueeTrack2 && marqueeGroup2) {
  gsap.to(marqueeTrack2, {
    x: () => -marqueeGroup2.offsetWidth,
    duration: 15,
    ease: "none",
    repeat: -1,
  });
}

// --- Hero Parallax Animation ---
gsap.to("#hero", {
  scrollTrigger: {
    trigger: "#hero",
    start: "center center",
    end: "bottom center",
    scrub: true,
  },
  y: -50,
  ease: "power2.in"
});

// --- Hero Decorative Elements Intro ---
const tlHeroElement = gsap.timeline();

tlHeroElement.fromTo(".hero-element", {
  opacity: 0,
  scale: 0,
  rotate: 0
}, {
  opacity: 1,
  scale: 1,
  rotate: 270,
  duration: 0.6,
  stagger: 0.4,
  ease: "back.out(1.5)",
  onComplete: () => {
    // Bersihkan inline transform & opacity agar hover effect CSS tetap lancar tanpa konflik
    gsap.set(".hero-element", { clearProps: "transform,opacity" });
  }
});

// --- About Bento Grid Animations (GPU-Friendly Translation & Opacity) ---
gsap.fromTo(".bento", {
  opacity: 0,
  y: 40,
  scale: 0.95,
}, {
  scrollTrigger: {
    trigger: "#about",
    start: "top 85%",
    end: "center 30%",
    scrub: 1,
    // markers: true
  },
  opacity: 1,
  y: 0,
  scale: 1,
  stagger: 0.08,
  ease: "power2.out",
});

// --- Desktop Horizontal Projects Scroll ---
if (isDesktop() && horizontalTrack) {
  // Animasi judul proyek (hindari scaling pada horizontalTrack itu sendiri)
  gsap.fromTo("#projects .project-item:not(#horizontal-track)", {
    opacity: 0,
    y: 40,
    scale: 0.95,
  }, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#projects",
      start: "20% 80%",
      end: "center 30%",
      markers: true
    }
  });

  // Pinning dan geser horizontal yang dioptimasi
  gsap.to(horizontalTrack, {
    x: () => -(horizontalTrack.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: "#projects",
      start: "top top",
      end: () => `+=${horizontalTrack.scrollWidth - window.innerWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}

// --- Contact Form Submission ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const pesan = document.getElementById('message').value;

    const emailTujuan = "tsqf.h29@gmail.com";
    const subjek = `New message from ${email}`;

    const isiEmail = `Hello, Zifh.\n\nemail: ${email}\nPesan: ${pesan}`;

    const mailtoUrl = `mailto:${emailTujuan}?subject=${encodeURIComponent(subjek)}&body=${encodeURIComponent(isiEmail)}`;

    window.location.href = mailtoUrl;
  });
}