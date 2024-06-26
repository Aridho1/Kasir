const req = {
  wait: {
    nav: {
      header: false
    }
  }
}


const toggleNav = (attr) => {
  
  attr ||= 'toggle';
  
  getEl("nav ul").classList[attr]("show");
  
  getEl(".hamburger-menu input").checked = 
    getEl("nav ul").classList.contains("show") 
    ? true
    : false;
  
};


const wait_to_magic_li = 700;

const start_top_magic_li = 
  getEl("nav ul li.magic-li").offsetTop;


const setPosMagicLi = () => {
  
  getEl("nav li.magic-li").style.marginTop =
    getEl("nav ul li.active").offsetTop -
    start_top_magic_li + "px"
  ;
  
};

const setNavLiActive = (e) => {
  
  const target_is_li = 
    e.target.tagName == "LI" ? true : false;
  
  if ( !target_is_li ) e.preventDefault();
  
  getEl("nav ul li", "all").forEach((li, i) => {
    li.classList.remove("active");
    
    if ( 
      (target_is_li && li == e.target) ||
      li.querySelector("a") == e.target
    ) {
      
      li.classList.add("active");
      setPosMagicLi();
      
      setTimeout(() => {
        toggleNav();
      }, wait_to_magic_li);
      
    }
  });
  
};


const redirectByNavLi = (
  reject_by_class = ["active"]
) => {
  
  setPosMagicLi();
  
  const redir_by_li = getEl("nav ul")
    .getAttribute("redirect-by-li") == "true"
      ? true : false
  ;
  
  getEl("nav ul li", "all").forEach(li => {
    
    li.addEventListener("click", e => {
      
      let is_reject = reject_by_class.find(reject => 
        li.classList.value.includes(reject));
      
      if ( req.wait.nav.header ) {
        if ( e.target.tagName == "A" ) e.preventDefault();
        
        return false;
      }
      
      else if ( is_reject ) {
        console.error(
          e.target.innerText + 
          " Already Active!"
        );
        
        if ( e.target.tagName == "A" ) e.preventDefault();
        
        return false;
      }
      
      setNavLiActive(e);
      
      let redirect = "none";
      
      if ( e.target.tagName === "LI" ) {
        redirect = e.target.querySelector("a").href; 
      } else if ( e.target.tagName === "A" ) {
        redirect = e.target.href;
      }
      
      if ( redirect != "none" ) {
        
        req.wait.nav.header = true;
        
        setTimeout(() => {
          req.wait.nav.header = false;
          if ( redir_by_li ) {
            //window.location.href = redirect;
            console.log(redirect);
          }
          
        }, wait_to_magic_li);
      } else console.error("Cannot Find Href Nav");
      
    });
    
  });
  
};



  
  redirectByNavLi();
  
  document.body.addEventListener("click", e => {
    
    // ↓↓ handle mobile nav
    // fix add - remove
    if ( e.target.closest(".hamburger-menu") ) {
      
      const set_to = 
        getEl(".hamburger-menu input")
          .checked === true
          ? "add"
          : "remove"
      ;
      
      toggleNav(set_to);
      
    } else if ( e.target == getEl("nav ul") ) {
      
      toggleNav("remove");
      
    } else if ( e.target.closest("nav ul") ) {
      
      // empty
      // do not fill this 
      
    } else {
      
      toggleNav("remove");
      
    } // ←← end handle mobile nav
    
  });
  
