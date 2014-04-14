 $(function() {
     //声明报表对象  
     var chart = new Highcharts.Chart({
        chart: {
            marginLeft: 50,
            marginRight: 20,
            zoomType: 'x',
            renderTo: 'chart'
          },
          title: { text: null },
          xAxis: {
            type: 'datetime',
            showLastTickLabel: true,
            //maxZoom: 14 * 24 * 3600000, // 30 days
            title: {text: null}
          },
          // yAxis: {
          //   gridLineWidth: 0,
          //   labels: { enabled: false },
          //   title: { text: null },
          //   showFirstLabel: false
          // },
          tooltip: { formatter: function() {
                var datetime = new Date(this.x);
                var datestr = $.datepicker.formatDate('yy-mm-dd ', datetime);
                return datestr + datetime.toLocaleTimeString()+'<br>'+this.y;
            }, shared: false},
         //设定报表对象的初始数据  
         series: [{
             data: [ ]
         }]
     });
     // getForm();
     function getForm(url) {
         //使用JQuery从后台获取JSON格式的数据  
         jQuery.getJSON('/ipfix/get/?time=1397094925', null, function(data) {
             //为图表设置值  
             po = { x:data['tstamp']*1000, y:data['dstip_entro'] };
             arr = [ data['tstamp'], data['dstip_entro']]
             chart.series[0].addPoint( arr,true,true );
         });
     }


     $(document).ready(function() {  
         // 每隔10秒自动调用方法，实现图表的实时更新  
         $('#draw').click(function(){
              var starttime = convertToString($(".form_datetime").val());
              var endtime = convertToString($(".end_form_datetime").val());
              var i=0;
              var arr = [];
              myLoop();
              // url = '/ipfix/get/?time='+starttime;
              // window.setInterval(function(){getForm(url)},3000);   
              function myLoop () {              //  create a loop function
                  url = '/ipfix/get/?starttime='+(starttime+i*10)+'&endtime='+endtime;
                  console.log(url);
                  var dstip_entro_series = { type:"spline", name: 'dstip_entro', data:[] };
                  var srcip_entro_series = { type:"spline", name: 'srcip_entro', data:[] };
                  var srcport_entro_series = { type:"spline", name: 'srcport_entro', data:[] };
                  var dstport_entro_series = { type:"spline", name: 'dstip_entro', data:[] };
                  var foo = $.getJSON(url,function(data){
                    $.each(data,function(index,line){
                        // if(line['dstip_entro']!=0){
                        dstip_entro_series.data.push( [ line['tstamp']*1000, line['dstip_entro'] ] );
                        // srcip_entro_series.data.push( { x : line['tstamp']*1000, y : line['srcip_entro'] } );
                        // srcport_entro_series.data.push( { x : line['tstamp']*1000, y : line['srcport_entro'] } );
                        // dstport_entro_series.data.push( { x : line['tstamp']*1000, y : line['dstport_entro'] } );
                    })
                    chart.series[0].remove();
                    chart.addSeries(dstip_entro_series);
                    // chart.addSeries(srcip_entro_series);
                    // chart.addSeries(srcport_entro_series);
                    // chart.addSeries(dstport_entro_series);
                    // chart.series[0].setData(arr);
                    setTimeout(function(){
                        i++;
                        if(i<0) myLoop();
                    }, 3000);
                  });
                }
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