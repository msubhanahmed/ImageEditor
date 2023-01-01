var optionnum ="brightness";
var brightnessvalue = 100;
var saturationvalue = 100;
var inversionvalue = 0;
var grayscalevalue = 0;

var horizontalf = 1;
var verticalf = 1;

var sepiavalue = 0;
var blurvalue = 0;

var imageangle = 0;
var imageloaded = 0;   

function pasteoncanvas() {
    var canvas = document.getElementById("usercanvas");
    var image = document.getElementById("userimage");
    var visibility = window.getComputedStyle(canvas).visibility;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    console.log("New Canvas Width: "+canvas.width+"  Canvas Height: "+canvas.height);
    
    // hide the image tag and make canvas visible
    if( visibility == "hidden")
    {
        canvas.style.visibility = "visible";
        canvas.style.zIndex = 1;
        image.style.visibility = "hidden";
        image.style.zIndex = 0;
    }
    const context = canvas.getContext("2d");
    // clear previous image
    context.clearRect(0, 0, canvas.width, canvas.height);
    // draw onto canvas when image is loaded
    image.onload = function(){
        context.drawImage(image, 0 , 0 , canvas.width , canvas.height);
        context.save();
        imageloaded = 1;
        document.querySelector("#brightness").click();
    }
    }

function loadfiles()
{
    // get all elements
    var userimage = document.querySelector('#userimage');
    var fileinput = document.querySelector('#fileinput');
    // when file gets selected
    fileinput.onchange = function () {
            
        var filedesc = document.querySelector('#fileinput').files[0];
        // File Reader to read file to imagepreview 
        var freader = new FileReader();
        freader.addEventListener("load", () => { userimage.src = freader.result;}, false);
        if (filedesc) {freader.readAsDataURL(filedesc);}
        // When image gets loaded paste it on canvas
        userimage.addEventListener("loaded" , pasteoncanvas() ,false)
    }

    fileinput.click();
}

function slidervaluechange()
{
    // if image is loaded and slider value gets changed
    // then check value that is selected and
    // set filter value and redraw image

    if(imageloaded == 1)
    {
        value = document.querySelector("#slidervalue").value;
        document.querySelector("#slidervaluedisp").innerHTML = value;


        if(optionnum == "Brightness")
        {
            brightnessvalue = value;
        }
        else if (optionnum == "Saturation")
        {
            saturationvalue = value;
        }
        else if (optionnum == "Inversion")
        {
            inversionvalue = value;
        }
        else if (optionnum == "Grayscale")
        {
            grayscalevalue = value;
        }

        redrawimage();
    }
    else 
    {
        alert("No Image Loaded!");
    }
}

function pictureproperty(prop)
{

    if(imageloaded == 1)
    {
        optionnum = prop;
        var value = 0;

        if(prop == "Brightness")
        {
            value = brightnessvalue;
            document.querySelector("#slidervalue").max  = "200";
            document.getElementById("brightness").style.backgroundColor = "#5372F0";
            document.getElementById("brightness").style.color = "white";

            document.getElementById("grayscale").style.backgroundColor = "white";
            document.getElementById("grayscale").style.color = "#464646";
            document.getElementById("saturation").style.backgroundColor = "white";
            document.getElementById("saturation").style.color = "#464646";
            document.getElementById("inversion").style.backgroundColor = "white";
            document.getElementById("inversion").style.color = "#464646";
        }
        else if (prop == "Saturation")
        {
            value = saturationvalue;
            document.querySelector("#slidervalue").max  = "100";

            document.getElementById("saturation").style.backgroundColor = "#5372F0";
            document.getElementById("saturation").style.color = "white";

            document.getElementById("grayscale").style.backgroundColor = "white";
            document.getElementById("grayscale").style.color = "#464646";
            document.getElementById("brightness").style.backgroundColor = "white";
            document.getElementById("brightness").style.color = "#464646";
            document.getElementById("inversion").style.backgroundColor = "white";
            document.getElementById("inversion").style.color = "#464646";
        }
        else if (prop == "Inversion")
        {
            value = inversionvalue;
            document.querySelector("#slidervalue").max  = "100";

            document.getElementById("inversion").style.backgroundColor = "#5372F0";
            document.getElementById("inversion").style.color = "white";

            document.getElementById("grayscale").style.backgroundColor = "white";
            document.getElementById("grayscale").style.color = "#464646";
            document.getElementById("saturation").style.backgroundColor = "white";
            document.getElementById("saturation").style.color = "#464646";
            document.getElementById("brightness").style.backgroundColor = "white";
            document.getElementById("brightness").style.color = "#464646";
        }
        else if (prop == "Grayscale")
        {
            value = grayscalevalue;
            document.querySelector("#slidervalue").max  = "100";

            document.getElementById("grayscale").style.backgroundColor = "#5372F0";
            document.getElementById("grayscale").style.color = "white";

            document.getElementById("brightness").style.backgroundColor = "white";
            document.getElementById("brightness").style.color = "#464646";
            document.getElementById("saturation").style.backgroundColor = "white";
            document.getElementById("saturation").style.color = "#464646";
            document.getElementById("inversion").style.backgroundColor = "white";
            document.getElementById("inversion").style.color = "#464646";
        }
        document.querySelector("#sliderpropertyname").innerHTML = optionnum;
        document.querySelector("#slidervaluedisp").innerHTML = value;
        document.querySelector("#slidervalue").value = value;
        
    }
    else 
    {
        alert("No Image Loaded!");
    }
}

