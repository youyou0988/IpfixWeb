function draw_master_detail_charts(container, params, vars, on_detail_selected, chart_mode)
{
  var masterChart, detailChart;
  var master_latest = 0;
  var detail_latest = 0;
  var master_default_selection_size = 2*3600000;
  var master_min_selection_size = 3600000;
  var master_max_selection_size = 24*3600000;
  var detail_default_selection_size = 300000;
  var detail_min_selection_size = 300000;
  var detail_max_selection_size = 12*300000;
  chart_mode = chart_mode ?  chart_mode : 'spline';
  vars.container = container;
  vars.chart_mode = chart_mode;
  $(container).data('params', params);
  $(container).data('vars', vars);
  
  function OnMasterSelected(min, max) {
    detail_latest = 0;
	  //reverse engineer the last part of the data
		var detailData = [];
		var i,j,line,point;
	  $.each(masterChart.series, function(i, line) {
  		$.each(line.data, function(j, point) {
	  	  if (point.x >= min && point.x <= max) {
	  		  detailData.push({x: point.x, y: point.y});
		  	  detail_latest = Math.max(point.x, detail_latest);
		    }
		  });
		  if (detailChart.series.length <= i) {
		    detailChart.addSeries({type:chart_mode, name: line.name, data:detailData});
      } else {
		    detailChart.series[i].setData(detailData);
		  }
	  });
    //async call data again
    //drawTopTen(min,max,chart_mode);
    vars.master_selection = {min:min, max:max};
		UpdateMasterSelectionPlotBand(min, max);
	} 

  function OnDetailSelected(min, max) {
    var i,j,line,point;
    var total_selected_bytes = 0;
	  $.each(masterChart.series, function(i, line) {
  		$.each(line.data, function(j, point) {
	  	  if (point.x >= min && point.x < max) {
	  	    total_selected_bytes += point.y * 300 / 8;
	  		}
		  });
		});
		vars.detail_selection = {min:min, max:max};
		UpdateDetailSelectionPlotBank(min, max); 
		if (on_detail_selected !== undefined) on_detail_selected(params, vars, min, max, total_selected_bytes);
    
	}

  function UpdateMasterSelectionPlotBand(min, max) {
    var master_xAxis = masterChart.xAxis[0];
    master_xAxis.removePlotBand('mask');
    master_xAxis.addPlotBand({id:'mask', from:min, to:max,color:'rgba(0, 0, 0, 0.2)'});
  }

  function UpdateDetailSelectionPlotBank(min, max) {
    var detail_xAxis = detailChart.xAxis[0];
    detail_xAxis.removePlotBand('mask');
    detail_xAxis.addPlotBand({id:'mask', from:min, to:max, color:'rgba(0, 0, 0, 0.6)'});
    
    var master_xAxis = masterChart.xAxis[0];
    master_xAxis.removePlotBand('detail_mask');
    master_xAxis.addPlotBand({id:'detail_mask', from:min, to:max,color:'rgba(0, 0, 0, 0.6)'});
  }      

  function ExtractRangeFromSelectionEvent(event, default_selection_size, latest,
     min_selection_size, max_selection_size) {
  	// event.type is drag
  	var extremesObject = event.xAxis[0],
			min = Math.round(extremesObject.min/300000)*300000,
			max = Math.round(extremesObject.max/300000)*300000;
	  
	  if (event.type == 'click') {
		  min = Math.round((extremesObject.value - default_selection_size/2)/300000)*300000;
		  max = min + default_selection_size;
	  }

	  min = Math.min(min, latest - min_selection_size),
	  max = Math.max(min + min_selection_size, max);
	  max = Math.min(min + max_selection_size, max);
    return {min:min, max:max};
  }
  
  // listen to the selection event on the master chart to update the
  // extremes of the detail chart
	function MasterSelectionChanged(event) {
	  var range = ExtractRangeFromSelectionEvent(event, master_default_selection_size,
	      master_latest, master_min_selection_size, master_max_selection_size);
    OnMasterSelected(range.min, range.max);
	  return false;
	} 

	// listen to the selection event on the master chart to update the
	// extremes of the detail chart
	function DetailSelectionChanged(event) {
	  var range = ExtractRangeFromSelectionEvent(event, detail_default_selection_size,
	      detail_latest, detail_min_selection_size, detail_max_selection_size);
    OnDetailSelected(range.min, range.max);
		return false;
	} 

  // create the master chart
  function createMaster() {
    Highcharts.setOptions({global:{useUTC:false}});
    vars.masterChart = masterChart = $('#master-container').highcharts({
      chart: {
        //reflow:false,
        borderWidth: 0,
        backgroundColor: null,
        marginLeft: 50,
        marginRight: 20,
        zoomType: 'x',
        events:{
          selection: MasterSelectionChanged,
          click: MasterSelectionChanged
        }
      },
      title: { text: null },
      xAxis: {
        type: 'datetime',
        showLastTickLabel: true,
        //maxZoom: 14 * 24 * 3600000, // 30 days
        title: {text: null}
      },
      yAxis: {
        gridLineWidth: 0,
        labels: { enabled: false },
        title: { text: null },
        min: 0.6,
        showFirstLabel: false
      },
      tooltip: { formatter: function() {
	      var v = format_number(this.y);
	      var datetime = new Date(this.x);
	      var datestr = $.datepicker.formatDate('yy-mm-dd ', datetime);
	      return datestr + datetime.toLocaleTimeString() + ' : <b>'+ v + 'bytes</b>';
	    }, shared: true},
      legend: { enabled: false },
      credits: { enabled: false },
      plotOptions: {
        series: {
          fillColor: {
            linearGradient: [0, 0, 0, 70],
            stops: [[0, '#4572A7'],[1, 'rgba(0,0,0,0)']]
          },
          lineWidth: 1,
		      marker: {enabled: false, states:{hover:{enabled: true,radius: 3}}},
		      shadow: false,
		      states: {hover: {enable:true, lineWidth: 1} },
		      enableMouseTracking: true
		    }
		  },
      series: [],
      exporting: { enabled: false }
    }, function(masterChart) {
        createDetail(masterChart)
    }).highcharts(); // return chart instance
  }

  // create the detail chart
  function createDetail(masterChart) {
	  // create a detail chart referenced by a global variable
	  vars.detailChart = detailChart = $('#detail-container').highcharts({
      chart: {
        //reflow: false,
	      marginBottom: 120,
		    marginLeft: 50,
	      marginRight: 20,
	      zoomType: 'x',
        //style: {position: 'absolute'},
        events:{
          selection: DetailSelectionChanged,
          click: function(event){
            // console.log('x: '+ event.xAxis[0].value +', y: '+
            //               event.yAxis[0].value);
          }
        }
	    },
	    credits: {enabled: false},
	    title: {text: null},
	    subtitle: {text: ''},
	    xAxis: {type: 'datetime'},
	    yAxis: [{title: {text: 'bytes'}, maxZoom: 0.1, min: 0},{title: {text: 'rank'}, maxZoom: 0.1, min: 0,opposite:true}],
	    tooltip: { formatter: function() {
        var v = format_number(this.y);
        var w = format_number(this.point.extra);
	      var datetime = new Date(this.x);
	      var datestr = $.datepicker.formatDate('yy-mm-dd ', datetime);
        if(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(this.series.name)){
          return "IP:<b>"+this.series.name+'</b>  Bytes:<b>'+ w + '</b><br /> '+datestr + datetime.toLocaleTimeString();
        }else{
          return "IP:<b>"+this.series.name+'</b>  Bytes:<b>'+ v + 'bytes</b><br /> '+datestr + datetime.toLocaleTimeString();
        }
	    }, shared: false},
	    legend: {enabled: true, y:15 },
	    plotOptions: {
	      series: {stacking: 'normal',marker: {enabled: false,states: {hover: {enabled: true,radius: 3}}},
                events:{click:function(event){
                  // console.log('x: '+ event.xAxis[0].value +', y: '+
                  //         event.yAxis[0].value);
                  console.log(event.point);
                }}},
	      spline:{lineWidth:2,states:{hover:{lineWidth:3}},marker:{enabled:false}}
	    },
	    series: [],
	    exporting: { enabled: false }
    }).highcharts(); // return charts
  }

  // make the container smaller and add a second container for the master chart
  var $container = $(container).css('position', 'relative');
  var $detailContainer = $('<div id="detail-container">').appendTo($container);
  var $masterContainer = $('<div id="master-container">')
    .css({ position: 'absolute', top: 300, height: 80, width: '100%' })
    .appendTo($container);

  // create master and in its callback, create the detail chart
  createMaster();
  detailChart.showLoading();
  // fetch and update chart series
  console.log(vars.url);
  vars.url +="?time=1397094925";
  $.getJSON(vars.url, function(data){
    detailChart.hideLoading();
    var series;
    series = { type:"spline", name: 'ȫ��', data:[] };
	  $.each(data, function(i, point) {
      
      //$.each(line, function(j, point) {
        if(point['type']=='ALL'){
          series.data.push([1000*point['time'],Math.round(point['bytes'])]);
          master_latest = Math.max(1000*point['time'], master_latest);
        }
	      
     // });
      
    });
    masterChart.addSeries(series);
    OnMasterSelected(master_latest - master_default_selection_size, master_latest);
    OnDetailSelected(detail_latest - detail_default_selection_size, detail_latest);    
  })
  .fail(function(jqxhr, textStatus, error ) {
    var err = textStatus + ', ' + error;
    console.log( "Request Failed: " + err);
  });
}

