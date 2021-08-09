async function createPostFormHandler(event){
    event.preventDefault();
    alert("yes!!")
}



document.querySelector('.create-form').addEventListener('submit', createPostFormHandler);


