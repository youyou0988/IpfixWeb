 $(function() {
     //声明报表对象  
     
     function prepareChart(type){
        var chart = $('#chart-'+type).highcharts({
              chart: {
                marginLeft: 80,
                marginRight: 20,
                zoomType: 'x'
              },
              title: { text: null },
              xAxis: {
                type: 'datetime',
                showLastTickLabel: true,
                //maxZoom: 14 * 24 * 3600000, // 30 days
                title: {text: 'time'}
              },
              yAxis: {
                title: { text: 'entro' },
              },
              plotOptions:{
                series:{turboThreshold:5000}
              },
              tooltip: { formatter: function() {
                    var datetime = new Date(this.x);
                    var datestr = $.datepicker.formatDate('yy-mm-dd ', datetime);
                    return datestr + datetime.toLocaleTimeString()+'<br>'+this.y;
                }, shared: false },
               //设定报表对象的初始数据  
               series: [],
         }).highcharts();
        while(chart.series.length > 0)
            chart.series[0].remove(true);
        var starttime = convertToString($(".form_datetime").val());
        var endtime = Math.floor((new Date()) / 300000) * 300;
        var i=0;
        var arr = [];
        url = '/ipfix/get/?type='+type+'&starttime='+(starttime+i*10)+'&endtime='+endtime;
        console.log(url);
        var dstip_entro_series = { type:"spline", name: 'dstip_entro', data:[] };
        var srcip_entro_series = { type:"spline", name: 'srcip_entro', data:[] };
        var srcport_entro_series = { type:"spline", name: 'srcport_entro', data:[] };
        var dstport_entro_series = { type:"spline", name: 'dstport_entro', data:[] };
        var foo = $.getJSON(url,function(data){
          $.each(data,function(index,line){
              // if(line['dstip_entro']!=0){
              dstip_entro_series.data.push( [ line['tstamp']*1000, line['dstip_entro'] ] );
              srcip_entro_series.data.push( { x : line['tstamp']*1000, y : line['srcip_entro'] } );
              srcport_entro_series.data.push( { x : line['tstamp']*1000, y : line['srcport_entro'] } );
              dstport_entro_series.data.push( { x : line['tstamp']*1000, y : line['dstport_entro'] } );
          })
          chart.addSeries(dstip_entro_series);
          chart.addSeries(srcip_entro_series);
          chart.addSeries(srcport_entro_series);
          chart.addSeries(dstport_entro_series);
        });


     }


     $(document).ready(function() {  

         // 每隔10秒自动调用方法，实现图表的实时更新  
         $('#draw').click(function(){
              
              prepareChart('all');
              prepareChart('in-to-out');
              prepareChart('out-to-in');
              prepareChart('in-to-in');
              prepareChart('out-to-out');

              myLoop('all');
              var i=0; 
              var starttime = Math.floor((new Date()) / 300000) * 300;
              function myLoop (type) {      //  create a loop function
                  
                  console.log(starttime)
                  url = '/ipfix/get/?type='+type+'&starttime='+(starttime+i*10)+'&endtime='+(starttime+i*10+10);
                  $.getJSON(url,function(data){
                      $.each(data,function(index,line){
                               var arr = [ line['tstamp']*1000 ,  line['dstip_entro'] ]
                               chart.series[0].addPoint(arr,true,true);
                      });
                      var testarr =  [(starttime+i*100)*1000, 0.5 ];
                      console.log(testarr);
                      $('#chart-'+type).highcharts().series[0].addPoint(testarr,true,true);
                      
                  })
                  setTimeout(function(){
                        i++;
                        if(i<20) myLoop(type);
                    }, 3000);
                }
              // url = '/ipfix/get/?time='+starttime;
              // window.setInterval(function(){getForm(url)},3000);  
              
         });
         $('#sub-nav li').click(function(){
             // $.getJSON('/ipfix/all?type='+$(this).attr('id'),function(data){
                  $('#sub-nav li').each(function(index,line){
                        $(line).removeClass();
                  })
                  $('#sub-nav li#'+$(this).attr('id')).addClass('active');
                  var data = $(this).attr('id');
                  $('.chart-group div').each(function(index,line){
                      if($(line).attr('id')=='chart-'+data || $(line).attr('id')=='highcharts-'+(index-1) ){
                          $(line).css('display','block');
                      }else{
                           $(line).css('display','none');
                      }
                        
                  })
                  // $('#chart-'+data).css('display','block');
                  // $('#highcharts-'+index*2).css('display','block');
            // })
         })
          

     });  


 });

 function convertToString(date){
    var dateString = date;
    var dateParts = dateString.split(' ');
    var timeParts = dateParts[1].split(':');
    var date;

    dateParts = dateParts[0].split('-');

    date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]);

    console.log(date.getTime()); //1379426880000
    console.log(date); //Tue Sep 17 2013 10:08:00 GMT-0400
    return date.getTime()/1000;
}
