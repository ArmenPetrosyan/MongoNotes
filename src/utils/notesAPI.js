import 'whatwg-fetch';

export function addNote(data) {
  fetch('http://localhost:8080/notes',{
    method:'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      "title": data.title,
      "content": data.content,
      "created": data.created
    })
  }).then(function(response) {
    return response.json();
  }).then(function(json){
    console.log('added', json)
  });
}

export function updateNote(id, note) {
  fetch(`http://localhost:8080/notes/${id}`,{
    method:'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(note)
  }).then(function(response) {
    console.log('Updated: ',response.json());
  });
}