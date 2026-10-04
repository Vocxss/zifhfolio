gsap.registerPlugin(ScrollTrigger)

let animation;
let showNav = true 

let lastScroll = window.scrollY

window.addEventListener("scroll", () => {
  let currentScrollProgress = window.scrollY
  
  if (currentScrollProgress <= 20) {
    gsap.to(".nav", {
      y: 0,
      ease: "power2.out",
      duration: .5  
    })

    showNav = true
  }

  if (currentScrollProgress - lastScroll > 10 && showNav) {
    gsap.to(".nav", {
      y: -100,
      ease: "power2.out",
      duration: .5
    }) 
    showNav = false
  }
  
  if (currentScrollProgress - lastScroll < -10 && !showNav) {
    gsap.to(".nav", {
      y: 0,
      ease: "power2.out",
      duration: .5
    }) 
    showNav = true
  }
  
  lastScroll = currentScrollProgress
})

const marqueeTrack1 = document.querySelector("#marquee-track1");
const marqueeGroup1 = document.querySelector("#marquee-group1");
const marqueeTrack2 = document.querySelector("#marquee-track2");
const marqueeGroup2 = document.querySelector("#marquee-group2");
const horizontalTrack = document.querySelector("#horizontal-track");

gsap.to(marqueeTrack1, {
  x: () => -marqueeGroup1.offsetWidth,
  duration: 15,
  ease: "none",
  repeat: -1
});

gsap.to(marqueeTrack2, {
  x: () => -marqueeGroup2.offsetWidth,
  duration: 15,
  ease: "none",
  repeat: -1
});

gsap.to("#hero", {
  scrollTrigger: {
    trigger: "#hero",
    start: "center center",
    end: "bottom center",
    // markers: true,
    scrub: true,
  },
  y: -50,
  ease: "power2.in"
})

const tlHeroElement = gsap.timeline()

tlHeroElement.fromTo(".hero-element", {
  opacity: 0,
  scale: 0,
  rotate: 0
}, {
  opacity: 1,
  scale: 1,
  rotate: 270,
  duration: 0.6,
  stagger: 0.5,
  onComplete: () => {
    gsap.set(".hero-element", { clearProps: "all" })
    document.querySelectorAll(".hero-element").forEach(el => {
      el.classList.add("transition-transform", "duration-500")
    })
  }
})

gsap.fromTo(".bento", {
  opacity: 0,
  scale: 0,
}, {
  scrollTrigger: {
    trigger: ".bento",
    start: "top bottom",
    // end: "",
    // markers: true,
    scrub: 1,
  },
  opacity: 1,
  scale: 1,
  ease: "expo.out",
})

gsap.fromTo(".project-item",
  {
    opacity: 0,
    scale: 0,
  },
  {
    duration: 2,
    opacity: 1,
    scale: 1,
    ease: "expo.out",
    scrollTrigger: {
      trigger: "#projects",
      start: "bottom bottom",
      end: "bottom bottom",
      // markers: true,
      onComplete: () => {
        gsap.set(".hero-element", { clearProps: "all" })
      }
    },
  }
)

gsap.to(horizontalTrack, {
  x: () => -(horizontalTrack.scrollWidth - window.innerWidth),

  ease: "none",

  scrollTrigger: {
    trigger: "#projects",
    start: "top top",
    end: () => `+=${horizontalTrack.scrollWidth}`,
    scrub: true,
    pin: true,
    invalidateOnRefresh: true,
  },
});
// console.log(themeIcon);

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const pesan = document.getElementById('message').value;

  const emailTujuan = "tsqf.h29@gmail.com";
  const subjek = `New message from ${email}`;
  
  const isiEmail = `Hello, Zifh.\n\nemail: ${email}\nPesan: ${pesan}`;

  const mailtoUrl = `mailto:${emailTujuan}?subject=${encodeURIComponent(subjek)}&body=${encodeURIComponent(isiEmail)}`;

  window.location.href = mailtoUrl;
});