'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  tagsLinkSelector: '.post-tags .list a, .list.tags a',
  articleAuthorSelector: '.post-author',
  authorsLinkSelector: '.post-author a, .list.authors a',
  tagsListSelector: '.tags.list',
  authorsListSelector: '.authors.list',
  cloudClassCount: '5',
  cloudClassPrefix: 'tag-size-'
};

// WYŚWIETLANIE KLIKNIĘTEGO ARTYKUŁU - DZIAŁA
function titleClickHandler(event) {

  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {

    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /*console.log('clickedElement:', clickedElement);*/

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /*get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('targetArticle:', targetArticle);

}

// WYŚWIETLANIE LISTY ARTYKUŁÓW  - DZIAŁA

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(opt.articleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    /*const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);*/

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);


    /* insert link into titleList */
    html = html + linkHTML;

  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

// NADANIE TAGOWI W PRAWYM SIDEBARZE PARAMETRU NA PODSTAWIE LICZBY WYSTĄPIEŃ

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };
  for (let tag in tags) {
    // console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
      // console.log(params.max);
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
      // console.log(params.min);
    }
  }
  return params;
}

// WYKORZYSTANIE PARAMETRU D NADANIA TAGOWI KLASY ODPOWIADAJĄCEJ ZA ROZMIAR

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const precentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(precentage * (opt.cloudClassCount - 1) + 1);
  const classValue = opt.cloudClassPrefix + classNumber;
  return classValue;
}


// WYŚWIETLANIE TAGÓW POD ARTYKUŁEM & WYGENEROWNIE TAGÓW W PRAWYM SIDEBARZE Z WYKORZYSTANIEM ODPOWIEDNIEGO PARAMETRU & KLASY

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opt.articleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      /*const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span> </a></li>' + ' ';*/

      const linkHTMLData = {id: tag, tagName: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {

        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */


  const tagsParams = calculateTagsParams(allTags);
  console.log('tags Params:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  // let allTagsHTML = ' ';
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags */
  for (let tag in allTags) {

    /* [NEW] generate code of a link and add it to allTagsHTML */
    // const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' (' + allTags[tag] + ') </a></li>';
    // console.log('tagLinkHTML:', tagLinkHTML);

    // allTagsHTML += tagLinkHTML
    allTagsData.tags.push({
                    tag: tag,
                    count: allTags[tag],
                    className: calculateTagClass(allTags[tag], tagsParams)
                    });

  }
  /* [NEW] end loop for each tag in allTags */
  const tagList = document.querySelector(opt.tagsListSelector);
  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('tagsData:', allTagsData);
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {

    /* remove class active */
    tagLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let hrefTagLink of hrefTagLinks) {
    /* add class active */
    hrefTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll(opt.tagsLinkSelector);

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

// WYSWIETLANIE AUTORÓW ARTYKUŁÓW - DZIAŁA I FILTRUJE LISTE ARTYKUŁÓW

function generateAuthors() {

  let allAuthors = {};

  const articles = document.querySelectorAll(opt.articleSelector);

  for (let article of articles) {

    const authorWrapper = article.querySelector(opt.articleAuthorSelector);

    let html = ' ';

    const author = article.getAttribute('data-author');

    /*const linkHTML = '<a href="#author-' + author + '"><span>' + author + '</span> </a>';*/

    const linkHTMLData = {id: author, authorName: author};
    const linkHTML = templates.authorLink(linkHTMLData);

    html = html + linkHTML;

    if (!allAuthors.hasOwnProperty(author)) {

      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

    authorWrapper.innerHTML = html;
  }

  // let allAuthorsHTML = ' ';
  const allAuthorsData = { authors: []};

  for (let author in allAuthors) {


    //const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ') </a></li>';
    //console.log('authorLinkHTML:', authorLinkHTML);

    // allAuthorsHTML += authorLinkHTML;
    allAuthorsData.authors.push({
        authorName: author,
        authorCount: allAuthors[author]
        });

  }

  const authorList = document.querySelector(opt.authorsListSelector);

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);

}
generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let authorLink of authorLinks) {

    /* remove class active */
    authorLink.classList.remove('active');

    /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for (let hrefAuthorLink of hrefAuthorLinks) {
    /* add class active */
    hrefAuthorLink.classList.add('active');
    /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to authors */
  const authorLinks = document.querySelectorAll(opt.authorsLinkSelector);

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
