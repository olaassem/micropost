import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);

//add post event
document.querySelector('.post-submit').addEventListener('click', submitPost);

//delete post event
document.querySelector('#posts').addEventListener('click', deletePost);

//get posts
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

//submit post
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body
  }

  //create post
  http.post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));
}

function deletePost(e) {
 e.preventDefault();
 
 if (e.target.parentElement.classList.contains('delete')) {
   const id = e.target.parentElement.dataset.id;
   http.delete(`http://localhost:3000/posts/${id}`)
    .then(data => {
      ui.showAlert('Post Removed', 'alert alert-success');
      getPosts()
    })
    .catch(err => console.log(err));
  }
}