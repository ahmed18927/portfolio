const menuButton = document.querySelector('.menu-btn')
const menu = document.getElementById('menu')
const menuLinks = document.querySelectorAll('.menu-link')
const sections = document.querySelectorAll('section[id]')
const contactForm = document.getElementById('contactForm')
const formStatus = document.getElementById('formStatus')

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open')
    menuButton.setAttribute('aria-expanded', String(open))
  })
}

for (const anchor of document.querySelectorAll('a[href^="#"]')) {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href')
    const target = href ? document.querySelector(href) : null
    if (!target) return

    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })

    if (menu?.classList.contains('open')) {
      menu.classList.remove('open')
      menuButton?.setAttribute('aria-expanded', 'false')
    }
  })
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY
  let current = ''

  for (const section of sections) {
    if (scrollY >= section.offsetTop - 190) {
      current = section.id
    }
  }

  for (const link of menuLinks) {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`)
  }
})

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add('visible')

      if (entry.target.classList.contains('skill-box')) {
        for (const bar of entry.target.querySelectorAll('.progress i')) {
          const progress = Number(bar.getAttribute('data-progress') || '0')
          bar.style.width = `${Math.max(0, Math.min(100, progress))}%`
        }
      }
    }
  },
  { threshold: 0.14 },
)

for (const element of document.querySelectorAll('.skill-box')) {
  observer.observe(element)
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity()
      formStatus.textContent = 'Please fill all fields correctly.'
      formStatus.className = 'form-status error'
      return
    }

    const data = new FormData(contactForm)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const subject = String(data.get('subject') || '')
    const message = String(data.get('message') || '')

    const encodedSubject = encodeURIComponent(`[Portfolio] ${subject}`)
    const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)

    window.location.href = `mailto:ahmedswidan404@gmail.com?subject=${encodedSubject}&body=${encodedBody}`
    formStatus.textContent = 'Opening your email app with pre-filled details...'
    formStatus.className = 'form-status success'

    setTimeout(() => contactForm.reset(), 600)
  })
}
