$( document ).ready(function() {

  loadMessages()


  //LOAD MESSAGES
  function loadMessages() {
    let ul = $('#messages-ul')

    //REMOVE OLD messages
    ul.empty()
    const options = {
        dataType: 'json',
        type: 'GET',
        url: `/messages`
      };
    $.ajax(options)
      .done((messages) => {
        for (const message of messages) {

          let li = newLi(message)
          ul.append(li)

        }
      })
      .fail(() => {

      });
  }

  function newLi(message) {
    let li = $("<li>")
    li.text('name: ' + message.name + ' message: ' + message.message)

    let button = $('<button>')
    button.text('x')
    button.click((e) => {
      li.remove()
      deleteItem(message)
    })

    let edit = $('<button>')
    edit.attr('id', 'edit-button')
    edit.text('edit')
    edit.click((e) => {
      //get li
      //change to input
      //set vals to old item
      let form = `<form id="edit-form-${message.id}" class="${message.id}">
        Name:
        <input id='name-edit-${message.id}' type="text" name="firstname" value="${message.name}">

        Message:
        <input id='message-edit-${message.id}' type="text" name="lastname" value="${message.message}">
        <input type="submit" value="Submit">
      </form>`
      li.empty()

      li.append(form)

      let id = message.id

      $(`#edit-form-${message.id}`).submit((e) => {
        e.preventDefault()
        console.log('test')
        //let id = $(`#edit-form-${message.id}`).attr('class')
        const name = $(`#name-edit-${id}`).val()
        const message = $(`#message-edit-${id}`).val()

        patchItem(name, message, id, li)
      })
    })

    li.append(edit)
    li.append(button)

    return li
  }

  function patchItem(name, message, id, li) {
    const options2 = {
        dataType: "json",
        type: 'PATCH',
        url: `/messages/${id}`,
        data: {name: name, message: message}
    };

    $.ajax(options2)
      .done((patched) => {
        li.empty()

        updateLi(patched, li)




        console.log('successful patch')
      })
      .fail(() => {
        console.log('ERROR')
      });
  }

  function updateLi(message, li) {
    li.text('name: ' + message.name + ' message: ' + message.message)

    let button = $('<button>')
    button.text('x')
    button.click((e) => {
      li.remove()
      deleteItem(message)
    })

    let edit = $('<button>')
    edit.attr('id', 'edit-button')
    edit.text('edit')
    edit.click((e) => {
      //get li
      //change to input
      //set vals to old item
      let form = `<form id="edit-form-${message.id}" class="${message.id}">
        Name:
        <input id='name-edit-${message.id}' type="text" name="firstname" value="${message.name}">

        Message:
        <input id='message-edit-${message.id}' type="text" name="lastname" value="${message.message}">
        <input type="submit" value="Submit">
      </form>`
      li.empty()

      li.append(form)

      $(`#edit-form-${message.id}`).submit((e) => {
        e.preventDefault()
        console.log('test')
        let id = $(`#edit-form-${message.id}`).attr('class')
        const name = $(`#name-edit-${message.id}`).val()
        const message = $(`#message-edit-${message.id}`).val()

        patchItem(name, message, id, li)
      })
    })

    li.append(edit)
    li.append(button)
  }

  function deleteItem(item) {
    const options2 = {
        dataType: "json",
        type: 'DELETE',
        url: `/messages/${item.id}`
      };

    $.ajax(options2)
      .done((newitem) => {
        console.log('successful delete')
      })
      .fail(() => {
        console.log('ERROR')
      });
  }

  function post(item) {
    const options2 = {
        dataType: "json",
        type: 'POST',
        url: '/messages',
        data: {name: item.name, message: item.message}
      };

    $.ajax(options2)
      .done((newitem) => {
        let ul = $('#messages-ul')
        let li = newLi(newitem)
        ul.append(li)

        const name = $('#name-input').val('')
        const message =$('#message-input').val('')
      })
      .fail(() => {
        console.log('ERROR')
      });
  }


//CREATE NEW MESSAGE
$('#create-form').submit((e) => {
  e.preventDefault()

  const name = $('#name-input').val()
  const message =$('#message-input').val()

//  console.log(name, message)

  let item = {name: name, message: message}

  post(item)


})




});
