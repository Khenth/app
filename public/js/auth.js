const miFormulario = document.querySelector('form')

miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData ={};

    for(let el of miFormulario.elements){
        if(el.name.length > 0)
        formData[el.name] = el.value
    }
    fetch('http://localhost:8080/api/auth/login',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
           'Content-Type':'application/json'
        },
     })
     .then( res => res.json())
     .then(({token}) =>{
        localStorage.setItem('token', token)
        window.location = 'chats.html'
      })
      .catch(console.warn);
   })
   
   
   
   function handleCredentialResponse(response) {
      // decodeJwtResponse() is a custom function defined by you
      // to decode the credential response.
      
      //google token : id token
      //   console.log('id toekn', response.credential);
      const body = {id_token: response.credential};
      fetch('http://localhost:8080/api/auth/google',{
         method: 'POST',
         headers: {
            'Content-Type':'application/json'
         },
         body: JSON.stringify(body)
      })
      .then( res => res.json())
      .then(({token}) =>{
         window.location = 'chats.html'
         localStorage.setItem('token', token)
      })
      .catch(console.warn);
      
 }