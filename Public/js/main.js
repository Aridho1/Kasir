

const fetchData = async (  url, type  ) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = () => {
    
      if (xhr.readyState==4) {
        if (xhr.status==200) {
          resolve(xhr.responseText);
        } else reject("Failed to fetch data: " + xhr.status + " ::url::" + url)
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

const fileExists = async (url, callback) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    
    console.error(url);
    
    if ( typeof callback == "function" ) callback(response.ok, url);
    
    return response.ok ? true : false;

  } catch (error) {
    console.error('Error checking file:', error);
  }
};

const getEl = (selector, type = "") => {
  
  const qs = 
    type.toLowerCase() === "all" 
    ? "querySelectorAll" 
    : "querySelector";
  
  return document[qs](selector);
  
};

const getProperties = (obj, type) => {
  
  if ( typeof obj !== "object" ) return false;
  
  const result = [];
  
  for ( const key in obj ) {
    
    result.push(key);
    
  }
  
 return type 
   ? result.filter(r => typeof obj[r] === type)
   : result;
  
};

const getUrl = (findThis = "url") => {

  const real_url = window.location.href;

  const [
    base_url,
    query
  ] = real_url.split("?");

  if ( !query ) window.location.href = "?url=login";

  const list_query = 
    query
    .split("&")
  ;
  
  console.error(list_query);
  console.error(Array.isArray(list_query));

  const list_query_name = list_query.map(query_name => query_name.split("="));

  const result = list_query_name.filter(r => r[0] === findThis);

  return [base_url, result[0], list_query];

};

const valid_url = "url";
const defaultUrl = "Login";

const [ base_url, url, list_query ] = getUrl();


fileExists(`${ url[1] }/index.html`, (exists, url) => {
  //alert(url + " is exists = " + exists);
});




const __config__ = async () => {
  
  const exists = 
    await fileExists(`${ url[1] }/index.html`);
  
  console.log(
    !url + " " + !exists
  );
  
  console.log(
    !url || !exists
  );
  
  if ( !url || !exists ) {
    window.location.href = 
      base_url + "?" + valid_url + "=" + defaultUrl;
  }
  
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

popUp("notif", "Welcome");



const redirect = (find_this = "redirect") => {
  
  // get url
  const yes = getUrl(find_this)[1];
  
  // create newQuery a no find_this
  const new_query = list_query.filter(query => ( query.includes("=") && query.split("=")[0] != find_this ));
  
  const redir_to = 
    ( yes && yes.length>0 && yes[1] == "yes")
    ? "true"
    : "yes"
  ;
  
  window.location.href = 
    `?${
      new_query.join("&")
    }&${
      find_this
    }=${
      redir_to
    }`
  ;
  
};

// resfresh methode
setTimeout(() => {
  
  getEl(".refresh").addEventListener("click", e => {
    
    if ( confirm("Refresh?") ) redirect();
    
  });
  
}, 5000);

console.log(window.location.href);




let uri = "Login/index.html";
/*
fileExists(uri, (exists) => {
  
  //document.body.innerHTML += `Login is exists : ${ exists }`;
  
  console.error(
    `${ uri } is exists : ${ exists }`
  );
  
  main({
    url: uri,
    callback: result => {
      console.log(result);
      document.body.innerText = exists;
    }
  });
  
});
*/
