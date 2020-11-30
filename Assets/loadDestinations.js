var containerImagesEl=$(".containerImages");

    var h2El=$("<h2>");
     $("#containerImages").append(h2El.text("Top Destination Places"));
        
        var imgEl=$('<img>').attr('src',"Assets/images/newyork.jpg").width('320px')
        .height('182px').addClass("destinationImages");
        containerImagesEl.append(imgEl);
        imgEl.wrap($("<a>",{
            href:"https://www.booking.com/luxury/city/us/new-york.html"
        }));     
        
        var imgEl=$('<img>').attr('src',"Assets/images/Las_Vegas.jpg").width('290px')
        .height('182px');
        containerImagesEl.append(imgEl);
        imgEl.wrap($("<a>",{
            href:"https://www.booking.com/city/us/las-vegas.html"
        })); 
        
        var imgEl=$('<img>').attr('src',"Assets/images/alamo.jpg").width('330px')
        .height('182px').addClass("destinationImages");
        containerImagesEl.append(imgEl);
        imgEl.wrap($("<a>",{
            href:"https://www.booking.com/city/us/san-antonio.html"
        }));  

        var imgEl=$('<img>').attr('src',"Assets/images/hollywood.jpg").width('260px')
        .height('205px').addClass("destinationImages");
        containerImagesEl.append(imgEl);
        imgEl.wrap($("<a>",{
            href:"https://www.booking.com/district/us/los-angeles/hollywood.html"
        })); 

        var imgEl=$('<img>').attr('src',"Assets/images/capitol.jpg").width('420px').height('205px');
        containerImagesEl.append(imgEl);
        imgEl.wrap($("<a>",{
            href:"https://www.booking.com/city/us/washington.html"
        }));                 
      
        var imgEl=$('<img>').attr('src',"Assets/images/sanFrancisco.jpg").width('260px')
        .height('205px');
        containerImagesEl.append(imgEl);
        imgEl.wrap($("<a>",{
            href:"https://www.booking.com/city/us/san-francisco.html"
        }));  

       
        // $(".containerImages").on("click",(function(){
        //     containerImagesEl.attr("href","https://www.planetware.com/tourist-attractions-/new-york-city-us-ny-nyc.htm");
        // })

//    let array=['newyork.jpg','4.jpg','chicago.jpg','2.jpg','i2.jpg','6.jpeg'];
//    let arrayTest = [
//        ['New York', 'https://planetware.com/tourist-attractions-/new-york-city-us-ny-nyc.html'],
//        ['Chicago', 'https://chicago']
//     ]
//    for(let i=0;i<array.length;i++)
//    {
//     let tempEl=$('<img>').attr('src',`Assets/images/${arrayTest[i][0]}`).width('300px')
//     .height('170px').addClass("destinationImages");
//     // Add an onclick that links to ${arrayTest[i][1]}
    
//     containerImagesEl.append(tempEl);
    
//    }
  