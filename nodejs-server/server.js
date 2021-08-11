const http = require('http')

/*
  HTTP CREATE SERVER  

  Conozcamos como se crea un servidor y los argumentos de "requestListener"

  https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
*/

//https://www.w3schools.com/nodejs/met_http_createserver.asp
// const server = http.createServer((request, response) => {
  
//   // https://www.w3schools.com/nodejs/obj_http_incomingmessage.asp
//   console.log('++++++++++++++++++++++++++++++++++++')
//   console.log('+++++ IncomingMessage +++++')
//   console.log(`HEADERS: `, request.headers)
//   console.log(`HTTP-VERSION: ${request.httpVersion}`)
//   console.log(`METHOD: ${request.method}`)
//   console.log(`RAW-HEADERS: ${request.rawHeaders}`)
//   console.log(`STATUS-CODE: ${request.statusCode}`)
//   console.log(`TRAILERS: `, request.trailers)
//   console.log(`URL: ${request.url}`)


//   https://nodejs.org/api/http.html#http_class_http_serverresponse
//   console.log('+++++++++++++++++++++++++++++++')
//   console.log('+++++ OutgoingMessage +++++')
//   // console.log(response)

/*
//  Cookies https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
  
    document.cookie="username=<TU_NOMBRE>"
    document.cookie="expires=Wed, 11 Aug 2021 05:58:49 GMT"
    document.cookie="path=/"
*/
//   //response.sendDate = false
//   //response.statusCode = 200
//   //response.setHeader('Content-Type', 'application/javascript')

//   response.writeHead(200, { 'Content-Type': 'application/javascript' })
//   response.write(`function app(){
//   console.log('Script sent from server')
// }\n`)

//   response.write(`console.log('Running Frontend app')\n`)
//   response.end('app();')
// })

/*
  HTTP CREATE SERVER INTERACTUANDO CON CÓDIGO NODEJS

  Conozcamos como se crea un servidor y los argumentos de "requestListener"

  https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
*/
const fs = require('fs')
const crypto = require('crypto')

const createHash = () => {
  const current_date = (new Date()).valueOf().toString();
  const random = Math.random().toString();
  return crypto.createHash('sha1')
    .update(current_date + random)
    .digest('hex');
}
const createCookie = (sessionId) => {
  return `sessionId=${sessionId};`
}

const server = http.createServer((request, response) => {
  
  console.info(`URL Requested: ${request.url}`)

  const sessionId = createHash()
  const defaultCookies = `expires=${new Date(new Date().getTime() + 2 * 60000).toUTCString()};`
    + `SameSite=None;`
    + `Secure;`
    + `maxAge=800000;`
  
  const customCookie = (request.headers.cookie || createCookie(sessionId) )

  if(request.url === '/') {
    // refactorizar usando path
    const fileNamePath = `${__dirname}/../assets/index.html`

    fs.readFile(fileNamePath,'utf-8' ,(error, data) => {
      if (error !== null) {
        console.error('file Not Found', error)
  
        response.statusCode = 404
  
        return response.end()
      }
  
      console.log('file found')
  
      response.writeHead(200,{
        'Content-Type': 'text/html',
        'Set-Cookie': `${customCookie}; ${defaultCookies}`
      })

      //Intervenir {{username}}
      response.write(data)
      response.end()
    })
  } else if (request.url === '/bio') {
    const fileNamePath = `${__dirname}/../assets/biography.html`

    fs.readFile(fileNamePath, 'utf-8',(error, data) => {
      if (error !== null) {
        console.error('file Not Found', error)
  
        response.statusCode = 404
  
        return response.end()
      }
  
      console.log('file found')
  
      response.writeHead(200,{
        'Content-Type': 'text/html',
        'Set-Cookie': `${customCookie}; ${defaultCookies}`
      })
      response.write(data)

      //Intervenir {{username}}
      response.end()
    })
  } else if (request.url === '/app.js') {
    const fileNamePath = `${__dirname}/../assets/app.js`

    fs.readFile(fileNamePath, 'utf-8' ,(error, data) => {
      if (error !== null) {
        console.error('file Not Found', error)
  
        response.statusCode = 404
  
        return response.end()
      }
  
      console.log('file found')
  
      response.writeHead(200,{
        'Content-Type': 'application/javascript',
        'Set-Cookie': `${customCookie}; ${defaultCookies}`
      })
      response.write(data)

      response.end()
    })
  }
})

/*

  LEVANTAR EL SERVIDOR

*/
const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/ in development environment`);
})
