function createIntentTab()
  {
var div= document.createElement('div');
div.setAttribute('class', 'tab_container');
    div.innerHTML = ` 

          <div class="tab">
          <button class="tab-label" onclick="openContent(event,'Intent')" id="defaultOpen" >New Intent </button>
          </div>

          <div id="Intent" class="tab-content">
          <div class="card-wrap form-field">
    
                  <input type='text' id="iname" placeholder="Intent Name" name="iname" autocomplete="off"  />
                
              </div>
              <div class="card-wrap">
                  <div class="tap-button" onclick="createIntent(document.getElementById('iname'))">
                    Create 
                  </div>
                </div>
        </div>`;

document.getElementById("chat-conversation").appendChild(div);
document.getElementById("defaultOpen").click();
 updateScroll();
}



/*Create Intent*/



function createIntent(t)
  {
    var txt=t.value;

    if(txt!='')
    {

       var tablinks= document.createElement('button');
      tablinks.setAttribute('class', 'tab-label');
      tablinks.innerHTML=txt;
      tablinks.onclick=function() { 
               openContent(event,txt); 
            }; 
      document.querySelector(".tab").insertAdjacentElement('beforeend', tablinks);


      var tabcontent=document.createElement('div');
      tabcontent.setAttribute('class', 'tab-content');
  
      tabcontent.id=txt;
      tabcontent.innerHTML=`
      <div class="intent"><label  name="intent-name" >${txt}</label> 
          </div>

         
      <label for="utterances-name" >Utterances</label> 
       <div class="utterances">
       <div class="ut-elements form-field">
       
          <input type="text" name="utterances-name" />
          <span ><i class="far fa-plus-circle fa-lg" onclick="add_utterance(this)"></i></span>
         
          </div>
           </div>
           
        <div class="slot_container">
  <div class="slot">
          <input type="button"  class="slot-label" onclick="openSlotDefault(event,this)" value="New Slot" />
     </div> 
     <div class="slot-content">
          <div class="card-wrap form-field">
            <input type='text'  placeholder="Slot Name" name="sname" autocomplete="off"  />
          </div>
              <div class="card-wrap">
                  <div class="tap-button" onclick="createSlot(this)">
                    Create 
                  </div>
              </div>

          
        </div>

    </div>

      
      


   <label>Response Card</label> 
   <div class="rc-header">
       <span><label>Key</label></span>
       <span><label>Value</label></span>
       
       <span><label>Add</label></span>
       <span><label>Delete</label></span>
       </div>
      
   
       <div class="rc">
       
       <div class="rc-elements form-field">
       
                    <span><input name="rc-key" placeholder="Key" type='text'/></span>
                    
                    <span><input name="rc-value" placeholder="value" type='text'/></span>
                    
       
      
           <span><i class="far fa-plus-circle fa-lg" onclick="add_rc(this)"></i></span>
           <span><i class="far fa-times-circle fa-lg" onclick="delete_rc(this)"></i></span>

          </div>
         
           
      </div>
      
      <label for="choice" >Confirmation-Prompt</label> 
       
            <div class="cp-elements ">
                  <div>
                  <input type='radio'  name="choice" value="yes"  />
                  <label for="choice">Yes</label></div>
                  <div>
                  <input type='radio' name="choice"  value="no" />
                  <label for="choice">No</label></div>
                  
                </div>
     
    <div class="card-wrap">
                  <div class="tap-button" onclick="popup(this)">
                    Save Intent 
                  </div>
                </div>

          `;

    
  document.querySelector(".tab_container").insertAdjacentElement('beforeend', tabcontent);
      
}


}

/*Add Utterances*/


function add_utterance(ele) {
var j="utterances-name";
 
 var ut = ele.parentNode.parentNode.parentNode;

 replace_old(ele);
  
 var input = document.createElement('div');
  input.innerHTML = `<input type="text" name=${j} >
         <span> <i class="far fa-plus-circle fa-lg" onclick="add_utterance(this)"></i></span>
         `;



  input.setAttribute('class', 'ut-elements form-field');

  ut.insertAdjacentElement('afterbegin', input);
  ut.scrollBy(0, 1000);

}


/*Replace Old Utterances*/


function replace_old(ele){
  var n=document.createElement("span");
  n.innerHTML=`<i class="far fa-times-circle fa-lg" onclick="delete_utterances(this)"></i>`;
  ele.parentNode.parentNode.appendChild(n);
  ele.parentNode.parentNode.removeChild(ele.parentNode);

}

