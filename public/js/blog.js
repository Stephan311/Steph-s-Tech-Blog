const blogUpdate = async (event) => {
    event.preventDefault();
    let id = "";
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#body').value.trim();
    if(document.querySelector('#blog_id') && document.querySelector('#blog_id').value !== ""){
      id = document.querySelector('#blog_id').value.trim();
    }
    if(id === ""){

          if (title && body) {
             
              const response = await fetch('/', {
                  method: 'POST',
                  body: JSON.stringify({ title, author, body }),
                  headers: { 'Content-Type': 'application/json' },
              });
  
              if (response.ok) {
             
              document.location.replace('/');
              } else {
              alert('Failed to add Blog.');
              }
          }
    }else{
      if (id && title && body) {
         
          const response = await fetch('/'+id, {
              method: 'PUT',
              body: JSON.stringify({title, body}),
              headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
         
          document.location.replace('/');
          } else {
          alert('Failed to update Blog.');
          }
      }
    }
  };
  const blogDelete = async (event) => {
      event.preventDefault();
      let id = "";
      if(document.querySelector('#blog_id') && document.querySelector('#blog_id').value !== ""){
        id = document.querySelector('#blog_id').value.trim();
        const prompt1 = confirm("Do you want to delete the selected blog record?\nClick OK for Yes");
        if(!prompt1){return false;}
      }     
      if (id) {
          
          const response = await fetch('/'+id, {
              method: 'DELETE',
              body: JSON.stringify({}),
              headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
          document.location.replace('/');    
          } else {
          alert('Failed to delete blog.');
          }
      }
      
    };
  if(document.querySelector('#cust_delete')){
      document.querySelector('#cust_delete').addEventListener('click', blogDelete);
  }
  document
    .querySelector('#blog-form')
    .addEventListener('submit', blogUpdate);