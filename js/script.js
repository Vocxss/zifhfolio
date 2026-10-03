let theme = "dark";
let animation;

gsap.registerPlugin(ScrollTrigger)

const themeIcon = document.querySelector("#themeIcon");
const track = document.querySelector("#marquee-track");
const group = document.querySelector("#marquee-group");

gsap.to(track, {
  x: () => -group.offsetWidth,
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
    scrub: 1,
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

gsap.fromTo(".bento",{
  opacity: 0,
  scale: 0,
}, {
  scrollTrigger: {
    trigger: ".bento",
    start: "top bottom",
    // end: "",
    markers: true,
    scrub: 1,
  },
  opacity: 1,
  scale: 1,
  ease: "expo.out",
})

// console.log(themeIcon);

const changeTheme = () => {
  if (theme == "light") {
    theme = "dark";
    document.body.classList.add("dark");
    themeIcon.classList.replace("hgi-sun-03", "hgi-moon-02");
  } else {
    theme = "light";
    document.body.classList.remove("dark");
    themeIcon.classList.replace("hgi-moon-02", "hgi-sun-03");
  }
};