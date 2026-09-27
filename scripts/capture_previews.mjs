import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function main() {
  const docsDir = path.join(process.cwd(), 'docs', 'previews');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\user\\AppData\\Local\\Temp\\chrome_cdp_profile_readme';

  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9333',
    '--remote-allow-origins=*',
    `--user-data-dir=${profileDir}`,
    'about:blank'
  ]);

  let versionData = null;
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9333/json/version');
      versionData = await res.json();
      break;
    } catch {
      await new Promise(r => setTimeout(r, 250));
    }
  }

  if (!versionData) {
    console.error('Could not connect to Chrome');
    chrome.kill();
    process.exit(1);
  }

  const ws = new WebSocket(versionData.webSocketDebuggerUrl);
  await new Promise(resolve => ws.onopen = resolve);

  let id = 1;
  const callbacks = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      cb(msg);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  const newTarget = await send('Target.createTarget', { url: 'http://localhost:3000/' });
  const targetId = newTarget.result.targetId;

  const attachRes = await send('Target.attachToTarget', { targetId, flatten: true });
  const sessionId = attachRes.result.sessionId;

  function sendSession(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, sessionId, method, params }));
    });
  }

  await sendSession('Page.enable');
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await new Promise(r => setTimeout(r, 2500));

  async function capture(fileName, scrollY = 0) {
    if (scrollY > 0) {
      await sendSession('Runtime.evaluate', {
        expression: `window.scrollTo(0, ${scrollY}); window.dispatchEvent(new Event('scroll'));`
      });
      await new Promise(r => setTimeout(r, 1000));
    }
    const screenshot = await sendSession('Page.captureScreenshot', { format: 'png' });
    const targetPath = path.join(docsDir, fileName);
    fs.writeFileSync(targetPath, Buffer.from(screenshot.result.data, 'base64'));
    console.log(`Saved ${fileName}`);
  }

  await capture('01-brand-identity.png', 0);
  await capture('02-sneaker-hero.png', 4300);
  await capture('03-jacket-hero.png', 5900);
  await capture('04-collection-cards.png', 7200);
  await capture('05-craft-details.png', 8800);

  chrome.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
