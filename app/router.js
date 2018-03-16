module.exports = app => {
  app.all(/^\/api\/quote\/([\w-.]+)$/, 'quote.action');
  app.all('/ticket', 'qq.ticket');
  app.all('/receive', 'qq.receive');
  app.get('/*', 'index.view');
};
