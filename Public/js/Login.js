
getEl(".button-none").style.display = "none";

let req_wait = false;
requestWait.set("btn-submit");
requestWait.set("btn-cancel");

const handleSubmit = (valid = true) => {
  
  // all input must have value.
  // otherwise, focus to element with no value.
  getEl("form input", "all").forEach((input) => {
    
    // reject filter when already not valid.
    // set not valid and focus when value is empty.
    if ( valid && input.value == "" ) {
      valid = false;
      if ( document.activeElement !== input ) {
        input.focus();
      }
    }
    
  });
  
  // reject methode when not valid
  if ( !valid ) return false;
  
  // otherwise --
  
  // remove all value
  getEl("form input", "all").forEach((input) => {
    
    input.value = "";
    
    if ( input != document.activeElement ) {
      
      const legend = input.previousElementSibling;
      legend.classList.remove("show");
      
    } else input.focus();
    
  });
  
  // reject methode when req wait
  if ( requestWait.isWait("btn-submit") ) {

    if ( requestWait.isSpam("btn-submit") ) {
      console.error("spam submit");
    } else popUp("notif", "Please Wait & Try Later!");

    return false;
  }
  
  // otherwise --
  
  // make req wait
  req_wait = true;
  requestWait.fill("btn-submit", 10000);
  
  // set popUp
  popUp("notif", "succes");
  
};

const hanldeCancel = (isset_value = []) => {
  
  getEl("form input", "all").forEach((input) => {
    isset_value.push(input.value == "" ? false : true);
  });
  
  if ( isset_value.includes(true) ) {
    
    getEl("form input", "all").forEach((input) => {
      
      input.value = "";
      
      if ( input != document.activeElement ) {
        
        const legend = input.previousElementSibling;
        legend.classList.remove("show");
        
      } else input.focus();
      
    });
    
  } else {
    if ( !requestWait.isSpam("btn-cancel", 1) ) {

      popUp("notif", "Failed!");

      if ( !requestWait.isWait("btn-cancel") ) {
        requestWait.fill("btn-cancel", 10000);
      }

    } else console.error("spam cancel");
  }
  
};

// reject sumit for all elemen
document.body.addEventListener("submit", e => {
  
  e.preventDefault();

});

getEl("form input", "all").forEach((input, i, arr) =>{
  
  const legend = input.previousElementSibling;
  
  // handle legend
  input.addEventListener("focus", e => {
    
    legend.classList.add("show");
    
  });
  
  // handle legend
  input.addEventListener("blur", e => {
    
    if ( input.value == "" ) {
      
      legend.classList.remove("show");
      
    }
    
  });
  
  // handle next focus | submit
  input.addEventListener("keydown", e => {
    
    if ( e.key === "Enter" ) {
    
      // reject when empty value
      if ( input.value === "" ) {
      
        input.classList.add("invalid");
        
        setTimeout(() => {
          input.classList.remove("invalid");
        }, 2000);
        
        return false;
      }
      
      console.log("next");
      
      // handle - not last element
      if ( i + 1 != getEl("input", "all").length ) {
        
        arr[i + 1].focus();
        
      // handle last element
      } else {
        
        handleSubmit();
        
      }
      
    } // ←← end if e.key
    
  });
  
});



getEl(".button-submit").addEventListener("click", e => {
  
  handleSubmit();
  
});


getEl(".button-cancel").addEventListener("click", e => {
  
  hanldeCancel();
  
});
