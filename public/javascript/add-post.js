async function createPostFormHandler(event){
  event.preventDefault();
  alert("yes!!")

  const title = document.querySelector('input[name="add-title"]').value.trim();
  const content = document.querySelector("#add-content").value.trim();

  if (title && content){
    const response = await fetch('/api/posts', {
      method: 'post',
      body: JSON.stringify({
        title,
        content
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
}

function showForm () {
  document.getElementById("add-post").style.display = "block";
}


document.querySelector('.create-form').addEventListener('submit', createPostFormHandler);
document.querySelector('#new-btn').addEventListener('click', showForm);


