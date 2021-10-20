function salvar(){
    const id = $('#id').val()
    const titulo = $('#titulo').val()
    const descricao = $('#descricao').val()

    if (!titulo) return alert('Campo Titulo é Obrigatorio!')
    if (!descricao) return alert('Campo Descrição é Obrigatorio!')

    const type = !id ? 'post' : 'put'

    $.ajax({
        type: type,
        url: '/notes',
        data: JSON.stringify({title: titulo, description: descricao, id: id}),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            alert(data.message)
            $('#titulo').val('')
            $('#descricao').val('')
            $('id').val('')
            listar()
        },
        erro: function(res){
            alert(res.responseJSON.message)
        }
    });
}

function excluir(id){

    $.ajax({
        type: 'delete',
        url: '/notes',
        data: JSON.stringify({id: id}),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            alert(data.message)
            listar()
        },
        erro: function(res){
            alert(res.responseJSON.message)
        }
    });
}

function editar(id){

    $.ajax({
        type: 'get',
        url: '/notes/' + id,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data)
            $('#titulo').val(data.title)
            $('#descricao').val(data.description)
            $('#id').val(data.id)
        },
        erro: function(res){
            alert(res.responseJSON.message)
        }
    });
}


function listar(){
    $('.list').html('')
    $.ajax({
        type: 'get',
        url: '/notes',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data)
            for(note of data){
                $('.list').append(`
                <div class="items">
                    <h2>${note.title}</h2>
                    <p>${note.description}</p>
                    <button class="gg-close" onclick="excluir('${note.id}')"></button>
                    <button class="gg-pen" onclick="editar('${note.id}')"></button>
                </div>`)
                
            }
        },
        erro: function(res){
            alert(res.responseJSON.message)
        }
    });

}
listar()