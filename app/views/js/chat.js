        
  // Manages communication on client side with server


	$('.sendBtn').click('on',function(){

		 chatMessage = $('#textarea1').val();

		 socket.emit("chatMessages",chatMessage);
		 

	})


	socket.on('toMessage',function(msg){

		$('#messageBox').text(msg);

	})
	
