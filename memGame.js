/*


alaada    302049754
	  cards memory Game  -
	  
	  Notes: Works only on Chrome Browsers
	  -shai said its fine tnx

*/

var createManyDivs = function() {
	 var arr = [    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14, 15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
	shuffle(arr);
  var num = 5;//table size
  var cardnum=0;
  for(var i = 1; i <= num+1 ;i++) {
	   for(var j =0 ; j< num;j++,cardnum++){
          var d = $("<div class=\"box\" id=\"card"+arr[cardnum]+"\">  </div>");
           var css = { 
                "background": "url(\"card.jpg\")",
		    	 "background-size":"cover"
				};
     d.css(css);
  $(".main").append(d);
  }
 }
};
var loadPage = function() {
	var btnclicked=false;//to prevent new game btn abuse
	var movNum=0;//player moves
	var matchs=0;//asis
    var frst =100;//first pic
    var sec=99;//sec pic
 	var flagFrst=0;//first cli
	var flagSec=0;
	var flag=0;
    var tempFrstClk ="";//first click id
	var tempSecClk ="";//sec click id
    var counter=0;//count till 3 max opened cards
	
    $(".main").append( createManyDivs);//create the cards shuffled
    $(".gmHead").text("Moves: "+movNum+ " "+" Matches: "+matchs); //update score
	
   
	  $("#btnn").click(function () {	//new game btn
               $("#winMsg").css("visibility","hidden");
    });
	
	
	  $(".btn").click(function () {	//new game btn
	   if(btnclicked==false){ //prevent many clicks  
	   $("#winMsg").css("visibility","hidden");
          $(".main").empty();		   
          $("document").ready(loadPage);
	    }
    btnclicked=true;
    });
	

	
	
    $(".box").click(function() {//Card pressed
	    var currClk = event.target.id;
	    if(currClk==tempFrstClk||tempSecClk==currClk)//if already pressed
			   return;
			 
	//----------GET IMAGE NAME
	    if(currClk.length==5){//single digit
	       var imgName=currClk[4];
	    }//here is max of first set without doubles
	    else if(currClk.length==6 &&  parseInt(currClk[4])== 1 &&    parseInt(currClk[5])< 5  ){
		 	 var imgName=currClk[4]+currClk[5]; //less then 15  
	    }
	 
	 //checks if from sec set ***("matching")
        else if(currClk.length==6){
	        if(    parseInt(currClk[4])== 1 &&    parseInt(currClk[5])> 4 ||  parseInt(currClk[4])== 2  ){
		    	  var Tmp= ((parseInt(currClk[4])*10+parseInt(currClk[5])) -15  );
			     flag=1;
			     var imgName = Tmp.toString();//
			}
        }
//-----------END GETTING NAME---------------;
	var cssw = {//css img to correct one
		"transform": "rotateY("+360+"deg)",//type of animation
        "background": "url(card"+imgName+".jpg)",
		"background-size":"cover",
	};	
	//-------check and update status board-------///
	counter++;
    if(counter==1){
		frst=(imgName);
		if(flag!=0)
		   flagFrst=1;		
	}
	else if(counter==2){
		if(matchs==14){//last card 
		         matchs++;
					 win();
		}
		 sec=imgName;
	     if(flag!=0)
		   flagSec=1;
	}		
	else{
        if(frst==sec){//equals
		        matchs+=1;
				  $(".gmHead").text("Moves: "+movNum + "     Matches: "+matchs);
				  $("#"+tempFrstClk).addClass("opened");//keep them opened
				   $("#"+tempSecClk).addClass("opened");
                flagFrst=0;
			    flagSec=0;			   
	           counter=1;
			    frst= imgName;	
			    if(flag!=0)
			       flagFrst=1; 	
		}
        else{				
               var csss = {
                 "background": "url(\"card.jpg\")",
		    	 "background-size":"cover"
				};	
			    if(flagFrst==1)
		    	    frst = parseInt(frst)+15;
			     if(flagSec==1)
			    	sec = parseInt(sec)+15;
              
			     $("#"+tempFrstClk).css(csss);
			     $("#"+tempSecClk).css(csss);
				 tempFrstClk=currClk;
			     flagFrst=0;
			    flagSec=0;
			    counter=1; 
				frst=imgName;
		    	if(flag!=0)
				        flagFrst=1;	
			}	
		}
		if(btnclicked==true)
			btnclicked=false;
	   flag=0;	
	   tempSecClk=tempFrstClk;
	   tempFrstClk=currClk;
	   
       movNum+=1;	
		
       $(".gmHead").text("Moves: "+movNum+ " "+" Matches: "+matchs);
	   $("#"+currClk).css(cssw);	
	
});

};
function win(){
	$("#winMsg").css("visibility","visible");
	
}
function shuffle(arr) {
    var j, x, i;
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
}
window.onload = function(){ 
 $("document").ready(loadPage);
 
}
 