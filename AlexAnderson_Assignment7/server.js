
const methods = Object.create(null);
const {createServer} = require("http");

createServer((request, response) => 
{
	//handler is either set methods or the function notAllowed.
	//Doing this dual euqality ensures that if any error is detected
	//then the user will be told the method is not supported.
	let handler = methods[request.method] || notAllowed;
	
	handler(request)
	.catch(error => 
	{
		if (error.status != null)
		{
			return error;
		}
		return {body: String(error), status: 500};
	})
	
	.then(({body, status = 200, type = "text/plain"}) => 
	{
	
		response.writeHead(status, {"Content-Type": type});
		if (body && body.pipe)
		{
			body.pipe(response);
		}
		else 
		{
			response.end(body);
		}
	});
	
}).listen(8000);

//notAllowed is a funciton that takes in a request and returns status code 405. 
//regardless of what the request is it will return an error message saying that 
//the request method is not supported.
async function notAllowed(request) 
{
	return {status: 405, body: `The method ${request.method} is not supported.`};
}

const {parse} = require("url");
const {resolve, sep} = require("path");
const baseDirectory = process.cwd();

//urlPath takes in a url and converts it into a file name. Returns path which is the url as a file name
function urlPath(url)
{
  
  let {pathname} = parse(url);
  let path = resolve(decodeURIComponent(pathname).slice(1));
  
  if(path != baseDirectory && !path.startsWith(baseDirectory + sep))
  {
	throw {status: 403, body: "Forbidden"};
  }
  return path;
}

//deleting a file
methods.DELETE = async function(request)
{
	//translate the url into a file name
	let path = urlPath(request.url);
	//invoke stat object called stats
	let stats;
		//wait for stat to find the file
		try
		{
			stats = await stat(path);
			//handle a non-existent file name
		} 
		catch (error)
		{
			if(error.code != "ENOENT")
			{
				throw error;
			}
			else
			{
				return {status: 204};
			}
		}
		//if the file name is a directory, remove it
		if (stats.isDirectory())
		{
			await rmdir(path);
		}
		//if the file name is not a directory, remove it
		else
		{
			await unlink(path);
		}
	//report that the file deletion was successful
	return {status: 204};
};

const {createWriteStream} = require("fs");

//pipeStream is a function that decides if there is any sort of issues
//with opening the file and recieving a stream from it.
function pipeStream(from, to) 
{
	return new Promise((resolve, reject) => 
	{
		from.on("error", reject);
		to.on("error", reject);
		to.on("finish", resolve);
		from.pipe(to);
	});
}

//writing a file
methods.PUT = async function(request) 
{
	//translate the url into a file name
	let path = urlPath(request.url);
	//wait for pipestream to decide weather to reject or resolve
	await pipeStream(request, createWriteStream(path));
	//report that the file writing was successful
	return {status: 204};
};

const {createReadStream} = require("fs");
const {stat, readdir} = require("fs").promises;
const mime = require("mime");

//reading a file
methods.GET = async function(request) 
{
	//translate the url into a file name
	let path = urlPath(request.url);
	//invoke stat object called stats
	let stats;
	//wait for stat to find the file
	try
	{
		stats = await stat(path);
		//handle a non-existent file name
	}
	catch (error)
	{
		if(error.code != "ENOENT")
		{
			throw error;
		}
		else
		{
			return {status: 404, body: "File not found"};
		}
	}
	//if the file name is a directory, read it
	if(stats.isDirectory())
	{
		return {body: (await readdir(path)).join("\n")};
	}
	//if the file name is not a directory, read it	
	else
	{
		return {body: createReadStream(path),
		type: mime.getType(path)};
	}
};

const {mkdir} = require("fs").promises;

//creating a directory
methods.MKCOL = async function(request)
{
	//translate the url into a file name
	let path = urlPath(request.url);
	//wait for mkdir to give a response
	try
	{
		await mkdir(path); 
	}
	//handle an already existent file name
	catch(error)
	{
		
		if(error.code != "EEXIST" && error.code != ")
		{
			
			throw error;
		}
		
		else
		{
			
			return {body: "This directory already exists", status: 204};
		}
		//report that the directory creation was successful
		return {status: 204};
	}
}

















