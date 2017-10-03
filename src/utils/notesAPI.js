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
    // console.log(response.json());
  });
}

export const getAllNotes = async() => {
  const resp =  await fetch('http://localhost:8080/notes');
  const json =  await resp.json();
  return json;
};


export function getNoteByTitle(title) {

}