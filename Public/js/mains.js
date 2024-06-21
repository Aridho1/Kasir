

const fetchData = async (  url, type  ) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = () => {
    
      if (xhr.readyState==4) {
        if (xhr.status==200) {
          resolve(xhr.responseText);
        } else reject("Failed to fetch data: " + xhr.status)
      }
    };
    
    xhr.open(type, url, true);
    xhr.send();
  });
};

const main = async ({ url, type, callback}) => {
  try {
    const result = await fetchData(url, type || "GET");

    if ( typeof callback==="function" ) callback(result);
    
  } catch (error) { 
    console.error(error); 
  }
};

const fileExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    
    return response.ok ? true : false;

  } catch (error) {
    console.error('Error checking file:', error);
  }
};

const getUrl = (findThis = "url") => {

  const real_url = window.location.href;

  const [
    base_url,
    query
  ] = real_url.split("?");

  console.log(query);

  const list_query = 
    query
    .split("&")
  ;

  const list_query_name = list_query.map(query_name => query_name.split("="));

  const result = list_query_name.filter(r => r[0] === findThis);

  return [base_url, result[0]];

};

const valid_url = "url";
const defaultUrl = "Login";

const [ base_url, url ] = getUrl();

const __config__ = async () => {

  if ( !url || !await fileExists(`${ url[1] }/index.html`) ) window.location.href = base_url + "?" + valid_url + "=" + defaultUrl;

};

__config__();

main({ url: `${ url[1] }/index.html`, callback: async (result) => {
  
  // handle add content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = result;

  document.querySelector('.break-line')
    .insertAdjacentHTML('afterend', tempDiv.innerHTML);
  
  // handle create and add link
  const first_link = document.querySelector("head link");
  const new_href = first_link.href.split("/").map((link, i) => {
    if ( i == first_link.href.split("/").length - 1 ) return url[1] + ".css";
    else return link;
  }).join("/");

  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", new_href);
  link.setAttribute("class", "my-css");
  
  if ( await fileExists(new_href) ) document.querySelector("head").insertAdjacentElement("beforeend", link);


  // handle create and add script
  const new_script = document.createElement("script");
  new_script.setAttribute("src", new_href.replace(/css/g, "js"));

  if ( await fileExists(new_href.replace(/css/g, "js")) ) document.body.insertAdjacentElement("beforeend", new_script);

  // document.body.innerText += document.body.innerHTML;

}});


const popUp = (type, text, time) => {

  type ||= "notif";

  time ||= 2500;

  if ( type === "notif" ) {

    if ( !document.querySelector(".pop-up") ) {
      document.body.innerHTML += `<div class="pop-up">
        Welcome TO MY APP
      </div>`
    }

    const pop = document.querySelector(".pop-up");

    if ( text ) pop.innerHTML = text;

    setTimeout(() => {
      pop.classList.add("show");

      setTimeout(() => {
        pop.classList.remove("show");
      }, time);
    }, 300);

  }

};

popUp();