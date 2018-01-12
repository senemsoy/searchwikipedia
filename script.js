$(document).ready(function(){

//get the search input
window.onload = function() {
	document.getElementById("search-wiki-input").focus();
};

//ajax call for the wikipedia API
function ajax (keyword) { 
	$.ajax({ 
		url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
		dataType: "jsonp",
		success: function(response) {
			console.log(response.query);
			//if no articles on the keyword, show error message
			if (response.query.searchinfo.totalhits === 0) {
				showError(keyword);
			}

			//if articles are found, call the showResults functions
			else {
				showResults(response.query.search);
			}
		},
		error: function () {
			alert("Error retrieving search results, please refresh the page");
		}
	});
}

//function that maps the results from the API call to html
function showResults(response){
	var $out = $("out");
	var html =
	response.map(function(result){
		return 	'<a class="result"' + 
				'	href="https://en.wikipedia.org/wiki/'+result.title+'">'+
				'	<h2>'+result.title+'</h2>'+
				'	<div>'+result.snippet+'</div>'+
				'</a><hr>';
	}).join("\n\n");
	$out.html("");
	$(html).appendTo($out);
}

//function that shows an error message in the case of not finding any articles with the keyword
function showError(keyword){
	var $out = $("out");
	$out.html("<a class=\"result\" <p>Your search "+keyword+" did not match any Wikipedia articles. Please try different keywords.</p>");
	console.log("balle");

}

//the search button works when enter is pressed as well
//13 is the key code for the enter key
$(document).keydown(function(e){
    if (e.keyCode == 13) { 
       	var keyword =$(".search-wiki-input").val();

		if (keyword !== ""){
			ajax(keyword);
       	return false;
    }}
});

//when pressed, lucky button takes to a random wikipedia article
$('.lucky').on('click', function(){
	window.location = 'http://en.wikipedia.org/wiki/Special:Random';
})

//search button makes the ajax call
$('.search-wiki').click(function(event){
	event.preventDefault();
	var keyword =$(".search-wiki-input").val();

	if (keyword !== ""){
		ajax(keyword);
	}
})


})