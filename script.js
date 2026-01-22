const root = document.documentElement;
const logoLink = document.querySelector(".logo");

if (logoLink) {
  logoLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "index.html";
  });
}

if (!window.gsap) {
  root.classList.remove("js");
} else {
  root.classList.add("js");

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.from(".hero-copy > *", {
    opacity: 0,
    y: 24,
    duration: 0.9,
    ease: "power2.out",
    stagger: 0.08,
  });

  gsap.from(".hero-card", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  });

  gsap.utils.toArray("[data-reveal]").forEach((item, index) => {
    const baseConfig = {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: Math.min(index * 0.04, 0.3),
    };

    if (window.ScrollTrigger) {
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          ...baseConfig,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    } else {
      gsap.fromTo(item, { opacity: 0, y: 30 }, baseConfig);
    }
  });
}
