const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1]

async function createPostFormHandler(event){
    event.preventDefault();

    const title = document.querySelector('input[name="edit-title"]').value.trim();
    const content = document.querySelector("#edit-content").value.trim();
   
    if (title && content)       {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'put',
        body: JSON.stringify({
          title,
          content
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      }
}

async function deletePostFormHandler(event){
  event.preventDefault();

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      post_id: id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#editBtn').addEventListener('click', createPostFormHandler);
document.querySelector('#deleteBtn').addEventListener('click', deletePostFormHandler);