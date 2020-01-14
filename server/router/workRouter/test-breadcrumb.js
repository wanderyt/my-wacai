// https://www.codewars.com/kata/breadcrumb-generator/train/javascript

function generateBC(url, separator) {
  let validUrl = url.replace(/^(http:\/\/|https:\/\/)/, '').replace(/(\?.*|\#.*)/g, '');
  let breadcrumbItems = validUrl.split('/');
  let nameHandler = (name = '') => {
    if (name.length > 30) {
      var ignoreStrings = ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"];
      return name.split('-').filter((n) => !(ignoreStrings.includes(n))).map((n) => n.charAt(0).toUpperCase()).join('');
    } else {
      return name.replace(/-/g, ' ').toUpperCase();
    }
  }
  /(index.(html|htm|asp|php))/.test(breadcrumbItems[breadcrumbItems.length - 1]) && breadcrumbItems.pop();
  let linkHandler = (index, array) => {
    let url = array.slice(1, index + 1);
    return `/${url.join('/')}/`;
  }
//   console.log(breadcrumbItems);
  let breadcrumbs = breadcrumbItems.map((item, index) => {
//     console.log(item, ' ', index);
    switch (index) {
      case 0:
        return '<a href="/">HOME</a>';
      case breadcrumbItems.length - 1:
        return `<span class="active">${nameHandler(item).replace(/(\.HTML|\.HTM|\.ASP|.PHP)/, '')}</span>`;
      default:
        return `<a href="${linkHandler(index, breadcrumbItems)}">${nameHandler(item)}</a>`;
    }
  });

  return breadcrumbs.join(separator);
}

generateBC('www.agcpartners.co.uk/', ' >>> ')