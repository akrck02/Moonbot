import express from "express";

const PORT =  process.env.PORT || 3000;
const app = express();

export function start() {
    /* CORS Control */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Content-Language, Content-Type, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();

    });

    /* Define every route with callbacks */
    app.get("/", (req, res) => {res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Moonbot wake up!</title>
            </head>
            <style>
                body {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    font-family: sans-serif;
                    font-size: 1.5em;
                    text-align: center;
                    z-index: -1;
                }
                #content {
                    width: 100%;
                    height: 100%;
                    display: inherit;
                    flex-direction: inherit;
                    justify-content: inherit;
                    align-items: inherit;
                    transition: 1s;
                    background: linear-gradient(to right bottom, rgba(20,20,20,.5),rgba(20,20,20,.2)), linear-gradient(to right bottom, #fa00ff, #d504ff, #aa13ff, #7620ff, #0029ff);
                    z-index: -1;
                }
                h1, p{
                    z-index: 2
                    margin: 0;
                    animation: shadow 2s infinite ;
                }
                h1 {
                    position: fixed; 
                    top: 60%; 
                    width:  100%;
                    left: 50%; 
                    transform: translate(-50%, -50%); 
                }
                p {
                    position: fixed; 
                    top: 70%; 
                    left: 50%; 
                    transform: translate(-50%, -50%); 
                }
                #content #logo{ 
                    z-index: 2; 
                    position: fixed; 
                    top: 50%; 
                    left: 50%; 
                    transition: 1s;
                    transform: translate(-50%, -100%); 
                    animation: float 2s infinite ;
                }

                #content star{
                    z-index: 0;
                }

                @keyframes float {
                    50% {
                        transform : translate(-50%, -95%);
                    }
                }

                @keyframes shadow {
                    50% {
                        text-shadow: 7px 7px #202020;
                    }
                }
            </style>
            <body>
                <div id='content'>
                    <svg id='logo' width="294" height="294" viewBox="0 0 294 294" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_2_88)">
                            <circle cx="147" cy="143" r="143" fill="#B0B0B0"/>
                        </g>
                        <circle cx="129.439" cy="150.526" r="25.0877" fill="#4B4B4B" fill-opacity="0.32"/>
                        <circle cx="74.2456" cy="66.2316" r="25.0877" fill="#4B4B4B" fill-opacity="0.32"/>
                        <circle cx="43.1369" cy="133.969" r="20.0702" fill="#4B4B4B" fill-opacity="0.32"/>
                        <circle cx="218.249" cy="218.765" r="20.0702" fill="#4B4B4B" fill-opacity="0.32"/>
                        <circle cx="250.863" cy="164.576" r="20.0702" fill="#4B4B4B" fill-opacity="0.32"/>
                        <circle cx="178.109" cy="29.1017" r="20.0702" fill="#4B4B4B" fill-opacity="0.32"/>
                        <circle cx="238.319" cy="77.2702" r="20.0702" fill="#4B4B4B" fill-opacity="0.32"/>
                        <ellipse cx="99.3333" cy="113.898" rx="27.5965" ry="36.6281" fill="#E7E7E7"/>
                        <ellipse cx="88.1275" cy="104.365" rx="16.3906" ry="19.0667" fill="#404040"/>
                        <ellipse cx="170.583" cy="113.898" rx="27.5965" ry="36.6281" fill="#E7E7E7"/>
                        <ellipse cx="159.306" cy="103.863" rx="16.822" ry="19.5684" fill="#404040"/>
                        <circle cx="63.2071" cy="213.747" r="25.0877" fill="#4B4B4B" fill-opacity="0.32"/>
                        <defs>
                        <filter id="filter0_d_2_88" x="0" y="0" width="294" height="294" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_88"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_88" result="shape"/>
                        </filter>
                        </defs>
                    </svg>
                    <h1>Moonbot is waking up</h1>
                    <p>coffee time ☕</p>
                </div>
            </body>
            <script>
                const svg = '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" rx="5" fill="#f1f1f1"/></svg>';
                
                window.onload = () => {

                    let stars = [];
                    const content = document.getElementById('content');

                    for (let i = 0; i < 100 ; i++) {
                        let x = Math.floor(Math.random() * (window.innerWidth));
                        let y = Math.floor(Math.random() * (window.innerHeight));

                        const div = document.createElement('div');
                        div.innerHTML = svg;
                        div.style.position = 'fixed';
                        div.style.opacity = 0;
                        div.style.zIndex = 0;
                        div.style.transition = 'opacity 1s';
                        div.style.top = y + 'px';
                        div.style.left = x + 'px';
                        
                        stars.push(div);
                        content.appendChild(div);
                    }

                    setInterval(() => {
                        for (let i = 0; i < stars.length; i++) {
                            if(Math.random() > 0.9) {
                                setTimeout(() => {
                                    stars[i].style.opacity = 0;
                                
                                    if(Math.random() > 0.7) {
                                        setTimeout(() => {
                                            x = Math.floor(Math.random() * (window.innerWidth));
                                            y = Math.floor(Math.random() * (window.innerHeight));
                                            stars[i].style.top = y + 'px';
                                            stars[i].style.left = x + 'px';
                                            stars[i].style.opacity = .2 + Math.random()
                                        }, 1000 + Math.random() * 500);
                                    }
                                }, 1000 + Math.random() * 500);
                            }
                        }
                    }, 1000);
                }
            </script>
        </html>    
    `)});

    app.listen(PORT, function() {
        console.log('[API] Listening on port ' + PORT + '!');
    });
}