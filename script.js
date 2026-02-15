const menuToggle = document.querySelector('.menu-toggle')
const navMenu = document.getElementById('navMenu')
const navLinks = document.querySelectorAll('.nav-link')
const sections = document.querySelectorAll('section[id]')
const form = document.getElementById('contactForm')
const formStatus = document.getElementById('formStatus')

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open')
    menuToggle.setAttribute('aria-expanded', String(isOpen))
  })
}

for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href')
    const target = href ? document.querySelector(href) : null
    if (!target) return

    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })

    if (navMenu?.classList.contains('open')) {
      navMenu.classList.remove('open')
      menuToggle?.setAttribute('aria-expanded', 'false')
    }
  })
}

window.addEventListener('scroll', () => {
  const y = window.scrollY
  let current = ''

  for (const section of sections) {
    if (y >= section.offsetTop - 180) current = section.id
  }

  for (const link of navLinks) {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`)
  }
})

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue

    entry.target.classList.add('visible')

    if (entry.target.classList.contains('skill-card')) {
      for (const progressBar of entry.target.querySelectorAll('.bar i')) {
        const value = Number(progressBar.getAttribute('data-progress') || '0')
        progressBar.style.width = `${Math.min(100, Math.max(0, value))}%`
      }
    }
  }
}, { threshold: 0.14 })

for (const el of document.querySelectorAll('.fade-in-up, .skill-card')) {
  observer.observe(el)
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (!form.checkValidity()) {
      form.reportValidity()
      formStatus.textContent = 'Please complete all fields correctly.'
      formStatus.className = 'form-status error'
      return
    }

    const data = new FormData(form)
    const subject = encodeURIComponent(`[Portfolio] ${String(data.get('subject') || '')}`)
    const body = encodeURIComponent(
      `Name: ${String(data.get('name') || '')}\nEmail: ${String(data.get('email') || '')}\n\n${String(data.get('message') || '')}`,
    )

    window.location.href = `mailto:ahmedswidan404@gmail.com?subject=${subject}&body=${body}`
    formStatus.textContent = 'Opening your email app with the message details...'
    formStatus.className = 'form-status success'

    setTimeout(() => form.reset(), 600)
  })
}
