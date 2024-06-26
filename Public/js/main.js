

const fetchData = async (  url, type  ) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = () => {
    
      if (xhr.readyState==4) {
        if (xhr.status==200) {
          resolve(xhr.responseText);
        } else reject("Failed to fetch data: " + xhr.status + " ::url:: " + url)
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
    
    // console.error(url);
    
    if ( typeof callback == "function" ) callback(response.ok, url);
    
    return response.ok ? true : false;

  } catch (error) {
    console.error('Error checking file:', error);
  }
};

const getEl = (selector = "body", type = "") => {
  
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


const valid_url = "url";
const default_url = "Home";

const getUrl = (findThis = "url") => {
  
  if ( !window.location.search.includes("?") ) {
    window.location.href = 
      `?${ valid_url }=${ default_url }&document=window`;
    return false;
  }

  const list_query = 
    window.location.search.replace("?", "").split("&");

  const list_query_name = list_query.map(query_name => query_name.split("="));

  const result = list_query_name.filter(r => r[0] === findThis);

  return [result[0][1], list_query];

};

const [ url, list_query ] = getUrl();

// all set
const config = {

  log: [],

  addLog(...data) {
    
    this.log.push(data.join(" "));

  },

  showLog(console_type = "log") {

    this.log.map(log => console[console_type](log));

  },

  auto_content: [
    {
      name: url,
      path: url + "/index.html",
      ignore_to: []
    },
    {
      name: "Navbar",
      path: "Navbar/index.html",
      ignore_to: [
        "Login"
      ]
    },
  ],

  applyAutoContent() {

    console.log(this);

    this.auto_content.map(async (ac, i) => {

      if ( ac.ignore_to.includes(url) ) {
        // console.error(`Ignore ${ ac.name }!`);
        this.addLog(`Ignore ${ ac.name }!`);
        return false;
      }
      
      const content_is_exists = await fileExists(ac.path);

      if ( !content_is_exists ) {
        // console.error(ac.name, "Is Not Exists. Path :", ac.path);
        this.addLog(ac.name, "Is Not Exists. Path :", ac.path);
        return false;
      }

      main({
        url: ac.path,
        callback: result => {

          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = result;

          const position = i === 0 ? "afterend" : "beforebegin";

          getEl('.break-line')
            .insertAdjacentHTML(position, tempDiv.innerHTML);
          
          this.loadSupportContent(ac.name);
        }
      });
      
    });

  },

  async loadSupportContent (content_name) {

    // handle create and add link
    const first_link = getEl("head link");
    const new_href = 
      first_link.getAttribute("href")
      .split("/").map((link, i, old_link) => {
        if ( i == old_link.length - 1 ) return content_name + ".css";
        else return link;
      }).join("/");
    
    // alert(new_href);
    // console.log(new_href);
    
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", new_href);
    link.setAttribute("class", content_name.toLowerCase() + "-css");
    
    const href_exists = await fileExists(new_href);
    
    if ( href_exists ) {
      getEl("head").appendChild(link);
    }


    // handle create and add script
    const new_script = document.createElement("script");
    new_script.setAttribute("src", new_href.replace(/css/g, "js"));
    
    const script_exists = await 
      fileExists(new_href.replace(/css/g, "js"));
    
    
    if ( script_exists ) {
      document.body.appendChild(new_script);
    }

  },

  async real_config() {
    
    const exists = 
      await fileExists(`${ url }/index.html`);
    
    if ( !url || !exists ) {
      window.location.href = 
        `?${ valid_url }=${ default_url }`;
    }
    
    this.applyAutoContent();

  }
};

config.real_config();



const requestWait = {
  data: [
    {
      name: "Ajax",
      is_wait: false,
      spam: {
        total: 0,
        num: 0
      }
    }
  ],
  
  get(name) {
    return this.data.find(data => data.name == name);
  },

  set(name) {

    // reject duplicate
    if ( this.get(name) ) return false;

    this.data.push({
      name,
      is_wait: false,
      spam: {
        total: 0,
        num: 0
      }
    });

    // console.log("Succes Create New Request wait");
    config.addLog(`Create New Request. (${ name })`);

  },

  fill(name, time) {

    // reject un defined
    if ( !this.get(name) ) return false;

    this.data = this.data.map(data => {

      if ( data.name === name ) {

        data.is_wait = true;

        if ( time ) {
          setTimeout(() => {

            this.clear(name);

          }, time);
        }

      }

      return data;

    });
    
  },
  
  clear(name) {

    // reject un defined
    if ( !this.get(name) ) return false;

    // reject un wait
    if ( !this.get(name).is_wait ) return false;
  
    this.data = this.data.map(data => {
  
      if ( data.name === name ) {

        data.is_wait = false;
        data.spam.num = 0;

      }
  
      return data;
  
    });
    
  },
  
  listen(name, add = 0) {
    
    // reject un defined
    if ( !this.get(name) ) return false;

    // reject un wait
    if ( !this.get(name).is_wait ) return false;
    
    this.data = this.data.map(data => {
    
      if ( data.name === name ) {
    
        data.spam.total += 1;
        data.spam.num += 1 + add;
    
      }
    
      return data;
    
    });

  },

  isWait(name) {
    if ( this.get(name) ) return this.get(name).is_wait;
  },
  
  isSpam(name, add = 0) {
    if ( this.get(name) ) {

      this.listen(name, add);

      return this.get(name).spam.num > 1;
    }
  }
  
};


const popUp = (type, text, time) => {

  type ||= "notif";

  time ||= 2500;

  if ( type === "notif" ) {

    if ( !getEl(".pop-up") ) {
      getEl().innerHTML += `<div class="pop-up">
        Welcome TO MY APP
      </div>`
    }

    const pop = getEl(".pop-up");

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


const reCreate = {
  path_public: "Public",
  async css( sure ) {
    
    if ( !sure ) return false;
    
    // console.log(base_url, "::", path_public);
    const back_track_num =
      getEl("head link")
      .getAttribute("href")
      .split("../").length - 1
    ;
    
  },
};

//reCreate.css( true );

const redirect = (find_this = "redirect") => {
  
  // get url
  const yes = getUrl(find_this)[0];
  
  // create newQuery a no find_this
  const new_query = list_query.filter(query => 
    ( query.includes("=") && 
      query.split("=")[0] != find_this ));
  
  console.log(new_query);
  
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
  
  if ( !getEl(".refresh") ) return false;

  getEl(".refresh").addEventListener("click", e => {
    
    if ( confirm("Refresh?") ) redirect();
    
  });
  
}, 5000);

console.log(window.location.href);














let uri = "Login/index.html";

fileExists(uri, (exists) => {
  
  //document.body.innerHTML += `Login is exists : ${ exists }`;
  
//console.error(`${ uri } is exists : ${ exists }`);
  
  main({
    url: uri,
    callback: result => {
      
      console.log( 
        (result && !exists)
        ? "Bad Request!.\nMaxsure Apache Is Turn On"
        : "Good Request. Its Work."
      );
      
    }
  });
  
});
