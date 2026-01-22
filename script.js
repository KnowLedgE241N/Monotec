const root = document.documentElement;
const prefersStatic = document.body.classList.contains("no-scroll-anim");
const logoLink = document.querySelector(".logo");
const proofTrack = document.querySelector(".proof-grid");

if (logoLink) {
  logoLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "index.html";
  });
}

const startProofAutoScroll = () => {
  if (!proofTrack) {
    return null;
  }

  const firstCard = proofTrack.querySelector(".proof-card");
  if (!firstCard) {
    return null;
  }

  const gap = parseInt(getComputedStyle(proofTrack).gap || "0", 10);
  const step = firstCard.offsetWidth + gap;
  const maxScroll = proofTrack.scrollWidth - proofTrack.clientWidth;

  return setInterval(() => {
    if (proofTrack.scrollLeft + step >= maxScroll - 2) {
      proofTrack.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      proofTrack.scrollBy({ left: step, behavior: "smooth" });
    }
  }, 4500);
};

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

  gsap.from(".hero-card, .page-rail", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  });

  if (!prefersStatic) {
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

}

let proofTimer = startProofAutoScroll();

if (proofTrack) {
  proofTrack.addEventListener("pointerenter", () => {
    if (proofTimer) {
      clearInterval(proofTimer);
      proofTimer = null;
    }
  });

  proofTrack.addEventListener("pointerleave", () => {
    if (!proofTimer) {
      proofTimer = startProofAutoScroll();
    }
  });
}
