function bigUpload (obj) {
	this.obj = obj;
	var xhr;
	//These are the main config variables and should be able to take care of most of the customization
	this.settings = {
		//The id of the file input
		'inputField': 'bigUploadFile',

		//The id of the form with the file upload.
		//This should be a valid html form (see index.html) so there is a fallback for unsupported browsers
		'formId': 'bigUploadForm',

		//The id of the progress bar
		//Width of this element will change based on progress
		//Content of this element will display a percentage
		//See bigUpload.progressUpdate() to change this code
		'progressBarField': 'bigUploadProgressBarFilled',

		//The id of the time remaining field
		//Content of this element will display the estimated time remaining for the upload
		//See bigUpload.progressUpdate() to change this code
		'timeRemainingField': 'bigUploadTimeRemaining',

		//The id of the text response field
		//Content of this element will display the response from the server on success or error
		'responseField': 'bigUploadResponse',

		//The id of the submit button
		//This is then changed to become the pause/resume button based on the status of the upload
		'submitButton': 'bigUploadSubmit',

		//Color of the background of the progress bar
		//This must also be defined in the progressBarField css, but it's used here to reset the color after an error
		//Default: green
		'progressBarColor': '#405b84',

		//Color of the background of the progress bar when an error is triggered
		//Default: red
		'progressBarColorError': '#da4f49',

		//Path to the php script for handling the uploads
		'scriptPath': obj.url,

		//Additional URL variables to be passed to the script path
		//ex: &foo=bar
		'scriptPathParams': '',

		//Size of chunks to upload (in bytes)
		//Default: 1MB
		'chunkSize': 1000000,

		//Max file size allowed
		//Default: 2GB
		'maxFileSize': 2147483648,
		//'maxFileSize': 204800
	};

	//Upload specific variables
	this.uploadData = {
		'uploadStarted': false,
		'file': false,
		'numberOfChunks': 0,
		'aborted': false,
		'paused': false,
		'pauseChunk': 0,
		'key': 0,
		'timeStart': 0,
		'totalTime': 0
	};

	//Success callback
	this.success = function(response) {
		this.obj.success(response)
	};

  //end callback
  this.end = function(e){
    this.obj.end(e)
  }

	var parent = this;

	//Quick function for accessing objects
	this.$ = function(e) {
		return typeof e === 'string' ? document.getElementById(e) : e;
	};

	//Resets all the upload specific data before a new upload
	this.resetKey = function() {
			this.uploadData = {
				'uploadStarted': false,
				'file': false,
				'numberOfChunks': 0,
				'aborted': false,
				'paused': false,
				'pauseChunk': 0,
				'key': 0,
				'timeStart': 0,
				'totalTime': 0
			};
		};

	//Inital method called
	//Determines whether to begin/pause/resume an upload based on whether or not one is already in progress
	this.fire = function() {
		//console.log(this.uploadData.uploadStarted,this.this.uploadData.paused)
		if(this.uploadData.uploadStarted === true && this.uploadData.paused === false) {
			this.pauseUpload();
		}
		else if(this.uploadData.uploadStarted === true && this.uploadData.paused === true) {
			this.resumeUpload();
		}
		else {
			this.processFiles();
		}

	};

	//Initial upload method
	//Pulls the size of the file being uploaded and calculated the number of chunks, then calls the recursive upload method
	this.processFiles = function() {

		//If the user is using an unsupported browser, the form just submits as a regular form
		if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
			this.$(this.settings.formId).submit();
			return;
		}

		//Reset the upload-specific variables
		this.resetKey();
		this.uploadData.uploadStarted = true;

		//Some HTML tidying
		//Reset the background color of the progress bar in case it was changed by any earlier errors
		//Change the Upload button to a Pause button
		this.$(this.settings.progressBarField).style.backgroundColor = this.settings.progressBarColor;
		this.$(this.settings.responseField).textContent = this.obj.msg_uploading;
		this.$(this.settings.submitButton).value = this.obj.msg_pause;

		//Alias the file input object to this.uploadData
		this.uploadData.file = this.$(this.settings.inputField).files[0];

		//Check the filesize. Obviously this is not very secure, so it has another check in inc/bigUpload.php
		//But this should be good enough to catch any immediate errors
		var fileSize = this.uploadData.file.size;
		if(fileSize > this.settings.maxFileSize) {
			this.printResponse(this.obj.msg_too_large, true);
      this.end('too large')
			return;
		}

		//Calculate the total number of file chunks
		this.uploadData.numberOfChunks = Math.ceil(fileSize / this.settings.chunkSize);

		//Start the upload
		this.sendFile(0);
	};

	//Main upload method
	this.sendFile = function (chunk) {

		//Set the time for the beginning of the upload, used for calculating time remaining
		this.uploadData.timeStart = new Date().getTime();

		//Check if the upload has been cancelled by the user
		if(this.uploadData.aborted === true) {
			return;
		}

		//Check if the upload has been paused by the user
		if(this.uploadData.paused === true) {
			this.uploadData.pauseChunk = chunk;
			this.printResponse(this.obj.msg_pause, false);
      this.end()
			return;
		}

		//Set the byte to start uploading from and the byte to end uploading at
		var start = chunk * this.settings.chunkSize;
		var stop = start + this.settings.chunkSize;

		//Initialize a new FileReader object
		var reader = new FileReader();
        var self = this;
		reader.onloadend = function(evt) {
           
			//Build the AJAX request
			//
			//this.uploadData.key is the temporary filename
			//If the server sees it as 0 it will generate a new filename and pass it back in the JSON object
			//this.uploadData.key is then populated with the filename to use for subsequent requests
			//When this method sends a valid filename (i.e. key != 0), the server will just append the data being sent to that file.
			var flag = self.obj.flag || 0;
			xhr = new XMLHttpRequest();
      xhr.withCredentials = true; // 请求时带上cookie信息
			xhr.open("POST", parent.settings.scriptPath + '?action=upload&key=' + parent.uploadData.key + parent.settings.scriptPathParams+'&flag='+flag, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					var response = JSON.parse(xhr.response);

					//If there's an error, call the error method and break the loop
					if(response.errorStatus !== 0 || xhr.status != 200) {
						parent.printResponse(response.errorText, true);
            parent.end(response.errorText)
						return;
					}

					//If it's the first chunk, set this.uploadData.key to the server response (see above)
					if(chunk === 0 || parent.uploadData.key === 0) {
						parent.uploadData.key = response.key;
					}

					//If the file isn't done uploading, update the progress bar and run this.sendFile again for the next chunk
					if(chunk < parent.uploadData.numberOfChunks) {
						parent.progressUpdate(chunk + 1);
						parent.sendFile(chunk + 1);
					}
					//If the file is complete uploaded, instantiate the finalizing method
					else {
						parent.sendFileData();
					}

				}

			};

			//Send the file chunk
			xhr.send(blob);
		};

		//checks if browser is Internet Explorer (IE FileReader doesn't have the readAsBinaryString method)
		var isIE = ((navigator.userAgent.indexOf("MSIE") != -1) || (navigator.userAgent.indexOf("Trident") != -1));

		//Slice the file into the desired chunk
		//This is the core of the script. Everything else is just fluff.
		var blob = this.uploadData.file.slice(start, stop);
		if(isIE){
			reader.readAsArrayBuffer(blob);
		} else {
			reader.readAsBinaryString(blob);
		}
	};

	//This method is for whatever housekeeping work needs to be completed after the file is finished uploading.
	//As it's setup now, it passes along the original filename to the server and the server renames the file and removes it form the temp directory.
	//This function could also pass things like this.uploadData.file.type for the mime-type (although it would be more accurate to use php for that)
	//Or it could pass along user information or something like that, depending on the context of the application.
	this.sendFileData = function() {
		var flag = this.obj.flag || 0;
		var data = 'key=' + this.uploadData.key + '&name=' + this.uploadData.file.name;
		xhr = new XMLHttpRequest();
    xhr.withCredentials = true; // 请求时带上cookie信息
		xhr.open("POST", parent.settings.scriptPath + '?action=finish&flag='+flag, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		var self = this
		xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					var response = JSON.parse(xhr.response);

					//If there's an error, call the error method
					if(response.errorStatus !== 0 || xhr.status != 200) {
						parent.printResponse(response.errorText, true);
            parent.end(response.errorText)
						return;
					}

					//Reset the upload-specific data so we can process another upload
					parent.resetKey();

					//Change the submit button text so it's ready for another upload and spit out a sucess message
					parent.$(parent.settings.submitButton).value = self.obj.msg_upload;
					parent.printResponse(self.obj.msg_succsee, false);
					parent.success(response);
				}
			};

		//Send the reques
		xhr.send(data);
	};

	//This method cancels the upload of a file.
	//It sets this.uploadData.aborted to true, which stops the recursive upload script.
	//The server then removes the incomplete file from the temp directory, and the html displays an error message.
	this.abortFileUpload = function() {
		this.uploadData.aborted = true;
		var self = this
		var data = 'key=' + this.uploadData.key;
		var flag = this.obj.flag || 0;
		xhr = new XMLHttpRequest();
    xhr.withCredentials = true; // 请求时带上cookie信息
		xhr.open("POST", this.settings.scriptPath + '?action=abort&flag='+flag, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					var response = JSON.parse(xhr.response);

					//If there's an error, call the error method.
					if(response.errorStatus !== 0 || xhr.status != 200) {
						parent.printResponse(response.errorText, true);
						parent.resetKey();
						parent.$(parent.settings.submitButton).value = self.obj.msg_reupload;
            parent.end(response.errorText)
						return;
					}
					parent.printResponse(self.obj.msg_cancel, true);
          parent.end(response)
					//////////////////////////////////////////////++
					parent.resetKey();
					parent.$(parent.settings.submitButton).value = self.obj.msg_reupload;

				}

			};

		//Send the request
		xhr.send(data);
	};

	//Pause the upload
	//Sets this.uploadData.paused to true, which breaks the upload loop.
	//The current chunk is still stored in this.uploadData.pauseChunk, so the upload can later be resumed.
	//In a production environment, you might want to have a cron job to clean up files that have been paused and never resumed,
	//because this method won't delete the file from the temp directory if the user pauses and then leaves the page.
	this.pauseUpload = function() {
		this.uploadData.paused = true;
		this.printResponse('', false);
		this.$(this.settings.submitButton).value = this.obj.msg_resume;
	};

	//Resume the upload
	//Undoes the doings of this.pauseUpload and then re-enters the loop at the last chunk uploaded
	this.resumeUpload = function() {
		this.uploadData.paused = false;
		this.$(this.settings.submitButton).value = this.obj.msg_pause;
		this.sendFile(this.uploadData.pauseChunk);
	};

	//This method updates a simple progress bar by calculating the percentage of chunks uploaded.
	//Also includes a method to calculate the time remaining by taking the average time to upload individual chunks
	//and multiplying it by the number of chunks remaining.
	this.progressUpdate = function(progress) {

		var percent = Math.ceil((progress / this.uploadData.numberOfChunks) * 100);

		this.$(this.settings.progressBarField).style.width = percent + '%';
		this.$(this.settings.progressBarField).textContent = percent + '%';

		//Calculate the estimated time remaining
		//Only run this every five chunks, otherwise the time remaining jumps all over the place (see: http://xkcd.com/612/)
		if(progress % 5 === 0) {

			//Calculate the total time for all of the chunks uploaded so far
			this.uploadData.totalTime += (new Date().getTime() - this.uploadData.timeStart);
			console.log(this.uploadData.totalTime);

			//Estimate the time remaining by finding the average time per chunk upload and
			//multiplying it by the number of chunks remaining, then convert into seconds
			var timeLeft = Math.ceil((this.uploadData.totalTime / progress) * (this.uploadData.numberOfChunks - progress) / 100);
			console.log(Math.ceil(((this.uploadData.totalTime / progress) * this.settings.chunkSize) / 1024) + 'kb/s');

			//Update this.settings.timeRemainingField with the estimated time remaining
			this.$(this.settings.timeRemainingField).textContent = timeLeft + ' seconds remaining';
		}
	};

	//Simple response/error handler
	this.printResponse = function(responseText, error) {
		this.$(this.settings.responseField).textContent = responseText;
		this.$(this.settings.timeRemainingField).textContent = '';
		if(error === true) {
			this.$(this.settings.progressBarField).style.backgroundColor = this.settings.progressBarColorError;
      // this.$(this.settings.progressBarField).style.width = 0;
      // this.$(this.settings.submitButton).value = self.obj.msg_upload;
		}
	};
}

export {bigUpload}
