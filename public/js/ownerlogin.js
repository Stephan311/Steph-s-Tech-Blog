const loginFormHandlerB = async () => {
    
  
    const email = document.querySelector('#bemail-login').value.trim();
    const password = document.querySelector('#bpassword-login').value.trim();
    const busname = document.querySelector('#busname-login').value.trim();
  
    if (email && password && busname) {
      const response = await fetch('/api/owners/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, busname }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  const signupFormHandlerB = async () => {
   
  
    const username = document.querySelector('#busername-signup').value.trim();
    const email = document.querySelector('#bemail-signup').value.trim();
    const password = document.querySelector('#bpassword-signup').value.trim();
    const busname = document.querySelector('#busname-signup').value.trim();
  

    if (username && email && password && busname) {
      const response = await fetch('/api/owners', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, busname}),
        headers: { 'Content-Type': 'application/json' },
      });
  
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
 
  