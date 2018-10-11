

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var books = JSON.parse(this.responseText);
        var top = books.books.top;
        var classicTitles = books.books.classic;
        var slider = books.books.slider;
        for (var classics = 0; classics < 6; classics++) {
            $("#alltimeclassics").append('<div class="col-md-2"><img class="book-cls" src="'+classicTitles[classics].image+'"><br><br><h6><a title="Download '+classicTitles[classics].title+' for Free"href="'+classicTitles[classics].url+'">'+classicTitles[classics].title+'</a><br><small>'+classicTitles[classics].author+'</small></h6></div>')
        }
        for (var toppicks = 0; toppicks < 6; toppicks++) {
            $("#toppicks").append('<div class="col-md-2"><img class="book-cls" src="'+top[toppicks].image+'"><br><br><h6><a title="Download '+top[toppicks].title+' for Free"href="'+top[toppicks].url+'">'+top[toppicks].title+'</a><br><small>'+top[toppicks].author+'</small></h6></div>')
        }
        for (var slide = 0; slide < 3; slide++) {
            var url = slider[slide].url;
            console.log(url);
            $("#"+slide).attr('href', url);
            $("#"+slide).append('<div class="slider" style="background-image:url('+slider[slide].image+');"></div>')
        }
    }
};
xmlhttp.open("GET", "https://backslashlinux.com/books/books.json", true);
xmlhttp.send();
$(document).ready(function(){
    $("#search").click(function(){
        $("#showContent").hide();
        $("#showLibrary").hide();
        $("#showSearch").show();
        $("#search").addClass("activeBtn");
        $("#read").removeClass("activeBtn");
        $("#library").removeClass("activeBtn");
        $("#showAbout").hide();
        $("#about").removeClass("activeBtn");
    });
    $("#read").click(function(){
        $("#showContent").show();
        $("#showLibrary").hide();
        $("#showSearch").hide();
        $("#search").removeClass("activeBtn");
        $("#read").addClass("activeBtn");
        $("#library").removeClass("activeBtn");
        $("#showAbout").hide();
        $("#about").removeClass("activeBtn");
    });
    $("#about").click(function(){
        $("#showContent").hide();
        $("#showLibrary").hide();
        $("#showSearch").hide();
        $("#showAbout").show();
        $("#about").addClass("activeBtn");
        $("#search").removeClass("activeBtn");
        $("#read").removeClass("activeBtn");
        $("#library").removeClass("activeBtn");
    });
    $("#library").click(function(){
        function init() {
            $("#books").empty();
            const directory = '/Users/'+user+'/Downloads/Books/*'
            const dirname = path.dirname(directory) + path.sep;
            const files = fs.readdirSync(dirname);
            var count = 0;
            for (var i = 0; i < files.length; i++) {
                var pdfRead = files[i];
                var epubRead = files[i];
                var pdf = pdfRead.substr(pdfRead.length - 3);
                var epub = epubRead.substr(epubRead.length - 4);
                if (pdf === "pdf") {
                    // console.log(files[i]);
                    // console.log(files[i].slice(0, -7));
                    count++;
                    $("#books").append('<div class="col-md-2 bookFile"><img class="book" src="icons/pdf.png"><p class="center">' + files[i] + '</p>');
                }
                if (epub === "epub") {
                    // console.log(files[i]);
                    count++;
                    $("#books").append('<div class="col-md-2 bookFile"><img class="book" src="icons/epub.png"><p class="center">' + files[i] + '</p>')
                }
            }
            if (count == 0) {
                $('#books').append('<div class="nores"><p>You haven\'t downloaded any books.<br> Click on "Store" and Download your favourite book for free.</p></div>');
            }
            $(".bookFile").click(function(){
                var fileName = $(this).children("p").text();
                var filePath = '/Users/'+user+'/Downloads/Books/' + fileName;
                if(fileName.substr(fileName.length - 3) == "pdf") {
                    $(".frameWindow").attr('src', 'js/web/viewer.html?file='+filePath);
                    $("#bookViewer").show();
                }
                else {
                    alert("ePub reading Functionality not yet implemented yet. Please use a third party ePub Reader.");
                }
            });
            $("#backbutton").click(function(){
                $("#bookViewer").hide();
                $("#showLibrary").show();
            });
        }
        init();
        $("#showContent").hide();
        $("#showLibrary").show();
        $("#showSearch").hide();
        $("#search").removeClass("activeBtn");
        $("#read").removeClass("activeBtn");
        $("#library").addClass("activeBtn");
        $("#showAbout").hide();
        $("#about").removeClass("activeBtn");
    });
    $(".help").click(function(){
        $(".helpWindow").toggle();
    });
});