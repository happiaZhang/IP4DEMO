module.exports = appInfo => {
  const config = {};

  // app key
  config.keys = 'ip project for demo';

  // view 模版
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html'
  };

  // logger
  config.logger = {
    consoleLevel: 'DEBUG',
    disableConsoleAfterReady: false
  };

  // CSRF
  config.security = {
    csrf: {
      enable: false
    }
  };

  return config;
};
