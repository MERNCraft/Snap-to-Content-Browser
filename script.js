/**
 * script.js
 */

const scrollable = document.getElementById("scrollable")
const header     = document.getElementById("header")
const article    = document.getElementById("article")
const footer     = document.getElementById("footer")
const scrollbar  = document.getElementById("scrollbar")
const stuff      = document.getElementById("stuff")


function initialize() {
  while (scrollable.scrollTop) {
    scrollbar.scrollTop = 0
    scrollable.scrollTop = 0
    article.scrollTop = 0
  }

  const headerScroll  = header.scrollHeight
  const articleHeight = article.getBoundingClientRect().height
  const articleScroll = article.scrollHeight - articleHeight

  // Make user scroll an extra 10% to reveal the footer
  const buffer        = 200 + Math.sqrt(articleScroll)
  console.log("buffer:", buffer)
  const footScroll    = headerScroll
                      + articleScroll
                      + buffer
  const footerScroll  = footer.scrollHeight
  const stuffHeight = 
    headerScroll
  + articleScroll
  + articleHeight
  + footerScroll
  + buffer

  stuff.style.height = stuffHeight + "px"
  scrollbar.addEventListener("scroll", smartScroll)

  function smartScroll(param) {
    const { scrollTop } = scrollbar

    if (scrollTop < headerScroll) {
      scrollable.scrollTop = scrollTop

    } else if (scrollTop < footScroll) {
      // Hide the header
      scrollable.scrollTop = headerScroll

      // Scroll the article
      article.scrollTop = scrollTop - headerScroll

    } else {
      // Scroll the whole scrollable section to show footer
      scrollable.scrollTop = scrollTop - articleScroll - buffer
    }
  }
}


initialize()


document.getElementById("buttons")
  .addEventListener("click", ({ target }) => {
    article.style.fontSize = target.dataset.size + "em"
    initialize()
  })