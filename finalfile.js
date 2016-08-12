var fs = require("fs");
var data = fs.readFileSync('India2011.csv');
var data1 = fs.readFileSync('IndiaSC2011.csv');
var data2 = fs.readFileSync('IndiaST2011.csv');


var cnt_age,cnt_lit,cnt_total,cnt_wo,cnt_below,cnt_pri,cnt_mid,cnt_sec,cnt_high,cnt_non,cnt_tech,cnt_grad,cnt_unclas;
var final_obj={};
var final_obj1={};


var i=0,j=0;

function calc (data) {
  var stringData=data.toString();
  var arrayOne= stringData.split('\r\n');
  var header=arrayOne[0].split(',');
 //console.log(header);
  cnt_age = header.indexOf('Age-group');
  cnt_lit = header.indexOf('Literate - Persons');
  cnt_total=header.indexOf('Total/ Rural/ Urban');
  //console.log(cnt_lit);
  cnt_wo = header.indexOf('Educational level - Literate without educational level - Persons');
  cnt_below = header.indexOf('Educational level - Below Primary - Persons');
  cnt_pri = header.indexOf('Educational level - Primary - Persons');
  cnt_mid = header.indexOf('Educational level - Middle - Persons');
  cnt_sec = header.indexOf('Educational level - Matric/Secondary - Persons');
  cnt_high = header.indexOf('Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons');
  cnt_non = header.indexOf('Educational level - Non-technical diploma or certificate not equal to degree - Persons');
  cnt_tech = header.indexOf('Educational level - Technical diploma or certificate not equal to degree - Persons');
  cnt_grad = header.indexOf('Educational level - Graduate & above - Persons');
  cnt_unclas = header.indexOf('Educational level - Unclassified - Persons');


  for (i = 1; i < arrayOne.length-1; i++) {
     var line=arrayOne[i].split(',');
    // console.log(line);


  if((line[cnt_age] != '0-6') && (line[cnt_total] == 'Total') && (line[cnt_age] != 'All ages')&& (line[cnt_age] != 'Age not stated') )
  {
    if(final_obj[line[cnt_age]]==undefined)
    {
      final_obj[line[cnt_age]]=parseInt(line[cnt_lit]);
    }
      //final_obj[line[cnt_lit]]=line[cnt_lit];
else{
    final_obj[line[cnt_age]]+=parseInt(line[cnt_lit]);
  }
}


if(final_obj1[header[cnt_wo]]==undefined && final_obj1[header[cnt_below]]==undefined && final_obj1[header[cnt_pri]]==undefined && final_obj1[header[cnt_mid]]==undefined &&final_obj1[header[cnt_sec]]==undefined && final_obj1[header[cnt_high]]==undefined
       && final_obj1[header[cnt_non]]==undefined && final_obj1[header[cnt_tech]]==undefined && final_obj1[header[cnt_grad]]==undefined && final_obj1[header[cnt_unclas]]==undefined)
     {
       final_obj1[header[cnt_wo]]=0;
       final_obj1[header[cnt_below]]=0;
       final_obj1[header[cnt_pri]]=0;
       final_obj1[header[cnt_mid]]=0;
       final_obj1[header[cnt_sec]]=0;
       final_obj1[header[cnt_high]]=0;
       final_obj1[header[cnt_non]]=0;
       final_obj1[header[cnt_tech]]=0;
       final_obj1[header[cnt_grad]]=0;
       final_obj1[header[cnt_unclas]]=0;
     }

     if(line[cnt_age] =='All ages' && line[cnt_total]=='Total')
     {

         final_obj1[header[cnt_wo]]+=parseInt(line[cnt_wo]);
         final_obj1[header[cnt_below]]+=parseInt(line[cnt_below]);
         final_obj1[header[cnt_pri]]+=parseInt(line[cnt_pri]);
         final_obj1[header[cnt_mid]]+=parseInt(line[cnt_mid]);
         final_obj1[header[cnt_sec]]+=parseInt(line[cnt_sec]);
         final_obj1[header[cnt_high]]+=parseInt(line[cnt_high]);
         final_obj1[header[cnt_non]]+=parseInt(line[cnt_non]);
         final_obj1[header[cnt_tech]]+=parseInt(line[cnt_tech]);
         final_obj1[header[cnt_grad]]+=parseInt(line[cnt_grad]);
         final_obj1[header[cnt_unclas]]+=parseInt(line[cnt_unclas]);

     }


}
}  //function data
calc(data);
calc(data1);
calc(data2);


var jArray3=[];
for(property in final_obj1)
{
  var obj3={};
  obj3.category=property;
  obj3.value=final_obj1[property];
  jArray3.push(obj3);

}
//sconsole.log(jArray3);

var final=[];
final1=Object.keys(final_obj);
//console.log(final1.length);
for(i=0;i<final1.length;i++)
{
  b={};
  b["Age-group"]=final1[i];
  f=final1[i];
  b["Literates"]=final_obj[f];
  final.push(b);
}
//console.log(c);

var b1=JSON.stringify(final);
fs.writeFile('bharath.json', b1,'utf8', function (err){
 if (err) throw err;
});

var file = 'krishna.json';

var obj = JSON.stringify(jArray3);

fs.writeFileSync(file, obj);
