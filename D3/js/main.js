const cars = d3.csv('cars.csv',function(data){
    console.log(data);
    var l = data.length;
    /*d3.select('#year').selectAll('div')
      .data(data)
      .enter()
      .append('div')
      .text(function(d){
        return d.YEAR + " " + d.Make + " " + d.Model + " " + d.Size + " " + d.kW ;
      });*/

    //年份數量計算
    var y_12=0,y_13=0,y_14=0,y_15=0,y_16=0;
    for(i=0;i<l;i++){
        switch (data[i].YEAR){
            case '2012':
                y_12++;
                break;
            case '2013':
                y_13++;
                break;  
            case '2014':
                y_14++;
                break;
            case '2015':
                y_15++;
                break;
            case '2016':
                y_16++;
                break;
        }
    }
    var years=[
        {t:"2012年",x:1,count:y_12},
        {t:"2013年",x:2,count:y_13},
        {t:"2014年",x:3,count:y_14},
        {t:"2015年",x:4,count:y_15},
        {t:"2016年",x:5,count:y_16}
    ];
    var years_svg = d3.select('#year')
        .append('svg')
        .attr({
            'width':1000,
            'height':500
        });
    
    years_svg.selectAll('rect')
        .data(years)
        .enter()
        .append('rect')
        .attr({
            'left':100,
            'fill':'#008ec4',
            'width':function(d){
                return d.count*30;
            },
            'height':30,
            'x':0,
            'y':function(d){
                return (d.x-1) * 35;
            }
        });
    years_svg.selectAll('text')
        .data(years)
        .enter()
        .append('text')
        .text(function(d){
            return d.t +" "+ d.count + "台";
        })
        .attr({
            'fill':'#000',
            'x':function(d){
                return d.count * 30 +10
            },
            'y':function(d){
                return d.x * 35 -15;
            }
        });
    //車廠數量計算
    
    var MIT=0,NIS=0,FOR=0,SMA=0,TES=0,CHE=0,BMW=0,KIA=0;
    for(i=0;i<data.length;i++){
        switch (data[i].Make){
            case 'MITSUBISHI':
                MIT++;
                break;
            case 'NISSAN':
                NIS++;
                break;  
            case 'FORD':
                FOR++;
                break;
            case 'SMART':
                SMA++;
                break;
            case 'TESLA':
                TES++;
                break;
            case 'CHEVROLET':
                CHE++;
                break;
            case 'BMW':
                BMW++;
                break;
            case 'KIA':
                KIA++;
                break;
        }
    }

     //平均馬力計算


     var SUB=0,MID=0,COM=0,TWO=0,FUL=0,STA=0,SUV=0;
     var SUB_kw=0,MID_kw=0,COM_kw=0,TWO_kw=0,FUL_kw=0,STA_kw=0,SUV_kw=0;
     
     for(i=0;i<data.length;i++){
        var kW = parseInt(data[i].kW);
         switch (data[i].Size){
             case 'SUBCOMPACT':
                 SUB_kw += kW;
                 SUB++;
                 //console.log("SUB "+SUB_kw);
                 break;
             case 'MID-SIZE':
                 MID_kw += kW;
                 MID++;
                 //console.log("MID "+MID_kw);
                 break;  
             case 'COMPACT':
                 COM++;
                 COM_kw += kW;
                 //console.log("MID "+COM_kw);
                 break;
             case 'TWO-SEATER':
                 TWO++;
                 TWO_kw += kW;
                 //console.log("TWO "+TWO_kw);
                 break;
             case 'FULL-SIZE':
                 FUL++;
                 FUL_kw += kW;
                 //console.log("FUL "+FUL_kw);
                 break;
             case 'STATION WAGON - SMALL':
                 STA++;
                 STA_kw += kW;
                 //console.log("STA "+STA_kw);
                 break;
             case 'SUV - STANDARD':
                 SUV++;
                 SUV_kw += kW;
                 //console.log("SUV "+SUV_kw);
                 break;
         }
         
     }
   
    SUB_kw=(SUB_kw / SUB).toPrecision(3);
    MID_kw=(MID_kw / MID).toPrecision(3);
    COM_kw=(COM_kw / COM).toPrecision(3);
    TWO_kw=(TWO_kw / TWO).toPrecision(3);
    FUL_kw=(FUL_kw / FUL).toPrecision(3);
    STA_kw=(STA_kw / STA).toPrecision(3);
    SUV_kw=(SUV_kw / SUV).toPrecision(3);
    /*console.log(SUB_kw);
    console.log(MID_kw);
    console.log(COM_kw);
    console.log(TWO);
    console.log(FUL);
    console.log(STA_kw);
    console.log(SUV_kw);*/

    var avg_arr =[
        {i:1,size:'SUBCOMPACT',kW:SUB_kw},
        {i:2,size:'MID-SIZE',kW:MID_kw},
        {i:3,size:'COMPACT',kW:COM_kw},
        {i:4,size:'TWO-SEATER',kW:TWO_kw},
        {i:5,size:'FULL-SIZE',kW:FUL_kw},
        {i:6,size:'STATION WAGON - SMALL',kW:STA_kw},
        {i:7,size:'SUV - STANDARD',kW:SUV_kw},
    ];
    
    avg_arr.sort(function(x,y){
            return x.kW - y.kW;
    });
    console.log(avg_arr);

    var kw_svg = d3.select('#avg_sort')
    .append('svg')
    .attr({
        'width':1000,
        'height':500
    });

    kw_svg.selectAll('rect')
    .data(avg_arr)
    .enter()
    .append('rect')
    .attr({
        'left':100,
        'fill':'#235789',
        'width':function(d){
            return d.kW;
        },
        'height':30,
        'x':0,
        'y':function(d){
            return (d.i-1) * 35;
        }
    });
    kw_svg.selectAll('text')
    .data(avg_arr)
    .enter()
    .append('text')
    .text(function(d){
        return d.size + "："+ d.kW +"kw";
    })
    .attr({
        'fill':'#000',
        'x':function(d){
            return parseInt(d.kW) + 10;
        },
        'y':function(d){
            return d.i * 35 -15;
        }
    });


    //計算佔比


    /*MIT=(MIT/l).toPrecision(2);
    FOR=(FOR/l).toPrecision(2);
    NIS=(NIS/l).toPrecision(2);
    SMA=(SMA/l).toPrecision(2);
    TES=(TES/l).toPrecision(2);
    CHE=(CHE/l).toPrecision(2);
    BMW=(BMW/l).toPrecision(2);
    KIA=(KIA/l).toPrecision(2);
    console.log(FOR);*/


    var w = 800,                        
    h = 800,                            
    r = 400,                            
    color = d3.scale.category20c();     

    data = [{"label":"MITSUBISHI", "value":MIT}, 
            {"label":"FORD", "value":FOR}, 
            {"label":"NISSAN", "value":NIS},
            {"label":"SMART", "value":SMA},
            {"label":"TESLA", "value":TES},
            {"label":"CHEVROLET", "value":CHE},
            {"label":"BMW", "value":BMW},
            {"label":"KIA", "value":KIA}
        ];
    
    var vis = d3.select("body")
        .append("svg:svg")             
        .data([data])                   
            .attr("width", w)           
            .attr("height", h)
        .append("svg:g")               
            .attr("transform", "translate(" + r + "," + r + ")")    

    var arc = d3.svg.arc()              
        .outerRadius(r);

    var pie = d3.layout.pie()           
        .value(function(d) { return d.value; });   

    var arcs = vis.selectAll("g.slice")     
        .data(pie)                          
        .enter()                           
            .append("svg:g")                
                .attr("class", "slice");    

        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) 
                .attr("d", arc);                                    

        arcs.append("svg:text")                                    
                .attr("transform", function(d) {                    
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        
            })
            .attr("text-anchor", "middle")                          
            .text(function(d, i) { return data[i].label +" " +data[i].value.toPrecision(3) + " %"; }); 

   

});
