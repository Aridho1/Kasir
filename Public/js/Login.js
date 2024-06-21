console.log("ok");

const handleSubmit = () => {
  
  popUp("notif", "succes");
  
  setTimeout(() => {
    
    getEl("form input", "all")
      .forEach(i => i.value = "");
    
  }, 500);
  
};

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
      if (i + 1 != getEl("input", "all").length) {
        
        arr[i + 1].focus();
        
      // handle last element
      } else {
        
        
        if (
          !input.classList
            .contains("wait-for-request")
        ) {
          
          handleSubmit();
          document.body.focus();
          
          input.classList.add("wait-for-request");
          setTimeout(() => {
            input.classList
              .remove("wait-for-request");
          }, 5000);
          
          
        } else {
          
          popUp("notif", "Please Wait & Try Later.");
          
        }
        
        
        
      }
      
    } // ←← end if e.key
    
  });
  
});

