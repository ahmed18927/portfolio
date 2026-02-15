const nav = document.querySelector(".nav")
const navMenu = document.getElementById("navMenu")
const menuToggle = document.querySelector(".menu-toggle")
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")
const contactForm = document.getElementById("contactForm")
const formStatus = document.getElementById("formStatus")

// Smooth scroll for on-page navigation links
for (const anchor of document.querySelectorAll('a[href^="#"]')) {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href")
    const target = href ? document.querySelector(href) : null
    if (!target) return

    event.preventDefault()
    target.scrollIntoView({ behavior: "smooth", block: "start" })

    if (navMenu?.classList.contains("open")) {
      navMenu.classList.remove("open")
      menuToggle?.setAttribute("aria-expanded", "false")
    }
  })
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open")
    menuToggle.setAttribute("aria-expanded", String(isOpen))
  })
}

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add("visible")

      if (entry.target.classList.contains("skills-category")) {
        for (const bar of entry.target.querySelectorAll(".skill-progress")) {
          const progress = Number(bar.getAttribute("data-progress") || "0")
          bar.style.width = `${Math.max(0, Math.min(100, progress))}%`
        }
      }
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
)

for (const item of document.querySelectorAll(".fade-in-up, .fade-in, .skills-category")) {
  observer.observe(item)
}

// Navbar style + active section
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (nav) {
    if (currentScroll > 90) {
      nav.style.background = "rgba(0, 0, 0, 0.92)"
      nav.style.boxShadow = "0 4px 18px rgba(220, 38, 38, 0.14)"
    } else {
      nav.style.background = "rgba(0, 0, 0, 0.75)"
      nav.style.boxShadow = "none"
    }
  }

  let currentSection = ""
  for (const section of sections) {
    if (currentScroll >= section.offsetTop - 220) {
      currentSection = section.getAttribute("id") || ""
    }
  }

  for (const link of navLinks) {
    const isActive = link.getAttribute("href") === `#${currentSection}`
    link.classList.toggle("active", isActive)
  }
})

// Hero tagline typing effect
const tagline = document.querySelector(".hero-tagline")
if (tagline) {
  const taglineText = tagline.textContent || ""
  tagline.textContent = ""
  let charIndex = 0

  const typeWriter = () => {
    if (charIndex >= taglineText.length) return
    tagline.textContent += taglineText.charAt(charIndex)
    charIndex += 1
    setTimeout(typeWriter, 45)
  }

  window.addEventListener("load", () => {
    setTimeout(typeWriter, 450)
  })
}

// Contact form behavior with mailto fallback
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!contactForm.checkValidity()) {
      formStatus.textContent = "Please complete all fields correctly before submitting."
      formStatus.className = "form-status error"
      contactForm.reportValidity()
      return
    }

    const formData = new FormData(contactForm)
    const name = String(formData.get("name") || "")
    const email = String(formData.get("email") || "")
    const subject = String(formData.get("subject") || "")
    const message = String(formData.get("message") || "")

    const mailSubject = encodeURIComponent(`[Portfolio] ${subject}`)
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    const mailtoURL = `mailto:ahmedswidan404@gmail.com?subject=${mailSubject}&body=${mailBody}`

    window.location.href = mailtoURL

    formStatus.textContent = "Great! Your email app should open now with your message pre-filled."
    formStatus.className = "form-status success"

    const submitBtn = contactForm.querySelector(".btn-submit")
    if (submitBtn) {
      submitBtn.setAttribute("disabled", "true")
      setTimeout(() => submitBtn.removeAttribute("disabled"), 1800)
    }

    setTimeout(() => {
      contactForm.reset()
    }, 700)
  })
}

// Cursor glow effect (desktop only)
if (window.innerWidth >= 768) {
  const cursor = document.createElement("div")
  cursor.className = "cursor-glow"
  cursor.style.cssText = `
    position: fixed;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, transparent 72%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
  `
  document.body.appendChild(cursor)

  document.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`
    cursor.style.top = `${event.clientY}px`
  })
}
