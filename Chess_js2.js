switch_sides(); 
	
	  function piece_1click(elmnt){
		  if (elmnt.id.indexOf(t_move)<0)
			return null;
		  
		  isCheck();
		  
		  
		  if ((l_ch) && (document.getElementById("king_l0").style.background != 'red'))
			document.getElementById("king_l0").style.background = 'red';
		  if ((d_ch) && (document.getElementById("king_d0").style.background != 'red'))
			document.getElementById("king_d0").style.background = 'red';
		  
		  if (numSldPcs==0){
			elmnt.style.background = 'blue';
			numSldPcs++; sld.push(elmnt);
			displaySquares(elmnt);
			  }
		  else if (elmnt.style.background != 'blue') {
			turnOffSquares(sld[0]);
		    sld[0].style.background = '';
			numSldPcs=0; sld=[];
			elmnt.style.background = 'blue';
			numSldPcs++; sld.push(elmnt);
			displaySquares(elmnt);
			}
		  else {
			turnOffSquares(elmnt);
		    elmnt.style.background = '';
			numSldPcs=0; sld=[];}
			
			
			if ((l_ch) && (elmnt.id!=("king_l0")) && (document.getElementById("king_l0").style.background != 'red'))
				document.getElementById("king_l0").style.background = 'red';
			if ((d_ch) && (elmnt.id!=("king_d0")) && (document.getElementById("king_d0").style.background != 'red'))
				document.getElementById("king_d0").style.background = 'red';
				
			
			
			
			}

		  

		
			
		function hSquare_click(elmnt){
			var t_var8 = elmnt.getAttribute("loc");
			movePiece(sld[0],elmnt.getAttribute("loc"));
			if (castled){
				castled = false;
				if (elmnt.getAttribute("loc") == "76"){
						var t_var6 = document.getElementById("rook_l1");
						movePiece(t_var6,"75");
						t_var6.setAttribute("moved","yes");
						rec_moves[move_num][0]="O-O";
						}
				else if (elmnt.getAttribute("loc") == "06"){
						var t_var6 = document.getElementById("rook_d1");
						movePiece(t_var6,"05");
						t_var6.setAttribute("moved","yes");
						rec_moves[move_num-1][1]="O-O";
						}
				else if (elmnt.getAttribute("loc") == "72"){
						var t_var6 = document.getElementById("rook_l0");
						movePiece(t_var6,"73");
						t_var6.setAttribute("moved","yes");
						rec_moves[move_num][0]="O-O-O";
						}
				else if (elmnt.getAttribute("loc") == "02"){
						var t_var6 = document.getElementById("rook_d0");
						movePiece(t_var6,"03");
						t_var6.setAttribute("moved","yes");
						rec_moves[move_num-1][1]="O-O-O";
						}
				
				//alert(rec_moves);
				}
			
			}
		