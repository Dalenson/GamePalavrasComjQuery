var tempoInicial = $('#contador-tempo').text();
var campo = $('.digitacao')


$(function(){
	contadores();
	iniciaTempo();
	$('#reiniciar').click(reinicia)
	marcador();
});
function contadores(){
	campo.on("input", function(){
		var conteudo = campo.val();
		conteudo = conteudo.split(' ');
		conteudo = conteudo.filter(item => item != '')

		$('#contador-palavras').text(conteudo.length)
		$('#tamanho-caracteres').text(campo.val().length)
	});
}
function iniciaTempo(){
	campo.one("focus", function(){
		time = $('#contador-tempo').text();
		var tempoID = setInterval(function(){
			time--
			$('#contador-tempo').text(time)
			if(time < 1){
				campo.attr('disabled',true)
				clearInterval(tempoID)
				campo.addClass('digitacao-desativado');
			}
		},1000)
		
	});
}
function reinicia(){
	$('.digitacao').val('');
	$('.digitacao').attr('disabled', false);
	$('#contador-palavras').text('0');
	$('#tamanho-caracteres').text('0');
	$('#contador-tempo').text(tempoInicial);
	iniciaTempo();
	$('.digitacao').removeClass('digitacao-desativado');
	$('.digitacao').removeClass('campo-errado');
	$('.digitacao').removeClass('campo-certo');
	$('.marcador').removeClass('correct');
	$('.marcador').removeClass('incorrect');

	console.log($('#frase').text())
}

function marcador(){
	var frase = $('#frase').text();
	campo = $('.digitacao');
	campo.on('input', function(){
		var digitado = campo.val();
		var comparavel = frase.substr(0, digitado.length)
		if(digitado == comparavel){
			$('#frase').html('<mark class="marcador correct">'+comparavel+'</mark>'+frase.substr(digitado.length))
			campo.addClass('campo-certo')
			campo.removeClass('campo-errado')
		}else{
			$('#frase').html('<mark class="marcador incorrect">'+comparavel+'</mark>'+frase.substr(digitado.length))
			campo.addClass('campo-errado')
			campo.removeClass('campo-certo')
		}
	})
}