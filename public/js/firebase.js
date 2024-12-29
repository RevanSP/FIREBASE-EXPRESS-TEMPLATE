 // Response Test
 const logElement = document.getElementById('log');
 const originalConsoleLog = console.log;

 console.log = function (...args) {
     originalConsoleLog.apply(console, args);

     logElement.textContent += args.map(arg => JSON.stringify(arg, null, 2)).join(' ') + '\n';
     logElement.scrollTop = logElement.scrollHeight; 
 };
 // Response Test

 async function fetchFirebaseConfig() {
     const isLocal = window.location.hostname === 'localhost';
     const urls = isLocal ? ['/firebase-config'] : ['/api/firebase-config'];

     for (let url of urls) {
         try {
             const response = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } });
             if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
             
             const firebaseConfigResponse = await response.json(); 
             const firebaseConfig = firebaseConfigResponse.getFirebaseConfig || firebaseConfigResponse;
             console.log(`🌍 Using ${isLocal ? 'local' : 'production'} Firebase config`);
             return firebaseConfig;
         } catch (error) {
             console.error(`❌ Error fetching from ${url}:`, error.message);
         }
     }
     throw new Error('All Firebase config URLs failed.');
 }

 async function initializeFirebase() {
     try {
         const firebaseConfig = await fetchFirebaseConfig();
         const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js");
         const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js");

         initializeApp(firebaseConfig);
         getAnalytics();
         console.log('🔥 Firebase initialized successfully');
         return true;
     } catch (error) {
         console.error('❌ Firebase initialization failed:', error);
         return false;
     }
 }

 initializeFirebase().then(success => {
     console.log(success ? '✅ Firebase setup complete' : '⚠️ Firebase setup failed');
 });