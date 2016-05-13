var services = ["filesystem", "harbor", "memcached", "mongodb", "mysql", "postgresql", "rabbitmq3"];
var serviceEnabled = [0,0,0,0,0,0,0,0];

$(document).ready(function() {
    $(".collapsediv").hide();
	
    $.get("/vcap_services", function(data) {
        if (data) {
            var obj = $.parseJSON(data);
        }
        else {
            var obj = {};
        }
        
        if(obj != null) {
	        for(var key in obj) {
	        	if(key === "user-provided") {
	        		continue;
	        	}
	        	console.log(key + " found");
	        	
	        	$("#service-buttons").append("<button id='" + key + "' class='btn btn-success togglebtn' type='button'>" + key + "</button>");
	        	$("#found_services").append("<div class='collapsediv well on' id='"+key+"_div'></div>");
	        	$("#"+key+"_div").hide();
	        	$("#"+key+"_div").append("<pre>"+JSON.stringify(obj[key][0],null,"\t")+"</pre>");
	        }
        }
        
        // Populate user-provided services
        console.log(obj);
        console.log(obj['user-provided']);

        if (obj['user-provided'] != null) {
            //var user_provided = obj['user_provided'];
            //console.log(user_provided);
            //console.log(obj['user_provided']);

            obj['user-provided'].forEach(function(v,i) {
                upName = v['name'];
                $("#userprovided-service-buttons").append("<button id='" + upName + "' class='btn btn-success togglebtn udbtn' type='button'>" + upName + "</button>");
                $("#userprovided_divs").append("<div class='collapsediv well on' id='" + upName + "_div'></div>");
                $("#" + upName + "_div").hide();
                $("#" + upName + "_div").append("<pre>"+JSON.stringify(v,null, "\t") + "</pre>");
            });
        }
        else {
            $("#userprovided-services-howto_div").show();
        }

        // collapsed_div behavior for standard services
        $('.togglebtn').bind('click', function() {
            $(".collapsediv").hide();
            var target_id = this.id;
            $("#" + target_id + "_div").slideDown();
        });
    });

    // Second section for VCAP Applications
    $.get("/vcap_application", function(data) {
        var app_name = "some-error";

        if (data) {
            app_name = $.parseJSON(data)["application_name"];
        }

        $(".app-name").text(app_name);
    });

    $.get("/links", function(data) {
        var parsedData = $.parseJSON(data);
        if (data) {
            // Will be great if we can also do "ifs" for individual attribute in the data object before assigning.
            $("a[class='kato']").attr('href', parsedData["KATO_TOOL"]);
            $("a[class='user-provided-service']").attr('href', parsedData["USER_SERVICE"]);
        }
    });
});
