let animation;

gsap.registerPlugin(ScrollTrigger)

const marqueeTrack = document.querySelector("#marquee-track");
const marqueeGroup = document.querySelector("#marquee-group");
const horizontalTrack = document.querySelector("#horizontal-track");

gsap.to(marqueeTrack, {
  x: () => -marqueeGroup.offsetWidth,
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
