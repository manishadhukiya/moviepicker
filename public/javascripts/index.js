$(document).ready(function(){
  var date_input_s=$('input[name="sdate"]');
  var date_input_e=$('input[name="edate"]');
  var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
  var options={
    format: 'dd MM yyyy',
    container: container,
    autoclose: true,
  };
  date_input_s.datepicker(options);
  date_input_e.datepicker(options);
});