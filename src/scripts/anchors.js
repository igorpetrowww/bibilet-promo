export const initAnchors = () => {

  const $anchors = document.querySelectorAll('.js-anchor')
  const $switcherItems = document.querySelectorAll('.js-switcher-item')

  if (!$anchors.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const $anchor = entry.target
        const anchorData = $anchor.dataset.anchor

        if (entry.isIntersecting) {
          $anchors.forEach(($a) => $a.classList.remove('active'))
          $switcherItems.forEach(($s) => $s.classList.remove('active'))

          $anchor.classList.add('active')

          const $matchingSwitcher = document.querySelector(`.js-switcher-item[data-on-anchor="${anchorData}"]`)
          if ($matchingSwitcher) $matchingSwitcher.classList.add('active')
        }
      })
    },
    {
      threshold: 0,
      rootMargin: '-50% 0% -50%'
    }
  )

  $anchors.forEach(($anchor) => observer.observe($anchor))
}
