 			var numSldPcs = 0;
			 var sld = [];
			 var cptd =[];
			 var t_move = 'd';
			 var l_ch = false;
			 var d_ch = false;
			 var l_cm = false;
			 var d_cm = false;
			 var castled = false;
			 var rec_moves=[["",""]];
			 var move_num = 0;
			 var k_covSq_list_l=[];
			 var k_covSq_list_d=[];
			 var bpos = [['rook_d0','knight_d0','bishop_d0','queen_d0','king_d0','bishop_d1','knight_d1','rook_d1'],
						 ['pawn_d0','pawn_d1','pawn_d2','pawn_d3','pawn_d4','pawn_d5','pawn_d6','pawn_d7'],
						 [0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0],
						 [0,0,0,0,0,0,0,0],
						 ['pawn_l0','pawn_l1','pawn_l2','pawn_l3','pawn_l4','pawn_l5','pawn_l6','pawn_l7'],
						 ['rook_l0','knight_l0','bishop_l0','queen_l0','king_l0','bishop_l1','knight_l1','rook_l1']];
			 var w_LaskPoints = 0;
			 var b_LaskPoints = 0;
			 
			 
			 
			 
			 function legalSquares(elmnt){
				var cov_sqList=[];
				var leg_sqList=[];
				var elmnt_loc=elmnt.getAttribute("loc");
				var elmnt_type=elmnt.getAttribute("id").substring(0,4);
				var elmnt_color=elmnt.getAttribute("id").charAt(elmnt.getAttribute("id").length-2);
				
				var el_vert = parseFloat(elmnt_loc[0]);
				var el_horz = parseFloat(elmnt_loc[1]);
				
	
				
				if (elmnt_type == "pawn"){																										//PAWN
				  if (elmnt_color=='l'){																									//WHITE PAWN
					cov_sqList.push((el_vert-1).toString()+(el_horz-1).toString());
				    cov_sqList.push((el_vert-1).toString()+(el_horz+1).toString());
					if (((el_vert-1)>=0) && ((bpos[el_vert-1][el_horz])==0))																		//Check square in front of pawn is on the board and empty
						leg_sqList.push((el_vert-1).toString() + el_horz.toString());
					if ((el_vert==6) && ((bpos[el_vert-1][el_horz])==0) && ((bpos[el_vert-2][el_horz])==0))											//Check if pawn can still move two squares up.
						leg_sqList.push((el_vert-2).toString() + el_horz.toString());
					if (el_horz>0){
						if (((el_vert-1)>=0) && ((bpos[el_vert-1][el_horz-1])!=0) && (((bpos[el_vert-1][el_horz-1]).indexOf('d'))>0))   			//Check if the pawn can take left
							leg_sqList.push((el_vert-1).toString()+(el_horz-1).toString());
						if (el_vert==3){
							if (rec_moves[move_num-1][1] == convertNotation(el_vert.toString() + (el_horz-1).toString()))
								leg_sqList.push((el_vert-1).toString()+(el_horz-1).toString());
							
							}
						}
					if (el_horz<7){
						if (((el_vert-1)>=0) && ((bpos[el_vert-1][el_horz+1])!=0) && (((bpos[el_vert-1][el_horz+1]).indexOf('d'))>0))   			//Check if the pawn can take right.
							leg_sqList.push((el_vert-1).toString()+(el_horz+1).toString());
						if (el_vert==3){
							if (rec_moves[move_num-1][1] == convertNotation(el_vert.toString() + (el_horz+1).toString()))
								leg_sqList.push((el_vert-1).toString()+(el_horz+1).toString());
							
							}
						}
					}
				  else{																															//BLACK PAWN
				    cov_sqList.push((el_vert+1).toString()+(el_horz-1).toString());
				    cov_sqList.push((el_vert+1).toString()+(el_horz+1).toString());
					if (((el_vert+1)<=7) && ((bpos[el_vert+1][el_horz])==0))																		//Check square in front of pawn is on the board and empty.
						leg_sqList.push((el_vert+1).toString() + el_horz.toString());
					if ((el_vert==1) && ((bpos[el_vert+1][el_horz])==0) && ((bpos[el_vert+2][el_horz])==0))											//Check if pawn can still move two squares up.
						leg_sqList.push((el_vert+2).toString() + el_horz.toString());
					if (el_horz>0){
						if (((el_vert+1)<=7) && ((bpos[el_vert+1][el_horz-1])!=0) && (((bpos[el_vert+1][el_horz-1]).indexOf('l'))>0))   			//Check if the pawn can take right.
							leg_sqList.push((el_vert+1).toString()+(el_horz-1).toString());
						if (el_vert==4){
							if (rec_moves[move_num][0] == convertNotation(el_vert.toString() + (el_horz-1).toString()))
								leg_sqList.push((el_vert+1).toString()+(el_horz-1).toString());
							
							}
						}
					if (el_horz<7){
						if (((el_vert+1)<=7) && ((bpos[el_vert+1][el_horz+1])!=0) && (((bpos[el_vert+1][el_horz+1]).indexOf('l'))>0))  				//Check if the pawn can take left.
							leg_sqList.push((el_vert+1).toString()+(el_horz+1).toString());
						if (el_vert==4){																											
							if (rec_moves[move_num][0] == convertNotation(el_vert.toString() + (el_horz+1).toString()))
								leg_sqList.push((el_vert+1).toString()+(el_horz+1).toString());
							
							}
						}
					}
	
				
				//HAVE YET TO ACCOUNT FOR... , Pawn promotion
				}
				
				
				
					
				else if (elmnt_type == "rook"){																						//ROOK

					var lastStopN=false;
					var lastStopE=false;
					var lastStopS=false;
					var lastStopW=false;
					
					for(var i=1;(!(lastStopN) || !(lastStopE) || !(lastStopS) || !(lastStopW));i++){
						if ((el_horz+i)>7)
							lastStopE=true;
						if ((el_vert-i)<0)
							lastStopN=true;
						if ((el_vert+i)>7)
							lastStopS=true;
						if ((el_horz-i)<0)
							lastStopW=true;
							
						
						if(!(lastStopN)){																											//Northward
							if((bpos[el_vert-i][el_horz])==0){
								leg_sqList.push((el_vert-i).toString() + el_horz.toString());
								cov_sqList.push((el_vert-i).toString()+(el_horz).toString());}
							else{
								cov_sqList.push((el_vert-i).toString()+(el_horz).toString());
								if (((bpos[el_vert-i][el_horz]).substring(0,4)=='king') && ((bpos[el_vert-i][el_horz]).indexOf(elmnt_color)<0) && ((el_vert-i)>0))
									cov_sqList.push((el_vert-i-1).toString()+(el_horz).toString());
	
								if ((bpos[el_vert-i][el_horz]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White rook runs into one of its own pieces
										lastStopN=true;
									else{																											//Black rook has option to take white piece
										leg_sqList.push((el_vert-i).toString() + el_horz.toString());
										lastStopN=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black rook runs into one of its own pieces
										lastStopN=true;
									else{																											//White rook has option to take black piece
										leg_sqList.push((el_vert-i).toString() + el_horz.toString());
										lastStopN=true;
									}
								
								
								}
							}
						}
						
						if(!(lastStopE)){																											//Eastward
							if((bpos[el_vert][el_horz+i])==0){
								leg_sqList.push(el_vert.toString() + (el_horz+i).toString());
								cov_sqList.push(el_vert.toString()+(el_horz+i).toString());}
							else{
								cov_sqList.push(el_vert.toString()+(el_horz+i).toString());
								if (((bpos[el_vert][el_horz+i]).substring(0,4)=='king') && ((bpos[el_vert][el_horz+i]).indexOf(elmnt_color)<0) && ((el_horz+i)<7))
									cov_sqList.push((el_vert).toString()+(el_horz+i+1).toString());
								
								if ((bpos[el_vert][el_horz+i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White rook runs into one of its own pieces
										lastStopE=true;
									else{																											//Black rook has option to take white piece
										leg_sqList.push(el_vert.toString() + (el_horz+i).toString());
										lastStopE=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black rook runs into one of its own pieces
										lastStopE=true;
									else{																											//White rook has option to take black piece
										leg_sqList.push(el_vert.toString() + (el_horz+i).toString());
										lastStopE=true;
									}
								
								
								}
							}
						}
					
						if(!(lastStopS)){																											//Southward
							if((bpos[el_vert+i][el_horz])==0){
								leg_sqList.push((el_vert+i).toString() + el_horz.toString());
								cov_sqList.push((el_vert+i).toString()+(el_horz).toString());}
							else{
								cov_sqList.push((el_vert+i).toString()+(el_horz).toString());
								if (((bpos[el_vert+i][el_horz]).substring(0,4)=='king') && ((bpos[el_vert+i][el_horz]).indexOf(elmnt_color)<0) && ((el_vert+i)<7))
									cov_sqList.push((el_vert+i+1).toString()+(el_horz).toString());
								
								if ((bpos[el_vert+i][el_horz]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White rook runs into one of its own pieces
										lastStopS=true;
									else{																											//Black rook has option to take white piece
										leg_sqList.push((el_vert+i).toString() + el_horz.toString());
										lastStopS=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black rook runs into one of its own pieces
										lastStopS=true;
									else{																											//White rook has option to take black piece
										leg_sqList.push((el_vert+i).toString() + el_horz.toString());
										lastStopS=true;
									}
								}
							}
						}
						
						if(!(lastStopW)){																											//Westward
							if((bpos[el_vert][el_horz-i])==0){
								leg_sqList.push(el_vert.toString() + (el_horz-i).toString());
								cov_sqList.push(el_vert.toString()+(el_horz-i).toString());}
							else{
								cov_sqList.push(el_vert.toString()+(el_horz-i).toString());
								if (((bpos[el_vert][el_horz-i]).substring(0,4)=='king') && ((bpos[el_vert][el_horz-i]).indexOf(elmnt_color)<0) && ((el_horz-i)>0))
									cov_sqList.push((el_vert).toString()+(el_horz-i-1).toString());
								
								if ((bpos[el_vert][el_horz-i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White rook runs into one of its own pieces
										lastStopW=true;
									else{																											//Black rook has option to take white piece
										leg_sqList.push(el_vert.toString() + (el_horz-i).toString());
										lastStopW=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black rook runs into one of its own pieces
										lastStopW=true;
									else{																											//White rook has option to take black piece
										leg_sqList.push(el_vert.toString() + (el_horz-i).toString());
										lastStopW=true;
									}
								
								
								}
							}
						}
					}
					//alert(leg_sqList);
					
				}
				   
				else if (elmnt_type == "knig"){																									//KNIGHT

					var ny;
					var nx;
					
					for(i=0;i<8;i++){
						if (i==0){
							ny = el_vert-1;
							nx = el_horz+2;
							}
						else if (i==1){
							ny = el_vert+1;
							nx = el_horz+2;
							}
						else if (i==2){
							ny = el_vert-2;
							nx = el_horz+1;
							}
						else if (i==3){
							ny = el_vert-2;
							nx = el_horz-1;
							}
						else if (i==4){
							ny = el_vert-1;
							nx = el_horz-2;
							}
						else if (i==5){
							ny = el_vert+1;
							nx = el_horz-2;
							}
						else if (i==6){
							ny = el_vert+2;
							nx = el_horz-1;
							}
						else if (i==7){
							ny = el_vert+2;
							nx = el_horz+1;
							}
						if (!((ny<0) || (ny>7) || (nx<0) || (nx>7))){
							cov_sqList.push(ny.toString() + nx.toString());
							if ((bpos[ny][nx])==0)
								leg_sqList.push(ny.toString() + nx.toString());
							else{
								if ((bpos[ny][nx]).indexOf('l')>0){
									if (elmnt_color=='d')
										leg_sqList.push(ny.toString() + nx.toString());
									}
								else{
									if (elmnt_color=='l')
										leg_sqList.push(ny.toString() + nx.toString());
									}
								
							}
						}
					}
					//alert(leg_sqList);
				}
				
				
				else if (elmnt_type == "bish"){
				
					var lastStopNE=false;
					var lastStopSE=false;
					var lastStopSW=false;
					var lastStopNW=false;
					
					for(var i=1;(!(lastStopNE) || !(lastStopSE) || !(lastStopSW) || !(lastStopNW));i++){
						if (((el_horz+i)>7) || ((el_vert-i)<0))
							lastStopNE=true;
						if (((el_horz+i)>7) || ((el_vert+i)>7))
							lastStopSE=true;
						if (((el_horz-i)<0) || ((el_vert+i)>7))
							lastStopSW=true;
						if (((el_horz-i)<0) || ((el_vert-i)<0))
							lastStopNW=true;
							
						
						if(!(lastStopNE)){																											//NorthEast-ward
							if((bpos[el_vert-i][el_horz+i])==0){
								leg_sqList.push((el_vert-i).toString() + (el_horz+i).toString());
								cov_sqList.push((el_vert-i).toString()+(el_horz+i).toString());}
							else{
								cov_sqList.push((el_vert-i).toString()+(el_horz+i).toString());
								if (((bpos[el_vert-i][el_horz+i]).substring(0,4)=='king') && ((bpos[el_vert-i][el_horz+i]).indexOf(elmnt_color)<0) && (((el_vert-i)>0) && ((el_horz+i)<7)))
									cov_sqList.push((el_vert-i-1).toString()+(el_horz+i+1).toString());
								
								if ((bpos[el_vert-i][el_horz+i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White bishop runs into one of its own pieces
										lastStopNE=true;
									else{																											//Black bishop has option to take white piece
										leg_sqList.push((el_vert-i).toString() + (el_horz+i).toString());
										lastStopNE=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black bishop runs into one of its own pieces
										lastStopNE=true;
									else{																											//White bishop has option to take black piece
										leg_sqList.push((el_vert-i).toString() + (el_horz+i).toString());
										lastStopNE=true;
									}
								
								
								}
							}
						}	
						
						if(!(lastStopSE)){																											//SouthEast-ward
							if((bpos[el_vert+i][el_horz+i])==0){
								leg_sqList.push((el_vert+i).toString() + (el_horz+i).toString());
								cov_sqList.push((el_vert+i).toString()+(el_horz+i).toString());}
							else{
								cov_sqList.push((el_vert+i).toString()+(el_horz+i).toString());
								if (((bpos[el_vert+i][el_horz+i]).substring(0,4)=='king') && ((bpos[el_vert+i][el_horz+i]).indexOf(elmnt_color)<0) && (((el_vert+i)<7) && ((el_horz+i)<7)))
									cov_sqList.push((el_vert+i+1).toString()+(el_horz+i+1).toString());
								
								if ((bpos[el_vert+i][el_horz+i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White bishop runs into one of its own pieces
										lastStopSE=true;
									else{																											//Black bishop has option to take white piece
										leg_sqList.push((el_vert+i).toString() + (el_horz+i).toString());
										lastStopSE=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black bishop runs into one of its own pieces
										lastStopSE=true;
									else{																											//White bishop has option to take black piece
										leg_sqList.push((el_vert+i).toString() + (el_horz+i).toString());
										lastStopSE=true;
									}
								
								
								}
							}
						}
					
						if(!(lastStopSW)){																											//SouthWest-ward
							if((bpos[el_vert+i][el_horz-i])==0){
								leg_sqList.push((el_vert+i).toString()+(el_horz-i).toString());
								cov_sqList.push((el_vert+i).toString()+(el_horz-i).toString());}
							else{
								cov_sqList.push((el_vert+i).toString()+(el_horz-i).toString());
								if (((bpos[el_vert+i][el_horz-i]).substring(0,4)=='king') && ((bpos[el_vert+i][el_horz-i]).indexOf(elmnt_color)<0) && (((el_vert+i)<7) && ((el_horz-i)>0)))
									cov_sqList.push((el_vert+i+1).toString()+(el_horz-i-1).toString());
								
								if ((bpos[el_vert+i][el_horz-i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White bishop runs into one of its own pieces
										lastStopSW=true;
									else{																											//Black bishop has option to take white piece
										leg_sqList.push((el_vert+i).toString() + (el_horz-i).toString());
										lastStopSW=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black bishop runs into one of its own pieces
										lastStopSW=true;
									else{																											//White bishop has option to take black piece
										leg_sqList.push((el_vert+i).toString() + (el_horz-i).toString());
										lastStopSW=true;
									}
								
								
								}
							}
						}
						
						if(!(lastStopNW)){																											//NorthWest-ward
							if((bpos[el_vert-i][el_horz-i])==0){
								leg_sqList.push((el_vert-i).toString()+(el_horz-i).toString());
								cov_sqList.push((el_vert-i).toString()+(el_horz-i).toString());}
							else{
								cov_sqList.push((el_vert-i).toString()+(el_horz-i).toString());
								if (((bpos[el_vert-i][el_horz-i]).substring(0,4)=='king') && ((bpos[el_vert-i][el_horz-i]).indexOf(elmnt_color)<0) && (((el_vert-i)>0) && ((el_horz-i)>0)))
									cov_sqList.push((el_vert-i-1).toString()+(el_horz-i-1).toString());
								
								if ((bpos[el_vert-i][el_horz-i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White bishop runs into one of its own pieces
										lastStopNW=true;
									else{																											//Black bishop has option to take white piece
										leg_sqList.push((el_vert-i).toString() + (el_horz-i).toString());
										lastStopNW=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black bishop runs into one of its own pieces
										lastStopNW=true;
									else{																											//White bishop has option to take black piece
										leg_sqList.push((el_vert-i).toString() + (el_horz-i).toString());
										lastStopNW=true;
									}
								
								
								}
							}
						}
					}
				
				//alert(leg_sqList);
				}
				
				
				else if (elmnt_type == "quee"){
				
					var lastStopN=false;
					var lastStopE=false;
					var lastStopS=false;
					var lastStopW=false;
					
					var lastStopNE=false;
					var lastStopSE=false;
					var lastStopSW=false;
					var lastStopNW=false;
					
					for(var i=1;(!(lastStopN) || !(lastStopE) || !(lastStopS) || !(lastStopW)   ||   !(lastStopNE) || !(lastStopSE) || !(lastStopSW) || !(lastStopNW));i++){
						
						if ((el_horz+i)>7)
							lastStopE=true;
						if ((el_vert-i)<0)
							lastStopN=true;
						if ((el_vert+i)>7)
							lastStopS=true;
						if ((el_horz-i)<0)
							lastStopW=true;
						
						if (((el_horz+i)>7) || ((el_vert-i)<0))
							lastStopNE=true;
						if (((el_horz+i)>7) || ((el_vert+i)>7))
							lastStopSE=true;
						if (((el_horz-i)<0) || ((el_vert+i)>7))
							lastStopSW=true;
						if (((el_horz-i)<0) || ((el_vert-i)<0))
							lastStopNW=true;
							
						if(!(lastStopN)){																											//Northward
							if((bpos[el_vert-i][el_horz])==0){
								leg_sqList.push((el_vert-i).toString() + el_horz.toString());
								cov_sqList.push((el_vert-i).toString()+(el_horz).toString());}
							else{
								cov_sqList.push((el_vert-i).toString()+(el_horz).toString());
								if (((bpos[el_vert-i][el_horz]).substring(0,4)=='king') && ((bpos[el_vert-i][el_horz]).indexOf(elmnt_color)<0) && ((el_vert-i)>0))
									cov_sqList.push((el_vert-i-1).toString()+(el_horz).toString());
								
								if ((bpos[el_vert-i][el_horz]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White queen runs into one of its own pieces
										lastStopN=true;
									else{																											//Black queen has option to take white piece
										leg_sqList.push((el_vert-i).toString() + el_horz.toString());
										lastStopN=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black queen runs into one of its own pieces
										lastStopN=true;
									else{																											//White queen has option to take black piece
										leg_sqList.push((el_vert-i).toString() + el_horz.toString());
										lastStopN=true;
									}
								
								
								}
							}
						}
						
						if(!(lastStopE)){																											//Eastward
							if((bpos[el_vert][el_horz+i])==0){
								leg_sqList.push(el_vert.toString() + (el_horz+i).toString());
								cov_sqList.push(el_vert.toString()+(el_horz+i).toString());}
							else{
								cov_sqList.push(el_vert.toString()+(el_horz+i).toString());
								if (((bpos[el_vert][el_horz+i]).substring(0,4)=='king') && ((bpos[el_vert][el_horz+i]).indexOf(elmnt_color)<0) && ((el_horz+i)<7))
									cov_sqList.push((el_vert).toString()+(el_horz+i+1).toString());
								
								if ((bpos[el_vert][el_horz+i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White queen runs into one of its own pieces
										lastStopE=true;
									else{																											//Black queen has option to take white piece
										leg_sqList.push(el_vert.toString() + (el_horz+i).toString());
										lastStopE=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black queen runs into one of its own pieces
										lastStopE=true;
									else{																											//White queen has option to take black piece
										leg_sqList.push(el_vert.toString() + (el_horz+i).toString());
										lastStopE=true;
									}
								
								
								}
							}
						}
					
						if(!(lastStopS)){																											//Southward
							if((bpos[el_vert+i][el_horz])==0){
								leg_sqList.push((el_vert+i).toString() + el_horz.toString());
								cov_sqList.push((el_vert+i).toString()+(el_horz).toString());}
							else{
								cov_sqList.push((el_vert+i).toString()+(el_horz).toString());
								if (((bpos[el_vert+i][el_horz]).substring(0,4)=='king') && ((bpos[el_vert+i][el_horz]).indexOf(elmnt_color)<0) && ((el_vert+i)<7))
									cov_sqList.push((el_vert+i+1).toString()+(el_horz).toString());
								
								if ((bpos[el_vert+i][el_horz]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White queen runs into one of its own pieces
										lastStopS=true;
									else{																											//Black queen has option to take white piece
										leg_sqList.push((el_vert+i).toString() + el_horz.toString());
										lastStopS=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black queen runs into one of its own pieces
										lastStopS=true;
									else{																											//White queen has option to take black piece
										leg_sqList.push((el_vert+i).toString() + el_horz.toString());
										lastStopS=true;
									}
								}
							}
						}
						
						if(!(lastStopW)){																											//Westward
							if((bpos[el_vert][el_horz-i])==0){
								leg_sqList.push(el_vert.toString() + (el_horz-i).toString());
								cov_sqList.push(el_vert.toString()+(el_horz-i).toString());}
							else{
								cov_sqList.push(el_vert.toString()+(el_horz-i).toString());
								if (((bpos[el_vert][el_horz-i]).substring(0,4)=='king') && ((bpos[el_vert][el_horz-i]).indexOf(elmnt_color)<0) && ((el_horz-i)>0))
									cov_sqList.push((el_vert).toString()+(el_horz-i-1).toString());
								
								if ((bpos[el_vert][el_horz-i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White queen runs into one of its own pieces
										lastStopW=true;
									else{																											//Black queen has option to take white piece
										leg_sqList.push(el_vert.toString() + (el_horz-i).toString());
										lastStopW=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black queen runs into one of its own pieces
										lastStopW=true;
									else{																											//White queen has option to take black piece
										leg_sqList.push(el_vert.toString() + (el_horz-i).toString());
										lastStopW=true;
									}
								
								
								}
							}
						}
							
						
						if(!(lastStopNE)){																											//NorthEast-ward
							if((bpos[el_vert-i][el_horz+i])==0){
								leg_sqList.push((el_vert-i).toString() + (el_horz+i).toString());
								cov_sqList.push((el_vert-i).toString()+(el_horz+i).toString());}
							else{
								cov_sqList.push((el_vert-i).toString()+(el_horz+i).toString());
								if (((bpos[el_vert-i][el_horz+i]).substring(0,4)=='king') && ((bpos[el_vert-i][el_horz+i]).indexOf(elmnt_color)<0) && (((el_vert-i)>0) && ((el_horz+i)<7)))
									cov_sqList.push((el_vert-i-1).toString()+(el_horz+i+1).toString());
								
								if ((bpos[el_vert-i][el_horz+i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White queen runs into one of its own pieces
										lastStopNE=true;
									else{																											//Black queen has option to take white piece
										leg_sqList.push((el_vert-i).toString() + (el_horz+i).toString());
										lastStopNE=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black queen runs into one of its own pieces
										lastStopNE=true;
									else{																											//White queen has option to take black piece
										leg_sqList.push((el_vert-i).toString() + (el_horz+i).toString());
										lastStopNE=true;
									}
								
								
								}
							}
						}	
						
						if(!(lastStopSE)){																											//SouthEast-ward
							if((bpos[el_vert+i][el_horz+i])==0){
								leg_sqList.push((el_vert+i).toString() + (el_horz+i).toString());
								cov_sqList.push((el_vert+i).toString()+(el_horz+i).toString());}
							else{
								cov_sqList.push((el_vert+i).toString()+(el_horz+i).toString());
								if (((bpos[el_vert+i][el_horz+i]).substring(0,4)=='king') && ((bpos[el_vert+i][el_horz+i]).indexOf(elmnt_color)<0) && (((el_vert+i)<7) && ((el_horz+i)<7)))
									cov_sqList.push((el_vert+i+1).toString()+(el_horz+i+1).toString());	
								
								if ((bpos[el_vert+i][el_horz+i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White queen runs into one of its own pieces
										lastStopSE=true;
									else{																											//Black queen has option to take white piece
										leg_sqList.push((el_vert+i).toString() + (el_horz+i).toString());
										lastStopSE=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black queen runs into one of its own pieces
										lastStopSE=true;
									else{																											//White queen has option to take black piece
										leg_sqList.push((el_vert+i).toString() + (el_horz+i).toString());
										lastStopSE=true;
									}
								
								
								}
							}
						}
					
						if(!(lastStopSW)){																											//SouthWest-ward
							if((bpos[el_vert+i][el_horz-i])==0){
								leg_sqList.push((el_vert+i).toString()+(el_horz-i).toString());
								cov_sqList.push((el_vert+i).toString()+(el_horz-i).toString());}
							else{
								cov_sqList.push((el_vert+i).toString()+(el_horz-i).toString());
								if (((bpos[el_vert+i][el_horz-i]).substring(0,4)=='king') && ((bpos[el_vert+i][el_horz-i]).indexOf(elmnt_color)<0) && (((el_vert+i)<7) && ((el_horz-i)>0)))
									cov_sqList.push((el_vert+i+1).toString()+(el_horz-i-1).toString());
								
								if ((bpos[el_vert+i][el_horz-i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White queen runs into one of its own pieces
										lastStopSW=true;
									else{																											//Black queen has option to take white piece
										leg_sqList.push((el_vert+i).toString() + (el_horz-i).toString());
										lastStopSW=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black queen runs into one of its own pieces
										lastStopSW=true;
									else{																											//White queen has option to take black piece
										leg_sqList.push((el_vert+i).toString() + (el_horz-i).toString());
										lastStopSW=true;
									}
								
								
								}
							}
						}
						
						if(!(lastStopNW)){																											//NorthWest-ward
							if((bpos[el_vert-i][el_horz-i])==0){
								leg_sqList.push((el_vert-i).toString()+(el_horz-i).toString());
								cov_sqList.push((el_vert-i).toString()+(el_horz-i).toString());}
							else{
								cov_sqList.push((el_vert-i).toString()+(el_horz-i).toString());
								if (((bpos[el_vert-i][el_horz-i]).substring(0,4)=='king') && ((bpos[el_vert-i][el_horz-i]).indexOf(elmnt_color)<0) && (((el_vert-i)>0) && ((el_horz-i)>0)))
									cov_sqList.push((el_vert-i-1).toString()+(el_horz-i-1).toString());
								
								if ((bpos[el_vert-i][el_horz-i]).indexOf('l')>0){																		
									if (elmnt_color=='l')																							//White queen runs into one of its own pieces
										lastStopNW=true;
									else{																											//Black queen has option to take white piece
										leg_sqList.push((el_vert-i).toString() + (el_horz-i).toString());
										lastStopNW=true;
									}
								}
								else{
									if (elmnt_color=='d')																							//Black queen runs into one of its own pieces
										lastStopNW=true;
									else{																											//White queen has option to take black piece
										leg_sqList.push((el_vert-i).toString() + (el_horz-i).toString());
										lastStopNW=true;
									}
								
								
								}
							}
						}
					}
					
					//alert(leg_sqList);
				}
				
				else if (elmnt_type == "king"){
					var t_var22,t_var23,t_var24,t_var25,t_var26,t_var27,t_var28,t_var29,t_var30;
					
					if (elmnt_color == 'l'){
						t_var29 = document.getElementById("king_d0");
						t_var28 = k_covSq_list_l;}
					else{
						t_var28 = k_covSq_list_d;
						t_var29 = document.getElementById("king_l0");}
						
					if (el_vert>0){
						if (t_var28.indexOf((el_vert-1).toString() + (el_horz).toString())<0)
							t_var28.push((el_vert-1).toString() + (el_horz).toString());
						if (((bpos[el_vert-1][el_horz])==0) || ((bpos[el_vert-1][el_horz]).indexOf(elmnt_color) == -1)){
							t_var22 = (el_vert-1).toString() + (el_horz).toString();
							t_var23 = covering(t_var22);
						
							if (elmnt_color=='l'){	
								if (t_var23[1].length==0)
									if (k_covSq_list_d.indexOf((el_vert-1).toString() + (el_horz).toString()) <0)
										leg_sqList.push((el_vert-1).toString() + (el_horz).toString());
								}
							else{
								if (t_var23[0].length==0)
									if (k_covSq_list_l.indexOf((el_vert-1).toString() + (el_horz).toString()) <0)
										leg_sqList.push((el_vert-1).toString() + (el_horz).toString());
								}
						}}
					if (el_horz<7){
						if (t_var28.indexOf((el_vert).toString() + (el_horz+1).toString())<0)
							t_var28.push((el_vert).toString() + (el_horz+1).toString());
						if (((bpos[el_vert][el_horz+1])==0) || ((bpos[el_vert][el_horz+1]).indexOf(elmnt_color) == -1)){
							t_var22 = (el_vert).toString() + (el_horz+1).toString();
							t_var23 = covering(t_var22);
							
							
							if (elmnt_color=='l'){	
								if (t_var23[1].length==0)
									if (k_covSq_list_d.indexOf((el_vert).toString() + (el_horz+1).toString()) <0)
									leg_sqList.push((el_vert).toString() + (el_horz+1).toString());
								}
							else{
								if (t_var23[0].length==0)
									if (k_covSq_list_l.indexOf((el_vert).toString() + (el_horz+1).toString()) <0)
									leg_sqList.push((el_vert).toString() + (el_horz+1).toString());
								}
						}}
					if (el_vert<7){
						if (t_var28.indexOf((el_vert+1).toString() + (el_horz).toString())<0)
							t_var28.push((el_vert+1).toString() + (el_horz).toString());
						if (((bpos[el_vert+1][el_horz])==0) || ((bpos[el_vert+1][el_horz]).indexOf(elmnt_color) == -1)){
							t_var22 = (el_vert+1).toString() + (el_horz).toString();
							t_var23 = covering(t_var22);
					
				
							if (elmnt_color=='l'){	
								if (t_var23[1].length==0)
									if (k_covSq_list_d.indexOf((el_vert+1).toString() + (el_horz).toString()) <0)
									leg_sqList.push((el_vert+1).toString() + (el_horz).toString());
								}
							else{
								if (t_var23[0].length==0)
									if (k_covSq_list_l.indexOf((el_vert+1).toString() + (el_horz).toString()) <0)
									leg_sqList.push((el_vert+1).toString() + (el_horz).toString());
								}
						}}
					if (el_horz>0){
						if (t_var28.indexOf((el_vert).toString() + (el_horz-1).toString())<0)
							t_var28.push((el_vert).toString() + (el_horz-1).toString());
						if (((bpos[el_vert][el_horz-1])==0) || ((bpos[el_vert][el_horz-1]).indexOf(elmnt_color) == -1)){
							t_var22 = (el_vert).toString() + (el_horz-1).toString();
							t_var23 = covering(t_var22);
				
							if (elmnt_color=='l'){	
								if (t_var23[1].length==0)
									if (k_covSq_list_d.indexOf((el_vert).toString() + (el_horz-1).toString()) <0)
									leg_sqList.push((el_vert).toString() + (el_horz-1).toString());
								}
							else{
								if (t_var23[0].length==0)
									if (k_covSq_list_l.indexOf((el_vert).toString() + (el_horz-1).toString()) <0)
									leg_sqList.push((el_vert).toString() + (el_horz-1).toString());
								}
						}}

				
				
				
					if ((el_vert>0) && (el_horz<7)){
						if (t_var28.indexOf((el_vert-1).toString() + (el_horz+1).toString())<0)
							t_var28.push((el_vert-1).toString() + (el_horz+1).toString());
						if (((bpos[el_vert-1][el_horz+1])==0) || ((bpos[el_vert-1][el_horz+1]).indexOf(elmnt_color) == -1)){
							t_var22 = (el_vert-1).toString() + (el_horz+1).toString();
							t_var23 = covering(t_var22);
	
							if (elmnt_color=='l'){	
								if (t_var23[1].length==0)
									if (k_covSq_list_d.indexOf((el_vert-1).toString() + (el_horz+1).toString()) <0)
									leg_sqList.push((el_vert-1).toString() + (el_horz+1).toString());
								}
							else{
								if (t_var23[0].length==0)
									if (k_covSq_list_l.indexOf((el_vert-1).toString() + (el_horz+1).toString()) <0)
									leg_sqList.push((el_vert-1).toString() + (el_horz+1).toString());
								}
						}}
					if ((el_vert<7) && (el_horz<7)){
						if (t_var28.indexOf((el_vert+1).toString() + (el_horz+1).toString())<0)
							t_var28.push((el_vert+1).toString() + (el_horz+1).toString());
						if (((bpos[el_vert+1][el_horz+1])==0) || ((bpos[el_vert+1][el_horz+1]).indexOf(elmnt_color) == -1)){
							t_var22 = (el_vert+1).toString() + (el_horz+1).toString();
							t_var23 = covering(t_var22);
			
							if (elmnt_color=='l'){	
								if (t_var23[1].length==0)
									if (k_covSq_list_d.indexOf((el_vert+1).toString() + (el_horz+1).toString()) <0)
									leg_sqList.push((el_vert+1).toString() + (el_horz+1).toString());
								}
							else{
								if (t_var23[0].length==0)
									if (k_covSq_list_l.indexOf((el_vert+1).toString() + (el_horz+1).toString()) <0)
									leg_sqList.push((el_vert+1).toString() + (el_horz+1).toString());
								}
						}}
					if ((el_vert<7) && (el_horz>0)){
						if (t_var28.indexOf((el_vert+1).toString() + (el_horz-1).toString())<0)
							t_var28.push((el_vert+1).toString() + (el_horz-1).toString());
						if (((bpos[el_vert+1][el_horz-1])==0) || ((bpos[el_vert+1][el_horz-1]).indexOf(elmnt_color) == -1)){
							t_var22 = (el_vert+1).toString() + (el_horz-1).toString();
							t_var23 = covering(t_var22);
							
							if (elmnt_color=='l'){	
								if (t_var23[1].length==0)
									if (k_covSq_list_d.indexOf((el_vert+1).toString() + (el_horz-1).toString()) <0)
									leg_sqList.push((el_vert+1).toString() + (el_horz-1).toString());
								}
							else{
								if (t_var23[0].length==0)
									if (k_covSq_list_l.indexOf((el_vert+1).toString() + (el_horz-1).toString()) <0)
									leg_sqList.push((el_vert+1).toString() + (el_horz-1).toString());
								}
						}}
					if ((el_vert>0) && (el_horz>0)){
						if (t_var28.indexOf((el_vert-1).toString() + (el_horz-1).toString())<0)
							t_var28.push((el_vert-1).toString() + (el_horz-1).toString());
						if (((bpos[el_vert-1][el_horz-1])==0) || ((bpos[el_vert-1][el_horz-1]).indexOf(elmnt_color) == -1)){
							t_var22 = (el_vert-1).toString() + (el_horz-1).toString();
							t_var23 = covering(t_var22);
			

							if (elmnt_color=='l'){	
								if (t_var23[1].length==0)
									if (k_covSq_list_d.indexOf((el_vert-1).toString() + (el_horz-1).toString()) <0)
									leg_sqList.push((el_vert-1).toString() + (el_horz-1).toString());
								}
							else{
								if (t_var23[0].length==0)
									if (k_covSq_list_l.indexOf((el_vert-1).toString() + (el_horz-1).toString()) <0)
									leg_sqList.push((el_vert-1).toString() + (el_horz-1).toString());
								}
						}}
					

					
					
					if ((elmnt.getAttribute("moved")=="no") && (document.getElementById("rook_" + elmnt_color + "0").getAttribute("moved")=="no")){
						t_var22 = (el_vert).toString() + (el_horz-1).toString();
						t_var23 = covering(t_var22);
						t_var24 = (el_vert).toString() + (el_horz-2).toString();
						t_var25 = covering(t_var24);
						t_var26 = (el_vert).toString() + (el_horz-3).toString();
						t_var27 = covering(t_var26);
						
						if (((bpos[el_vert][el_horz-1])==0) && ((bpos[el_vert][el_horz-2])==0) && ((bpos[el_vert][el_horz-3])==0)){								//Queenside Castle
							if (elmnt_color=='l'){	
								if ((t_var23[1].length==0) && (t_var25[1].length==0) && (t_var27[1].length==0) && (!(l_ch)))
									leg_sqList.push((el_vert).toString() + (el_horz-2).toString());
								}
							else{
								if ((t_var23[0].length==0) && (t_var25[0].length==0) && (t_var27[0].length==0) && (!(d_ch)))
									leg_sqList.push((el_vert).toString() + (el_horz-2).toString());
								}
						
							}}
					if ((elmnt.getAttribute("moved")=="no") && (document.getElementById("rook_" + elmnt_color + "1").getAttribute("moved")=="no")){
						t_var22 = (el_vert).toString() + (el_horz+1).toString();
						t_var23 = covering(t_var22);
						t_var24 = (el_vert).toString() + (el_horz+2).toString();
						t_var25 = covering(t_var24);
						
						if (((bpos[el_vert][el_horz+1])==0) && ((bpos[el_vert][el_horz+2])==0)){																	//Kingside Castle
							if (elmnt_color=='l'){	
								if ((t_var23[1].length==0) && (t_var25[1].length==0) && (!(l_ch)))
									leg_sqList.push((el_vert).toString() + (el_horz+2).toString());
								}
							else{
								if ((t_var23[0].length==0) && (t_var25[0].length==0) && (!(d_ch)))
									leg_sqList.push((el_vert).toString() + (el_horz+2).toString());
								}
						
							}}
					
					
					
					
				}
				
				
				return [leg_sqList,cov_sqList];
				}
				
			
	
		    function convertNotation(list_i){
			  var list_j =[];
			  var a,b,a_j,b_j;
			  var alph = "abcdefgh";
			  
			  if ((typeof list_i)=="string"){
				a = list_i[0];
				b = list_i[1];				
				a_j = parseFloat(b);
				b_j = 8 - parseFloat(a);
				return (alph[a_j] + b_j.toString());		  
				}
			  else {
			  
			  for(var k=0;k<list_i.length;k++){
				a = list_i[k][0];
				b = list_i[k][1];				
				a_j = parseFloat(b);
				b_j = 8 - parseFloat(a);
				list_j.push(alph[a_j] + b_j.toString());
				}
			  return list_j;
			  }
			}
			
			
			
		function displaySquares(elmnt){
			var rList = legalSquares(elmnt);
			var nx, ix;
			for(var i=0; i<rList[0].length; i++){
				nx = "opsq_"+rList[0][i];
				document.getElementById(nx).style.visibility = "visible";
				ix = "#"+nx;
				$(ix).css("z-index","2");
				
				}
			
		 }
		 
		 
		 
		function turnOffSquares(elmnt){
			var rList = legalSquares(elmnt);
			var nx, ix;
			for(var i=0; i<rList[0].length; i++){
				nx = "opsq_"+rList[0][i];
				document.getElementById(nx).style.visibility = "hidden";
				ix = "#"+nx;
				$(ix).css("z-index","0");
				
				}
		}
		
		
		
		function movePiece(elmnt,newLoc){
			
			var elmnt_loc=elmnt.getAttribute("loc");
			var elmnt_type=elmnt.getAttribute("id").substring(0,4);
			var elmnt_color=elmnt.getAttribute("id").charAt(elmnt.getAttribute("id").length-1);
				
			var el_vert = parseFloat(elmnt_loc [0]);
			var el_horz = parseFloat(elmnt_loc[1]);
			var lc_vert = parseFloat(newLoc[0]);
			var lc_horz = parseFloat(newLoc[1]);
			
			//var inCheck = ((l_ch) || (d_ch));
			//var stillCheck = false;
			
			var t_var = bpos[el_vert][el_horz];
			var t_var2 = bpos[lc_vert][lc_horz];
			var t_var3, t_var4;
			
			turnOffSquares(elmnt);
			elmnt.style.background = '';
			sld=[]; numSldPcs=0;
			
			bpos[el_vert][el_horz] = 0;
			bpos[lc_vert][lc_horz] = t_var;
			
			
			if (elmnt_type == "king")
				elmnt.setAttribute("loc",newLoc);
			
			isCheck();
			
			if (((t_move == 'l') && (l_ch)) || ((t_move == 'd') && (d_ch))){
				if (elmnt_type == "king")
					elmnt.setAttribute("loc",elmnt_loc);
				bpos[lc_vert][lc_horz] = t_var2;
				bpos[el_vert][el_horz] = t_var;
				l_ch = false;
				d_ch = false;
				return;
			}
			
			
			
			elmnt.classList.remove(elmnt.classList[0]);
		    elmnt.classList.add(convertNotation(newLoc));
			
			
			
			switch (elmnt_type) {
					case "pawn":
						t_var4 = "";
						if ((t_var2==0)&&(el_horz != lc_horz))
							t_var2 = bpos[el_vert][lc_horz];
						break;
					case "rook":
						elmnt.setAttribute("moved", "yes");
						t_var4 = "R";
						break;
					case "knig":
						t_var4 = "N";
						break;
					case "king":
						elmnt.setAttribute("moved", "yes");
						if (t_move == 'l')
							k_covSq_list_l =[];
						else
							k_covSq_list_d =[];
						t_var4 = "K";
						break;
					case "bish":
						t_var4 = "B";
						break;
					case "quee":
						t_var4 = "Q";
						break;
					
				}
			
			if (t_var2!= 0){																			//If it's a Capture move...
				cptd.push(t_var2);
				document.getElementById(t_var2).style.visibility = "hidden";
				
				switch (t_var2.substring(0,4)) {
					case "pawn":
						t_var3 = 1;
						break;
					case "rook":
						t_var3 = 5;
						break;
					case "knig":
						t_var3 = 2.5;
						break;
					case "bish":
						t_var3 = 3;
						break;
					case "quee":
						t_var3 = 10;
						break;
					
				}
				if (t_var4 == "")
					t_var4 = convertNotation(elmnt.getAttribute("loc"))[0];
				t_var4 += "x";
				
				if (elmnt_color== 'l')
					b_LaskPoints += t_var3;
				else
					w_LaskPoints += t_var3;
				
			
				}
				
				elmnt.setAttribute("loc", newLoc);
				
				if (((lc_vert==0) || (lc_vert==7)) && (elmnt_type == "pawn")){
					promote_pawn(elmnt);
					elmnt_type=elmnt.getAttribute("id").substring(0,4);
					//alert(elmnt.getAttribute("id"));
					//alert(elmnt.getAttribute("loc"));
					}
				
				isCheck();
				
				
				
				if ((elmnt_type == "king") && ((el_horz - lc_horz)%2 == 0) && ((el_horz - lc_horz) != 0)){									//Castle move
					castled = true;
				}																						
				
				
				if (!(castled)){
					if (t_move=='l'){																				//Update list of recorded moves
						rec_moves[move_num][0] = (t_var4 + convertNotation(newLoc));
						if (d_ch){
							rec_moves[move_num][0] += "+";
							
							if (d_cm){
								rec_moves[move_num][0] += "+";
								document.getElementById('king_d0').style.background= 'black';
								alert("White wins!");
								finished();
								return;}
							else{
								document.getElementById('king_d0').style.background= 'red';
								alert("Check!");
								}
						}
					}
					else{
						rec_moves[move_num][1] = (t_var4 + convertNotation(newLoc));
						if (l_ch){
							rec_moves[move_num][1] += "+";
							
							if (l_cm){
								rec_moves[move_num][1] += "+";
								document.getElementById('king_l0').style.background= 'black';
								alert("Black wins!");
								finished();
								return;}
							else{
								document.getElementById('king_l0').style.background= 'red';
								alert("Check!");}
						}
						move_num++;
						rec_moves.push(["",""])
					}
					
					isCheck();
					
					if ((!(l_ch)) && (document.getElementById("king_l0").style.background == 'red'))
						document.getElementById("king_l0").style.background = '';
					if ((!(d_ch)) && (document.getElementById("king_d0").style.background == 'red'))
						document.getElementById("king_d0").style.background = '';
					
					
				
					
					switch_sides();
					
					
				
					
					}
			
			}
		
		
		
		function switch_sides(){
		
			if (t_move == 'l')																					//Change whose side it is to move
				t_move ='d';
			else
				t_move ='l';
			
			for(var i=0;i<8;i++){
			for(var j=0;j<8;j++){
				if ((typeof (bpos[i][j])) == "string"){
				  if (((bpos[i][j]).indexOf(t_move))==-1){														// Check if the piece is opposite color of side whose move it is
				  
					//document.getElementById(bpos[i][j]).onclick = "";												// If so, make it unclickable
					document.getElementById(bpos[i][j]).style.cursor = "auto";
					}
				  else{																							// Else if the piece is the same color of side whose move it is
			
					//document.getElementById(bpos[i][j]).onclick = piece_1click(this);									// If so, make it clickable
					document.getElementById(bpos[i][j]).style.cursor = "pointer";
					}
				}
		
			}
			}
	
		}
		
		
		
		function covering(square_loc){
		
			var cvd_by =[[],[]];
			var cList;
			var t_var,t_var2;
			
		
			for(var i=0;i<8;i++){
				for(var j=0;j<8;j++){
					if (((typeof (bpos[i][j])) == "string") && ((bpos[i][j])!="king_d0") && ((bpos[i][j])!="king_l0")) {
						
						t_var = document.getElementById(bpos[i][j]);
						t_var2 = legalSquares(t_var);
						cList = t_var2[1];
						
						if (cList.indexOf(square_loc) >= 0){
							
							if (((bpos[i][j]).indexOf('l')) > 0)
								cvd_by[0].push(bpos[i][j]);
	
							else
								cvd_by[1].push(bpos[i][j]);
						}
					}
		
				}
			}
			
			
			if (k_covSq_list_l.indexOf(square_loc) >= 0)
				cvd_by[0].push("king_l0");
			if (k_covSq_list_d.indexOf(square_loc) >= 0)
				cvd_by[1].push("king_d0");
			
			
			
			return cvd_by;
		}
		
		
		
		function isCheck(){
		
			var king_l = document.getElementById("king_l0");
			var king_d = document.getElementById("king_d0");
		
			var l_chList = covering(king_l.getAttribute("loc"));
			var d_chList = covering(king_d.getAttribute("loc"));
			
			
			if (l_chList[1].length>0)
				l_ch = true;
			else
				l_ch = false;
			
			if (d_chList[0].length>0)
				d_ch = true;
			else
				d_ch = false;
				
			var t_var20 = legalSquares(king_l);
			var t_var21 = legalSquares(king_d);
			
			if ((l_ch)&&(t_var20[0].length == 0)){
				l_cm = true;}
			if ((d_ch)&&(t_var21[0].length == 0)){
				d_cm = true;}
			
		}
		
		function promote_pawn(elmnt){
			
			var np_id, np_type, np_color, prom, valid_type, t_var3, t_var40;
			
			var ellvert = parseFloat(elmnt.getAttribute("loc")[0]);
			var ellhorz = parseFloat(elmnt.getAttribute("loc")[1]);
			
			
			var np_color=elmnt.getAttribute("id").charAt(elmnt.getAttribute("id").length-2);
			var id_tag = 2;
			
			
			
			var prom = prompt("What type of piece do you want to promote to?");
			while (!((prom == "knight") || (prom == "rook") || (prom == "bishop") || (prom == "queen") || (prom == "Knight") || (prom == "Rook") || (prom == "Bishop") || (prom == "Queen") || (prom == "N") || (prom == "B") || (prom == "R") || (prom == "Q"))){
				prom = prompt("Please enter a correct piece type!");
				}
			if ((prom == "knight") || (prom == "Knight") || (prom == "N"))
				np_id = "knight_" + np_color;
			if ((prom == "bishop") || (prom == "Bishop") || (prom == "B"))
				np_id = "bishop_" + np_color;
			if ((prom == "rook") || (prom == "Rook") || (prom == "R"))
				np_id = "rook_" + np_color;
			if ((prom == "queen") || (prom == "Queen") || (prom == "Q"))
				np_id = "queen_" + np_color;
				
				
			np_type = np_id.substring(0,4);
			
	
			for(var i=0;i<8;i++){
				for(var j=0;j<8;j++){
					if (((typeof (bpos[i][j])) == "string") && (((bpos[i][j]).substring(0,4))!="king") && (((bpos[i][j]).substring(0,4))!="pawn")) {
						
						if ((bpos[i][j]).substring(0,4) == np_type) {
							t_var3 = parseFloat((bpos[i][j]).charAt((bpos[i][j]).length-1));
							if ((t_var3) >= id_tag)
								id_tag++;
						
						
						}
					}
		
				}
			}
			
			np_id += id_tag.toString();
			
			bpos[ellvert][ellhorz] = np_id;
			
			
			elmnt.setAttribute("id", np_id);
			
				
			switch (np_type) {
				case "rook":
					if (np_color == 'l'){
						elmnt.setAttribute("src","ChessImgs/Chess_rlt60.png");
						rec_moves[move_num][0] += "=R";
					}
					else{
						elmnt.setAttribute("src","ChessImgs/Chess_rdt60.png");
						rec_moves[move_num][1] += "=R";
					}
					t_var3 = 4;
					break;
				case "knig":
					if (np_color == 'l'){
						elmnt.setAttribute("src","ChessImgs/Chess_nlt60.png");
						rec_moves[move_num][0] += "=N";
					}
					else{
						elmnt.setAttribute("src","ChessImgs/Chess_ndt60.png");
						rec_moves[move_num][1] += "=N";
					}
					t_var3 = 1.5;
					break;
				case "bish":
					if (np_color == 'l'){
						elmnt.setAttribute("src","ChessImgs/Chess_blt60.png");
						rec_moves[move_num][0] += "=B";
					}
					else{
						elmnt.setAttribute("src","ChessImgs/Chess_bdt60.png");
						rec_moves[move_num][1] += "=B";
					}
					t_var3 = 2;
					break;
				case "quee":
					if (np_color == 'l'){
						elmnt.setAttribute("src","ChessImgs/Chess_qlt60.png");
						rec_moves[move_num][0] += "=Q";
					}
					else{
						elmnt.setAttribute("src","ChessImgs/Chess_qdt60.png");
						rec_moves[move_num][1] += "=Q";
					}
					t_var3 = 9;
					break;
					
				}
				
				
				
			if (np_color == 'l')
				b_LaskPoints-=t_var3;
			else
				w_LaskPoints-=t_var3;
			
			if (w_LaskPoints<0)
				w_LaskPoints=0;
				
			if (b_LaskPoints<0)
				b_LaskPoints=0;
			
		
		}
		
		
		function finished(){
		
		for(var i=0;i<8;i++){
			for(var j=0;j<8;j++){
				if ((typeof (bpos[i][j])) == "string"){
				  
					t_move = 'z';
					document.getElementById(bpos[i][j]).onclick="";
					document.getElementById(bpos[i][j]).style.cursor = 'auto';
					}
		
			}
			}
		
		
		}
		