/*Delete Utterances*/

function delete_utterances(ele)
{

 ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);

}



/*Add slot */



function createSlot(t)
{


 var txt=t.parentNode.parentNode.children[0].children[0].value;

    if(txt!='')
    {
      var n="slot-Name";
      var j="slot-type";
      var k="Prompt";
    
     var tablinks= document.createElement('input');
     tablinks.setAttribute('type', 'button');
      tablinks.setAttribute('class', 'slot-label');

      tablinks.setAttribute('value', txt);
      tablinks.onclick=function() { 
               openSlotContent(event,txt); 
            }; 
      t.parentNode.parentNode.parentNode.querySelector(".slot").insertAdjacentElement('beforeend', tablinks);


      var tabcontent=document.createElement('div');
      tabcontent.setAttribute('class', 'slot-content');
  
      tabcontent.id=txt;
      tabcontent.innerHTML=`
    <label  name=${n} >${txt}</label> 
          

      <div>
          <label for=${j}>Slot-Type</label> </div>
        <div> <select name=${j} >
          <option value="">Select one</option>
          <option value="String">String</option>
          </select></div>

         <label>Prompt</label> 
                <div class="prompt-box">
                  <input type="checkbox"  name="response" onclick="showHide(this)"/ >
                  <label for="response"> User reply</label>

                  <div class="res-elements form-field"  style="display:none">
                  <div class="res">
                  <input type="text" name="response-name" />
                  <span ><i class="far fa-plus-circle fa-lg" onclick="add_res(this)"></i></span>
                  </div>
                 </div>
                  </div>
       

                <div class="prompt-box">
                  <input type="checkbox"  name="rescard" onclick="showHide(this)" />
                  <label for="rescard"> Response card reply </label>

                  <div class="rescard-elements form-field"  style="display:none">
                  <div class="res-card">
                  <input type="text" name="slot-key" placeholder="Key"/>
                  <input type="text" name="slot-value" placeholder="Value"/>
                  
                  </div>
                  <input type="button" onclick="add_card(this)" value="Add Card"/>
                 </div>
                  </div>
       
      
                    <div class="card-wrap">
                     
                  <div class="tap-button" onclick="delete_slot(this)">
                    Delete Slot 
                  </div>
                  </div>
           
          
          

          `;

    
  t.parentNode.parentNode.parentNode.insertAdjacentElement('beforeend', tabcontent);
 

    }

}


/*Add res,card inside the slt container*/

function add_card(ele)
{

  var j="slot-key";
  var i="slot-value";
 
  var div=document.createElement('div');
  div.setAttribute("class","res-card");
  div.innerHTML=`
                  <input type="text" name=${j} placeholder="Key"/>
                  <input type="text" name=${i} placeholder="Value"/>
                  `;
 ele.parentNode.insertAdjacentElement('afterbegin',div);
}



function add_res(ele)
{
  var p=ele.parentNode.parentNode.parentNode;
  replace_old(ele);
  var j="response-name";
  var div=document.createElement('div');
  div.setAttribute("class","res");
  div.innerHTML=`
                  <input type="text" name=${j} />
                  <span ><i class="far fa-plus-circle fa-lg" onclick="add_res(this)"></i></span>
                  `;
 p.insertAdjacentElement('afterbegin',div);
}



/*Delete slot*/

function delete_slot(ele)
{
 var n=ele.parentNode.parentNode.id;
 
 var cont_child=ele.parentNode.parentNode.parentNode.children;
 var sl=cont_child[0].children;

 for (var i = 0; i < sl.length; i++) {
  
  if(sl[i].value==n)
  {
    cont_child[0].removeChild(sl[i]);
    break;
  }
}

 ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);
 
}

/*function inside slot content for viewing the response and card*/

function showHide(ele)
{
  
  var text = ele.parentNode.children;
  if (ele.checked == true){
    text[2].style.display = "block";
  } else {
     text[2].style.display = "none";
  }
}


/*Add Response Card for each intent*/

