
getEl(".button-none").style.display = "none";

let req_wait = false;

const handleSubmit = (valid = true) => {
  
  // all input must have value.
  // otherwise, focus to element with no value.
  getEl("form input", "all").forEach((input) => {
    
    // reject filter when already not valid.
    // set not valid and focus when value is empty.
    if ( valid && input.value == "" ) {
      valid = false;
      input.focus();
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
  if ( req_wait ) {
    popUp("notif", "Please Wait & Try Later!");
    return false;
  }
  
  // otherwise --
  
  // make req wait
  req_wait = true;
  
  // remove req wait after 5000 ms | 5s
  setTimeout(() => {
    req_wait = false;
  }, 5000);
  
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
    
  } else popUp("notif", "Failed!");
  
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
