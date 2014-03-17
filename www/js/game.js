//"use strict" ;
//- 사용: 생성자함수.prototype
function NewCardGame(max) {
       if(max <= 3){
               alert('4장의 카드부터 게임할 수 있습니다. 다시 입력해 주세요.');
               return false ;
       }else if (max > 100){
               alert('100보다 작은수를 입력하셔야 합니다.' );
               return false ;            
       }
       if((max%2)!=0){
           alert('카드수는 짝수로 입력하셔야 합니다.' );
           return false ;    	   
       }
    this.max = max;               // 총 카드 수
    this.half = max/2;            // 총 카드 수의 반
    this.clickNum = 1;            // 카드 클릭 수저장(2회까지)
    this.maxArr = new Array(max); // 난수 저장 배열
    this.realArr = new Array();   // 게임에 사용될 숫자 배열
    this.matchArr = new Array();  // 짝이될 카드 저장될 배열
    this.matchChk = new Array();  // 카드 비교때 사용할 배열
    this.matchChkDone = new Array();  // 카드 비교 완료된 카드 저장 배열
    this.cardPosition = new Array(); // 카드 위치 정보 저장
    this.cardMaxPX = 11; // X축 총 11장 이미지까지,8*5(뒷장이미지 고정임)
    this.cardMaxPY = 5;  // Y축 총 5장 이미지까지, max 50장까지로 정함
    this.cardPositionXY = '';
    this.cardPX = ''; // X축으로 이동할 거리를 저장할 곳
    this.cardPY = ''; // Y측으로 이동할 거리를 저장할 곳
    this.cardWidthX = 68; // 카드 넓이
    this.cardheightY = 96; // 카드 높이
    this.cardTempId = ''; // ID값 계산후 임시 저장

    cardGame();
}
// 게임판 만들기
function createBoard() {
	var board = document.createElement("div");
	board.style.borderRadius= "10px";
	board.style.backgroundImage = "url('board.jpg')";
	board.setAttribute('id','board');
    board.style.width= '710px';
	/* board.style.float = 'left';  */
   
	board.style.display = 'inline-block'; 
   	board.style.padding = '10px';
   	document.getElementById("gameboard");
    gameboard.appendChild(board);
}



function cardGame() { // max개의 난수 함수
   for (var i = 1; i <= max; i++) {
        maxArr[i] = Math.random() + '-' + i; //난수 idx값 생성
  }
  maxArr = maxArr.sort();
  createBoard(); // 카드 만들기전 게임판 생성
  
   for (var i=0; i<max; i++) {
        var tmp = maxArr[i].split("-"); //난수에서 사용될 실제  idx값 분리
      //realArr[i] = (tmp[1] <10) ? '0' + tmp[1] : tmp[1];  // 10이하 앞에 0붙여주기
        realArr[i] = tmp[1];
       
         // <!--------------------2카드의 짝만들기----------------------->
         if (realArr[i] <= half) {
            matchArr[i] = realArr[i] + ":" + (Number(realArr[i]) + half);
            //console.log(matchArr[i]); 
        } else{
            matchArr[i] = (Number(realArr[i]) - half) + ":" + realArr[i];
            //console.log(matchArr[i]);           
        }
         // <!--------------------2카드의 짝만들기----------------------->
       
       
          // <!--------------------div만들기----------------------->
         //div 객체 생성
         var div = document.createElement("div");  
         //div.innerText= realArr[i];     
         div.style.margin= "10px";
         div.style.width= cardWidthX+ "px";
         div.style.height= cardheightY+ "px";
         div.style. float= "left" ;
         div.style.borderRadius= "3px";
         div.setAttribute('id', realArr[i]);
         div.setAttribute('class', matchArr[i]);
         div.style.backgroundImage= "url('./cardboard.png')";
         div.style.backgroundRepeat= "no-repeat";
         div.style.backgroundPosition= "-544px -384px";     
                // <!--------------------카드 뒤집기 이벤트----------------------->
               div.addEventListener('click', function (){ 
                   flipCard(this.id,this.className);        
               });
                // <!--------------------카드 뒤집기 이벤트-----------------------> 
              
               //** 바디의 마지막 자식으로 div 객체 추가
               document.getElementById('board')
               board.appendChild(div); // 생성한 게임판에 div올리기.            	  
          // <!--------------------div만들기----------------------->  
  } 
  document.getElementById("StartBtn").style.display = "none" ;
  document.getElementById("newStartBtn").style.display = "inline" ; 
  return realArr; //반환
}
 
 // <!-------------------- 카드 뒤집기----------------------->