function redrawimage()
{
    var canvas = document.getElementById("usercanvas");
    var image = document.getElementById("userimage");
    const context = canvas.getContext("2d");
    context.scale(horizontalf , verticalf);
    context.filter = 'brightness('+brightnessvalue+'%)  grayscale('+grayscalevalue+'%)   invert('+inversionvalue+'%)  saturate('+saturationvalue+'%) blur('+blurvalue+'px) sepia('+sepiavalue+'%)';
    context.drawImage(image, 0 , 0 , canvas.width , canvas.height);
}

function rotate (angle)
{
    if(imageloaded == 1)
    {
        imageangle = Number(angle);
        if (imageangle < 0)
        {
            imageangle = 360 + imageangle;
        }
        console.log("Image Rotated By angle: " + imageangle);
        var canvas = document.getElementById("usercanvas");
        var image = document.getElementById("userimage");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.translate(canvas.width/2,canvas.height/2);
        context.rotate(imageangle* Math.PI/180);
        context.translate(-canvas.width/2,-canvas.height/2);
        
        if(imageangle == 90 || imageangle == 270)
        {
            context.drawImage(image ,0 , 0, canvas.width , canvas.height);
        }
        else
        {
            context.drawImage(image ,0 , 0, canvas.height , canvas.width);
        }
    }
    else 
    {
        alert("No Image Loaded!");
    }
}

function saveimage()
{
    if(imageloaded == 1)
    {
        var canvas = document.getElementById("usercanvas");
        var downloadlink = document.createElement("a");
        downloadlink.download = "newimage.jpg";
        downloadlink.href = canvas.toDataURL();
        downloadlink.click();

        // window.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    }
    else 
    {
        alert("No Image Loaded!");
    }
}

function reset()
{
    if(imageloaded == 1)
    {
        var canvas = document.getElementById("usercanvas");
        const context = canvas.getContext("2d");
        context.reset();
        var filedesc = document.querySelector('#fileinput').files[0];
        var freader = new FileReader();
        freader.addEventListener("load", () => { userimage.src = freader.result;}, false);
        if (filedesc) {freader.readAsDataURL(filedesc);}
        userimage.addEventListener("loaded" , pasteoncanvas() ,false)

        brightnessvalue = 100;
        saturationvalue = 100;
        inversionvalue = 0;
        grayscalevalue = 0;
        blurvalue = 0;
        sepiavalue = 0;
        
        imageangle = 0;
        document.querySelector("#slidervalue").value = 0;
        document.querySelector("#slidervaluedisp").innerHTML = "0";
        
        imageangle = 0;
        document.querySelector("#rotatevalue").value = imageangle;
        document.querySelector("#rotatevaluedisp").innerHTML = imageangle;

        document.querySelector("#blurvalue").value = blurvalue;
        document.querySelector("#blurvaluedisp").innerHTML = blurvalue;

        document.querySelector("#sepiavalue").value = sepiavalue;
        document.querySelector("#sepiavaluedisp").innerHTML = sepiavalue;

    }
    else 
    {
        alert("No Image Loaded!");
    }
}

function fliphorizontal()
{
    if(imageloaded == 1)
    {
        horizontalf = -1
    }
    else
    {
        alert("No Image Loaded!");
    }
}

function flipvertical()
{
    if(imageloaded == 1)
    {
        verticalf = -1
    }
    else
    {
        alert("No Image Loaded!");
    }
}

function blurfilter()
{
    if(imageloaded == 1)
    {
        blurvalue = document.querySelector("#blurvalue").value;
        document.querySelector("#blurvaluedisp").innerHTML = blurvalue;
        redrawimage();
    }
    else
    {
        alert("No Image Loaded!");
    }

}

function rotatebydegree()
{
    if(imageloaded == 1)
    {
        imageangle = document.querySelector("#rotatevalue").value;
        document.querySelector("#rotatevaluedisp").innerHTML = imageangle;
        rotate(imageangle);
    }
    else
    {
        alert("No Image Loaded!");
    }
}

function sepiafilter ()
{
    if(imageloaded == 1)
    {
        sepiavalue = document.querySelector("#sepiavalue").value;
        document.querySelector("#sepiavaluedisp").innerHTML = sepiavalue;
        redrawimage();
    }
    else
    {
        alert("No Image Loaded!");
    }
}