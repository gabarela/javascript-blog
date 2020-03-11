'use strict';

function titleClickHandler(event) {
  /*f wykonywana w reakcji na event*/
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links */

  const activeLinks = document.querySelectorAll('.titles a.active'); /*stała activeLinks to wszystkie elementy pasujace do selektora '.titles a.active' wewnątrz documentu*/

  for (let activeLink of activeLinks) {
    /*zaczynamy pętlę for która dla kolejnych pojedynczych elementów czyli zmiennej activeLink spośród kolekcji elementów activeLinks zrobi to co zostanie opisane w nawiasie klamrowym*/
    activeLink.classList.remove('active'); /*pojedynczy link spośród wyszukanych posiada swoja bibliotekę classList zawierajacą informacje i funkcje na temat jego klas i z niej usunieta zostanie klasa active*/
  } /*pętla zamknięta czyli działanie wykonane dla wszystkich*/

  /* [DONE] add class 'active' to the clicked link */


  clickedElement.classList.add('active'); /* kliknięty element uzyska teraz klasę active*/
  /*console.log('clickedElement:', clickedElement);*/

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href'); /*w stałej articleSelector zapisujemy wartość atrybutu href klikniętego elementu*/
  console.log(articleSelector);

  /* [DONE] find the correct article using selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector); /*stała targetArticle wynajdzie wewnątrz dokumentu pierwszy element pasujący do selektora articleSelector czyli ten kliknięty*/
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active'); /*i nada mu klasę active - doda ja do "biblioteki" classList*/
  console.log('targetArticle:', targetArticle);

}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks() {

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector); /*wyszukuje listę tytułów*/
  titleList.innerHTML = ''; /*czyscimy html wewnątrz listy zawierajacej tytuly*/

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector); /*wszystkie elementy .post */

  let html = '';

  for (let article of articles) {
    /*dla kazdego article z kolekcji articles czyli wszystkich .post */

    /* get the article id */

    const articleId = article.getAttribute('id');


    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML; /*stała to treść html wewnątrz pierwszego .post-title w article - tutaj pierwszy to jedyny */

    /* get the title from the title element */


    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; /*tworzenie linka będącego elementem listy za pomocą stworzonych stałych*/
    console.log(linkHTML);


    /* insert link into titleList */

    html = html + linkHTML; /*dodanie stworzonego linka do html*/

  }

  titleList.innerHTML = html; /*wlaczenie obydwu w kod html elementu titleList - czyli elementu o selektorze .titles*/

  const links = document.querySelectorAll('.titles a'); /*wyszukanie wszystkich elementów .titles a wewnątrz doc*/
  console.log(links);

  for (let link of links) {
    /*pętla dla kazdego linka spośród tej kolekcji linków*/
    link.addEventListener('click', titleClickHandler); /*nasłuchująca kliknięcia*/
  }

}

generateTitleLinks(); /*uruchomienie opisanej wyzej f*/

function generateTags() {

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span> </a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* END LOOP: for each tag */

    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
}
generateTags(); /*działa tylko pytanie czemu tagi nie są rozdizlone spacją???*/

function tagClickHandler(event) {
  /* prevent default action for this event */

  /* make new constant named "clickedElement" and give it the value of "this" */

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  /* make a new constant "tag" and extract tag from the "href" constant */

  /* find all tag links with class active */

  /* START LOOP: for each active tag link */

  /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

  /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags() {
  /* find all links to tags */

  /* START LOOP: for each link */

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();