function flipCard(cid,ccl){   
    //event.srcElement => 이벤트 발생 객체
    event.srcElement.style.backgroundImage= "url('./cardboard.png')";
    event.srcElement.style.backgroundRepeat= "no-repeat";            

    event.srcElement.style. float = "left" ;  
    cardTempId = (cid>half) ? cid-half : cid; // 짝의 2카드가 같은 카드 출력위한 식    
    if(cardTempId >= 45){ //5번째줄
      cardPX = ((cardTempId-(cardMaxPX*4))*cardWidthX) - cardWidthX;
      cardPY = cardheightY*4;       
      cardPositionXY = "-"+cardPX+"px -" +cardPY+"px" ;
     // console.log("4:====>"+cardPositionXY);
    }else if(cardTempId <= 11){ //1번째줄
      cardPX = (cardWidthX * cardTempId) - cardWidthX;
      cardPY = cardheightY - cardheightY;             
      cardPositionXY = "-"+cardPX+"px -" +cardPY+"px" ; 
     // console.log("1:====>"+cardPositionXY);    
    }else if(cardTempId <= 22){ //2번째줄   
      cardPX = ((cardTempId-cardMaxPX)*cardWidthX) - cardWidthX;
      cardPY = cardheightY;   
      cardPositionXY = "-"+cardPX+"px -" +cardPY+"px" ; 
    //  console.log("2:====>"+cardPositionXY);
    }else if(cardTempId <= 33){ //3번째줄
      cardPX = ((cardTempId-(cardMaxPX*2))*cardWidthX) - cardWidthX;
      cardPY = cardheightY*2;       
      cardPositionXY = "-"+cardPX+"px -" +cardPY+"px" ;
    //  console.log("3:====>"+cardPositionXY);
    }else if(cardTempId <= 44){ //4번째줄
      cardPX = ((cardTempId-(cardMaxPX*3))*cardWidthX) - cardWidthX;
      cardPY = cardheightY*3;       
      cardPositionXY = "-"+cardPX+"px -" +cardPY+"px" ;
    //  console.log("4:====>"+cardPositionXY);
    }else{ alert("에러~~!"); }
	     // <!-------------------- 카드 Match 확인----------------------->
    	cardMatchChk(cid,ccl);
	   // console.log(event.srcElement.style.backgroundPosition = cardPositionXY);
	    event.srcElement.style.backgroundPosition = cardPositionXY;
	     // <!-------------------- 카드 Match 확인----------------------->  
};
 // <!-------------------- 카드 뒤집기----------------------->

 // <!-------------------- 카드 Match 확인----------------------->
function cardMatchChk(cid,ccl){
	//console.log(cid,ccl);  
	if(matchChk.length == 0){	// 뒤집힌 카드가 하나도 없는 경우 첫카드 정보를 우선 저장한다.
		matchChk[0] = [cid];
		matchChk[1] = [ccl];
		console.log("처음으로 오픈된 카드"); 	
		cardOkCheck(cid,ccl);	// 완료카드인지 체크
	}else{
		//console.log("두번째 오픈된 카드" + ccl); 
		cardOkCheck(cid,ccl,matchChk[0],matchChk[1]);	// 완료카드인지 체크
		if((matchChk[0]==cid)&&(matchChk[1]==ccl)){
		//	console.log("자기 자신  카드입니다");	
		}else if(matchChk[1]==ccl){
		//	console.log("같은  카드입니다");
			matchChk[2] = [cid];
			matchChk[3] = [ccl];
		cardOkCheck(cid,ccl);	// 완료카드인지 체크
			 // <!-------------------- 같은카드 찾기 성공 ----------------------->
			setTimeout("okCheck(matchChk[0],matchChk[1],matchChk[2],matchChk[3])",0); 	
			 // <!-------------------- 같은카드 찾기 성공  ----------------------->
		}else{
			//console.log("틀린 카드입니다");
			matchChk[2] = [cid];
			matchChk[3] = [ccl];	
			cardOkCheck(cid,ccl);	// 완료카드인지 체크
		
			 // <!-------------------- 카드찾기 실패로 카드 되돌리기 ----------------------->
			setTimeout("againCheck(matchChk[0],matchChk[2])",300); 	
			 // <!-------------------- 카드찾기 실패로 카드 되돌리기 ----------------------->
		}
	}
	//console.log(matchChk);	
}
 // <!-------------------- 카드 Match 확인 ----------------------->


 // <!-------------------- 카드찾기 실패로 카드 되돌리기 ----------------------->
function againCheck(cardA,cardB){
	
    if(!(cardA)||!(cardB)){
       // console.log('똑바로 합시다~!'+ cardA + ' + ' +cardB);
        return false ;    	   
    }
	
	//alert(cardA+"-"+cardB);
	document.getElementById(cardA).style.backgroundPosition = "-544px -384px" ;
	document.getElementById(cardB).style.backgroundPosition = "-544px -384px" ; 
	matchChk = new Array(); 
}	
 // <!-------------------- 카드찾기 실패로 카드 되돌리기 ----------------------->



 // <!-------------------- 같은카드 찾기 성공 ----------------------->
function okCheck(cardAid,cardAc,cardBid,cardBc){
	console.log(matchChkDone[cardAid] = cardAc);
	console.log(matchChkDone[cardBid] = cardBc);
	matchChk = new Array(); 
} 	
 // <!-------------------- 같은카드 찾기 성공  ----------------------->


 // <!-------------------- 완료된 카드인지 체크  ----------------------->
function cardOkCheck(ccid,cclCk){
	//console.log(ccid + "+완료된 카드임!!!!"+arguments[2]); 
	for(var a in matchChkDone){ //완료된 카드인지 체크
		
		if((String(matchChkDone[a])==String(cclCk))&&(arguments[2]!=null)){
			//console.log(ccid + "완료된 카드를 또 선택함!!!!"+arguments[2]); 
			
			//alert("완료된 카드 선택함! 다시!!"+arguments[2]);
			setTimeout("document.getElementById("+arguments[2]+").style.backgroundPosition='-544px -384px'",200); 
			//document.getElementById(arguments[2]).style.backgroundPosition='-544px -384px';
			break;			
		}
		
		if(String(matchChkDone[a])==String(cclCk)){
			//console.log("2완료된 카드임!!!!"+ccid+"+"+cclCk); 
			matchChk = new Array(); 
			break;
			return false;
		}
	}	
} 	
 // <!-------------------- 완료된 카드인지 체크  ----------------------->

