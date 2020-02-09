module.exports = (app, url) => {
  const { html, head } = app.render({ url });
  return `
    <html>
      <head>
        <meta charset='utf-8'>
      	<meta name='viewport' content='width=device-width,initial-scale=1.0'>
        ${head}
        <link rel='stylesheet' href='/assets/bundle.css'>
      </head>
      <div id="app">${html}</div>
      <script src="/assets/bundle.js"></script>
    </html>
  `;
};
