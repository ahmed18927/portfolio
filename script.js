// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Animate skill bars when they come into view
      if (entry.target.classList.contains("skills-category")) {
        const skillBars = entry.target.querySelectorAll(".skill-progress")
        skillBars.forEach((bar) => {
          const progress = bar.getAttribute("data-progress")
          setTimeout(() => {
            bar.style.width = progress + "%"
          }, 200)
        })
      }
    }
  })
}, observerOptions)

// Observe all fade-in-up elements
document.querySelectorAll(".fade-in-up").forEach((el) => {
  observer.observe(el)
})

// Observe skills categories for progress bar animation
document.querySelectorAll(".skills-category").forEach((el) => {
  observer.observe(el)
})

// Navbar background on scroll
const nav = document.querySelector(".nav")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    nav.style.background = "rgba(0, 0, 0, 0.95)"
    nav.style.boxShadow = "0 4px 20px rgba(220, 38, 38, 0.1)"
  } else {
    nav.style.background = "rgba(0, 0, 0, 0.8)"
    nav.style.boxShadow = "none"
  }

  lastScroll = currentScroll
})

// Contact form submission
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  console.log("Form submitted:", data)

  // Show success message
  const submitBtn = contactForm.querySelector(".btn-submit")
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = "<span>Message Sent! ✓</span>"
  submitBtn.style.background = "#16a34a"

  setTimeout(() => {
    submitBtn.innerHTML = originalText
    submitBtn.style.background = ""
    contactForm.reset()
  }, 3000)
})

// Add parallax effect to hero orbs
window.addEventListener("mousemove", (e) => {
  const orbs = document.querySelectorAll(".glow-orb")
  const x = e.clientX / window.innerWidth
  const y = e.clientY / window.innerHeight

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 20
    const xMove = (x - 0.5) * speed
    const yMove = (y - 0.5) * speed

    orb.style.transform = `translate(${xMove}px, ${yMove}px)`
  })
})

// Add typing effect to hero tagline (optional enhancement)
const tagline = document.querySelector(".hero-tagline")
const taglineText = tagline.textContent
tagline.textContent = ""

let charIndex = 0
function typeWriter() {
  if (charIndex < taglineText.length) {
    tagline.textContent += taglineText.charAt(charIndex)
    charIndex++
    setTimeout(typeWriter, 50)
  }
}

// Start typing effect after page load
window.addEventListener("load", () => {
  setTimeout(typeWriter, 500)
})

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Add cursor glow effect
const cursor = document.createElement("div")
cursor.className = "cursor-glow"
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
`
document.body.appendChild(cursor)

document.addEventListener("mousemove", (e) => {
  cursor.style.display = "block"
  cursor.style.left = e.clientX - 10 + "px"
  cursor.style.top = e.clientY - 10 + "px"
})

// Hide cursor glow on mobile
if (window.innerWidth < 768) {
  cursor.style.display = "none"
}