function change_chart_mode(chart_mode) {
  var detailChart = $("#detail-container").highcharts();
  var datas = [];
  $.each(detailChart.series, function(i, series) {
    datas.push(series.data);
    series.type = chart_mode;
  });  
  
  $.each(datas, function(i, data) {
	//	detailChart.addSeries({type:chart_mode, data:data});
  });
}

function show_port_trend_on_detail(protocol, port, srcdst) {
  var container = '#chart';
  var params = $(container).data('params');
  var vars = $(container).data('vars');
  
  var new_params = clone(params);
  new_params.starttime = Math.round(vars.master_selection.min/1000);
  new_params.endtime = Math.round(vars.master_selection.max/1000);
  new_params.type = 'port';
  new_params.protocol = protocol;
  add_condition_to_filter(new_params, (srcdst ? srcdst + ' ' : '') + 'port ' + port);
  url = '../d/port?use_raw_file=1&step=300&' + $.param(new_params);
  $.getJSON(url, function(data) {
    var name;
    if (srcdst == 'src') 
      name = protocol + ' Ô´¶Ë¿Ú' + port;
    else if (srcdst == 'dst')
      name = protocol + ' Ä¿µÄ¶Ë¿Ú' + port;
    else
      name = protocol + ' ¶Ë¿Ú' + port;
    var series = { type:vars.chart_mode, name: name, data:[] };
    console.log(vars);
    $.each(data, function(i, line){
      $.each(line, function(i, point) {
        series.data.push([1000*point['time'], Math.round(point['bps'])]);
      });
    });
    vars.detailChart.addSeries(series);
    vars.detailChart.series[0].hide();
  });
}