function add_rc(ele)
{
 var parentid = ele.parentNode.parentNode.parentNode.parentNode.id;
var parent=document.getElementById(parentid);
var ut=parent.querySelector(".rc");
  var input = document.createElement('div');
  var n="rc-key";
  var j="rc-value";
  input.innerHTML = `
      
                   <span> <input placeholder="Key" name=${n} type='text' /></span>
                    
                    <span><input  placeholder="Value" type='text' name=${j} /></span>
                    
       
      
           <span><i class="far fa-plus-circle fa-lg" onclick="add_rc(this)"></i></span>
           <span><i class="far fa-times-circle fa-lg" onclick="delete_rc(this)"></i></span>
           
       
         `;



  input.setAttribute('class', 'rc-elements form-field');

  ut.insertAdjacentElement('afterbegin', input);
  ut.scrollBy(0, 1000);
}

/*Delete Card*/

function delete_rc(ele)
{
  if(ele.parentNode.parentNode.parentNode.childElementCount!=1)
 ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);

}






/*Update Scroll*/


function updateScroll(){
    var element = document.getElementById("chat-conversation");
    element.scrollTop = element.scrollHeight;
  
}


/*alert popup json retrival */

function popup(btn){
    
    var fr=btn.parentNode.parentNode;
   var obj = {};
   obj["Utterances"]=getUtterances(fr);
   obj["Slot"]=getSlot(fr);
   obj["Response Card"] =getResponseCard(fr);
   obj["Confirmation-Prompt"]=getConfirmation(fr);
       
    alert(JSON.stringify( obj ));
}




function getUtterances(fr)
{
  
   var elements = fr.querySelector(".utterances");
   var sub=elements.children;
    var ut=[];

   for (var i = 0; i < sub.length; i++) {
        var item=sub[i].children;
         ut.push(item[0].value);
      }
    return ut;
}

function getSlot(fr)
{
  
   var sub = document.querySelectorAll(".slot-content");
   var s={};
   var obj=[];
   

   for (var i = 1; i < sub.length; i++) {

          var item=sub[i].children;

          s["Slot-Name"]=item[0].innerHTML;
          s["Slot-Type"]=item[2].children[0].value;
          
          var inner=item[4].children[2].children;
          var r=[];
          for (var j = 0; j < inner.length; j++)
          {
              r.push(inner[j].children[0].value);

          } 
          s["Response"]=r; 

          var inCard=item[5].children[2].children;
          var pair={};
          var pair_ar=[];
          for (var j = 0; j < inCard.length-1; j++)
          {
              pair["Key"]=inCard[j].children[0].value;
              pair["Value"]=inCard[j].children[1].value;
              pair_ar.push(pair);
              pair={};
          } 
          s["Response Card"]=pair_ar; 
           obj.push(s);
           s={};
      }
      
      return obj;
}




function getResponseCard(fr)
{
  
   var elements = fr.querySelector(".rc");
   var sub=elements.children;
   var r={};
   var rc=[];
   for (var i = 0; i < sub.length; i++) {
        var item=sub[i].children;
        
         r["Key"]=item[0].children[0].value;
         r["Value"]=item[1].children[0].value;
         rc.push(r);
         r={};

      }
    return rc;
}


function getConfirmation(fr)
{
   var sub = document.querySelector(".cp-elements");
   var r;
   var ele=sub.children;
   if(ele[0].children[0].checked)
      r=ele[0].children[0].value;
    else if(ele[1].children[0].checked)
      r=ele[1].children[0].value;

    return r;
}



/*menu*/
function openContent(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab-label");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  updateScroll();
}


function openSlotContent(evt, slotName) {

  
var i, slotcontent, slotlinks;
  slotcontent = document.getElementsByClassName("slot-content");
  for (i = 0; i < slotcontent.length; i++) {
    slotcontent[i].style.display = "none";
  }
   slotlinks = document.getElementsByClassName("slot-label");
  for (i = 0; i < slotlinks.length; i++) {
    slotlinks[i].className = slotlinks[i].className.replace(" active", "");
  }
  document.getElementById(slotName).style.display = "block";
  evt.currentTarget.className += " active";
  updateScroll();
}


function openSlotDefault(evt,ele)
{
var slotcontent = ele.parentNode.parentNode.getElementsByClassName("slot-content");
  for (i = 0; i < slotcontent.length; i++) {
    slotcontent[i].style.display = "none";
  }
   slotlinks = ele.parentNode.parentNode.getElementsByClassName("slot-label");
  for (i = 0; i < slotlinks.length; i++) {
    slotlinks[i].className = slotlinks[i].className.replace(" active", "");
  }
	ele.parentNode.parentNode.children[1].style.display="block";
	evt.currentTarget.className += " active";
    updateScroll();
}













