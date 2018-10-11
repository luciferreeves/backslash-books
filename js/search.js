$(document).ready(function(){
    var searchString;
    $("#searchField").keyup(function(){
        $('#results').empty();
        var str = $("#searchField").val();
        searchString = str.trim();
        if (searchString != "") {
            // $("#results").show();
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    console.log(data);
                    var options = {
                        shouldSort: true,
                        includeMatches: true,
                        threshold: 0.6,
                        location: 0,
                        distance: 100,
                        maxPatternLength: 32,
                        minMatchCharLength: 1,
                        keys: [
                          "title",
                          "author"
                        ]
                    };
                    var fuse = new Fuse(data, options);
                    var result = fuse.search(searchString);
                    if (result.length == 0) {
                        $('#results').append('<div class="nores"><p>No Results Found...<br> Try with another search term</p></div>');
                    }
                    for(i=0;i<result.length;i++){
                        // $('#results').append('<a href="'+result[i].item.url+'" class="padded"><div class="row"><div class="col-sm-3"><img class="booksearch" src="'+result[i].item.image+'"></div><div class="col-sm-9"><h6>'+result[i].item.title+'</h6><small>'+result[i].item.author+'</small></div></div></a>');
                        $("#results").append('<div class="col-md-2"><img class="book-cls" src="'+result[i].item.image+'"><br><br><h6><a title="Download '+result[i].item.title+' for Free"href="'+result[i].item.url+'">'+result[i].item.title+'</a><br><small>'+result[i].item.author+'</small></h6></div>')
                        // console.log(result[i].item.title);
                    }
                }
            };
            xmlhttp.open("GET", "https://backslashlinux.com/books/all.json", true);
            xmlhttp.send();
        }
    });
});
